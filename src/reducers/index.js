import {
    REGISTER_USER_START,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    HANDLE_REGISTER_CHANGES,
    HANDLE_LOGIN_CHANGES,
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT,
    GET_TRIPS_START,
    GET_TRIPS_SUCCESS,
    GET_TRIPS_FAIL,
    GET_USER_START,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    TOGGLE_EDIT_USER,
    HANDLE_EDIT_USER_CHANGES,
    EDIT_USER_START,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAIL,
    TOGGLE_ADDING_TRIP,
    HANDLE_ADD_TRIP_CHANGES,
    ADD_TRIP_START,
    ADD_TRIP_SUCCESS,
    ADD_TRIP_FAIL,
    DELETE_TRIP_START,
    DELETE_TRIP_SUCCESS,
    DELETE_TRIP_FAIL,
    EDIT_TRIP_START,
    EDIT_TRIP_SUCCESS,
    EDIT_TRIP_FAIL,
    TOGGLE_EDIT_TRIP
} from '../actions'

const emptyNewUser = {
    name: '',
    username: '',
    password: '',
    pw2: '',
    age: '',
    title: '',
    careerLength: '',
    tagline: ''
}

const emptyNewTrip = {
    title: '',
    description: '',
    designation: 'Professional',
    type: '',
    duration: '',
    img_url: ''
}

const initialState = {
    isRegistering: false,
    isLoggingIn: false,
    newUser: emptyNewUser,
    user: {
        username: '',
        password: ''
    },
    isLoggedIn: false,
    fetchingTrips: false,
    trips: [],
    loggedInUser: {},
    isEditingUser: false,
    isAddingTrip: false,
    newTrip: emptyNewTrip,
    isEditingTrip: false,
    savingUserChanges: false,
    error: '',
    savingTripEdits: false
};

const reducer = (state = initialState, action) =>{
    switch(action.type) {
        case HANDLE_REGISTER_CHANGES:
            return {
                ...state,
                newUser: {
                    ...state.newUser,
                    [action.payload.target.name]: action.payload.target.value
                }
            }
        case HANDLE_LOGIN_CHANGES:
            return {
                ...state,
                user: {
                    ...state.user,
                    [action.payload.target.name]: action.payload.target.value
                }
            }
        case HANDLE_EDIT_USER_CHANGES:
            return {
                ...state,
                loggedInUser: {
                    ...state.loggedInUser,
                    [action.payload.target.name]: action.payload.target.value
                }
            }
        case HANDLE_ADD_TRIP_CHANGES:
            return {
                ...state,
                newTrip: {
                    ...state.newTrip,
                    [action.payload.target.name]: action.payload.target.value
                }
            }
        case REGISTER_USER_START:
            return {
                ...state,
                isRegistering: true
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                isRegistering: false,
                isLoggedIn: true,
            }
        case REGISTER_USER_FAIL:
            return {
                ...state,
                isRegistering: false
            }
        case LOGIN_USER_START:
            return {
                ...state,
                isLoggingIn: true,
                error: ''
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                error: ''
            }
        case LOGIN_USER_FAIL:
            return {
                ...state,
                isLoggingIn: false,
                error: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                newUser: emptyNewUser,
                user: {
                    username: '',
                    password: ''
                },
                trips: []
            }
        case GET_TRIPS_START:
            return {
                ...state,
                fetchingTrips: true
            }
        case GET_TRIPS_SUCCESS: 
            return {
                ...state,
                trips: action.payload,
                fetchingTrips: false,
                isEditingTrip: false
            }
        case GET_TRIPS_FAIL:
            return {
                ...state,
                fetchingTrips: false

            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                loggedInUser: action.payload,
                isEditingUser: false
            }
        case TOGGLE_EDIT_USER:
            return {
                ...state,
                isEditingUser: !state.isEditingUser,
                isAddingTrip: false,
                isEditingTrip: false
            }
        case EDIT_USER_START:
            return {
                ...state,
                savingUserChanges: true
            }
        case EDIT_USER_SUCCESS:
            return {
                ...state,
                loggedInUser: action.payload,
                isEditingUser: false,
                savingUserChanges: false
            }
        case TOGGLE_ADDING_TRIP:
            return {
                ...state,
                isAddingTrip: !state.isAddingTrip,
                newTrip: emptyNewTrip,
                isEditingUser: false
            }
        case ADD_TRIP_SUCCESS:
            return {
                ...state,
                trips: action.payload,
                isAddingTrip: false,
                newTrip: emptyNewTrip
            }
        case TOGGLE_EDIT_TRIP:
            return {
                ...state,
                isEditingTrip: !state.isEditingTrip,
                isEditingUser: false
            }
        case EDIT_TRIP_START:
            return {
                ...state,
                savingTripEdits: true
            }
        case EDIT_TRIP_SUCCESS:
            return {
                ...state,
                isEditingTrip: false,
                trips: action.payload,
                savingTripEdits: false
            }
        case EDIT_TRIP_FAIL:
            return {
                ...state,
                isEditingTrip: false,
                savingTripEdits: false
            }
        case DELETE_TRIP_SUCCESS:
            return {
                ...state,
                trips: action.payload
            }
        default:
            return state
    }
}

export default reducer