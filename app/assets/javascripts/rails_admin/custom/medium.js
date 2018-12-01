//= require medium-editor/dist/js/medium-editor.js
//= require medium-editor-autolist/dist/autolist.js
//= require 'handlebars/dist/handlebars.runtime.min.js'
//= require 'blueimp-file-upload/js/jquery.fileupload.js'
//= require './medium-editor-insert-plugin.js'

// medium-editor-autolist fork used because of bug
// https://github.com/varun-raj/medium-editor-autolist/issues/1

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
        return $el
          .val()
          .replace(/(contenteditable="false"|contenteditable="true")/g, "");
      }

      var $editorEl = $("<div></div>")
        .html(getTextareaContent())
        .addClass($el.prop("class"));

      $el.after($editorEl);
      $editorEl.wrap("<div class='medium-editor-wrap'></div>");

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
            "unorderedlist",
            "orderedlist",
            "removeFormat"
          ]
        }
      });

      $editorEl.mediumInsert({
        editor: editor,
        addons: {
          images: {
            sorting: function() {}, // sorting plugin is a trash so I removed it
            fileUploadOptions: {
              url: "/article_photos/create",
              acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
            },
            deleteScript: false,//"/article_photos/delete",

            actions: {
              remove: {
                label: '<span class="fa fa-times"></span>',
                clicked: function () {
                  var $event = $.Event('keydown');

                  $event.which = 8;
                  $(document).trigger($event);
                }
              },

              addTextColumnLeft: {
                label: '<span class="fa fa-chevron-left"></span>',
                clicked: function () {
                  var $event = $.Event('keydown');

                  $event.which = 76;
                  $(document).trigger($event);
                }
              },
              addTextColumnRight: {
                label: '<span class="fa fa-chevron-right"></span>',
                clicked: function () {
                  var $event = $.Event('keydown');

                  $event.which = 82;
                  $(document).trigger($event);
                }
              }
            },
            preview: false, // preview is very laggy
            captions: false,
            autoGrid: 2 // (integer) Min number of images that automatically form a grid
          },
          embeds: {
            captions: false,
            styles: null
          }
        }
      });

      function syncEditorToForm() {
        $el.html(
          editor
            .serialize()
            ["element-0"].value.replace(
              /(contenteditable="true"|contenteditable="false")/g,
              ""
            )
            .replace(/(medium-insert-active)/g, "")
            .replace(/class=""/g, "")
        );
      }

      function syncFromToEditor() {
        editor.setContent(getTextareaContent());
      }

      editor.subscribe("editableInput", syncEditorToForm);
      // because image drag do not triggers editableInput
      $editorEl.on("mouseleave", syncEditorToForm);

      $el.addClass("js-initialized");

      $el.on("change input", syncFromToEditor);
    });
});
