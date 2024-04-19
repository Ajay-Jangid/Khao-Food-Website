import { useDispatch, useSelector } from "react-redux";
import { CON_URL, NON_VEG_LOGO_URL, VEG_LOGO_URL } from "../../utils/constants";
import { addItem, removeItem, updateItem } from "../../utils/cartSlice";
import { useContext, useState } from "react";
import UserContext from "../../utils/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

// const ItemList = ({ items }) => {

//     const dispatch = useDispatch();
//     const restInfo = useContext(UserContext)
//     // console.log("RESTINFO ", restInfo)
//     const handleAddItem = (item) => {
//         // dispatch an action
//         const itemObj = {
//             id: item.card.info.id,
//             distance: restInfo.lastMileTravelString,
//             deliveryCharges: restInfo.totalFee ? restInfo.totalFee / 100 : 0,
//             restaurantId: restInfo.resId,
//             vegNonVegUrl: item.card.info.isVeg ? VEG_LOGO_URL : NON_VEG_LOGO_URL,
//             name: item.card.info.name,
//             imageUrl: item.card.info.imageId ? CON_URL + item.card.info.imageId : null,
//             price: item.card.info.defaultPrice ? item.card.info.defaultPrice / 100 : item.card.info.price / 100
//         }
//         dispatch(addItem(itemObj))
//         toast.success(`${item.card.info.name} added to cart!`, {
//             position: "bottom-center",
//         })
//     }

//     return (
//         <div>
//             {items.map(item =>
//                 <div key={item.card.info.id} className="flex justify-between items-center my-[1rem] border-dashed border-b-2 border-gray-500 py-[10px]">

//                     <div className="w-[70%] mobile:w-[56%] tablet:w-[60%]">
//                         <img className="h-[2rem] w-[2rem] my-[10px] mobile:h-5 mobile:w-5 mobile:my-[5px]" src={item.card.info.isVeg ? VEG_LOGO_URL : NON_VEG_LOGO_URL} />
//                         <h3 className="font-bold my-[5px] mobile:text-lg mobile:my-[3px]">{item.card.info.name}</h3>
//                         <p className="my-[2px] font-bold mobile:text-lg"><i className="fa-solid fa-indian-rupee-sign mr-2"></i>{item.card.info.defaultPrice ? item.card.info.defaultPrice / 100 : item.card.info.price / 100}</p>
//                         <p className="w-[80%] text-[1.2rem] mobile:w-full mobile:text-[0.9rem] mobile:text-gray-400">{item.card.info.description}</p>
//                     </div>
//                     {
//                         item.card.info.imageId ?
//                             <div className="w-[20%] border-2 h-[12rem] rounded-[1.5rem] relative mobile:w-[40%] mobile:h-[10rem] tablet:w-[30%]">
//                                 <img className="w-full h-full object-cover object-center rounded-[1.5rem] " src={CON_URL + item.card.info.imageId} />
//                                 <button className="p-2 bg-white text-green-500 text-[1.2rem] rounded-xl shadow-lg absolute bottom-0 left-[50%] translate-x-[-50%] mobile:text-[1rem]" onClick={() => handleAddItem(item)}>ADD</button>
//                             </div> :
//                             <div className="w-[20%] border-2 h-[12rem] rounded-[1.5rem] relative mobile:w-[40%] mobile:h-[10rem] tablet:w-[30%]">
//                                 <button className="p-2 bg-white text-green-500 text-[1.2rem] rounded-xl shadow-lg absolute bottom-0 left-[50%] translate-x-[-50%] mobile:text-[1rem]" onClick={() => handleAddItem(item)}>ADD</button>
//                             </div>

//                     }
//                     <ToastContainer />

//                 </div>)}
//         </div>
//     )
// }

const FoodItemList = ({ items}) => {
    const restInfo = useContext(UserContext)
    return (
        <div>
            {
                restInfo.isVegChecked ?

                    items.map((item, index) => {
                        if (item.card.info.isVeg) {
                            // console.log(restInfo.isVegChecked);
                                                        return <Item key={index} item={item} />
                        }
                    })

                    :
                    items.map((item, index) => <Item key={index} item={item} />)
            }

            <ToastContainer />
        </div>
    )
}

