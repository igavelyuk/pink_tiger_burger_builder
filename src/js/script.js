// Globals required for chart
var currItem = "";
var totalItem = [];
var debugItem = totalItem[0];
var totalPrice = [];
// End Globals required for chart
// Sw on poppovers
$(function() {
  $('[data-toggle="popover"]').popover()
});
//Sw on tooltips
$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
});
// $('#fullHeightModalRight').data('bs.modal').handleUpdate()
// Hide chat window \ activate
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
  // Load resources from productdb.json
  var x=0;
  $.getJSON("json/productdb.json", function(data) {
    sectionsItems(data.burgersarray, 0, "rounded-border-image");
    sectionsItems(data.drinksarray, 1, "rounded-border-image-blue");
    sectionsItems(data.addonsarray, 2, "rounded-border-image-orange");

    function sectionsItems(el, i, colorClass) {
      var items = [];
      $.each(el, function(key, val) {
        console.log(key);
        // element.key = key;
        // element.items = items;
        items.push('<div class="col item">');
        items.push('<h3>' + val.name + '</h3>');
        items.push('<div class="col">');
        items.push('<img class="' + colorClass + '" src="' + val.img + '" alt="' + val.name + '" />');
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
        items.push('<button class="btn btn-success btn-rounded add-chart'+i+'" type="submit"> <i class="fas fa-cart-arrow-down"></i> </button>');
        items.push('</div></div></div></div>');
        //items{element: element}
        items.join("");
        console.log(val.name);
        // Init add to chart function
        //Click on green BUTTON on Chart!

        // End of init to chart function
      });

// Dinamic create row with col objects
      $("<div/>", {
        "class": "row",
        html: items.join("")
      }).appendTo("#" + Object.keys(data)[i]);

      $(".add-chart"+i).click(function() {
        //Title
        x++;
        console.log(x+"-----------------------");
        var product = this.parentNode.parentNode.parentNode.parentNode;
        var pname = product.firstElementChild.innerText;
        //Image
        var imgurl = this.parentNode.parentNode.parentNode.parentNode;
        var pimg = imgurl.children[1].children[0].getAttributeNode("src").value;
        //Price and Specs
        var price = this.parentNode.parentNode.parentNode;
        var pprice = parseInt(price.children[1].innerText);
        // Input
        var quantity = this.parentNode.parentNode;
        var pq = quantity.firstElementChild.value;
        var total = pq * pprice;
        currItem = "<br>"+ pq.toString() + "x" + pprice + " = " + total + "грн -  " + pname;
        totalItem.push(currItem);
        totalPrice.push(total);
        // console.log(key+" key-val "+val);
        addToChart(totalItem);
      });


      //inside function
      //console.log(Object.keys(element)[0]);
    }
  });
});

function addToChart(itemObject) {
var reducer = (accumulator, currentValue) => accumulator + currentValue;
  // itemObject.appendTo("#chartitems");
  $("#listchart").html("<p>"+itemObject+"</p>");
  $("#chartitems").text(itemObject.length);
  $("#totalvalue").text(totalPrice.reduce(reducer)+"грн");
}
