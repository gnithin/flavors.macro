import React, { Component } from 'react';
import Hello from './hello.layout-theme'
import ContentLayout from './contents.layout-theme/content'
import ContentStyled from './contents.style-theme/content'
import flavors from 'flavors.macro'
flavors();

class App extends Component {
    render() {
        return (
            <div className="App">
                <ContentLayout />
                <ContentStyled />
                <Hello />
            </div>
        );
    }
}

export default App;