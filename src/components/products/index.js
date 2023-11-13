/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
// library imports
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
// component imports
import CustomTable from '../../components/Table';
import { Button } from 'react-bootstrap';
import EditProduct from './editProduct';
import BulkImportModel from './import-bulk-model';
// Redux imports
import { getProducts } from '../../redux/slices/productsSlice';
// style imports

const Products = () => {
  const [addModel, setAddModel] = useState(false);
  const [bulkModel, setBulkModel] = useState(false);
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.productsReducer?.products);
  //
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  //
  const { isLoading } = useSelector((state) => state.productsReducer);
  const { error } = useSelector((state) => state.productsReducer);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const displayedProducts = data?.slice(startIndex, endIndex);
  const numbers = [...Array(totalPages + 1).keys()]?.slice(1);
  // table component headings
  const heading = [
    { Text: 'Title', hasArrow: true },
    { Text: 'Color', hasArrow: false },
    { Text: 'Brand', hasArrow: false },
    { Text: 'Price', hasArrow: true },
    { Text: 'Stock', hasArrow: true },
    { Text: 'Actions', hasArrow: false },
  ];

  // retrun
  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          {error && <h1>{error}</h1>}
          <div className="add_product">
            <div
              style={{
                marginRight: '60px',
                marginTop: '30px',
                color: '#007BFF',
              }}
            >
              Products
            </div>
            <div>
              <div style={{ marginLeft: '0px', marginTop: '30px' }}>
                <span>
                  <Button onClick={() => { setBulkModel(true) }} style={{ height: '40px', width: '190px' }}>
                    Import Bulk Products
                  </Button>
                </span>
                <span style={{ marginLeft: '30px' }}>
                  <Button
                    onClick={() => setAddModel(true)}
                    style={{ height: '40px', width: '140px' }}
                  >
                    Add New
                  </Button>
                </span>
                {addModel && (
                  <EditProduct
                    heading="Add Product"
                    btnHeading="Add"
                    onClose={() => setAddModel(false)}
                  />
                )}
                <BulkImportModel show={bulkModel} onClose={() => setBulkModel(false)} />
              </div>
            </div>
          </div>
          {isLoading ? (
            <div style={{ marginLeft: '200px 0px 0px 300px' }}> <Spin size="large" /> </div>
          ) : (
            <CustomTable
              tableHeading={heading}
              data={displayedProducts}
              hasActions={true}
            />
          )}
          <nav
            aria-label="Page navigation example"
            style={{ marginLeft: '430px' }}
          >
            {!isLoading && <ul className="pagination">
              <li className="page-item">
                <a
                  className={`page-link ${currentPage === 1 ? 'disabled' : ''}`}
                  href="#"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </a>
              </li>
              {numbers?.map((item, index) => (
                <li
                  className={`page-item ${currentPage === item ? 'active' : ''
                    }`}
                  key={index}
                >
                  <a className="page-link">{item}</a>
                </li>
              ))}
              <li className="page-item">
                <a
                  className={`page-link ${endIndex >= data?.length ? 'disabled' : ''
                    }`}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </a>
              </li>
            </ul>}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Products;
