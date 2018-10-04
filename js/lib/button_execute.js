var widgets = require('@jupyter-widgets/base');
var _ = require('lodash');


// Custom Model. Custom widgets models must at least provide default values
// for model attributes, including
//
//  - `_view_name`
//  - `_view_module`
//  - `_view_module_version`
//
//  - `_model_name`
//  - `_model_module`
//  - `_model_module_version`
//
//  when different from the base class.

// When serialiazing the entire widget state for embedding, only values that
// differ from the defaults will be specified.
var ExecuteButtonModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
        _model_name : 'ExecuteButtonModel',
        _view_name : 'ExecuteButtonView',
        _model_module : 'jupyter-button_execute',
        _view_module : 'jupyter-button_execute',
        _model_module_version : '0.3.0',
        _view_module_version : '0.3.0',
        n_next_cells : 1,
        button_text : "Execute next cells",
        button_style : "",
        disabled: false
    })
});


// Custom View. Renders the widget model.
var ExecuteButtonView = widgets.DOMWidgetView.extend({
    render: function() {
        this.button_input = document.createElement('input');
        this.button_input.type = 'button';
        this.button_input.value = this.model.get("button_text");
        this.button_input.disabled = this.model.get("disabled");
        this.button_input.onclick = this.execute_cells.bind(this);

        // add the custom style
        this.update_button_style();

        // add proper classes
        this.button_input.classList.add('p-Widget');
        this.button_input.classList.add('jupyter-widgets');
        this.button_input.classList.add('jupyter-button');
        this.button_input.classList.add('widget-button');

        // listen to value changes
        this.model.on('change:button_text', this.on_button_text_changed, this);
        this.model.on('change:button_style', this.on_style_changed, this);
        this.model.on('change:disabled', this.on_button_disabled, this);

        // save this cell to prevent future issues
        this.my_cell = IPython.notebook.get_anchor_index(this.el);

        this.el.appendChild(this.button_input);
    },

    execute_cells: function() {
        // tell the Python kernel that this was clicked
        this.send({event: 'click'});

        var startCell = this.my_cell + 1;
        var endCell = startCell + this.model.get("n_next_cells");

        IPython.notebook.execute_cell_range(startCell, endCell);
    },

    on_button_text_changed: function() {
        this.button_input.value = this.model.get("button_text");
    },

    on_style_changed: function() {
        this.update_button_style();
    },

    on_button_disabled: function() {
        this.button_input.disabled = this.model.get("disabled");
    },

    update_button_style: function() {
        // remove any existing style
        for (style_name in this.class_map) {
            this.button_input.classList.remove(this.class_map[style_name]);
        }

        // add the new style
        var new_style = this.model.get("button_style");

        if (new_style != "") {
            this.button_input.classList.add(this.class_map[new_style]);
        }
    },

    class_map: {
        primary: ['mod-primary'],
        success: ['mod-success'],
        info: ['mod-info'],
        warning: ['mod-warning'],
        danger: ['mod-danger']
    }
});


module.exports = {
    ExecuteButtonModel : ExecuteButtonModel,
    ExecuteButtonView : ExecuteButtonView
};
