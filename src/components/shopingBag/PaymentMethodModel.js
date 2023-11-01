// library imports

// component imports
import { Offcanvas } from 'react-bootstrap';
import CustomInput from '../../components/input';
import CustomButton from '../button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// Redux imports
import { paymentDetails } from '../../redux/slices/cartSlice';
// style imports

//
const PaymentMethodModel = ({ onClose, setPaymentDetails }) => {
  const [cardNumber, setCardNumber] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [country, setCountry] = useState();

  const cardNumberHandler = (e) => {
    setCardNumber(e.target.value);
  };
  const expiryDateHandler = (e) => {
    setExpiryDate(e.target.value);
  };
  const countryHandler = (e) => {
    setCountry(e.target.value);
  };
  const dispatch = useDispatch();
  const onSaveHandler = () => {
    dispatch(paymentDetails({ cardNumber, expiryDate, country }));
  };
  const style = { width: '664px', marginTop: '1px' };
  const style1 = { width: '300px', marginTop: '1px' };
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
          <Offcanvas.Title> Add Payment Method </Offcanvas.Title>
        </Offcanvas.Header>
        <div className="line"></div>
        <Offcanvas.Body>
          <CustomInput
            type="text"
            placeholder="Card number"
            lable="Card number"
            style={style}
            onChange={cardNumberHandler}
          />
          <div className="d-flex justify-content-between">
            <CustomInput
              type="tel"
              placeholder="MM/YY"
              lable="Expiry date"
              style={style1}
              onChange={expiryDateHandler}
            />
            <CustomInput
              type="text"
              placeholder="CVC"
              lable="CVC"
              style={style1}
              onChange={countryHandler}
            />
          </div>
          {/* <div className='d-flex justify-content-between'>
            <CustomInput type='text' placeholder='Province' lable='Province' style={style1} />
            <CustomInput type='text' placeholder='City' lable='City' style={style1} />
          </div> */}
          <CustomInput
            type="text"
            placeholder="Country"
            lable="Country"
            style={style}
          />
          {!(cardNumber && expiryDate && country) ? (
            <CustomButton
              isEnabledbtn={true}
              // onClick={() => {
              //   onClose();
              //   onClick();
              //   onSaveHandler();
              // }}
              style={{
                height: '46px',
                width: '161px',
                margin: '50px 0px 0px 500px',
              }}
              placeholder="Save Payment"
            />
          ) : (
            <CustomButton
              isEnabledbtn={false}
              onClick={() => {
                onClose();
                onSaveHandler();
              }}
              style={{
                height: '46px',
                width: '161px',
                margin: '50px 0px 0px 500px',
              }}
              placeholder="Save Payment"
            />
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default PaymentMethodModel;
