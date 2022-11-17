import {
  StyledGalleryItem,
  StyledGalleryItemImage,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ preview, tags, clickHandler }) => {
  return (
    <StyledGalleryItem onClick={clickHandler}>
      <StyledGalleryItemImage src={preview} alt={tags} />
    </StyledGalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  preview: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
