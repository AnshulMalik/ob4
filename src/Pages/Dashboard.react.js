import React from 'react';
import { withRouter, Link } from 'react-router';
import {spring} from 'react-motion';
import Transition from 'react-motion-ui-pack';
import Timer from '../Components/Timer.react';

var Dashboard = React.createClass({
    componentWillMount() {
        if(!this.props.User.user) {
            this.props.router.push('/login');
        }
    },

    render() {
        let levelUrl;
        if(this.props.User.user.level) {
            levelUrl = '/level/' + this.props.User.user.level;
        }
        else {
            levelUrl = '/level/' + this.props.User.user.level;
        }

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
                <section className="wrapper style1 fullscreen fade-up">
                    <div className="inner">
                        <center>
                            <h1>Welcome to Obscura 4.0</h1>
                            <h3>Crypthunt will start in</h3>
                            <br/>
                            <Timer />
                        </center>
                    </div>
                </section>
            </Transition>
        );
    }
});


module.exports = withRouter(Dashboard);
