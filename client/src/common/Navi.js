import React from "react";
import { Link } from "react-router-dom";
import { useLoginValidate } from "./Validate";

const Navi = () => {
  const { userData } = useLoginValidate();
  return (
    <div className="pure-menu pure-menu-horizontal" style={{display:"flex"}}>
      <a href="/" className="pure-menu-heading pure-menu-link">
        Country Club
      </a>
      <ul className="pure-menu-list">
        <li className="pure-menu-item">
          <Link to="/" className="pure-menu-link">
            Home
          </Link>
        </li>
        {!userData.user_id && <li className="pure-menu-item">
          <Link to="/registration" className="pure-menu-link">
            Register
          </Link>
        </li>}
        {userData.user_id && userData.auth_id === 1 && (
          <li className="pure-menu-item">
            <Link to="/admin" className="pure-menu-link">
              Admin
            </Link>
          </li>
        )}
        {userData.user_id && (
          <li className="pure-menu-item">
            <Link to="/user/myBookings" className="pure-menu-link">
              My Bookings
            </Link>
          </li>
        )}
        {userData.user_id && (
          <li className="pure-menu-item">
            <Link to="/user/myProfile" params={{ id: userData.user_id }} className="pure-menu-link">
              My Profile
            </Link>
          </li>
        )}

        {!userData.user_id && (
          <li className="pure-menu-item">
            <Link to="/login" className="pure-menu-link">
              Login
            </Link>
          </li>
        )}
        {userData.user_id && (
          <li className="pure-menu-item">
            <Link to="/logout" className="pure-menu-link">
              Logout
            </Link>
          </li>
        )}
      </ul>
      {userData.user_id && (
            <label className="pure-menu-heading" style={{marginLeft:"auto",marginTop:"auto"}}> Hello {userData.user_id} !</label>
        )}
    </div>
  );
};
export default Navi;
