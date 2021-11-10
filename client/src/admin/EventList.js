import React, { useEffect, useState } from "react";
import BasePage from "../common/BasePage";
import Axios from "axios";
import { useHistory } from "react-router-dom";
var rows = [];

export default function EventList() {
    Axios.defaults.withCredentials = true;

    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const itemClick = (event) => {
        let id = event.target.parentElement.dataset.key;
        history.push("/admin/events/details/" + id);
    }
    useEffect(() => {
        Axios.get('http://localhost:3001/admin').then(function (res) {
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
                    <th>Event Name</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {rows.map(res =>
                    <tr key={res.event_id} data-key={res.event_id} onClick={itemClick}>
                        <td>{res.event_id}</td>
                        <td>{res.event_name}</td>
                        <td>{res.e_description}</td>
                        <td>{res.start_date}</td>
                        <td>{res.end_date}</td>
                        <td>{res.status}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
