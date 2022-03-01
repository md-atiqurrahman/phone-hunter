const loadPhoneData = () =>{
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value;
    //clear the searchfield
    searchField.value = '';

    //get the phone data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhone(data.data));
}

const displayPhone = phones =>{
    const phoneContainer = document.getElementById('phone-container');
    phones.forEach(phone =>{
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 p-2">
                    <img src="${phone.image}" class="card-img-top w-50 h-75" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Phone name: ${phone.phone_name}</h5>
                      <p class="card-text">Brand: ${phone.brand}</p>
                    </div>
        </div>
        `;
        phoneContainer.appendChild(div);
    })
}