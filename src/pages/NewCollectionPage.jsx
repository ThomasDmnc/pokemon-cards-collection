import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import './NewCollectionPage.css'
import { useState } from 'react';

function NewCollection() {
    const [name, setName] = useState();
    const [description, setDescription] = useState();

    async function handleSubmit(){
        event.preventDefault()
        console.log(name, description)
        const payload = { name, description }
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
