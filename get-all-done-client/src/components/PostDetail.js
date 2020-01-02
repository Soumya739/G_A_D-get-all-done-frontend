import React, { Component } from 'react'
// import { NavLink } from 'react-router-dom';
import PostEditForm from '../containers/PostEditForm'
import { api } from '../services/api'

export class PostDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: false,
            title: this.props.post.title,
            description: this.props.post.description,
            created_at: this.props.post.created_at,
            updated_at: this.props.post.updated_at,
            category: this.props.post.category.tag,
            id: this.props.post.id
        }
    }

    // let {post} = this.props
    onEditPost = () => {
        this.setState({ edit: !this.state.edit })
    }

    onUpdatePost = (data) => {
        this.setState({
            title: data.title,
            description: data.description,
            created_at: data.created_at,
            updated_at: data.updated_at,
            category: data.category.tag,
            id: data.id,
            deleted: false
        })
    }
    handleDeletePost = () => {
        api.posts.deletePost(this.state.id)
            .then((r) => {
                this.setState({
                    deleted: true
                })
            })
    }

    render() {
        let { title, description, created_at, updated_at, category, deleted } = this.state
        if (!deleted) {
            if (this.state.edit) {
                return (
                    <div>
                        <PostEditForm post={this.state} onEditPost={this.onEditPost} onUpdatePost={this.onUpdatePost} />
                    </div>
                )
            }
            return (
                <div>
                    Title: {title}<br />
                    Description: {description}<br />
                    Categories: {category}<br />
                    Created: {created_at}<br />
                    Updated: {updated_at}<br />
                    <button onClick={this.onEditPost}>Edit</button>
                    <button onClick={this.handleDeletePost}>Delete</button>
                </div>
            )
        } else {
            return (
                <div>DELETED</div>
            )
        }
    }
}

export default PostDetail
