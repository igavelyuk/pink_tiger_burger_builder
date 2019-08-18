<?php
if (isset($_POST['products'])&&isset($_POST['total_price'])&&isset($_POST['telephone'])&&isset($_POST['security']))
{
  // echo "test1 " . $_POST['products'] . "<br>";
  // echo "test2 " . $_POST['total_price'] . "<br>";
  // echo "test5 " . $_POST['telephone'] . "<br>";
  // echo "test6 " . $_POST['security'];
  //
  // echo "First part pass";
  $products = $_POST['products'];
  $total_price = $_POST['total_price'];
  $telephone = $_POST['telephone'];
  $security = $_POST['security'];
  $location_message = get_ip();
  if($security==8){
    send_mail($products, $total_price,$location_message,$telephone,$security);
  }else{errorOrder();}
} else {
errorOrder();
}

function send_mail($products, $total_price, $location, $telephone,$security){
  $to_email = "order@burgerpanda.com.ua";
  $now = new DateTime();
  $formatted = $now->format('Y-m-d H:i:s');    // MySQL datetime format
  $timestamp = $now->getTimestamp();           // Unix Timestamp -- Since PHP 5.3

  $subject = "Новый заказ ".$formatted;
  $headers  = 'MIME-Version: 1.0' . "\r\n";
  $headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
  // Create email headers
      $headers .= "From: order@burgerpanda.com.ua"."\r\n".
      'Reply-To: '.$from."\r\n" .
      'X-Mailer: PHP/' . phpversion();
      // Compose a simple HTML email message
      $body= '<html><body><meta http-equiv="Content-Type" content="text/html charset=UTF-8" /><table style="font-family:Arial,Helvetica,sans-serif;color:#333333;font-size:12px" width="100%" cellspacing="0" cellpadding="10" bgcolor="#e8e9ea">
      <tbody>
      <tr>
      <td valign="top" align="center">
      <table style="padding:20px" width="80%" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
      <tbody>
      <tr>
      <td>
      <table style="border-bottom:1px solid #3b6e93" width="100%" cellspacing="0" cellpadding="0">
      <tbody>
      <tr>
      <td style="padding:5px 10px" width="40%" valign="middle" align="left">
      <a href="pandabc.site" style="text-decoration:none; border-radius:75px;" target="_blank" data-saferedirecturl="https://www.pandabc.site">
      <div>
      <div style="height:150px;width:150px; background:#05c820; color:white; border-radius:75px;">
      <div style="height:65px;">
      </div>
      <div style="width:100%; text-align:center;background:white;font-family:Arial; color:black;">
      Burger Panda
      </div>
      </div>
      </div>
      </a>
      </td>
      <td style="padding:5px 10px" width="60%" valign="middle" align="right">
      <h1 style="font-size:20px;color:#3b6e93;margin-top:0px;font-weight:normal">Бургер Панда Белая Церковь</h1>
      <div style="color:#666;font-size:11px">Автоматизированный сервис доставки еды</div>
      </td>
      </tr>
      </tbody>
      </table>';
      //main part
      $body.= '<div style="padding:5px;margin:10px;font-size:2em">Детали заказа - '.$timestamp.' - '.$formatted.'/'.$security.'</div>';
      $body.= '<div style="padding:5px;margin:10px">'.$products.'</div>';
      $body.= '<div style="padding:5px;margin:10px;text-align:right;">Полная сумма: '.$total_price.'грн</div><hr>';
      $body.= '<div style="padding:5px;margin:10px;text-align:center;">Телефон заказчика: +38 '.$telephone.'</div><hr>';
      $body.= '<div style="padding:5px;margin:10px;text-align:center;color:green;">Местоположение, оределено как: '.$location.'</div><hr>';
      //main part
      $body.= '<hr style="border:0;color:#ccc;background-color:#ccc;height:1px;width:100%;text-align:left">
      <div style="color:#666;font-size:11px;padding:20px 10px 10px">
      С уважением, служба доставки еды "Бургер Панда".<br>
      Данное письмо сформировано автоматически, просьба не отвечать на него по электронной почте.<br>
      горячая линия: Kiyvstar (096)41-41-096 и Life Cell (063)41-41-096 <br>
      Также если произошли технические проблемы напишите письмо <a href="mailto:support@burgerpanda.com.ua" target="_blank" data-saferedirecturl="burgerpanda.com.ua">support@burgerpanda.com.ua</a><br>
      </div>
      </td>
      </tr>
      </tbody>
      </table>
      <div style="text-align:center;color:#666;font-size:11px;padding:20px 50px 10px 50px">
      Copyright © 2006—2019
      <a href="burgerpanda.com.ua" target="_blank" data-saferedirecturl="burgerpanda.com.ua">
      "Бургер Панда"</a>
      </div>
      </td>
      </tr>
      </tbody>
      </table></body></html>';
      if ( mail($to_email, $subject, $body, $headers)) {
        readfile("200.html");
      } else {
        errorOrder();
      }
}

function get_ip(){
  // set IP address and API access key
  // Function to get the client ip address
  function get_client_ip_env() {
      $ipaddress = '';
      if (getenv('HTTP_CLIENT_IP'))
          $ipaddress = getenv('HTTP_CLIENT_IP');
      else
      if(getenv('HTTP_X_FORWARDED_FOR'))
          $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
      else if(getenv('HTTP_X_FORWARDED'))
          $ipaddress = getenv('HTTP_X_FORWARDED');
      else if(getenv('HTTP_FORWARDED_FOR'))
          $ipaddress = getenv('HTTP_FORWARDED_FOR');
      else if(getenv('HTTP_FORWARDED'))
          $ipaddress = getenv('HTTP_FORWARDED');
      else if(getenv('REMOTE_ADDR'))
          $ipaddress = getenv('REMOTE_ADDR');
      else
          $ipaddress = 'UNKNOWN';
      return $ipaddress;
  }
  $ip = get_client_ip_env();
  $access_key = '5a9d245a0d7a8992f1dd9e953c4cd7d5';

  // Initialize CURL:
  $ch = curl_init('http://api.ipstack.com/'.$ip.'?access_key='.$access_key.'');
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  // Store the data:
  $json = curl_exec($ch);
  curl_close($ch);

  // Decode JSON response:
  $api_result = json_decode($json, true);

  // Output the "capital" object inside "location"
  // "country_name": "United States",
  //   "region_code": "MA",
  //   "region_name": "Massachusetts",
  //   "city": "Boston",
  //   "zip": "02115",
  //   "latitude": 42.3424,
  //   "longitude": -71.0878,
  return $api_result['city']."-".['zip'].' Геокоординаты заказчика на <a href="https://www.latlong.net/c/?lat='.$api_result['latitude'].'&long='.$api_result['longitude'].'">https://www.latlong.net/c/?lat='.$api_result['latitude'].'&long='.$api_result['longitude'].'</a>';
}
function errorOrder(){
    readfile("404.html");
}

?>
