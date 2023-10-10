import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography } from '@mui/material';
import './CardDetailsPage.css';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function CardDetails() {
    const { cardId } = useParams();
    const [card, setCard] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [collections, setCollections] = useState()
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleOpen = async () => {
        try {
            const response = await fetch(`${apiUrl}/collections`)
            if (response.ok) {
                const collections = await response.json();
                setCollections(collections)
            }
        } catch (error) {
            console.log(error)
        }
        setOpen(true)
    };

    const addCardToCollection = async (collection) => {
        event.preventDefault()
        const payload = {cards: [...collection.cards, card] }
        try {
            const response = await fetch(`${apiUrl}/collections/${collection.id}`,
            {
                method: 'PATCH',
                body: JSON.stringify(payload),
                headers: {
                    'Content-type': 'application/json',
                },
            })
            if (response.ok) {
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        }
        setOpen(false)
    };

    const handleClose = () => setOpen(false);

    async function fetchCardDetails() {
        const response = await fetch(`https://api.pokemontcg.io/v2/cards/${cardId}`)

        if (response.ok) {
            const parsedData = await response.json();
            setCard(parsedData.data)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchCardDetails();
    }, [])

    return isLoading ? (<CircularProgress />) :
        (
            <Fragment>
                <h1>{card.name}</h1>
                {/* row1 */}
                {/* Col1 */}
                <Grid container rowSpacing={3} columnSpacing={{ sm: 1, md: 2 }}>
                    <Grid item xs={4} md={4} sx={{}}>
                        <img src={card.images.large} alt="" style={{ height: '500px' }} />
                    </Grid>
                    <Grid item xs={8} md={8} sx={{}}>
                        <Box sx={{ border: '3px solid #3B79C9', borderRadius: "15px", padding: '25px' }}>
                            <div>
                                <h2>About the card:</h2>
                                <p>Set Name: <Chip label={card.set.name} variant="outlined" /> </p>
                                <p>Series: <Chip label={card.set.series} variant="outlined" />  </p>
                                <p>Number of cards printed: <Chip label={card.set.printedTotal} variant="outlined" />  </p>
                                <p>Rarity: <Chip label={card.rarity} variant="outlined" />  </p>
                            </div>
                            <div>
                                <h2>Prices:</h2>
                                <p>Low Price: {card.cardmarket.prices.lowPrice} €</p>
                                <p>Average Price: {card.cardmarket.prices.trendPrice} €</p>
                                <p>30d Average Price: {card.cardmarket.prices.avg30} €</p>
                            </div>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4} sx={{}}>
                        <Button variant="contained" onClick={handleOpen} sx={{ background: "#3B79C9", border: "4px solid #FFCD05" }}>
                            Add to your collection
                        </Button>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Button variant="contained" href={card.cardmarket.url} target="_blank" sx={{ background: "#DA1630", border: "4px solid #FFCD05" }}>
                            Buy one online
                        </Button>
                    </Grid>
                </Grid>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Your collection:
                        </Typography>
                        {collections && (<Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {collections.map((collection) => (
                                <li key={collection.id}><Button onClick={()=>addCardToCollection(collection)}>{collection.name}</Button></li>
                            ))}
                        </Typography>) }
                        <Button onClick={handleClose}>No</Button>
                    </Box>
                </Modal>
                {/* row2 */}
            </Fragment>
        )
}

export default CardDetails;