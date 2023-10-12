import { useEffect, useState } from 'react';
import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function DataCollection(props) {
    const [cards, setCards] = useState(props.props);
    const [averageSellPrice, setAverageSellPrice] = useState(0)
    const [avg7, setAvg7] = useState(0)
    const [avg30, setAvg30] = useState(0)
    const [rarity, setRarity] = useState({})

    async function computeCollectionStats(){
        console.log("ca commence")
        console.log(cards)
        const counts = {}

        cards && cards.map((card) => {
            console.log("ca commence2")
            let cardValue = card.cardmarket.prices.averageSellPrice
            let cardValue7d = card.cardmarket.prices.avg7
            let cardValue30d = card.cardmarket.prices.avg30

            counts[card.rarity] = counts[card.rarity] ? counts[card.rarity] + 1 : 1;

            setAverageSellPrice(averageSellPrice + cardValue)
            setAvg7(avg7 + cardValue7d)
            setAvg30(avg30 + cardValue30d)
        })
        
        const rarityWithoutUndefined = Object.keys(counts).filter((key) => !key.includes("undefined")).reduce((obj, key) => {return Object.assign(obj, {[key]: counts[key]});}, {});
        setRarity(rarityWithoutUndefined)

    }
    
    useEffect(() => {
        computeCollectionStats();
    }, [])

    
    return (
      <>
        <h3>Overview collections&apos; data:</h3>
        <div style={{marginBottom: "15px"}}>Number of cards: <Chip label={cards.length} variant="outlined" /> </div>
        <h4>Estimated collection value:</h4>
        <div style={{marginBottom: "15px"}}>Trending Selling Price: <Chip label={`${averageSellPrice.toFixed(2)}€`} variant="outlined" /> </div>
        <div style={{marginBottom: "15px"}}>Average Selling Price 7days: <Chip label={`${avg7.toFixed(2)}€`} variant="outlined" /> </div>
        <div style={{marginBottom: "15px"}}>Average Selling Price 30days: <Chip label={`${avg30.toFixed(2)}€`} variant="outlined" /> </div>
        <h4>Cards&apos; Rarity:</h4>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Cards Rarity Levels</TableCell>
                <TableCell align="right">Number of Cards</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {Object.keys(rarity).map((key, index) => (
            <>
                <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {key}
                </TableCell>
                <TableCell align="right">{rarity[key]}</TableCell>
                </TableRow>
            </>
            ))}
            </TableBody>
          </Table>
        </TableContainer>

        </>
    );
}

export default DataCollection;