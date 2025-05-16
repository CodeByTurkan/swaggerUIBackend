
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




async function updateCategory(id, name, slug) {
    return fetch(baseUrl + `category/${id}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, slug })
    }).then(res => res.json());
}


// news
async function getNews() {
    return fetch(baseUrl + 'news') 
    .then(res => res.json()) 
    .then(data => data)
}

// xeberin content goturmek ucun.
async function getNewsById(id) {
    return fetch(baseUrl + `news/${id}`) 
    .then(res => res.json()) 
    .then(data => data)
}
// add new news
// sen servere dedirseki men sene yeni  news yazacam haniski title ve.s kimi komponentleri olacaq, JS object shorthand ise b izde  name and value eynidirse onda tekce name yazmaq olar.
async function postNews( title,content, slug, thumbnail,categoryId) {
    return fetch (baseUrl + 'news',{
        method: 'POST',
        headers:{
            'content-type' : 'application/json',
            'authorization' : `Bearer ${token}`
        },
        body: JSON.stringify({title,content, slug, thumbnail,categoryId })  
    })
    .then(res => res.json())
    .then(data => data)
}

// deletenews
async function delNews(id) {
    return fetch(baseUrl + `news/${id}`,{
        method: 'DELETE',
        headers:{
            'content-type' : 'application/json',
            'authorization' : `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => data)
}

// save
// ne deyissin bilmek ucun id
async function updateNews(id, title, content, slug, thumbnail, categoryId) {
    return fetch(baseUrl + `news/${id}`,{
        method:'POST',
        headers: {
             'content-type' : 'application/json',
            'authorization' : `Bearer ${token}`
        },
        body: JSON.stringify({title, content, slug, thumbnail, categoryId })
    })
    .then(res => res.json())
    .then(data => data)
}


async function getComment() {
     return fetch(baseUrl + `news/${newsId}/comments`)
    .then(res => res.json())
    .then(data => data)
}

async function postComment(newsId, content) {
     return fetch(baseUrl + `news/${newsId}/comments`,{
        method:'POST',
        headers: {
             'content-type' : 'application/json',
            'authorization' : `Bearer ${token}`
        },
        body: JSON.stringify({content})
    })
    .then(res => res.json())
    .then(data => data)
}


// evvelce action tipini yaradiriq.
async function likeNews(id, type) {
    return fetch(baseUrl + `news/${id}/action/${type}`,{
        method:'POST',
        headers: {
             'content-type' : 'application/json',
            'authorization' : `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => data)
}

async function viewNews(id, type) {
    return fetch(baseUrl + `news/${id}/action/${type}`,{
        method:'POST',
        headers: {
             'content-type' : 'application/json',
            'authorization' : `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => data)
}
