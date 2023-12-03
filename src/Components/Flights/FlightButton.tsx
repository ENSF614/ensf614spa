import { Button } from "react-bootstrap";
import { Flight } from "../../API/flights";
import { useState } from "react";

interface Props {
    flight: Flight
    onClick: (flight: Flight) => void
    children?: any
}

const FlightButton = ({flight, onClick, children}: Props) => {

    const [flightState, setFlight] = useState<Flight>(flight)

    const handleClick = () => {
        onClick(flightState)
    }

    return(
        <>
            <Button onClick={handleClick}>
                {children}
            </Button>
        </>
    );
}

export default FlightButton;