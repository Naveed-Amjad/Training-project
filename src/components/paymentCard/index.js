// library imports
import { useSelector } from 'react-redux';
// component imports
import EditPencil from '../../assets/EditPencil.svg';
import ChangePaymentMethodModel from '../payment/change-payment-card';
// style imports
import './style.css'
import { useState } from 'react';
//
const PaymentCard = ({ image, cardTitle, paymentDetails, userAddress }) => {
  const [changeModel, setChangeModel] = useState(false);
  const userName = useSelector((state) => state.addressReducer.userAddress);
  const cardLastFourDigit = paymentDetails.cardNumber.slice(-4);
  console.log('\n\n\n userAddres in PaymentCard ', userAddress);
  return (
    <div className='payment_card_div'>
      <div className='payment_card'>
        <div>
          <img style={{ margin: '20px 0px 0px 20px' }} src={image} /> {cardTitle}
        </div>
        <div className='d-flex'>
          <div style={{ margin: '14px 0px 0px 20px' }}>****</div>
          <div style={{ margin: '14px 0px 0px 50px' }}>****</div>
          <div style={{ margin: '14px 0px 0px 40px' }}>****</div>
          <div style={{ margin: '14px 0px 0px 40px' }}>{cardLastFourDigit}</div>
        </div>
        <div className='d-flex'>
          <div style={{ margin: '10px 0px 0px 20px' }}>{paymentDetails.expiryDate}</div>
          <div style={{ margin: '10px 0px 0px 50px' }}>{paymentDetails.expiryDate}</div>
        </div>
        <div style={{ margin: '10px 0px 0px 20px' }}>
          {userAddress?.fullName}
        </div>
      </div>
      <div className='edit_button'>
        <img src={EditPencil} onClick={() => setChangeModel(true)} />
      </div>
      {changeModel && <ChangePaymentMethodModel onClose={() => setChangeModel(false)} />}
    </div>
  );
}

export default PaymentCard;
