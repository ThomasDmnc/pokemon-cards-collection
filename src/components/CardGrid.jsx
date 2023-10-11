import {Grid, Card, CardMedia} from '@mui/material'
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

function CardGrid(props) {
    const [cards, setCards]= useState();

    const styles = {
        cardBackground: {
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            maxWidth: 245, 
            objectFit: "contain", 
            padding: '20px', 
            border: '4px solid #FFCD05', 
            borderRadius: '15px', 
            background: 'linear-gradient(180deg, #3B79C9 0%, rgba(116, 155, 207, 0.64) 35.94%, rgba(116, 155, 207, 0.64) 64.06%, #FBFBFB 100%)',
            fontWeigth: '700',
            fontSize: '24px',
        }
    };

    useEffect(() => {
        setCards(props.props)
    }, [cards])

    return (
        <>
        <Grid container spacing={5}>
        {cards && cards.map((card) => {
            return (
                <Grid item key={card.id} xs={6} md={4} spacing={2} mt={2} mb={2} sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Card style={styles.cardBackground} component={Link} to={`/cards/${card.id}`}>
                        <h4 style={{marginTop: '0', marginBottom: '1em'}}>{card.name}</h4>
                        <CardMedia 
                            component="img"
                            image={card.images.large}
                        />
                    </Card>
                </Grid>
            )
        })}
    </Grid>
    </>
 
    );
}

export default CardGrid;