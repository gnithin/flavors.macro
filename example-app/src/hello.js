import React from 'react'

export default class Hello extends React.Component {
    render() {
        document.body.style.background = "#FFF";
        return (
            <div style={{ color: "#000" }}>
                Hello white!
            </div>
        )
    }
}