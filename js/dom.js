/**
 * 共通 DOM 生成・巡検キーユーティリティ
 */

/**
 * HTML 要素を属性・イベントリスナー・子要素付きで簡潔に生成する
 */
export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  if (attrs && typeof attrs === 'object') {
    Object.entries(attrs).forEach(([key, val]) => {
      if (val === null || val === undefined || val === false) {
        return;
      }
      if (key === 'className' || key === 'class') {
        node.className = String(val);
      } else if (key === 'dataset' && typeof val === 'object') {
        Object.entries(val).forEach(([dKey, dVal]) => {
          if (dVal !== null && dVal !== undefined && dVal !== '') {
            node.dataset[dKey] = String(dVal);
          }
        });
      } else if (key === 'style' && typeof val === 'object') {
        Object.assign(node.style, val);
      } else if (key.startsWith('on') && typeof val === 'function') {
        node.addEventListener(key.slice(2).toLowerCase(), val);
      } else if (key === 'textContent') {
        node.textContent = String(val);
      } else if (val === true) {
        node.setAttribute(key, '');
        if (key in node) {
          node[key] = true;
        }
      } else if (key.startsWith('aria-') || key === 'role') {
        node.setAttribute(key, String(val));
      } else if (key in node && key !== 'list') {
        node[key] = val;
      } else {
        node.setAttribute(key, String(val));
      }
    });
  }

  const appendChild = (child) => {
    if (child === null || child === undefined || child === false) {
      return;
    }
    if (Array.isArray(child)) {
      child.forEach(appendChild);
    } else if (child instanceof Node) {
      node.appendChild(child);
    } else {
      node.appendChild(document.createTextNode(String(child)));
    }
  };
  children.forEach(appendChild);
  return node;
}

/**
 * 巡検コースの一意キー（YYYY_コース略称）を返す
 */
export function getCourseKey(props) {
  return `${props?.year || ''}_${props?.course_abbr || ''}`;
}
