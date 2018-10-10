import {TemplateGenerator} from "./helper";

export class Template {
    /**
     * Sets up defaults for all the Template methods such as a default template
     *
     * @constructor
     */
    constructor() {
        this.defaultTemplate = TemplateGenerator(() => `
            <ons-list-item data-id="${id}" tappable>
                <div class="left">
                    <ons-checkbox ${checked}></ons-checkbox>
                </div>
                <label class="center">
                    ${title}
                </label>
            </ons-list-item>
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

    /**
     * Creates an <li> HTML string and returns it for placement in your app.
     *
     * NOTE: In real life you should be using a templating engine such as Mustache
     * or Handlebars, however, this is a vanilla JS example.
     *
     * @param {object} data The object containing keys you want to find in the
     *                      template to replace.
     * @returns {string} HTML String of an <li> element
     *
     * @example
     * view.show([{
     *	id: 1,
     *	title: "Hello World",
     *	completed: 0,
     * }]);
     */
    show(data = []) {
        let view = '';

        for (const templateVars of data) {
            templateVars.title = Template.escape(templateVars.title);
            if (templateVars.completed) {
                templateVars.checked = 'checked';
            } else {
                templateVars.checked = '';
            }
            view += this.defaultTemplate(templateVars);
        }
        return view;
    };
}
