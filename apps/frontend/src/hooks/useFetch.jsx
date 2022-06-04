import { useEffect, useState } from "react"

const useFetch = (endpoint) => {
    const [data, setData] = useState(null)

    useEffect(()=>{
        fetch(endpoint)
            .then(data=>data.json())
            .then(data=>setData(data))
    }, [endpoint])

    return [data, setData]
}

export default useFetch;