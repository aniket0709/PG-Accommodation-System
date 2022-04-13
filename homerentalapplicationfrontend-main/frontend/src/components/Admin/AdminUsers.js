import React, { Component } from "react";
import UsersList from "./UsersList";

import UserService from "../../_services/user.service";

class AdminUsers extends Component {
    constructor(props) {
        super();

        this.state = {
            content: [],
            loading: false,
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        UserService.getAdminUsers()
            .then((response) => {
                this.setState({
                    content: response.data,
                    loading: false,
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
        return (
            <React.Fragment>
                <div
                    className="container"
                    style={{
                        boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
                        width: "100%",
                        padding: "5%",
                        marginTop: "5%",
                        marginBottom: "5%",
                        backgroundColor: "#ffffff",
                    }}
                >
                    <h4>All users</h4>
                    <UsersList
                        users={this.state.content}
                        loading={this.state.loading}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default AdminUsers;
