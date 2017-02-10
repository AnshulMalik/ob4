import React from 'react';

var Timer = React.createClass({
    render() {
        let target = this.props.target;
        let url = this.props.url;
        setTimeout(function () { getCountdown(); }, 1000);

        function getCountdown(){
            let clock;

            clock = $('.clock').FlipClock({
                clockFace: 'DailyCounter',
                autoStart: false,
                callbacks: {
                    interval: function(d) {
                        if((target.getTime() - Date.now())/1000 <= -1) {
                            window.location.href = url;
                        }
                    }
                }
            });

            clock.setTime((target - Date.now()) / 1000);
            clock.setCountdown(true);
            clock.start();

        }

        return (
            <div id="dashboard" style={{margin: "0 0 0 0"}}>
                <div className="row">
                    <div className="clock" style={{margin:"2em"}}></div>
                    <div className="message"></div>


                </div>
            </div>

        );
    }

});
module.exports = Timer;
