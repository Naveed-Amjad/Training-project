// library imports
import { useState } from 'react';
// component imports
import DeleteProduct from '../products/deleteProduct';
import EditProduct from '../products/editProduct';
import Table from 'react-bootstrap/Table';
// import Button from '../../components/button'
// import { Button } from 'react-bootstrap';
import Arrow from '../../assets/Arrow.svg';
import Pencil from '../../assets/Pencil.svg';
import Trash from '../../assets/Trash.svg';
// Redux imports

// style imports
const CustomTable = ({ data, tableHeading, hasActions }) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [editObject, setEditObject] = useState({});
  const [itemId, setItemId] = useState();
  const deleteProduct = (data) => {
    console.log({ data });
  };

  return (
    <Table style={{ marginLeft: '0px' }}>
      <thead style={{ backgroundColor: '#E9ECEF' }}>
        <tr>
          {tableHeading?.map((head, index) => {
            return (
              <th key={index}>
                {`${head?.Text || 'N/A'}`}
                {head?.hasArrow ? <img src={Arrow} /> : <></>}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data?.length && data?.map((item, index) => {
          return (
            <tr key={index}>
              <td>
                <span>
                  {
                    <img
                      src={`http://localhost:4009/${item?.images[0][0]}`}
                      style={{ height: '30px', width: '30px' }}
                    />
                  }
                </span>
                {item?.title}
              </td>
              <td>{item?.rating}</td>
              <td>{item?.brand}</td>
              <td>{item?.price}</td>
              <td>{item?.stock}</td>
              <td>
                {hasActions && (
                  <span>
                    <img
                      src={Pencil}
                      onClick={() => {
                        setEditModel(true);
                        setItemId(item?.id);
                        setEditObject(item);
                      }}
                    />
                  </span>
                )}
                {hasActions && (
                  <span style={{ marginLeft: '20px' }}>
                    <img
                      src={Trash}
                      onClick={() => {
                        setDeleteModalVisible(true);
                        setItemId(item?._id);
                      }}
                    />

                  </span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
      {editModel && (
        <EditProduct
          heading="Edit Product"
          btnHeading="Update"
          id={itemId}
          onClose={() => setEditModel(false)}
          editObject={editObject}
        />
      )}
      {deleteModalVisible && (
        <DeleteProduct
          id={itemId}
          onClose={() => setDeleteModalVisible(false)}
          onDelete={(data) => deleteProduct(data)}
        />
      )}
    </Table>
  );
};

export default CustomTable;
