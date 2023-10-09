import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Grid, Card, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

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
    }, [])

    return isLoading ? (<CircularProgress/ >) :  (
        <>
            <h1> {collection.name} </h1>
            <p>{collection.description}</p>
            <h4>The collection&apos;s card:</h4>
            {!collection.cards ? (<p>No cards added</p>) : (<></>)}
            <Grid container spacing={5}>
                {collection.cards && collection.cards.map((cardObj) => {
                    return (
                        <Grid item key={cardObj.id} xs={6} md={4}>
                            <Card sx={{ maxWidth: 245, objectFit:"contain" }} component={Link} to={`/cards/${cardObj.id}`}>
                                <CardMedia 
                                    component="img"
                                    image={`https://images.pokemontcg.io/${cardObj.id.replace(/-[^-]*$/, "")}/1_hires.png`}
                                />
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    );
}

export default CollectionDetails;