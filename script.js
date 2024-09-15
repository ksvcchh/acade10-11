const answerTemplate = "<i>Пример ответа: </i>\"3)\".\n\n\\(1)\\) \\(\\);\n\n\\(2)\\) \\(\\);\n\n\\(3)\\) \\(\\).";

const logicalOr = "\\left[\\begin{array}{l}\n\n\\\\\n\n\\end{array}\\right.";

const logicalAnd = "\\begin{cases}\n\n\\\\\n\n\\end{cases}";

const YesNo = "<i>В ответ введите </i>\"да\"<i> либо </i>\"нет\".";

function copy(arg) {
    navigator.clipboard.writeText(arg);
};

function handleCopyAnswerTemplate() {
    copy(answerTemplate);
};

function handleCopyLogicalOr() {
    copy(logicalOr);
};

function handleCopyLogicalAnd() {
    copy(logicalAnd);
};

function handleCopyYesNo() {
    copy(YesNo);
};

window.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('newPageStatus');
    const checkBox = document.getElementById('newPage');

    function touchNewPageButton() {
        if (button.innerText == "В той же вкладке") {
            button.innerText = "В новой вкладке";
            localStorage.setItem('newPageStatus', 'В новой вкладке');
            localStorage.setItem('newPage', 'true');
        }
        else {
            button.innerText = "В той же вкладке";
            localStorage.setItem('newPageStatus', 'В той же вкладке');
            localStorage.setItem('newPage', 'false');
        }
    }

    const savedStatus = localStorage.getItem('newPageStatus');
    if (savedStatus) {
        button.innerText = savedStatus;
    }

    button.onclick = touchNewPageButton;

    const links = document.querySelectorAll('.item a');

    if (localStorage.getItem('newPage') === 'true') {
        checkBox.checked = true;
        addTargetBlank();
    }

    function addTargetBlank() {
        links.forEach(link => link.setAttribute('target', '_blank'));
    }

    function removeTargetBlank() {
        links.forEach(link => link.removeAttribute('target'));
    }
});