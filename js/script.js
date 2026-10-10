
"use strict";

// Automatically update the copyright year.
const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Close the mobile navigation after selecting a section.
const navbarMenu = document.getElementById("navbarMenu");
const navLinks = document.querySelectorAll("#navbarMenu .nav-link");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (
            navbarMenu &&
            navbarMenu.classList.contains("show") &&
            window.bootstrap
        ) {
            const collapse =
                window.bootstrap.Collapse.getOrCreateInstance(navbarMenu);

            collapse.hide();
        }
    });
});

// Log a confirmation while developing.
console.log("GlowUp Studio is ready to shine!");

"use strict";

// Set the earliest selectable appointment date to today.
const appointmentDate = document.getElementById("appointmentDate");

if (appointmentDate) {
    const today = new Date();
    const localDate = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");

    appointmentDate.min = localDate;
}

// Handle demo appointment requests.

const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");

// Replace this with the salon's real WhatsApp number,
// including country code, without +, spaces or hyphens.
const salonWhatsAppNumber = "910000000000";

if (bookingForm && bookingMessage) {
    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!bookingForm.reportValidity()) {
            return;
        }

        const data = new FormData(bookingForm);

        const name = data.get("customerName").trim();
        const email = data.get("customerEmail").trim();
        const phone = data.get("customerPhone").trim();
        const service = data.get("service");
        const date = data.get("appointmentDate");
        const time = data.get("appointmentTime");
        const notes = data.get("bookingNotes").trim();

        const message = [
            "Hello GlowUp Studio! I'd like to request an appointment.",
            "",
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone}`,
            `Service: ${service}`,
            `Preferred date: ${date}`,
            `Preferred time: ${time}`,
            notes ? `Additional notes: ${notes}` : ""
        ].filter(Boolean).join("\n");

        bookingMessage.replaceChildren();

        const notice = document.createElement("p");
        notice.textContent =
            "Your request is ready. WhatsApp will open so you can review and send it. Your appointment is not confirmed yet.";

        bookingMessage.appendChild(notice);
        bookingMessage.hidden = false;

        const whatsappURL =
            `https://wa.me/${salonWhatsAppNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
}

