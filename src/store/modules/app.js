import { otherRouter, appRouter } from '@/router/system-router';
import Util from '@/libs/util';
import Cookies from 'js-cookie';
import Vue from 'vue';
import { router } from '@/router/index';

const app = {
    state: {
        cachePage: [],
        lang: '',
        isFullScreen: false,
        openedSubmenuArr: [], // 要展开的菜单数组
        menuTheme: 'dark', // 主题
        themeColor: '',
        pageOpenedList: [{
            title: '首页',
            path: '',
            name: 'home_index'
        }],
        currentPageName: '',
        currentPath: [{
            title: '首页',
            path: '',
            name: 'home_index'
        }], // 面包屑数组
        menuList: [],
        routers: [
            otherRouter,
            ...appRouter
        ],
        tagsList: otherRouter.children ? [...otherRouter.children] : [],
        messageCount: 0,
        dontCache: ['text-editor', 'artical-publish'] // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
    },
    mutations: {
        updateAppRouter (state,routes) {
            state.routers.push(...routes);
            router.addRoutes(routes);
        },
        //********************************** */
        setTagsList (state, list) {
            state.tagsList.push(...list);
        },
        updateMenulist (state, routes) {
            if (Array.isArray(routes)) {
                state.menuList = [];
                let accessCode = parseInt(Cookies.get('access'));
                let menuList = [];
                appRouter.forEach((item, index) => {
                    if (item.access !== undefined) {
                        if (Util.showThisRoute(item.access, accessCode)) {
                            if (item.children.length === 1) {
                                menuList.push(item);
                            } else {
                                let len = menuList.push(item);
                                let childrenArr = [];
                                childrenArr = item.children.filter(child => {
                                    if (child.access !== undefined) {
                                        if (child.access == accessCode) {
                                            return child;
                                        }
                                    } else {
                                        return child;
                                    }
                                });
                                menuList[len - 1].children = childrenArr;
                            }
                        }
                    } else {
                        if (item.children.length === 1) {
                            menuList.push(item);
                        } else {
                            let len = menuList.push(item);
                            let childrenArr = [];
                            childrenArr = item.children.filter(child => {
                                if (child.access !== undefined) {
                                    if (Util.showThisRoute(child.access, accessCode)) {
                                        return child;
                                    }
                                } else {
                                    return child;
                                }
                            });
                            if (childrenArr == undefined || childrenArr.length === 0) {
                                menuList.splice(len - 1, 1);
                            } else {
                                let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
                                handledItem.children = childrenArr;
                                menuList.splice(len - 1, 1, handledItem);
                            }
                        }
                    }
                });
                state.menuList.push(...routes);
                state.menuList.push(...menuList);
            }
        },
        changeMenuTheme (state, theme) {
            state.menuTheme = theme;
        },
        changeMainTheme (state, mainTheme) {
            state.themeColor = mainTheme;
        },
        addOpenSubmenu (state, name) {
            let hasThisName = false;
            let isEmpty = false;
            if (name.length === 0) {
                isEmpty = true;
            }
            if (state.openedSubmenuArr.indexOf(name) > -1) {
                hasThisName = true;
            }
            if (!hasThisName && !isEmpty) {
                state.openedSubmenuArr.push(name);
            }
        },
        closePage (state, name) {
            state.cachePage.forEach((item, index) => {
                if (item == name) {
                    state.cachePage.splice(index, 1);
                }
            });
        },
        initCachepage (state) {
            if (localStorage.cachePage) {
                state.cachePage = JSON.parse(localStorage.cachePage);
            }
        },
        removeTag (state, name) {
            state.pageOpenedList.map((item, index) => {
                if (item.name == name) {
                    state.pageOpenedList.splice(index, 1);
                }
            });
        },
        pageOpenedList (state, get) {
            let openedPage = state.pageOpenedList[get.index];
            if (get.argu) {
                openedPage.argu = get.argu;
            }
            if (get.query) {
                openedPage.query = get.query;
            }
            state.pageOpenedList.splice(get.index, 1, openedPage);
            //保持最新打开的页面在tag最后一项
            // if(openedPage.name === "home_index"){
            //     state.pageOpenedList.splice(get.index, 1, openedPage);
            // }else{
            //     state.pageOpenedList.splice(get.index, 1);
            //     state.pageOpenedList.push(openedPage);
            // }
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearAllTags (state) {
            state.pageOpenedList.splice(1);
            state.cachePage.length = 0;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearOtherTags (state, vm) {
            let currentName = vm.$route.name;
            let currentIndex = 0;
            state.pageOpenedList.forEach((item, index) => {
                if (item.name == currentName) {
                    currentIndex = index;
                }
            });
            if (currentIndex === 0) {
                state.pageOpenedList.splice(1);
            } else {
                state.pageOpenedList.splice(currentIndex + 1);
                state.pageOpenedList.splice(1, currentIndex - 1);
            }
            let newCachepage = state.cachePage.filter(item => {
                return item == currentName;
            });
            state.cachePage = newCachepage;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        setOpenedList (state) {
            if (otherRouter.children) {
                state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]];
            }
        },
        setCurrentPath (state, pathArr) {
            state.currentPath = pathArr;
        },
        setCurrentPageName (state, name) {
            state.currentPageName = name;
        },
        setAvator (state, path) {
            localStorage.avatorImgPath = path;
        },
        switchLang (state, lang) {
            state.lang = lang;
            Vue.config.lang = lang;
        },
        clearOpenedSubmenu (state) {
            state.openedSubmenuArr.length = 0;
        },
        setMessageCount (state, count) {
            state.messageCount = count;
        },
        increateTag (state, tagObj) {
            if (!Util.oneOf(tagObj.name, state.dontCache)) {
                state.cachePage.push(tagObj.name);
                localStorage.cachePage = JSON.stringify(state.cachePage);
            }
            state.pageOpenedList.push(tagObj);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        }
    }
};

export default app;
