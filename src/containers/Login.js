import React, { Component, Fragment } from "react";
import { Button, Form, Header, Grid, Checkbox } from "semantic-ui-react";
import axios from "axios";
import iziToast from "../assets/iziToast.min.js";
import "../assets/iziToast.min.css";
import "../assets/Login.scss";

export default class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleLogin = e => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:3000/users/sign_in",
      data: {
        user: {
          email: this.state.email,
          password: this.state.password
        }
      },
      withCredentials: true
    })
      .then(response => {
        sessionStorage.setItem("jwt-token", response.headers.authorization);
        iziToast.show({
          theme: "light",
          title: "Success",
          message: "Have a look around",
          position: "topRight",
          color: "green",
          backgroundColor: "lime",
          timeout: 3000,
          balloon: true
        });
        this.props.history.push("/");
      })
      .catch(error => {
        iziToast.show({
          theme: "light",
          title: "Sorry",
          message: "please try again",
          position: "topRight",
          color: "red",
          backgroundColor: "lightcoral",
          timeout: 3000,
          balloon: true
        });
      });
  };

  render() {
    const { password, email } = this.state;
    return (
      <Fragment>
        <Header as="h1" textAlign="center" className="login-h1">
          Log In
        </Header>
        <Header as="h4" textAlign="center" className="login-h4">
          Don't have an account? <a href="/sign_up">Sign up</a>
        </Header>
        <Header as="h4" textAlign="center">
          <a href="/users/password/new">Forgot your password?</a>
        </Header>
        <Grid centered={true}>
          <Grid.Row>
            <Grid.Column width={8}>
              <Form
                onSubmit={this.handleLogin}
                className="login-form"
                size="large"
              >
                <Form.Input
                  label="Email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
                <Form.Field>
                  <Checkbox label="Remember me" />
                </Form.Field>
                <Button type="submit">Submit</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    );
  }
}