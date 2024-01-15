### 使用技术
- 编辑工具: vscode
- 框架技术: Vite + React
- 跨端技术: Tauri
- 组件库: arco-design

### 演示
![](https://github.com/tiandi0228/tauri-macos/blob/main/doc/demo.gif)



### 问题
- 使用Github Actions 运行打包，在windows下会出现以下报错：
  ```
  D:\a\tauri-macos\tauri-macos\src-tauri\target\release\build\tauri-macos-644f1e0a18de9c8c\out\resource.rc(25) : error RC2175 : resource file \\?\D:\a\tauri-macos\tauri-macos\src-tauri\icons\icon.ico is not in 3.00 format
  
  --- stderr
  thread 'main' panicked at C:\Users\runneradmin\.cargo\registry\src\index.crates.io-6f17d22bba15001f\embed-resource-2.4.0\src\windows_msvc.rs:39:13:
  RC.EXE failed to compile specified resource file
  note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
  ```

