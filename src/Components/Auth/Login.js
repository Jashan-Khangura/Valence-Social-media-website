import React, {useRef, useState} from 'react';
import {Form, Button, Card, Container, Alert} from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

  function Login(){
    const emailRef = useRef();
    const passwordRef = useRef();
    const {currentUser, login} = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

 
    try {
        setError("");
        setLoading(true);
        await login(emailRef.current.value, passwordRef.current.value)
        localStorage.setItem('user', currentUser.email)
        history.push("/POST");
    }
    catch{
        setError("Failed to Sign In.")
    }
    setLoading(false);
    }
    
    return(
        <>
        <Container
        className="d-flex align-items-center justify-content-center"
        style={{minHeight:"100vh"}}
        >
      <div className="w-100" style={{maxWidth:"400px"}}>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-5">
                    Log In
                </h2>
           
           {error && <Alert variant="danger">{error}</Alert>}

                 <Form onSubmit={handleSubmit}>
                     <Form.Group id="email">
                         <Form.Label>
                             Email
                         </Form.Label> 
                         <Form.Control type="email"
                         ref={emailRef} required/>
                     </Form.Group>

                     <Form.Group id="password">
                         <Form.Label>
                             Password
                         </Form.Label> 
                         <Form.Control type="password"
                         ref={passwordRef} required/>
                     </Form.Group>

                    
                <Button
                disabled={loading}
                className="btn btn-success w-100"
                type="submit"
                >Log In</Button>
                <div className="w-100 text-center mt-3">
                <Link to="/ForgotPassword">Forgot Password?</Link>
                 </div>
                 </Form>
            </Card.Body>
        </Card>
        
    <div style={{marginLeft:"70px"}} className="w-100 text-center mt-2">
    <div style={{display:"flex", flexDirection:"row"}}>
        Don't have an account? <Link style={{fontSize:"medium"}} to="/SignUp">Sign Up</Link>
    </div>
    </div>
    </div>
    </Container> 
        </>
    )
}

export default connect(null, null)(Login);