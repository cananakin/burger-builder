import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import BurgerBuilder from './pages/BurgerBuilder';
import Order from './pages/Order/Order';
import Checkout from './pages/Checkout/Checkout';
import ErrorPage from './pages/ErrorPage';
import Layout from './hoc/Layout';
import CheckoutLayout from './pages/Checkout/Layout';
import ContactData from './pages/Checkout/ContactData/ContactData';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <BurgerBuilder /> },
        { path: 'orders', element: <Order /> },
        { 
          path: 'checkout', 
          element: <CheckoutLayout />,
          children: [
            { index: true, element: <Checkout />},
            { path: 'contact-data', element: <ContactData/> }
          ]
        }
      ]
    }
  ]);
  return <RouterProvider router={router}></RouterProvider>
}

export default App
