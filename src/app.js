import ons from 'onsenui/esm';
import 'onsenui/esm/elements/ons-page';
import 'onsenui/esm/elements/ons-toolbar';
import 'onsenui/esm/elements/ons-toolbar-button';
import 'onsenui/esm/elements/ons-icon';
import 'onsenui/esm/elements/ons-list';
import 'onsenui/esm/elements/ons-list-item';
import 'onsenui/esm/elements/ons-list-header';

function createElementFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

ons.ready(() => {
    const page = document.getElementById('page');
    const list = page.querySelector('#list');
    const self = this;
    for (let i = 0; i < 11; i++) {
        const item = createElementFromHTML(
            `<ons-list-item data-id='${i}' modifier='chevron' tappable>
                Test ${i}
             </ons-list-item>`
        );
        item.addEventListener("click", (e) => (function () {return onItemSelect(e.currentTarget.dataset.id);})());
        list.appendChild(item);
    }
});

function onItemSelect(id) {
    console.log(id);
}
