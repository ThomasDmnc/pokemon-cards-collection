import { Box, Card, CardActionArea, CardMedia, CircularProgress, Pagination, TextField } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import CardGrid from "../components/CardGrid";

function HomePage() {
    const [cardsPerPage, setCardsPerPage] = useState(9);
    const [cards, setCards] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCards, setTotalCards] = useState(0);
    const [search, setSearch] = useState('');

    const handlePageChange = (event, newPage) => {
        getCards(newPage)
        setCurrentPage(newPage);
    };


    const getCards = async (loadPage) => {
        const response = await fetch(`https://api.pokemontcg.io/v2/cards?${search}page=${loadPage}&pageSize=${cardsPerPage}`)
        if (response.ok) {
            const cardsAPI = await response.json()
            setTotalCards(cardsAPI.totalCount)
            setCards(cardsAPI.data)
        }
    }

    const handleSearchChange = event => {
        setSearch("&q=name:"+event.target.value+"*&");
        getCards(currentPage);
    }

    useEffect(() => {
        getCards(currentPage);
    }, [])

    return cards ? (
        <div>
            <h1>Start your Pokéllection</h1>
            <h4>Looking for a specific Pokémon:</h4>
            <div className="searchBar" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <TextField onChange={handleSearchChange} name="search" type="text" id="filled-basic" label="Name of the Pokémon you're looking for" variant="filled" sx={{width: '100%', m: 2}}/>
            </div>
            <CardGrid props={cards} />
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
            <Pagination
                variant="outlined"
                shape="rounded"
                count={Math.ceil(totalCards / cardsPerPage)}
                page={currentPage}
                onChange={handlePageChange}/>
            </Box>
        </div>
    ) :
        (<CircularProgress />);
}

export default HomePage;