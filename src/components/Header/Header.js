import { LOGO_URL } from "../../utils/constants";
import { Link, NavLink } from 'react-router-dom';
import "./Header.css"
import { useSelector } from "react-redux";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // subscribing to the store using selector.
  const cartItems = useSelector((store) => store.cart.cartItems);  // only getting access to cart items 
  return (
    <nav className="header">
      <div className="logo-container flex items-center">
        <Link to="/" className="text-link">
          {/* <img className="logo" src={LOGO_URL} /> */}
          <h1 className="text-[5rem] font-extrabold ml-10 mobile:text-[3rem]">Khao</h1>
        </Link>
      </div>
      <div className="menu" onClick={() => { setMenuOpen(!menuOpen) }}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="cart">
        <NavLink to="/cart">
          <span className="inline-block mr-3">Cart</span>
          <div class="trapezium">
            <span className="number">{cartItems}</span>
          </div>

          {/* <div className="inline-block border bg-green-400 rounded-[50%] leading-0">
                <span className="px-4 inline-block">{cartItems}</span>
              </div> */}
        </NavLink>
      </div>
      <div className="nav-items">
        <ul className={menuOpen ? "open" : ""} onClick={() => { setMenuOpen(!menuOpen) }}>
          <li><NavLink to="/" className="text-link">Home</NavLink></li>
          <li><NavLink to="/about" className="text-link">About Us</NavLink></li>
          <li className="cartIn">
            <NavLink to="/cart">
              <span className="inline-block mr-3">Cart</span>
              <div class="trapezium">
                <span className="number">{cartItems}</span>
              </div>

              {/* <div className="inline-block border bg-green-400 rounded-[50%] leading-0">
                <span className="px-4 inline-block">{cartItems}</span>
              </div> */}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;


