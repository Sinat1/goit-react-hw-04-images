import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  StyledSearchbar,
  StyledSearchForm,
  StyledSearchFormBtn,
  StyledSearchFormInput,
} from './Searchbar.styled';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';
import { useState } from 'react';

export default function Searchbar({ onSubmit }) {
  const [requestName, setRequestName] = useState('');

  const handleRequestChange = event => {
    setRequestName(event.currentTarget.value.toLowerCase());
  };

  const handleSumbit = event => {
    event.preventDefault();
    if (requestName.trim() === '') {
      return toast.warning('Type something in the input');
    }
    onSubmit(requestName);
    setRequestName('');
  };

  return (
    <StyledSearchbar>
      <StyledSearchForm onSubmit={handleSumbit}>
        <StyledSearchFormBtn type="submit">
          <SearchIcon />
        </StyledSearchFormBtn>

        <StyledSearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={requestName}
          onChange={handleRequestChange}
        />
      </StyledSearchForm>
    </StyledSearchbar>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
