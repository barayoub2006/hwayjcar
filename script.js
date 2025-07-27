document.addEventListener('DOMContentLoaded', () => {



document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Header on Scroll ---
    const header = document.querySelector('header');
    if (header) { // Check if header exists
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) { // If user scrolls more than 10 pixels
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- The rest of your JavaScript code goes here ---
    // (The login/signup toggle, etc.)

});


    // --- FIX FOR LOGIN/SIGNUP TOGGLE ---
    const showSignupBtn = document.getElementById('show-signup');
    const showLoginBtn = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const signupText = document.getElementById('signup-text');
    const loginText = document.getElementById('login-text');

    // Check if these elements exist on the page before adding listeners
    if (showSignupBtn && showLoginBtn && loginForm && signupForm) {
        showSignupBtn.addEventListener('click', (e) => {
            e.preventDefault(); // This stops the page from jumping
            loginForm.style.display = 'none';
            signupText.style.display = 'none';
            signupForm.style.display = 'block';
            loginText.style.display = 'block';
        });

        showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault(); // This stops the page from jumping
            loginForm.style.display = 'block';
            signupText.style.display = 'block';
            signupForm.style.display = 'none';
            loginText.style.display = 'none';
        });
    }

    // --- The rest of your script.js code can go here ---
    // For example, the theme switcher code, etc.
});



// --- Enhanced Details Modal Logic ---
    const modal = document.getElementById('details-modal');
    if (modal) {
        const detailsBtns = document.querySelectorAll('.details-btn');
        const closeBtn = modal.querySelector('.close-btn');

        detailsBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const card = btn.closest('.car-card');
                const carData = card.dataset;

                // Populate main image and thumbnails
                const mainImg = document.getElementById('modal-main-img');
                const thumb1 = document.getElementById('thumb1');
                const thumb2 = document.getElementById('thumb2');
                const thumb3 = document.getElementById('thumb3');

                mainImg.src = carData.img;
                thumb1.src = carData.img;
                thumb2.src = carData.img2 || carData.img; // Use main img if no thumb
                thumb3.src = carData.img3 || carData.img; // Use main img if no thumb
                
                // Set the first thumb as active
                document.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
                thumb1.classList.add('active');

                // Populate text content
                document.getElementById('modal-name').textContent = carData.name;
                document.getElementById('modal-description').textContent = carData.description;
                document.getElementById('modal-motor').textContent = carData.motor;
                document.getElementById('modal-power').textContent = carData.power;
                document.getElementById('modal-transmission').textContent = carData.transmission;
                document.getElementById('modal-year').textContent = carData.year;
                document.getElementById('modal-doors').textContent = carData.doors;
                document.getElementById('modal-fuel').textContent = carData.fuel;
                document.getElementById('modal-stock').textContent = `متوفر: ${carData.stock} سيارات`;
                document.getElementById('modal-price').textContent = carData.price;
                
                // Populate features list
                const featuresList = document.getElementById('modal-features-list');
                featuresList.innerHTML = ''; // Clear previous features
                if (carData.features) {
                    const features = carData.features.split(',');
                    features.forEach(feature => {
                        const li = document.createElement('li');
                        li.textContent = feature.trim();
                        featuresList.appendChild(li);
                    });
                }

                modal.style.display = 'block';
            });
        });

        // Thumbnail click event
        modal.querySelector('.modal-thumbnails').addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-thumb')) {
                document.getElementById('modal-main-img').src = e.target.src;
                // Update active state
                modal.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
            }
        });

        // Close modal actions
        closeBtn.onclick = () => modal.style.display = 'none';
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };
    }


document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Theme Switcher (Light/Dark Mode) ---
    const themeSwitcher = document.getElementById('theme-switcher');
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            // Optional: Save user preference in localStorage
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
                themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                localStorage.setItem('theme', 'dark');
                themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });

        // Check for saved theme preference
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-mode');
            themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }


    // --- 2. Advanced Car Filters ---
    const filterInputs = document.querySelectorAll('.filter-group input, .filter-group select');
    if(filterInputs.length > 0) {
        filterInputs.forEach(input => {
            input.addEventListener('input', applyFilters);
        });
    }

    function applyFilters() {
        const carCards = document.querySelectorAll('.car-grid .car-card');
        const searchName = document.getElementById('search-name')?.value.toLowerCase() || '';
        const transmission = document.getElementById('filter-transmission')?.value || 'all';
        const maxPrice = parseInt(document.getElementById('filter-price')?.value, 10) || 0;

        carCards.forEach(card => {
            const carName = card.querySelector('h3').textContent.toLowerCase();
            const carPrice = parseInt(card.dataset.price, 10);
            const carTransmission = card.dataset.transmission;

            const nameMatch = carName.includes(searchName);
            const transmissionMatch = (transmission === 'all') || (carTransmission === transmission);
            const priceMatch = (maxPrice === 0) || (carPrice <= maxPrice);

            if (nameMatch && transmissionMatch && priceMatch) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }


    // --- 3. Car Comparison Logic ---
    let comparisonList = [];
    const compareTray = document.getElementById('compare-tray');
    const compareBody = document.getElementById('compare-body');
    const closeCompareBtn = document.getElementById('close-compare');

    document.querySelectorAll('.btn-compare').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = e.target.closest('.car-card');
            const carInfo = {
                id: card.dataset.id,
                name: card.querySelector('h3').textContent,
                img: card.querySelector('img').src
            };
            addToCompare(carInfo);
        });
    });

    function addToCompare(car) {
        if (comparisonList.length < 3 && !comparisonList.find(c => c.id === car.id)) {
            comparisonList.push(car);
            updateCompareTray();
        } else if (comparisonList.length >= 3) {
            showNotification("يمكنك مقارنة 3 سيارات فقط كحد أقصى.");
        } else {
            showNotification("هذه السيارة موجودة بالفعل في قائمة المقارنة.");
        }
    }

    function updateCompareTray() {
        if (!compareTray) return;

        compareBody.innerHTML = '';
        if (comparisonList.length > 0) {
            comparisonList.forEach(car => {
                const compareCardHTML = `
                    <div class="compare-card" data-id="${car.id}">
                        <img src="${car.img}" alt="${car.name}">
                        <h4>${car.name}</h4>
                        <button class="btn-remove-compare"><i class="fas fa-times"></i> إزالة</button>
                    </div>
                `;
                compareBody.innerHTML += compareCardHTML;
            });
            compareTray.classList.add('visible');
        } else {
            compareTray.classList.remove('visible');
        }
        
        // Add event listeners for the new remove buttons
        document.querySelectorAll('.btn-remove-compare').forEach(button => {
           button.addEventListener('click', (e) => {
               const carId = e.target.closest('.compare-card').dataset.id;
               comparisonList = comparisonList.filter(c => c.id !== carId);
               updateCompareTray();
           });
        });
    }
    
    if(closeCompareBtn) {
        closeCompareBtn.addEventListener('click', () => compareTray.classList.remove('visible'));
    }

    // --- 4. FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const wasActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = 0;
            });

            // Open the clicked one if it wasn't already open
            if (!wasActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // --- 5. Custom Notification (Re-usable function) ---
    // (This part is from the previous version, made globally accessible)
});

