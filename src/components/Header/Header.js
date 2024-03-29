import { LOGO_URL } from "../../utils/constants";
import { Link } from 'react-router-dom';
import "./Header.css"
// import useOnlineStatus from "../../utils/useOnlineStatus";
import { useSelector } from "react-redux";
import { GiShoppingCart } from "react-icons/gi";

const Header = () => {
  // const onlineStatus = useOnlineStatus()

  // subscribing to the store using selector.
  const cartItems = useSelector((store) => store.cart.cartItems);  // only getting access to cart items 
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} />
      </div>
      <div className="nav-items">
        <ul>
          {/* <li>Online Status: {onlineStatus ? "🟢" : "🔴"}</li> */}
          <li><Link to="/" className="text-link">Home</Link></li>
          <li><Link to="/about" className="text-link">About Us</Link></li>
          {/* <li><Link to="/contact" className="text-link">Contact Us</Link></li>
          <li><Link to="/grocery" className="text-link">Grocery</Link></li> */}
          <li>
            <Link to="/cart" className="text-link sm:fill-none">
              <span className="inline-block mr-3">Cart</span>
              <div className="inline-block border bg-green-400 rounded-[50%] leading-0">
                <span className="px-4 inline-block">{cartItems}</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;


