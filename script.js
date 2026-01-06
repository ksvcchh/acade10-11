const STORAGE_KEY = 'customButtons_10_11';
const GRAPHS_KEY = 'graphs_10_11_v2';
const DRAWINGS_KEY = 'drawings_10_11_v2';

let buttons = [];
let graphs = [];
let drawings = [];
let editingButtonId = null;
let editingGraphsId = null;
let editingDrawingsId = null;
let isEditMode = false;
let draggedButtonId = null;

function copy(text) {
    navigator.clipboard.writeText(text);
}

function exportConfig() {
    const config = {
        version: 1,
        exportDate: new Date().toISOString(),
        buttons: buttons,
        graphs: graphs,
        drawings: drawings
    };
    
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = '10_11_config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importConfig(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const config = JSON.parse(e.target.result);
            
            if (!config.buttons || !Array.isArray(config.buttons)) {
                throw new Error('Invalid config: missing buttons array');
            }
            
            if (config.buttons && Array.isArray(config.buttons)) {
                buttons = config.buttons;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(buttons));
            }
            
            if (config.graphs && Array.isArray(config.graphs)) {
                graphs = config.graphs;
                localStorage.setItem(GRAPHS_KEY, JSON.stringify(graphs));
            }
            
            if (config.drawings && Array.isArray(config.drawings)) {
                drawings = config.drawings;
                localStorage.setItem(DRAWINGS_KEY, JSON.stringify(drawings));
            }
            
            renderButtons();
            renderDropdowns();
            
            alert('Конфигурация успешно импортирована!');
        } catch (err) {
            alert('Ошибка при импорте: ' + err.message);
        }
    };
    
    reader.onerror = function() {
        alert('Ошибка при чтении файла');
    };
    
    reader.readAsText(file);
}

function openBookFile(filename) {
    const path = `./учебники/${filename}.pdf`;
    const newTab = localStorage.getItem("newPage") === "true";
    window.open(path, newTab ? "_blank" : "_self");
    return true;
}

function isValidBook(book) {
    if (book.startsWith("http")) {
        window.open(book, "_self");
        return true;
    }

    if (book == "ЦТ: Теория. Примеры. Тесты. Ларченко") {
        return openBookFile("ЦТ_ Теория. Примеры. Тесты. Ларченко");
    }

    if (book == "Алгебра и начала математического анализа. Дидактические материалы. 11 класс. Профильный уровень - Соломин В.Н., Столбов К.М., Пратусевич М.Я.") {
        return openBookFile("Алгебра и начала математического анализа. Дидактические материалы. 11 класс. Профильный уровень - Соломин В.Н., Столбов К.М., Пратусевич М.");
    }

    if (book == "Геометрия 11-ый класс. Смирнов") {
        return openBookFile("Геометрия. Смирнов 11, ест-мат");
    }

    if (book == "Решение уравнений и неравенств. Садовничий") {
        return openBookFile("Решение уравнений и неравенств");
    }

    if (book == "Геометрия 10-11 Рабинович") {
        return openBookFile("Геометрия. Задачи и упражнения на готовых чертежах. 10-11 классы - Рабинович Е.М.");
    }

    if (book == "Алгебра и элементарные функции. Часть 1 и 2. Е. С. Кочетков") {
        const part = prompt("Какая часть?");
        if (part == "1") {
            return openBookFile("Алгебра и элементарные функции. Часть 1. Е. С. Кочетков");
        }
        if (part == "2") {
            return openBookFile("Алгебра и элементарные функции. Часть 2. Е. С. Кочетков");
        }
        return false;
    }

    if (book == "Алгебра и начала математического анализа. 10 класс. Мордкович") {
        const part = prompt("Какая часть? ('1', если задания, '2' если теория)");
        if (part == "1") {
            return openBookFile("Алгебра и начала математического анализа. 10 класс. Мордкович 2 часть");
        }
        if (part == "2") {
            return openBookFile("Алгебра и начала математического анализа. 10 класс. Мордкович 1 часть");
        }
        return false;
    }

    if (book == "Алгебра и начала математического анализа. 11 класс. Мордкович") {
        const part = prompt("Какая часть? ('1', если задания, '2' если теория)");
        if (part == "1") {
            return openBookFile("Алгебра и начала математического анализа. 11 класс. Мордкович задачник");
        }
        if (part == "2") {
            return openBookFile("Алгебра и начала математического анализа. 11 класс. Мордкович");
        }
        return false;
    }

    return openBookFile(book);
}

