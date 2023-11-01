// library imports
import { useState } from 'react';
import { Offcanvas, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
// import { Table } from 'react-bootstrap';
// component imports

// Redux imports

// style imports

const UserOrders = ({ onClose, setDetailsItem }) => {
  const [showUserOrdersModel, setShowUserOrdersModel] = useState(false);
  const Orders = useSelector((state) => state.orderReducer?.orders)
  const user = localStorage.getItem('name');

  console.log('setDetailsItem', setDetailsItem);
  const handleShowModel = () => {
    setShowUserOrdersModel(true);
  }
  const heading = ['Title', 'Price', 'Quantity']
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
          <Offcanvas.Title> Order Details </Offcanvas.Title>
        </Offcanvas.Header>
        <div className="line"></div>
        <Offcanvas.Body>
          <div className='d-flex mt-2 '>
            <div className='ms-4 d-flex flex-column'>
              <div className='text-secondary'>
                Date
              </div>
              <div>
                {new Date(setDetailsItem?.orderDate).toLocaleDateString()}
              </div>
            </div>
            <div className='ms-4'>
              <div className='text-secondary'>
                Order
              </div>
              <div>
                {setDetailsItem?._id}
              </div>
            </div>
            <div className='ms-4'>
              <div className='text-secondary'>
                User
              </div>
              <div>
                {setDetailsItem?.userName}
              </div>
            </div>
            <div className='ms-4'>
              <div className='text-secondary'>
                Products
              </div>
              <div>
                {setDetailsItem?.products?.length}
              </div>
            </div>
            <div className='ms-4'>
              <div className='text-secondary'>
                Amount
              </div>
              <div>
                {setDetailsItem?.totalAmount}
              </div>
            </div>
          </div>
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
                setDetailsItem?.products?.map((product, index) => (
                  <tr key={'tr-' + index}>
                    <td>
                      {product?.product.title}
                    </td>
                    <td>
                      {product?.product.price}
                    </td>
                    <td>
                      {product.quantity}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Offcanvas.Body>
      </Offcanvas>
    </div>

  );
}

export default UserOrders;
