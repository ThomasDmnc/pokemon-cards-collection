import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';

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
        <Grid container spacing={2}>  
            <Grid item xs={4} md={4} sx={{}}>
               <img src={card.images.large} alt="" style={{width: '250px'}}/>
            </Grid>
            <Grid item xs={8} md={8} sx={{}}>
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
            </Grid>
        </Grid>
        {/* Col2 */}


        {/* row2 */}

        </>
     )
}

export default CardDetails;