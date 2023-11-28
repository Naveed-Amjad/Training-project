import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Table } from 'react-bootstrap';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import { useDispatch } from 'react-redux';
import { ceil } from 'lodash';
import AdminOrderModel from '../../components/orders/adminOrderModel';
import CustomButton from '../button';
import ArrowUp from '../../assets/ArrowUpright.svg';
import { UserOrders } from '../../redux/slices/orderSlice';

const UserOrderPage = () => {
  const [orderDetailModel, setOrderDetailModel] = useState(false);
  const [detailItemId, setDetailItemId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const dispatch = useDispatch();

  const { userOrders, totalCount } = useSelector((state) => state.orderReducer);
  const userId = localStorage.getItem('id');
  const { token } = useSelector((state) => state.authReducer);

  const ordersPerPage = 5;
  const pages = ceil(totalCount / ordersPerPage);

  useEffect(() => {
    const skip = (currentPage - 1) * ordersPerPage;
    const limit = ordersPerPage;
    dispatch(UserOrders({ userId, token, skip, limit }));
  }, [dispatch, userId, token, currentPage]);

  const user = localStorage.getItem('name');
  const navigate = useNavigate();
  const heading = ['Image', 'OrderId', 'User', 'Products', 'Amount', 'Date', 'Action'];

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Calculate new skip and limit based on the clicked page number
    const newSkip = (pageNumber - 1) * ordersPerPage;
    const newLimit = ordersPerPage;

    setSkip(newSkip);
    setLimit(newLimit);
  };

  return (
    <div style={{ margin: '30px 0px 0px 50px' }}>
      <CustomButton onClick={() => navigate(-1)} placeholder='Go Back' style={{ height: '40px', width: '100px' }} />
      <Table>
        <thead>
          <tr>
            {heading.map((head, index) => (
              <th key={index}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userOrders?.map((data, index) => {
            const date = dayjs(data?.orderDate).format('D MMMM YYYY');
            return (
              <tr key={index}>
                <td>{<img style={{ height: '40px', width: '40px' }} src={`http://localhost:4009/${data?.products[0]?.product?.images?.[0][0]}`} />}</td>
                <td>{data?._id}</td>
                <td>{user}</td>
                <td>{data?.totalQuantity}</td>
                <td>{data?.totalAmount}</td>
                <td>{date}</td>
                <td>{<img src={ArrowUp} onClick={() => { setOrderDetailModel(true); setDetailItemId(data?._id) }} />}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {orderDetailModel && <AdminOrderModel onClose={() => setOrderDetailModel(false)} setDetailsItemId={detailItemId} />}
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
          isEnabledbtn={currentPage <= pages}
          onClick={() => setCurrentPage(currentPage + 1)}
          style={{ height: '40px', width: '80px', marginLeft: '15px' }}
          placeholder='Next'
        />
      </div>
    </div>
  );
};

export default UserOrderPage;
