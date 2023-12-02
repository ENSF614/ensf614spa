import React, { useState } from 'react';
import { Form } from "react-bootstrap";
import { useAuth } from "../../Auth/AuthProvider";
import PageLayout from "../PageLayout";
import { useLocation, useNavigate } from 'react-router-dom';

const LogIn = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Get the from location
    const {from} = location.state || {from: {pathname: "/"}};

    // State for form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle input changes
    const handleEmailChange = (e:any) =>{
        e.preventDefault()
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e:any) => {
        e.preventDefault()
        setPassword(e.target.value);
    }

    // Handle form submission
    const handleSubmit = async (e:any) => {
        // e.preventDefault(); // Prevents default form submission behavior
        try {
            await login({ email, password });

            navigate(from)
        } catch (error:any) {
            alert(error.message);
        }
    };

    //handle new user signup
    const handleSignUp = () => {
        navigate("/signup")
    }

    return (
        <PageLayout>
            <h2 className="mt-2">Sign In</h2>
            <Form className="mt-3" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </Form.Group>
                <button type="submit">Log In</button>
                <button type="button" onClick={handleSignUp}>Sign Up</button>
            </Form>

        </PageLayout>

    );
}

export default LogIn;
