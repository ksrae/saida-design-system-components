
import { Meta, StoryObj } from "@storybook/web-components";
import { clearElements } from '../../clear-element';
import { Datepicker, SyDatepickerProps } from './sy-datepicker.main';

const datepickerMeta: Meta<SyDatepickerProps> = {
    title: 'Datepicker/Overview',
    tags: ['false'],
    render: (args) => {
      clearElements(datepickerMeta.title);
      return Datepicker(args);
    },
    argTypes: {
			mode: {
				control: 'select',
				options: ['day', 'month', 'year'],
				description: 'The datepicker will show the selected date in the format of the mode. The default is day.',
				table: {
					category: 'Parameter',
					defaultValue: { summary: 'day' },
					type: { summary: "day | month | year" }

				},
			},
			variant: {
				control: 'select',
				options: ['date', 'datetime', 'range', 'time'],
				description: 'Date variant shows date only, datetime variant shows date and time, and range variant shows a range of dates. The default is date.',
				table: {
					category: 'Parameter',
					defaultValue: { summary: 'date' },
					type: { summary: "date | datetime | range | time" }

				},
			},
      disabled: {
        control: 'boolean',
        description: 'The datepicker will be disabled. The default is false.',
        table: {
          category: 'Parameter',
          defaultValue: {summary: false as any},
          type: { summary: 'boolean' }
        }
      },
      readonly: {
        control: 'boolean',
        description: 'The datepicker will be readonly. The default is false.',
        table: {
          category: 'Parameter',
          defaultValue: {summary: false as any},
          type: { summary: 'boolean' }
        }
      },
      year:{
        control: 'text',
        description: 'The year to be displayed. The default is the current year.',
        table: {
          category: 'Parameter',
          defaultValue: {summary: ``},
          type: { summary: 'string' }
        }
      },
			month:{
        control: 'text',
        description: 'The month to be displayed. The default is the current month.',
        table: {
          category: 'Parameter',
          defaultValue: {summary: ``},
          type: { summary: 'string' }
        }
      },
			day:{
        control: 'text',
        description: 'The day to be displayed. The default is the current day.',
        table: {
          category: 'Parameter',
          defaultValue: {summary: ``},
          type: { summary: 'string' }
        }
      },
			hour:{
        control: 'text',
        description: 'The hour to be displayed. Time property must be set true. The default is the current hour.',
        table: {
          category: 'Parameter',
          defaultValue: {summary: ``},
          type: { summary: 'string' }
        }
      },
			minute:{
        control: 'text',
        description: 'The minute to be displayed. Time property must be set true. The default is the current minute.',
        table: {
          category: 'Parameter',
          defaultValue: {summary: ``},
          type: { summary: 'string' }
        }
      },
			second:{
        control: 'text',
        description: 'The second to be displayed. Time property must be set true. The default is the current second.',
        table: {
          category: 'Parameter',
          defaultValue: {summary: ``},
          type: { summary: 'string' }
        }
      },
      dateNames: {
        control: 'text',
        description: 'The date names to be displayed. The default is the short english name.',
        table: {
          category: 'Parameter',
          defaultValue: {summary: `Su,Mo,Tu,We,Th,Fr,Sa`},
          type: { summary: 'string' }
        }
      },
      mondayStart: {
        control: 'boolean',
        name: 'mondayStart(monday-start)',
        description: 'The datepicker will start the week on Monday. The default is false.',
        table: {
          category: 'Parameter',
          defaultValue: {summary: false as any},
          type: { summary: 'boolean' }
        }
      },
      hideWeekend: {
        control: 'boolean',
        name: 'hideWeekend(hide-weekend)',
        description: 'The datepicker will hide the weekend. The default is false.',
        table: {
          category: 'Parameter',
          defaultValue: {summary: false as any},
          type: { summary: 'boolean' }
        }
      },
      placeholder: {
        control: 'text',
        description: 'The placeholder to be displayed. The default is current format.',
        table: {
          category: 'Parameter',
          defaultValue: {summary: ``},
          type: { summary: 'string' }
        }
      },
      format: {
        control: 'text',
        description: 'The format to be displayed. The default value is yyyy-MM-dd hh:mm:ss. yyyy for year, MM for month, dd for day, hh for hour, mm for minute, ss for second.',
        table: {
          category: 'Parameter',
          defaultValue: {summary: ``},
          type: { summary: 'string' }
        }
      },
      changed: {
        type: 'function',
        action: 'changed',
        description: 'Triggered when the changed event fires.',
        table: {
          category: 'Callback',
          type: {
            summary: `.addEventListener('changed', (e) => {})`,
          },
        }
      },
      selected: {
        type: 'function',
        action: 'selected',
        description: 'Triggered when the date is selected from calendar.',
        table: {
          category: 'Callback',
          type: {
            summary: `.addEventListener('selected', (e) => {})`,
          },
        }
      },
    },
  };

  export default datepickerMeta;
  type Story = StoryObj<SyDatepickerProps>;

  export const Default: Story = {
    args: {
			mode: 'day',
      variant: 'date',
      disabled: false,
      readonly: false,
			year: '',
			month: '',
			day: '',
			hour: '',
			minute: '',
			second: '',
			dateNames: 'Su,Mo,Tu,We,Th,Fr,Sa',
      mondayStart: false,
      hideWeekend: false,
      placeholder: '',
      format: '',
    }
  }
