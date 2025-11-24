
        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            updateDateTime();
            setInterval(updateDateTime, 1000);
            setupNavigation();
            setupInteractions();
        });

        // Update Date and Time
        function updateDateTime() {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            document.getElementById('currentDateTime').textContent = now.toLocaleDateString('en-US', options);
        }

        // Navigation System
        function setupNavigation() {
            const navTabs = document.querySelectorAll('.nav-tab');
            const pages = document.querySelectorAll('.page');

            navTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const targetPage = tab.getAttribute('data-page');
                    
                    // Remove active class from all tabs and pages
                    navTabs.forEach(t => t.classList.remove('active'));
                    pages.forEach(p => p.classList.remove('active'));
                    
                    // Add active class to clicked tab and corresponding page
                    tab.classList.add('active');
                    document.getElementById(targetPage).classList.add('active');
                    
                    // Update URL hash
                    window.location.hash = targetPage;
                });
            });

            // Handle initial page load with hash
            const hash = window.location.hash.substring(1);
            if (hash) {
                const targetTab = document.querySelector(`[data-page="${hash}"]`);
                if (targetTab) {
                    targetTab.click();
                }
            }
        }

        // Search City Function
        function searchCity() {
            const cityInput = document.getElementById('citySearch');
            const cityName = cityInput.value.trim();
            
            if (cityName) {
                // Simulate city change
                document.getElementById('currentLocation').textContent = cityName;
                
                // Generate random temperature
                const temp = Math.floor(Math.random() * (85 - 55) + 55);
                document.getElementById('currentTemp').textContent = temp + '°F';
                
                // Show notification
                showNotification(`Weather updated for ${cityName}`);
                
                // Clear input
                cityInput.value = '';
            } else {
                showNotification('Please enter a city name', 'error');
            }
        }

        // Enter key support for search
        document.getElementById('citySearch').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchCity();
            }
        });

        // Setup Interactive Elements
        function setupInteractions() {
            // Forecast items click
            document.querySelectorAll('.forecast-item').forEach(item => {
                item.addEventListener('click', function() {
                    const day = this.querySelector('.day').textContent;
                    showNotification(`Viewing detailed forecast for ${day}`);
                });
            });

            // Temperature unit change
            const tempUnit = document.getElementById('tempUnit');
            if (tempUnit) {
                tempUnit.addEventListener('change', function() {
                    const currentTemp = document.getElementById('currentTemp');
                    const tempValue = parseInt(currentTemp.textContent);
                    
                    if (this.value === 'celsius') {
                        const celsius = Math.round((tempValue - 32) * 5/9);
                        currentTemp.textContent = celsius + '°C';
                        showNotification('Temperature unit changed to Celsius');
                    } else if (this.value === 'kelvin') {
                        const kelvin = Math.round((tempValue - 32) * 5/9 + 273.15);
                        currentTemp.textContent = kelvin + 'K';
                        showNotification('Temperature unit changed to Kelvin');
                    } else {
                        currentTemp.textContent = tempValue + '°F';
                        showNotification('Temperature unit changed to Fahrenheit');
                    }
                });
            }

            // Dark mode toggle
            const darkModeToggle = document.getElementById('darkModeToggle');
            if (darkModeToggle) {
                darkModeToggle.addEventListener('change', function() {
                    if (this.checked) {
                        document.body.style.background = 'linear-gradient(135deg, #232526 0%, #414345 100%)';
                        showNotification('Dark mode enabled');
                    } else {
                        document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)';
                        showNotification('Light mode enabled');
                    }
                });
            }

            // Toggle switches
            document.querySelectorAll('.toggle-switch input').forEach(toggle => {
                toggle.addEventListener('change', function() {
                    const label = this.closest('.setting-option').querySelector('span').textContent;
                    const status = this.checked ? 'enabled' : 'disabled';
                    showNotification(`${label} ${status}`);
                });
            });

            // Weather detail items hover effect
            document.querySelectorAll('.detail-item').forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.05)';
                    this.style.transition = 'transform 0.3s';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                });
            });

            // Hourly items click
            document.querySelectorAll('.hourly-item').forEach(item => {
                item.addEventListener('click', function() {
                    const time = this.querySelector('.time').textContent;
                    const temp = this.querySelector('.forecast-temp').textContent;
                    showNotification(`${time}: ${temp}`);
                });
            });

            // Alert cards click
            document.querySelectorAll('.alert-card').forEach(card => {
                card.addEventListener('click', function() {
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 200);
                });
            });

            // Stat cards animation
            document.querySelectorAll('.stat-card').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    const icon = this.querySelector('i');
                    icon.style.transform = 'rotate(360deg)';
                    icon.style.transition = 'transform 0.6s';
                });
                
                card.addEventListener('mouseleave', function() {
                    const icon = this.querySelector('i');
                    icon.style.transform = 'rotate(0deg)';
                });
            });
        }

        // Notification System
        function showNotification(message, type = 'success') {
            // Remove existing notification if any
            const existingNotification = document.querySelector('.notification');
            if (existingNotification) {
                existingNotification.remove();
            }

            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            
            // Styling
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'error' ? '#E74C3C' : '#4A90E2'};
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                z-index: 1000;
                animation: slideIn 0.3s ease-out;
                font-weight: 600;
            `;
            
            // Add animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
            `;
            
            if (!document.querySelector('style[data-notification]')) {
                style.setAttribute('data-notification', 'true');
                document.head.appendChild(style);
            }
            
            document.body.appendChild(notification);
            
            // Auto remove after 3 seconds
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 3000);
        }

        // Simulate real-time weather updates
        setInterval(() => {
            const tempElement = document.getElementById('currentTemp');
            if (tempElement && !tempElement.textContent.includes('C') && !tempElement.textContent.includes('K')) {
                const currentTemp = parseInt(tempElement.textContent);
                const change = Math.random() > 0.5 ? 1 : -1;
                const newTemp = currentTemp + change;
                tempElement.textContent = newTemp + '°F';
            }
        }, 60000); // Update every minute

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + K for search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                document.getElementById('citySearch').focus();
            }
            
            // Arrow keys for navigation
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                const activeTab = document.querySelector('.nav-tab.active');
                const tabs = Array.from(document.querySelectorAll('.nav-tab'));
                const currentIndex = tabs.indexOf(activeTab);
                
                let nextIndex;
                if (e.key === 'ArrowRight') {
                    nextIndex = (currentIndex + 1) % tabs.length;
                } else {
                    nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                }
                
                tabs[nextIndex].click();
            }
        });

        // Add weather animation effects
        function addWeatherEffects() {
            const weatherIcon = document.querySelector('.weather-icon');
            
            setInterval(() => {
                weatherIcon.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    weatherIcon.style.transform = 'scale(1)';
                }, 500);
            }, 3000);
        }

        addWeatherEffects();

        // Geolocation simulation
        function detectLocation() {
            showNotification('Detecting your location...');
            
            setTimeout(() => {
                const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
                const randomCity = cities[Math.floor(Math.random() * cities.length)];
                document.getElementById('currentLocation').textContent = randomCity + ', USA';
                showNotification(`Location set to ${randomCity}`);
            }, 1500);
        }

        // Weather condition simulator
        function simulateWeatherChange() {
            const conditions = [
                { icon: 'fa-sun', class: 'sunny', name: 'Sunny', temp: 75 },
                { icon: 'fa-cloud-sun', class: 'cloudy', name: 'Partly Cloudy', temp: 70 },
                { icon: 'fa-cloud-rain', class: 'rainy', name: 'Rainy', temp: 62 },
                { icon: 'fa-bolt', class: 'stormy', name: 'Stormy', temp: 58 },
                { icon: 'fa-cloud', class: 'cloudy', name: 'Cloudy', temp: 68 }
            ];
            
            const weatherIcon = document.querySelector('.weather-icon');
            const condition = document.querySelector('.condition');
            
            setInterval(() => {
                const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
                weatherIcon.className = `fas ${randomCondition.icon} weather-icon ${randomCondition.class}`;
                condition.textContent = randomCondition.name;
            }, 30000); // Change every 30 seconds for demo
        }

        // Initialize weather effects
        setTimeout(simulateWeatherChange, 5000);

        // Print/Export functionality
        function exportWeatherData() {
            const location = document.getElementById('currentLocation').textContent;
            const temp = document.getElementById('currentTemp').textContent;
            const date = new Date().toLocaleDateString();
            
            const data = `Weather Report
Location: ${location}
Temperature: ${temp}
Date: ${date}
            
Generated by WeatherNow App`;
            
            const blob = new Blob([data], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'weather-report.txt';
            a.click();
            
            showNotification('Weather report downloaded!');
        }

        // Add refresh functionality
        function refreshWeather() {
            showNotification('Refreshing weather data...');
            
            setTimeout(() => {
                const temp = Math.floor(Math.random() * (85 - 55) + 55);
                document.getElementById('currentTemp').textContent = temp + '°F';
                showNotification('Weather data updated!');
            }, 1000);
        }

        // Add double-click refresh on weather card
        document.querySelectorAll('.weather-card').forEach(card => {
            card.addEventListener('dblclick', refreshWeather);
        });

        console.log('WeatherNow App initialized successfully!');
        console.log('Keyboard shortcuts:');
        console.log('- Ctrl/Cmd + K: Focus search');
        console.log('- Arrow Left/Right: Navigate between pages');
        console.log('- Double-click weather card: Refresh data');