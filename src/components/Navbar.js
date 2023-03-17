import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../actions/auth';
import { searchUsers } from '../actions/search';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      userslist: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.results !== this.props.results) {
      this.setState({ userslist: this.props.results });
    }
  }
  componentDidMount() {
    this.setState({ userslist: this.props.results });
  }

  //added a state and made it controlled
  handleSearch = (e) => {
    this.setState({ searchText: e.target.value });
    this.props.dispatch(searchUsers(this.state.searchText));
  };
  logOut = () => {
    localStorage.removeItem('token');
    this.props.dispatch(logoutUser());
  };

  render() {
    //removed results from here created a state for usersList
    const { auth } = this.props;
    return (
      <nav className="nav">
        <div className="left-div">
          <Link to="/">
            <img
              src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="search-container">
          <img
            className="search-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png"
            alt="search-icon"
          />
          <input
            placeholder="Search"
            value={this.state.searchText}
            onChange={this.handleSearch}
          />

          {this.state.userslist.length > 0 && (
            <div className="search-results">
              <ul>
                {this.state.userslist.map((user) => (
                  <li className="search-results-row" key={user._id}>
                    {/* add onClick event */}
                    <Link
                      to={`/user/${user._id}`}
                      onClick={() => {
                        this.setState({ searchText: '' });
                        this.setState({ userslist: [] });
                      }}
                    >
                      <img
src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
alt="user-dp"
                      />
                      <span>{user.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="right-nav">
          {auth.isLoggedin && (
            <div className="user">
              <Link to="/settings">
                <img

src="https://www.stylist.co.uk/images/app/uploads/2019/09/17165121/gettyimages-143479992-crop-1568735528-1000x1000.jpg?w=1200&h=1&fit=max&auto=format%2Ccompress"
alt="user-dp"
                  id="user-dp"
                />
              </Link>
              <span>{auth.user.name}</span>
            </div>
          )}

          <div className="nav-links">
            <ul>
              {!auth.isLoggedin && (
                <li>
                  <Link to="/login">Log in</Link>
                </li>
              )}

              {auth.isLoggedin && <li onClick={this.logOut}>Log out</li>}

              {!auth.isLoggedin && (
                <li>
                  <Link to="/signup">Register</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    results: state.search.results,
  };
}
export default connect(mapStateToProps)(Navbar);