function showNotification() {
    const notification = document.getElementById("notification");
    notification.classList.remove("fade-out");
    notification.classList.add("show");
    setTimeout(() => notification.classList.add("fade-out"), 2000);
    setTimeout(() => notification.classList.remove("show"), 2500);
}

function bookSearch(book) {
    isValidBook(book);
}

function isModalOpen() {
    const modals = ['button-editor-modal', 'graphs-editor-modal', 'drawings-editor-modal'];
    return modals.some(id => {
        const modal = document.getElementById(id);
        return modal && modal.classList.contains('open');
    });
}

function loadButtons() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
                buttons = parsed;
            } else {
                buttons = [];
            }
        } else {
            buttons = [];
        }
    } catch (e) {
        buttons = [];
    }
    renderButtons();
}

function saveButtons() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(buttons));
}

function toggleEditMode() {
    isEditMode = !isEditMode;
    const editBtn = document.getElementById('edit-mode-btn');
    if (isEditMode) {
        editBtn.textContent = 'Готово';
        editBtn.classList.add('active');
    } else {
        editBtn.textContent = 'Изменить расположение';
        editBtn.classList.remove('active');
    }
    renderButtons();
}

function deleteButtonById(id) {
    if (!confirm('Удалить эту кнопку?')) return;
    buttons = buttons.filter(b => b.id !== id);
    saveButtons();
    renderButtons();
}

