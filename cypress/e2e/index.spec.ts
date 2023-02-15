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
        const expectedCardIds = [1, 2, 3, 4, 5, 6];

        // exercise & verify
        cy.findByTestId('quests-fallback').should('be.visible').should('have.text', 'No items to show.');

        cy.wait('@getQuests').then(({ request, response }) => {
            expect(request.url).to.include('?limit=6&page=1');
            expect(response?.statusCode).to.equal(200);
            expect(JSON.stringify(response?.body)).to.equal(JSON.stringify(quests));
        });
        expectedCardIds.map(id => `list-card-${id}`).forEach(id => cy.findByTestId(id).should('exist'));
        cy.findByTestId('list-card-7').should('not.exist');

        cy.requestCalled('@getQuests', expectedNumberOfCalls);
    });

    it('should not perform a second request for an already visited page', () => {
        // setup
        const expectedNumberOfCalls = 2;

        // exercise & verify
        // visited '/', will perform the first request
        cy.wait('@getQuests').then(({ request, response }) => {
            expect(request.url).to.include('?limit=6&page=1');
            expect(response?.statusCode).to.equal(200);
        });

        // go to second page, will perform the second request
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

describe('Quest page:', () => {
    it('should show a 404 page on non existent ids', () => {
        // setup
        const options = { failOnStatusCode: false, retryOnStatusCodeFailure: false };
        const expectedMessage = 'This page could not be found.';

        // exercise & verify
        // expecting 404 error pages - getStaticPaths
        cy.visit('/0', options);
        cy.findByText(expectedMessage).should('be.visible');
        cy.visit('/101', options);
        cy.findByText(expectedMessage).should('be.visible');
    });

    it('should go to single quest page', () => {
        // setup
        const expectedNumberOfCalls = 0;
        cy.intercept({
            method: 'GET',
            url: `${API_URL}/quests/*`
        }).as('getQuest');
        cy.visit('/');

        // exercise & verify
        cy.findByTestId('list-card-1').should('be.visible').click();
        cy.url().should('include', '/1');
        cy.findByTestId('single-card-1').should('be.visible');

        // no requests to be made - getStaticProps
        cy.requestCalled('@getQuest', expectedNumberOfCalls);
    });

    it('should go back to home page', () => {
        // setup
        cy.visit('/');

        // exercise & verify
        // go to page 2 and click on quest
        cy.findByTestId('next').should('be.visible').click();

        cy.findByTestId('list-card-10').should('be.visible').click();
        cy.url().should('include', '/10');
        cy.findByTestId('single-card-10').should('be.visible');

        // go back to homepage to the previous pagination interval on close icon
        cy.findByTestId('card-close').should('be.visible').click();
        cy.findByTestId('paginator-description').should('be.visible').should('have.text', 'Showing 7 to 12 of 100.');

        // go to page 3 and click on quest
        cy.findByTestId('next').should('be.visible').click();

        cy.findByTestId('list-card-17').should('be.visible').click();
        cy.url().should('include', '/17');
        cy.findByTestId('single-card-17').should('be.visible');

        // go back again to homepage to the previous pagination interval on back button
        cy.findByTestId('card-back').should('be.visible').click();
        cy.findByTestId('paginator-description').should('be.visible').should('have.text', 'Showing 13 to 18 of 100.');
    });
});
