
let currentQuote = {};

function calculateQuote(e) {
    e.preventDefault();
    const sqft = parseFloat(document.getElementById('sqft').value);
    const beds = parseFloat(document.getElementById('beds').value);
    const baths = parseFloat(document.getElementById('baths').value);
    const service = document.getElementById('service').value;

    if (!sqft || sqft < 100 || isNaN(beds) || isNaN(baths) || !service) {
        alert('Please fill in all fields correctly.');
        return;
    }

    let price = 50 + (sqft * 0.15) + (beds * 25) + (baths * 35);
    const multipliers = { residential: 1.0, deep: 1.5, office: 1.2 };
    price = Math.round(price * multipliers[service]);

    const serviceLabel = {
        residential: 'Residential Cleaning',
        deep: 'Deep Cleaning',
        office: 'Office Cleaning'
    }[service];

    currentQuote = { sqft, beds, baths, service, price, serviceLabel };

    document.getElementById('price').textContent = price.toLocaleString();
    document.getElementById('details').textContent = `${serviceLabel} • ${sqft.toLocaleString()} sq ft • ${beds} bed • ${baths} bath`;
    
    document.getElementById('quoteForm').style.display = 'none';
    document.getElementById('quoteResult').style.display = 'block';
}

// ... include the resetQuote, scheduleService, and handleSchedule functions here ...
// (Make sure they are not inside any <script> tags)
