import React, { Component } from "react";
import HostReviewsList from "./HostReviewsList";

import UserService from "../../_services/user.service";

class HostReview extends Component {
    constructor(props) {
        super();

        this.state = {
            content: [],
            loading: false,
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        UserService.getHostReviews()
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
                <main
                    className="container"
                    style={{
                        boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
                        width: "100%",
                        padding: "5%",
                        marginTop: "2%",
                        marginBottom: "10%",
                        backgroundColor: "#ffffff",
                    }}
                >
                    <h4>Reviews on my listings</h4>
                    <HostReviewsList
                        reviews={this.state.content}
                        loading={this.state.loading}
                    />
                </main>
            </React.Fragment>
        );
    }
}

export default HostReview;
