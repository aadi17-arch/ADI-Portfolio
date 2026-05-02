/**
 * Portfolio Entry Point
 */
import { initNavigation } from './modules/navigation.js';
import { initTheme } from './modules/theme.js';
import { initTyping } from './modules/typing.js';
import { initAnimations } from './modules/animations.js';
import { initContactForm } from './modules/contact.js';
import { initProjects } from './modules/project-renderer.js';
import { initCPStats } from './modules/cp-stats.js';

document.addEventListener('DOMContentLoaded', () => {
    // Structural Logic
    initNavigation();
    initTheme();
    
    // Content Rendering
    initProjects();
    initCPStats();
    
    // Effects & Animations
    initTyping();
    initAnimations();
    initContactForm();

    console.log('Portfolio initialized successfully! 🚀');
});
