// library imports
import { useSelector } from 'react-redux';
// component imports
import EditPencil from '../../assets/EditPencil.svg';

// style imports
import './style.css'
//
const PaymentCard = ({ image, cardTitle, paymentDetails }) => {
  const userName = useSelector((state) => state.cartReducer.address);
  const cardLastFourDigit = paymentDetails.cardNumber.slice(-4);
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
          {userName?.fullName}
        </div>
      </div>
      <div className='edit_button'>
        <img src={EditPencil} />
      </div>
    </div>
  );
}

export default PaymentCard;
