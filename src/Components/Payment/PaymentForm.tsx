import { useState } from "react";
import { useLocation } from "react-router-dom";
import { checkCard } from "../../API/creditCard"
import InvalidCardModal from "../Modals/invalidCardModal";
import PaymentConfirmedModal from "../Modals/paymentConfirmedModal";
import { useNavigate } from "react-router-dom";
import { Seat } from "../../API/seats";
import { Booking, putBookings } from "../../API/booking";
import InvalidBookingModal from "../Modals/invalidBookingModal";
import { useAuth } from "../../Auth/AuthProvider";
import { User, updateUser } from "../../API/users";
import UnableToSendEmailModal from "../Modals/UnableToSendEmailModal";
import PageLayout from "../Layout/PageLayout";

interface BillingDetailsProps {
    insuranceState: any
    companionUsed: boolean
    setInsurance: (bool: boolean) => void
    setCardNumber: (num: string) => void
    setCardExpiry: (num: string) => void
    setCardCVV: (num: string) => void
    passBooking: () => void
    setCardType: (card: string) => void
    setCompanionUsed: (bool: boolean) => void
    processPayment: () => void
}

const PaymentSection = (props: BillingDetailsProps) => {
    
    return(
        <>
        <h5 className="mb-4">Payment</h5>

        <div className="form-check">
            <input className="form-check-input" type="radio" 
                   name="paymentRadio" id="credit" 
                   onClick={e => props.setCardType("credit")} defaultChecked />
            <label className="form-check-label" htmlFor="credit">
                Credit card
            </label>
        </div>
        <div className="form-check mb-4">
            <input className="form-check-input" type="radio" 
                   name="paymentRadio" id="debit"
                   onClick={e => props.setCardType("debit")} />
            <label className="form-check-label" htmlFor="debit">
                Debit card
            </label>
        </div>

        <div className="row">
            <div className="col mb-4">
                <div className="form-floating mb-1">
                    <input className="form-control" id="form4" type="text" placeholder="John Doe" />
                    <label htmlFor="form4">Name on card</label>
                </div>
            </div>
            <div className="col mb-4">
                <div className="form-floating mb-1">
                    <input className="form-control" id="form5" 
                            type="text" placeholder="4444 4444 4444 4444"
                            onChange={e => props.setCardNumber(e.target.value)}
                    />
                    <label htmlFor="form5">Card Number</label>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-5">
                <div className="form-floating mb-1">
                    <input className="form-control" id="form6" 
                           type="text" placeholder="1224" 
                           onChange={e => props.setCardExpiry(e.target.value)}       
                    />
                    <label htmlFor="form6">Expiration date (e.x. 01/24)</label>
                </div>
            </div>
            <div className="col-md-3 mb-4">
                <div className="form-floating mb-1">
                    <input className="form-control" id="form7" 
                           type="text" placeholder="123" 
                           onChange={e => props.setCardCVV(e.target.value)}
                    />
                    <label htmlFor="form7">CVV</label>
                </div>
            </div>
        </div>
        </>
    );
}

const InfoSection = () => {
    return(
        <>
        <div className="row mb-4">
            <div className="col">
                <div className="form-floating mb-1">
                    <input className="form-control" id="form1" type="text" placeholder="John" />
                    <label htmlFor="form1">First Name</label>
                </div>
            </div>
            <div className="col">
                <div className="form-floating mb-1">
                    <input className="form-control" id="form2" type="text" placeholder="Doe" />
                    <label htmlFor="form2">Last name</label>
                </div>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col-md-4">
                <div className="form-floating mb-1">
                    <input className="form-control" id="addressForm" type="text" placeholder="5444 Street" />
                    <label htmlFor="addressForm">Address</label>
                </div>
            </div>
            <div className="col-md-4">
                <div className="form-floating mb-1">
                    <input className="form-control" id="cityForm" type="text" placeholder="City" />
                    <label htmlFor="cityForm">Street</label>
                </div>
            </div>
            <div className="col-md-3">
                <div className="form-floating mb-1">
                    <input className="form-control" id="provinceForm" type="text" placeholder="Province" />
                    <label htmlFor="provinceForm">Province</label>
                </div>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col-md-3">
                <div className="form-floating mb-1">
                    <input className="form-control" id="postalForm" type="text" placeholder="A1B2C3" />
                    <label htmlFor="postalForm">Postal Code</label>
                </div>
            </div>
            <div className="col-md-3">
                <div className="form-floating mb-1">
                    <input className="form-control" id="countryForm" type="text" placeholder="Country" />
                    <label htmlFor="countryForm">Street</label>
                </div>
            </div>
        </div>
        </>
    );
}

