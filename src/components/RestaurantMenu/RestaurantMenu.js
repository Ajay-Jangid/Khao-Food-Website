import { useState } from "react";
import "./RestaurantMenu.css"
import { useParams } from "react-router-dom";
import RecommendedCard from "../RecommendedCard/RecommendedCard";
import { useRestaurantMenu } from "../../utils/useRestaurantMenu";
import { EMPTY, PURE_VEG_LOGO_URL, isMobile } from "../../utils/constants";
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
    // const itemsCards = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[0].card.card.isPureVeg
    const isPureVeg = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[0].card.card.isPureVeg
    // let categories = isMobile ? resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory") : resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")
    let categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")
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
                            <p className="avg-rating flex items-center">
                                <svg className="inline-block mr-3" width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-hidden="true" strokeColor="rgba(2, 6, 12, 0.92)" fillColor="rgba(2, 6, 12, 0.92)"><circle cx="10" cy="10" r="9" fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"></circle><path d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z" fill="white"></path><defs><linearGradient id="StoreRating20_svg__paint0_linear_32982_71567" x1="10" y1="1" x2="10" y2="19" gradientUnits="userSpaceOnUse"><stop stopColor="#21973B"></stop><stop offset="1" stopColor="#128540"></stop></linearGradient></defs></svg>
                                {avgRatingString}
                            </p>
                            <p className="total-rating">{totalRatingsString}</p>
                        </div>
                    </div>
                    <div className="time-price">
                        <ul>
                            <li><i className="fa-solid fa-clock circle"></i>{slaString}</li>
                            <li><span className="circle"><i className="fa-solid fa-indian-rupee-sign"></i></span>{+costForTwo / 100} for two</li>
                        </ul>
                        <div className="vegOnly">
                            {
                                isPureVeg ?
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
                        </div>
                    </div>

                </div>

                <div className="bg-gray-50">
                    {
                        !categories ?
                            <div className="flex flex-col items-center">
                                <p className="text-3xl text-gray-500 mt-5 mobile:text-2xl">Uh Oh! No items available right now!</p>
                                <img src={EMPTY} className="w-[80%] mt-4"></img>
                            </div>
                            :
                            categories.map((category, index) =>
                                <UserContext.Provider key={index} value={{ lastMileTravelString, totalFee, resId, isVegChecked }}>
                                    <RestaurantCategory data={category.card.card} showItems={index === showIndex && true} setShowIndex={() => setShowIndex((prevIndex) => prevIndex === index ? null : index)} />
                                </UserContext.Provider>
                            )
                    }
                </div>
            </div>
    );
}

export default RestaurantMenu;