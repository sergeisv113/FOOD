<?php
$_POST = json_decode(file_get_contents("php://input"), true);//получ json
echo var_dump($_POST);//response server