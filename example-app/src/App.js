import React, { Component } from 'react';
import Hello from './hello.layout-theme'
import flavors from 'flavors.macro'
flavors();

class App extends Component {
    render() {
        return (
            <div className="App">
                <Hello />
            </div>
        );
    }
}

export default App;