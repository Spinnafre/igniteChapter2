module.exports = {
  //Predefinições do babel-transpiler (Compilador do Babel), indicando o modo
  //específico do transpilador.
    presets: [
      //Com o babel-preset-env você especifica o ambiente que o código irá ser compilado, no caso para a versão mais recente do node.
      ["@babel/preset-env", { targets: { node: true},"modules": "auto" }],
      "@babel/preset-typescript",
    ],
    // Plugins usados no transpile, se deseja usar novas features tem que instalar o pacote npm e adicionar aqui
    plugins: [
      "babel-plugin-transform-typescript-metadata",
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-proposal-class-properties", { loose: true }],
      ['@babel/plugin-proposal-private-methods', { loose: true }],
      ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
    ],
  };