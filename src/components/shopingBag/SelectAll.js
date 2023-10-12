// libray imports
import { useState } from 'react';
// component imports
import CustomButton from '../../components/button';
import DeliveryAddress from './DeliveryAddress';
import Trash from '../../assets/Trash.svg'
// Redux imports

// style imports
import './selectAll.css';

//
const SelectAllComponent = ({ onChange, onClick, url, setEnable }) => {
  const [addressModel, setAddressModel] = useState(false);
  const handleClose = () => {
    setAddressModel(false);
  }
  const handleSetIsEnabled = () => {
    setEnable();
  }
  const text = 'Select all items';
  return (
    <div className="selectall_items">
      <div style={{ height: '50px', width: '150px', alignItems: 'center' }}>
        {url === 'shopingbag' ? (<><input style={{ marginTop: '15px', marginLeft: '15px' }} type='checkbox' onChange={onChange} onClick={onClick} />{text}</>) : <CustomButton onclick={() => setAddressModel(true)} placeholder="Add Delivery Address" style={{ height: '40px', width: '237px', margin: '5px 0px 0px 20px' }} />}
        {addressModel && <DeliveryAddress setIsEnable={handleSetIsEnabled} onClose={handleClose} />}
      </div>
      <div style={{ height: '50px', width: '40px', textAlign: 'center', border: '' }}>
        {url === 'shopingbag' ? <img style={{ marginTop: '15px' }} src={Trash} /> : <></>}
      </div>
    </div>
  );
}

export default SelectAllComponent;
