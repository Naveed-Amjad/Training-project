// library imports
import { useNavigate } from 'react-router-dom';
// component imports
import CustomButton from '../../components/button'
// Redux imports

// style imports
import './summaryCard.css';
//
// const SummaryCard = ({ subTotal, tex, total, deliveryFee }) => {
const SummaryCard = (props) => {
  const xyz = [props.total, props.subTotal, props.tax, props.deliveryCharges];
  const nav = useNavigate();
  return (
    <div className="summary_card">
      {
        xyz.map((item, index) => {
          return (item && <div key={index} className='summaryCard_item'>
            <div>
              {`${item.Title}`}
            </div>
            <div>
              {`$${item.amount}`}
            </div>
          </div>)
        })
      }
      <CustomButton onclick={() => nav('/checkout')} placeholder="Proceed to Checkout" style={{ height: '46px', width: '350px', margin: '20px 0px 0px 20px' }} />
    </div>
  );
}

export default SummaryCard;
