document.getElementById('searchBtn').addEventListener('click', function () {
    const countryInputValue = document.getElementById('countryInput').value.trim();
    
    if (countryInputValue) {
        getUniversitiesByCountry(countryInputValue);
    } else {
        alert('Please enter a valid country name.');
    }
});

function getUniversitiesByCountry(country) {
    const apiUrl = `http://universities.hipolabs.com/search?country=${encodeURIComponent(country)}`;
    const resultsContainer = document.getElementById('universities');

    resultsContainer.innerHTML = '<p>Loading universities data...</p>';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(universityData => {
            removeContainers();

            renderUniversityCards(universityData);
            createGoBackButton();
        })
        .catch(error => {
            console.error('Error fetching university data:', error);
            resultsContainer.innerHTML = '<p>Error fetching data. Please try again later.</p>';
        });
}


function removeContainers() {
    
    const searchBar = document.querySelector('.search-bar');
    const message = document.getElementById('message');

    if (searchBar) {
        searchBar.remove(); 
    }

    if (message) {
        message.remove(); 
    }
}


function renderUniversityCards(universityList) {
    const resultsContainer = document.getElementById('universities');
    resultsContainer.innerHTML = ''; 

    if (universityList.length === 0) {
        resultsContainer.innerHTML = '<p>No universities found for the specified country.</p>';
        return;
    }

    universityList.forEach(university => {
        const universityCard = createUniversityCard(university);
        resultsContainer.appendChild(universityCard);
    });
}


function createUniversityCard(university) {
    const universityCardElement = document.createElement('div');
    universityCardElement.classList.add('university-card');

    universityCardElement.innerHTML = `
        <h2>${university.name}</h2>
        <p><strong>Country:</strong> ${university.country}</p>
        <p><strong>Website:</strong> <a href="${university.web_pages[0]}" target="_blank">${university.web_pages[0]}</a></p>
    `;

    return universityCardElement;
}


function createGoBackButton() {
    
    if (!document.getElementById('goBackBtn')) {
        const goBackButton = document.createElement('button');
        goBackButton.id = 'goBackBtn';
        goBackButton.textContent = 'Go Back';
        goBackButton.classList.add('go-back-btn');

        
        goBackButton.addEventListener('click', () => {
            location.reload(); 
        });

        
        const container = document.querySelector('.container');
        container.insertBefore(goBackButton, container.firstChild);
    }
}
