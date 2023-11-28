// library imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Offcanvas } from 'react-bootstrap';
// component imports
import PaymentCard from '../paymentCard';
import MasterCard from '../../assets/Group.svg';
import CustomInput from '../../components/input';
import CustomButton from '../button';
import VisaCard from '../../assets/visa.svg';
// Redux imports
import { paymentDetails } from '../../redux/slices/cartSlice';
import { AddCustomer, GetUserCards } from '../../redux/slices/payment-slice';
// style imports

//
const ChangePaymentMethodModel = ({
  onClose,
  setPaymentDetails,
  setCardIndex,
  setCardNumberForImage
}) => {
  const [cardNumber, setCardNumber] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [country, setCountry] = useState();
  const [selectedCard, setSelectedCard] = useState();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.authReducer?.email);

  const stripeId = useSelector((state) => state.paymentReducer?.customerId);

  const userCards = useSelector(
    (state) => state.paymentReducer?.userCards?.data
  );
  console.log('\n\n userCards ', userCards);

  useEffect(() => {
    dispatch(GetUserCards({ stripeId }));
  }, [stripeId]);

  const cardNumberHandler = (e) => {
    setCardNumber(e.target.value);
  };
  const expiryDateHandler = (e) => {
    setExpiryDate(e.target.value);
  };
  const countryHandler = (e) => {
    setCountry(e.target.value);
  };

  const onSaveHandler = () => {
    dispatch(paymentDetails({ cardNumber, expiryDate, country }));
    dispatch(
      AddCustomer({
        email,
        cvc: '1234',
        cardNumber,
        expiraryMonth: '12',
        expiraryYear: '25',
      })
    );
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
        <Offcanvas.Header>
          <Offcanvas.Title> Add Payment Method </Offcanvas.Title>
        </Offcanvas.Header>
        <div className="line"></div>
        <div className="d-flex">
          {userCards?.length &&
            userCards.map((card, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedCard(card.brand);
                    setCardIndex(index);
                    setCardNumberForImage(card?.last4);
                    console.log('\n CARD = ', card);
                    console.log('\n\n userCards?.[0]?.brand ', userCards?.[0]?.brand)
                  }}
                >
                  <PaymentCard
                    isSelected={selectedCard}
                    card={card}
                    cardNumber={card?.last4}
                    image={userCards?.[0]?.brand === 'Visa' ? VisaCard : MasterCard}
                    cardTitle={card.brand === 'Visa' ? 'Visa Card' : 'Master Card'}
                    imageReq={false}
                  />
                </div>
              );
            })}
        </div>
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
          <CustomInput
            type="text"
            placeholder="Country"
            lable="Country"
            style={style}
          />
          {!(cardNumber && expiryDate && country) ? (
            <CustomButton
              isEnabledbtn={true}
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

export default ChangePaymentMethodModel;
