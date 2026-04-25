import { p as proxyCustomElement, H, h } from './index.js';

const syNavGroupCss = ".sc-sy-nav-group:root,.sc-sy-nav-group-h{display:block;background-color:var(--nav-submenu-background-active)}.group-title.sc-sy-nav-group{color:var(--nav-submenu-text-enabled);padding:var(--spacing-xsmall) var(--spacing-xlarge);background-color:var(--nav-submenu-background-enabled);height:var(--component-large);box-sizing:border-box;display:flex;align-items:center;gap:var(--spacing-3xsmall)}sy-nav-group[depth=\"0\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding:var(--spacing-xsmall) var(--spacing-xlarge)}sy-nav-group[depth=\"0\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:20px}sy-nav-group[depth=\"1\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:30px}sy-nav-group[depth=\"2\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:50px}sy-nav-group[depth=\"3\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:70px}sy-nav-group[depth=\"4\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:90px}sy-nav-group[depth=\"5\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:110px}sy-nav-group[depth=\"6\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:130px}sy-nav-group[depth=\"7\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:150px}sy-nav-group[depth=\"8\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:170px}sy-nav-group[depth=\"9\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:190px}sy-nav-group[depth=\"10\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:210px}sy-nav-group[depth=\"11\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:230px}sy-nav-group[depth=\"12\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:250px}sy-nav-group[depth=\"13\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:270px}sy-nav-group[depth=\"14\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:290px}sy-nav-group[depth=\"15\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:310px}sy-nav-group[depth=\"16\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:330px}sy-nav-group[depth=\"17\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:350px}sy-nav-group[depth=\"18\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:370px}sy-nav-group[depth=\"19\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:390px}sy-nav-group[depth=\"20\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:410px}sy-nav-group[depth=\"21\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:430px}sy-nav-group[depth=\"22\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:450px}sy-nav-group[depth=\"23\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:470px}sy-nav-group[depth=\"24\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:490px}sy-nav-group[depth=\"25\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:510px}sy-nav-group[depth=\"26\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:530px}sy-nav-group[depth=\"27\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:550px}sy-nav-group[depth=\"28\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:570px}sy-nav-group[depth=\"29\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:590px}sy-nav-group[depth=\"30\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:610px}sy-nav-group[depth=\"31\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:630px}sy-nav-group[depth=\"32\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:650px}sy-nav-group[depth=\"33\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:670px}sy-nav-group[depth=\"34\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:690px}sy-nav-group[depth=\"35\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:710px}sy-nav-group[depth=\"36\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:730px}sy-nav-group[depth=\"37\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:750px}sy-nav-group[depth=\"38\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:770px}sy-nav-group[depth=\"39\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:790px}sy-nav-group[depth=\"40\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:810px}sy-nav-group[depth=\"41\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:830px}sy-nav-group[depth=\"42\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:850px}sy-nav-group[depth=\"43\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:870px}sy-nav-group[depth=\"44\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:890px}sy-nav-group[depth=\"45\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:910px}sy-nav-group[depth=\"46\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:930px}sy-nav-group[depth=\"47\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:950px}sy-nav-group[depth=\"48\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:970px}sy-nav-group[depth=\"49\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:990px}sy-nav-group[depth=\"50\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1010px}sy-nav-group[depth=\"51\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1030px}sy-nav-group[depth=\"52\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1050px}sy-nav-group[depth=\"53\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1070px}sy-nav-group[depth=\"54\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1090px}sy-nav-group[depth=\"55\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1110px}sy-nav-group[depth=\"56\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1130px}sy-nav-group[depth=\"57\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1150px}sy-nav-group[depth=\"58\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1170px}sy-nav-group[depth=\"59\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1190px}sy-nav-group[depth=\"60\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1210px}sy-nav-group[depth=\"61\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1230px}sy-nav-group[depth=\"62\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1250px}sy-nav-group[depth=\"63\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1270px}sy-nav-group[depth=\"64\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1290px}sy-nav-group[depth=\"65\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1310px}sy-nav-group[depth=\"66\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1330px}sy-nav-group[depth=\"67\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1350px}sy-nav-group[depth=\"68\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1370px}sy-nav-group[depth=\"69\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1390px}sy-nav-group[depth=\"70\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1410px}sy-nav-group[depth=\"71\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1430px}sy-nav-group[depth=\"72\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1450px}sy-nav-group[depth=\"73\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1470px}sy-nav-group[depth=\"74\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1490px}sy-nav-group[depth=\"75\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1510px}sy-nav-group[depth=\"76\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1530px}sy-nav-group[depth=\"77\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1550px}sy-nav-group[depth=\"78\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1570px}sy-nav-group[depth=\"79\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1590px}sy-nav-group[depth=\"80\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1610px}sy-nav-group[depth=\"81\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1630px}sy-nav-group[depth=\"82\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1650px}sy-nav-group[depth=\"83\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1670px}sy-nav-group[depth=\"84\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1690px}sy-nav-group[depth=\"85\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1710px}sy-nav-group[depth=\"86\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1730px}sy-nav-group[depth=\"87\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1750px}sy-nav-group[depth=\"88\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1770px}sy-nav-group[depth=\"89\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1790px}sy-nav-group[depth=\"90\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1810px}sy-nav-group[depth=\"91\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1830px}sy-nav-group[depth=\"92\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1850px}sy-nav-group[depth=\"93\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1870px}sy-nav-group[depth=\"94\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1890px}sy-nav-group[depth=\"95\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1910px}sy-nav-group[depth=\"96\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1930px}sy-nav-group[depth=\"97\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1950px}sy-nav-group[depth=\"98\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1970px}sy-nav-group[depth=\"99\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:1990px}sy-nav-group[depth=\"100\"].sc-sy-nav-group-h .group-title.sc-sy-nav-group{padding-left:2010px}";

