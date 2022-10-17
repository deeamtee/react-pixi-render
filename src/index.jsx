var path = window.location.pathname;

/** Пример рендера аналогичного ReactDOM */
if (path === '/dom') {
    require('./examples/dom/dom');
}

/** Пример ренедера в PIXI */
if (path === '/initial') {
    require('./examples/initial-pixi');
}

/** Пример ренедера в PIXI - удаление */
if (path === '/delete') {
    require('./examples/delete');
}

/** Пример ренедера в PIXI - добавление спрайта */
if (path === '/add') {
    require('./examples/add');
}

/** Пример ренедера в PIXI - обновление данных */
if (path === '/update') {
    require('./examples/final-pixi');
}

/** Игра */
if (path === '/snake') {
    require('./examples/snake');
}

if (path === '/hunter') {
    require('./examples/hunter');
}
