import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { StyledOverlay, StyledModal } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, requestName, imageLink }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <StyledOverlay className="overlay" onClick={handleOverlayClick}>
      <StyledModal className="modal">
        <img src={imageLink} alt={requestName} width="100%" />
      </StyledModal>
    </StyledOverlay>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  requestName: PropTypes.string.isRequired,
  imageLink: PropTypes.string.isRequired,
};
