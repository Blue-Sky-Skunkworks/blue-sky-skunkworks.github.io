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
    visitUrl('https://groups.google.com/forum/#!forum/missoula-civic-hackathon');
};
function joinSchool() {
    visitUrl('https://groups.google.com/forum/#!forum/missoula-civic-hackathon-students');
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
    page('/government', function () {
        selectPage(10);
    });
    page('/school', function () {
        selectPage(11);
    });
    page('/media', function () {
        selectPage(12);
        setupPacking('medias', 'card', 60);
    });
    page('/wiki', function () {
        selectPage(13);
    });
    page({ hashbang : true });
};
function visitUrl(url) {
    window.open(url, '_blank');
};
function viewTestersMessage() {
    visitUrl('/includes/Senator-Tester-Spring-2016-Hackathon-Message.pdf');
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
    var _js285 = allChildren(root);
    var _js287 = _js285.length;
    for (var _js286 = 0, el = _js285[_js286]; _js286 < _js287; _js286 += 1, el = _js285[_js286]) {
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
        var _js288 = collectChildrenWithPrefix(container, 'i-');
        var _js290 = _js288.length;
        var collect291 = [];
        for (var _js289 = 0, el = _js288[_js289], i = 0; _js289 < _js290; _js289 += 1, el = _js288[_js289], i += 1) {
            collect291['push']((wh = el.getAttribute('image-size').split('x'), id = parseInt(el.getAttribute('document-id')), caption = el.getAttribute('image-caption'), (currentId == id ? (index = i) : null, { src : prefix + id + '.jpg', nodeId : id, w : wh[0], h : wh[1], title : caption })));
        };
        return collect291;
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
    var _js292 = arguments.length;
    for (var n278 = 4; n278 < _js292; n278 += 2) {
        switch (arguments[n278]) {
        case 'start':
            {
                start = arguments[n278 + 1];
            };
            break;
        case 'end':
            {
                end = arguments[n278 + 1];
            };
            break;
        case 'fill':
            {
                fill = arguments[n278 + 1];
            };
            break;
        case 'line-width':
            {
                lineWidth = arguments[n278 + 1];
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
    var _js293 = LIFESIZE - 1;
    for (var row = 0; row <= _js293; row += 1) {
        var _js294 = LIFESIZE - 1;
        for (var col = 0; col <= _js294; col += 1) {
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
function setupWiki279(this280) {
    var req = getById('wch-ajax');
    var promise = req.send({ url : '/wiki/Home.md' });
    promise.then(handleWikiResponse, handleWikiError);
};
function setupWiki() {
    console.log(TRACELEVEL, 'setupWiki', ':');
    ++TRACELEVEL;
    var rtn = setupWiki279(this);
    --TRACELEVEL;
    console.log(TRACELEVEL, 'setupWiki', 'returned', rtn);
    return rtn;
};
function handleWikiResponse281(this282, val) {
    console.log(val.response, val.statusText);
};
function handleWikiResponse(val) {
    console.log(TRACELEVEL, 'handleWikiResponse', ':', 'val', val);
    ++TRACELEVEL;
    var rtn = handleWikiResponse281(this, val);
    --TRACELEVEL;
    console.log(TRACELEVEL, 'handleWikiResponse', 'returned', rtn);
    return rtn;
};
function handleWikiError283(this284, val) {
};
function handleWikiError(val) {
    console.log(TRACELEVEL, 'handleWikiError', ':', 'val', val);
    ++TRACELEVEL;
    var rtn = handleWikiError283(this, val);
    --TRACELEVEL;
    console.log(TRACELEVEL, 'handleWikiError', 'returned', rtn);
    return rtn;
};