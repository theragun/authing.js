import configs from './configs';
let exp = [];
if (process.env.BUILD_TARGET === 'node') {
  exp = configs.node;
} else if (process.env.BUILD_TARGET === 'web') {
  exp = configs.web;
}
const files = require.context('.', false, /\.js$/);
let mod = {};
// 不导出哪些文件
let exclude = ['./index.js', './configs.js'];
files.keys().forEach(item => {
  if (exclude.indexOf(item) !== -1) return;
  let key = /\.\/(.*)\.js/.exec(item)[1];
  if (exp.indexOf(key) !== -1) mod[key] = files(item)[key];
});
export default mod;