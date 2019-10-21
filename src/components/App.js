import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./../styles/App.css";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import BookmarksPage from "./pages/BookmarksPage";
import LocalApi from "./../apis/local";
import PrivateRoute from "./PrivateRoute";

export default class App extends Component {
    state = { token: sessionStorage.getItem("token") }

    onRegisterFormSubmit = (token, CB) => {
        sessionStorage.setItem("token", token);
        this.setState({ token }, CB);
    }

    componentDidUpdate() {
        // console.log("token given>>>", this.state.token);
    }
    render() {
        const { token } = this.state;
        return (

            <BrowserRouter>
                <div>
                    {token && <h1>Got the token,,User is logged in.</h1>}
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route
                            exact
                            path="/register"
                            render={
                                (props) => {
                                    return <RegisterPage {...props} onRegisterFormSubmit={this.onRegisterFormSubmit} />
                                }
                            }
                        // component={RegisterPage}
                        />
                        <Route exact path="/bookmarks" component={BookmarksPage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

// class App extends Component {
//     //state = { token: sessionStorage.getItem("token") }
//     constructor(props) {
//         super(props);
//         const token = sessionStorage.getItem("token");
//         this.state = { token };

//         if (token) {
//             LocalApi.setAuthHeader(token);
//         }

//         LocalApi.handleTokenError(() => {
//             this.logout();
//         })
//     }

//     logout = () => {
//         sessionStorage.clear();
//         this.setState({ token: null });
//     }

//     onRegisterFormSubmit = (token, cb) => {
//         sessionStorage.setItem("token", token);
//         LocalApi.setAuthHeader(token);
//         this.setState({ token }, cb);
//     }

//     render() {
//         const { token } = this.state;

//         return (
//             <BrowserRouter>
//                 <div>
//                     { token && <h4>User is logged in!</h4>}
//                     <Switch>
//                         <Route exact path="/" component={HomePage} />
//                         <Route exact path="/register" render={(props) => {
//                             return <RegisterPage {...props} onRegisterFormSubmit={this.onRegisterFormSubmit}  />
//                         }} />
//                         <PrivateRoute exact path="/bookmarks" token={token} component={BookmarksPage} />
//                         <Route component={NotFoundPage} />
//                     </Switch>
//                 </div>
//             </BrowserRouter>
//         );
//     }
// }

// export default App;
