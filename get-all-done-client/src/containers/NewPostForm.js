import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { api } from '../services/api'

export class NewPostForm extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            description: "",
            category: "",
            submitted: false,
            errorReason: ""
        }
    }

    handleInput = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmittedStatus = () => {
        this.setState({ submitted: !this.state.submitted })
    }

    handlePostFormSubmit = (e) => {
        e.preventDefault()
        api.posts.createPost(this.state).then(res => {
            console.log("resp", res)
            if (!res.error) {
                this.handleSubmittedStatus()
            } else {
                this.setState({ error: true, errorReason: res.error });
            }
        })
    }


    render() {
        if (this.state.submitted === true) {
            return <h2>Submitted</h2>

        } else if (this.state.errorReason !== "") {
            return <h2>this.state.errorReason</h2>
        }
        else {
            // t.string :title
            // t.string :description
            // t.integer :contractee_id
            // t.integer :contractor_id
            // t.string :category, array: true, default: []
            // t.string :status
            return (
                <div className='space_between_lines'>
                    Create a Post
                <form onSubmit={(e) => this.handlePostFormSubmit(e)} className='space_between_lines'>
                        <label>Title:</label>
                        <input type='text' placeholder='title' id="title" onChange={(e) => this.handleInput(e)} value={this.state.title} required /><br />
                        <label>Description:</label>
                        <input type='text' placeholder='description' id="description" onChange={(e) => this.handleInput(e)} value={this.state.description} required /><br />
                        <label>Category:</label>
                        <input type='text' placeholder='category' id="category" onChange={(e) => this.handleInput(e)} value={this.state.category} required /><br />
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
