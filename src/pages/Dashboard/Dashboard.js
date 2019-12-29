import React, { Component } from "react";
import TopNavBar from "../../components/Navbar";
import MainArea from "../../components/Main";
import Footer from "../../components/Footer";

class Dashboard extends Component {
  //   constructor(props) {
  //     super(props);
  //   }

  render() {
    return (
      <div>
        <TopNavBar></TopNavBar>
        <MainArea></MainArea>
        <Footer></Footer>
      </div>
    );
  }
}

export default Dashboard;
