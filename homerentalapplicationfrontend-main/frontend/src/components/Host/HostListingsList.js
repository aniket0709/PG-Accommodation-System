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

const HostListingsList = ({ listings, loading }) => {
    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container" style={{ marginTop: "20px" }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Listing id</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>View</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listings.map((listing) => (
                            <TableRow
                                key={listing.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {listing.id}
                                </TableCell>
                                <TableCell>{listing.title}</TableCell>
                                <TableCell>
                                    <Link
                                        to={{
                                            pathname: `/host/listings/${listing.id}`,
                                            state: {
                                                listingId: listing.id,
                                            },
                                        }}
                                        style={{ textDecoration: "none" }}
                                        query={listing.id}
                                    >
                                        View
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default HostListingsList;
