import { API_URL_OFFERS } from "../constants/api"


const getDetailsOffers = async(id) =>{
    const response = await fetch(API_URL_OFFERS + id)
    const data = await response.json()
    return data
}

export default getDetailsOffers;