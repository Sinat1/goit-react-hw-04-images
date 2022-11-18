import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar';
import Modal from 'components/Modal';
import ImageGallery from 'components/ImageGallery';
import * as ImageService from 'api/fetchImages';

export default function App() {
  const [requestName, setRequestName] = useState('');
  const [images, setImages] = useState([]);
  const [bigImageLink, setBigImageLink] = useState('');
  const [bigImageDescription, setBigImageDescription] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!requestName) {
      return;
    }

    async function getImages(requestName, page) {
      setIsLoading(true);
      try {
        const { hits } = await ImageService.fetchImages(requestName, page);
        if (hits.length > 0) {
          setImages([...images, ...hits]);
          toast.success('Hooray, we found something!');
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.error('Something went wrong');
        }
      } catch (error) {
        toast.error(`${error.message}`);
      }
    }
    getImages(requestName, page);
    // eslint-disable-next-line
  }, [page, requestName]);

  const handleFormSubmit = requestName => {
    if (requestName) {
      setRequestName(requestName);
      setImages([]);
      setPage(1);
    }
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const defineBigImageLink = () => {
    setBigImageLink(bigImageLink);
    setBigImageDescription(bigImageDescription);
  };

  const resetBigImageLink = () => {
    setBigImageLink('');
    setBigImageDescription('');
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        galleryImages={images}
        onLoadMore={loadMore}
        isLoading={isLoading}
        clickProp={defineBigImageLink}
      />
      {bigImageLink.length > 0 && (
        <Modal
          onClose={resetBigImageLink}
          requestName={requestName}
          imageLink={bigImageLink}
        />
      )}
      <ToastContainer autoClose={1500} />
    </div>
  );
}
