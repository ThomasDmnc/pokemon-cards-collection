import { Card, CardActionArea, CardMedia, CircularProgress, Pagination } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

function HomePage() {
    const [cardsPerPage, setCardsPerPage] = useState(9);
    const [cards, setCards] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCards, setTotalCards] = useState(0);

    const handlePageChange = (event, newPage) => {
        getCards(newPage)
        setCurrentPage(newPage);
    };


    const getCards = async (loadPage) => {
        const response = await fetch(`https://api.pokemontcg.io/v2/cards?page=${loadPage}&pageSize=${cardsPerPage}`)
        if (response.ok) {
            const cardsAPI = await response.json()
            setTotalCards(cardsAPI.totalCount)
            setCards(cardsAPI.data)
        }
    }

    useEffect(() => {
        getCards(currentPage)
    }, [])

    return cards ? (
        <div>
            <Grid2 container spacing={5}>
                {cards.map((card) => (
                    <Grid2 key={card.id} item="true" xs={12} sm={6} md={4}>
                        <Card sx={{ maxWidth: 245 }}>
                            <CardActionArea component={Link} to={`/cards/${card.id}`}>
                                <CardMedia
                                    component="img"
                                    height="337"
                                    image={card.images.large}
                                    alt="green iguana"
                                />
                            </CardActionArea>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
            <Pagination
                variant="outlined"
                shape="rounded"
                count={Math.ceil(totalCards / cardsPerPage)}
                page={currentPage}
                onChange={handlePageChange}/>
        </div>
    ) :
        (<CircularProgress />);
}

export default HomePage;