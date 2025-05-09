let token = localStorage.getItem('token')

if (!token) {
    location.href = 'login.htm'
}

function logOut() {
    localStorage.clear()
    location.href = 'login.htm'
}
const newsPage = document.getElementById('newsPage')
const categoryPage = document.getElementById('categoryPage')
const categorySide = document.getElementById('categorySide')
const catModal = document.getElementById('catModal')
const yes = document.getElementById('yes')
const save = document.getElementById('save')
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
        showCategory()
    }
}

// show categories on the screen
async function showCategory() {
    categoryPage.innerHTML = ''
    // bunu yazanda artiq her defe basanda yeniden tekrarlanmir
    const data = await getCategories()
    data.map(item => {
        categoryPage.innerHTML += 
            `
             <div class="w-60 rounded-lg shadow-sm bg-green-800 ">
                    <div class ="flex justify-between items-center p-2">
                        <h5 class="mb-2 text-base p-2 font-semibold tracking-tight text-gray-900 dark:text-white">${item.name}</h5>
                        <div class="text-white">
                            <i onclick="editModal(${item.id})" class="fa-solid fa-pen-to-square mr-2"></i>
                            <i onclick="delCat(${item.id})" class="fa-solid fa-trash"></i>
                        </div>
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
        newsModal.classList.remove('hidden')
    }else if (arg === -1) {
        catModal.classList.add('hidden')
        newsModal.classList.add('hidden')
    }
}
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

async function delCat(id) {
    const data = await deleteCategory(id)
    if (data) {
        await showCategory()
        // bunu yazanda artiq refresh etmeye ehtiyac olmur  delete gorsenmesi ucun, deyirsenki bitenden sonra goster.
    }
    
}

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

async function saveChanges() {
    const catName = document.getElementById('catName').value;
    const slugName = document.getElementById('slugName').value;

    const data = await updateCategory(currentId, catName, slugName);
    if (data) {
        catModal.classList.add('hidden');
        await showCategory();
    }
}


// news


async function showNews(){
    let code = ''
    const data = await getNews()
    data.news.map(item => {
        code += 
        `
        <div onclick="showModal()" class="max-w-xs p-6 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-900">
                    <img src="${item.thumbnail}" alt="" class="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500">
                    <div class="mt-6 mb-2">
                        <span class="block text-xs font-medium tracking-widest uppercase dark:text-violet-600">${item.category.name}</span>
                        <h2 class="text-xl font-semibold tracking-wide">${item.title}</h2>
                    </div>
                </div>
        `
    })
    showAllNews.innerHTML = code
}

async function getCategoryName() {
    const category = document.getElementById('category')
    const data = await getCategories()
    data.map(item => {
        category.innerHTML += `<option value="${item.id}"> ${item.name}</option>`
    })
}
getCategoryName()


// add news

async function addNews() {
    const data = await postNews( title.value,content.value, slug.value, thumbnail.value, category.value)
    console.log(data);
    if (data) {
        newsModal.classList.add('hidden')
        await showNews()
    }
}
