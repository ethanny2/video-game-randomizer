<?php
   header('Access-Control-Allow-Origin: *');
// Your AWS Access Key ID, as taken from the AWS Your Account page
$aws_access_key_id = "AKIAJF5IKSBDEVP4QCXQ";

// Your AWS Secret Key corresponding to the above ID, as taken from the AWS Your Account page
$aws_secret_key = "rdF+dIKzxmo1bOOcz4weZXyuhN7ij4+GqmZakAko";

// The region you are interested in
$endpoint = "webservices.amazon.com";

$uri = "/onca/xml";

 //print_r($_POST);
 $name =$_POST['name'];
error_reporting(0);

$params = array(
    "Service" => "AWSECommerceService",
    "Operation" => "ItemSearch",
    "AWSAccessKeyId" => "AKIAJF5IKSBDEVP4QCXQ",
    "AssociateTag" => " ethanny2-20",
    "SearchIndex" => "VideoGames",
    "Keywords" => $name,
    "ResponseGroup" => "Images,ItemAttributes,ItemIds,Offers"
);

// Set current timestamp if not set
if (!isset($params["Timestamp"])) {
    $params["Timestamp"] = gmdate('Y-m-d\TH:i:s\Z');
}

// Sort the parameters by key
ksort($params);

$pairs = array();

foreach ($params as $key => $value) {
    array_push($pairs, rawurlencode($key)."=".rawurlencode($value));
}

// Generate the canonical query
$canonical_query_string = join("&", $pairs);

// Generate the string to be signed
$string_to_sign = "GET\n".$endpoint."\n".$uri."\n".$canonical_query_string;

// Generate the signature required by the Product Advertising API
$signature = base64_encode(hash_hmac("sha256", $string_to_sign, $aws_secret_key, true));

// Generate the signed URL
$request_url = 'http://'.$endpoint.$uri.'?'.$canonical_query_string.'&Signature='.rawurlencode($signature);

// echo "\"".$request_url."\"";
// echo $request_url;
//echo $request_url;
$pages = simplexml_load_file($request_url);
//echo var_dump($request_url);
//print_r($pages);

//Get the first 4 Item, for each Item get DetailPageUrl, then got into LargeImage and get URL, and set the height and width

//echo($pages);
// $itemObj = ($pages->Items->Item[0]);
//echo($itemObj->DetailPageURL);
//echo($itemObj->LargeImage->URL);
$linkArray= [];
$number_of_pages=13;
for($i=0;$i<$number_of_pages;$i++){
	$itemObj = ($pages->Items->Item[$i]);
	$link = [];
	$link['productUrl'] = (string)$itemObj->DetailPageURL;
	$link['imageUrl']= (string)$itemObj->LargeImage->URL ;
		array_push($linkArray, $link);
}

echo json_encode($linkArray);

?>
