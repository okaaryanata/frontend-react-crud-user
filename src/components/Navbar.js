import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Row,
  Col
} from "reactstrap";

import * as Api from "../api/Api";
import "../css/style.css";

class TopNavbar extends Component {
  constructor() {
    super();
    this.state = {
      role_list: {},
      modalAdd: false,
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      pass1: "",
      pass2: "",
      role_id: 0,
      isFirstnameEmpty: false,
      isLastnameEmpty: false,
      isUsernameEmpty: false,
      isEmailEmpty: false,
      isPass1Empty: false,
      isPass2Empty: false,
      isRoleEmpty: false
    };
    this.toggle = this.toggle.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  componentWillMount() {
    var role_list = Api.getListRole();
    this.setState({ role_list: role_list });
  }
  toggle() {
    this.setState(prevState => ({
      modalAdd: !prevState.modalAdd
    }));
  }
  toggleLogout() {
    window.location = "/login";
  }
  onFormSubmit() {
    let isFirstnameEmpty = false;
    let isLastnameEmpty = false;
    let isUsernameEmpty = false;
    let isEmailEmpty = false;
    let isPass1Empty = false;
    let isPass2Empty = false;
    let isRoleEmpty = false;

    if (this.state.firstname === undefined || this.state.firstname === "") {
      isFirstnameEmpty = true;
      this.setState({
        isFirstnameEmpty: isFirstnameEmpty
      });
    }
    if (this.state.lastname === undefined || this.state.lastname === 0) {
      isLastnameEmpty = true;
      this.setState({
        isLastnameEmpty: isLastnameEmpty
      });
    }
    if (this.state.username === undefined || this.state.username === "") {
      isUsernameEmpty = true;
      this.setState({
        isUsernameEmpty: isUsernameEmpty
      });
    }
    if (this.state.email === undefined || this.state.email === "") {
      isEmailEmpty = true;
      this.setState({
        isEmailEmpty: isEmailEmpty
      });
    }
    if (
      this.state.pass1 === undefined ||
      this.state.pass1 === "" ||
      this.state.pass1.length < 6
    ) {
      isPass1Empty = true;
      this.setState({
        isPass1Empty: isPass1Empty
      });
    }
    if (
      this.state.pass2 === undefined ||
      this.state.pass2 === "" ||
      this.state.pass2.length < 6
    ) {
      isPass2Empty = true;
      this.setState({
        isPass2Empty: isPass2Empty
      });
    }
    if (this.state.role_id === undefined || this.state.role_id === 0) {
      isRoleEmpty = true;
      this.setState({
        isRoleEmpty: isRoleEmpty
      });
    }
    if (this.state.pass1 !== this.state.pass2) {
      isPass1Empty = true;
      isPass2Empty = true;
      this.setState({
        isPass1Empty: isPass1Empty,
        isPass2Empty: isPass2Empty
      });
    }
    if (
      isFirstnameEmpty === false &&
      isLastnameEmpty === false &&
      isUsernameEmpty === false &&
      isEmailEmpty === false &&
      isPass1Empty === false &&
      isPass2Empty === false &&
      isRoleEmpty === false
    ) {
      var request = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        username: this.state.username,
        email: this.state.email,
        password: this.state.pass1,
        role_id: this.state.role_id
      };
      Api.createUser(request);
    }
  }

  checkUser() {
    var auth = Api.auth();
    if (auth.results === "success") {
      if (auth.data.role.role_name === "admin") {
        return (
          <div>
            <NavItem>
              <NavLink onClick={this.toggle} active>
                Tambah User
              </NavLink>
            </NavItem>
          </div>
        );
      }
    } else {
      window.location = "/login";
    }
  }

  render() {
    return (
      <div>
        <Navbar className="navbar" expand="xs">
          <NavbarBrand href="/">
            <b className="navbar-logo">CRUD User</b>
          </NavbarBrand>
          <Collapse navbar>
            <Nav className="ml-auto" pills>
              {this.checkUser()}
              <NavItem className="ml-1">
                <NavLink onClick={this.toggleLogout} active>
                  Keluar
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <Modal isOpen={this.state.modalAdd} toggle={this.toogle} size="lg">
          <ModalHeader toggle={this.toggle}>Tambah User</ModalHeader>
          <ModalBody>
            <Form>
              <p className="text-muted">Kolom dengan tanda * harus diisi</p>
              <FormGroup>
                <Row className="mb-3">
                  <Col md="4">
                    <Label htmlFor="name">Firstname*</Label>
                    <Input
                      invalid={this.state.isFirstnameEmpty}
                      type="text"
                      id="name"
                      placeholder=""
                      value={this.state.firstname}
                      onChange={e =>
                        this.setState({
                          firstname: e.target.value,
                          isFirstnameEmpty: false
                        })
                      }
                    />
                    <FormFeedback>Nama depan harus diisi</FormFeedback>
                  </Col>
                  <Col md="4">
                    <Label htmlFor="lastname">Lastname*</Label>
                    <Input
                      invalid={this.state.isLastnameEmpty}
                      type="text"
                      id="lastname"
                      placeholder=""
                      value={this.state.lastname}
                      onChange={e =>
                        this.setState({
                          lastname: e.target.value,
                          isLastnameEmpty: false
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
                          role_id: event.target.value
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
          </ModalBody>
          <ModalFooter>
            <Button outline color="secondary" onClick={this.toggle}>
              Batal
            </Button>{" "}
            <Button color="primary" onClick={this.onFormSubmit}>
              Tambah
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default TopNavbar;
