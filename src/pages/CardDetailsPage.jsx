import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography } from '@mui/material';
import './CardDetailsPage.css';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal';
import MySnackBar from "../components/MySnackBar";

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
    const [openModal, setOpenModal] = useState(false);
    const [collections, setCollections] = useState()
    
    const [snackBar, setSnackBar] = useState({
        open: false,
        message: ''
    });

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
        setOpenModal(true)
    };

    const addCardToCollection = async (collection) => {
        if (collection.cards.some(cardD => cardD.id === card.id)) {
            setSnackBar({open: true, message: `This Card is alredy in the collection: ${collection.name}`})
        } else {
            const payload = { cards: [...collection.cards, card] }
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
                    setSnackBar({open: true, message: `Card successful added to the collection: ${collection.name}`})
                }
            } catch (error) {
                console.log(error)
            }
        }
        setOpenModal(false)
    };

    const handleCloseModal = () => setOpenModal(false);

    const closeSnackBar = () => setSnackBar(false);


    closeSnackBar

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



    function rotateCard(event) {
        const element = document.querySelector(".card");
        // getting info for card size
        let elWidth = element.clientWidth;
        let elHeigth = element.clientHeight;
        let elRect = element.getBoundingClientRect();

        // changing variables taking in account mouse position and card size
        let X = (event.clientX - elRect.left) / elWidth;
        let Y = (event.clientY - elRect.top) / elHeigth;
        let rX = -(X - 0.5) * 35;
        let rY = (Y - 0.5) * 35;
        
        // creating transform variable for the CSS
        document.documentElement.style.setProperty("--x", 100 * X + "%");
        document.documentElement.style.setProperty("--y", 100 * Y + "%");
        document.documentElement.style.setProperty("--r-x", rX + "deg");
        document.documentElement.style.setProperty("--r-y", rY + "deg");
    }

    function clearRotate(event) {
        if (!event.target.classList.contains("card")) {
            document.documentElement.style.setProperty("--x", "0%");
            document.documentElement.style.setProperty("--x", "0%");
            document.documentElement.style.setProperty("--y", "0%");
            document.documentElement.style.setProperty("--r-x", "0%");
            document.documentElement.style.setProperty("--r-y", "0%");
        }
    }

    return isLoading ? (<Box sx={{display: 'flex', flexDirection:'column', width:'100%', height:'70vh', alignItems: 'center', justifyContent:'center'}}><CircularProgress /></Box>) :
        (
            <Fragment>
                <h1>{card.name}</h1>
                {/* row1 */}
                {/* Col1 */}
                <Grid container rowSpacing={3} columnSpacing={{ sm: 1, md: 2 }}>
                    <Grid item xs={4} md={4} sx={{}}>
                        <div className="card">
                            <div className="card__wrapper">
                                <div className="card__3d">
                                    <div className="card__image" onMouseMove={event => rotateCard(event)} onMouseLeave={event => clearRotate(event)}>
                                        <img className="card__" src={card.images.large} alt="" />
                                        <div className="light-layer1"></div>    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={8} md={8} sx={{}}>
                        <Box sx={{ border: '3px solid #3B79C9', borderRadius: "15px", padding: '25px' }}>
                            <div>
                                <h2>About the card:</h2>
                                <div style={{marginBottom: "15px"}}>Set Name: <Chip label={card.set.name} variant="outlined" /> </div>
                                <div style={{marginBottom: "15px"}}>Series: <Chip label={card.set.series} variant="outlined" />  </div>
                                <div style={{marginBottom: "15px"}}>Number of cards printed: <Chip label={card.set.printedTotal} variant="outlined" />  </div>
                                <div style={{marginBottom: "15px"}}>Rarity: <Chip label={card.rarity} variant="outlined" />  </div>
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
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            add the card to the colletion:
                        </Typography>
                        {collections && (<Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {collections.map((collection) => (
                                <li key={collection.id}><Button onClick={() => addCardToCollection(collection)}>{collection.name}</Button></li>
                            ))}
                        </Typography>)}
                        <Button onClick={handleCloseModal}>none of these</Button>
                    </Box>
                </Modal>
                <MySnackBar options={snackBar} closeSnackBar={closeSnackBar}/>
                {/* row2 */}
            </Fragment>
        )
}

export default CardDetails;