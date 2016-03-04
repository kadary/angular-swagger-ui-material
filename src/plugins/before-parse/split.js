'use strict';

angular.module('swaggerUiSplit', [])
    .factory('split', function ($q) {
        return {
            execute: function (url, swagger) {
                var deferred = $q.defer();

                if (swagger && swagger.swagger && !swagger.tags) {
                    var tags = {};

                    angular.forEach(swagger.paths, function (path, key) {
                        var t = key.replace(/^\/?([^\/]+).*$/g, '$1');
                        tags[t] = true;

                        angular.forEach(path, function (method) {
                            method.tags = [t];
                        });
                    });

                    swagger.tags = [];

                    Object.keys(tags).forEach(function (tag) {
                        swagger.tags.push({name: tag});
                    });
                }

                deferred.resolve(true);

                return deferred.promise;
            }
        };
    })
    .run(function (swaggerPlugins, split) {
        swaggerPlugins.add(swaggerPlugins.BEFORE_PARSE, split);
    });
