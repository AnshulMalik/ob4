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
                                <p className="hidden">
                                    An empty hole from above<br />
                                    Unfulfilled promises from below <br />
                                    Devoid of water its basic need <br />
                                    It sits above empty and very thirsty <br />
                                    Every year you'll hear them say <br />
                                    There'll be a grand opening this may <br />
                                </p>
                                <h1>7404807121</h1>
                                <h2>
                                Call me or<br /> rather <br /> don't 
                                </h2>
                                Watashi wa anata no basho o yokyu shimasu
                                <form className="levelForm" onSubmit={this.submitAnswer}>
                                    <input  type="text" placeholder="Answer goes here" id="submitAnswerBox" autoComplete="off"/>
                                    <button type="submit" id="answerSubmitButton">Submit</button>
                                </form>
                            </center>
                        </div>
                    </section>
            </Transition>
        );
    }

});

module.exports = A;