import React, { Component } from "react";
import background from "../../assets/img/group.png";
import {
  Button,
  FormGroup,
  Label,
  FormFeedback,
  Col,
  Form,
  Input,
  Row
} from "reactstrap";
import * as Api from "../../api/Api";
import Center from "react-center";
import "../style.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request: {},
      response: {},
      role_list: [],

      firstname: "",
      lastname: "",
      email: "",
      username: "",
      pass1: "",
      pass2: "",
      role: 0,

      isFirstNameEmpty: false,
      isLastNameEmpty: false,
      isEmailEmpty: false,
      isUsernameEmpty: false,
      isPass1Empty: false,
      isPass2Empty: false,
      isRoleEmpty: false
    };
  }
  UNSAFE_componentWillMount() {
    const role_list = Api.getListRole();
    this.setState({ role_list: role_list });
  }

  onFormSubmit = () => {
    var isPass1Empty = false;
    var isPass2Empty = false;
    var isEmailEmpty = false;
    var isLastNameEmpty = false;
    var isFirstNameEmpty = false;
    var isUsernameEmpty = false;
    var isRoleEmpty = false;

    if (
      this.state.firstname === undefined ||
      this.state.firstname === "" ||
      this.state.firstname.length > 100
    ) {
      isFirstNameEmpty = true;
      this.setState({ isFirstNameEmpty: true });
    }
    if (
      this.state.lastname === undefined ||
      this.state.lastname === "" ||
      this.state.lastname.length > 100
    ) {
      isLastNameEmpty = true;
      this.setState({ isLastNameEmpty: true });
    }
    if (this.state.email === undefined || this.state.email === "") {
      isEmailEmpty = true;
      this.setState({ isEmailEmpty: true });
    }
    if (this.state.username === undefined || this.state.username === "") {
      isUsernameEmpty = true;
      this.setState({ isUsernameEmpty: true });
    }
    if (
      this.state.pass1 === undefined ||
      this.state.pass1 === "" ||
      this.state.pass1.length < 6
    ) {
      isPass1Empty = true;
      this.setState({ isPass1Empty: true });
    }
    if (
      this.state.pass2 === undefined ||
      this.state.pass2 === "" ||
      this.state.pass2.length < 6
    ) {
      isPass2Empty = true;
      this.setState({ isPass2Empty: true });
    }
    if (
      this.state.role === undefined ||
      this.state.role === 0 ||
      this.state.role === ""
    ) {
      isRoleEmpty = true;
      this.setState({ isRoleEmpty: true });
    }
    if (this.state.pass2 !== this.state.pass1) {
      isPass1Empty = true;
      isPass2Empty = true;
      this.setState({ isPass1Empty: true, isPass21Empty: true });
    }
    if (
      isPass1Empty === false &&
      isEmailEmpty === false &&
      isLastNameEmpty === false &&
      isFirstNameEmpty === false &&
      isUsernameEmpty === false &&
      isPass2Empty === false &&
      isRoleEmpty === false
    ) {
      var req = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        username: this.state.username,
        password: this.state.pass1,
        role_id: this.state.role
      };
      Api.register(req);
      let path = `login`;
      this.props.history.push(path);
    }
  };

  render() {
    return (
      <div className="container">
        <div className="left-box">
          <div className="card">
            <div className="head"></div>

            <div className="card-body">
              <Form>
                <h2>Daftar</h2>
                <p className="text-muted">Kolom dengan tanda * harus diisi</p>
                <FormGroup>
                  <Row className="mb-3">
                    <Col md="4">
                      <Label htmlFor="name">Firstname*</Label>
                      <Input
                        invalid={this.state.isFirstNameEmpty}
                        type="text"
                        id="name"
                        placeholder=""
                        value={this.state.firstname}
                        onChange={e =>
                          this.setState({
                            firstname: e.target.value,
                            isFirstNameEmpty: false
                          })
                        }
                      />
                      <FormFeedback>Nama depan harus diisi</FormFeedback>
                    </Col>
                    <Col md="4">
                      <Label htmlFor="lastname">Lastname*</Label>
                      <Input
                        invalid={this.state.isLastNameEmpty}
                        type="text"
                        id="lastname"
                        placeholder=""
                        value={this.state.lastname}
                        onChange={e =>
                          this.setState({
                            lastname: e.target.value,
                            isLastNameEmpty: false
                          })
                        }
                      />
                      <FormFeedback>Nama belakang harus diisi</FormFeedback>
                    </Col>
                    <Col md="4">
                      <Label htmlFor="role">Role*</Label>
                      <Input
                        invalid={this.state.isRoleEmpty}
                        type="select"
                        id="role"
                        onChange={event => {
                          this.setState({
                            isRoleEmpty: false,
                            role: event.target.value
                          });
                        }}
                      >
                        <option value="0">Pilih Role</option>
                        {this.state.role_list.data.map(data => (
                          <option key={data.id} value={data.id}>
                            {data.role_name}
                          </option>
                        ))}
                      </Input>
                      <FormFeedback>Role harus diisi</FormFeedback>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md="6">
                      <Label htmlFor="email">Email*</Label>
                      <Input
                        invalid={this.state.isEmailEmpty}
                        type="email"
                        id="email"
                        placeholder=""
                        value={this.state.email}
                        onChange={e =>
                          this.setState({
                            email: e.target.value,
                            isEmailEmpty: false
                          })
                        }
                      />
                      <FormFeedback>Email harus diisi</FormFeedback>
                    </Col>
                    <Col md="6">
                      <Label htmlFor="handphone">Username*</Label>
                      <Input
                        invalid={this.state.isUsernameEmpty}
                        type="text"
                        id="handphone"
                        placeholder=""
                        value={this.state.username}
                        onChange={e =>
                          this.setState({
                            username: e.target.value,
                            isUsernameEmpty: false
                          })
                        }
                      />
                      <FormFeedback>Username harus diisi</FormFeedback>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md="12">
                      <Label htmlFor="pass1">Password*</Label>
                      <Input
                        invalid={this.state.isPass1Empty}
                        type="password"
                        id="pass1"
                        placeholder=""
                        value={this.state.pass1}
                        onChange={e =>
                          this.setState({
                            pass1: e.target.value,
                            isPass1Empty: false
                          })
                        }
                      />
                      <FormFeedback>
                        Password harus diisi, min 6 karakter
                      </FormFeedback>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md="12">
                      <Label htmlFor="pass2">Konfirmasi Password*</Label>
                      <Input
                        invalid={this.state.isPass2Empty}
                        type="password"
                        id="pass2"
                        placeholder=""
                        value={this.state.pass2}
                        onChange={e =>
                          this.setState({
                            pass2: e.target.value,
                            isPass2Empty: false
                          })
                        }
                      />
                      <FormFeedback>Password tidak sama</FormFeedback>
                    </Col>
                  </Row>
                </FormGroup>
              </Form>
              <Row className="mb-3">
                <Col md="7" className="mb-3"></Col>
                <Col md="">
                  <Button
                    block
                    color="success"
                    type="submit"
                    className="mt-3"
                    onClick={this.onFormSubmit}
                  >
                    Kirim
                  </Button>
                </Col>
              </Row>
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
      </div>
    );
  }
}

export default Register;
