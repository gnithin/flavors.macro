import React from 'react'
import { getFlavor } from 'flavors.macro'

export default class Hello extends React.Component {
    render() {
        document.body.style.background = "#0F0";
        return (
            <div style={{ color: "#F00" }}>
                Hello {getFlavor("layout-theme")}!
            </div>
        )
    }
}