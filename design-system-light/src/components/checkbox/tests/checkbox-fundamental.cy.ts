import '../checkbox.element';
import { html } from 'lit';

describe('fundamental', () => {
  describe('rendering', () => {
    it('should render checkbox', () => {
      cy.mount(html`<sy-checkbox>Checkbox</sy-checkbox>`);
      cy.get('sy-checkbox').should('exist');
    })

    it('should render checkbox with text', () => {
      cy.mount(html`<sy-checkbox>Checkbox</sy-checkbox>`);
      cy.get('sy-checkbox').should('contain', 'Checkbox');
    })
  })

  describe('disabled', () => {
    it('should render checkbox as disabled', () => {
      cy.mount(html`<sy-checkbox disabled></sy-checkbox>`);
      cy.get('sy-checkbox').should('have.attr', 'disabled');
    })
  
    it('should render checkbox as enabled', () => {
      cy.mount(html`<sy-checkbox></sy-checkbox>`);
      cy.get('sy-checkbox').should('not.have.attr', 'disabled');
    })
  })

  describe('checked', () => {
    it('should render checkbox as checked', () => {
      cy.mount(html`<sy-checkbox checked></sy-checkbox>`);
      cy.get('sy-checkbox').should('have.attr', 'checked');
    })
  
    it('should render checkbox as not checked', () => {
      cy.mount(html`<sy-checkbox></sy-checkbox>`);
      cy.get('sy-checkbox').should('not.have.attr', 'checked');
    })
  })

  describe('indeterminate', () => {
    it('should render checkbox as indeterminate', () => {
      cy.mount(html`<sy-checkbox indeterminate></sy-checkbox>`);
      cy.get('sy-checkbox').should('have.attr', 'indeterminate');
    })
  
    it('should render checkbox as not indeterminate', () => {
      cy.mount(html`<sy-checkbox></sy-checkbox>`);
      cy.get('sy-checkbox').should('have.attr', 'indeterminate');
    })
  })

  describe('size', () => {
    it('should render checkbox as medium', () => {
      cy.mount(html`<sy-checkbox size="medium"></sy-checkbox>`);
      cy.get('sy-checkbox').should('have.attr', 'size', 'medium');
    })
  })
  describe('readonly', () => {
    it('checkbox must not fired click (select) event', () => {
      cy.mount(html`<sy-checkbox readonly></sy-checkbox>`);
      cy.get('sy-checkbox').click();
      cy.get('sy-checkbox').should('not.have.attr', 'size', 'checked');
    })
  })
})