import React, { Component } from 'react'
// import { NavLink } from 'react-router-dom';

export class PostEditForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.post.title,
            discription: this.props.post.discription
        }
    }

    handleInputData = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleEditFormSubmit = (e) => {
        e.preventDefault()
        // fetch(POSTS_URL + '/' + post.id, {
        //     method: 'PUT',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       Accept: 'application/json'
        //     },
        //     body: JSON.stringify(post)
        //   })

    }

    render() {
        return (
            <div>
                <div className='space_between_lines'>
                    Edit Post
                <form onSubmit={(e) => this.handleEditFormSubmit(e)} className='space_between_lines'>
                        <label>Title:</label>
                        <input type='text' placeholder='title' id="title" onChange={(e) => this.handleInputData(e)} value={this.state.title} required /><br />
                        <label>Discription:</label>
                        <input type='text' placeholder='discription' id="discription" onChange={(e) => this.handleInputData(e)} value={this.state.discription} required /><br />

                        <input type='submit' value="Save" />
                    </form>
                    {/* {this.state.submitted ? <h2>Submitted</h2> : <></>} */}
                    <button onClick={this.props.onEditPost}>Cancel</button>
                </div>
            </div>
        )
    }
}

export default PostEditForm
