import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdateCollection() {
    const {collectionId} = useParams();
    const [collection, setCollection] = useState();
    const apiUrl =  import.meta.env.VITE_API_URL;
    const [isLoading, setIsLoading] = useState(true);

    async function fetchCollection() {
        const response = await fetch(`${apiUrl}/collections/${collectionId}`)
        if (response.ok) {
            const collectionsApi = await response.json()
            setCollection(collectionsApi);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCollection()
      }, [])

    return (
        <>
            <h1>Update your collection:</h1>
        </>
    );
}

export default UpdateCollection;