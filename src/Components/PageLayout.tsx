import {Nav, Navbar, NavDropdown} from "react-bootstrap";

interface Props{
    children?: any;
}

const PageLayout = ({
    children}:Props) => {
    return(
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">ENSF614 Airlines</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href='/Flights'>Flights</Nav.Link>
                        <Nav.Link href='/SeatMap'>SeatMap</Nav.Link>
                        <NavDropdown title="Someshit" id="navdropdown">
                            <NavDropdown.Item href="#">Book a Flight</NavDropdown.Item>
                            <NavDropdown.Item href="#">Check Flight Status</NavDropdown.Item>
                            <NavDropdown.Item href="#">Cancel Flight</NavDropdown.Item>
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