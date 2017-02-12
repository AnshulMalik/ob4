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
    shouldComponentUpdate(nextProps, nextState) {
        //console.log('shouldComponentUpdate');

        if(!this.state.level) {
            // console.log('props updated');
            return true;
        }
        else if(this.state.level.url == nextProps.params.level){
            // console.log('props not updated');
            return false;
        }
        else {
            // console.log('props updated 1');
            return true;
        }
    },

    setLevelFromResponseData(response) {
        //console.log('setLevelFromResponseData');
        response.json().then((data) => {
            if(response.status === 200) {
                this.setState({level: data});

                if(data.hint.length) {
                    console.log('hint: ', data.hint);
                }

                if(data.js.length) {
                    let js = data.js;
                    setTimeout(function() {
                        eval(disasemble(js));
                    }, 3000);
                }
            }
            else {
                notify.show(data.message, 'warning', 2000);
            }
        });

    },

    componentWillUpdate(nextProps, nextState) {
        //console.log('componentWillUpdate')
        let levelUrl = nextProps.params.level;
        if(levelUrl != nextState.level.level) {
            APIService.getLevelByUrl(levelUrl, this.props.User.user.token).then(this.setLevelFromResponseData).catch(error => {
                console.log("Something went wrong while fetching level info from server" + error);
            });
        }
    },

    componentDidUpdate() {
        //console.log('componentDidUpdate');
        if(typeof twttr === 'object') {
            twttr.widgets.load();
        }
        document.title = this.state.level.name;
    },

    getInitialState() {
        //console.log('getInitialState');
        if(this.props.params.level == '29.pdf') {
            window.location.href = '/resources/29.pdf';
            return ;
        }
        let levelUrl = this.props.params.level;
        APIService.getLevelByUrl(levelUrl, this.props.User.user.token).then(this.setLevelFromResponseData).catch(error => {
            console.log("Something went wrong while fetching level info from server" + error);
        });
        return { level: null };
    },

    getForm() {
        if(this.state.level.level == 30) return '';

        if(this.state.level.level == 22) {
            return (
                <form className="levelForm" onSubmit={this.submitAnswer}>
                    <input className="form-control submitAnswer" type="text" placeholder="" id="submitAnswerBox1" autoComplete="off"/>
                    <input className="form-control submitAnswer" type="text" placeholder="" id="submitAnswerBox2" autoComplete="off"/><br />
                    <button className="btn btn-default" type="submit" id="answerSubmitButton">Submit</button>
                </form>
            );
        }
        else {
            return (
                <form className="levelForm" onSubmit={this.submitAnswer}>
                    <input className="form-control submitAnswer" type="text" placeholder="Answer goes here" id="submitAnswerBox" autoComplete="off"/>
                    <button className="btn btn-default" type="submit" id="answerSubmitButton">Submit</button>
                </form>
            );
        }
    },

    render() {
        //console.log('rendering');
        if(!this.state.level) {
            NProgress.done();
            return null;
        }
        else {
            NProgress.done();
        }


        return (
            <div className="row">
                <div className="col-xs-8">
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
                                        <img className="levelImage" id="levimg" src={this.state.level.picture} useMap={this.state.level.mapId}></img>
                                        {
                                            this.getForm()
                                        }

                                    </center>
                                </div>
                            </section>
                    </Transition>
                </div>

                <div className="col-xs-4">
                    <section key={2} className="wrapper style1 fullscreen fade-up">
                        <div className="inner level">
                            <a className="twitter-timeline" data-width="300" data-height="400"data-dnt="true" data-theme="light" data-link-color="#2B7BB9"
                                href="https://twitter.com/Obscura_NIT_Kkr">Tweets by Obscura_NIT_Kkr</a>
                        </div>
                    </section>
                </div>
            </div>
        );
    },

    submitAnswer(event) {
        event.preventDefault();
        let answer;
        console.log(event.target.children);
        if(this.state.level.level == 22)
            answer = event.target.children[0].value + '-' + event.target.children[1].value;
        else
            answer = event.target.children[0].value;

        console.log(answer);
        event.target.children[0].value = "";
        UserActions.submitAnswer({
            answer: answer,
            token: this.props.User.user.token,
            url: this.props.params.level,
        });
    },
});

module.exports = Level;
