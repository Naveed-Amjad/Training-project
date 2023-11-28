import React from 'react';
import { Offcanvas, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
// style imports
// import '';

const ProductsUploadErrosModel = ({ show, onClose, handleHide, title, btnText }) => {
  const errorArr = useSelector((state) => state.productsReducer?.errorArr);
  return (
    <div>
      <Offcanvas
        className="edit_modal"
        show={show}
        onHide={() => onClose()}
        placement="end"
      >
        <Offcanvas.Header>
          <Offcanvas.Title> Uploaded File Erros </Offcanvas.Title>
        </Offcanvas.Header>
        <hr></hr>
        <Offcanvas.Body>
          <Table>
            <thead>
              <th>Row#</th>
              <th>Error Messsage</th>
            </thead>
            <tbody>
              {
                errorArr?.length && errorArr.map((item, index) => {
                  return <tr key={index}>
                    <td>{item?.row}</td>
                    <td style={{ color: 'red' }}>{item?.message}</td>
                  </tr>
                })
              }
            </tbody>
          </Table>
        </Offcanvas.Body>
      </Offcanvas>
    </div>

  );
};

export default ProductsUploadErrosModel;
