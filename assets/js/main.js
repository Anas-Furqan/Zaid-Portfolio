/**
 * ==========================================================================
 * ZAID PORTFOLIO - MAIN JAVASCRIPT
 * Handles: Preloader, Custom Cursor, Dynamic Portfolio rendering/filtering,
 * Lightbox Modal, Mobile Menu, Scroll events, Stats Counter, and Form validation.
 * ==========================================================================
 */

// TO ADD NEW PORTFOLIO ITEMS:
// 1. Add your image to the assets/img/ folders (logos, characterArt, bookCovers, customizedBusinessArt)
// 2. Add a new object to the portfolioItems array below
// 3. Save — the grid updates automatically
const portfolioItems = [
    {
        id: 1,
        title: "Orion Corporate Branding",
        category: "Logo Design",
        image: "assets/img/logos/logo1.jpeg",
        description: "A luxury corporate brand identity designed for Orion Holdings. The concept fuses modern geometric clean lines with deep metallic contrasts to convey confidence, stability, and future-focused expansion."
    },
    {
        id: 2,
        title: "Golden Leaf Luxury Spa",
        category: "Logo Design",
        image: "assets/img/logos/logo2.jpeg",
        description: "An elegant, bespoke organic logo designed for Golden Leaf Wellness. Features thin golden lines portraying natural growth and harmony, capturing a sense of premium rest, purity, and relaxation."
    },
    {
        id: 3,
        title: "Valkyrie Esports Logo",
        category: "Logo Design",
        image: "assets/img/logos/logo3.jpeg",
        description: "A fierce branding mark for the Valkyrie Gaming team. Combining sharp editorial wing elements with clean monospaced vectors, it embodies power, speed, and digital craftsmanship."
    },
    {
        id: 4,
        title: "Cognitive AI Solutions",
        category: "Logo Design",
        image: "assets/img/logos/logo4.jpeg",
        description: "A sleek, minimal logo designed for an AI consulting agency. The symbol blends conceptual nodes with a clean monogram structure to represent human intellect merged with advanced computation."
    },
    {
        id: 5,
        title: "Solstice Fine Dining Brand",
        category: "Logo Design",
        image: "assets/img/logos/logo5.jpeg",
        description: "A premium circular insignia created for Solstice Resto-Bar. The warm gold radial framing communicates premium quality, gourmet craftsmanship, and an upscale, curated culinary experience."
    },
    {
        id: 6,
        title: "The Cyberpunk Rogue",
        category: "Character Art",
        image: "assets/img/characterArt/1.jpeg",
        description: "A digital character concept illustration representing a street-smart cyberpunk runner. Painstakingly illustrated with neon contrasts, detailed gear textures, and a dark moody ambiance."
    },
    {
        id: 7,
        title: "Elven Archmage Concept",
        category: "Character Art",
        image: "assets/img/characterArt/2.jpeg",
        description: "An fantasy illustration depicting an ancient elven spellcaster channeling celestial energies. Modeled with high-contrast brushwork, magical particle effects, and warm gold magical hues."
    },
    {
        id: 8,
        title: "Astral Sentinel",
        category: "Character Art",
        image: "assets/img/characterArt/5.jpeg",
        description: "A cosmic guardian concept design featuring detailed metallic space armor and energy ribbons. Rendered in a high-fidelity illustration style suited for gaming splash arts and digital publication."
    },
    {
        id: 9,
        title: "Shadow Assassin illustration",
        category: "Character Art",
        image: "assets/img/characterArt/6.jpeg",
        description: "A moody, low-key character art piece illustrating a rogue in stealth posture. Focuses on drapery folds, intricate leather detailing, and realistic lighting dynamics."
    },
    {
        id: 10,
        title: "Urban Samurai",
        category: "Book Cover",
        image: "assets/img/bookCovers/1.jpeg",
        description: "An editorial blend of traditional warrior armor with contemporary streetwear. The design features a bold high-contrast shadow composition, expressive post-apocalyptic apparel, and textured line art."
    },
    {
        id: 11,
        title: "The Neon Wanderer",
        category: "Book Cover",
        image: "assets/img/bookCovers/2.jpeg",
        description: "A character portrait capturing a traveler in a futuristic rain-drenched megacity. Highlights include complex lens flare rendering, realistic water drops, and rich dark-teal background contrasts."
    },
    {
        id: 12,
        title: "Corporate Identity Suite",
        category: "Business Art",
        image: "assets/img/customizedBusinessArt/1.jpeg",
        description: "A unified custom business card, envelope, and letterhead art package. Incorporates luxury gold borders and dark palettes to ensure the brand leaves a lasting professional mark at first glance."
    }
];

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. PAGE LOAD / PRELOADER & HERO ENTRANCE
    // ==========================================================================
    const preloader = document.getElementById("preloader");
    const heroContent = document.getElementById("hero-content");

    window.addEventListener("load", () => {
        // Hide preloader
        preloader.classList.add("hide-preloader");
        
        // Trigger Hero Text animations with a small delay
        setTimeout(() => {
            if (heroContent) {
                heroContent.classList.add("animate-in");
            }
        }, 300);
    });

    // Fallback if window load doesn't trigger immediately
    setTimeout(() => {
        if (!preloader.classList.contains("hide-preloader")) {
            preloader.classList.add("hide-preloader");
            if (heroContent) {
                heroContent.classList.add("animate-in");
            }
        }
    }, 1500);

    // ==========================================================================
    // 2. FIXED NAVBAR & ACTIVE NAVIGATION HIGHLIGHTER
    // ==========================================================================
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        // Navbar Scrolled background blur transition
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Highlight Active link based on scroll position
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    // ==========================================================================
    // 3. MOBILE MENU (HAMBURGER TOGGLE)
    // ==========================================================================
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    const toggleMenu = () => {
        const isActive = hamburger.classList.toggle("active");
        mobileMenu.classList.toggle("active");
        hamburger.setAttribute("aria-expanded", isActive);
        mobileMenu.setAttribute("aria-hidden", !isActive);
        document.body.style.overflow = isActive ? "hidden" : "visible";
    };

    hamburger.addEventListener("click", toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (mobileMenu.classList.contains("active")) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside of the mobile links menu list
    mobileMenu.addEventListener("click", (e) => {
        if (e.target === mobileMenu) {
            toggleMenu();
        }
    });

    // ==========================================================================
    // 4. CUSTOM LAG-BEHIND CURSOR (DESKTOP ONLY)
    // ==========================================================================
    const cursor = document.getElementById("custom-cursor");
    const cursorRing = document.getElementById("custom-cursor-ring");

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    // Smooth lag-behind effect for the cursor ring
    const animateRing = () => {
        const speed = 0.15; // Lower values create more lag
        ringX += (mouseX - ringX) * speed;
        ringY += (mouseY - ringY) * speed;

        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;

        requestAnimationFrame(animateRing);
    };
    animateRing();

    // Hover effect expansions
    const hoverElements = document.querySelectorAll("a, button, .filter-btn, .portfolio-item, select, input, textarea");
    hoverElements.forEach(el => {
        el.addEventListener("mouseenter", () => {
            cursor.classList.add("hovered");
            cursorRing.classList.add("hovered");
        });
        el.addEventListener("mouseleave", () => {
            cursor.classList.remove("hovered");
            cursorRing.classList.remove("hovered");
        });
    });

    // ==========================================================================
    // 5. DATA-DRIVEN PORTFOLIO GRID RENDERING & FILTERING
    // ==========================================================================
    const portfolioGrid = document.getElementById("portfolio-grid");
    const filterButtons = document.querySelectorAll(".filter-btn");

    const renderPortfolio = () => {
        portfolioGrid.innerHTML = "";
        portfolioItems.forEach(item => {
            const cardMarkup = `
                <div class="portfolio-item" data-category="${item.category}" data-id="${item.id}" data-aos="fade-up" tabindex="0">
                    <div class="portfolio-img-container">
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                    </div>
                    <div class="portfolio-overlay">
                        <div class="portfolio-overlay-content">
                            <span class="portfolio-overlay-category">${item.category}</span>
                            <h3 class="portfolio-overlay-title">${item.title}</h3>
                            <span class="portfolio-overlay-btn">View Art <i class="fa-solid fa-arrow-right"></i></span>
                        </div>
                    </div>
                </div>
            `;
            portfolioGrid.insertAdjacentHTML("beforeend", cardMarkup);
        });
        setupPortfolioItemListeners();
    };

    const filterPortfolio = (filterVal) => {
        const items = document.querySelectorAll(".portfolio-item");
        
        portfolioGrid.style.opacity = 0.4;
        setTimeout(() => {
            items.forEach(item => {
                const category = item.getAttribute("data-category");
                if (filterVal === "all" || category === filterVal) {
                    item.classList.remove("hidden");
                } else {
                    item.classList.add("hidden");
                }
            });
            portfolioGrid.style.opacity = 1;
        }, 200);
    };

    filterButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            filterButtons.forEach(button => {
                button.classList.remove("active");
                button.setAttribute("aria-selected", "false");
            });
            btn.classList.add("active");
            btn.setAttribute("aria-selected", "true");
            
            const selectedFilter = btn.getAttribute("data-filter");
            filterPortfolio(selectedFilter);
        });
    });

    // Trigger service cards View Work click redirects to portfolio filters
    const serviceViewWorkLinks = document.querySelectorAll(".service-link");
    serviceViewWorkLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const filterCategory = link.getAttribute("data-filter");
            
            // Highlight specific filter button
            filterButtons.forEach(btn => {
                if (btn.getAttribute("data-filter") === filterCategory) {
                    btn.click();
                }
            });

            // Smooth scroll to Work section
            const workSection = document.getElementById("work");
            if (workSection) {
                window.scrollTo({
                    top: workSection.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });

    // Render portfolio on startup
    renderPortfolio();

    // ==========================================================================
    // 6. PORTFOLIO LIGHTBOX MODAL (POPUP DETAILED ART VIEW)
    // ==========================================================================
    const modal = document.getElementById("portfolio-modal");
    const modalImg = document.getElementById("modal-img");
    const modalCategory = document.getElementById("modal-category");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-description");
    const modalCloseBtn = document.getElementById("modal-close-btn");

    function setupPortfolioItemListeners() {
        const itemCards = document.querySelectorAll(".portfolio-item");
        itemCards.forEach(card => {
            const openModal = () => {
                const itemId = parseInt(card.getAttribute("data-id"));
                const itemData = portfolioItems.find(p => p.id === itemId);
                
                if (itemData) {
                    modalImg.src = itemData.image;
                    modalImg.alt = itemData.title;
                    modalCategory.textContent = itemData.category;
                    modalTitle.textContent = itemData.title;
                    modalDesc.textContent = itemData.description;
                    
                    modal.classList.add("active");
                    modal.setAttribute("aria-hidden", "false");
                    document.body.style.overflow = "hidden";
                }
            };
            
            card.addEventListener("click", openModal);
            card.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    openModal();
                }
            });
        });
    }

    const closeModal = () => {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "visible";
    };

    modalCloseBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });

    // ==========================================================================
    // 7. STATS COUNTER ANIMATION (INTERSECTION OBSERVER)
    // ==========================================================================
    const statSection = document.querySelector(".about-stats");
    const statProjects = document.getElementById("stat-projects");
    const statExperience = document.getElementById("stat-experience");
    const statClients = document.getElementById("stat-clients");

    const animateCounter = (element, targetValue, duration) => {
        let startTimestamp = null;
        const startValue = 0;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (targetValue - startValue) + startValue);
            
            element.textContent = `${currentValue}+`;
            if (element === statExperience) {
                element.textContent = `${currentValue}+`;
            } else if (element === statClients) {
                element.textContent = `${currentValue}+`;
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = `${targetValue}+`;
            }
        };
        window.requestAnimationFrame(step);
    };

    let countersAnimated = false;
    const observerOptions = {
        root: null,
        threshold: 0.2
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounter(statProjects, 50, 1500);
                animateCounter(statExperience, 3, 1000);
                animateCounter(statClients, 30, 1500);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (statSection) {
        statsObserver.observe(statSection);
    }

    // ==========================================================================
    // 8. CONTACT FORM VALIDATION & SUBMISSION
    // ==========================================================================
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    const formStatusText = document.getElementById("form-status-text");
    const submitBtn = document.getElementById("contact-submit-btn");
    const spinner = document.getElementById("spinner-icon");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById("contact-name");
        const emailInput = document.getElementById("contact-email");
        const serviceSelect = document.getElementById("contact-service");
        const messageInput = document.getElementById("contact-message");
        const honeypot = document.getElementById("contact-form-company");

        // Honeypot spam defense check
        if (honeypot.value !== "") {
            console.log("Spam detected, blocking submit.");
            return;
        }

        let isFormValid = true;

        // Reset errors
        const fields = [nameInput, emailInput, messageInput];
        fields.forEach(field => {
            field.classList.remove("error");
        });
        serviceSelect.classList.remove("error");

        // 1. Validate Name
        if (nameInput.value.trim() === "") {
            nameInput.classList.add("error");
            isFormValid = false;
        }

        // 2. Validate Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            emailInput.classList.add("error");
            isFormValid = false;
        }

        // 3. Validate Message
        if (messageInput.value.trim() === "") {
            messageInput.classList.add("error");
            isFormValid = false;
        }

        if (!isFormValid) {
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        spinner.style.display = "inline-block";
        submitBtn.querySelector("span").textContent = "Sending...";

        // Prepare form data
        const formData = new FormData();
        formData.append("name", nameInput.value.trim());
        formData.append("email", emailInput.value.trim());
        formData.append("message", messageInput.value.trim());
        formData.append("company", honeypot.value);

        // Send to PHP
        fetch("assets/php/contact.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            submitBtn.disabled = false;
            spinner.style.display = "none";
            submitBtn.querySelector("span").textContent = "Send Message";

            // Check if submission was successful
            if (data.succesMessage === "" && data.nameMessage === "" && 
                data.emailMessage === "" && data.messageMessage === "") {
                // Success
                formStatusText.textContent = "Your message was sent successfully! Zaid will respond within 24 hours.";
                formStatus.className = "form-status success";
                formStatus.style.display = "flex";
                contactForm.reset();
                
                setTimeout(() => {
                    formStatus.style.display = "none";
                }, 6000);
            } else {
                // Show validation errors
                formStatusText.textContent = "Please check your inputs and try again.";
                formStatus.className = "form-status error";
                formStatus.style.display = "flex";
                
                if (data.nameMessage) nameInput.classList.add("error");
                if (data.emailMessage) emailInput.classList.add("error");
                if (data.messageMessage) messageInput.classList.add("error");
            }
        })
        .catch(error => {
            submitBtn.disabled = false;
            spinner.style.display = "none";
            submitBtn.querySelector("span").textContent = "Send Message";
            formStatusText.textContent = "Error sending message. Please try again.";
            formStatus.className = "form-status error";
            formStatus.style.display = "flex";
            console.error("Error:", error);
        });
    });

    // ==========================================================================
    // 9. INITIALIZE THIRD PARTY LIBRARIES (AOS & SWIPER)
    // ==========================================================================
    // Scroll Animations (AOS)
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            once: true,
            offset: 50
        });
    }

    // Carousel Slider (Swiper.js)
    if (typeof Swiper !== "undefined") {
        new Swiper(".swiper-container", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            breakpoints: {
                768: {
                    slidesPerView: 1
                }
            }
        });
    }

});