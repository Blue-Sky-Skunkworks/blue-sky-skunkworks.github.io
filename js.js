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
        gutter = 20;
    };
    var container = getById(containerId);
    if (container.pack) {
        container.pack.layout();
    } else {
        container.pack = new Packery(container, { itemSelector : '.' + item, gutter : gutter });
    };
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
    page('/', function () {
        selectPage(1);
        setupPacking('top-grid', 'card');
    });
    page('/press-release', function () {
        selectPage(2);
    });
    page('/schedule', function () {
        selectPage(3);
    });
    page('/sharing', function () {
        selectPage(4);
    });
    page('/sponsors', function () {
        selectPage(5);
        setupPacking('sponsors', 'card', 60);
    });
    page('/code-of-conduct', function () {
        selectPage(6);
    });
    page('/participate', function () {
        selectPage(7);
    });
    page('/prayer', function () {
        selectPage(8);
    });
    page('/moon', function () {
        selectPage(9);
    });
    page({ hashbang : true });
};
function animateLogos() {
    setTimeout(function () {
        animateLogo(getById('logos'));
    }, 5000);
};
function animateLogo(el) {
    var index = parseInt(el.selected);
    if (index == 5) {
        index = -1;
    };
    index += 1;
    el.selected = index;
    animateLogos();
};
function setMapZoom(z) {
    var el = getById('map');
    el.zoom = z;
    el.latitude = VLAT;
    el.longitude = VLON;
};
function randomizeChildren(el) {
    for (var i = el.children.length; i >= 0; i = i - 1) {
        el.appendChild((el.children)[Math.random() * i | 0]);
    };
};
function animateSponsors() {
    setTimeout(function () {
        animateSponsorsWorker(getById('sponsors'));
    }, 10000);
};
function animateSponsorsWorker(el) {
    randomizeChildren(el);
    el.pack.fit((el.children)[0], 0, 0);
    animateSponsors();
};
function stopEvent(event) {
    if (event) {
        event.cancelBubble = true;
        event.stopped = true;
        if (event.stopPropagation) {
            event.stopPropagation();
        };
        if (navigator.appName == 'Netscape') {
            event.preventDefault();
        } else {
            window.event.returnValue = null;
        };
    };
};
var GALLERY;
function stringStartsWith(string, prefix) {
    return string.indexOf(prefix) == 0;
};
function allChildren(element) {
    return element.getElementsByTagName('*');
};
function collectChildrenWithPrefix(root, prefix) {
    var rtn = new Array();
    var _js1 = allChildren(root);
    var _js3 = _js1.length;
    for (var _js2 = 0, el = _js1[_js2]; _js2 < _js3; _js2 += 1, el = _js1[_js2]) {
        if (stringStartsWith(el.id, prefix)) {
            rtn.push(el);
        };
    };
    return rtn;
};
function collectContainerImages(container, prefix, currentId) {
    var index = null;
    var data = (function () {
        var caption;
        var id;
        var wh;
        var _js4 = collectChildrenWithPrefix(container, 'i-');
        var _js6 = _js4.length;
        var collect7 = [];
        for (var _js5 = 0, el = _js4[_js5], i = 0; _js5 < _js6; _js5 += 1, el = _js4[_js5], i += 1) {
            collect7['push']((wh = el.getAttribute('image-size').split('x'), id = parseInt(el.getAttribute('document-id')), caption = el.getAttribute('image-caption'), (currentId == id ? (index = i) : null, { src : prefix + id + '.jpg', nodeId : id, w : wh[0], h : wh[1], title : caption })));
        };
        return collect7;
    })();
    return [index, data];
};
function showImageGallery(event, containerId, prefix, id) {
    stopEvent(event);
    var container = getById(containerId);
    var images = collectContainerImages(container, prefix, id);
    var gallery = new PhotoSwipe(getById('kspswp'), PhotoSwipeUI_default, images[1], { index : images[0] });
    GALLERY = gallery;
    gallery.init();
};