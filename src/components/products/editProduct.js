// library imports
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { notification } from 'antd';
// component imports
// import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Input from '../input/index';
import CustomButton from '../../components/button';
// Redux imports
import {
  addProduct,
  getProducts,
  UpdateProduct,
} from '../../redux/slices/productsSlice';
// style imports
import ArrowLeft from '../../assets/ArrowLeft.svg';
import CloudArrow from '../../assets/CloudArrow.svg';
// style imports
import './editProduct.css';
// import { Button } from 'react-bootstrap';

const EditProduct = ({ onClose, heading, btnHeading, editObject }) => {
  const [imageBase64, setImageBase64] = useState();
  const [productName, setProductName] = useState(editObject?.title || '');
  const [productPrice, setProductPrice] = useState(editObject?.price || '');
  const [productQuantity, setProductQuantity] = useState(
    editObject?.stock || ' '
  );
  const [productColor, setProductColor] = useState(editObject?.color || ' ');
  const [productBrand, setProductBrand] = useState(editObject?.brand || '');
  const [description, setDescription] = useState(editObject?.description || '');
  const [pro, setPro] = useState({
    images: [],
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
        images: [...(prev?.images || []), file],
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
    if (e.target.value < 0) {
      notification.error({
        message: 'error',
        description: 'Price cannot be negative value',
        type: 'error',
      });
    } else {
      setProductPrice(e.target.value);
    }
  };
  const handleQuantity = (e) => {
    if (e.target.value < 0) {
      notification.error({
        message: 'error',
        description: 'Stock can not be negative',
        type: 'error',
      });
    } else {
      setProductQuantity(e.target.value);
    }
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
            </div>
          </div>
          {
            <p className="multiple" style={{ marginTop: '20px' }}>
              (multiple images can be uploaded)
            </p>
          }
          <div className="lower_part">
            <div className="pictures">
              {pro?.images?.map((image) => (
                <img
                  style={{ width: '50px', height: '50px' }}
                  src={`http://localhost:4009/${image}`}
                  alt="picture"
                  key={image}
                />
              ))}
              <div
                style={{
                  height: '50px',
                  width: '50px',
                  marginLeft: '20px',
                  marginTop: '20px',
                }}
              ></div>
            </div>
            <div className="color_price">
              <h6 style={{ marginTop: '19px' }}>Color</h6>
              <Input
                type="number"
                placeholder="$00.00"
                lable="Price"
                id="price"
                onChange={handlePrice}
                value={productPrice}
                min='1'
              />
              <Input
                type="number"
                placeholder="0"
                lable="Quantity"
                id="quantity"
                onChange={handleQuantity}
                value={productQuantity}
                min='1'
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
                  !editObject?._id
                    ? dispatch(
                      addProduct({
                        title: productName,
                        brand: productBrand,
                        stock: productQuantity,
                        price: productPrice,
                        description,
                        images: pro.images,
                        color: productColor,
                      })
                    ).then(() => dispatch(getProducts()))
                    : dispatch(
                      UpdateProduct({
                        _id: editObject._id,
                        title: productName,
                        brand: productBrand,
                        stock: productQuantity,
                        price: productPrice,
                        description,
                        images: pro.images,
                        color: productColor,
                      })
                    ).then(() => dispatch(getProducts()));
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
