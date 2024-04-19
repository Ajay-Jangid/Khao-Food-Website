import { Link, useNavigate } from "react-router-dom";
import { PAYMENT_SUCCESSFULL_LOGO, SIGNUP_IMAGE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const SignUp = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submit, setSubmit] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [alreadyPresent, setAlreadyPresent] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const navigate = useNavigate();

    const validatePassword = () => {
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[A-Za-z][!@#$%^&*\w]{7,}$/;
        return passwordRegex.test(password);
    }

    useEffect(() => {
        let redirectTimer;
        if (userCreated) {
            redirectTimer = setTimeout(() => {
                navigate("/login");
            }, 2000);
        }
        // Cleanup function to clear the timer when the component unmounts or orderPlaced changes
        return () => clearTimeout(redirectTimer);
    }, [userCreated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password
            })
        };
        const response = await (await fetch('https://khao-backend.vercel.app/database/create/user', options)).json()
        if (response.statusCode === '409') {
            setAlreadyPresent(true)
        }
        if (response.statusCode === '201') {
            setUserCreated(true)
        }
        console.log(response)
    }

    const handleSetConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        console.log(validatePassword && e.target.value === password)
        setSubmit(!(validatePassword && e.target.value === password));
    }

    if (userCreated) {
        return (
            <div className="relative">
                < div className="w-full mx-auto text-center absolute top-[50%]  translate-y-[-50%] " >
                    <img className="ml-[50%] translate-x-[-50%] h-[300px] w-[300px]" src={PAYMENT_SUCCESSFULL_LOGO} alt="Payment Successful" />
                    <h1 className="text-3xl font-extrabold ">User Registered Successfully</h1>
                </div >
            </div>
        )
    }

    return (
        <section className="mobile:h-full h-[53rem]">
            <div className="mx-auto relative top-[20%] w-8/12 h-full rounded-xl flex shadow-2xl mobile:flex-col mobile:w-full mobile:p-4 mobile:h-full mobile:my-0">
                <section className="w-1/2 flex flex-col justify-center items-center h-full mobile:h-[30%] mobile:w-full">
                    <h1 className="text-5xl h-[10%] text-center font-bold mobile:text-4xl mobile:order-2 mobile:mt-3">Sign Up</h1>
                    <img className="w-full h-3/5 object-cover object-center bg-no-repeat mobile:h-full" src={SIGNUP_IMAGE_URL}></img>
                </section>
                <section className="mx-auto w-[40%] h-full flex flex-col justify-center mobile:h-[70%] mobile:w-full mobile:mt-10">
                    <form className="text-xl w-full mt-10 mobile:text-2xl mobile:mt-10" onSubmit={handleSubmit}>
                        <div className="flex w-full justify-between mobile:flex-col">
                            <div className="w-[49%] mobile:w-full">
                                <label className="block mb-4 uppercase font-semibold tracking-widest">First Name</label>
                                <input className="border-2 w-full p-6 rounded-xl mb-4 tracking-widest" type="text" required placeholder="First Name" onChange={(e) => { setFirstName(e.target.value) }}></input>
                            </div>
                            <div className="w-[49%] mobile:w-full">
                                <label className="block mb-4 uppercase font-semibold tracking-widest">Last Name</label>
                                <input className="border-2 w-full p-6 rounded-xl mb-4 tracking-widest" type="text" required placeholder="Last Name" onChange={(e) => { setLastName(e.target.value) }}></input>
                            </div>
                        </div>
                        <div className="w-full">
                            <label className="block mb-4 uppercase font-semibold tracking-widest">Email</label>
                            <input className="border-2 w-full p-6 rounded-xl mb-4 tracking-widest" type="email" required placeholder="Email" onChange={(e) => { setEmail(e.target.value) }}></input>
                        </div>
                        <div className="w-full">
                            <label className="block mb-4 uppercase font-semibold tracking-widest">Password</label>
                            <input className="border-2 w-full p-6 rounded-xl mb-4 tracking-widest" type="password" required placeholder="Password" onChange={(e) => { setPassword(e.target.value) }}></input>
                            {
                                password.length > 0 && !validatePassword() && (

                                    < ul className="absolute left-[80%] bottom-[10%] z-10 mobile:relative mobile:left-[0%] mobile:bottom-0" >
                                        <li style={{ color: /^[A-Za-z]/.test(password) ? 'green' : 'red' }}>
                                            Password must start with a letter
                                        </li>
                                        <li style={{ color: /^(?=.*\d)/.test(password) ? 'green' : 'red' }}>
                                            Password must contain at least one digit
                                        </li>
                                        <li style={{ color: /^(?=.*[!@#$%^&*])/.test(password) ? 'green' : 'red' }}>
                                            Password must contain at least one symbol
                                        </li>
                                        <li style={{ color: /^(?=.*[a-z])/.test(password) ? 'green' : 'red' }}>
                                            Password must contain at least one lowercase letter
                                        </li>
                                        <li style={{ color: /^(?=.*[A-Z])/.test(password) ? 'green' : 'red' }}>
                                            Password must contain at least one uppercase letter
                                        </li>
                                        <li style={{ color: password.length >= 8 ? 'green' : 'red' }}>
                                            Password must be at least 8 characters long
                                        </li>
                                    </ul>
                                )
                            }
                        </div>
                        <div className="w-full">
                            <label className="block mb-4 uppercase font-semibold tracking-widest">Confirm Password</label>
                            <input className="border-2 w-full p-6 rounded-xl mb-4 tracking-widest" style={{ borderColor: confirmPassword !== '' ? (password === confirmPassword ? 'green' : 'red') : "" }} type={showPassword ? "text" : "password"} required placeholder="Confirm Password" onChange={handleSetConfirmPassword}></input>
                            {
                                confirmPassword !== '' && password !== confirmPassword && (
                                    <div><span className="inline-block text-red-600 font-semibold">Password doesn't match</span></div>
                                )
                            }
                            <div className="flex items-center">
                                <input className="w-6 h-6 rounded-2xl mr-4" type="checkbox" onClick={() => setShowPassword(!showPassword)} />
                                <span className="font-semibold text-gray-600 tracking-wide">Show Password</span>
                            </div>
                        </div>
                        {
                            alreadyPresent && (<div className="text-2xl w-full flex justify-center">
                                <h1 className="font-bold text-red-500">Account already present in database.</h1>
                            </div>)
                        }
                        <button type="submit" className="text-3xl w-full bg-blue-500 p-6 rounded-lg my-8 font-bold" disabled={submit}>Sign Up</button>
                    </form>
                    <div className="text-2xl w-full mb-5 flex justify-center mobile:mb-10">
                        <h1 className="font-bold">Already have an account? <Link className="text-orange-500" to={'/login'}>Sign In</Link></h1>
                    </div>
                </section>
            </div >
        </section >
    )
}

export default SignUp;