import { useState } from "react";
import { useLocation } from "react-router-dom";

interface BillingDetailsProps {
    insuranceState: any
    setInsurance: (bool: boolean) => void
}

const BillingDetails = (props: BillingDetailsProps) => {

    

    return (
        <div className="card shadow">
            <div className="card-header py-3">
                <h5 className="mb-0">Billing details</h5>
            </div>   
            <div className="card-body">
                <div className="row mb-4">
                    <div className="col">
                        <div className="form-floating mb-1">
                            <label htmlFor="form1">First Name</label>
                            <input className="form-control" id="form1" type="text" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating mb-1">
                            <label htmlFor="form2">Last name</label>
                            <input className="form-control" id="form2" type="text" placeholder="something" />
                        </div>
                    </div>
                </div>
                <div className="form-floating mb-1">
                    <label htmlFor="form3">Address</label>
                    <input className="form-control" id="form3" type="text" />
                </div>

                <hr className="my-4"/>

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

                <hr className="my-4" />

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
                            <label htmlFor="form4">Name on card</label>
                            <input className="form-control" id="form4" type="text" />
                        </div>
                    </div>
                    <div className="col mb-4">
                        <div className="form-floating mb-1">
                            <label htmlFor="form5">Card Number</label>
                            <input className="form-control" id="form5" type="text" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-floating mb-1">
                            <label htmlFor="form6">Expiration date</label>
                            <input className="form-control" id="form6" type="text" />
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="form-floating mb-1">
                            <label htmlFor="form7">CVV</label>
                            <input className="form-control" id="form7" type="text" />
                        </div>
                    </div>
                </div>
                
                <div className="d-grid gap-2 col-8 mx-auto">
                <button type="button" className="btn btn-primary btn-lg shadow mb-3">
                    CONTINUE TO CHECKOUT
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

const BillingSummary = (props: BillingSummaryProps) => {

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

const BuyTicket = () => {

    const { state } = useLocation()
    const [cancelInsurance, setCancelInsurance] = useState(false)

    const seat = state?.seat
    console.log("buy ticket seat")
    console.log(seat)
    console.log(cancelInsurance)

    return(
        <div className="container py-5">
            <div className="row">
                <div className="col-md-8">
                    <BillingDetails insuranceState={cancelInsurance} setInsurance={setCancelInsurance}/>
                </div>

                <div className="col-md-4">
                    <BillingSummary price={seat.price} cancelInsurance={cancelInsurance}/>
                </div>
            </div>
        </div>
    )
}

export default BuyTicket;