
import "./RestaurantMenuShimmer.css";

const RestaurantMenuShimmer = () => {
    return <div className="res-shimmer-container">
        <div className="res-menu-shimmer">
            <div className="res-menu-shimmer-left">
                <div className="shimmer1"></div>
                <div className="shimmer2"></div>
                <div className="shimmer3"></div>
                <div className="shimmer4"></div>
            </div>
            <div className="res-menu-shimmer-right">
                <div className="res-menu-shimmer-rating"></div>
            </div>
        </div>
        <div className="res-info-shimmer">
        </div>
        <div className="res-info-shimmer">
        </div>
    </div>
}

export default RestaurantMenuShimmer;