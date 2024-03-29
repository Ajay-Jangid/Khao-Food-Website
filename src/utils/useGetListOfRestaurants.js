import { useState, useEffect } from "react";

export const useGetListOfRestaurants = () => {

    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    console.log('USE GET LIST CALLED:', listOfRestaurants)
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
            )
            const json = await data.json()
            let restaurants = json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
            restaurants = restaurants.slice(0, restaurants.length - restaurants.length % 4)
            console.log(restaurants)
            setListOfRestaurants(restaurants)
            // setfilteredRestaurant(restaurants)
        } catch (err) {
            console.log(err)
        }
    }

    return listOfRestaurants;
}