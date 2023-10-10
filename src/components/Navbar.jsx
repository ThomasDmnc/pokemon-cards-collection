import { Link } from 'react-router-dom'
import './Navbar.css'
import Button from '@mui/material/Button'

function Navbar() {
    return (  
        <>
        <div className='navbar'>
            <Link to='/'>
                    <img src="./src/assets/pokellection.png" alt="" />
            </Link>
            <div>
                <Button variant="contained" component={Link} to={`/collections/new`} sx={{background: "#3B79C9", border: "4px solid #FFCD05", textTransform: 'capitalize'}}>
                    Create your collection
                </Button>
                <Button component={Link} to={`/collections`} sx={{ textTransform: 'capitalize'}}>
                    The collections
                </Button>
            </div>
        </div>
        </>
    );
}

export default Navbar;