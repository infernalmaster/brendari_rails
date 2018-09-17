# README

KEYS
* GMAPS_API_KEY
* SECRET_KEY_BASE


# Todo:
* seo tags/fb tags
* blog // https://marketplace.ghost.org/
* shop
* animations/ http://barbajs.org/
* images resize
* debploy
* about us page
* open project and logo page
* admin for settings

https://github.com/sferik/rails_admin/wiki/CKEditor
https://ckeditor.com/ckeditor-5-builds/
https://github.com/kreativgebiet/rich
https://github.com/glebtv/rails-uploader
https://github.com/luizpicolo/rails_admin_dropzone

=stylesheet_link_tag 'medium-editor.css'
=javascript_include_tag 'medium-editor'
= form_for @post do |f|
  = f.hidden_field :body, html: { id: "body" }
  .editable { data: { field: { id: "body" } } }
  = f.submit
=javascript_include_tag 'input-field'


var editor = new MediumEditor('.editable', {
  autoLink: true,
  toolbar: {
    /* These are the default options for the toolbar,
        if nothing is passed this is what is used */
    allowMultiParagraphSelection: true,
    buttons: Object.keys(MediumEditor.extensions.button.prototype.defaults),
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




$('.editable').bind('input propertychange', function() {
  $("#post_" + $(this).attr("data-field-id")).val($(this).html());
});
better case
editor.subscribe('editableInput', function (event, editable) {
    // Do some work
});

nice icons
https://quilljs.com/
https://github.com/yabwe/medium-editor#button-options