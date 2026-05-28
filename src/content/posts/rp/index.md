---
title: RP-HUB搭建教程
description: RP-HUB在Cloudflare的搭建教程
published: 2026-05-28
date: 2026-05-28
pubDate: 2026-05-28
draft: false
encrypted: false
pinned: true
tags:
  - Tutorial
category: Tutorial
---

# RP-HUB 在 Cloudflare 的搭建教程

> 教程比较粗糙，有时间再改。  

**前置准备**  
- 确保能访问 Cloudflare 控制台：https://dash.cloudflare.com/  
- 如需魔法请自行解决，本帖不教。  

---

## 一、创建 Pages 项目

1. 进入主页面，点击左侧 **Workers 和 Pages**。  
   ![图片描述 w-50%](/images/rp/1.png)

2. 首次使用 Cloudflare 时界面可能不同，请自行找到创建入口。  
   ![图片描述 w-50%](/images/rp/2.png)

3. 依次点击 **创建应用程序** → **Pages** → **上传资产**。  
   ![图片描述 w-50%](/images/rp/3.png)  
   ![图片描述 w-50%](/images/rp/4.png)

4. 项目名称随意（建议与构建项目一致），上传你的压缩包并部署。  
   ![图片描述 w-50%](/images/rp/5.png)

5. 部署完成后点击 **继续处理项目**。  
   ![图片描述 w-50%](/images/rp/6.png)
   ![图片描述 w-50%](/images/rp/7.png) 

---

## 二、创建 R2 存储库

1. 按照下图顺序进入 R2 并创建存储桶。  
   ![图片描述 w-50%](/images/rp/9.png)  
   ![图片描述 w-50%](/images/rp/10.png)

2. 存储库名称尽量与项目一致（方便管理），位置默认自动，也可按需选择亚太、美国等地。  
   ![图片描述 w-50%](/images/rp/11.png)

3. 创建完成后点击 **设置**。  
   ![图片描述 w-50%](/images/rp/12.png)

4. 在设置中找到 **生命周期规则**，将过期时间改为 **1 天**。  
   ![图片描述 w-50%](/images/rp/13.png)  
   ![图片描述 w-50%](/images/rp/14.png)

---

## 三、绑定 R2 与设置环境变量

1. 回到 **Workers 和 Pages**，进入项目 **设置**。  
   ![图片描述 w-50%](/images/rp/15.png)

2. 在 **绑定** 区域点击 **添加**。  
   ![图片描述 w-50%](/images/rp/16.png)  
   ![图片描述 w-50%](/images/rp/17.png)

3. 添加 R2 存储桶绑定：  
   - 变量名称：`RP_SYNC_R2`  
   - 存储桶：选择刚刚创建的 R2 存储桶  
   ![图片描述 w-50%](/images/rp/18.png)

4. 添加环境变量（机密）：  
   - 点击 **添加** → **机密**  
   - 变量名称：`RP_SYNC_PASSWORD`  
   - 值：自定义一个只有你知道的同步密码  
   - 此密码用于同步设备与服务器信息
   ![图片描述 w-50%](/images/rp/19.png)  
   ![图片描述 w-50%](/images/rp/20.png)

---

## 四、重新部署项目

绑定和变量设置完成后，需**重新上传一次压缩包**以使其生效。  
![图片描述 w-50%](/images/rp/21.png)  
![图片描述 w-50%](/images/rp/22.png)

---

## 五、访问与自定义域名

- 部署成功后，在项目页 **Domains** 后的链接即为你的 `rp-hub` 访问地址。  
  ![图片描述 w-50%](/images/rp/24.png)

- 如需绑定自有域名，可在 **自定义域** 中按提示添加 CNAME 记录。  
  ![图片描述 w-50%](/images/rp/23.png)

---

> 至此页面搭建完毕，愉快地玩耍吧！  
> 后续可能会更新域名相关或其他反馈问题，也许吧，有时间就更。

