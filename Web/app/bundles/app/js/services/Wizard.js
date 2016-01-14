angular.module('app.services')

.service('Wizard', function()
{
    var self = {};
    var wizard = {};


    self.addStep = function(data, identifier, prefix)
    {
        if (!identifier)
        {
            throw {
                message: 'identifier can\'t be empty'
            };
        }

        if (typeof prefix == "undefined")
        {
            prefix = identifier;
        };

        //Clone for disconnect , some $watch for ng-model
        var cloneData = angular.copy(data,
        {});

        //Add Step Data
        wizard[identifier] = {
            prefix: prefix,
            fields: cloneData
        };
    };

    self.getStep = function(identifier){
        return wizard[identifier];
    };

    self.clear = function()
    {
        wizard = {};
    };

    self.toCollection = function(resolver)
    {

        var collections = [];

        //Each Section 
        for (var section in wizard)
        {
            var configuration = wizard[section];

            //Each Field
            for (var fieldName in configuration.fields)
            {
                var fullname = fieldName;
                if (configuration.prefix.length > 0)
                {
                    var fullname = "{0}_{1}".format([configuration.prefix, fieldName]);
                }
                
                var value = configuration.fields[fieldName];
                var resolverValue = undefined;

                if (resolver)
                {
                    resolverValue = resolver(value, fieldName, fullname);
                }

                if (typeof resolverValue != "undefined")
                {
                    value = resolverValue;
                }
                else
                {

                    if (typeof value == "object" && value.token)
                    {
                        value = value.token
                    }

                }

                if (typeof value == "undefined" || value == null)
                {
                    throw {
                        message: 'can\'t resolve value for ' + fullname
                    };
                }

                collections.push(
                {
                    name: fullname,
                    value: value
                });
            }

        }

        return collections;
    };

    return self;
});
