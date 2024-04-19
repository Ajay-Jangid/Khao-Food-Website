import { LOGO_URL } from "../../utils/constants";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "./Header.css"
import { useSelector } from "react-redux";
import { useState } from "react";
import { updateIsAuthenticated } from "../../utils/loginSlice";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // subscribing to the store using selector.
  const cartItems = useSelector((store) => store.cart.cartItems);  // only getting access to cart items 
  const isAuthenticated = useSelector((store) => store.login.isAuthenticated)
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
  }
  const handleSignOut = () => {
    localStorage.removeItem('token');
    dispatch(updateIsAuthenticated({ value: false }));
  }

  return (
    <nav className="header">
      <div className="logo-container flex items-center">
        <Link to="/home" className="text-link">
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
          <div class="trapezium mr-3">
            <span className="number">{cartItems}</span>
          </div>
          <span className="inline-block">Cart</span>

          {/* <div className="inline-block border bg-green-400 rounded-[50%] leading-0">
                <span className="px-4 inline-block">{cartItems}</span>
              </div> */}
        </NavLink>
      </div>
      <div className="nav-items">
        <ul className={menuOpen ? "open" : ""} onClick={() => { setMenuOpen(!menuOpen) }}>
          <li><NavLink to="/home" className="text-link">Home</NavLink></li>
          <li><NavLink to="/about" className="text-link">About Us</NavLink></li>
          <li className="cartIn">
            <NavLink to="/cart">
              <div class="trapezium mr-3">
                <span className="number">{cartItems}</span>
              </div>
              <span className="inline-block mr-3">Cart</span>

              {/* <div className="inline-block border bg-green-400 rounded-[50%] leading-0">
                <span className="px-4 inline-block">{cartItems}</span>
              </div> */}
            </NavLink>
          </li>
          {
            isAuthenticated ?
              <li>
                <li><NavLink to="/login" className="text-link" onClick={handleSignOut}>Sign Out</NavLink></li>
              </li> :
              <li>
                <li><NavLink to="/login" className="text-link">Login</NavLink></li>
              </li>
          }
        </ul>
      </div>
    </nav>
  );
};

export default Header;


