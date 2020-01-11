/* eslint-env mocha */
/* global cy */
describe('Logout Page', () => {
  before(() => {
    cy.visit('http://localhost:8080/#/')
  })

  it('should go to logout page', () => {
    cy.get('#logout').click()
    cy.url().should('include', '/logout')
    cy.go('back')
  })
})
