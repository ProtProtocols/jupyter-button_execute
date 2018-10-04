var jupyter-button_execute = require('./index');
var base = require('@jupyter-widgets/base');

module.exports = {
  id: 'jupyter-button_execute',
  requires: [base.IJupyterWidgetRegistry],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: 'jupyter-button_execute',
          version: jupyter-button_execute.version,
          exports: jupyter-button_execute
      });
  },
  autoStart: true
};

