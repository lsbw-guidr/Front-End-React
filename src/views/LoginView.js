import React from 'react';
import Login from '../components/Login/Login';
import { connect } from 'react-redux'


import { 
    registerUser, 
    handleRegisterChanges,
    handleLoginChanges,
    loginUser,
    logout
} from '../actions'

class LoginView extends React.Component {
    componentDidMount() {
        this.props.logout();
    }

    handleRegisterChanges = e => {
        this.props.handleRegisterChanges(e)
    }

    handleLoginChanges = e => {
        this.props.handleLoginChanges(e)
    }

    handleRegister = (e, newUser) => {
        e.preventDefault();
        if (newUser.password === newUser.pw2 && newUser.password.length > 7 && newUser.username.length > 2) {
            let regUser = {
                ...newUser, 
                age: parseInt(newUser.age)
            };
            delete regUser.pw2;
            this.props.registerUser(regUser)
        } else if (newUser.password !== newUser.pw2) {
            alert('Passwords do not match!');
        } else if (newUser.password.length < 8) {
            alert('Password is too short!');
        } else if (newUser.username.length < 3) {
            alert('Username must be at least 3 characters!');
        }
    }

    handleLogin = (e, username, password) => {
        e.preventDefault();
        this.props.loginUser(username, password);
    }

    render() {
        return ( 
            <Login 
                history={this.props.history} 
                isRegistering={this.props.isRegistering}
                isLoggingIn={this.props.isLoggingIn}
                handleRegister={this.handleRegister}
                handleLogin={this.handleLogin}
                handleRegisterChanges={this.handleRegisterChanges}
                handleLoginChanges={this.handleLoginChanges}
                newUser={this.props.newUser}
                user={this.props.user} 
                isLoggedIn={this.isLoggedIn} 
                error={this.props.error}
            />
        );
    } 
};

const mapStateToProps = state => ({
    isRegistering: state.isRegistering,
    isLoggingIn: state.isLoggingIn,
    newUser: state.newUser,
    user: state.user,
    isLoggedIn: state.isLoggedIn,
    error: state.error
})

export default connect(mapStateToProps, { registerUser, handleRegisterChanges, handleLoginChanges, loginUser, logout })(LoginView);