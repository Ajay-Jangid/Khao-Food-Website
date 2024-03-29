import { useState } from "react";
import "./RestaurantMenu.css"
import { useParams } from "react-router-dom";
import RecommendedCard from "../RecommendedCard/RecommendedCard";
import { useRestaurantMenu } from "../../utils/useRestaurantMenu";
import { PURE_VEG_LOGO_URL, isMobile } from "../../utils/constants";
import RestaurantCategory from "../RestaurantCategory/RestaurantCategory";
import UserContext from "../../utils/UserContext";
import RestaurantMenuShimmer from "../RestaurantMenuShimmer/RestaurantMenuShimmer";

const RestaurantMenu = () => {

    const [isVegChecked, setIsVegChecked] = useState(false)
    const { resId } = useParams()
    const [showIndex, setShowIndex] = useState(0)

    const resInfo = useRestaurantMenu(resId)  //custom Hook to fetch data

    const handleToggle = () => {
        setIsVegChecked(!isVegChecked)
    }

    const { name, cuisines, costForTwo, costForTwoMessage, feeDetails, locality, sla, totalRatingsString, avgRatingString } = resInfo ? resInfo?.cards[2]?.card?.card?.info : {}
    const { lastMileTravelString, slaString } = sla ? sla : {}
    const { message, totalFee } = feeDetails ? feeDetails : {}
    // const itemsCards = isMobile ? resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards : resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
    // let categories = isMobile ? resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory") : resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")
    let categories =  resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")
    
    return (
        resInfo === null ? <RestaurantMenuShimmer /> :
            <div className="container w-6/12 mobile:w-full tablet:w-full">
                <div className="res-info">
                    <div className="res-details">
                        <div className="res-left">
                            <p className="res-name-heading">{name}</p>
                            <p>{cuisines.join(',')}</p>
                            <p>{`${locality}, ${lastMileTravelString}`}</p>
                            <p className="distance">
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_18,h_18/v1648635511/Delivery_fee_new_cjxumu" alt="DISTANCE_FEE_NON_FOOD_LM" aria-hidden="true"></img>
                                <span dangerouslySetInnerHTML={{ __html: message }}></span>
                            </p>
                        </div>

                        <div className="res-right">
                            <p className="avg-rating"><i className="fa fa-star"></i>{avgRatingString}</p>
                            <p className="total-rating">{totalRatingsString}</p>
                        </div>
                    </div>
                    <div className="time-price">
                        <ul>
                            <li><i className="fa-solid fa-clock circle"></i>{slaString}</li>
                            <li><span className="circle"><i className="fa-solid fa-indian-rupee-sign"></i></span>{+costForTwo / 100} for two</li>
                        </ul>
                        {/* <div className="vegOnly">
                            {
                                itemsCards[0]?.card?.card?.isPureVeg ?
                                    <>
                                        <img className="pureVeg" src={PURE_VEG_LOGO_URL} />
                                        <h3 className="veg-title">Pure Veg</h3>
                                    </> :
                                    <>
                                        <h3 className="veg-title">Veg Only</h3>
                                        <label className="switch">
                                            <input type="checkbox" checked={isVegChecked} onChange={handleToggle} />
                                            <span className="slider"></span>
                                        </label>
                                    </>
                            }
                        </div> */}
                    </div>

                </div>

                {
                    categories.map((category, index) =>
                        <UserContext.Provider key={index} value={{ lastMileTravelString, totalFee, resId }}>
                            <RestaurantCategory data={category.card.card} showItems={index === showIndex && true} setShowIndex={() => setShowIndex((prevIndex) => prevIndex === index ? null : index)} />
                        </UserContext.Provider>
                    )

                }
            </div>
    );
}

export default RestaurantMenu;