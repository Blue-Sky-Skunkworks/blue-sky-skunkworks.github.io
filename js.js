var TRACELEVEL = 0;
function getById(id, error) {
    if (error === undefined) {
        error = true;
    };
    var hit = document.getElementById(id);
    if (hit) {
        return hit;
    } else {
        if (error) {
            console.log('ERROR: get-by-id', id);
        };
    };
};
function setupPacking(containerId, item, gutter) {
    if (gutter === undefined) {
        gutter = 10;
    };
    var container = getById(containerId);
    var pack = new Packery(container, { itemSelector : '.' + item, gutter : gutter });
    container.pack = pack;
};
function selectPage(index) {
    var pages = getById('pages');
    pages.selected = index;
};
function show(id) {
    var o = getById(id);
    if (o) {
        o.style.visibility = 'visible';
    };
};
function hide(id) {
    var o = getById(id);
    if (o) {
        o.style.visibility = 'hidden';
    };
};
function whenReady(fn) {
    document.addEventListener('WebComponentsReady', function () {
        fn();
    });
};
function visitUrl(url) {
    window.open(url, '_blank');
};
function visitEmailList() {
    visitUrl('https://groups.google.com/forum/#!forum/blue-sky-skunkworks');
};
function visitWiki() {
    visitUrl('https://github.com/Blue-Sky-Skunkworks/missoula-civic-hackathon-notes/wiki');
};
function visitTickets() {
    visitUrl('https://www.eventbrite.com/e/missoula-civic-hackathon-2016-tickets-21898542129');
};
function visitSourceCode() {
    visitUrl('https://github.com/Blue-Sky-Skunkworks/hackathon');
};
function setupRouting() {
    page.base('');
    page('/', function () {
        selectPage(0);
    });
    page('/press-release', function () {
        selectPage(1);
    });
    page('/schedule', function () {
        selectPage(2);
    });
    page('/sharing', function () {
        selectPage(3);
    });
    page('/sponsors', function () {
        selectPage(4);
    });
    page({ hashbang : true });
};