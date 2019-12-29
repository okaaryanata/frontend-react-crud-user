import React, { Component } from "react";
import WidgetCard from "./WidgetCard";
import { Container, Row, Col } from "reactstrap";
import * as Api from "../api/Api";
import "../css/style.css";

class Main extends Component {
  constructor() {
    super();

    this.state = {
      widget: [],
      user: {},
      modalAdd: false,
      modalEdit: false
    };
  }

  componentWillMount() {
    const users = Api.getAllUser();
    this.setState({
      user: users
    });
  }
  render() {
    var widgetCards = [];
    if (this.state.user) {
      widgetCards = this.state.user.data.map(widget => {
        return (
          <Col sm="6" md="6" lg="4">
            <WidgetCard widget={widget} />
          </Col>
        );
      });
    }
    return (
      <div className="main">
        <div className="container">
          <Container fluid className="">
            <div className="text-left header-main">
              <h4>
                <b>Dashboard Data User</b>
              </h4>
              <p className="text-muted">
                Di halaman ini akan ditampilkan data user. Tidak hanya
                menampilkan, tapi bisa juga membuat, memperbaharui, dan
                menghapus data user.
              </p>
            </div>
            <Row>{widgetCards}</Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Main;
