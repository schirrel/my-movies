import { copy } from './Util';

const print = (model) => {
  var w = window.open(template, "wnd");
  w.document.write(template);
}


export default print;

