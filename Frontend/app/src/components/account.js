/* eslint-disable */
import React from "react";
import { Button } from "react-bootstrap";
import '../style/main.css';
import axios from "axios";

class Accounts extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          alert:"Welcome to site",
          userid:"",
          password:""
        }
      this.handleChange = this.handleChange.bind(this);
      this.Login = this.Login.bind(this);
      this.Register = this.Register.bind(this);
      this.checkPassword = this.checkPassword.bind(this);
      this.Home = this.Home.bind(this);
    }

  Home(event) {
    this.props.history.push("/");
  }

  handleChange(event){
    switch (event.target.id)
    {
      case "userid":
        this.setState({'userid': event.target.value});
        break;
      case "password":
        this.setState({'password': event.target.value });
        break;
    }
  }

  checkPassword(event)
  {
    if (event.target.value != this.state.password)
    {
      this.setState({ 'alert': "Password Mismatch" });
    }
    else
    {
      this.setState({ 'alert': "Password Matched" });
    }
  }

  Login(event) {
  const data = {
      userid: this.state.userid,
      password: this.state.password
    }
    axios.post("https://codenutb.herokuapp.com/isauth",  data , {
      "Content-Type": "application/json" })
    .then(res => {
      console.log(res.data.success);
      if(res.data.success === "True")
      {
        localStorage.setItem('userid', this.state.userid);
        localStorage.setItem('password', this.state.userid); 
        this.props.history.push("/index");
      }
      else
      {
        this.setState({ 'alert': "Error in Communication" });
      }
    });
  }

  Register(event) {
    const data = {
      userid: this.state.userid,
      password: this.state.password
    }
    axios.post("https://codenutb.herokuapp.com/adduser", data, {
      "Content-Type": "application/json"
    })
      .then(res => {
        console.log(res.data.success);
        if (res.data.success === "True") {
          localStorage.setItem('userid', this.state.userid);
          localStorage.setItem('password', this.state.userid); 
          this.props.history.push("/index");
        }
        else {
          this.setState({ 'alert': "Error in Communication" });
        }
      });
  }

    render() {
        return (
          <div className="container">
            <nav className="collapse navbar-collapse navbar navbar-expand-md navbar-dark bg-dark">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="navbar-brand fa fa-fw fa-home big-icon" onClick={this.Home}></a>
                </li>
              </ul>
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <p className="h1 text-warning font-italic font-weight-bolder">CodeNut</p>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <center><a className="navbar-brand fa fa-fw fa-book big-icon text-white"></a></center>
                </li>
                <li className="nav-item">
                  <center><a className="navbar-brand fa fa-fw fa-pencil big-icon text-white"></a></center>
                </li>
                <li className="nav-item">
                  <center><a className="navbar-brand fa fa-fw fa-user big-icon text-white"></a></center>
                </li>
              </ul>
            </nav>
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>{this.state.alert}</strong>
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <br></br>
            
            <div className="row">
              <div className="col-md-6">
                <div className="col-md-12 bg-dark pb-3">
                  <center><p className="h3 text-warning font-italic font-weight-bolder">Login</p></center>
                  <form>
                    <div className="form-group col-8 text-white">
                      <label htmlFor="userid">Userid</label>
                      <input type="text" className="form-control" id="userid" placeholder="Userid" onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group col-8 text-white">
                      <label htmlFor="password">Password</label>
                      <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handleChange}></input>
                    </div>
                    <center><Button className="btn btn-danger col-6" onClick={this.Login} id="Login">Login</Button></center>
                  </form>
                  </div>
              </div>
              <div className="col-md-6">
                <div className="col-md-12 bg-dark pb-3">
                  <center><p className="h3 text-warning font-italic font-weight-bolder">Register</p></center>
                  <form>
                    <div className="form-group col-8 text-white">
                      <label htmlFor="userid">Userid</label>
                      <input type="text" className="form-control" id="userid" placeholder="Userid" onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group col-8 text-white">
                      <label htmlFor="password">Password</label>
                      <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group col-8 text-white">
                      <label htmlFor="password">Re-Enter Password</label>
                      <input type="password" className="form-control" id="password" placeholder="Re-Enter Password" onChange={this.checkPassword}></input>
                    </div>
                    <center><Button className="btn btn-danger col-6" onClick={this.Register}  id="Register">Register</Button></center>
                  </form>
                  </div>
              </div>
            </div>
          </div>
        );
    }
}

export default Accounts;
