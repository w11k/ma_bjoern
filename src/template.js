export class Template {
    constructor() {
        this.defaultTemplate = TemplateGenerator(() => `
            <div data-id="${id}" class="list-group-item todo-list-item ${completed}" data-toggle="context" data-target="#context-menu">
                <input type="checkbox" ${checked}>
                <span class="title">${title}</span>
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