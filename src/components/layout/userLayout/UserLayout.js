import CustomNavbar from '../../Navbar';
const UserLayout = ({ children }) => {
  // const path = window.location.pathname;
  // console.log(path);
  return (
    <>
      <div style={{ height: '60px' }}><CustomNavbar /></div>
      <div>
        {children}
      </div>

    </>
  );
}
export default UserLayout;
