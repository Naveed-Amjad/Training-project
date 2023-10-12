// Library imports
import { useSelector } from 'react-redux/es/hooks/useSelector';
// component imports
import ShopingCart from '../../assets/ShopingCart.svg';
import CustomPieChart from '../utils/PieChart';
import CustomLineChart from '../utils/LineChart';
import CircleGreen from '../../assets/CircleGreen.svg'
import CircleBlue from '../../assets/CircleBlue.svg'
import CustomTable from '../Table';
// Redux imports

// style imports
import './style.css';

// component
const Dashbord = () => {
  // data for pie chart
  const data = [
    { name: 'Group A', value: 450 },
    { name: 'Group B', value: 300 }
    // { name: 'Group C', value: 200 }
  ];
  // data for line chart
  const Linedata = [
    {
      name: 'Jan',
      uv: 1000,
      pv: 2800,
      amt: 3000
    },
    {
      name: 'Feb',
      uv: 3200,
      pv: 1598,
      amt: 2710
    },
    {
      name: 'Mar',
      uv: 2000,
      pv: 9800,
      amt: 1290
    },
    {
      name: 'Apr',
      uv: 2780,
      pv: 3908,
      amt: 1000
    },
    {
      name: 'May',
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: 'Jun',
      uv: 1590,
      pv: 3800,
      amt: 2500
    },
    {
      name: 'Jul',
      uv: 2490,
      pv: 4300,
      amt: 2100
    },
    {
      name: 'Aug',
      uv: 1490,
      pv: 4300,
      amt: 2100
    },
    {
      name: 'Sep',
      uv: 3490,
      pv: 2300,
      amt: 2100
    },
    {
      name: 'Oct',
      uv: 1390,
      pv: 3300,
      amt: 2100
    },
    {
      name: 'Nov',
      uv: 1790,
      pv: 4300,
      amt: 2100
    },
    {
      name: 'Dec',
      uv: 1490,
      pv: 3300,
      amt: 2100
    }
  ];
  // colors
  const colors = ['#5366FF', '#5DDC6B', '#5DD56B'];
  // top selling heading
  const heading = [{ Text: 'Products', hasArrow: true }, { Text: 'Stock', hasArrow: true }, { Text: 'Units', hasArrow: true },
  // eslint-disable-next-line indent
  { Text: 'Amount', hasArrow: true }, { Text: 'Date', hasArrow: true }]
  // top selling data
  const topProducts = useSelector((state) => state.productsReducer.products);
  const first10 = topProducts?.slice(0, (topProducts?.length || 0) - 20)
  console.log('topRroducts', topProducts);
  //
  return (
    <div>
      <h6>Dashboard Page</h6>
      <div className="days_container">
        <div className="days"><p style={{ marginLeft: '10px', marginTop: '10px' }}> <img src={ShopingCart} /> Today </p>
          <div className='total'>
            <p style={{ marginLeft: '-10px' }}>{`Total Products ${78}`}</p>
            <p>{`Total Orders ${23}`}</p>
          </div>
          <div className='total'>
            <p style={{ marginLeft: '-28px' }}>{`Total Units ${34}`}</p>
            <p>{`Total Sales $${1145}`}</p>
          </div>
        </div>
        <div className="days"><p style={{ marginLeft: '10px', marginTop: '10px' }}> <img src={ShopingCart} /> 7 Days </p>
          <div className='total'>
            <p style={{ marginLeft: '-10px' }}>{`Total Products ${78}`}</p>
            <p>{`Total Orders ${23}`}</p>
          </div>
          <div className='total'>
            <p style={{ marginLeft: '-18px' }}>{`Total Units ${34}`}</p>
            <p>{`Total Sales $${1145}`}</p>
          </div>
        </div>
        <div className="days"><p style={{ marginLeft: '10px', marginTop: '10px' }}> <img src={ShopingCart} /> 30 Days </p>
          <div className='total'>
            <p style={{ marginLeft: '-10px' }}>{`Total Products ${78}`}</p>
            <p>{`Total Orders ${23}`}</p>
          </div>
          <div className='total'>
            <p style={{ marginLeft: '-18px' }}>{`Total Units ${34}`}</p>
            <p>{`Total Sales $${1145}`}</p>
          </div>
        </div>
      </div>
      {/* orders overview dive */}
      <div className='d-flex'>
        <div className='d-flex justify-content-start'><p>Orders Overview</p></div>
        <div className='d-flex justify-content-start' style={{ marginLeft: '280px' }}><p>Sales and Orders Report</p></div>
      </div>
      <div className='orders_overview_container'>
        <div className='pie_chart'>
          <CustomPieChart data={data} colors={colors} />
          <div className='d-flex justify-content-around'>
            <p> <img src={CircleGreen} />Orders Paid</p>
            <p><img src={CircleBlue} />Orders Unpaid</p>
          </div>
        </div>
        <div className='line_chart'>
          <div><CustomLineChart data={Linedata} /></div>
        </div>
      </div>
      <div className='d-flex'><p>Top Selling Products</p></div>
      <div className='top_products'>
        <CustomTable tableHeading={heading} data={first10} hasActions={false} />
      </div>
    </div>
  );
}

export default Dashbord;
