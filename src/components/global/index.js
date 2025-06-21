export default {
  install(app) {
    const components = import.meta.glob('./*.vue', { eager: true });

    for (const path in components) {
      const component = components[path].default;
      const filename = path.split('/').pop().replace('.vue', '');

      const tagName = 'u-' + filename.toLowerCase(); // jadikan u-btn, u-card, dst

      app.component(tagName, component);
    }
  },
};