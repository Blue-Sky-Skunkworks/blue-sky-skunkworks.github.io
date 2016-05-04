var TRACELEVEL = 0;
String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) != -1;
};
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
    if (index == 3) {
        document.title = 'Missoula Civic Hackathon Schedule';
    } else {
        document.title = 'Missoula Civic Hackathon';
    };
    var pages = getById('pages');
    if (pages.selected !== index) {
        pages.selected = index;
    };
    if (index != 1) {
        if (!IMAGESINITIALIZED) {
            setupImages();
        };
        echo.render();
    };
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
    page('/wiki/:page', function (ctx) {
        var fn = function () {
            selectPage(13);
            setupWiki(ctx.params.page);
        };
        var src = scriptNameSrc('marked');
        if (scriptLoaded(src)) {
            fn();
        } else {
            loadScript(src, fn);
        };
    });
    page('/wiki', function () {
        page('/wiki/Home');
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
    var _js2 = allChildren(root);
    var _js4 = _js2.length;
    for (var _js3 = 0, el = _js2[_js3]; _js3 < _js4; _js3 += 1, el = _js2[_js3]) {
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
        var _js5 = collectChildrenWithPrefix(container, 'i-');
        var _js7 = _js5.length;
        var collect8 = [];
        for (var _js6 = 0, el = _js5[_js6], i = 0; _js6 < _js7; _js6 += 1, el = _js5[_js6], i += 1) {
            collect8['push']((wh = el.getAttribute('image-size').split('x'), id = parseInt(el.getAttribute('document-id')), caption = el.getAttribute('image-caption'), (currentId == id ? (index = i) : null, { src : prefix + id + '.jpg', nodeId : id, w : wh[0], h : wh[1], title : caption })));
        };
        return collect8;
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
    var _js9 = arguments.length;
    for (var n1 = 4; n1 < _js9; n1 += 2) {
        switch (arguments[n1]) {
        case 'start':
            {
                start = arguments[n1 + 1];
            };
            break;
        case 'end':
            {
                end = arguments[n1 + 1];
            };
            break;
        case 'fill':
            {
                fill = arguments[n1 + 1];
            };
            break;
        case 'line-width':
            {
                lineWidth = arguments[n1 + 1];
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
    var _js10 = LIFESIZE - 1;
    for (var row = 0; row <= _js10; row += 1) {
        var _js11 = LIFESIZE - 1;
        for (var col = 0; col <= _js11; col += 1) {
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
var RAWWIKIURL = 'https://rawgit.com/wiki/Blue-Sky-Skunkworks/missoula-civic-hackathon-notes';
var WIKIURL = 'https://github.com/Blue-Sky-Skunkworks/missoula-civic-hackathon-notes/wiki/';
var WIKIPAGE;
function request(url, responseHandler, errorHandler) {
    if (errorHandler === undefined) {
        errorHandler = defaultRequestErrorHandler;
    };
    var req = document.createElement('iron-request');
    var promise = req.send({ url : url });
    promise.then(responseHandler, errorHandler);
};
function defaultRequestErrorHandler(val) {
    console.log('error in request', val);
};
function setupWiki(page) {
    var title = getById('wiki-title');
    request((PRODUCTION ? RAWWIKIURL : '/wiki') + '/' + page + '.md', handleWikiResponse);
    WIKIPAGE = page;
    var text = 'The Missoula Civic Hackathon Wiki \u2014 ' + page.replace(/-/g, ' ');
    document.title = text;
    title.innerHTML = text;
};
function handleWikiResponse(val) {
    var el = getById('wiki-body');
    el.innerHTML = marked(val.response);
};
function getInnerHtml(el) {
    return el.innerHTML;
};
function selectIlink(ilink) {
    page('/wiki/' + ilink.replace(/ /g, '-'));
};
function refreshWiki() {
    setupWiki(WIKIPAGE);
};
function viewWikiSource() {
    visitUrl(WIKIURL + WIKIPAGE);
};
function editWiki() {
    visitUrl(WIKIURL + WIKIPAGE + '/_edit');
};
function toggleWikiView() {
    var listing = getById('wiki-listing');
    var button = getById('wiki-view-toggle');
    button.icon = listing.selected == 0 ? 'toc' : 'list';
    listing.selected = listing.selected == 0 ? 1 : 0;
};
var IMAGESINITIALIZED;
function setupImages() {
    if (IMAGESINITIALIZED) {
        console.log('Re-initializing images.');
    };
    IMAGESINITIALIZED = true;
    echo.init({ offset : 100, throttle : 250, unload : null, callback : function (el, op) {
        console.log(el, op);
    } });
    for (var panel = null, _js_arrvar13 = ['sponsors-panel', 'prayer-panel', 'media-panel'], _js_idx12 = 0; _js_idx12 < _js_arrvar13.length; _js_idx12 += 1) {
        panel = _js_arrvar13[_js_idx12];
        watchScrolling(panel);
    };
};
function watchScrolling(id) {
    var el = getById(id);
    el.addEventListener('content-scroll', handleScroll);
};
function handleScroll() {
    echo.render();
};
var SCRIPTS = new Array();
function scriptNameSrc(name) {
    return SCRIPTNAMESRC[name];
};
function scriptLoaded(src) {
    return SCRIPTS.indexOf(src) > -1;
};
function loadScript(src, callback) {
    if (callback === undefined) {
        callback = null;
    };
    if (scriptLoaded(src)) {
        console.log('duplicate script loading', src);
    } else {
        var head = document.getElementsByTagName('head')[0];
        var css = src.endsWith('css');
        var el = document.createElement(css ? 'link' : 'script');
        el.onload = function () {
            console.log('loaded', src);
            if (callback) {
                callback();
            };
        };
        el.onerror = scriptLoadError;
        if (css) {
            el.type = 'text/css';
            el.ref = 'stylesheet';
            el.href = src;
        } else {
            el.type = 'text/javascript';
            el.src = src;
        };
        head.appendChild(el);
    };
};
function scriptLoadError(err) {
    throw new URIError('The script ' + err.target.src + ' is not accessible.');
};