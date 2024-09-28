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
    function isValidBook(nodeList, book) {
        if (book == "ЦТ: Теория. Примеры. Тесты. Ларченко") {
            for (const elem of nodeList) {
                if (elem.attributes.href.nodeValue == `./учебники/ЦТ_ Теория. Примеры. Тесты. Ларченко.pdf`) {
                    elem.click();
                    return true;
                }
            }
            return false;
        }

        if (book == "Алгебра и элементарные функции. Часть 1 и 2. Е. С. Кочетков") {
            const part = prompt("Какая часть?")
            if (part == "1") {
                for (const elem of nodeList) {
                    if (elem.attributes.href.nodeValue == `./учебники/Алгебра и элементарные функции. Часть 1. Е. С. Кочетков.pdf`) {
                        elem.click();
                        return true;
                    }
                }
            }
            if (part == "2") {
                for (const elem of nodeList) {
                    if (elem.attributes.href.nodeValue == `./учебники/Алгебра и элементарные функции. Часть 2. Е. С. Кочетков.pdf`) {
                        elem.click();
                        return true;
                    }
                }
            }
            return false;
        }

        if (book == "Алгебра и начала математического анализа. 10 класс. Мордкович") {
            const part = prompt("Какая часть? ('1', если задания, '2' если теория)")
            if (part == "1") {
                for (const elem of nodeList) {
                    if (elem.attributes.href.nodeValue == `./учебники/Алгебра и начала математического анализа. 10 класс. Мордкович 2 часть.pdf`) {
                        elem.click();
                        return true;
                    }
                }
            }
            if (part == "2") {
                for (const elem of nodeList) {
                    if (elem.attributes.href.nodeValue == `./учебники/Алгебра и начала математического анализа. 10 класс. Мордкович 1 часть.pdf`) {
                        elem.click();
                        return true;
                    }
                }
            }
            return false;
        }

        for (const elem of nodeList) {
            if (elem.attributes.href.nodeValue == `./учебники/${book}.pdf`) {
                elem.click();
                return true;
            }
        }

        return false;
    }

    this.document.addEventListener("paste", function(event) {
        const book = event.clipboardData.getData('text/plain').trim();
        bookSearch(event, book);
    });

    this.document.addEventListener("dragover", function(event) {
        event.preventDefault();
    });

    this.document.addEventListener("drop", function(event) {
        event.preventDefault();
        const book = event.dataTransfer.getData('text/plain').trim();
        bookSearch(event, book);
    });

    function bookSearch(event, book) {
        const nodeList = Array.from(document.querySelectorAll("div a"));
        const notification = document.getElementById('notification');
        // const book = event.clipboardData.getData('text/plain').trim();

        if (!isValidBook(nodeList, book)) {
            notification.classList.remove('fade-out');
            notification.classList.add('show');
        
            setTimeout(function() {
                notification.classList.add('fade-out');
            }, 2000);
        
    
            setTimeout(function() {
                notification.classList.remove('show');
            }, 2500);
        }    
    }
});