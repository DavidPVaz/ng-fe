/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command that verifies how many times an ajax call was performed
         */
        requestCalled(requestAlias: string, expectedNumberOfCalls: number): Chainable<number>;

        /**
         * Custom command that gets a specific element by id
         */
        findByTestId(id: string): Chainable<JQuery<HTMLElement>>;

        /**
         * Custom command that gets an element containing a specific text
         */
        findByText(text: string): Chainable<undefined>;

        /**
         * Custom command to clear browser cache
         */
        clearBrowserCache(): void;
    }
}
