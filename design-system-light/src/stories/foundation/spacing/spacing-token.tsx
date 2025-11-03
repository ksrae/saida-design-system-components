import { h } from '@stencil/core';

export const spacingTokenTable = (theme: string, tokenLists: string[]) => {
  const sheet = document.getElementsByClassName(theme)[0] as HTMLElement;
  const rootStyles = getComputedStyle(sheet);

  const handleCopyClick = (e: Event, token: string) => {
    e.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(token);
    }
  };

  return (
    <div>
      <style>
        {`
          table {
            border-collapse: collapse;
            width: 100%;
          }

          table thead tr {
            background-color: #ffffff;
            color: #000000;
            text-align: left;
          }

          th, td {
            border: none !important;
            padding: 12px 12px !important;
          }

          tbody tr {
            border-bottom: 1px solid #8686862b;
          }

          sy-icon:hover {
            color: var(--background-brand-bolder);
          }
        `}
      </style>

      <table part="tb">
        <thead>
          <tr class="header" part="htr">
            <th part="hth">Token</th>
            <th part="hth">Preview</th>
            <th part="hth">Value</th>
          </tr>
        </thead>
        <tbody id="main-area">
          {tokenLists.map(token => {
            const tokenValue = rootStyles.getPropertyValue(token);
            return (
              <tr part="btr">
                <td part="btd">
                  {token}
                  <sy-icon 
                    selectable 
                    class="copy-icon"
                    onClick={(e) => handleCopyClick(e, token)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                      <path fill="currentColor" d="M352 112L352 184C352 223.8 384.2 256 424 256L496 256L496 448C496 456.8 488.8 464 480 464L256 464C247.2 464 240 456.8 240 448L240 128C240 119.2 247.2 112 256 112L352 112zM400 115.9L492.1 208L424 208C410.7 208 400 197.3 400 184L400 115.9zM256 64C220.7 64 192 92.7 192 128L192 448C192 483.3 220.7 512 256 512L480 512C515.3 512 544 483.3 544 448L544 211.9C544 199.2 538.9 187 529.9 178L430.1 78.1C421.1 69.1 408.9 64 396.2 64L256 64zM120 160C106.7 160 96 170.7 96 184L96 544C96 579.3 124.7 608 160 608L424 608C437.3 608 448 597.3 448 584C448 570.7 437.3 560 424 560L160 560C151.2 560 144 552.8 144 544L144 184C144 170.7 133.3 160 120 160z"/>
                    </svg>
                    <sy-tooltip content="copy to clipboard"></sy-tooltip>
                  </sy-icon>
                </td>
                <td part="btd" style={{ width: '30%' }}>
                  <div style={{ 
                    backgroundColor: 'var(--background-brand-bolder)', 
                    width: `var(${token})`, 
                    height: '50px' 
                  }}></div>
                </td>
                <td part="btd">{tokenValue}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};