import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27845155-2bfc883cc65018053cc1f72dd';

export class ImageGallery extends Component {
  state = {
    image: null,
    loading: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;

    if (prevName !== nextName) {
      fetch(`${BASE_URL}?key=${API_KEY}&q=${nextName}&image_type=photo`)
        .then(res => res.json())
        .then(image => this.setState({ image }));
      // .finally(() => this.setState({ loading: false }));
    }
    // this.setState({ loading: true });
  }

  render() {
    const { image } = this.state;
    return (
      <div>
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
