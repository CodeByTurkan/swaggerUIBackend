const id = new URLSearchParams(location.search).get('id')
let filteredCars = data.find(item => item.id == id)