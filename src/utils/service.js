import axios from "axios";
import _config from "@/config.js";
import mode from "@/mode.js";
import global from './global'
import alert from './alert'

const env = axios.create({
  baseURL: _config.server[mode],
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    // CORS
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
});
env.interceptors.request.use(
  config => {
    let token = JSON.parse(localStorage.getItem("_token")) || null;
    if (token) {
      token = "Bearer " + token;
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
const _service = {
  signOut() {
    localStorage.clear();
    this.$router.push({ name: "login" });
  },
  raw(method, endPoint, data) {
    // check connection
    if (global.checkInternetConnection() == 'offline') {
      alert.error(null,'Offline', 'Tidak terhubung internet!')
      return;
    }

    return env[method](`${endPoint}`, data)
      .then(response => {
        return response.data;
      })
      .catch(err => {
        throw err;
      });
  },
  post(endPoint, data) {
    // check connection
    if (global.checkInternetConnection() == 'offline') {
      alert.error(null,'Offline', 'Tidak terhubung internet!')
      return;
    }

    return env
      .post(`${endPoint}`, data)
      .then(response => {
        return response.data;
      })
      .catch(err => {
        if (err.response.status === 401) this.signOut();
        else throw err.response;
      });
  },
  put(endPoint, data) {
    // check connection
    if (global.checkInternetConnection() == 'offline') {
      alert.error(null,'Offline', 'Tidak terhubung internet!')
      return;
    }

    return env
      .put(`${endPoint}`, data)
      .then(response => {
        return response.data;
      })
      .catch(err => {
        if (err.response.status === 401) this.signOut();
        else throw err.response;
      });
  },
  get(endPoint, param) {
    // check connection
    if (global.checkInternetConnection() == 'offline') {
      alert.error(null,'Offline', 'Tidak terhubung internet!')
      return;
    }
    
    if (param && param.filters) {
      Object.assign(param, param.filters);
      delete param.filters;
    }
    return env
      .get(`${endPoint}`, { params: param })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        if (err.response.status === 401) this.signOut();
        else throw err.response;
      });
  },
  list(endPoint, param) {
    // check connection
    if (global.checkInternetConnection() == 'offline') {
      alert.error(null,'Offline', 'Tidak terhubung internet!')
      return;
    }

    if (param && param.filters) {
      Object.assign(param, param.filters);
      delete param.filters;
    }
    if (param.page && param.limit) {
      param.offset = param.page > 1 ? (param.page - 1) * param.limit : 0;
    }
    return env
      .get(`${endPoint + ""}/list`, { params: param })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        if (err.response.status === 401) this.signOut();
        else throw err.response;
      });
  },
  dataset(endPoint, param) {
    // check connection
    if (global.checkInternetConnection() == 'offline') {
      alert.error(null,'Offline', 'Tidak terhubung internet!')
      return;
    }

    if (param && param.filters) {
      Object.assign(param, param.filters);
      delete param.filters;
    }
    if (param.page && param.limit) {
      param.offset = param.page > 1 ? (param.page - 1) * param.limit : 0;
    }
    return env
      .get(`${endPoint + "/dataset"}`, { params: param })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        if (err.response.status === 401) this.signOut();
        else throw err.response;
      });
  },
  single(endPoint, param, id) {
    // check connection
    if (global.checkInternetConnection() == 'offline') {
      alert.error(null,'Offline', 'Tidak terhubung internet!')
      return;
    }

    if (param) endPoint += "?" + param;
    return env
      .get(`${endPoint}/${id}/show`)
      .then(response => {
        return response.data;
      })
      .catch(err => {
        if (err.response.status === 401) this.signOut();
        else throw err.response;
      });
  },
  create(endPoint, data) {
    // check connection
    if (global.checkInternetConnection() == 'offline') {
      alert.error(null,'Offline', 'Tidak terhubung internet!')
      return;
    }

    return env
      .post(`${endPoint}/create`, data)
      .then(response => {
        return response.data;
      })
      .catch(err => {
        if (err.response.status === 401) this.signOut();
        else throw err.response;
      });
  },
  update(endPoint, data) {
    // check connection
    if (global.checkInternetConnection() == 'offline') {
      alert.error(null,'Offline', 'Tidak terhubung internet!')
      return;
    }

    return env
      .put(`${endPoint}/update`, data)
      .then(response => {
        return response.data;
      })
      .catch(err => {
        if (err.response.status === 401) this.signOut();
        else throw err.response;
      });
  },
  delete(endPoint, data) {
    // check connection
    if (global.checkInternetConnection() == 'offline') {
      alert.error(null,'Offline', 'Tidak terhubung internet!')
      return;
    }

    return env
      .delete(`${endPoint}/delete`, data)
      .then(response => {
        return response.data;
      })
      .catch(err => {
        if (err.response.status === 401) this.signOut();
        else throw err.response;
      });
  },
  fileUpload(file, onUploadProgress) {
    // check connection
    if (global.checkInternetConnection() == 'offline') {
      alert.error(null,'Offline', 'Tidak terhubung internet!')
      return;
    }

    let formData = new FormData();
    formData.append("file", file);
    return env
      .post("upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress
      })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        if (err.response.status === 401) this.signOut();
        else throw err.response;
      });
  },
  // GET DATA INSTAGRAM
  getInstagram() {
    // check connection
    if (global.checkInternetConnection() == 'offline') {
      alert.error(null,'Offline', 'Tidak terhubung internet!')
      return;
    }

    // GET DATA API KEY INSTAGRAM FROM CONFIG
    let token = _config.apikey.instagram;
    return env
      .get(
        `https://graph.instagram.com/me/media?fields=id,caption,media_url&access_token=${token}`
      )
      .then(response => {
        return response.data;
      })
      .catch(err => {
        if (err.response.status === 401) this.signOut();
        else throw err.response;
      });
  },
  // DYNAMIC URL API
  dynamicUrl(url) {
    // check connection
    if (global.checkInternetConnection() == 'offline') {
      alert.error(null,'Offline', 'Tidak terhubung internet!')
      return;
    }

    return env
      .get(`${url}`)
      .then(response => {
        return response.data;
      })
      .catch(err => {
        if (err.response.status === 401) this.signOut();
        else throw err.response;
      });
  }
};

export default _service;
