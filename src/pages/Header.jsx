import React from 'react';
import { Link } from 'react-router-dom';
import i from './시안4.png';
import Page from './home/Sections';

const Header = ({ name, setName, handleLinkClick, headerHeight }) => {
  const clk = () => {
    setName('');
  };

  return (
    <header
      className="bg-white text-gray-600 body-font shadow w-full overflow-hidden"
      style={{ height: headerHeight, transition: 'height 0.3s ease' }}
    >
      <div className="container mx-auto flex flex-wrap p-5 pt-0 pb-4 md:pb-0 flex-col md:flex-row items-center w-full">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-headerTextColor"
          onClick={() => handleLinkClick('auto')}
        >
          <img src={i} alt="" width="200px" />
        </Link>
        <nav className="md:ml-auto flex flex-row items-center text-center flex-nowrap items-center text-base justify-center w-full md:w-auto">
          <Link
            to="/"
            className="mr-10 ml-10 text-sm hover:text-headerTextColor font-semibold hover:scale-105 transition duration-150"
            onClick={() => handleLinkClick('auto')}
          >
            Home
          </Link>
          <Link
            to="/auction"
            className="mr-10 text-sm hover:text-headerTextColor font-semibold hover:scale-105 transition duration-150"
            onClick={() => handleLinkClick('450px')}
          >
            Auction
          </Link>
          <Link
            to="/mylist"
            className="mr-10 text-sm text-nowrap hover:text-headerTextColor font-semibold hover:scale-105 transition duration-150"
            onClick={() => handleLinkClick('450px')}
          >
            My List
          </Link>
          <Link
            to="/login"
            className="mr-10 text-sm hover:text-headerTextColor font-semibold hover:scale-105 transition duration-150"
            onClick={() => handleLinkClick('450px')}
          >
            {name === '' ? 'Login' : <div onClick={() => clk()}>Logout</div>}
          </Link>
        </nav>
      </div>
      <div
        className="overflow-hidden"
        style={{
          maxHeight: headerHeight === '450px' ? '450px' : 'none',
          transition: 'max-height 0.3s ease',
        }}
      >
        <Page handleLinkClick={handleLinkClick} headerHeight={headerHeight} />
      </div>
    </header>
  );
};

export default Header;