function handleDragStart(e, id) {
    draggedButtonId = id;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedButtonId = null;
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e, id) {
    if (draggedButtonId && draggedButtonId !== id) {
        e.target.closest('.button-wrapper').classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    e.target.closest('.button-wrapper')?.classList.remove('drag-over');
}

function handleDrop(e, targetId) {
    e.preventDefault();
    if (!draggedButtonId || draggedButtonId === targetId) return;
    
    const draggedIndex = buttons.findIndex(b => b.id === draggedButtonId);
    const targetIndex = buttons.findIndex(b => b.id === targetId);
    
    if (draggedIndex === -1 || targetIndex === -1) return;
    
    const [draggedItem] = buttons.splice(draggedIndex, 1);
    buttons.splice(targetIndex, 0, draggedItem);
    
    saveButtons();
    renderButtons();
}

function renderButtons() {
    const container = document.getElementById('buttons-container');
    if (!container) return;
    container.innerHTML = '';
    
    if (isEditMode) {
        container.classList.add('edit-mode');
    } else {
        container.classList.remove('edit-mode');
    }

    buttons.forEach((btn, index) => {
        if (isEditMode) {
            const wrapper = document.createElement('div');
            wrapper.className = 'button-wrapper edit-mode';
            wrapper.draggable = true;
            wrapper.dataset.id = btn.id;
            
            const animDelay = (index * 0.05 + Math.random() * 0.1).toFixed(2);
            const animDuration = (0.12 + Math.random() * 0.06).toFixed(2);
            wrapper.style.animationDelay = animDelay + 's';
            wrapper.style.animationDuration = animDuration + 's';
            
            const deleteBtn = document.createElement('span');
            deleteBtn.className = 'delete-x-btn';
            deleteBtn.innerHTML = '×';
            deleteBtn.onclick = (e) => {
                e.stopPropagation();
                deleteButtonById(btn.id);
            };
            
            const button = document.createElement('button');
            button.className = 'main-btn';
            button.textContent = btn.name;
            
            wrapper.ondragstart = (e) => handleDragStart(e, btn.id);
            wrapper.ondragend = handleDragEnd;
            wrapper.ondragover = handleDragOver;
            wrapper.ondragenter = (e) => handleDragEnter(e, btn.id);
            wrapper.ondragleave = handleDragLeave;
            wrapper.ondrop = (e) => handleDrop(e, btn.id);
            
            wrapper.appendChild(deleteBtn);
            wrapper.appendChild(button);
            container.appendChild(wrapper);
        } else {
            const button = document.createElement('button');
            button.textContent = btn.name;
            button.onclick = () => copy(btn.content);
            button.oncontextmenu = (e) => {
                e.preventDefault();
                openEditModal(btn.id);
            };
            container.appendChild(button);
        }
    });
}

function openAddModal() {
    editingButtonId = null;
    document.getElementById('modal-title').textContent = 'Новая кнопка';
    document.getElementById('button-name-input').value = '';
    document.getElementById('button-content-input').value = '';
    document.getElementById('delete-button-btn').style.display = 'none';
    document.getElementById('button-editor-modal').classList.add('open');
}

function openEditModal(id) {
    editingButtonId = id;
    const btn = buttons.find(b => b.id === id);
    if (!btn) return;

    document.getElementById('modal-title').textContent = 'Редактировать';
    document.getElementById('button-name-input').value = btn.name;
    document.getElementById('button-content-input').value = btn.content;
    document.getElementById('delete-button-btn').style.display = 'block';
    document.getElementById('button-editor-modal').classList.add('open');
}

function saveButton() {
    const name = document.getElementById('button-name-input').value.trim();
    const content = document.getElementById('button-content-input').value;

    if (!name) {
        alert('Введите название кнопки');
        return;
    }

    if (editingButtonId) {
        const btn = buttons.find(b => b.id === editingButtonId);
        if (btn) {
            btn.name = name;
            btn.content = content;
        }
    } else {
        buttons.push({
            id: Date.now().toString(),
            name: name,
            content: content
        });
    }

    saveButtons();
    renderButtons();
    closeButtonModal();
}

function deleteButton() {
    if (!editingButtonId) return;
    if (!confirm('Удалить эту кнопку?')) return;

    buttons = buttons.filter(b => b.id !== editingButtonId);
    saveButtons();
    renderButtons();
    closeButtonModal();
}

function closeButtonModal() {
    document.getElementById('button-editor-modal').classList.remove('open');
    editingButtonId = null;
}

function loadDropdowns() {
    try {
        const storedGraphs = localStorage.getItem(GRAPHS_KEY);
        if (storedGraphs) {
            const parsed = JSON.parse(storedGraphs);
            graphs = Array.isArray(parsed) ? parsed : [];
        } else {
            graphs = [];
        }
    } catch (e) {
        graphs = [];
    }
    
    try {
        const storedDrawings = localStorage.getItem(DRAWINGS_KEY);
        if (storedDrawings) {
            const parsed = JSON.parse(storedDrawings);
            drawings = Array.isArray(parsed) ? parsed : [];
        } else {
            drawings = [];
        }
    } catch (e) {
        drawings = [];
    }
    
    renderDropdowns();
}

function saveDropdowns() {
    localStorage.setItem(GRAPHS_KEY, JSON.stringify(graphs));
    localStorage.setItem(DRAWINGS_KEY, JSON.stringify(drawings));
}

function renderDropdowns() {
    renderGraphsMenu();
    renderDrawingsMenu();
}

function renderGraphsMenu() {
    const menu = document.getElementById('graphs-menu');
    if (!menu) return;
    menu.innerHTML = '';
    
    graphs.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'dropdown-item';
        btn.textContent = item.name;
        btn.onclick = (e) => {
            e.preventDefault();
            copy(item.content);
            menu.classList.remove('open');
        };
        btn.oncontextmenu = (e) => {
            e.preventDefault();
            openGraphsEditModal(item.id);
        };
        menu.appendChild(btn);
    });
    
    const addBtn = document.createElement('button');
    addBtn.className = 'add-item-btn';
    addBtn.textContent = '+ Добавить';
    addBtn.onclick = (e) => {
        e.stopPropagation();
        openGraphsAddModal();
    };
    menu.appendChild(addBtn);
}

function renderDrawingsMenu() {
    const menu = document.getElementById('drawings-menu');
    if (!menu) return;
    menu.innerHTML = '';
    
    drawings.forEach(item => {
        const link = document.createElement('a');
        link.href = item.url;
        link.target = '_blank';
        link.textContent = item.name;
        link.oncontextmenu = (e) => {
            e.preventDefault();
            openDrawingsEditModal(item.id);
        };
        menu.appendChild(link);
    });
    
    const addBtn = document.createElement('button');
    addBtn.className = 'add-item-btn';
    addBtn.textContent = '+ Добавить';
    addBtn.onclick = (e) => {
        e.stopPropagation();
        openDrawingsAddModal();
    };
    menu.appendChild(addBtn);
}

