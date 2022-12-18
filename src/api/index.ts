import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const get = async <T>(url: string): Promise<T> => {
  const fullURL = BASE_URL + url;
  const response = await fetch(fullURL);

  if (!response.ok) {
    throw new Error(`HTTPS error! status: ${response.status}`);
  }

  const data = await response.json();

  return data;
};

export const getPosts = () => get<Post[]>('/posts');

export const getComments = (postId: number) =>
  get<Comment[]>(`/posts/${postId}/comments`);
