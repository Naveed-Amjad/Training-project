// library imports
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Offcanvas } from 'react-bootstrap';
// component imports
import CustomInput from '../../components/input';
import CustomButton from '../button';
import CustomFormText from '../utils/formText';
// Redux imports
import { addAddress } from '../../redux/slices/cartSlice';
// style imports

//
const DeliveryAddress = ({ onClose }) => {
  const [fullName, setFullName] = useState();
  const [fullNameError, setFullNameError] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [mobileNumberError, setMobileNumberError] = useState();
  const [country, setCountry] = useState();
  const [countryError, setCountryError] = useState();
  const [province, setProvince] = useState();
  const [provinceError, setProvinceError] = useState();
  const [city, setCity] = useState();
  const [cityError, setCityError] = useState();
  const [userAddress, setAddress] = useState();
  const [addressError, setAddressError] = useState();

  const { address } = useSelector((state) => state.cartReducer)
  console.log('Address from cart  = ', address);
  const style = { width: '664px', marginTop: '1px' };
  const style1 = { width: '300px', marginTop: '1px' };

  const dispatch = useDispatch();

  const handleFullName = (e) => {
    setFullName(e.target.value);
  }
  const handlemobileNumber = (e) => {
    setMobileNumber(e.target.value)
  }
  const handlecountry = (e) => {
    setCountry(e.target.value)
  }
  const handleprovince = (e) => {
    setProvince(e.target.value)
  }
  const handlecity = (e) => {
    setCity(e.target.value)
  }
  const handleaddress = (e) => {
    setAddress(e.target.value)
  }

  const handleSaveAddress = () => {
    // let error = false;
    // console.log('XYZ');
    // if (fullName && fullNameError) setFullNameError('');
    // console.log('🚀 ~ file: DeliveryAddress.js:74 ~ handleSaveAddress ~ phoneNumberPattern.test(mobileNumber):', phoneNumberPattern.test(mobileNumber))
    // if (phoneNumberPattern.test(mobileNumber)) {
    //   setMobileNumberError('');
    // }
    // if (country && countryError) setCountryError('');
    // if (province && provinceError) setProvinceError('');
    // if (city && cityError) setCityError('');
    // if (address && addressError) setAddressError('');

    if (!fullName) {
      setFullNameError('Please enter full name');
      // error = true
    } else if (!mobileNumber) {
      setMobileNumberError('Please enter valid mobile number');
      // error = true
    } else if (!country) {
      setCountryError('Please enter country name');
      // error = true
    } else if (!province) {
      setProvinceError('Please enter province error');
      // error = true
    } else if (!city) {
      setCityError('Please enter city name');
      // error = true
    } else if (!userAddress) {
      setAddressError('Please enter address details');
      // error = true
      console.log('Address is missing');
    } else {
      dispatch(addAddress({
        fullName,
        mobileNumber,
        country,
        province,
        city,
        address: userAddress
      }))
      onClose();
    }
  }

  return (
    <div>
      <Offcanvas
        className="edit_modal"
        show={true}
        onHide={() => onClose()}
        placement="end"
      >
        {/* <Button variant="primary" onClick={handleClose} className="me-2">Edit Product</Button> */}
        <Offcanvas.Header>
          <Offcanvas.Title> Add Delivery Address </Offcanvas.Title>
        </Offcanvas.Header>
        <div className="line"></div>
        <Offcanvas.Body>
          <CustomInput
            type="text"
            placeholder="Full name"
            lable="Full name"
            style={style}
            onChange={handleFullName}
          />
          {!fullName && <CustomFormText textMsg={fullNameError} />}
          <div className="d-flex justify-content-between">
            <CustomInput
              type="tel"
              placeholder="Mobile #"
              lable="Mobile #"
              style={style1}
              onChange={handlemobileNumber}
            />
            {/* {(!mobileNumber) && <CustomFormText textMsg={mobileNumberError} />} */}
            {!mobileNumber && <CustomFormText textMsg={mobileNumberError} />}
            <CustomInput
              type="text"
              placeholder="Countary"
              lable="Countary"
              style={style1}
              onChange={handlecountry}
            />
            {!country && <CustomFormText textMsg={countryError} />}
          </div>
          <div className="d-flex justify-content-between">
            <CustomInput
              type="text"
              placeholder="Province"
              lable="Province"
              style={style1}
              onChange={handleprovince}
            />
            {!province && <CustomFormText textMsg={provinceError} />}
            <CustomInput
              type="text"
              placeholder="City"
              lable="City"
              style={style1}
              onChange={handlecity}
            />
            {!city && <CustomFormText textMsg={cityError} />}
          </div>
          <CustomInput
            type="text"
            placeholder="Address"
            lable="Address"
            style={style}
            onChange={handleaddress}
          />
          {!address && <CustomFormText textMsg={addressError} />}
          {!(fullName && mobileNumber && country && province && city && userAddress) ? <CustomButton
            onClick={() => {
              onClose();
              // setIsEnable();
              handleSaveAddress();
            }}
            isEnabledbtn={true}
            style={{
              height: '46px',
              width: '161px',
              margin: '50px 0px 0px 500px',
            }}
            placeholder="Save"
          />
            : <CustomButton
              onClick={() => {
                onClose();
                handleSaveAddress();
              }}
              isEnabledbtn={false}
              style={{
                height: '46px',
                width: '161px',
                margin: '50px 0px 0px 500px',
              }}
              placeholder="Save"
            />
          }
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default DeliveryAddress;
