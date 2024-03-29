import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header/Header";
import BodyComponent from "./components/BodyComponent/BodyComponent";
import { createBrowserRouter, RouterProvider, Outlet, BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import About from "./components/About";
import Contact from "./components/Contact/Contact";
import Error from "./components/Error/Error";
import RestaurantMenu from "./components/RestaurantMenu/RestaurantMenu";
import Cart from "./components/Cart/Cart";
import { Provider } from "react-redux";
import UserContext from "./utils/UserContext";
import appStore from "./utils/appStore";
// import { Grocery } from "./components/Grocery";

//https://mui.com/material-ui/getting-started/templates/dashboard/

const Grocery = lazy(() => import("./components/Grocery/Grocery"));
const About = lazy(() => import("./components/About/About"))
// chunking
// Code Splitting
// Dynamic Bundling
// Lazy loading

const AppLayout = () => {
  // return (
  //   <Provider store={appStore}>
  //     <div className="app">
  //       <Header />
  //       <Outlet />
  //     </div>
  //   </Provider>
  // )

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

// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <AppLayout />,
//     children: [
//       {
//         path: "/",
//         element: <BodyComponent />,
//       },
//       {
//         path: "/about",
//         element: <Suspense fallback={<h1>Loading...</h1>}><About /></Suspense>
//       },
//       {
//         path: "/contact",
//         element: <Contact />
//       },
//       {
//         path: "/cart",
//         element: <Cart />
//       },
//       {
//         path: "/grocery",
//         element: <Suspense fallback={<h1>Loading...</h1>}><Grocery /></Suspense>
//       },
//       {
//         path: "/restaurants/:resId",
//         element: <RestaurantMenu />
//       }
//     ],
//     errorElement: <Error />
//   }
// ])

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<RouterProvider router={appRouter} />)


root.render(<AppLayout />)