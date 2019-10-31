import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import LoginView from './views/LoginView';
import TripsView from './views/TripsView';
import Landing from './views/Landing';
import SingleTripView from './views/SingleTripView';
import { logout } from './actions';
import Header from './components/Header/Header';

import './App.css';

class App extends Component {
  componentWillReceiveProps = newProps => {
    if(newProps.isLoggedIn !== this.props.isLoggedIn){
      this.props.history.push('/trips');
    }
  }

  render() {
    return (
      <div className="App">
        {localStorage.getItem('token') &&
          <Header logout={this.props.logout}/>
        }
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' component={LoginView} />
        <Route exact path='/trips' component={TripsView} />
        <Route path='/trips/:id' component={SingleTripView} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
})


export default withRouter(connect(mapStateToProps, { logout })(App));
