import React from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const GuestBookingList = ({ bookings, loading }) => {
    if (loading) {
        return <Loading />;
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Booking id</TableCell>
                        <TableCell>Listing</TableCell>
                        <TableCell>View</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bookings.map((booking) => (
                        <TableRow
                            key={booking.id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {booking.id}
                            </TableCell>
                            <TableCell>{booking.listingTitle}</TableCell>
                            <TableCell>
                                <Link
                                    to={{
                                        pathname: `/guest/bookings/${booking.id}`,
                                        state: {
                                            booking: booking,
                                        },
                                    }}
                                    style={{ textDecoration: "none" }}
                                    query={booking.id}
                                >
                                    View
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default GuestBookingList;
