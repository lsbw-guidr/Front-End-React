import React from 'react'

const Landing = props => {
    return (
        <h1 onClick={() => props.history.push('/login')}>Click to go to Login Page</h1>
    )
}

export default Landing;