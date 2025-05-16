const params = new URLSearchParams(location.search).get('id')
const token = localStorage.getItem('token') 
// men burda getnewsdan id aldim get eledim, indi onu birde datadan cagirmaga ehtiyac yoxdu

const categories = document.getElementById('categories')
const details = document.getElementById('details')
const comments = document.getElementById('comments')
const content = document.getElementById('content')
// define content

async function getAllCategories() {
   let data = await getCategories()
   data.map(item=> {
      categories.innerHTML += 
      `
     	<a rel="noopener noreferrer" href="#" class=" px-4 mb-1 hover:text-blue-500">${item.name}</a>

      `
   })
}
getAllCategories()

async function getDetails() {
    let code = ''
    let code2 = ''
    let newsById = await getNewsById(params)
    let time = newsById.createdAt
    const date = new Date(time);
    const dateWithLetter = date.toLocaleDateString('en-US', {
    month: 'short', // "May"
    day: '2-digit' , // "07"
    year: 'numeric' // Year
    });
        code = 
        `
           <!-- Breadcrumb -->
            <nav class="text-sm text-gray-500 mb-4">
            <a href="#" class="hover:underline">Home</a> /
            <a href="#" class="hover:underline">${newsById.category.name}</a>
            </nav>

            <h1 class="text-4xl font-bold text-gray-900 mb-4 leading-tight"> ${newsById.title} </h1>
            <!-- Meta Info -->
            <div class="flex items-center text-sm text-gray-500 space-x-4 mb-6">
            <time datetime="2025-05-14">${dateWithLetter}</time>
            <span>•</span>
            <span>6 min read</span>
            </div>

           
            <img src="${newsById.thumbnail}" class="rounded-xl mb-6" alt="News Image">

            <p class="text-lg">${newsById.content}</p>
            
        `
    if(newsById.comments && newsById.comments.length > 0){
            newsById.comments.map(item => {
            // let date = 
            code2 += `
                <!-- Example Comment -->
                <div class="mt-8">
                    <div class="flex gap-4 mb-4">
                    <div>
                        <div class="font-semibold text-gray-800">${item.user.username}</div>
                        <p class="text-sm text-gray-700">${item.content}</p>
                        <div class="flex gap-3 text-xs text-gray-500 mt-1">
                        <button class="hover:text-blue-600">👍 8</button>
                        <button class="hover:text-red-500">👎 1</button>
                        </div>
                    </div>
                    </div>
                </div>
                
            `
        })
    
    }
    else {
        code2 = '<p class="text-gray-500 m-2">No Comment</p>'
    }
        
    
    details.innerHTML = code
    comments.innerHTML = code2

}

getDetails()


async function getComments() {
    const data = await getComments()
    if (data) {
       await getDetails()
    }
}
async function addComment() {
    const data = await postComment(params, content.value)   
    if (data) {
       await getDetails()
       content.value = ''
    }
}