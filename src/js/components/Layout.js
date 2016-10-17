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
        <div className="result-item-container col-lg-12 col-xs-12">
          <img className="avatar_img" src={result.owner.avatar_url} alt="avatar_url" />
          <h2>{result.full_name}</h2>
        </div>
      </div>)

    return (
      <div>
        <div className="search-group">
          <input className="search-box" type="text" ref="searchTerms" placeholder="Whatcha looking for?" />
          <button className="btn keywords-btn" onClick={this.searchKeywords.bind(this)}>
            <i class="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
        <div className="results-container col-lg-12">
          <div className="show-results col-lg-9">
            {resultList}
          </div>
        </div>
      </div>
    );
  }
}
