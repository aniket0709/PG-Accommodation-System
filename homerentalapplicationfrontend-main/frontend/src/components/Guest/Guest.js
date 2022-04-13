import React, { Component } from "react";
import GuestBookingList from "./GuestBookingList";

import UserService from "../../_services/user.service";

class GuestBoard extends Component {
    constructor(props) {
        super();

        this.state = {
            bookings: [],
            loading: false,
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        UserService.getGuestBoard()
            .then((response) => {
                this.setState({
                    bookings: response.data,
                    loading: false,
                });
            })
            .catch((error) => {
                this.setState({
                    bookings:
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
            <React.Fragment>
                <main
                    className="container"
                    style={{
                        boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
                        width: "100%",
                        padding: "5%",
                        marginTop: "10%",
                        backgroundColor: "#ffffff",
                    }}
                >
                    <h2>My bookings</h2>
                    <GuestBookingList
                        bookings={this.state.bookings}
                        loading={this.state.loading}
                    />
                </main>
            </React.Fragment>
        );
    }
}

export default GuestBoard;
