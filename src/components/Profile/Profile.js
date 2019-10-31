import React from 'react'
import Loader from 'react-loader-spinner'

import profilePic from '../../images/Allysia.png'
import './profile.css'


const Profile = props => {
    return (
        <>
        {!props.isEditingUser &&
            <div className='profile'>
                <div className='profile-container'>
                    <div className='profile-picture'>
                        <img className='profile-pic' src={profilePic} alt='profile-pic' />
                    </div>
                    <div className='profile-info'>
                        <div className='profile-header'>
                            <h2 className='trips-title'>{props.user.name}</h2>
                            <h4>{props.user.age} years old &middot; {props.user.title}</h4>
                        </div>
                        <h4>{props.user.careerLength} as a private and professional guide</h4>
                        <p>{props.user.tagline}</p>
                    </div>
                    <div className='edit-profile-btn'>
                        <button onClick={props.toggleEditUser}>&#9998;</button>
                    </div> 
                </div>
            </div>
        }
        {props.isEditingUser &&
            <div className='editing-user'>
                <form 
                    onSubmit={(e) => props.handleEditUserSubmit(e, props.user)} 
                    className='edit-user-form'
                >
                    <label htmlFor='name'>Name</label>
                    <input 
                        onChange={props.handleEditUserChanges} 
                        type='text' 
                        name='name' 
                        value={props.user.name} 
                    />
                    <label htmlFor='age'>Age</label>
                    <input 
                        onChange={props.handleEditUserChanges} 
                        type='number' 
                        name='age' 
                        value={props.user.age} 
                    />
                    <label htmlFor='title'>Title</label>
                    <input 
                        onChange={props.handleEditUserChanges}  
                        type='text' 
                        name='title' 
                        value={props.user.title} 
                    />
                    <label htmlFor='careerLength'>Career Length</label>
                    <input 
                        onChange={props.handleEditUserChanges} 
                        type='text' 
                        name='careerLength' 
                        value={props.user.careerLength} 
                    />
                    <label htmlFor='tagline'>Tagline</label>
                    <textarea 
                        onChange={props.handleEditUserChanges} 
                        name='tagline' 
                        value={props.user.tagline} 
                    />
                    <div className='save-changes'>
                        <button type="submit">Save Changes</button>
                        {props.savingUserChanges &&
                        <Loader type="Puff" color="purple" height={20} width={20}/>
                        }
                    </div>
                </form>
                
            </div>
        }
        </>
    );
}

export default Profile;