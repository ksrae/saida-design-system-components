import '../button.element';
import '../../spinner/spinner.element';

import { html } from 'lit';

describe('fundamental', () => {
  describe('rendering', () => {
    it('should render button', () => {
      cy.mount(html`<sy-button></sy-button>`);
      cy.get('sy-button').should('exist');
    });
  
    it('should render button with text', () => {
      cy.mount(html`<sy-button>Button</sy-button>`);
      cy.get('sy-button').should('contain', 'Button');
    })
  
    it('should render button with html tag', () => {
      cy.mount(html`<sy-button><i>Button</i></sy-button>`);
      cy.get('sy-button i').should('exist');
    })
  });
  
  // describe('type', () => {
  //   it('should render button as primary', () => {
  //     cy.mount(html`<sy-button type="button"></sy-button>`);
  //     cy.get('sy-button').should('have.attr', 'type', 'button');
  //   })
  
  //   it('should render button as submit', () => {
  //     cy.mount(html`<sy-button type="submit"></sy-button>`);
  //     cy.get('sy-button').should('have.attr', 'type', 'submit');
  //   })
  
  //   it('should render button as reset', () => {
  //     cy.mount(html`<sy-button type="reset"></sy-button>`);
  //     cy.get('sy-button').should('have.attr', 'type', 'reset');
  //   })
  // })

  describe('size', () => {
    it('should render button as small', () => {
      cy.mount(html`<sy-button size="small"></sy-button>`);
      cy.get('sy-button').find('button').should('have.class', 'button--small');
    })

    it('should render button as medium', () => {
      cy.mount(html`<sy-button size="medium"></sy-button>`);
      cy.get('sy-button').find('button').should('have.class', 'button--medium');
    })

    it('should render button as large', () => {
      cy.mount(html`<sy-button size="large"></sy-button>`);
      cy.get('sy-button').find('button').should('have.class', 'button--large');
    })
  })

  describe('variant', () => {
    it('should render button as primary', () => {
      cy.mount(html`<sy-button variant="primary"></sy-button>`);
      cy.get('sy-button').find('button').should('have.class', 'button--primary');
    })

    it('should render button as secondary', () => {
      cy.mount(html`<sy-button variant="secondary"></sy-button>`);
      cy.get('sy-button').find('button').should('have.class', 'button--secondary');
    })

    it('should render button as default', () => {
      cy.mount(html`<sy-button variant="default"></sy-button>`);
      cy.get('sy-button').find('button').should('have.class', 'button--default');
    })

    it('should render button as borderless', () => {
      cy.mount(html`<sy-button variant="borderless"></sy-button>`);
      cy.get('sy-button').find('button').should('have.class', 'button--borderless');
    })
  })
  
  describe('disabled', () => {
    it('should render button as disabled', () => {
      cy.mount(html`<sy-button disabled></sy-button>`);
      cy.get('sy-button').should('have.attr', 'disabled');
    })
  
    it('should render button as enabled', () => {
      cy.mount(html`<sy-button></sy-button>`);
      cy.get('sy-button').should('not.have.attr', 'disabled');
    })
  })

  describe('loading', () => {
    it('should render button as loading', () => {
      cy.mount(html`<sy-button loading></sy-button>`);
      cy.get('sy-button').find('sy-spinner').should('exist');
    })

    it('should render button as not loading', () => {
      cy.mount(html`<sy-button></sy-button>`);
      cy.get('sy-button').find('sy-spinner').should('not.exist');
    })
  })

  describe('justified', () => {
    it('should render button as justified', () => {
      cy.mount(html`<sy-button justified></sy-button>`);
      cy.get('sy-button').should('have.attr', 'justified');
    })

    it('should render button as not justified', () => {
      cy.mount(html`<sy-button></sy-button>`);
      cy.get('sy-button').should('not.have.attr', 'justified');
    })
  })
})
