import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        --color-brand: #0095DC;
        --color-brand-50: #D9F2FD;
        --color-brand-600: #0086c6;

        --color-brand-disabled: #73c5ec;

        --color-red: #D80000;
        --color-red-700: #B20000;
        --color-red-800: #A00000;

        --color-grey-100: #F3F4F6;
        --color-grey-200: #E5E7EB;
        --color-grey-300: #D1D5DB;
        --color-grey-500: #6B7280;
        --color-grey-600: #4B5563;
        --color-grey-700: #374151;
        --color-grey-800: #1F2937;
        --color-grey-900: #111827;

        

        --color-border:rgba(0, 8, 12, 0.1);

        --color-text-dark: #00344d;
        --color-text-light: #f2fafd;
        --bg-color: #F3F4F6;

        --backdrop-color: rgba(255, 255, 255, 0.1);

        --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
        --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
        --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

        --border-radius-tiny: 3px;
        --border-radius-sm: 8px;
        --border-radius-md: 16px;
        --border-radius-lg: 32px;
        --border-radius-full: 9999px;

        --icon-sz-sm: 2.4rem;
        --icon-sz-md: 3.2rem;
        --icon-sz-lg: 4.8rem;

        /* For dark mode */
        --image-grayscale: 0;
        --image-opacity: 100%;
    }
    
    *, *::before, *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;

        /* Creating animations for dark mode */
        transition: background-color 0.3s, border 0.3s;
    }

    html {
        font-size: 62.5%;
    }
    
    body {
        font-family: "Open Sans", sans-serif;
        color: var(--color-text-dark);

        transition: color 0.3s, background-color 0.3s;
        min-height: 100vh;
        line-height: 1.5;
        font-size: 1.6rem;
        background-color: var(--bg-color);
    }

    
    input, button, textarea, select {
        font: inherit;
        color: inherit;
    }

    button {
        cursor: pointer;
    }

    *:disabled {
        cursor: not-allowed;
    }

    select:disabled, input:disabled {
        background-color: var(--color-brand-disabled);
        color: var(--color-brand-50);
    }

    input:focus, button:focus, textarea:focus, select:focus {
        outline: 2px solid var(--color-brand);
        outline-offset: -1px;
    }

    button:has(svg) {
        line-height: 0;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    ul {
        list-style: none;
    }

    p, h1, h2, h3, h4, h5, h6 {
        overflow-wrap: break-word;
        hyphens: auto;
    }

    img {
        max-width: 100%;

        /* For dark mode */
        filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
    }

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }
    
    ::-webkit-scrollbar-thumb {
        background-color: #d6dee1;
        border-radius: 20px;
        border: 2px solid transparent;
        background-clip: content-box;
        width: 100%;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #a8bbbf;
    }

`

export default GlobalStyles;