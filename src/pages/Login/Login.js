import React, { Component } from "react";
import background from "../../assets/img/group.png";
import Center from "react-center";
import {
  Button,
  FormGroup,
  Label,
  FormFeedback,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import * as Api from "../../api/Api";
import "../style.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {},
      request: {},
      isPassEmpty: false,
      isEmailEmpty: false
    };
  }
  toggleUpdateEmail(event) {
    var req = this.state.request;
    req.email = event.target.value;
    this.setState({
      request: req,
      isEmailEmpty: false
    });
  }
  toggleUpdatePassword(event) {
    var req = this.state.request;
    req.password = event.target.value;
    this.setState({
      request: req,
      isPassEmpty: false
    });
  }

  handleClick = () => {
    if (
      this.state.request === {} ||
      (this.state.request.password === undefined &&
        this.state.request.email === undefined) ||
      (this.state.request.password === "" && this.state.request.email === "")
    ) {
      this.setState({ isEmailEmpty: true, isPassEmpty: true });
    } else if (
      this.state.request.password === "" ||
      this.state.request.password === undefined
    ) {
      this.setState({ isPassEmpty: true });
    } else if (
      this.state.request.email === "" ||
      this.state.request.email === undefined
    ) {
      this.setState(this.setState({ isEmailEmpty: true }));
    } else {
      var res = Api.login(this.state.request);
      this.setState({
        response: res
      });
    }
  };

  componentWillMount() {
    if (Api.checkCookie() === true) {
      Api.removeCookie();
    }
  }

  render() {
    return (
      // <div className="app flex-row align-items-center " style={{backgroundColor: "#ffff"}}>
      <div className="container">
        <div className="left-box">
          <div className="card">
            <div className="head"></div>
            <div className="card-body">
              <Form>
                <h1>CRUD User</h1>
                <p className="text-muted mb-4">
                  Selamat datang, silahkan masuk ke akun anda.
                </p>
                <InputGroup className="mb-3 mt-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-user"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    invalid={this.state.isEmailEmpty}
                    type="email"
                    placeholder="Email"
                    autoComplete={this.state.request.email}
                    onChange={event => this.toggleUpdateEmail(event)}
                  />
                  <FormFeedback>Email harus diisi</FormFeedback>
                </InputGroup>
                <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-lock"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    invalid={this.state.isPassEmpty}
                    type="password"
                    placeholder="Password"
                    autoComplete={this.state.request.password}
                    onChange={event => this.toggleUpdatePassword(event)}
                  />
                  <FormFeedback>Password harus diisi</FormFeedback>
                </InputGroup>

                <Row className="mb-2">
                  <Col xs="6">
                    <FormGroup check className="checkbox">
                      <Input
                        className="form-check-input px-0"
                        type="checkbox"
                        id="checkbox1"
                        name="checkbox1"
                        value="option1"
                      />
                      <Label
                        check
                        className="form-check-label px-0"
                        htmlFor="checkbox1"
                      >
                        Ingat Saya
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col xs="6" sm="6" md="3">
                    {/* <Button block color="success" className="" onClick={this.handleClick}>Masuk</Button> */}
                    <Button
                      block
                      color="success"
                      className="mt-3"
                      onClick={this.handleClick}
                    >
                      Masuk
                    </Button>
                  </Col>
                  {/* <Col xs="4" sm="4" md="3">
                        <Button block outline color="success" className="" href="#/activation">Aktivasi</Button>
                      </Col> */}
                  <Col xs="6" sm="6" md="3">
                    <Button
                      block
                      outline
                      color="success"
                      className="mt-3"
                      href="/register"
                    >
                      Daftar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
        <div className="right-box">
          <div className="image">
            <img
              src={background}
              className="image-background"
              alt="Italian Trulli"
            ></img>
          </div>
        </div>
        <div className="bottom-left">
          <Center>
            <h5 className="detail">
              Powered By <span className="name">oka</span>
            </h5>
          </Center>
        </div>
        {/* </Container> */}
        {/* {window.location.reload()} */}
      </div>
    );
  }
}

export default Login;
