// app/layout.js
import { ToastContainer } from 'react-toastify';
import NavItems from '../components/Navbar';
import '../globals.css';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'My News App',
  description: 'News app built with Next.js 13',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavItems></NavItems>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </body>
    </html>
  );
}
