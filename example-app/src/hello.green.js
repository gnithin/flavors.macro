import React from 'react'

export default class Hello extends React.Component {
    render() {
        document.body.style.background = "#0F0";
        return (
            <div style={{ color: "#F00" }}>
                Hello green!
            </div>
        )
    }
}