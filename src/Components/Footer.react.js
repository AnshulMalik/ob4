import React from 'react';

var Footer = React.createClass({

    render() {
        return (
            <footer id="contact-us" className="text-center">
                <div className="footer-below">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <ul className="list-inline">
                                    <li>
                                        <a href="https://www.facebook.com/arucsbo" target="_blank" className="btn-social btn-outline"><i className="fa fa-fw fa-facebook"></i></a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/Obscura_NIT_Kkr" target="_blank" className="btn-social btn-outline"><i className="fa fa-fw fa-twitter"></i></a>
                                    </li>
                                </ul>

                                Copyright &copy; ObscurA 4.0

                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
});

module.exports = Footer;
