import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { 
    getTrips, 
    getUser, 
    toggleEditUser, 
    handleEditUserChanges, 
    editUser,
    toggleAddingTrip,
    handleAddTripChanges,
    addTrip   
} from '../actions'
import TripsList from '../components/TripsList/TripsList'
import logo from '../images/logo.png'

class TripsView extends React.Component {
    componentDidMount() {
        const id = localStorage.getItem('userId');
        if (id) {
            this.props.getUser(id);
            this.props.getTrips(id);
        }
    }

    toggleEditUser = () => {
        this.props.toggleEditUser();
    }

    handleEditUserSubmit = (e, user) => {
        e.preventDefault();
        this.props.editUser(user);
    }

    handleAddTrip = (e, trip) => {
        e.preventDefault();
        this.props.addTrip(trip);
    }

    render() {
        if (!localStorage.getItem('token')) {
            return (
                <div className='please-login'>
                    <img src={logo} alt='main-logo' />
                    <h2>Please Log In.</h2>
                    <Link className='login-btn' to='/login'>
                        <button>Login</button>
                    </Link>
                </div>
            )
        }
        if (this.props.trips) {
            return (
                <TripsList 
                    toggleEditUser={this.toggleEditUser} 
                    user={this.props.user} 
                    trips={this.props.trips}
                    isEditingUser={this.props.isEditingUser}
                    handleEditUserChanges={this.props.handleEditUserChanges}
                    handleEditUserSubmit={this.handleEditUserSubmit}
                    toggleAddingTrip={this.props.toggleAddingTrip}
                    isAddingTrip={this.props.isAddingTrip}
                    handleAddTripChanges={this.props.handleAddTripChanges}
                    newTrip={this.props.newTrip}
                    handleAddTrip={this.handleAddTrip}
                    savingUserChanges={this.props.savingUserChanges}
                />
            );
        } else {
            return (
                <div className='no-trips'>
                    <h2>There are no trips for this guide.  Why not start adding some?</h2>
                </div>
                
            )
        }
    }
}

const mapStateToProps = state => ({
    trips: state.trips,
    user: state.loggedInUser,
    isEditingUser: state.isEditingUser,
    isAddingTrip: state.isAddingTrip,
    newTrip: state.newTrip,
    savingUserChanges: state.savingUserChanges
})

export default connect(mapStateToProps, { getTrips, addTrip, handleAddTripChanges, toggleAddingTrip, editUser, getUser, toggleEditUser, handleEditUserChanges })(TripsView);