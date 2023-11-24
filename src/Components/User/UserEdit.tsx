import {getUser, User} from "../../API/users";
import {Form, Row, Col, FormGroup, Label, Input, Button} from "reactstrap";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import PageLayout from "../PageLayout";



const UserEdit = () => {

    let {userId} = useParams<string>()
    
    const [user, setUser] = useState<User>({
        userID: "",
        fName: "",
        lName: "",
        address: "",
        city: "",
        province: "",
        postalCode: "",
        country: "",
        phoneNumber: "",
        companionPass: false,
        loungePass: false,
        role: 1
    })

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    
    useEffect(()=>{
        if(userId){
            getUser(userId)
                .then((response) => {
                    console.log(response)
                    setUser(response)
                })
                .catch(error =>{
                    console.log(error)
                })
        }
    }, [userId])
    
    
    return(
        <PageLayout>
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
                                    placeholder="with a placeholder"
                                    type="text"
                                    value={user?.fName || ""}
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
                                    placeholder="with a placeholder"
                                    type="email"
                                    value={user?.lName || ""}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="examplePassword">
                                    Password
                                </Label>
                                <Input
                                    id="examplePassword"
                                    name="password"
                                    placeholder="password placeholder"
                                    type="password"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="exampleAddress">
                            Address
                        </Label>
                        <Input
                            id="exampleAddress"
                            name="address"
                            placeholder="1234 Main St"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleAddress2">
                            Address 2
                        </Label>
                        <Input
                            id="exampleAddress2"
                            name="address2"
                            placeholder="Apartment, studio, or floor"
                        />
                    </FormGroup>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleCity">
                                    City
                                </Label>
                                <Input
                                    id="exampleCity"
                                    name="city"
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleState">
                                    State
                                </Label>
                                <Input
                                    id="exampleState"
                                    name="state"
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label for="exampleZip">
                                    Zip
                                </Label>
                                <Input
                                    id="exampleZip"
                                    name="zip"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup check>
                        <Input
                            id="exampleCheck"
                            name="check"
                            type="checkbox"
                        />
                        <Label
                            check
                            for="exampleCheck"
                        >
                            Check me out
                        </Label>
                    </FormGroup>
                    <Button>
                        Sign in
                    </Button>
                </Form>
            </div>

        </PageLayout>

    )
}

export default UserEdit