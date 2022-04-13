import React from "react";
import Pdf from "react-to-pdf";

const ref = React.createRef();

const PDF = (props) => {
    return (
        <>
            <div
                className="GuestBooking"
                ref={ref}
                style={{ paddingTop: "20px" }}
            >
                <h4>Please find below your booking details</h4>
                <br></br>
                <h4>
                    Booking id : <br></br>
                    {props.id}
                </h4>
                <hr />
                <h4>
                    Listing title : <br></br>
                    {props.title}
                </h4>
                <hr />
                <h4>
                    Booking date : <br></br>
                    {props.date}
                </h4>
            </div>
            <hr></hr>
            <Pdf targetRef={ref} filename="booking.pdf">
                {({ toPdf }) => (
                    <button
                        className="btn btn-primary btn-block"
                        style={{ width: "40%", margin: "0 auto" }}
                        onClick={toPdf}
                    >
                        Download as pdf
                    </button>
                )}
            </Pdf>
            <br></br>
            <br></br>
        </>
    );
};

export default PDF;
