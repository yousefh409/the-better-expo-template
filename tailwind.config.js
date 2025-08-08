/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
    "./stores/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Color - Maroon (#550000)
        primary: {
          50: "rgb(255, 245, 245)",
          100: "rgb(254, 235, 235)",
          200: "rgb(252, 215, 215)",
          300: "rgb(248, 185, 185)",
          400: "rgb(240, 135, 135)",
          500: "rgb(220, 85, 85)",
          600: "rgb(185, 28, 28)",
          700: "rgb(153, 27, 27)",
          800: "rgb(127, 29, 29)",
          900: "rgb(85, 0, 0)",
          950: "rgb(69, 10, 10)",
        },
        // Secondary Color - Gold
        secondary: {
          50: "rgb(255, 251, 235)",
          100: "rgb(254, 243, 199)",
          200: "rgb(253, 230, 138)",
          300: "rgb(252, 211, 77)",
          400: "rgb(251, 191, 36)",
          500: "rgb(245, 158, 11)",
          600: "rgb(217, 119, 6)",
          700: "rgb(180, 83, 9)",
          800: "rgb(146, 64, 14)",
          900: "rgb(120, 53, 15)",
          950: "rgb(69, 26, 3)",
        },

        neutral: {
          0: "rgb(255, 255, 255)",
          50: "rgb(250, 250, 250)",
          100: "rgb(244, 244, 245)",
          200: "rgb(228, 228, 231)",
          300: "rgb(212, 212, 216)",
          400: "rgb(161, 161, 170)",
          500: "rgb(113, 113, 122)",
          600: "rgb(82, 82, 91)",
          700: "rgb(63, 63, 70)",
          800: "rgb(39, 39, 42)",
          900: "rgb(24, 24, 27)",
          950: "rgb(9, 9, 11)",
        },
        error: {
          50: "rgb(254, 242, 242)",
          100: "rgb(254, 226, 226)",
          200: "rgb(254, 202, 202)",
          300: "rgb(252, 165, 165)",
          400: "rgb(248, 113, 113)",
          500: "rgb(239, 68, 68)",
          600: "rgb(220, 38, 38)",
          700: "rgb(185, 28, 28)",
          800: "rgb(153, 27, 27)",
          900: "rgb(127, 29, 29)",
        },
        warning: {
          50: "rgb(255, 251, 235)",
          100: "rgb(254, 243, 199)",
          200: "rgb(253, 230, 138)",
          300: "rgb(252, 211, 77)",
          400: "rgb(251, 191, 36)",
          500: "rgb(245, 158, 11)",
          600: "rgb(217, 119, 6)",
          700: "rgb(180, 83, 9)",
          800: "rgb(146, 64, 14)",
          900: "rgb(120, 53, 15)",
        },
        success: {
          50: "rgb(240, 253, 244)",
          100: "rgb(220, 252, 231)",
          200: "rgb(187, 247, 208)",
          300: "rgb(134, 239, 172)",
          400: "rgb(74, 222, 128)",
          500: "rgb(34, 197, 94)",
          600: "rgb(22, 163, 74)",
          700: "rgb(21, 128, 61)",
          800: "rgb(22, 101, 52)",
          900: "rgb(20, 83, 45)",
        },
        // Updated theme-specific color aliases
        "primary-brand": "rgb(85, 0, 0)",
        "secondary-brand": "rgb(245, 158, 11)",
        // Complementary accent colors for the maroon/gold theme
        accent: {
          cream: "rgb(255, 248, 220)",
          burgundy: "rgb(128, 0, 32)",
          bronze: "rgb(205, 127, 50)",
          champagne: "rgb(247, 231, 206)",
        },
        "default-font": "rgb(24, 24, 27)",
        "subtext-color": "rgb(113, 113, 122)",
        "neutral-border": "rgb(228, 228, 231)",
        white: "rgb(255, 255, 255)",
        "default-background": "rgb(255, 255, 255)",
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, rgb(85, 0, 0) 0%, rgb(153, 27, 27) 100%)',
        'gradient-secondary': 'linear-gradient(135deg, rgb(245, 158, 11) 0%, rgb(217, 119, 6) 100%)',
        'gradient-hero': 'linear-gradient(135deg, rgb(85, 0, 0) 0%, rgb(153, 27, 27) 50%, rgb(245, 158, 11) 100%)',
        'gradient-elegant': 'linear-gradient(45deg, rgb(85, 0, 0) 0%, rgb(128, 0, 32) 50%, rgb(205, 127, 50) 100%)',
        'gradient-sunset': 'linear-gradient(to right, rgb(153, 27, 27), rgb(245, 158, 11), rgb(255, 248, 220))',
      },
      fontSize: {
        caption: [
          "12px",
          {
            lineHeight: "16px",
            fontWeight: "400",
            letterSpacing: "0em",
          },
        ],
        "caption-bold": [
          "12px",
          {
            lineHeight: "16px",
            fontWeight: "500",
            letterSpacing: "0em",
          },
        ],
        body: [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "400",
            letterSpacing: "0em",
          },
        ],
        "body-bold": [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "500",
            letterSpacing: "0em",
          },
        ],
        "heading-3": [
          "16px",
          {
            lineHeight: "20px",
            fontWeight: "500",
            letterSpacing: "0em",
          },
        ],
        "heading-2": [
          "20px",
          {
            lineHeight: "24px",
            fontWeight: "500",
            letterSpacing: "0em",
          },
        ],
        "heading-1": [
          "30px",
          {
            lineHeight: "36px",
            fontWeight: "500",
            letterSpacing: "0em",
          },
        ],
        "monospace-body": [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "400",
            letterSpacing: "0em",
          },
        ],
      },
      fontFamily: {
        caption: '"Work Sans"',
        "caption-bold": '"Work Sans"',
        body: '"Work Sans"',
        "body-bold": '"Work Sans"',
        "heading-3": '"Work Sans"',
        "heading-2": '"Work Sans"',
        "heading-1": '"Work Sans"',
        "monospace-body": "monospace",
      },
      boxShadow: {
        sm: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
        default: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
        md: "0px 4px 16px -2px rgba(0, 0, 0, 0.08), 0px 2px 4px -1px rgba(0, 0, 0, 0.08)",
        lg: "0px 12px 32px -4px rgba(0, 0, 0, 0.08), 0px 4px 8px -2px rgba(0, 0, 0, 0.08)",
        overlay:
          "0px 12px 32px -4px rgba(0, 0, 0, 0.08), 0px 4px 8px -2px rgba(0, 0, 0, 0.08)",
      },
      borderRadius: {
        sm: "8px",
        md: "16px",
        DEFAULT: "16px",
        lg: "24px",
        full: "9999px",
      },
      container: {
        padding: {
          DEFAULT: "16px",
          sm: "calc((100vw + 16px - 640px) / 2)",
          md: "calc((100vw + 16px - 768px) / 2)",
          lg: "calc((100vw + 16px - 1024px) / 2)",
          xl: "calc((100vw + 16px - 1280px) / 2)",
          "2xl": "calc((100vw + 16px - 1536px) / 2)",
        },
      },
      spacing: {
        112: "28rem",
        144: "36rem",
        192: "48rem",
        256: "64rem",
        320: "80rem",
      },
      screens: {
        mobile: {
          max: "767px",
        },
      },
    },
  },
  plugins: [],
}


