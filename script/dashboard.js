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
    }else if (arg === -1) {
        catModal.classList.add('hidden')
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