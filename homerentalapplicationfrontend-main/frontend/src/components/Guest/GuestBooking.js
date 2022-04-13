import React, { Component } from "react";
import { Link } from "react-router-dom";
import StarTwoToneIcon from "@material-ui/icons/StarTwoTone";
import PDF from "./PDF";

class GuestBooking extends Component {
    render() {
        const booking = this.props.location.state.booking;

        return (
            <div
                className="booking-view-guest"
                style={{
                    width: "100%",
                    padding: "5% 15%",
                    margin: "3% 0%",
                    backgroundColor: "#ffffff",
                    textAlign: "center",
                }}
            >
                <div className="form-inner">
                    <h1>Booking Details</h1>
                    <PDF
                        title={booking.listingTitle}
                        date={booking.date}
                        id={booking.id}
                    />
                    <Link
                        to={{
                            pathname: `/guest/reviews/`,
                            state: {
                                booking: booking,
                            },
                        }}
                        style={{ textDecoration: "none" }}
                        query={booking.id}
                    >
                        Rate <StarTwoToneIcon fontSize="large" />
                    </Link>
                </div>
            </div>
        );
    }
}

export default GuestBooking;
