// const fileReader = new FileReader();

// const handleFileInputChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       console.log('Selected file:', file);
//       setFileData(file);
//       const newBulkProducts = [];
//       fileReader.onload = function (event) {
//         const text = event.target.result;
//         const rows = text.split('\n');
//         console.log(text, rows);
//         if (rows.length > 0) {
//           for (let i = 0; i < rows.length - 1; i++) {
//             if (i === 0) {
//               const firstRow = rows[i].trim();
//               const header = firstRow.split(',');
//               console.log(header);
//             }
//             else {
//               const newData = rows[i].split(',');
//               newBulkProducts.push(newData);
//             }
//           }
//           setBulkProducts(newBulkProducts);
//         }
//       };
//       fileReader.readAsText(file);
//     }
//   };

// const totalPaidOrders = await OrderSchema.aggregate([
//   {
//     $match: {
//       isPaid: true,
//     },
//   },
//   {
//     $group: {
//       _id: null,
//       count: { $sum: 1 },
//     },
//   },
// ]);

// const totalUnpaidOrders = await OrderSchema.aggregate([
//   {
//     $match: {
//       isPaid: false,
//     },
//   },
//   {
//     $group: {
//       _id: null,
//       count: { $sum: 1 },
//     },
//   },
// ]);

// console.log(
//   '\n\n',
//   'TotalPaidOrders and Unpaid',
//   { totalPaidOrders },
//   { totalUnpaidOrders }
// );

// const topSellingProducts = await ProductSchema.aggregate([
//   {
//     $sort: { sold: -1 },
//   },
//   {
//     $limit: 10,
//   },
// ]);

// console.log('Top selling products are:', topSellingProducts);

// // Function to calculate one year stats
// const calculateOneYearStats = async () => {
//   const oneYearStats = [];

//   for (let i = 0; i < 12; i++) {
//     const startOfMonth = moment()
//       .subtract(i, 'months')
//       .startOf('month')
//       .toDate();
//     const endOfMonth = moment()
//       .subtract(i, 'months')
//       .endOf('month')
//       .toDate();

//     const monthlyStats = await OrderSchema.aggregate([
//       {
//         $match: {
//           date: { $gte: startOfMonth, $lte: endOfMonth },
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           totalOrders: {
//             $sum: 1,
//           },
//           totalSales: {
//             $sum: { $toDouble: '$total' },
//           },
//         },
//       },
//     ]);

//     oneYearStats.push({
//       month: moment(startOfMonth).format('MMM'),
//       totalOrders: monthlyStats[0]?.totalOrders || 0,
//       totalSales: monthlyStats[0]?.totalSales || 0,
//     });
//   }

//   return oneYearStats;
// };

// const oneYearStats = await calculateOneYearStats();

// console.log('\n\n', 'One Year Stats', { oneYearStats });

// job.attrs.progress = 50;
// await job.save();

//
//
//
// const DashboardLineChart = ({ oneYearStats }) => {
//   // Sort the data by month
//   const statsArray = Object.keys(oneYearStats)
//     .map((key) => oneYearStats[key])
//     .sort((a, b) => {
//       const monthNames = [
//         'Jan',
//         'Feb',
//         'Mar',
//         'Apr',
//         'May',
//         'Jun',
//         'Jul',
//         'Aug',
//         'Sep',
//         'Oct',
//         'Nov',
//         'Dec',
//       ];
//       return monthNames.indexOf(a.month) - monthNames.indexOf(b.month);
//     });

//   const data = statsArray.map((entry) => ({
//     name: entry.month,
//     orders: entry.totalOrders || 0,
//     sales: entry.totalSales || 0,
//   }));

// // Library imports
// import { useSelector } from 'react-redux/es/hooks/useSelector';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// // component imports
// import ShopingCart from '../../assets/ShopingCart.svg';
// import CustomPieChart from '../utils/PieChart';
// import CustomLineChart from '../utils/LineChart';
// import CircleGreen from '../../assets/CircleGreen.svg'
// import CircleBlue from '../../assets/CircleBlue.svg'
// import CustomTable from '../Table';
// // Redux imports
// import { getDashboardStats } from '../../redux/slices/dashboardStats';
// import { TopSellingProducts } from '../../redux/slices/productsSlice';
// import { GetNotifications } from '../../redux/slices/notification-slice';
// // style imports
// import './style.css';
// import { Table } from 'react-bootstrap';

// // component
// const Dashbord = () => {
//   const topSellingProducts = useSelector((state) => state.productsReducer?.topsellingProducts);
//   const totalPaidOrders = useSelector((state) => state.dashboardStatsReducer?.data?.totalPaidOrders);
//   const totalUnpaidOrders = useSelector((state) => state.dashboardStatsReducer?.data?.totalUnpaidOrders);
//   const oneYearStats = useSelector((state) => state.dashboardStatsReducer?.data?.oneYearStats);
//   console.log('\n\n OneYearStats ', oneYearStats, totalPaidOrders);

//   const data = [
//     { name: 'Group A', value: totalPaidOrders },
//     { name: 'Group B', value: totalUnpaidOrders }
//   ];
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getDashboardStats());
//     dispatch(TopSellingProducts())
//     dispatch(GetNotifications());
//   }, [])

