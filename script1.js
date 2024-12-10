
        let backgroundInterval; // Variable to store the interval ID

        function openForm(type) {
            const formPopup = document.getElementById('formPopup');
            const formTitle = document.getElementById('formTitle');
            formTitle.textContent = type;
            formPopup.classList.add('active');
        }

        function submitForm(event) {
            event.preventDefault();

            const username = document.querySelector("input[placeholder='Username']").value;
            const password = document.getElementById('password').value;

            if (username && password) {
                // Redirect to product.html
                window.location.href = "product.html";
            } else {
                alert("Please enter valid credentials.");
            }
        }

        function togglePassword() {
            const passwordInput = document.getElementById('password');
            const showPasswordButton = document.getElementById('showPassword');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                showPasswordButton.textContent = 'Hide';
            } else {
                passwordInput.type = 'password';
                showPasswordButton.textContent = 'Show';
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            const categoryLinks = document.querySelectorAll('.categories a');
            const bodyElement = document.getElementById('body');

            // Add event listeners to change the background image when clicking on a category
            categoryLinks.forEach(link => {
                link.addEventListener('click', event => {
                    event.preventDefault();

                    // Update the background image
                    const newImage = link.getAttribute('data-image');
                    bodyElement.style.backgroundImage = `url('${newImage}')`;

                    // Update active link styling
                    categoryLinks.forEach(item => item.classList.remove('active'));
                    link.classList.add('active');
                });
            });
        });

        const bodyElement = document.getElementById("boady");

        // Array of background images
        const backgroundImages = [
            "url('image1.jpg')",
            "url('image2.jpg')",
            "url('image3.jpg')",
            "url('image4.jpg')"
        ];

        let currentImageIndex = 0;

        // Function to change the background image
        function changeBackgroundImage() {
            currentImageIndex = (currentImageIndex + 1) % backgroundImages.length; // Cycle through images
            bodyElement.style.backgroundImage = backgroundImages[currentImageIndex];
        }

        // Start the background image change interval
        backgroundInterval = setInterval(changeBackgroundImage, 3000);

        // Initialize the first image
        bodyElement.style.backgroundImage = backgroundImages[currentImageIndex];

        document.addEventListener('DOMContentLoaded', () => {
            const categoryLinks = document.querySelectorAll('.categories a');
            const categoryContents = document.querySelectorAll('.category-content');
            const bodyElement = document.getElementById('body');

            // Display the first category by default on page load
            categoryLinks[0].classList.add('active');
            categoryContents[0].style.display = 'block';

            categoryLinks.forEach((link) => {
                link.addEventListener('click', (event) => {
                    event.preventDefault();

                    // Hide the currently active category content
                    const currentActiveContent = document.querySelector('.category-content.show');
                    if (currentActiveContent) {
                        currentActiveContent.style.transition = 'transform 0.5s, opacity 0.5s';
                        currentActiveContent.style.transform = 'translateX(-100%)';
                        currentActiveContent.style.opacity = 0;
                        setTimeout(() => {
                            currentActiveContent.classList.remove('show');
                            currentActiveContent.style.display = 'none';
                            currentActiveContent.style.transform = '';
                        }, 500);
                    }

                    // Get the new category ID from the clicked link
                    const newCategoryId = link.getAttribute('href').substring(1);
                    const newCategoryContent = document.getElementById(newCategoryId);
                    if (newCategoryContent) {
                        newCategoryContent.style.display = 'block';
                        setTimeout(() => {
                            newCategoryContent.style.transform = 'translateX(0)';
                            newCategoryContent.style.opacity = 1;
                            newCategoryContent.classList.add('show');
                        }, 50);
                    }

                    // Update active link styling
                    categoryLinks.forEach((item) => item.classList.remove('active'));
                    link.classList.add('active');

                    // Update background image
                    const newImage = link.getAttribute('data-image');
                    bodyElement.style.backgroundImage = `url('${newImage}')`;
                });
            });
        });