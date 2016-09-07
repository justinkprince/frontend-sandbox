<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

$app->get('/', function () use ($app) {
    $data = [];

    return $app['twig']->render('page/index.html.twig', $data);
})
->bind('homepage');

// If a view template exists that has the same path as the request, load it.
// This makes creating a controller optional.
$app->match('{url}', function ($url) use ($app) {
    $fs = new Filesystem();
    $request = $app['request_stack']->getCurrentRequest();
    $requestPath = trim($request->getPathInfo(), '/');
    $viewPath = 'page/'.$requestPath.'.html.twig';

    foreach ($app['twig.path'] as $basePath) {
        $fullPath = $basePath.'/'.$viewPath;

        if ($fs->exists($fullPath)) {
            return new Response(
                $app['twig']->render($viewPath),
                Response::HTTP_OK,
                ['content-type' => 'text/html']
            );
        }
    }

    $errorMessage = sprintf('Route not defined and no matching template: %s', $viewPath);
    $app->abort(Response::HTTP_NOT_FOUND, $errorMessage);
})->assert('url', '.+');

$app->error(function (\Exception $e, Request $request, $code) use ($app) {
    if ($app['debug']) {
        return;
    }

    // 404.html, or 40x.html, or 4xx.html, or error.html
    $templates = array(
        'errors/'.$code.'.html.twig',
        'errors/'.substr($code, 0, 2).'x.html.twig',
        'errors/'.substr($code, 0, 1).'xx.html.twig',
        'errors/default.html.twig',
    );

    return new Response($app['twig']->resolveTemplate($templates)->render(array('code' => $code)), $code);
});
