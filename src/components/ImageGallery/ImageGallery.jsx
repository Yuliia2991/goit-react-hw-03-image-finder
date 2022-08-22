import { Component } from 'react';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import css from './ImageGallery.module.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27845155-2bfc883cc65018053cc1f72dd';

export class ImageGallery extends Component {
  state = {
    image: null,
    loading: false,
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;

    if (prevName !== nextName) {
      this.setState({ loading: true, image: null });
      fetch(`${BASE_URL}?key=${API_KEY}&q=${nextName}&image_type=photo`)
        .then(response => {
          if (response.ok) {
            return response.json()
          }
          return Promise.reject(toast.error(`Sorry but there is no image ${nextName} in the gallery`))
        })          
        .then(image => {            
          image.hits.length > 0 ? this.setState({ image }) : toast.error("Image isn't found")          
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    
    const { image, loading, error} = this.state;
    return (
      <div>
        {error && <p>{error.message}</p>}
        {loading && <Loader />}        
        {image && (
          <ul className={css.ImageGallery}>
            {image.hits.map(({ id, webformatURL, tags }) => (
              <ImageGalleryItem key={id} url={webformatURL} tags={tags} />
            ))}
          </ul>
        )}
      </div>
    );
  }
}
