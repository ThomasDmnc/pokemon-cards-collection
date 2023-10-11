import { useEffect, useState } from "react";
import { useParams, useNavigate, } from "react-router-dom";
import { CircularProgress, Grid, Card, CardMedia, Button } from "@mui/material";
import { Link } from "react-router-dom";

function CollectionDetails() {
    const { collectionId } = useParams();
    const [collection, setCollection] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;


    async function getCollection() {
        const response = await fetch(`${apiUrl}/collections/${collectionId}`)
        if (response.ok) {
            const collectionsApi = await response.json()
            setCollection(collectionsApi);
            setIsLoading(false);
        }
    }

    async function handleDelete() {
        try {
            const response = await fetch(`${apiUrl}/collections/${collectionId}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                const parsed = await response.json()
                console.log(parsed)
                navigate('/collections', { state: { open: true, message: `The collection was deleted successfully: ${collection.name}` } })

            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCollection();
    }, [])


    return isLoading ? (<CircularProgress />) : (
        <>
            <h1> {collection.name} </h1>
            <p>{collection.description}</p>
            <h4>The collection&apos;s card:</h4>
            {collection.cards.length == 0 ? (<p>No cards added</p>) : (<></>)}
            <Grid container spacing={5}>
                {collection && collection.cards.map((cardObj) => {
                    return (
                        <Grid item key={cardObj.id} xs={6} md={4}>
                            <Card sx={{ maxWidth: 245, objectFit: "contain" }} component={Link} to={`/cards/${cardObj.id}`}>
                                <CardMedia
                                    component="img"
                                    image={cardObj.images.large}
                                />
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
            <Button variant="contained" sx={{ background: "#3B79C9", border: "4px solid #FFCD05", marginTop: '1em', marginRight: '2em', textTransform: 'capitalize', mt: '4rem' }}>
                <Link style={{color: "white"}} to={`/collections/edit/${collectionId}`}>
                    Edit your collection
                </Link>
            </Button>
            <Button variant="contained" onClick={handleDelete} sx={{ background: "#DA1630", border: "4px solid #FFCD05", marginTop: '1em', textTransform: 'capitalize', mt: '4rem' }}>
                Delete your collection
            </Button>
        </>
    );
}

export default CollectionDetails;