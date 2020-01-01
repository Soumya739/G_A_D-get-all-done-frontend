import React, { Component } from 'react'
import PostDetail from './PostDetail'

export class AllPosts extends Component {
    getAllPosts = () => {
        let { posts } = this.props
        console.log(posts)
        return posts.map((post) => {
            return <><PostDetail post={post} key={post.id} /><br /> </>
        })
    }
    render() {
        return (
            <div>
                {this.getAllPosts()}
            </div>
        )
    }
}

export default AllPosts
