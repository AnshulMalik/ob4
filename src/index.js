import React from  'react';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Routes from './routes';

ReactDOM.render(
    <Router history={browserHistory}>{Routes}
    </Router>,
    document.getElementById('app')
);
