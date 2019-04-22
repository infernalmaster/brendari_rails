(function () {
  var cfg = {
    text_one_column: ".type_field, .position_field, .text_field",
    text_two_columns: ".type_field, .position_field, .text_field, .text2_field",
    image_one_column: ".type_field, .position_field, .image1_field",
    "image_multi_column_1-1-1-1":
      ".type_field, .position_field, .image1_field, .image2_field, .image3_field, .image4_field",
    "image_multi_column_2-2":
      ".type_field, .position_field, .image1_field, .image2_field",
    "image_multi_column_1-1-2":
      ".type_field, .position_field, .image1_field, .image2_field, .image3_field",
    "image_multi_column_1-2-1":
      ".type_field, .position_field, .image1_field, .image2_field, .image3_field",
    "image_multi_column_2-1-1":
      ".type_field, .position_field, .image1_field, .image2_field, .image3_field"
  };


  function handleChange($el) {
    var $root = $el.parents(".fields.tab-pane");

    $root.find(".form-group").hide();
    $root.find(cfg[$el[0].value]).show();
  }



  $(document).on("change", ".js-section-type", function() {
    var $el = $(this);
    handleChange($el);
  });


  $(document).on("rails_admin.dom_ready", function() {
    $(".js-section-type").each(function(i, el) {
      var $el = $(el);
      handleChange($el);
    });
  });
})();
