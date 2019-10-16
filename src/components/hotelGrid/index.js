import React from 'react';

export default class HotelGrid extends React.Component {
    render() {
        const {children} = this.props;

        return (
            <section className="aca-hotels-grid">{children}</section>
        );
    }
}