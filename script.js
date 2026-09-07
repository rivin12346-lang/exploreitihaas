document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    
    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Testimonial Form Handling
document.addEventListener("DOMContentLoaded", function() {
    const testimonialForm = document.getElementById("testimonial-form");
    if (testimonialForm) {
        testimonialForm.addEventListener("submit", async function(e) {
            e.preventDefault();
            
            const name = document.getElementById("t-name").value;
            const location = document.getElementById("t-location").value;
            const message = document.getElementById("t-message").value;
            const btn = testimonialForm.querySelector("button");
            const originalText = btn.textContent;

            btn.textContent = "Submitting...";
            btn.disabled = true;

            // Save to Supabase
            if (supabaseClient) {
                try {
                    const { error } = await supabaseClient.from('testimonials').insert([
                        { name: name, location: location, message: message }
                    ]);
                    
                    if (error) throw error;
                } catch (err) {
                    console.error("Error saving testimonial:", err);
                    alert("Supabase Error: " + err.message);
                    btn.textContent = originalText;
                    btn.disabled = false;
                    return;
                }
            }
            
            // Get current count to generate next number visually
            const testimonialsContainer = document.getElementById("testimonials-list");
            const existingTestimonials = testimonialsContainer.querySelectorAll(".testimonial-row");
            let nextNumber = existingTestimonials.length + 1;
            let formattedNumber = nextNumber < 10 ? "0" + nextNumber : nextNumber;
            
            // Create new testimonial HTML visually
            const newRow = document.createElement("div");
            newRow.className = "testimonial-row";
            newRow.innerHTML = `
                <div class="testimonial-number">${formattedNumber}</div>
                <div class="testimonial-body">
                    <p class="testimonial-text">"${message}"</p>
                    <div class="testimonial-meta">
                        <span class="testimonial-author">${name}</span>
                        <span class="testimonial-place">${location}</span>
                    </div>
                </div>
            `;
            
            newRow.style.opacity = "0";
            newRow.style.transform = "translateY(20px)";
            newRow.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            
            testimonialsContainer.appendChild(newRow);
            
            setTimeout(() => {
                newRow.style.opacity = "1";
                newRow.style.transform = "translateY(0)";
            }, 10);
            
            testimonialForm.reset();
            btn.textContent = "Added Successfully!";
            btn.style.backgroundColor = "#2e7d32";
            btn.disabled = false;
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = "";
            }, 3000);
        });
    }
});

// Booking Form Handling
document.addEventListener("DOMContentLoaded", function() {
    const bookingForm = document.querySelector(".booking-form");
    if (bookingForm) {
        bookingForm.addEventListener("submit", async function(e) {
            e.preventDefault();
            
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const journey = document.getElementById("journey").value;
            const message = document.getElementById("message").value;
            
            const btn = bookingForm.querySelector("button[type='submit']");
            const originalText = btn.textContent;
            
            btn.textContent = "Sending...";
            btn.disabled = true;

            // Save to Supabase
            if (supabaseClient) {
                try {
                    const { error } = await supabaseClient.from('bookings').insert([
                        { name: name, email: email, phone: phone, journey: journey, message: message }
                    ]);
                    
                    if (error) throw error;
                } catch (err) {
                    console.error("Error saving booking:", err);
                    alert("Supabase Error: " + err.message);
                    btn.textContent = originalText;
                    btn.disabled = false;
                    return;
                }
            }
            
            bookingForm.reset();
            btn.textContent = "Inquiry Sent Successfully!";
            btn.style.backgroundColor = "#2e7d32";
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = "";
                btn.disabled = false;
            }, 3000);
        });
    }
});





// Initialize AOS (Animate On Scroll)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: false,
        offset: 100
    });
}

// 3D Parallax Depth Effect for Hero Backgrounds
document.addEventListener('DOMContentLoaded', () => {
    const heroBg = document.querySelector('.hero-bg img');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            // Move the background slower than the foreground (parallax)
            heroBg.style.transform = 	ranslateY( + (scrollPos * 0.4) + px) scale(1.1);
        });
    }
});



