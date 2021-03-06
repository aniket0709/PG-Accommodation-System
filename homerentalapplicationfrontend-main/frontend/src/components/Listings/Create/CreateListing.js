import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "./CreateListing.css";
import UserService from "../../../_services/user.service";
import { Checkbox } from "@material-ui/core";
import NumericInput from "react-numeric-input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthService from "../../../_services/authentication.service";
import { history } from "../../../_helpers/history";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Required!
            </div>
        );
    }
};

class CreateListing extends Component {
    constructor(props) {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDateChange = this.onDateChange.bind(this);

        this.state = {
            title: "",
            type: "PRIVATE_ROOM",
            numOfBeds: 1,
            numOfWashrooms: 1,
            numOfRooms: 1,
            description: "",
            smoking: false,
            animals: false,
            parties: false,
            maxGuests: 1,
            state: "",
            city: "",
            neighborhood: "",
            address: "",
            postalCode: null,
            price: 0.0,
            costPerExtraGuest: 0.0,
            wifi: false,
            ac: false,
            heating: false,
            kitchen: false,
            tv: false,
            parking: false,
            elevator: false,
            startDate: new Date(),
            endDate: new Date(),
            numOfReviews: 0,
            averageRating: 0.0,
            host: {
                id: AuthService.getCurrentUser().id,
            },
            selectedFile: null,
            successful: false,
            message: "",
        };
    }

    componentDidMount() {
        if (AuthService.getCurrentUser().approved === false) {
            alert(
                "You are not able to create listings until admin approves your registration."
            );
            history.push("/");
            window.location.reload();
        }
    }

    onDateChange(e) {
        this.setState({
            [this.state.startDate]: e.target.value,
        });
    }

    fileSelectedHandler = (e) => {
        this.setState({ selectedFile: e.target.files[0] });
    };

