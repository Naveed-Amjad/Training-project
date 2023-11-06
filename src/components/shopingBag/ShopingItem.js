/* eslint-disable no-unused-vars */
// libray imports
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { notification } from 'antd';
// component imports
import DeleteProduct from '../products/deleteProduct';
// import image422 from '../../assets/image422.jpg';
import Trash from '../../assets/Trash.svg'
// import ColorEllipse from '../utils/ColorEllipse';
// Redux imports
import { removeItem, increaseQuantity } from '../../redux/slices/cartSlice';
// style imports
import './shopingItem.css';
//
const ShopingItem = ({ checked, item }) => {
  const dispatch = useDispatch()
  console.log('IETM STOCK + ', item?.product?.stock);
  const [deleteItemVisible, setDeleteItemVisible] = useState(false);

  const handleDecreaseQuantity = (item) => {
    if (item?.quantity > 1) {
      dispatch(removeItem({ item, quantity: 1 }))
    } else {
      const disableDecreaseBtn = document.getElementById('decbtn');
      disableDecreaseBtn.disabled = true;
    }
  }
  const handleIncreaseQuantity = (item) => {
    if (item?.product?.stock === item?.quantity) {
      const disableDecreaseBtn = document.getElementById('increasebtn');
      disableDecreaseBtn.disabled = true;
      notification.warning({
        message: 'warning',
        description: `Currently we have ${item?.quantity} products in stock`,
        type: 'success',
        duration: 2,
      });
    } else {
      dispatch(increaseQuantity({ item, quantity: 1 }))
    }
  }
  console.log('ITEM = ', item);
  return (
    <div className="shoping_item">
      <div className='checkbox-icon'>
        {/* <input style={{ marginTop: '50px' }} type='checkbox' checked={checked} onChange={() => setSelect(!select)} /> */}
      </div>
      <div className='img_and_details'>
        <div>
          {console.log('\n\n item in cart ', item?.product?.images?.[0][0])}
          <img style={{ height: '128px', width: '180px', padding: '6px 6px' }} src={`http://localhost:4009/${item?.product?.images?.[0][0]}`} />
        </div>
        <div>
          <p>{item?.product?.description}</p>
          Price:
          <div style={{ marginTop: '-15px' }}>
            <span style={{ marginLeft: '100px' }}>{item?.product?.price} </span>
          </div>
        </div>
      </div>
      <div className='quantity_div'>
        <div style={{ height: '20px', width: '30px', marginLeft: '170px' }}>
          {<img src={Trash} onClick={() => setDeleteItemVisible(true)} />}
          {deleteItemVisible && <DeleteProduct item={item} onClose={() => setDeleteItemVisible(false)} onDelete={() => setDeleteItemVisible(false)} />}
        </div>
        <div style={{ marginTop: '30px', marginLeft: '10px' }}>Quantity </div>
        <div style={{ height: '42px', width: '180px', marginTop: '10px', marginLeft: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <div className='quantity_sign' id='decbtn' onClick={() => handleDecreaseQuantity(item)}>-</div>
          <div className='quantity_count'>{item?.quantity}</div>
          <div className='quantity_sign' id='increasebtn' onClick={() => handleIncreaseQuantity(item)}>+</div>
        </div>
      </div>
    </div>
  );
}

export default ShopingItem;
