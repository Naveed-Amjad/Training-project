import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

// component imports
import CustomButton from '../button';
import close from '../../assets/close.svg';
import ProductsUploadErrosModel from './products-upload-errors';
// import warning from '../../../assets/warning.svg';
import './product-progress.css';
import { useSelector } from 'react-redux';

const ImportProgress = ({ show, setShowProgress, fileName, action }) => {
  const successfullyUpload = useSelector((state) => state.productsReducer?.successfullyUpload)
  const uploadFailed = useSelector((state) => state.productsReducer?.uploadFailed)

  const succPrcnt = 100 * (successfullyUpload / (successfullyUpload + uploadFailed));
  const condClass =
    succPrcnt === 100 ? 'totalRad' : succPrcnt === 0 ? 'totalRad' : '';

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showCanvas, setShowCanvas] = useState(show);

  return (
    <>
      <div className="ImportProgressWrapper">
        <div className="progHeader">
          <div className="progTitle">Uploaded File Status</div>
          <div className="ProgHeader_rt">
            {/* <img src={retry} className="progIcon" /> */}
            <img
              src={close}
              className="progIcon"
              onClick={() => setShowProgress(false)}
            />
          </div>
        </div>

        <div className="progStats">
          <div>
            <div className="statTitle">
              <span>File Name:</span>
            </div>
            <div className="stat">
              <span>{fileName}</span>
            </div>
          </div>

          <div>
            <div className="statTitle">
              <span style={{ marginLeft: '10px' }}>Status:</span>
            </div>
            <div className="progBarWapper">
              <div className="stat">
                <span style={{ marginLeft: '10px' }}>Completed</span>
              </div>
              <div className="progBar">
                <div
                  style={{ width: `${succPrcnt}%` }}
                  className={`progSucc ${condClass}`}
                />
                <div
                  style={{ width: `calc(100% - ${succPrcnt}%)` }}
                  className={`progErr ${condClass}`}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="statTitle">
              <span style={{ marginLeft: '0px' }}>Total Products:</span>
            </div>
            <div className="stat">
              <span style={{ marginLeft: '20px' }}>{successfullyUpload + uploadFailed}</span>
            </div>
          </div>

          <div>
            <div className="statTitle">
              <span style={{ marginLeft: '10px' }}>Successful:</span>
            </div>
            <div className="stat" style={{ color: '#19C240' }}>
              <span style={{ marginLeft: '10px' }}>{successfullyUpload}</span>
            </div>
          </div>

          <div>
            <div className="statTitle">
              <span style={{ marginLeft: '10px' }}>Failed:</span>
            </div>
            <div className="stat" style={{ color: '#D9081C' }}>
              <span style={{ marginLeft: '10px' }}>{uploadFailed}</span>
            </div>
          </div>

          <div className="progBtn">
            <CustomButton
              onClick={() => setShowErrorModal(true)}
              style={{ height: '40px', width: '200px', marginLeft: '250px' }}
              placeholder="View Errors"
              // className={'viewErrorBtn'}
            />
          </div>
          {showErrorModal && <ProductsUploadErrosModel onClose={() => setShowErrorModal(false)} show={true} />}
        </div>
      </div>
    </>
  );
};

export default ImportProgress;
