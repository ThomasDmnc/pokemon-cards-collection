import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from '@mui/material';
import './CardDetailsPage.css';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

function CardDetails() {
    const { cardId } = useParams(); 
    const [card, setCard] = useState();
    const [isLoading, setIsLoading] = useState(true);

    async function fetchCardDetails(){
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

    return isLoading ? (<CircularProgress/ >) :
    ( 
        <>
        <h1>{card.name}</h1>
        {/* row1 */}
        {/* Col1 */}
        <Grid container rowSpacing={3} columnSpacing={{ sm: 1, md: 2 }}>  
            <Grid item xs={4} md={4} sx={{}}>
               <img src={card.images.large} alt="" style={{height: '500px'}}/>
            </Grid>
            <Grid item xs={8} md={8} sx={{}}>
            <Box sx={{border: '3px solid #3B79C9',borderRadius: "15px" , padding: '25px'}}>
                <div>
                <h2>About the card:</h2>
                    <p>Set Name: <Chip label={card.set.name} variant="outlined" /> </p> 
                    <p>Series: <Chip label={card.set.series} variant="outlined" />  </p>
                    <p>Number of cards printed: <Chip label={card.set.printedTotal}variant="outlined" />  </p>
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
            <Button variant="contained" href="#contained-buttons" sx={{background: "#3B79C9", border: "4px solid #FFCD05"}}>
                Add to your collection
            </Button>
            </Grid>
            <Grid item xs={4} md={4}>
            <Button variant="contained" href={card.cardmarket.url} target="_blank" sx={{background: "#DA1630", border: "4px solid #FFCD05"}}>
            Buy one online
            </Button>
            </Grid>
        </Grid>
        {/* row2 */}

        </>
     )
}

export default CardDetails;