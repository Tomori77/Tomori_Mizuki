// 添加新工具的步骤：
// 1. 把 HTML 文件放到 public/offline/ 目录下
// 2. 在此文件 toolsData 中添加一条数据
// 3. 在 public/offline/ 目录下的 index.html 中，
//    在 </body> 前添加 <script src="/offline/sw-register.js"></script>
// 4. 在 public/sw.js 的 PRECACHE_URLS 数组中添加新工具的路径

export interface ToolItem {
	id: number;
	title: string;
	emoji: string;
	desc: string;
	url: string;
	tags?: string[];
}

export const toolsData: ToolItem[] = [
	{
		id: 1,
		title: "RP卡体检验收台",
		emoji: "🔍",
		desc: "角色卡发布前的综合体检工具，支持 JSON/PNG 导入，检查结构、世界书、正则、Token 预算和首轮体验",
		url: "/offline/RP卡体检验收台/",
		tags: ["RP", "角色卡"],
	},
	{
		id: 2,
		title: "世界书助手",
		emoji: "📖",
		desc: "世界书辅助管理工具，帮助整理和优化角色卡的世界书条目",
		url: "/offline/世界书助手/",
		tags: ["RP", "世界书"],
	},
	{
		id: 3,
		title: "变量UI辅助制作",
		emoji: "🎨",
		desc: "角色卡 UI 变量辅助工具，帮助快速制作和调试 UI 模板",
		url: "/offline/变量UI辅助制作/",
		tags: ["RP", "UI"],
	},
	{
		id: 4,
		title: "角色卡工坊",
		emoji: "🏭",
		desc: "Canary 角色卡制作工具，支持角色编辑、世界书管理与 UI 预览功能",
		url: "/offline/角色卡工坊/",
		tags: ["RP", "角色卡"],
	},
	{
		id: 5,
		title: "正则UI转化",
		emoji: "🔄",
		desc: "正则表达式与 UI 模板互转工具，帮助快速将 UI 模板转换为正则格式",
		url: "/offline/正则UI转化/",
		tags: ["RP", "正则"],
	},
	{
		id: 6,
		title: "CC角色卡协作台",
		emoji: "🤝",
		desc: "角色卡多人协作工具，支持多作者分工合作编写复杂角色卡",
		url: "/offline/CC角色卡协作台/",
		tags: ["RP", "协作"],
	},
	{
		id: 7,
		title: "生图固定提示词助手",
		emoji: "🖼️",
		desc: "AI 生图固定提示词管理工具，帮助维护和管理生图 prompt 模板",
		url: "/offline/生图固定提示词助手/",
		tags: ["AI", "生图"],
	},
];

export function getToolsList(): ToolItem[] {
	return toolsData;
}
