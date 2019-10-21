import React, { Component } from "react";
import axios from "axios";
import { withRouter, Redirect } from "react-router-dom";

class RegisterForm extends Component {
    state = {
        email: "",
        password: ""
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        //console.log(this.state);

        // fetch("http://localhost:3000/auth/register", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({ email, password })
        // })
        //     .then(response => response.json())
        //     .then(data => console.log(data))
        //     .catch(err => console.log(err));

        axios
            .post("http://localhost:3000/auth/register", { email, password })
            .then(response => {
                this.props.onRegisterFormSubmit((response.data.token), () => {
                    this.props.history.push("/");
                });
            })
            .catch(err => console.log(err));

        const { onRegisterFormSubmit } = this.props;
        onRegisterFormSubmit("token");
    }

    onInputChange = (name, event) => {
        this.setState({ [name]: event.target.value });
    }

    render() {

        const { email, password } = this.state;
        console.log("props>>", this.props);

        return (
            <form onSubmit={this.onFormSubmit}>
                <p>
                    <label htmlFor="email">Email</label>
                    <input type="email" value={email} onChange={(event) => this.onInputChange("email", event)} />
                </p>
                <p>
                    <label htmlFor="email">Password</label>
                    <input type="password" value={password} onChange={(event) => this.onInputChange("password", event)} />
                </p>
                <p>
                    <input type="submit" value="Register New User" />
                </p>
            </form>
        );
    }
}

export default withRouter(RegisterForm);
// export default RegisterForm;