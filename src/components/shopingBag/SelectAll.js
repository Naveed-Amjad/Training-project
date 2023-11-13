// libray imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// component imports
import CustomButton from '../../components/button';
import DeliveryAddress from './DeliveryAddress';
import ChangeAddress from '../utils/change-address';
import Trash from '../../assets/Trash.svg';
// Redux imports
import { getUserAddress } from '../../redux/slices/address-slice';
// style imports
import './selectAll.css';

//
const SelectAllComponent = ({ onChange, onClick, url, setEnable, setUserAddress }) => {
  const [addressModel, setAddressModel] = useState(false);
  const [changeAddressModel, setChangeAddressModel] = useState(false);
  const [index, setIndex] = useState();
  const id = useSelector((state) => state.authReducer?.id);
  const userAddressDetails = useSelector((state) => state.addressReducer.userAddress);
  const handleClose = () => {
    setAddressModel(false);
  };
  const handleSetIsEnabled = () => {
    setEnable();
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAddress({ userId: id }))
  }, [])

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
          !userAddressDetails[0]?.fullName ? <CustomButton
            onClick={() => setAddressModel(true)}
            placeholder="Add Delivery Address"
            style={{
              height: '40px',
              width: '237px',
              margin: '5px 0px 0px 20px',
            }}
          />
            : <div style={{ display: 'flex' }}>
              <div style={{ flexBasis: '25%', marginLeft: '70px' }}><h6>Name</h6>{`${userAddressDetails[index || 0]?.fullName}`}</div>
              <div style={{ flexBasis: '25%', marginLeft: '70px' }}><h6>Contact</h6>{`${userAddressDetails[index || 0]?.phoneNumber}`}</div>
              <div style={{ flexBasis: '25%', marginLeft: '70px' }}><h6>City</h6>{`${userAddressDetails[index || 0]?.city}`}</div>
              <div style={{ flexBasis: '25%', marginLeft: '70px' }}><h6>Address</h6>{`${userAddressDetails[index || 0]?.address}`}</div>
              <div style={{ margin: '20px 0px 0px 160px' }}>
                <CustomButton onClick={() => setChangeAddressModel(true)} style={{ height: '35px', width: '100px', backgroundColor: 'white', color: 'blue' }} placeholder='Change' />
              </div>
            </div>)}
        {addressModel && (
          <DeliveryAddress
            setIsEnable={handleSetIsEnabled}
            // setUserAddressDetails={setUserAddressDetails}
            onClose={handleClose}
          />
        )}
        {changeAddressModel && <ChangeAddress setUserAddress={setUserAddress} indexSelected={index} setIndex={setIndex} userAddressDetails={userAddressDetails} onClose={() => setChangeAddressModel(false)} />}
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
