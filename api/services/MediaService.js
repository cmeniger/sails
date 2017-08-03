/**
 * Created by fhm on 02/03/17.
 */
var path = require('path'),
    mime = require('mime-types'),
    _ = require('lodash'),
    ExifImage = require('exif').ExifImage;
const uploadDir = path.resolve(sails.config.uploadDir),
    downloadDir = path.resolve(sails.config.downloadDir) + '/',
    maxFile = sails.config.mediaMaxSize;
module.exports = {
    /**
     * create media after uploaded
     * @param uploadFiles
     * @param next
     */
    createUploadedMedia: function (uploadFiles, next)
                         {
                             if(uploadFiles)
                             {
                                 _.each(uploadFiles, function (file)
                                 {
                                     var fd = file.fd;
                                     var img = fd.split("/");
                                     var params = {
                                         name:        file.filename,
                                         filename:    img.pop(),
                                         path:        file.fd,
                                         size:        file.size,
                                         type:        file.type,
                                         is_uploaded: true
                                     };
                                     Media.create(params, function (err, media)
                                     {
                                         if(err)
                                         {
                                             return next(err);
                                         }
                                         return next(null, media);
                                     });
                                 });
                             }
                         },
    /**
     * create media from file image
     * @param filePath
     * @param next
     */
    createFileMedia:     function (filePath, next)
                         {
                             var fileSize = 0;
                             fs.fs.stat(filePath, function (err, stat)
                             {
                                 if(err)
                                 {
                                     console.log(err);
                                 }
                                 fileSize = stat.size;
                             });
                             var img = filePath.split("/");
                             var params = {
                                 name:        path.basename(filePath),
                                 filename:    img.pop(),
                                 path:        filePath,
                                 size:        fileSize,
                                 type:        mime.contentType(path.extname(filePath)),
                                 is_uploaded: false
                             };
                             Media.create(params, function (err, media)
                             {
                                 if(err)
                                 {
                                     return next(err);
                                 }
                                 next(null, media);
                             });
                         },
    /**
     * Import photo from given directory
     * Expected barre code list in this format
     *
     * [
     *  {
     *   code:123464556,
     *   min: 2016-12-21 00:00:00
     *   max: 2016-12-21 00:00:00
     *   },
     *  {
     *   code:123464556,
     *   min: 2016-13-21 00:00:00
     *   max: 2016-13-21 00:00:00
     *   },
     *   ....
     *   ]
     * @param directory
     * @param barreCodes
     * @param photographerId
     * @param next
     * @returns {*}
     * @constructor
     */
    ImportPhotoMedia:    function (directory, barreCodes, photographerId, next)
                         {
                             var dir = path.resolve(directory);
                             var log = 0;
                             fs.recurseSync(dir, function (filename)
                             {
                                 log++;
                                 MediaService.getExifImage(filename, function (err, exifData)
                                 {
                                     if(exifData)
                                     {
                                         if(barreCodes)
                                         {
                                             _.each(barreCodes, function (line)
                                             {
                                                 var codeDateMin = datetime.create(line.min).getTime(),
                                                     codeDateMax = datetime.create(line.max).getTime();
                                                 var str = exifData.exif.CreateDate,
                                                     tab = str.split(" ");
                                                 tab[0] = tab[0].replace(":", "-");
                                                 var dateImage = datetime.create(tab[0].concat(" ", tab[1])).getTime();
                                                 if(dateImage >= codeDateMin && dateImage < codeDateMax)
                                                 {
                                                     var destination = downloadDir + line.code + '/' + path.basename(filename);
                                                     fs.copyFile(filename, destination, {
                                                         done: function (err)
                                                               {
                                                                   if(err)
                                                                   {
                                                                       next(err);
                                                                   }
                                                                   MediaService.createFileMedia(destination, function (err, media)
                                                                   {
                                                                       if(err)
                                                                       {
                                                                           next(err);
                                                                       }
                                                                       Photo.create({
                                                                           name:         media.name,
                                                                           file:         media.id,
                                                                           barrecode:    line.code,
                                                                           photographer: photographerId
                                                                       }).exec(function (err, photo)
                                                                       {
                                                                       });
                                                                   })
                                                               }
                                                     });
                                                 }
                                             });
                                         }
                                         else
                                         {
                                             /** photo perdues **/
                                             var destination = downloadDir + '/lost/' + path.basename(filename);
                                             fs.copyFile(filename, destination, {
                                                 done: function (err)
                                                       {
                                                           if(err)
                                                           {
                                                               next(err);
                                                           }
                                                           MediaService.createFileMedia(destination, function (err, media)
                                                           {
                                                               if(err)
                                                               {
                                                                   next(err);
                                                               }
                                                               Photo.create({
                                                                   name:         media.name,
                                                                   file:         media.id,
                                                                   photographer: photographerId
                                                               }).exec(function (err, photo)
                                                               {
                                                               });
                                                           })
                                                       }
                                             });
                                         }
                                     }
                                 });
                             });
                             next(null, log);
                         },
    /**
     * function to get exif photo
     * @param file
     * @param next
     */
    getExifImage:        function (file, next)
                         {
                             try
                             {
                                 new ExifImage({image: file}, function (error, exifData)
                                 {
                                     if(error)
                                     {
                                         next(error);
                                     }
                                     else
                                     {
                                         next(null, exifData);
                                     }
                                 });
                             }
                             catch(error)
                             {
                                 next(error);
                             }
                         },
    /**
     * Upload file and create media
     * @param req
     * @param cb
     * @returns {*}
     */
    uploadFile:          function (req, cb)
                         {
                             var file = req.file('file');
                             if(!file || !file._files.length)
                             {
                                 file.upload({noop: true});
                                 return cb(null, req, null);
                             }
                             req.file('file').upload({
                                 maxBytes: maxFile,
                                 dirname:  uploadDir
                             }, function (err, uploadedFiles)
                             {
                                 if(err || !uploadedFiles)
                                 {
                                     return cb(err);
                                 }
                                 MediaService.createUploadedMedia(uploadedFiles, function (err, media)
                                 {
                                     if(err || !media)
                                     {
                                         return cb(err);
                                     }
                                     return cb(null, req, media);
                                 });
                             });
                         }
};