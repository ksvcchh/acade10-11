const answerTemplate =
  "<i>Пример ответа: </i>«3)».\n\n\\(1)\\) \\(\\);\n\n\\(2)\\) \\(\\);\n\n\\(3)\\) \\(\\).";

const logicalOr =
  "\\left[\\begin{array}{l}\n\n\\\\[5px]\n\n\\end{array}\\right.";

const logicalAnd = "\\begin{cases}\n\n\\\\\n\n\\end{cases}";

const YesNo = "<i>В ответ введите </i>«да»<i> либо </i>«нет».";

const fractures =
  "<i>Полученные корни введите в ответ в порядке возрастания через пробел. Дроби записывайте в несократимом виде. Пример ответа:</i> «-4/7 2/3».";

const promptDrug = `Я предоставлю условие математической задачи и предложенное решение. Твоя задача — провести детальный анализ решения с учётом следующих аспектов:

    1. **Верность:**
       - Проверь, соответствует ли решение условию задачи.
       - Проверь правильность всех вычислений и применение корректных методов.
       - Укажи, если обнаружены арифметические или логические ошибки.

    2. **Логичность:**
       - Оцени последовательность рассуждений и использование математических определений и теорем.
       - Проверь, обоснованы ли все переходы и выводы, есть ли четкая аргументация.

    3. **Полнота:**
       - Определи, охватывает ли решение все аспекты поставленной задачи.
       - Проверь, не упущены ли важные шаги или дополнительные соображения, необходимые для полного понимания решения.
       - Если имеются альтернативные подходы или уточнения, отметь их.

    Если решение удовлетворяет всем критериям, сообщи, что оно корректно, логично и полное. Если обнаружены ошибки или недостатки, подробно опиши, что именно не соответствует требуемым критериям и почему.

    <Условие>

    </Условие>

    <Решение>

    </Решение>`;

const functionBuild = `<table>
  <tr>
    <td>\\(x\\)</td>
    <td>\\(\\)</td>
    <td>\\(\\)</td>
    <td>\\(\\)</td>
    <td>\\(\\)</td>
    <td>\\(\\)</td>
  </tr>
  <tr>
    <td>\\(y\\)</td>
    <td>\\(\\)</td>
    <td>\\(\\)</td>
    <td>\\(\\)</td>
    <td>\\(\\)</td>
    <td>\\(\\)</td>
  </tr>
</table>`;

function copy(arg) {
  navigator.clipboard.writeText(arg);
}

function handleCopyFunctionBuild() {
  copy(functionBuild);
}

function handleCopyAnswerTemplate() {
  copy(answerTemplate);
}

function handleCopyLogicalOr() {
  copy(logicalOr);
}

function handleCopyLogicalAnd() {
  copy(logicalAnd);
}

function handleCopyYesNo() {
  copy(YesNo);
}

function handleCopyFractures() {
  copy(fractures);
}

function copyDrug() {
  copy(promptDrug);
}

