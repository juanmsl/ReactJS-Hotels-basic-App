import React from 'react';
import logo from 'assets/images/houseLogo.png';

export default class Header extends React.Component {
    render() {
        return (
            <header className="aca-header">
                <img src={logo} alt="Logo" className="aca-header__logo"/>
                <h1 className="aca-header__title">Hotel Dreams</h1>
            </header>
        );
    }
}