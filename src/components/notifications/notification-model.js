// library imports
import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
// component imports
import CustomButton from '../../components/button';
// redux imports
import { ReadNotification, GetNotifications } from '../../redux/slices/notification-slice';
// style imports
const NotificationsModel = ({ onClose, notifications }) => {
  const [close, setClose] = useState(true);
  const dispatch = useDispatch();

  const handleRead = (orderId) => {
    dispatch(ReadNotification({ orderId })).then(() => dispatch(GetNotifications()));
    console.log('read dispatched');
  }
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
            <div style={{ marginBottom: '20px' }}>Order From User <span style={{ marginLeft: '127px' }}>Order ID</span><span style={{ marginLeft: '190px' }}>Status</span></div>
            {notifications?.map((item, index) => {
              return (
                <div key={index} className='d-flex' style={{ height: 'auto', width: '300px', marginTop: '15px' }}>
                  <div>{item?.userId}</div>
                  <div style={{ marginLeft: '40px' }}>{item?.orderId}</div>
                  <div style={{ marginLeft: '30px' }}><CustomButton onClick={() => handleRead(item.orderId)} style={{ height: '40px', width: '130px', color: 'red', backgroundColor: 'white' }} placeholder='Marke as read' /></div>
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
