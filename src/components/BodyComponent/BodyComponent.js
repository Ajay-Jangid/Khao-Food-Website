import RestaurantCard, { withHeaderLabel } from "../RestaurantCard/RestaurantCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import "./BodyComponent.css"
import { MOBILE_RESTAURANT_LIST_URL, RESTAURANT_LIST_URL, isMobile } from "../../utils/constants";
import { FaSearch } from "react-icons/fa";
import Shimmer from "../Shimmer/Shimmer";

const BodyComponent = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [topRatedRes, settopRatedRes] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredRestaurant, setfilteredRestaurant] = useState([])

  const DiscountLabel = withHeaderLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url = isMobile ? MOBILE_RESTAURANT_LIST_URL : RESTAURANT_LIST_URL
      const data = await fetch(url)
      const json = await data.json()
      let restaurants = isMobile ? json?.data?.success?.cards[4]?.gridWidget?.gridElements?.infoWithStyle?.restaurants : json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
      restaurants = restaurants.slice(0, restaurants.length - restaurants.length % 4)
      setListOfRestaurants(restaurants)
      setfilteredRestaurant(restaurants)
    } catch (err) {
      console.log(err)
    }
  }

  const displaySearchRes = () => {
    let newRes = listOfRestaurants.filter((res) => {
      if (res.info.name.toLowerCase().includes(searchText.toLowerCase()))
        return res
    })
    setfilteredRestaurant(newRes)
  }


  const topRatedRestaurant = () => {
    if (!topRatedRes) {
      let tmp = listOfRestaurants.filter((res) => {
        return res.info.avgRating > 4.2;
      });

      setfilteredRestaurant(
        tmp.sort((a, b) => a.info.avgRating - b.info.avgRating)
      );
      settopRatedRes(true);
    } else {
      setfilteredRestaurant(listOfRestaurants);
      settopRatedRes(false);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      displaySearchRes()
    }
  }


  // if (!onlineStatus) {
  //   return <h1>Looks like you're offline!! Please check your internet connection</h1>
  // }
  return (
    // <div className="body-container w-8/12">
    //   <div className="filter">

    //     <div className="search-btn">
    //       <input type="text" className="search-box border-2 border-black" value={searchText} onChange={(e) => {
    //         setSearchText(e.target.value)
    //       }} onKeyDown={handleKeyDown} />
    //       <button className="btn px-4 font-semibold rounded-md bg-black text-white" onClick={() => displaySearchRes()}>Search</button>
    //     </div>

    //     <button
    //       className="btn px-4 font-semibold rounded-md bg-black text-white"
    //       onClick={() => {
    //         topRatedRestaurant()
    //       }}
    //     >
    //       Top Rated Restaurant
    //     </button>

    //   </div>
    //   <div className="res-container">
    //     {
    //       listOfRestaurants.length > 0 ?
    //         filteredRestaurant.map((restaurantObj) => (
    //           <Link className="res-link" key={restaurantObj.info.id} to={"/restaurants/" + restaurantObj.info.id}>
    //             {/* <RestaurantCard resData={restaurantObj.info} /> */}
    //             <DiscountLabel resData={restaurantObj.info} />
    //           </Link>
    //         )) : <Shimmer />
    //     }
    //   </div>
    // </div>
    <div className="w-8/12 mx-auto mobile:w-full">
      <div className=" mx-auto p-4 flex justify-between mobile:flex-col mobile:items-center">

        <div className="flex">
          <input
            type="text"
            placeholder="Search for restaurants..."
            value={searchText} onChange={(e) => {
              setSearchText(e.target.value)
            }} onKeyDown={handleKeyDown}
            className="py-3 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1"
          />
          <button onClick={() => displaySearchRes()} className="bg-blue-500 text-white py-2 px-4 rounded-r-md flex items-center">
            <FaSearch className="mr-2" />
            Search
          </button>

        </div>
        {/* <input type="text" className="border-2 border-black text-lg px-4 py-2 rounded-lg mr-8" value={searchText} onChange={(e) => {
            setSearchText(e.target.value)
          }} onKeyDown={handleKeyDown} />
          <button className="text-lg px-4 py-2 rounded-lg bg-black text-white" onClick={() => displaySearchRes()}>Search</button> */}
        <button className="text-lg px-4 py-2 rounded-lg bg-black text-white mobile:w-[50%] mobile:mt-2 mobile:text-center" onClick={() => topRatedRestaurant()}>Top Rated Restaurant</button>
      </div>
      <div className="mx-auto flex flex-wrap mobile:w-full mobile:flex-col">
        {
          listOfRestaurants.length > 0 ?
            filteredRestaurant.map((restaurantObj) => (
              <Link className="res-link" key={restaurantObj.info.id} to={"/restaurants/" + restaurantObj.info.id}>
                <DiscountLabel resData={restaurantObj.info} />
              </Link>
            )) : <Shimmer />
        }
      </div>
    </div >

  );
};

export default BodyComponent;
