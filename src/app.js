import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header/Header";
import BodyComponent from "./components/BodyComponent/BodyComponent";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error from "./components/Error/Error";
import RestaurantMenu from "./components/RestaurantMenu/RestaurantMenu";
import Cart from "./components/Cart/Cart";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

//https://mui.com/material-ui/getting-started/templates/dashboard/

const About = lazy(() => import("./components/About/About"))


const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <Router>
        <div className="app w-[100%] h-[100%] mobile:mb-[10rem] tablet:mb-[20rem]">
          <Header />
          <Routes>
            <Route exact path="/" element={<BodyComponent />} />
            <Route path="/about" element={<Suspense fallback={<h1>Loading...</h1>}><About /></Suspense>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/restaurants/:resId" element={<RestaurantMenu />} />
            <Route element={<Error />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />)