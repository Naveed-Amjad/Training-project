// library imports

// component imports
import { Offcanvas } from 'react-bootstrap';
import CustomInput from '../../components/input';
import CustomButton from '../button';
// Redux imports

// style imports

//
const DeliveryAddress = ({ onClose, setIsEnable }) => {
  const style = { width: '664px', marginTop: '1px' };
  const style1 = { width: '300px', marginTop: '1px' };
  console.log('setIsEnabledbtn in delivery model ', setIsEnable);
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
          <Offcanvas.Title> Add Delivery Address </Offcanvas.Title>
        </Offcanvas.Header>
        <div className="line"></div>
        <Offcanvas.Body>
          <CustomInput
            type="text"
            placeholder="Full name"
            lable="Full name"
            style={style}
          />
          <div className="d-flex justify-content-between">
            <CustomInput
              type="tel"
              placeholder="Mobile #"
              lable="Mobile #"
              style={style1}
            />
            <CustomInput
              type="text"
              placeholder="Countary"
              lable="Countary"
              style={style1}
            />
          </div>
          <div className="d-flex justify-content-between">
            <CustomInput
              type="text"
              placeholder="Province"
              lable="Province"
              style={style1}
            />
            <CustomInput
              type="text"
              placeholder="City"
              lable="City"
              style={style1}
            />
          </div>
          <CustomInput
            type="text"
            placeholder="Address"
            lable="Address"
            style={style}
          />
          <CustomButton
            onclick={() => {
              onClose();
              setIsEnable();
            }}
            style={{
              height: '46px',
              width: '161px',
              margin: '50px 0px 0px 500px',
            }}
            placeholder="Save"
          />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default DeliveryAddress;
