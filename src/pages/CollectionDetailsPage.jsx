import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Grid, Card, CardMedia, Button } from "@mui/material";
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
            {console.log(collection.cards.length)}
            {collection.cards.length == 0  ? (<p>No cards added</p>) : (<></>)}
            <Grid container spacing={5}>
                {collection.cards && collection.cards.map((cardObj) => {
                    return (
                        <Grid item key={cardObj} xs={6} md={4}>
                            <Card sx={{ maxWidth: 245, objectFit:"contain" }} component={Link} to={`/cards/${cardObj}`}>
                                <CardMedia 
                                    component="img"
                                    image={`https://images.pokemontcg.io/${cardObj.replace(/-[^-]*$/, "")}/1_hires.png`}
                                />
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
            <Button variant="contained" href={`/collections/edit/${collectionId}`} sx={{background: "#3B79C9", border: "4px solid #FFCD05", marginTop: '1em', textTransform: 'capitalize',  mt: '4rem'}}>
                    Edit your collection
            </Button>
        </>
    );
}

export default CollectionDetails;