import React, { Component } from 'react'

export class ProfileDetail extends Component {
    render() {
        console.log("props", this.props.userData)
        let { email, username, phone, city, country, contractor } = this.props.userData
        return (
            <div>
                <h3>Email: {email}</h3>
                <h3>Username: {username}</h3>
                <h3>Phone: {phone}</h3>
                <h3>City: {city} </h3>
                <h3>Country: {country}</h3>
                {contractor ? <h3>Status: Contractor</h3> : <h3>Status: Contractee</h3>}
            </div>
        )
    }
}

export default ProfileDetail
