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
        <p>{cuisines.join(", ").length > 21 ? cuisines.join(", ").slice(0, 22) + "..." : cuisines.join(", ")}</p>
        <p>
          <span>
            <i className="fa fa-star"></i>
            {avgRating}
          </span>

          <span>• {slaString}</span>
        </p>
        <p className="costForTwo font-bold">{costForTwo}</p>
      </div>
    </div>
  );
};

export const withHeaderLabel = (RestaurantCard) => {
  return (props) => {
    const { aggregatedDiscountInfoV3 } = props.resData;
    const { header, subHeader } = aggregatedDiscountInfoV3 ?? {}
    return (
      <div className="discount">
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





