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