// Google Drive API configuration
const API_KEY = 'YOUR_API_AIzaSyAK8CPBr6ihr4VMl10Z0O9qqZOnzL8DJY0'; // You'll need to add your API key

// Store folder ID in localStorage for convenience
let currentFolderId = localStorage.getItem('gdrive_folder_id') || '';
if (currentFolderId) {
    document.getElementById('folderId').value = currentFolderId;
}

async function loadImages() {
    const folderId = document.getElementById('folderId').value.trim();
    
    if (!folderId) {
        showError('Please enter a Google Drive folder ID');
        return;
    }
    
    // Save folder ID for next time
    localStorage.setItem('gdrive_folder_id', folderId);
    
    // Clear previous content
    document.getElementById('gallery').innerHTML = '';
    document.getElementById('error').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    
    try {
        // If using API key method
        if (API_KEY !== 'YOUR_API_KEY_HERE') {
            await loadWithApiKey(folderId);
        } else {
            // Fallback to direct links method
            await loadWithDirectLinks(folderId);
        }
    } catch (error) {
        console.error('Error loading images:', error);
        showError('Error loading images: ' + error.message);
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}

async function loadWithApiKey(folderId) {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+(mimeType+contains+'image/')&key=${API_KEY}&fields=files(id,name,mimeType,thumbnailLink,webContentLink)`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('Failed to fetch images from Google Drive. Make sure the folder is publicly accessible.');
    }
    
    const data = await response.json();
    
    if (!data.files || data.files.length === 0) {
        showError('No images found in this folder');
        return;
    }
    
    displayImages(data.files);
}

async function loadWithDirectLinks(folderId) {
    // This method requires users to manually share each image
    // It's a simpler approach but less automated
    showError('Please add your Google API key in script.js or use the manual method below.\n\n' +
        'To get an API key:\n' +
        '1. Go to Google Cloud Console (console.cloud.google.com)\n' +
        '2. Create a new project or select existing\n' +
        '3. Enable the Google Drive API\n' +
        '4. Create credentials (API Key)\n' +
        '5. Paste the key in script.js');
}

function displayImages(files) {
    const gallery = document.getElementById('gallery');
    
    files.forEach(file => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        // Use thumbnail for display, full image for lightbox
        const thumbnailUrl = file.thumbnailLink || `https://drive.google.com/thumbnail?id=${file.id}&sz=w400`;
        const fullImageUrl = `https://drive.google.com/uc?export=view&id=${file.id}`;
        
        item.innerHTML = `
            <img src="${thumbnailUrl}" alt="${file.name}" loading="lazy">
            <div class="gallery-item-title">${file.name}</div>
        `;
        
        item.onclick = () => openLightbox(fullImageUrl, file.name);
        gallery.appendChild(item);
    });
}

function openLightbox(imageUrl, imageName) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.querySelector('.lightbox-caption');
    
    lightboxImg.src = imageUrl;
    caption.textContent = imageName;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});
