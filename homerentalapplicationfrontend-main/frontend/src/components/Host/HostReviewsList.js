import React from "react";
import Loading from "../Loading/Loading";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const HostReviewsList = ({ reviews, loading }) => {
    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container" style={{ marginTop: "20px" }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Review id</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Comment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reviews.map((review) => (
                            <TableRow
                                key={review.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {review.id}
                                </TableCell>
                                <TableCell>{review.rating}</TableCell>
                                <TableCell>{review.comment}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default HostReviewsList;
