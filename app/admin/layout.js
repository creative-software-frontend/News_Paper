import '../globals.css';
import Sidebar from '../components/Admin/Sidebar/Sidebar';
import AdminNavbar from '../components/Admin/Navbars/AdminNavbar';
import HeaderStats from '../components/Admin/Headers/HeaderStats';
import FooterAdmin from '../components/Admin/Footers/FooterAdmin';

const uiSans = {
  variable: '--font-ui-sans',
  fontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en" className={`${uiSans.variable}`}>
      <body>
        <Sidebar />
        <div className="relative md:ml-64 bg-blueGray-100">
          <AdminNavbar />
          {/* Header */}
          <HeaderStats />

          <div className="px-4 md:px-10 mx-auto w-full -m-24">
            {children}
            <FooterAdmin />
          </div>
        </div>
      </body>
    </html>
  );
}
