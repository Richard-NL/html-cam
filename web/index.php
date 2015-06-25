<?php
// web/index.php
error_reporting(E_ALL);
ini_set('display_errors', 1);
use Symfony\Component\HttpFoundation\Request;
require_once __DIR__.'/../vendor/autoload.php';

function handleBase64Image( $data ) {

    list($type, $data) = explode(';', $data);
    list(, $data)      = explode(',', $data);
    return base64_decode($data);
}


$app = new Silex\Application();

$app['debug'] = true;

$app->get('/', function ()  {
    $page = file_get_contents('index.tpl.html');
    return $page;
});

$app->get('/images', function ()  {
    $html = '';
    foreach (glob("images/*.jpg") as $filename) {
        $html = '<img src="' . $filename . '" />';
    }
    return $html;
});

$app->post('/', function (Request $request)  {
    $file = $request->get('file');

    file_put_contents('./images/' . time() . '.jpg',  handleBase64Image($file));
    return 'success';
});


$app->run();
