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
    page('/time', function () {
        selectPage(9);
    });
    page({ hashbang : true });
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
    var _js1513 = allChildren(root);
    var _js1515 = _js1513.length;
    for (var _js1514 = 0, el = _js1513[_js1514]; _js1514 < _js1515; _js1514 += 1, el = _js1513[_js1514]) {
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
        var _js1516 = collectChildrenWithPrefix(container, 'i-');
        var _js1518 = _js1516.length;
        var collect1519 = [];
        for (var _js1517 = 0, el = _js1516[_js1517], i = 0; _js1517 < _js1518; _js1517 += 1, el = _js1516[_js1517], i += 1) {
            collect1519['push']((wh = el.getAttribute('image-size').split('x'), id = parseInt(el.getAttribute('document-id')), caption = el.getAttribute('image-caption'), (currentId == id ? (index = i) : null, { src : prefix + id + '.jpg', nodeId : id, w : wh[0], h : wh[1], title : caption })));
        };
        return collect1519;
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
var LOGOCELL = null;
function arc(cx, x, y, radius) {
    var start;
    var end;
    var fill;
    var lineWidth;
    var _js1520 = arguments.length;
    for (var n1512 = 4; n1512 < _js1520; n1512 += 2) {
        switch (arguments[n1512]) {
        case 'start':
            {
                start = arguments[n1512 + 1];
            };
            break;
        case 'end':
            {
                end = arguments[n1512 + 1];
            };
            break;
        case 'fill':
            {
                fill = arguments[n1512 + 1];
            };
            break;
        case 'line-width':
            {
                lineWidth = arguments[n1512 + 1];
            };
        };
    };
    if (start === undefined) {
        start = 0;
    };
    if (end === undefined) {
        end = Math.PI * 2;
    };
    if (fill === undefined) {
        fill = null;
    };
    if (lineWidth === undefined) {
        lineWidth = null;
    };
    cx.beginPath();
    if (lineWidth) {
        cx.lineWidth = lineWidth;
    };
    cx.arc(x, y, radius, start, end, true);
    if (fill) {
        cx.fill();
    } else {
        cx.stroke();
    };
};
function animateLogo() {
    var img = document.createElement('img');
    LOGOCELL = img;
    img.src = '/images/logo-cell.png';
    img.addEventListener('load', animateLogoGo);
};
var LIFESIZE = 8;
var LIFE = new Uint8Array(LIFESIZE * LIFESIZE);
function life(row, col) {
    return LIFE[row * LIFESIZE + col];
};
function setupLife() {
    var _js1521 = LIFESIZE - 1;
    for (var row = 0; row <= _js1521; row += 1) {
        var _js1522 = LIFESIZE - 1;
        for (var col = 0; col <= _js1522; col += 1) {
            LIFE[row * LIFESIZE + col] = col == 0 || row == 0 || row == LIFESIZE - 1 || col == LIFESIZE - 1 || col == 1 && row == 1 || col == 1 && row == LIFESIZE - 2 || col == LIFESIZE - 2 && row == LIFESIZE - 2 || col == LIFESIZE - 2 && row == 1 ? (Math.random() < 0.88 ? 1 : 0) : 1;
        };
    };
};
function animateLogoGo() {
    var canvas = getById('logo');
    var cx = canvas.getContext('2d');
    setupLife();
    cx.clearRect(0, 0, canvas.width, canvas.height);
    for (var row = 0; row <= 7; row += 1) {
        for (var col = 0; col <= 7; col += 1) {
            if (life(row, col)) {
                cx.drawImage(LOGOCELL, 1 + col * 43, 2 + row * 42);
            };
        };
    };
    cx.fillStyle = 'white';
    cx.strokeStyle = 'white';
    arc(cx, 173, 181, 33, 'fill', true);
    arc(cx, 173, 181, 111, 'line-width', 29);
    cx.beginPath();
    var theta = Math.PI - Math.PI * (69 / 180);
    cx.arc(173, 181, 111, theta, theta + (-(Math.PI / 4.4)), true);
    cx.lineTo(173, 181);
    cx.fill();
    cx.save();
    cx.beginPath();
    cx.moveTo(173, 164);
    cx.lineTo(0, 164);
    cx.lineTo(0, 0);
    cx.lineTo(350, 0);
    cx.lineTo(350, 340);
    cx.lineTo(0, 340);
    cx.lineTo(0, 198);
    cx.lineTo(173, 198);
    cx.clip();
    arc(cx, 173, 181, 62, 'line-width', 29);
    cx.restore();
    setTimeout(function () {
        animateLogoGo();
    }, 6000);
};