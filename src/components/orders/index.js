// library imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { debounce, ceil } from 'lodash';
import Pagination from 'react-bootstrap/Pagination';
// component imports
import { Table, Badge } from 'react-bootstrap';
import Arrow from '../../assets/Arrow.svg';
import ArrowUpRright from '../../assets/ArrowUpright.svg';
import AdminOrderModel from '../../components/orders/adminOrderModel';
import CustomButton from '../button';
// redux imports
import { GetOrders, DeliverOrder } from '../../redux/slices/orderSlice';
// style imports
import './style.css';

const calculateTotal = (items) => {
  let totalQuantity = 0;
  let totalAmount = 0;
  for (const item of items) {
    const quantity = item.totalQuantity;
    const amount = item.totalAmount;
    totalQuantity = totalQuantity + quantity;
    totalAmount = totalAmount + amount;
  }
  return { totalQuantity, totalAmount };
};

const Orders = () => {
  const [searchById, setSearchById] = useState();
  const [showOrderDeatils, setOrderDetails] = useState(false);
  const [detailsItemId, setDetailsItemId] = useState();
  const [state, setState] = useState(0)
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orderReducer.orders);
  const { totalCount } = useSelector((state) => state.orderReducer)
  const { token } = useSelector((state) => state.authReducer);

  const { totalQuantity, totalAmount } = calculateTotal(orders);
  const ordersPerPage = 5;
  const pages = ceil(totalCount / ordersPerPage);

  useEffect(() => {
    const skip = (currentPage - 1) * ordersPerPage;
    const limit = ordersPerPage;
    dispatch(GetOrders({ searchById, skip, limit: 5, token }));
  }, [searchById, dispatch, token, currentPage]);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Calculate new skip and limit based on the clicked page number
    const newSkip = (pageNumber - 1) * ordersPerPage;
    const newLimit = ordersPerPage;

    setSkip(newSkip);
    setLimit(newLimit);
  };

  const handleSearch = debounce((e) => {
    setSearchById(e.target.value);
  }, 1000);

  const handleDeliverOrder = (orderId) => {
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
              {`$${totalAmount}`}
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
                  < td >
                    <Badge bg="#28A745">{item?.status}</Badge>
                  </td>
                  <td>
                    <img src={ArrowUpRright} onClick={() => { setOrderDetails(true); setDetailsItemId(item?._id) }} />
                    {item.delivered ? <span className="mark_delivered" style={{ color: 'green' }}>Delivered</span> : <span className="mark_delivered" onClick={() => { handleDeliverOrder(item._id) }}>Mark as delivered</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {showOrderDeatils && <AdminOrderModel setDetailsItemId={detailsItemId} onClose={() => setOrderDetails(false)} />}
        {
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <CustomButton
              isEnabledbtn={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              style={{ height: '40px', width: '80px', marginRight: '15px', padding: '4px' }}
              placeholder='Previous'
            />
            <Pagination>
              {[...Array(pages)].map((_, index) => (
                <Pagination.Item key={index} active={currentPage === index + 1} onClick={() => handlePaginationClick(index + 1)}>
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
            <CustomButton
              isEnabledbtn={currentPage === pages}
              onClick={() => setCurrentPage(currentPage + 1)}
              style={{ height: '40px', width: '80px', marginLeft: '15px' }}
              placeholder='Next'
            />
          </div>
        }
      </div >
    </div >
  );
};

export default Orders;
