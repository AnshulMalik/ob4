import React from 'react';
import {withRouter} from 'react-router';
import Notifications, { notify } from 'react-notify-toast';
import EasyTransition from 'react-easy-transition';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import GoogleLogin from 'react-google-login';
import AltContainer from 'alt-container';
import NProgress from 'nprogress-npm';

import UserActions from '../Actions/UserActions';
import UserStore from '../Stores/UserStore';
import APIService from '../Services/APIService';
import Level from '../Components/Level.react';
import Sidebar from '../Components/Sidebar.react';
import Footer from '../Components/Footer.react';

var LandingPage = React.createClass({

    responseGoogle(response) {
        console.log(response);
        let idToken = response.Zi.id_token;
        let email = response.profileObj.email;

        if(!email) {
            NProgress.show('Please allow all the required permissions.', 'warning', 2000);
            return ;
        }

        APIService.login({
            'id_token': idToken
        }).then((resp) => {
            console.log(resp);
                resp.json().then((body) => {
                    if(resp.status === 200) {
                        console.log(body);
                        UserActions.saveUser(body);
                        console.log('redirecting to dashboard');
                        this.props.router.push('/dashboard');
                        NProgress.done();
                    }
                    else {
                        console.log('redirecting to signup');
                        UserActions.saveSignupData({id_token: idToken, email: email});
                        this.props.router.push('/signup');
                    }

                    NProgress.done();
                })
        }).catch((err) => {
            console.log(err);
            NProgress.done();
        });
    },

    render() {
        return (
            <div>
                <Notifications />
                <AltContainer stores = {{ User: UserStore }}>
                    <Sidebar />
                </AltContainer>
                <div id="wrapper">
                    <AltContainer stores = {{User: UserStore }}>
                        { this.props.children ? (
                            this.props.children
                        ) : (
                            <div>
                                <header id="home">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <img id="anonimg" className="img-responsive" src="/resources/img/anonymous_mask1600.png"  alt="anon" />
                                                <div className="intro-text">
                                                    <span className="name">ObscurA 4.0</span>
                                                    <hr className="star-light" />
                                                    <span className="skills">An online crypt hunt</span><br />
                                                    <GoogleLogin
                                                        clientId="679139204576-92doaqm03ubptl267md0o897rh7s9llu.apps.googleusercontent.com"
                                                        buttonText="Lets go !!!"
                                                        className="btn-lg btn-outline"
                                                        onSuccess={this.responseGoogle}
                                                        onFailure={this.responseGoogle}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </header>

                                <section id="about-us">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-12 text-center">
                                                <h2>About Us</h2>
                                                <hr className="star-primary" />
                                            </div>
                                        </div>
                                        <div className="row">

                                            <div className="col-xs-8 portfolio-item" style={{ left: "calc(33%/2)" }}>

                                                <p>
                                                    One of the most happening and fun crypt hunts of this year is ObscurA 4.0. ObscurA is derived from the word "Obscure" which means "keep from being seen; conceal",
                                                    and that is what we do. We allow you to use any means at your disposal (that includes google) to crack the questions we pose to you,
                                                    with special prizes for cracking some specific questions, BUT there is a catch. Our questions are not straightforward,
                                                    most of them are based on wordplay, cyphers and lateral thinking (among other things).
                                                    So put on your thinking caps, flex your fingers and get ready for a race to decide who will crack the last question first and will be the winner of Obscura 4.0. Happy hunting!!..
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                </section>


                                <section className="success" id="rules">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-12 text-center">
                                                <h2>Rules</h2>
                                                <hr className="star-light" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-8" style={{ left: "calc(33%/2)" }}>
                                                <ul>
                                                    <li><p>All the answers are in lowercase</p></li>
                                                    <li><p>Nothing is obvious at Obscura. So open the flaps and think out of the box.</p></li>
                                                    <li><p>We can help you, if you are polite enough to ask for it. Don't go around pestering us for hints.</p></li>
                                                    <li><p>Googlebaba knows it all</p></li>
                                                    <li><p>Begin to love surfing. Oh, did we forget to tell we love Wikipedia and tineye.com a lot?</p></li>
                                                    <li><p>Finding the answer is not the final solution.</p></li>
                                                    <li><p>There is no space in any answer</p></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                            </div>
                        )}

                    </AltContainer>
                </div>
                <Footer />
            </div>
        );
    }
});


module.exports = withRouter(LandingPage);
/*

                    <RouteTransition
                        pathname={this.props.location.pathname}
                        atEnter={{ translateX: 100 }}
                        atLeave={{ translateX: -100 }}
                        atActive={{ translateX: 0 }}
                        mapStyles={styles => ({ transform: `translateX(${styles.translateX}%)` })}
                        >
                        {this.props.children}
                    </RouteTransition>
*/
