document.addEventListener('DOMContentLoaded', () => {

    // --- FILTER FUNCTIONALITY ---
    const filterControls = document.querySelector('.filter-controls');
    const campaignCards = document.querySelectorAll('.campaign-card');

    if (filterControls) {
        filterControls.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-category-btn')) {
                // Update active button
                filterControls.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');

                const filterValue = e.target.dataset.filter;

                campaignCards.forEach(card => {
                    const cardCategories = card.dataset.category.split(' ');
                    if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    }

    // --- SEARCH FUNCTIONALITY ---
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            campaignCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('.card-description').textContent.toLowerCase();
                const uploader = card.dataset.uploadedBy.toLowerCase();
                if (title.includes(searchTerm) || description.includes(searchTerm) || uploader.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // --- MODAL FUNCTIONALITY ---
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalCloseBtn = document.querySelector('.modal-close');
    const campaignGrid = document.querySelector('.campaign-grid');

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    };

    if (campaignGrid) {
        campaignGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-read-more')) {
                e.preventDefault();
                const card = e.target.closest('.campaign-card');

                // const image = card.querySelector('.card-image').style.backgroundImage;
                const image = card.getAttribute('data-image'); // or read inline style if you want
                const title = card.querySelector('h3').textContent;
                const uploadedBy = card.dataset.uploadedBy;
                const startDate = formatDate(card.dataset.startDate);
                const endDate = formatDate(card.dataset.endDate);
                const fullDescription = `This is a more detailed description for the "${title}" campaign. Here, we can elaborate on the cause, the goals, the team behind it, and how the funds will be utilized to make a real impact. This section provides the transparency and narrative needed to inspire potential donors.`;

                const statsElements = card.querySelectorAll('.campaign-stats div span');
                const raisedAmountText = statsElements[0].textContent;
                const goalAmountText = statsElements[1].textContent;

                const raisedAmount = parseFloat(raisedAmountText.replace(/[^0-9]/g, ''));
                const goalAmount = parseFloat(goalAmountText.replace(/[^0-9]/g, ''));
                let percentage = 0;
                if (goalAmount > 0) {
                    percentage = Math.min(Math.round((raisedAmount / goalAmount) * 100), 100);
                }
                console.log('Image URL:', image);

                const stats = card.querySelector('.campaign-stats').innerHTML;

                const modalBody = modalOverlay.querySelector('.modal-body');
                modalBody.innerHTML = `
                    <div class="card-image" style="background-image: ${image};"></div>
                    <h2>${title}</h2>
                    <div class="modal-meta">
                        <span><i class="fas fa-user-circle"></i> by <strong>${uploadedBy}</strong></span>
                        <span><i class="fas fa-calendar-alt"></i> Started: ${startDate}</span>
                        <span><i class="fas fa-calendar-check"></i> Ends: ${endDate}</span>
                    </div>
                    <div class="modal-progress-summary">
                        <div class="circular-progress-container">
                            <div class="circular-progress" style="--value: ${percentage}">
                                <span class="progress-value">${percentage}%</span>
                            </div>
                        </div>
                        <div class="modal-stats campaign-stats">${stats}</div>
                    </div>
                    <p>${fullDescription}</p>
                `;

                modalOverlay.classList.remove('hidden');
            }

            if (e.target.classList.contains('btn-donate') && !e.target.classList.contains('completed')) {
                e.preventDefault();
                const card = e.target.closest('.campaign-card');
                const title = card.querySelector('h3').textContent;
                const uploadedBy = card.dataset.uploadedBy;

                const modalBody = modalOverlay.querySelector('.modal-body');
                modalBody.innerHTML = `
                    <div class="donation-form-container">
                        <h2>Donate to "${title}"</h2>
                        <p class="donation-uploader">by <strong>${uploadedBy}</strong></p>
                        <div class="donation-form">
                            <label for="donation-amount">Enter your donation amount (INR):</label>
                            <div class="amount-input-container">
                                <span>₹</span>
                                <input type="number" id="donation-amount" placeholder="500" min="10">
                            </div>
                            <div class="preset-amounts">
                                <button class="preset-btn" data-amount="250">₹250</button>
                                <button class="preset-btn" data-amount="500">₹500</button>
                                <button class="preset-btn" data-amount="1000">₹1000</button>
                                <button class="preset-btn" data-amount="2000">₹2000</button>
                            </div>
                            <button class="btn-proceed">Proceed to Secure Payment</button>
                        </div>
                    </div>
                `;

                modalOverlay.classList.remove('hidden');

                const presetBtns = modalBody.querySelectorAll('.preset-btn');
                const amountInput = modalBody.querySelector('#donation-amount');
                presetBtns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        amountInput.value = btn.dataset.amount;
                    });
                });

                const proceedBtn = modalBody.querySelector('.btn-proceed');
                proceedBtn.addEventListener('click', () => {
                    const amount = amountInput.value;
                    if (amount && !isNaN(amount) && amount >= 10) {
                        modalBody.innerHTML = `
                            <div class="donation-confirmation">
                               <i class="fas fa-check-circle confirmation-icon"></i>
                               <h2>Thank You for Your Generosity!</h2>
                               <p>Your donation of <strong>₹${amount}</strong> to "${title}" is being processed.</p>
                                <button class="btn-primary modal-close-confirm">Close</button>
                            </div>
                         `;
                        modalBody.querySelector('.modal-close-confirm').addEventListener('click', closeModal);
                    } else {
                        alert('Please enter a valid donation amount (minimum ₹10).');
                    }
                });
            }
        });
    }

    const closeModal = () => {
        modalOverlay.classList.add('hidden');
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }
});