interface InsuranceSectionProps {
    insuranceState: boolean
    companionUsed: boolean
    setInsurance: (bool: boolean) => void
    setCompanionUsed: (bool: boolean) => void
}

const InsuranceSection = ({insuranceState, companionUsed, setInsurance, setCompanionUsed}: InsuranceSectionProps) => {

    const { user } = useAuth();
    console.log("in insurance section")
    console.log(companionUsed)

    return(
      <>
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="insurance" onChange={() => setInsurance(!insuranceState)} />
            <label className="form-check-label" htmlFor="insurance">
                Cancelation insurance
            </label>
        </div>
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="addressCheck" />
            <label className="form-check-label" htmlFor="addressCheck">
                Shipping address is the same as my billing address
            </label>
        </div>
        { user?.companionPass && (
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="companionPass" 
                       onChange={() => setCompanionUsed(!companionUsed)} />
                <label className="form-check-label" htmlFor="companionPass">
                    Use companion pass
                </label>
            </div>
        )}
      </>  
    );
}

const BillingDetailsCard = (props: BillingDetailsProps) => {

    return (
        <div className="card shadow">
            <div className="card-header py-3">
                <h5 className="mb-0">Billing details</h5>
            </div>   
            <div className="card-body">
                <InfoSection />
                <hr className="my-4"/>
                <InsuranceSection 
                    insuranceState={props.insuranceState}
                    setInsurance={props.setInsurance}
                    companionUsed={props.companionUsed}
                    setCompanionUsed={props.setCompanionUsed}
                />
                <hr className="my-4" />
                <PaymentSection {...props}/>
                <div className="d-grid gap-2 col-6 mx-auto">
                <button type="button" className="btn btn-primary btn-lg shadow mb-3" onClick={props.processPayment}>
                    CHECKOUT
                </button>
                </div>
            </div>     
        </div>
    );
}

interface BillingSummaryProps {
    price: number
    cancelInsurance: boolean
    companionUsed: boolean
    companionPrice: number
}

