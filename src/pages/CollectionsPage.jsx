import { useEffect, useState } from "react";
import { CircularProgress, Grid, Box, Button } from "@mui/material"
import { Link, useLocation } from "react-router-dom";
import MySnackBar from "../components/MySnackBar";

function CollectionsPage() {
    const [collections, setCollections] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL;
    const [snackBar, setSnackBar] = useState({
        open: false,
        message: ''
    });

    async function getAllCollections() {
        const response = await fetch(`${apiUrl}/collections`)
        if (response.ok) {
            const collectionsApi = await response.json()
            setCollections(collectionsApi);
            setIsLoading(false);
        }
    }


    let location = useLocation();

    useEffect(() => {
        getAllCollections();
    }, [])

    useEffect(() => {
        if (location.state) {
            setSnackBar(location.state)
        }
    }, [location])

    const closeSnackBar = () => setSnackBar(false);

    //   Object.keys(collections).map(function (key, index) {
    //     console.log(collections[key].id);
    // });

    return isLoading ? (<CircularProgress />) : (
        <>
            <h1>All the collections:</h1>
            <Grid container spacing={2}>
                {collections && collections.map((collection) => {
                    return (
                        <Grid item key={collection.id} xs={12} md={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, pr: 4, pl: 4, border: '4px solid #FFCD05', borderRadius: '15px', background: 'linear-gradient(180deg, #3B79C9 0%, rgba(116, 155, 207, 0.64) 35.94%, rgba(116, 155, 207, 0.64) 64.06%, #FBFBFB 100%)', color: '#1A2556', fontWeight: 'bold', fontSize: '20px' }}>
                                <p>{collection.name}</p>
                                <Button variant="contained" sx={{ background: "#3B79C9", borderRadius: '5px', textTransform: 'capitalize', fontWeight: 'bold' }}><Link style={{ color: "white" }} to={`${collection.id}`}>More details</Link></Button>
                            </Box>
                        </Grid>
                    )
                })}
            </Grid>

            <MySnackBar options={snackBar} closeSnackBar={closeSnackBar} />
        </>
    )
}

export default CollectionsPage;