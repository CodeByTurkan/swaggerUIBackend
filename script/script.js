

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

async function getAllNews(filteredNews) {
   let code = ''
   // kohne xeberi silki sehife referesh olmur amma hemen box/div ici temizlenir ve ust uste yigilmasin
   let data = filteredNews ? { news: filteredNews } : await getNews()
   // eger arg varsa news map olunsun, butun xeberler
   data.news.map(item => {
      code += 
         `
         <div class="flex flex-col items-stretch gap-4 justify-between max-w-lg space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">
       <div class="flex flex-col flex-1">
                  <a href="details.htm?id=${item.id}" class="flex-1 h-40  mb-4">
                  <img src="${item.thumbnail}" alt="" class="object-cover w-full  h-full dark:bg-gray-500">
                  </a>  
                  <div class="px-6 py-2">
                     <button class="mb-2 border text-[#243f7e] border-[#243e7e] bg-[#e0e7f4] px-4 py-2 rounded-2xl text-base font-semibold">${item.category.name}</button>
                     <h2 class="mb-1 text-xl font-semibold">${item.title}</h2>
                  </div>
            </div>
            <div class="flex  flex-wrap justify-between px-6 py-3">
               <div class="space-x-2">
                  <button aria-label="Share this post"  class="p-2 text-center">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4 h-4 fill-current dark:text-violet-600">
                        <path d="M404,344a75.9,75.9,0,0,0-60.208,29.7L179.869,280.664a75.693,75.693,0,0,0,0-49.328L343.792,138.3a75.937,75.937,0,1,0-13.776-28.976L163.3,203.946a76,76,0,1,0,0,104.108l166.717,94.623A75.991,75.991,0,1,0,404,344Zm0-296a44,44,0,1,1-44,44A44.049,44.049,0,0,1,404,48ZM108,300a44,44,0,1,1,44-44A44.049,44.049,0,0,1,108,300ZM404,464a44,44,0,1,1,44-44A44.049,44.049,0,0,1,404,464Z"></path>
                     </svg>
                  </button>
                  <button aria-label="Bookmark this post"  class="p-2">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4 h-4 fill-current dark:text-violet-600">
                        <path d="M424,496H388.75L256.008,381.19,123.467,496H88V16H424ZM120,48V456.667l135.992-117.8L392,456.5V48Z"></path>
                     </svg>
                  </button>
               </div>
               <div class="flex space-x-2 text-sm dark:text-gray-600">
                  <button  class="flex items-center p-1 space-x-1.5">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Number of comments" class="w-4 h-4 fill-current dark:text-violet-600">
                        <path d="M448.205,392.507c30.519-27.2,47.8-63.455,47.8-101.078,0-39.984-18.718-77.378-52.707-105.3C410.218,158.963,366.432,144,320,144s-90.218,14.963-123.293,42.131C162.718,214.051,144,251.445,144,291.429s18.718,77.378,52.707,105.3c33.075,27.168,76.861,42.13,123.293,42.13,6.187,0,12.412-.273,18.585-.816l10.546,9.141A199.849,199.849,0,0,0,480,496h16V461.943l-4.686-4.685A199.17,199.17,0,0,1,448.205,392.507ZM370.089,423l-21.161-18.341-7.056.865A180.275,180.275,0,0,1,320,406.857c-79.4,0-144-51.781-144-115.428S240.6,176,320,176s144,51.781,144,115.429c0,31.71-15.82,61.314-44.546,83.358l-9.215,7.071,4.252,12.035a231.287,231.287,0,0,0,37.882,67.817A167.839,167.839,0,0,1,370.089,423Z"></path>
                        <path d="M60.185,317.476a220.491,220.491,0,0,0,34.808-63.023l4.22-11.975-9.207-7.066C62.918,214.626,48,186.728,48,156.857,48,96.833,109.009,48,184,48c55.168,0,102.767,26.43,124.077,64.3,3.957-.192,7.931-.3,11.923-.3q12.027,0,23.834,1.167c-8.235-21.335-22.537-40.811-42.2-56.961C270.072,30.279,228.3,16,184,16S97.928,30.279,66.364,56.206C33.886,82.885,16,118.63,16,156.857c0,35.8,16.352,70.295,45.25,96.243a188.4,188.4,0,0,1-40.563,60.729L16,318.515V352H32a190.643,190.643,0,0,0,85.231-20.125,157.3,157.3,0,0,1-5.071-33.645A158.729,158.729,0,0,1,60.185,317.476Z"></path>
                     </svg>
                     <span>${item.views}</span>
                  </button>
                  <div class="flex items-center p-1 space-x-1.5">
                      <i onclick="likeIt(${item.id}, 'like')" class="fa-regular fa-thumbs-up dark:text-[#7F22FE]"></i>
                     <span class="count">${item.like}</span>
                    <i onclick="likeIt(${item.id}, 'dislike')"  class="fa-regular fa-thumbs-down dark:text-[#7F22FE]"></i>
                     <span>${item.dislike}</span>
                  </div>
               </div>
            </div>
         </div>
         `
   })
   allNews.innerHTML = code
}

getAllNews()


// yaranma clikcden sonra olur so ..
async function likeIt(id, type ) {
   const data = await likeNews(id, type)
   if (data) {
      await getAllNews()
   }
}



