import React, {Component} from 'react';
import {Button, Form, Modal, ModalBody, ModalTitle} from 'react-bootstrap';
import './NewPost.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/action';
import axios from '../../axios-comments';
import {storage} from '../../firebase/firebase';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import Spinner from '../../UI/Spinner/Spinner';
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



var today = new Date(),
date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

class newPost extends Component{

    state={
        input:'',
        selectedFile: null,
        url:"",
        currentDate: date,
        show: false,
        loading: false,
        clicked: false,
    }

fileHandler = (event) => {
this.setState({selectedFile: event.target.files[0]});
}

inputHandler = (event) => {
    this.setState({input: event.target.value});
}

onUploadFile = () => {

    this.setState({loading:true});
    const image = this.state.selectedFile

if(image != null){
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
        "state_changed",
        snapshot => {},
        error => {
            console.log(error);
        },
        () => {
            storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
                console.log(url);
              this.setState({url: url, loading: false});
            });
        }
    );
    }
    this.setState({clicked:true});
}

onSubmitComment = (e) => {
    e.preventDefault();

    const userDeatil = this.props.currentUser.split('@')[0];
const postData = {
    Comment: this.state.input,
    ImageUrl: this.state.url,
    Date: this.state.currentDate,
    User: userDeatil,
}

this.props.newPostData(postData);

this.setState({input: '', url: '', clicked: false, selectedFile: null, show: false});
}

showModal = () => {
    this.setState({show: !this.state.show});
}


render(){

let imageInput = <div className="image-upload">
    
        <input id="file-input" 
        type="file"
        accept="image/*"
        required
          onChange={this.fileHandler}/>
     </div> 

    if(this.state.selectedFile != null && !this.state.loading){
        imageInput = <Button className="btn btn-warning"
        style={{marginLeft: "5px"}}
        onClick={this.onUploadFile}>
            Upload
        </Button>
    }

    else if(this.state.loading){
        imageInput = <Spinner/>
    }

     if(this.state.clicked && !this.state.loading){
         imageInput = <div><b>Successfully Uploaded</b></div>
     }

    return(
        <div>

           <div className="NewPost"> 
            <Button
            id="AddPost"
            className="btn btn-outline-primary"
           onClick={this.showModal}> 
             <FontAwesomeIcon id="iconStyle" icon={faPlus} />
            </Button>
           </div>

            <Modal  style={{minHeight:"100vh"}} show={this.state.show}>
            <div className="w-100">                  
           
                <ModalHeader>
                    <ModalTitle>
                        <h4>New Post</h4>
                    </ModalTitle>
                  <Button onClick={this.showModal}
                    style={{color:"white", float:"right"}}
                      className="btn btn-danger">
                               <center>
                     <FontAwesomeIcon icon={faTimes} style={{width:"15px"}}/>
                     </center>
                
                          </Button>
                </ModalHeader>
                
                <ModalBody>
                <Form onSubmit={this.onSubmitComment}>
                     <Form.Group id="image">
                         <Form.Label>
                         Please select an image:             
                         </Form.Label> 
                          {imageInput}
                     </Form.Group>                    
                
                     <Form.Group id="description">
                         <Form.Label>
                         What are your thoughts on this image?            
                         </Form.Label>      
                            <textarea 
                             className="text"
                               rows='5'
                             cols='45'
                              maxLength="500"
                            placeholder="Write here"
                             onChange={this.inputHandler}
                            value={this.state.input}
                              />
                         </Form.Group>
                         <Button 
                   type="submit"
                   disabled={!this.state.input && !this.state.selectedFile}
                     className="btn btn-info w-100">
                       POST!
                       </Button>
                 </Form>
                  </ModalBody>
        </div>
            </Modal>
     </div>
);
}
}

const mapStateToProps = state => {
    return {
       currentUser: state.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        newPostData: (postData) => dispatch(actions.NewPost(postData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(newPost, axios);