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
          old_question:"",
          question: "",
          description: "",
          votes: "",
          comments: [],
          mycomment: ""
        }
    this.viewPosts = this.viewPosts.bind(this);
    this.createPost = this.createPost.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveChange = this.saveChange.bind(this);
    this.upVotePost = this.upVotePost.bind(this);
    this.downVotePost = this.downVotePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.addComment = this.addComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.editComment = this.editComment.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.upVoteComment = this.upVoteComment.bind(this);
    this.downVoteComment = this.downVoteComment.bind(this);
    this.Home = this.Home.bind(this);
  }

  deleteComment(event){
    var id = event.target.id;
    if (this.state.user == this.state.comments[id].author) {
      const data = {
        userid: this.state.user,
        password: this.state.password,
        author: this.state.author,
        question: this.state.old_question,
        idx: id
      }
      axios.post("https://codenutb.herokuapp.com/deletecomment", data, {
        "Content-Type": "application/json"
      })
        .then(res => {
          console.log(res.data);
          if (res.data.success === "True") {
            this.setState({ 'comments': res.data.data.comments });
            this.setState({ 'alert': "Changes Saved" });
          }
          else {
            this.setState({ 'alert': "Error in Communication" });
          }
        });

    }
    else {
      this.setState({ 'alert': 'Only Author can edit it' });
    }
  }
  

  upVoteComment(event){
    var id = event.target.id;
    if (this.state.user == this.state.comments[id].author) {
      const data = {
        userid: this.state.user,
        password: this.state.password,
        author: this.state.author,
        question: this.state.old_question,
        idx: id
      }
      axios.post("https://codenutb.herokuapp.com/upvotec", data, {
        "Content-Type": "application/json"
      })
        .then(res => {
          console.log(res.data);
          if (res.data.success === "True") {
            this.setState({ 'comments': res.data.data.comments });
            this.setState({ 'alert': "Changes Saved" });
          }
          else {
            this.setState({ 'alert': "Error in Communication" });
          }
        });

    }
    else {
      this.setState({ 'alert': 'Only Author can edit it' });
    }
  }

  downVoteComment(event){
    var id = event.target.id;
    if (this.state.user == this.state.comments[id].author) {
      const data = {
        userid: this.state.user,
        password: this.state.password,
        author: this.state.author,
        question: this.state.old_question,
        idx: id
      }
      axios.post("https://codenutb.herokuapp.com/downvotec", data, {
        "Content-Type": "application/json"
      })
        .then(res => {
          console.log(res.data);
          if (res.data.success === "True") {
            this.setState({ 'comments': res.data.data.comments });
            this.setState({ 'alert': "Changes Saved" });
          }
          else {
            this.setState({ 'alert': "Error in Communication" });
          }
        });

    }
    else {
      this.setState({ 'alert': 'Only Author can edit it' });
    }
  }

  editComment(event){
    var id = event.target.id;
    if (this.state.user == this.state.comments[id].author) {
      const data = {
        userid: this.state.user,
        password: this.state.password,
        author: this.state.author,
        question: this.state.old_question,
        newcomment: this.state.comments[id].comment,
        idx: id
      }
      axios.post("https://codenutb.herokuapp.com/updatecomment", data, {
        "Content-Type": "application/json"
      })
        .then(res => {
          console.log(res.data);
          if (res.data.success === "True") {
            this.setState({ 'comments': res.data.data.comments });
            this.setState({ 'alert': "Changes Saved" });
          }
          else {
            this.setState({ 'alert': "Error in Communication" });
          }
        });

    }
    else {
      this.setState({ 'alert': 'Only Author can edit it' });
    }
  }

  saveChange(event){
    const data = {
      userid: this.state.user,
      password: this.state.password,
      author: this.state.author,
      question: this.state.old_question,
      newquestion: this.state.question,
      newdescription: this.state.description,
    }
    axios.post("https://codenutb.herokuapp.com/updatepost", data, {
      "Content-Type": "application/json"
    })
      .then(res => {
        console.log(res.data);
        if (res.data.success === "True") {
          this.setState({ 'old_question': res.data.data.question });
          this.setState({ 'alert': "Changes Saved" });
        }
        else {
          this.setState({ 'alert': "Error in Communication" });
        }
      });
  }

  upVotePost(event) {
    const data = {
      userid: this.state.user,
      password: this.state.password,
      author: this.state.author,
      question: this.state.old_question,
    }
    axios.post("https://codenutb.herokuapp.com/upvoteq", data, {
      "Content-Type": "application/json"
    })
      .then(res => {
        if (res.data.success === "True") {
          this.setState({'votes': res.data.data.votes});
          this.setState({ 'alert': "Changes Saved" });
        }
        else {
          this.setState({ 'alert': "Error in Communication" });
        }
      });
  }

  downVotePost(event) {
    const data = {
      userid: this.state.user,
      password: this.state.password,
      author: this.state.author,
      question: this.state.old_question,
    }
    axios.post("https://codenutb.herokuapp.com/downvoteq", data, {
      "Content-Type": "application/json"
    })
      .then(res => {
        if (res.data.success === "True") {
          this.setState({ 'votes': res.data.data.votes });
          this.setState({ 'alert': "Changes Saved" });
        }
        else {
          this.setState({ 'alert': "Error in Communication" });
        }
      });
  }

  
  deletePost(event) {
    const data = {
      userid: this.state.user,
      password: this.state.password,
      author: this.state.author,
      question: this.state.old_question,
    }
    axios.post("https://codenutb.herokuapp.com/deletepost", data, {
      "Content-Type": "application/json"
    })
      .then(res => {
        console.log(res.data);
        if (res.data.success === "True") {
          this.setState({ 'alert': "Post Deleted" });
          this.props.history.push("/viewposts");
        }
        else {
          this.setState({ 'alert': "Error in Communication" });
        }
      });
  }
  

  handleChange(event){
    var target = JSON.parse(event.target.name);
    if(target.user == target.author)
    {
      switch (event.target.id) {
        case "question":
          this.setState({ 'question': event.target.value });
          break;
        case "description":
          this.setState({ 'description': event.target.value });
        case "mycomment":
          this.setState({ 'mycomment': event.target.value });
          break;
      }
    }
    else
    {
      this.setState({'alert':'Only Author can edit it'});
    }
  }

  handleComment(event) {
    var idx = event.target.id;
    if (this.state.user == this.state.comments[idx].author) {
      this.state.comments[idx].comment = event.target.value;
      this.setState({ 'comments': this.state.comments});
    }
    else {
      this.setState({ 'alert': 'Only Author can edit it' });
    }
  }

  addComment(event){
    const data = {
      userid: this.state.user,
      password: this.state.password,
      author: this.state.author,
      question: this.state.old_question,
      comment: this.state.mycomment,
    }
    axios.post("https://codenutb.herokuapp.com/createcomment", data, {
      "Content-Type": "application/json"
    })
      .then(res => {
        console.log(res.data);
        if (res.data.success === "True") {
          this.setState({'comments': res.data.data.comments});
          this.setState({ 'alert': "Changes Saved" });
        }
        else {
          this.setState({ 'alert': "Error in Communication" });
        }
      });
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

    axios.get("https://codenutb.herokuapp.com/getallpost", {
      "Content-Type": "application/json"
    })
      .then(res => {

        if (res.data.success === "True") {
         
          this.setState({ 'question': res.data.data[0].question});
          this.setState({ 'description': res.data.data[0].description, });
          this.setState({ 'author': res.data.data[0].author });
          this.setState({ 'votes': res.data.data[0].votes });
          this.setState({ 'comments': res.data.data[0].comments });
          this.setState({ 'old_question': res.data.data[0].question });
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
              <div className="col-12 bg-dark p-5">
                <div className="input-group col-10 m-3">
                  <span className="h1 badge badge-warning col-3 m-1">
                    Votes
                        <span className="badge badge-success">
                      {this.state.votes}
                    </span>
                  </span>
                  <span className="h1 badge badge-danger col-1 m-1 clickable" onClick={this.upVotePost}>Up Vote</span>
                  <span className="h1 badge badge-danger col-1.5 m-1 clickable" onClick={this.downVotePost}>Down Vote</span>
                </div>
                
                <div className="input-group col-10 m-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text text-danger">Question</span>
                  </div>
                    <input type="text" className="form-control" name={JSON.stringify(this.state)} value={this.state.question} onChange={this.handleChange} id="question"></input>
                </div>
                <div className="input-group col-10 m-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text text-danger">Desciption</span>
                  </div>
                  <textarea rows="10" className="form-control" className="form-control" name={JSON.stringify(this.state)} value={this.state.description} onChange={this.handleChange} id="description"></textarea>
                  <div className="input-group col-10 m-3">
                    <Button className="btn btn-danger m-3" onClick={this.saveChange} id="Save Change">Save Changes</Button>
                    <Button className="btn btn-danger m-3" onClick={this.deletePost} id="Delete Post">Delete Post</Button>
                  </div>
                </div>
                <div className="input-group col-10 m-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text text-danger">Comment</span>
                  </div>
                  <textarea rows="5" className="form-control" className="form-control" name={JSON.stringify(this.state)} value={this.state.mycomment} onChange={this.handleChange} id="mycomment"></textarea>
                  <div className="input-group col-2 m-3">
                    <Button className="btn btn-danger" onClick={this.addComment} id="Add Comment">Add Comment</Button>
                  </div>
                </div>
                <div className="col-10 bg-danger p-1">
                  <center><p className="bg-dark col-6 h3 text-white font-weight-bolder">All Comments!</p></center>
                  <center>
                    {this.state.comments.map((comment, index) => (
                      <div>
                        <div className="input-group col-10 m-1">
                          <span className="h1 badge badge-warning col-3 m-1">
                            Votes
                        <span className="badge badge-success">
                              {this.state.comments[index].votes}
                            </span>
                          </span>
                          <span className="h1 badge badge-dark col-1.5 m-1 clickable" onClick={this.upVoteComment} id={index}>Up Vote</span>
                          <span className="h1 badge badge-dark col-1.5 m-1 clickable" onClick={this.downVoteComment} id={index}>Down Vote</span>
                        </div>
                        <div className="input-group col-10 mb-5">
                          <div className="input-group-prepend">
                            <span className="input-group-text text-danger">{comment.author}</span>
                          </div>
                          <textarea rows="2" className="form-control" className="form-control" name={JSON.stringify(this.state)} value={this.state.comments[index].comment} onChange={this.handleComment} id={index}></textarea>
                          <div className="input-group col-2 m-3">
                            <Button className="btn btn-success m-1" onClick={this.deleteComment} id={index}>Delete Comment</Button>
                            <Button className="btn btn-success m-1 pl-4 pr-3" onClick={this.editComment} id={index}>Edit Comment</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </center>
                </div>
              </div> 
            </div>
          </div>
        );
    }
}

export default postView;
