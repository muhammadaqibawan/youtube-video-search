import SearchBar from './components/SearchBar';
import axios from './axios/index';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';
// import Loader from './components/Loader/Loader';

import React, { Component } from 'react';

class App extends Component {

  state = {
    videos: [],
    loader: false,
    selectedVideo: null
  }

  componentDidMount(){
    this.onFormSubmit('buildings')
  }

  onFormSubmit = (value)=>{
    axios('search',{
      params: {
        q: value
      }
    })
      .then((response) =>{
        console.log(response.data.items)
        this.setState({
          ...this.state,
          videos: response.data.items,
          selectedVideo: response.data.items[0]
        })
      }).catch(error=>{
    })
  }

  onVideoSelect = (video)=>{
    this.setState({ selectedVideo: video })
  }

  render() {
    return (
    <div className="ui container" style={{ 'marginTop': '10px' }}>
      <SearchBar 
      onFormSubmit={this.onFormSubmit} />
      <div className="ui grid">
        <div className='ui row'>
          <div className='ten wide column'>
            <VideoDetail video={this.state.selectedVideo} />
          </div>
          <div className='six wide column'>
            <VideoList 
            videos={this.state.videos}
            onVideoSelect={this.onVideoSelect} />
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
