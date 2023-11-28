// library imports
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// component imports
import CustomButton from '../../components/button'
// Redux imports

// style imports
import './summaryCard.css';
// const SummaryCard = ({ subTotal, tex, total, deliveryFee }) => {
const SummaryCard = (props) => {
  const totalPrice = useSelector((state) => state.cartReducer.totalPrice);
  // const xyz = [props.total, props.subTotal, props.tax, props.deliveryCharges];
  const tax = 0.2;
  const deliveryCharges = parseFloat(200);
  const taxAmount = parseFloat((totalPrice * tax).toFixed(2));
  const nav = useNavigate();
  return (
    totalPrice ? <div className="summary_card">
      <div className='xyz'>
        <div style={{ margin: '10px 0px 0px 20px' }}> Sub Total</div>
        <div style={{ marginRight: '20px', marginTop: '10px' }}>{totalPrice}</div>
      </div>
      <div className='xyz'>
        <div style={{ margin: '10px 0px 0px 20px' }}>Tax</div>
        <div style={{ marginRight: '20px', marginTop: '10px' }}>{taxAmount}</div>
      </div>
      {
        window.location.pathname !== '/shopingbag'
          ? <div className='xyz'>
            <div style={{ margin: '10px 0px 0px 20px' }}>Delivery charges</div>
            <div style={{ marginRight: '20px', marginTop: '10px' }}>{deliveryCharges}</div>
          </div>
          : ''}
      <div className='xyz'>
        <div style={{ margin: '10px 0px 0px 20px' }}>Total</div>
        <div style={{ marginRight: '20px', marginTop: '10px' }}>{deliveryCharges + taxAmount + totalPrice}</div>
      </div>

      <CustomButton onClick={() => nav('/checkout')} placeholder="Proceed to Checkout" style={{ height: '46px', width: '350px', margin: '50px 0px 0px 20px' }} />
    </div>
      : '');
}

export default SummaryCard;
