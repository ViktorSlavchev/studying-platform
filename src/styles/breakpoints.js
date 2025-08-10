// Mobile-first breakpoints
const breakpoints = {
    mobile: '480px',    // Small phones
    tablet: '768px',    // Tablets and large phones
    desktop: '1024px',  // Desktop and laptops
    large: '1200px',    // Large desktops
    xlarge: '1440px',   // Extra large screens
};

// Media query helpers for styled-components
const mediaQueries = {
    mobile: `@media (min-width: ${breakpoints.mobile})`,
    tablet: `@media (min-width: ${breakpoints.tablet})`,
    desktop: `@media (min-width: ${breakpoints.desktop})`,
    large: `@media (min-width: ${breakpoints.large})`,
    xlarge: `@media (min-width: ${breakpoints.xlarge})`,

    // Max-width queries for specific ranges
    mobileOnly: `@media (max-width: ${parseInt(breakpoints.tablet) - 1}px)`,
    tabletOnly: `@media (min-width: ${breakpoints.tablet}) and (max-width: ${parseInt(breakpoints.desktop) - 1}px)`,
    desktopOnly: `@media (min-width: ${breakpoints.desktop}) and (max-width: ${parseInt(breakpoints.large) - 1}px)`,

    // Common device queries
    smallMobile: '@media (max-width: 479px)',
    largeMobile: '@media (min-width: 480px) and (max-width: 767px)',

    // Orientation queries
    landscape: '@media (orientation: landscape)',
    portrait: '@media (orientation: portrait)',

    // High DPI screens
    retina: '@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
};

// Export both for flexibility
export { breakpoints, mediaQueries };
export default mediaQueries;