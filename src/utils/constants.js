import logoImage from "../../assets/Khao.png";
import vegLogo from "../../assets/vegLogo.png";
import nonVegLogo from "../../assets/nonVegLogo.png";
import pureVegLogo from "../../assets/pureVegLogo.png";
import emptyCart from "../../assets/emtyCart.png";
import greenTick from "../../assets/greenTick.jpg";
import empty from "../../assets/Empty.png";
import loginImage from "../../assets/LoginImage.jpg"
import signUpImage from "../../assets/SignUpImage.png"
import PageNotFound from "../../assets/PageNotFound.jpg"

export const LOGO_URL = logoImage;
export const VEG_LOGO_URL = vegLogo;
export const NON_VEG_LOGO_URL = nonVegLogo;
export const PURE_VEG_LOGO_URL = pureVegLogo;
export const EMPTY_CART_LOGO = emptyCart;
export const PAYMENT_SUCCESSFULL_LOGO = greenTick;
export const EMPTY = empty;
export const LOGIN_IMAGE_URL = loginImage;
export const SIGNUP_IMAGE_URL = signUpImage;
export const PAGE_NOT_FOUND_URL = PageNotFound;

export const WEBSITE_NAME = "Khao";
export const SLOGAN = "Bhukh lagi hai, khana khana hai! Aa jao!";

export const CON_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

// export const MENU_URL = "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId=";
export const MENU_URL = "https://khao-backend.vercel.app/data/getRestaurantMenu/";
// export const MOBILE_MENU_URL = "https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId=";
// export const RESTAURANT_LIST_URL = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
// export const RESTAURANT_LIST_URL = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
export const RESTAURANT_LIST_URL = "https://khao-backend.vercel.app/data/getRestaurantsList"
// export const MOBILE_RESTAURANT_LIST_URL = "https://www.swiggy.com/mapi/homepage/getCards?lat=12.9351929&lng=77.62448069999999"

export const FETCH_MORE_RESTAURANT_LIST_URL = "https://khao-backend.vercel.app/data/getUpdatedRestaurantsList";
export const FETCH_DISHES_URL = "https://khao-backend.vercel.app/data/getDishes";
export const FETCH_DISH_URL = "https://khao-backend.vercel.app/data/getDish";




export const isMobile = window.matchMedia("(max-width: 800px)").matches;
export const isTablet = window.matchMedia("(min-width: 481px) and (max-width: 1024px)").matches;
export const isDesktop = window.matchMedia("(min-width: 1025px)").matches;
