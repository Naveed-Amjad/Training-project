// Library imports
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// component imports
import ShopingCart from '../../assets/ShopingCart.svg';
import CustomPieChart from '../utils/PieChart';
import CustomLineChart from '../utils/LineChart';
import CircleGreen from '../../assets/CircleGreen.svg';
import CircleBlue from '../../assets/CircleBlue.svg';
import CustomTable from '../Table';
import { Table } from 'react-bootstrap';
// Redux imports
import { getDashboardStats } from '../../redux/slices/dashboardStats';
import { TopSellingProducts } from '../../redux/slices/productsSlice';
import { GetNotifications } from '../../redux/slices/notification-slice';
// style imports
import './style.css';

// component
const Dashbord = () => {
  const topSellingProducts = useSelector(
    (state) => state.productsReducer?.topsellingProducts
  );
  const totalPaidOrders = useSelector(
    (state) => state.dashboardStatsReducer?.data?.totalPaidOrders
  );
  console.log('🚀 ~ file: index.js:28 ~ Dashbord ~ totalPaidOrders:', totalPaidOrders)
  const totalUnpaidOrders = useSelector(
    (state) => state.dashboardStatsReducer?.data?.totalUnpaidOrders
  );
  console.log('🚀 ~ file: index.js:32 ~ Dashbord ~ totalUnpaidOrders:', totalUnpaidOrders)
  const oneYearStats = useSelector(
    (state) => state.dashboardStatsReducer?.data?.oneYearStats
  );
  console.log('\n\n OneYearStats ', oneYearStats, totalPaidOrders);

  const data = [
    { name: 'Group A', value: totalPaidOrders },
    { name: 'Group B', value: totalUnpaidOrders },
  ];
  console.log('\n\n\n DATA = ', data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDashboardStats());
    dispatch(TopSellingProducts());
    dispatch(GetNotifications());
  }, []);

  const stats = useSelector((state) => state.dashboardStatsReducer?.data);
  const todayStats = stats?.todayStats;
  const sevenDayStats = stats?.sevenDayStats;
  const thirtyDayStats = stats?.thirtyDayStats;
  console.log('\n\n todayStats ', todayStats);
  console.log('\n\n todayStats ', sevenDayStats);
  console.log('\n\n todayStats ', thirtyDayStats);
  const LineChartData = oneYearStats?.map((entry) => ({
    name: entry.month,
    orders: entry.totalOrders || 0,
    sales: entry.totalSales || 0,
  }));

  // colors
  const colors = ['#5366FF', '#5DDC6B', '#5DD56B'];
  // top selling heading
  const heading = [
    { Text: 'Title', hasArrow: true },
    { Text: 'Units', hasArrow: true },
    // eslint-disable-next-line indent
    { Text: 'Amount', hasArrow: true },
  ];
  //
  return (
    <div>
      <h6>Dashboard Page</h6>
      <div className="days_container">
        <div className="days">
          <p style={{ marginLeft: '10px', marginTop: '10px' }}>
            {' '}
            <img src={ShopingCart} /> Today{' '}
          </p>
          <div className="total">
            <p style={{ marginLeft: '-10px' }}>
              {todayStats
                ? `Total Products: ${todayStats?.totalOrders}`
                : `Total Products: ${0}`}
            </p>
            <p>
              {todayStats
                ? `Total Orders: ${todayStats?.totalOrders}`
                : `Total Orders: ${0}`}
            </p>
          </div>
          <div className="total">
            <p style={{ marginLeft: '-28px' }}>
              {todayStats
                ? `Total Units: ${todayStats?.totalUnits}`
                : `Total Units: ${0}`}
            </p>
            <p>
              {todayStats
                ? `Total Sales: ${todayStats?.totalSales}`
                : `Total Sales: ${0}`}
            </p>
          </div>
        </div>
        <div className="days">
          <p style={{ marginLeft: '10px', marginTop: '10px' }}>
            {' '}
            <img src={ShopingCart} /> 7 Days{' '}
          </p>
          <div className="total">
            <p style={{ marginLeft: '-10px' }}>{`Total Products $${sevenDayStats?.totalOrders ? sevenDayStats?.totalOrders : '0'
              }`}</p>
            <p>{`Total Orders $${sevenDayStats?.totalOrders ? sevenDayStats?.totalOrders : '0'
              }`}</p>
          </div>
          <div className="total">
            <p style={{ marginLeft: '-18px' }}>{`Total Units $${sevenDayStats?.totalUnits ? sevenDayStats?.totalUnits : '0'
              }`}</p>
            <p>{`Total Sales $${sevenDayStats?.totalSales ? sevenDayStats?.totalSales : '0'
              }`}</p>
          </div>
        </div>
        <div className="days">
          <p style={{ marginLeft: '10px', marginTop: '10px' }}>
            {' '}
            <img src={ShopingCart} /> 30 Days{' '}
          </p>
          <div className="total">
            <p style={{ marginLeft: '-10px' }}>{`Total Products $${thirtyDayStats?.totalOrders ? thirtyDayStats?.totalOrders : '0'
              }`}</p>
            <p>{`Total Orders $${thirtyDayStats?.totalOrders ? thirtyDayStats?.totalOrders : '0'
              }`}</p>
          </div>
          <div className="total">
            <p style={{ marginLeft: '-18px' }}>{`Total Units $${thirtyDayStats?.totalUnits ? thirtyDayStats?.totalUnits : '0'
              }`}</p>
            <p>{`Total Sales $${thirtyDayStats?.totalSales ? thirtyDayStats?.totalSales : '0'
              }`}</p>
          </div>
        </div>
      </div>
      {/* orders overview dive */}
      <div className="d-flex">
        <div className="d-flex justify-content-start">
          <p>Orders Overview</p>
        </div>
        <div
          className="d-flex justify-content-start"
          style={{ marginLeft: '280px' }}
        >
          <p>Sales and Orders Report</p>
        </div>
      </div>
      <div className="orders_overview_container">
        <div className="pie_chart">
          <CustomPieChart data={data} colors={colors} />
          <div className="d-flex justify-content-around">
            <p>
              {' '}
              <img src={CircleGreen} />
              Orders Unpaid
            </p>
            <p>
              <img src={CircleBlue} />
              Orders Paid
            </p>
          </div>
        </div>
        <div className="line_chart">
          <div>
            <CustomLineChart data={LineChartData} />
          </div>
        </div>
      </div>
      <div className="d-flex">
        <p>Top Selling Products</p>
      </div>
      <div className="top_products">
        <Table>
          <thead>
            <tr>
              {heading?.map((head, index) => {
                return <th key={index}>{`${head?.Text || 'N/A'}`}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {topSellingProducts?.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data?.detail[0]?.title}</td>
                  <td>{data?.totalQty}</td>
                  <td>{data?.total}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Dashbord;
