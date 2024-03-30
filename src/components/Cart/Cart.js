import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem, updateItem } from "../../utils/cartSlice";
import { EMPTY_CART_LOGO, PAYMENT_SUCCESSFULL_LOGO } from "../../utils/constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const Cart = () => {
    const [orderPlaced, setOrderPlaced] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let redirectTimer;
        if (orderPlaced) {
            redirectTimer = setTimeout(() => {
                navigate("/");
            }, 3000);
        }
        // Cleanup function to clear the timer when the component unmounts or orderPlaced changes
        return () => clearTimeout(redirectTimer);
    }, [orderPlaced, navigate]);

    const dispatch = useDispatch()
    const cartItems = useSelector((store) => store.cart.items)
    const totalPrice = useSelector((store) => store.cart.totalPrice).toFixed(2)
    const deliveryCharges = useSelector((store) => store.cart.deliveryCharges)
    const restaurantPackingCharges = 5;
    const gstCharges = (Math.round((totalPrice * 0.05 + restaurantPackingCharges * 100)) / 100).toFixed(2);
    let totalToPay = +totalPrice + +gstCharges + +deliveryCharges;
    const roundedTotal = Math.floor(+totalToPay) + 1;
    const platformCharges = (roundedTotal - totalToPay).toFixed(2);
    totalToPay = (+totalToPay + +platformCharges).toFixed(0);

    const handleClearCart = () => {
        dispatch(clearCart())
    }

    const handleRemoveItem = (item) => {
        toast.warning(`${item.item.name} removed from cart!`, {
            position: "bottom-center",
            style: { fontSize: "16px" }
        })
        dispatch(removeItem(item.item.id))
    }

    const handleUpdateItem = (item) => {
        toast.success(`${item.item.name} added to cart!`, {
            position: "bottom-center",
            style: { fontSize: "16px" }
        })
        dispatch(updateItem(item.item.id))
    }

    const handleProceedToPay = () => {
        dispatch(clearCart());
        setOrderPlaced(true)
    }

    return (
        <div className="m-5 p-5">
            {!orderPlaced &&
                <div className="w-6/12 mx-auto mobile:w-full">
                    {/* Empty Carty Logic */}
                    {Object.keys(cartItems).length === 0 &&
                        <div className="text-center flex flex-col  justify-center h-[60vh]">
                            <img className="mx-auto my-8 w-50" src={EMPTY_CART_LOGO} alt="Empty Cart" />
                            <h1 className="p-4 font-semibold text-xl">Your cart is empty</h1>
                            <p className="text-lg ">Looks like you haven't added anything to your cart.</p>
                        </div>
                    }
                    {
                        Object.values(cartItems).map((item) => (
                            <div key={item.item.id} className="flex justify-between items-center my-4 border-dashed border-b-2 border-gray-500 py-2 ">

                                <div className="w-[60%] flex justify-between  items-center mobile:w-[50%]">
                                    <img className="h-5 w-5 my-2 mobile:w-4 mobile:h-4" src={item.item.vegNonVegUrl} alt="Item" />
                                    <h3 className="font-bold my-2 text-2xl  w-[90%] mobile:text-lg mobile:w-[80%]">{item.item.name}</h3>
                                </div>
                                <div className="w-[20%] mobile:w-[25%] ">
                                    <h3 className="font-extralight text-2xl mobile:text-xl w-full"><i className="fa-solid fa-indian-rupee-sign mr-2" />{(+item.item.price * +item.quantity).toFixed(2)}</h3>
                                </div>
                                <div className="w-[15%] mobile:w-[20%] p-2 border border-green-400 flex items-center justify-between mobile:p-1">
                                    <button className="font-bold w-8 h-8  text-green-500 text-[14px] " onClick={() => handleRemoveItem(item)}>−</button>
                                    <span className="inline-block font-bold text-center w-8  text-green-500 text-[14px] ">{item.quantity}</span>
                                    <button className="font-bold w-8 h-8  text-green-500 text-[14px] " onClick={() => handleUpdateItem(item)}>+</button>
                                </div>
                            </div>
                        ))
                    }
                    {Object.keys(cartItems).length > 0 &&
                        <div>
                            <span className="text-lg ">Bill Details</span>
                            <div className="p-2  flex justify-between">
                                <span className="inline-block text-lg w-[80%]">• Item Total</span>
                                <span className="inline-block text-lg w-[20%]"><i className="fa-solid fa-indian-rupee-sign mr-2" />{totalPrice}</span>
                            </div>
                            <div className="p-2  flex justify-between">
                                <span className="inline-block text-lg  w-[80%]">• Delivery Fee</span>
                                <span className="inline-block text-lg  w-[20%]"><i className="fa-solid fa-indian-rupee-sign mr-2" />{deliveryCharges}</span>
                            </div>
                            <div className="p-2 flex justify-between">
                                <span className="inline-block text-lg w-[80%]">• GST and Restaurant Charges</span>
                                <span className="inline-block text-lg w-[20%]"><i className="fa-solid fa-indian-rupee-sign mr-2" />{gstCharges}</span>
                            </div>
                            <div className="p-2 flex justify-between">
                                <span className="inline-block text-lg  w-[80%]">• Platform Fee</span>
                                <span className="inline-block text-lg  w-[20%]"><i className="fa-solid fa-indian-rupee-sign mr-2" />{platformCharges}</span>
                            </div>
                            <div className="p-2 font-extrabold flex justify-between border-t-2 border-black">
                                <span className="inline-block text-lg w-[80%]">TO PAY</span>
                                <span className="inline-block text-lg w-[20%]"><i className="fa-solid fa-indian-rupee-sign mr-2" />{totalToPay}</span>
                            </div>
                        </div>
                    }
                    {Object.keys(cartItems).length > 0 &&
                        <div className="text-center">
                            <button className="p-2  m-2 bg-green-500 rounded-lg text-lg font-bold" onClick={handleProceedToPay}>Proceed to pay</button>
                            <button className="p-2  m-2 bg-red-500 rounded-lg text-lg font-bold" onClick={handleClearCart}>Clear Cart</button>
                        </div>
                    }
                </div>
            }
            {orderPlaced &&
                <div className="w-full mx-auto text-center">
                    <img className="ml-[50%] translate-x-[-50%] h-[300px] w-[300px]" src={PAYMENT_SUCCESSFULL_LOGO} alt="Payment Successful" />
                    <h1 className="text-3xl font-extrabold ">Order Placed Successfully !</h1>
                    <h1 className="text-3xl font-extrabold ">Thank you !</h1>
                </div>
            }
            <ToastContainer />

        </div>
    )
}

export default Cart;