import {Grid, Card, CardMedia} from '@mui/material'
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

function CardGrid(props) {
    const [cards, setCards] = useState();

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
            background: 'linear-gradient(180deg, #F6BC9B 0%, #FAD9C7 37.5%, #FFD4BC 66.15%, #FFF 100%)',
            fontWeigth: '700',
            fontSize: '24px',
        }
    };

    useEffect(() => {
        setCards(props.props)
    })

    return (
        <>
        <Grid container spacing={5}>
        {cards && cards.map((card) => {
            return (
                <Grid item key={card.id} xs={6} md={4} mt={2} mb={2} sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
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