/* eslint-disable */
import React from "react";
import { Button } from "react-bootstrap";
import '../style/main.css';
import axios from "axios";

function remove(arr, value) {
  var i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
}

class Index extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          alert:"Welcome to site",
          user: localStorage.getItem('userid'),
          password: localStorage.getItem('password'),
          boxids: [],
          chats: [],
          members: [],
          time: ""
        }

      this.Continue = this.Continue.bind(this);
      this.Delete = this.Delete.bind(this);
      this.Home = this.Home.bind(this);
      this.newChat = this.newChat.bind(this);
    }

  Home(event) {
    this.props.history.push("/index");
  }

  newChat(event){

    var boxid = "#" + this.state.user + "-" + event.target.id;
    console.log(boxid);

    const data = {
      userid: this.state.user,
      boxid: boxid,
      message: "Hi, " + event.target.id
    }

    axios.post("https://ichatb.herokuapp.com/sendbox", data, {
      "Content-Type": "application/json"
    })
      .then(res => {

        if (res.data.success === "True") {
          const data1 = {
            userid: this.state.user,
            boxid: boxid,
          }

          axios.post("https://ichatb.herokuapp.com/setbox", data1, {
            "Content-Type": "application/json"
          })
            .then(res => {

              if (res.data.success === "True") {
                const data2 = {
                  userid: event.target.id,
                  boxid: boxid,
                }

                axios.post("https://ichatb.herokuapp.com/setbox", data2, {
                  "Content-Type": "application/json"
                })
                  .then(res => {

                    if (res.data.success === "True") {
                      localStorage.setItem('boxid', boxid);
                      this.props.history.push("/chat");
                    }
                    else {
                      this.setState({ 'alert': "Error in Communication1" });
                    }
                  });
              }
              else {
                this.setState({ 'alert': "Error in Communication2" });
              }
            });
        }
        else {
          this.setState({ 'alert': "Error in Communication3" });
        }
      });
  }

  Continue(event) {
    localStorage.setItem('boxid', event.target.id);
    this.props.history.push("/chat");
  }

  Delete(event) {
    const data = {
      boxid: event.target.id,
    }


    axios.post("https://ichatb.herokuapp.com/deletebox", data, {
      "Content-Type": "application/json"
    });

    const data1 = {
      userid: event.target.id.substring(1, event.target.id.indexOf('-')),
      boxid: event.target.id
    }
    axios.post("https://ichatb.herokuapp.com/unsetbox", data1, {
      "Content-Type": "application/json"
    });

    const data2 = {
      userid: event.target.id.substring(event.target.id.indexOf('-') + 1),
      boxid: event.target.id
    }
    axios.post("https://ichatb.herokuapp.com/unsetbox", data2, {
      "Content-Type": "application/json"
    });

    var local = new Array();
    for (var i in this.state.chats) {
      if (this.state.chats[i].boxid != event.target.id)
        local.push(this.state.chats[i]);
    }

    remove(this.state.boxids, event.target.id);
    this.setState({ 'boxids': this.state.boxids, 'chats': local });
  }
  
  componentWillUnmount(){
    clearTimeout(this.intervalID);
  }

  getData = () => {
    this.setState({ 'user': localStorage.getItem('userid') });
    this.setState({ 'password': localStorage.getItem('password') });

    const data = {
      userid: this.state.user,
      password: this.state.password
    }
    axios.post("https://ichatb.herokuapp.com/isauth", data, {
      "Content-Type": "application/json"
    })
      .then(res => {

        if (res.data.success === "True") {
          for (var i in res.data.data.boxid) {
            this.state.boxids.push(res.data.data.boxid[i]);
            this.setState({ 'boxids': res.data.data.boxid });
            axios.post("https://ichatb.herokuapp.com/getbox",
              { boxid: this.state.boxids[i] }, {
              "Content-Type": "application/json"
            })
              .then(res => {
                if (res.data.success === "True") {
                  this.setState({ 'chats': []});
                  this.state.chats.push({
                    boxid: res.data.data.boxid,
                    chat: res.data.data.chat
                  })
                  this.setState({ 'chats': this.state.chats });
                }
              });
          }
        }
        else {
          this.setState({ 'alert': "Error in Communication" });
        }
      });

    axios.get("https://ichatb.herokuapp.com/getusers", {
      "Content-Type": "application/json"
    })
      .then(res => {
        if (res.data.success === "True") {
          this.setState({ 'members': [] });
          for (var i in res.data.data) {
            if (this.state.user != res.data.data[i].userid) {
              this.state.members.push({
                userid: res.data.data[i].userid,
              });
            }
          }
          this.setState({ 'members': this.state.members });
        }
        else {
          this.setState({ 'alert': "Error in Communication" });
        }
      });

      this.intervalID = setTimeout(this.getData.bind(this), 5000);
  }

  componentDidMount() {
    this.getData()
  }

    render() {
        return (
          <div className="container">
            <nav className="collapse navbar-collapse navbar navbar-expand-md navbar-dark bg-dark">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="navbar-brand fa fa-fw fa-home big-icon text-white clickable" onClick={this.Home}></a>
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
                  <center><a className="navbar-brand fa fa-fw fa-user big-icon text-white"></a></center>
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
              <div className="col-10 bg-warning pb-5">
                <center><p className="bg-dark col-6 h3 text-white font-weight-bolder">Your Chats!</p></center> 
                <center>
                    {this.state.chats.map((chat, index) => (
                      <div className="row col-11 mt-2 pb-3" id={index}>
                        <span className="h5 badge badge-danger mr-1 p-1" id={index}>
                          Boxid
                        <span className="badge badge-success">
                            {chat.boxid}
                          </span>
                        </span>
                        <div className="card col-12">
                          <div className="card-body">
                            {chat.chat.reverse().slice(0,2).map((chat, index) => (
                              <div className="input-group col-10 m-3">
                                <div className="input-group-prepend">
                                  {
                                  chat.author != this.state.user &&
                                    <span className="input-group-text text-success">{chat.author}</span>
                                  }
                                </div>
                                <textarea className="form-control" className="form-control" value={chat.message}  disabled ></textarea>
                                {
                                  chat.author == this.state.user &&
                                  <span className="input-group-text text-danger">{chat.author}</span>
                                }
                              </div>
                            ))}
                            <div className="row col-10">
                              <Button className="btn btn-danger col-3 m-1" onClick={this.Delete} id={chat.boxid}>Delete Chat</Button>
                              <Button className="btn btn-danger col-3 m-1" onClick={this.Continue} id={chat.boxid}>Continue Chat</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </center>
              </div>
              <div className="col-2 bg-muted">
                <center><p className="bg-dark col text-white font-weight-bolder">Members!</p></center>
                  {this.state.members.map((user, index) => (
                    <span className="badge badge-danger m-1 pt-1" id={index}>
                      {user.userid}
                      <span className="h2 badge badge-success p-2 m-1 clickable" id={user.userid} onClick={this.newChat} >
                        New Chat
                      </span>
                    </span>
                  ))}
              </div>
            </div>
          </div>
        );
    }
}

export default Index;
