import { useNavigate } from "react-router-dom";
import { SLOGAN, WEBSITE_NAME } from "../../utils/constants";
import { useSelector } from "react-redux";

const About = () => {
    const isAuthenticated = useSelector((store) => store.login.isAuthenticated)
    const navigate = useNavigate();

    if (!isAuthenticated) {
        navigate("/login");
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-5xl lg:text-4xl xl:text-5xl font-bold mb-4">Welcome to {WEBSITE_NAME}</h1>
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">{SLOGAN}</h1>
            <section className="mb-8">
                <h2 className="text-3xl lg:text-3xl xl:text-4xl font-bold mb-2">About Us</h2>
                <p className="text-2xl lg:text-xl xl:text-2xl text-gray-700 mb-4">
                    At {WEBSITE_NAME}, we are passionate about delivering delicious food straight to your doorstep.
                    Our mission is to provide you with a convenient and hassle-free way to enjoy your favorite meals from the comfort of your home.
                </p>
            </section>
            <section className="mb-8">
                <h2 className="text-3xl lg:text-3xl xl:text-4xl font-bold mb-2">How It Works</h2>
                <ol className="list-decimal pl-6 text-2xl lg:text-xl xl:text-2xl text-gray-700 mb-4">
                    <li>Browse Menu: Explore our diverse menu featuring a wide selection of cuisines, including Italian, Asian, American, and more.</li>
                    <li>Place Your Order: Once you've found your desired items, simply add them to your cart and proceed to checkout.</li>
                    <li>Fast Delivery: Sit back and relax while our dedicated team prepares your order with care. We work with local restaurants and delivery partners to ensure your food is delivered hot and fresh to your doorstep in no time.</li>
                </ol>
            </section>
            <section className="mb-8">
                <h2 className="text-3xl lg:text-3xl xl:text-4xl font-bold mb-2">Why Choose Us</h2>
                <ul className="list-disc pl-6 text-2xl lg:text-xl xl:text-2xl text-gray-700 mb-4">
                    <li>Convenience: Skip the hassle of cooking and let us handle mealtime for you.</li>
                    <li>Variety: With a diverse menu featuring dishes from around the world, you'll never run out of options to satisfy your cravings.</li>
                    <li>Quality: We partner with top-rated restaurants and chefs to ensure that every dish is made with high-quality ingredients and prepared with attention to detail.</li>
                    <li>Affordability: We offer competitive prices and regular promotions to make dining at home affordable for everyone.</li>
                    <li>Taste, Speed, Satisfaction: Experience the perfect blend of flavor, efficiency, and customer happiness.</li>
                </ul>
            </section>
            <section className="mb-8">
                <h2 className="text-3xl lg:text-3xl xl:text-4xl font-bold mb-2">Contact Us</h2>
                <p className="text-2xl lg:text-xl xl:text-2xl text-gray-700 mb-4">
                    Have questions or need assistance? Our customer support team is here to help! Contact us via email at <a href="mailto:support@example.com">support@example.com</a> or give us a call at <a href="tel:18001234567">1-800-123-4567</a>.
                </p>
            </section>
            <section>
                <h2 className="text-3xl lg:text-3xl xl:text-4xl font-bold mb-2">Start Ordering Now!</h2>
                <p className="text-2xl lg:text-xl xl:text-2xl text-gray-700">
                    Ready to indulge in a culinary adventure? Browse our menu and place your order today! Thank you for choosing {WEBSITE_NAME} for all your dining needs.
                </p>
            </section>
        </div>
    );
};
export default About;