const BillingSummaryCard = ({price, 
                            cancelInsurance, 
                            companionUsed,
                            companionPrice}: BillingSummaryProps) => {

    let insurancePrice = 0;
    let companionRefund = 0;
    if (cancelInsurance)
        insurancePrice = 100;
    if (companionUsed)
        companionRefund = companionPrice;

    return(
        <div className="card shadow">
            <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
            </div>
            <div className="card-body">
                <div className="row px-3">
                    <div className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Ticket(s)
                        <span>${price} CAD</span>
                    </div>
                </div>
                <div className="row px-3">
                    <div className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Cancelation Insurance
                        <span>
                            ${insurancePrice} CAD
                        </span>
                    </div>
                </div>
                {companionUsed && 
                <div className="row px-3">
                    <div className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Companion Ticket
                        <span>
                            - ${companionRefund} CAD
                        </span>
                    </div>
                </div>
                }

                <hr className="my-2"></hr>

                <div className="row p-3">
                    <div className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        <strong>Total amount</strong>
                        <span><strong>${price + insurancePrice - companionRefund} CAD</strong></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const PaymentForm = () => {

    const { state } = useLocation()
    const navigate = useNavigate()
    const [cardValidity, setCardValidity] = useState(false)
    const [emailModal, setEmailModal] = useState(false)
    const [showInvalidCard, setShowInvalidCard] = useState(false)
    const [showConfirmedPayment, setShowConfirmedPayment] = useState(false)
    const [showInvalidBooking, setShowInvalidBooking] = useState(false)
    const [cancelInsurance, setCancelInsurance] = useState(false)
    const [companionUsed, setCompanionUsed] = useState(false)
    const [cardNumber, setCardNumber] = useState<string>("")
    const [cardExpiry, setCardExpiry] = useState<string>("")
    const [cardCVV, setCardCVV] = useState<string>("")
    const [cardType, setCardType] = useState<string>("credit")
    const { user } = useAuth();

    const seats = state?.seats

    const getSeatType = (seat: Seat) => {
        if(seat.businessClass) return "business"
        return "economy"
    }

    const makeBookings = () => {
        let bookings: Booking[] = []
        for(let seat of seats){
            bookings.push({
                userID: (user as User).userID,
                flightID: seat.flightID,
                cancelInsurance: cancelInsurance,
                paid: true,
                payMethod: cardType,
                seatClass: getSeatType(seat),
                seatRow: seat.seatRow,
                seatCol: seat.seatCol,
                passengerName: seat.passengerName
            })
        }
        return bookings
    }

    const getTotalCost = () => {
        let price = 0
        for(let seat of seats){
            price += seat.price
        }
        return price
    }

    const passBooking = async ():Promise<string> => {
        return putBookings(makeBookings())
    }

    const validateCard = async ():Promise<boolean> => {
        setCardValidity(false)
        return checkCard({
            cardNumber: cardNumber,
            cardExpiry: cardExpiry,
            cardCVV: cardCVV
        })
    }

    const updateUserLoungePass = async ():Promise<User> => {
        if(user!.companionPass){
            user!.companionPass = !companionUsed
        }
        console.log("in update user lounge  pass")
        console.log(user)
        return updateUser(user!)
    }

    const processPayment = async () => {
        try{
            let bookingMessage = ""
            let validated = await validateCard()
            console.log(validated)
            if(validated){
                bookingMessage = await passBooking()
                console.log("waited for bookings")
                console.log(bookingMessage)
            }
            else {
                setShowInvalidCard(true)
                return
            }
            if(bookingMessage === "unable to make booking"){
                console.log("unable to make booking")
                setShowInvalidBooking(true)
                return
            }
            if(bookingMessage === "unable to send email"){
                console.log("unable to make booking")
                setEmailModal(true)
                return
            }
            if(!companionUsed){
                setShowConfirmedPayment(true)
                return
            }
            else if (await updateUserLoungePass()){
                setShowConfirmedPayment(true)
                return
            }
        }
        catch (error: any) {
            alert(error.message)
        }
    }

    return(
        <PageLayout>
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-8">
                        <BillingDetailsCard 
                            insuranceState={cancelInsurance}
                            setInsurance={setCancelInsurance}
                            setCardNumber={setCardNumber}
                            setCardExpiry={setCardExpiry}
                            setCardCVV={setCardCVV}
                            passBooking={passBooking}
                            setCardType={setCardType}
                            setCompanionUsed={setCompanionUsed}
                            companionUsed={companionUsed}
                            processPayment={processPayment}
                        />
                    </div>
                    <div className="col-md-4">
                        <BillingSummaryCard 
                            price={getTotalCost()} 
                            cancelInsurance={cancelInsurance}
                            companionUsed={companionUsed}
                            companionPrice={seats[0].price}
                        />
                    </div>
                </div>
            </div>
            
            <InvalidCardModal 
                show={showInvalidCard}
                onHide={() => setShowInvalidCard(false)}    
            />
            <PaymentConfirmedModal 
                show={showConfirmedPayment}
                onHide={() => navigate("/")}
            />
            <InvalidBookingModal 
                show={showInvalidBooking}
                onHide={() => navigate("/")}
            />
            <UnableToSendEmailModal 
                show={emailModal}
                onHide={() => navigate("/")}
            />
        </PageLayout>
    );
}

export default PaymentForm;