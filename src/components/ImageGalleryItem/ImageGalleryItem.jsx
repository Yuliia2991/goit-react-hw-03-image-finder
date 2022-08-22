import css from './ImageGalleryItem.module.css'

export const ImageGalleryItem = ({ id, url, tags }) => {
    return (       
                <li key={id} className={css.ImageGalleryItem}>
                  <img className={css.ImageGalleryItemImage} src={url} alt={tags} />
                </li>
       
    )
}