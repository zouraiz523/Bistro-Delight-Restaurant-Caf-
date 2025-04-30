$(document).ready(function() {
    // Toggle mobile navigation
    $('.hamburger').click(function() {
        $('nav ul').toggleClass('show');
    });

    // Close mobile nav when clicking a link
    $('nav ul li a').click(function() {
        $('nav ul').removeClass('show');
    });

    // Smooth scrolling for navigation links
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        let target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
    });

    // Load menu data from JSON
    loadMenu();

    // Load today's special
    loadSpecial();

    // Handle menu tab filtering
    $('.menu-tab').click(function() {
        $('.menu-tab').removeClass('active');
        $(this).addClass('active');
        
        const category = $(this).data('category');
        filterMenu(category);
    });

    // Handle reservation form submission
    $('#reservation-form').submit(function(e) {
        e.preventDefault();
        
        // Get form values
        const name = $('#name').val();
        const email = $('#email').val();
        const phone = $('#phone').val();
        const date = $('#date').val();
        const time = $('#time').val();
        const guests = $('#guests').val();
        const specialRequests = $('#special-requests').val();
        
        // Format reservation details for confirmation popup
        let formattedDate = new Date(date);
        formattedDate = formattedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        let reservationDetails = `
            <div class="reservation-summary">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Date:</strong> ${formattedDate}</p>
                <p><strong>Time:</strong> ${time}</p>
                <p><strong>Number of Guests:</strong> ${guests}</p>
                <p>We'll send a confirmation to <strong>${email}</strong></p>
                ${specialRequests ? `<p><strong>Special Requests:</strong> ${specialRequests}</p>` : ''}
                <p class="confirmation-note">A confirmation has been sent to your email.</p>
            </div>
        `;
        
        // Show confirmation popup
        $('#reservation-details').html(reservationDetails);
        $('#confirmation-popup').addClass('show');
        
        // Reset form
        this.reset();
        
        // In a real application, you would send this data to a server
        // or use EmailJS to send an email to the restaurant owner
    });

    // Close popups when clicking the X
    $('.close-popup').click(function() {
        $('.popup').removeClass('show');
    });

    // Close popups when clicking outside the popup content
    $('.popup').click(function(e) {
        if ($(e.target).closest('.popup-content').length === 0) {
            $('.popup').removeClass('show');
        }
    });

    // Accordion functionality for FAQ section
    $('.accordion-header').click(function() {
        // Toggle the active class on the clicked item
        $(this).parent('.accordion-item').toggleClass('active');
        
        // Close all other accordion items
        $(this).parent().siblings('.accordion-item').removeClass('active');
    });

    // Mini Chatbot functionality
    $('#send-chat').click(sendChatMessage);
    
    $('#chat-input').keypress(function(e) {
        if (e.which === 13) { // Enter key
            sendChatMessage();
            return false;
        }
    });
});

