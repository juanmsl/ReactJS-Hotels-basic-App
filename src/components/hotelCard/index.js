import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faHome } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';


export default class HotelCard extends React.Component {
    getPrice = (price) => {
        const priceArray = [];
        for(let i = 0; i< price; i++) {
            priceArray.push(<FontAwesomeIcon key={i} icon={faDollarSign} />);
        }
        return priceArray;
    };

    render() {
        const {
            slug, name, photo, description,
            availabilityFrom, availabilityTo,
            rooms, city, country, price
        } = this.props;

        const from = moment(availabilityFrom).format('LL');
        const to = moment(availabilityTo).format('LL');

        return (
            <article className="aca-hotel">
                <header className="aca-hotel__header">
                    <img src={photo} alt={slug} className="aca-hotel__photo"/>
                </header>
                <main className="aca-hotel__body">
                    <h2 className="aca-hotel__name">{name}</h2>
                    <section className="aca-hotel__info-dates">
                        <p className="aca-hotel__info-place">{city} / {country}</p>
                        <p className="aca-hotel__info">Availability between <span className="aca-hotel__info-value">{from}</span> to <span className="aca-hotel__info-value">{to}</span></p>
                        <p className="aca-hotel__info"><FontAwesomeIcon icon={faHome} /> <span className="aca-hotel__info-value">{rooms}</span> rooms</p>
                    </section>
                    <p className="aca-hotel__description">{description}</p>
                    <p className="aca-hotel__price">{this.getPrice(price)}</p>
                    <button className="aca-hotel__reserve-button">Reserve now</button>
                </main>
            </article>
        );
    }
}