// library imports
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// component imports
import EditPencil from '../../assets/EditPencil.svg';
import MasterCard from '../../assets/Group.svg';
import VisaCard from '../../assets/visa.svg';
import ChangePaymentMethodModel from '../payment/change-payment-card';
// redux imports
import { GetUserCards } from '../../redux/slices/payment-slice';
// style imports
import './style.css'

//
const PaymentCard = ({ image, card, cardTitle, paymentDetails, userAddress, imageReq, isSelected }) => {
  const [changeModel, setChangeModel] = useState(false);
  const [cardIndex, setCardIndex] = useState();
  const [cardNumber, setCardNumber] = useState(card?.last4);
  console.log('🚀 ~ file: index.js:19 ~ PaymentCard ~ cardNumber:', cardNumber)

  const userName = useSelector((state) => state.addressReducer.userAddress);
  const cardLastFourDigit = paymentDetails?.cardNumber.slice(-4);

  const stripeId = useSelector((state) => state.paymentReducer?.customerId);

  const userCards = useSelector((state) => state.paymentReducer?.userCards?.data);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUserCards({ stripeId }));
  }, [stripeId])
  return (
    <div className={isSelected === card?.brand ? 'payment_card_div outline' : 'payment_card_div'}>
      <div className='payment_card'>
        <div>
          {console.log('\n\n card number == ', cardNumber, cardNumber === '4242')}
          <img style={{ margin: '20px 0px 0px 20px' }} src={cardNumber ? cardNumber === '4242' ? VisaCard : MasterCard : image} /> {cardTitle}
        </div>
        <div className='d-flex'>
          <div style={{ margin: '14px 0px 0px 20px' }}>****</div>
          <div style={{ margin: '14px 0px 0px 50px' }}>****</div>
          <div style={{ margin: '14px 0px 0px 40px' }}>****</div>
          <div style={{ margin: '14px 0px 0px 40px' }}>{userCards?.[cardIndex]?.last4 || (cardLastFourDigit || card?.last4)}</div>
        </div>
        <div className='d-flex'>
          <div style={{ margin: '10px 0px 0px 20px' }}>{paymentDetails?.expiryDate}</div>
          <div style={{ margin: '10px 0px 0px 50px' }}>{paymentDetails?.expiryDate}</div>
        </div>
        <div style={{ margin: '10px 0px 0px 20px' }}>
          {userAddress?.fullName}
        </div>
      </div>
      <div className='edit_button'>
        {imageReq && <img src={EditPencil} onClick={() => setChangeModel(true)} />}
      </div>
      {changeModel && <ChangePaymentMethodModel setCardNumberForImage={setCardNumber} setCardIndex={setCardIndex} onClose={() => setChangeModel(false)} />}
    </div>
  );
}

export default PaymentCard;
