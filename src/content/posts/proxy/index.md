---
title: AI Proxy Hub搭建
description: 在Cloudflare上搭建AI Proxy Hub
published: 2026-05-28
date: 2026-05-28
pubDate: 2026-05-28
draft: false
encrypted: false
pinned: true
tags:
  - Proxy
category: web
---


**前置准备**  
- 确保能访问 Cloudflare 控制台：https://dash.cloudflare.com/  
- 如需魔法请自行解决，本帖不教。  

---

# 部署教程

## 第一步：创建一个 KV

1. 进入 Cloudflare 控制台，按图示操作：
   ![创建 KV 1](/images/proxy/1.png)
   ![创建 KV 2](/images/proxy/2.png)

2. **命名建议**与项目相关，方便后期维护和查找：
   ![命名示例](/images/proxy/3.png)

## 第二步：创建 Workers 和 Pages

按顺序依次点击，完成创建：
![步骤4](/images/proxy/4.png)
![步骤5](/images/proxy/5.png)
![步骤6](/images/proxy/6.png)
![步骤7](/images/proxy/7.png)

再次来到命名环节：
![命名页面](/images/proxy/8.png)

## 第三步：上传部署文件

拖入压缩文件，上传完成后继续点击：
![上传文件](/images/proxy/9.png)
![继续1](/images/proxy/10.png)
![继续2](/images/proxy/11.png)

## 第四步：进入项目设置

进入设置页面：
![项目设置入口](/images/proxy/12.png)

### 设置变量（共两个）

![变量设置](/images/proxy/13.png)

- **第一个变量** `CLIENT_KEY`：API key，自行设置：
  ![CLIENT_KEY设置](/images/proxy/14.png)

- **第二个变量** `ADMIN_KEY`：管理后台密码，设置一个能记住的密码（忘记后可回来查看）：
  ![ADMIN_KEY设置](/images/proxy/15.png)

最终变量设置效果应如图所示：
![最终变量示例](/images/proxy/16.png)

## 第五步：绑定 KV

绑定 KV 存储：
![绑定KV 1](/images/proxy/17.png)
![绑定KV 2](/images/proxy/18.png)

**注意：** KV 命名空间的变量名称必须为 `AI_PROXY_DATA`，不可更改：
![变量名称要求](/images/proxy/19.png)

## 第六步：完成并访问

后续步骤依次点击完成：
![继续20](/images/proxy/20.png)
![继续21](/images/proxy/21.png)
![继续22](/images/proxy/22.png)

点击链接直接进入项目。  
至此部署结束，后续功能请自行探索。

