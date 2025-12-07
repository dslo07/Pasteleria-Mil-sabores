import { Outlet } from "react-router-dom";
import NavBar from '../../components/UserCompo/NavBar'
import Footer from '../../components/UserCompo/Footer'


const Layout = () => {
  return ( 
      <>
        <NavBar/>
          <div className="mt-5"></div>
          <Outlet />
        <Footer/>
      </>
  );
};

export default Layout;
