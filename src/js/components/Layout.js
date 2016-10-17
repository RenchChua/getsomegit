import React from "react"
import ReactDOM from 'react-dom'
import axios from 'axios'


export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
      searchResults: [],
    };
  }

  searchKeywords(e){
    e.preventDefault()
    var searchKeywords = this.refs.searchTerms.value
    axios.get('https://api.github.com/search/repositories?q=' + searchKeywords)
      .then(function(response){
        this.setState({searchResults:response.data.items})
        console.log(this.state.searchResults);

      }.bind(this));
  }

  render() {
    const resultList = this.state.searchResults.map( result =>
      <div key={result.id} id={result.id}>
        <div className="result-item">
          <a href={result.html_url} target="_blank"> {result.full_name}</a>
        </div>
      </div>)
    return (
      <div>
        <input className="search-box" type="text" ref="searchTerms" placeholder="Whatcha looking for?" />
        <button className="btn keywords-btn" onClick={this.searchKeywords.bind(this)}>
          <i class="fa fa-search" aria-hidden="true"></i>
        </button>
        <div className="show-results">
          {resultList}
        </div>
      </div>
    );
  }
}
