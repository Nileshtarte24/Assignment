const filterDropdown = document.getElementById('filter');
const clientList = document.getElementById('client-list');
const popup = document.getElementById('popup');
const popupContent = document.getElementById('popup-content');
const popupName = document.getElementById('popup-name');
const popupPoints = document.getElementById('popup-points');
const popupAddress = document.getElementById('popup-address');
const closePopup = document.getElementById('close-popup');


const apiUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=client_data';

const jsonData = [
    { label: 'Client 1', points: 100, name: 'ABCD', address: 'Delhi, India', isManager: true },
    { label: 'Client 2', points: 75, name: 'abcd', address: 'London, US', isManager: false },
    // Add more data here
];

// Populate client list
function populateClientList(clients) {
    clientList.innerHTML = '';
    clients.forEach(client => {
        const li = document.createElement('li');
        li.textContent = `${client.label} - Points: ${client.points}`;
        li.addEventListener('click', () => openPopup(client));
        clientList.appendChild(li);
    });
}

// Open popup with client details
function openPopup(client) {
    popupName.textContent = client.name;
    popupPoints.textContent = client.points;
    popupAddress.textContent = client.address;
    popup.style.display = 'flex';
    DOTween.from(popupContent, 0.5, { opacity: 0, scale: 0.5 });
}

// Close popup
function closePopupHandler() {
    popup.style.display = 'none';
}

closePopup.addEventListener('click', closePopupHandler);

// Load data and populate client list
function loadData(filter) {
    let filteredClients = jsonData;
    if (filter === 'managers') {
        filteredClients = jsonData.filter(client => client.isManager);
    } else if (filter === 'non-managers') {
        filteredClients = jsonData.filter(client => !client.isManager);
    }
    populateClientList(filteredClients);
}

// Initial load with 'All clients' filter
loadData('all');

// Handle filter changes
filterDropdown.addEventListener('change', event => {
    const selectedFilter = event.target.value;
    loadData(selectedFilter);
});
