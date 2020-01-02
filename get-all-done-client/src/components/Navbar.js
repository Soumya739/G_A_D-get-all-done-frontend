import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { api } from '../services/api';

export class Navbar extends Component {

    displayNavbar = () => {
        const { onLogin, onSignUp, onLogOut } = this.props
        let token = localStorage.getItem("token")
        if (token && token !== "undefined") {
            let currentUserType = api.user.getcurrentUserType()
            if (currentUserType === "contractee") {
                return <>
                    <NavLink to="/home"><button>Home</button></NavLink>
                    <NavLink to="/profile"><button>Profile</button></NavLink>
                    <NavLink to="/post/new"><button>New Post</button></NavLink>
                    <NavLink to="/timeline"><button>Timeline</button></NavLink>
                    <button onClick={onLogOut}>Logout</button>
                </>
            } else if (currentUserType === "contractor") {
                return <>
                    <NavLink to="/home"><button>Home</button></NavLink>
                    <NavLink to="/profile"><button>Profile</button></NavLink>
                    <NavLink to="/posts"><button>Posts</button></NavLink>
                    <NavLink to="/timeline"><button>Timeline</button></NavLink>
                    <button onClick={onLogOut}>Logout</button>
                </>
            }
        } else {
            return <>
                <button onClick={onSignUp}><NavLink to="/signup">Signup</NavLink></button>
                <button onClick={onLogin}><NavLink to="/login">Login</NavLink></button>
            </>
        }
    }
    render() {
        return (
            <>
                {this.displayNavbar()}
            </>
        )
    }
}

export default Navbar
