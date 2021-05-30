import React from "react";
import Header from "../Layout/Header";

function Layout(props) {
  return <div><Header {...props}/>{props.children}</div>;
}

export default Layout;
