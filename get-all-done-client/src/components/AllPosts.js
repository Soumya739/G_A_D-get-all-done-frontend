import React, { Component } from 'react'
import PostDetail from './PostDetail'
import { api } from '../services/api'

export class AllPosts extends Component {
    constructor() {
        super()
        this.state = {
            posts: []
        }
    }
    componentDidMount() {
        api.posts.fetchPosts().then(res => {
            if (!res.error) {
                this.setState({ posts: res })
            } else {
                return <h3>No posts to show</h3>
            }
        })
    }

    displayAllPosts = () => {

        return this.state.posts.map((post) => {
            return <><PostDetail post={post} key={post.id} /><br /> </>
        })
    }
    render() {
        return (
            <div>
                {this.displayAllPosts()}
            </div>
        )
    }
}

export default AllPosts
