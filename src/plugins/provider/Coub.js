function Coub() {
  'use strict';
  this.provider = 'coub';
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
    embed: this.createEmbedUrl
  };
}

Coub.prototype.parseUrl = function (url) {
  'use strict';
  var match = url.match(
    /(?:embed|view)\/([a-zA-Z\d]+)/i
  );
  return match ? match[1] : undefined;
};

Coub.prototype.parse = function (url, params) {
  'use strict';
  var result = {
    mediaType: 'video',
    params: params,
    id: this.parseUrl(url)
  };
  
  if (!result.id) {
    return undefined;
  }
  return result;
};

Coub.prototype.createUrl = function (baseUrl, vi, params) {
  'use strict';
  var url = baseUrl + vi.id;
  url += combineParams({
    params: params
  });
  return url;
};

Coub.prototype.createLongUrl = function (vi, params) {
  'use strict';
  return this.createUrl('https://coub.com/view/', vi, params);
};

Coub.prototype.createEmbedUrl = function (vi, params) {
  'use strict';
  return this.createUrl('//coub.com/embed/', vi, params);
};

urlParser.bind(new Coub());