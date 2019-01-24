import '@polymer/paper-checkbox/paper-checkbox';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-ripple/paper-ripple';
import {TemplateGenerator} from './helper';

export class Template {
    constructor() {
        this.defaultTemplate = TemplateGenerator(() => `
      <div class="test-row">
        <div class="test-column">
          <div>
            <div>
              <div>
                <div>
                  <input type="checkbox"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="test-column">
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <span class="label">Test</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="test-column">
          <div>
            <div>
              <div>
                <div>
                  <div class="animation-square"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="test-column">
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <img src="favicon.ico"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        `);
    }

    static escapeHtmlChar(chr) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            '\'': '&#x27;',
            '`': '&#x60;'
        }[chr];
    };

    static escape(string) {
        const reUnescapedHtml = /[&<>"'`]/g;
        return (string && reUnescapedHtml.test(string))
            ? string.replace(reUnescapedHtml, Template.escapeHtmlChar)
            : string;
    };

    show(data = []) {
        return data.reduce((view, item) => {
            const templateVars = Object.assign({}, item);
            templateVars.title = Template.escape(templateVars.title);
            if (templateVars.completed) {
                templateVars.completed = 'completed';
                templateVars.checked = 'checked';
            } else {
                templateVars.completed = 'active';
                templateVars.checked = '';
            }
            return view + this.defaultTemplate(templateVars);
        }, '');
    };
}
