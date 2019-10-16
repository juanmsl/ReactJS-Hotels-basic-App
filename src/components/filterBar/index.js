import React from 'react';


export default class FilterBar extends React.Component {

    get = (hotels, category) => {
        const categoryItems = hotels.map((hotel) => {
            return hotel[category];
        });
        const setCategoryItems = new Set(categoryItems);
        return [...setCategoryItems];
    };

    renderOptions = (options) => {
        return options.map((option, i) => {
            return <option value={option} key={i}>{option}</option>
        });
    };

    handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        this.props.setFilter(name, value);
    };

    render() {
        const {hotels, filter} = this.props;
        const {dateFrom, dateTo, country, price, roomsCount} = filter;
        const countries = this.get(hotels, 'country').sort();
        const prices = this.get(hotels, 'price').sort((a, b) => a > b ? 1 : b > a ? -1 : 0);
        const rooms = this.get(hotels, 'rooms').sort((a, b) => a > b ? 1 : b > a ? -1 : 0);

        return (
            <section className="aca-filterbar">
                <input name="dateFrom" type="date" className="aca-input" value={dateFrom} onChange={this.handleChange}/>
                <input name="dateTo" type="date" className="aca-input" value={dateTo} onChange={this.handleChange}/>
                <select name="country" className="aca-input" onChange={this.handleChange} value={country}>
                    <option value="">All countries</option>
                    {this.renderOptions(countries, country)}
                </select>
                <select name="price" className="aca-input" onChange={this.handleChange} value={price}>
                    <option value="">All prices</option>
                    {this.renderOptions(prices, price)}
                </select>
                <select name="roomsCount" className="aca-input" onChange={this.handleChange} value={roomsCount}>
                    <option value="">All rooms count</option>
                    {this.renderOptions(rooms, roomsCount)}
                </select>
            </section>
        );
    }
}