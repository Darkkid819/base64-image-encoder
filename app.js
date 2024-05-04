window.onload = function() {
    const fileInput = document.getElementById('file-input');
    const image = document.getElementById('image');
    const linkOutput = document.getElementById('link-output');
    const uploadSection = document.getElementById('upload-section');

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const base64String = e.target.result;
            window.location.hash = encodeURIComponent(base64String);
            linkOutput.textContent = window.location.href;
            image.src = base64String;
            image.style.display = 'block';
            uploadSection.style.display = 'none';  // Hide upload section
        };

        reader.readAsDataURL(file);
    });

    if (window.location.hash) {
        const base64String = decodeURIComponent(window.location.hash.substring(1));
        image.src = base64String;
        image.style.display = 'block';
        uploadSection.style.display = 'none';  // Hide upload section
    } else {
        image.style.display = 'none';
        uploadSection.style.display = 'block';  // Show upload section
    }
};
