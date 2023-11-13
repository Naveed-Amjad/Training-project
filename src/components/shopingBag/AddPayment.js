// library imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// component imports
import CustomButton from '../button';
import PlusSign from '../../assets/PlusSign.svg';
import PaymentMethodModel from './PaymentMethodModel';
import PaymentCard from '../paymentCard';
import MasterCard from '../../assets/Group.svg';
import OrderPlaced from '../utils/OrderPlaced';
// Redux imports
import { PlaceOrder } from '../../redux/slices/orderSlice';
import { clearCart } from '../../redux/slices/cartSlice';
import { DeductCharges } from '../../redux/slices/payment-slice';
// style imports
import './addpayment.css';
//
const AddPayment = ({ userAddress }) => {
  const [paymentModel, setPaymentModel] = useState(false);
  const [showPaymentCard, setShowPaymentCard] = useState(false);
  // const [paymentDetails, setPaymentDetails] = useState({});
  const [showOrderPlacedModel, setShowOrderPlacedModel] = useState(false);
  const userId = localStorage.getItem('id');
  const userName = localStorage.getItem('name');
  const { items, totalPrice, totalQuantity } = useSelector((state) => state.cartReducer)
  // const address = useSelector((state) => state.addressReducer.userAddress)
  const { success, error } = useSelector((state) => state.orderReducer);
  const { paymentDetails } = useSelector((state) => state.cartReducer)
  const email = useSelector((state) => state.authReducer?.email);
  const amount = useSelector((state) => state.cartReducer?.totalPrice);
  const { cardId, customerId } = useSelector((state) => state.paymentReducer);
  const dispatch = useDispatch();
  const handleClose = () => {
    setPaymentModel(false);
  };
  // console.log('ADDRESS = ', address[0]);
  //
  const handleCardShow = () => {
    setShowPaymentCard(true);
  };
  const handleorder = () => {
    dispatch(PlaceOrder({ items, userId, userName, totalAmount: totalPrice, totalQuantity, shippingAddress: userAddress, email, amount, cardId, customerId }));
  }

  useEffect(() => {
    if (success && !error) {
      dispatch(clearCart());
    }
  }, [success, error]);

  return (
    <div className="add_payment">
      {items?.length ? <span style={{ fontSize: '20px' }}>Select Payment Method</span> : ''}
      <div className="add_new_div">
        {(items?.length && paymentDetails?.cardNumber) ? (
          <PaymentCard
            image={MasterCard}
            cardTitle="Master Card"
            paymentDetails={paymentDetails}
            userAddress={userAddress}
          />
        ) : (
          !userAddress?.fullName ? <CustomButton
            onClick={() => {
              setPaymentModel(true);
            }}
            style={{
              height: '50px',
              width: '199px',
              margin: '20px 0px 20px 40px',
              backgroundColor: 'white',
              color: '#868E96',
              border: '',
            }}
            isEnabledbtn={true}
            placeholder={
              <span>
                <img style={{ marginRight: '5px' }} src={PlusSign} />
                Add Payment
              </span>
            }
          />

            : (items?.length ? <CustomButton
              onClick={() => {
                setPaymentModel(true);
              }}
              style={{
                height: '50px',
                width: '199px',
                margin: '20px 0px 20px 40px',
                backgroundColor: 'white',
                color: userAddress ? '#007BFF' : '#868E96',
                border: '',
              }}
              isEnabledbtn={false}
              placeholder={
                <span>
                  <img style={{ marginRight: '5px' }} src={PlusSign} />
                  Add Payment
                </span>
              }
            /> : ''))}
        {paymentModel && (
          <PaymentMethodModel onClose={handleClose} onClick={handleCardShow} />
        )}
      </div>
      <div>
        {!paymentDetails?.cardNumber ? <CustomButton
          style={{
            height: '46px',
            width: '396px',
            margin: '20px 0px 0px 0px',
            backgroundColor: '#DEE2E6',
            color: '#6C757D',
            border: 'none',
          }}
          isEnabledbtn={true}
          placeholder="Place Order"
          onClick={() => {
            setShowOrderPlacedModel(true);
            handleorder();
          }}
        />
          : (items?.length && cardId ? <CustomButton
            style={{
              height: '46px',
              width: '396px',
              margin: '20px 0px 0px 0px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
            }}
            isEnabledbtn={false}
            placeholder="Place Order"
            onClick={() => {
              setShowOrderPlacedModel(true);
              handleorder();
            }}
          /> : '')}
      </div>
      {showOrderPlacedModel && <OrderPlaced />}
    </div>
  );
};

export default AddPayment;
