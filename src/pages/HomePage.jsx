import { Card, CardActionArea, CardMedia, CircularProgress } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

function HomePage() {

    const [cards, setCards] = useState()

    const getCards = async () => {
        const response = await fetch('https://api.pokemontcg.io/v2/cards')

        if (response.ok) {
            const cardsAPI = await response.json()
            setCards(cardsAPI.data)
        }
    }

    useEffect(() => {
        getCards()
    }, [])

    return cards ? (
        <Grid2 container spacing={3}>
            {cards.map((card) => (
                <Grid2 key={card.id} item="true" xs={12} sm={6} md={4}>
                    <Card sx={{ maxWidth: 245 }}>
                        <CardActionArea component={Link} to={`/cards/${card.id}`}>
                            <CardMedia
                                component="img"
                                height="350"
                                image={card.images.large}
                                alt="green iguana"
                            />
                        </CardActionArea>
                    </Card>
                </Grid2>
            ))}
        </Grid2>
    ) :
        (<CircularProgress />);
}

export default HomePage;