$(function() {
  $('[data-toggle="popover"]').popover()
});
$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
});
// $('#fullHeightModalRight').data('bs.modal').handleUpdate()

$(function() {
  $("#anitachat").hide();
  $("#alive").show();

  $("#anitaclose").click(function() {
    $("#anitachat").hide();
    $("#alive").show();
  });
  $("#alive").click(function() {
    $("#anitachat").show();
    $("#alive").hide();
  });



  $.getJSON("json/productdb.json", function(data) {
    sectionsItems(data.burgersarray,0,"rounded-border-image");
    sectionsItems(data.drinksarray,1,"rounded-border-image-blue");
    sectionsItems(data.addonsarray,2,"rounded-border-image-orange");
    function sectionsItems(el, i, colorClass){
      var items = [];
      $.each(el, function(key, val) {
        console.log(key);
        // element.key = key;
        // element.items = items;
        items.push('<div class="col item">');
        items.push('<h3>' + val.name + '</h3>');
        items.push('<div class="col">');
        items.push('<img class="'+colorClass+'" src="' + val.img + '" alt="' + val.name + '" />');
        items.push('</div><div class="col">');

        if (val.promo == "true") {
          items.push('<span class="spinner-grow spinner-grow-sm text-success float-right"></span>');
        } else {
          items.push('<span class="spinner-grow spinner-grow-sm text-white float-right"></span>');
        }
        items.push('<p>' + val.price + 'грн</p>');
        items.push('<p class="font-weight-light">' + val.recipe + '</p>');
        items.push('<div class="input-group">');
        items.push('<input type="number" class="form-control" placeholder="0">');
        items.push('<div class="input-group-append">');
        items.push('<button class="btn btn-success btn-rounded add-chart" type="submit"> <i class="fas fa-cart-arrow-down"></i> </button>');
        items.push('</div></div></div></div>');
        //items{element: element}
        items.join("");
        $(".add-chart").click(function() {
          console.log(this.parent);
        });
      });

      $("<div/>", {
        "class": "row",
        html: items.join("")
      }).appendTo("#"+Object.keys(data)[i]);
      //inside function
      //console.log(Object.keys(element)[0]);

    }
  });
});

// $(".add-chart").live('request',function(){
//
// });
