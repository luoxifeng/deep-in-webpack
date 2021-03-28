 // compiler.hooks.compilation.tap('PrefetchAdsMicroAppPlugin', compilation => {
    //   if (!compilation.externalScripts) {
    //     compilation.externalScripts = {};
    //   }
     
    //   function load() {
    //     if (!/business\.(\w+\.)?((test|sit|beta)\.)?xiaohongshu\.com/.test(location.hostname)) {
    //       return;
    //     }
    //     var script = document.createElement('script');
    //     script.setAttribute("async", "async");
    //     script.setAttribute("charset", "utf-8");
    //     script.setAttribute("src", "/formula-static/ares-microapp-ads/public/prefetch.js?version=" + new Date().getTime());
    //     var head = document.head;
    //     if (!head) {
    //         var heads = document.getElementsByTagName('head');
    //         head = heads && heads[0];
    //     }
    //     if (head) {
    //         head.appendChild(script);
    //     }
    //   }
    //   var loadStr = load.toString();
    //   Object.assign(compilation.externalScripts, {
    //     adsPrefetchScript: `<script>(${loadStr})()</script>`,
    //   });
    // })


    // compiler.hooks.compilation.tap('sfs', compilation => {
    //   compilation.hooks.

    // })



    assets => {
      const key = Object.keys(assets).find(key => /list.*?\.js$/.test(key))
      if (assets[key]) {
        console.log(key)

        // console.log(assets[key]);
        // const origin = assets[key]._source.source();

        // const concatSource = assets[key]._source;
        // const _children = concatSource._children;
        // // console.log(concatSource)
        // console.log('_children[0]', _children[1])
        // _children.splice(1, 0, new OriginalSource('111111111ddddddww', key), new OriginalSource('sfsf.gb = 123', key))
        // assets[key]._source.source();

        // concatSource._optimize()

        // console.log('_children', _children)

        // assets[key]._source = new ConcatSource('你好吗;', ..._children)
        // assets[key]._source.add('sfsfsdfsdfsdf')

        // console.log('=====', assets[key]);

        // console.log(assets[key]._source.a);

        // console.log(assets[key]._source);

        // assets[key] = new CachedSource(new OriginalSource('你好吗;' + origin, key))
        // assets[key].updateHash()
        // console.log(assets[key]);
      }
    }