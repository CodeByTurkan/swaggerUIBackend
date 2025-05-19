import { deleteCategory, delNews, getCategories, getNews, getNewsById, postCategory, postNews, updateCategory, updateNews } from "./service.js"

let token = localStorage.getItem('token')
if (!token) {
    location.href = 'login.htm'
}

function logOut() {
    localStorage.clear()
    location.href = 'login.htm'
}
window.logOut = logOut
// onclick olanlar 

const newsPage = document.getElementById('newsPage')
const categoryPage = document.getElementById('categoryPage')
const categorySide = document.getElementById('categorySide')
const catModal = document.getElementById('catModal')
const yes = document.getElementById('yes')
const save = document.getElementById('save')
const yesNews = document.getElementById('yesNews')
const saveNews = document.getElementById('saveNews')
const showAllNews = document.getElementById('showAllNews')
const newsModal = document.getElementById('newsModal')
const title = document.getElementById('title')
const content = document.getElementById('content')
const slug = document.getElementById('slug')
const thumbnail = document.getElementById('thumbnail')



// change between news and categories
function renderPage(arg) {
    newsPage.classList.add('hidden');
    categorySide.classList.add('hidden');
// first afte func work hiden everything and show what you want.
    if (arg === 'news') {
        newsPage.classList.remove('hidden');
        showNews()
    } else if (arg === 'category') {
        categorySide.classList.remove('hidden');
    }
}

window.renderPage = renderPage

showCategory()
// show categories on the screen
async function showCategory() {
    categoryPage.innerHTML = ''
    // bunu yazanda artiq her defe basanda yeniden tekrarlanmir
    const data = await getCategories()
    data.map(item => {
        categoryPage.innerHTML += 
            `
               <div class="bg-blue-900 text-white  p-4 min-w-[150px] min-h-[150px] rounded-lg shadow-md hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-center items-center">
                    <span class="text-lg font-semibold pb-3">${item.name}</span>
                    <div class="flex gap-2">
                        <i onclick="editModal(${item.id})" class="fa-solid fa-pen-to-square hover:text-blue-300 cursor-pointer"></i>
                        <i onclick="delCat(${item.id})" class="fa-solid fa-trash hover:text-red-400 cursor-pointer"></i>
                    </div>
                </div>

                `
    })
}

// adding modal for categories
function addModal(arg) {
    catName.value = ''
    slugName.value = ''
    // arg === 1 ? catModal.classList.remove('hidden') : arg === -1 ? catModal.classList.add('hidden') : null
    if (arg===1) {
        catModal.classList.remove('hidden')
    }else if (arg === -1) {
        catModal.classList.add('hidden')
    }
}

window.addModal = addModal


// adding new categories
async function addNewCategory() {
    const catName = document.getElementById('catName')
    const slugName = document.getElementById('slugName')
   
    const data = await postCategory(catName.value, slugName.value)
    if (data) {
        catModal.classList.add('hidden')
        await showCategory()
    }
}
window.addNewCategory = addNewCategory

async function delCat(id) {
    const data = await deleteCategory(id)
    if (data) {
        await showCategory()
        // bunu yazanda artiq refresh etmeye ehtiyac olmur  delete gorsenmesi ucun, deyirsenki bitenden sonra goster.
    }
    
}
window.delCat = delCat

let currentId = null
async function editModal(id) {
   let categories = await getCategories()
   let selectedCat = categories?.find(item => item.id == id)
    
    
    catModal.classList.remove('hidden')
    yes.classList.add('hidden')
    save.classList.remove('hidden')
  
    currentId = id
    catName.value = selectedCat.name
    slugName.value = selectedCat.slug
}
window.editModal = editModal
async function saveChanges() {
    const catName = document.getElementById('catName').value;
    const slugName = document.getElementById('slugName').value;

    const data = await updateCategory(currentId, catName, slugName);
    if (data) {
        catModal.classList.add('hidden');
        await showCategory();
    }
}
window.saveChanges = saveChanges

// modal for news
function addNewsModal(arg){
    title.value =''
    content.value=''
    slug.value=''
    thumbnail.value =''
    
    if (arg===1) {
        newsModal.classList.remove('hidden')
    }else if (arg === -1) {
        newsModal.classList.add('hidden')
    }
}
window.addNewsModal = addNewsModal

// news
// once sistemde olan xeberleri uze cixaaririq , servicede get edewndne sonra.

async function showNews(){
    let code = ''
    const data = await getNews()
    data.news.map(item => {
        code += 
        `
        <div class="flex flex-col justify-between max-w-lg mx-4 rounded-2xl shadow-md overflow-hidden dark:bg-gray-50 dark:text-gray-800">
            <img src="${item.thumbnail}" alt="" class="object-cover w-full h-52 sm:h-60  dark:bg-gray-500" />
             <div class="flex flex-col flex-grow justify-between p-6">
                <div>
                    <span class="text-xs font-semibold text-blue-700 uppercase tracking-widest">${item.category.name}</span>
                    <h2 class="mt-2 text-lg font-bold text-gray-900">${item.title}</h2>
                </div>

                <!-- Buttons -->
                <div class="flex justify-between mt-6 pt-4 border-t border-gray-200">
                    <button onclick="showModalEdit(${item.id})" type="button"
                        class="px-7 py-2 text-sm font-semibold rounded-full bg-blue-800 text-white hover:bg-blue-900 transition">
                        Edit
                    </button>
                    <button onclick="deleteNews(${item.id})" type="button"
                        class="px-6 py-2 text-sm font-semibold rounded-full bg-pink-600 text-white hover:bg-pink-700 transition">
                        Delete
                    </button>
                </div>
            </div>
         </div>
        `
        
    })
    showAllNews.innerHTML = code
}

// sonra cateoriesleri yerlesdiririk
async function getCategoryName() {
    const category = document.getElementById('category')
    const data = await getCategories()
    data.map(item => {
        category.innerHTML += `<option value="${item.id}"> ${item.name}</option>`
    })
}
getCategoryName()


// add news
// sonra artiq men yeni bir xeber elave edirem
async function addNews() {   //bura ise istifadecinin inputdannalinan melumatlaridi
    const data = await postNews( title.value,content.value, slug.value, thumbnail.value, category.value)
    // sen optionlari id ile verib,  goruursenki postda birce id var elecen e optionau tapa bilersen
    console.log(data);
    if (data) {
        newsModal.classList.add('hidden')
        await showNews()
    }
}
window.addNews = addNews

/*  If you're getting a "Bad Request":
That likely means:

One of the fields (title, content, slug, etc.) is missing or invalid

token is undefined or expired

categoryId might be the wrong type (e.g., sending a string instead of a number)

The API endpoint baseUrl + 'news' is incorrect */


// deletenews

async function deleteNews(id) {
    const data = await delNews(id)
    if (data) {
        await showNews()
    }
}
window.deleteNews = deleteNews

let thisId = null
async function showModalEdit(id) {
    newsModal.classList.remove('hidden')
    yesNews.classList.add('hidden')
    saveNews.classList.remove('hidden')
    let response = await getNewsById(id)
    console.log(response)
    
    thisId = id 
    title.value = response.title
    content.value = response.content
    slug.value = response.slug
    thumbnail.value = response.thumbnail
    category.value = response.category
} 
window.showModalEdit = showModalEdit
async function saveNewsChanges() {
    const data = await updateNews( thisId, title.value,content.value, slug.value, thumbnail.value, category.value)
    if (data) {
        newsModal.classList.add('hidden')
        await showNews()
    }
}
window.saveNewsChanges = saveNewsChanges
