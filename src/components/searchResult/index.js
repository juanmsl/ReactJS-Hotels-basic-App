import React from 'react';

export default class SearchResult extends React.Component {
    render() {
        const {filterResultCount} = this.props;

        let message = `${filterResultCount} hotels matches with the current filter`;
        if(filterResultCount === 1) message = `Only ${filterResultCount} hotel match with the current filter`;
        if(filterResultCount === 0) message = `Sorry, but any hotel match the current filter`;

        return (
            <p className="aca-search-result">{message}</p>
        );
    }
}