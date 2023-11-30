import {createUser, NewUser} from "../../API/users";
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import {useState} from "react";
import PageLayout from "../PageLayout";
import {UserRole} from "../../Auth/authTypes";


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
    })

    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const handleInputChange = (e: any) => {
        e.preventDefault()
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleConfirmPasswordChange = (e: any) => {
        e.preventDefault()
        const { value } = e.target;
        setConfirmPassword(value)
    }

    const handleRegisterForRewards = (e: any) => {
        e.preventDefault()
        const { name, checked } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: checked ? UserRole.RegisteredUser : UserRole.User,
            companionPass: !!checked,
            loungePass: !!checked,
            joinedOnDate: checked ? new Date().toISOString().slice(0, 10) : ""
        }));
    }

    const handleSubmit = (e: any) => {
        if(newUser.password !== confirmPassword){
            alert("Passwords do not match")
            return
        }
        createUser(newUser)
            .then((response) => {
                console.log(response)
                alert("User created successfully")
            }).catch(error => {
            console.log(error)
            alert("Error creating user")
        })
    }




    return<PageLayout>
        <h2 className="mt-3">Sign Up</h2>
        <div className="container mt-5">
            <Form>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="fName">
                                First Name
                            </Label>
                            <Input
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
                            <Label for="lName">
                                Last Name
                            </Label>
                            <Input
                                id="lName"
                                name="lName"
                                type="email"
                                value={newUser?.lName || ""}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="password">
                                Password
                            </Label>
                            <Input
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
                            <Label for="confirmPassword">
                                Confirm Password
                            </Label>
                            <Input
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
                            <Label for="email">
                                E-mail
                            </Label>
                            <Input
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
                            <Label for="phoneNumber">
                                Phone Number
                            </Label>
                            <Input
                                id="phoneNumber
                                name="phoneNumber
                                type="text"
                                value={newUser?.phoneNumber || ""}
                                onChange={handleInputChange}
                            />
                        </FormGroup>

                    </Col>
                </Row>
                <FormGroup>
                    <Label for="address">
                        Address
                    </Label>
                    <Input
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
                            <Label for="city">
                                City
                            </Label>
                            <Input
                                id="city"
                                name="city"
                                value={newUser?.city || ""}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="province">
                                Province
                            </Label>
                            <Input
                                id="province"
                                name="province"
                                value={newUser?.province || ""}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="postal">
                                Postal Code / Zip
                            </Label>
                            <Input
                                id="postal"
                                name="zip"
                                value={newUser?.postal || ""}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="country">
                                Country
                            </Label>
                            <Input
                                id="country"
                                name="country"
                                value={newUser?.country || ""}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup check>
                    <Input
                        id="rewardsEnrollment"
                        name="role"
                        type="checkbox"
                        checked={newUser?.role === UserRole.RegisteredUser}
                        onChange={handleRegisterForRewards}
                    />
                    <Label
                        check
                        for="exampleCheck"
                    >
                        Join Fake Airlines Rewards Program - Gives you access to our exclusive lounges and companion pass.
                    </Label>
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
}


export default SignUp