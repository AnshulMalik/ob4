import React from 'react';
import { withRouter } from 'react-router';
import UserActions from '../Actions/UserActions';

var Logout = React.createClass({
    componentWillMount() {
        if(this.props.User.user) {
            UserActions.logout();
        }
        var obj = this;
        setTimeout(function() {
            obj.props.router.push('/');
        }, 1000);
    },
    render() {

        return (
            <center>
               <h2>Logged out successfully</h2>
            </center>
        );
    }
});

module.exports = withRouter(Logout);
