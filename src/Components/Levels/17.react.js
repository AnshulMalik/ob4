import React from 'react';
import { withRouter } from 'react-router';
import APIService from '../../Services/APIService';
import { AES, enc } from 'crypto-js';
import { notify } from 'react-notify-toast';
import {htmlEncode } from 'js-htmlencode';
import {spring} from 'react-motion';
import Transition from 'react-motion-ui-pack';
import NProgress from 'nprogress-npm';

import UserActions from '../../Actions/UserActions';


var A = React.createClass({
    render() {
        return (
            <Transition
                component = {false} // don't use a wrapping component
                measure = {false} // don't measure component
                enter = {{
                    opacity: 1,
                    translateX: spring(0, {stiffness: 150, damping: 10})
                }}
                leave={{
                    opacity: 0,
                    translateX: 150
                }}
                >
                    <section key={1} className="wrapper style1 fullscreen fade-up">
                        <div className="inner level">
                            <center>
                                <div>
                                    <img src = "/resources/img/17/1/0.jpg"  style={{'display': 'inline', 'padding': '15px'}} onClick={this.rotate}/>
                                    <img src = "/resources/img/17/2/0.jpg"  style={{'display': 'inline', 'padding': '15px'}} onClick={this.rotate}/>
                                    <img src = "/resources/img/17/3/0.jpg"  style={{'display': 'inline', 'padding': '15px'}} onClick={this.rotate}/>
                                    <img src = "/resources/img/17/4/0.jpg"  style={{'display': 'inline', 'padding': '15px'}} onClick={this.rotate}/>
                                </div>
                                <form className="levelForm" onSubmit={this.submitAnswer}>
                                    <input  type="text" placeholder="Answer goes here" id="submitAnswerBox" autoComplete="off"/>
                                    <button type="submit" id="answerSubmitButton">Submit</button>
                                </form>
                            </center>
                        </div>
                    </section>
            </Transition>
        );
    },
    rotate(event) {
        let c = '/resources/img/17';
        let arr = event.target.src.split('/');
        let cur = parseInt(arr[7].split('.')[0]);
        event.target.src = c + '/' + arr[6] + '/' + (cur + 90) % 360 + '.jpg';
    },

    final() {
        event.target.children[0].value = "";
        UserActions.submitAnswer({
            answer: answer,
            token: this.props.User.user.token,
            url: '17_1',
        });
    },

    submitAnswer(event) {
        event.preventDefault();
        let answer = event.target.children[0].value;
        event.target.children[0].value = "";
        UserActions.submitAnswer({
            answer: answer,
            token: this.props.User.user.token,
            url: '17_1',
        });
    },

});

module.exports = A;