import React, { Component } from 'react'
import { Redirect, NavLink } from 'react-router-dom';
// import { api } from '../services/api'
// import Home from './Home'

const URL = "http://localhost:3000"

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
        let { onSignUp, onLoggedIn, onLogin } = this.props
        let { username, email, phone, country, city, contractee, contractor, password, services } = this.state

        // api.user.createUser(this.state).then(res => {
        //     if (!res.error) {
        //         onLogin(res);
        //         // this.props.history.push('/');
        //     } else {
        //         this.setState({ error: true });
        //     }
        // })
        fetch(URL + "/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accepts: 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                city: city,
                country: country,
                phone: phone,
                contractee: contractee,
                contractor: contractor
            })
        }).then(handleErrors)
            .then(response => response.json())
            .then(user => {
                console.log(user);
                if (contractor) {
                    // createContractor(user, data)
                    console.log("creating contractor")
                    fetch(URL + "/contractors", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            Accepts: 'application/json'
                        },
                        body: JSON.stringify({
                            user_id: user.id,
                            projects_completed: 0,
                            password: password,
                            services: services
                        })
                    })
                        .then(handleErrors)
                        .then(response => response.json())
                        .then(json => {
                            console.log(json)
                            this.currentUserStatus("contractor")
                        })
                    // .then(currentUser => {
                    //     onSetCurrentUser("contractor")
                    // })

                } else {
                    // createContractee(user, data)
                    console.log("creating contractee")
                    fetch(URL + "/contractees", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            Accepts: 'application/json'
                        },
                        body: JSON.stringify({
                            user_id: user.id,
                            password: password
                        })
                    }).then(handleErrors)
                        .then(response => response.json())
                        .then(json => {
                            console.log(json)
                            this.currentUserStatus("contractee")
                        })
                    //         .then(currentUser => {
                    //             onSetCurrentUser("contractee")
                    //         }
                }
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
            .catch(error => console.log(error));
        this.submittedStatus()
        onSignUp()
        onLoggedIn()
        onLogin()
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
                                <label>Services</label>
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

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export default SignupForm
