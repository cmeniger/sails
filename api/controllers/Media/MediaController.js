/**
 * Media/MediaController
 *
 * @description :: Server-side logic for managing Media/medias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

    /**
     *  Form upload
     * @param req
     * @param res
     */
    index: function (req, res) {
        res.view('media/front/upload');
    },

    /**
     * handle upload
     * @param req
     * @param res
     */
    upload: function (req, res) {
        var name = req.param('name') ? req.param('name'): 'file' ;
        MediaService.createUploadedMedia(req, name, function (err, media)
        {
            if (err || !media) {
                //TODO flash error
                console.log('error upload' + err);
            }
            res.view('media/front/upload', {media: media});
        });

    }
};
