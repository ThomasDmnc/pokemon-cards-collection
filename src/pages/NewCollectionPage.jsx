import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import './NewCollectionPage.css'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

function NewCollection() {
    const [name, setName] = useState();
    const [description, setDescription] = useState(); 
    // console.log(apiString)
    const apiUrl = import.meta.env.VITE_API_URL;


    async function handleSubmit() {
        event.preventDefault()
        const payload = { name, description }
        
        try {
            const response = await fetch(`${apiUrl}/collections`,
                {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                    'Content-type': 'application/json',
                    },
                }
            )
            if (response.ok){
                const currentCollection = await response.json()
                console.log(currentCollection)
                Navigate(`/`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
    <>
        <form className='form' onSubmit={handleSubmit}>
            <label htmlFor="">Your collection name:</label>
            <TextField
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
            <Button type='submit'>Create</Button>
        </form>
    </>
    );
}

export default NewCollection;
