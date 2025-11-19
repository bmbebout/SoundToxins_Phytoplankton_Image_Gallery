# Google Drive Image Gallery

A simple web page that displays images from a Google Drive folder.

## Features

- Display images from any public Google Drive folder
- Responsive grid layout
- Lightbox view for full-size images
- Clean and modern design
- Local storage to remember your folder ID

## Setup Instructions

### Method 1: Using Google Drive API (Recommended)

1. **Get a Google API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the "Google Drive API" for your project
   - Go to "Credentials" and create an "API Key"
   - Copy the API key

2. **Configure the Web App:**
   - Open `script.js`
   - Replace `YOUR_API_KEY_HERE` with your actual API key:
     ```javascript
     const API_KEY = 'your-actual-api-key';
     ```

3. **Prepare Your Google Drive Folder:**
   - Create or select a folder in Google Drive
   - Add your images to the folder
   - Right-click the folder → Share → Change to "Anyone with the link"
   - Copy the folder ID from the URL (the part after `/folders/`)
     - Example: `https://drive.google.com/drive/folders/1ABC123xyz...`
     - Folder ID: `1ABC123xyz...`

4. **Use the Web App:**
   - Open `index.html` in your web browser
   - Paste the folder ID
   - Click "Load Images"

### Method 2: Simple Direct Links (No API Key Required)

If you don't want to set up an API key, you can use direct image links:

1. Make your Google Drive folder public (Anyone with the link)
2. For each image, get the shareable link and extract the file ID
3. Use the format: `https://drive.google.com/uc?export=view&id=FILE_ID`

This method is more manual but doesn't require API setup.

## File Structure

```
web/
├── index.html      # Main HTML page
├── styles.css      # Styling and layout
├── script.js       # JavaScript for loading and displaying images
└── README.md       # This file
```

## Troubleshooting

**"Failed to fetch images":**
- Make sure your Google Drive folder is set to "Anyone with the link can view"
- Verify the folder ID is correct
- Check that your API key is valid and the Drive API is enabled

**"No images found":**
- Ensure there are image files in the folder (jpg, png, gif, etc.)
- Check that the folder contains images directly (not in subfolders)

**Images not loading:**
- Check browser console for error messages
- Verify your internet connection
- Make sure third-party cookies aren't being blocked

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Privacy & Security

- Your folder ID is stored in browser localStorage only
- No data is sent to any server except Google Drive
- Make sure you understand Google Drive's sharing permissions before making folders public

## License

Free to use and modify for personal and commercial projects.
