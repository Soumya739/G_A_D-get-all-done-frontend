import React, { Component } from 'react'
import { api } from '../services/api'

export class PostEditForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.post.title,
            description: this.props.post.description,
            category: this.props.post.category,
            errorReason: ""
        }
    }

    handleInputData = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleEditFormSubmit = (e) => {
        let { post } = this.props
        e.preventDefault()
        api.posts.updatePosts(post.id, this.state).then(res => {
            if (!res.error) {
                console.log("Updated post", res)
                this.props.onEditPost()
                this.props.onUpdatePost(res)
            } else {
                this.setState({ errorReason: res.error });
            }
        })
    }

    render() {
        // if (this.state.submitted === true) {
        //     return <Redirect to="/timeline" />
        // } else 
        if (this.state.errorReason !== "") {
            return <h2>this.state.errorReason</h2>
        }
        else {
            return (
                <div>
                    <div className='space_between_lines'>
                        Edit Post
                <form onSubmit={(e) => this.handleEditFormSubmit(e)} className='space_between_lines'>
                            <label>Title:</label>
                            <input type='text' placeholder='title' id="title" onChange={(e) => this.handleInputData(e)} value={this.state.title} required /><br />
                            <label>Description:</label>
                            <input type='text' placeholder='description' id="description" onChange={(e) => this.handleInputData(e)} value={this.state.description} required /><br />
                            <label>Category:</label>
                            <input type='text' placeholder='category' id="category" onChange={(e) => this.handleInputData(e)} value={this.state.category} required /><br />

                            <input type='submit' value="Save" />
                        </form>
                        {/* {this.state.submitted ? <h2>Submitted</h2> : <></>} */}
                        <button onClick={this.props.onEditPost}>Cancel</button>
                    </div>
                </div>
            )
        }
    }
}

export default PostEditForm
