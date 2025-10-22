import '../divider.element';
import { html } from 'lit';

describe('fundamental', () => {
  describe('rendering', () => {
    it('should render divider', () => {
      cy.mount(html`<sy-divider></sy-divider>`);
      cy.get('sy-divider').should('exist');
    });
	})
  describe('orientation', () => {
    it('should render divider as vertical', () => {
        cy.mount(html`<sy-divider type="vertical"></sy-divider>`);
        cy.get('sy-divider').should('have.attr', 'type', 'vertical');
    });
  })
  // describe('thickness', () => {
  //   it('should render divider as 5px', () => {
  //       cy.mount(html`<sy-divider thickness="5px"></sy-divider>`);
  //       cy.get('sy-divider').should('have.attr', 'thickness', '5px');
  //   });
  // })

  describe('thickness', () => {
    it('should render button as small', () => {
      cy.mount(html`<sy-button size="small"></sy-button>`);
      cy.get('sy-button').find('button').should('have.class', 'button--small');
    })

    // it('should render button as medium', () => {
    //   cy.mount(html`<sy-button size="medium"></sy-button>`);
    //   cy.get('sy-button').find('button').should('have.class', 'button--medium');
    // })

    // it('should render button as large', () => {
    //   cy.mount(html`<sy-button size="large"></sy-button>`);
    //   cy.get('sy-button').find('button').should('have.class', 'button--large');
    // })
  })


  describe('color', () => {
      it('should render divider in red', () => {
          cy.mount(html`<sy-divider color="red"></sy-divider>`);
          cy.get('sy-divider').should('have.attr', 'color', 'red');
      });
  })

})
