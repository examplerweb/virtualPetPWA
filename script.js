class VirtualPet {
    constructor() {
        this.hunger = 100;
        this.happiness = 100;
        this.energy = 100;
        this.isSleeping = false;
        
        this.elements = {
            pet: document.getElementById('pet'),
            petEmotion: document.getElementById('petEmotion'),
            petMouth: document.getElementById('petMouth'),
            hungerBar: document.getElementById('hungerBar'),
            happinessBar: document.getElementById('happinessBar'),
            energyBar: document.getElementById('energyBar'),
            hungerValue: document.getElementById('hungerValue'),
            happinessValue: document.getElementById('happinessValue'),
            energyValue: document.getElementById('energyValue'),
            feedBtn: document.getElementById('feedBtn'),
            playBtn: document.getElementById('playBtn'),
            sleepBtn: document.getElementById('sleepBtn'),
            downloadBtn: document.getElementById('downloadBtn'),
            message: document.getElementById('message')
        };
        
        this.deferredPrompt = null;
        
        this.init();
    }
    
    init() {
        this.updateUI();
        this.startGameLoop();
        this.addEventListeners();
        this.setupPWA();
        this.elements.downloadBtn.style.display = 'none';
    }
    
    addEventListeners() {
        this.elements.feedBtn.addEventListener('click', () => this.feed());
        this.elements.playBtn.addEventListener('click', () => this.play());
        this.elements.sleepBtn.addEventListener('click', () => this.toggleSleep());
        this.elements.downloadBtn.addEventListener('click', () => this.installApp());
        
        this.elements.pet.addEventListener('click', () => this.petPet());
    }
    
    feed() {
        if (this.isSleeping) {
            this.showMessage('Shh! Your pet is sleeping!');
            return;
        }
        
        if (this.hunger >= 100) {
            this.showMessage("I'm not hungry!");
            return;
        }
        
        this.hunger = Math.min(100, this.hunger + 20);
        this.happiness = Math.min(100, this.happiness + 5);
        this.energy = Math.min(100, this.energy + 5);
        
        this.elements.pet.classList.add('eating');
        setTimeout(() => {
            this.elements.pet.classList.remove('eating');
        }, 900);
        
        this.showMessage('Yummy! 🍖');
        this.updateUI();
    }
    
    play() {
        if (this.isSleeping) {
            this.showMessage('Shh! Your pet is sleeping!');
            return;
        }
        
        if (this.energy < 20) {
            this.showMessage("I'm too tired to play!");
            return;
        }
        
        this.happiness = Math.min(100, this.happiness + 25);
        this.energy = Math.max(0, this.energy - 15);
        this.hunger = Math.max(0, this.hunger - 10);
        
        this.elements.pet.classList.add('playing');
        setTimeout(() => {
            this.elements.pet.classList.remove('playing');
        }, 1000);
        
        this.showMessage('That was fun! 🎾');
        this.updateUI();
    }
    
    toggleSleep() {
        this.isSleeping = !this.isSleeping;
        
        if (this.isSleeping) {
            this.elements.pet.classList.add('sleeping');
            this.elements.feedBtn.disabled = true;
            this.elements.playBtn.disabled = true;
            this.elements.sleepBtn.textContent = '☀️ Wake Up';
            this.showMessage('Good night! 😴');
        } else {
            this.elements.pet.classList.remove('sleeping');
            this.elements.feedBtn.disabled = false;
            this.elements.playBtn.disabled = false;
            this.elements.sleepBtn.textContent = '😴 Sleep';
            this.showMessage('Good morning! ☀️');
        }
    }
    
    petPet() {
        if (this.isSleeping) {
            this.showMessage('Shh! Your pet is sleeping!');
            return;
        }
        
        this.happiness = Math.min(100, this.happiness + 10);
        this.showMessage('I love you! 💕');
        this.updateUI();
    }
    
    async installApp() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            const { outcome } = await this.deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                this.showMessage('Installing... 📲');
            } else {
                this.showMessage('Install cancelled');
            }
            this.deferredPrompt = null;
            this.elements.downloadBtn.style.display = 'none';
        } else {
            this.showMessage('App already installed or not eligible');
        }
    }
    
    setupPWA() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            console.log('beforeinstallprompt event fired');
            this.elements.downloadBtn.style.display = 'block';
        });
        
        window.addEventListener('appinstalled', () => {
            console.log('appinstalled event fired');
            this.deferredPrompt = null;
            this.elements.downloadBtn.style.display = 'none';
            this.showMessage('Successfully installed! 🎉');
        });
        
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                const swPath = window.location.pathname.endsWith('/') 
                    ? 'service-worker.js' 
                    : window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1) + 'service-worker.js';
                
                navigator.serviceWorker.register(swPath)
                    .then((registration) => {
                        console.log('ServiceWorker registration successful with scope:', registration.scope);
                    })
                    .catch((error) => {
                        console.log('ServiceWorker registration failed:', error);
                    });
            });
        }
    }
    
    startGameLoop() {
        setInterval(() => {
            if (!this.isSleeping) {
                this.hunger = Math.max(0, this.hunger - 2);
                this.happiness = Math.max(0, this.happiness - 1);
                this.energy = Math.max(0, this.energy - 1);
            } else {
                this.energy = Math.min(100, this.energy + 3);
                this.hunger = Math.max(0, this.hunger - 1);
                
                if (this.energy >= 100) {
                    this.toggleSleep();
                    this.showMessage("I'm fully rested!");
                }
            }
            
            this.updateUI();
            this.checkPetStatus();
        }, 2000);
    }
    
    checkPetStatus() {
        let emotion = this.getEmotion();
        this.elements.petEmotion.textContent = emotion;
        
        if (this.hunger <= 20 || this.happiness <= 20 || this.energy <= 20) {
            this.elements.pet.style.background = 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)';
        } else if (this.hunger >= 80 && this.happiness >= 80 && this.energy >= 80) {
            this.elements.pet.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)';
        } else {
            this.elements.pet.style.background = 'linear-gradient(135deg, #a8e6cf 0%, #88d8b0 100%)';
        }
        
        if (emotion === 'Happy') {
            this.elements.petMouth.style.borderBottom = '4px solid #333';
            this.elements.petMouth.style.borderRadius = '0 0 20px 20px';
        } else if (emotion === 'Sad') {
            this.elements.petMouth.style.borderTop = '4px solid #333';
            this.elements.petMouth.style.borderBottom = 'none';
            this.elements.petMouth.style.borderRadius = '20px 20px 0 0';
        } else {
            this.elements.petMouth.style.borderBottom = '2px solid #333';
            this.elements.petMouth.style.borderRadius = '0 0 10px 10px';
        }
    }
    
    getEmotion() {
        if (this.isSleeping) {
            return 'Sleeping';
        }
        
        const avgStatus = (this.hunger + this.happiness + this.energy) / 3;
        
        if (avgStatus >= 80) {
            return 'Happy';
        } else if (avgStatus >= 50) {
            return 'Okay';
        } else if (avgStatus >= 30) {
            return 'Hungry';
        } else {
            return 'Sad';
        }
    }
    
    updateUI() {
        this.updateStatBar(this.elements.hungerBar, this.elements.hungerValue, this.hunger);
        this.updateStatBar(this.elements.happinessBar, this.elements.happinessValue, this.happiness);
        this.updateStatBar(this.elements.energyBar, this.elements.energyValue, this.energy);
    }
    
    updateStatBar(bar, valueElement, value) {
        bar.style.width = `${value}%`;
        valueElement.textContent = Math.round(value);
        
        bar.classList.remove('low', 'medium');
        
        if (value <= 20) {
            bar.classList.add('low');
        } else if (value <= 50) {
            bar.classList.add('medium');
        }
    }
    
    showMessage(text) {
        this.elements.message.textContent = text;
        this.elements.message.classList.add('show');
        
        setTimeout(() => {
            this.elements.message.classList.remove('show');
        }, 2000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new VirtualPet();
});