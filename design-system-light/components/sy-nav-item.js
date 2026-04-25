import { p as proxyCustomElement, H, h } from './index.js';

const syNavItemCss = ".sc-sy-nav-item:root,.sc-sy-nav-item-h{display:block;background-color:var(--nav-submenu-background-enabled)}.sc-sy-nav-item:root li.sc-sy-nav-item,.sc-sy-nav-item-h li.sc-sy-nav-item{cursor:pointer;list-style:none;height:40px;color:var(--nav-parent-text-enabled);padding:var(--spacing-xsmall) var(--spacing-large);border:var(--border-medium) transparent;box-sizing:border-box;background-color:var(--nav-submenu-background-enabled);display:inline-flex;align-items:center;width:100%}.sc-sy-nav-item:root li.sc-sy-nav-item:focus-visible,.sc-sy-nav-item-h li.sc-sy-nav-item:focus-visible{border:var(--border-medium) var(--nav-parent-border-focused) !important;outline:none !important}.sc-sy-nav-item:root li.active.sc-sy-nav-item,.sc-sy-nav-item-h li.active.sc-sy-nav-item{background:var(--nav-parent-background-active);color:var(--nav-parent-text-active);border-right:3px solid var(--nav-parent-border-active)}.sc-sy-nav-item:root li.sc-sy-nav-item:hover,.sc-sy-nav-item-h li.sc-sy-nav-item:hover{color:var(--nav-parent-text-hover)}.sc-sy-nav-item:root li[disabled].sc-sy-nav-item,.sc-sy-nav-item-h li[disabled].sc-sy-nav-item{cursor:auto;color:var(--nav-parent-text-disabled)}sy-nav-item[depth=\"0\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:20px}sy-nav-item[depth=\"0\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:30px}sy-nav-item[depth=\"1\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:40px}sy-nav-item[depth=\"1\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:50px}sy-nav-item[depth=\"2\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:40px}sy-nav-item[depth=\"2\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:60px}sy-nav-item[depth=\"3\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:60px}sy-nav-item[depth=\"3\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:80px}sy-nav-item[depth=\"4\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:80px}sy-nav-item[depth=\"4\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:100px}sy-nav-item[depth=\"5\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:100px}sy-nav-item[depth=\"5\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:120px}sy-nav-item[depth=\"6\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:120px}sy-nav-item[depth=\"6\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:140px}sy-nav-item[depth=\"7\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:140px}sy-nav-item[depth=\"7\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:160px}sy-nav-item[depth=\"8\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:160px}sy-nav-item[depth=\"8\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:180px}sy-nav-item[depth=\"9\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:180px}sy-nav-item[depth=\"9\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:200px}sy-nav-item[depth=\"10\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:200px}sy-nav-item[depth=\"10\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:220px}sy-nav-item[depth=\"11\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:220px}sy-nav-item[depth=\"11\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:240px}sy-nav-item[depth=\"12\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:240px}sy-nav-item[depth=\"12\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:260px}sy-nav-item[depth=\"13\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:260px}sy-nav-item[depth=\"13\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:280px}sy-nav-item[depth=\"14\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:280px}sy-nav-item[depth=\"14\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:300px}sy-nav-item[depth=\"15\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:300px}sy-nav-item[depth=\"15\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:320px}sy-nav-item[depth=\"16\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:320px}sy-nav-item[depth=\"16\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:340px}sy-nav-item[depth=\"17\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:340px}sy-nav-item[depth=\"17\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:360px}sy-nav-item[depth=\"18\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:360px}sy-nav-item[depth=\"18\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:380px}sy-nav-item[depth=\"19\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:380px}sy-nav-item[depth=\"19\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:400px}sy-nav-item[depth=\"20\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:400px}sy-nav-item[depth=\"20\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:420px}sy-nav-item[depth=\"21\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:420px}sy-nav-item[depth=\"21\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:440px}sy-nav-item[depth=\"22\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:440px}sy-nav-item[depth=\"22\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:460px}sy-nav-item[depth=\"23\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:460px}sy-nav-item[depth=\"23\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:480px}sy-nav-item[depth=\"24\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:480px}sy-nav-item[depth=\"24\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:500px}sy-nav-item[depth=\"25\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:500px}sy-nav-item[depth=\"25\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:520px}sy-nav-item[depth=\"26\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:520px}sy-nav-item[depth=\"26\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:540px}sy-nav-item[depth=\"27\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:540px}sy-nav-item[depth=\"27\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:560px}sy-nav-item[depth=\"28\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:560px}sy-nav-item[depth=\"28\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:580px}sy-nav-item[depth=\"29\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:580px}sy-nav-item[depth=\"29\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:600px}sy-nav-item[depth=\"30\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:600px}sy-nav-item[depth=\"30\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:620px}sy-nav-item[depth=\"31\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:620px}sy-nav-item[depth=\"31\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:640px}sy-nav-item[depth=\"32\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:640px}sy-nav-item[depth=\"32\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:660px}sy-nav-item[depth=\"33\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:660px}sy-nav-item[depth=\"33\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:680px}sy-nav-item[depth=\"34\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:680px}sy-nav-item[depth=\"34\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:700px}sy-nav-item[depth=\"35\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:700px}sy-nav-item[depth=\"35\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:720px}sy-nav-item[depth=\"36\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:720px}sy-nav-item[depth=\"36\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:740px}sy-nav-item[depth=\"37\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:740px}sy-nav-item[depth=\"37\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:760px}sy-nav-item[depth=\"38\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:760px}sy-nav-item[depth=\"38\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:780px}sy-nav-item[depth=\"39\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:780px}sy-nav-item[depth=\"39\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:800px}sy-nav-item[depth=\"40\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:800px}sy-nav-item[depth=\"40\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:820px}sy-nav-item[depth=\"41\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:820px}sy-nav-item[depth=\"41\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:840px}sy-nav-item[depth=\"42\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:840px}sy-nav-item[depth=\"42\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:860px}sy-nav-item[depth=\"43\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:860px}sy-nav-item[depth=\"43\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:880px}sy-nav-item[depth=\"44\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:880px}sy-nav-item[depth=\"44\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:900px}sy-nav-item[depth=\"45\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:900px}sy-nav-item[depth=\"45\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:920px}sy-nav-item[depth=\"46\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:920px}sy-nav-item[depth=\"46\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:940px}sy-nav-item[depth=\"47\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:940px}sy-nav-item[depth=\"47\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:960px}sy-nav-item[depth=\"48\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:960px}sy-nav-item[depth=\"48\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:980px}sy-nav-item[depth=\"49\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:980px}sy-nav-item[depth=\"49\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1000px}sy-nav-item[depth=\"50\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1000px}sy-nav-item[depth=\"50\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1020px}sy-nav-item[depth=\"51\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1020px}sy-nav-item[depth=\"51\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1040px}sy-nav-item[depth=\"52\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1040px}sy-nav-item[depth=\"52\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1060px}sy-nav-item[depth=\"53\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1060px}sy-nav-item[depth=\"53\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1080px}sy-nav-item[depth=\"54\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1080px}sy-nav-item[depth=\"54\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1100px}sy-nav-item[depth=\"55\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1100px}sy-nav-item[depth=\"55\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1120px}sy-nav-item[depth=\"56\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1120px}sy-nav-item[depth=\"56\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1140px}sy-nav-item[depth=\"57\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1140px}sy-nav-item[depth=\"57\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1160px}sy-nav-item[depth=\"58\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1160px}sy-nav-item[depth=\"58\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1180px}sy-nav-item[depth=\"59\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1180px}sy-nav-item[depth=\"59\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1200px}sy-nav-item[depth=\"60\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1200px}sy-nav-item[depth=\"60\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1220px}sy-nav-item[depth=\"61\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1220px}sy-nav-item[depth=\"61\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1240px}sy-nav-item[depth=\"62\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1240px}sy-nav-item[depth=\"62\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1260px}sy-nav-item[depth=\"63\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1260px}sy-nav-item[depth=\"63\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1280px}sy-nav-item[depth=\"64\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1280px}sy-nav-item[depth=\"64\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1300px}sy-nav-item[depth=\"65\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1300px}sy-nav-item[depth=\"65\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1320px}sy-nav-item[depth=\"66\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1320px}sy-nav-item[depth=\"66\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1340px}sy-nav-item[depth=\"67\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1340px}sy-nav-item[depth=\"67\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1360px}sy-nav-item[depth=\"68\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1360px}sy-nav-item[depth=\"68\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1380px}sy-nav-item[depth=\"69\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1380px}sy-nav-item[depth=\"69\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1400px}sy-nav-item[depth=\"70\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1400px}sy-nav-item[depth=\"70\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1420px}sy-nav-item[depth=\"71\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1420px}sy-nav-item[depth=\"71\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1440px}sy-nav-item[depth=\"72\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1440px}sy-nav-item[depth=\"72\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1460px}sy-nav-item[depth=\"73\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1460px}sy-nav-item[depth=\"73\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1480px}sy-nav-item[depth=\"74\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1480px}sy-nav-item[depth=\"74\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1500px}sy-nav-item[depth=\"75\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1500px}sy-nav-item[depth=\"75\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1520px}sy-nav-item[depth=\"76\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1520px}sy-nav-item[depth=\"76\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1540px}sy-nav-item[depth=\"77\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1540px}sy-nav-item[depth=\"77\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1560px}sy-nav-item[depth=\"78\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1560px}sy-nav-item[depth=\"78\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1580px}sy-nav-item[depth=\"79\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1580px}sy-nav-item[depth=\"79\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1600px}sy-nav-item[depth=\"80\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1600px}sy-nav-item[depth=\"80\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1620px}sy-nav-item[depth=\"81\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1620px}sy-nav-item[depth=\"81\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1640px}sy-nav-item[depth=\"82\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1640px}sy-nav-item[depth=\"82\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1660px}sy-nav-item[depth=\"83\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1660px}sy-nav-item[depth=\"83\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1680px}sy-nav-item[depth=\"84\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1680px}sy-nav-item[depth=\"84\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1700px}sy-nav-item[depth=\"85\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1700px}sy-nav-item[depth=\"85\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1720px}sy-nav-item[depth=\"86\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1720px}sy-nav-item[depth=\"86\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1740px}sy-nav-item[depth=\"87\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1740px}sy-nav-item[depth=\"87\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1760px}sy-nav-item[depth=\"88\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1760px}sy-nav-item[depth=\"88\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1780px}sy-nav-item[depth=\"89\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1780px}sy-nav-item[depth=\"89\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1800px}sy-nav-item[depth=\"90\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1800px}sy-nav-item[depth=\"90\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1820px}sy-nav-item[depth=\"91\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1820px}sy-nav-item[depth=\"91\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1840px}sy-nav-item[depth=\"92\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1840px}sy-nav-item[depth=\"92\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1860px}sy-nav-item[depth=\"93\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1860px}sy-nav-item[depth=\"93\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1880px}sy-nav-item[depth=\"94\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1880px}sy-nav-item[depth=\"94\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1900px}sy-nav-item[depth=\"95\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1900px}sy-nav-item[depth=\"95\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1920px}sy-nav-item[depth=\"96\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1920px}sy-nav-item[depth=\"96\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1940px}sy-nav-item[depth=\"97\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1940px}sy-nav-item[depth=\"97\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1960px}sy-nav-item[depth=\"98\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1960px}sy-nav-item[depth=\"98\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:1980px}sy-nav-item[depth=\"99\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:1980px}sy-nav-item[depth=\"99\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:2000px}sy-nav-item[depth=\"100\"].sc-sy-nav-item-h li.sc-sy-nav-item{padding-left:2000px}sy-nav-item[depth=\"100\"].sc-sy-nav-item-h li.group-list.sc-sy-nav-item{padding-left:2020px}";

