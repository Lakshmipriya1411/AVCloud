import React from "react";
export default function BasePage(props) {
  return (
      <div style={{marginBottom:"64px"}} className="main">{props.children}</div>
  );
}
