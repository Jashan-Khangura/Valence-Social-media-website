import React from 'react';
import {Nav, Navbar, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    return(
<div>

<div className="linkstyle">
    <Navbar style={{borderBottom:"1px solid whitesmoke"}}  
    bg="white" fixed="top"  expand="md">
    
    <Nav className="mr-auto">
    <h1 style={{color:"#0e387a"}}>Valence</h1>
            </Nav>
 
            <Nav id="navButton" className="ml-auto">
            <Link style={{textDecoration:"none"}} to={'/LogIn'}>
            <Button
             className="btn btn-primary"
            >
                    Sign in
                    </Button>
            </Link>
            </Nav>
           
</Navbar>
</div>

<div>
<div className="image-container">
<img 
alt="homepage" 
 src={process.env.PUBLIC_URL + '/homePage.png'} 
 />
</div>

<div className="text-container">
   <h1>                                                                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       What are you waiting for? <br/>
                                                                                                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    Join now!</h1>
   <br/><br/>
     
     <Link style={{textDecoration:"none"}} to="/SignUp">                                                                                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <Button className="btn btn-success btn-lg buttonTag">Create an account</Button>
    </Link>
   </div>
   </div>
   </div>
   );
}

export default HomePage;