window.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("newPageStatus");
  const checkBox = document.getElementById("newPage");

  function touchNewPageButton() {
    if (button.innerText == "В той же вкладке") {
      button.innerText = "В новой вкладке";
      localStorage.setItem("newPageStatus", "В новой вкладке");
      localStorage.setItem("newPage", "true");
    } else {
      button.innerText = "В той же вкладке";
      localStorage.setItem("newPageStatus", "В той же вкладке");
      localStorage.setItem("newPage", "false");
    }
  }

  const savedStatus = localStorage.getItem("newPageStatus");
  if (savedStatus) {
    button.innerText = savedStatus;
  }

  button.onclick = touchNewPageButton;

  const links = document.querySelectorAll(".item a");

  if (localStorage.getItem("newPage") === "true") {
    checkBox.checked = true;
    addTargetBlank();
  }

  function addTargetBlank() {
    links.forEach((link) => link.setAttribute("target", "_blank"));
  }

  function removeTargetBlank() {
    links.forEach((link) => link.removeAttribute("target"));
  }

  function isValidBook(nodeList, book) {
    if (book.startsWith("http")) {
      window.open(book, "_self");
      return true;
    }

    if (book == "ЦТ: Теория. Примеры. Тесты. Ларченко") {
      for (const elem of nodeList) {
        if (
          elem.attributes.href.nodeValue ==
          `./учебники/ЦТ_ Теория. Примеры. Тесты. Ларченко.pdf`
        ) {
          elem.click();
          return true;
        }
      }
      return false;
    }

    if (book == "Геометрия 11-ый класс. Смирнов") {
      for (const elem of nodeList) {
        if (
          elem.attributes.href.nodeValue ==
          `./учебники/Геометрия. Смирнов 11, ест-мат.pdf`
        ) {
          elem.click();
          return true;
        }
      }
      return false;
    }

    if (book == "Решение уравнений и неравенств. Садовничий") {
      for (const elem of nodeList) {
        if (
          elem.attributes.href.nodeValue ==
          `./учебники/Решение уравнений и неравенств.pdf`
        ) {
          elem.click();
          return true;
        }
      }
      return false;
    }

    if (book == "Геометрия 10-11 Рабинович") {
      for (const elem of nodeList) {
        if (
          elem.attributes.href.nodeValue ==
          `./учебники/Геометрия. Задачи и упражнения на готовых чертежах. 10-11 классы - Рабинович Е.М..pdf`
        ) {
          elem.click();
          return true;
        }
      }
      return false;
    }

    if (book == "Алгебра и элементарные функции. Часть 1 и 2. Е. С. Кочетков") {
      const part = prompt("Какая часть?");
      if (part == "1") {
        for (const elem of nodeList) {
          if (
            elem.attributes.href.nodeValue ==
            `./учебники/Алгебра и элементарные функции. Часть 1. Е. С. Кочетков.pdf`
          ) {
            elem.click();
            return true;
          }
        }
      }
      if (part == "2") {
        for (const elem of nodeList) {
          if (
            elem.attributes.href.nodeValue ==
            `./учебники/Алгебра и элементарные функции. Часть 2. Е. С. Кочетков.pdf`
          ) {
            elem.click();
            return true;
          }
        }
      }
      return false;
    }

    if (
      book == "Алгебра и начала математического анализа. 10 класс. Мордкович"
    ) {
      const part = prompt("Какая часть? ('1', если задания, '2' если теория)");
      if (part == "1") {
        for (const elem of nodeList) {
          if (
            elem.attributes.href.nodeValue ==
            `./учебники/Алгебра и начала математического анализа. 10 класс. Мордкович 2 часть.pdf`
          ) {
            elem.click();
            return true;
          }
        }
      }
      if (part == "2") {
        for (const elem of nodeList) {
          if (
            elem.attributes.href.nodeValue ==
            `./учебники/Алгебра и начала математического анализа. 10 класс. Мордкович 1 часть.pdf`
          ) {
            elem.click();
            return true;
          }
        }
      }
      return false;
    }

    if (
      book == "Алгебра и начала математического анализа. 11 класс. Мордкович"
    ) {
      const part = prompt("Какая часть? ('1', если задания, '2' если теория)");
      if (part == "1") {
        for (const elem of nodeList) {
          if (
            elem.attributes.href.nodeValue ==
            `./учебники/Алгебра и начала математического анализа. 11 класс. Мордкович задачник.pdf`
          ) {
            elem.click();
            return true;
          }
        }
      }
      if (part == "2") {
        for (const elem of nodeList) {
          if (
            elem.attributes.href.nodeValue ==
            `./учебники/Алгебра и начала математического анализа. 11 класс. Мордкович.pdf`
          ) {
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

  this.document.addEventListener("paste", function (event) {
    event.preventDefault();
    const book = event.clipboardData.getData("text/plain").trim();
    if (book.includes("Book") && !book.includes("Comment")) {
      bookSearch(
        event,
        book
          .trim()
          .split("Book:")
          .map((el) => el.trim())[1],
      );
    } else if (book.includes("Book") && book.includes("Comment")) {
      bookSearch(
        event,
        book.trim().split("Book:")[1].split("Comment:")[0].trim(),
      );
      // } else if (book.includes("http") || book.includes(".ru")) {
      //   window.open(book, "_self");
    } else {
      bookSearch(event, book);
    }
  });

  this.document.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  this.document.addEventListener("drop", function (event) {
    event.preventDefault();
    const book = event.dataTransfer.getData("text/plain").trim();
    if (book.includes("Book") && !book.includes("Comment")) {
      bookSearch(
        event,
        book
          .trim()
          .split("Book:")
          .map((el) => el.trim())[1],
      );
    } else if (book.includes("Book") && book.includes("Comment")) {
      bookSearch(
        event,
        book.trim().split("Book:")[1].split("Comment:")[0].trim(),
      );
    } else {
      bookSearch(event, book);
    }
  });

  function bookSearch(event, book) {
    const nodeList = Array.from(document.querySelectorAll("div a"));
    const notification = document.getElementById("notification");
    // const book = event.clipboardData.getData('text/plain').trim();

    if (!isValidBook(nodeList, book)) {
      notification.classList.remove("fade-out");
      notification.classList.add("show");

      setTimeout(function () {
        notification.classList.add("fade-out");
      }, 2000);

      setTimeout(function () {
        notification.classList.remove("show");
      }, 2500);
    }
  }
});

const extraLinks = [
  { name: "Куб", url: "https://www.geogebra.org/calculator/mtvupxrs" },
  {
    name: "3 накл призма",
    url: "https://www.geogebra.org/calculator/vdeaw5cb",
  },
  {
    name: "3 прав призма",
    url: "https://www.geogebra.org/calculator/xubnkzhz",
  },
  {
    name: "6 прав призма",
    url: "https://www.geogebra.org/calculator/v2chmgg7",
  },
];

const copyItems = [
  {
    name: "cos x",
    text: "Функция \\(y=\\cos x\\) убывает на промежутке \\([0 ; \\pi]\\) и возрастает на промежутке \\([\\pi ; 2 \\pi]\\).\n\nФункция \\(y=\\cos x\\) на промежутке \\([0 ; 2 \\pi]\\) имеет два нуля: \\(x=\\dfrac{\\pi}{2}\\), \\(x=\\dfrac{3 \\pi}{2}\\).\n\nФункция \\(y=\\cos x\\) на промежутке \\([0 ; 2 \\pi]\\) достигает своего наибольшего значения, равного \\(1\\), при \\(x=0\\) или \\(x=2 \\pi\\) и наименьшего значения, равного \\(-1\\), при \\(x=\\pi\\).\n\nФункция \\(y=\\cos x\\) на промежутке \\([0 ; 2 \\pi]\\) принимает все значения из промежутка \\([-1 ; 1]\\).\n\nНа всей области определения график функции \\(y=\\cos x\\) можно получить из построенного графика с помощью параллельных переносов на векторы с координатами \\((2 \\pi n ; 0), n \\in\\Z\\), так как главный период функции косинуса равен \\(2\\pi\\).",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const container = document.createElement("div");
  container.id = "extra-links-container";

  const menu = document.createElement("div");
  menu.id = "extra-links-menu";

  extraLinks.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.url;
    a.textContent = link.name;
    a.target = "_blank";
    a.className = "extra-link-item";
    menu.appendChild(a);
  });

  const btn = document.createElement("button");
  btn.id = "extra-links-btn";
  btn.innerHTML = "Чертежи";
  btn.onclick = (e) => {
    e.stopPropagation();
    menu.classList.toggle("open");
  };

  container.appendChild(menu);
  container.appendChild(btn);
  document.body.appendChild(container);

  document.addEventListener("click", (e) => {
    if (!container.contains(e.target)) {
      menu.classList.remove("open");
    }
  });

  const copyContainer = document.createElement("div");
  copyContainer.id = "copy-links-container";

  const copyMenu = document.createElement("div");
  copyMenu.id = "copy-links-menu";

  copyItems.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item.name;
    div.className = "copy-link-item";
    div.onclick = (e) => {
      e.stopPropagation();
      copy(item.text);
      copyMenu.classList.remove("open");
    };
    copyMenu.appendChild(div);
  });

  const copyBtn = document.createElement("button");
  copyBtn.id = "copy-links-btn";
  copyBtn.innerHTML = "Построение";
  copyBtn.onclick = (e) => {
    e.stopPropagation();
    copyMenu.classList.toggle("open");
  };

  copyContainer.appendChild(copyMenu);
  copyContainer.appendChild(copyBtn);
  document.body.appendChild(copyContainer);

  document.addEventListener("click", (e) => {
    if (!copyContainer.contains(e.target)) {
      copyMenu.classList.remove("open");
    }
  });
});
