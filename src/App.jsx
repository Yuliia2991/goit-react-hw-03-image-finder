import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { fetchImages } from 'components/services/api';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    error: null,
    status: 'idle',
    images: [],
    totalImages: 0,
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {

      this.setState({ status: 'pending' });
        
        fetchImages(nextQuery, nextPage)     
        .then(data => {
          if (data.hits.length > 0) {
 
            this.setState(prevState => ({
              images: [...prevState.images, ...data.hits],
              status: 'resolved',
              totalImages: data.totalHits,
            }));
                          
          } else {
            toast.error(`${nextQuery} not found`);
            this.setState({ status: 'idle' });
          }
        })
        
    }
  }

  handleFormSubmit = name => {
    if (name !== this.state.query) {
      this.setState({ query: name, page: 1, images: [],  });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1, 
    }));
  };

  render() {
    const { page, error, status, images, totalImages } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        
        {(status === 'resolved' || images.length) > 0 && < ImageGallery images={images} />}
      
        {status === 'pending' && <Loader />}

        {status === 'rejected' && <p>{error.message}</p>}

        {status === 'resolved' &&
          totalImages > 12 &&
          page < totalImages / 12 && <Button onClick={this.loadMore} />}

        <ToastContainer autoClose={1500} />
      </>
    );
  }
}
