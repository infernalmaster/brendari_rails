//= require colorthief/src/color-thief.js

$(document).on('rails_admin.dom_ready', function() {
  function toHex(d) {
    return  ("0"+(Number(d).toString(16))).slice(-2).toUpperCase()
  }

  $('#project_main_image').on('change', function(e) {
    setTimeout(function() {
      var img = $(e.target).siblings('img.preview')[0];
      var colorThief = new ColorThief();
      var color = colorThief.getColor(img);
      var hexColor = '#' + color.map(toHex).join('')
      $('#project_main_image_color').val(hexColor)
    }, 100)
  })
})
