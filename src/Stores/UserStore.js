import React from 'react';
import { browserHistory } from 'react-router';
import { notify } from 'react-notify-toast';
import NProgress from 'nprogress-npm';

import UserActions from '../Actions/UserActions';
import APIService from '../Services/APIService';
import alt from '../alt';

class UserStore {
    constructor() {
        this.flashMessage = "";
        this.isLoading = false;
        this.user = null;
        this.levelUrl = null;
        this.signupData = {};
        this.bindListeners({
            handleLogin: UserActions.LOGIN,
            saveUser: UserActions.SAVE_USER,
            saveSignupData: UserActions.SAVE_SIGNUP_DATA,
            handleLogout: UserActions.LOGOUT,
            handleSignup: UserActions.SIGNUP,
            submitAnswer: UserActions.SUBMIT_ANSWER,
        });
        if(localStorage.getItem('user'))
            this.user = JSON.parse(localStorage.getItem('user'));
    }

    handleLogin(data) {
        data.type = 0;
        APIService.login(data).then(response => {
            response.json().then(data => {
                this.setState({user: data, level: data.level, parentLevel: data.parentLevel});
                notify.show("Login successful", 'success', 2000);
                localStorage.setItem('user', JSON.stringify(data));

                NProgress.done();
            });
        }).catch(error => {
            console.log(error);
            notify.show(error);
            NProgress.done();
        })
    }

    handleSignup(data) {
        console.log(data);
        APIService.signup(data).then(response => {
            response.json().then((data) => {
                console.log(data);
                if(response.status === 200){
                    notify.show("Signup successful", 'success', 2000);
                    localStorage.setItem('user', JSON.stringify(data));
                    this.setState({user: data});
                }
                else {
                    notify.show(data.message, 'warning', 2000);
                }
                NProgress.done();
            });
        }).catch(error => {
            console.log(error);
            notify.show("Something went horribly wrong, please contact admin.");
            NProgress.done();
        })

    }

    handleLogout() {
        localStorage.removeItem('user');
        this.setState({user: null});
        notify.show('Logout successful', 'success', 2000);
    }

    submitAnswer(data) {
        APIService.submitAnswer(data).then(response => {
            response.json().then(resp => {
                if(resp.status === 'accepted') {
                    notify.show('Correct Answer', 'success', 2000);
                    if(resp.max != this.user.level) {
                        // This question was first solved
                        let user = this.user;
                        user.level = resp.max;
                        localStorage.setItem('user', JSON.stringify(user));
                        this.setState({ user: user });
                    }

                    browserHistory.pushState(this, '/level/' + resp.next);
                }
                else {
                    console.log('Incorrect answer');
                    notify.show('Incorrect answer!', 'warning', 2000);
                }
                NProgress.done();
            })
        }).catch(error => {
            notify.show('Something went wrong', 'warning', 2000);
            NProgress.done();
        });
    }

    saveSignupData(data) {
        this.setState({ signupData : data});
    }

    saveUser(userData) {
        this.setState({ user: userData });
        localStorage.setItem('user', JSON.stringify(userData));
    }
}

module.exports = alt.createStore(UserStore, 'UserStore');
