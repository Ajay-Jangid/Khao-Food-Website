import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem, updateItem } from "../../utils/cartSlice";
import { CON_URL, EMPTY_CART_LOGO, NON_VEG_LOGO_URL, PAYMENT_SUCCESSFULL_LOGO, VEG_LOGO_URL } from "../../utils/constants";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const Cart = () => {
    const [orderPlaced, setOrderPlaced] = useState(false);
    const navigate = useNavigate();
    const isAuthenticated = useSelector((store) => store.login.isAuthenticated)

    if (!isAuthenticated) {
        navigate("/login");
    }

    useEffect(() => {
        let redirectTimer;
        if (orderPlaced) {
            redirectTimer = setTimeout(() => {
                navigate("/home");
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
    const prices = {
        totalPrice,
        gstCharges,
        totalToPay,
        deliveryCharges,
        platformCharges,
    }
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
                            <h1 className="p-4 font-bold text-3xl">Your cart is empty</h1>
                            <p className="text-2xl">Looks like you haven't added anything to your cart.</p>
                        </div>
                    }
                    {
                        Object.keys(cartItems).length !== 0 &&
                        <div className="text-4xl text-center font-extrabold">
                            <h1>Checkout</h1>
                        </div>
                    }
                    {/* {
                        Object.keys(cartItems).length !== 0 &&
                        <div className="flex text-4xl my-4 text-center border-dashed border-b-2 border-gray-500 py-2 ">
                            <span className="inline-block w-[8%]">
                                <img className="inline-block h-4 w-4" src={VEG_LOGO_URL}></img> <img className="inline-block h-4 w-4" src={NON_VEG_LOGO_URL}></img>
                            </span>
                            <span className="inline-block w-[35%] self-start">Name</span>
                            <span className="inline-block w-[20%]">Price</span>
                            <span className="inline-block w-[35%]">Image</span>
                        </div>
                    } */}

                    {
                        Object.values(cartItems).map((item) => (
                            <div key={item.item.id} className="flex justify-between items-center my-4 border-dashed border-b-2 border-gray-500 py-2 ">
                                <div className="w-[60%] flex justify-between items-center mobile:w-[50%]">
                                    <img className="h-8 w-8 my-2 mobile:w-5 mobile:h-5" src={item.item.vegNonVegUrl} alt="Item" />
                                    <h3 className="font-bold my-2 text-3xl w-[90%] mobile:text-xl mobile:w-[80%]">{item.item.name}</h3>
                                </div>
                                <div className="w-[20%] mobile:w-[25%]">
                                    <h3 className="font-extralight text-3xl mobile:text-xl w-full"><i className="fa-solid fa-indian-rupee-sign mr-2" />{(+item.item.price * +item.quantity).toFixed(2)}</h3>
                                </div>
                                {item.item.imageUrl ?
                                    <div className="w-[20%] border-2 h-[12rem] rounded-[1.5rem] relative mobile:w-[40%] mobile:h-[10rem] tablet:w-[30%]">
                                        <img className="w-full h-full object-cover object-center rounded-[1.5rem] " src={item.item.imageUrl} />
                                        <div className="w-40 h-14 mobile:w-36 mobile:h-12 text-3xl text-center rounded-xl shadow-lg flex justify-between items-center bg-white text-green-500 absolute bottom-[-15] left-[50%] translate-x-[-50%] z-10 mobile:text-[1rem] ">
                                            <button className="w-[30%] text-center h-full hover:bg-slate-200 hover:rounded-l-lg mobile:hover:bg-none" onClick={() => handleRemoveItem(item)}>−</button>
                                            <span className="inline-block w-[30%]">{item.quantity}</span>
                                            <button className="w-[30%] h-full hover:bg-slate-200 hover:rounded-r-lg mobile:hover:bg-none" onClick={() => handleUpdateItem(item)}>+</button>
                                        </div>
                                    </div> :
                                    <div className="w-[20%] border-2 h-[12rem] rounded-[1.5rem] relative mobile:w-[40%] mobile:h-[10rem] tablet:w-[30%]">
                                        <div className="w-40 h-14 mobile:w-36 mobile:h-12 text-3xl text-center rounded-xl shadow-lg flex items-center justify-between bg-white text-green-500 absolute bottom-[-15] left-[50%] translate-x-[-50%] z-10 mobile:text-[1rem] ">
                                            <button className="w-[30%] h-full hover:bg-slate-200 hover:rounded-l-lg mobile:hover:bg-none" onClick={() => handleRemoveItem(item)}>−</button>
                                            <span className="inline-block w-[30%]">{item.quantity}</span>
                                            <button className="w-[30%] h-full hover:bg-slate-200 hover:rounded-r-lg mobile:hover:bg-none" onClick={() => handleUpdateItem(item)}>+</button>
                                        </div>
                                    </div>
                                }
                                {/* <div className="w-[15%] mobile:w-[20%] p-2 border border-green-400 flex items-center justify-between mobile:p-1">
                                    <button className="font-bold w-8 h-8  text-green-500 text-[14px] " onClick={() => handleRemoveItem(item)}>−</button>
                                    <span className="inline-block font-bold text-center w-8  text-green-500 text-[14px] ">{item.quantity}</span>
                                    <button className="font-bold w-8 h-8  text-green-500 text-[14px] " onClick={() => handleUpdateItem(item)}>+</button>
                                </div> */}
                            </div>
                        ))
                    }
                    {Object.keys(cartItems).length > 0 &&
                        <div>
                            <span className="text-2xl font-extrabold leading-10">Bill Details</span>
                            <div className="p-2  flex justify-between">
                                <span className="inline-block text-2xl w-[70%]">• Order Total</span>
                                <span className="inline-block text-2xl w-[30%]"><i className="fa-solid fa-indian-rupee-sign mr-2" />{totalPrice}</span>
                            </div>
                            {/* <div className="p-2  flex justify-between">
                                <span className="inline-block text-2xl  w-[70%]">• Delivery Fee</span>
                                <span className="inline-block text-2xl  w-[30%]"><i className="fa-solid fa-indian-rupee-sign mr-2" />{deliveryCharges}</span>
                            </div>
                            <div className="p-2 flex justify-between">
                                <span className="inline-block text-2xl w-[70%]">• GST and Restaurant Charges</span>
                                <span className="inline-block text-2xl w-[30%]"><i className="fa-solid fa-indian-rupee-sign mr-2" />{gstCharges}</span>
                            </div>
                            <div className="p-2 flex justify-between">
                                <span className="inline-block text-2xl  w-[70%]">• Platform Fee</span>
                                <span className="inline-block text-2xl  w-[30%]"><i className="fa-solid fa-indian-rupee-sign mr-2" />{platformCharges}</span>
                            </div>
                            <div className="p-2 font-extrabold flex justify-between border-t-2 border-black">
                                <span className="inline-block text-2xl w-[70%]">TO PAY</span>
                                <span className="inline-block text-2xl w-[30%]"><i className="fa-solid fa-indian-rupee-sign mr-2" />{totalToPay}</span>
                            </div> */}
                        </div>
                    }
                    {Object.keys(cartItems).length > 0 &&
                        <div className="text-center">
                            {/* <button className="p-2  m-2 bg-green-500 rounded-lg text-2xl font-extrabold" onClick={handleProceedToPay}>Proceed to pay</button> */}
                            <Link className="p-2  m-2 bg-green-500 rounded-lg text-2xl font-extrabold" to={"/checkout"} state={prices} >Proceed to CheckOut</Link>
                            <button className="p-2  m-2 bg-red-500 rounded-lg text-2xl font-extrabold" onClick={handleClearCart}>Clear Cart</button>
                        </div>
                    }
                </div>
            }
            {/* {orderPlaced &&
                <div className="w-full mx-auto text-center">
                    <img className="ml-[50%] translate-x-[-50%] h-[300px] w-[300px]" src={PAYMENT_SUCCESSFULL_LOGO} alt="Payment Successful" />
                    <h1 className="text-3xl font-extrabold ">Order Placed Successfully !</h1>
                    <h1 className="text-3xl font-extrabold ">Thank you !</h1>
                </div>
            } */}
            <ToastContainer />

        </div>
    )
}

export default Cart;