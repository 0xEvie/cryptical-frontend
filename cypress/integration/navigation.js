/* eslint-env mocha */
/* global cy */
describe('Navigation', () => {
  describe('Un-Authenticated', () => {
    before(() => {
      cy.visit('http://localhost:8080/#/')
    })
    it('loads', () => {
      cy.contains('CryptiCal')
      cy.contains('Home')
      cy.contains('About')
      cy.contains('Login')
    }),
    it('About us link should redirect to about', () => {
      cy.get('#about-link').click()
      cy.url().should('include', '/about')
      cy.go('back')
    }),
    it('Login link should redirect to login', () => {
      cy.get('#login-link').click()
      cy.url().should('include', '/')
      cy.go('back')
    }),
    it('Home link should redirect to home', () => {
      cy.get('#home-link').click()
      cy.url().should('include', '/')
      cy.go('back')
    })
  })
})
