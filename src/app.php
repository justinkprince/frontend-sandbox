<?php

use Silex\Application;
use Silex\Provider\AssetServiceProvider;
use Silex\Provider\TwigServiceProvider;
use Silex\Provider\ServiceControllerServiceProvider;
use Silex\Provider\HttpFragmentServiceProvider;

$app = new Application();
$app->register(new ServiceControllerServiceProvider());
$app->register(new AssetServiceProvider());
$app->register(new TwigServiceProvider());
$app->register(new HttpFragmentServiceProvider());
$app->register(new Silex\Provider\VarDumperServiceProvider());

$app['twig'] = $app->extend('twig', function($twig, $app) {
    $requestStack = $app['request_stack'];

    $twig->addFunction(new \Twig_SimpleFunction('asset', function ($asset) use ($requestStack) {
        return sprintf('http://localhost:8080/%s', ltrim($asset, '/'));
    }));

    return $twig;
});

return $app;
