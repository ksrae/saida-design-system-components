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

  removeMenus();

  if (isClear) {
    removeBanner();
    removeDrawer();
    removeInlineMessage();
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
  const data = Array.from(document.body.children).filter(
    item => item.tagName && item.tagName.toLowerCase() === 'sy-menu'
  );
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
    // setClose() only sets open=false (which hides via CSS) but leaves the
    // host element in document.body, so subsequent stories see ghost modeless
    // elements piling up. Remove the element after closing.
    try { item.setClose && item.setClose(); } catch (_) { /* ignore */ }
    if (item.parentNode) {
      item.parentNode.removeChild(item);
    }
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
