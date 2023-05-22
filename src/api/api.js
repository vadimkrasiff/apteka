'use strict';

const redirect = (path) => {
  window.location.assign(`http://localhost/${path}`);
}

export  const usersAPI = {
    async getUsers () {
        authAPI.check().then(async (res) => {
          if (res.response) {
      
            let response = await fetch("http://localhost/api/user/read.php", { method: 'get' });
            let json = await response.json();
            if (response.ok) {
              return json.records;
            } }
        });
      
      },

      async getUser(id) {

        console.log(id)
          let response = await fetch(`http://localhost/api/user/read_one.php?id=${id}`, { method: 'get' });
          let json = await response.json();
          if (response.ok) {
              return json;      
          } 
      },
    
      
};

export  const productsAPI = {
    async getProducts () {
            let response = await fetch("http://localhost/api/item/getItems.php", { method: 'get' });
            let json = await response.json();

              return json;
        
      },

      async getCategories () {
              let response = await fetch("http://localhost/api/category/getCategories.php", { method: 'get' });
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
    
      async createProduct  (data) {
        let response = await fetch(`http://localhost/api/item/create.php`,
          {
            method: 'POST',

            body: JSON.stringify(data)
          });
        let json = await response.json();
        alert(json.message);
        return json;
      },

      async deleteProduct  (data) {
        let response = await fetch(`http://localhost/api/item/delete.php`,
          {
            method: 'POST',

            body: JSON.stringify(data)
          });
        let json = await response.json();
        alert(json.message);
        return json;
      },

      async updateProduct  (data) {
        let response = await fetch(`http://localhost/api/item/setInfo.php`,
          {
            method: 'POST',

            body: JSON.stringify(data)
          });
        let json = await response.json();
        alert(json.message);
        return json;
      },

      async setPhoto  (photo) {
        console.log(photo)
        const data = new FormData();
        data.append("photo", photo)
        console.log(data)
        let response = await fetch(`http://localhost/api/item/uploadPhoto.php`,
        {  method: 'POST', 
        body: data})
      
        return response.ok;
      },
};
 
export const authAPI = {



async login(data) {
  let response = await fetch(`http://localhost/api/user/login.php`,
    {credentials: "include",
      method: 'POST',
      body: JSON.stringify(data)
    });

    let json = await response.json();
  return json;
},

async check() {
  let response = await fetch(`http://localhost/api/user/check.php`, {
    credentials: "include"
  });
  let json = await response.json();
  return json
},

async logout()  {
  let response = await fetch(`http://localhost/api/user/logout.php`,
    {
      credentials: "include",
      method: 'POST'
    });
  let json = await response.json();
  return json;
},
async regist(data) {
  let response = await fetch(`http://localhost/api/user/register.php`,
    {
      method: 'POST',

      body: JSON.stringify(data)
    });
  let json = await response.json();
  return json;
},
};


