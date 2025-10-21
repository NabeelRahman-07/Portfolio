        AOS.init();

        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        const mobileLinks = document.querySelectorAll('.mobile-menu a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });

        function sendMail() {
            var params = {
                name: document.getElementById("inputname").value,
                email: document.getElementById("inputemail").value,
                message: document.getElementById("message").value,
            };
            const serviceID = "service_p6r5j8p";
            const templateID = "template_phgma9f"

            emailjs
            .send(serviceID, templateID, params)
            .then(res => {
                    document.getElementById("inputname"), value = "";
                    document.getElementById("inputemail"), value = "";
                    document.getElementById("message"), value = "";
                    console.log("response", res);
                    alert("Your message sent successfully.");

                }
                )
                .catch((err) => console.log(err));
        }

          const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const popup = card.querySelector('.popup');

    // Add click event
    card.addEventListener('click', () => {
      // Toggle popup visibility
      popup.classList.toggle('opacity-100');
      popup.classList.toggle('opacity-0');
    });
  });

  document.addEventListener('click', (e) => {
  cards.forEach(card => {
    const popup = card.querySelector('.popup');
    if (!card.contains(e.target)) {
      popup.classList.remove('opacity-100');
      popup.classList.add('opacity-0');
    }
  });
});