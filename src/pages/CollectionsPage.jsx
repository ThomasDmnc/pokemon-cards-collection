import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid'
import { CircularProgress } from "@mui/material"

function CollectionsPage() {
    const [collections, setCollections] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const apiUrl =  import.meta.env.VITE_API_URL;

    async function getAllCollections() {
        const response = await fetch(`${apiUrl}/collections`)

        if (response.ok) {
            const collectionsApi = await response.json()
            setCollections(collectionsApi)
            setIsLoading(false);
        }
    }

    useEffect(() =>{
        getAllCollections();
    })


    //   Object.keys(collections).map(function (key, index) {
    //     console.log(collections[key].id);
    // });

    return isLoading ? (<CircularProgress/ >) : (
        <>
            <h1>All the collections:</h1>
            <ul>
                {collections.map((collection) => {
                    <div key={collection.id}>
                        <p>X</p>
                    </div>
                })}
            </ul>
        </>
    )
}

export default CollectionsPage;