const SyNavItem$1 = /*@__PURE__*/ proxyCustomElement(class SyNavItem extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get host() { return this; }
    value = '';
    disabled = false;
    depth = 0;
    active = false;
    isGroup = false;
    // @State() parentDisabled: boolean = false;
    sanitizedSlotContent = '';
    receiveDisabled = false;
    connectedCallback() {
        // Calculate depth based on parent element
        this.calculateDepth();
        if (this.disabled) {
            this.receiveDisabled = false;
        }
        else {
            this.receiveDisabled = true;
        }
    }
    componentWillLoad() {
        // initialize sanitized slot content before first render to avoid extra re-renders
        this.handleSlotChange();
    }
    async parentDisabled(disabled) {
        if (this.receiveDisabled) {
            this.disabled = disabled;
        }
    }
    async groupItem(group) {
        this.isGroup = group;
    }
    calculateDepth() {
        const parent = this.host.parentElement;
        if (!parent)
            return;
        const parentTagName = parent.tagName.toLowerCase();
        if (parentTagName === 'sy-nav') {
            this.depth = 0;
        }
        else if (parentTagName === 'sy-nav-sub') {
            const parentSub = parent;
            this.depth = (parentSub.depth || 0) + 1;
        }
        else if (parentTagName === 'sy-nav-group') {
            const parentGroup = parent;
            this.depth = parentGroup.depth || 0;
        }
    }
    sanitizeHtml(content) {
        if (!content)
            return '';
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        return tempDiv.innerText.trim();
    }
    handleSlotChange = () => {
        // Light DOM에서 slot content 추출
        const textContent = this.host.textContent || '';
        this.sanitizedSlotContent = this.sanitizeHtml(textContent);
    };
    async setActive(active) {
        this.active = active;
    }
    onClick = () => {
        if (this.disabled)
            return;
        this.active = true;
        const selectedEvent = new CustomEvent('selected', {
            detail: this.value,
            bubbles: true,
            composed: true,
        });
        this.host.dispatchEvent(selectedEvent);
    };
    render() {
        const classes = {
            'nav-item': true,
            'active': this.active,
            'group-list': this.isGroup,
            'disabled': this.disabled,
        };
        return (h("li", { key: 'd81ea49fb7952fcd0242ec0e946fd075d679d670', class: classes, tabIndex: this.disabled ? -1 : 0, title: this.sanitizedSlotContent, onClick: this.onClick }, h("slot", { key: '871a9567fa477a532c8f92caba8f8f43485000da', onSlotchange: this.handleSlotChange })));
    }
    static get style() { return syNavItemCss; }
}, [262, "sy-nav-item", {
        "value": [1],
        "disabled": [1540],
        "depth": [1538],
        "active": [32],
        "isGroup": [32],
        "sanitizedSlotContent": [32],
        "parentDisabled": [64],
        "groupItem": [64],
        "setActive": [64]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-nav-item"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-nav-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyNavItem$1);
            }
            break;
    } });
}

const SyNavItem = SyNavItem$1;
const defineCustomElement = defineCustomElement$1;

export { SyNavItem, defineCustomElement };