    handleChange = (e) => {
        const target = e.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false,
        });

        if (this.state.selectedFile) {
            let formData = new FormData();
            let listingId = null;
            formData.append(
                "imageFile",
                this.state.selectedFile,
                this.state.selectedFile.name
            );

            this.form.validateAll();

            if (this.checkBtn.context._errors.length === 0) {
                UserService.createListing(
                    this.state.title,
                    this.state.type,
                    this.state.numOfBeds,
                    this.state.numOfWashrooms,
                    this.state.numOfRooms,
                    this.state.description,
                    this.state.smoking,
                    this.state.animals,
                    this.state.parties,
                    this.state.maxGuests,
                    this.state.state,
                    this.state.city,
                    this.state.neighborhood,
                    this.state.address,
                    this.state.postalCode.toString(),
                    this.state.price,
                    this.state.costPerExtraGuest,
                    this.state.wifi,
                    this.state.ac,
                    this.state.heating,
                    this.state.kitchen,
                    this.state.tv,
                    this.state.parking,
                    this.state.elevator,
                    this.state.startDate,
                    this.state.endDate,
                    this.state.host
                )
                    .then((response) => {
                        if (response.status === 200) {
                            listingId = response.data.id;
                            UserService.postPhoto(formData).then((response) => {
                                if (response.status === 200) {
                                    UserService.linkListingPhoto(
                                        response.data,
                                        listingId
                                    ).then((response) => {
                                        if (response.status === 200) {
                                            this.setState({
                                                message: response.data.message,
                                                successful: true,
                                            });
                                            this.props.history.push(
                                                "/host/listings"
                                            );
                                        }
                                    });
                                }
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
                            successful: false,
                            message: resMessage,
                        });
                    });
            }
        } else {
            this.setState({
                successful: false,
                message: "Please select a photo!",
            });
        }
    };

    render() {
        return (
            <div className="listing-create-form">
                <Form
                    autoComplete="off"
                    className="form-wrapper"
                    onSubmit={this.handleSubmit}
                    ref={(c) => {
                        this.form = c;
                    }}
                >
                    <div
                        className="form-inner"
                        style={{ marginTop: "-5%", minWidth: "900px" }}
                    >
                        <h3>Create your listing!</h3>
                        {!this.state.successful && (
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            {" "}
                                            {/* Title */}
                                            <div
                                                className="form-field"
                                                style={{ width: "400px" }}
                                            >
                                                <label htmlFor="title">
                                                    *Title
                                                </label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="title"
                                                    value={this.state.title}
                                                    onChange={this.handleChange}
                                                    validations={[required]}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {" "}
                                            {/* State */}
                                            <div
                                                className="form-field"
                                                style={{ width: "400px" }}
                                            >
                                                <label htmlFor="text">
                                                    *State
                                                </label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="state"
                                                    value={this.state.state}
                                                    onChange={this.handleChange}
                                                    validations={[required]}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {" "}
                                            {/* City */}
                                            <div
                                                className="form-field"
                                                style={{ width: "400px" }}
                                            >
                                                <label htmlFor="text">
                                                    *City
                                                </label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="city"
                                                    value={this.state.city}
                                                    onChange={this.handleChange}
                                                    validations={[required]}
                                                />
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            {" "}
                                            {/* Neighborhood */}
                                            <div
                                                className="form-field"
                                                style={{ width: "400px" }}
                                            >
                                                <label htmlFor="text">
                                                    *Neighborhood
                                                </label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="neighborhood"
                                                    value={
                                                        this.state.neighborhood
                                                    }
                                                    onChange={this.handleChange}
                                                    validations={[required]}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {" "}
                                            {/* Address */}
                                            <div
                                                className="form-field"
                                                style={{ width: "400px" }}
                                            >
                                                <label htmlFor="text">
                                                    *Address
                                                </label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="address"
                                                    value={this.state.address}
                                                    onChange={this.handleChange}
                                                    validations={[required]}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {" "}
                                            {/* Postal Code */}
                                            <div
                                                className="form-field"
                                                style={{ width: "400px" }}
                                            >
                                                <label htmlFor="number">
                                                    *Postal Code
                                                </label>
                                                <Input
                                                    type="number"
                                                    className="form-control"
                                                    name="postalCode"
                                                    value={
                                                        this.state.postalCode
                                                    }
                                                    onChange={this.handleChange}
                                                    validations={[required]}
                                                />
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            {" "}
                                            {/* Description */}
                                            <div
                                                className="form-field"
                                                style={{ width: "400px" }}
                                            >
                                                <label htmlFor="text">
                                                    Description
                                                </label>
                                                <textarea
                                                    type="text"
                                                    className="form-control"
                                                    name="description"
                                                    value={
                                                        this.state.description
                                                    }
                                                    onChange={this.handleChange}
                                                    validations={[required]}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <br></br>
                                    <tr>
                                        <td>
                                            {" "}
                                            {/* Category */}
                                            <div
                                                className="form-field"
                                                style={{ width: "400px" }}
                                            >
                                                <label htmlFor="text">
                                                    *Category
                                                </label>
                                                <br></br>
                                                <select
                                                    onChange={(e) => {
                                                        this.setState({
                                                            type: e.target
                                                                .value,
                                                        });
                                                    }}
                                                >
                                                    <option
                                                        name="privateRoom"
                                                        value="PRIVATE_ROOM"
                                                    >
                                                        Private Room
                                                    </option>
                                                    <option
                                                        name="sharedRoom"
                                                        value={"SHARED_ROOM"}
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
                                            </div>
                                        </td>
                                    </tr>
                                    <br></br>
                                    <tr>
                                        <td>
                                            {" "}
                                            {/* Number of rooms */}
                                            <div className="form-field">
                                                <label htmlFor="number">
                                                    *Rooms
                                                </label>
                                                <NumericInput
                                                    mobile
                                                    min={0}
                                                    max={10}
                                                    value={
                                                        this.state.numOfRooms
                                                    }
                                                    onChange={(e) => {
                                                        this.setState({
                                                            numOfRooms: e,
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            {" "}
                                            {/* Number of beds */}
                                            <div className="form-field">
                                                <label htmlFor="number">
                                                    *Beds
                                                </label>
                                                <NumericInput
                                                    mobile
                                                    min={0}
                                                    max={10}
                                                    value={this.state.numOfBeds}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            numOfBeds: e,
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            {" "}
                                            {/* Number of Washrooms */}
                                            <div className="form-field">
                                                <label htmlFor="number">
                                                    *Washrooms
                                                </label>
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
                                                            numOfWashrooms: e,
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            {" "}
                                            {/* Maximum guests */}
                                            <div className="form-field">
                                                <label htmlFor="text">
                                                    *Max Guests
                                                </label>
                                                <NumericInput
                                                    mobile
                                                    min={0}
                                                    max={10}
                                                    value={this.state.maxGuests}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            maxGuests: e,
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>

                                    <br></br>
                                    <tr>
                                        <td>
                                            {" "}
                                            {/* Minimum Cost */}
                                            <div className="form-field">
                                                <label htmlFor="number">
                                                    * Per day cost
                                                </label>
                                                <Input
                                                    type="number"
                                                    step="0.5"
                                                    className="form-control"
                                                    name="price"
                                                    value={this.state.price}
                                                    onChange={this.handleChange}
                                                    validations={[required]}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            {" "}
                                            {/* Cost per extra guest */}
                                            <div className="form-field">
                                                <label htmlFor="number">
                                                    *Per extra guest
                                                </label>
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
                                                    validations={[required]}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <br></br>
                                    <tr>
                                        <td>
                                            {/* Available dates */}
                                            <br />
                                            <div>
                                                <h3
                                                    style={{
                                                        width: "240px",
                                                        marginLeft: "-30px",
                                                        fontSize: "24px",
                                                    }}
                                                >
                                                    Available dates:
                                                </h3>
                                                <ul
                                                    style={{
                                                        display: "inline-block",
                                                    }}
                                                >
                                                    <li>
                                                        <label
                                                            style={{
                                                                fontSize:
                                                                    "20px",
                                                            }}
                                                        >
                                                            *From:
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <DatePicker
                                                            selected={
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
                                                    <li>
                                                        <br />
                                                    </li>
                                                    <li>
                                                        <label
                                                            style={{
                                                                fontSize:
                                                                    "20px",
                                                            }}
                                                        >
                                                            *To:
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <DatePicker
                                                            selected={
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
                                                            minDate={
                                                                this.state
                                                                    .startDate
                                                            }
                                                        />
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            {" "}
                                            {/* Extras */}
                                            <br />
                                            <div
                                                className="extras"
                                                style={{ marginLeft: "0px" }}
                                            >
                                                <label>Extras:</label>
                                                <br />
                                                <div className="listing-details">
                                                    <Checkbox
                                                        name="kitchen"
                                                        label="kitchen"
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                    />
                                                    <p>Kitchen</p>

                                                    <Checkbox
                                                        name="parking"
                                                        label="parking"
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                    />
                                                    <p>Parking</p>
                                                    <Checkbox
                                                        name="elevator"
                                                        label="elevator"
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                    />
                                                    <p>Elevator</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <div
                                                className="extras"
                                                style={{ marginLeft: "0px" }}
                                            >
                                                <div className="listing-details">
                                                    <Checkbox
                                                        name="smoking"
                                                        label="smoking"
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                    />
                                                    <p>Smoking</p>
                                                    <Checkbox
                                                        name="tv"
                                                        label="tv"
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                    />
                                                    <p>TV</p>
                                                    <Checkbox
                                                        name="ac"
                                                        label="ac"
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                    />
                                                    <p>AC</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <div
                                                className="extras"
                                                style={{ marginLeft: "0px" }}
                                            >
                                                <div className="listing-details">
                                                    <Checkbox
                                                        name="heating"
                                                        label="heating"
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                    />
                                                    <p>Heating</p>
                                                    <Checkbox
                                                        name="wifi"
                                                        label="wifi"
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                    />
                                                    <p>Wifi</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <div
                                                className="extras"
                                                style={{ marginLeft: "0px" }}
                                            >
                                                <div className="listing-details">
                                                    <Checkbox
                                                        name="parties"
                                                        label="parties"
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                    />
                                                    <p>Parties</p>
                                                    <Checkbox
                                                        name="animals"
                                                        label="animals"
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                    />
                                                    <p>Animals</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <div style={{ width: "200px" }}>
                                                <label
                                                    style={{
                                                        paddingTop: "30px",
                                                    }}
                                                >
                                                    {" "}
                                                    Add photo{" "}
                                                    <p
                                                        style={{
                                                            fontSize: "12px",
                                                            width: "135px",
                                                            margin: "0%",
                                                        }}
                                                    >
                                                        (You can add more later)
                                                    </p>
                                                </label>

                                                <input
                                                    style={{ width: "290px" }}
                                                    name="selectedFile"
                                                    type="file"
                                                    onChange={
                                                        this.fileSelectedHandler
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        )}

                        {this.state.message && (
                            <div className="form-field">
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                    style={{
                                        width: "47%",
                                        textAlign: "center",
                                        float: "inherit",
                                    }}
                                >
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={(c) => {
                                this.checkBtn = c;
                            }}
                        />

                        <button
                            style={{
                                marginTop: "42px",
                                marginLeft: "auto",
                                marginRight: "auto",
                                width: "25%",
                            }}
                            type="submit"
                            className="submit-button btn btn-primary btn-block"
                            onClick={this.handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default CreateListing;
