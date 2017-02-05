import React from 'react';
import alt from '../alt';
import UserActions from '../Actions/UserActions';
import APIService from '../Services/APIService';
import { notify } from 'react-notify-toast';
import NProgress from 'nprogress-npm';

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
            updateLevel: UserActions.UPDATE_USER_CURRENT_LEVEL,
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
        notify.show("Logout successful", 'success', 2000);
    }

    submitAnswer(data) {
        APIService.submitAnswer(data).then(response => {
            response.json().then(resp => {
                if(resp.responseCode != 200) {
                    notify.show(resp.message, "warning", 2000);
                }
                else {
                    notify.show("Correct Answer", "success", 2000);
                    UserActions.updateUserCurrentLevel({level: resp.level, parentLevel: resp.plevel, url: resp.url})
                    window.location.pathname = '/level/'+ resp.url;
                }
                NProgress.done();
            })
        }).catch(error => {
            NProgress.done();
        });
    }

    updateLevel(data) {
        var tempuser = this.user;
        if(tempuser) {
            tempuser.level = data.level;
            tempuser.parentLevel = data.parentLevel;
            tempuser.levelUrl = data.url;
            localStorage.setItem('user', JSON.stringify(tempuser));
            this.setState({level: data.level, parentLevel: data.parentLevel, levelUrl: data.url, user: tempuser});
        }
        else {
            this.setState({level: data.level, parentLevel: data.parentLevel, levelUrl: data.url});
        }
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
