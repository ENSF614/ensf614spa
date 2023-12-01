import { createUser, NewUser } from "../../API/users";
import { useState } from "react";
import PageLayout from "../PageLayout";
import { UserRole } from "../../Auth/authTypes";
import { Button, Col, Form, FormControl, FormGroup, FormCheck, FormLabel, Row } from 'react-bootstrap';

const SignUp = () => {
    const [newUser, setNewUser] = useState<NewUser>({
        email: "",
        joinedOnDate: "",
        userID: "",
        fName: "",
        lName: "",
        address: "",
        city: "",
        province: "",
        postal: "",
        password: "",
        country: "",
        phoneNumber: "",
        companionPass: false,
        loungePass: false,
        role: UserRole.User
    });

    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleInputChange = (e: any) => {
        e.preventDefault();
        const { name, value } = e.target;
        setNewUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleConfirmPasswordChange = (e: any) => {
        e.preventDefault();
        const { value } = e.target;
        setConfirmPassword(value);
    };

    const handleRegisterForRewards = (e: any) => {
        e.preventDefault();
        const { name, checked } = e.target;
        setNewUser(prevUser => ({
            ...prevUser,
            [name]: checked ? UserRole.RegisteredUser : UserRole.User,
            companionPass: !!checked,
            loungePass: !!checked,
            joinedOnDate: checked ? new Date().toISOString().slice(0, 10) : ""
        }));
    };

    const handleSubmit = (e: any) => {
        // console.dir(newUser)
        e.preventDefault();
        if (newUser.password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        createUser(newUser)
            .then(response => {
                console.log(response);
                alert("User created successfully");
            }).catch(error => {
            console.log(error);
            alert("Error creating user");
        });
    };

    return (
        <PageLayout>
            <h2 className="mt-3">Sign Up</h2>
            <div className="container mt-5">
                <Form>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <FormLabel htmlFor="fName">First Name</FormLabel>
                                <FormControl
                                    id="fName"
                                    name="fName"
                                    type="text"
                                    value={newUser?.fName || ""}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <FormLabel htmlFor="lName">Last Name</FormLabel>
                                <FormControl
                                    id="lName"
                                    name="lName"
                                    type="text"
                                    value={newUser?.lName || ""}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <FormControl
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={newUser?.password || ""}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                                <FormControl
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={confirmPassword || ""}
                                    onChange={handleConfirmPasswordChange}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <FormLabel htmlFor="email">E-mail</FormLabel>
                                <FormControl
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={newUser?.email || ""}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                                <FormControl
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    value={newUser?.phoneNumber || ""}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <FormLabel htmlFor="address">Address</FormLabel>
                        <FormControl
                            id="address"
                            name="address"
                            placeholder="1234 Main St"
                            value={newUser?.address || ""}
                            onChange={handleInputChange}
                        />
                    </FormGroup>
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <FormLabel htmlFor="city">City</FormLabel>
                                <FormControl
                                    id="city"
                                    name="city"
                                    value={newUser?.city || ""}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <FormLabel htmlFor="province">Province</FormLabel>
                                <FormControl
                                    id="province"
                                    name="province"
                                    value={newUser?.province || ""}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <FormLabel htmlFor="postal">Postal Code / Zip</FormLabel>
                                <FormControl
                                    id="postal"
                                    name="postal"
                                    value={newUser?.postal || ""}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <FormLabel htmlFor="country">Country</FormLabel>
                                <FormControl
                                    id="country"
                                    name="country"
                                    value={newUser?.country || ""}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <FormCheck
                            id="rewardsEnrollment"
                            name="role"
                            label="Join Fake Airlines Rewards Program - Gives you access to our exclusive lounges and companion pass."
                            checked={newUser?.role === UserRole.RegisteredUser}
                            onChange={handleRegisterForRewards}
                        />
                    </FormGroup>
                    <Button
                        className="offset-11"
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </Button>
                </Form>
            </div>
        </PageLayout>
    );
}

export default SignUp;
