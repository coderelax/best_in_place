/*
 * BestInPlace 3.0.0.alpha (2014)
 *
 * Depends:
 *	best_in_place.js
 *	jquery.ui.datepicker.js
 */
/*global BestInPlaceEditor */
BestInPlaceEditor.forms.date = {
    activateForm: function () {
        'use strict';
        var that = this,
            output = jQuery(document.createElement('form'))
                .addClass('form_in_place')
                .attr('action', 'javascript:void(0);')
                .attr('style', 'display:inline'),
            input_elt = jQuery(document.createElement('input'))
                .attr('type', 'text')
                .attr('name', this.attributeName)
                .attr('value', this.sanitizeValue(this.display_value));

        if (this.inner_class !== null) {
            input_elt.addClass(this.inner_class);
        }
        output.append(input_elt);

        this.element.html(output);
        this.setHtmlAttributes();
        this.element.find('input')[0].select();
        this.element.find("form").bind('submit', {editor: this}, BestInPlaceEditor.forms.input.submitHandler);
        this.element.find("input").bind('keyup', {editor: this}, BestInPlaceEditor.forms.input.keyupHandler);

      moment.tz.setDefault(window.currentUserTimezone);
      var rawDateValue = this.element.find("input").val();
      var dateValue = moment(Date.parse(rawDateValue));
      var defaultSettings = {
        onClose: function () { that.update(); },
        hour: dateValue.hours(),
        minute: dateValue.minutes(),
        timezone: dateValue.utcOffset()
      };
      if(BestInPlaceEditor.forms.date.datetimeDefaultSettings){
        defaultSettings = $.extend({}, BestInPlaceEditor.forms.date.datetimeDefaultSettings, defaultSettings);
      };
      this.element.find('input')
        .datetimepicker(defaultSettings)
        .datetimepicker('show');
    },

    getValue: function () {
        'use strict';
        return this.sanitizeValue(this.element.find("input").val());
    },

    submitHandler: function (event) {
        'use strict';
        event.data.editor.update();
    },

    keyupHandler: function (event) {
        'use strict';
        if (event.keyCode === 27) {
            event.data.editor.abort();
        }
    }
}
