// 添加新工具的步骤：
// 1. 把 HTML 文件放到 public/offline/ 目录下
// 2. 在此文件 toolsData 中添加一条数据
// 3. 在 public/offline/ 目录下的 HTML 中，
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
		url: "/offline/RP卡体检验收台.html",
		tags: ["RP", "角色卡"],
	},
	{
		id: 2,
		title: "世界书助手",
		emoji: "📖",
		desc: "世界书辅助管理工具，帮助整理和优化角色卡的世界书条目",
		url: "/offline/世界书助手.html",
		tags: ["RP", "世界书"],
	},
	{
		id: 3,
		title: "变量UI辅助制作",
		emoji: "🎨",
		desc: "角色卡 UI 变量辅助工具，帮助快速制作和调试 UI 模板",
		url: "/offline/变量UI辅助制作.html",
		tags: ["RP", "UI"],
	},
];

export function getToolsList(): ToolItem[] {
	return toolsData;
}
