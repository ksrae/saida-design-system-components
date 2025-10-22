import '../popover.element';
import { html } from 'lit';
import './popover-fundamental.style.css';

describe('fundamental', () => {
  describe('hover', () => {
    it('should render when hover', () => {
      cy.mount(html`
      <div class="sandbox">
        <sy-popover trigger="hover">popover</sy-popover>
      </div>`);
      cy.get('div.sandbox').trigger('mouseenter').then(() => {
        cy.get('sy-popover').find('div.popover').should('exist');
      })
      
    });
    it('should not render when mouse leave', () => {
      cy.mount(html`
      <div class="sandbox">
        <sy-popover>popover</sy-popover>
      </div>`);
      cy.get('div.sandbox').trigger('mouseleave').then(() => {
        cy.get('sy-popover').find('div.popover').should('not.exist');
      });
    });
	})

  describe('click', () => {
    it('should render when click', () => {
      cy.mount(html`
      <div class="sandbox">
        <sy-popover trigger="click">popover</sy-popover>
      </div>`);
      cy.get('div.sandbox').click();
      cy.get('sy-popover').find('div.popover').should('exist');
    });
    it('should not render when click outside', () => {
      cy.mount(html`
      <div class="sandbox">
        <sy-popover>popover</sy-popover>
      </div>`);
      cy.get('div.sandbox').click();
      cy.get('body').click(0,0);
      cy.get('sy-popover').find('div.popover').should('not.exist');
    });
	})

  describe('fixed', () => {
    it('should render when fixed', () => {
      cy.mount(html`
      <div class="sandbox">
        <sy-popover fixed>popover</sy-popover>
      </div>`);
      cy.get('sy-popover').find('div.popover').should('exist');
    });
	})
})
  


