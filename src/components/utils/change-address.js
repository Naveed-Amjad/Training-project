// library imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Offcanvas } from 'react-bootstrap';
// component imports
import CustomButton from '../button';
import DeliveryAddress from '../shopingBag/DeliveryAddress';
// redux imports

// style imports

const ChangeAddress = ({
  onClose,
  userAddressDetails,
  setIndex,
  indexSelected,
  setUserAddress
}) => {
  const [deliveryAddressModel, setDeliveryAddressModel] = useState(false);
  return (
    <div>
      <Offcanvas
        className="edit_modal"
        show={true}
        onHide={() => onClose()}
        placement="end"
      >
        {/* <Button variant="primary" onClick={handleClose} className="me-2">Edit Product</Button> */}
        <Offcanvas.Header>
          <Offcanvas.Title> Change Address </Offcanvas.Title>
        </Offcanvas.Header>
        <div className="line"></div>
        <Offcanvas.Body>
          {
            <div>
              <CustomButton
                onClick={() => setDeliveryAddressModel(true)}
                style={{ height: '40px', width: '200px' }}
                placeholder="Add New Address"
              />
            </div>
          }
          {deliveryAddressModel && (
            <DeliveryAddress onClose={() => setDeliveryAddressModel(false)} />
          )}
          {userAddressDetails?.map((address, index) => {
            // setUserAddress(address)
            return (
              <div
                key={index}
                className="d-flex"
                style={{
                  height: 'auto',
                  width: '600px',
                  border: '1px solid blue',
                  margin: '20px 0px 0px 20px',
                }}
              >
                <div>
                  <div style={{ margin: '10px 0px 0px 10px' }} >
                    {`Deliver To: ${userAddressDetails[index]?.fullName}`}
                  </div>
                  <div
                    style={{ margin: '10px 0px 0px 10px' }}
                  >{`Contact: ${userAddressDetails[index]?.phoneNumber}`}</div>
                  <div
                    style={{ margin: '10px 0px 0px 10px' }}
                  >{`City: ${userAddressDetails[index]?.city}`}</div>
                  <div
                    style={{ margin: '10px 0px 0px 10px' }}
                  >{`Address: ${userAddressDetails[index]?.address}`}</div>
                </div>
                <div style={{ margin: '10px 0px 0px 300px' }}>
                  <CustomButton
                    style={{
                      height: '40px',
                      width: '70px',
                      color: '#CED4DA',
                      backgroundColor: 'transparent',
                      border: indexSelected
                        ? '1px solid blue'
                        : '1px solid #CED4DA',
                    }}
                    onClick={() => {
                      setIndex(index);
                      setUserAddress(address)
                    }}
                    placeholder="Select"
                  />
                </div>
              </div>
            );
          })}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default ChangeAddress;
