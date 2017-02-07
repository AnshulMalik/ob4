import React from 'react';

var Timer = React.createClass({
    render() {
        let target_date = new Date("Fri, 10 Feb 2017 11:30:00 GMT");
        setTimeout(function () { getCountdown(); }, 1000);

        function getCountdown(){
            let clock;

            clock = $('.clock').FlipClock({
                clockFace: 'DailyCounter',
                autoStart: false,
                callbacks: {
                    stop: function() {
                        $('.message').html('The clock has stopped!')
                    }
                }
            });

//            clock.setTime(220880);
            clock.setTime((target_date - Date.now()) / 1000);
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
