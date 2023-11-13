// library imports
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// component imports
// import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Input from '../input/index';
import CustomButton from '../../components/button';
// Redux imports
import { addProduct, getProducts, UpdateProduct } from '../../redux/slices/productsSlice';
// style imports
import ArrowLeft from '../../assets/ArrowLeft.svg';
import CloudArrow from '../../assets/CloudArrow.svg';
import image1 from '../../assets/image1.png';
import image2 from '../../assets/image2.png';
import image3 from '../../assets/image3.png';
import image4 from '../../assets/image4.png';
import './editProduct.css';
// import { Button } from 'react-bootstrap';

const EditProduct = ({ onClose, heading, btnHeading, editObject }) => {
  const [imageBase64, setImageBase64] = useState();
  const [productName, setProductName] = useState(editObject?.title || '');
  const [productPrice, setProductPrice] = useState(editObject?.price || ' ');
  const [productQuantity, setProductQuantity] = useState(editObject?.stock || ' ');
  const [productColor, setProductColor] = useState(editObject?.color || ' ');
  const [productBrand, setProductBrand] = useState(editObject?.brand || '');
  const [description, setDescription] = useState(editObject?.description || '');
  const [pro, setPro] = useState({
    images: editObject?.images || []
  });

  // const id = editObject._id;
  const dispatch = useDispatch();
  const handleClose = () => {
    onClose();
  };
  // image handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      setPro((prev) => ({
        ...prev,
        images: [...(prev?.images) || [], file]
      }));

      reader.onload = (e) => {
        const base64String = e.target.result;
        setImageBase64(base64String);
      };

      reader.readAsDataURL(file);
    }
  };
  const handleProductName = (e) => {
    setProductName(e.target.value);
  };

  const handlePrice = (e) => {
    setProductPrice(e.target.value);
  };
  const handleQuantity = (e) => {
    setProductQuantity(e.target.value);
  };
  const handleColor = (e) => {
    setProductColor(e.target.value);
  };

  const handleBrand = (e) => {
    setProductBrand(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  console.log('description ', description);
  // sizes array
  const size = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
  const color = ['#155724', '#AAA', '#1B1E21', '#231579', '#740F0F'];
  return (
    <>
      <Offcanvas
        className="edit_modal"
        show={true}
        onHide={handleClose}
        placement="end"
      >
        <Offcanvas.Header>
          <Offcanvas.Title>
            {' '}
            {<img src={ArrowLeft} onClick={handleClose} />} {heading}{' '}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <div className="line"></div>
        <Offcanvas.Body>
          <div className="upper_part">
            <div className="upload_image">
              <img src={CloudArrow} style={{ marginTop: '18px' }} />
              <div className="text_style">
                {imageBase64 ? (
                  <img
                    src={imageBase64}
                    style={{ height: '80px', width: '100px' }}
                  />
                ) : (
                  <p>Drag & drop files here</p>
                )}{' '}
                <br></br> or
              </div>
              {/* <Button style={{ height: '36px', width: '141px' }}>Browse</Button> */}
              <Input type="file" onChange={handleImageChange} />
            </div>
            <div className="name_size">
              <Input
                type="text"
                placeholder="Add product name"
                lable="Product Name"
                id="product_name"
                onChange={handleProductName}
                value={productName}
              />
              <h6 style={{ marginTop: '16px' }}>Size</h6>
              <dive className="size_div">
                {size.map((size, index) => (
                  <div className="size_box" key={index}>
                    {' '}
                    {size}{' '}
                  </div>
                ))}
              </dive>
            </div>
          </div>
          {
            <p className="multiple" style={{ marginTop: '20px' }}>
              (multiple images can be uploaded)
            </p>
          }
          <div className="lower_part">
            <div className="pictures">
              {
                pro?.images?.map((image) => (
                  <img
                    style={{ width: '50px', height: '50px' }}
                    // onLoad={({ currentTarget }) => {
                    //   console.log('in load');
                    //   currentTarget.onload = null;
                    //   if (currentTarget.src !== `http://localhost:4009/${image}`) {
                    //     currentTarget.src = `http://localhost:4009/${image}`;
                    //   }
                    // }}
                    // onError={({ currentTarget }) => {
                    //   console.log('in error');
                    //   currentTarget.onerror = null;
                    //   if (currentTarget.src !== imageBase64) {
                    //     currentTarget.src = imageBase64;
                    //     currentTarget.alt = 'Picture'
                    //   }
                    // }}
                    src={`http://localhost:4009/${image}`}
                    // src={`http://localhost:4009/${image}`}
                    // alt='Pic'
                    key={image}
                  />
                ))
              }
              <div
                style={{
                  height: '50px',
                  width: '50px',
                  marginLeft: '20px',
                  marginTop: '20px',
                }}
              >

              </div>
              {/* <div style={{ height: '50px', width: '50px', marginTop: '20px' }}>
                <img src={image2} />
              </div>
              <div
                style={{ height: '50px', width: '50px', marginLeft: '20px' }}
              >
                <img src={image3} />
              </div>
              <div style={{ height: '50px', width: '50px' }}>
                <img src={image4} />
              </div> */}

            </div>
            <div className="color_price">
              <h6 style={{ marginTop: '19px' }}>Color</h6>
              <dive className="color_div">
                {color.map((color, index) => (
                  <div
                    style={{
                      height: '30px',
                      width: '40px',
                      background: `${color}`,
                      border: '1px solid #DFDFDF',
                      padding: '10px 10px',
                      marginLeft: '18px',
                    }}
                    key={index}
                  >
                    {' '}
                  </div>
                ))}
              </dive>
              {/* <div className=''> */}
              <Input
                type="number"
                placeholder="$00.00"
                lable="Price"
                id="price"
                onChange={handlePrice}
                value={productPrice}
              />
              <Input
                type="number"
                placeholder="100"
                lable="Quantity"
                id="quantity"
                onChange={handleQuantity}
                value={productQuantity}
              />
              <Input
                type="text"
                placeholder="Color"
                lable="Color"
                id="rating"
                onChange={handleColor}
                value={productColor}
              />
              <Input
                type="text"
                placeholder="Brand name"
                lable="Brand"
                id="brand"
                onChange={handleBrand}
                value={productBrand}
              />
              <Input
                type="text"
                placeholder="Description"
                lable="Description"
                id="description"
                onChange={handleDescription}
                value={description}
              />
              <CustomButton
                placeholder={btnHeading}
                style={{
                  height: '36px',
                  width: '141px',
                  marginLeft: '300px',
                  marginTop: '20px',
                }}
                onClick={() => {
                  console.log('add handler executed.');
                  !editObject?._id ? dispatch(
                    addProduct({
                      title: productName,
                      brand: productBrand,
                      stock: productQuantity,
                      price: productPrice,
                      description,
                      images: pro.images,
                      color: productColor,
                    })
                  ).then(() => dispatch(getProducts())) : dispatch(UpdateProduct({ _id: editObject._id, title: productName, brand: productBrand, stock: productQuantity, price: productPrice, description, color: productColor })).then(() => dispatch(getProducts()));
                  handleClose();
                }}
              />
              {/* </div> */}
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default EditProduct;
