import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignupForm from '../containers/SignupForm'
import LoginForm from '../containers/LoginForm'
import Navbar from './Navbar'
import NewPostForm from '../containers/NewPostForm'
import Timeline from './Timeline'
import AllPosts from './AllPosts'
import UserProfile from '../containers/UserProfile';

export class Home extends Component {
    render() {
        let { signup, login, loggedIn, onSignUp, onLogin, onLoggedIn, onLogOut, auth } = this.props
        return (
            <div>
                <h2>G_A_D </h2><br />
                <p>Get All Done</p><br />
                <Router>
                    <Navbar onSignUp={onSignUp} onLogin={onLogin} loggedIn={loggedIn} onLogOut={onLogOut} />
                    <Route exact path="/signup" render={() => <SignupForm onSignUp={onSignUp} onLoggedIn={onLoggedIn} signup={signup} onLogin={onLogin} />} />
                    <Route exact path="/login" render={() => <LoginForm onLoggedIn={onLoggedIn} login={login} onLogin={onLogin} />} />
                    <Route exact path="/post/new" render={() => <NewPostForm />} />
                    <Route exact path="/timeline" render={() => <Timeline />} />
                    <Route exact path="/posts" render={() => <AllPosts />} />
                    <Route exact path="/profile" render={() => <UserProfile auth={auth} />} />
                </Router>
            </div>
        )
    }
}

export default Home
