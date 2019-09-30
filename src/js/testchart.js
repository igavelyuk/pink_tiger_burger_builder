// function() {
//   $.ajax({
//     url: 'index.php?route=checkout/cart/add',
//     type: 'post',
//     data: $('#product input[type=\'text\'], #product input[type=\'hidden\'], #product input[type=\'radio\']:checked, #product input[type=\'checkbox\']:checked, #product select, #product textarea'),
//     dataType: 'json',
//     beforeSend: function() {
//       $('#button-cart').button('loading');
//     },
//     complete: function() {
//       $('#button-cart').button('reset');
//     },
//     success: function(json) {
//       $('.alert, .text-danger').remove();
//       $('.form-group').removeClass('has-error');
//
//       if (json['error']) {
//         if (json['error']['option']) {
//           for (i in json['error']['option']) {
//             var element = $('#input-option' + i.replace('_', '-'));
//
//             if (element.parent().hasClass('input-group')) {
//               element.parent().before('<div class="text-danger">' + json['error']['option'][i] + '</div>');
//             } else {
//               element.before('<div class="text-danger">' + json['error']['option'][i] + '</div>');
//             }
//           }
//         }
//
//         if (json['error']['recurring']) {
//           $('select[name=\'recurring_id\']').after('<div class="text-danger">' + json['error']['recurring'] + '</div>');
//         }
//
//         // Highlight any found errors
//         $('.text-danger').parent().addClass('has-error');
//       }
//
//       if (json['success']) {
//         $('.breadcrumb').after('<div class="alert alert-success">' + json['success'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
//
//         $('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
//
//         $('html, body').animate({
//           scrollTop: 0
//         }, 'slow');
//
//         $('#cart > ul').load('index.php?route=common/cart/info ul li');
//       }
//     },
//     error: function(xhr, ajaxOptions, thrownError) {
//       alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
//     }
//   });
// }
