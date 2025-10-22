import type { Meta, StoryObj } from '@storybook/web-components';
import { Card, CardBorder, CardProps, ComplexHeader } from './card';
import '../../icon/icon.element';
import '../../button/button.element';

const cardMeta: Meta<CardProps> = {
  title: 'Card/Overview',
  tags: ['false'],
  argTypes: {
    backdrop: {
      control: 'boolean',
      description: 'Use card with shadow.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    collapsible: {
      control: 'boolean',
      description: 'Use collapsible card.',
      table: {
        category: 'Parameter',
        defaultValue: {summary: false as any},
        type: { summary: 'boolean' }
      }
    },
    slot: {
      control: 'text',
      description: 'The card’s main content.(no need slot name)',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
      }
    },
    slotCover: {
      control: 'text',
      description: 'The cover includes media such as images or videos that can represent the content of the card.<br/> Use <b>slot="cover"</b> in the tag',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
      }
    },
    slotHeader: {
      control: 'text',
      description: 'An optional header for the card. Use <b>slot="header"</b> in the tag',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
      }
    },
    slotFooter: {
      control: 'text',
      description: 'An optional footer for the card. Use <b>slot="footer"</b> in the tag',
      table: {
        category: 'Parameter',
        defaultValue: {summary: ``},
      }
    },
  }
}

export default cardMeta;
type Story = StoryObj<CardProps>;

export const Default: Story = {
  render: (args) => Card(args),
  args: {
    backdrop: false,
    collapsible: false,
    slotCover: `<img slot="cover"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR00kA85xJ0C8R7i6lXIG09-VHGdDqh0YUy4A&s"
      alt="This is a synopsys design system card"
    />`
    ,
    slotHeader: `<div slot="header">
      Card header
    </div>
  `,
    slot: `<div class="card-body">
      <p>Make your own component</p>
    </div>`
    ,
    slotFooter: `<div slot="footer">
        <sy-button variant="primary">More Info</sy-button>
      </div>
    `,
  }, 
}

export const BasicCard: Story = {
  render: (args) => Card(args),
  args: {
    backdrop: false,
    slot: `<div class="card-body">
      <p>This is just a basic card. No cover, no header, and no footer. Just your content.</p>
    </div>
    `,
  },  
}

export const BasicRadiusCard: Story = {
  render: () => CardBorder(),
}


export const HeaderCard: Story = {
  render: (args) => Card(args),
  args: {
    backdrop: false,
    slot: `<div class="card-body">
        <p>This is a basic card with header.</p>
      </div>`
    ,
    slotHeader: `
     <div slot="header">
       <sy-flex align="center" direction="horizontal" width="100%" columngap="small" >
          <sy-flex align="center" direction="horizontal" width="100%" columngap="small" columngap="small" class="card-title">
            <sy-icon class="new-icon" size="medium"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"/></svg></sy-icon>
            <span sy-typography="" sytype="large-medium">Card Title</span>            
          </sy-flex>            
        </sy-flex>        
      </div>      
    `,
  },  
}

export const FooterCard: Story = {
  render: (args) => Card(args),
  args: {
    backdrop: false,
    slot: ` <div class="card-body"> 
        <p>This is just a basic card with button.</p>
      </div>
    `,
    slotFooter: `<div slot="footer">
        <sy-button variant="primary">More Info</sy-button>
      </div>
    `,
  },  
}

export const ComplexHeaderCard: Story = {
  render: () => ComplexHeader(),

}

/* export const RowCardStory: Story = {
  render: () => RowCard()
}
 */
export const CollapsibleCardStory: Story = {
  render: (args) => Card(args),
  args: {
    backdrop: false,
    collapsible: true,
    slotCover: `
    <img slot="cover"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR00kA85xJ0C8R7i6lXIG09-VHGdDqh0YUy4A&s"
      alt="This is a synopsys design system card"
    />`
    ,
    slot: `<div class="card-body" style="height:200px; overflow:auto;">
      <p>
        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.
        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. 
        Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
      </p>
    </div>`
    ,
    slotFooter: `<div slot="footer">
        <sy-button variant="borderless">Footer</sy-button>
      </div>
    `,
    slotHeader: `<div slot="header">
      <div class="card-title">
        <sy-flex align="center" direction="horizontal" width="100%" columngap="small" >
          <sy-flex align="center" direction="horizontal" width="100%" columngap="small" columngap="small" class="card-title">
            <sy-icon class="new-icon" size="medium"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"/></svg></sy-icon>
            <span sy-typography="" sytype="large-medium">Card Title</span>
          </sy-flex>            
        </sy-flex>        
      </div>
    </div>
    `,
  },  

}
