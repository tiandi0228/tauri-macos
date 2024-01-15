import { Image, Tooltip } from '@arco-design/web-react';
import finder from '@/assets/finder.svg';
import safari from '@/assets/safari.svg';
import memorandum from '@/assets/memorandum.svg';
import setup from '@/assets/setup.svg';
import map from '@/assets/map.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DockState } from '@/store/dock';
import './index.less';
import { useEffect } from 'react';
import { AppMenuType } from '@/@types/app-menu';
import { AppMenuState } from '@/store/app-menu';
import { AppType } from '@/@types/app-menu';

function Dock() {
    const defaultApp: AppMenuType[] = [
        {
            id: 1,
            icon: finder,
            title: '访达',
            isOpen: false
        },
        {
            id: 2,
            icon: safari,
            title: 'Safari浏览器',
            isOpen: false
        },
        {
            id: 3,
            icon: map,
            title: '地图',
            isOpen: false
        },
        {
            id: 4,
            icon: memorandum,
            title: '备忘录',
            isOpen: false
        },
        {
            id: 5,
            icon: setup,
            title: '系统设置',
            isOpen: false
        }
    ];

    const dockState = useRecoilValue(DockState);
    const [appList, setAppList] = useRecoilState(AppMenuState);

    useEffect(() => {
        if (window && document) {
            document
                .getElementsByClassName('s-dock')[0]
                ?.addEventListener('mouseover', addScale, false);
        }

        return () => {
            document
                .getElementsByClassName('s-dock')[0]
                ?.removeEventListener('mouseover', addScale, false);
        };
    }, [dockState.zoom]);

    useEffect(() => {
        // 初始化dock
        setAppList((old: AppType) => {
            let _app: AppType = { ...old };
            _app.defaultApp = defaultApp;
            return _app;
        });
    }, []);

    /**
     * 添加scale和class到当前鼠标触发节点上
     *
     * @param {any} e
     */
    const addScale = (e: any) => {
        const target = e.target;
        if (target.tagName === 'IMG') {
            const li = target.parentNode.parentNode.parentNode;
            const prevLi = li.previousElementSibling;
            const nextLi = li.nextElementSibling;

            if (prevLi) {
                prevLi.className = 'prev';
                prevLi.style.setProperty('--scale', `${dockState.zoom}`);
            }

            if (nextLi) {
                nextLi.className = 'prev';
                nextLi.style.setProperty('--scale', `${dockState.zoom}`);
            }

            target.addEventListener(
                'mouseout',
                function () {
                    if (prevLi) {
                        prevLi.removeAttribute('class');
                        prevLi.style.setProperty('--scale', '1');
                    }
                    if (nextLi) {
                        nextLi.removeAttribute('class');
                        nextLi.style.setProperty('--scale', '1');
                    }
                },
                false
            );
        }
    };

    /**
     * 打开app
     *
     * @return {void} 无返回值
     */
    const openApp = (index: number, type: number, id?: number): void => {
        // 系统默认app
        if (type === 1) {
            setAppList((old: AppType) => {
                let _app: AppType = { ...old };
                let _tempApp: AppMenuType[] = [...old.defaultApp];
                let _item: AppMenuType = { ..._tempApp[index] };
                _tempApp.splice(index, 1);
                _item.isOpen = true;
                _tempApp.splice(index, 0, _item);
                _app.defaultApp = _tempApp;
                return _app;
            });
        }
        // 桌面app
        if (type === 2) {
            setAppList((old: AppType) => {
                let _app: AppType = { ...old };
                let _tempApp: AppMenuType[] = [...old.otherApp];
                let _item: AppMenuType = { ..._tempApp[index] };
                _tempApp.splice(index, 1);
                _item.isOpen = true;
                _tempApp.splice(index, 0, _item);
                _app.otherApp = _tempApp;
                return _app;
            });
        }
        // 最小化app
        if (type === 3) {
            setAppList((old: AppType) => {
                let _app: AppType = { ...old };
                let _tempApp: AppMenuType[] = [...old.tempApp];
                let _item: AppMenuType = { ..._tempApp[index] };
                _tempApp.splice(index, 1);
                _item.isOpen = false;
                if (_item.id === id) {
                    _item.isOpen = true;
                }
                _tempApp.splice(index, 0, _item);
                _app.tempApp = _tempApp;
                return _app;
            });
        }
    };

    return (
        <div
            className={`s-dock w-fit fixed left-1/2 bottom-1 -translate-x-1/2 py-2 flex items-center transition delay-100 duration-300 ease-in-out ${
                dockState.autoHide ? 'translate-y-60' : ''
            }`}
        >
            <ul>
                {appList.defaultApp.map((item: AppMenuType, index: number) => {
                    return (
                        <li key={index} onClick={() => openApp(index, 1)}>
                            <Tooltip mini content={item.title} className="-mt-6">
                                <Image
                                    width={dockState.size * 40}
                                    preview={false}
                                    src={item.icon}
                                />
                                {dockState.indicator && (
                                    <div
                                        className={`m-auto ${
                                            item.isOpen ? 'w-1 h-1 bg-black mt-2' : ''
                                        } rounded-full`}
                                    ></div>
                                )}
                            </Tooltip>
                        </li>
                    );
                })}
            </ul>
            {appList.otherApp.length > 0 && (
                <ul className="border-l border-gray-400 ">
                    {appList.otherApp.map((item, index: number) => {
                        return (
                            <li key={index} onClick={() => openApp(index, 2)}>
                                <Tooltip mini content={item.title} className="-mt-6">
                                    <Image
                                        width={dockState.size * 40}
                                        preview={false}
                                        src={item.icon}
                                    />
                                    {dockState.indicator && (
                                        <div
                                            className={`m-auto w-1 h-1 bg-black mt-2 rounded-full`}
                                        ></div>
                                    )}
                                </Tooltip>
                            </li>
                        );
                    })}
                </ul>
            )}
            {appList.tempApp.length > 0 && (
                <ul className="border-l border-gray-400 ">
                    {appList.tempApp.map((item, index: number) => {
                        return (
                            <li key={index} onClick={() => openApp(index, 3, item.id)}>
                                <Tooltip mini content={item.title} className="-mt-6">
                                    <Image
                                        width={dockState.size * 40}
                                        preview={false}
                                        src={item.icon}
                                    />
                                    {dockState.indicator && (
                                        <div
                                            className={`m-auto w-1 h-1 bg-black mt-2 rounded-full`}
                                        ></div>
                                    )}
                                </Tooltip>
                            </li>
                        );
                    })}
                </ul>
            )}
            <div className="s-dock-base bg-gray-400 bg-opacity-60 border border-white border-opacity-30 rounded-2xl"></div>
        </div>
    );
}

export default Dock;
