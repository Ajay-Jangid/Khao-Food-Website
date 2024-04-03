import { CON_URL } from "../../utils/constants";
import "./RestaurantCard.css"


const RestaurantCard = (props) => {
  const {
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    sla,
    costForTwo,
  } = props.resData;
  const { slaString } = sla;
  return (
    <div className="res-card">
      <div className="card-container">
        <img
          className="res-card-image"
          src={`${CON_URL}${cloudinaryImageId}`}
        />
      </div>
      <div className="card-info">
        <h3 className="res-card-title">{name.length > 19 ? name.slice(0, 20) + "..." : name}</h3>
        <p className="flex">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-hidden="true" strokeColor="rgba(2, 6, 12, 0.92)" fillColor="rgba(2, 6, 12, 0.92)"><circle cx="10" cy="10" r="9" fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"></circle><path d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z" fill="white"></path><defs><linearGradient id="StoreRating20_svg__paint0_linear_32982_71567" x1="10" y1="1" x2="10" y2="19" gradientUnits="userSpaceOnUse"><stop stopColor="#21973B"></stop><stop offset="1" stopColor="#128540"></stop></linearGradient></defs></svg>
          <span className="ml-3 text-2xl font-bold text-gray-800">{avgRating} • {slaString}</span>
        </p>
        <p className="text-2xl text-gray-500">{cuisines.join(", ").length > 21 ? cuisines.join(", ").slice(0, 22) + "..." : cuisines.join(", ")}</p>
        {/* <p className="costForTwo font-bold">{costForTwo}</p> */}
      </div>
    </div>
  );
};

export const withHeaderLabel = (RestaurantCard) => {
  return (props) => {
    const { aggregatedDiscountInfoV3 } = props.resData;
    const { header, subHeader } = aggregatedDiscountInfoV3 ?? {}
    return (
      <div className="discount hover:scale-95">
        <p className="discountLabel">{header ?? ""} {subHeader ?? ""}</p>
        {/* <p className="absolute top-[40%] left-[2.2rem] font-extrabold z-10 text-[1.6rem] bg-slate-900 text-yellow-100">{header ?? ""} {subHeader ?? ""}</p> */}
        <RestaurantCard {...props} />
      </div>
    )
  }
}

export default RestaurantCard;

// import { CON_URL } from "../../utils/constants";
// // import "./RestaurantCard.css";

// const RestaurantCard = (props) => {
//   const {
//     cloudinaryImageId,
//     name,
//     cuisines,
//     avgRating,
//     sla,
//     costForTwo,
//   } = props.resData;
//   const { slaString } = sla;
//   return (
//     <div className="border-2 border-black w-full h-96 flex flex-col m-4 p-4 justify-between transition-transform duration-500 ease-in-out rounded-xl shadow-custom hover:shadow-lg hover:-translate-y-[10px] focus:shadow-lg focus:-translate-y-[10px] mobile:flex-row mobile:h-[15rem]">
//       <div className="w-full h-1/2 mobile:h-full mobile:w-1/2 mobile:border border-black  ">
//         <img
//           className="w-full h-full object-cover object-center rounded-lg bg-no-repeat bg-center" style={{ width: "100%" }}
//           src={`${CON_URL}${cloudinaryImageId}`}
//         />
//       </div>
//       <div className="h-[40%] mobile:w-1/2 mobile:px-4 mobile:border mobile:h-full" >
//         <h3 className="text-2xl font-bold mb-1 mobile:mt-4 mobile:mb-2">{name}</h3>
//         <p className="text-xl font-extralight mb-1 mobile:mb-2">{cuisines.join(", ").slice(0, 27) + ".."}</p>
//         <p className="mb-1 mobile:mb-2">
//           <span className="inline-block text-xl">
//             <i className="fa fa-star mr-3  text-green-500"></i>
//             {avgRating}
//           </span>
//           <span className="inline-block text-xl ml-3">• {slaString}</span>
//         </p>
//         <p className="text-xl font-bold ">{costForTwo}</p>
//       </div>
//     </div>
//   );
// };

// export const withHeaderLabel = (RestaurantCard) => {
//   return (props) => {
//     const { aggregatedDiscountInfoV3 } = props.resData;
//     const { header, subHeader } = aggregatedDiscountInfoV3 ?? {};
//     return (
//       <div className="relative transition-transform ease-in-out">
//         {header &&
//           <p className="absolute top-40 left-5 font-extrabold z-10 text-sm bg-yellow-400 text-black p-2">{header ?? ""} {subHeader ?? ""}</p>
//         }
//         <RestaurantCard  {...props} />
//       </div>
//     );
//   };
// };

// export default RestaurantCard;





