let menu = [
  {
    id: 1,
    title: 'Trang chủ',
    icon: 'fas fa-home',
    level: 1,
    parent_id: null,
    link: '/',
    position: 1,
    horizontal: true,
  },
  {
    id: 2,
    title: 'Sản phẩm',
    icon: 'fas fa-box-open',
    level: 1,
    parent_id: null,
    link: '/products',
    position: 2,
    horizontal: true,
  },
  {
    id: 3,
    title: 'Tin tức',
    icon: 'far fa-newspaper',
    level: 1,
    parent_id: null,
    link: '/news',
    position: 3,
    horizontal: true,
  },
  {
    id: 4,
    title: 'Liên hệ',
    icon: 'far fa-envelope',
    level: 1,
    parent_id: null,
    link: '/contact',
    position: 4,
    horizontal: true,
  },
  {
    id: 6,
    title: 'Điện thoại',
    icon: 'fas fa-mobile-alt',
    level: 2,
    parent_id: 2,
    link: '/products/phone',
    position: 2,
    horizontal: true,
  },
  {
    id: 7,
    title: 'Tin công nghệ',
    icon: 'far fa-microchip',
    level: 2,
    parent_id: 3,
    link: '/news/tech',
    position: 1,
    horizontal: true,
  },
  {
    id: 8,
    title: 'Tin thế giới',
    icon: 'far fa-globe',
    level: 2,
    parent_id: 3,
    link: '/news/world',
    position: 2,
    horizontal: true,
  },
  {
    id: 9,
    title: 'Tin thể thao',
    icon: 'fas fa-futbol',
    level: 2,
    parent_id: 3,
    link: '/news/sports',
    position: 3,
    horizontal: true,
  },
  {
    id: 10,
    title: 'Máy tính để bàn',
    icon: 'fas fa-desktop',
    level: 3,
    parent_id: 5,
    link: '/products/pc/desktop',
    position: 1,
    horizontal: false,
  },
  {
    id: 11,
    title: 'Laptop',
    icon: 'fas fa-laptop',
    level: 3,
    parent_id: 5,
    link: '/products/pc/laptop',
    position: 2,
    horizontal: false,
  },
  {
    id: 12,
    title: 'Macbook',
    icon: 'fas fa-apple',
    level: 3,
    parent_id: 5,
    link: '/products/pc/macbook',
    position: 3,
    horizontal: false,
  },
  {
    id: 5,
    title: 'Máy tính',
    icon: 'fas fa-laptop',
    level: 2,
    parent_id: 2,
    link: '/products/pc',
    position: 1,
    horizontal: true,
  },
  {
    id: 6,
    title: 'Máy tính',
    icon: 'fas fa-laptop',
    level: 2,
    parent_id: 2,
    link: '/products/pc',
    position: 1,
    horizontal: true,
  },
];

let MenuLevel = {
  one: 1,
  two: 2,
  three: 3,
};

let menuSorted = menu.reduce((menuItems, currentMenu) => {
  if (currentMenu.level === MenuLevel.one) {
    const childrenLevel2 = getChildrenMenu(
      menu,
      MenuLevel.two,
      currentMenu.id,
    ).map((childrenMenu2) => {
      const childrenLevel3 = getChildrenMenu(
        menu,
        MenuLevel.three,
        childrenMenu2.id,
      );

      return {
        ...childrenMenu2,
        children: childrenLevel3,
      };
    });

    return [
      ...menuItems,
      {
        ...currentMenu,
        children: childrenLevel2,
      },
    ];
  }

  return menuItems;
}, []);

function sortByPosition(menuItemA, menuItemB) {
  return menuItemA.position - menuItemB.position;
}

function getChildrenMenu(menu, level, parentId) {
  return menu
    .filter((item) => item.parent_id === parentId && item.level === level)
    .sort(sortByPosition);
}
