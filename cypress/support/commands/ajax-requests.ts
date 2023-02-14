export {};

Cypress.Commands.add('requestCalled', (requestAlias: string, expectedNumberOfCalls: number) =>
    cy.get(`${requestAlias}.all`).then(calls => cy.wrap(calls.length).should('equal', expectedNumberOfCalls))
);
