import React from 'react';
import API from 'api';
import {
    HotelGrid,
    FilterBar,
    Header
} from "components";
import {HotelCard, SearchResult} from "../components";
import moment from "moment";


export default class HotelDreamsApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hotels: [],
            filter: {
                dateFrom: moment().format("YYYY-MM-DD"),
                dateTo: moment().add(1, 'year').format("YYYY-01-01"),
                country: "",
                price: 0,
                roomsCount: 0,
            }
        }
    }

    setFilter = (name, value) => {
        const extra = {};
        if(name === 'dateFrom') {
            if(moment(value).unix() > moment(this.state.filter.dateTo).unix()) { extra.dateTo = value; }
        }
        if(name === 'dateTo') {
            if(moment(this.state.filter.dateFrom).unix() > moment(value).unix()) { extra.dateFrom = value; }
        }
        this.setState((prevState) => ({
            filter: {
                ...prevState.filter,
                ...extra,
                [name]: value
            }
        }));
    };

    componentDidMount() {
        API.getHotels((hotels) => {
            this.setState({
                hotels: hotels
            })
        });
    }

    renderHotels = (hotels) => (
        hotels.map((hotel, i) =>
            <HotelCard {...hotel} key={i}/>
        )
    );

    filterHotels = (filter, hotels) => (
        hotels.filter((hotel) => {
            const range_a_start = moment(filter.dateFrom).unix();
            const range_a_end = moment(filter.dateTo).unix();
            const range_b_start = moment(hotel.availabilityFrom).unix();
            const range_b_end = moment(hotel.availabilityTo).unix();
            const dateFilter = range_a_start <= range_b_end && range_a_end >= range_b_start;
            const countryFilter = filter.country !== "" ? filter.country === hotel.country : true;
            const priceFilter = parseInt(filter.price) !== 0 ? parseInt(filter.price) === hotel.price : true;
            const roomsFilter = parseInt(filter.roomsCount) !== 0 ? parseInt(filter.roomsCount) === hotel.rooms : true;

            return dateFilter && countryFilter && priceFilter && roomsFilter;
        })
    );

    render() {
        const {hotels, filter} = this.state;
        const filteredHotels = this.filterHotels(filter, hotels);

        return (
            <main>
                <Header/>
                <FilterBar hotels={hotels} filter={filter} setFilter={this.setFilter}/>
                <SearchResult filterResultCount={filteredHotels.length}/>
                <HotelGrid>
                    {this.renderHotels(filteredHotels)}
                </HotelGrid>
            </main>
        );
    }
}
