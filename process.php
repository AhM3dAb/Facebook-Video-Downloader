<?php
$url = $_POST['link'];
$url = str_replace("photo.php","video/video.php",$url);
function source_code ($url) {
		$curl = @curl_init ($url);
		@curl_setopt ($curl, CURLOPT_HEADER, FALSE);
		@curl_setopt ($curl, CURLOPT_RETURNTRANSFER, TRUE);
		@curl_setopt ($curl, CURLOPT_FOLLOWLOCATION, TRUE);
		@curl_setopt ($curl, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
		$source = @curl_exec ($curl);
		@curl_close ($curl);
		return $source;
}
echo source_code($url);
?>
