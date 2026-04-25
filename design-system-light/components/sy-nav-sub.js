import { p as proxyCustomElement, H, h } from './index.js';
import { d as defineCustomElement$2 } from './p-DA_POXvZ.js';

const syNavSubCss = ".sc-sy-nav-sub:root,.sc-sy-nav-sub-h{display:block;position:relative;background-color:var(--nav-submenu-background-enabled)}.submenu.sc-sy-nav-sub{display:none;list-style-type:none;padding:0;margin:0;z-index:1;background-color:var(--nav-submenu-background-active)}.submenu.open.sc-sy-nav-sub{display:block}.submenu-title.sc-sy-nav-sub{display:flex;padding:var(--spacing-xsmall) var(--spacing-large);align-items:center;cursor:pointer;background-color:var(--nav-submenu-background-enabled);border:var(--border-medium) transparent;height:40px;box-sizing:border-box}.submenu-title.sc-sy-nav-sub .title.sc-sy-nav-sub{display:flex;align-items:center;gap:var(--spacing-3xsmall)}.submenu-title.sc-sy-nav-sub:focus-visible{border:var(--border-medium) var(--nav-parent-border-focused) !important;outline:none !important}.submenu-title.sc-sy-nav-sub .toggle-icon.sc-sy-nav-sub{position:absolute;right:var(--spacing-large);top:var(--spacing-small);width:16px;height:16px;display:flex;align-items:center;justify-content:center;box-sizing:border-box}.submenu-title.sc-sy-nav-sub .toggle-icon.sc-sy-nav-sub svg.sc-sy-nav-sub{width:100%;height:100%;fill:currentColor}.submenu-title.sc-sy-nav-sub:hover{color:var(--nav-parent-text-hover)}[disabled].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{cursor:auto;color:var(--nav-parent-text-disabled)}sy-nav-sub[depth=\"0\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:20px}sy-nav-sub[depth=\"1\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:40px}sy-nav-sub[depth=\"2\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:40px}sy-nav-sub[depth=\"2\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:60px}sy-nav-sub[depth=\"3\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:60px}sy-nav-sub[depth=\"3\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:80px}sy-nav-sub[depth=\"4\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:80px}sy-nav-sub[depth=\"4\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:100px}sy-nav-sub[depth=\"5\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:100px}sy-nav-sub[depth=\"5\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:120px}sy-nav-sub[depth=\"6\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:120px}sy-nav-sub[depth=\"6\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:140px}sy-nav-sub[depth=\"7\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:140px}sy-nav-sub[depth=\"7\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:160px}sy-nav-sub[depth=\"8\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:160px}sy-nav-sub[depth=\"8\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:180px}sy-nav-sub[depth=\"9\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:180px}sy-nav-sub[depth=\"9\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:200px}sy-nav-sub[depth=\"10\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:200px}sy-nav-sub[depth=\"10\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:220px}sy-nav-sub[depth=\"11\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:220px}sy-nav-sub[depth=\"11\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:240px}sy-nav-sub[depth=\"12\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:240px}sy-nav-sub[depth=\"12\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:260px}sy-nav-sub[depth=\"13\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:260px}sy-nav-sub[depth=\"13\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:280px}sy-nav-sub[depth=\"14\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:280px}sy-nav-sub[depth=\"14\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:300px}sy-nav-sub[depth=\"15\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:300px}sy-nav-sub[depth=\"15\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:320px}sy-nav-sub[depth=\"16\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:320px}sy-nav-sub[depth=\"16\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:340px}sy-nav-sub[depth=\"17\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:340px}sy-nav-sub[depth=\"17\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:360px}sy-nav-sub[depth=\"18\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:360px}sy-nav-sub[depth=\"18\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:380px}sy-nav-sub[depth=\"19\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:380px}sy-nav-sub[depth=\"19\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:400px}sy-nav-sub[depth=\"20\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:400px}sy-nav-sub[depth=\"20\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:420px}sy-nav-sub[depth=\"21\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:420px}sy-nav-sub[depth=\"21\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:440px}sy-nav-sub[depth=\"22\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:440px}sy-nav-sub[depth=\"22\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:460px}sy-nav-sub[depth=\"23\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:460px}sy-nav-sub[depth=\"23\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:480px}sy-nav-sub[depth=\"24\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:480px}sy-nav-sub[depth=\"24\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:500px}sy-nav-sub[depth=\"25\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:500px}sy-nav-sub[depth=\"25\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:520px}sy-nav-sub[depth=\"26\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:520px}sy-nav-sub[depth=\"26\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:540px}sy-nav-sub[depth=\"27\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:540px}sy-nav-sub[depth=\"27\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:560px}sy-nav-sub[depth=\"28\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:560px}sy-nav-sub[depth=\"28\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:580px}sy-nav-sub[depth=\"29\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:580px}sy-nav-sub[depth=\"29\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:600px}sy-nav-sub[depth=\"30\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:600px}sy-nav-sub[depth=\"30\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:620px}sy-nav-sub[depth=\"31\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:620px}sy-nav-sub[depth=\"31\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:640px}sy-nav-sub[depth=\"32\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:640px}sy-nav-sub[depth=\"32\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:660px}sy-nav-sub[depth=\"33\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:660px}sy-nav-sub[depth=\"33\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:680px}sy-nav-sub[depth=\"34\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:680px}sy-nav-sub[depth=\"34\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:700px}sy-nav-sub[depth=\"35\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:700px}sy-nav-sub[depth=\"35\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:720px}sy-nav-sub[depth=\"36\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:720px}sy-nav-sub[depth=\"36\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:740px}sy-nav-sub[depth=\"37\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:740px}sy-nav-sub[depth=\"37\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:760px}sy-nav-sub[depth=\"38\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:760px}sy-nav-sub[depth=\"38\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:780px}sy-nav-sub[depth=\"39\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:780px}sy-nav-sub[depth=\"39\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:800px}sy-nav-sub[depth=\"40\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:800px}sy-nav-sub[depth=\"40\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:820px}sy-nav-sub[depth=\"41\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:820px}sy-nav-sub[depth=\"41\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:840px}sy-nav-sub[depth=\"42\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:840px}sy-nav-sub[depth=\"42\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:860px}sy-nav-sub[depth=\"43\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:860px}sy-nav-sub[depth=\"43\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:880px}sy-nav-sub[depth=\"44\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:880px}sy-nav-sub[depth=\"44\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:900px}sy-nav-sub[depth=\"45\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:900px}sy-nav-sub[depth=\"45\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:920px}sy-nav-sub[depth=\"46\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:920px}sy-nav-sub[depth=\"46\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:940px}sy-nav-sub[depth=\"47\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:940px}sy-nav-sub[depth=\"47\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:960px}sy-nav-sub[depth=\"48\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:960px}sy-nav-sub[depth=\"48\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:980px}sy-nav-sub[depth=\"49\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:980px}sy-nav-sub[depth=\"49\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1000px}sy-nav-sub[depth=\"50\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1000px}sy-nav-sub[depth=\"50\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1020px}sy-nav-sub[depth=\"51\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1020px}sy-nav-sub[depth=\"51\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1040px}sy-nav-sub[depth=\"52\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1040px}sy-nav-sub[depth=\"52\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1060px}sy-nav-sub[depth=\"53\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1060px}sy-nav-sub[depth=\"53\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1080px}sy-nav-sub[depth=\"54\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1080px}sy-nav-sub[depth=\"54\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1100px}sy-nav-sub[depth=\"55\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1100px}sy-nav-sub[depth=\"55\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1120px}sy-nav-sub[depth=\"56\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1120px}sy-nav-sub[depth=\"56\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1140px}sy-nav-sub[depth=\"57\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1140px}sy-nav-sub[depth=\"57\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1160px}sy-nav-sub[depth=\"58\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1160px}sy-nav-sub[depth=\"58\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1180px}sy-nav-sub[depth=\"59\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1180px}sy-nav-sub[depth=\"59\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1200px}sy-nav-sub[depth=\"60\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1200px}sy-nav-sub[depth=\"60\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1220px}sy-nav-sub[depth=\"61\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1220px}sy-nav-sub[depth=\"61\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1240px}sy-nav-sub[depth=\"62\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1240px}sy-nav-sub[depth=\"62\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1260px}sy-nav-sub[depth=\"63\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1260px}sy-nav-sub[depth=\"63\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1280px}sy-nav-sub[depth=\"64\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1280px}sy-nav-sub[depth=\"64\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1300px}sy-nav-sub[depth=\"65\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1300px}sy-nav-sub[depth=\"65\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1320px}sy-nav-sub[depth=\"66\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1320px}sy-nav-sub[depth=\"66\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1340px}sy-nav-sub[depth=\"67\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1340px}sy-nav-sub[depth=\"67\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1360px}sy-nav-sub[depth=\"68\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1360px}sy-nav-sub[depth=\"68\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1380px}sy-nav-sub[depth=\"69\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1380px}sy-nav-sub[depth=\"69\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1400px}sy-nav-sub[depth=\"70\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1400px}sy-nav-sub[depth=\"70\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1420px}sy-nav-sub[depth=\"71\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1420px}sy-nav-sub[depth=\"71\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1440px}sy-nav-sub[depth=\"72\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1440px}sy-nav-sub[depth=\"72\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1460px}sy-nav-sub[depth=\"73\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1460px}sy-nav-sub[depth=\"73\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1480px}sy-nav-sub[depth=\"74\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1480px}sy-nav-sub[depth=\"74\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1500px}sy-nav-sub[depth=\"75\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1500px}sy-nav-sub[depth=\"75\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1520px}sy-nav-sub[depth=\"76\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1520px}sy-nav-sub[depth=\"76\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1540px}sy-nav-sub[depth=\"77\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1540px}sy-nav-sub[depth=\"77\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1560px}sy-nav-sub[depth=\"78\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1560px}sy-nav-sub[depth=\"78\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1580px}sy-nav-sub[depth=\"79\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1580px}sy-nav-sub[depth=\"79\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1600px}sy-nav-sub[depth=\"80\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1600px}sy-nav-sub[depth=\"80\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1620px}sy-nav-sub[depth=\"81\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1620px}sy-nav-sub[depth=\"81\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1640px}sy-nav-sub[depth=\"82\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1640px}sy-nav-sub[depth=\"82\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1660px}sy-nav-sub[depth=\"83\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1660px}sy-nav-sub[depth=\"83\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1680px}sy-nav-sub[depth=\"84\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1680px}sy-nav-sub[depth=\"84\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1700px}sy-nav-sub[depth=\"85\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1700px}sy-nav-sub[depth=\"85\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1720px}sy-nav-sub[depth=\"86\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1720px}sy-nav-sub[depth=\"86\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1740px}sy-nav-sub[depth=\"87\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1740px}sy-nav-sub[depth=\"87\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1760px}sy-nav-sub[depth=\"88\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1760px}sy-nav-sub[depth=\"88\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1780px}sy-nav-sub[depth=\"89\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1780px}sy-nav-sub[depth=\"89\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1800px}sy-nav-sub[depth=\"90\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1800px}sy-nav-sub[depth=\"90\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1820px}sy-nav-sub[depth=\"91\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1820px}sy-nav-sub[depth=\"91\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1840px}sy-nav-sub[depth=\"92\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1840px}sy-nav-sub[depth=\"92\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1860px}sy-nav-sub[depth=\"93\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1860px}sy-nav-sub[depth=\"93\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1880px}sy-nav-sub[depth=\"94\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1880px}sy-nav-sub[depth=\"94\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1900px}sy-nav-sub[depth=\"95\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1900px}sy-nav-sub[depth=\"95\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1920px}sy-nav-sub[depth=\"96\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1920px}sy-nav-sub[depth=\"96\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1940px}sy-nav-sub[depth=\"97\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1940px}sy-nav-sub[depth=\"97\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1960px}sy-nav-sub[depth=\"98\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1960px}sy-nav-sub[depth=\"98\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:1980px}sy-nav-sub[depth=\"99\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:1980px}sy-nav-sub[depth=\"99\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:2000px}sy-nav-sub[depth=\"100\"].sc-sy-nav-sub-h .submenu-title.sc-sy-nav-sub{padding-left:2000px}sy-nav-sub[depth=\"100\"].sc-sy-nav-sub-h .submenu-title.group-list.sc-sy-nav-sub{padding-left:2020px}";

