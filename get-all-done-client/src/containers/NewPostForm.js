import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

const URL = "http://localhost:3000"

export class NewPostForm extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            discription: "",
            submitted: false
        }
    }

    handleTitleInput = (e) => {
        this.setState({ title: e.target.value })
    }
    handleDiscriptionInput = (e) => {
        this.setState({ discription: e.target.value })
    }
    handleSubmittedStatus = () => {
        this.setState({ submitted: !this.state.submitted })
    }

    handlePostFormSubmit = (e) => {
        e.preventDefault()
        this.handleSubmittedStatus()
        let { title, discription } = this.state
        fetch(URL + "/posts", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
                Accept: "Application/json"
            },
            body: JSON.stringify({
                title: title,
                discription: discription
            })
        })
            .then(resp => resp.json())
            .then(posts => {
                console.log(posts)
            })
    }


    render() {
        if (this.state.submitted === true) {
            return <h2>Submitted</h2>
        } else {
            return (
                <div className='space_between_lines'>
                    Create a Post
                <form onSubmit={(e) => this.handlePostFormSubmit(e)} className='space_between_lines'>
                        <label>Title:</label>
                        <input type='text' placeholder='title' id="title" onChange={(e) => this.handleTitleInput(e)} value={this.state.title} required /><br />
                        <label>Discription:</label>
                        <input type='text' placeholder='discription' id="discription" onChange={(e) => this.handleDiscriptionInput(e)} value={this.state.discription} required /><br />

                        <input type='submit' value="Submit" />
                    </form>
                    {/* {this.state.submitted ? <h2>Submitted</h2> : <></>} */}
                    <NavLink to="/"><button>Cancel</button></NavLink>
                </div>
            )
        }
    }
}

export default NewPostForm
