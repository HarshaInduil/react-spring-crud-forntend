import React from "react";
import "./App.css";
import { Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import { userRoutes, publicRoutes } from "./routes/allRoutes";
import Authmiddleware from "./routes/middleware/Authmiddleware";
import AuthBackground from "./components/pages/AuthBackground";
import Layout from "./components/pages/Layout";

function App() {
  return (
    <div>
      <React.Fragment>
        <Router>
          <Switch>
            {publicRoutes.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                layout={AuthBackground}
                component={route.component}
                key={idx}
                isAuthProtected={false}
              />
            ))}

            {userRoutes.map((route, idx) => (
              //  console.log(route)
              <Authmiddleware
                path={route.path}
                layout={Layout}
                component={route.component}
                key={idx}
                name={route.name}
                isAuthProtected={true}
                exact
              />
            ))}

            <Redirect to="/login" />
          </Switch>
        </Router>
      </React.Fragment>
    </div>
  );
}

export default App;
