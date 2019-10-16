import React from 'react';
import API from 'api';
import {
    HotelGrid,
    FilterBar,
    Header
} from "components";
import {HotelCard, SearchResult} from "../components";
import moment from "moment";


export default class YourVacationHouseApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hotels: [],
            filter: {
                dateFrom: moment().format("YYYY-MM-DD"),
                dateTo: moment().format("YYYY-MM-DD"),
                country: "",
                price: "",
                roomsCount: "",
            }
        }
    }

    setFilter = (name, value) => {
      this.setState((prevState) => ({
          filter: {
              ...prevState.filter,
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
            console.log(moment(filter.dateFrom).unix() * 1000, hotel.availabilityFrom);
            const countryFilter = filter.country !== "" ? filter.country === hotel.country : true;
            const priceFilter = filter.price !== "" ? filter.price >= hotel.price : true;
            const roomsFilter = filter.roomsCount !== "" ? filter.roomsCount <= hotel.rooms : true;

            return countryFilter && priceFilter && roomsFilter;
        })
    );

    render() {
        const {hotels, filter} = this.state;
        const filteredHotels = this.filterHotels(filter, hotels);

        return (
            <main>
                <Header/>
                <FilterBar hotels={hotels} filter={filter} setFilter={this.setFilter} />
                <SearchResult filterResultCount={filteredHotels.length} />
                <HotelGrid>
                    {this.renderHotels(filteredHotels)}
                </HotelGrid>
            </main>
        );
    }
}
