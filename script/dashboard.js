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

function renderPage(arg) {
    newsPage.classList.add('hidden');
    categoryPage.classList.add('hidden');
// first afte func work hiden everything and show what you want.
    if (arg === 'news') {
        newsPage.classList.remove('hidden');
    } else if (arg === 'category') {
        categoryPage.classList.remove('hidden');
    }
}