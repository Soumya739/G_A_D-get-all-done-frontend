import React, { Component } from 'react'
import PostDetail from './PostDetail'

export class Timeline extends Component {
    // let {posts} = this.props
    getAllPostsOfCurrentUser = () => {
        let { posts } = this.props
        console.log(posts)
        return posts.map((post) => {
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
