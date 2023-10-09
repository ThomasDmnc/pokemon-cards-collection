import { Link } from 'react-router-dom'
import './Navbar.css'
import Button from '@mui/material/Button'

function Navbar() {
    return (  
        <>
        <div className='navbar'>
            <Link to='/'>
                    <img src="/src/assets/pokellection.png" alt="" />
            </Link>
            <div>
                <Button variant="contained" href="#contained-buttons" sx={{background: "#3B79C9", border: "4px solid #FFCD05"}}>
                    Create your collection
                </Button>
                <Button>
                    The collections
                </Button>
            </div>
        </div>
        </>
    );
}

export default Navbar;