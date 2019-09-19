module.exports = (api, options, rootOptions) => {
    api.extendPackage({
      dependencies: {},
      eslintConfig: {
        rules: {
          "vue/require-v-for-key": 0
        }
      }
    });
}
