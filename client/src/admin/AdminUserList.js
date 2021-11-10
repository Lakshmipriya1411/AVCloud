import React, { useState } from "react";
import BasePage from "../common/BasePage";
import Axios from "axios";
import { useHistory } from "react-router-dom";
//import {format }from 'date-fns';

var rows = [];

export default function StaffMembers() {
    Axios.defaults.withCredentials = true;
    
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const userItemClick = (user) =>{
        let id = user.target.parentElement.dataset.key;
        history.push("/admin/users/details/" + id);
    }
    
    Axios.get('http://localhost:3001/admin/users/adminuser').then(function(res) {
      console.log(res);
      rows = res.data;
      setLoading(false);
    });
    if (loading) {
        return <BasePage> Loading data.... </BasePage>;
    }
    return (
    <div>
        <h4>Admin Users</h4>
        <table className="pure-table pure-table-horizontal">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Member Name</th>
                    <th>Email Id</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {rows.map(res =>
                    <tr key={res.user_id} data-key={res.user_id} onClick={userItemClick}>
                      <td>{res.user_id}</td>
                      <td>{res.f_name} {res.l_name}</td>
                      <td>{res.email_id}</td>
                      <td>{res.status}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
    );
}
