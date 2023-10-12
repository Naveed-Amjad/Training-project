// library imports
import { useState } from 'react';
// component imports
import CustomButton from '../button';
import PlusSign from '../../assets/PlusSign.svg';
import PaymentMethodModel from './PaymentMethodModel';
import PaymentCard from '../paymentCard';
import MasterCard from '../../assets/Group.svg';
// style imports
import './addpayment.css';

//
const AddPayment = ({ isEnabledbtn }) => {
  const [paymentModel, setPaymentModel] = useState(false);
  const [showPaymentCard, setShowPaymentCard] = useState(false);
  // const [isDisabled, setIsDisabled] = useState(true);
  // console.log('showPaymentCard = ', showPaymentCard);
  // console.log('isdisabled = ', isDisabled);
  // console.log('setIsDisabled in addPayment ', setIsDisabled);
  // console.log(paymentModel);
  const handleClose = () => {
    setPaymentModel(false);
  };
  //
  const handleCardShow = () => {
    setShowPaymentCard(true);
  };
  const [color, setColor] = useState();
  // console.log('color', color);
  return (
    <div className="add_payment">
      <span style={{ fontSize: '20px' }}>Select Payment Method</span>
      <div className="add_new_div">
        {showPaymentCard ? (
          <PaymentCard
            image={MasterCard}
            cardTitle="Master Card"
            cardNumber="7562"
            cardName="Naveed Amjad"
          />
        ) : (
          <CustomButton
            onclick={() => {
              setColor('red');
              setPaymentModel(true);
            }}
            style={{
              height: '50px',
              width: '119px',
              margin: '20px 0px 20px 40px',
              backgroundColor: 'white',
              color: color ? 'red' : '#868E96',
              border: '',
            }}
            isEnabledbtn={isEnabledbtn}
            placeholder={
              <span>
                <img style={{ marginRight: '5px' }} src={PlusSign} />
                Add New
              </span>
            }
          />
        )}
        {paymentModel && (
          <PaymentMethodModel onClose={handleClose} onclick={handleCardShow} />
        )}
      </div>
      <div>
        <CustomButton
          style={{
            height: '46px',
            width: '396px',
            margin: '20px 0px 0px 0px',
            backgroundColor: '#DEE2E6',
            color: '#6C757D',
            border: 'none',
          }}
          placeholder="Place Order"
        />
      </div>
    </div>
  );
};

export default AddPayment;
