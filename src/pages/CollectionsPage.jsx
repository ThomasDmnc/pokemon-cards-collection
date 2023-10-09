import { useEffect, useState } from "react";

function CollectionsPage() {
    const [collections, setCollections] = useState();
    const apiUrl =  import.meta.env.VITE_API_URL;

    async function getAllCollections() {
        const response = await fetch(`${apiUrl}/collections`)
        console.log(response)
        if (response.ok){
            const collectionsApi = await response.json()
            console.log(collectionsApi)
            setCollections(collectionsApi)
        }
    }

    useEffect(() =>{
        getAllCollections()
    })

    return (
        <>
            <h1>Hello</h1>
        </>
    );
}

export default CollectionsPage;