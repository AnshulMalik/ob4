import React from 'react';
import { Link } from 'react-router';

var Sidebar = React.createClass({

    render() {
        let hash = window.location.pathname === '/' ? '#' : '/#';
        let urls = {
            top: hash + 'page-top',
            home: hash + 'home',
            about: hash + 'about-us',
            rules: hash + 'rules',
            contact: hash + 'contact-us'
        }
        return (
            <nav id="mainNav" className="navbar navbar-default navbar-fixed-top navbar-custom">
                <div className="container">
                    <div className="navbar-header page-scroll">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span> Show Me !!! <i className="fa fa-bars"></i>
                        </button>
                        <a className="navbar-brand" href="#page-top">ObscurA 4.0</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="hidden">
                                <a href={ urls.top }></a>
                            </li>

                            { this.props.User.user ? '': (
                                <li className="page-scroll">
                                    <Link to={ urls.home }>Home</Link>
                                </li>
                            )}

                            { this.props.User.user ? (
                                <li className="page-scroll">
                                    <Link to='/dashboard'>Dashboard</Link>
                                </li>
                            ): (
                                <li className="page-scroll">
                                    <Link to={ urls.about }>About Us</Link>
                                </li>
                            )}

                            { this.props.User.user ? '': (
                                <li className="page-scroll">
                                    <Link to={ urls.rules }>Rules</Link>
                                </li>
                            )}

                            { this.props.User.user ? (
                                <li className="page-scroll">
                                    <Link to='/logout'>Logout</Link>
                                </li>
                            ): ''}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});

module.exports = Sidebar;
