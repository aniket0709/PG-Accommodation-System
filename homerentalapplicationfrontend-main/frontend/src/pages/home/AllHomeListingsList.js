import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserService from "../../_services/user.service";
import "./Home.css";

class AllHomeListingsList extends Component {
    constructor(props) {
        super();

        this.state = {
            content: [],
        };
    }

    componentDidMount() {
        UserService.getListings()
            .then((response) => {
                this.setState({
                    content: response.data,
                    loading: false,
                });
            })
            .catch((error) => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString(),
                });
            });
    }

    render() {
        return (
            <div>
                <h2 style={{ textAlign: "center", marginTop: "100px" }}>
                    Other listing
                </h2>
                <div style={{width:'80%', margin:'0 auto'}}>
                    {this.state.content.map((listing) => (
                        <li key={listing.id}>
                            <div
                                className="list-wrapper"
                                style={{
                                    boxShadow:
                                        "0px 14px 80px rgba(34, 35, 58, 0.2)",
                                }}
                            >
                                <Link
                                    to={{
                                        pathname: `/listings/${listing.id}`,
                                        state: {
                                            listingId: listing.id,
                                        },
                                    }}
                                    style={{
                                        textDecoration: "none",
                                        color: "#222222",
                                        fontWeight: "400",
                                    }}
                                    query={listing.id}
                                >
                                    <div className="listing-results-container">
                                        <div className="image-container">
                                            {listing.images[0] && (
                                                <img
                                                    src={`data:image/jpg;base64,${listing.images[0].picByte}`}
                                                    alt="listing"
                                                    width="100%"
                                                    height="100%"
                                                />
                                            )}
                                            {!listing.images[0] && (
                                                <img
                                                    src={require("../../images/no-image-available.jpg")}
                                                    alt="listing"
                                                    width="100%"
                                                    height="100%"
                                                />
                                            )}
                                        </div>

                                        <div className="listing-info">
                                            <div style={{paddingTop:'20px', fontSize:'24px', fontWeight:'500'}}>{listing.title}</div>
                                            <div className="listing-title">
                                                {listing.price} Rs/day
                                            </div>
                                            <div className="listing-state">
                                                State: {listing.state}
                                            </div>
                                            <div className="listing-city">
                                                City: {listing.city}
                                            </div>
                                            <div className="listing-type">
                                                {listing.type
                                                    .replace("_", " ")
                                                    .toLowerCase()}
                                            </div>
                                            <div className="listing-beds">
                                                {listing.numOfBeds} Beds
                                            </div>
                                            <div className="listing-rooms">
                                                {listing.numOfRooms} Rooms
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </li>
                    ))}
                </div>
            </div>
        );
    }
}

export default AllHomeListingsList;
