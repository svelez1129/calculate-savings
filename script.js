// script.js

const cities = [
    "New York, NY",
    "San Francisco, CA",
    "Austin, TX",
    "Chicago, IL",
    "Boston, MA",
    "Los Angeles, CA",
    "Seattle, WA",
    "Miami, FL",
    "Houston, TX",
    "Phoenix, AZ"
];

const cityDropdown = document.getElementById("cityDropdown");
const cityInput = document.getElementById("cityInput");

// First populate the city dropdown with all cities
function populateCityDropdown() {
    cityDropdown.innerHTML = ""; // Clear existing options
    cities.forEach(city => {
        const div = document.createElement("div");
        div.classList.add("dropdown-item");
        div.textContent = city;
        div.onclick = () => selectCity(city);
        cityDropdown.appendChild(div);
    });
}

// Filter the cities based on the user input
function filterCities() {
    const input = cityInput.value.toLowerCase();
    cityDropdown.innerHTML = ""; // Clear previous results

    const filteredCities = cities.filter(city =>
        city.toLowerCase().includes(input)
    );

    if (filteredCities.length > 0) {
        filteredCities.forEach(city => {
            const div = document.createElement("div");
            div.classList.add("dropdown-item");
            div.textContent = city;
            div.onclick = () => selectCity(city);
            cityDropdown.appendChild(div);
        });
        showDropdown();
    } else {
        hideDropdown();
    }
}

// Show the dropdown
function showDropdown() {
    cityDropdown.style.display = "block";
}

// Hide the dropdown
function hideDropdown() {
    cityDropdown.style.display = "none";
}

// Select a city from the dropdown
function selectCity(city) {
    cityInput.value = city;
    hideDropdown();
    cityInput.focus(); // Refocus on the input
}

// Initialize dropdown on page load
document.addEventListener("DOMContentLoaded", populateCityDropdown);

// Close dropdown if clicking outside
document.addEventListener("click", (event) => {
    if (!event.target.closest(".dropdown-container")) {
        hideDropdown();
    }
});
