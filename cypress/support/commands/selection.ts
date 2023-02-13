export {};

Cypress.Commands.add('findByTestId', id => cy.get(`[data-cy="${id}"]`));
