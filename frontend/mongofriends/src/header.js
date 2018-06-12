import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                <div className="App-title">
                    <h1 className="tardis-welcome">Welcome</h1>
                    <h3 className="tardis-welcome to-the">to <br/>the</h3>
                    <h1 className="tardis-welcome">TARDIS</h1>
                </div>
                   <div className="button-link"> <Link to='/friends'><h5 className="entrance">Enter the TARDIS</h5></Link></div>
                </header>
                             
            </div>
        );
    }
}

export default Header;
