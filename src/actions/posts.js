import axios from 'axios';

export const fetchPosts = () => async dispatch => {
  try {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    dispatch(writePosts(data));
  } catch ({ message }) {
    console.log(message);
    throw new Error(message);
  }
};

const writePosts = posts => ({ type: 'WRITE_POSTS', payload: { posts } });
