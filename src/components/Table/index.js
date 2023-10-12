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
const CustomTable = ({ data, tableHeading, onDelete, hasActions }) => {
  console.log('hasAction in Table', hasActions);
  // delete product model state
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [itemId, setItemId] = useState();
  console.log(editModel);
  const deleteProduct = (data) => {
    console.log({ data });
    // Filter out the product with the specified ID
    // const updatedProducts = data.filter(product => product.id !== id);
    // setData(updatedProducts);
  };

  // edit product model

  return (
    <Table style={{ marginLeft: '0px' }}>
      {/* {console.log({ data, tableHeading })} */}
      <thead style={{ backgroundColor: '#E9ECEF' }}>
        <tr>
          {tableHeading?.map((head, index) => {
            // console.log(head);
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
                {console.log('item value ', item)}
                <span>
                  {
                    <img
                      src={item?.images[0]}
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
                    {/* <Button style={{ height: '15px', width: '15px', background: 'transparent' }} className="w-40" id="btn" size="lg" placeholder={<img src={Pencil} />} /> */}
                    <img
                      src={Pencil}
                      onClick={() => {
                        setEditModel(true);
                        setItemId(item?.id);
                        console.log('clicked edit');
                      }}
                    />
                    {/* {modalVisible && <DeleteProduct id={item.id} onClose={() => setModalVisible(false)}/>} */}
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

                    {/* <Button style={{ height: '15px', width: '15px', background: 'transparent' }} className="w-40" id="btn" size="lg" placeholder={<img src={Trash}/>} onClick={() => <DeleteProduct id={item.id}/>} /> */}
                  </span>
                )}
                {/* <DeleteProduct id={item.id}/> */}
                {/* {hasActions && ( */}
                {/* <span> */}
                {/* Render item.actions if hasActions is true */}
                {/* {item.actions} */}
                {/* </span> */}
              </td>
            </tr>
          );
        })}
      </tbody>
      {console.log('itemId to be deleted = ', itemId)}
      {editModel && (
        <EditProduct
          heading="Edit Product"
          btnHeading="Update"
          id={itemId}
          onClose={() => setEditModel(false)}
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
