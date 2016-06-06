;(function($) {

  'use strict';

  var tpl = '<div class="number-keyboard closed"><div class="number-keyboard__head number-keyboard--close"></div><div class="number-keyboard__body"><dl class="number-keyboard__row"><dd class="number-keyboard__col" data-key-value="7">7</dd><dd class="number-keyboard__col" data-key-value="8">8</dd><dd class="number-keyboard__col" data-key-value="9">9</dd></dl><dl class="number-keyboard__row"><dd class="number-keyboard__col" data-key-value="4">4</dd><dd class="number-keyboard__col" data-key-value="5">5</dd><dd class="number-keyboard__col" data-key-value="6">6</dd></dl><dl class="number-keyboard__row"><dd class="number-keyboard__col" data-key-value="1">1</dd><dd class="number-keyboard__col" data-key-value="2">2</dd><dd class="number-keyboard__col" data-key-value="3">3</dd></dl><dl class="number-keyboard__row"><dd class="number-keyboard__col"></dd><dd class="number-keyboard__col" data-key-value="0">0</dd><dd class="number-keyboard__col" data-key-value="-1"></dd></dl></div></div>';

  var $doc = $(document),
      $body = $('body'),
      $keyboard = $(tpl);

  var events = {
    open: 'number-keyboard:open',
    close: 'number-keyboard:close',
    input: 'number-keyboard:input'
  };

  $body.append($keyboard);

  $doc
    .on(events.open, function(e, $input) {
      $keyboard.removeClass('closed');
      $body.addClass('number-keyboard--opened');
      $keyboard.data('$input', $input);
    })

    .on(events.close, function() {
      $keyboard.addClass('closed');
      $body.removeClass('number-keyboard--opened');
    })

    .on('click', '.number-keyboard--close', function() {
      $doc.trigger(events.close);
    })

    .on('click', '.number-keyboard__col', function() {
      var keyValue = $(this).data('keyValue'),
          $input = $keyboard.data('$input');

      if (typeof keyValue === 'undefined' 
          || keyValue === null 
          || keyValue === '') {
        return;
      }

      $input.trigger(events.input, [keyValue]);
    });

})(jQuery);