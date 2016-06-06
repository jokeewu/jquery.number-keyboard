;(function($) {

  var 
    $doc = $(document),
    $body = $('body'),
    passwordSelector = '[type="epassword"]',
    fillChar = '&bull;',
    defaultSize = 6,
    keyboardEvents = {
      open: 'number-keyboard:open',
      close: 'number-keyboard:close',
      input: 'number-keyboard:input'
    },
    events = {
      refresh: 'epassword:refresh',
      change: 'change',
      complete: 'complete'
    };

  function render() {
    var $password = $(passwordSelector);
    $password.each(function() {
      var $this = $(this);

      if ($this.hasClass('initialized')) {
        return;
      }

      var tpls = [
        '<dl class="virtual-input__epassword">'
      ],
      size = $this.attr('size');

      if (typeof size === 'undefined') {
        size = defaultSize;
        $this.attr('size', size);
      }

      for (var i = 0; i < size; i++) {
        tpls.push('<dd class="virtual-input__epassword__item"></dd>');
      }

      tpls.push('</dl>');
      $this.html(tpls.join(''));
      updateView($this);
      $this.addClass('initialized');
    });
  }

  function updateValue($password, keyValue) {
    var value = $password.attr('value'),
        size = parseInt($password.attr('size')),
        vl;

    if (typeof value === 'undefined') {
      value = '';
      vl = 0;
    } else {
      value = String(value);
      vl = value.length;
    }

    // value.length < size
    // keyValue === -1
    // update value & view
    
    // input
    if (keyValue > -1 && vl < size) {
      value = [value, keyValue].join('');
      $password.attr('value', value);
      vl++;
      $password.trigger(events.change, [value]);
    }

    // clear
    if (keyValue === -1 && vl > 0) {
      value = value.slice(0, vl - 1);
      $password.attr('value', value);
      vl--;
      $password.trigger(events.change, [value]);
    }

    if (vl === size) {
      $password.trigger(events.complete, [value]);
    }
  }

  function updateView($password) {
    $password.each(function() {
      var $this = $(this),
          value = $this.attr('value'),
          $elements = $this.find('.virtual-input__epassword__item'),
          vl = typeof value === 'undefined' ? 0 : String(value).length;

        $elements.each(function(i) {
          if (i < vl) {
              $(this).html(fillChar);
          } else {
              $(this).html('');
          }
        });
    });
  }

  $doc
    .on(events.refresh, render)
    .trigger(events.refresh)

    .on('click', passwordSelector,function() {
      $doc.trigger(keyboardEvents.open, [$(this)]);
    })

    .on(keyboardEvents.input, passwordSelector, function(e, keyValue) {
      var $this = $(this);
      updateValue($this, keyValue);
      updateView($this);
    });

})(jQuery);