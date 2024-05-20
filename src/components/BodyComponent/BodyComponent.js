import RestaurantCard, { withHeaderLabel } from "../RestaurantCard/RestaurantCard";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./BodyComponent.css"
import { FETCH_MORE_RESTAURANT_LIST_URL, RESTAURANT_LIST_URL } from "../../utils/constants";
import { FaSearch } from "react-icons/fa";
import Shimmer from "../Shimmer/Shimmer";
import Dishes from "../Dishes";
import { useSelector } from "react-redux";

const BodyComponent = () => {
  const isAuthenticated = useSelector((store) => store.login.isAuthenticated)
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
  }
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [topRatedRes, settopRatedRes] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredRestaurant, setfilteredRestaurant] = useState([])
  const [pageOffSet, setPageOffset] = useState(null);
  const [page, setPage] = useState(0);
  const observer = useRef();

  const DiscountLabel = withHeaderLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const lastItemElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [])

  useEffect(() => {
    if (page > 0) {
      fetchMoreData();
    }
  }, [page]);

  // const handleInfiniteScroll = async () => {
  //   try {
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop + 1 >=
  //       document.documentElement.scrollHeight - document.getElementById('footer').clientHeight * 2
  //     ) {
  //       setLoading(true);
  //       setPage((prev) => prev + 1);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleInfiniteScroll);
  //   return () => window.removeEventListener("scroll", handleInfiniteScroll);
  // }, []);

  const fetchData = async () => {
    try {
      // const url = isMobile ? MOBILE_RESTAURANT_LIST_URL : RESTAURANT_LIST_URL
      const url = RESTAURANT_LIST_URL
      const data = await fetch(url)
      const json = await data.json()
      // let restaurants = isMobile ? json?.data?.success?.cards[4]?.gridWidget?.gridElements?.infoWithStyle?.restaurants : json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
      let restaurants = json.restaurants;
      console.log(restaurants)
      restaurants = restaurants.slice(0, restaurants.length - restaurants.length % 4)
      setListOfRestaurants(restaurants)
      setfilteredRestaurant(restaurants)
      console.log('OFFSET', json.pageOffSet)
      setPageOffset(json.pageOffSet)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchMoreData = async () => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pageOffSet)
      };
      let url = FETCH_MORE_RESTAURANT_LIST_URL;
      const data = await fetch(url, options)
      const json = await data.json()
      let restaurants = json.restaurants;
      restaurants = restaurants.slice(0, restaurants.length - restaurants.length % 4)
      setListOfRestaurants([...listOfRestaurants, ...restaurants])
      setfilteredRestaurant([...listOfRestaurants, ...restaurants])
      setPageOffset(json.pageOffSet)
      setLoading(false);

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


  // const topRatedRestaurant = () => {
  //   if (!topRatedRes) {
  //     let tmp = listOfRestaurants.filter((res) => {
  //       return res.info.avgRating > 4.2;
  //     });

  //     setfilteredRestaurant(
  //       tmp.sort((a, b) => b.info.avgRating - a.info.avgRating)
  //     );
  //     settopRatedRes(true);
  //   } else {
  //     setfilteredRestaurant(listOfRestaurants);
  //     settopRatedRes(false);
  //   }
  // }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      displaySearchRes()
    }
  }
  // return <Shimmer />

  return (

    <div className="w-8/12 mx-auto mobile:w-full ">

      <div className="mx-auto p-4 flex justify-center mobile:flex-col mobile:items-center">

        <div className="flex w-[60%]">
          <input
            type="text"
            placeholder="Search for restaurants..."
            value={searchText} onChange={(e) => {
              setSearchText(e.target.value)
            }} onKeyDown={handleKeyDown}
            className="py-5 px-10 text-3xl border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1 mobile:text-sm mobile:py-3"
          />
          <button onClick={() => displaySearchRes()} className=" text-3xl bg-blue-500 text-white py-2 px-4 rounded-r-md flex items-center mobile:text-lg">
            <FaSearch className="mr-2" />
            Search
          </button>

        </div>
        {/* <button className="text-lg px-4 py-2 rounded-lg bg-black text-white mobile:w-[50%] mobile:mt-2 mobile:text-center" onClick={() => topRatedRestaurant()}>Top Rated Restaurant</button> */}
      </div>
      <Dishes></Dishes>

      <div className="w-full flex flex-wrap mobile:justify-normal mobile:w-full mobile:flex-col">
        {
          listOfRestaurants.length > 0 ?
            filteredRestaurant.map((restaurantObj, index) => {
              if (filteredRestaurant.length === index + 1) {
                return <Link ref={lastItemElementRef} className="res-link" key={restaurantObj.info.id} to={"/restaurants/" + restaurantObj.info.id}>
                  <DiscountLabel resData={restaurantObj.info} />
                </Link>
              } else {
                return <Link className="res-link" key={restaurantObj.info.id} to={"/restaurants/" + restaurantObj.info.id}>
                  <DiscountLabel resData={restaurantObj.info} />
                </Link>
              }
            }) : <Shimmer />
        }
      </div>
    </div >

  );
};

export default BodyComponent;
