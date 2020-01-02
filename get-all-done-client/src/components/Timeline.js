import React, { Component } from 'react'
import PostDetail from './PostDetail'
import { api } from '../services/api'



export class Timeline extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            error: false,
        }
    }
    componentDidMount() {
        api.posts.fetchPosts().then(res => {
            if (!res.error) {
                this.setState({ posts: res })
            } else {
                this.setState({ error: true });
            }
        })
    }
    getAllPostsOfCurrentUser = () => {
        return this.state.posts.map((post) => {
            return <><PostDetail post={post} key={post.id} /><br /> </>
        })
    }

    render() {
        return (
            <div>
                Timeline Page
                {this.getAllPostsOfCurrentUser()}
            </div>
        )
    }
}

export default Timeline
