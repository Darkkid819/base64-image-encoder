window.onload = function() {
    const fileInput = document.getElementById('file-input');
    const image = document.getElementById('image');
    const linkOutput = document.getElementById('link-output');
    const uploadSection = document.getElementById('upload-section');
    const copyButton = document.createElement('button'); 

    copyButton.textContent = 'Copy Link';
    copyButton.style.display = 'none'; 
    document.body.appendChild(copyButton);

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const base64String = e.target.result;
            const newUrl = window.location.href.split('#')[0] + '#' + encodeURIComponent(base64String);
            linkOutput.textContent = newUrl;
            linkOutput.style.display = 'none'; 

            copyButton.style.display = 'inline-block';
            copyButton.onclick = function() {
                navigator.clipboard.writeText(newUrl).then(() => {
                    alert('Link copied to clipboard!');
                }).catch(err => {
                    console.error('Error in copying text: ', err);
                });
            };
        };

        reader.readAsDataURL(file);
    });

    if (window.location.hash) {
        const base64String = decodeURIComponent(window.location.hash.substring(1));
        image.src = base64String;
        image.style.display = 'block';
        uploadSection.style.display = 'none';
    } else {
        image.style.display = 'none';
        uploadSection.style.display = 'block';
    }
};
