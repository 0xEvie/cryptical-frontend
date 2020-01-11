/* eslint-env mocha */
/* global cy */
describe('Login Page', () => {
  before(() => {
    cy.visit('http://localhost:8080/#/login')
  })
  it('loads', () => {
    cy.contains('Login')
    cy.contains('Don\'t have an account? Register here')
  })

  it('register redirects to register page', () => {
    cy.get('#register-link').click()
    cy.url().should('include', '/register')
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

  // it('should redirect to events page after login', () => {
  //   cy.get('#submit').click()
  //   // cy.wait(5000)
  //   // cy.url().should('include', '/events')
  // })
  //
  // it('should set session after successful login', () => {
  //   cy.request({
  //     method: 'POST',
  //     url: 'http://localhost:3000/login', // baseUrl will be prepended to this url
  //     form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
  //     body: {
  //       email: 'testuser1@user.com',
  //       password: 'testuser1'
  //     }
  //   })
  // })
})
