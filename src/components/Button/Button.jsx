import { StyledBtn } from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <StyledBtn type="button" onClick={onClick}>
      Load More
    </StyledBtn>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
