import React, { Component } from "react";
import UserService from "../../_services/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import NumericInput from "react-numeric-input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@material-ui/core";
import Loading from "../Loading/Loading";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import MessageIcon from "@material-ui/icons/Message";

class HostListingDetails extends Component {
    constructor(props) {
        super();

        this.state = {
            listing: {},
            image: "",
            loading: false,
            successful: true,
            message: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    }

    handleChange = (e) => {
        const target = e.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    fileSelectedHandler = (e) => {
        this.setState({ image: e.target.files[0] });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.image) {
            let formData = new FormData();

            formData.append(
                "imageFile",
                this.state.image,
                this.state.image.name
            );

            UserService.postPhoto(formData).then((response) => {
                UserService.linkListingPhoto(
                    response.data,
                    this.state.listing.id
                );
            });
        }

        if (this.state.successful) {
            UserService.updateListingInfo(
                this.state.id,
                this.state.title,
                this.state.type,
                this.state.state,
                this.state.city,
                this.state.neighborhood,
                this.state.address,
                this.state.postalCode,
                this.state.description,
                this.state.numOfBeds,
                this.state.numOfWashrooms,
                this.state.numOfRooms,
                this.state.maxGuests,
                this.state.price,
                this.state.costPerExtraGuest,
                this.state.kitchen,
                this.state.parking,
                this.state.elevator,
                this.state.smoking,
                this.state.tv,
                this.state.ac,
                this.state.heating,
                this.state.wifi,
                this.state.parties,
                this.state.animals,
                this.state.startDate,
                this.state.endDate,
                this.state.images,
                this.state.host,
                this.state.reviews
            )
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({
                            listing: response.data,
                            edit: false,
                        });
                    }
                })
                .catch((error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        message: resMessage,
                    });
                });
        }
    };

    componentDidMount() {
        const listingId = this.props.location.state.listingId;
        this.setState({ loading: true });

        UserService.getCurrentListing(listingId)
            .then((response) => {
                this.setState({
                    listing: response.data,
                    loading: false,
                });
                this.setState({
                    id: listingId,
                    title: this.state.listing.title,
                    type: this.state.listing.type,
                    state: this.state.listing.state,
                    city: this.state.listing.city,
                    neighborhood: this.state.listing.neighborhood,
                    address: this.state.listing.address,
                    postalCode: this.state.listing.postalCode,
                    description: this.state.listing.description,
                    numOfBeds: this.state.listing.numOfBeds,
                    numOfWashrooms: this.state.listing.numOfWashrooms,
                    numOfRooms: this.state.listing.numOfRooms,
                    maxGuests: this.state.listing.maxGuests,
                    price: this.state.listing.price,
                    costPerExtraGuest: this.state.listing.costPerExtraGuest,
                    kitchen: this.state.listing.kitchen,
                    parking: this.state.listing.parking,
                    elevator: this.state.listing.elevator,
                    smoking: this.state.listing.smoking,
                    tv: this.state.listing.tv,
                    ac: this.state.listing.ac,
                    heating: this.state.listing.heating,
                    wifi: this.state.listing.wifi,
                    parties: this.state.listing.parties,
                    animals: this.state.listing.animals,
                    startDate: Date.parse(
                        this.state.listing.startDate.toString()
                    ),
                    endDate: Date.parse(this.state.listing.endDate.toString()),
                    images: this.state.listing.images,
                    host: this.state.listing.host,
                    reviews: this.state.listing.reviews,
                });
            })
            .catch((error) => {
                this.setState({
                    message:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString(),
                });
            });
    }

    render() {
        const images = this.state.listing.images;

        if (this.state.loading) {
            return <Loading />;
        }

        if (!images) {
            return <h2>Failed to load images</h2>;
        }

        return (
            <React.Fragment>
                <div
                    className="container"
                    style={{
                        width: "100%",
                        padding: "0% 5%",
                        backgroundColor: "#ffffff",
                        position: "relative",
                        marginTop: "-5%",
                        marginBottom: "4%",
                    }}
                >
                    {!this.state.edit && (
                        <div
                            className="profile-content"
                            style={{
                                width: "100%",
                                padding: "5% 0%",
                                marginTop: "10%",
                                backgroundColor: "#ffffff",
                            }}
                        >
                            <ul
                                style={{
                                    display: "inline-block",
                                    fontSize: "20px",
                                    color: "#1A1B1C",
                                }}
                            >
                                <li
                                    style={{
                                        paddingBottom: "20px",
                                    }}
                                >
                                    <h3
                                        style={{
                                            color: "#222222",
                                            fontWeight: "500",
                                            fontSize: "26px",
                                        }}
                                    >
                                        {this.state.title}
                                    </h3>
                                    <h5
                                        style={{
                                            color: "#717171",
                                            fontWeight: "500",
                                            fontSize: "16px",
                                        }}
                                    >
                                        {this.state.city}, {this.state.state}
                                    </h5>
                                </li>
                                {this.state.images && (
                                    <Carousel
                                        autoPlay="true"
                                        infiniteLoop="true"
                                        showArrows="true"
                                    >
                                        {images.map((image) => {
                                            return (
                                                <div key={image.id}>
                                                    <img
                                                        src={
                                                            "data:image/jpg;base64," +
                                                            image.picByte
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                            );
                                        })}
                                    </Carousel>
                                )}

                                <li style={{ float: "right" }}>
                                    <Link
                                        to={{
                                            pathname: `/host/messages`,
                                            state: {
                                                listingId:
                                                    this.state.listing.id,
                                            },
                                        }}
                                        style={{
                                            textDecoration: "none",
                                            color: "navy",
                                        }}
                                    >
                                        Messages
                                        <MessageIcon fontSize="large" />
                                    </Link>
                                </li>
                                <br></br>
                                <br></br>
                                <li>
                                    <h3>Listing details</h3>
                                </li>
                                <hr></hr>
                                <li>
                                    <h4
                                        style={{
                                            color: "#222222",
                                            fontWeight: "400",
                                            fontSize: "18px",
                                        }}
                                    >
                                        {this.state.description}
                                    </h4>
                                </li>
                                <br></br>
                                <br></br>
                                <li>
                                    <h4
                                        style={{
                                            color: "#222222",
                                            fontWeight: "400",
                                            fontSize: "18px",
                                        }}
                                    >
                                        Category:{" "}
                                        {this.state.listing.type
                                            .replace("_", " ")
                                            .toLowerCase()}
                                    </h4>
                                </li>
                                <li>
                                    <h4
                                        style={{
                                            color: "#222222",
                                            fontWeight: "400",
                                            fontSize: "18px",
                                        }}
                                    >
                                        Rooms: {this.state.numOfRooms}
                                    </h4>
                                </li>
                                <li>
                                    <h4
                                        style={{
                                            color: "#222222",
                                            fontWeight: "400",
                                            fontSize: "18px",
                                        }}
                                    >
                                        Beds: {this.state.numOfBeds}
                                    </h4>
                                </li>
                                <li>
                                    <h4
                                        style={{
                                            color: "#222222",
                                            fontWeight: "400",
                                            fontSize: "18px",
                                        }}
                                    >
                                        Washrooms: {this.state.numOfWashrooms}
                                    </h4>
                                </li>
                                <li>
                                    <h4
                                        style={{
                                            color: "#222222",
                                            fontWeight: "400",
                                            fontSize: "18px",
                                        }}
                                    >
                                        Maximum guests: {this.state.maxGuests}
                                    </h4>
                                </li>
                                <br></br>
                                <br></br>
                                <li>
                                    <h3>Pricing details</h3>
                                </li>
                                <hr></hr>
                                <li>
                                    <h4
                                        style={{
                                            color: "#222222",
                                            fontWeight: "400",
                                            fontSize: "18px",
                                        }}
                                    >
                                        Cost per day: {this.state.price}
                                    </h4>
                                </li>
                                <li>
                                    <h4
                                        style={{
                                            color: "#222222",
                                            fontWeight: "400",
                                            fontSize: "18px",
                                        }}
                                    >
                                        Cost per extra guest:{" "}
                                        {this.state.costPerExtraGuest}
                                    </h4>
                                </li>
                                <li>
                                    <h4
                                        style={{
                                            color: "#222222",
                                            fontWeight: "400",
                                            fontSize: "18px",
                                        }}
                                    >
                                        Availability: {""}
                                        {this.state.listing.startDate} to {" "}
                                        {this.state.listing.endDate}
                                    </h4>
                                </li>
                                <br></br>
                                <br></br>
                                <li>
                                    <h3>Other amenities</h3>
                                </li>
                                <hr></hr>

                                <ul
                                    style={{
                                        display: "inline-block",
                                        color: "#222222",
                                        fontWeight: "400",
                                        fontSize: "18px",
                                    }}
                                >
                                    <li>
                                        Kitchen:{" "}
                                        {this.state.kitchen ? "yes" : "no"}
                                    </li>
                                    <li style={{ paddingTop: "8px" }}>
                                        Parking:{" "}
                                        {this.state.parking ? "yes" : "no"}
                                    </li>
                                    <li style={{ paddingTop: "8px" }}>
                                        Elevator:{" "}
                                        {this.state.elevator ? "yes" : "no"}
                                    </li>
                                    <li style={{ paddingTop: "8px" }}>
                                        Smoking:{" "}
                                        {this.state.smoking ? "yes" : "no"}
                                    </li>
                                    <li style={{ paddingTop: "8px" }}>
                                        TV: {this.state.tv ? "yes" : "no"}
                                    </li>
                                    <li style={{ paddingTop: "8px" }}>
                                        AC: {this.state.ac ? "yes" : "no"}
                                    </li>
                                    <li style={{ paddingTop: "8px" }}>
                                        Heating:{" "}
                                        {this.state.heating ? "yes" : "no"}
                                    </li>
                                    <li style={{ paddingTop: "8px" }}>
                                        Wi-Fi: {this.state.wifi ? "yes" : "no"}
                                    </li>
                                    <li style={{ paddingTop: "8px" }}>
                                        Parties:{" "}
                                        {this.state.parties ? "yes" : "no"}
                                    </li>
                                    <li style={{ paddingTop: "8px" }}>
                                        Animals:{" "}
                                        {this.state.animals ? "yes" : "no"}
                                    </li>
                                </ul>
                                <br></br>
                                <br></br>
                                <br></br>
                                <li>
                                    <h3>Address</h3>
                                </li>
                                <hr></hr>
                                <li>
                                    <h4
                                        style={{
                                            color: "#222222",
                                            fontWeight: "400",
                                            fontSize: "18px",
                                        }}
                                    >
                                    {this.state.address}
                                    </h4>
                                </li>
                                <li>
                                    <h4
                                        style={{
                                            color: "#222222",
                                            fontWeight: "400",
                                            fontSize: "18px",
                                        }}
                                    >
                                        {this.state.city}, {this.state.state}
                                    </h4>
                                </li>
                                <li>
                                    <h4
                                        style={{
                                            color: "#222222",
                                            fontWeight: "400",
                                            fontSize: "18px",
                                        }}
                                    >
                                        {this.state.postalCode}
                                    </h4>
                                </li>
                                <li>
                                    <h4
                                        style={{
                                            color: "#222222",
                                            fontWeight: "400",
                                            fontSize: "18px",
                                        }}
                                    >
                                        Neighborhood: {this.state.neighborhood}
                                    </h4>
                                </li>
                            </ul>
                            <div style={{ paddingTop: "50px" }}>
                                <button
                                    onClick={(e) => {
                                        this.setState({ edit: true });
                                    }}
                                    className="submit-button btn btn-primary btn-block"
                                    style={{ width: "40%", margin: "0 auto" }}
                                >
                                    Edit listing
                                </button>
                            </div>
                        </div>
                    )}

                    {this.state.edit && (
                        <div className="container" style={{ marginTop: "7%" }}>
                            <Form
                                autoComplete="off"
                                onSubmit={this.handleSubmit}
                                ref={(c) => {
                                    this.form = c;
                                }}
                            >
                                <div
                                    className="wrapper"
                                    style={{ padding: "5%" }}
                                >
                                    <div style={{ position: "relative" }}>
                                        <h2>Edit Listing</h2>
                                        <ul
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <li style={{ paddingTop: "20px" }}>
                                                {" "}
                                                {/* Title */}
                                                <label htmlFor="title">
                                                    Title
                                                </label>
                                            </li>
                                            <li>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="title"
                                                    value={this.state.title}
                                                    onChange={this.handleChange}
                                                />
                                            </li>
                                            <li style={{ paddingTop: "20px" }}>
                                                {" "}
                                                {/* State */}
                                                <label htmlFor="text">
                                                    State
                                                </label>
                                            </li>
                                            <li>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="state"
                                                    value={this.state.state}
                                                    onChange={this.handleChange}
                                                />
                                            </li>
                                            <li style={{ paddingTop: "20px" }}>
                                                {" "}
                                                {/* City */}
                                                <label htmlFor="text">
                                                    City
                                                </label>
                                            </li>
                                            <li>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="city"
                                                    value={this.state.city}
                                                    onChange={this.handleChange}
                                                />
                                            </li>
                                            <li style={{ paddingTop: "20px" }}>
                                                {" "}
                                                {/* Neighborhood */}
                                                <label htmlFor="text">
                                                    Neighborhood
                                                </label>
                                            </li>
                                            <li>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="neighborhood"
                                                    value={
                                                        this.state.neighborhood
                                                    }
                                                    onChange={this.handleChange}
                                                />
                                            </li>
                                            <li style={{ paddingTop: "20px" }}>
                                                {" "}
                                                {/* Address */}
                                                <label htmlFor="text">
                                                    Address
                                                </label>
                                            </li>
                                            <li>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="address"
                                                    value={this.state.address}
                                                    onChange={this.handleChange}
                                                />
                                            </li>
                                            <li style={{ paddingTop: "20px" }}>
                                                {" "}
                                                {/* Postal Code */}
                                                <label htmlFor="number">
                                                    Postal Code
                                                </label>
                                            </li>
                                            <li>
                                                <Input
                                                    type="number"
                                                    className="form-control"
                                                    name="postalCode"
                                                    value={
                                                        this.state.postalCode
                                                    }
                                                    onChange={this.handleChange}
                                                />
                                            </li>
                                            <li style={{ paddingTop: "20px" }}>
                                                {" "}
                                                {/* Description */}
                                                <label htmlFor="text">
                                                    Description
                                                </label>
                                            </li>
                                            <li>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="description"
                                                    value={
                                                        this.state.description
                                                    }
                                                    onChange={this.handleChange}
                                                />
                                            </li>
                                            <br></br>
                                            <br></br>
                                            <li>
                                                <ul>
                                                    <li>
                                                        {" "}
                                                        {/* Category */}
                                                        <label htmlFor="text">
                                                            Category
                                                        </label>
                                                    </li>
                                                    <li
                                                        style={{
                                                            marginLeft: "2%",
                                                        }}
                                                    >
                                                        <select
                                                            name=""
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                        >
                                                            <option
                                                                name="privateRoom"
                                                                value="PRIVATE_ROOM"
                                                            >
                                                                Private Room
                                                            </option>
                                                            <option
                                                                name="sharedRoom"
                                                                value="SHARED_ROOM"
                                                            >
                                                                Shared Room
                                                            </option>
                                                            <option
                                                                name="fullApartment"
                                                                value="FULL_APARTMENT"
                                                            >
                                                                Full Apartment
                                                            </option>
                                                        </select>
                                                    </li>
                                                </ul>
                                            </li>

                                            <br></br>
                                            <li>
                                                <ul>
                                                    <li>
                                                        {" "}
                                                        {/* Number of rooms */}
                                                        <label htmlFor="number">
                                                            Rooms
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <NumericInput
                                                            mobile
                                                            min={0}
                                                            max={16}
                                                            value={
                                                                this.state
                                                                    .numOfRooms
                                                            }
                                                            onChange={(e) => {
                                                                this.setState({
                                                                    numOfRooms:
                                                                        e,
                                                                });
                                                            }}
                                                        />
                                                    </li>
                                                </ul>
                                            </li>

                                            <br></br>
                                            <li>
                                                <ul style={{}}>
                                                    <li>
                                                        {" "}
                                                        {/* Number of beds */}
                                                        <label htmlFor="number">
                                                            Beds
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <NumericInput
                                                            mobile
                                                            min={0}
                                                            max={10}
                                                            value={
                                                                this.state
                                                                    .numOfBeds
                                                            }
                                                            onChange={(e) => {
                                                                this.setState({
                                                                    numOfBeds:
                                                                        e,
                                                                });
                                                            }}
                                                        />
                                                    </li>
                                                </ul>
                                            </li>

                                            <li style={{ paddingTop: "20px" }}>
                                                <ul>
                                                    <li>
                                                        {" "}
                                                        {/* Number of Washrooms */}
                                                        <label htmlFor="number">
                                                            Washrooms
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <NumericInput
                                                            mobile
                                                            min={0}
                                                            max={10}
                                                            value={
                                                                this.state
                                                                    .numOfWashrooms
                                                            }
                                                            onChange={(e) => {
                                                                this.setState({
                                                                    numOfWashrooms:
                                                                        e,
                                                                });
                                                            }}
                                                        />
                                                    </li>
                                                </ul>
                                            </li>

                                            <li style={{ paddingTop: "20px" }}>
                                                <ul>
                                                    {/* Maximum Guests */}
                                                    <li
                                                        style={{
                                                            width: "130px",
                                                        }}
                                                    >
                                                        {" "}
                                                        {/* Maximum guests */}
                                                        <label htmlFor="text">
                                                            Max Guests
                                                        </label>
                                                    </li>
                                                    <li style={{}}>
                                                        <NumericInput
                                                            mobile
                                                            min={0}
                                                            max={10}
                                                            value={
                                                                this.state
                                                                    .maxGuests
                                                            }
                                                            onChange={(e) => {
                                                                this.setState({
                                                                    maxGuests:
                                                                        e,
                                                                });
                                                            }}
                                                        />
                                                    </li>
                                                </ul>
                                            </li>
                                            <br></br>
                                            <br></br>
                                            <li>
                                                {" "}
                                                {/* Minimum Cost */}
                                                <label htmlFor="number">
                                                    Price
                                                </label>
                                            </li>
                                            <li>
                                                <Input
                                                    type="number"
                                                    step="0.5"
                                                    className="form-control"
                                                    name="price"
                                                    value={this.state.price}
                                                    onChange={this.handleChange}
                                                />
                                            </li>
                                            <li style={{ paddingTop: "20px" }}>
                                                {" "}
                                                {/* Cost per extra guest */}
                                                <label htmlFor="number">
                                                    Cost per extra guest
                                                </label>
                                            </li>
                                            <li>
                                                <Input
                                                    type="number"
                                                    step="0.5"
                                                    className="form-control"
                                                    name="costPerExtraGuest"
                                                    value={
                                                        this.state
                                                            .costPerExtraGuest
                                                    }
                                                    onChange={this.handleChange}
                                                />
                                            </li>
                                            <br></br>
                                            <br></br>
                                            <li>
                                                {" "}
                                                {/* Available dates */}
                                                <label htmlFor="number">
                                                    Available dates:
                                                </label>
                                            </li>
                                            <li style={{ paddingTop: "10px" }}>
                                                <ul
                                                    style={{
                                                        display: "flex",
                                                    }}
                                                >
                                                    <li>
                                                        <label>From:</label>
                                                    </li>
                                                    <li
                                                        style={{
                                                            paddingLeft: "20px",
                                                        }}
                                                    >
                                                        <DatePicker
                                                            selected={
                                                                this.state
                                                                    .startDate
                                                            }
                                                            value={
                                                                this.state
                                                                    .startDate
                                                            }
                                                            onChange={(
                                                                date
                                                            ) => {
                                                                this.setState({
                                                                    startDate:
                                                                        date,
                                                                });
                                                            }}
                                                            dateFormat="dd-MM-yyyy"
                                                            minDate={new Date()}
                                                        />
                                                    </li>
                                                    <li
                                                        style={{
                                                            paddingLeft: "20px",
                                                        }}
                                                    >
                                                        <label>To:</label>
                                                    </li>
                                                    <li
                                                        style={{
                                                            paddingLeft: "20px",
                                                        }}
                                                    >
                                                        <DatePicker
                                                            selected={
                                                                this.state
                                                                    .endDate
                                                            }
                                                            value={
                                                                this.state
                                                                    .endDate
                                                            }
                                                            onChange={(
                                                                date
                                                            ) => {
                                                                this.setState({
                                                                    endDate:
                                                                        date,
                                                                });
                                                            }}
                                                            dateFormat="dd-MM-yyyy"
                                                            minDate={new Date()}
                                                        />
                                                    </li>
                                                </ul>
                                            </li>

                                            <li style={{ paddingTop: "20px" }}>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td
                                                                style={{
                                                                    padding:
                                                                        "0%",
                                                                }}
                                                            >
                                                                {" "}
                                                                {/* Extras */}
                                                                <br />
                                                                <div>
                                                                    <label>
                                                                        Extras:
                                                                    </label>
                                                                    <br />
                                                                    <div className="listing-details">
                                                                        <Checkbox
                                                                            name="kitchen"
                                                                            label="kitchen"
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .kitchen
                                                                            }
                                                                            checked={
                                                                                this
                                                                                    .state
                                                                                    .kitchen
                                                                            }
                                                                            onChange={
                                                                                this
                                                                                    .handleChange
                                                                            }
                                                                        />
                                                                        <p>
                                                                            Kitchen
                                                                        </p>
                                                                        <Checkbox
                                                                            name="parking"
                                                                            label="parking"
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .parking
                                                                            }
                                                                            checked={
                                                                                this
                                                                                    .state
                                                                                    .parking
                                                                            }
                                                                            onChange={
                                                                                this
                                                                                    .handleChange
                                                                            }
                                                                        />
                                                                        <p>
                                                                            Parking
                                                                        </p>
                                                                        <Checkbox
                                                                            name="elevator"
                                                                            label="elevator"
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .elevator
                                                                            }
                                                                            checked={
                                                                                this
                                                                                    .state
                                                                                    .elevator
                                                                            }
                                                                            onChange={
                                                                                this
                                                                                    .handleChange
                                                                            }
                                                                        />
                                                                        <p>
                                                                            Elevator
                                                                        </p>
                                                                        <Checkbox
                                                                            name="wifi"
                                                                            label="wifi"
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .wifi
                                                                            }
                                                                            checked={
                                                                                this
                                                                                    .state
                                                                                    .wifi
                                                                            }
                                                                            onChange={
                                                                                this
                                                                                    .handleChange
                                                                            }
                                                                        />
                                                                        <p>
                                                                            Wifi
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td
                                                                style={{
                                                                    padding:
                                                                        "0%",
                                                                }}
                                                            >
                                                                <div>
                                                                    <div className="listing-details">
                                                                        <Checkbox
                                                                            name="smoking"
                                                                            label="smoking"
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .smoking
                                                                            }
                                                                            checked={
                                                                                this
                                                                                    .state
                                                                                    .smoking
                                                                            }
                                                                            onChange={
                                                                                this
                                                                                    .handleChange
                                                                            }
                                                                        />
                                                                        <p>
                                                                            Smoking
                                                                        </p>
                                                                        <Checkbox
                                                                            name="tv"
                                                                            label="tv"
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .tv
                                                                            }
                                                                            checked={
                                                                                this
                                                                                    .state
                                                                                    .tv
                                                                            }
                                                                            onChange={
                                                                                this
                                                                                    .handleChange
                                                                            }
                                                                        />
                                                                        <p>
                                                                            TV
                                                                        </p>
                                                                        <Checkbox
                                                                            name="ac"
                                                                            label="ac"
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .ac
                                                                            }
                                                                            checked={
                                                                                this
                                                                                    .state
                                                                                    .ac
                                                                            }
                                                                            onChange={
                                                                                this
                                                                                    .handleChange
                                                                            }
                                                                        />
                                                                        <p>
                                                                            AC
                                                                        </p>
                                                                        <Checkbox
                                                                            name="heating"
                                                                            label="heating"
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .heating
                                                                            }
                                                                            checked={
                                                                                this
                                                                                    .state
                                                                                    .heating
                                                                            }
                                                                            onChange={
                                                                                this
                                                                                    .handleChange
                                                                            }
                                                                        />
                                                                        <p>
                                                                            Heating
                                                                        </p>
                                                                        <Checkbox
                                                                            name="parties"
                                                                            label="parties"
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .parties
                                                                            }
                                                                            checked={
                                                                                this
                                                                                    .state
                                                                                    .parties
                                                                            }
                                                                            onChange={
                                                                                this
                                                                                    .handleChange
                                                                            }
                                                                        />
                                                                        <p>
                                                                            Parties
                                                                        </p>
                                                                        <Checkbox
                                                                            name="animals"
                                                                            label="animals"
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .animals
                                                                            }
                                                                            checked={
                                                                                this
                                                                                    .state
                                                                                    .animals
                                                                            }
                                                                            onChange={
                                                                                this
                                                                                    .handleChange
                                                                            }
                                                                        />
                                                                        <p>
                                                                            Animals
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </li>
                                        </ul>
                                        <div style={{ paddingTop: "20px" }}>
                                            <h3>Add photo</h3>
                                            <input
                                                type="file"
                                                style={{ width: "350px" }}
                                                onChange={
                                                    this.fileSelectedHandler
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Form>
                            <div
                                style={{
                                    width: "30%",
                                    marginLeft: "34%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <button
                                    style={{
                                        marginBottom: "42px",
                                        marginTop: "25px",
                                        marginRight: "30px",
                                    }}
                                    type="submit"
                                    className="submit-button btn btn-danger btn-block"
                                    onClick={(e) => {
                                        this.setState({ edit: false });
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    style={{
                                        marginBottom: "42px",
                                        marginTop: "25px",
                                        marginLeft: "30px",
                                    }}
                                    type="submit"
                                    className="submit-button btn btn-primary btn-block"
                                    onClick={this.handleSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default HostListingDetails;
