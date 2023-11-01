// library imports
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// component imports
import { useState } from 'react';
import SelectAllComponent from './SelectAll';
import ShopingItem from './ShopingItem';
import SummaryCard from './SummaryCard';
import AddPayment from './AddPayment';
import CustomButton from '../../components/button'
import backArrow from '../../assets/ArrowLeft.svg';
// Redux imports

// style imports
import './style.css';

const ShopingBag = ({ heading, url }) => {
  const totalPrice = useSelector((state) => state.cartReducer.totalPrice);
  const [isEnabledbtn, setIsEnabledbtn] = useState(true);
  console.log('isEnabledbtn value = ', isEnabledbtn);
  const setState = () => {
    setIsEnabledbtn(false);
  }
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cartReducer)
  return (
    <div className="shoping_bag_main">
      <div className="shoping_bag">
        <div>
          <span className="shoping_bag_text">
            {<img src={backArrow} onClick={() => window.history.back()} />}{' '}
            {heading}
          </span>
          {url === 'checkout' ? (
            <SelectAllComponent
              setEnable={() => setState}
              url={url}
            />
          ) : (
            <SelectAllComponent url={url} />
          )}
          {items.length ? items?.map((item, index) => {
            return (
              <ShopingItem
                key={index}
                item={item}
              />
            );
          }) : ''}
          <div> {!items.length && <div style={{ margin: '100px 0px 0px 600px' }}>
            <h3 style={{ color: '#007BFF' }}>Cart is Empty</h3>
            <CustomButton onClick={() => navigate('/')} style={{ height: '40px', width: '130px', marginLeft: '20px' }} placeholder='Add Products' />
          </div>} </div>
        </div>
      </div>
      <div className="order_summary_div">
        {totalPrice ? <span style={{ fontSize: '20px' }}>Order Summary</span> : ''}
        {totalPrice ? <SummaryCard
          subTotal={{ Title: 'Sub Total', amount: '00.00' }}
          tax={{ Title: 'Tax', amount: '00.00' }}
          total={{ Title: 'Total', amount: '00.00' }}
          deliveryCharges={{ Title: 'Delivery Charges', amount: '00.00' }}
        />
          : ''}
        {window.location.pathname === '/checkout' && (
          <AddPayment />
        )}
      </div>
    </div>
  );
};

export default ShopingBag;
