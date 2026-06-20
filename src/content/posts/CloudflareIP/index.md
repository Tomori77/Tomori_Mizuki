---
title: Cloudflare IP优选教程（反代）
description: Worker路由反代全球Cloudflare IP优选！
published: 2026-06-20
date: 2026-06-20
pubDate: 2026-06-20
draft: true
encrypted: false
pinned: true
tags:
  - web
  - Cloudflare
category: Tutorial
---

# Worker 路由反代全球 Cloudflare IP 优选部署教程

> **来源**：[zhoujie218.top](https://www.zhoujie218.top/archives/2673.html)  
> **整理日期**：2026-06-20  
> **适用场景**：让 Cloudflare 在国内不再是减速器

---

## 一、效果对比

| 对比项 | 未优选 | 已优选 |
|---|---|---|
| **访问延迟** | 直连 CF 节点，国内延迟高、丢包多 | 优选入口，响应速度大幅提升 |
| **出口 IP** | 单一节点，可用性差 | 多出口 IP，可用性显著提高 |
| **加载体验** | 页面加载缓慢，常超时 | 页面加载速度明显加快 |

> **优选域名示例**：`www.visa.cn`（可用于 CNAME 解析）

---

## 二、Worker 核心代码

以下代码是原 GitHub 全站反代代码的二改，以实现 Worker 路由接入优选。可能有多余逻辑或不完全适配于优选需求。

### 2.1 创建 Worker

登录 Cloudflare Dashboard，进入 **Workers & Pages**，创建一个新的 Worker。

![点击 Create Worker 按钮](https://blog-image.646677.xyz/image/CloudflareIP/1.webp)

![进入 Worker 编辑界面](https://blog-image.646677.xyz/image/CloudflareIP/2.webp)

点击「编辑代码」，进入代码编辑器：

![点击编辑代码](https://blog-image.646677.xyz/image/CloudflareIP/3.webp)

将代码复制到编辑器，点击「保存并部署」：

![粘贴代码并部署](https://blog-image.646677.xyz/image/CloudflareIP/4.webp)

### 2.2 写入代码

将以下代码完整粘贴到 Worker 编辑器中：

```javascript
// 域名前缀映射配置
const domain_mappings = {
  'live-1vz.pages.dev': 'live',
  //例如：
  //'live-1vz.pages.dev': 'live',
  //则你设置Worker路由为live*.都将会反代到live-1vz.pages.dev
};

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const current_host = url.host;

  // 强制使用 HTTPS
  if (url.protocol === 'http:') {
    url.protocol = 'https:';
    return Response.redirect(url.href, 301);
  }

  const host_prefix = getProxyPrefix(current_host);
  if (!host_prefix) {
    return new Response('Proxy prefix not matched', { status: 404 });
  }

  // 查找对应目标域名
  let target_host = null;
  for (const [origin_domain, prefix] of Object.entries(domain_mappings)) {
    if (host_prefix === prefix) {
      target_host = origin_domain;
      break;
    }
  }

  if (!target_host) {
    return new Response('No matching target host for prefix', { status: 404 });
  }

  // 构造目标 URL
  const new_url = new URL(request.url);
  new_url.protocol = 'https:';
  new_url.host = target_host;

  // 创建新请求
  const new_headers = new Headers(request.headers);
  new_headers.set('Host', target_host);
  new_headers.set('Referer', new_url.href);

  try {
    const response = await fetch(new_url.href, {
      method: request.method,
      headers: new_headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
      redirect: 'manual'
    });

    // 复制响应头并添加CORS
    const response_headers = new Headers(response.headers);
    response_headers.set('access-control-allow-origin', '*');
    response_headers.set('access-control-allow-credentials', 'true');
    response_headers.set('cache-control', 'public, max-age=600');
    response_headers.delete('content-security-policy');
    response_headers.delete('content-security-policy-report-only');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response_headers
    });
  } catch (err) {
    return new Response(`Proxy Error: ${err.message}`, { status: 502 });
  }
}

function getProxyPrefix(hostname) {
  for (const prefix of Object.values(domain_mappings)) {
    if (hostname.startsWith(prefix)) {
      return prefix;
    }
  }
  return null;
}
```

---

## 三、创建路由

在 Cloudflare Worker **配置域页面**中，添加路由规则。

![添加 Worker 路由](https://blog-image.646677.xyz/image/CloudflareIP/5.webp)

### 3.1 路由规则示例

| 字段 | 填写内容 |
|---|---|
| **路由** | `live*.example.com/*` |
| **Worker** | 选择你刚才创建的 Worker |

> `live*` 中的 `live` 对应代码中 `domain_mappings` 的 value 值。例如代码中的 `'live-1vz.pages.dev': 'live'`，则路由前缀为 `live*`。

---

## 四、DNS 解析配置

在域名 DNS 管理面板中，添加一条 CNAME 记录：

| 记录类型 | 主机记录 | 记录值 |
|---|---|---|
| **CNAME** | `live-cs` | `cf.090227.xyz`（社区优选域名） |

也可直接使用优选域名 `www.visa.cn`。

### 支持的优选域名参考

| 优选域名 | 说明 |
|---|---|
| `www.visa.cn` | 官方大厂域名，稳定 |
| `cf.090227.xyz` | 社区优选域名 |

---

## 五、配置汇总清单

完成部署后，逐项检查：

- [ ] Worker 代码已部署，`domain_mappings` 配置正确
- [ ] Worker 路由已创建（格式：`live*.example.com/*`）
- [ ] DNS 已添加 CNAME 记录指向优选域名
- [ ] HTTPS 自动跳转正常工作
- [ ] 源站可通过优选路径正常访问

---

## 六、参考来源

> 本文内容整理自：  
> [https://www.zhoujie218.top/archives/2673.html](https://www.zhoujie218.top/archives/2673.html)  
> 部分内容转发自：[https://www.afo.im/posts/cf-fastip/](https://www.afo.im/posts/cf-fastip/)

---

*本教程中的代码保持原样未作修改，配置步骤忠实还原原文内容。*
