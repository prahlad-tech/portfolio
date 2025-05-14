const roles = [
    "FULL STACK DEVELOPER",
    "LARAVEL SPECIALIST"
];
let i = 0, j = 0, currentRole = "", isDeleting = false;
const typeTarget = document.getElementById("roleText");

function typeEffect() {
    if (i < roles.length) {
        if (!isDeleting && j <= roles[i].length) {
            currentRole = roles[i].substring(0, j++);
            typeTarget.textContent = currentRole + "|";
        } else if (isDeleting && j >= 0) {
            currentRole = roles[i].substring(0, j--);
            typeTarget.textContent = currentRole + "|";
        }

        if (j === roles[i].length + 1) isDeleting = true;
        if (j === 0 && isDeleting) {
            isDeleting = false;
            i = (i + 1) % roles.length;
        }

        setTimeout(typeEffect, isDeleting ? 50 : 120);
    }
}

typeEffect();

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-10");
            entry.target.classList.add("animate");
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.animate-left, .animate-right').forEach(el => {
    revealObserver.observe(el);
});

const heroImg = document.getElementById("heroImg");
document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroImg.style.transform = `translate(${x}px, ${y}px)`;
});

const mobileLinks = document.querySelectorAll('#mobile-menu a');

const mobileMenu = document.getElementById('mobile-menu');
const hamburger = document.getElementById('hamburger');

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        hamburger.classList.remove('open');
    });
});

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');

    hamburger.classList.toggle('open');
});

document.addEventListener('DOMContentLoaded', function () {
    const hireBtn = document.getElementById('hireBtn');
    const modal = document.getElementById('hireModal');
    const closeModal = document.getElementById('closeModal');
    const modalBox = document.getElementById('modalBox');

    hireBtn.addEventListener('click', function (e) {
        e.preventDefault();
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    });

    modal.addEventListener('click', (e) => {
        if (!modalBox.contains(e.target)) {
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    });


});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animate');
    });
});

console.log("%cHi, I'm Prahlad Chaudhary!", "color: #3498db; font-size: 18px; font-weight: bold;");
console.log("%cI'm a FULL STACK DEVELOPER 🚀", "color: #2ecc71; font-size: 16px;");

document.querySelectorAll('.animate-left, .animate-right').forEach(el => observer.observe(el));

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a, #mobile-menu a");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("text-purple-600", "font-semibold");
        link.classList.add("text-gray-600");

        if (link.getAttribute("href").includes(currentSection)) {
            link.classList.remove("text-gray-600");
            link.classList.add("text-purple-600", "font-semibold");
        }
    });
});

const hireForm = document.getElementById("hireForm");
const hireFormStatus = document.getElementById("hireFormStatus");

hireForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(hireForm);

    try {
        const response = await fetch("https://formspree.io/f/mgvwgazv", {
            method: "POST",
            headers: { 'Accept': 'application/json' },
            body: formData
        });

        if (response.ok) {
            hireFormStatus.textContent = "Thank you! Your message has been sent.";
            hireFormStatus.className = "text-green-600 text-center mt-2";
            hireForm.reset();
        } else {
            hireFormStatus.textContent = "Oops! Something went wrong.";
            hireFormStatus.className = "text-red-600 text-center mt-2";
        }
    } catch (error) {
        hireFormStatus.textContent = "Network error. Please try again.";
        hireFormStatus.className = "text-red-600 text-center mt-2";
    }
});


const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
        const response = await fetch("https://formspree.io/f/mgvwgazv", {
            method: "POST",
            headers: { 'Accept': 'application/json' },
            body: formData
        });

        if (response.ok) {
            status.textContent = "Thank you! Your message has been sent.";
            status.className = "text-green-600";
            form.reset();
        } else {
            status.textContent = "Oops! Something went wrong.";
            status.className = "text-red-600";
        }
    } catch (error) {
        status.textContent = "Network error. Please try again.";
        status.className = "text-red-600";
    }
});