// library imports
import { useDispatch, useSelector } from 'react-redux';
// component imports
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Delete from '../../assets/ExclamationTriangle.svg';

// redux imports
import { deleteProduct, getProducts } from '../../redux/slices/productsSlice';
import { removeItems } from '../../redux/slices/cartSlice';
// style imports
import './deleteProduct.css';

const DeleteProduct = ({ id, onClose, onDelete, item }) => {
  const { token } = useSelector((state) => state.authReducer)
  // console.log('id', id);
  const dispatch = useDispatch();
  const handleClose = () => {
    onClose();
  };
  return (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <Modal.Dialog onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Delete Product</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <img src={Delete} style={{ marginLeft: '170px' }} />
            <p>Are you sure you want to delete the item.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button
              style={{
                height: '40px',
                width: '70px',
                marginBottom: '20px',
                marginRight: '100px',
              }}
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              style={{
                height: '40px',
                width: '70px',
                marginBottom: '20px',
                marginRight: '150px',
              }}
              variant="primary"
              onClick={() => {
                onDelete(id);
                id ? dispatch(deleteProduct({ id, token })).then(() => dispatch(getProducts())) : dispatch(removeItems(item));
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </div>
  );
};

export default DeleteProduct;
