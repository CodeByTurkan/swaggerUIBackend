
let baseUrl = 'https://news.drafts.az/api/'
// enter login info
async function login(username, password) {
    return fetch(baseUrl + 'auth/login',{
        method:'POST',
        headers:    
        {
            'content-type' : 'application/json',
            // 'authorization' : `Bearer ${token}`
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    .then(res => res.json())
    .then(data => data)
}

// categories create
async function getCategories() {
    return fetch(baseUrl + 'category') 
    .then(res => res.json()) 
    .then(data => data)
  
}

// add new category
async function postCategory(name, slug) {
    return fetch (baseUrl + 'category',{
        method: 'POST',
        headers:{
            'content-type' : 'application/json',
            'authorization' : `Bearer ${token}`
        },
        body: JSON.stringify({
            name:catName.value,
            slug:slugName.value
        })  
        
    })
    .then(res => res.json())
    .then(data => data)
}

// delete category
async function deleteCategory(id) {
    return fetch(baseUrl + `category/${id}`,{
        method: 'DELETE',
        headers: {
            'content-type' : 'application/json',
            'authorization' : `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => data)
}