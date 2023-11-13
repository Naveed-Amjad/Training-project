// // library imports
// // import { useState } from 'react';
// // component imports
// // import Button from 'react-bootstrap/Button';
// import Offcanvas from 'react-bootstrap/Offcanvas';
// import Input from '../input/index';
// // Redux imports

// // style imports
// import ArrowLeft from '../../assets/ArrowLeft.svg';
// import CloudArrow from '../../assets/CloudArrow.svg';
// import image1 from '../../assets/image1.png';
// import image2 from '../../assets/image2.png';
// import image3 from '../../assets/image3.png';
// import image4 from '../../assets/image4.png';
// import './editProduct.css'; // same editing stlye sheet is used here
// import { Button } from 'react-bootstrap';
// // import { Button } from 'react-bootstrap';

// const AddProduct = ({ id, onClose }) => {
//   //   const [show, setShow] = useState(false);

//   //   const handleClose = () => setShow(false);
//   //   const handleShow = () => setShow(true);

//   const handleClose = () => {
//     onClose();
//   };

//   // sizes array
//   const size = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
//   const color = ['#155724', '#AAA', '#1B1E21', '#231579', '#740F0F'];
//   return (
//     <>
//       <Offcanvas
//         className="edit_modal"
//         show={true}
//         onHide={handleClose}
//         placement="end"
//       >
//         {/* <Button variant="primary" onClick={handleClose} className="me-2">Edit Product</Button> */}
//         <Offcanvas.Header>
//           <Offcanvas.Title>
//             {' '}
//             {<img src={ArrowLeft} onClick={handleClose} />} Edit Product{' '}
//           </Offcanvas.Title>
//         </Offcanvas.Header>
//         <div className="line"></div>
//         <Offcanvas.Body>
//           <div className="upper_part">
//             <div className="upload_image">
//               <img src={CloudArrow} style={{ marginTop: '18px' }} />
//               <p className="text_style">
//                 Drag & drop files here <br></br> or
//               </p>
//               <Button style={{ height: '36px', width: '141px' }}>Browse</Button>
//             </div>
//             <div className="name_size">
//               <Input
//                 type="text"
//                 placeholder="Add product name"
//                 lable="Product Name"
//                 id="product_name"
//               />
//               <h6 style={{ marginTop: '16px' }}>
//                 Size
//               </h6>
//               <dive className="size_div">
//                 {size.map((size, index) => (
//                   <div className="size_box" key={index}>
//                     {' '}
//                     {size}{' '}
//                   </div>
//                 ))}
//               </dive>
//             </div>
//           </div>
//           {<p className="multiple">(multiple images can be uploaded)</p>}
//           <div className="lower_part">
//             <div className="pictures">
//               <div
//                 style={{ height: '50px', width: '50px', marginLeft: '20px' }}
//               >
//                 <img src={image1} />
//               </div>
//               <div style={{ height: '50px', width: '50px' }}>
//                 <img src={image2} />
//               </div>
//               <div
//                 style={{ height: '50px', width: '50px', marginLeft: '20px' }}
//               >
//                 <img src={image3} />
//               </div>
//               <div style={{ height: '50px', width: '50px' }}>
//                 <img src={image4} />
//               </div>
//               {/* <img src={image1} style={{ height: '50px', width: '50px' }}/>
//               <img src={image2}/>
//               <img src={image3}/>
//               <img src={image4}/> */}
//             </div>
//             <div className="color_price">
//               <h6 style={{ marginTop: '19px' }}>Color</h6>
//               <dive className="color_div">
//                 {color.map((color, index) => (
//                   <div
//                     style={{
//                       height: '30px',
//                       width: '40px',
//                       background: `${color}`,
//                       border: '1px solid #DFDFDF',
//                       padding: '10px 10px',
//                       marginLeft: '18px',
//                     }}
//                     key={index}
//                   >
//                     {' '}
//                   </div>
//                 ))}
//               </dive>
//               {/* <div className=''> */}
//               <Input
//                 type="number"
//                 placeholder="$00.00"
//                 lable="Price"
//                 id="price"
//               />
//               <Input
//                 type="number"
//                 placeholder="100"
//                 lable="Quantity"
//                 id="quantity"
//               />
//               <Button
//                 style={{
//                   height: '36px',
//                   width: '141px',
//                   marginLeft: '300px',
//                   marginTop: '20px',
//                 }}
//               >
//                 Save
//               </Button>
//               {/* </div> */}
//             </div>
//           </div>
//         </Offcanvas.Body>
//       </Offcanvas>
//     </>
//   );
// };

// export default AddProduct;
