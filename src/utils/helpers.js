export const setEventHandlers = (instance, props) => {
    if (props.buttonMode) {
        instance.buttonMode = props.buttonMode;
    }
    /** Фильтруем свойства начинающиеся с 'on' и далее заглавной буквой. Например, onClick */
    const eventHandlers = Object.keys(props).filter((key) => key.startsWith('on'));
    if (eventHandlers) {
        eventHandlers.forEach((handler) => {
            if (/[A-Z]/.test(handler[2])) {
                instance.interactive = true;
                const eventName = handler.replace('on', '').toLowerCase();
                instance.on(eventName, props[handler]);
            }
        })
    }
}