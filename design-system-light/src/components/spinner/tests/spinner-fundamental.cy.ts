import '../spinner.element';
import { html } from 'lit';

describe('fundamental', () => {
  describe('rendering', () => {
    it('should render spinner', () => {
      cy.mount(html`<sy-spinner></sy-spinner>`);
      cy.get('sy-spinner').should('exist');
    });
	})
  describe('description', () => {
    it('should render spinner with description', () => {
        cy.mount(html`<sy-divider type="vertical"></sy-divider>`);
        cy.get('sy-divider').should('have.attr', 'type', 'vertical');
    });
    })
    describe('delay', () => {
    it('should render spinner with delay 5s', () => {
        cy.mount(html`<sy-divider delay=5000></sy-divider>`);
        cy.get('sy-divider').should('have.attr', 'delay', '5000');
    });
    })
    describe('paused', () => {
    it('should render spinner paused', () => {
        cy.mount(html`<sy-divider stop="true"></sy-divider>`);
        cy.get('sy-divider').should('have.attr', 'stop', 'true');
    });
    })
    describe('overlay', () => {
      it('should render button as overlay', () => {
        cy.mount(html`<sy-spinner overlay></sy-spinner>`);
        cy.get('sy-spinner').should('have.attr', 'overlay');
      })

      it('should render button as not overlay', () => {
        cy.mount(html`<sy-spinner></sy-spinner>`);
        cy.get('sy-spinner').should('not.have.attr', 'overlay');
      })
    }) 
})

