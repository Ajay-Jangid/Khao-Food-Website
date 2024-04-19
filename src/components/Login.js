import { Link } from "react-router-dom";
import { LOGIN_IMAGE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateIsAuthenticated } from "../utils/loginSlice";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [invalidCredentails, setInvalidCredentials] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        verfiyToken(token);
    }, [])

    const verfiyToken = async (token) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token
            })
        };
        const response = await (await fetch('https://khao-backend.vercel.app/database/verify/token', options)).json();
        console.log(response)
        if (response) {
            dispatch(updateIsAuthenticated({ value: true }));
            navigate('/home');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rememberMe,
                email,
                password
            })
        };
        let response = await fetch('https://khao-backend.vercel.app/database/login/user', options)
        response = await response.json();
        console.log(response)
        if (response.statusCode === '200') {
            if (rememberMe) {
                const { token } = response;
                localStorage.setItem('token', token);
            }
            dispatch(updateIsAuthenticated({ value: true }));
            navigate('/home')
        }
        else if (response.statusCode === '404' || response.statusCode === '401') {
            setInvalidCredentials(true)
        }
        else {
            console.log('Something went wrong!')
        }
    }

    return (
        <section className="h-screen mobile:h-full">
            <div className="mx-auto relative top-[50%] translate-y-[-50%] w-8/12 h-3/4 rounded-xl flex shadow-2xl mobile:flex-col mobile:w-full mobile:p-4 mobile:h-full  mobile:my-0 tablet:w-full">
                <section className="w-1/2 flex flex-col justify-center items-center h-full mobile:h-[30%] mobile:w-full">
                    <h1 className="text-5xl h-[10%] text-center font-bold mobile:text-4xl mobile:order-2">Sign In</h1>
                    <img className="w-full object-cover object-center bg-no-repeat h-3/4 mobile:h-full" src={LOGIN_IMAGE_URL}></img>
                </section>
                <section className="mx-auto w-[40%] h-full flex flex-col justify-center mobile:h-[70%] mobile:w-full">
                    <form className="text-2xl w-full mt-8 mobile:text-2xl mobile:mt-10" onSubmit={handleSubmit}>
                        <div className="w-full">
                            <label className="block mb-6 uppercase font-semibold tracking-widest">Email</label>
                            <input className="border-2 w-full p-6 rounded-xl mb-6 tracking-widest" type="email" placeholder="Email" required onChange={(e) => { setEmail(e.target.value) }}></input>
                        </div>
                        <div className="w-full">
                            <label className="block mb-6 uppercase font-semibold tracking-widest">Password</label>
                            <input className="border-2 w-full p-6 rounded-xl mb-6 tracking-widest" type={showPassword ? "text" : "password"} placeholder="Password" required minLength={8} onChange={(e) => { setPassword(e.target.value) }}></input>
                            <div className="flex items-center">
                                <input className="w-6 h-6 rounded-2xl mr-4 cursor-pointer" type="checkbox" checked={showPassword} onClick={() => setShowPassword(!showPassword)} />
                                <span className="text-2xl font-semibold text-gray-600 tracking-wide cursor-pointer" onClick={() => setShowPassword(!showPassword)}>Show Password</span>
                            </div>
                        </div>
                        {
                            invalidCredentails &&
                            <div className="mt-4">
                                <span className="inline-block text-red-600">The email or password you have entered is invalid!</span>
                            </div>
                        }
                        <button type="submit" className="text-4xl w-full bg-blue-500 p-6 rounded-lg my-4 font-bold">Sign In</button>
                    </form>
                    <div className="text-2xl flex justify-between mb-5 mobile:text-2xl mobile:mb-10">
                        <div className="flex items-center">
                            <input className="w-6 h-6 rounded-2xl cursor-pointer" type="checkbox" checked={rememberMe} onClick={() => setRememberMe(!rememberMe)} />
                            <span className="inline-block ml-4 font-semibold tracking-wider text-gray-500 cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>Remember Me</span>
                        </div>
                        <Link><h1 className="text-gray-500 font-semibold tracking-wider">Forgot Password?</h1></Link>
                    </div>
                    <div className="text-2xl w-full flex justify-center mb-5 mobile:mb-10">
                        <h1 className="font-bold">Not a member? <Link className="text-orange-500" to={'/signup'}>Sign Up</Link></h1>
                    </div>
                </section>
            </div>
        </section>
    )
}

export default Login;