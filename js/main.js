/* ========================
   Main JS - General Functions
======================== */

document.addEventListener('DOMContentLoaded', () => {
    initializeSampleData();
    checkAuth();
    setupLogoutButtons();
});

/* ========================
   Authentication & Logout
======================== */

function checkAuth() {
    const user = localStorage.getItem('currentUser');
    const currentPage = window.location.pathname;

    // Protected pages
    if (!user && !currentPage.includes('index.html') && currentPage !== '/') {
        window.location.href = 'index.html';
    }

    // Already logged in on login page
    if (user && currentPage.includes('index.html')) {
        window.location.href = 'dashboard.html';
    }
}

function setupLogoutButtons() {
    const logoutBtns = document.querySelectorAll('#logoutBtn');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    });
}

/* ========================
   Notifications
======================== */

function showNotification(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show fade-in`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    const main = document.querySelector('main');
    if (main) main.prepend(alertDiv);

    setTimeout(() => alertDiv.remove(), 3000);
}

/* ========================
   Utility Functions
======================== */

function formatDate(date) {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
}

function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);
}

function getStorageData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function saveStorageData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function deleteFromStorage(key, id) {
    const filtered = getStorageData(key).filter(item => item.id !== id);
    saveStorageData(key, filtered);
}

function generateId() {
    return '_' + Math.random().toString(36).substring(2, 9);
}

/* ========================
   Sample Data Initialization
======================== */

function initializeSampleData() {
    if (!localStorage.getItem('products')) {
        saveStorageData('products', [
            { id: '1', name: 'Laptop', category: 'Electronics', price: 999.99, stock: 15, supplier: '1' },
            { id: '2', name: 'Mouse', category: 'Electronics', price: 29.99, stock: 50, supplier: '1' },
            { id: '3', name: 'Keyboard', category: 'Electronics', price: 79.99, stock: 30, supplier: '2' }
        ]);
    }

    if (!localStorage.getItem('suppliers')) {
        saveStorageData('suppliers', [
            { id: '1', name: 'Tech Supplies Inc', contact: 'John Doe', email: 'john@techsupplies.com', phone: '555-0100', city: 'New York' },
            { id: '2', name: 'Global Electronics', contact: 'Jane Smith', email: 'jane@globalelec.com', phone: '555-0101', city: 'Los Angeles' }
        ]);
    }

    if (!localStorage.getItem('orders')) {
        saveStorageData('orders', [
            { id: '1', productId: '1', supplierId: '1', quantity: 5, date: new Date().toISOString(), status: 'Pending' },
            { id: '2', productId: '2', supplierId: '1', quantity: 10, date: new Date().toISOString(), status: 'Confirmed' }
        ]);
    }

    if (!localStorage.getItem('users')) {
        saveStorageData('users', [
            { id: '1', name: 'Admin User', email: 'admin@test.com', password: 'password123', role: 'Admin', status: 'Active', joined: new Date().toISOString() },
            { id: '2', name: 'Manager User', email: 'manager@test.com', password: 'password123', role: 'Manager', status: 'Active', joined: new Date().toISOString() }
        ]);
    }
}

/* ========================
   CSV Export
======================== */

function exportToCSV(data, filename) {
    const csv = convertArrayToCSV(data);
    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    link.download = filename;
    link.click();
}

function convertArrayToCSV(data) {
    if (!data?.length) return '';

    const headers = Object.keys(data[0]);
    const rows = data.map(row => headers.map(h => {
        const val = row[h];
        return typeof val === 'string' && val.includes(',') ? `"${val}"` : val;
    }).join(','));

    return headers.join(',') + '\n' + rows.join('\n');
}
