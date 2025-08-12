export default function FooterAdmin() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()}{' '}
              <a
                href="https://www.creative-tim.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Creative Tim
              </a>
              . Distributed by{' '}
              <a
                href="https://themewagon.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                ThemeWagon
              </a>
              .
            </p>
          </div>

          <nav className="flex flex-wrap justify-center md:justify-end space-x-4">
            <a
              href="#!"
              className="text-sm text-gray-600 hover:text-indigo-600 transition-colors px-2 py-1"
            >
              Creative Tim
            </a>
            <a
              href="#!"
              className="text-sm text-gray-600 hover:text-indigo-600 transition-colors px-2 py-1"
            >
              About Us
            </a>
            <a
              href="#!"
              className="text-sm text-gray-600 hover:text-indigo-600 transition-colors px-2 py-1"
            >
              Blog
            </a>
            <a
              href="#!"
              className="text-sm text-gray-600 hover:text-indigo-600 transition-colors px-2 py-1"
            >
              MIT License
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
