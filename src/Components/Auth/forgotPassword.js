import React, {useState, useRef} from "react";
import {Form, Button, Card, Container, Alert} from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {

    const emailRef = useRef();
    const {resetPassword} = useAuth();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

 
    try {
        setMessage("");
        setError("");
        setLoading(true);
        await resetPassword(emailRef.current.value);
        setMessage('Check your inbox for further instructions.')
    }
    catch{
        setError("Failed to reset password.")
    }
    setLoading(false);
    }

return <div>
                <Container
        className="d-flex align-items-center justify-content-center"
        style={{minHeight:"100vh"}}
        >
      <div className="w-100" style={{maxWidth:"400px"}}>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-5">
                    Password Reset
                </h2>
           
           {error && <Alert variant="danger">{error}</Alert>}
           {message && <Alert variant="success">{message}</Alert>}

                 <Form onSubmit={handleSubmit}>
                     <Form.Group id="email">
                         <Form.Label>
                             Email
                         </Form.Label> 
                         <Form.Control type="email"
                         ref={emailRef} required/>
                     </Form.Group>

                <Button
                disabled={loading}
                className="btn btn-success w-100"
                type="submit"
                >Reset Password</Button>
                <div className="w-100 text-center mt-3">
                <Link to="/LogIn">Log In</Link>
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

    </div>
}