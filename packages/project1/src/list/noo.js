import text from './ooo.js';

export default '这是热更新代理模块里面cc的dd'

if (module.hot) {
  module.hot.accept('./ooo.js', () => {
    console.log(text);
    // append(content);
  })

}