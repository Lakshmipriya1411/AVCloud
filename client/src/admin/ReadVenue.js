import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useLoginValidate } from "../common/Validate";
import redirectLogin from "../common/redirectLogin";
import redirectHome from "../common/redirectHome";
import Navi from "../common/Navi";
import BasePage from "../common/BasePage";
import { useParams, useHistory } from 'react-router-dom';
import VenueTypeDropdown from "./VenueType";

let details = {};

const DeleteEventDetails = (props) => {
    const history = useHistory();
    const deleteVenueDetails = (e) => {
        e.preventDefault();
            Axios.post("http://localhost:3001/admin/venue/delete", { venue_id: details.venue_id })
                .then(function (res) {
                    history.push("/admin");
                })
                .catch((error) => {
                    props.setMessage(error.data ? error.data.err : "Cannot delete venue since its associated with one or more events");
                });

    }

    return (
            <button className="pure-button pure-button-error"
                    onClick={deleteVenueDetails}>
                            Delete Venue
            </button>
        );
}


const ReadvenueDetails = (props) => {


    Axios.defaults.withCredentials = true;
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    let { id } = useParams();


    useEffect(() => {
        Axios.get('http://localhost:3001/admin/venue/details/' + id).then(function (res) {
            console.log(res);
            details = res.data;
            setLoading(false);
        });
    }, [])



    if (loading) {
        return <BasePage> Loading data.... </BasePage>;
    }

    return (
        <fieldset>
            <div className="pure-u-1-3"></div>

            <div className="pure-u-1-3">
                <div className="pure-control-group">
                    <label htmlFor="aligned-name">Venue Name: </label>
                    <label id="aligned-name">{details.venue_name}</label>
                </div>

                <div className="pure-control-group">
                    <label htmlFor="aligned-name">Venue Type: </label>
                    <label id="aligned-name">{details.venue_type}</label>
                </div>
                <br />
                <br />
                <div className="pure-control-group">
                    <div className="pure-u-1-6">
                    </div>
                    <div className="pure-u-1-6">
                        <button className="pure-button pure-button-primary"
                            onClick={() =>
                                props.updateVenue(details)}>
                            Update Venue
                        </button>
                    </div>
                    <div className="pure-u-1-6">
                    </div>
                    <div className="pure-u-1-6">
                        <DeleteEventDetails setMessage={setMessage}/>
                    </div>
                </div>
            </div>
            <div className="pure-u-1-3"></div>

            <div>{message}</div>

        </fieldset>
    );
}

const UpdatevenueDetails = (props) => {

    const history = useHistory();
    const setVenuetypedetails = (venuetype) => {
        props.setDetails({ ...props.details, venue_type: venuetype });
    }

    const updateVenue = (e) => {

        e.preventDefault();
        Axios.post("http://localhost:3001/admin/venue/update",
            props.details
        )
        .then(function (res) {
            history.push("/admin");
        })
            .catch((error) => {
            });

    };
    return (
        <fieldset>

            <div className="pure-u-1-3"></div>

            <div className="pure-u-1-3">
                <div className="pure-control-group">
                    <label htmlFor="aligned-name">Venue Name</label>
                    <input
                        type="text"
                        id="aligned-name" placeholder="Venue Name"
                        value={props.details.venue_name}
                        onChange={(e) => {
                            props.setDetails({ ...props.details, venue_name: e.target.value });
                        }}
                    />
                </div>

                <div className="pure-control-group">
                    <label htmlFor="aligned-venue">Venue</label>
                    <VenueTypeDropdown setVenuetypedetails={setVenuetypedetails} selectedVenueType={props.details.venue_type} />
                </div>

                <div className="pure-controls">
                    <button className="pure-button pure-button-primary" onClick={updateVenue}>
                        Update Venue
              </button>
                </div>
            </div>

            <div className="pure-u-1-3"></div>

        </fieldset>
    )

}



const Details = () => {
    const [showDetails, setShowDetails] = useState(true);
    const [userDetails, setDetails] = useState({});
    const updateVenue = (details) => {
        setDetails(details);
        setShowDetails(false);
    }

    if (showDetails) {
        return (
            <ReadvenueDetails updateVenue={updateVenue} />
        )
    } else {
        return (
            <UpdatevenueDetails details={userDetails} setDetails={setDetails} />
        )
    }
}



export default function ReadVenue() {
    Axios.defaults.withCredentials = true;
    const { loading, userData } = useLoginValidate();

    if (loading) {
        return <BasePage> Loading data.... </BasePage>;
    }
    if (!userData.user_id) {
        return redirectLogin();
    } else if (userData.auth_id === 1) {
        return (
            <div>
                <Navi></Navi>
                <form className="pure-form pure-form-aligned">
                    <h1 style={{ textAlign: "center" }}>Venue Details</h1>
                    <Details />
                </form>
            </div>
        );
    } else {
        return redirectHome();
    }
}