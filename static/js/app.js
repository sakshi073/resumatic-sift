
// DOM Elements
const uploadForm = document.getElementById('uploadForm');
const browseButton = document.getElementById('browseButton');
const fileInput = document.getElementById('fileInput');
const processButton = document.getElementById('processButton');
const fileList = document.getElementById('fileList');
const fileCount = document.getElementById('fileCount');
const selectedFiles = document.getElementById('selectedFiles');
const uploadProgress = document.getElementById('uploadProgress');
const progressBar = document.querySelector('.progress-bar');
const progressPercentage = document.getElementById('progressPercentage');
const resultsSection = document.getElementById('resultsSection');
const resultCount = document.getElementById('resultCount');
const resumeResults = document.getElementById('resumeResults');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const minCGPAInput = document.getElementById('minCGPA');
const skillsList = document.getElementById('skillsList');
const selectedSkillsContainer = document.getElementById('selectedSkillsContainer');
const selectedSkillsBadges = document.getElementById('selectedSkillsBadges');
const clearFilters = document.getElementById('clearFilters');
const applyFilters = document.getElementById('applyFilters');
const exportCSV = document.getElementById('exportCSV');
const exportExcel = document.getElementById('exportExcel');
const toast = document.getElementById('toast');
const toastTitle = document.getElementById('toastTitle');
const toastMessage = document.getElementById('toastMessage');

// State variables
let allResumes = [];
let filteredResumes = [];
let selectedSkills = [];
let allSkills = [];

// Initialize Bootstrap tooltips and popovers
document.addEventListener('DOMContentLoaded', function() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Set up drag and drop for the file upload area
    setupDragAndDrop();
});

// Show toast notification
function showToast(title, message, type = 'success') {
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    
    const toastElement = new bootstrap.Toast(toast);
    toast.classList.remove('bg-success', 'bg-danger', 'bg-warning', 'text-white');
    
    if (type === 'success') {
        toast.classList.add('bg-success', 'text-white');
    } else if (type === 'error') {
        toast.classList.add('bg-danger', 'text-white');
    } else if (type === 'warning') {
        toast.classList.add('bg-warning');
    }
    
    toastElement.show();
}

// Set up drag and drop functionality
function setupDragAndDrop() {
    const dropZone = document.querySelector('.card.border-dashed');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        dropZone.classList.add('drag-active');
    }
    
    function unhighlight() {
        dropZone.classList.remove('drag-active');
    }
    
    dropZone.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        fileInput.files = files;
        handleFileSelect();
    }
}

// Event listeners
browseButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', handleFileSelect);

function handleFileSelect() {
    if (fileInput.files.length > 0) {
        fileList.classList.remove('d-none');
        fileCount.textContent = fileInput.files.length;
        selectedFiles.innerHTML = '';
        
        Array.from(fileInput.files).forEach(file => {
            const fileSize = (file.size / 1024).toFixed(1); // KB
            const li = document.createElement('li');
            li.textContent = `${file.name} (${fileSize} KB)`;
            selectedFiles.appendChild(li);
        });
        
        processButton.disabled = false;
    } else {
        fileList.classList.add('d-none');
        processButton.disabled = true;
    }
}

processButton.addEventListener('click', processResumes);

