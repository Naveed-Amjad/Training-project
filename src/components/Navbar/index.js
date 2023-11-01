// library imports
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// component imports
import Bell from '../../assets/Bell.svg';
import ShopingCart from '../../assets/ShopingCart.svg';
import Badge from 'react-bootstrap/Badge';
import UserOrdersModel from '../orders/userOrdersModel';
import NotificationsModel from '../notifications/notification-model';
// Redux imports
import { logout } from '../../redux/slices/authSlice';
import { UserOrders } from '../../redux/slices/orderSlice';
// style imports
import { Navbar, Container, Image, NavDropdown, Nav, Button } from 'react-bootstrap';
import Img from '../../assets/naveed.jpg';

const CustomNavbar = ({ changeState }) => {
  const [showNotificationsModel, setShowNotificationsModel] = useState(false);

  const { role } = useSelector((state) => state.authReducer);
  const userId = localStorage.getItem('id');
  const name = localStorage.getItem('name');
  const totalItemsInCart = useSelector((state) => state.cartReducer.totalQuantity);
  const adminNotifications = useSelector((state) => state.notificationReducer?.adminNotifications?.notifications);
  const [showOrders, setShowOrders] = useState();
  const handleClose = () => {
    setShowOrders(false);
  }
  const onClose = () => {
    setShowNotificationsModel(false);
  }
  const dispatch = useDispatch();
  const nav = useNavigate();
  const getUserOrders = () => {
    dispatch(UserOrders({ userId }));
  }
  return (

    <Navbar style={{ position: 'fixed', zIndex: '10' }} className="bg-body-tertiary w-100">
      <Container>
        <Navbar.Brand onClick={() => nav('/')}>E-commerce</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link>
            {
              role === 'user' && <><img src={ShopingCart} onClick={() => nav('/shopingbag')} style={{ marginLeft: '20px' }} />
                {totalItemsInCart ? <Badge pill className="notification-badge">
                  {totalItemsInCart}
                </Badge> : ''}</>
            }
          </Nav.Link>
          <Nav.Link>
            {
              role && <><img src={Bell} onClick={() => setShowNotificationsModel(true)} />
                {adminNotifications?.length ? <Badge pill className="notification-badge">
                  {adminNotifications?.length}
                </Badge> : ''} </>
            }
            {showNotificationsModel && <NotificationsModel onClose={onClose} notifications={adminNotifications} />}
          </Nav.Link>
          <Navbar.Text style={{ marginLeft: '10px' }}>{role ? `${name}` : <Button style={{ height: '30px', width: '60px', padding: '3px 0px 3px 0px', background: '#fff', color: '#007BFF', border: 'none' }} onClick={() => { nav('/login'); }}>Login</Button>}</Navbar.Text>
          {role !== null && <NavDropdown id="basic-nav-dropdown" style={{ marginLeft: '10px' }}>
            {role === 'user' ? < NavDropdown.Item onClick={() => { setShowOrders(true); getUserOrders() }} >Orders</NavDropdown.Item> : ''}
            {showOrders && <UserOrdersModel onClose={handleClose} />}
            <NavDropdown.Item onClick={() => {
              dispatch(logout());
              nav('/');
            }}>Logout</NavDropdown.Item>
          </NavDropdown>}
          <span>
            {role !== null && <Image
              src={Img}
              style={{ width: '46px', height: '31px', borderRadius: '50%', marginLeft: '10px' }}
            />}
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
};

export default CustomNavbar;
