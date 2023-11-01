// libray imports
import { useState } from 'react';
import { useSelector } from 'react-redux';
// component imports
import CustomButton from '../../components/button';
import DeliveryAddress from './DeliveryAddress';
import Trash from '../../assets/Trash.svg';
// Redux imports

// style imports
import './selectAll.css';

//
const SelectAllComponent = ({ onChange, onClick, url, setEnable }) => {
  const [addressModel, setAddressModel] = useState(false);
  // const [userAddressDetails, setUserAddressDetails] = useState(null);
  // console.log('🚀 ~ file: SelectAll.js:17 ~ SelectAllComponent ~ userAddressDetails:', userAddressDetails)
  const userAddressDetails = useSelector((state) => state.cartReducer.address);
  console.log(userAddressDetails, 'userAddressDetails')
  const handleClose = () => {
    setAddressModel(false);
  };
  const handleSetIsEnabled = () => {
    setEnable();
  };
  const text = 'Select all items';
  return (
    <div className="selectall_items">
      <div style={{ height: 'auto', width: '150px', alignItems: 'center' }}>
        {url === 'shopingbag' ? (
          <>
            {/* <input
              style={{ marginTop: '15px', marginLeft: '15px' }}
              type="checkbox"
              onChange={onChange}
              onClick={onClick}
            /> */}
            {/* {text} */}
          </>
        ) : (
          !userAddressDetails?.fullName ? <CustomButton
            onClick={() => setAddressModel(true)}
            placeholder="Add Delivery Address"
            style={{
              height: '40px',
              width: '237px',
              margin: '5px 0px 0px 20px',
            }}
          />
            : <div style={{ display: 'flex' }}>
              <div style={{ flexBasis: '25%', marginLeft: '70px' }}><h6>Name</h6>{`${userAddressDetails.fullName}`}</div>
              <div style={{ flexBasis: '25%', marginLeft: '70px' }}><h6>Contact</h6>{`${userAddressDetails.mobileNumber}`}</div>
              <div style={{ flexBasis: '25%', marginLeft: '70px' }}><h6>City</h6>{`${userAddressDetails.city}`}</div>
              <div style={{ flexBasis: '25%', marginLeft: '70px' }}><h6>Address</h6>{`${userAddressDetails.address}`}</div>
            </div>)}
        {addressModel && (
          <DeliveryAddress
            setIsEnable={handleSetIsEnabled}
            // setUserAddressDetails={setUserAddressDetails}
            onClose={handleClose}
          />
        )}
      </div>
      <div
        style={{
          height: '50px',
          width: '40px',
          textAlign: 'center',
          border: '',
        }}
      >
        {url === 'shopingbag' ? (
          // <img style={{ marginTop: '15px' }} src={ } />
          <></>
        ) : (
          <></>
        )}
      </div>
    </div >
  );
};

export default SelectAllComponent;
