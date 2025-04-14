import { Link } from "react-router-dom";
import '../styles/navbar.css'
function Navbar(){
    return(
        <>
            <div className="navbar">
                <div className="title"><h1>ML Model for miRNA Target Gene Prediction</h1></div>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/search'>Search</Link></li>
                    <li><Link to='/tool'>Predict</Link></li>
                </ul>
            </div>
        </>
    )
}
export default Navbar;