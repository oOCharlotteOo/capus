import axios from 'axios';

class Client {
  apiUrl = 'http://10.0.0.10:8000/';
  imagesUrl = this.apiUrl + 'images/';
  accessToken = null;

  url(path) {
    return this.apiUrl + path;
  }

  async list(resource) {
    return (await axios.get(this.url(resource))).data;
  }

  async get(resource, id) {
    return (await axios.get(this.url(resource + '/' + id))).data;
  }

  async post(resource, data) {
    return (await axios.post(this.url(resource), data)).data;
  }

  async put(resource, id, data) {
    return (await axios.put(this.url(resource + '/' + id), data)).data;
  }

  async delete(resource, id) {
    return (await axios.delete(this.url(resource + '/' + id))).data;
  }

  getAxios() {
    return axios;
  }

  setAccessToken(accessToken) {
    axios.interceptors.request.use(
      config => {
        config.headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
  }
}

export default Client;
