export const Service = {
  getMuseums: async () => {
    const url = process.env.REACT_APP_BACKEND_URL + '/museums';
    const req = new Request(url);
    const museums = await fetch(req)
      .then(async response => {
        const museums = await response.json();
        return museums;
      })
      .catch(error => {
        throw error;
      });
    return museums;
  },
  getMuseumBySlug: async slug => {
    const url = process.env.REACT_APP_BACKEND_URL + '/museums/' + slug;
    const req = new Request(url);
    const museum = await fetch(req)
      .then(async response => {
        const museum = await response.json();
        return museum;
      })
      .catch(error => {
        throw error;
      });
    return museum;
  },
  search: async searchBy => {
    const url = process.env.REACT_APP_BACKEND_URL + '/search/' + searchBy;
    const req = new Request(url);
    const searchResult = await fetch(req)
      .then(async response => {
        const searchResult = await response.json();
        return searchResult;
      })
      .catch(error => {
        throw error;
      });
    return searchResult.size > 0 ? searchResult : null;
  },
  save: async (postToSave, isNew) => {
    const method = isNew ? 'POST' : 'PATCH';
    const blog = { blog: postToSave };
    const url = process.env.REACT_APP_BACKEND_URL + '/blog';
    const req = new Request(url, {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(blog)
    });
    const post = await fetch(req)
      .then(async response => {
        const post = await response.json();
        return post;
      })
      .catch(error => {
        throw error;
      });
    return post;
  },
  getPosts: async () => {
    const url = process.env.REACT_APP_BACKEND_URL + '/blog';
    const req = new Request(url);
    const posts = await fetch(req)
      .then(async response => {
        const posts = await response.json();
        return posts;
      })
      .catch(error => {
        throw error;
      });
    let postsBlog = [];
    let postRow = [];
    for (let i = 0; i < posts.length; i++) {
      if (i % 3 === 0) {
        postRow = [];
        postRow.push(posts[i]);
      } else {
        postRow.push(posts[i]);
      }
      if (1 > 0 && i % 3 === 0) {
        postsBlog.push(postRow);
      }
    }
    return postsBlog;
  },
  getPostBySlug: async slug => {
    const url = process.env.REACT_APP_BACKEND_URL + '/blog/' + slug;
    const req = new Request(url);
    const post = await fetch(req)
      .then(async response => {
        const post = await response.json();
        return post;
      })
      .catch(error => {
        throw error;
      });
    return post;
  },
  deletePostById: async id => {
    const method = 'DELETE';
    const url = process.env.REACT_APP_BACKEND_URL + '/blog/' + id;
    const req = new Request(url, {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrer: 'no-referrer'
    });
    const post = await fetch(req)
      .then(async response => {
        const post = await response.json();
        return post;
      })
      .catch(error => {
        throw error;
      });
    return post;
  },
  uploadFile: async files => {
    const data = new FormData();
    data.append('file', files);
    data.append('upload_preset', 'nmayes');

    const response = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: 'POST',
      body: data
    });
    const file = await response.json();
    return file.secure_url;
  }
};
