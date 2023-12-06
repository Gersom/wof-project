import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { API_URL_POSTS_CAREGIVERID } from "../constants/api";

 const useGetPostsCaregiverId = () => {
    const caregiverId = useSelector((state) => state.userReducer.user?.caregiver?.id)

    const offersOwner = useSelector((state) => state.offersReducer.offersOwner)
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getPosts = async() => {
            const response = await fetch(API_URL_POSTS_CAREGIVERID + caregiverId)
            const data = await response.json()
            setPosts(data)
        }
        if(caregiverId) {
            setIsLoading(true)
            getPosts()
            setIsLoading(false)
        }
    },[caregiverId, offersOwner])

  return {isLoading, posts}
}

export default useGetPostsCaregiverId
