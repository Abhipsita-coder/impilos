import axios from 'axios';

const methodMap = {
  GET: async (url) => await axios.get(url),
  POST: async (url, data) => await axios.post(url, data),
  PUT: async (url, data) => await axios.put(url, data),
  DELETE: async (url) => await axios.delete(url),
};

const callAPI = async (url, method, data = null) => {
  try {
    const response = await methodMap[method](url, data);
    return response.data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

export { callAPI };
