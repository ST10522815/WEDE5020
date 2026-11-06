document.addEventListener("DOMContentLoaded", function () {

    // Shopping cart
    let cart = Number(localStorage.getItem("mphosFashionCart")) || 0;

    function updateCart() {
        document.querySelectorAll("#cart-count").forEach(function (element) {
            element.textContent = cart;
        });
        localStorage.setItem("mphosFashionCart", cart);
    }

    updateCart();

    document.querySelectorAll(".add-cart").forEach(function (button) {
        button.addEventListener("click", function () {
            cart++;
            updateCart();

            const message = document.getElementById("cart-message");
            if (message) {
                message.textContent =
                    button.dataset.product + " added to your cart successfully!";
            }
        });
    });

    // Product search
    const search = document.getElementById("product-search");

    if (search) {
        search.addEventListener("input", function () {
            const term = search.value.toLowerCase();
            const products = document.querySelectorAll(".product-card");
            let visible = 0;

            products.forEach(function (product) {
                const name = product.dataset.name.toLowerCase();
                const matches = name.includes(term);

                product.style.display = matches ? "" : "none";

                if (matches) visible++;
            });

            document.getElementById("search-message").textContent =
                visible + " product(s) found.";
        });
    }

    // Gallery lightbox
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");

    document.querySelectorAll(".gallery-image").forEach(function (image) {
        image.addEventListener("click", function () {
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightbox.classList.add("active");
            lightbox.setAttribute("aria-hidden", "false");
        });
    });

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove("active");
            lightbox.setAttribute("aria-hidden", "true");
            lightboxImage.src = "";
        }
    }

    const closeButton = document.getElementById("close-lightbox");

    if (closeButton) {
        closeButton.addEventListener("click", closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeLightbox();
    });

    // Enquiry form
    const enquiryForm = document.getElementById("enquiry-form");

    if (enquiryForm) {
        enquiryForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!enquiryForm.checkValidity()) {
                enquiryForm.reportValidity();
                return;
            }

            const name = document.getElementById("enquiry-name").value.trim();
            const email = document.getElementById("enquiry-email").value.trim();
            const type = document.getElementById("enquiry-type").value;
            const message = document.getElementById("enquiry-message").value.trim();

            if (name.length < 2 || message.length < 10) {
                document.getElementById("enquiry-response").textContent =
                    "Please check your name and message.";
                return;
            }

            document.getElementById("enquiry-response").textContent =
                "Thank you, " + name +
                ". Your enquiry is ready to be sent through your email application.";

            const subject = encodeURIComponent("Mpho's Fashion - " + type);
            const body = encodeURIComponent(
                "Name: " + name +
                "\nEmail: " + email +
                "\nEnquiry type: " + type +
                "\nMessage: " + message
            );

            window.location.href =
                "mailto:mphosfashion@example.com?subject=" + subject +
                "&body=" + body;
        });
    }

    // Contact form
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const name = document.getElementById("contact-name").value.trim();
            const email = document.getElementById("contact-email").value.trim();
            const subjectText = document.getElementById("contact-subject").value.trim();
            const message = document.getElementById("contact-message").value.trim();

            if (name.length < 2 || subjectText.length < 3 || message.length < 10) {
                document.getElementById("contact-response").textContent =
                    "Please complete all fields correctly.";
                return;
            }

            document.getElementById("contact-response").textContent =
                "Thank you, " + name +
                ". Your message is ready in your email application.";

            const subject = encodeURIComponent(subjectText);
            const body = encodeURIComponent(
                "Name: " + name +
                "\nEmail: " + email +
                "\nMessage: " + message
            );

            window.location.href =
                "mailto:mphosfashion@example.com?subject=" + subject +
                "&body=" + body;
        });
    }

});
