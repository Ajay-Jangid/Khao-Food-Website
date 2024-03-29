import { useEffect, useState } from "react";
import { MENU_URL, MOBILE_MENU_URL, isMobile } from "./constants";


export const useRestaurantMenu = (resId) => {

    const [resInfo, setResInfo] = useState(null);
    useEffect(() => {
        // console.log('USE EFFECT START')
        fetchMenu();   //Fetch the Data through API
        // return ()=>{
        //     console.log('USE EFFECT RETURN')
        // }
    }, []);

    const fetchMenu = async () => {
        // const url = "http://localhost:3000/data/getRestaurantMenu/";
        // const url = isMobile ? MOBILE_MENU_URL : MENU_URL;
        const data = await fetch(MENU_URL+resId)
        const json = await data.json()
        console.log(json)
        setResInfo(json.data)
    }
    return resInfo;
}