// Global function for notifications
function showNotification(message) {
    // Logic for this is in the old script, can be integrated here
    // For now, we use the simple alert as a fallback.
    alert(message); 
}
document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Header on Scroll --- (This code is already here)
    const header = document.querySelector('header');
    if (header) { 
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Back to Top Button Logic --- (ADD THIS NEW CODE)
    const backToTopButton = document.getElementById('back-to-top');
    
    if(backToTopButton) { // Check if the button exists on the page
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show button after scrolling 300px
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the link's default behavior
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Smooth scroll to top
            });
        });
    }


    // --- The rest of your JavaScript code continues here ---
    // (The login/signup toggle, etc.)

});

document.addEventListener('DOMContentLoaded', () => {

    // ... (Your other scripts like Sticky Header, Modal, etc. are here)


    // --- Advanced Car Filters Logic ---
    const searchNameInput = document.getElementById('search-name');
    const transmissionSelect = document.getElementById('filter-transmission');
    const priceRangeInput = document.getElementById('filter-price');
    const priceValueSpan = document.getElementById('price-value');
    const carGrid = document.querySelector('.car-grid');

    // Check if filter elements exist on the page
    if (searchNameInput && transmissionSelect && priceRangeInput && carGrid) {
        
        // Function to apply all filters
        const applyFilters = () => {
            const carCards = carGrid.querySelectorAll('.car-card');
            const searchName = searchNameInput.value.toLowerCase();
            const transmission = transmissionSelect.value;
            const maxPrice = parseInt(priceRangeInput.value, 10);

            // Update price display
            if (priceValueSpan) {
                priceValueSpan.textContent = maxPrice.toLocaleString();
            }

            carCards.forEach(card => {
                const carName = card.dataset.name.toLowerCase();
                const carTransmission = card.dataset.transmission;
                const carPrice = parseInt(card.dataset.price, 10);

                // Check matches
                const nameMatch = carName.includes(searchName);
                const transmissionMatch = (transmission === 'all') || (carTransmission === transmission);
                const priceMatch = carPrice <= maxPrice;

                // Show or hide the card
                if (nameMatch && transmissionMatch && priceMatch) {
                    card.style.display = 'flex'; // Use flex as defined in your CSS for car-card
                } else {
                    card.style.display = 'none';
                }
            });
        };

        // Add event listeners to all filter inputs
        searchNameInput.addEventListener('input', applyFilters);
        transmissionSelect.addEventListener('input', applyFilters);
        priceRangeInput.addEventListener('input', applyFilters);
    }


    // ... (The rest of your scripts continue here)

});


document.addEventListener('DOMContentLoaded', () => {

    // ... (Your other scripts like Sticky Header, Sales Filters, etc., are here)

    // --- RENTAL Car Filters Logic ---
    const searchNameLouer = document.getElementById('search-name-louer');
    const priceRangeLouer = document.getElementById('filter-price-louer');
    const priceValueLouer = document.getElementById('price-value-louer');
    const rentalGrid = document.querySelector('.rental-grid');

    // Check if rental filter elements exist on the page
    if (searchNameLouer && priceRangeLouer && rentalGrid) {
        
        const applyRentalFilters = () => {
            const rentalCards = rentalGrid.querySelectorAll('.car-card');
            const searchName = searchNameLouer.value.toLowerCase();
            const maxDailyPrice = parseInt(priceRangeLouer.value, 10);

            // Update price display
            if (priceValueLouer) {
                priceValueLouer.textContent = maxDailyPrice.toLocaleString();
            }

            rentalCards.forEach(card => {
                const carName = card.dataset.name.toLowerCase();
                const carDailyRate = parseInt(card.dataset.dailyRate, 10);

                // Check matches
                const nameMatch = carName.includes(searchName);
                const priceMatch = carDailyRate <= maxDailyPrice;

                // Show or hide the card
                if (nameMatch && priceMatch) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        };

        // Add event listeners
        searchNameLouer.addEventListener('input', applyRentalFilters);
        priceRangeLouer.addEventListener('input', applyRentalFilters);
    }

    // ... (The rest of your scripts continue here)
});