const SyNavGroup$1 = /*@__PURE__*/ proxyCustomElement(class SyNavGroup extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
    }
    get host() { return this; }
    navGroupTitle = '';
    depth = 0;
    connectedCallback() {
        this.calculateDepth();
    }
    componentDidLoad() {
        this.updateChildComponents();
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
            this.depth = (parentGroup.depth || 0) + 1;
        }
    }
    updateChildComponents() {
        const navItems = this.host.querySelectorAll('sy-nav-item');
        if (navItems.length > 0) {
            navItems.forEach((item) => {
                item.groupItem(true);
            });
        }
        const navSubs = this.host.querySelectorAll('sy-nav-sub');
        if (navSubs.length > 0) {
            navSubs.forEach((sub) => {
                sub.groupItem(true);
            });
        }
    }
    sanitizeHtml(content) {
        if (!content)
            return '';
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        return tempDiv.innerText.trim();
    }
    render() {
        const safeTitle = this.sanitizeHtml(this.navGroupTitle);
        return (h("div", { key: 'af519ea5b0b2e0c64bafbde382b27b6a1bfba2a0' }, h("div", { key: '802962b98b20ef4ecedf6e30e5d6ab3221fbfd85', class: "group-title", title: safeTitle }, h("span", { key: '180e2a085e33d5e22ac6c54fb846610c4eab88ca' }, safeTitle)), h("div", { key: '7a0a76dd4ffa701db9a5a328d0620d8e7b4c9de4', class: "group-content" }, h("slot", { key: 'c4fffc8766203c41148090e69681f7584e402e12' }))));
    }
    static get style() { return syNavGroupCss; }
}, [262, "sy-nav-group", {
        "navGroupTitle": [1, "title"],
        "depth": [1538]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sy-nav-group"];
    components.forEach(tagName => { switch (tagName) {
        case "sy-nav-group":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SyNavGroup$1);
            }
            break;
    } });
}

const SyNavGroup = SyNavGroup$1;
const defineCustomElement = defineCustomElement$1;

export { SyNavGroup, defineCustomElement };
