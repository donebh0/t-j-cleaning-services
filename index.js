<script>
    let currentQuote = {};

    // 1. Calculate Quote logic
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

    // 2. Reset Quote logic
    function resetQuote() {
        document.getElementById('quoteForm').style.display = 'block';
        document.getElementById('quoteResult').style.display = 'none';
        document.getElementById('quoteForm').reset();
    }

    // 3. Schedule Service UI toggler
    function scheduleService() {
        document.getElementById('schedule').style.display = 'block';
        document.getElementById('schedule').scrollIntoView({ behavior: 'smooth' });
    }

    // 4. Handle Submission + Weekend Validation
    function handleSchedule(e) {
        e.preventDefault();

        const dateInput = document.querySelector('input[name="date"]').value;
        const selectedDate = new Date(dateInput);
        const day = selectedDate.getUTCDay();

        // Validate Mon-Fri (1 is Monday, 5 is Friday)
        if (day === 0 || day === 6) {
            alert("We are only open Monday - Friday. Please choose a weekday.");
            return false;
        }

        const formData = new FormData(document.getElementById('scheduleForm'));
        const data = Object.fromEntries(formData);

        // Save to LocalStorage
        const requests = JSON.parse(localStorage.getItem('cleaningRequests') || '[]');
        requests.push({ ...data, ...currentQuote, submittedAt: new Date().toLocaleString() });
        localStorage.setItem('cleaningRequests', JSON.stringify(requests));

        // Show Success
        document.getElementById('scheduleForm').style.display = 'none';
        document.getElementById('successMsg').style.display = 'block';
    }

    // Set minimum date to today
    document.addEventListener('DOMContentLoaded', function() {
        const today = new Date().toISOString().split('T')[0];
        document.querySelector('input[name="date"]').min = today;
    });
</script>