async function processResumes() {
    if (fileInput.files.length === 0) {
        showToast('Error', 'Please select at least one file.', 'error');
        return;
    }
    
    // Show progress indicator
    uploadProgress.classList.remove('d-none');
    processButton.disabled = true;
    browseButton.disabled = true;
    
    const formData = new FormData();
    Array.from(fileInput.files).forEach(file => {
        formData.append('files[]', file);
    });
    
    try {
        // Simulate progress (in a real app, you might use upload progress events)
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            progressBar.style.width = `${progress}%`;
            progressPercentage.textContent = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 100);
        
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        // Clear the interval if it's still running
        clearInterval(interval);
        progressBar.style.width = '100%';
        progressPercentage.textContent = '100%';
        
        // Hide progress after a short delay
        setTimeout(() => {
            uploadProgress.classList.add('d-none');
            processButton.disabled = false;
            browseButton.disabled = false;
            
            // Reset the file input
            fileInput.value = '';
            fileList.classList.add('d-none');
            
            // Add new resumes to the list
            if (data.resumes && data.resumes.length > 0) {
                allResumes = [...allResumes, ...data.resumes];
                filteredResumes = allResumes;
                
                // Update UI
                updateResultCount();
                displayResumes();
                extractAllSkills();
                populateSkillsList();
                
                // Show results section
                resultsSection.classList.remove('d-none');
                
                showToast('Success', `Successfully processed ${data.resumes.length} resume(s).`);
            } else {
                showToast('Warning', 'No valid resumes found in the uploaded files.', 'warning');
            }
        }, 500);
        
    } catch (error) {
        console.error('Error processing resumes:', error);
        uploadProgress.classList.add('d-none');
        processButton.disabled = false;
        browseButton.disabled = false;
        showToast('Error', 'Failed to process resumes. Please try again.', 'error');
    }
}

function updateResultCount() {
    resultCount.textContent = `${filteredResumes.length} of ${allResumes.length} resume${allResumes.length === 1 ? '' : 's'}`;
}

function displayResumes() {
    resumeResults.innerHTML = '';
    
    if (filteredResumes.length === 0) {
        resumeResults.innerHTML = `
            <div class="text-center py-5 text-muted">
                <p>No matching resumes found.</p>
            </div>
        `;
        return;
    }
    
    filteredResumes.forEach((resume, index) => {
        // Create a card for each resume
        const resumeCard = document.createElement('div');
        resumeCard.className = 'card resume-card mb-3 fade-in';
        resumeCard.style.animationDelay = `${index * 50}ms`;
        
        // Create the main content HTML
        let content = `
            <div class="card-header d-flex justify-content-between align-items-start">
                <div>
                    <h5 class="card-title mb-1">${resume.name}</h5>
                    <div class="text-muted small">
                        <a href="mailto:${resume.email}" class="text-decoration-none">${resume.email}</a>
                        • ${resume.phone}
                    </div>
                </div>
                <button type="button" class="btn btn-sm btn-link p-0 toggle-details" data-id="${resume.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    ${resume.skills.map(skill => 
                        `<span class="badge badge-skill me-1 mb-1">${skill}</span>`
                    ).join('')}
                </div>
                <div class="d-flex text-muted small gap-2 flex-wrap">
                    <div class="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-mortarboard me-1" viewBox="0 0 16 16">
                            <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z"/>
                            <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z"/>
                        </svg>
                        ${resume.college}
                    </div>
                    <span>•</span>
                    <div>${resume.degree}</div>
                    <span>•</span>
                    <div>CGPA: ${resume.cgpa}</div>
                </div>
                
                <div class="resume-details mt-3 d-none" id="details-${resume.id}">
        `;
        
        // Add experience section if available
        if (resume.experience && resume.experience.length > 0) {
            content += `
                <div class="mt-3">
                    <h6 class="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-briefcase me-2" viewBox="0 0 16 16">
                            <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5m1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0M1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                        Experience
                    </h6>
                    <div class="ps-4">
            `;
            
            resume.experience.forEach(exp => {
                content += `
                    <div class="mb-2">
                        <div class="fw-medium">${exp.position}</div>
                        <div class="text-muted small">${exp.company} • ${exp.duration}</div>
                        <div class="small mt-1">${exp.description}</div>
                    </div>
                `;
            });
            
            content += `
                    </div>
                </div>
            `;
        }
        
        // Add projects section if available
        if (resume.projects && resume.projects.length > 0) {
            content += `
                <div class="mt-3">
                    <h6 class="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder me-2" viewBox="0 0 16 16">
                            <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"/>
                        </svg>
                        Projects
                    </h6>
                    <div class="ps-4">
            `;
            
            resume.projects.forEach(project => {
                content += `
                    <div class="mb-2">
                        <div class="fw-medium">${project.name}</div>
                        <div class="small mt-1">${project.description}</div>
                        <div class="mt-1">
                            ${project.technologies.map(tech => 
                                `<span class="badge bg-light text-dark border me-1">${tech}</span>`
                            ).join('')}
                        </div>
                    </div>
                `;
            });
            
            content += `
                    </div>
                </div>
            `;
        }
        
        // Add certifications section if available
        if (resume.certifications && resume.certifications.length > 0) {
            content += `
                <div class="mt-3">
                    <h6 class="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-award me-2" viewBox="0 0 16 16">
                            <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193 .684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z"/>
                            <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z"/>
                        </svg>
                        Certifications
                    </h6>
                    <div class="ps-4">
                        <ul class="list-unstyled small">
            `;
            
            resume.certifications.forEach(cert => {
                content += `<li class="mb-1">• ${cert}</li>`;
            });
            
            content += `
                        </ul>
                    </div>
                </div>
            `;
        }
        
        // Close the main divs
        content += `
                </div>
            </div>
        `;
        
        resumeCard.innerHTML = content;
        resumeResults.appendChild(resumeCard);
    });
    
    // Add event listeners to toggle buttons
    document.querySelectorAll('.toggle-details').forEach(button => {
        button.addEventListener('click', function() {
            const resumeId = this.getAttribute('data-id');
            const detailsSection = document.getElementById(`details-${resumeId}`);
            const chevronIcon = this.querySelector('svg');
            
            if (detailsSection.classList.contains('d-none')) {
                detailsSection.classList.remove('d-none');
                detailsSection.classList.add('slide-up');
                chevronIcon.classList.replace('bi-chevron-right', 'bi-chevron-down');
            } else {
                detailsSection.classList.add('d-none');
                detailsSection.classList.remove('slide-up');
                chevronIcon.classList.replace('bi-chevron-down', 'bi-chevron-right');
            }
        });
    });
}

