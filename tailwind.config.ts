import type {Config} from 'tailwindcss';

const config: Config = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backdropBlur: {
                sm: '4px',
            },
        },
    },
    plugins: [],
};

export default config;
