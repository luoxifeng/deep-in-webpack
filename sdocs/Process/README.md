# Proccess

## 主流程
- [加载配置启动](./加载配置启动.md)

## 附加流程
- [lazyCompilation(懒编译)](./other/lazyCompilation.md) 
  - 启动懒编译动态import的模块可以在使用的时候再去编译
  - 前端使用代理模块和服务端通信，触发强制重新编译
  - 编译完成启动热更新流程，用真实模块替换接管 `代理模块`，继续正常流程
  ```js
  const config = {
    experiments: {
      lazyCompilation: {
        imports: true,
        entries: false,
      },
    },
  }
  ```