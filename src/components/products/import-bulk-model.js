// import { Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// component imports
import CustomButton from '../../components/button';
// redux imports
import { addBulkProducts, getProducts } from '../../redux/slices/productsSlice';
// style imports
import './bulk-product.css';
//
function BulkImportModel({ show, onClose }) {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showBulkModel, setShowBulkModel] = useState(false);
  const [close, setClose] = useState(show)
  const [fileData, setFileData] = useState(null);
  const [bulkProducts, setBulkProducts] = useState([]);

  const fileReader = new FileReader();

  const handleUploadClick = () => {
    document.getElementById('upload-bulk').click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Selected file:', file);
      setFileData(file);
      const newBulkProducts = [];
      fileReader.onload = function (event) {
        const text = event.target.result;
        const rows = text.split('\n');
        console.log(text, rows);
        if (rows.length > 0) {
          for (let i = 0; i < rows.length - 1; i++) {
            if (i === 0) {
              const firstRow = rows[i].trim();
              const header = firstRow.split(',');
              console.log(header);
            } else {
              const newData = rows[i].split(',');
              newBulkProducts.push(newData);
            }
          }
          setBulkProducts(newBulkProducts);
        }
      };
      fileReader.readAsText(file);
    }
  };
  console.log('bulkProducts ', bulkProducts);

  const dispatch = useDispatch();
  const handleSave = () => {
    dispatch(addBulkProducts(bulkProducts)).then(() => dispatch(getProducts()));
    console.log('\n saved');
    onClose();
  };
  return (
    <div>
      <div>
        {show === true ? (
          <div className={`bulk-model ${show ? 'slide-in' : 'slide-out'}`}>
            <div className="bulk-model-main">
              <div className="bulk-header-content">
                <p className="bulk-header">Import Bulk Products</p>
                {/* <svg
                  onClick={() => { setClose(false) }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="close-bulk"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.5468 12L21 18.4532L18.4532 21L12 14.5468L5.54685 21L3 18.4532L9.45316 12L3 5.54685L5.54685 3L12 9.45316L18.4532 3L21 5.54685L14.5468 12Z"
                    fill="#495057"
                  />
                </svg> */}
                <CustomButton onClick={() => onClose()} style={{ height: '40px', width: '30px', backgroundColor: 'white', color: 'black', border: 'none', margin: '10px 0px 0px 350px' }} placeholder='X' />
              </div>
              <div className="import-file-container">
                <div className="custom-bulk-input" onClick={handleUploadClick}>
                  <input
                    type="file"
                    accept=".csv"
                    id="upload-bulk"
                    onChange={handleFileInputChange}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="56"
                    height="56"
                    viewBox="0 0 56 56"
                    fill="none"
                    style={{ cursor: 'pointer' }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M26.761 18.011C26.9236 17.848 27.1167 17.7187 27.3293 17.6305C27.5419 17.5423 27.7698 17.4969 28 17.4969C28.2302 17.4969 28.4581 17.5423 28.6707 17.6305C28.8833 17.7187 29.0764 17.848 29.239 18.011L36.239 25.011C36.4017 25.1737 36.5308 25.3669 36.6188 25.5795C36.7069 25.792 36.7522 26.0199 36.7522 26.25C36.7522 26.4801 36.7069 26.708 36.6188 26.9205C36.5308 27.1331 36.4017 27.3263 36.239 27.489C36.0763 27.6517 35.8831 27.7808 35.6705 27.8688C35.458 27.9569 35.2301 28.0022 35 28.0022C34.7699 28.0022 34.542 27.9569 34.3295 27.8688C34.1169 27.7808 33.9237 27.6517 33.761 27.489L29.75 23.4745V36.75C29.75 37.2141 29.5656 37.6593 29.2374 37.9874C28.9093 38.3156 28.4641 38.5 28 38.5C27.5359 38.5 27.0908 38.3156 26.7626 37.9874C26.4344 37.6593 26.25 37.2141 26.25 36.75V23.4745L22.239 27.489C21.9104 27.8176 21.4647 28.0022 21 28.0022C20.5353 28.0022 20.0896 27.8176 19.761 27.489C19.4324 27.1604 19.2478 26.7147 19.2478 26.25C19.2478 25.7853 19.4324 25.3396 19.761 25.011L26.761 18.011Z"
                      fill="#3C76FF"
                    />
                    <path
                      d="M15.421 11.697C18.9192 8.68047 23.3809 7.01448 28 7C37.415 7 45.2305 14 46.081 23.0265C51.653 23.814 56 28.4795 56 34.2055C56 40.4915 50.757 45.5 44.4045 45.5H13.2335C5.978 45.5 0 39.781 0 32.613C0 26.4425 4.431 21.3325 10.297 20.0375C10.7975 17.017 12.74 14.007 15.421 11.697ZM17.7065 14.3465C15.057 16.632 13.671 19.3865 13.671 21.5425V23.1105L12.1135 23.282C7.224 23.8175 3.5 27.832 3.5 32.613C3.5 37.7475 7.805 42 13.2335 42H44.4045C48.93 42 52.5 38.458 52.5 34.2055C52.5 29.9495 48.93 26.4075 44.4045 26.4075H42.6545V24.6575C42.658 16.8875 36.148 10.5 28 10.5C24.2196 10.5151 20.5689 11.877 17.7065 14.3465Z"
                      fill="#3C76FF"
                    />
                  </svg>
                </div>
                <div className="bulk-products">
                  <p className="drag-bulk">
                    Drag & drop files or{' '}
                    <span className="browse-bulk" onClick={handleUploadClick}>
                      Browse Support Format CSV File
                    </span>
                  </p>
                </div>
              </div>
              <div className="bulk-model-last">
                {fileData !== null ? (
                  <p className="bulk-file-choose">File: {fileData.name}</p>
                ) : (
                  <p className="bulk-file-choose">No File Choosen</p>
                )}
                {bulkProducts?.length ? <CustomButton
                  onClick={() => handleSave()}
                  style={{ height: '50px', width: '400px' }}
                  variant="primary"
                  placeholder="Save"
                  className="save-bulk-btn"
                />
                  : <CustomButton
                    onClick={() => handleSave()}
                    style={{ height: '50px', width: '400px' }}
                    variant="primary"
                    placeholder="Save"
                    className="save-bulk-btn"
                    isEnabledbtn={true}
                  />
                }
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default BulkImportModel;
