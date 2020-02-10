module.exports = (api, options, rootOptions) => {
    api.extendPackage({
      dependencies: {},
      eslintConfig: {
        rules: {
          "vue/require-v-for-key": 'off',
          'no-unused-vars': api.makeJSOnlyValue(`process.env.NODE_ENV === 'development' ? 'off' : 'warn'`),
          'vue/no-unused-components': api.makeJSOnlyValue(`process.env.NODE_ENV === 'development' ? 'off' : 'warn'`),
        }
      }
    });
}
