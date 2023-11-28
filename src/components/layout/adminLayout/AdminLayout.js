import CustomNavbar from '../../Navbar';
import CustomSideBar from '../../sidebar';
// import AgGrid from '../../components/AgGrid';
// import Rectangle from '../../components/Rectangle';
// import Table from 'react-bootstrap/Table';
// style imports
import './style.css'
const AdminLayout = ({ children }) => {
  return (
    <>
      <CustomNavbar />
      <div style={{ paddingTop: '62px' }} className='d-flex'>
        <CustomSideBar />
        <div style={{ marginLeft: '40px' }}>
          {/* <div className='add_product'>
                    <div>Products</div>
                    <div className='d-flex jus'>
                        <div>Import Bulk Producst</div>
                        <div>Add New</div>
                    </div>
                </div> */}
          {children}
        </div>
      </div>

    </>
  );
}

export default AdminLayout;