function openGraphsAddModal() {
    editingGraphsId = null;
    document.getElementById('graphs-modal-title').textContent = 'Новый элемент';
    document.getElementById('graphs-name-input').value = '';
    document.getElementById('graphs-content-input').value = '';
    document.getElementById('delete-graphs-btn').style.display = 'none';
    document.getElementById('graphs-editor-modal').classList.add('open');
    closeDropdownMenus();
}

function openGraphsEditModal(id) {
    editingGraphsId = id;
    const item = graphs.find(i => i.id === id);
    if (!item) return;
    
    document.getElementById('graphs-modal-title').textContent = 'Редактировать';
    document.getElementById('graphs-name-input').value = item.name;
    document.getElementById('graphs-content-input').value = item.content;
    document.getElementById('delete-graphs-btn').style.display = 'block';
    document.getElementById('graphs-editor-modal').classList.add('open');
    closeDropdownMenus();
}

function saveGraphsItem() {
    const name = document.getElementById('graphs-name-input').value.trim();
    const content = document.getElementById('graphs-content-input').value;
    
    if (!name) {
        alert('Введите название');
        return;
    }
    
    if (editingGraphsId) {
        const item = graphs.find(i => i.id === editingGraphsId);
        if (item) {
            item.name = name;
            item.content = content;
        }
    } else {
        graphs.push({
            id: Date.now().toString(),
            name: name,
            content: content
        });
    }
    
    saveDropdowns();
    renderDropdowns();
    closeGraphsModal();
}

function deleteGraphsItem() {
    if (!editingGraphsId) return;
    if (!confirm('Удалить этот элемент?')) return;
    
    graphs = graphs.filter(i => i.id !== editingGraphsId);
    saveDropdowns();
    renderDropdowns();
    closeGraphsModal();
}

function closeGraphsModal() {
    document.getElementById('graphs-editor-modal').classList.remove('open');
    editingGraphsId = null;
}

function openDrawingsAddModal() {
    editingDrawingsId = null;
    document.getElementById('drawings-modal-title').textContent = 'Новый элемент';
    document.getElementById('drawings-name-input').value = '';
    document.getElementById('drawings-url-input').value = '';
    document.getElementById('delete-drawings-btn').style.display = 'none';
    document.getElementById('drawings-editor-modal').classList.add('open');
    closeDropdownMenus();
}

function openDrawingsEditModal(id) {
    editingDrawingsId = id;
    const item = drawings.find(i => i.id === id);
    if (!item) return;
    
    document.getElementById('drawings-modal-title').textContent = 'Редактировать';
    document.getElementById('drawings-name-input').value = item.name;
    document.getElementById('drawings-url-input').value = item.url;
    document.getElementById('delete-drawings-btn').style.display = 'block';
    document.getElementById('drawings-editor-modal').classList.add('open');
    closeDropdownMenus();
}

function saveDrawingsItem() {
    const name = document.getElementById('drawings-name-input').value.trim();
    const url = document.getElementById('drawings-url-input').value.trim();
    
    if (!name || !url) {
        alert('Заполните все поля');
        return;
    }
    
    if (editingDrawingsId) {
        const item = drawings.find(i => i.id === editingDrawingsId);
        if (item) {
            item.name = name;
            item.url = url;
        }
    } else {
        drawings.push({
            id: Date.now().toString(),
            name: name,
            url: url
        });
    }
    
    saveDropdowns();
    renderDropdowns();
    closeDrawingsModal();
}

function deleteDrawingsItem() {
    if (!editingDrawingsId) return;
    if (!confirm('Удалить этот элемент?')) return;
    
    drawings = drawings.filter(i => i.id !== editingDrawingsId);
    saveDropdowns();
    renderDropdowns();
    closeDrawingsModal();
}

function closeDrawingsModal() {
    document.getElementById('drawings-editor-modal').classList.remove('open');
    editingDrawingsId = null;
}

function closeDropdownMenus() {
    document.getElementById('graphs-menu').classList.remove('open');
    document.getElementById('drawings-menu').classList.remove('open');
}

