import React, { Component } from 'react'
import { Redirect, NavLink } from 'react-router-dom';
import { api } from '../services/api'
// import Home from '../components/Home'

export class SignupForm extends Component {
    // let { onSetCurrentUser, onsignUp, onLoggedIn, signup } = this.props
    // let { username, email, phone, country, city, contractee, contractor, submitted } = this.state
    constructor() {
        super()
        this.state = {
            username: "",
            email: "",
            phone: 0,
            country: "",
            city: "",
            services: [],
            password: "",
            contractee: true,
            contractor: false,
            submitted: false
        }

    }

    handleInputData = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handlePersonSelection = (e) => {
        if (e.target.value === "contractor") {
            this.setState({
                contractee: false,
                contractor: true
            })
        } else {
            this.setState({
                contractee: true,
                contractor: false
            })
        }
    }

    submittedStatus = () => {
        this.setState({ submitted: true })
    }

    currentUserStatus = (userStatus) => {
        return userStatus
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        let { onSignUp, onLoggedIn, onLogin } = this.props
        api.user.createUser(this.state).then(res => {
            console.log("resp", res)
            if (!res.error) {
                onLogin(res)
                return <Redirect to="/login" />
            } else {
                this.setState({ error: true });
            }
        })
            .then(() => {
                this.submittedStatus()
                onSignUp()
                onLoggedIn()
            })
            .then(this.setState({
                username: "",
                email: "",
                phone: 0,
                country: "",
                city: "",
                contractee: true,
                contractor: false,
                password: ""
            }))
    }

    render() {
        let { signup } = this.props
        let { username, email, phone, country, city, contractor, submitted, services, password, contractee } = this.state
        if (submitted === true || signup === false) {
            return <Redirect to='/' />
        } else {
            return (
                <div className='space_between_lines'>
                    <form onSubmit={(e) => this.handleFormSubmit(e)} className='space_between_lines'>
                        <label>Username</label>
                        <input type='text' id="username" placeholder='Username' onChange={(e) => this.handleInputData(e)} value={username} required /><br />
                        <label>City</label>
                        <input type='text' id='city' placeholder='City' onChange={(e) => this.handleInputData(e)} value={city} required /><br />
                        <label>Country</label>
                        <input type='text' id='country' placeholder='Country' onChange={(e) => this.handleInputData(e)} value={country} required /><br />
                        <label>E-mail</label>
                        <input type='text' id='email' placeholder='E-mail' onChange={(e) => this.handleInputData(e)} value={email} required /><br />
                        <label>Contact number</label>
                        <input type='number' id='phone' placeholder='Contact number' onChange={(e) => this.handleInputData(e)} value={phone} required /><br />
                        <label>Signup as:</label>
                        <select onChange={(e) => this.handlePersonSelection(e)} >
                            <option value="" selected disabled hidden>Choose here:</option>
                            <option value='contractee' selected>Contractee</option>
                            <option value='contractor'>Contractor</option>
                        </select><br />
                        {contractor ?
                            <>
                                <label>You selected contractor</label><br />
                                <label>Service: </label>
                                <input type='text' id='services' placeholder='services' onChange={(e) => this.handleInputData(e)} value={services} required /><br />
                            </>
                            : null}
                        {contractee ?
                            <>
                                <label>You selected contractee</label><br />
                            </>
                            : null}
                        <label>Password</label>
                        <input type='password' id="password" placeholder='password' onChange={(e) => this.handleInputData(e)} value={password} required /><br />

                        <input type='submit' value="Submit" />
                    </form>
                    <NavLink to="/"><button>Cancel</button></NavLink>
                </div>
            )
        }
    }
}

export default SignupForm
