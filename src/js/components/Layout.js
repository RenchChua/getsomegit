import React from "react"
import ReactDOM from 'react-dom'
import axios from 'axios'


export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
      searchResults: [],
      languages: [],
      description:[],
      followers:[]
    };
    this.showDetails=this.showDetails.bind(this);
    this.searchKeywords=this.searchKeywords.bind(this);
  }

  searchKeywords(e){
    e.preventDefault()
    var searchKeywords = this.refs.searchTerms.value
    if (!searchKeywords) {
      this.setState({searchResults:[]})
      $(".none-found").hide()
      $(".no-keywords").show()
    }else{
      $(".no-keywords").hide()
      axios.get('https://api.github.com/search/repositories?q=' + searchKeywords)
        .then(function(response){
          this.setState({searchResults:response.data.items})
          if (this.state.searchResults.length === 0) {
            $(".none-found").show()
          }

        }.bind(this));
    }
  }

  showDetails(e){
    let eventID = e.target.id
    let resultID = parseInt(eventID.substring(3))
    let resultIDtype = typeof resultID
    for (var i = 0; i < this.state.searchResults.length; i++) {
      let elementID = "#re-" + this.state.searchResults[i].id
      if (this.state.searchResults[i].id === resultID) {
        let userName = this.state.searchResults[i].owner.login
        let resultDescription = this.state.searchResults[i].description
        let fullName = this.state.searchResults[i].full_name

        $(elementID).show()

        // display description with some trimming to handle very long description
        if (!resultDescription) {
          this.setState({description:"No description"})
        } else{
          if (resultDescription.length > 100) {
            let trimmedDescription = resultDescription.substring(0,100) + "..."
            this.setState({description:trimmedDescription})
          }else{
            this.setState({description:resultDescription})
          }

          // display number of followers of user (Note: GitHub doesn't let people follow specific repos)

          axios.get('https://api.github.com/users/' + userName + '/followers' )
            .then(function(response){
              let numOfFollowers = response.data.length
              if (!numOfFollowers) {
                this.setState({followers:"This user has no followers"})
              } else{
                this.setState({followers:numOfFollowers})
              }
            }.bind(this));

            axios.get('https://api.github.com/repos/' + fullName + '/languages' )
              .then(function(response){
                let languages = Object.keys(response.data)
                if (!languages.length) {
                  this.setState({languages:"No languages in this repo"})
                } else{
                  this.setState({languages:languages})
                }

              }.bind(this));

        }
      }else{
        $(elementID).hide()
      }
    }
  }

  render() {
    let resultList
    if (this.state.searchResults.length === 0) {
      resultList = <div className="none-found"><h3>No repos found. Please key in another search term</h3></div>
    }else{
      let resultDetail
      let languageID = 0
      let languages = this.state.languages.map( language =>
        <div key={languageID++} className="language">{language}</div>
      )
      resultList = this.state.searchResults.map( result =>
        <div key={result.id} id={result.id}>
          <div id={"rc-" + result.id} className="result-item-container col-lg-12 col-xs-12" onClick={this.showDetails}>
            <div className="result-basic">
              <img id={"ri-" + result.id} className="avatar_img" src={result.owner.avatar_url} alt="avatar_url" />
              <h2 id={"rn-" + result.id} >{result.full_name}</h2>
            </div>
            <div id={"re-" + result.id} className="result-expanded">
              <a id={"ra-" + result.id} href={result.html_url} target="_blank"> {result.html_url}</a>
              <h3 id={"rd-" + result.id}> Description: {this.state.description}</h3>
              <h3 id={"rl-" + result.id}> Languages: {languages}</h3>
              <h3 id={"rw-" + result.id} className="watchers-count"><i class="fa fa-eye" aria-hidden="true"></i> {result.watchers_count}</h3>
              <h3 id={"rf-" + result.id} className="followers-count">{"Number of followers: " + this.state.followers}</h3>
            </div>
          </div>
        </div>)
    }


    return (
      <div>
        <div className="search-group">
          <input className="search-box col-md-8 col-xs-12" type="text" ref="searchTerms" placeholder="Whatcha looking for?" />
          <button className="btn keywords-btn" onClick={this.searchKeywords.bind(this)}>
            <i class="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
        <div className="no-keywords">
          <h3>Please enter some search terms</h3>
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
