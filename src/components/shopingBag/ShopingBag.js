// library imports

// component imports
import { useState } from 'react';
import SelectAllComponent from './SelectAll';
import ShopingItem from './ShopingItem';
import SummaryCard from './SummaryCard';
import AddPayment from './AddPayment';
// Redux imports

// style imports
import './style.css';

const ShopingBag = ({ heading, url }) => {
  // selecting all items in cart
  const [selectall, setSelectAll] = useState(false);
  const [selectOne, setSelectOne] = useState(false);
  const [isEnabledbtn, setIsEnabledbtn] = useState(true);
  // const setState = () => {
  //   setIsEnabledbtn(false);
  // }
  return (
    <div className="shoping_bag_main">
      <div className='shoping_bag'>
        <div>
          <span className='shoping_bag_text'>{heading}</span>
          {
            url === 'checkout'
              ? <SelectAllComponent
                setEnable={() => setIsEnabledbtn(false)}
                onChange={() => !selectall}
                onClick={() => setSelectAll(!selectall)}
                url={url}
              />
              : <SelectAllComponent url={url} />
          }
          {
            [1, 2, 3].map((item, index) => {
              return <ShopingItem key={index} checked={selectall} onChange={() => setSelectOne(!selectOne)} />
            })
          }
        </div>
        {/* <div>Order summary</div> */}
      </div>
      <div className='order_summary_div'>
        <span style={{ fontSize: '20px' }}>Order Summary</span>
        <SummaryCard subTotal={{ Title: 'Sub Total', amount: '00.00' }} tax={{ Title: 'Tax', amount: '00.00' }} total={{ Title: 'Total', amount: '00.00' }} deliveryCharges={{ Title: 'Delivery Charges', amount: '00.00' }} />
        {window.location.pathname === '/checkout' && <AddPayment isEnabledbtn={isEnabledbtn} />}
        {/* {console.log('url = ', window.location.pathname)} */}
      </div>
    </div>
  );
}

export default ShopingBag;
