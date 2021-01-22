/* eslint-disable */
import React from "react";
import { Button } from "react-bootstrap";
import '../style/main.css';
import axios from "axios";

class createPost extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      alert: "Welcome to site",
      user: localStorage.getItem('userid'),
      password: localStorage.getItem('password'),
      question: "",
      description: "",
    }
    this.viewPosts = this.viewPosts.bind(this);
    this.createPost = this.createPost.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveChange = this.saveChange.bind(this);
    this.Home = this.Home.bind(this);
  }

  saveChange(event) {
    const data = {
      userid: this.state.user,
      password: this.state.password,
      question: this.state.question,
      description: this.state.description,
      author: this.state.user,
    }
    axios.post("https://codenutb.herokuapp.com/createpost", data, {
      "Content-Type": "application/json"
    })
      .then(res => {
        console.log(res.data);
        if (res.data.success === "True") {
          this.setState({ 'alert': "Post Created Successfully" });
        }
        else {
          this.setState({ 'alert': "Error in Communication" });
        }
      });
  }

  handleChange(event) {
    switch (event.target.id) {
      case "question":
        this.setState({ 'question': event.target.value });
        break;
      case "description":
        this.setState({ 'description': event.target.value });
        break;
    }
  }

  viewPosts(event) {
    this.props.history.push("/viewposts");
  }

  createPost(event) {
    this.props.history.push("/createpost");
  }

  Home(event) {
    this.props.history.push("/index");
  }

  componentDidMount() {
    this.setState({ 'user': localStorage.getItem('userid') });
    this.setState({ 'password': localStorage.getItem('password') });
  }

  render() {
    return (
      <div className="container">
        <nav className="collapse navbar-collapse navbar navbar-expand-md navbar-dark bg-dark">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="navbar-brand fa fa-fw fa-home big-icon" onClick={this.Home}></a>
              <p className="h6 text-warning">Home</p>
            </li>
            <li className="nav-item">
              <center><a className="navbar-brand fa fa-fw fa-sign-out big-icon text-white clickable" href="/"></a></center>
              <p className="h6 text-warning">Logout</p>
            </li>
          </ul>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <p className="h1 text-warning font-italic font-weight-bolder">CodeNut</p>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <center><a className="navbar-brand fa fa-fw fa-book big-icon text-white clickable" onClick={this.viewPosts}></a></center>
              <p className="h6 text-warning">Posts</p>
            </li>
            <li className="nav-item">
              <center><a className="navbar-brand fa fa-fw fa-pencil big-icon text-white clickable" onClick={this.createPost}></a></center>
              <p className="h6 text-warning">Create</p>
            </li>
            <li className="nav-item">
              <center><a className="navbar-brand fa fa-fw fa-user big-icon text-white" ></a></center>
              <p className="h6 text-warning">{this.state.user}</p>
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
          <div className="col-12 bg-dark">
            <div className="input-group col-10 m-3">
              <div className="input-group-prepend">
                <span className="input-group-text text-danger">Question</span>
              </div>
              <input type="text" className="form-control" title={JSON.stringify(this.state)} value={this.state.question} onChange={this.handleChange} id="question"></input>
            </div>
            <div className="input-group col-10 m-3">
              <div className="input-group-prepend">
                <span className="input-group-text text-danger">Desciption</span>
              </div>
              <textarea class="form-control" className="form-control" title={JSON.stringify(this.state)} value={this.state.description} onChange={this.handleChange} id="description"></textarea>
            </div>
            <div className="input-group col-10 m-3">
              <center className="col-12"><Button className="btn btn-danger col-6" onClick={this.saveChange} id="Create">Create</Button></center>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default createPost;
