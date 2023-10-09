import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function CollectionDetails() {
    const { collectionId } = useParams();
    const [collection, setCollection] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const apiUrl =  import.meta.env.VITE_API_URL;

    async function getCollection() {
        const response = await fetch(`${apiUrl}/collections/${collectionId}`)
        if (response.ok) {
            const collectionsApi = await response.json()
            setCollection(collectionsApi);
            setIsLoading(false);
        }
    }

    useEffect(() =>{
        getCollection();
    })

    return isLoading ? (<CircularProgress/ >) :  (
        <>
            <h1> {collection.name} </h1>
            <p>{collection.description}</p>
            <h4>The collection's card:</h4>
        </>
    );
}

export default CollectionDetails;