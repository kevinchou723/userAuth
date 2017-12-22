import React from 'react';
import { connect } from 'react-redux';
import { 
    checkIsUserAuthenticated,
    logoutUser
} from '../../actions/UserActions';

class ProfilePage extends React.Component {

    constructor(props){
        super(props);

        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLogoutClick(){
        this.props.logoutUser();
    }

    componentDidMount (){
        this.props.checkIsUserAuthenticated();
    }

    render() {
        const { firstname, email, isAuthenticated } = this.props;
        return isAuthenticated ? (
            <div className="mainWrapper">
                <div className="profileContainer">
                    <div className="profileWrapper">
                        <img className="profileImage" src="../profile-picture.png" />
                        <div className="profileMessage">Welcome {firstname}</div>
                        <div className="profileMessage">Your email is {email}</div>
                        <div className="logoutButton" onClick={this.handleLogoutClick}>Logout</div>
                    </div>
                </div>
            </div>
        ) : null;
    }
}
export default connect(state => ({
    isAuthenticated: state.user.get('isAuthenticated'),
    firstname: state.user.get('firstname'),
    email: state.user.get('email')
}), {
    checkIsUserAuthenticated,
    logoutUser
})(ProfilePage);