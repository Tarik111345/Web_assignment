document.addEventListener('DOMContentLoaded', function () {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {  
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('coffee-theme');
            document.body.classList.toggle('dark-blue-theme');
        });
    }

    // Interactive gallery
const cards = document.querySelectorAll('.card');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const caption = document.getElementById('caption');
const closeButton = document.querySelector('.close');

cards.forEach(card => {
  card.addEventListener('click', () => {
    const fullImage = card.getAttribute('data-full');
    const title = card.querySelector('.card-title').textContent;

    modal.style.display = 'flex';
    modalImage.src = fullImage;
    caption.textContent = title;
  });
});

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
  modalImage.src = '';
  caption.textContent = '';
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

    

    // Content toggle
    const contentToggleButton = document.getElementById("content-toggle");
    const details = document.getElementById("details");

    if (contentToggleButton && details) {  
        contentToggleButton.addEventListener("click", () => {
            if (details.style.display === "none" || details.style.display === "") {
                details.style.display = "block";
            } else {
                details.style.display = "none";
            }
        });
    }

    // Accordion Menu
    const accordionButtons = document.querySelectorAll(".accordion-button");

    accordionButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.classList.toggle("active");
            const content = button.nextElementSibling;

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Advanced Form Validation
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordStrengthMeter = document.getElementById('password-strength');
    const form = document.getElementById('contact-form');

    if (passwordInput && confirmPasswordInput && passwordStrengthMeter && form) {  
        function checkPasswordStrength(password) {
            let strength = 0;
            if (password.length >= 8) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

            if (strength === 0) {
                passwordStrengthMeter.className = 'weak';
            } else if (strength === 1) {
                passwordStrengthMeter.className = 'weak';
            } else if (strength === 2) {
                passwordStrengthMeter.className = 'medium';
            } else {
                passwordStrengthMeter.className = 'strong';
            }
        }

        passwordInput.addEventListener('input', function () {
            checkPasswordStrength(passwordInput.value);
        });

        form.addEventListener('submit', function (e) {
            let isValid = true;
    const emailError = document.getElementById('email-error');
            const dobError = document.getElementById('dob-error');
        
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const dobInput = document.getElementById('dob');
            const nameError = document.getElementById('name-error');
            const passwordError = document.getElementById('password-error');
            const confirmPasswordError = document.getElementById('confirm-password-error');

            if (nameInput && nameInput.value.trim() === '') {
                nameError.style.display = 'inline';
                isValid = false;
            } else {
                nameError.style.display = 'none';
            }

            if (emailInput && !emailInput.value.match(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)) {
                emailError.style.display = 'inline';
                isValid = false;
            } else {
                emailError.style.display = 'none';
            }

            if (dobInput && !dobInput.value) {
                dobError.style.display = 'inline';
                isValid = false;
            } else {
                dobError.style.display = 'none';
            }

            if (passwordInput && passwordInput.value.trim() === '') {
                passwordError.style.display = 'inline';
                isValid = false;
            } else {
                passwordError.style.display = 'none';
            }

            if (passwordInput && confirmPasswordInput && passwordInput.value !== confirmPasswordInput.value) {
                confirmPasswordError.style.display = 'inline';
                isValid = false;
            } else {
                confirmPasswordError.style.display = 'none';
            }

            if (!isValid) {
                e.preventDefault();
            }
        });
    }
});
    


