import React, { Component } from "react";
import UserService from "../../_services/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";
import AuthService from "../../_services/authentication.service";
import Loading from "../../components/Loading/Loading";

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const email = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vname = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                Must be between 3 and 20 characters.
            </div>
        );
    }
};

class Profile extends Component {
    constructor(props) {
        super();

        this.state = {
            content: [],
            image: "",
            edit: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    fileSelectedHandler = (e) => {
        this.setState({ editPhoto: e.target.files[0] });
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

        if (this.state.editPhoto) {
            let formData = new FormData();

            formData.append(
                "imageFile",
                this.state.editPhoto,
                this.state.editPhoto.name
            );

            UserService.postPhoto(formData).then((response) => {
                UserService.linkUserPhoto(
                    response.data,
                    AuthService.getCurrentUser().id
                );
            });
        }

        if (this.state.successful) {
            UserService.updateProfileInfo(
                this.state.editFirstName,
                this.state.editLastName,
                this.state.editEmail,
                this.state.editNumber,
                this.state.editPassword
            )
                .then((response) => {
                    if (response.status === 200) {
                        var user = response.data;
                        this.setState({
                            edit: false,
                            content: user,
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
        this.setState({ loading: true });
        UserService.getProfile()
            .then((response) => {
                this.setState({
                    content: response,
                    loading: false,
                    successful: true,
                });
                if (response.image) {
                    this.setState({
                        image:
                            "data:image/jpg;base64," + response.image.picByte,
                    });
                }
                this.setState({
                    editPassword: this.state.content.password,
                    editFirstName: this.state.content.firstName,
                    editLastName: this.state.content.lastName,
                    editEmail: this.state.content.email,
                    editNumber: this.state.content.number,
                });
            })
            .catch((error) => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString(),
                });
            });
    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        }
        return (
            <React.Fragment>
                <div
                    className="container"
                    style={{
                        width: "100%",
                        padding: "0% 10%",
                        margin: "8% auto",
                        backgroundColor: "#ffffff",
                        position: "relative",
                    }}
                >
                    {!this.state.edit && (
                        <div
                            className="profile-content"
                            style={{
                                width: "100%",
                                paddingBottom: "10%",
                                marginTop: "5%",
                                backgroundColor: "#fffff",
                            }}
                        >
                            <div
                                style={{
                                    width: "50%",
                                    height: "250px",
                                    float: "right",
                                }}
                            >
                                {this.state.image && (
                                    <img
                                        src={this.state.image}
                                        alt="img"
                                        style={{
                                            width: "60%",
                                            height: "100%",
                                            float: "right",
                                            boxShadow:
                                                "0px 14px 80px rgba(34, 35, 58, 0.2)",
                                        }}
                                    />
                                )}
                                {!this.state.image && (
                                    <img
                                        src={require("../../images/profile-picture.jpg")}
                                        alt="default-avatar"
                                        style={{
                                            width: "60%",
                                            height: "100%",
                                            float: "right",
                                            boxShadow:
                                                "0px 14px 80px rgba(34, 35, 58, 0.2)",
                                        }}
                                    />
                                )}
                            </div>
                            <ul
                                style={{
                                    display: "inline-block",
                                    width: "50%",
                                }}
                            >
                                <li>
                                    <h2>My profile</h2>
                                </li>
                                <hr></hr>
                                <li>
                                    <h5>
                                        Username: {this.state.content.username}
                                    </h5>
                                </li>
                                <li>
                                    <h5>
                                        First Name:{" "}
                                        {this.state.content.firstName}
                                    </h5>
                                </li>
                                <li>
                                    <h5>
                                        Last Name: {this.state.content.lastName}
                                    </h5>
                                </li>
                                <li>
                                    <h5>E-mail: {this.state.content.email}</h5>
                                </li>
                                <li>
                                    <h5>
                                        Phone:{" "}
                                        {this.state.content.number}
                                    </h5>
                                </li>
                            </ul>
                            <div style={{ marginTop: "20px" }}>
                                <button
                                    onClick={(e) => {
                                        this.setState({ edit: true });
                                    }}
                                    className="submit-button btn btn-primary btn-block"
                                    style={{ width: "30%" }}
                                >
                                    Edit details
                                </button>
                            </div>
                        </div>
                    )}

                    {this.state.edit && (
                        <div>
                            <Form
                                autoComplete="off"
                                className="form-wrapper"
                                onSubmit={this.handleSubmit}
                                ref={(c) => {
                                    this.form = c;
                                }}
                            >
                                <div
                                    className="wrapper"
                                    style={{ padding: "5%" }}
                                >
                                    <div>
                                        <h2>Update details</h2>
                                        <ul
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <li style={{ paddingTop: "20px" }}>
                                                <label htmlFor="text">
                                                    First Name
                                                </label>
                                            </li>
                                            <li>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="editFirstName"
                                                    value={
                                                        this.state.editFirstName
                                                    }
                                                    onChange={this.handleChange}
                                                    validations={[vname]}
                                                />
                                            </li>
                                            <li style={{ paddingTop: "20px" }}>
                                                <label htmlFor="text">
                                                    Last Name
                                                </label>
                                            </li>
                                            <li>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="editLastName"
                                                    value={
                                                        this.state.editLastName
                                                    }
                                                    onChange={this.handleChange}
                                                    validations={[vname]}
                                                />
                                            </li>
                                            <li style={{ paddingTop: "20px" }}>
                                                <label htmlFor="email">
                                                    Email
                                                </label>
                                            </li>
                                            <li>
                                                <Input
                                                    type="email"
                                                    className="form-control"
                                                    name="editEmail"
                                                    value={this.state.editEmail}
                                                    onChange={this.handleChange}
                                                    validations={[email]}
                                                />
                                            </li>
                                            <li style={{ paddingTop: "20px" }}>
                                                <label htmlFor="tel">
                                                    Phone number
                                                </label>
                                            </li>
                                            <li>
                                                <Input
                                                    type="tel"
                                                    className="form-control"
                                                    name="editNumber"
                                                    value={
                                                        this.state.editNumber
                                                    }
                                                    onChange={this.handleChange}
                                                />
                                            </li>
                                            <li style={{ paddingTop: "20px" }}>
                                                <label htmlFor="password">
                                                    Password
                                                </label>
                                            </li>
                                            <li>
                                                <Input
                                                    type="password"
                                                    className="form-control"
                                                    name="editPassword"
                                                    value={
                                                        this.state.editPassword
                                                    }
                                                    onChange={this.handleChange}
                                                    validations={[vpassword]}
                                                />
                                            </li>
                                            <li style={{ paddingTop: "30px" }}>
                                                <label htmlFor="file">
                                                    Photo
                                                </label>
                                            </li>
                                            <li>
                                                <input
                                                    style={{ width: "350px" }}
                                                    type="file"
                                                    onChange={
                                                        this.fileSelectedHandler
                                                    }
                                                ></input>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Form>
                            <div style={{ width: "30%", marginLeft: "34%" }}>
                                {this.state.edit && (
                                    <button
                                        style={{ marginBottom: "42px" }}
                                        type="submit"
                                        className="submit-button btn btn-danger btn-block"
                                        onClick={() => {
                                            this.setState({ edit: false });
                                        }}
                                    >
                                        Cancel
                                    </button>
                                )}
                                <button
                                    style={{ marginBottom: "42px" }}
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

export default Profile;
