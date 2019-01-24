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
                templateVars.completed = 'my-completed';
                templateVars.checked = 'checked';
            } else {
                templateVars.completed = 'my-active';
                templateVars.checked = '';
            }
            return view + this.defaultTemplate(templateVars);
        }, '');
    };
}

// populate template string with values
function TemplateGenerator(cb) {
    return (data) => {
        const dataKeys = [];
        const dataVals = [];
        for (let key in data) {
            dataKeys.push(key);
            dataVals.push(data[key]);
        }
        let func = new Function(...dataKeys, 'return (' + cb + ')();');
        return func(...dataVals);
    };
}