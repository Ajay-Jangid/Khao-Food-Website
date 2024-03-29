// import { useEffect, useState } from "react";

// export default useOnlineStatus = () => {

//     const [onlineStatus, setOnlineStatus] = useState(true)
//     console.log('Online Status Called:', onlineStatus)
//     useEffect(() => {
//         window.addEventListener("offline", () => {
//             setOnlineStatus(false)
//         })
//         window.addEventListener("online", () => {
//             setOnlineStatus(true)
//         })
//     }, [])

//     return onlineStatus;
// }