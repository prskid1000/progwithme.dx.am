/* eslint-disable */
import React from "react";
import { Button } from "react-bootstrap";
import '../style/main.css';
import axios from "axios";

class postView extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          alert:"Welcome to site",
          user: localStorage.getItem('userid'),
          password: localStorage.getItem('password'),
          boxid: localStorage.getItem('boxid'),
          chats: [],
          mycomment: ""
        }
   
    this.handleChange = this.handleChange.bind(this);
    this.addComment = this.addComment.bind(this);
    this.Home = this.Home.bind(this);
  }

  addComment(event) {
    const data = {
      userid: this.state.user,
      boxid: this.state.boxid,
      message: this.state.mycomment
    }

    axios.post("https://ichatb.herokuapp.com/sendbox", data, {
      "Content-Type": "application/json"
    })
      .then(res => {
        this.setState({'chats': res.data.data.chat});
      });

  }

  handleChange(event){
    this.setState({ 'mycomment': event.target.value });
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }

  Home(event) {
    this.props.history.push("/index");
  }

  getData = () => {
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 10000);

    this.setState({ 'user': localStorage.getItem('userid') });
    this.setState({ 'password': localStorage.getItem('password') });
    this.setState({ 'boxid': localStorage.getItem('boxid') });

    const data = {
      boxid: this.state.boxid,
    }

    axios.post("https://ichatb.herokuapp.com/getbox", data, {
      "Content-Type": "application/json"
    })
      .then(res => {
        if (res.data.success === "True") {
          this.setState({ 'chats': [] });
          for (var i of res.data.data.chat) {
            this.state.chats.push({ author: i.author, message: i.message })
          }
          this.setState({ 'chats': this.state.chats });
        }
        else {
          this.setState({ 'alert': "Error in Communication" });
        }
      });

    this.intervalID = setTimeout(this.getData.bind(this), 5000);
    console.log("hi");
  }

  componentDidMount() {
    this.getData();
  }

    render() {
        return (
          <div className="container">
            <nav className="collapse navbar-collapse navbar navbar-expand-md navbar-dark bg-dark">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="navbar-brand fa fa-fw fa-home big-icon text-white" onClick={this.Home}></a>
                  <p className="h6 text-warning">Home</p>
                </li>
                <li className="nav-item">
                  <center><a className="navbar-brand fa fa-fw fa-sign-out big-icon text-white clickable" href="/"></a></center>
                  <p className="h6 text-warning">Logout</p>
                </li>
              </ul>
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <p className="h1 text-warning font-italic font-weight-bolder">IChat-Web</p>
                </li>
              </ul>
              <ul className="navbar-nav">
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
              <div className="col-12 bg-dark p-5">
                <div className="input-group col-8 m-3">
                  <span className="h1 badge badge-warning col-3 m-1">
                    Boxid
                        <span className="badge badge-success">
                      {this.state.boxid}
                      </span>
                  </span>
                </div>
                {this.state.chats.map((chat, index) => (
                  <div className="input-group col-10 m-4">
                    <div className="input-group-prepend">
                      {
                        chat.author != this.state.user &&
                        <span className="input-group-text text-success">{chat.author}</span>
                      }
                    </div>
                    <textarea className="form-control" className="form-control" value={chat.message} disabled ></textarea>
                    {
                      chat.author == this.state.user &&
                      <span className="input-group-text text-danger">{chat.author}</span>
                    }
                  </div>
                ))}
                <div className="input-group col-10 m-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text text-danger">Message</span>
                  </div>
                  <textarea rows="5" className="form-control" className="form-control" value={this.state.mycomment} onChange={this.handleChange}></textarea>
                  <div className="input-group col-2 m-3">
                    <Button className="btn btn-danger" onClick={this.addComment} id="Send Message">Send Message</Button>
                  </div>
                </div>
              </div> 
            </div>
          </div>
        );
    }
}

export default postView;
