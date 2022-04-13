import React, { Component } from "react";
import ResultsList from "./ResultsList";
import Loading from "../../Loading/Loading";
import Pagination from "../../Pagination/Pagination";

class ListingResults extends Component {
    state = {
        currentPage: 1,
        listingsPerPage: 10,
    };

    render() {
        const { listings } = this.props.location.state;
        const guests = this.props.location.state.guests;
        const startDate = this.props.location.state.startDate;
        const endDate = this.props.location.state.endDate;
        const loading = this.props.location.state.loading;

        const indexOfLastListing =
            this.state.currentPage * this.state.listingsPerPage;
        const indexOfFirstListing =
            indexOfLastListing - this.state.listingsPerPage;
        const currentListings = listings.slice(
            indexOfFirstListing,
            indexOfLastListing
        );

        const paginate = (pageNumber) => {
            this.setState({
                currentPage: pageNumber,
            });
        };

        if (loading) {
            return <Loading />;
        }

        return (
            <div
                className="container"
                style={{
                    width: "100%",
                    padding: "5%",
                    boxShadow: "5px 5px #ffffff",
                    marginTop: "50px",
                    backgroundColor: "#FAFBFC",
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        color: "#0056b3",
                        fontSize: "22px",
                        fontWeight: "600",
                    }}
                >
                    Total {listings.length} results
                </h2>
                <Pagination
                    resultsPerPage={this.state.listingsPerPage}
                    totalResults={listings.length}
                    paginate={paginate}
                    currentPage={this.state.currentPage}
                />
                <ResultsList
                    listings={currentListings}
                    guests={guests}
                    endDate={endDate}
                    startDate={startDate}
                    loading={loading}
                />
                <Pagination
                    resultsPerPage={this.state.listingsPerPage}
                    totalResults={listings.length}
                    paginate={paginate}
                    currentPage={this.state.currentPage}
                />
            </div>
        );
    }
}

export default ListingResults;
