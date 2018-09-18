//= require medium-editor/dist/js/medium-editor.js
//= require medium-editor-autolist/dist/autolist.js
// = require 'handlebars/dist/handlebars.runtime.min.js'
// = require 'blueimp-file-upload/js/jquery.fileupload.js'
// = require './medium-editor-insert-plugin.js'

// So rails tries to load application.js|css from jquery-sortable
// It's strange behavior of sprockets.
// So it just copies medium-editor-insert-plugin
// https://github.com/johnny/jquery-sortable/issues/134


$(document).on('rails_admin.dom_ready', function() {

  $('[data-richeditor=medium]').not('.js-initialized').each(function(index, domEle) {
    var $el = $(domEle)

    $editorEl = $('<div></div>')
      .html(
        $el.val()
          .replace(/(contenteditable="false"|contenteditable="true")/g, '')
      )
      .addClass($el.prop('class'))

    $el.after($editorEl)
    $editorEl.wrap("<div class='medium-editor-wrap'></div>");


    var autolist = new AutoList();
    var editor = new MediumEditor($editorEl[0], {
      autoLink: true,
      imageDragging: false,
      disableExtraSpaces: true,
      buttonLabels: 'fontawesome',
      extensions: {
        'autolist': autolist
      },
      toolbar: {
        buttons: [
          'bold', 'italic', 'underline',
          'anchor', 'h2', 'h3',
          'quote', 'unorderedlist', 'orderedlist'
        ]
      }
    });

    $editorEl.mediumInsert({
      editor: editor,
      addons: {
        images: {
          sorting: function() {}, // sorting plugin is a trash so I removed it
          fileUploadOptions: {
            url: '/article_photos/create',
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
          },
          deleteScript: '/article_photos/delete',

          preview: false, // preview is very laggy
          captions: true,
          autoGrid: 2 // (integer) Min number of images that automatically form a grid
        }
      }
    });

    function syncEditorToForm() {
      $el.html(
        editor.serialize()['element-0'].value
          .replace(/(contenteditable="true"|contenteditable="false")/g, '')
          .replace(/(medium-insert-active)/g, '')
      )
    }


    editor.subscribe('editableInput', syncEditorToForm);
    // because image drag don not triggers editableInput
    $editorEl.on('mouseleave', syncEditorToForm);

    $el.addClass('js-initialized').wrap("<div style='display: none'></div>")
  })
});