const SUBNAV = 'SY-NAV-SUB';
const GROUPNAV = 'SY-NAV-GROUP';
const NAVITEM = 'SY-NAV-ITEM';
const SyNavSub$1 = /*@__PURE__*/ proxyCustomElement(class SyNavSub extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get host() { return this; }
    navSubTitle = '';
    value = '';
    open = false;
    disabled = false;
    depth = 0;
    active = false;
    trigger = 'click';
    isGroup = false;
    receiveDisabled = false;
    hasChild = false;
    keydownHandler;
    connectedCallback() {
        this.calculateDepth();
        this.updateTrigger();
        if (this.disabled) {
            this.receiveDisabled = false;
        }
        else {
            this.receiveDisabled = true;
        }
        // Handle enter key down event
        this.keydownHandler = this.handleKeydown.bind(this);
        this.host.addEventListener('keydown', this.keydownHandler);
    }
    componentDidLoad() {
        this.handleSlotChange();
        this.sendDisabled();
    }
    disconnectedCallback() {
        if (this.trigger === 'hover') {
            this.host.removeEventListener('mouseenter', this.openOnMouseEnter);
            this.host.removeEventListener('mouseleave', this.closeOnMouseLeave);
        }
        if (this.keydownHandler) {
            this.host.removeEventListener('keydown', this.keydownHandler);
        }
    }
    watchTrigger() {
        this.updateTrigger();
    }
    watchDisabled() {
        this.sendDisabled();
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
    sendDisabled() {
        const elements = this.host.querySelectorAll('sy-nav-sub, sy-nav-item');
        elements.forEach((element) => {
            if (element.tagName.toUpperCase() === 'SY-NAV-SUB') {
                element.parentDisabled(this.disabled);
            }
            else if (element.tagName.toUpperCase() === 'SY-NAV-ITEM') {
                element.parentDisabled(this.disabled);
            }
        });
    }
    updateTrigger() {
        if (this.trigger === 'hover') {
            this.host.addEventListener('mouseenter', this.openOnMouseEnter);
            this.host.addEventListener('mouseleave', this.closeOnMouseLeave);
        }
        else {
            this.host.removeEventListener('mouseenter', this.openOnMouseEnter);
            this.host.removeEventListener('mouseleave', this.closeOnMouseLeave);
        }
    }
    async setTrigger() {
        if (this.open) {
            this.setClose();
        }
        else {
            this.setOpen();
        }
    }
    async setOpen() {
        if (this.disabled)
            return;
        this.open = true;
        this.active = true;
        this.eventEmitter();
    }
    async setClose() {
        if (this.disabled)
            return;
        const children = Array.from(this.host.children);
        children?.forEach(child => {
            if (child.tagName.toUpperCase() === SUBNAV) {
                const childSub = child;
                childSub.setClose?.();
            }
        });
        this.open = false;
        this.active = true;
        this.eventEmitter();
    }
    sanitizeHtml(content) {
        if (!content)
            return '';
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        return tempDiv.innerText.trim();
    }
    toggleOnClick = () => {
        if (this.trigger === 'click') {
            this.setTrigger();
        }
    };
    openOnMouseEnter = () => {
        if (this.trigger !== 'click') {
            this.setOpen();
        }
    };
    closeOnMouseLeave = () => {
        if (this.trigger !== 'click') {
            this.setClose();
        }
    };
    handleKeydown(e) {
        e.stopPropagation();
        if (e.code === 'Enter' && e.target === this.host) {
            if (this.open) {
                this.setClose();
            }
            else {
                this.setOpen();
            }
        }
    }
    handleSlotChange = () => {
        const children = Array.from(this.host.children).filter(child => {
            const tagName = child.tagName.toUpperCase();
            return tagName === SUBNAV || tagName === NAVITEM || tagName === GROUPNAV;
        });
        this.hasChild = children && children.length > 0;
    };
    async setActive(active) {
        this.active = active;
    }
    eventEmitter() {
        if (this.value) {
            const selectedEvent = new CustomEvent('selected', {
                detail: this.value,
                bubbles: true,
                composed: true,
            });
            this.host.dispatchEvent(selectedEvent);
        }
    }
    render() {
        const toggleIconSvg = this.hasChild ?
            (this.open ?
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M303.5 207C312.9 197.6 328.1 197.6 337.4 207L497.4 367C506.8 376.4 506.8 391.6 497.4 400.9C488 410.2 472.8 410.3 463.5 400.9L320.5 257.9L177.5 400.9C168.1 410.3 152.9 410.3 143.6 400.9C134.3 391.5 134.2 376.3 143.6 367L303.6 207z"></path></svg>` :
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M337.5 433C328.1 442.4 312.9 442.4 303.6 433L143.5 273C134.1 263.6 134.1 248.4 143.5 239.1C152.9 229.8 168.1 229.7 177.4 239.1L320.4 382.1L463.4 239.1C472.8 229.7 488 229.7 497.3 239.1C506.6 248.5 506.7 263.7 497.3 273L337.3 433z"></path></svg>`) : '';
        const safeTitle = this.sanitizeHtml(this.navSubTitle);
        const titleClasses = {
            'submenu-title': true,
            'active': this.active,
            'open': this.open && this.hasChild,
            'close': !this.open && this.hasChild,
            'group-list': this.isGroup,
        };
        const submenuClasses = {
            'submenu': true,
            'open': this.open,
        };
        return (h("div", { key: 'a7ee9c8a773bb1bd3f7988e94d54bdd7a3eaaf93' }, h("div", { key: 'fccaccef246ec64e1d3949003c6ff8fa4c9f7779', class: titleClasses, tabIndex: 0, title: safeTitle, onClick: this.toggleOnClick }, h("span", { key: '29ee47718c42e4854aa8f3459d40ee8f487fbe13', class: "title" }, safeTitle), toggleIconSvg && (h("span", { key: '64966b0f9e365b38b255e73cf8a8756fa9870123', class: "toggle-icon" }, h("sy-icon", { key: '3a935bb53dfe387b4468e1578c7da0d023c04993', svgMarkup: toggleIconSvg })))), h("ul", { key: '3176be67f2e14717ed7207f047b3295af62ccc8e', class: submenuClasses }, h("slot", { key: '592f0bea67e4ba554358da1c25cf1c8cf9623ac3', onSlotchange: this.handleSlotChange }))));
    }
    static get watchers() { return {
        "trigger": ["watchTrigger"],
        "disabled": ["watchDisabled"]
    }; }
    static get style() { return syNavSubCss; }
}, [262, "sy-nav-sub", {
        "navSubTitle": [1, "title"],
        "value": [1],
        "open": [1028],
        "disabled": [1540],
        "depth": [1538],
        "active": [32],
        "trigger": [32],
        "isGroup": [32],
        "parentDisabled": [64],
        "groupItem": [64],
        "setTrigger": [64],
        "setOpen": [64],
        "setClose": [64],
        "setActive": [64]
    }, undefined, {
        "trigger": ["watchTrigger"],
        "disabled": ["watchDisabled"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-nav-sub", "sy-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-nav-sub":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyNavSub$1);
            }
            break;
        case "sy-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const SyNavSub = SyNavSub$1;
const defineCustomElement = defineCustomElement$1;

export { SyNavSub, defineCustomElement };