// Data-Driven Content
$(document).ready(function () {
    console.log("AJAX call starting...");
    $.ajax({
        url: "data.json",  
        method: "GET",
        dataType: "json",
        success: function (data) {
            console.log("Data loaded successfully:", data);
            renderContent(data.blogPosts);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching data:", error);
        }
    });

    function renderContent(posts) {
        let contentContainer = $("#blog-posts");
        contentContainer.empty(); 

        posts.forEach((post, index) => {
            let postHTML = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${post.image}" class="card-img-top" alt="Blog Post Image">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${post.content.substring(0, 100)}...</p>
                            <button class="btn btn-primary read-more-btn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#readMoreModal">Read More</button>
                        </div>
                    </div>
                </div>
            `;
            contentContainer.append(postHTML);
        });

        $(".read-more-btn").on("click", function () {
            const index = $(this).data("index");
            const post = posts[index];
            $("#modalTitle").text(post.title);
            $("#modalBody").html(`
                <div class="post-details">
                    <div class="post-header">
                        <p><strong>Author:</strong> ${post.author}</p>
                        <p><strong>Date:</strong> ${post.date}</p>
                        <p><strong>Category:</strong> ${post.category}</p>
                    </div>
                    <div class="post-content">
                        <img src="${post.image}" class="img-fluid" alt="Post Image" style="max-width: 100%; height: auto;">
                        <p><strong>Introduction:</strong> ${post.content.substring(0, 300)}...</p> <!-- Show more of the intro -->
                        <p><strong>Details:</strong> ${post.content}</p> <!-- Full content in details -->
                    </div>
                    <div class="post-footer">
                        <p><strong>Tags:</strong> ${post.tags ? post.tags.join(", ") : 'No tags available'}</p>
                    </div>
                </div>
            `);
        });
    }
});

//Form Submission with AJAX
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    
    if (form) {
        const successMessage = document.createElement('div');
        successMessage.classList.add('alert', 'mt-3');
        successMessage.style.display = 'none';
        form.appendChild(successMessage);

        form.addEventListener('submit', function (e) {
            e.preventDefault(); 

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                dob: document.getElementById('dob').value,
                password: document.getElementById('password').value,
                "confirm-password": document.getElementById('confirm-password').value,
                message: document.getElementById('message').value,
            };

            console.log('Form data:', formData);  

            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then(response => response.json()) 
                .then(data => {
                    console.log('Response Data:', data); 

                    if (data && data.id) {
                        successMessage.textContent = "Your message has been successfully saved!";
                        successMessage.className = 'alert alert-success mt-3';
                        successMessage.style.display = 'block';

                        if (form instanceof HTMLFormElement) {
                            form.reset();
                        }
                    } else {
                        successMessage.textContent = "There was an error saving your message. Please try again.";
                        successMessage.className = 'alert alert-danger mt-3';
                        successMessage.style.display = 'block';
                    }
                })
                .catch(error => {
                    successMessage.textContent = "There was an error saving your message. Please try again.";
                    successMessage.className = 'alert alert-danger mt-3';
                    successMessage.style.display = 'block';
                    console.error('Error:', error);
                });
        });
    } else {
        console.log('No form on this page.');
    }
});


//Edit and Delete option and the Notifications

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', editItem);
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', deleteItem);
    });
});

function editItem(event) {
    const itemId = event.target.getAttribute('data-id');
    const row = document.getElementById(`item-${itemId}`);
    const itemName = row.cells[0].textContent;
    const itemPrice = row.cells[2].textContent;

    const newName = prompt('Edit item name:', itemName);
    const newPrice = prompt('Edit price:', itemPrice);

    if (newName && newPrice) {
        row.cells[0].textContent = newName;
        row.cells[2].textContent = newPrice;

        toastr.success('Item edited successfully!');
    } else {
        toastr.error('Edit operation cancelled or invalid input.');
    }
}

function deleteItem(event) {
    const itemId = event.target.getAttribute('data-id');
    const row = document.getElementById(`item-${itemId}`);

    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
        row.remove(); 

        toastr.success('Item deleted successfully!');
    } else {
        toastr.error('Item deletion cancelled.');
    }
}

// Weather API Integration
const apiKey = 'de32092b480573171c5c3f9ce1bb4f2a'; 
const city = 'Sarajevo'; 

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        return response.json();
    })
    .then(data => {
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        const weatherElement = document.getElementById('weather');
        weatherElement.innerHTML = `${temperature}°C, ${description} <img src="https://openweathermap.org/img/wn/${icon}.png" alt="weather icon">`;
    })
    .catch(error => {
        document.getElementById('weather').textContent = "Weather data not available: " + error.message;
    });
    

//View more
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('viewMoreEspresso').addEventListener('click', function () {
        var modalTitle = document.querySelector('#viewMoreModal .modal-title');
        var modalBody = document.querySelector('#viewMoreModal .modal-body');

        modalTitle.textContent = 'Espresso';
        modalBody.innerHTML = `
            <img src="../assets/images/espresso.jpg" alt="Espresso" class="img-fluid rounded mb-3">
            <p><strong>Description:</strong> A strong and rich coffee made from finely ground coffee beans.</p>
            <p><strong>Price:</strong> $2.50</p>
            <p><strong>Ingredients:</strong> Espresso coffee beans, water.</p>
            <p><strong>Serving Size:</strong> Single Shot (1 oz)</p>
            <p><strong>Calories:</strong> 5</p>
        `;
        var modal = new bootstrap.Modal(document.getElementById('viewMoreModal'));
        modal.show();
    });

    document.getElementById('viewMoreLatte').addEventListener('click', function () {
        var modalTitle = document.querySelector('#viewMoreModal .modal-title');
        var modalBody = document.querySelector('#viewMoreModal .modal-body');

        modalTitle.textContent = 'Latte';
        modalBody.innerHTML = `
            <img src="../assets/images/latte.jpg" alt="Latte" class="img-fluid rounded mb-3">
            <p><strong>Description:</strong> A creamy espresso-based drink with steamed milk and foam.</p>
            <p><strong>Price:</strong> $3.50</p>
            <p><strong>Ingredients:</strong> Espresso, steamed milk, foam.</p>
            <p><strong>Serving Size:</strong> 8 oz</p>
            <p><strong>Calories:</strong> 120</p>
        `;
        var modal = new bootstrap.Modal(document.getElementById('viewMoreModal'));
        modal.show();
    });
});

