import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimpleMdService {
    options: any;

  constructor() {
      const o  = this;
      this.options = {
          spellChecker: false,
          placeholder: 'Escribe un comentario...',
          status: false,
          tabSize: 1,
          autofocus: 1,
          toolbar:  ['bold', 'italic', 'strikethrough', 'heading',  '|', 'quote', 'code', 'unordered-list', '|', 'link', 'image',
              '|', 'preview', 'side-by-side',
              {
                  name: 'spoiler',
                  action: function customFunction(editor) {
                      const cm = editor.codemirror;
                      const options = editor.options;
                      const stat = o.getState(cm);
                      const insertTexts = ['\n-spoiler- ', ' -end-\n'];
                      o._replaceSelection(cm, stat.link, insertTexts);
                  },
                  className: 'fa fa-eye-slash',
                  title: 'Añadir Spoiler',
              }]

      };
  }
  _replaceSelection(cm, active, startEnd, url?) {
        if (/editor-preview-active/.test(cm.getWrapperElement().lastChild.className)) {
            return;
        }

        let text;
        let start = startEnd[0];
        let end = startEnd[1];
        const startPoint = cm.getCursor('start');
        const endPoint = cm.getCursor('end');
        if (url) {
            end = end.replace('#url#', url);
        }
        if (active) {
            text = cm.getLine(startPoint.line);
            start = text.slice(0, startPoint.ch);
            end = text.slice(startPoint.ch);
            cm.replaceRange(start + end, {
                line: startPoint.line,
                ch: 0
            });
        } else {
            text = cm.getSelection();
            cm.replaceSelection(start + text + end);

            startPoint.ch += start.length;
            if (startPoint !== endPoint) {
                endPoint.ch += start.length;
            }
        }
        cm.setSelection(startPoint, endPoint);
        cm.focus();
    }

    getState(cm, pos?) {
        pos = pos || cm.getCursor('start');
        const stat = cm.getTokenAt(pos);
        if (!stat.type) { return {}; }

        const types = stat.type.split(' ');

        const ret = <any>{};
        let data;
        let text;
        for (let i = 0; i < types.length; i++) {
            data = types[i];
            if (data === 'strong') {
                ret.bold = true;
            } else if (data === 'variable-2') {
                text = cm.getLine(pos.line);
                if (/^\s*\d+\.\s/.test(text)) {
                    ret['ordered-list'] = true;
                } else {
                    ret['unordered-list'] = true;
                }
            } else if (data === 'atom') {
                ret.quote = true;
            } else if (data === 'em') {
                ret.italic = true;
            } else if (data === 'quote') {
                ret.quote = true;
            } else if (data === 'strikethrough') {
                ret.strikethrough = true;
            } else if (data === 'comment') {
                ret.code = true;
            } else if (data === 'link') {
                ret.link = true;
            } else if (data === 'tag') {
                ret.image = true;
            } else if (data.match(/^header(\-[1-6])?$/)) {
                ret[data.replace('header', 'heading')] = true;
            }
        }
        return ret;
    }
}
