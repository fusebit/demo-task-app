import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import React, {useState} from "react";
import Frame from "./Frame";
import {User} from "./Types";
import Marketplace from "./Marketplace";

const AppRouter = () => {
    const [currentUser, setCurrentUser] = useState<User | undefined>();

    const commonProps = {
        currentUser
    }
    return (
        <Router>
            <Switch>
                <Route path="/dashboard">
                    <Frame {...commonProps}>
                        <Dashboard {...commonProps}/>
                    </Frame>
                </Route>
                <Route path="/marketplace">
                    <Frame {...commonProps}>
                        <Marketplace />
                    </Frame>
                </Route>
                <Route path="/">
                    <Login {...commonProps} onLogin={setCurrentUser}/>
                </Route>
            </Switch>
        </Router>
    );
};

export default AppRouter;