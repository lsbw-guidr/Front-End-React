import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getTrips, toggleEditTrip, editTrip, deleteTrip, getUser, toggleEditUser, handleEditUserChanges, editUser } from '../actions'
import Trip from '../components/Trip/Trip'
import Profile from '../components/Profile/Profile'
import logo from '../images/logo.png'

class SingleTripView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            trips: [],
            trip: {}
        }
    }
   

    componentDidMount() {
        this.onLoad();
        this.setState({
            trips: this.props.trips
        })
    }

    componentWillReceiveProps = newProps => {
        if (newProps.trips !== this.state.trips) {
            this.setState({
                trips: newProps.trips
            }, () => this.findTrip())
        }
    }

    onLoad = () => {
        const id = localStorage.getItem('userId');
        if (id) {
            this.props.getUser(id);
            this.props.getTrips(id);
        } 
    }

    findTrip = () => {
        const trip = this.state.trips.find(trip => this.props.match.params.id === `${trip.id}`)
        this.setState({trip})
    }

    handleEditUserSubmit = (e, user) => {
        e.preventDefault();
        this.props.editUser(user);
    }

    deleteTrip = (e, trip) => {
        e.preventDefault();
        if (window.confirm('Are you sure you want to delete this trip?')) {
            this.props.deleteTrip(trip);
            this.props.history.push('/trips');
        }
    }

    handleEditTripSubmit = (e, trip) => {
        e.preventDefault();
        this.props.editTrip(trip);
    }

    routeToTrips = e => {
        e.preventDefault();
        this.props.history.push('/trips')
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
        return (
            <>
                <Profile 
                    user={this.props.user} 
                    isEditingUser={this.props.isEditingUser}
                    toggleEditUser={this.props.toggleEditUser}
                    handleEditUserChanges={this.props.handleEditUserChanges}
                    handleEditUserSubmit={this.handleEditUserSubmit}
                    savingUserChanges={this.props.savingUserChanges}
                    
                />
                <Trip 
                    handleEditTripSubmit={this.handleEditTripSubmit} 
                    deleteTrip={this.deleteTrip} 
                    trip={this.state.trip}
                    isEditingTrip={this.props.isEditingTrip}
                    toggleEditTrip={this.props.toggleEditTrip}
                    routeToTrips={this.routeToTrips}
                    savingTripEdits={this.props.savingTripEdits}
                />
            </>
        )
    }
}

const mapStateToProps = state => ({
    trips: state.trips,
    user: state.loggedInUser,
    isEditingUser: state.isEditingUser,
    isEditingTrip: state.isEditingTrip,
    savingUserChanges: state.savingUserChanges,
    savingTripEdits: state.savingTripEdits
})

export default connect(mapStateToProps, { getUser, toggleEditTrip, editTrip, deleteTrip, getTrips, toggleEditUser, handleEditUserChanges, editUser })(SingleTripView)