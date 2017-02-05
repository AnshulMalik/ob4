import React from 'react';
import { withRouter } from 'react-router';
import UserActions from '../Actions/UserActions';
import {spring} from 'react-motion';
import Transition from 'react-motion-ui-pack';

var SignupPage = React.createClass({
    componentWillMount() {
        if(this.props.User.user) {
            this.props.router.push('/dashboard');
        }
    },

    componentWillReceiveProps(newProps) {
        if(newProps.User.user) {
            this.props.router.push('/dashboard');
        }
    },

    handleSignup(event) {
        event.preventDefault();
        const form = event.target.children[1].children[4].children;
        const data ={
            name: form[0].value,
            phone: form[2].value,
            college: form[3].value,
            email: this.props.User.signupData.email,
            id_token: this.props.User.signupData.id_token
            };

        console.log(data);
        UserActions.signup(data);
    },

    render() {
        return (
            <Transition
                component={false} // don't use a wrapping component
                measure={false} // don't measure component
                enter={{
                    opacity: 1,
                    translateX: spring(0, {stiffness: 150, damping: 10})
                }}
                leave={{
                    opacity: 0,
                    translateX: 150
                }}
                >
                <section className="container">
                    <form id="FormSignUp" className="w3-border" onSubmit={this.handleSignup}>
                        <br />
                        <center>
                            <h3>SignUp</h3>
                            <hr style={{width: '80%'}} className="align-right" />
                            <p><strong>NOTE:</strong> Please fill authentic details, so that we may to contact you.</p>
                            <hr style={{width: '80%'}} className="align-right" />

                            <div className="col-xs-6" style={{ left: "calc(50%/2)"}}>
                                <input className="form-control" placeholder="Name*" type="text" pattern="[a-zA-Z| ]{5,30}" required/>
                                <input className="form-control" placeholder="Email Id*"  type="email" value={this.props.User.signupData.email} disabled/>
                                <input className="form-control" placeholder="Phone No.*" pattern="[0-9]{10,15}" required/>
                                <input className="form-control" placeholder="College *"  type="text" required/>
                                <br />

                                <button type="submit" className="btn btn-primary">Signup</button><br />
                            </div>

                        </center>
                    </form>
                </section>
        </Transition>
        );
    }
});


module.exports = withRouter(SignupPage);
