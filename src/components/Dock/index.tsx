import finder from '@/assets/finder.svg';
import safari from '@/assets/safari.svg';
import memorandum from '@/assets/memorandum.svg';
import setup from '@/assets/setup.svg';
import map from '@/assets/map.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DockState } from '@/store/dock';
import './index.less';
import { useEffect, useRef } from 'react';
import { AppMenuType } from '@/@types/app-menu';
import { AppMenuState } from '@/store/app-menu';
import { AppType } from '@/@types/app-menu';
import { DockCard } from '../DockCard';

function Dock() {
    const dockRef = useRef<HTMLDivElement>(null);

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
        // 初始化dock
        setAppList((old: AppType) => {
            let _app: AppType = { ...old };
            _app.defaultApp = defaultApp;
            return _app;
        });
    }, []);

    const scaleValue = (value: number, from: [number, number], to: [number, number]) => {
        const scale = (to[1] - to[0]) / (from[1] - from[0]);
        const capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
        return Math.floor(capped * scale + to[0]);
    };

    /**
     * 添加scale和class到当前鼠标触发节点上
     *
     * @param {any} e
     */
    const addScale = (e: any) => {
        const mousePosition = e.clientX;
        const iconPositionLeft = e.currentTarget.getBoundingClientRect().left;
        const iconWidth = e.currentTarget.getBoundingClientRect().width;
        const cursorDistance = (mousePosition - iconPositionLeft) / iconWidth;
        const offsetPixels = scaleValue(
            cursorDistance,
            [0, 1],
            [dockState.zoom * -1, dockState.zoom]
        );
        dockRef.current?.style.setProperty('--dock-offset-left', `${offsetPixels * -1}px`);
        dockRef.current?.style.setProperty('--dock-offset-right', `${offsetPixels}px`);
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
            className={`s-dock fixed left-1/2 bottom-3 -translate-x-1/2 rounded-xl flex justify-center transition delay-100 duration-300 ease-in-out ${
                dockState.autoHide ? 'translate-y-60' : ''
            }`}
            ref={dockRef}
            style={{ '--width': `${dockState.size}` }}
        >
            <DockCard
                data={appList.defaultApp}
                indicator={dockState.indicator}
                size={dockState.size}
                type={1}
                onOpenApp={openApp}
                onMouseMove={addScale}
            />
            {appList.otherApp.length > 0 && (
                <DockCard
                    data={appList.otherApp}
                    indicator={dockState.indicator}
                    size={dockState.size}
                    type={2}
                    onOpenApp={openApp}
                    onMouseMove={addScale}
                />
            )}
            {appList.tempApp.length > 0 && (
                <DockCard
                    data={appList.tempApp}
                    indicator={dockState.indicator}
                    size={dockState.size}
                    type={3}
                    onOpenApp={openApp}
                    onMouseMove={addScale}
                />
            )}
        </div>
    );
}

export default Dock;
