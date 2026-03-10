document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', function() {
        performSearch();
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            alert(`Searching for: "${searchTerm}"\nIn a real application, this would show search results.`);
            // In a real app, you would:
            // 1. Send search request to backend
            // 2. Update the UI with search results
            // 3. Possibly navigate to search results page
        } else {
            searchInput.focus();
        }
    }
    
    // Notification click
    const notificationBtn = document.querySelector('.notification');
    notificationBtn.addEventListener('click', function() {
        alert('You have 3 new notifications:\n1. New episode available\n2. Recommended movie added\n3. Account settings updated');
    });
    
    // User menu dropdown
    const menuBtn = document.querySelector('.menu-btn');
    menuBtn.addEventListener('click', function() {
        // In a real app, this would toggle a dropdown menu
        alert('User menu:\n• Profile Settings\n• Account Preferences\n• Help Center\n• Sign Out');
    });
    
    // Video play functionality
    const playButtons = document.querySelectorAll('.play-small-btn, .play-icon, .play-btn');
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const videoTitle = this.closest('.video-card')?.querySelector('.video-title')?.textContent || 
                             this.closest('.hero-content')?.querySelector('.hero-title')?.textContent;
            
            alert(`Playing: "${videoTitle || 'Movie'}"\nIn a real application, this would launch the video player.`);
            
            // In a real app, you would:
            // 1. Load the video player
            // 2. Start video streaming
            // 3. Update watch history
            // 4. Possibly show fullscreen player
        });
    });
    
    // Info button functionality
    const infoButtons = document.querySelectorAll('.info-small-btn, .info-btn');
    infoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const videoTitle = this.closest('.video-card')?.querySelector('.video-title')?.textContent || 
                             this.closest('.hero-content')?.querySelector('.hero-title')?.textContent;
            
            alert(`More info about: "${videoTitle || 'Movie'}"\nIn a real application, this would show detailed information.`);
            
            // In a real app, you would:
            // 1. Show movie/TV show details modal
            // 2. Display cast, synopsis, ratings
            // 3. Show trailer
            // 4. Add to watchlist option
        });
    });
    
    // Video card hover effects
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.play-small-btn') && !e.target.closest('.info-small-btn')) {
                const videoTitle = this.querySelector('.video-title').textContent;
                alert(`Clicked on: "${videoTitle}"\nIn a real application, this would navigate to the movie/TV show page.`);
            }
        });
    });
    
    // Sidebar navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            const sectionName = this.querySelector('span').textContent;
            alert(`Navigating to: ${sectionName}\nIn a real application, this would load the corresponding section.`);
        });
    });
    
    // Category navigation
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        category.addEventListener('click', function(e) {
            e.preventDefault();
            const categoryName = this.textContent;
            alert(`Filtering by category: ${categoryName}\nIn a real application, this would filter content by this category.`);
        });
    });
    
    // Footer links
    const footerLinks = document.querySelectorAll('.footer a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent;
            
            if (linkText === 'Sign Out') {
                const confirmSignOut = confirm('Are you sure you want to sign out?');
                if (confirmSignOut) {
                    alert('Signing out...\nIn a real application, this would clear session and redirect to home page.');
                    // In real app: window.location.href = 'index.html';
                }
            } else {
                alert(`Navigating to: ${linkText}\nIn a real application, this would load the corresponding page.`);
            }
        });
    });
    
    // Social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className.split(' ')[1].replace('fa-', '');
            alert(`Opening OneVerse ${platform.charAt(0).toUpperCase() + platform.slice(1)} page\nIn a real application, this would open a new tab to the social media page.`);
        });
    });
    
    // Simulate loading
    console.log('OneVerse Dashboard loaded successfully');
    console.log('User authenticated');
    console.log('Content loaded: 16 movies/TV shows');
    
    // Add smooth scroll to sections
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.cursor = 'pointer';
        title.addEventListener('click', function() {
            const section = this.closest('.content-section');
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search focus
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        
        // Escape to clear search
        if (e.key === 'Escape' && document.activeElement === searchInput) {
            searchInput.value = '';
        }
    });
    
    // Update notification count randomly (demo)
    setInterval(() => {
        const notificationCount = document.querySelector('.notification-count');
        const randomCount = Math.floor(Math.random() * 5);
        notificationCount.textContent = randomCount || 1;
    }, 30000); // Every 30 seconds
    
    // Image loading error handling
    const images = document.querySelectorAll('.video-thumbnail img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225&q=80';
            console.log('Image failed to load, using fallback');
        });
    });
});