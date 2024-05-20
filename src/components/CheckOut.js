import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearCart } from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { PAYMENT_SUCCESSFULL_LOGO } from "../utils/constants";
import { Country, State, City } from 'country-state-city';
import Select from 'react-select'
import orderId from "order-id";

const CheckOut = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [orderPlaced, setOrderPlaced] = useState(false);

    const cartItems = useSelector((store) => store.cart.items)

    const { state } = useLocation()
    const { totalPrice, totalToPay, gstCharges, platformCharges, deliveryCharges } = state;
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const states = State.getStatesOfCountry('IN')
    const loginDetails = useSelector((store) => store.login.loginDetails)

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

    const handleProceedToPay = async (e) => {
        e.preventDefault();

        let address = {
            firstName,
            lastName,
            address1,
            address2,
            state: selectedState.name,
            city: selectedCity.name,
            postalCode,
            mobileNo
        }

        let orderDetail = {
            items: cartItems,
            address,
            totalPrice, totalToPay, gstCharges, platformCharges, deliveryCharges
        }

        console.log(orderDetail)
        const id = orderId().generate()
        console.log('[ID]', id)
        console.log(loginDetails.email)
        let payload = {
            orderId: id,
            email: loginDetails.email,
            orderDetail
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };

        let response = await fetch('https://proxy-server-khao.onrender.com/api/database/order/create', options)
        response = await response.json();
        console.log(response)
        dispatch(clearCart());
        setOrderPlaced(true)
    }

    if (orderPlaced) {
        return (
            < div className="w-full mx-auto text-center my-8" >
                <img className="ml-[50%] translate-x-[-50%] h-[300px] w-[300px]" src={PAYMENT_SUCCESSFULL_LOGO} alt="Payment Successful" />
                <h1 className="text-3xl font-extrabold ">Order Placed Successfully !</h1>
                <h1 className="text-3xl font-extrabold ">Thank you !</h1>
            </div >
        )
    }

    return (
        <section className="m-20 w-11/12 h-full flex justify-evenly mobile:flex-col mobile:w-full mobile:m-0 mobile:p-8">
            {/* Address Section */}
            <section className="w-1/2 h-full p-8 mobile:p-0 border-r-2 border-gray-200 mobile:border-b-2 mobile:border-r-0 mobile:w-full">
                <h1 className="text-center font-bold tracking-wide text-2xl p-4 my-4">Delivery Address</h1>
                <div className="flex w-full justify-between mobile:flex-col my-4">
                    <div className="w-[49%] mobile:w-full">
                        <input className="text-xl border-2 border-gray-400 w-full p-6  mb-4 tracking-widest" type="text" required placeholder="First Name" onChange={(e) => { setFirstName(e.target.value) }}></input>
                    </div>
                    <div className="w-[49%] mobile:w-full">
                        <input className="text-xl border-2 border-gray-400 w-full p-6  mb-4 tracking-widest" type="text" required placeholder="Last Name" onChange={(e) => { setLastName(e.target.value) }}></input>
                    </div>
                </div>
                <div className="w-full my-4 mobile:w-full mobile:my-2">
                    <input className="text-xl border-2 border-gray-400 w-full p-6 mb-4 tracking-widest" type="text" required placeholder="Street Address" onChange={(e) => { setAddress1(e.target.value) }}></input>
                </div>
                <div className="w-full my-4 mobile:w-full mobile:my-2">
                    <input className="text-xl border-2 border-gray-400 w-full p-6 mb-4 tracking-widest" type="text" placeholder="Apt / Suite /Unit (Optional)" onChange={(e) => { setAddress2(e.target.value) }}></input>
                </div>
                <div className="flex w-full my-4 justify-between mobile:flex-col">
                    <div className="w-[49%] mobile:w-full my-4">
                        <Select
                            options={states}
                            getOptionLabel={(options) => {
                                return options["name"];
                            }}
                            getOptionValue={(options) => {
                                return options["name"];
                            }}
                            // value={selectedState}
                            onChange={(item) => {
                                console.log(item)
                                setSelectedState(item)
                            }}
                            placeholder="Select State"
                            className="text-xl font-black"
                        />
                        {/* <input className="border-2 border-gray-400 w-full p-6  mb-4 tracking-widest" type="text" required placeholder="Province" onChange={(e) => { setLastName(e.target.value) }}></input> */}
                    </div>
                    <div className="w-[49%]  mobile:w-full my-4">
                        <Select
                            options={City.getCitiesOfState('IN', selectedState?.isoCode)}
                            getOptionLabel={(options) => {
                                return options["name"];
                            }}
                            getOptionValue={(options) => {
                                return options["name"];
                            }}
                            // value={selectedState}
                            onChange={(item) => {
                                setSelectedCity(item)
                            }}
                            placeholder="Select City"
                            className="text-xl font-black"
                        />
                        {/* <input className="border-2 border-gray-400 w-full p-6  mb-4 tracking-widest" type="text" required placeholder="City" onChange={(e) => { setFirstName(e.target.value) }}></input> */}
                    </div>
                </div>
                <div className="flex w-full my-4 justify-between mobile:flex-col">
                    <div className="w-[49%] mobile:w-full">
                        <input className="text-xl border-2 border-gray-400 w-full p-6  mb-4 tracking-widest" type="text" required placeholder="Postal Code" onChange={(e) => { setPostalCode(e.target.value) }}></input>
                    </div>
                    <div className="w-[49%] mobile:w-full">
                        <input className="text-xl border-2 border-gray-400 w-full p-6  mb-4 tracking-widest" type="text" required placeholder="Mobile Number" onChange={(e) => { setMobileNo(e.target.value) }}></input>
                    </div>
                </div>
            </section>
            {/* CheckOut Section */}
            <section className="w-[40%] mobile:w-full">
                <h1 className="text-center font-bold tracking-wide text-2xl p-4 my-4">Order Summary</h1>
                <div>
                    <span className="text-2xl font-extrabold leading-10">Bill Details</span>
                    <div className="p-2  flex justify-between">
                        <span className="inline-block text-2xl w-[70%]">• Order Total</span>
                        <span className="inline-block text-2xl w-[30%]"><i className="fa-solid fa-indian-rupee-sign mr-2" />{totalPrice}</span>
                    </div>
                    <div className="p-2  flex justify-between">
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
                        <span className="inline-block text-2xl w-[70%]">TOTAL</span>
                        <span className="inline-block text-2xl w-[30%]"><i className="fa-solid fa-indian-rupee-sign mr-2" />{totalToPay}</span>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="p-2  m-2 bg-green-500 rounded-lg text-2xl font-extrabold" onClick={handleProceedToPay}>Proceed to pay</button>
                    <Link to={'/cart'} className="p-2  m-2 bg-gray-500 rounded-lg text-2xl font-extrabold">Back to Cart</Link>
                </div>
            </section>
        </section>
    )
};

export default CheckOut;