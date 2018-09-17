//= require medium-editor/dist/js/medium-editor.js
//= require medium-editor-autolist/dist/autolist.js



$(document).on('rails_admin.dom_ready', function() {

  $('[data-richeditor=medium]').not('.js-initialized').each(function(index, domEle) {
    var $el = $(domEle)


    $editorEl = $('<div></div>').html($el.val());
    $editorEl.addClass($el.prop('class'));
    $el.after($editorEl)


    var autolist = new AutoList();
    var editor = new MediumEditor($editorEl[0], {
      autoLink: true,

      buttonLabels: 'fontawesome',
      extensions: {
          'autolist': autolist
      },

      toolbar: {
        /* These are the default options for the toolbar,
            if nothing is passed this is what is used */
        allowMultiParagraphSelection: true,

        buttons: ['bold', 'italic', 'underline',
        'anchor', 'h2', 'h3',
        'quote', 'unorderedlist', 'orderedlist', 'image'
        // "indent", "outdent"
      ],


        // buttons: Object.keys(MediumEditor.extensions.button.prototype.defaults),
        diffLeft: 0,
        diffTop: -10,
        firstButtonClass: 'medium-editor-button-first',
        lastButtonClass: 'medium-editor-button-last',
        relativeContainer: null,
        standardizeSelectionStart: false,
        static: false,
        /* options which only apply when static is true */
        align: 'center',
        sticky: false,
        updateOnEmptySelection: false
      }
    });

    // function debounce(fn, timeout) {
    //   var timer;

    //   return function() {
    //     if (timer) {
    //       clearTimeout(timer)
    //     }
    //     let args = arguments
    //     timer = setTimeout(function() {
    //       timer = null
    //       fn.apply(null, args);
    //     }, timeout);
    //   }
    // }

    function syncEditorToForm() {
      $el.html(editor.getContent())
    }

    // var debounceSyncEditorToForm = debounce(syncEditorToForm, 1000);
    editor.subscribe('editableInput', function (event, editable) {
      syncEditorToForm()
    });


    $el.addClass('js-initialized')//.wrap( "<div style='display: none'></div>" )
  })
});
