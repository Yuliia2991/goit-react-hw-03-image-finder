import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

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
    const { id, url, tags, largeImage } = this.props;
    return (
      <>
        <li key={id} className={css.ImageGalleryItem}>
          <img
            onClick={this.openModal}
            className={css.ImageGalleryItemImage}
            src={url}
            alt={tags}
          />
        </li>
        {isModalOpen && <Modal src={largeImage} alt={tags} onClose={this.closeModal} />}
      </>
    );
  }
}
