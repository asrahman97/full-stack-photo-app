import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditPostForm from './editPost';

class Post extends Component {
  constructor(props) {
    super(props)

    this.state = {
      post: null,
      postId: null,
      editing: false
    }
  }

  componentDidMount = async () => {
    const post = await this.props.getPost(this.props.match.params.id);
    const postId = this.props.match.params.id;
    this.setState({
      post,
      postId
    })
  }

  setPost = (newPost) => {
    this.setState({
      post: newPost,
      editing: false
    })
  }

  editForm = (e) => {
    e.preventDefault();
    this.setState({
      editing: true
    })
  }

  reset = () => {
    this.setState({
      post: null,
      postId: null,
      editing: false
    })
  }

  render() {
    return (
      <div>
        {this.state.post &&
          <div>
            <h4>
              {this.state.post.username}
            </h4>
            <img src={this.state.post.image_url} />
            <p>
              {this.state.post.caption}
            </p>
            <p>
              Location: {this.state.post.location}
            </p>
            {this.props.currentUser
              ?
              <div>
                <Link to='/'>
                  <button onClick={(e) => {
                    this.props.deletePost(e, this.state.postId);
                    this.reset();
                  }
                  }>
                    Delete
                  </button>
                </Link>
                <button onClick={(e) => this.editForm(e)}>
                  Edit
                </button>
                {this.state.editing &&
                  <EditPostForm
                    editPost={this.props.editPost}
                    postId={this.props.match.params.id}
                    posts={this.props.posts}
                    setPost={this.setPost}
                  />
                }
              </div>
              :
              <p>You must login to edit posts!</p>
            }
          </div>
        }
      </div>
    )
  }
}

export default Post; 