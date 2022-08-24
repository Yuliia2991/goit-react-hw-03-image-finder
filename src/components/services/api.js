// import { toast } from 'react-toastify';

// export const fetchImages = name => {
//   const BASE_URL = 'https://pixabay.com/api/';
//   const API_KEY = '27845155-2bfc883cc65018053cc1f72dd';

//   return fetch(
//     `${BASE_URL}?key=${API_KEY}&q=${name}&page=1&image_type=photo&orientation=horizontal&per_page=12`
//   ).then(response => {
//     if (response.ok) {
//       return response.json();
//     }
//     return Promise.reject(
//       toast.error(`Sorry but there is no image ${name} in the gallery`)
//     );
//   });
// };

// setTimeout(() => {
//   fetchImages(nextName)
//     .then(data => {
//       const images = data.hits;
//       console.log(images)

//       if (images.length > 0) {
//         this.setState({ images, status: 'resolved', });

//       //   this.setState(({ items }) => ({
//       //   items: [...items, ...data.hits],
//       //   totalPages: Math.ceil(data.totalHits / HITS_PER_PAGE),
//       // }));
//         // const newImages = image.hits;
//         // console.log(newImages);
//         // this.setState(prevState => ({
//         // images: [...prevState.images, newImages ],
//         // status: 'resolved',
//       //   totalImages: image.totalHits,
//       // }));

//       } else {
//         toast.error("Image isn't found");
//         this.setState({ status: 'idle' });
//       }
//     })
//     .catch(error => this.setState({ error, status: 'rejected' }));
// }, 500);
