import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Comment } from './';
import { createComment, addLike } from '../actions/posts';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
    };
  }
  handleAddComment = (e) => {
    const { comment } = this.state;
    const { post } = this.props;

    if (e.key === 'Enter') {
      this.props.dispatch(createComment(comment, post._id));

      // clear comment
      this.setState({
        comment: '',
      });
    }
  };

  handleOnCommentChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };

  handlePostLike = () => {
    const { post, user } = this.props;
    this.props.dispatch(addLike(post._id, 'Post', user._id));
  };
  render() {
    const { post, user } = this.props;
    const { comment } = this.state;

    const isPostLikedByUser = post.likes.includes(user._id);

    return (
      <div className="post-wrapper" key={post._id}>
        <div className="post-header">
          <div className="post-avatar">
            <Link to={`/user/${post.user._id}`}>
              <img
                src="https://www.stylist.co.uk/images/app/uploads/2019/09/17165121/gettyimages-143479992-crop-1568735528-1000x1000.jpg?w=1200&h=1&fit=max&auto=format%2Ccompress"
                alt="user-pic"
              />
            </Link>
            <div>
              <span className="post-author">{post.user.name}</span>
              <span className="post-time">a minute ago</span>
            </div>
          </div>
          <div className="post-content">{post.content}</div>

          <div className="post-actions">
            <button className="post-like no-btn" onClick={this.handlePostLike}>
              {isPostLikedByUser ? (
                <img
                  src="https://www.kindpng.com/picc/m/21-210418_like-png-thumbs-up-emoji-messenger-transparent-png.png"
                  alt="like post"
                />
              ) : (
                <img
                  src="https://www.kindpng.com/picc/m/21-210418_like-png-thumbs-up-emoji-messenger-transparent-png.png"
                  alt="likes-icon"
                />
              )}
              <span>{post.likes.length}</span>
            </button>

            <div className="post-comments-icon">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4iuQT5qe0Wx4WtBQ72yQSZDfwJRh5ueUJs_f1jR-FEzpWRsLz__o4wNRZxkrQqBcnat0&usqp=CAU"
                alt="comments-icon"
              />
              <span>{post.comments.length}</span>
            </div>
          </div>
          <div className="post-comment-box">
            <input
              placeholder="Start typing a comment"
              onChange={this.handleOnCommentChange}
              onKeyPress={this.handleAddComment}
              value={comment}
            />
          </div>

          <div className="post-comments-list">
            {post.comments.map((comment) => (
              <Comment comment={comment} key={comment._id} postId={post._id} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}

export default connect(mapStateToProps)(Post);
