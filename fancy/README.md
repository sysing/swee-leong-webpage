# Fancy Variant - 3D Benchy Scroll Progress Indicator

This directory contains the "fancy" variant of the Swee Leong webpage featuring an interactive scroll progress indicator with a modern 3D Benchy-themed animation.

## Features

- **Circular Progress Ring**: Visual scroll progress indicator without percentage text
- **3D Benchy Animation**: Modern interpretation of the iconic 3D printing test object
  - **Hull Infill Effect**: Translucent infill pattern visible during early scroll (0-40%)
  - **Chimney Bridge Printing**: Progressive "printing" of the chimney bridge during mid-scroll (40-80%)
  - **Gentle Bobbing Motion**: Subtle boat-like movement when scroll reaches completion (80-100%)
- **Enhanced Dark Mode Support**: Improved visibility and contrast in both light and dark modes
- **Light Mode Default**: Clean light mode appearance with seamless dark mode toggle
- **Scroll-Responsive Animation**: Animation phases change based on scroll progress
- **Smooth Interactions**: Optimized animations and hover effects with enhanced visual feedback
- **Accessibility**: Keyboard navigation support and proper ARIA labels
- **Responsive Design**: Adapts to different screen sizes with mobile-optimized Benchy design

## File Structure

```
fancy/
├── index.html                    # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css           # Complete styling with progress indicator
│   └── js/
│       └── scroll-progress.js   # JavaScript functionality
```

## Customizing the 3D Benchy Animation

### Animation Parameters

The 3D Benchy animation can be customized by modifying CSS variables and animation properties in `assets/css/styles.css`:

#### Colors
```css
:root {
  --benchy-primary: #7c3aed;     /* Main Benchy hull and cabin color */
  --benchy-secondary: #0ea5e9;   /* Infill pattern and outlines */
  --benchy-accent: #f59e0b;      /* Chimney bridge accent color */
}
```

#### Animation Phases
```css
/* Hull infill pattern visibility */
@keyframes infillPattern {
  0%, 100% { opacity: 0; transform: translateX(0); }
  50% { opacity: 0.7; transform: translateX(2px); }
}

/* Gentle bobbing motion for completion */
@keyframes benchyBob {
  0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
  25% { transform: translate(-50%, -50%) rotate(1deg); }
  75% { transform: translate(-50%, -50%) rotate(-1deg); }
}

/* Water ripple effects */
@keyframes waterRipples {
  0%, 100% { transform: scaleX(1); opacity: 0.3; }
  50% { transform: scaleX(1.2); opacity: 0.6; }
}

/* Chimney bridge progressive printing */
@keyframes chimneyPrint {
  0% { width: 0; opacity: 0; }
  50% { opacity: 1; }
  100% { width: 8px; opacity: 1; }
}
```

### Size Adjustments

#### Desktop Size (Default)
```css
.scroll-progress-wrapper {
  width: 80px;
  height: 80px;
}

.benchy-animation {
  width: 32px;
  height: 32px;
}
```

#### Mobile Size (Responsive)
```css
@media (max-width: 768px) {
  .scroll-progress-wrapper {
    width: 60px;
    height: 60px;
  }
  
  .benchy-animation {
    width: 24px;
    height: 24px;
  }
}
```

### Advanced Customizations

#### 1. Change Animation Phases Based on Scroll
The JavaScript in `scroll-progress.js` includes dynamic animation control with three distinct phases:

```javascript
// In animateBenchyBasedOnScroll() function
// Phase 1: Early scroll (0-40%) - Hull infill becomes visible
if (percentage <= 40) {
  const infillOpacity = Math.min(0.8, percentage / 40 * 0.8);
  hullInfill.style.opacity = infillOpacity;
}

// Phase 2: Mid scroll (40-80%) - Chimney bridge printing
if (percentage > 40 && percentage <= 80) {
  const bridgeProgress = (percentage - 40) / 40;
  chimneyBridge.style.width = `${bridgeProgress * 8}px`;
}

// Phase 3: Late scroll (80-100%) - Gentle bobbing motion
if (percentage > 80) {
  benchyHull.style.animation = `benchyBob ${Math.max(2, 4 - bobIntensity * 2)}s ease-in-out infinite`;
}
```

