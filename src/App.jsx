import { Component } from 'react';
// import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
// import css from './components/Section/Section.module.css'

export class App extends Component {
  state = {
    name: '',
  };

  handleFormSubmit = name => {
    this.setState({ name });
  };

  render() {
    const { name, loading } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {loading && <p>Loading...</p>}
        <ImageGallery imageName={name} />
        
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}
