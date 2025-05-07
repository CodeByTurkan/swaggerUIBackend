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


// change between news and categories
function renderPage(arg) {
    newsPage.classList.add('hidden');
    categorySide.classList.add('hidden');
// first afte func work hiden everything and show what you want.
    if (arg === 'news') {
        newsPage.classList.remove('hidden');
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
                    <a href="#">
                        <h5 class="mb-2 text-base p-2 font-semibold tracking-tight text-gray-900 dark:text-white">${item.name}</h5>
                    </a>
                </div>
                `
    })
}

// adding modal for categories
function addModal(arg) {
    // arg === 1 ? catModal.classList.remove('hidden') : arg === -1 ? catModal.classList.add('hidden') : null

    if (arg===1) {
        catModal.classList.remove('hidden')
    }else if (arg === -1) {
        catModal.classList.add('hidden')
    }

    catModal.innerHTML = 
        `
            <div class="flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
            
            <input class="p-3" id="catName" type="text" placeholder="Enter name..."/>
            <input class="p-3" id="slugName" type="text"placeholder="Enter slug..."/>
            
            <div class="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                <button onclick="addModal(-1)" class="px-6 py-2 rounded-sm">No</button>
                <button onclick="addNewCategory()" class="px-6 py-2 rounded-sm shadow-sm dark:bg-violet-600 dark:text-gray-50">Yes</button>
            </div>
            </div>
        `
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