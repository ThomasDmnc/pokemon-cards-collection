import { Box, CircularProgress, Pagination, TextField } from "@mui/material"
import { useEffect, useState, useCallback, useMemo } from "react"
import debounce from "lodash/debounce"
import CardGrid from "../components/CardGrid";

function HomePage() {
    const [cardsPerPage, setCardsPerPage] = useState(9);
    const [cards, setCards] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCards, setTotalCards] = useState(0);
    const [search, setSearch] = useState('');

    const handlePageChange = (event, newPage) => {
        getCards(newPage, search)
        setCurrentPage(newPage);
    };

    const sendQuery = useCallback((searchValue) => {
        console.log(searchValue)
        setCurrentPage(1);
        getCards( currentPage, searchValue)
      }, []);

    const debouncedSendQuery = useMemo(() => {
        return debounce(sendQuery, 500);
      }, [sendQuery]);

    const getCards = async (loadPage, searchValue) => {
        const response = await fetch(`https://api.pokemontcg.io/v2/cards?&q=name:${searchValue}*&page=${loadPage}&pageSize=${cardsPerPage}`)
        if (response.ok) {
            const cardsAPI = await response.json()
            setTotalCards(cardsAPI.totalCount)
            setCards(cardsAPI.data)
        }
    }

    const handleSearchChange = event => {
        const value = event.target.value;
        setSearch(value);
        debouncedSendQuery(value);
    }

    useEffect(() => {
        getCards(currentPage, '');
    }, [])

    return cards ? (
        <div>
            <h1>Start your Pokéllection</h1>
            <h4>Looking for a specific Pokémon:</h4>
            <div className="searchBar" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <TextField
                        spellCheck='false'
                        autoComplete='off'
                        onChange={handleSearchChange} 
                        value={search} 
                        type="text" 
                        id="filled-basic" 
                        label="Name of the Pokémon you're looking for" 
                        variant="filled" 
                        sx={{width: '100%', m: 2}}/>
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
        (<Box sx={{display: 'flex', flexDirection:'column', width:'100%', height:'70vh', alignItems: 'center', justifyContent:'center'}}><CircularProgress /></Box>);
}

export default HomePage;