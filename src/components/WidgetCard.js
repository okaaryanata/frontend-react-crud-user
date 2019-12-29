import React, { Component } from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardFooter,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
  FormFeedback,
  Row,
  Col
} from "reactstrap";
import * as Api from "../api/Api";
import "../css/style.css";

class WidgetCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role_list: {},
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      pass1: "",
      pass2: "",
      role: "",
      role_id: "",
      id: "",

      isFirstnameEmpty: false,
      isLastnameEmpty: false,
      isUsernameEmpty: false,
      isEmailEmpty: false,
      isPass1Empty: false,
      isPass2Empty: false,
      isRoleEmpty: false,

      modalEdit: false,
      modalDelete: false,
      accModalDelete: false,
      accModalUpdate: false
    };
    this.toggleDelete = this.toggleDelete.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleModalDelete = this.toggleModalDelete.bind(this);
    this.toggleModalUpdate = this.toggleModalUpdate.bind(this);
    this.toggleAccModalDelete = this.toggleAccModalDelete.bind(this);
    this.toggleAccModalUpdate = this.toggleAccModalUpdate.bind(this);
  }
  componentWillMount() {
    var role_list = Api.getListRole();
    this.setState({ role_list: role_list });
  }
  toggleAccModalDelete() {
    this.setState({
      accModalDelete: true
    });
    Api.deleteUser(this.state.data.data[0].id);
  }
  toggleAccModalUpdate() {
    this.setState({
      accModalUpdate: true
    });
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
      this.state.pass1 !== undefined &&
      this.state.pass1 !== "" &&
      this.state.pass1.length < 6
    ) {
      isPass1Empty = true;
      this.setState({
        isPass1Empty: isPass1Empty
      });
    }
    if (
      this.state.pass2 === undefined &&
      this.state.pass2 === "" &&
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
        role_id: this.state.role_id,
        id: this.state.id
      };
      if (this.state.pass1 !== "") {
        request.password = this.state.pass1;
      }
      Api.updateUser(request);
    }
    // Api.updateWidget(request);
  }
  toggleModalUpdate(e) {
    this.toggleEdit(e);
    this.setState(prevState => ({
      modalEdit: !prevState.modalEdit
    }));
  }
  toggleModalDelete(e) {
    this.setState(prevState => ({
      modalDelete: !prevState.modalDelete
    }));
    this.toggleDelete(e);
  }
  toggleEdit(e) {
    var res = Api.getUserById(e.currentTarget.id);
    if (res.data !== undefined) {
      var role_list = Api.getListRole();
      role_list = this.state.role_list.data.filter(function(value, index, arr) {
        return value.id !== res.data[0].role.id;
      });
      let obj = { data: role_list };
      this.setState({
        firstname: res.data[0].firstname,
        lastname: res.data[0].lastname,
        username: res.data[0].username,
        email: res.data[0].email,
        role: res.data[0].role,
        role_id: res.data[0].role.id,
        role_list: obj,
        id: res.data[0].id
      });
    }
  }
  toggleDelete(e) {
    var res = Api.getUserById(e.currentTarget.id);
    this.setState({ data: res });
  }
  checkUser() {
    var auth = Api.auth();
    if (auth.results === "success") {
      if (auth.data.role.role_name === "admin") {
        return (
          <div>
            <Button
              outline
              color="secondary"
              id={this.props.widget.id}
              onClick={this.toggleModalDelete}
              className="mr-2"
            >
              Hapus
            </Button>
            <Button
              id={this.props.widget.id}
              onClick={this.toggleModalUpdate}
              color="primary"
            >
              Edit
            </Button>
          </div>
        );
      } else {
        return (
          <div>
            <Button
              disabled
              outline
              color="secondary"
              id={this.props.widget.id}
              onClick={this.toggleModalDelete}
              className="mr-2"
            >
              Hapus
            </Button>
            <Button
              disabled
              id={this.props.widget.id}
              onClick={this.toggleModalUpdate}
              color="primary"
            >
              Edit
            </Button>
          </div>
        );
      }
    } else {
      window.location = "/login";
    }
  }
  componentModalUpdate() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalEdit}
          toggle={this.toggleModalUpdate}
          size="lg"
        >
          <ModalHeader toggle={this.toggleModalUpdate}>Edit User</ModalHeader>
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
                      value={this.state.role_id}
                      onChange={event => {
                        this.setState({
                          isRoleEmpty: false,
                          role_id: event.target.value
                        });
                      }}
                    >
                      <option
                        value={this.state.role.id}
                        key={this.state.role.id}
                      >
                        {this.state.role.role_name}
                      </option>
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
                    <Label htmlFor="pass1">Password</Label>
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
                    <FormFeedback>Password min 6 karakter</FormFeedback>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md="12">
                    <Label htmlFor="pass2">Konfirmasi Password</Label>
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
            <Button outline color="secondary" onClick={this.toggleModalUpdate}>
              Batal
            </Button>{" "}
            <Button color="primary" onClick={this.toggleAccModalUpdate}>
              Ubah
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  componentModalDelete() {
    return (
      <div>
        <Modal isOpen={this.state.modalDelete} toggle={this.toggleModalDelete}>
          <ModalHeader toggle={this.toggleModalDelete}>
            Hapus Widget
          </ModalHeader>
          <ModalBody>Anda yakin akan menghapus data </ModalBody>
          <ModalFooter>
            <Button outline color="secondary" onClick={this.toggleModalDelete}>
              Batal
            </Button>{" "}
            <Button color="primary" onClick={this.toggleAccModalDelete}>
              Hapus
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  render() {
    return (
      <div>
        <Card className="mb-3 card" id={this.props.widget.id}>
          <CardBody className="text-left">
            <CardTitle className="card-title">
              {this.props.widget.username}
            </CardTitle>
            <CardSubtitle className="price">
              {this.props.widget.role.role_name}
            </CardSubtitle>
            <CardText className="text-muted description">
              {this.props.widget.email}
            </CardText>
          </CardBody>
          <CardFooter className="text-right">{this.checkUser()}</CardFooter>
        </Card>
        {this.componentModalUpdate()}
        {this.componentModalDelete()}
      </div>
    );
  }
}

export default WidgetCard;
