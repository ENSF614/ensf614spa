import PageLayout from "./Layout/PageLayout";
import "../home.css";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate }  from "react-router-dom";

const Home = () => {

    const navigate = useNavigate()
    const [startDate, setStartDate] = useState<Date|undefined>(undefined)
    const [origin, setOrigin] = useState<string>('')
    const [destination, setDestination] = useState<string>('')

    const handleSearchClick = () => {
        navigate("/Flights", {
            state: 
            {origin: origin,
             destination: destination,
             startDate: startDate
        }})
    }

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
                        <label htmlFor="origin" className="form-label">*Departure</label>
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
                        <label htmlFor="destination" className="form-label">*Destination</label>
                    </h4>
                    <div className="d-flex justify-content-center">
                        <input className="form" id="destination" 
                               type="text" placeholder="Toronto"
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
                    <Button type="button" variant="dark" onClick={handleSearchClick}>
                        Take Me Away!
                    </Button>
                </div>
            </div>
            <footer>
                *ENSF614 Airlines only provides flights between major Canadian cities.
            </footer>
        </PageLayout>

    )
}

export default Home