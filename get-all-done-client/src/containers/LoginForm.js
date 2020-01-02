import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { api } from '../services/api';

export class LoginForm extends Component {
    // let { onLoggedIn, login, onLogin} = this.props
    //  let {email, password, loginAs} = this.state.fields
    constructor() {
        super()
        this.state = {
            error: false,
            fields: {
                email: '',
                password: '',
                loginAs: ''
            },

        }
    }

    handleChange = e => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({ fields: newFields });
    };

    formSubmittion = (e) => {
        e.preventDefault()
        let { onLoggedIn, onLogin } = this.props
        let { loginAs } = this.state.fields
        api.auth.login(this.state.fields).then(res => {
            if (!res.error) {
                onLogin(res);
            } else {
                this.setState({ error: true });
            }
        });
        api.user.setCurrentUserType(loginAs)
        onLoggedIn() //******* 
    }

    handlePersonSelection = (e) => {
        const newFields = { ...this.state.fields, loginAs: e.target.value };
        this.setState({ fields: newFields });
    }

    render() {
        let { login } = this.props
        let { email, password } = this.state.fields
        if (login === false) {
            return <Redirect to='/' />
        } else {
            return (
                <div>
                    {this.state.error ? <h1>Try again...</h1> : null}
                    <form onSubmit={(e) => this.formSubmittion(e)}>
                        <label>E-mail:</label><br />
                        <input type='text' name="email" placeholder='email' onChange={(e) => this.handleChange(e)} value={email} required /><br />
                        <label>password:</label><br />
                        <input type='password' name="password" placeholder='password' onChange={(e) => this.handleChange(e)} value={password} required /><br />
                        <select onChange={(e) => this.handlePersonSelection(e)}>
                            <option value="" selected disabled hidden>Choose Here</option>
                            <option value='contractee'>Contractee</option><br />
                            <option value='contractor'>Contractor</option>
                        </select><br />
                        <input type='submit' value="Login" />
                    </form>
                </div>
            )
        }
    }
}

export default LoginForm
