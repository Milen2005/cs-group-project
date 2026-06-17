/**
 * RentRight Lease Analysis Tool Logic
 * Interactive drag-and-drop uploads, paste text box switching,
 * dynamic regional select menus, and animated scanning submission.
 */

document.addEventListener('DOMContentLoaded', () => {
    // State management variables
    let selectedFile = null;
    let currentTab = 'upload'; // 'upload' or 'paste'

    // DOM Elements
    const tabUpload = document.getElementById('tabUpload');
    const tabPaste = document.getElementById('tabPaste');
    const uploadSection = document.getElementById('uploadSection');
    const pasteSection = document.getElementById('pasteSection');
    
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');
    const browseBtn = document.getElementById('browseBtn');
    
    const fileDetails = document.getElementById('fileDetails');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const fileSizeDisplay = document.getElementById('fileSizeDisplay');
    const removeFileBtn = document.getElementById('removeFileBtn');
    
    const pasteInput = document.getElementById('pasteInput');
    const countrySelect = document.getElementById('countrySelect');
    const regionSelect = document.getElementById('regionSelect');
    const analyzeForm = document.getElementById('analyzeForm');
    const scanBtn = document.getElementById('scanBtn');
    
    const toastContainer = document.getElementById('toastContainer');

    // Region Data
    const regions = {
        US: [
            { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }, { code: 'AZ', name: 'Arizona' },
            { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' }, { code: 'CT', name: 'Connecticut' },
            { code: 'FL', name: 'Florida' }, { code: 'GA', name: 'Georgia' }, { code: 'IL', name: 'Illinois' },
            { code: 'MA', name: 'Massachusetts' }, { code: 'MI', name: 'Michigan' }, { code: 'NY', name: 'New York' },
            { code: 'NC', name: 'North Carolina' }, { code: 'OH', name: 'Ohio' }, { code: 'PA', name: 'Pennsylvania' },
            { code: 'TX', name: 'Texas' }, { code: 'VA', name: 'Virginia' }, { code: 'WA', name: 'Washington' }
        ],
        CA: [
            { code: 'AB', name: 'Alberta' }, { code: 'BC', name: 'British Columbia' },
            { code: 'MB', name: 'Manitoba' }, { code: 'NS', name: 'Nova Scotia' },
            { code: 'ON', name: 'Ontario' }, { code: 'QC', name: 'Quebec' }
        ],
        UK: [
            { code: 'ENG', name: 'England' }, { code: 'SCT', name: 'Scotland' },
            { code: 'WLS', name: 'Wales' }, { code: 'NIR', name: 'Northern Ireland' }
        ],
        IN: [
            { code: 'AP', name: 'Andhra Pradesh' },
            { code: 'AR', name: 'Arunachal Pradesh' },
            { code: 'AS', name: 'Assam' },
            { code: 'BR', name: 'Bihar' },
            { code: 'CG', name: 'Chhattisgarh' },
            { code: 'GA', name: 'Goa' },
            { code: 'GJ', name: 'Gujarat' },
            { code: 'HR', name: 'Haryana' },
            { code: 'HP', name: 'Himachal Pradesh' },
            { code: 'JH', name: 'Jharkhand' },
            { code: 'KA', name: 'Karnataka' },
            { code: 'KL', name: 'Kerala' },
            { code: 'MP', name: 'Madhya Pradesh' },
            { code: 'MH', name: 'Maharashtra' },
            { code: 'MN', name: 'Manipur' },
            { code: 'ML', name: 'Meghalaya' },
            { code: 'MZ', name: 'Mizoram' },
            { code: 'NL', name: 'Nagaland' },
            { code: 'OD', name: 'Odisha' },
            { code: 'PB', name: 'Punjab' },
            { code: 'RJ', name: 'Rajasthan' },
            { code: 'SK', name: 'Sikkim' },
            { code: 'TN', name: 'Tamil Nadu' },
            { code: 'TG', name: 'Telangana' },
            { code: 'TR', name: 'Tripura' },
            { code: 'UP', name: 'Uttar Pradesh' },
            { code: 'UT', name: 'Uttarakhand' },
            { code: 'WB', name: 'West Bengal' }
        ]
    };

    // 1. Toast Notification Manager
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let iconSvg = '';
        if (type === 'success') {
            iconSvg = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success-color)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            `;
        } else if (type === 'error') {
            iconSvg = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--error-color)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
            `;
        } else {
            iconSvg = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
            `;
        }

        toast.innerHTML = `
            <div class="toast-content">
                ${iconSvg}
                <span class="toast-msg">${message}</span>
            </div>
            <button class="toast-close-btn" style="border:none; background:transparent; cursor:pointer; color:#888; font-size:16px;" aria-label="Close message">&times;</button>
        `;

        toastContainer.appendChild(toast);

        // Slide out timer
        const removeTimer = setTimeout(() => {
            dismissToast(toast);
        }, 4000);

        toast.querySelector('.toast-close-btn').addEventListener('click', () => {
            clearTimeout(removeTimer);
            dismissToast(toast);
        });
    }

    function dismissToast(toast) {
        toast.style.animation = 'none';
        void toast.offsetWidth;
        toast.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        toast.style.transform = 'translateX(120%)';
        toast.style.opacity = '0';
        toast.addEventListener('transitionend', () => toast.remove());
    }

    // 2. Tab Switching Logic
    function switchTab(tab) {
        if (tab === 'upload') {
            currentTab = 'upload';
            tabUpload.classList.add('active');
            tabUpload.setAttribute('aria-selected', 'true');
            tabPaste.classList.remove('active');
            tabPaste.setAttribute('aria-selected', 'false');
            uploadSection.classList.remove('hidden');
            uploadSection.classList.add('active');
            pasteSection.classList.add('hidden');
            pasteSection.classList.remove('active');
        } else {
            currentTab = 'paste';
            tabPaste.classList.add('active');
            tabPaste.setAttribute('aria-selected', 'true');
            tabUpload.classList.remove('active');
            tabUpload.setAttribute('aria-selected', 'false');
            pasteSection.classList.remove('hidden');
            pasteSection.classList.add('active');
            uploadSection.classList.add('hidden');
            uploadSection.classList.remove('active');
        }
    }

    tabUpload.addEventListener('click', () => switchTab('upload'));
    tabPaste.addEventListener('click', () => switchTab('paste'));

    // 3. Dropdown Population Logic
    function populateRegions(countryCode) {
        // Clear previous options except first
        regionSelect.innerHTML = '<option value="">Select Region</option>';
        
        const regionList = regions[countryCode] || [];
        regionList.forEach(reg => {
            const opt = document.createElement('option');
            opt.value = reg.code;
            opt.textContent = reg.name;
            regionSelect.appendChild(opt);
        });
    }

    // Initialize state selections
    populateRegions(countrySelect.value);
    
    countrySelect.addEventListener('change', (e) => {
        populateRegions(e.target.value);
    });

    // 4. File Drag & Drop Handlers
    function highlightDropzone(e) {
        e.preventDefault();
        dropzone.classList.add('dragover');
    }

    function unhighlightDropzone(e) {
        e.preventDefault();
        dropzone.classList.remove('dragover');
    }

    function handleFileDrop(e) {
        unhighlightDropzone(e);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            processFile(files[0]);
        }
    }

    // Browse files click handler
    browseBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            processFile(e.target.files[0]);
        }
    });

    dropzone.addEventListener('dragover', highlightDropzone);
    dropzone.addEventListener('dragenter', highlightDropzone);
    dropzone.addEventListener('dragleave', unhighlightDropzone);
    dropzone.addEventListener('drop', handleFileDrop);

    // 5. File Validation and UI Setup
    function processFile(file) {
        const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
        const maxSize = 16 * 1024 * 1024; // 16 MB

        if (!allowedTypes.includes(file.type)) {
            showToast('Invalid file format. Please upload PDF, PNG, or JPG.', 'error');
            return;
        }

        if (file.size > maxSize) {
            showToast('File size exceeds 16MB limit.', 'error');
            return;
        }

        selectedFile = file;
        
        // Show file details UI
        fileNameDisplay.textContent = file.name;
        fileSizeDisplay.textContent = formatBytes(file.size);
        
        dropzone.classList.add('hidden');
        fileDetails.classList.remove('hidden');
        fileDetails.classList.add('fade-in');
        
        showToast('File loaded successfully!', 'success');
    }

    // Helper: format file bytes
    function formatBytes(bytes, decimals = 1) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    // Remove file button
    removeFileBtn.addEventListener('click', () => {
        selectedFile = null;
        fileInput.value = ''; // Reset file input
        fileDetails.classList.add('hidden');
        dropzone.classList.remove('hidden');
        showToast('File removed.', 'info');
    });

    // 6. Form Submission & Scanning Loading Effect
    analyzeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate Country and Region
        const country = countrySelect.value;
        const region = regionSelect.value;
        const regionName = regionSelect.options[regionSelect.selectedIndex].text;

        if (!region) {
            showToast('Please select your state/province to check local laws.', 'warning');
            regionSelect.focus();
            return;
        }

        // Validate Document Input based on Active Tab
        if (currentTab === 'upload') {
            if (!selectedFile) {
                showToast('Please upload a lease document before scanning.', 'error');
                return;
            }
        } else {
            const pastedText = pasteInput.value.trim();
            if (pastedText.length < 50) {
                showToast('Please paste a substantial portion of your lease agreement (min 50 chars).', 'error');
                pasteInput.focus();
                return;
            }
        }

        // Animate Scan Button to Loading State
        scanBtn.disabled = true;
        scanBtn.innerHTML = `
            <span class="spinner inline-spinner" style="width: 16px; height: 16px; border-width: 2px;"></span>
            <span>Preparing Lease Analysis...</span>
        `;
        
        // Save scan metadata in session storage for the results page to pick up
        sessionStorage.setItem('lease_source_type', currentTab);
        sessionStorage.setItem('lease_country', country);
        sessionStorage.setItem('lease_region', regionName);
        if (currentTab === 'upload') {
            sessionStorage.setItem('lease_doc_name', selectedFile.name);
            sessionStorage.setItem('lease_doc_size', formatBytes(selectedFile.size));
        } else {
            sessionStorage.setItem('lease_doc_name', 'Pasted Lease Text');
            sessionStorage.setItem('lease_doc_size', 'N/A');
        }

        // Add a smooth transition effect
        const card = document.getElementById('analyzeCard');
        card.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.opacity = '0.5';
        card.style.transform = 'scale(0.98)';

        showToast('Uploading lease agreement to secure AI analyzer...', 'success');

        // Redirect to results page after 1.2s delay
        setTimeout(() => {
            window.location.href = 'results.html';
        }, 1200);
    });
});
