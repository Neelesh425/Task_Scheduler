import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar';
import './index.scss';

const Layout = () => {
  const location = useLocation();
  const showSidebar = location.pathname !== '/' && location.pathname !== '/signup';

  return (
    <div className="layout">
      {showSidebar && <Sidebar />}
      <div className={`layout__content ${showSidebar ? 'with-sidebar' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;