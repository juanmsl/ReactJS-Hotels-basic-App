
export default class API {
    static apiURL = process.env.REACT_APP_API_URL;

    static getHotels = (successCallback) => {
        fetch(API.apiURL)
            .then(response => response.json())
            .catch(error => console.error('Error', error))
            .then(response => successCallback(response));
    };
}