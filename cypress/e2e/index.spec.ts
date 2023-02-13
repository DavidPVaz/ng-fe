import quests from '../fixtures/quests.json';

const API_URL = Cypress.env('API_URL');

describe('App Behaviour:', () => {
    it('should get quests on homepage', () => {
        const expectedNumberOfCalls = 1;

        cy.intercept({
            method: 'GET',
            url: `${API_URL}/quests*`
        }).as('getQuests');
        cy.visit('/');

        cy.wait('@getQuests').then(({ request, response }) => {
            expect(request.url).to.include('?limit=6&page=1');
            expect(response?.statusCode).to.equal(200);
            expect(JSON.stringify(response?.body)).to.equal(JSON.stringify(quests));
        });

        cy.requestCalled('@getQuests', expectedNumberOfCalls);
    });
});
