import React from 'react';

var Windows = React.createClass({
    render() {
        document.body.setAttribute('background-color', 'white');
        document.body.removeChild(document.getElementsByTagName('canvas')[0]);
        document.body.removeChild(document.getElementsByTagName('canvas')[0]);
        

        (function() {
            var count=0;
            var counter=setInterval(timer, 60000); 
            var ref="Configuring updates"; 
            var side = setInterval(function() {
                var sidebar = document.getElementById("sidebar");
                if(sidebar) {
                    sidebar.parentNode.removeChild(sidebar);
                    clearInterval(side);
                }
            }, 2000);

              var per;
            var listener = setInterval(function() {
                per = document.getElementById(String.fromCharCode(116, 105, 109, 101, 114)).innerHTML;
                if(per == String.fromCharCode(49, 52, 37)) {
                    alert(String.fromCharCode(67, 111, 110, 103, 114, 97, 116, 117, 108, 97, 116, 105, 111, 110, 115, 44, 32, 121, 111, 117, 32, 104, 97, 118, 101, 32, 103, 111, 116, 32, 116, 104, 101, 32, 102, 108, 97, 103, 58, 32, 123, 86, 69, 82, 89, 95, 83, 116, 52, 48, 110, 71, 95, 80, 52, 115, 115, 119, 48, 114, 68, 125));
                    clearInterval(listener);
                }
            }, 1000);
            function timer() {
                count=count+1;
                if (count > 13) {
                    clearInterval(counter);
                    return;
                }

                document.getElementById("timer").innerHTML=count +'%'; 
            } 
        })();
        return (
            <div>
                <style type="text/css" scoped>{"\
                    body {\
                        background: url('/resources/img/14ngb.jpg') #054696 no-repeat center center fixed; \
                        user-select:none;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;\
                            -webkit-background-size: cover; \
                            -moz-background-size: cover; \
                            -o-background-size: cover; \
                            background-size: cover; \
                        vertical-align:middle; \
                        text-align:center; \
                        z-index: -1; \
                        overflow:hidden; \
                        margin:0; \
                        padding:0; \
                        cursor: url('/resources/img/eZQzDJL.gif'), auto !important; \
                    }\
                    .CT {\
                        vertical-align:middle; \
                        position: absolute; \
                        top: 50%; \
                        height: 70px; \
                        margin-left:auto; \
                        margin-right:auto; \
                        display:block; \
                        width:400px; \
                        margin-top: -5%; \
                        font-family:Segoe UI, Arial; \
                        font-size:23px; \
                        color:#fff; \
                        font-weight:normal; \
                        text-align:center; \
                        text-shadow: 0px 1px 5px rgba(0,0,0, 0.4); \
                        user-select:none;-moz-user-select:none;-webk it-user-select:none;-ms-user-select:none; \
                    }\
                    .image_block {\
                        position: absolute; \
                        bottom: 17px; \
                        left: 50%; \
                        width: 50%; \
                        margin: -5% 0 0 -25%; }\ p {\        display:block;        float:middle;        text-align:center;        width:100%;    }\
                    .centeragain {\
                        width:400px;        margin:0px auto;        text-align:left;    }\
                    .messageBox {\          display:block;        color:#67A2E6;        font-family:Segoe UI, Arial;        font-size:20px;       margin-left:auto; \
                        margin-right:auto;   \
                        text-align:center; \
                        user-select:none;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none; \
                        z-index:999;  \
                    }\
                    #black {\
                        display:none;\
                    }\
                "}</style>
                <div style={{'display': 'block', 'position': 'absolute', 'minWidth': '100%', 'minHeight': '100%', 'margin': '0', 'padding': '0', 'backgroundImage': 'url("/resources/img/14ngb.jpg"'}}>
                    <div className="centeragain">
                        <div className="CT">
                            <div className="FONT">
                                <a id="ref">Configuring Windows Updates</a>
                                <br />
                                <a id="timer">1%</a> 
                                <span>complete.</span>
                                <br />
                                <span>Do not turn off your computer.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
    }
});

module.exports = Windows;