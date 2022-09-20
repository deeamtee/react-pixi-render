import Reconciler from "react-reconciler";

const hostConfig = {
  now: Date.now,
  supportsMutation: true,

  /*
   * Нужно ли обрабатывать вложенное содержимое как текст?
   * Вызывается во время рендер-фазы
   *
   * true: на следующем шаге будет создано представление узла
   * и дальнейший обход вложенного поддерева осуществляться не будет.
   * Текст будет задан на этапе создания createInstance
   * textarea.value, element.textContent
   * false: рекурсивная обработка поддерева продолжается
   * */
  shouldSetTextContent: (type, props) => {
    /* Здесь может быть настройка для textarea, dangerouslySetInnerHTML */
    return false;
  },

  /**
   * Создаёт инстанс согласно типу переданного хост-компонента и задаёт ему props.
   * Вызывается на рендер фазе для всех нод, кроме текстовых листьев.
   *
   * Возвращает созданный инстанс.
   * */
  createInstance: (type, props) => {
    const instance = document.createElement(type);
    if (props.className) {
      instance.className = props.className;
    }

    if (instance.tagName === "IMG" && props.src) {
      instance.src = props.src;
    }

    return instance;
  },

  /* Как createInstance только для текстовых нод */
  createTextInstance(text) {
    return document.createTextNode(text);
  },
  detachDeletedInstance: (instance) => { },

  /**
   * Прикрепляет ребёнка к родителю.
   * Вызывается на рендер фазе.
   */
  appendInitialChild: (parent, child) => {
    parent.appendChild(child);
  },

  /*
   * Добавляет ребенка корневому контейнеру
   * Вызывается для каждого ребенка во время коммит-фазы
   */
  appendChildToContainer: (container, child) => {
    container.appendChild(child);
  },
  removeChild: (parentInstance, child) => { },
  removeChildFromContainer: (container, child) => { },
  clearContainer: (container) => {
    container.innerHTML = "";
  },

  /*
   * Проверяет наличие изменений и говорит реконсилятору, изменилось ли что-то
   * Основная задача – найти их, но не вносить. Рекурсивно вызывается на всех
   * вершинах изменившегося поддерева (кроме текстовых) во время рендер-фазы.
   * */
  prepareUpdate: (instance, type, oldProps, newProps) => newProps,

  /*
   * Вносит изменения, найденные ранее. Вызывается в фазе коммита
   * на всех элементах, которые имеют updatePayload
   * */
  commitUpdate: (instance, updatePayload, type, oldProps, newProps) => { },

  /**
   * Вызывается, если на ноде finalizeInitialChildren вернул true.
   *
   * Позволяет выполнить некоторую дополнительную работу, после того,
   * как узел был присоеденён к дереву в первый раз.
   */
  commitMount: () => { },
  insertInContainerBefore: (container, child, before) => { },
  getPublicInstance: (instance) => instance,
  getRootHostContext: (rootContainerInstance) => null, // 1
  getChildHostContext: (parentHostContext, type, rootContainerInstance) => { },
  prepareForCommit: (rootContainerInstance) => { },
  resetAfterCommit: (rootContainerInstance) => { },
  finalizeInitialChildren: () => false, // 7
};

export const render = (jsx, root) => {
  const reconciler = Reconciler(hostConfig);
  const container = reconciler.createContainer(root);

  reconciler.updateContainer(jsx, container, null, () => { });
};
