import { toast } from 'react-toastify';

export const fetchImages = (nextQuery, nextPage) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '27845155-2bfc883cc65018053cc1f72dd';

  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${nextQuery}&page=${nextPage}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      toast.error(`Sorry but there is no image ${nextQuery} in the gallery`)
    );
  });
};
