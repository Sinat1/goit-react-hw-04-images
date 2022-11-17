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
  const [loadAllPages, setLoadAllPages] = useState(false);
  // state = {
  //   requestName: '',
  //   images: [],
  //   bigImageLink: '',
  //   bigImageDescription: '',
  //   page: 1,
  //   isLoading: false,
  //   loadAllPages: false,
  // };

  useEffect(() => {
    if (!page || !requestName) {
      return;
    }
      getImages(requestName, page);

    
  });
  // }, [page, requestName]);


  // componentDidUpdate(_, prevState) {
  //   if (
  //     prevState.page !== this.state.page ||
  //     prevState.requestName !== this.state.requestName
  //   ) {
  //     this.getImages(this.state.requestName, this.state.page);
  //   }
  // }

  const handleFormSubmit = requestName => {
    if (!requestName) {
      setRequestName('');
      setImages([]);
      setPage(1);
      setLoadAllPages(false);
    }
  };

  // handleFormSubmit = requestName => {
  //   if (requestName !== this.state.requestName) {
  //     this.setState({
  //       requestName,
  //       images: [],
  //       page: 1,
  //       loadAllPages: false,
  //     });
  //   }
  // };

  const getImages = async (requestName, page) => {
    try {
      setIsLoading(true);
      const { hits } = await ImageService.fetchImages(requestName, page);
      if (hits.length > 0) {
        setImages([...images, ...hits]);
        setLoadAllPages(true);
        toast.success('Hooray, we found something!');
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  
  // getImages = async (requestName, page) => {
  //   try {
  //     this.setState({ isLoading: true });
  //     const { hits } = await ImageService.fetchImages(requestName, page);
  //     if (hits.length > 0) {
  //       this.setState(prevState => ({
  //         images: [...prevState.images, ...hits],
  //         loadAllPages: true,
  //       }));
  //       toast.success('Hooray, we found something!');
  //       this.setState({ isLoading: false });
  //     } else {
  //       this.setState({ isLoading: false });
  //       toast.error('Something went wrong');
  //     }
  //   } catch (error) {
  //     toast.error(`${error.message}`);
  //   }
  // };

  const loadMore = () => {
    setPage(page + 1);
  };

  // loadMore = () => {
  //   this.setState(prevState => ({
  //     page: prevState.page + 1,
  //   }));
  // };

  const defineBigImageLink = (link, desc) => {
    setBigImageLink(link);
    setBigImageDescription(desc);
  };

  // setBigImageLink = (link, desc) => {
  //   this.setState({ bigImageLink: link, bigImageDescription: desc });
  // };

  const resetBigImageLink = () => {
    setBigImageLink('');
    setBigImageDescription('');
  };

  // resetBigImageLink = () => {
  //   this.setState({ bigImageLink: '', bigImageDescription: '' });
  // };

  // const { images, requestName, bigImageLink, isLoading } = this.state;

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
