import { Button } from "react-bootstrap"
import { isPropertySignature } from "typescript";
import { Seat } from "../../API/seats";

interface Props{
    seat?: Seat
    onClick: () => void
    onSeatClick: (seat: Seat) => void
}

const SeatButton = (props: Props) => {

    let buttonType = "primary"
    if(props.seat?.businessClass) buttonType = "info"
    if(props.seat?.booked) buttonType="secondary disabled";

    const handleClick = () => {
        props.onSeatClick(props.seat as Seat)
        props.onClick()
    }

    return(
        <>
        <Button variant={buttonType} onClick={handleClick} >
            {`${props.seat?.seatRow}${props.seat?.seatCol}`}
        </Button>
        </>
    );
};

export default SeatButton;