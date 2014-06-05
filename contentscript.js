var TEST_FILE_REGEXP = /Tests?\//i;

// Thanks StackOverflow... maybe overkill for my usage.
// http://stackoverflow.com/a/14234618/53338
function findParentBySelector(elm, selector) {
    var all = document.querySelectorAll(selector);
    var cur = elm.parentNode;

    var collectionHas = function(a, b) {
        for(var i = 0, len = a.length; i < len; i ++) {
            if(a[i] == b) return true;
        }

        return false;
    };

    while(cur && !collectionHas(all, cur)) { //keep going up until you find a match
        cur = cur.parentNode; //go up
    }

    return cur; //will return null if not found
}

function toggleFileDataView(event) {
    var btn = event.target;
    var file = findParentBySelector(event.target, '.file');

    file.classList.toggle('gh-ext-close');

    if (file.classList.contains('gh-ext-close')) {
        btn.innerHTML = 'Show diff';
    } else {
        btn.innerHTML = 'Hide diff';
    }
}

function addHideShowButton(fileContainer) {
    var btn = document.createElement('a');
    btn.innerHTML = 'Hide diff';
    btn.addEventListener('click', toggleFileDataView);
    btn.className = 'minibutton';

    fileContainer.querySelector('.actions .button-group').appendChild(btn);
}

function isTestFile(filename) {
    return !!filename.match(TEST_FILE_REGEXP);
}

function markLine(event) {
    var line = findParentBySelector(event.target, '.file-diff-line');

    line.classList.toggle('gh-ext-line-marked');
}

var files = document.querySelectorAll("#files .file");

for(var i = 0; i < files.length; i++) {
    var file = files[i];
    var filename = file.querySelector('.meta').dataset.path;

    // Add Hide/Show diff buttons on PR files changed
    addHideShowButton(file);

    if (isTestFile(filename)) {
        file.classList.add('gh-ext-testfile');
    }
}

var linesOfCode = document.querySelectorAll('.js-file-line .diff-line-code');

for(var i=0; i < linesOfCode.length; i++) {
    var line = linesOfCode[i];
    var mark = document.createElement('b');
    mark.addEventListener('click', markLine);
    mark.className = 'gh-ext-add-line-mark octicon octicon-pin';

    line.insertBefore(mark, line.querySelector('.add-line-comment'));
}


// add visit site button
(function(window) {
    var tmp = window.location.href.match('github.com/([^/]*)/([^/]*)');
    if (!tmp || tmp.length < 3) {
        return;
    }

    var user = tmp[1];
    var repo = tmp[2];
    var ghPageUrl = 'https://' + user + '.github.io/' + repo + '/';

    var addGhPagesButton = function(e) {
        var status = this.status;

        if (404 == status) {
            return;
        }

        var btn = [
            '<li>',
                '<a class="minibutton" href="'+ghPageUrl+'"><span class="octicon octicon-arrow-right"></span> Visit site</a>',
            '</li>'
        ].join('');

        var headActions = document.querySelector('.pagehead-actions');
        headActions.innerHTML = btn + headActions.innerHTML;
    };

    var request = new XMLHttpRequest();
    request.onload = addGhPagesButton;
    request.open('HEAD', ghPageUrl);
    request.send();

})(window);
