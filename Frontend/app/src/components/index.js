/* eslint-disable */
import React from "react";
import { Button } from "react-bootstrap";
import '../style/main.css';
import axios from "axios";


class Index extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          alert:"Welcome to site",
          user: localStorage.getItem('userid'),
          password: localStorage.getItem('password'),
          posts: [],
          contributors: [{ 'userid': 'prskid1000', 'exp': '1000' }, { 'userid': 'devil2021', 'exp': '1000' }]
        }

      this.fullView = this.fullView.bind(this);
      this.viewPosts = this.viewPosts.bind(this);
      this.createPost = this.createPost.bind(this);
      this.Home = this.Home.bind(this);
    }

  viewPosts(event){
    this.props.history.push("/viewposts");
  }

  Home(event) {
    this.props.history.push("/index");
  }

  createPost(event) {
    this.props.history.push("/createpost");
  }
    fullView(event){
      var post = JSON.parse(event.target.value);
      this.props.history.push({
        pathname: '/postview',
        state: { question: post.question, author: post.author}
      });
      this.props.history.push("/postview");
    }
  
  

  componentDidMount() {

    this.setState({ 'user': localStorage.getItem('userid') });
    this.setState({ 'password': localStorage.getItem('password') });

    axios.get("https://codenutb.herokuapp.com/getallpost",{
      "Content-Type": "application/json"
    })
      .then(res => {
        
        if (res.data.success === "True") {
          for (var i in res.data.data) {
            this.state.posts.push({ question: res.data.data[i].question,
              desciption: res.data.data[i].description,
              author: res.data.data[i].author,
              votes: res.data.data[i].votes,
            });
            if(i === 5)break;
          }
          this.setState({'posts': this.state.posts});
        }
        else {
          this.setState({ 'alert': "Error in Communication" });
        }
      });

    axios.get("https://codenutb.herokuapp.com/getalluser", {
      "Content-Type": "application/json"
    })
      .then(res => {

        if (res.data.success === "True") {
          for (var i in res.data.data) {
            this.state.contributors.push({
              userid: res.data.data[i].userid,
              exp: res.data.data[i].exp,
            });
            if (i === 20) break;
          }
          this.setState({ 'contributors': this.state.contributors });
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
                  <p className="h1 text-warning font-italic font-weight-bolder">CodeNut</p>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <center><a className="navbar-brand fa fa-fw fa-book big-icon text-white clickable"  onClick={this.viewPosts}></a></center>
                  <p className="h6 text-warning">Posts</p>
                </li>
                <li className="nav-item">
                  <center><a className="navbar-brand fa fa-fw fa-pencil big-icon text-white clickable" onClick={this.createPost}></a></center>
                  <p className="h6 text-warning">Create</p>
                </li>
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
                <center><p className="bg-dark col-6 h3 text-white font-weight-bolder">Top Posts!</p></center> 
                <center>
                    {this.state.posts.map((post, index) => (
                      <div className="row col-11 mt-2 pb-3" id={index}>
                        <span className="h5 badge badge-danger" id={index}>
                          Votes
                        <span className="badge badge-success">
                            {post.votes}
                          </span>
                        </span>
                        <div className="card col-12">
                          <div className="card-body">
                            <h5 className="card-title overflow-auto text-danger">{post.question}</h5>
                            <p className="card-text overflow-auto">{post.desciption}</p>
                            <center><Button className="btn btn-danger col-6" value={JSON.stringify(post)} onClick={this.fullView} id="Full View">Full View</Button></center>
                          </div>
                        </div>
                      </div>
                    ))}
                </center>
              </div>
              <div className="col-2 bg-muted">
                <center><p className="bg-dark col text-white font-weight-bolder">Top Contributors!</p></center>
                  {this.state.contributors.map((user, index) => (
                    <span className="badge badge-danger m-1 p-1" id={index}>
                      {user.userid}
                      <span className="badge badge-success p-1">
                        {user.exp}
                      </span>
                    </span>
                  ))}
              </div>
              <center className="col-10 mt-2 mb-5"><Button className="btn btn-dark col-12" onClick={this.viewPosts} id="View Posts">View More</Button></center>
            </div>
          </div>
        );
    }
}

export default Index;
