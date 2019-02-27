import React, { Component } from 'react';
// import Hello from './hello.js'

import Hello from './hello.default'
import flavors from 'flavors.macro'
flavors();

class App extends Component {
    render() {
        console.log("HEL - ", Hello)
        return (
            <div className="App">
                <Hello />
            </div>
        );
    }
}

export default App;