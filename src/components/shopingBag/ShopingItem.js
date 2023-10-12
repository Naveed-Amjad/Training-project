/* eslint-disable no-unused-vars */
// libray imports

// component imports
import DeleteProduct from '../products/deleteProduct';
import image422 from '../../assets/image422.jpg';
import Trash from '../../assets/Trash.svg'
// import ColorEllipse from '../utils/ColorEllipse';
// Redux imports

// style imports
import './shopingItem.css';
import { useEffect, useState } from 'react';
//
const ShopingItem = ({ checked }) => {
  const [select, setSelect] = useState(checked);
  const [deleteItemVisible, setDeleteItemVisible] = useState(false);
  useEffect(() => {
    checked = select;
    console.log('checked', checked);
    console.log('select', select);
  }, [select])
  return (
    <div className="shoping_item">
      <div className='checkbox-icon'>
        <input style={{ marginTop: '50px' }} type='checkbox' checked={checked} onChange={() => setSelect(!select)} />
      </div>
      <div className='img_and_details'>
        <div>
          <img style={{ height: '128px', width: '180px', padding: '6px 6px' }} src={image422} />
        </div>
        <div>
          <p>Cargo Trousers for Men - 6 Pocket Trousers - 6 Pocket Cargo Trousers in all Colors - Cargo Trouser</p>
          <div className='color_circle'>
            <span style={{ marginLeft: '100px' }}>XL</span>
          </div>
        </div>
      </div>
      <div className='quantity_div'>
        <div style={{ height: '20px', width: '30px', marginLeft: '170px' }}>
          {<img src={Trash} onClick={() => setDeleteItemVisible(true)} />}
          {deleteItemVisible && <DeleteProduct onClose={() => setDeleteItemVisible(false)} onDelete={() => setDeleteItemVisible(false)} />}
        </div>
        <div style={{ marginTop: '30px', marginLeft: '10px' }}>Quantity </div>
        <div style={{ height: '42px', width: '180px', marginTop: '10px', marginLeft: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <div className='quantity_sign'>-</div>
          <div className='quantity_count'>2</div>
          <div className='quantity_sign'>+</div>
        </div>
      </div>
    </div>
  );
}

export default ShopingItem;
