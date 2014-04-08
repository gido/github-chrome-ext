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
