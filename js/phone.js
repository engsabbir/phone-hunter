const loadPhones = async (searchText = 13, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';

    // showAll btn functionality
    const showAllContainer = document.getElementById('show-all-container');
    // console.log(phones.length);
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden')
    }

    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card bg-gray-200 shadow-xl';
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
                        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <div class="card-actions">
                <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
        toggleLoadingSpinner(false);
    });
}
const showDetails = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await response.json();
    const phone = data.data;

    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const { image, name, slug, releaseDate, brand } = phone;
    const { storage, displaySize, chipSet, memory } = phone.mainFeatures;
    // const {USB, WLAN, Radio } = phone.others;
    const showPhoneContainer = document.getElementById('show-phone-info');
    showPhoneContainer.innerHTML = `
        <img class="mx-auto mb-5" src="${image}" alt="">
        <h3 class="text-xl font-medium">Name:  ${name}</h3>
        <p><span class="font-medium">Storage :</span>  ${storage}</p>
        <p><span class="font-medium">Display Size :</span>   ${displaySize}</p>
        <p><span class="font-medium">Chip set :</span>  ${chipSet}</p>
        <p><span class="font-medium">Memory :</span>  ${memory}</p>
        <p><span class="font-medium">Slug :</span>  ${slug}</p>
        <p><span class="font-medium">Release data :</span>  ${releaseDate}</p>
        <p><span class="font-medium">Brand :</span>  ${brand}</p>
        <p><span class="font-medium">GPS :</span>  ${phone?.others?.GPS || "No GPS"}</p>
        <p><span class="font-medium">USB :</span>  ${phone?.others?.USB || "No USB"}</p>
        <p><span class="font-medium">WLAN :</span>  ${phone?.others?.WLAN || "No WLAN"}</p>
        <p><span class="font-medium">Radio :</span>  ${phone?.others?.Radio || "No Radio"}</p>
        <div class="modal-action">
            <button class="btn btn-primary">Close</button>
        </div>
    `;

    show_details_modal.showModal();
}


const searchHandle = (isShowAll) => {
    toggleLoadingSpinner(true);

    const searchInput = document.getElementById('search-input');
    const searchText = (searchInput.value);
    searchInput.value = '';
    if(searchText === ''){
        alert('please type valid name');
        toggleLoadingSpinner(false);
        return;
    }
    else{
        loadPhones(searchText, isShowAll);
    }
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    searchHandle(true)
}
loadPhones();