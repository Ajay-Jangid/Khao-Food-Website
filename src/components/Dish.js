import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Shimmer, { DishShimmer } from "./Shimmer/Shimmer";
import RestaurantCard, { withHeaderLabel } from "./RestaurantCard/RestaurantCard";
import { FETCH_DISH_URL } from "../utils/constants";

const Dish = () => {
    const { state } = useLocation()
    const url = state.action.link;
    // console.log(url)
    const collectionIdMatch = url.match(/collection_id=([^&]*)/);
    const collectionId = collectionIdMatch ? collectionIdMatch[1] : null;
    const tagsMatch = url.match(/tags=([^&])*/);
    const tags = tagsMatch ? tagsMatch[0].split('=')[1] : null;
    const [dishData, setDishData] = useState(null)

    const DiscountLabel = withHeaderLabel(RestaurantCard);


    useEffect(() => {
        fetchDish();
    }, []);

    const fetchDish = async () => {
        const data = await fetch(`${FETCH_DISH_URL}/${collectionId}/${tags}`)
        const json = await data.json()
        console.log(json)
        setDishData(json?.data?.cards)
    }

    let categories = dishData?.filter(c => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.Restaurant")
    console.log(categories)


    if (dishData == null)
        return (
            <div className="w-full mx-auto">
                <DishShimmer />
            </div>
        )

    //type.googleapis.com/swiggy.   presentation.food.v2.Restaurant
    return (
        <div className="w-8/12 mx-auto mobile:w-full">
            <div className="my-8">
                <h1 className="text-6xl font-bold p-4 mobile:text-4xl bg-[to-right-black]">{dishData[0].card?.card?.title}</h1>
                <p className="text-3xl p-4 mobile:text-xl">{dishData[0]?.card?.card?.description}</p>
            </div>
            <div className="flex flex-wrap mobile:w-full mobile:flex-col">

                {
                    categories.length > 0 ?
                        categories.map((restaurantObj) => (
                            <Link key={restaurantObj.card.card.info.id} to={"/restaurants/" + restaurantObj.card.card.info.id}>
                                <DiscountLabel resData={restaurantObj.card.card.info} />
                            </Link>
                        )) : <Shimmer />
                }

            </div>
        </div>
    )
}

export default Dish;
