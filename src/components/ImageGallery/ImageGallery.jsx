import { Component } from 'react';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { fetchImages } from '../services/api';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = {
    image: null,
    error: null,
    status: 'idle',
  };
  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;

    if (prevName !== nextName) {
      this.setState({ status: 'pending' });

      setTimeout(() => {
        fetchImages(nextName)
          .then(image => {
            image.hits.length > 0
              ? this.setState({ image, status: 'resolved' })
              : toast.error("Image isn't found") &&
                this.setState({ status: 'idle' });
          })
          .catch(error => this.setState({ error, status: 'rejected' }));
      }, 500);
    }
  }

  render() {
    const { image, error, status } = this.state;

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
            {image.hits.map(({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                url={webformatURL}
                tags={tags}
                largeImage={largeImageURL}
              />
            ))}
          </ul>
        </>
      );
    }
  }
}
