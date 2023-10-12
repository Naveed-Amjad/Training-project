// library imports
// import { useState } from 'react';
// component imports
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Input from '../input/index';
import CustomButton from '../../components/button';
// Redux imports
import { addProduct } from '../../redux/slices/productsSlice';
// style imports
import ArrowLeft from '../../assets/ArrowLeft.svg';
import CloudArrow from '../../assets/CloudArrow.svg';
import image1 from '../../assets/image1.png';
import image2 from '../../assets/image2.png';
import image3 from '../../assets/image3.png';
import image4 from '../../assets/image4.png';
import './editProduct.css';
// import { Button } from 'react-bootstrap';

const EditProduct = ({ id, onClose, heading, btnHeading }) => {
  const [imageBase64, setImageBase64] = useState(null);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [productRating, setProductRating] = useState(0);
  const [productBrand, setProductBrand] = useState('');
  const [description, setDescription] = useState('');
  //   const [show, setShow] = useState(false);
  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const handleClose = () => {
    onClose();
  };
  // image handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

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
  const handleRating = (e) => {
    setProductRating(e.target.value);
  };

  const handleBrand = (e) => {
    setProductBrand(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  // addProduct handler
  // const addProductHandler = () => {
  //   console.log('add handler executed.');
  //   dispatch(
  //     addProduct({
  //       title: productName,
  //       brand: productBrand,
  //       stock: productQuantity,
  //       price: productPrice,
  //       description: description,
  //       image: imageBase64,
  //       rating: productRating,
  //     })
  //   );
  // };

  console.log('Image as base64 string ', imageBase64);
  console.log('Type of image ', typeof imageBase64);
  console.log('handleProductName ', productName);
  console.log('ProductPrice ', productPrice);
  console.log('ProductQuantity ', productQuantity);
  console.log('productRating ', productRating);
  console.log('productBrand', productBrand);
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
        {/* <Button variant="primary" onClick={handleClose} className="me-2">Edit Product</Button> */}
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
              <div
                style={{
                  height: '50px',
                  width: '50px',
                  marginLeft: '20px',
                  marginTop: '20px',
                }}
              >
                <img src={image1} />
              </div>
              <div style={{ height: '50px', width: '50px', marginTop: '20px' }}>
                <img src={image2} />
              </div>
              <div
                style={{ height: '50px', width: '50px', marginLeft: '20px' }}
              >
                <img src={image3} />
              </div>
              <div style={{ height: '50px', width: '50px' }}>
                <img src={image4} />
              </div>
              {/* <img src={image1} style={{ height: '50px', width: '50px' }}/>
              <img src={image2}/>
              <img src={image3}/>
              <img src={image4}/> */}
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
              />
              <Input
                type="number"
                placeholder="100"
                lable="Quantity"
                id="quantity"
                onChange={handleQuantity}
              />
              <Input
                type="number"
                placeholder="Rating"
                lable="Rating"
                id="rating"
                onChange={handleRating}
              />
              <Input
                type="text"
                placeholder="Brand name"
                lable="Brand"
                id="brand"
                onChange={handleBrand}
              />
              <Input
                type="text"
                placeholder="Description"
                lable="Description"
                id="description"
                onChange={handleDescription}
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
                  dispatch(
                    addProduct({
                      title: productName,
                      brand: productBrand,
                      stock: productQuantity,
                      price: productPrice,
                      description: description,
                      images: imageBase64,
                      rating: productRating,
                    })
                  );
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
