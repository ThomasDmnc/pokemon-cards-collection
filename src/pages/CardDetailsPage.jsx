import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from '@mui/material';

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
        <h1>hello</h1>
     )
}

export default CardDetails;