import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';

import Profile from '../Profile/Profile'
import AddTripForm from './AddTripForm'

import './tripsList.css'

const TripsList = props => {
    console.log(props);
    return (
        <>
            <Profile 
                user={props.user} 
                isEditingUser={props.isEditingUser}
                toggleEditUser={props.toggleEditUser}
                handleEditUserChanges={props.handleEditUserChanges}
                handleEditUserSubmit={props.handleEditUserSubmit}
                savingUserChanges={props.savingUserChanges}
            />
            <div className='trips-list'>
                <div className='trips-list-header'>
                    <button className="toggler-btn" onClick={props.toggleAddingTrip}>
                        {props.isAddingTrip ? 'Cancel' : 'Add New Trip'}
                    </button>
                    {props.isAddingTrip &&
                        <AddTripForm 
                            newTrip={props.newTrip}
                            handleAddTripChanges={props.handleAddTripChanges}
                            handleAddTrip={props.handleAddTrip}    
                        />
                    }
                </div>
                
                {props.trips.length > 0 && !props.isAddingTrip &&
                    <table>
                        <tbody>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Duration</th>
                                <th>Thumbnail</th>
                                <th>Updated</th>
                                <th>Details</th>
                            </tr>
                            {props.trips.map(trip => 
                                    <tr key={trip.id}>
                                        <td><h5 className="trip-title">{trip.title}</h5></td>
                                        <td><h5 className='trip-description'>{trip.description}</h5></td>
                                        <td><h5 className='trip-duration'>{`${trip.duration} hour`}{Number(trip.duration) > 1 && 's'}</h5></td>
                                        <td><img src={trip.img_url} alt='trip-thumbnail' /></td>
                                        <td><h5 className='trip-updated-at'>{moment(trip.updated_at).fromNow()}</h5></td>
                                        <td><Link to={`/trips/${trip.id}`}><button className='view-details'>View Trip</button></Link></td>
                                    </tr>
                        )}
                        </tbody>
                    </table>
                }
                {!props.trips.length && !props.isAddingTrip &&
                    <div className='no-trips'>
                        <h2>There are no trips for this user.  Try adding some!</h2>
                    </div>
                }
             </div>
        </>
    );
}

export default TripsList