import { h } from '@stencil/core';

export const eChartColorTokenTable = (theme: string, tokenLists: any) => {
  // 초기 렌더링을 위한 값
  const preloadedValues: Record<string, string> = {};
  const eChartTheme = theme === 'sy-theme-light' ? 'echarts-light' : 'echarts-dark';

  try {
    let themeElement: HTMLElement | null = document.querySelector(`.${eChartTheme}`);
    // 테마 요소가 없으면 임시 생성
    let tempCreated = false;
    if (!themeElement) {
      themeElement = document.createElement('div');
      themeElement.className = eChartTheme;
      document.body.appendChild(themeElement);
      tempCreated = true;
    }

    const themeStyles = getComputedStyle(themeElement);

    Object.entries(tokenLists).forEach(([_category, tokens]) => {
      if (Array.isArray(tokens)) {
        (tokens as string[]).forEach((token: string) => {
          let value = themeStyles.getPropertyValue(token);
          preloadedValues[token] = value || '';
        });
      }
    });

    // 임시 요소 제거
    if (tempCreated && themeElement.parentNode) {
      document.body.removeChild(themeElement);
    }
  } catch (e) {
    console.log('초기 스타일 계산 오류:', e);
  }

  setTimeout(() => {
    const copyIcons = document.querySelectorAll('.copy-icon');
    copyIcons.forEach(icon => {
      icon.addEventListener('click', () => {
        const cell = icon.parentElement;
        if (!cell) return;

        let tokenName = '';
        for (const node of Array.from(cell.childNodes)) {
          if (node.nodeType === Node.TEXT_NODE && node.textContent && node.textContent.trim()) {
            tokenName = node.textContent.trim();
            break;
          }
        }

        if (tokenName) {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(tokenName);
          } else {
            const tempElem = document.createElement("textarea");
            tempElem.value = tokenName;
            document.body.appendChild(tempElem);
            tempElem.select();
            document.execCommand("copy");
            document.body.removeChild(tempElem);
          }
        }
      });
    });
  }, 100);

  return (
    <div>
      <style>{`
        table {
          border-collapse: collapse;
          margin: 25px 0;
          font-size: 1em;
          width: 100%;
        }

        table thead tr {
          background-color: #ffffff;
          color: #000000;
          text-align: left;
        }

        th,td {
          border: none !important;
          border-bottom: 1px solid #ddd !important;
          padding: 12px 15px !important;
        }

        tbody tr {
          border-bottom: 1px solid #dddddd;
        }

        sy-icon:hover {
          color: var(--background-brand-bolder);
        }
      `}</style>

      <div class={eChartTheme} style={{ boxShadow: 'none' }}>
        <table part="tb">
          <thead>
            <tr class="header" part="htr">
              <th part="hth hth0" style={{ width: '30%' }}>Category</th>
              <th part="hth hth1" style={{ width: '30%' }}>Token</th>
              <th part="hth hth2" style={{ width: '20%' }}>Preview</th>
              <th part="hth hth3" style={{ width: '20%' }}>Value</th>
            </tr>
          </thead>
          <tbody id="main-area">
            {Object.entries(tokenLists || {}).map(([category, tokens]) => {
              const tokenArray = tokens as string[];
              return tokenArray.map((token: string, index: number) => {
                let colorValue = preloadedValues[token] || '';
                return (
                  <tr part="btr" key={`${category}-${index}`}>
                    {index === 0 && (
                      <td part="btd" rowSpan={tokenArray.length}>{category}</td>
                    )}
                    <td part="btd">
                      {token}
                      <sy-icon selectable class="copy-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                          <path fill="currentColor" d="M352 112L352 184C352 223.8 384.2 256 424 256L496 256L496 448C496 456.8 488.8 464 480 464L256 464C247.2 464 240 456.8 240 448L240 128C240 119.2 247.2 112 256 112L352 112zM400 115.9L492.1 208L424 208C410.7 208 400 197.3 400 184L400 115.9zM256 64C220.7 64 192 92.7 192 128L192 448C192 483.3 220.7 512 256 512L480 512C515.3 512 544 483.3 544 448L544 211.9C544 199.2 538.9 187 529.9 178L430.1 78.1C421.1 69.1 408.9 64 396.2 64L256 64zM120 160C106.7 160 96 170.7 96 184L96 544C96 579.3 124.7 608 160 608L424 608C437.3 608 448 597.3 448 584C448 570.7 437.3 560 424 560L160 560C151.2 560 144 552.8 144 544L144 184C144 170.7 133.3 160 120 160z"/>
                        </svg>
                        <sy-tooltip content="copy to clipboard"></sy-tooltip>
                      </sy-icon>
                    </td>
                    <td part="btd">
                      <div style={{ backgroundColor: `var(${token})`, width: '100%', height: '50px', border: '1px solid #eee' }}></div>
                    </td>
                    <td part="btd">{colorValue}</td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
