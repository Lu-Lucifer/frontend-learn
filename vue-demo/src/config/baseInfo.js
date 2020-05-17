export const sideMenus = [
	{
		id: '/router',
		title: 'vue-router',
		groups: [
			{
				id: 'group1',
				groupName: '路由加载',
				children: [
					{
						id: '/router/common',
						title: '常规加载'
					},
					{
						id: '/router/lazy',
						title: '懒加载'
					},
					{
						id: '/router/dynamic',
						title: '动态路由1'
					},
					{
						id: '/router/dynamic2',
						title: '动态路由2'
					}
				]
			}
		]
	}
];
