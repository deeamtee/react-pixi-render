import Reconciler from "react-reconciler";
import * as PIXI from "pixi.js";
import { setEventHandlers } from '../utils/utils';

const hostConfig = {
  now: Date.now,
  supportsMutation: true,
  isPrimaryRenderer: false,

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
    return false;
  },

  /**
   * Создаёт инстанс согласно типу переданного хост-компонента и задаёт ему props.
   * Вызывается на рендер фазе для всех нод, кроме текстовых листьев.
   *
   * Возвращает созданный инстанс.
   * */
  createInstance: (type, props) => {
    const instance = new PIXI.Sprite(props.texture);

    instance.width = props.width;
    instance.height = props.height;

    return instance;
  },

  /* Как createInstance только для текстовых нод */
  createTextInstance(text) {
    throw new Error('Text instance is not supported')
  },

  /**
   * Прикрепляет ребёнка к родителю.
   * Вызывается на рендер фазе.
   */
  appendInitialChild: (parent, child) => {
    parent.addChild(child);
  },

  /*
   * Добавляет ребенка корневому контейнеру
   * Вызывается для каждого ребенка во время коммит-фазы
   */
  appendChildToContainer: (container, child) => {
    container.addChild(child);
  },
  /**
   * Вызывается во время коммит-фазы для родителя,
   * поддерево которого должно быть удалено
   */
  removeChild: (parentInstance, child) => {
    parentInstance.removeChild(child);
  },
  removeChildFromContainer: (container, child) => {
    container.removeChild(child);
  },
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
  commitUpdate: (instance, updatePayload, type, oldProps, newProps) => {

    if (type === "sprite") {
      const { x = 0, y = 0, rotation } = updatePayload;
      instance.x = x;
      instance.y = y;
      if (rotation) {
        instance.rotation = rotation;
      }
    }
  },

  /**
   * Вызывается, если на ноде finalizeInitialChildren вернул true.
   *
   * Позволяет выполнить некоторую дополнительную работу, после того,
   * как узел был присоеденён к дереву в первый раз.
   */
  commitMount: () => { },
  finalizeInitialChildren: () => false,

  appendChild: (parent, child) => {
    parent.addChild(child);
  },
  /*
  * Вставляет ребёнка перед некоторым узлом,
  * который уже существует на экране. 
  * Вызывается во время коммит-фазы
  */
  insertBefore: (parent, child, before) => {
    parent.addChild(child);
  },
  insertInContainerBefore: (container, child, before) => {
    container.addChild(child);
  },
  detachDeletedInstance: (instance) => { },
  getPublicInstance: (instance) => instance,
  getRootHostContext: (rootContainerInstance) => null,
  getChildHostContext: (parentHostContext, type, rootContainerInstance) => { },

  prepareForCommit: (rootContainerInstance) => { },
  resetAfterCommit: (rootContainerInstance) => { },
};

export const render = (jsx, root) => {
  const reconciler = Reconciler(hostConfig);
  const container = reconciler.createContainer(root);

  reconciler.updateContainer(jsx, container, null, () => { });
};
