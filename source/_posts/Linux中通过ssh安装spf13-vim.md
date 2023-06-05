---
title: Linux中通过ssh安装spf13-vim
date: 2023-04-17 20:16:54
tags:
---

> `spf13-vim`默认安装源下载都是通过`https`下载安装，国内安装很慢，这里采用ssh安装会快很多

### 1、下载安装脚本

```bash
curl https://j.mp/spf13-vim3 -L > spf13-vim.sh
```

### 2、执行安装脚本

```bash
REPO_URI="git@github.com:kianfang/spf13-vim.git" VUNDLE_URI="git@github.com:gmarik/vundle.git" sh spf13-vim.sh
```

其中[git@github.com:kianfang/spf13-vim.git](https://github.com/kianfang/spf13-vim)的源是`forked`自[spf13/spf13-vim](https://github.com/spf13/spf13-vim)，在其基础上将里面的https的仓库地址全部修改为ssh地址

### 3、注意事项

- 安装完后可以将下载的`spf13-vim.sh`脚本文件删掉（后面用不到了），重复执行会清空所有已下载的插件并重新下载安装
- 如果检查插件安装的完整性或尝试重安装失败的插件，可以打开`vim`编辑器并执行命令`:PluginInstall`:
![vim :PluginInstall](PluginInstall.png)
