const cityData = {
    'New York, NY': { housing: 3000, groceries: 600, transportation: 400, utilities: 200 },
    'San Francisco, CA': { housing: 3500, groceries: 650, transportation: 300, utilities: 180 },
    'Austin, TX': { housing: 1800, groceries: 400, transportation: 200, utilities: 150 },
    'Chicago, IL': { housing: 1600, groceries: 350, transportation: 150, utilities: 120 }
};

function calculate() {
    const hourlyWage = parseFloat(document.getElementById('hourlyWage').value);
    const hoursWorked = parseFloat(document.getElementById('hoursWorked').value);
    const weeksWorked = parseFloat(document.getElementById('weeksWorked').value);
    const city = document.getElementById('cityInput').value;

    if (!hourlyWage || !hoursWorked || !weeksWorked || !city) {
        alert('Please fill all fields');
        return;
    }

    const grossIncome = hourlyWage * hoursWorked * weeksWorked;
    const taxes = grossIncome * 0.25; // Simplified tax calculation

    document.getElementById('grossIncome').textContent = grossIncome.toFixed(2);
    document.getElementById('taxes').textContent = taxes.toFixed(2);

    // Set city costs
    if (cityData[city]) {
        const costs = cityData[city];
        document.getElementById('housing').value = costs.housing;
        document.getElementById('groceries').value = costs.groceries;
        document.getElementById('transportation').value = costs.transportation;
        document.getElementById('utilities').value = costs.utilities;
    }

    document.getElementById('results').style.display = 'block';
    updateNetIncome();
}

function updateNetIncome() {
    const costs = Array.from(document.querySelectorAll('.cost-input'))
                     .reduce((acc, input) => acc + parseFloat(input.value), 0);
    
    const gross = parseFloat(document.getElementById('grossIncome').textContent);
    const taxes = parseFloat(document.getElementById('taxes').textContent);
    const net = (gross - taxes - costs) / 12; // Monthly breakdown

    const netDisplay = document.getElementById('netIncome');
    netDisplay.textContent = `Monthly Take-home: $${net.toFixed(2)}`;
    netDisplay.classList.toggle('negative', net < 0);
}

// Add event listeners to all cost inputs
document.querySelectorAll('.cost-input').forEach(input => {
    input.addEventListener('input', updateNetIncome);
});

// Add floating label functionality
document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('input', () => {
        input.parentNode.querySelector('label').style.display = input.value ? 'none' : 'block';
    });
});