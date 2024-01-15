import { AppMenuType, AppType } from '@/@types/app-menu';
import { AppMenuState } from '@/store/app-menu';
import { Image } from '@arco-design/web-react';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { Modal } from '@/components';

import filesIcon from '@/assets/files.svg';
import xlsxIcon from '@/assets/xlsx.svg';
import excelIcon from '@/assets/excel.svg';
import mdIcon from '@/assets/md.svg';

import Excel from './Excel';

function Desktop() {
    const myRef = useRef();

    const setAppList = useSetRecoilState(AppMenuState);

    const [id, setId] = useState<number>(0);
    const [selIndex, setSelIndex] = useState<number>(-1);
    const [clickIndex, setClickIndex] = useState({
        tag: '',
        index: 0
    });
    const [files, setFiles] = useState([
        {
            id: 1,
            icon: filesIcon,
            dockIcon: filesIcon,
            title: 'Code',
            type: 'files',
            isOpen: false
        },
        {
            id: 2,
            icon: filesIcon,
            dockIcon: filesIcon,
            title: '新建文件夹',
            type: 'files',
            isOpen: false
        },
        {
            id: 3,
            icon: xlsxIcon,
            dockIcon: excelIcon,
            title: '工作簿.xlsx',
            type: 'xlsx',
            isOpen: false
        },
        {
            id: 4,
            icon: mdIcon,
            dockIcon: mdIcon,
            title: '记事本.md',
            type: 'markdown',
            isOpen: false
        }
    ]);
    const [closeWindow, setCloseWindow] = useState<boolean>(true);

    const appList = useRecoilValue(AppMenuState);

    useEffect(() => {
        document.addEventListener('click', () => {
            setSelIndex(-1);
        });
    });

    useEffect(() => {
        appList.otherApp.forEach((app: AppMenuType) => {
            if (app.id === id && app.isOpen) {
                setCloseWindow(false);
            }
        });
    }, [appList.otherApp]);

    useEffect(() => {
        appList.tempApp.forEach((app: AppMenuType) => {
            if (app.id === id && app.isOpen) {
                setCloseWindow(false);
            }
        });
    }, [appList.tempApp]);

    /**
     * 打开文件
     *
     * @param {any} e - the event object
     * @param {number} index - 当前点击的下标
     * @param {boolean} isOpen - 当前点击的文件是否打开状态
     * @return {void}
     */
    const onOpenFile = (e: any, index: number, isOpen: boolean) => {
        e.stopPropagation();
        setSelIndex(index);

        if (isOpen) {
            console.log('open');
            return;
        }

        if (clickIndex.tag === index + '' && clickIndex.index >= 1) {
            setCloseWindow(true);
            let _files = [...files];
            _files[index].isOpen = true;
            setFiles(_files);
            // 如果类型是文件夹的话终止
            if (files[index].type === 'files') return;
            setAppList((old: AppType) => {
                let _index: number[] = [];
                let _arr: number[] = [];
                let _item: AppMenuType = { id: 0, title: '', icon: '', isOpen: false, type: '' };
                let _app: AppType = { ...old };
                let _tempApp: AppMenuType[] = [...old.otherApp];

                _tempApp.forEach((_: AppMenuType, index: number) => {
                    _arr.push(_item.id);
                    _index.push(index);
                });

                // 获取临时APP的id最大值
                let max: number = Math.max(..._arr);
                const id = Number.isFinite(max) ? max + 1 : files[index].id;
                _item = {
                    type: files[index].type,
                    id: id,
                    isOpen: true,
                    icon: files[index].dockIcon,
                    title: files[index].title
                };
                setId(id);
                // 插入修改后的其他app
                _tempApp.splice(Math.max(..._index) + 1, 0, _item);
                _app.otherApp = _tempApp;
                return _app;
            });
            return;
        }
        setClickIndex(old => {
            return {
                tag: index + '',
                index: old.index + 1
            };
        });
    };

    /**
     * 关闭窗口
     *
     * @return {void} 无返回值
     */
    const onCloseWindow = (): void => {
        setCloseWindow(true);
        setAppList((old: AppType) => {
            const _id = Number(myRef.current.getAttribute('data-id'));

            // 关闭窗口把当前设为true设置为false
            let _files = [...files];
            const _fileIndex = _files.findIndex(item => item.id === _id);
            _files[_fileIndex].isOpen = false;
            setFiles(_files);

            let _app: AppType = { ...old };
            let _otherApp: AppMenuType[] = [...old.otherApp];
            let _tempApp: AppMenuType[] = [...old.tempApp];
            let _item: AppMenuType = { id: 0, title: '', icon: '', isOpen: false, type: '' };
            let _index: number = 0;
            let _tempIndex: number = 0;
            _app.otherApp.forEach((item: AppMenuType, index: number) => {
                _item = { ...item };
                if (item.id === _id) {
                    _index = index;
                    _item.isOpen = false;
                }
            });
            _otherApp.splice(_index, 1);
            _otherApp.splice(_index, 0, _item);
            _tempIndex = _tempApp.findIndex(old => old.id === _id);
            _tempApp.splice(_tempIndex, 1); // 删除临时app中的记录
            _otherApp.splice(_tempIndex, 1); // 删除其他app中的记录
            _app.otherApp = _otherApp;
            _app.tempApp = _tempApp;
            return _app;
        });
        setClickIndex(_ => {
            return {
                tag: '',
                index: 0
            };
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
            const _id = Number(myRef.current.getAttribute('data-id'));
            let _app: AppType = { ...old };
            let _tempApp: AppMenuType[] = [...old.tempApp];
            let _item: AppMenuType = { id: 0, title: '', icon: '', isOpen: false };
            let _index: number = 0;
            let arr: number[] = [];
            _app.otherApp.forEach((item: AppMenuType) => {
                _item = { ...item };
            });

            // 如果在临时应用中已经打开了对应的应用，直接返回
            const _tempIndex = _tempApp.findIndex(old => old.id === _id);
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
                if (item.id === _id) {
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

    return (
        <div className="p-4">
            {files.map((item, index) => {
                return (
                    <div
                        key={index}
                        className="w-20 text-center py-2 select-none cursor-default"
                        onClick={e => onOpenFile(e, index, item.isOpen)}
                    >
                        <Image
                            className={
                                selIndex === index
                                    ? 'border border-gray-500 rounded-md bg-black bg-opacity-30'
                                    : ''
                            }
                            preview={false}
                            width={80}
                            src={item.icon}
                            alt={item.title}
                        />
                        <p
                            className={`mt-0.5 ${
                                selIndex === index
                                    ? 'bg-gray-300 rounded-md text-gray-500'
                                    : 'text-white'
                            }
                                `}
                        >
                            {item.title}
                        </p>
                    </div>
                );
            })}
            <Modal visible={!closeWindow} width="w-4/5">
                <div
                    ref={myRef}
                    className="h-8 flex items-center bg-green-700 select-none"
                    data-id={id}
                >
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
                    <div className="text-white text-center flex-1">{files[2].title}</div>
                </div>
                <Excel />
            </Modal>
        </div>
    );
}

export default Desktop;
