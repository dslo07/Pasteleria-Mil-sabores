import { useEffect, useState } from "react";

function useFetch(url) {
    const [error,setError] = useState(null)
    const [data,setData] = useState(null)
    const [loading,setLoading] = useState(true)
    
    useEffect(()=>{
        const  fetchData = async () => {
            try{
                const res = await fetch(url)
                const datos = await res.json()
                setData(datos)
                
            }catch(e){
                setError(e.message)
            }finally{
                setLoading(false)
            }
        }  
        fetchData()
    },[url])
    return { data, loading,error };
}
export default useFetch