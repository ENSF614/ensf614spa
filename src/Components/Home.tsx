import PageLayout from "./PageLayout";
import "../home.css";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";
import { Button } from "react-bootstrap";

const Home = () => {

    const [startDate, setStartDate] = useState(new Date())
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')

    return(
        <PageLayout>
            <div className="row mt-5">
                <div className="col d-flex justify-content-center">
                    <h1 id="landingTitle">ENSF614 AIRLINES</h1>
                </div>
            </div>
            <div className="row">
                <div className="col d-flex justify-content-center">
                    <h1>Choose Your Next Adventure</h1>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col">
                    <h4 className="text-center">
                        <label htmlFor="origin" className="form-label">Departure</label>
                    </h4>
                    <div className="d-flex justify-content-center">
                        <input className="form" id="origin" 
                               type="text" placeholder="Calgary"
                               onChange={(e) => setOrigin(e.target.value)}>
                        </input>
                    </div>
                </div>
                <div className="col">
                    <h4 className="text-center">
                        <label htmlFor="destination" className="form-label">Destination</label>
                    </h4>
                    <div className="d-flex justify-content-center">
                        <input className="form" id="destination" 
                               type="text" placeholder="Hawaii"
                               onChange={(e) => setDestination(e.target.value)}>
                        </input>
                    </div>
                </div>
                <div className="col">
                    <h4 className="text-center">
                        Departure Date
                    </h4>
                    <div className="d-flex justify-content-center">
                        <DatePicker 
                            selected={startDate}
                            onChange={(date: Date) => setStartDate(date)}
                        />
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col d-flex justify-content-center">
                    <Button type="button" variant="dark">
                        Take Me Away!
                    </Button>
                </div>
            </div>
        </PageLayout>

    )
}

export default Home