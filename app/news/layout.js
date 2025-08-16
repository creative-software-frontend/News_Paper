// app/layout.js
import NavItems from '../components/Navbar';
import '../globals.css';

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
      </body>
    </html>
  );
}
