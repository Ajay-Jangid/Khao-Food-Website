import { PAGE_NOT_FOUND_URL } from "../utils/constants";

const PageNotFound = () => {
    return (
        <div className="h-screen w-8/12 flex justify-center mx-auto mobile:w-full">
            <img className="object-cover object-center bg-no-repeat mobile:w-full h-1/2 mobile:h-2/5" src={PAGE_NOT_FOUND_URL}></img>
        </div>
    )
}

export default PageNotFound;