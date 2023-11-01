// library imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
// component imports
import { Table, Badge } from 'react-bootstrap';
import Arrow from '../../assets/Arrow.svg';
import ArrowUpRright from '../../assets/ArrowUpright.svg';
import AdminOrderModel from '../../components/orders/adminOrderModel';
// import Badge from 'react-bootstrap/Badge';
// redux imports
import { GetOrders, DeliverOrder } from '../../redux/slices/orderSlice';
// style imports
import './style.css';

// component

const calculateTotal = (items) => {
  let totalQuantity = 0;
  let totalAmount = 0;
  for (const item of items) {
    const quantity = item.totalQuantity;
    const amount = item.totalAmount;
    totalQuantity = totalQuantity + quantity;
    totalAmount = totalAmount + amount;
  }
  console.log('totalQuantity = ', totalQuantity);
  return { totalQuantity, totalAmount };
};

const Orders = () => {
  const [searchById, setSearchById] = useState();
  const [showOrderDeatils, setOrderDetails] = useState(false);
  const [detailsItem, setDetailsItem] = useState();
  const [state, setState] = useState(0)
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orderReducer.orders);
  const { totalQuantity, totalAmount } = calculateTotal(orders);
  console.log('totalQuantity = ', totalQuantity);

  useEffect(() => {
    dispatch(GetOrders(searchById));
  }, [searchById]);

  const handleSearch = debounce((e) => {
    setSearchById(e.target.value);
  }, 1000);

  const handleDeliverOrder = (orderId) => {
    console.log('IDDDDD = ', orderId);
    dispatch(DeliverOrder({ orderId })).then(() => dispatch(GetOrders()));
  }
  console.log('searchById = ', searchById);
  // heading
  const heading = [
    {
      Text: 'Date',
      hasArrow: true,
      hasHash: false,
    },
    {
      Text: 'Order',
      hasArrow: false,
      hasHash: true,
    },
    {
      Text: 'User',
      hasArrow: true,
      hasHash: false,
    },
    {
      Text: 'Product(s)',
      hasArrow: true,
      hasHash: false,
    },
    {
      Text: 'Amount',
      hasArrow: true,
      hasHash: false,
    },
    {
      Text: 'Status',
      hasArrow: false,
      hasHash: false,
    },
    {
      Text: 'Action',
      hasArrow: false,
      hasHash: false,
    },
  ];
  // data
  // const data = [{ date: '11 Sep 2023' }, { order: '342599' }, { user: 'Jackson Smith' }, { products: '45' }, { amount: '$00.00' }, { status: 'Paid' }, { action: 'Mark as delivered' }]
  // component return
  return (
    <div>
      <div className="total_container">
        <div className="total_div">
          <p style={{ marginLeft: '10px' }}> Total orders </p>
          <div className="total">
            <p
              style={{
                marginLeft: '-10px',
                fontSize: '25px',
                color: '#007BFF',
              }}
            >
              {orders?.length}
            </p>
            <p>{ }</p>
          </div>
        </div>
        <div className="total_div">
          <p style={{ marginLeft: '10px' }}> Total Units </p>
          <div className="total">
            <p
              style={{
                marginLeft: '-10px',
                color: '#007BFF',
                fontSize: '25px',
              }}
            >
              {totalQuantity}
            </p>
            <p>{ }</p>
          </div>
        </div>
        <div className="total_div">
          <p> Total Amount </p>
          <div className="total">
            <p
              style={{
                marginLeft: '-10px',
                fontSize: '25px',
                color: '#007BFF',
              }}
            >
              {totalAmount}
            </p>
            <p>{ }</p>
          </div>
        </div>
      </div>
      <div className="orders_div">
        <div>
          <p className="orders">Orders</p>
        </div>
        <div>
          <p className="search">
            Search:{' '}
            <input
              className="input_field"
              placeholder="Search by order ID"
              onChange={handleSearch}
            />
          </p>
        </div>
      </div>
      <div>
        <Table>
          <thead style={{ backgroundColor: '#E9ECEF' }}>
            <tr>
              {heading?.map((head, index) => {
                return (
                  <th key={index}>
                    {`${head?.Text || 'N/A'}`}
                    {head?.hasArrow ? <img src={Arrow} /> : <></>}
                    {head?.hasHash ? ' #' : <></>}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {orders?.map((item, index) => {
              const date = dayjs(item?.orderDate).format('D MMMM YYYY');
              return (
                <tr key={index} >
                  <td>{date}</td>
                  <td>{item?._id}</td>
                  <td>{item?.userName}</td>
                  <td>{item?.totalQuantity}</td>
                  <td>{item?.totalAmount}</td>
                  {/* <td><span className='badge'>Paid</span></td> */}
                  < td >
                    <Badge bg="#28A745">Paid</Badge>
                  </td>
                  {/* <td><span className='mark_delivered'><span><img src={ArrowUpRright} /></span>Mark as delivered</span></td> */}
                  <td>
                    <img src={ArrowUpRright} onClick={() => { setOrderDetails(true); setDetailsItem(item) }} />
                    {console.log('ITEM Delivered STATUS = ', item.delivered)}
                    {item.delivered ? <span className="mark_delivered" style={{ color: 'green' }}>Delivered</span> : <span className="mark_delivered" onClick={() => { handleDeliverOrder(item._id) }}>Mark as delivered</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {showOrderDeatils && <AdminOrderModel setDetailsItem={detailsItem} onClose={() => setOrderDetails(false)} />}
      </div >
    </div >
  );
};

export default Orders;
