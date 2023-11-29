import { API_URL_BREEDS } from "../constants/api"
import { useState, useEffect } from 'react'

const useGetBreeds = (specieId) => {
    const [breeds, setBreeds] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const getBreeds = async () => {
            const response = await fetch(API_URL_BREEDS + specieId)
            const data = await response.json()
            setBreeds(data)
        }
        getBreeds()
        setIsLoading(false)
    }, [specieId])



  return { breeds, isLoading}
}

export default useGetBreeds