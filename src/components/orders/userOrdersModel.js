// library imports
import { useState } from 'react';
import { Offcanvas, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
// import { Table } from 'react-bootstrap';
// component imports

// Redux imports

// style imports

const UserOrders = ({ onClose }) => {
  const [showUserOrdersModel, setShowUserOrdersModel] = useState(false);
  const userOrders = useSelector((state) => state.orderReducer?.userOrders)
  const user = localStorage.getItem('name');

  const handleShowModel = () => {
    setShowUserOrdersModel(true);
  }
  const heading = ['OrderId', 'User', 'Products', 'Amount', 'Date']
  return (
    <div style={{ width: '2500px' }}>
      <Offcanvas
        // className="edit_modal"
        style={{ width: '900px' }}
        show={true}
        onHide={() => onClose()}
        placement="end"
      >
        {/* <Button variant="primary" onClick={handleClose} className="me-2">Edit Product</Button> */}
        <Offcanvas.Header>
          <Offcanvas.Title> User Orders </Offcanvas.Title>
        </Offcanvas.Header>
        <div className="line"></div>
        <Offcanvas.Body>
          <Table>
            <thead>
              <tr>
                {heading.map((head, index) => {
                  return (
                    <th key={index}> {head}</th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {
                userOrders.map((data, index) => {
                  const date = dayjs(data?.orderDate).format('D MMMM YYYY');
                  return (
                    <tr key={index}>
                      <td>{data?._id}</td>
                      <td>{user}</td>
                      <td>{data?.totalQuantity}</td>
                      <td>{data?.totalAmount}</td>
                      <td>{date}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </Offcanvas.Body>
      </Offcanvas>
    </div>

  );
}

export default UserOrders;
