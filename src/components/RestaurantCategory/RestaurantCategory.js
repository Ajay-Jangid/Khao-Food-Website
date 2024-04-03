import FoodItemList from "../ItemList/ItemList"
import "./RestaurantCategory.css"
const RestaurantCategory = ({ data, showItems, setShowIndex }) => {

    const handleClick = (e) => {
        setShowIndex()
    }
    
    return (
        <div className="my-6 bg-white px-4 py-6 mobile:py-4">
            <div className="flex justify-between cursor-pointer" value={data.title} onClick={handleClick}>
                <span className="font-extrabold mobile:text-[12px]">{data.title} ({data.itemCards.length})</span>
                {showItems ? <span className='icon-up mobile:text-[12px]'></span> :
                    <span className='icon-down mobile:text-[12px]'></span>}
            </div>
            {showItems ? <FoodItemList items={data.itemCards} /> : ""}
        </div>
    )
}

export default RestaurantCategory
