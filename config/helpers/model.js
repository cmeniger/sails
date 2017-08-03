/**
 *
 * @type {{modelCount: module.exports.modelCount}}
 */

module.exports = {
    modelCount: function (var_model, var_filter)
                {
                    var filter = typeof var_filter === 'undefined' ? {} : var_filter;
                    var count = '';
                    global[var_model].count(filter).exec(function (err, found)
                    {
                        if(err)
                        {
                            console.log(err);
                            count = '-';
                        }
                        else
                        {
                            count = found;
                        }
                    });
                    while(count === '')
                    {
                        require('deasync').sleep(100);
                    }
                    return count;
                }
};