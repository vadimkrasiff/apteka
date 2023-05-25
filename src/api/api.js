
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
    
    localStorage.setItem('id', json.id || 0);
    localStorage.setItem('hash', json.hash || 0);
    return json;
  },

  async check() {
    
    let id = localStorage.getItem('id');
    let hash = localStorage.getItem('hash');
    if( id == "0" ) {id = false;}
    if( hash == "0" ) {hash = false;}
    console.log(id, hash)
    let response = await fetch(`http://localhost/api/worker/check.php`, {
      // credentials: "include",
      method: 'POST',
      body: JSON.stringify({id, hash})
    });
    let json = await response.json();

    return json
  },

  async logout() {
    let id = localStorage.getItem('id');
    let response = await fetch(`http://localhost/api/worker/logout.php?id=${id}`,
      {
        credentials: "include",
        method: 'POST'
      });
    let json = await response.json();
    if (json.response){
      localStorage.setItem('id',  0);
    localStorage.setItem('hash',  0);
    }
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

export const ordersAPI = {

  async getOrders() {
    let response = await fetch("http://localhost/api/order/getOrders.php", { method: 'get' });
    let json = await response.json();
    return json;
    
  },
}