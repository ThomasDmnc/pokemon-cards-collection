import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Card, CardMedia, Checkbox, FormGroup, FormControlLabel  } from '@mui/material'
 
function UpdateCollection() {
    const { collectionId } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [cards, setCards] = useState('')
    const [checked, setChecked] = useState(true)
    const navigate = useNavigate();
    const apiUrl =  import.meta.env.VITE_API_URL;

    async function fetchCollection() {
        const response = await fetch(`${apiUrl}/collections/${collectionId}`)
        if (response.ok) {
            const collectionsApi = await response.json()
            setCards(collectionsApi.cards)
            setName(collectionsApi.name);
            setDescription(collectionsApi.description)
        }
    }

    useEffect(() => {
        fetchCollection();
      }, [])


    async function handleSubmit() {
        event.preventDefault();
        const payload = { name, description, cards }
        try {
            const response = await fetch(`${apiUrl}/collections/${collectionId}`,
                {
                    method: 'PUT',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-type': 'application/json',
                    },
                }
            )
            console.log(response)
            if (response.ok) {
                const currentCollection = await response.json()
                navigate(`/collections/${currentCollection.id}`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleChangeCheck(event) {
        setChecked(event.target.checked);
    }

    return (
        <>
            <h1>Update your collection:</h1>
            <form className='form' onSubmit={handleSubmit}>
                <label htmlFor="">Your collection name:</label>
                <TextField
                    sx={{}}
                    required
                    id="outlined-required"
                    label="Required"
                    placeholder="Cool collection name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
                <label htmlFor="">A description:</label>
                <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    placeholder="Woh this is my super nice collection of Pokémon cards."
                    multiline
                    rows={4}
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                />
                <Grid container spacing={5}>
                <FormGroup>
                    {cards && cards.map((cardObj) => {
                        return (
                            <Grid item key={cardObj} xs={6} md={4} spacing={2}>
                                <Card sx={{ maxWidth: 245, objectFit:"contain" }}>
                                    <FormControlLabel control={<Checkbox checked={checked} onChange={handleChangeCheck} />} />
                                    <CardMedia 
                                        component="img"
                                        image={`https://images.pokemontcg.io/${cardObj.replace(/-[^-]*$/, "")}/1_hires.png`}
                                    />
                                </Card>
                            </Grid>
                        )
                    })}
                </FormGroup>
            </Grid>
                <Button type='submit'>Edit your collection&apos;s</Button>
            </form>
        </>
    )
}

export default UpdateCollection;