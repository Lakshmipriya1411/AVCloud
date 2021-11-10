import React, { useEffect, useState } from "react";
import BasePage from "../common/BasePage";
import Axios from "axios";
import { useHistory } from "react-router-dom";
var rows = [];

export default function VenueList() {
    Axios.defaults.withCredentials = true;

    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const itemClick = (event) => {
        let id = event.target.parentElement.dataset.key;
        history.push("/admin/venue/details/" + id);
    }
    useEffect(() => {
        Axios.get('http://localhost:3001/admin/venuelist').then(function (res) {
            console.log(res);
            rows = res.data;
            setLoading(false);
        });
    }, []);
    if (loading) {
        return <BasePage> Loading data.... </BasePage>;
    }
    return (
        <table className="pure-table pure-table-horizontal">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Venue Name</th>
                    <th>Venue Type</th>
                </tr>
            </thead>
            <tbody>
                {rows.map(res =>
                    <tr key={res.venue_id} data-key={res.venue_id} onClick={itemClick}>
                        <td>{res.venue_id}</td>
                        <td>{res.venue_name}</td>
                        <td>{res.venue_type}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
