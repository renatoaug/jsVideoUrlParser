function Vimeo() {
  'use strict';
  this.provider = 'vimeo';
  this.alternatives = ['vimeopro'];
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
    embed: this.createEmbedUrl
  };
  this.mediaTypes = {
    VIDEO: 'video'
  };
}

Vimeo.prototype.parseUrl = function (url) {
  'use strict';
  var match = url.match(
    /*jshint ignore:start */
    /(?:\/(?:channels\/[\w]+|(?:(?:album\/\d+|groups\/[\w]+)\/)?videos?))?\/(\d+)/i
    /*jshint ignore:end */
  );
  return match ? match[1] : undefined;
};

Vimeo.prototype.parseParameters = function (params) {
  'use strict';
  return this.parseTime(params);
};

Vimeo.prototype.parseTime = function (params) {
  'use strict';
  if (params.t) {
    params.start = getTime(params.t);
    delete params.t;
  }
  return params;
};

Vimeo.prototype.parse = function (url, params) {
  'use strict';
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    params: this.parseParameters(params),
    id: this.parseUrl(url)
  };
  return result.id ? result : undefined;
};

Vimeo.prototype.createUrl = function (baseUrl, vi, params) {
  'use strict';
  var url = baseUrl + vi.id;
  var startTime = params.start;
  delete params.start;

  url += combineParams({
    params: params
  });

  if (startTime) {
    url += '#t=' + startTime;
  }
  return url;
};

Vimeo.prototype.createLongUrl = function (vi, params) {
  'use strict';
  return this.createUrl('https://vimeo.com/', vi, params);
};

Vimeo.prototype.createEmbedUrl = function (vi, params) {
  'use strict';
  return this.createUrl('//player.vimeo.com/video/', vi, params);
};

urlParser.bind(new Vimeo());
