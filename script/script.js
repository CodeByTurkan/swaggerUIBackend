
let baseUrl = 'https://news.drafts.az/api/'

async function login(username, password) {
    return fetch(baseUrl + 'auth/login',{
        method:'POST',
        headers:    
        {
            'content-type' : 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    .then(res => res.json())
    .then(data => data)
}


const username = document.getElementById('username')
const password = document.getElementById('password')
const token = localStorage.getItem('token')
async function signIn() {
    const data = await login(username.value, password.value)
    if (data && data.token) {
       localStorage.setItem('token', data.token)
       location.href = 'dashboard.htm'
    }
}
