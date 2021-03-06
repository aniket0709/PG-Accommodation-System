import React from "react";
import { Link } from "react-router-dom";
import "./ListingResults.css";
import Loading from "../../Loading/Loading";

const ResultsList = ({ listings, guests, startDate, endDate, loading }) => {
    if (loading) {
        return <Loading />;
    }

    if (listings.length === 0) {
        return <h2 style={{ textAlign: "center" }}>No listings found!</h2>;
    }

    return (
        <main>
            <ul style={{ display: "flex", flexDirection: "column" }}>
                {listings.map((listing) => (
                    <li key={listing.id}>
                        <div className="list-wrapper" style={{
                            boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)'
                        }}>
                            <Link
                                to={{
                                    pathname: `/listings/${listing.id}`,
                                    state: {
                                        listingId: listing.id,
                                        startDate: startDate,
                                        endDate: endDate,
                                        price:
                                            listing.price +
                                            (guests - 1) *
                                                listing.costPerExtraGuest,
                                    },
                                }}
                                style={{
                                    textDecoration: "none",
                                    color: "#222222",
                                    fontWeight:'400'
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
                                                src={require("../../../images/no-image-available.jpg")}
                                                alt="listing"
                                                width="100%"
                                                height="100%"
                                            />
                                        )}
                                    </div>
                                    <div className="listing-info">
                                        <div className="listing-title">
                                            {listing.title}
                                        </div>
                                        <div className="listing-cost">
                                            {listing.price +
                                                (guests - 1) *
                                                    listing.costPerExtraGuest}
                                             &nbsp;Rs/day
                                        </div>
                                        <div className="listing-state">
                                            State: {listing.state}
                                        </div>
                                        <div className="listing-city">
                                            City: {listing.city}
                                        </div>
                                        <div className="listing-type">
                                            Type:{" "}
                                            {listing.type
                                                .replace("_", " ")
                                                .toLowerCase()}
                                        </div>
                                        <div className="listing-beds">
                                            Beds: {listing.numOfBeds}
                                        </div>                                    
                                        <div className="listing-rating">
                                            {listing.numOfReviews} &nbsp; Reviews
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default ResultsList;
