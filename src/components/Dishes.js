import React, { useEffect, useState } from 'react';
import { CON_URL, FETCH_DISHES_URL, isMobile } from '../utils/constants';
import { Link } from 'react-router-dom';
import { DishesShimmer } from './Shimmer/Shimmer';
// import './styles.css';

const Dishes = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [dishes, setDishes] = useState(null)

    useEffect(() => {
        fetchDishes()
    }, [])

    const fetchDishes = async () => {
        try {
            const data = await fetch(FETCH_DISHES_URL);
            const json = await data.json()
            console.log(json);
            setDishes(json);
        } catch (err) {
            console.log(err)
        }
    }


    const itemsToShow = isMobile ? 5 : 6; // Number of items to show at a time
    const moveForwardBy = 3; // Move forward by 3 items

    const showNextItems = () => {
        setStartIndex(prevIndex => Math.min(prevIndex + moveForwardBy, dishes.dishes.length - itemsToShow));
    };

    const showPreviousItems = () => {
        setStartIndex(prevIndex => Math.max(prevIndex - moveForwardBy, 0));
    };
    if (dishes == null)
        return <DishesShimmer />
    return (
        <div className="container border-b-2 border-gray-200">
            <div className="buttons flex justify-between">
                <h1 className='font-Basis_Grotesque_Pro font-extrabold text-[24px] leading-[28px] tracking-[-0.4px] mobile:text-[18px]'>{dishes.title}</h1>
                <div>
                    <button className='px-3 disabled:blur-sm' onClick={showPreviousItems} disabled={startIndex === 0}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <button className="px-3 disabled:blur-sm" onClick={showNextItems} disabled={startIndex + itemsToShow >= dishes.dishes.length}>
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
            <div className='flex mobile:w-full'>
                {dishes.dishes.slice(startIndex, startIndex + itemsToShow).map((item, index) => (
                    <div key={index}>
                        <Link to={"/dish"} state={item} >
                            {
                                <img src={CON_URL + item.imageId} className='' />
                            }
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dishes;
