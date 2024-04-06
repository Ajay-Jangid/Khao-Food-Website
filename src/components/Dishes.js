import React, { useEffect, useState, useRef } from 'react';
import { CON_URL, FETCH_DISHES_URL, isMobile } from '../utils/constants';
import { Link } from 'react-router-dom';
import { DishesShimmer } from './Shimmer/Shimmer';
// import './styles.css';

const Dishes = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [dishes, setDishes] = useState(null);
    const containerRef = useRef(null);
    const touchStartXRef = useRef(null);

    useEffect(() => {
        fetchDishes();
    }, []);

    const fetchDishes = async () => {
        try {
            const data = await fetch(FETCH_DISHES_URL);
            const json = await data.json();
            console.log(json);
            setDishes(json);
        } catch (err) {
            console.log(err);
        }
    };

    const itemsToShow = isMobile ? 5 : 6; // Number of items to show at a time
    const moveForwardBy = 3; // Move forward by 3 items

    const handleTouchStart = (e) => {
        touchStartXRef.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        if (!touchStartXRef.current) return;

        const touchEndX = e.touches[0].clientX;
        const diff = touchStartXRef.current - touchEndX;

        if (diff > 50) {
            showNextItems();
        } else if (diff < -50) {
            showPreviousItems();
        }

        touchStartXRef.current = null;
    };

    const showNextItems = () => {
        setStartIndex(prevIndex => Math.min(prevIndex + moveForwardBy, dishes.dishes.length - itemsToShow));
    };

    const showPreviousItems = () => {
        setStartIndex(prevIndex => Math.max(prevIndex - moveForwardBy, 0));
    };

    if (dishes === null) {
        return <DishesShimmer />;
    }

    return (
        <div className="container border-b-2 border-gray-200" ref={containerRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
            <div className="buttons flex justify-between">
                <h1 className='font-Basis_Grotesque_Pro font-extrabold text-[24px] leading-[28px] tracking-[-0.4px] mobile:text-[18px]'>{dishes.title}</h1>
            </div>
            <div className='flex mobile:w-full'>
                {dishes.dishes.slice(startIndex, startIndex + itemsToShow).map((item, index) => (
                    <div key={index}>
                        <Link to={"/dish"} state={item} >
                            {
                                <img src={CON_URL + item.imageId} className='' alt={item.title} />
                            }
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dishes;
