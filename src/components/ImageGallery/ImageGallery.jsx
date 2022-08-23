import { Component } from 'react';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { fetchImages } from '../services/api';
import { Button } from 'components/Button/Button';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = {
    image: null,
    error: null,
    status: 'idle',
    images: [],
    page: 1,  
    totalImages: 0,
  };


  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };


  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;

    if (prevName !== nextName || prevState.page !== this.state.page) {
      this.setState({ status: 'pending' });

  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '27845155-2bfc883cc65018053cc1f72dd';
      fetch(
        `${BASE_URL}?key=${API_KEY}&q=${nextName}&page=${this.state.page}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => response.json())
        .then(data => {
           if (data.hits.length !== 0) {
             this.setState({ images: [...data.hits], status: 'resolved', totalImages: data.totalHits });
           }
        })
    }
  }

  render() {
    const { error, status, images, totalImages, page } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return <p>{error.message}</p>;
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className={css.ImageGallery}>
            {images.map(({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                url={webformatURL}
                tags={tags}
                largeImage={largeImageURL}
              />
            ))}
          </ul>
          { totalImages > 12 && page < totalImages / 12 && <Button onClick={this.loadMore} />}
        </>
      );
    }
  }
}
