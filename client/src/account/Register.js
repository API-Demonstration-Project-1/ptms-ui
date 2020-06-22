import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Errors from '../common/Errors';
import './account.scss';

export default function Register(props) {
    const [tenantEmail, setEmail] = useState('');
    const [tenantName, setName] = useState('');
    const [tenantUsername, setUserName] = useState('');
    const [tenantPassword, setPassword] = useState('');
    const [apiState, setApiState] = useState({
        success: false,
        error: false,
        errors: []
    })

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    }


    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmitClick = () => {
        setApiState({
            success: false,
            error: false,
            errors: null
        })

        // Submit the email and password to the server
        const url = 'ptms/registration';

        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            method: 'POST',
            body: JSON.stringify({
                tenantEmail,
                tenantPassword,
                tenantName,
                tenantUsername
            })
        }).then((response) => {
            if (!response.ok) {
                return response.json().then(err => { throw err })
            }
            return response.json();
        }).then((results) => {
            console.log('results ', results);
            setApiState({
                success: true,
                error: false,
                errors: null
            })
        }).catch((error) => {
            console.log('error ', error);
            setApiState({
                success: false,
                error: true,
                errors: error.errors
            })
        })
    }

    const {
        success,
        errors
    } = apiState;

    return (
        <div className="container">
            <div className="form-container">
                <h2>Register</h2>
                <div>
                    <Form>
                      {
                        success &&
                        <Alert variant="success">
                            <div>Successfully registered your account.</div>
                            <div>You need to confirm your email address before logging in.</div>
                        </Alert>

                      }
                      {
                        errors && <Errors errors={errors} />
                      }
                      <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={handleEmailChange}
                            value={tenantEmail}
                        />
                        <Form.Text className="text-muted">
                          This is your email address.
                        </Form.Text>
                      </Form.Group>

                      <Form.Group controlId="formName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                          type="text"
                          placeholder="Enter name"
                          onChange={handleNameChange}
                          value={tenantName}
                      />
                      <Form.Text className="text-muted">
                        This is your organization name.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formUserName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        onChange={handleUserNameChange}
                        value={tenantUsername}
                    />
                    <Form.Text className="text-muted">
                      This is your username for login.
                    </Form.Text>
                  </Form.Group>


                      <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={handlePasswordChange}
                            value={tenantPassword}
                        />
                      </Form.Group>
                      <Button
                        variant="primary"
                        type="button"
                        onClick={handleSubmitClick}
                      >
                        Submit
                      </Button>
                    </Form>
                </div>
                <div className="actions-container">
                    <div>Already have an account?</div>
                    <div><Link to="/login">Login</Link></div>
                </div>
            </div>
        </div>
    )
}