// Menu functionality
function loadMenu() {
    // In a real application, you would load this from menu.json
    // For demo purposes, we'll use inline JSON data
    const menuData = {
        items: [
            {
                "id": 1,
                "name": "Avocado Toast",
                "price": 12.95,
                "description": "Toasted artisan bread topped with smashed avocado, cherry tomatoes, microgreens, and a poached egg.",
                "image": "https://images.unsplash.com/photo-1605475028149-e91b8ef5083e",
                "category": "breakfast",
                "badges": ["vegetarian", "popular"]
              },
              {
                "id": 2,
                "name": "Classic Eggs Benedict",
                "price": 14.95,
                "description": "English muffin topped with Canadian bacon, poached eggs, and hollandaise sauce. Served with breakfast potatoes.",
                "image": "https://images.unsplash.com/photo-1551218808-94e220e084d2",
                "category": "breakfast",
                "badges": ["popular"]
              },
              {
                "id": 3,
                "name": "Buttermilk Pancakes",
                "price": 11.95,
                "description": "Fluffy pancakes served with maple syrup, butter, and your choice of fresh berries or banana.",
                "image": "https://images.unsplash.com/photo-1589308078052-416b862f544a",
                "category": "breakfast",
                "badges": ["vegetarian"]
              },
              {
                "id": 4,
                "name": "Grilled Salmon Salad",
                "price": 18.95,
                "description": "Grilled salmon fillet over mixed greens with cucumber, red onion, cherry tomatoes, and lemon dill vinaigrette.",
                "image": "https://images.unsplash.com/photo-1612197516706-8ff5f87cf0b8",
                "category": "lunch",
                "badges": []
              },
              {
                "id": 5,
                "name": "Bistro Burger",
                "price": 16.95,
                "description": "Angus beef patty with aged cheddar, caramelized onions, lettuce, tomato, and special sauce on a brioche bun. Served with fries.",
                "image": "https://images.unsplash.com/photo-1550547660-d9450f859349",
                "category": "lunch",
                "badges": ["popular"]
              },
              {
                "id": 6,
                "name": "Chicken Pesto Sandwich",
                "price": 15.95,
                "description": "Grilled chicken breast with pesto, mozzarella, roasted red peppers, and arugula on ciabatta bread. Served with mixed greens.",
                "image": "https://images.unsplash.com/photo-1613145991265-307b397f3995",
                "category": "lunch",
                "badges": []
              },
              {
                "id": 7,
                "name": "Filet Mignon",
                "price": 34.95,
                "description": "8oz filet with red wine reduction, garlic mashed potatoes, and seasonal vegetables.",
                "image": "https://images.unsplash.com/photo-1553621042-f6e147245754",
                "category": "dinner",
                "badges": ["popular"]
              },
              {
                "id": 8,
                "name": "Lobster Risotto",
                "price": 32.95,
                "description": "Creamy Arborio rice with butter-poached lobster, asparagus, and parmesan.",
                "image": "https://images.unsplash.com/photo-1648651904033-4c5e9f634b89",
                "category": "dinner",
                "badges": []
              },
              {
                "id": 9,
                "name": "Truffle Mushroom Pasta",
                "price": 24.95,
                "description": "Fettuccine with wild mushrooms, truffle oil, garlic, white wine, and parmesan cheese.",
                "image": "https://images.unsplash.com/photo-1562967916-eb82221dfb33",
                "category": "dinner",
                "badges": ["vegetarian"]
              },
              {
                "id": 10,
                "name": "Pan-Seared Scallops",
                "price": 29.95,
                "description": "Sea scallops with lemon butter sauce, cauliflower puree, and crispy pancetta.",
                "image": "https://images.unsplash.com/photo-1613145886857-fb2f2e6b23f8",
                "category": "dinner",
                "badges": []
              },
              {
                "id": 11,
                "name": "Chocolate Lava Cake",
                "price": 9.95,
                "description": "Warm chocolate cake with a molten center, served with vanilla ice cream and fresh berries.",
                "image": "https://images.unsplash.com/photo-1599785209707-68854b1fcb31",
                "category": "desserts",
                "badges": ["vegetarian", "popular"]
              },
              {
                "id": 12,
                "name": "Crème Brûlée",
                "price": 8.95,
                "description": "Classic vanilla bean custard with a caramelized sugar crust.",
                "image": "https://images.unsplash.com/photo-1621898855860-9d97eaeef22e",
                "category": "desserts",
                "badges": ["vegetarian"]
              },
              {
                "id": 13,
                "name": "New York Cheesecake",
                "price": 8.95,
                "description": "Creamy cheesecake with a graham cracker crust, topped with seasonal fruit compote.",
                "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
                "category": "desserts",
                "badges": ["vegetarian"]
              },
              {
                "id": 14,
                "name": "Signature Martini",
                "price": 13.95,
                "description": "House-infused citrus vodka, elderflower liqueur, and fresh lemon juice. Served with a twist.",
                "image": "https://images.unsplash.com/photo-1604908177524-9372a16f5b6d",
                "category": "drinks",
                "badges": []
              },
              {
                "id": 15,
                "name": "Artisanal Cold Brew",
                "price": 5.95,
                "description": "Slow-steeped for 24 hours for a smooth, rich flavor. Served over ice.",
                "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
                "category": "drinks",
                "badges": ["vegetarian"]
              },
              {
                "id": 16,
                "name": "Raspberry Mojito",
                "price": 12.95,
                "description": "Fresh muddled raspberries, mint, lime juice, rum, and soda water.",
                "image": "https://images.unsplash.com/photo-1620503366634-fb3fc7464ff2",
                "category": "drinks",
                "badges": ["popular"]
              }
          
        ]
    };
    
    // Display menu items
    displayMenu(menuData.items);
}

function displayMenu(items) {
    $('#menu-items').empty();
    
    if (items.length === 0) {
        $('#menu-items').html('<p>No items found in this category.</p>');
        return;
    }
    
    for (const item of items) {
        let badgesHTML = '';
        
        if (item.badges && item.badges.length > 0) {
            for (const badge of item.badges) {
                badgesHTML += `<span class="badge badge-${badge}">${badge.charAt(0).toUpperCase() + badge.slice(1)}</span>`;
            }
        }
        
        const itemHTML = `
            <div class="menu-item" data-category="${item.category}">
                <div class="menu-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="menu-item-info">
                    <div class="menu-item-header">
                        <h3 class="menu-item-title">${item.name}</h3>
                        <div class="menu-item-price">$${item.price.toFixed(2)}</div>
                    </div>
                    <p class="menu-item-description">${item.description}</p>
                    <div class="menu-item-badges">
                        ${badgesHTML}
                    </div>
                </div>
            </div>
        `;
        
        $('#menu-items').append(itemHTML);
    }
}

