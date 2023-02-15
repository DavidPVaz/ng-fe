export {};

Cypress.Commands.add('findByTestId', id => cy.get(`[data-cy="${id}"]`));

Cypress.Commands.add('findByText', text => cy.contains(text));
