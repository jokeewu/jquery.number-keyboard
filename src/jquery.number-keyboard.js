(function($) {

    var $doc = $(document),
        $body = $('body');

    var Keyboard = {

        _tpl: '<div class="number-keyboard hide"><div class="number-keyboard--close"></div><div class="number-keyboard__row"><div class="number-keyboard__col number-keyboard--key" data-key-value="1">1</div><div class="number-keyboard__col number-keyboard--key" data-key-value="2">2</div><div class="number-keyboard__col number-keyboard--key" data-key-value="3">3</div></div><div class="number-keyboard__row"><div class="number-keyboard__col number-keyboard--key" data-key-value="4">4</div><div class="number-keyboard__col number-keyboard--key" data-key-value="5">5</div><div class="number-keyboard__col number-keyboard--key" data-key-value="6">6</div></div><div class="number-keyboard__row"><div class="number-keyboard__col number-keyboard--key" data-key-value="7">7</div><div class="number-keyboard__col number-keyboard--key" data-key-value="8">8</div><div class="number-keyboard__col number-keyboard--key" data-key-value="9">9</div></div><div class="number-keyboard__row"><div class="number-keyboard__col"></div><div class="number-keyboard__col number-keyboard--key" data-key-value="0">0</div><div class="number-keyboard__col number-keyboard--clear"></div></div></div>',

        _bindEventTypes: [],

        _currentEventType: '',

        _$keyboard: null,

        init: function() {
            this._$keyboard = $(this._tpl);
            this._render();
            this._bindEvent();
        },

        _render: function() {
            // 判断是否存在
            $body.append(this._$keyboard);
        },

        _bindEvent: function() {
            var self = this;
            $doc
                // 关闭键盘
                .on('click', '.number-keyboard--close', function() {
                    self.close();
                })

                // 数字点击
                .on('click', '.number-keyboard--key', function() {
                    var keyValue = $(this).data('keyValue');
                    $doc.trigger(self._currentEventType, ['msg', keyValue]);
                })

                // 清除键点击
                .on('click', '.number-keyboard--clear', function() {
                    $doc.trigger(self._currentEventType, ['cmd', 'clear']);
                });
        },

        setEventType: function(eventType) {
            if ($.inArray(eventType, this._bindEventTypes) === -1) {
                this._bindEventTypes.push(eventType);
            }

            this._currentEventType = eventType;
        },

        open: function() {
            this._$keyboard.removeClass('hide');
        },

        close: function() {
            this._$keyboard.addClass('hide');
        }
    };

    $.extend({
        NumberKeyboard: Keyboard
    });

})(jQuery);