import React from 'react';

var PageNotFound = React.createClass({
    render() {
        return (
            <div style={{'marginTop': '100px'}}>
                <center><h2>The page you are looking for is not found</h2></center>
            </div>
        );
    }
})

module.exports = PageNotFound;
