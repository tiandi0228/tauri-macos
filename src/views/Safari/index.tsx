import { AppMenuType, AppType } from '@/@types/app-menu';
import { Modal } from '@/components';
import { AppMenuState } from '@/store/app-menu';
import { Input, Progress } from '@arco-design/web-react';
import { IconClose, IconLeft, IconRefresh, IconRight } from '@arco-design/web-react/icon';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

function Safari() {
    const iframeRef = useRef(null);

    const appList = useRecoilValue(AppMenuState);
    const setAppList = useSetRecoilState(AppMenuState);

    const [closeWindow, setCloseWindow] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [percent, setPercent] = useState<number>(0);
    const [url, setUrl] = useState<string>('https://syc.im/');

    // 监听默认app打开
    useEffect(() => {
        appList.defaultApp.forEach((app: AppMenuType) => {
            if (app.id === 2 && app.isOpen) {
                setCloseWindow(false);
            }
        });
    }, [appList.defaultApp]);

    // 监听临时app打开
    useEffect(() => {
        appList.tempApp.forEach((app: AppMenuType) => {
            if (app.id === 2 && app.isOpen) {
                setCloseWindow(false);
            }
        });
    }, [appList.tempApp]);

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
                if (item.id === 2) {
                    _item = { ...item };
                    _index = index;
                    _item.isOpen = false;
                }
            });
            _defaultApp.splice(_index, 1);
            _defaultApp.splice(_index, 0, _item);
            _tempIndex = _tempApp.findIndex(old => old.id === 2);
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
            _item = { ..._app.defaultApp[1] };

            // 如果在临时应用中已经打开了对应的应用，直接返回
            const _tempIndex = _tempApp.findIndex(old => old.id === 2);
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
                if (item.id === 2) {
                    _index = index;
                }
            });
            let max: number = Math.max(...arr); // 获取临时APP的id最大值
            _item.id = _item.id === 0 ? (Number.isFinite(max) ? max + 1 : 0) : _item.id; // 如果打开的应用不是默认应用，应用id加1
            _item.isOpen = false;

            _tempApp.splice(_index, 1); // 删除临时app
            _tempApp.splice(_index, 0, _item); // 插入修改后的临时app
            _app.tempApp = _tempApp;
            return _app;
        });
    };

    /**
     * 重新加载
     *
     * @param {string} url - url
     */
    const onReload = (url?: string) => {
        if (iframeRef.current) {
            setTimeout(() => {
                iframeRef.current.src = url ? url : iframeRef.current.src;
                setPercent(100);
            }, 1000);
            setIsLoading(true);
            iframeRef.current.onload = () => {
                setIsLoading(false);
                setPercent(0);
            };
        }
    };

    /**
     * 回车
     * @param e
     */
    const onEnter = (e: any) => {
        setUrl(e.target.value);
        onReload(e.target.value);
    };

    return (
        <Modal visible={!closeWindow}>
            <div className="h-full select-none relative">
                <div className="h-12 flex items-center">
                    <div className="flex p-4">
                        <div
                            className='w-[.8rem] h-[.8rem] bg-red-500 shadow-inner rounded-full flex items-center justify-center text-sm font-mono hover:before:content-["x"]'
                            onClick={() => onCloseWindow()}
                        ></div>
                        <div
                            className='w-[.8rem] h-[.8rem] bg-yellow-500 shadow-inner rounded-full ml-2 flex items-center justify-center text-sm font-mono hover:before:content-["-"]'
                            onClick={onMinimize}
                        ></div>
                    </div>
                    <div className="h-full flex items-center">
                        <div className="w-8 h-8 hover:bg-gray-200 rounded-md flex items-center justify-center">
                            <IconLeft style={{ fontSize: '1.2rem' }} className="text-gray-400" />
                        </div>
                        <div className="w-8 h-8 hover:bg-gray-200 rounded-md flex items-center justify-center">
                            <IconRight style={{ fontSize: '1.2rem' }} className="text-gray-400" />
                        </div>
                    </div>
                    <div className="w-2/4 absolute left-1/2 -translate-x-1/2 rounded-md">
                        <div className="relative">
                            <Input
                                className="absolute -top-4"
                                defaultValue={url}
                                placeholder="请输入网址"
                                onPressEnter={onEnter}
                                suffix={
                                    url &&
                                    (!isLoading ? (
                                        <IconRefresh
                                            onClick={() => onReload()}
                                            className="text-gray-400 hover:text-gray-600"
                                        />
                                    ) : (
                                        <IconClose />
                                    ))
                                }
                            />
                            {percent > 1 && (
                                <Progress
                                    className="absolute top-3"
                                    size="small"
                                    percent={percent}
                                    color="#6495ED"
                                    showText={false}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div
                    style={{ height: 'calc(100% - 3rem)' }}
                    className="s-safari overflow-hidden bg-white"
                >
                    <iframe
                        ref={iframeRef}
                        className="w-full h-full border-0"
                        src={url}
                        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                        allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; clipboard-write;"
                    />
                </div>
            </div>
        </Modal>
    );
}

export default Safari;
