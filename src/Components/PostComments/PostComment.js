import React, {Component} from 'react';
import {Card, Button, Nav, Dropdown} from 'react-bootstrap';
import './PostComment.css';
import Spinner from '../../UI/Spinner/Spinner';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewPost from '../NewPost/NewPost';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/action';
import SideBar from './SideBar/SideBar';
import Logout from '../Auth/LogOut';

class PostComment extends Component{

state={
    showNewPost: false,
    search: "",
    post: false,
}


componentDidMount() {
    this.props.onFetchPosts();
    const loggedInUser = localStorage.getItem("user");
    if(loggedInUser) {
            this.props.onSignIn(loggedInUser);
    }
}

ShowFunction = () => {
    this.setState({showNewPost: !this.state.showNewPost})
}

searchHandler = (event) => {
    this.setState({search: event.target.value});
}

postLiked = (id) => {
    this.props.onLikePost(this.props.user, id)
}

postUnliked = (id, unlikeID) => {
    this.props.onUnlikePost(id, unlikeID)
}

render() {
    let cardData = <center> <Spinner/></center>
    if(!this.props.loading){
        cardData = <div>
        <Nav className="NavBar">
           <h1 style={{color:"#0e387a"}} 
           className="brandHeading">Valence</h1>
       <div className="topSection">
       <input type="text" className="Searchbar" 
        placeholder=" Search for topics or keywords..."
        onChange={(event) => this.searchHandler(event)}
        />
       <div className="styleNewPost">
       <NewPost/>
       </div>
       
       <Dropdown>
  <Dropdown.Toggle variant="outline-primary">
    {this.props.user.split('@')[0]}
  </Dropdown.Toggle>

  <Dropdown.Menu id="drop">
    <Dropdown.Item 
    href="/update-profile">Update Profile</Dropdown.Item>
    <div className="dropdown-divider"></div>
    <Dropdown.Item style={{marginTop:"2px"}}><Logout/></Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
     
       </div>
        </Nav>

        <div className="styleSideBar">
            <SideBar/>
        </div>  

       <div className="posts">  
            {this.props.data.filter((res) => {
                let string = this.state.search;
                if(string === "") {
                    return res;
                }
                else if (res.Comment.toLowerCase().includes(string.toLowerCase()) || 
                res.User.toLowerCase().includes(string.toLowerCase()))
                 {
                    return res;
                }    

            }).reverse().map((res) => {     
        
                const liked = [];
                for(let key in res.LikedBy){
                        liked.push({
                        ...res.LikedBy[key],
                        id: key
                    });
                }

                let boolButton = false;
                if(liked.filter((val) => {
                    if(val.username === this.props.user) {
                        boolButton = true
                    }
                }))
        return(
        <div>
                   <Card
                   key={res.id}
                   className="Cards"
                   >

                  <Card.Body
                  className="container">
                       <h6>
                       @{res.User}
                        </h6>
                       <Card.Text>
                        {res.Comment} 
                       </Card.Text>
                        
                        <div>
                            <center>
                        <img className="cardImgStyle" alt="bin" src={res.ImageUrl} />
                            </center>
                            </div>                  

                    <div className="bottomButtons">
                   
                    {boolButton ? <Button className="btn btn-primary likeDislike"
                    id="likeButton"
                    onClick={() => this.postUnliked(res.id, liked.find((val) => {
                        if(val.username === this.props.user){
                            return val.id;
                        }
                    }))}
                     >
                     <FontAwesomeIcon icon={faThumbsUp} style={{width:"13.5px", color:"white"}}/>
                     </Button> : <Button className="btn btn-light likeDislike"
                    id="likeButton"
                    onClick={() => this.postLiked(res.id)}
                    >
                     <FontAwesomeIcon icon={faThumbsUp} style={{width:"13.5px"}}/>
                     </Button>
                      }

                    <label
                    style={{fontSize:"13px", padding:"20px"}}
                    >
                        Liked by {liked.length} people.
                    </label>
                     
                 <Button className={(res.User === this.props.user.split('@')[0] ? "btn btn-danger showDel" : "hideDel")}
                 onClick={() => this.props.onDeletePost(res.id)}
                 >
                     <FontAwesomeIcon icon={faTrash} style={{width:"12px", marginLeft:"-1px"}}/>   
                     </Button>
                     </div> 
                   </Card.Body>
                   <Card.Footer style={{position:"relative", marginTop:"5px"}}>
                       {res.Date}
                   </Card.Footer>
                   </Card>                                
           </div>
        )}
)}
</div>
</div>
}

return(

<div className="PostPage"> 
    {cardData}
 </div>

);
}
}

const mapStateToProps = state => {
    return {
        data: state.Data,
        loading: state.loading,
        user: state.currentUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onFetchPosts: () => dispatch(actions.FetchPost()),
        onDeletePost: (postId) => dispatch(actions.DeletePost(postId)),
        onSignIn: (user) => dispatch(actions.HandleAuth(user)),
        onLikePost: (username, postId) => dispatch(actions.likePost(username, postId)),
        onUnlikePost: (id, unlikeId) => dispatch(actions.unlikePost(id, unlikeId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostComment);