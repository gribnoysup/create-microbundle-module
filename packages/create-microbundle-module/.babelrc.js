module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '6.12',
        },
        useBuiltIns: 'usage',
      },
    ],
  ],
};
