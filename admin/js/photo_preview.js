// static/admin/js/photo_preview.js

(function () {
    function initPreview() {
        const input = document.getElementById("id_uploaded_image");
        if (!input) return;

        // Create preview image + wrapper once
        const wrapper = document.createElement("div");
        wrapper.style.marginTop = "10px";

        const preview = document.createElement("img");
        preview.style.maxWidth = "300px";
        preview.style.maxHeight = "300px";
        preview.style.borderRadius = "6px";
        preview.style.display = "none";
        preview.style.border = "1px solid #ccc";

        wrapper.appendChild(preview);
        input.parentNode.insertBefore(wrapper, input.nextSibling);

        input.addEventListener("change", function () {
            const file = input.files && input.files[0];

            if (!file) {
                preview.style.display = "none";
                preview.src = "";
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                preview.src = e.target.result;
                preview.style.display = "block";
            };
            reader.readAsDataURL(file);
        });

        // If editing an existing Photo, show the current image_url as an
        // initial preview so the field doesn't look empty
        const existingUrl = input.dataset.existingImage;
        if (existingUrl) {
            preview.src = existingUrl;
            preview.style.display = "block";
        }
    }

    document.addEventListener("DOMContentLoaded", initPreview);
})();
