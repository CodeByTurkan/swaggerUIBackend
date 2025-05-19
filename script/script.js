import { getAllNews } from "./news.js";
import { getCategories, getNews, likeNews, login } from "./service.js";

// sen server hansi info ile daxil olmaaq istediyini gonderirsen, oda yoxlayirki eger sen  duzgun  acar verir ve onun local storage yazirki sessiya bitene qeder sen rahat herehet ede bilesen . username ilk ozunu tanitmaq ucundu, token ise taninamis qalmaq ve her hereketde sorgu gondermemek ucundu, yenia ancaq admin is gorsun. 

const username = document.getElementById('username')
const password = document.getElementById('password')
const categories = document.getElementById('categories')
const allNews = document.getElementById('allNews')
const count = document.getElementsByClassName('count')
const token = localStorage.getItem('token')



// verifications of value and token(key/provide permission)
async function signIn() { //yartdigini alir show / netice
    const data = await login(username.value, password.value)
    // cavab gozlnilir ona gore async formata yazilir funsiya direct icara olunmur
    if (data && data.token) {
       localStorage.setItem('token', data.token)
    //    except null undefiend yes you can use all daattypes as along as it si string, firs tpart automaically string so second part should be  making into json strignfy and pare when get for complex obja dn arrays.
    //    KEY - VALUE  . key getde caigirilan , value ise login apiden gelen cavab.
       location.href = 'dashboard.htm'
    }
}
window.signIn = signIn

// filter category from details
const params = new URLSearchParams(location.search)
let cat = params.get('category').replace(" rel=","")

async function filtered(){
   const data = await getNews()
   console.log(data);
   allNews.innerHTML = ""
   let filteredCat = data && data.news.filter(item => item.category.name == cat)
   getAllNews(filteredCat)
}
filtered()



async function getAllCategories() {
   let data = await getCategories()
   data.map(item=> {
      categories.innerHTML += 
      `
     	<a onclick="soloCategory('${item.name}')" rel="noopener noreferrer" href="#" class=" px-4 mb-1 hover:text-blue-500">${item.name}</a>
      `
   })
}
getAllCategories()

async function soloCategory(name) {
   let data = await getNews()
   let filteredNews = data.news.filter(item => item.category.name == name)
   await getAllNews(filteredNews) 
}
window.soloCategory = soloCategory




// yaranma clikcden sonra olur so ..
async function likeIt(id, type ) {
   const data = await likeNews(id, type)
   if (data) {
      await getAllNews()
   }

}

window.likeIt = likeIt



