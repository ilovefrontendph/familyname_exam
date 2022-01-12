import logo from "../logo.png";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div>
      <header>
        <nav className="p-6">
          <div className="flex justify-between items-center">
            <h1 className="pr-6 border-r-2 text-2xl font-bold text-gray-500">
              mcamazing
            </h1>
            <div className="flex justify-between flex-grow">
              <div className="flex ml-6 items-center">
                <span className="h-10 w-10">
                  <img src={logo} />
                </span>
              </div>
              <div className="md:flex space-x-6 hidden">
                <Link className="text-gray-500 text-md" to="/landing">
                  Landing
                </Link>
                <Link className="text-gray-500 text-md" to="/about">
                  About
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
