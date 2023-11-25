import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CreditCard, checkCard } from "../../API/creditCard"

interface BillingDetailsProps {
    insuranceState: any
    cardNumber: string | undefined
    cardExpiry: string | undefined
    cardCVV: string | undefined
    setInsurance: (bool: boolean) => void
    setCardNumber: (num: string) => void
    setCardExpiry: (num: string) => void
    setCardCVV: (num: string) => void
}

const PaymentSection = (props: BillingDetailsProps) => {
    
    return(
        <>
        <h5 className="mb-4">Payment</h5>

        <div className="form-check">
            <input className="form-check-input" type="radio" name="paymentRadio" id="credit" defaultChecked />
            <label className="form-check-label" htmlFor="credit">
                Credit card
            </label>
        </div>
        <div className="form-check mb-4">
            <input className="form-check-input" type="radio" name="paymentRadio" id="debit" />
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
    insuranceState: any
    setInsurance: (bool: boolean) => void
}

const InsuranceSection = (props: InsuranceSectionProps) => {
    return(
      <>
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="insurance" onChange={() => props.setInsurance(!props.insuranceState)} />
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
      </>  
    );
}

const BillingDetailsCard = (props: BillingDetailsProps) => {

    const [cardValidity, setCardValidity] = useState(false);

    const validateCard = () => {
        setCardValidity(false)
        checkCard({
            cardNumber: props.cardNumber,
            cardExpiry: props.cardExpiry,
            cardCVV: props.cardCVV
        })
            .then((response) => {
                console.log("validate card")
                console.log(response)
                if(response) 
                    setCardValidity(true);
            })
            .catch((error) => {
                console.log(error)
            })
    }

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
                />

                <hr className="my-4" />

                <PaymentSection {...props}/>
                
                <div className="d-grid gap-2 col-6 mx-auto">
                <button type="button" className="btn btn-primary btn-lg shadow mb-3" onClick={validateCard}>
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
}

const BillingSummaryCard = (props: BillingSummaryProps) => {

    let insurancePrice = 0;
    if (props.cancelInsurance)
        insurancePrice = 100;

    return(
        <div className="card shadow">
            <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
            </div>
            <div className="card-body">
                <div className="row px-3">
                    <div className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Ticket
                        <span>${props.price} CAD</span>
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

                <hr className="my-2"></hr>

                <div className="row p-3">
                    <div className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        <strong>Total amount</strong>
                        <span><strong>${props.price + insurancePrice} CAD</strong></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const PaymentForm = () => {

    const { state } = useLocation()
    const [cancelInsurance, setCancelInsurance] = useState(false)
    const [cardNumber, setCardNumber] = useState<string>()
    const [cardExpiry, setCardExpiry] = useState<string>()
    const [cardCVV, setCardCVV] = useState<string>()

    const seat = state?.seat
    console.log("PaymentForm")

    return(
        <div className="container py-5">
            <div className="row">
                <div className="col-md-8">
                    <BillingDetailsCard 
                        insuranceState={cancelInsurance}
                        cardNumber={cardNumber}
                        cardExpiry={cardExpiry}
                        cardCVV={cardCVV} 
                        setInsurance={setCancelInsurance}
                        setCardNumber={setCardNumber}
                        setCardExpiry={setCardExpiry}
                        setCardCVV={setCardCVV}
                    />
                </div>

                <div className="col-md-4">
                    <BillingSummaryCard price={seat.price} cancelInsurance={cancelInsurance}/>
                </div>
            </div>
        </div>
    )
}

export default PaymentForm;