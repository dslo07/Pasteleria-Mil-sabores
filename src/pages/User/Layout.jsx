import { Outlet } from "react-router-dom";
import NavBar from '../../components/UserCompo/NavBar'
import Footer from '../../components/UserCompo/Footer'


const Layout = () => {
  return ( 
      <>
        <NavBar/>
          <Outlet />
        <Footer/>
      </>
  );
};

export default Layout;
