// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { fetchUserProfile } from '../actions/profile';
// import { APIUrls } from '../helpers/urls';
// import { getAuthTokenFromLocalStorage } from '../helpers/utils';
// import { addFriend, removeFriend } from '../actions/friends';

// class UserProfile extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       success: null,
//       error: null,
//       successMessage: null,
//     };
//   }
//   componentDidMount() {
//     const { match } = this.props;

//     if (match.params.userId) {
//       // dispatch an action
//       this.props.dispatch(fetchUserProfile(match.params.userId));
//     }
//   }

//   componentDidUpdate(prevProps) {
//     const {
//       match: { params: prevParams },
//     } = prevProps;

//     const {
//       match: { params: currentParams },
//     } = this.props;

//     if (
//       prevParams &&
//       currentParams &&
//       prevParams.userId !== currentParams.userId
//     ) {
//       this.props.dispatch(fetchUserProfile(currentParams.userId));
//     }
//   }

//   checkIfUserIsAFriend = () => {
//     console.log('this.props', this.props);
//     const { match, friends } = this.props;
//     const userId = match.params.userId;

//     const index = friends.map((friend) => friend.to_user._id).indexOf(userId);

//     if (index !== -1) {
//       return true;
//     }

//     return false;
//   };

//   handleAddFriendClick = async () => {
//     const userId = this.props.match.params.userId;
//     const url = APIUrls.addFriend(userId);

//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
//       },
//     };

//     const response = await fetch(url, options);
//     const data = await response.json();

//     if (data.success) {
//       this.setState({
//         success: true,
//         successMessage: 'Added friend successfully!',
//       });

//       this.props.dispatch(addFriend(data.data.friendship));
//     } else {
//       this.setState({
//         success: null,
//         error: data.message,
//       });
//     }
//   };

//   handleRemoveFriendClick = async () => {
//     // Mini Assignment
//     const { match } = this.props;
//     const url = APIUrls.removeFriend(match.params.userId);

//     const extra = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
//       },
//     };

//     const response = await fetch(url, extra);
//     const data = await response.json();
//     console.log('await data', data);

//     if (data.success) {
//       // show user message
//       this.setState({
//         success: true,
//         successMessage: 'Removed friends successfully!',
//       });
//       this.props.dispatch(removeFriend(match.params.userId));
//     } else {
//       this.setState({
//         success: null,
//         error: data.message,
//       });
//     }
//   };

//   render() {
//     const {
//       match: { params },
//       profile,
//     } = this.props;
//     console.log('this.props', params);
//     const user = profile.user;

//     if (profile.inProgress) {
//       return <h1>Loading!</h1>;
//     }

//     const isUserAFriend = this.checkIfUserIsAFriend();
//     const { success, error, successMessage } = this.state;
//     return (
//       <div className="settings">
//         <div className="img-container">
//           <img
//             src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
//             alt="user-dp"
//           />
//         </div>

//         <div className="field">
//           <div className="field-label">Name</div>
//           <div className="field-value">{user.name}</div>
//         </div>

//         <div className="field">
//           <div className="field-label">Email</div>
//           <div className="field-value">{user.email}</div>
//         </div>

//         <div className="btn-grp">
//           {!isUserAFriend ? (
//             <button
//               className="button save-btn"
//               onClick={this.handleAddFriendClick}
//             >
//               Add Friend
//             </button>
//           ) : (
//             <button
//               className="button save-btn"
//               onClick={this.handleRemoveFriendClick}
//             >
//               Remove Friend
//             </button>
//           )}

//           {success && (
//             <div className="alert success-dailog">{successMessage}</div>
//           )}
//           {error && <div className="alert error-dailog">{error}</div>}
//         </div>
//       </div>
//     );
//   }
// }

// function mapStateToProps({ profile, friends }) {
//   return {
//     profile,
//     friends,
//   };
// }
// export default connect(mapStateToProps)(UserProfile);
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { addFriend, removeFriend } from '../actions/friends';
import { fetchUserProfile } from '../actions/profile';
import { connect } from 'react-redux';

// react-router-dom v6
//If using RRDv6 then there is no match prop. Gone are the route props. Here only the useParams and other //hooks exist, so use them.

const UserProfile = (props) => {
  console.log(props);
  let [success, setSuccess] = useState(null);
  let [error, setError] = useState(null);
  let [successMessage, setSuccessMessage] = useState(null);

  const id = useParams().userId;
  useEffect(() => {
    if (id) {
      // dispatch an action
      props.dispatch(fetchUserProfile(id));
    }
  }, [id]);

  const { profile } = props;
  const user = profile.user;

  const checkIfUserIsAFriend = () => {
    const { friends } = props;
    const index = friends.map((friend) => friend.to_user._id).indexOf(id);
    if (index !== -1) {
      return true;
    }
    return false;
  };

  const handleAddFriendClick = async () => {
    const url = APIUrls.addFriend(id);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();

    console.log(data);
    if (data.success) {
      setSuccess(true);
      setSuccessMessage('Added friend successfully!');
      props.dispatch(addFriend(data.data.friendship));
    } else {
      setSuccess(false);
      setError(data.message);
    }
  };

  const handleRemoveFriendClick = async () => {
    const url = APIUrls.removeFriend(id);

    const extra = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };
    const response = await fetch(url, extra);
    const data = await response.json();
    console.log('await data', data);

    if (data.success) {
      // show user message

      setSuccess(true);
      setSuccessMessage('Removed friends successfully!');
      props.dispatch(removeFriend(id));
    } else {
      setSuccess(null);
      setError(data.message);
    }
  };

  return (
    <div className="settings">
      <div className="img-container">
        <img
          src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
          
          alt="user-dp"
        />
      </div>
      <div className="field">
        <div className="field-label">Name</div>
        <div className="field-value">{user.name}</div>
      </div>
      <div className="field">
        <div className="field-label">Email</div>
        <div className="field-value">{user.email}</div>
      </div>
      <div className="btn-grp">
        {!checkIfUserIsAFriend() ? (
          <button
            className="button save-btn"
            onClick={() => handleAddFriendClick()}
          >
            Add Friend
          </button>
        ) : (
          <button
            className="button save-btn"
            onClick={() => handleRemoveFriendClick()}
          >
            Remove Friend
          </button>
        )}
        {success && (
          <div className="alert success-dailog">{successMessage}</div>
        )}
        {error && <div className="alert error-dailog">{error}</div>}
      </div>
    </div>
  );
};

function mapStateToProps({ profile, friends }) {
  return {
    profile,
    friends,
  };
}
export default connect(mapStateToProps)(UserProfile);
