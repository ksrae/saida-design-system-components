let currentPageName = '';

function setPageName(pageName) {
  if (currentPageName !== pageName) {
    currentPageName = pageName;
    return true;
  }
  return false;
}

export const clearElements = (pageName) => {
  const isClear = setPageName(pageName);

  if (isClear) {
    removeBanner();
    removeDrawer();
    removeInlineMessage();
    removeMenus();
    removeModal();
    removeModelessGroup();
    removeModeless();
    removePopconfirm();
    removePopover();
    removeTooltip();
    removeTreeSelect();
    removeColorPicker();
  }
}

const removeBanner = () => {
  // Matches the corrected tag + the legacy typo for backwards compat.
  const data = document.querySelectorAll('sy-banner-message, sy-banner-messsage');
  data.forEach(item => {
    if (item && item.parentNode) {
      item.parentNode.removeChild(item);
    }
  });
};

const removeDrawer = () => {
  const item = document.querySelector('sy-drawer');
  if (item && item.parentNode) {
    item.parentNode.removeChild(item);
  }
};

const removeMenus = () => {
  const data = document.querySelectorAll('sy-menu');
  data.forEach(item => {
    if (item && item.parentNode) {
      item.parentNode.removeChild(item);
    }
  });
};

const removePopover = () => {
  const data = document.querySelectorAll('sy-popover');
  data.forEach(item => {
    if (item && item.parentNode) {
      item.parentNode.removeChild(item);
    }
  });
};

const removePopconfirm = () => {
  const data = document.querySelectorAll('sy-popconfirm');
  data.forEach(item => {
    if (item && item.parentNode) {
      item.parentNode.removeChild(item);
    }
  });
};

const removeModal = () => {
  const data = document.querySelectorAll('sy-modal');
  data.forEach(item => {
    item.setClose();
  });
};

const removeModelessGroup = () => {
  const item = document.querySelector('sy-modeless-group');
  if (item) {
    item.closeAll();
    item.remove();
  }
};

const removeModeless = () => {
  const data = document.querySelectorAll('sy-modeless');
  data.forEach(item => {
    item.setClose();
  });
};

const removeInlineMessage = () => {
  const data = document.querySelectorAll('sy-inline-message');
  data.forEach(item => {
    if (item && item.parentNode) {
      item.parentNode.removeChild(item);
    }
  });
};


const removeTooltip = () => {
  const data = document.querySelectorAll('sy-tooltip');
  data.forEach(item => {
    if (item && item.parentNode) {
      item.parentNode.removeChild(item);
    }
  });
};

const removeTreeSelect = () => {
  const item = document.querySelector('.sy-tree-select-option-container');
  if (item && item.parentNode) {
    item.parentNode.removeChild(item);
  }
};

const removeColorPicker = () => {
  const item = document.querySelector('.sy-colorpicker');
  if (item && item.parentNode) {
    item.parentNode.removeChild(item);
  }
};
