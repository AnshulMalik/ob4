import React from 'react'
import APIService from '../Services/APIService';
import NProgress from 'nprogress-npm';

let users = {}; // Saves index of each user in the leaderboard
let usersA = []; // User at position i in the leaderboard
let animating = false;
let queue = [];
let ioo;

const Leaderboard = React.createClass({
    getInitialState() {
        APIService.getLeaderboard(this.props.User.user.token).then(response=>{
            response.json().then(data=>{
                usersA = data;

                data.forEach((user, i) => {
                    user.position = i;
                    user.rank = i;
                    users[user._id] = user;
                });
                NProgress.done();
                this.setState({data: data});
            });
        });
        return { data: null};
    },

    componentDidUpdate() {
        if(typeof ioo != 'object')
            ioo = io();
        ioo.on('update', (data) => {
            this.sort(data.id, data.level);;
        });

        let ul = document.getElementById('lbul'),
            lis = ul.children,
            liHeight = lis[0].offsetHeight + 2.5;


        ul.style.height = ul.offsetHeight + 'px';
        for (let i = 0; i < lis.length; i++) {
            let li = lis[i];
            li.style.top = i * liHeight + 'px';
        }
        animating = false;
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
                                <ul id="lbul">
                                    <li className="blck active">
                                        <span className="rank">Rank </span>
                                        <span className="num">Level</span>
                                        <span className="name">Name</span>
                                        <span className="college">College</span>
                                    </li>
                                    {
                                        this.state.data.map((value, index) => {
                                            return (value._id == this.props.User.user.id) ? (
                                                <li className="blck active" key={index}>
                                                    <span className="rank">{value.rank} </span>
                                                    <span className="num">{value.levelId}</span>
                                                    <span className="name">{value.name}</span>
                                                    <span className="college">{value.college} </span>
                                                </li>
                                            ) :
                                            (<li className="blck" key={index}>
                                                <span className="rank">{value.rank} </span>
                                                <span className="num">{value.levelId}</span>
                                                <span className="name">{value.name}</span>
                                                <span className="college">{value.college} </span>
                                            </li>)
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </center>
                </div>
            </section>
        );

    },

    animate(i, startIndex, id, lis, li, liHeight) {
        if(i < 1) {
            animating = false;
            return ;
        }
        let aboveId = usersA[i]._id;
        //console.log(i, users[aboveId].levelId, users[id].levelId);
        if(users[aboveId].levelId < users[id].levelId ||
            ((users[aboveId].levelId < users[id].levelId))) {
        //    console.log('swapping');
            setTimeout(() => {
                lis[users[aboveId].position].style.top = (i + 1) * liHeight + 'px';
                li.style.top = i * liHeight + 'px';
            }, 100);
            let tempUser = usersA[i];
            usersA[i] = usersA[i+1];
            usersA[i+1] = tempUser;
            lis[users[id].position].children[0].innerText = i-1;
            lis[users[aboveId].position].children[0].innerText = i;

            setTimeout(() => {
                this.animate(i-1, startIndex, id, lis, li, liHeight);
            }, 500);
        }
        else {
            animating = false;
        }
    },

    sort(id, newLevel) {
        // Keep updating until found correct position
        if(animating) {
            // console.log('deffering animation, already animating');
            return setTimeout(this.sort.bind(null, id, newLevel), 1000);
        }
        let startIndex;

        users[id].levelId = newLevel;
        for(let i = 0; i < usersA.length; i++) {
            if(usersA[i]._id == id) {
                startIndex = i;
                break;
            }
        }

        let ul = document.getElementById('lbul'),
            lis = ul.children,
            liHeight = lis[0].offsetHeight + 2.5;

        let li = lis[users[id].position];
        lis[users[id].position].children[1].innerText = users[id].levelId;

        animating = true;
        this.animate(startIndex - 1, startIndex, id, lis, li, liHeight);

    }
});

module.exports = Leaderboard;
