
let baseUrl = 'https://news.drafts.az/api/'
// enter login info
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

// sen server hansi info ile daxil olmaaq istediyini gonderirsen, oda yoxlayirki eger sen  duzgun  acar verir ve onun local storage yazirki sessiya bitene qeder sen rahat herehet ede bilesen . username ilk ozunu tanitmaq ucundu, token ise taninamis qalmaq ve her hereketde sorgu gondermemek ucundu, yenia ancaq admin is gorsun. 

const username = document.getElementById('username')
const password = document.getElementById('password')
const token = localStorage.getItem('token')
// verifications of value and token(key/provide permission)
async function signIn() {
    const data = await login(username.value, password.value)
    // cavab gozlnilir ona gore async formata yazilir funsiya direct icara olunmur
    if (data && data.token) {
       localStorage.setItem('token', data.token)
    //    except null undefiend yes you can use all daattypes as along as it si string, firs tpart automaically string so second part should be  making into json strignfy and pare when get for complex obja dn arrays.
    //    KEY - VALUE  . key getde caigirilan , value ise login apiden gelen cavab.
       location.href = 'dashboard.htm'
    }
}


// categories

async function showCategory() {
    return fetch(baseUrl + 'category',{
        method: 'GET',
        header: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify({
            
        })
    })    
}