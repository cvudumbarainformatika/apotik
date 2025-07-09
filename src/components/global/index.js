export default {
  install(app) {
    const components = import.meta.glob('./*.vue', { eager: true });

    function toKebabCase(str) {
      return str
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // abcX -> abc-X
        .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2') // XMLParser -> XML-Parser
        .toLowerCase()
    }

    for (const path in components) {
      const component = components[path].default;
      const filename = path.split('/').pop().replace('.vue', '');

      const tagName = 'u-' + toKebabCase(filename); // u-btn(); // jadikan u-btn, u-card, dst

      app.component(tagName, component);
    }
  },
};