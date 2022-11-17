import axios from 'axios';

const API_KEY = '31096187-0d9572226d1d5a0a27ca69533';
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};
// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
export const fetchImages = async (query, page) => {
  const { data } = await axios.get(`?q=${query}&page=${page}&key=${API_KEY}`);
  // const {data} = await axios.get(`https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)

  return data;
};
