import React from 'react'
import APIService from '../Services/APIService';
import NProgress from 'nprogress-npm';

var Leaderboard = React.createClass({
    getInitialState() {
        APIService.getLeaderboard().then(response=>{
            response.json().then(data=>{
                console.log(data);
                NProgress.done();
                this.setState({data: data.users});
            });
        });
        return { data: null};
    },
    render() {
        if(!this.state.data) {

            return (<div><center><h1>Loading...</h1></center></div>);
        }

        return (
            <section className="wrapper style1 fullscreen fade-up">
                <div className="inner">
                    <center>
                        <div>
                            <div className="leaderboard">
                                <h1>
                                    Leaderboard
                                </h1>
                                <ol>
                                    {
                                        this.state.data.map(function(value, index) {
                                            return (<li key={index}>
                                                <mark>{value.name}</mark>
                                                <small>{value.level}</small>
                                            </li>)
                                        })
                                    }
                                </ol>
                            </div>
                        </div>
                    </center>
                </div>
            </section>
        );

    }
});

module.exports = Leaderboard;