import React from 'react';
import { SLOGAN, WEBSITE_NAME } from "../utils/constants";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Footer = () => {
    const cartItems = useSelector((store) => store.cart.cartItems);  // only getting access to cart items 

    return (
        <footer id="footer" className="bg-gray-800 text-white">
            <div className="container mx-auto px-4">
                {/* <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full  mb-4 ">
                        <h3 className="text-3xl  font-bold mb-2">About {WEBSITE_NAME}</h3>
                        <p className="text-xl ">At {WEBSITE_NAME}, we are passionate about delivering delicious food straight to your doorstep. Our mission is to provide you with a convenient and hassle-free way to enjoy your favorite meals from the comfort of your home.</p>
                    </div>
                    <div className="w-full  mb-4 ">
                        <h3 className="text-xl  font-bold mb-2">Contact Us</h3>
                        <p className="text-xl ">Have questions or need assistance? Our customer support team is here to help! Contact us via email at <a href="mailto:support@example.com" className="text-blue-300 hover:text-blue-400">support@example.com</a> or give us a call at <a href="tel:18001234567" className="text-blue-300 hover:text-blue-400">1-800-123-4567</a>.</p>
                    </div>
                </div> */}
                <div className="text-center">
                    <p className='text-4xl font-extrabold tracking-wider mobile:text-3xl'>{WEBSITE_NAME}</p>
                    <p className="text-2xl mobile:text-xl">{SLOGAN}</p>
                    <p className="text-2xl mobile:text-xl">&copy; {new Date().getFullYear()} {WEBSITE_NAME}. All rights reserved.</p>
                </div>
                <div className="">
                    <ul className='flex justify-center text-[3rem] mobile:text-[3rem]'>
                        <li><a href="https://www.instagram.com/your_instagram_username" target="_blank"><i className="fab fa-instagram px-3"></i></a></li>
                        <li><a href="https://github.com/Ajay-Jangid/Khao-Food-Website" target='_blank'><i className="fab fa-github-square px-3"></i></a></li>
                        <li><a href="https://www.facebook.com/your_facebook_page" target="_blank"><i className="fab fa-facebook-square px-3"></i></a></li>
                        <li><a href="https://twitter.com/your_twitter_handle" target="_blank"><i className="fab fa-twitter-square px-3"></i></a></li>
                    </ul>
                </div>
            </div>  
        </footer>
    );
};

export default Footer;
