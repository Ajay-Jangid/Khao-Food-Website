
import "./RecommendedCard.css"
import { CON_URL, NON_VEG_LOGO_URL, VEG_LOGO_URL } from "../../utils/constants";

const RecommendedCard = ({ description, isVeg, name, defaultPrice, imageId, price }) => {

    return (
        <div className="recommended-container">
            <div className="recommended-left-side">
                <img className="vegNonVeg" src={isVeg ? VEG_LOGO_URL : NON_VEG_LOGO_URL} />
                <h3 className="recommended-title">{name}</h3>
                <p className="recommended-price"><i className="fa-solid fa-indian-rupee-sign"></i>{defaultPrice ? defaultPrice / 100 : price / 100}</p>
                <p className="recommended-description">{description}</p>
            </div>
            <div className="recommended-right-side">
                <img className="recommended-image" src={CON_URL + imageId} />
            </div>
        </div>
    )
}

export default RecommendedCard;