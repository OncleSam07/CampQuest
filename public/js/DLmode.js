// Declare variables safely
const myBody = document.getElementById('body');
const btnDark = document.querySelector('#dark');
const btnLight = document.querySelector('#light');
const cards = document.querySelectorAll('#myCard');
const btnViews = document.querySelectorAll('#view');
const btnDel = document.getElementById('btnDel');
const btnEdit = document.getElementById('btnEdit');
const btnSub = document.getElementById('btnSub');
const review = document.getElementById('review');
const h5 = document.querySelector('h5');
const h6s = document.querySelectorAll('#h6');
const h1 = document.getElementsByTagName('h1');
const lists = document.querySelectorAll('.list-item');
const cardReviews = document.querySelectorAll('#cardRev');
const showCard = document.getElementById('showCard');

// Load theme from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        applyDarkMode();
    } else {
        applyLightMode();
    }
});

// Dark mode toggle
if (btnDark) {
    btnDark.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.setItem('theme', 'dark');
        applyDarkMode();
    });
}

// Light mode toggle
if (btnLight) {
    btnLight.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.setItem('theme', 'light');
        applyLightMode();
    });
}

// DARK MODE
function applyDarkMode() {
    if (btnLight) btnLight.classList.remove('d-none');
    if (btnDark) btnDark.classList.add('d-none');

    if (myBody) myBody.classList.add('bg-dark', 'text-white');

    cards.forEach((card) => {
        card.classList.add('bg-dark', 'text-white');
        card.style.boxShadow = "0px 0px 5px rgba(233, 233, 233, 0.45)";
    });

    btnViews.forEach((btnview) => {
        btnview.classList.remove('btn-primary');
        btnview.classList.add('btn-secondary');
    });

    if (btnDel) {
        btnDel.classList.remove('btn-danger');
        btnDel.classList.add('btn-outline-danger');
    }

    if (btnEdit) {
        btnEdit.classList.remove('btn-warning');
        btnEdit.classList.add('btn-outline-warning');
    }

    if (btnSub) {
        btnSub.classList.remove('btn-success');
        btnSub.classList.add('btn-outline-success');
    }

    if (review) {
        review.classList.add('bg-transparent', 'text-white');
    }

    lists.forEach(list => {
        list.classList.add('bg-dark', 'text-white', 'border-top', 'border-bottom', 'border-secondary');
    });

    cardReviews.forEach(card => {
        card.classList.add('bg-secondary');
    });

    if (h6s) {
        h6s.forEach(h6 => {
            h6.classList.remove('text-muted');
            h6.classList.add('text-white');
        })

    }
    if (showCard) {
        showCard.classList.add('bg-dark', 'text-white');
        showCard.style.boxShadow = "0px 0px 5px rgba(233, 233, 233, 0.45)";
    };
}

// LIGHT MODE
function applyLightMode() {
    if (btnDark) btnDark.classList.remove('d-none');
    if (btnLight) btnLight.classList.add('d-none');

    if (myBody) myBody.classList.remove('bg-dark', 'text-white');

    cards.forEach((card) => {
        card.classList.remove('bg-dark', 'text-white');
        card.style.boxShadow = "0px 0px 5px rgba(233, 233, 233, 0)";
    });

    btnViews.forEach((btnview) => {
        btnview.classList.add('btn-primary');
        btnview.classList.remove('btn-secondary');
    });

    if (btnDel) {
        btnDel.classList.add('btn-danger');
        btnDel.classList.remove('btn-outline-danger');
    }

    if (btnEdit) {
        btnEdit.classList.add('btn-warning');
        btnEdit.classList.remove('btn-outline-warning');
    }

    if (btnSub) {
        btnSub.classList.add('btn-success');
        btnSub.classList.remove('btn-outline-success');
    }

    if (review) {
        review.classList.remove('bg-transparent', 'text-white');
    }

    lists.forEach(list => {
        list.classList.remove('bg-dark', 'text-white', 'border-top', 'border-bottom', 'border-secondary');
    });

    cardReviews.forEach(card => {
        card.classList.remove('bg-secondary');
    });

    if (h6s) {
        h6s.forEach(h6 => {
            h6.classList.add('text-muted');
            h6.classList.remove('text-white');
        })

    }
     if (showCard) {
        showCard.classList.remove('bg-dark', 'text-white');
        // showCard.style.boxShadow = "0px 0px 5px rgba(233, 233, 233, 0.45)";
    };
}
