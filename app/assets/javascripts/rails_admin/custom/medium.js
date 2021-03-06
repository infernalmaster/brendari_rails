//= require medium-editor/dist/js/medium-editor.js
//= require ./autolist.js

// I don't use it right now
/// = require 'handlebars/dist/handlebars.runtime.min.js'
/// = require 'blueimp-file-upload/js/jquery.fileupload.js'
/// = require ./medium-editor-insert-plugin.js

// So rails tries to load application.js|css from jquery-sortable
// It's strange behavior of sprockets.
// So it just copies medium-editor-insert-plugin
// https://github.com/johnny/jquery-sortable/issues/134

$(document).on("rails_admin.dom_ready", function() {
  $("[data-richeditor=medium]")
    .not(".js-initialized")
    .each(function(index, domEle) {
      var $el = $(domEle);

      function getTextareaContent() {
        return $el.val().trim() || "<p><br></p>";
      }

      var $editorEl = $("<div></div>")
        .html(getTextareaContent())
        .addClass($el.prop("class"));

      $el.before($editorEl);

      // show hide button
      var $showHide = $('<button type="button">Show/Hide HTML</button>');
      $el.before($showHide);
      $el.toggle();
      $showHide.on("click", function() {
        $el.toggle();
      });

      var autolist = new AutoList();
      var editor = new MediumEditor($editorEl[0], {
        placeholder: false,
        autoLink: true,
        imageDragging: false,
        disableExtraSpaces: true,
        buttonLabels: "fontawesome",
        extensions: {
          autolist: autolist
        },
        toolbar: {
          buttons: [
            "bold",
            "italic",
            "underline",
            "anchor",
            "h2",
            "h3",
            "quote",
            "justifyLeft",
            "justifyCenter",
            "justifyRight",
            "unorderedlist",
            "orderedlist",
            "removeFormat"
          ]
        }
      });

      // $editorEl.wrap("<div class='medium-editor-wrap'></div>");
      // $editorEl.mediumInsert({
      //   editor: editor,
      //   addons: {
      //     images: {
      //       sorting: function() {}, // sorting plugin is a trash so I removed it
      //       fileUploadOptions: {
      //         url: "/article_photos/create",
      //         acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
      //       },
      //       deleteScript: false, // "/article_photos/delete",

      //       actions: {
      //         remove: {
      //           label: '<span class="fa fa-times"></span>',
      //           clicked: function() {
      //             var $event = $.Event("keydown");

      //             $event.which = 8;
      //             $(document).trigger($event);
      //           }
      //         },

      //         addTextColumnLeft: {
      //           label: '<span class="fa fa-chevron-left"></span>',
      //           clicked: function() {
      //             var $event = $.Event("keydown");

      //             $event.which = 76;
      //             $(document).trigger($event);
      //           }
      //         },
      //         addTextColumnRight: {
      //           label: '<span class="fa fa-chevron-right"></span>',
      //           clicked: function() {
      //             var $event = $.Event("keydown");

      //             $event.which = 82;
      //             $(document).trigger($event);
      //           }
      //         }
      //       },
      //       preview: false, // preview is very laggy
      //       captions: false,
      //       autoGrid: 10 // (integer) Min number of images that automatically form a grid
      //     },
      //     embeds: {
      //       captions: false,
      //       styles: {
      //         wide: {
      //           label: '<span class="fa fa-align-justify"></span>'
      //         },
      //         left: {
      //           label: '<span class="fa fa-align-justify fa-rotate-90"></span>'
      //         },
      //         right: null
      //       }
      //     }
      //   }
      // });

      var isSyncFormToEditor = false;
      function syncEditorToForm() {
        if (isSyncFormToEditor) {
          isSyncFormToEditor = false;
          return;
        }

        var html = editor
          .serialize()
          ["element-0"].value.replace(/(medium-insert-active)/g, "")
          .replace(/ class=""/g, "")
          .replace(/ style=""/g, "");
        // console.log("syncEditorToForm", html);
        $el.val(html);
      }

      function syncFormToEditor() {
        isSyncFormToEditor = true;
        var html = getTextareaContent();
        // console.log("syncFormToEditor", html);
        editor.setContent(html);
      }

      editor.subscribe("editableInput", syncEditorToForm);
      // because image drag do not triggers editableInput
      $editorEl.on("mouseleave", syncEditorToForm);

      $el.addClass("js-initialized");

      $el.on("change input", syncFormToEditor);
    });
});
