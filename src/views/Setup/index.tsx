import { Modal } from '@/components';

import { Image } from '@arco-design/web-react';
import { menuType } from '@/@types/menu';

import advertisingIcon from '@/assets/advertising.svg';
import wallpaperIcon from '@/assets/wallpaper.svg';
import { useEffect, useState } from 'react';

import Wallpaper from '@/views/Setup/Wallpaper';
import Dock from './Dock';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AppMenuState } from '@/store/app-menu.ts';
import { AppMenuType, AppType } from '@/@types/app-menu';

function Setup() {
    const [selIndex, setSelIndex] = useState<number>(0);
    const [closeWindow, setCloseWindow] = useState<boolean>(true);
    const appList = useRecoilValue(AppMenuState);
    const setAppList = useSetRecoilState(AppMenuState);

    // 监听默认app打开
    useEffect(() => {
        appList.defaultApp.forEach((app: AppMenuType) => {
            if (app.id === 5 && app.isOpen) {
                setCloseWindow(false);
            }
        });
    }, [appList.defaultApp]);

    // 监听临时app打开
    useEffect(() => {
        appList.tempApp.forEach((app: AppMenuType) => {
            if (app.id === 5 && app.isOpen) {
                setCloseWindow(false);
            }
        });
    }, [appList.tempApp]);

    const menus: menuType[] = [
        {
            icon: advertisingIcon,
            name: '程序坞',
            component: Dock
        },
        {
            icon: wallpaperIcon,
            name: '墙纸',
            component: Wallpaper
        }
    ];

    /**
     * 关闭窗口
     *
     * @return {void} 无返回值
     */
    const onCloseWindow = (): void => {
        setCloseWindow(true);
        setAppList((old: AppType) => {
            let _app: AppType = { ...old };
            let _defaultApp: AppMenuType[] = [...old.defaultApp];
            let _tempApp: AppMenuType[] = [...old.tempApp];
            let _item: AppMenuType = { id: 0, title: '', icon: '', isOpen: false, type: '' };
            let _index: number = 0;
            let _tempIndex: number = 0;
            _app.defaultApp.forEach((item: AppMenuType, index: number) => {
                _item = { ...item };
                if (item.id === 5) {
                    _index = index;
                    _item.isOpen = false;
                }
            });
            _defaultApp.splice(_index, 1);
            _defaultApp.splice(_index, 0, _item);
            _tempIndex = _tempApp.findIndex(old => old.id === 5);
            _tempApp.splice(_tempIndex, 1);
            _app.defaultApp = _defaultApp;
            _app.tempApp = _tempApp;
            return _app;
        });
    };

    /**
     * 最小化
     *
     * @return {void} 无返回值
     */
    const onMinimize = (): void => {
        setCloseWindow(true);
        setAppList((old: AppType) => {
            let _app: AppType = { ...old };
            let _tempApp: AppMenuType[] = [...old.tempApp];
            let _item: AppMenuType = { id: 0, title: '', icon: '', isOpen: false };
            let _index: number = 0;
            let arr: number[] = [];
            _app.defaultApp.forEach((item: AppMenuType) => {
                _item = { ...item };
            });

            // 如果在临时应用中已经打开了对应的应用，直接返回
            const _tempIndex = _tempApp.findIndex(old => old.id === 5);
            if (_tempIndex !== -1) {
                _item.isOpen = false;
                _tempApp.splice(_tempIndex, 1); // 删除临时app
                _tempApp.splice(_tempIndex, 0, _item); // 插入修改后的临时app
                _app.tempApp = _tempApp;
                return _app;
            }

            _tempApp.push(_item);
            _tempApp.forEach((item: AppMenuType, index: number) => {
                _item = { ...item };
                arr.push(_item.id);
                if (item.id === 5) {
                    _index = index;
                }
            });
            let max: number = Math.max(...arr); // 获取临时APP的id最大值
            _item.id = _item.id === 0 ? (Number.isFinite(max) ? max + 1 : 0) : _item.id; // 如果打开的应用不是默认应用，应用id加1
            _item.isOpen = false;
            _tempApp.splice(_index, 1); // 删除临时app
            _tempApp.splice(_index, 0, _item); // 插入修改后的临时app
            console.log(_tempApp);
            _app.tempApp = _tempApp;
            return _app;
        });
    };

    return (
        <Modal visible={!closeWindow}>
            <div className="flex h-dvh cursor-default select-none">
                <div className="w-64 h-full border-r border-gray-300 shadow-inner">
                    <div className="flex p-4">
                        <div
                            className='w-[.8rem] h-[.8rem] bg-red-500 shadow-inner rounded-full flex items-center justify-center text-sm font-mono hover:before:content-["x"]'
                            onClick={() => onCloseWindow()}
                        ></div>
                        <div
                            className='w-[.8rem] h-[.8rem] bg-yellow-500 shadow-inner rounded-full ml-2 flex items-center justify-center text-sm font-mono hover:before:content-["-"]'
                            onClick={onMinimize}
                        ></div>
                        {/*<div className='w-[.8rem] h-[.8rem] bg-green-500 shadow-inner rounded-full ml-2 flex items-center justify-center text-sm font-mono hover:before:content-["+"]'></div>*/}
                    </div>
                    <div className="px-3">
                        {menus.map((item: menuType, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className={`h-7 flex items-center text-md font-sans px-1 mt-2 first:mt-0 ${
                                        index === selIndex
                                            ? 'bg-blue-400 rounded-md text-white'
                                            : ''
                                    }`}
                                    onClick={() => {
                                        setSelIndex(index);
                                    }}
                                >
                                    <Image width={24} preview={false} src={item.icon} />
                                    <span className="pl-1">{item.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="flex-1 bg-gray-200 p-4">
                    <div className="text-lg font-bold pl-2">{menus[selIndex].name}</div>
                    <div className="px-2">
                        {selIndex === 0 && <Dock />}
                        {selIndex === 1 && <Wallpaper />}
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default Setup;
