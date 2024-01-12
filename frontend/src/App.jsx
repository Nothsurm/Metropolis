import { Outlet } from 'react-router-dom';
import Navigation from './pages/Auth/Navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavigationResponsive from './pages/Auth/NavigationResponsive';

export default function App() {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <NavigationResponsive />
      <main className='py-3'>
        <Outlet />
      </main>
    </>
  )
}

