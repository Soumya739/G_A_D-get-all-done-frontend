import React, { Component } from 'react'
// import { NavLink } from 'react-router-dom';
import PostEditForm from '../containers/PostEditForm'

export class PostDetail extends Component {
    constructor() {
        super()
        this.state = {
            edit: false
        }
    }

    // let {post} = this.props
    onEditPost = () => {
        this.setState({ edit: !this.state.edit })
    }
    render() {
        let { title, description, created_at, updated_at, category } = this.props.post
        if (this.state.edit) {
            return (
                <div>
                    <PostEditForm post={this.props.post} onEditPost={this.onEditPost} />
                </div>
            )
        }
        return (
            <div>
                Title: {title}<br />
                Description: {description}<br />
                Categories: {category.tag}<br />
                Created: {created_at}<br />
                Updated: {updated_at}<br />
                <button onClick={this.onEditPost}>Edit</button>
                <button>Delete</button>
            </div>
        )
    }
}

export default PostDetail