document.addEventListener('DOMContentLoaded', function() {
    const tabButton = document.getElementById('newPageStatus');
    const savedStatus = localStorage.getItem('newPageStatus');
    if (savedStatus) {
        tabButton.textContent = savedStatus;
    }

    tabButton.onclick = function() {
        if (tabButton.textContent === 'В той же вкладке') {
            tabButton.textContent = 'В новой вкладке';
            localStorage.setItem('newPageStatus', 'В новой вкладке');
            localStorage.setItem('newPage', 'true');
        } else {
            tabButton.textContent = 'В той же вкладке';
            localStorage.setItem('newPageStatus', 'В той же вкладке');
            localStorage.setItem('newPage', 'false');
        }
    };

    const graphsBtn = document.getElementById('graphs-btn');
    const graphsMenu = document.getElementById('graphs-menu');
    const drawingsBtn = document.getElementById('drawings-btn');
    const drawingsMenu = document.getElementById('drawings-menu');

    graphsBtn.onclick = function(e) {
        e.stopPropagation();
        drawingsMenu.classList.remove('open');
        graphsMenu.classList.toggle('open');
    };

    drawingsBtn.onclick = function(e) {
        e.stopPropagation();
        graphsMenu.classList.remove('open');
        drawingsMenu.classList.toggle('open');
    };

    document.addEventListener('click', function(e) {
        if (!graphsMenu.contains(e.target) && e.target !== graphsBtn) {
            graphsMenu.classList.remove('open');
        }
        if (!drawingsMenu.contains(e.target) && e.target !== drawingsBtn) {
            drawingsMenu.classList.remove('open');
        }
    });

    document.getElementById('add-button-btn').onclick = openAddModal;
    document.getElementById('edit-mode-btn').onclick = toggleEditMode;
    document.getElementById('save-button-btn').onclick = saveButton;
    document.getElementById('cancel-button-btn').onclick = closeButtonModal;
    document.getElementById('delete-button-btn').onclick = deleteButton;

    document.getElementById('button-editor-modal').onclick = function(e) {
        if (e.target === this) closeButtonModal();
    };
    
    document.getElementById('save-graphs-btn').onclick = saveGraphsItem;
    document.getElementById('cancel-graphs-btn').onclick = closeGraphsModal;
    document.getElementById('delete-graphs-btn').onclick = deleteGraphsItem;
    
    document.getElementById('graphs-editor-modal').onclick = function(e) {
        if (e.target === this) closeGraphsModal();
    };
    
    document.getElementById('save-drawings-btn').onclick = saveDrawingsItem;
    document.getElementById('cancel-drawings-btn').onclick = closeDrawingsModal;
    document.getElementById('delete-drawings-btn').onclick = deleteDrawingsItem;
    
    document.getElementById('drawings-editor-modal').onclick = function(e) {
        if (e.target === this) closeDrawingsModal();
    };

    document.getElementById('export-config-btn').onclick = exportConfig;
    document.getElementById('import-config-btn').onclick = function() {
        document.getElementById('import-file-input').click();
    };
    document.getElementById('import-file-input').onchange = function(e) {
        if (e.target.files.length > 0) {
            importConfig(e.target.files[0]);
            e.target.value = '';
        }
    };

    document.addEventListener('paste', function(event) {
        if (isModalOpen()) {
            return;
        }
        event.preventDefault();
        const book = event.clipboardData.getData('text/plain').trim();
        let searchTerm = book;

        if (book.includes('Book') && !book.includes('Comment')) {
            searchTerm = book.split('Book:').map(el => el.trim())[1];
        } else if (book.includes('Book') && book.includes('Comment')) {
            searchTerm = book.split('Book:')[1].split('Comment:')[0].trim();
        }

        bookSearch(searchTerm);
    });

    document.addEventListener('dragover', function(event) {
        if (isModalOpen() || isEditMode) return;
        event.preventDefault();
    });

    document.addEventListener('drop', function(event) {
        if (isModalOpen() || isEditMode) return;
        event.preventDefault();
        const book = event.dataTransfer.getData('text/plain').trim();
        let searchTerm = book;

        if (book.includes('Book') && !book.includes('Comment')) {
            searchTerm = book.split('Book:').map(el => el.trim())[1];
        } else if (book.includes('Book') && book.includes('Comment')) {
            searchTerm = book.split('Book:')[1].split('Comment:')[0].trim();
        }

        bookSearch(searchTerm);
    });

    loadButtons();
    loadDropdowns();
});
