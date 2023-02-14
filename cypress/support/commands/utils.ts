export {};

Cypress.Commands.add('clearBrowserCache', () =>
    cy.wrap(
        Cypress.automation('remote:debugger:protocol', {
            command: 'Network.clearBrowserCache'
        })
    )
);
