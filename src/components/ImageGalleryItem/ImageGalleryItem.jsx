import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { isModalOpen } = this.state;
    const { url, tags, largeImage } = this.props;
    return (
      <>
        <li className={css.ImageGalleryItem}>
          <img
            onClick={this.openModal}
            className={css.ImageGalleryItemImage}
            src={url}
            alt={tags}
          />
        </li>
        {isModalOpen && (
          <Modal src={largeImage} alt={tags} onClose={this.closeModal} />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired, 
};
