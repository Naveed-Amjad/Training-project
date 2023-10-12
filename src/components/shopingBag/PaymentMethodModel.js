// library imports

// component imports
import { Offcanvas } from 'react-bootstrap';
import CustomInput from '../../components/input';
import CustomButton from '../button'
// Redux imports

// style imports

//
const PaymentMethodModel = ({ onClose, onclick, isEnabledbtn }) => {
  const style = { width: '664px', marginTop: '1px' };
  const style1 = { width: '300px', marginTop: '1px' };
  return (
    <div>
      <Offcanvas className='edit_modal' show={true} onHide={() => onClose()} placement='end'>
        {/* <Button variant="primary" onClick={handleClose} className="me-2">Edit Product</Button> */}
        <Offcanvas.Header>
          <Offcanvas.Title> Add Delivery Address </Offcanvas.Title>
        </Offcanvas.Header>
        <div className='line'></div>
        <Offcanvas.Body>
          <CustomInput type='text' placeholder='Card number' lable='Card number' style={style} />
          <div className='d-flex justify-content-between'>
            <CustomInput type='tel' placeholder='MM/YY' lable='Expiry date' style={style1} />
            <CustomInput type='text' placeholder='CVC' lable='CVC' style={style1} />
          </div>
          {/* <div className='d-flex justify-content-between'>
            <CustomInput type='text' placeholder='Province' lable='Province' style={style1} />
            <CustomInput type='text' placeholder='City' lable='City' style={style1} />
          </div> */}
          <CustomInput type='text' placeholder='Country' lable='Country' style={style} />
          <CustomButton isEnabledbtn={isEnabledbtn} onclick={() => { onClose(); onclick() }} style={{ height: '46px', width: '161px', margin: '50px 0px 0px 500px' }} placeholder='Save' />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default PaymentMethodModel;
