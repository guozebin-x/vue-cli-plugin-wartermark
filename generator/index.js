module.exports = (api, options, rootOptions) => {

  // Render vuetify plugin file
  api.render(
    {
      "./src/plugins/wartermark.js": "./templates/plugins/wartermark.js"
    },
    options
  );

  const fs = require("fs");
  const helpers = require('./helpers')(api)

  // adapted from https://github.com/Akryum/vue-cli-plugin-apollo/blob/master/generator/index.js#L68-L91
  api.onCreateComplete(() => {
    // Modify main.js
    helpers.updateMain(src => {
      let vueImportIndex = src.findIndex(line => line.match(/^import Vue/));
      let wartermarkImportIndex = src.findIndex(line => line.match(/\/plugins\/wartermark/));
      if (wartermarkImportIndex < 0) {
        src.splice(++vueImportIndex, 0, `import watermark from './plugins/wartermark'
//请在plugins/wartermark.js中修改水印配置
watermark.set("请在main.js中传入水印信息");
//用户信息保存在vuex中可参照如下配置
// router.beforeEach((to, from, next) => {
  //   if (store.getters.userInfo.id) {
  //     next()
  //   } else {
  //     store.dispatch('getUserInfo').then(res => {
  //       watermark.set(store.getters.userInfo.name + "-" + store.getters.userInfo.uid); 
  //       next()
  //     })
  //   }
  // })`);
      }
      return src;
    });
  });
};
