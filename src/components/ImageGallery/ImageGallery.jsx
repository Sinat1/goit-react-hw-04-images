import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import { SlyledImageGallery } from './ImageGallery.styled';
import { Loader } from 'components/Loader/Loader';
import Button from 'components/Button';
import PropTypes from 'prop-types';

const ImageGallery = ({ galleryImages, onLoadMore, isLoading, clickProp }) => {
  return (
    <>
      {isLoading && <Loader />}
      <SlyledImageGallery>
        {galleryImages.map(image => (
          <ImageGalleryItem
            key={image.id}
            id={image.id}
            preview={image.webformatURL}
            clickHandler={() => clickProp(image.largeImageURL, image.tags)}
            tags={image.tags}
          />
        ))}
      </SlyledImageGallery>
      {galleryImages.length > 0 && galleryImages.length >= 12 ? (
        <Button onClick={onLoadMore} />
      ) : (
        ''
      )}
    </>
  );
};

ImageGallery.propTypes = {
  galleryImages: PropTypes.array.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  clickProp: PropTypes.func.isRequired,
};

export default ImageGallery;
