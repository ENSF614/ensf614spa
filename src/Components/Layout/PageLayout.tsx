import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useAuth} from "../../Auth/AuthProvider";
import {Link, useLocation} from "react-router-dom";
import {isAdmin, isStaffOrBetter} from "../../Auth/claimUtils";

interface Props{
    children?: any;
}

const PageLayout = ({
    children}:Props) => {
    const {user, logout} = useAuth();
    const location = useLocation()

    return(
        <div  className="">
            <Navbar className="px-3" bg="dark" variant="dark">
                <Navbar.Brand href="/">ENSF614 Airlines</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href='/AllFlights'>Flights</Nav.Link>
                        {isAdmin(user) &&
                            <NavDropdown title="Admin" id="navdropdown">
                                <NavDropdown.Item href={"/Users"}>Users</NavDropdown.Item>
                            </NavDropdown>
                        }
                        {isStaffOrBetter(user) &&
                            <NavDropdown title="Flight Control" id="navdropdown">
                                <NavDropdown.Item href="/FlightInformation">Flight Information</NavDropdown.Item>
                                <NavDropdown.Item href="/Aircraft">Aircraft Information</NavDropdown.Item>
                            </NavDropdown>
                        }
                    </Nav>
                    <Nav>
                        <NavDropdown className="align-items-end me-5" title={user ? `${user.fName} ${user.lName}` : "Sign In"} id="nav-dropdown-user">
                            {user && (
                                <>
                                    <NavDropdown.Item href={`/User/${user.userID}`}>Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logout} >Log Out</NavDropdown.Item>
                                    <NavDropdown.Item href="/MyFlights">My Flights</NavDropdown.Item>
                                </>
                            )}
                            {!user && (
                                <>
                                    <NavDropdown.Item as={Link} to="/login" state={{ from: location }}>Login</NavDropdown.Item>
                                    <NavDropdown.Item href="/signup">Sign Up</NavDropdown.Item>
                                </>
                            )}
                            {/* Add other user-related links here */}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="container">
                {children}
            </div>
        </div>


    )
}

export default PageLayout;