const Item = ({ item }) => {

    const dispatch = useDispatch();
    const cartItems = useSelector((store) => store.cart.items)
    const itemCount = cartItems[item.card.info.id] ? cartItems[item.card.info.id]['quantity'] : 0
    const restInfo = useContext(UserContext)
    const [count, setCount] = useState(itemCount);

    // console.log("RESTINFO ", restInfo)
    const handleAddItem = (item) => {
        setCount(count + 1)
        // dispatch an action
        const itemObj = {
            id: item.card.info.id,
            distance: restInfo.lastMileTravelString,
            deliveryCharges: restInfo.totalFee ? restInfo.totalFee / 100 : 0,
            restaurantId: restInfo.resId,
            vegNonVegUrl: item.card.info.isVeg ? VEG_LOGO_URL : NON_VEG_LOGO_URL,
            name: item.card.info.name,
            imageUrl: item.card.info.imageId ? CON_URL + item.card.info.imageId : null,
            price: item.card.info.defaultPrice ? item.card.info.defaultPrice / 100 : item.card.info.price / 100
        }
        dispatch(addItem(itemObj))
        toast.success(`${item.card.info.name} added to cart!`, {
            position: "bottom-center",
        })
    }

    const handleRemoveItem = (item) => {
        toast.warning(`${item.card.info.name} removed from cart!`, {
            position: "bottom-center",
        })
        setCount(count - 1)
        dispatch(removeItem(item.card.info.id))
    }

    const handleUpdateItem = (item) => {
        toast.success(`${item.card.info.name} added to cart!`, {
            position: "bottom-center",
        })
        setCount(count + 1)
        dispatch(updateItem(item.card.info.id))
    }

    return (
        <div>
            {
                <div key={item.card.info.id} className="flex justify-between items-center my-[1rem] border-dashed border-b-2 border-gray-500 py-[10px]">

                    <div className="w-[70%] mobile:w-[56%] tablet:w-[60%]">
                        <img className="h-[2rem] w-[2rem] my-[10px] mobile:h-5 mobile:w-5 mobile:my-[5px]" src={item.card.info.isVeg ? VEG_LOGO_URL : NON_VEG_LOGO_URL} />
                        <h3 className="font-bold my-[5px] mobile:text-lg mobile:my-[3px]">{item.card.info.name}</h3>
                        <p className="my-[2px] font-bold mobile:text-lg"><i className="fa-solid fa-indian-rupee-sign mr-2"></i>{item.card.info.defaultPrice ? item.card.info.defaultPrice / 100 : item.card.info.price / 100}</p>
                        <p className="w-[80%] text-[1.2rem] mobile:w-full mobile:text-[0.9rem] mobile:text-gray-400">{item.card.info.description}</p>
                    </div>
                    {
                        count == 0 ?
                            item.card.info.imageId ?
                                <div className="w-[20%] border-2 h-[12rem] rounded-[1.5rem] relative mobile:w-[40%] mobile:h-[10rem] tablet:w-[30%]">
                                    <img className="w-full h-full object-cover object-center rounded-[1.5rem] " src={CON_URL + item.card.info.imageId} />
                                    <button className="p-3 w-36 font-bold bg-white text-green-600 text-3xl rounded-xl shadow-lg absolute bottom-[-15] left-[50%] translate-x-[-50%] mobile:text-[1rem]" onClick={() => handleAddItem(item)}>ADD</button>
                                </div> :
                                <div className="w-[20%] border-2 h-[12rem] rounded-[1.5rem] relative mobile:w-[40%] mobile:h-[10rem] tablet:w-[30%]">
                                    <button className="p-3 w-36 font-bold bg-white text-green-600 text-3xl rounded-xl shadow-lg absolute bottom-[-15] left-[50%] translate-x-[-50%] mobile:text-[1rem]" onClick={() => handleAddItem(item)}>ADD</button>
                                </div>
                            :
                            item.card.info.imageId ?
                                <div className="w-[20%] border-2 h-[12rem] rounded-[1.5rem] relative mobile:w-[40%] mobile:h-[10rem] tablet:w-[30%]">
                                    <img className="w-full h-full object-cover object-center rounded-[1.5rem] " src={CON_URL + item.card.info.imageId} />
                                    <div className="w-40 h-14 text-3xl text-center rounded-xl shadow-lg flex justify-between items-center bg-white text-green-500 absolute bottom-[-15] left-[50%] translate-x-[-50%] z-10 mobile:text-[1rem] ">
                                        <button className="w-[30%] text-center h-full hover:bg-slate-200 hover:rounded-l-lg mobile:hover:bg-none" onClick={() => handleRemoveItem(item)}>−</button>
                                        <span className="inline-block w-[30%]">{count}</span>
                                        <button className="w-[30%] h-full hover:bg-slate-200 hover:rounded-r-lg mobile:hover:bg-none" onClick={() => handleUpdateItem(item)}>+</button>
                                    </div>
                                </div> :
                                <div className="w-[20%] border-2 h-[12rem] rounded-[1.5rem] relative mobile:w-[40%] mobile:h-[10rem] tablet:w-[30%]">
                                    <div className="w-36 h-14 text-2xl text-center rounded-xl shadow-lg flex items-center justify-between bg-white text-green-500 absolute bottom-[-15] left-[50%] translate-x-[-50%] z-10 mobile:text-[1rem] ">
                                        <button className="w-[30%] h-full hover:bg-slate-200 hover:rounded-l-lg mobile:hover:bg-none" onClick={() => handleRemoveItem(item)}>−</button>
                                        <span className="inline-block w-[30%]">{count}</span>
                                        <button className="w-[30%] h-full hover:bg-slate-200 hover:rounded-r-lg mobile:hover:bg-none" onClick={() => handleUpdateItem(item)}>+</button>
                                    </div>
                                </div>

                    }
                    {/* <ToastContainer /> */}

                </div>
            }
        </div>
    )
}



export default FoodItemList;