import React from 'react';
import { withRouter } from 'react-router';
import APIService from '../Services/APIService';
import { AES, enc } from 'crypto-js';
import { notify } from 'react-notify-toast';
import {htmlEncode } from 'js-htmlencode';
import {spring} from 'react-motion';
import Transition from 'react-motion-ui-pack';
import NProgress from 'nprogress-npm';

import UserActions from '../Actions/UserActions';


const KEY = 'Su93r53Cr31';
function assemble(data) {
    return AES.encrypt(data, KEY);
}
function disasemble(data) {
    return AES.decrypt(data, KEY).toString(enc.Utf8);
}

var Level = React.createClass({
    shouldComponentUpdate(nextProps) {
        if(!this.state.level) {
            return true;
        }
        else {  
            return this.props.params.level != nextProps.params.level;
        }
    },
    setLevelFromResponseData(data) {
        if(data.responseCode == 200) {
            UserActions.updateUserCurrentLevel(data);
            this.setState({level: data});
        }
        else
            notify.show(data.message, 'warning', 2000);
    
    },
    getInitialState() {
        const levelUrl = this.props.params.level;
        APIService.getLevelByUrl(levelUrl, this.props.User.user.token).then(response => {
            response.json().then(this.setLevelFromResponseData);
        }).catch(error => {
            console.log("Something went wrong while fetching level info from server" + error);
        });
        return { level: null };
    },

    render() {
        if(!this.state.level) {
            return null;
        }
        else {
            NProgress.done();
        }
        if(this.state.level.hint) {
            console.log(disasemble(this.state.level.hint));
        }

        if(this.state.level.js) {
            const js = this.state.level.js;
            setTimeout(function() {
                eval(disasemble(js));
            }, 3000);

        }

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
                                <h3>{this.state.level.name}</h3>
                                <div dangerouslySetInnerHTML={{__html: this.state.level.html}} />
                                <img className="levelImage" id="levimg" src={this.state.level.image} usemap="#immapid"></img>
                                {
                                    (this.state.level.plevel == 26) ? '' : (<form className="levelForm" onSubmit={this.submitAnswer}>
                                        <input  type="text" placeholder="Answer goes here" id="submitAnswerBox" autoComplete="off"/>
                                        <button type="submit" id="answerSubmitButton">Submit</button>
                                        </form>
                                        )  
                                }
                                
                            </center>
                        </div>
                    </section>




            </Transition>
        );
    },

    submitAnswer(event) {
        event.preventDefault();
        let answer = event.target.children[0].value;
        event.target.children[0].value = "";
        console.log({
            answer: answer,
            token: this.props.User.user.token,
            url: this.props.User.levelUrl,
        });
        UserActions.submitAnswer({
            answer: answer,
            token: this.props.User.user.token,
            url: this.props.User.levelUrl,
        });
    },
});

module.exports = Level;