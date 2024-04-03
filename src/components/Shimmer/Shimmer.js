import "./Shimmer.css"

const Shimmer = () => {

    return <div className="shimmer-container-main">
        <div className="shimmer-card"></div>
        <div className="shimmer-card"></div>
        <div className="shimmer-card"></div>
        <div className="shimmer-card"></div>
        <div className="shimmer-card"></div>
        <div className="shimmer-card"></div>
        <div className="shimmer-card"></div>
        <div className="shimmer-card"></div>
    </div>
}

export default Shimmer;


export const DishShimmer = () => {

    return <div className="shimmer-container w-8/12 mx-auto">
        <div className="dish-shimmer-menu">
            <div className="dish-shimmer1"></div>
            <div className="dish-shimmer2"></div>
        </div>
        <div className="flex flex-wrap">
            <div className="shimmer-card"></div>
            <div className="shimmer-card"></div>
            <div className="shimmer-card"></div>
            <div className="shimmer-card"></div>
            <div className="shimmer-card"></div>
            <div className="shimmer-card"></div>
            <div className="shimmer-card"></div>
            <div className="shimmer-card"></div>
        </div>
    </div>
}

export const DishesShimmer = () => {
    return <div className="w-full">
        <div className="w-full">
            <div className="dishes-shimmer"></div>
        </div>
    </div>
}

