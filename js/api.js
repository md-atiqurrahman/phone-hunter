const loadPhoneData = () =>{
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value;
    //clear the searchfield
    searchField.value = '';

    //get the phone data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => checkValue(data.data));
}
const checkValue = array =>{
    if(array.length === 0){
        const noResults = document.getElementById('no-results');
        noResults.classList.remove('d-none');

        const phoneContainer = document.getElementById('phone-container');
        //clear the previous result
        phoneContainer.textContent = '';
        //clear the previous details
        const phoneDetailsContainer = document.getElementById('phone-details');
        phoneDetailsContainer.textContent = '';
    }
    else{
        displayPhone(array.slice(0,20));
    }
};
//show the results
const displayPhone = phones =>{
    const noResults = document.getElementById('no-results');
    noResults.classList.add('d-none');

    const phoneContainer = document.getElementById('phone-container');
    //clear the previous result
    phoneContainer.textContent = '';
    //clear the previous details
    const phoneDetailsContainer = document.getElementById('phone-details');
    phoneDetailsContainer.textContent = '';

    phones.forEach(phone =>{
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 py-2">
                    <img src="${phone.image}" class="card-img-top w-50 h-75 mx-3" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Phone name: ${phone.phone_name}</h5>
                      <p class="fs-5 text fw-normal">Brand: ${phone.brand}</p>
                      <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary w-50 ">Details</button>
                    </div>
                    
        </div>
        `;
        phoneContainer.appendChild(div);
    })
};
//get phone details
const loadPhoneDetails = phoneId =>{
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data));

};

//show the phone details
const displayPhoneDetails = phone =>{
    console.log(phone)
    const phoneDetailsContainer = document.getElementById('phone-details');
    //clear the previous details
    phoneDetailsContainer.textContent = '';
    
    const div = document.createElement('div');
    div.innerHTML =`
    <div class="text-center">
        <img src="${phone.image}">
        <h4>Phone name: ${phone.name}</h5>
        <p>Realese date: ${phone.releaseDate ? phone.releaseDate: 'no release date found'}</p>
        <h5>Brand: ${phone.brand}</h4>
        <div>
            <h5 class="text-center">Main features</h5>
           <div>
               <p>Chipset: ${phone.mainFeatures.chipSet}</p>
               <p>Display size: ${phone.mainFeatures.displaySize}</p>
               <p>Memory: ${phone.mainFeatures.memory}</p>
               <p>Storage: ${phone.mainFeatures.storage}</p>
               <p>Sensors: ${phone.mainFeatures.sensors}</p>
           </div>
       </div>
       <div>
            <h5 class="text-center">Others features</h5>
           <div>
               <p>Bluetooth: ${phone?.others?.Bluetooth ? phone.others.Bluetooth: 'No'}</p>
               <p>GPS: ${phone?.others?.GPS ? phone.others.GPS: 'No'}</p>
               <p>NFC: ${phone?.others?.NFC ? phone.others.NFC: 'No'}</p>
               <p>Radio: ${phone?.others?.Radio ? phone.others.Radio: 'No'}</p>
               <p>USB: ${phone?.others?.USB ? phone.others.USB: 'NO'}</p>
               <p>WLAN: ${phone?.others?.WLAN ? phone.others.WLAN: 'No'}</p>
           </div>
       </div>
    </div>
    `;
    phoneDetailsContainer.appendChild(div);
};
