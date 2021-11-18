import React, {Component} from "react";
import axios from "axios";
import './SideBar.css'

class SideBar extends Component {

state = {
    article: []
}

async componentDidMount() {
   await Promise.all([  
    
    axios
    .get(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=5efb5d432a364abab6bfc15d1cd275d6`)
    .then(res => {
      const articles = this.state.article.concat(res.data.articles);
      
      this.setState({ article: articles });
    })
    .catch(error => {
      console.log(error);
    }),

    axios
    .get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=5efb5d432a364abab6bfc15d1cd275d6`)
    .then(res => {      
      const articles = this.state.article.concat(res.data.articles);
      
      this.setState({ article: articles });
    })
    .catch(error => {
      console.log(error);
    }),

    axios
    .get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=5efb5d432a364abab6bfc15d1cd275d6`)
    .then(res => {      
      const articles = this.state.article.concat(res.data.articles);
      
      this.setState({ article: articles });
    })
    .catch(error => {
      console.log(error);
    }),

])
}

componentWillUnmount() {
    this.setState = (state)=>{
        return;
    };
}

render() {
    return (
        <div className="sidequeue">
             <h4 id="sideHeading" style={{marginBottom: "20px"}}>Trending</h4>
            {
                this.state.article.map((news, id) => {
                    return(
                    <div key={id}>
                      
                      <div className="news">
                         <a href={news.url}>
                             <p id="pSide" >{news.title}</p>
                             </a>
                      </div>
                    
                    </div>
                    );
                })
            }
        </div>
    )
}

}
export default SideBar;