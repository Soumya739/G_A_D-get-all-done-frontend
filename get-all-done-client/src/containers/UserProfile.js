import React, { Component } from 'react'
import { api } from '../services/api'
import ProfileDetail from '../components/ProfileDetail'

export class UserProfile extends Component {
    constructor() {
        super()
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        return api.user.getUserDetails(this.props.auth.user.id)
            .then(res => {
                console.log(res)
                if (!res.error) {
                    console.log("user")
                    this.setState({ user: res })
                } else {
                    return <h1>Something went wrong</h1>
                }
            })
    }


    render() {
        return (
            <div>
                <ProfileDetail userData={this.state.user} />
            </div>
        )
    }
}

export default UserProfile
