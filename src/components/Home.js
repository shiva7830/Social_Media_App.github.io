import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PostsList, FriendsList, Chat } from './';

class Home extends Component {
  render() {
    console.log(this.props);
    const { posts, friends, isLoggedin } = this.props;
    return (
      <div className="home">
        <PostsList posts={posts} />
        {isLoggedin && <FriendsList friends={friends} />}
        {isLoggedin && <Chat />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedin: state.auth.isLoggedin,
    friends: state.friends,
  };
};
export default connect(mapStateToProps)(Home);
