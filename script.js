const menuBtn = document.getElementById("menuBtn");
		const navMenu = document.getElementById("navMenu");
		const navLinks = document.querySelectorAll(".nav-menu a");
		const sections = document.querySelectorAll("section[id]");
		const revealElements = document.querySelectorAll(".reveal");
		const contactForm = document.getElementById("contactForm");
		const formMessage = document.getElementById("formMessage");

		menuBtn.addEventListener("click", () => {
			navMenu.classList.toggle("open");
			menuBtn.textContent = navMenu.classList.contains("open") ? "×" : "☰";
		});

		navLinks.forEach((link) => {
			link.addEventListener("click", () => {
				navMenu.classList.remove("open");
				menuBtn.textContent = "☰";
			});
		});

		const revealObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("visible");
						revealObserver.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.16 }
		);

		revealElements.forEach((element) => revealObserver.observe(element));

		const activateNavLink = () => {
			let currentSection = "home";

			sections.forEach((section) => {
				const sectionTop = section.offsetTop - 120;
				if (window.scrollY >= sectionTop) {
					currentSection = section.getAttribute("id");
				}
			});

			navLinks.forEach((link) => {
				link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
			});
		};

		window.addEventListener("scroll", activateNavLink);
		activateNavLink();

		contactForm.addEventListener("submit", (event) => {
			event.preventDefault();
			formMessage.classList.add("show");
			contactForm.reset();
		});
