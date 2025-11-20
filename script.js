// Image configuration - Add your Google Drive image file IDs here
// No API key needed! Just make sure images are publicly shared
const imageList = [
    // Example format:
    // { id: '1ABC123xyz...', name: 'Image 1' },
    // { id: '1DEF456abc...', name: 'Image 2' },
    // Add your images below:
];

// Store folder ID in localStorage for convenience
let currentFolderId = localStorage.getItem('gdrive_folder_id') || '';
if (currentFolderId) {
    document.getElementById('folderId').value = currentFolderId;
}

async function loadImages() {
    const folderId = document.getElementById('folderId').value.trim();
    
    // Clear previous content
    document.getElementById('gallery').innerHTML = '';
    document.getElementById('error').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    
    try {
        if (imageList.length > 0) {
            // Use the predefined image list
            displayImages(imageList);
        } else if (folderId) {
            // Try to load from folder using embed method
            await loadFromFolderEmbed(folderId);
        } else {
            showError('Please add image IDs to the imageList array in script.js, or enter a folder ID to try the embed method.');
        }
    } catch (error) {
        console.error('Error loading images:', error);
        showError('Error loading images: ' + error.message);
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}

async function loadFromFolderEmbed(folderId) {
    // Save folder ID for next time
    localStorage.setItem('gdrive_folder_id', folderId);
    
    // This method creates an embedded view of the folder
    // Note: This doesn't give us individual image control, but shows the folder contents
    const gallery = document.getElementById('gallery');
    
    showError('Note: Without an API key, you need to manually add image file IDs to the imageList array in script.js.\n\n' +
        'To get file IDs:\n' +
        '1. Open your Google Drive folder\n' +
        '2. Right-click each image → Get link\n' +
        '3. The file ID is the part after /d/ or /file/d/ in the URL\n' +
        '4. Add them to the imageList array in script.js\n\n' +
        'Example:\nhttps://drive.google.com/file/d/1ABC123xyz.../view\nFile ID: 1ABC123xyz...');
}

function displayImages(images) {
    const gallery = document.getElementById('gallery');
    
    images.forEach(image => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        // Use thumbnail for display, full image for lightbox
        const thumbnailUrl = `https://drive.google.com/thumbnail?id=${image.id}&sz=w400`;
        const fullImageUrl = `https://drive.google.com/uc?export=view&id=${image.id}`;
        
        item.innerHTML = `
            <img src="${thumbnailUrl}" alt="${image.name}" loading="lazy" onerror="this.onerror=null; this.src='${fullImageUrl}';">
            <div class="gallery-item-title">${image.name}</div>
        `;
        
        item.onclick = () => openLightbox(fullImageUrl, image.name);
        gallery.appendChild(item);
    });
    
    if (images.length === 0) {
        showError('No images configured. Please add image IDs to the imageList array in script.js.');
    }
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
