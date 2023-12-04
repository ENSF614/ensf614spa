import {createUser, getUser, NewUser, updateUser, User} from "../../API/users";
import {
    Form,
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    Button,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import PageLayout from "../Layout/PageLayout";
import {UserRole} from "../../Auth/authTypes";
import {FormCheck, FormControl, FormLabel} from "react-bootstrap";
import {isAdmin} from "../../Auth/claimUtils";
import {useAuth} from "../../Auth/AuthProvider";




const UserEdit = () => {

    let {userId} = useParams<string>()
    let {user} = useAuth()
    
    const [editableUser, setEditableUser] = useState<User>({
        rewardsMember: false,
        password: "",
        email: "",
        joinedOnDate: null,
        userID: "",
        fName: "",
        lName: "",
        address: "",
        city: "",
        province: "",
        postal: "",
        country: "",
        phoneNumber: "",
        companionPass: false,
        loungePass: false,
        role: UserRole.User
    })

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setEditableUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const handleDropdownChange = (role:UserRole) => {

        setEditableUser(prevUser => ({
            ...prevUser,
            role: role // Assuming the field in your form is named 'userRole'
        }));
    };

    const handleRegisterForRewards = (e: any) => {
        e.preventDefault();
        const { name, checked } = e.target;
        setEditableUser(prevUser => ({
            ...prevUser,
            [name]: checked ? UserRole.RegisteredUser : UserRole.User,
            companionPass: !!checked,
            loungePass: !!checked,
        }));
    };

    const handleConfirmPasswordChange = (e: any) => {
        e.preventDefault();
        const { value } = e.target;
        setConfirmPassword(value);
    };

    const handlePasswordChange = (e: any) => {
        e.preventDefault();
        const { value } = e.target;
        setPassword(value);
    };

    const handleSubmit = (e: any) => {
        // console.dir(newUser)
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const newUser: NewUser = {
            ...editableUser,
            password: password
        }
        updateUser(newUser)
            .then(response => {
                console.log(response);
                alert("User created successfully");
            }).catch(error => {
            console.log(error);
            alert("Error creating user");
        });
    };

    
    useEffect(()=>{
        console.log(userId)
        if(userId){
            getUser(userId)
                .then((response) => {
                    console.log(response)
                    setEditableUser(response)
                })
                .catch(error =>{
                    console.log(error)
                })
        }
    },[userId] )


    return (
        <PageLayout>
            <h2 className="mt-3">Update User Profile</h2>
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
                                    value={editableUser.fName || ""}
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
                                    value={editableUser.lName || ""}
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
                                    value={password || ""}
                                    onChange={handlePasswordChange}
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
                                    value={editableUser.email || ""}
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
                                    value={editableUser.phoneNumber || ""}
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
                            value={editableUser.address || ""}
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
                                    value={editableUser.city || ""}
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
                                    value={editableUser.province || ""}
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
                                    value={editableUser.postal || ""}
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
                                    value={editableUser.country || ""}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    {!editableUser.joinedOnDate &&
                        <FormGroup>
                            <FormCheck
                                id="rewardsEnrollment"
                                name="role"
                                label="Join ENSF 614 Rewards Program - Gives you access to our exclusive lounges and companion pass."
                                checked={editableUser.role === UserRole.RegisteredUser}
                                onChange={handleRegisterForRewards}
                            />
                        </FormGroup>
                    }
                    <div>
                        {editableUser.joinedOnDate && <p>
                            Joined ENSF614 Airlines Rewards on {new Date(editableUser.joinedOnDate).toLocaleDateString()}
                        </p>}
                    </div>
                    <div>
                        {editableUser.loungePass && <p>
                            You have one pass to our exclusive lounges.
                        </p>}
                    </div>
                    <div>
                        {editableUser.companionPass && <p>
                            You have a companion pass available.
                        </p>}
                    </div>
                    {isAdmin(user) && editableUser.userID!==userId &&
                        <FormGroup>
                            <FormCheck
                                id="rewardsEnrollment"
                                name="role"
                                label="Join ENSF 614 Rewards Program - Gives you access to our exclusive lounges and companion pass."
                                checked={editableUser.role != UserRole.User}
                                onChange={handleRegisterForRewards}
                            />
                            <FormCheck
                                id="companionPass"
                                name="companionPass"
                                label="Companion Pass"
                                checked={editableUser?.companionPass}
                                onChange={handleInputChange}
                            />
                            <FormCheck
                                id="loungePass"
                                name="loungePass"
                                label="Lounge Pass"
                                checked={editableUser?.loungePass}
                                onChange={handleInputChange}
                            />
                            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                                <DropdownToggle caret>
                                    {editableUser?.role || "Select Role"}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {Object.values(UserRole).map((role) => (
                                        <DropdownItem key={role} onClick={() => handleDropdownChange(role)}>
                                            {role}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>

                            </Dropdown>
                        </FormGroup>
                    }
                    <Button
                        className="offset-11"
                        onClick={handleSubmit}
                    >
                        Update
                    </Button>
                </Form>
            </div>
        </PageLayout>
    );
}

export default UserEdit