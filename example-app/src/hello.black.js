import React from 'react'

export default class Hello extends React.Component {
    render() {
        document.body.style.background = "#000";
        return (
            <div style={{ color: "#FFF" }}>
                Hello black!
            </div >
        )
    }
}