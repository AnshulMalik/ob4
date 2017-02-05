import React from 'react';
import { withRouter } from 'react-router';
import APIService from '../Services/APIService';
import { AES, enc } from 'crypto-js';
import { notify } from 'react-notify-toast';
import {htmlEncode } from 'js-htmlencode';
import {spring} from 'react-motion';
import Transition from 'react-motion-ui-pack';
import NProgress from 'nprogress-npm';

import UserActions from '../Actions/UserActions';


const KEY = 'Su93r53Cr31';
function assemble(data) {
    return AES.encrypt(data, KEY);
}
function disassemble(data) {
    return AES.decrypt(data, KEY).toString(enc.Utf8);
}

var Encrypt = React.createClass({
    render() {
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
                <center >    
                    <form onSubmit={this.handle}>
                        <div style={{width: '50%', display: 'inline-block'}}>
                            <textarea style={{width: '100%', resize: 'none'}} rows="10" id="encryptedArea" placeholder="Encrypted text goes here" >
                            </textarea>
                            <input type='submit' value='Decrypt' />
                        </div>
                        <div style={{width: '50%', display: 'inline-block'}}>
                            <textarea style={{width: '100%', resize: 'none'}} rows="10" id="decryptedArea" placeholder="Decrypted text goes here">
                            </textarea>
                            <input type='submit' value='Encrypt'/>
                        </div>

                        <input type="clear" value='Clear'/>
                    </form>
                </center>
            </Transition>
        );
    },
    handle(event) {
        event.preventDefault();
        let targets = event.target.children;
        console.log(targets);
        let decryptedText = targets[1].children[0].value;
        let encryptedText = targets[0].children[0].value;
        if(decryptedText && !encryptedText) {
            targets[0].children[0].value = assemble(decryptedText);
        }
        else {
            targets[1].children[0].value = disassemble(encryptedText);
        }
    },

});

module.exports = Encrypt;