function filterMenu(category) {
    if (category === 'all') {
        $('.menu-item').fadeIn(300);
    } else {
        $('.menu-item').hide();
        $(`.menu-item[data-category="${category}"]`).fadeIn(300);
    }
}

// Today's special functionality
function loadSpecial() {
    // In a real application, this would be loaded from special.json
    const specialData = {
        title: "Weekend Brunch Special",
        description: "Join us this weekend for our special brunch menu featuring Bottomless Mimosas for just $15 with any brunch entrée purchase.",
        validUntil: "Valid Saturday and Sunday, 9 AM - 2 PM"
    };
    
    // Display special popup
    const specialHTML = `
        <div class="special-info">
            <h3>${specialData.title}</h3>
            <p>${specialData.description}</p>
            <p class="special-validity">${specialData.validUntil}</p>
            <button class="btn">View Brunch Menu</button>
        </div>
    `;
    
    $('#special-content').html(specialHTML);
    
    // Show special popup after a short delay
    setTimeout(function() {
        $('#special-popup').addClass('show');
    }, 2000);
}

// Chatbot functionality
function sendChatMessage() {
    const userMessage = $('#chat-input').val().trim();
    
    if (userMessage === '') return;
    
    // Add user message to chat
    addChatMessage(userMessage, 'user');
    
    // Clear input
    $('#chat-input').val('');
    
    // Get bot response after a short delay (simulating processing)
    setTimeout(function() {
        const botResponse = getBotResponse(userMessage);
        addChatMessage(botResponse, 'bot');
    }, 600);
}

function addChatMessage(message, sender) {
    const messageHTML = `
        <div class="chat-message ${sender}">
            <p>${message}</p>
        </div>
    `;
    
    $('#chat-messages').append(messageHTML);
    
    // Scroll to bottom of chat
    $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);
}

function getBotResponse(message) {
    // Convert message to lowercase for easier matching
    const lowerMessage = message.toLowerCase();
    
    // Check for keywords and return appropriate responses
    if (lowerMessage.includes('hour') || lowerMessage.includes('time') || lowerMessage.includes('open')) {
        return "We are open Monday to Thursday from 8:00 AM to 10:00 PM, Friday and Saturday from 8:00 AM to 11:00 PM, and Sunday from 9:00 AM to 9:00 PM.";
    }
    else if (lowerMessage.includes('reservation') || lowerMessage.includes('book') || lowerMessage.includes('table')) {
        return "You can make a reservation through our website's reservation form, or by calling us at (555) 123-4567. We recommend booking at least 3 days in advance for weekends.";
    }
    else if (lowerMessage.includes('menu') || lowerMessage.includes('food') || lowerMessage.includes('eat')) {
        return "Our menu features a variety of dishes including breakfast classics, lunch favorites, elegant dinner entrees, and delicious desserts. You can view our full menu on this page!";
    }
    else if (lowerMessage.includes('vegetarian') || lowerMessage.includes('vegan') || lowerMessage.includes('gluten')) {
        return "Yes, we offer vegetarian and vegan options, and we can accommodate most dietary restrictions including gluten-free. Please inform your server about any allergies or dietary needs.";
    }
    else if (lowerMessage.includes('outdoor') || lowerMessage.includes('patio') || lowerMessage.includes('outside')) {
        return "Yes, we have outdoor seating available on our patio. It's available on a first-come, first-served basis, but you can request it in your reservation.";
    }
    else if (lowerMessage.includes('parking') || lowerMessage.includes('park')) {
        return "We offer free parking in our lot, and there's also street parking available nearby.";
    }
    else if (lowerMessage.includes('wifi') || lowerMessage.includes('internet')) {
        return "Yes, we offer complimentary WiFi for all our guests. Just ask your server for the password.";
    }
    else if (lowerMessage.includes('covid') || lowerMessage.includes('safety') || lowerMessage.includes('protocol')) {
        return "We follow all local health guidelines. Our staff is fully vaccinated, and we sanitize all surfaces regularly. We also offer outdoor seating and takeout options.";
    }
    else if (lowerMessage.includes('special') || lowerMessage.includes('deal') || lowerMessage.includes('discount')) {
        return "We have daily specials that change regularly. This weekend we're offering a brunch special with bottomless mimosas! Check our 'Today's Special' for the latest offers.";
    }
    else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "Hello! How can I help you today?";
    }
    else if (lowerMessage.includes('thank')) {
        return "You're welcome! Is there anything else I can help you with?";
    }
    else {
        return "I'm not sure I understand your question. You can ask me about our hours, menu, reservations, or special events. If you need more assistance, please call us at (555) 123-4567.";
    }
}

// Header scroll effect
$(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
        $('header').css('padding', '10px 0');
        $('header').css('box-shadow', '0 2px 10px rgba(0, 0, 0, 0.1)');
    } else {
        $('header').css('padding', '15px 0');
        $('header').css('box-shadow', '0 2px 10px rgba(0, 0, 0, 0.05)');
    }
});