//   const stats = useSelector((state) => state.dashboardStatsReducer?.data[0]);
//   const todayStats = stats?.todayStats;
//   const sevenDayStats = stats?.sevenDayStats;
//   const thirtyDayStats = stats?.thirtyDayStats;

//   const LineChartData = oneYearStats?.map((entry) => ({
//     name: entry.month,
//     orders: entry.totalOrders || 0,
//     sales: entry.totalSales || 0,
//   }));

//   // colors
//   const colors = ['#5366FF', '#5DDC6B', '#5DD56B'];
//   // top selling heading
//   const heading = [{ Text: 'Title', hasArrow: true }, { Text: 'Units', hasArrow: true },
//   // eslint-disable-next-line indent
//   { Text: 'Amount', hasArrow: true }]
//   //
//   return (
//     <div>
//       <h6>Dashboard Page</h6>
//       <div className="days_container">
//         <div className="days"><p style={{ marginLeft: '10px', marginTop: '10px' }}> <img src={ShopingCart} /> Today </p>
//           <div className='total'>
//             <p style={{ marginLeft: '-10px' }}>{todayStats ? `Total Products: ${todayStats?.totalOrders}` : `Total Products: ${0}`}</p>
//             <p>{todayStats ? `Total Orders: ${todayStats?.totalOrders}` : `Total Orders: ${0}`}</p>
//           </div>
//           <div className='total'>
//             <p style={{ marginLeft: '-28px' }}>{todayStats ? `Total Units: ${todayStats?.totalUnits}` : `Total Units: ${0}`}</p>
//             <p>{todayStats ? `Total Sales: ${todayStats?.totalSales}` : `Total Sales: ${0}`}</p>
//           </div>
//         </div>
//         <div className="days"><p style={{ marginLeft: '10px', marginTop: '10px' }}> <img src={ShopingCart} /> 7 Days </p>
//           <div className='total'>
//             <p style={{ marginLeft: '-10px' }}>{`Total Products ${sevenDayStats?.totalOrders}`}</p>
//             <p>{`Total Orders ${sevenDayStats?.totalOrders}`}</p>
//           </div>
//           <div className='total'>
//             <p style={{ marginLeft: '-18px' }}>{`Total Units ${sevenDayStats?.totalUnits}`}</p>
//             <p>{`Total Sales $${sevenDayStats?.totalSales}`}</p>
//           </div>
//         </div>
//         <div className="days"><p style={{ marginLeft: '10px', marginTop: '10px' }}> <img src={ShopingCart} /> 30 Days </p>
//           <div className='total'>
//             <p style={{ marginLeft: '-10px' }}>{`Total Products ${thirtyDayStats?.totalOrders}`}</p>
//             <p>{`Total Orders ${thirtyDayStats?.totalOrders}`}</p>
//           </div>
//           <div className='total'>
//             <p style={{ marginLeft: '-18px' }}>{`Total Units ${thirtyDayStats?.totalUnits}`}</p>
//             <p>{`Total Sales $${thirtyDayStats?.totalSales}`}</p>
//           </div>
//         </div>
//       </div>
//       {/* orders overview dive */}
//       <div className='d-flex'>
//         <div className='d-flex justify-content-start'><p>Orders Overview</p></div>
//         <div className='d-flex justify-content-start' style={{ marginLeft: '280px' }}><p>Sales and Orders Report</p></div>
//       </div>
//       <div className='orders_overview_container'>
//         <div className='pie_chart'>
//           <CustomPieChart data={data} colors={colors} />
//           <div className='d-flex justify-content-around'>
//             <p> <img src={CircleGreen} />Orders Unpaid</p>
//             <p><img src={CircleBlue} />Orders Paid</p>
//           </div>
//         </div>
//         <div className='line_chart'>
//           <div><CustomLineChart data={LineChartData} /></div>
//         </div>
//       </div>
//       <div className='d-flex'><p>Top Selling Products</p></div>
//       <div className='top_products'>
//         {/* <CustomTable tableHeading={heading} data={first10} hasActions={false} /> */}
//         <Table>
//           <thead>
//             <tr>
//               {heading?.map((head, index) => {
//                 return (
//                   <th key={index}>
//                     {`${head?.Text || 'N/A'}`}
//                   </th>
//                 );
//               })}
//             </tr>
//           </thead>
//           <tbody>
//             {
//               topSellingProducts?.map((data, index) => {
//                 return (
//                   <tr key={index}>
//                     <td>{data?.detail[0]?.title}</td>
//                     <td>{data?.totalQty}</td>
//                     <td>{data?.total}</td>
//                   </tr>
//                 )
//               })
//             }
//           </tbody>
//         </Table>
//       </div>
//     </div>
//   );
// }

// export default Dashbord;
