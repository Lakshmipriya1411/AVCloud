import React, { useState } from "react";
import BasePage from "../common/BasePage";
import Axios from "axios";
import { useHistory } from "react-router-dom";
//import {format }from 'date-fns';

var rows = [];

export default function UpgradeReqList() {
    Axios.defaults.withCredentials = true;

  
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const approveUpgradeReq = (user) =>{

        let id = user.target.parentElement.dataset.key;
        let c_mem_type = user.target.parentElement.id;

        console.log('in method upgradeMembership');
        Axios.post('http://localhost:3001/admin/upgrade/approve', {user_id: id, c_mem_type: c_mem_type})
          .then((response) => {
              window.location.reload();
            })
            .catch((error) => {
            });
      }

    Axios.get('http://localhost:3001/admin/upgrade/list',).then(function(res) {
      console.log(res);
      rows = res.data;
      setLoading(false);
    });
    if (loading) {
        return <BasePage> Loading data.... </BasePage>;
    }
    return (
    <div>
        <h4>Upgrade Requests</h4>
        <table className="pure-table pure-table-horizontal">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Member Name</th>
                    <th>Upgrade To</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {rows.map(res =>
                        <tr>
                          <td>#</td>
                          <td>{res.f_name} {res.l_name}</td>
                          <td>{res.upgrade_name}</td>
                          <td id={res.current_mem_type} key={res.user_id} data-key={res.user_id}>
                            <button className="pure-button pure-button-primary" onClick={approveUpgradeReq}>
                    Approve
                </button></td>                          
                        </tr>
                    )}
            </tbody>
        </table>
    </div>
    );

}
