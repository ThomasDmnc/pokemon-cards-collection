import { Link } from 'react-router-dom'
import './Navbar.css'
import Button from '@mui/material/Button'
import logo from '../assets/pokellection.png'

function Navbar() {
    return (  
        <>
        <div className='navbar'>
            <Link to='/'>
                    <img src={logo} alt="" />
            </Link>
            <div>
                <Button variant="contained" component={Link} to={`/collections/new`} sx={{background: "#3B79C9", border: "4px solid #FFCD05", textTransform: 'capitalize'}}>
                    Create your collection
                </Button>
                <Button component={Link} to={`/collections`} sx={{marginLeft: 2, textTransform: 'capitalize'}}>
                    The collections
                </Button>
            </div>
        </div>
        </>
    );
}

export default Navbar;