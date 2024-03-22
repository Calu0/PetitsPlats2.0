/** @type {import('tailwindcss').Config} */
export const content = [
  "./**/*.{html,js}",
  // "./scripts/pages/index.js",
];

export const theme = {
  extend: {
    colors: {
      "yellow": "var(--yellow)",
      "black": "var(--black)",
      'gray-bg': "var(--gray-bg)",
      'gray': "var(--gray)",
    },
    fontSize: {
      xxxs: "0.625rem", // 10px
      xxs: "0.75rem", // 12px
      xs: "0.813rem", // 13px
      sm: "0.875rem", // 14px
      md: "0.938rem", // 15px
      md2: "1rem", // 16px
      lg: '1.125rem', // 18px
      xl: '1.563rem', // 25px
      '2xl': "1.875rem",  // 30px
      '3xl': "2.5rem",  // 40px
    },
    backgroundImage: {
      'banner': "url('/assets/images/banner.jpeg')",

    },
    fontFamily: {
      "Manrope": ["'Manrope'", "sans-serif"],
      "Anton": ["'Anton'", "sans-serif"],
    },
  },
};

export const plugins = [];
