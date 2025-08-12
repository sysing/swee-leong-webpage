# Fancy Variant - 3D Printing Scroll Progress Indicator

This directory contains the "fancy" variant of the Swee Leong webpage featuring an interactive scroll progress indicator with 3D printing-themed animations.

## Features

- **Circular Progress Ring**: Visual scroll progress indicator without percentage text
- **Enhanced 3D Printing Animation**: Detailed printer with moving head, filament feed, and growing printed object
- **Light Mode Default**: Clean light mode appearance with dark mode toggle support
- **Scroll-Based Object Printing**: Printed object grows progressively as user scrolls through content
- **Smooth Interactions**: Optimized animations and hover effects with scroll-responsive animation speeds
- **Accessibility**: Keyboard navigation support and proper ARIA labels
- **Responsive Design**: Adapts to different screen sizes

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

## Customizing the 3D Printing Animation

### Animation Parameters

The 3D printing animation can be customized by modifying CSS variables and animation properties in `assets/css/styles.css`:

#### Colors
```css
:root {
  --printer-color: #7c3aed;     /* Main printer body color */
  --filament-color: #f59e0b;    /* Filament line color */
  --progress-fill: #66d9e8;     /* Progress ring color */
}
```

#### Animation Timing
```css
/* Printer body pulsing */
@keyframes printerPulse {
  /* Modify timing and scale values */
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Printer head movement */
@keyframes printerHead {
  /* Adjust movement distance */
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(4px); }
  75% { transform: translateX(-4px); }
}

/* Filament feeding effect */
@keyframes filamentFeed {
  /* Control filament height and opacity */
  0%, 100% { height: 0; opacity: 1; }
  50% { height: 12px; opacity: 0.8; }
}
```

### Size Adjustments

#### Desktop Size (Default)
```css
.scroll-progress-wrapper {
  width: 80px;
  height: 80px;
}

.printer-animation {
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
  
  .printer-animation {
    width: 24px;
    height: 24px;
  }
}
```

### Advanced Customizations

#### 1. Change Animation Speed Based on Scroll
The JavaScript in `scroll-progress.js` includes dynamic animation speed adjustment:

```javascript
// In animatePrinterBasedOnScroll() function
const animationSpeed = Math.max(0.5, 2 - (percentage / 50));
printerBody.style.animationDuration = `${animationSpeed}s`;
```

#### 2. Add New Animation Elements
To add more 3D printing elements, modify the HTML structure in `index.html`:

```html
<div class="printer-animation">
  <div class="printer-body">
    <div class="printer-head"></div>
    <div class="filament-line"></div>
  </div>
  <div class="build-platform">
    <div class="printed-object"></div>
  </div>
  <!-- Add new elements here -->
  <div class="extruder-nozzle"></div>
</div>
```

Then add corresponding CSS animations in `styles.css`.

#### 3. Custom Progress Ring Effects
Modify the progress ring appearance:

```css
.progress-ring-progress {
  /* Add custom stroke effects */
  filter: drop-shadow(0 0 8px rgba(102, 217, 232, 0.3));
  
  /* Custom stroke patterns */
  stroke-dasharray: 226.19; /* For smooth ring */
  /* or */
  stroke-dasharray: 10, 5;  /* For dashed ring */
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