import React from 'react';
import { withRouter } from 'react-router';
import UserActions from '../Actions/UserActions';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {spring} from 'react-motion';
import Transition from 'react-motion-ui-pack';

var LoginPage = React.createClass({
    onLogin(event) {
        event.preventDefault();
        let email = event.target.children[0].value;
        let pass = event.target.children[1].value;
        
        UserActions.formLogin({email: email, password: pass});
    },

    handleFacebookResponse(response) {
        if(response.accessToken) {
            UserActions.fbLogin({name: response.name, email: response.email, accessToken : response.accessToken, uid: response.userID});
        }
    },

    handleGoogleResponse(response) {
        if(response.googleID) {
            const uid = response.googleID;
            const name = response.profileDetail.ig;
            const email = response.profileDetail.U3;
            const accessToken = response.tokenDetail.access_token;
            UserActions.gLogin({name : name, email: email, accessToken: accessToken, uid: uid});
        }
    },

    componentWillMount() {
        if(this.props.User.user) {
            this.props.router.push('/dashboard');
        }
    },
    componentWillReceiveProps(nextProps) {
        if(this.props.User.user || nextProps.User.user) {
            this.props.router.push('/dashboard');
        }
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
                <section id="signIn" class="wrapper fullscreen style1 ">
                    <div class="inner">
                        
                        <div id="" class="w3-container">
                        <center>
                            <div class="w3-border  w3-third" style={{'padding-top': '10%'}}>
                                <center style={{'border': '1px solid white', 'width': '350px', 'backgroundColor': 'rgba(6, 6, 6, 0.93)'}}><br />
                                    <h2>Obscura 3.5</h2>	
                                    <h5>Sign In with</h5>					
                                
                                    <FacebookLogin
                                        appId="1171065776241595"
                                        autoLoad={true}
                                        fields="name,email,picture"
                                        textButton="Facebook"
                                        callback={this.handleFacebookResponse}
                                        cssClass="w3-margin w3-indigo  btn btn-primary"
                                        icon="fa-facebook" 
                                    />
                                    or
                                    <GoogleLogin
                                        clientId="679139204576-92doaqm03ubptl267md0o897rh7s9llu.apps.googleusercontent.com"
                                        callback={this.handleGoogleResponse}
                                        cssClass="w3-margin w3-red btn btn-primary"
                                        offline={false}
                                        >
                                        <i className="fa fa-google"></i> 
                                        <span>&nbsp; Google</span>
                                    </GoogleLogin>                          
                                    
                                    <hr style={{width: '65%'}}/>
                                    <h3>Use mozilla firefox instead of chrome</h3>
                                    <form className="w3-container" onSubmit={this.onLogin}>
                                        <input id="inputEnter" className="w3-input w3-margin" placeholder="Email Id*"  type="text" />       	    	    
                                        <input id="inputEnter" className="w3-input " placeholder="Password*"  type="password" />                  		      	   
                                        <br />
                                        <br />
                                        <button type="submit" className="w3-margin  btn btn-primary">Login</button>
                                    </form>	
                                </center>
                            </div>
                        </center>


                        </div>
                    </div>
            </section>
        </Transition>
        );
    }
});


module.exports = withRouter(LoginPage);