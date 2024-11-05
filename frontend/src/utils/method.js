export function FillNum(v, len) {
  return (v + '').padStart(len, '0');
}

function getBoxBorderNumber(number) {
  return `${isNumber(number) ? number * BOX_BORDER_UNIT : number}px`;
}
export function getBoxBorderCssStyle({ pl, pb, pt, pr, p, ml, mb, mt, mr, m }) {
  let style = '';
  if (pl) style += `padding-left:${getBoxBorderNumber(pl)};`;
  if (pb) style += `padding-bottom:${getBoxBorderNumber(pb)};`;
  if (pt) style += `padding-top:${getBoxBorderNumber(pt)};`;
  if (pr) style += `padding-right:${getBoxBorderNumber(pr)};`;
  if (p) style += `padding:${getBoxBorderNumber(p)};`;

  if (ml) style += `margin-left:${getBoxBorderNumber(ml)};`;
  if (mb) style += `margin-bottom:${getBoxBorderNumber(mb)};`;
  if (mt) style += `margin-top:${getBoxBorderNumber(mt)};`;
  if (mr) style += `margin-right:${getBoxBorderNumber(mr)};`;
  if (m) style += `margin:${getBoxBorderNumber(m)};`;
  return style;
}

export function getBoxBorderStyle({ pl, pb, pt, pr, p, ml, mb, mt, mr, m }) {
  let style = {};
  if (pl) style.paddingLeft = getBoxBorderNumber(pl);
  if (pb) style.paddingBottom = getBoxBorderNumber(pb);
  if (pt) style.paddingTop = getBoxBorderNumber(pt);
  if (pr) style.paddingRight = getBoxBorderNumber(pr);
  if (p) style.padding = getBoxBorderNumber(p);

  if (ml) style.marginLeft = getBoxBorderNumber(ml);
  if (mb) style.marginBottom = getBoxBorderNumber(mb);
  if (mt) style.marginTop = getBoxBorderNumber(mt);
  if (mr) style.marginRight = getBoxBorderNumber(mr);
  if (m) style.margin = getBoxBorderNumber(m);

  return style;
}

export function CloneDeep(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function SaveJsonParse(JsonData) {
  try {
    JSON.parse(JsonData);
  } catch (e) {
    console.log(e);
    return {};
  }
}
