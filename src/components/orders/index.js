// library imports

// component imports
import { Table, Badge } from 'react-bootstrap';
import Arrow from '../../assets/Arrow.svg'
import ArrowUpRright from '../../assets/ArrowUpright.svg'
// import Badge from 'react-bootstrap/Badge';
// redux imports

// style imports
// import {  } from 'react-bootstrap';
import './style.css'
// component
const Orders = () => {
  // heading
  const heading = [
    {
      Text: 'Date',
      hasArrow: true,
      hasHash: false
    },
    {
      Text: 'Order',
      hasArrow: false,
      hasHash: true
    },
    {
      Text: 'User',
      hasArrow: true,
      hasHash: false
    },
    {
      Text: 'Product(s)',
      hasArrow: true,
      hasHash: false
    },
    {
      Text: 'Amount',
      hasArrow: true,
      hasHash: false
    },
    {
      Text: 'Status',
      hasArrow: false,
      hasHash: false
    },
    {
      Text: 'Action',
      hasArrow: false,
      hasHash: false
    }
  ]
  // data
  // const data = [{ date: '11 Sep 2023' }, { order: '342599' }, { user: 'Jackson Smith' }, { products: '45' }, { amount: '$00.00' }, { status: 'Paid' }, { action: 'Mark as delivered' }]
  // component return
  return (
    <div>
      <div className="total_container">
        <div className="total_div"><p style={{ marginLeft: '10px' }}> Total orders </p>
          <div className='total'>
            <p style={{ marginLeft: '-10px', fontSize: '25px', color: '#007BFF' }}>{`${10}`}</p>
            <p>{ }</p>
          </div>
        </div>
        <div className="total_div"><p style={{ marginLeft: '10px' }}>  Total Units </p>
          <div className='total'>
            <p style={{ marginLeft: '-10px', color: '#007BFF', fontSize: '25px' }}>{`${45}`}</p>
            <p>{ }</p>
          </div>
        </div>
        <div className="total_div"><p>  Total Amount </p>
          <div className='total'>
            <p style={{ marginLeft: '-10px', fontSize: '25px', color: '#007BFF' }}>{`$${100},000`}</p>
            <p>{ }</p>
          </div>
        </div>
      </div>
      <div className='orders_div'>
        <div><p className='orders'>Orders</p></div>
        <div><p className='search'>Search: <input className='input_field' placeholder='Search by user or order ID' /></p></div>
      </div>
      <div>
        <Table>
          <thead style={{ backgroundColor: '#E9ECEF' }}>
            <tr>
              {heading?.map((head, index) => {
                // console.log(head);
                return (
                  <th key={index} >
                    {`${head?.Text || 'N/A'}`}
                    {head?.hasArrow ? <img src={Arrow} /> : <></>}
                    {head?.hasHash ? ' #' : <></>}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
                return (
                  <tr key={index}>
                    <td>11 Sept 2023</td>
                    <td>Order No</td>
                    <td>Jackson Smith</td>
                    <td>45</td>
                    <td>$00.00</td>
                    {/* <td><span className='badge'>Paid</span></td> */}
                    <td><Badge bg="#28A745">Paid</Badge></td>
                    {/* <td><span className='mark_delivered'><span><img src={ArrowUpRright} /></span>Mark as delivered</span></td> */}
                    <td><img src={ArrowUpRright} /><span className='mark_delivered'>Mark as delivered</span></td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Orders;
