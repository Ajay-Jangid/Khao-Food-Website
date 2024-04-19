import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header/Header";
import About from "./components/About/About";
import BodyComponent from "./components/BodyComponent/BodyComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error from "./components/Error/Error";
import RestaurantMenu from "./components/RestaurantMenu/RestaurantMenu";
import Cart from "./components/Cart/Cart";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Footer from "./components/Footer";
import Dish from "./components/Dish";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PageNotFound from "./components/PageNotFound";
import CheckOut from "./components/CheckOut";

//https://mui.com/material-ui/getting-started/templates/dashboard/

// const About = lazy(() => import("./components/About/About"))

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}


const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <Router>
        <div className="app w-[100%] min-h-[100vh] grid grid-rows-[1fr auto]">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/home" element={<Layout><BodyComponent /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/cart" element={<Layout><Cart /></Layout>} />
            <Route path="/restaurants/:resId" element={<Layout><RestaurantMenu /></Layout>} />
            <Route path="/dish" element={<Layout><Dish /></Layout>} />
            <Route path="*" element={<Layout><PageNotFound /></Layout>} />
            <Route path="/checkout" element={<Layout><CheckOut /></Layout>}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />} errorElement={<Error />}></Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />)
