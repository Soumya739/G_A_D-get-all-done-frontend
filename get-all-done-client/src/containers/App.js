import React, { Component } from 'react'
import Home from '../components/Home'
// import { Redirect, useHistory } from 'react-router-dom';
import { api } from '../services/api';


class App extends Component {
    constructor() {
        super()
        this.state = {
            signup: false,
            login: false,
            loggedIn: false,
            auth: {
                user: {}
            }
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            // make a request to the backend and find our user
            api.auth.getCurrentUser().then(user => {
                console.log(user)
                const updatedState = { ...this.state.auth, user: user };
                this.setState({ auth: updatedState });
            })
                .catch(error => {
                    console.log("here");
                    localStorage.removeItem('token');
                });
        }
    }

    onSignUp = () => {
        this.setState({ signup: !this.state.signup, login: false })
    }

    onLogin = (data) => {
        const updatedState = { ...this.state.auth, user: data };
        localStorage.setItem('token', data.jwt);
        this.setState({ auth: updatedState, login: !this.state.login, signup: false });
    }

    onLoggedIn = () => {
        this.setState({ loggedIn: true })
    }

    onLogOut = () => {
        localStorage.removeItem('token');
        this.setState({ auth: { user: {} }, signup: false, login: false, posts: [], loggedIn: false }, window.location.replace("http://localhost:3001/"));
        // this.setState({ signup: false, login: false, posts: [], loggedIn: false })

    }

    render() {
        let { signup, login, loggedIn, posts } = this.state
        return (
            <div>
                <Home
                    signup={signup}
                    login={login}
                    loggedIn={loggedIn}
                    onSignUp={this.onSignUp}
                    onLogin={this.onLogin}
                    onLoggedIn={this.onLoggedIn}
                    onLogOut={this.onLogOut}
                />
            </div>
        )
    }
}

export default App