function extractAllSkills() {
    // Extract all unique skills from all resumes
    const skillSet = new Set();
    allResumes.forEach(resume => {
        resume.skills.forEach(skill => {
            skillSet.add(skill);
        });
    });
    
    allSkills = Array.from(skillSet).sort();
}

function populateSkillsList() {
    skillsList.innerHTML = '';
    
    allSkills.forEach(skill => {
        const div = document.createElement('div');
        div.className = 'form-check';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input';
        checkbox.id = `skill-${skill.replace(/\s+/g, '-')}`;
        checkbox.value = skill;
        checkbox.checked = selectedSkills.includes(skill);
        
        const label = document.createElement('label');
        label.className = 'form-check-label';
        label.htmlFor = `skill-${skill.replace(/\s+/g, '-')}`;
        label.textContent = skill;
        
        div.appendChild(checkbox);
        div.appendChild(label);
        skillsList.appendChild(div);
    });
}

function updateSelectedSkillsBadges() {
    selectedSkillsBadges.innerHTML = '';
    
    if (selectedSkills.length > 0) {
        selectedSkillsContainer.classList.remove('d-none');
        
        selectedSkills.forEach(skill => {
            const badge = document.createElement('span');
            badge.className = 'skill-badge';
            badge.innerHTML = `
                ${skill}
                <span class="remove-skill" data-skill="${skill}">&times;</span>
            `;
            selectedSkillsBadges.appendChild(badge);
        });
        
        const clearBadge = document.createElement('span');
        clearBadge.className = 'skill-badge bg-light';
        clearBadge.textContent = 'Clear All';
        clearBadge.style.cursor = 'pointer';
        clearBadge.addEventListener('click', () => {
            selectedSkills = [];
            updateSelectedSkillsBadges();
            populateSkillsList();
        });
        
        selectedSkillsBadges.appendChild(clearBadge);
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-skill').forEach(btn => {
            btn.addEventListener('click', function() {
                const skillToRemove = this.getAttribute('data-skill');
                selectedSkills = selectedSkills.filter(s => s !== skillToRemove);
                updateSelectedSkillsBadges();
                populateSkillsList();
            });
        });
    } else {
        selectedSkillsContainer.classList.add('d-none');
    }
}

// Search functionality
searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

