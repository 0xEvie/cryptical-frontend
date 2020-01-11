/* eslint-env mocha */
/* global cy */
describe('Register Page', () => {
  before(() => {
    cy.visit('http://localhost:8080/#/register')
  })

  it('should redirect to login page', () => {
    cy.get('#login-link').click()
    cy.url().should('include', '/login')
    cy.go('back')
  })

  it('loads', () => {
    cy.contains('Register')
    cy.contains('Have an account? Login here')
  })

  it('login link redirects to login page', () => {
    cy.get('#login-link').click()
    cy.url().should('include', '/login')
    cy.go('back')
  })

  it('email field works', () => {
    cy.get('input[type=email]')
      .type('testuser1@testuser.com').should('have.value', 'testuser1@testuser.com')
  })
  it('password field works', () => {
    cy.get('input[type=password]')
      .type('testuser1').should('have.value', 'testuser1')
  })
})
