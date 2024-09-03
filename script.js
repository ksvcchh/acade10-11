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