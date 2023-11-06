// library imports
import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// component imports
import CustomButton from '../../components/button';
// redux imports
import { ReadNotification, GetNotifications } from '../../redux/slices/notification-slice';
// style imports
const NotificationsModel = ({ onClose, notifications }) => {
  const [close, setClose] = useState(true);
  const dispatch = useDispatch();

  const { role } = useSelector((state) => state.authReducer)
  const handleRead = (_id, userId) => {
    dispatch(ReadNotification({ _id })).then(() => {
      const data = {};
      if (role === 'user') data.userId = userId;
      dispatch(GetNotifications(data));
    });
    console.log('read dispatched');
  }

  // const role = localStorage.getItem('role');
  return (
    <div>
      <Offcanvas
        className="edit_modal"
        show={true}
        onHide={() => onClose()}
        placement="end"
      >
        <Offcanvas.Header>
          <Offcanvas.Title> Notifications </Offcanvas.Title>
        </Offcanvas.Header>
        <div className="line"></div>
        <Offcanvas.Body>
          <div>
            <div style={{ marginBottom: '20px' }}>{role === 'admin' ? 'Order From User' : 'Order Delivered'} <span style={{ marginLeft: '127px' }}>Order ID</span><span style={{ marginLeft: '190px' }}>Status</span></div>
            {notifications?.map((item, index) => {
              return (
                <div key={index} className='d-flex' style={{ height: 'auto', width: '300px', marginTop: '15px' }}>
                  <div>{item?.userId}</div>
                  <div style={{ marginLeft: '40px' }}>{item?.orderId}</div>
                  <div style={{ marginLeft: '30px' }}><CustomButton onClick={() => handleRead(item._id, item.userId)} style={{ height: '40px', width: '130px', color: 'red', backgroundColor: 'white' }} placeholder='Marke as read' /></div>
                </div>
              )
            })}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default NotificationsModel;
