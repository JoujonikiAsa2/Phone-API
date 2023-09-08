const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll)
    // handleShowDetails(id)
}


function displayPhones(phones, isShowAll) {
    const phoneContainer = document.getElementById('phone-container')
    // clear previous phone before adding new
    phoneContainer.textContent = '';

    //display show all button if there are more than 9 phones 
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 9 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
        phones = phones.slice(1, 10);
    }
    else {
        showAllContainer.classList.add('hidden')
    }
    console.log("Is show all", isShowAll)
    // display only the first 9 phones if not show all

    if (phones[0] != undefined) {
        phones.forEach(phone => {
            // console.log(phone)
            const phoneCard = document.createElement('div')
            phoneCard.classList = `card w-44 lg:w-96 bg-base-100 shadow-xl card-style`
            phoneCard.innerHTML = `
            <figure>
                <img src="${phone.image}" alt="Phones" class=""/>
            </figure>
            <div class="card-body text-center">
                <h2 class="card-title justify-center">${phone.phone_name}</h2>
                <p class="w-[56]">There are many variations of passages of available, but the majority have suffered</p>
                <h4 class="text-2xl">$999</h4>
                <div class="card-actions justify-center">
                    <button class="btn btn-primary" onclick ="handleShowDetails('${phone.slug}')">Show Details</button>
                </div>
            </div>`
            phoneContainer.appendChild(phoneCard)
        });
        const displayNotFound = document.getElementById('not-found');
        displayNotFound.classList.add('hidden')
    }
    else {
        const displayNotFound = document.getElementById('not-found');
        displayNotFound.classList.remove('hidden')
        displayNotFound.innerText = "Not found"
    }
    // hide loading spinner
    toggleLoadingSpinner(false)
}

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}


// Show all button
const handleShowAll = () => {
    handleSearch(true)
}

// show details button
const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    // console.log(data.data)
    const phones = data.data;
    showPhoneDetails(phones)
}

const showPhoneDetails = (phones) => {
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phones.name;
    // console.log(phone.name);
    const showDetailsContainer = document.getElementById('show-detils-container');
    showDetailsContainer.innerHTML =
        `
    <img src="${phones.image}" alt="" class="w-24">
    <p><span>Storage: </span>${phones?.mainFeatures?.storage}</p>
    <p><span>GPS:</span>${phones?.others?.GPS || 'No GPS'}</p>
    `
    my_modal.showModal();
}