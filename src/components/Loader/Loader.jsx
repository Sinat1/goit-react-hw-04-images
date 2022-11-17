import { Blocks } from 'react-loader-spinner';
import { Wrapper } from './Loader.styled';

export const Loader = () => {
  return (
    <Wrapper>
      <Blocks
        visible={true}
        height="300"
        width="300"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    </Wrapper>
  );
};
