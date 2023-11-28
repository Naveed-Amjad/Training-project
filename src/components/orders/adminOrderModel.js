// library imports
import { useEffect, useState } from 'react';
import { Offcanvas, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
// component imports
import NoDataFound from '../../assets/NoDataFound.svg'
// Redux imports
import { AdminOrderDetails } from '../../redux/slices/orderSlice';
// style imports

const UserOrders = ({ onClose, setDetailsItemId }) => {
  const [showUserOrdersModel, setShowUserOrdersModel] = useState(false);
  const Orders = useSelector((state) => state.orderReducer?.orders);
  const user = localStorage.getItem('name');
  const { token } = useSelector((state) => state.authReducer)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AdminOrderDetails({ token, orderId: setDetailsItemId }))
  }, [setDetailsItemId])

  const { adminOrderDetails } = useSelector((state) => state.orderReducer);
  const handleShowModel = () => {
    setShowUserOrdersModel(true);
  };
  const heading = ['Image', 'Title', 'Price', 'Quantity'];
  return (
    <div style={{ width: '2500px' }}>
      <Offcanvas
        // className="edit_modal"
        style={{ width: '900px' }}
        show={true}
        onHide={() => onClose()}
        placement="end"
      >
        <Offcanvas.Header>
          <Offcanvas.Title> Order Details </Offcanvas.Title>
        </Offcanvas.Header>
        <div className="line"></div>
        {adminOrderDetails ? <Offcanvas.Body>
          <div className="d-flex mt-2 ">
            <div className="ms-4 d-flex flex-column">
              <div className="text-secondary">Date</div>
              <div>
                {new Date(adminOrderDetails?.orderDate).toLocaleDateString()}
              </div>
            </div>
            <div className="ms-4">
              <div className="text-secondary">Status</div>
              <div>{adminOrderDetails ? adminOrderDetails?.delivered ? 'Delivered' : 'Not De' : ''}</div>
            </div>
            <div className="ms-4">
              <div className="text-secondary">User</div>
              <div>{adminOrderDetails?.userName}</div>
            </div>
            <div className="ms-4">
              <div className="text-secondary">Products</div>
              <div>{adminOrderDetails?.products?.length}</div>
            </div>
            <div className="ms-4">
              <div className="text-secondary">Amount</div>
              <div>{adminOrderDetails?.totalAmount}</div>
            </div>
          </div>
          <Table>
            <thead>
              <tr>
                {heading.map((head, index) => {
                  return <th key={index}> {head}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {adminOrderDetails?.products?.map((product, index) => (
                <tr key={'tr-' + index}>
                  <td>{<img src={`http://localhost:4009/${product?.product?.images[0]}`} style={{ height: '40px', width: '40px' }} />}</td>
                  <td>{product?.product?.title}</td>
                  <td>{product?.product.price}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Offcanvas.Body> : <span style={{ margin: '20px 0px 0px 50px', color: 'blue' }}>No data Found <img src={NoDataFound} style={{ height: '400px', width: '400px', margin: '100px 0px 0px 150px' }} /></span>}
        {/* <div style={{ height: '50px', width: '200px', color: 'blue', margin: '200px 0px 0px 350px' }}>No Details to Show</div> */}
      </Offcanvas>
    </div>
  );
};

export default UserOrders;
