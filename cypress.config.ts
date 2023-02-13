import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        video: false,
        env: {
            API_URL: 'http://localhost:3000/api'
        },
        defaultCommandTimeout: 5000,
        viewportWidth: 1280,
        viewportHeight: 800,
        specPattern: 'cypress/e2e/*.spec.{js,jsx,ts,tsx}',
        supportFile: 'cypress/support/e2e.{js,jsx,ts,tsx}',
        setupNodeEvents(on, config) {
            // implement node event listeners here
        }
    }
});
