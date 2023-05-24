
export const workersAPI = {

  async getWorkers() {
    let response = await fetch("http://localhost/api/worker/read.php", { method: 'get' });
    let json = await response.json();
    return json;
    
  },

  async getWorker(id) {

    console.log(id)
    let response = await fetch(`http://localhost/api/worker/read_one.php?id=${id}`, { method: 'get' });
    let json = await response.json();
    if (response.ok) {
      return json;
    }
  },


};

export const productsAPI = {
  async getProducts() {
    let response = await fetch("http://localhost/api/item/getItems.php", { method: 'get' });
    let json = await response.json();

    return json;

  },

  async getStorage() {
    let response = await fetch("http://localhost/api/storage/getStorage.php", { method: 'get', credentials: "include" });
    let json = await response.json();

    return json;

  },

  async getCategories() {
    let response = await fetch("http://localhost/api/category/getCategories.php", { method: 'get' });
    let json = await response.json();

    return json;
  },
  async getPharmacies() {
    let response = await fetch("http://localhost/api/pharmacy/getPharmacies.php", { method: 'get' });
    let json = await response.json();

    return json;
  },
  async getProduct(id) {

    console.log(id)
    let response = await fetch(`http://localhost/api/item/getProduct.php?id=${id}`, { method: 'get' });
    let json = await response.json();
    if (response.ok) {
      return json;
    }
  },

  async createProduct(data) {
    let response = await fetch(`http://localhost/api/item/create.php`,
      {
        method: 'POST',

        body: JSON.stringify(data)
      });
    let json = await response.json();
    alert(json.message);
    return json;
  },

  async deleteProduct(data) {
    let response = await fetch(`http://localhost/api/item/delete.php`,
      {
        method: 'POST',

        body: JSON.stringify(data)
      });
    let json = await response.json();
    alert(json.message);
    return json;
  },

  async updateProduct(data) {
    let response = await fetch(`http://localhost/api/item/setInfo.php`,
      {
        method: 'POST',

        body: JSON.stringify(data)
      });
    let json = await response.json();
    alert(json.message);
    return json;
  },

  async setPhoto(photo) {
    console.log(photo)
    const data = new FormData();
    data.append("photo", photo)
    console.log(data)
    let response = await fetch(`http://localhost/api/item/uploadPhoto.php`,
      {
        method: 'POST',
        body: data
      })

    return response.ok;
  },
};

export const authAPI = {



  async login(data) {
    let response = await fetch(`http://localhost/api/worker/login.php`,
      {
        credentials: "include",
        method: 'POST',
        body: JSON.stringify(data)
      });

    let json = await response.json();
    console.log(document.cookie);
    return json;
  },

  async check() {
    const getCookie = (name) => {
      const cookieString = document.cookie;
      const cookies = cookieString.split('; ');
    
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        const cookieName = decodeURIComponent(cookie[0]);
        const cookieValue = decodeURIComponent(cookie[1]);
    
        if (cookieName === name) {
          return cookieValue;
        }
      }
    
      return null;
    };
    
    const id = getCookie('id');
    const hash = getCookie('hash');
    console.log(id,hash );
    let response = await fetch(`http://localhost/api/worker/check.php`, {
      credentials: "include",
      method: 'POST',
      body: JSON.stringify({id, hash})
    });
    let json = await response.json();
    console.log(document.cookie);
    return json
  },

  async logout() {
    let response = await fetch(`http://localhost/api/worker/logout.php`,
      {
        credentials: "include",
        method: 'POST'
      });
    let json = await response.json();
    return json;
  },
  async regist(data) {
    let response = await fetch(`http://localhost/api/worker/register.php`,
      {
        method: 'POST',

        body: JSON.stringify(data)
      });
    let json = await response.json();
    return json;
  },
};