#### 2. Add New Benchy Elements
To add more 3D Benchy details, modify the HTML structure in `index.html`:

```html
<div class="benchy-animation">
  <div class="benchy-hull">
    <div class="hull-infill"></div>
    <div class="hull-outline"></div>
  </div>
  <div class="benchy-cabin">
    <div class="cabin-walls"></div>
    <div class="cabin-roof"></div>
  </div>
  <div class="benchy-chimney">
    <div class="chimney-base"></div>
    <div class="chimney-bridge"></div>
  </div>
  <!-- Add new elements here -->
  <div class="benchy-details">
    <div class="port-holes"></div>
    <div class="bow-details"></div>
  </div>
  <div class="water-base">
    <div class="water-ripples"></div>
  </div>
</div>
```

Then add corresponding CSS animations in `styles.css`.

#### 3. Enhanced Dark Mode Support
The progress indicator now has improved visibility in both themes:

```css
/* Light mode colors */
:root {
  --progress-bg: rgba(0, 0, 0, 0.15);
  --progress-fill: #0ea5e9;
  --benchy-primary: #7c3aed;
  --benchy-secondary: #0ea5e9;
  --benchy-accent: #f59e0b;
}

/* Dark mode colors */
[data-theme="dark"] {
  --progress-bg: rgba(255, 255, 255, 0.2);
  --progress-fill: #66d9e8;
  --benchy-primary: #a78bfa;
  --benchy-secondary: #66d9e8;
  --benchy-accent: #fbbf24;
}
```

## Theme Customization

### Adding New Themes
To add additional themes beyond light/dark, extend the CSS custom properties:

```css
/* Example: Blue theme */
[data-theme="blue"] {
  --bg: #1e3a8a;
  --text: #f1f5f9;
  --accent: #60a5fa;
  --printer-color: #3b82f6;
  /* ... other colors */
}
```

Update the JavaScript theme toggle logic in `scroll-progress.js`:

```javascript
toggleTheme() {
  const themes = ['dark', 'light', 'blue'];
  const current = document.body.getAttribute('data-theme') || 'dark';
  const currentIndex = themes.indexOf(current);
  const nextTheme = themes[(currentIndex + 1) % themes.length];
  this.setTheme(nextTheme);
}
```

## Browser Compatibility

- **Modern Browsers**: Full support for all features
- **CSS Grid**: Used for responsive layouts
- **CSS Custom Properties**: Used for theming
- **Intersection Observer**: Used for scroll animations (with fallback)
- **requestAnimationFrame**: Used for smooth performance

## Performance Considerations

1. **Throttled Scroll Events**: The scroll listener uses `requestAnimationFrame` for optimal performance
2. **CSS Transforms**: Animations use `transform` and `opacity` for GPU acceleration
3. **Intersection Observer**: Lazy loading of scroll animations reduces initial load impact

## Accessibility Features

- **Keyboard Navigation**: Progress indicator is focusable and keyboard-operable
- **ARIA Labels**: Proper labeling for screen readers
- **Reduced Motion**: Respects user preferences for reduced motion (can be enhanced)
- **Color Contrast**: Both light and dark themes meet WCAG standards

## Integration Notes

- **No Dependencies**: Pure CSS and JavaScript implementation
- **Modular Code**: Easy to extract scroll progress functionality for other projects
- **Progressive Enhancement**: Works without JavaScript (basic styling remains)
- **Backward Compatible**: Graceful degradation for older browsers

## Future Enhancement Ideas

1. **Multiple Printer Models**: Different 3D printer designs to choose from
2. **Print Progress Simulation**: Show actual "printing" progress with layers
3. **Material Selection**: Different filament colors/types based on page sections
4. **Sound Effects**: Optional audio feedback for printing actions
5. **Particle Effects**: Animated particles for more dynamic effects

For questions or contributions, please refer to the main repository README.