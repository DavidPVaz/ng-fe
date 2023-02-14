import quests from '../fixtures/quests.json';

const API_URL = Cypress.env('API_URL');

describe('Homepage:', () => {
    beforeEach(() => {
        cy.clearBrowserCache();
        cy.intercept({
            method: 'GET',
            url: `${API_URL}/quests*`
        }).as('getQuests');
        cy.visit('/');
    });

    it('should get quests on homepage', () => {
        // setup
        const expectedNumberOfCalls = 1;

        // exercise & verify
        cy.wait('@getQuests').then(({ request, response }) => {
            expect(request.url).to.include('?limit=6&page=1');
            expect(response?.statusCode).to.equal(200);
            expect(JSON.stringify(response?.body)).to.equal(JSON.stringify(quests));
        });
        cy.requestCalled('@getQuests', expectedNumberOfCalls);
    });

    it('should not perform a second request on same page', () => {
        // setup
        const expectedNumberOfCalls = 2;

        // exercise & verify
        cy.wait('@getQuests').then(({ request, response }) => {
            expect(request.url).to.include('?limit=6&page=1');
            expect(response?.statusCode).to.equal(200);
        });

        // go to second page, will perform the second page rquest
        cy.findByTestId('next').should('be.visible').click();
        cy.wait('@getQuests').then(({ request, response }) => {
            expect(request.url).to.include('?limit=6&page=2');
            expect(response?.statusCode).to.equal(200);
        });

        // back to first page, will use query cache
        cy.findByTestId('previous').should('be.visible').click();

        cy.requestCalled('@getQuests', expectedNumberOfCalls);
    });

    it('should iterate correctly through pagination', () => {
        // exercise & verify
        // on first page
        cy.findByTestId('paginator-description').should('be.visible').should('have.text', 'Loading...');
        cy.findByTestId('paginator-description').should('be.visible').should('have.text', 'Showing 1 to 6 of 100.');
        cy.findByTestId('first').should('be.visible').should('be.disabled');
        cy.findByTestId('previous').should('be.visible').should('be.disabled');
        cy.findByTestId('next').should('be.visible').should('be.enabled');
        cy.findByTestId('last').should('be.visible').should('be.enabled');

        // on second page
        cy.findByTestId('next').should('be.visible').click();
        cy.findByTestId('paginator-description').should('be.visible').should('have.text', 'Loading...');

        cy.findByTestId('paginator-description').should('be.visible').should('have.text', 'Showing 7 to 12 of 100.');
        cy.findByTestId('first').should('be.visible').should('be.enabled');
        cy.findByTestId('previous').should('be.visible').should('be.enabled');
        cy.findByTestId('next').should('be.visible').should('be.enabled');
        cy.findByTestId('last').should('be.visible').should('be.enabled');

        // on last page
        cy.findByTestId('last').should('be.visible').click();
        cy.findByTestId('paginator-description').should('be.visible').should('have.text', 'Loading...');

        cy.findByTestId('paginator-description').should('be.visible').should('have.text', 'Showing 97 to 100 of 100.');
        cy.findByTestId('first').should('be.visible').should('be.enabled');
        cy.findByTestId('previous').should('be.visible').should('be.enabled');
        cy.findByTestId('next').should('be.visible').should('be.disabled');
        cy.findByTestId('last').should('be.visible').should('be.disabled');

        // back to first page
        cy.findByTestId('first').should('be.visible').click();

        cy.findByTestId('paginator-description').should('be.visible').should('have.text', 'Showing 1 to 6 of 100.');
        cy.findByTestId('first').should('be.visible').should('be.disabled');
        cy.findByTestId('previous').should('be.visible').should('be.disabled');
        cy.findByTestId('next').should('be.visible').should('be.enabled');
        cy.findByTestId('last').should('be.visible').should('be.enabled');
    });
});