async function performSearch() {
    const searchTerm = searchInput.value.trim();
    const minCGPA = minCGPAInput.value.trim();
    
    try {
        const response = await fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                searchTerm,
                skills: selectedSkills,
                minCGPA
            })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        filteredResumes = data.resumes;
        
        updateResultCount();
        displayResumes();
    } catch (error) {
        console.error('Error searching resumes:', error);
        showToast('Error', 'Failed to search resumes. Please try again.', 'error');
    }
}

// Filter events
applyFilters.addEventListener('click', () => {
    // Get all checked skills
    selectedSkills = [];
    document.querySelectorAll('#skillsList input:checked').forEach(checkbox => {
        selectedSkills.push(checkbox.value);
    });
    
    updateSelectedSkillsBadges();
    performSearch();
});

clearFilters.addEventListener('click', () => {
    searchInput.value = '';
    minCGPAInput.value = '';
    selectedSkills = [];
    
    updateSelectedSkillsBadges();
    populateSkillsList();
    
    filteredResumes = allResumes;
    updateResultCount();
    displayResumes();
});

// Export functionality
exportCSV.addEventListener('click', () => exportResumes('csv'));
exportExcel.addEventListener('click', () => exportResumes('excel'));

async function exportResumes(format) {
    try {
        // Create a form to submit the POST request
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/export';
        
        // Create a hidden input for the format
        const formatInput = document.createElement('input');
        formatInput.type = 'hidden';
        formatInput.name = 'format';
        formatInput.value = format;
        form.appendChild(formatInput);
        
        // Create a hidden input for the resumes data
        const resumesInput = document.createElement('input');
        resumesInput.type = 'hidden';
        resumesInput.name = 'resumes';
        resumesInput.value = JSON.stringify(filteredResumes);
        form.appendChild(resumesInput);
        
        // Append the form to the document body
        document.body.appendChild(form);
        
        // Submit the form
        form.submit();
        
        // Remove the form from the document
        document.body.removeChild(form);
        
        showToast('Success', `Exporting ${filteredResumes.length} resumes as ${format.toUpperCase()}.`);
    } catch (error) {
        console.error('Error exporting resumes:', error);
        showToast('Error', 'Failed to export resumes. Please try again.', 'error');
    }
}

// Enhanced skills-related event handling
document.addEventListener('click', function(e) {
    // Handle skill badge clicks
    if (e.target.classList.contains('badge-skill')) {
        const skillText = e.target.textContent.trim();
        
        // Check if not already in the selected skills
        if (!selectedSkills.includes(skillText)) {
            selectedSkills.push(skillText);
            updateSelectedSkillsBadges();
            populateSkillsList();
            performSearch();
        }
    }
});

// Add search input for skills list
// Adding search functionality to filter skills in the skills list dropdown
const skillsListWrapper = document.createElement('div');
skillsListWrapper.className = 'mb-2';
skillsListWrapper.innerHTML = `
    <input type="text" class="form-control form-control-sm" 
           id="skillsSearch" placeholder="Search skills...">
`;

// Insert the search input before the skills list
if (skillsList.parentNode) {
    skillsList.parentNode.insertBefore(skillsListWrapper, skillsList);
}

// Add event listener to filter skills as user types
document.getElementById('skillsSearch').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const skillCheckboxes = skillsList.querySelectorAll('.form-check');
    
    skillCheckboxes.forEach(checkboxDiv => {
        const label = checkboxDiv.querySelector('label');
        const skillName = label.textContent.toLowerCase();
        
        if (skillName.includes(searchTerm)) {
            checkboxDiv.style.display = '';
        } else {
            checkboxDiv.style.display = 'none';
        }
    });
});

// Function to fetch and display existing resumes on page load
async function fetchExistingResumes() {
    try {
        const response = await fetch('/resumes');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        if (data.resumes && data.resumes.length > 0) {
            allResumes = data.resumes;
            filteredResumes = allResumes;
            
            // Update UI
            updateResultCount();
            displayResumes();
            extractAllSkills();
            populateSkillsList();
            
            // Show results section
            resultsSection.classList.remove('d-none');
        }
    } catch (error) {
        console.error('Error fetching existing resumes:', error);
    }
}

// Call this function when the page loads
fetchExistingResumes();
