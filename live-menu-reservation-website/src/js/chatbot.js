$(document).ready(function() {
    // Append chatbot HTML to the body
    $('body').append(`
        <div id="chatbot-container" class="chatbot-hidden">
            <div class="chatbot-header">
                <h3>Restaurant Assistant</h3>
                <button id="minimize-chatbot">−</button>
            </div>
            <div class="chatbot-messages">
                <div class="bot-message">Hello! How can I help you today?</div>
            </div>
            <div class="chatbot-input">
                <input type="text" id="user-input" placeholder="Type your question...">
                <button id="send-message">Send</button>
            </div>
        </div>
        <button id="chatbot-toggle" class="chatbot-button-show">Chat with us</button>
    `);

    // Toggle chatbot visibility
    $('#chatbot-toggle').on('click', function() {
        $('#chatbot-container').toggleClass('chatbot-hidden');
        $(this).toggleClass('chatbot-button-show');
        
        if ($(this).hasClass('chatbot-button-show')) {
            $(this).text('Chat with us');
        } else {
            $(this).text('Close chat');
        }
    });
    
    // Handle minimize button
    $('#minimize-chatbot').on('click', function() {
        $('#chatbot-container').addClass('chatbot-hidden');
        $('#chatbot-toggle').addClass('chatbot-button-show').text('Chat with us');
    });
    
    // Process user messages
    $('#send-message').on('click', sendMessage);
    $('#user-input').on('keypress', function(e) {
        if (e.which === 13) {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const userInput = $('#user-input').val().trim();
        
        if (userInput === '') return;
        
        // Add user message to chat
        $('.chatbot-messages').append(`
            <div class="user-message">${userInput}</div>
        `);
        
        // Clear input field
        $('#user-input').val('');
        
        // Get bot response
        const botResponse = getBotResponse(userInput);
        
        // Add bot response with a slight delay for a more natural feel
        setTimeout(function() {
            $('.chatbot-messages').append(`
                <div class="bot-message">${botResponse}</div>
            `);
            
            // Scroll to bottom of chat
            $('.chatbot-messages').scrollTop($('.chatbot-messages')[0].scrollHeight);
        }, 500);
        
        // Scroll to user message immediately
        $('.chatbot-messages').scrollTop($('.chatbot-messages')[0].scrollHeight);
    }
    
    // Generate bot response based on user input
    function getBotResponse(input) {
        const lowerInput = input.toLowerCase();
        
        // Predefined responses for common questions
        if (lowerInput.includes('hour') || lowerInput.includes('time') || lowerInput.includes('open')) {
            return "We're open Monday to Friday from 8:00 AM to 10:00 PM, and weekends from 9:00 AM to 11:00 PM.";
        } else if (lowerInput.includes('reservation') || lowerInput.includes('book') || lowerInput.includes('table')) {
            return "You can make a reservation through our reservation page or by calling us at (555) 123-4567.";
        } else if (lowerInput.includes('special') || lowerInput.includes('deal') || lowerInput.includes('offer')) {
            return "Check out our 'Today's Special' page to see our current offers!";
        } else if (lowerInput.includes('outdoor') || lowerInput.includes('patio') || lowerInput.includes('seating')) {
            return "Yes, we have outdoor seating available, weather permitting.";
        } else if (lowerInput.includes('parking')) {
            return "We have free parking available for our customers in the back of the restaurant.";
        } else if (lowerInput.includes('wifi')) {
            return "Yes, we offer complimentary WiFi for all our guests. Please ask your server for the password.";
        } else if (lowerInput.includes('menu') || lowerInput.includes('food') || lowerInput.includes('dish')) {
            return "You can view our complete menu on the 'Live Menu' page. It's updated daily!";
        } else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
            return "Hello there! How can I assist you today?";
        } else if (lowerInput.includes('thank')) {
            return "You're welcome! Is there anything else I can help you with?";
        } else {
            return "I'm not sure I understand. Could you try rephrasing your question? Or you can ask about our hours, reservations, or today's specials.";
        }
    }
});