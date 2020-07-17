import React from "react";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";
import { TextField } from "@material-ui/core";
import axios from 'axios';

class LocationSearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { address: "" };
    }

    handleChange = (address) => {
        this.setState({ address });
    };

    makeApiCall = (obj) => {
        axios.post("/location",{ lng: obj.lng, lat: obj.lat },{
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			this.props.onOutlet(res.data.name)
		});
    };

    handleSelect = (address) => {
		this.props.apiLoading()
        geocodeByAddress(address)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => {
				this.makeApiCall(latLng)
			})
            .catch((error) => console.error("Error", error));
    };

    render() {
        return (
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
            >
                {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                }) => (
                    <div>
                        <TextField
                            className="search"
                            label="search your location"
                            variant="outlined"
                            {...getInputProps({
                                placeholder: "Search Places ...",
                                className: "location-search-input",
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => {
                                const className = suggestion.active
                                    ? "suggestion-item--active"
                                    : "suggestion-item";
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? {
                                          backgroundColor: "#fafafa",
                                          cursor: "pointer",
                                      }
                                    : {
                                          backgroundColor: "#ffffff",
                                          cursor: "pointer",
                                      };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
										className="suggest"
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }
}

export default LocationSearchInput;
