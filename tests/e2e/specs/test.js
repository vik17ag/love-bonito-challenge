// https://docs.cypress.io/api/introduction/api.html

describe("Screen navigation", () => {
  it("tests the app root url", () => {
    cy.visit("/")
      cy.get('#locations').should('be.visible')
  });

    it("tests : home > character list > individual character > home", () => {
        cy.visit("/")
        cy.contains('Earth (C-137)')
        cy.get('#card0 > div > button').click()
        cy.get('#characters').should('be.visible')
        cy.get('#characters > div > div:nth-child(1)').click()
        cy.url().should('include', '/character/38')
        cy.get('#character').should('be.visible')
        cy.get('button').click()
        cy.get('#characters').should('be.visible')
        cy.get('#characters > button').click()
        cy.get('#locations').should('be.visible')

    });


});
describe("Url navigation",()=>{
    it("tests :home > character list > individual character > home", () => {
        cy.visit("localhost:8080/character/38")
        cy.contains('Beth Smith')
        cy.get('button').click()
    });
})

describe("pagination tests", () => {

    it("tests: page 2, 6, last, prev, next", () => {
        cy.visit("/")
        cy.contains('Earth (C-137)')
        cy.get('#pagination > li:nth-child(4)').click()
        cy.contains('#card0 > div > h4','Testicle Monster Dimension')

        cy.get('#pagination > li:nth-child(6)').click()
        cy.contains('#card0 > div > h4','Earth (D716-C)')

        cy.get('#pagination > li:nth-child(9)').click()
        cy.contains('#card0 > div > h4','Glorzo Asteroid')

        cy.get('#pagination > li:nth-child(2)').click()
        cy.contains('#card0 > div > h6','Fascist Teddy Bear Dimension')

        cy.get('#pagination > li:nth-child(7)').click()
        cy.contains('#card0 > div > h4','Glorzo Asteroid')

    });


});
