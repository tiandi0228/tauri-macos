import { AppMenuType, AppType } from '@/@types/app-menu';
import { useSetRecoilState } from 'recoil';
import { AppMenuState } from '@/store/app-menu';

type OptionProps = {
    id?: number; // 对应的应用编号
    type: string; // 类型 - default | other | temp
    onChange: (value: boolean) => void;
};

function Option(props: OptionProps) {
    const { id, type, onChange } = props;

    const setAppList = useSetRecoilState(AppMenuState);

    /**
     * 关闭窗口
     *
     * @return {void} 无返回值
     */
    const onCloseWindow = (): void => {
        onChange(true);
        setAppList((old: AppType) => {
            let _app: AppType = { ...old };
            let _defaultApp: AppMenuType[] = [...old.defaultApp];
            let _tempApp: AppMenuType[] = [...old.tempApp];
            let _item: AppMenuType = { id: 0, title: '', icon: '', isOpen: false, type: '' };
            let _index: number = 0;
            let _tempIndex: number = 0;
            _app.defaultApp.forEach((item: AppMenuType, index: number) => {
                _item = { ...item };
                if (item.id === id) {
                    _index = index;
                    _item.isOpen = false;
                }
            });
            _defaultApp.splice(_index, 1);
            _defaultApp.splice(_index, 0, _item);
            _tempIndex = _tempApp.findIndex(old => old.id === id);
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
        onChange(true);
        setAppList((old: AppType) => {
            let _app: AppType = { ...old };
            let _tempApp: AppMenuType[] = [...old.tempApp];
            let _item: AppMenuType = { id: 0, title: '', icon: '', isOpen: false };
            let _index: number = 0;
            let arr: number[] = [];
            _app.defaultApp.forEach((item: AppMenuType) => {
                _item = { ...item };
            });
            if (_tempApp.findIndex((old: AppMenuType) => old.id === id) !== -1) return _app; // 如果在临时应用中已经打开了对应的应用，直接返回
            _tempApp.push(_item);
            _tempApp.forEach((item: AppMenuType, index: number) => {
                _item = { ...item };
                arr.push(_item.id);
                if (item.id === id) {
                    _index = index;
                }
            });
            let max: number = Math.max(...arr); // 获取临时APP的id最大值
            _item.id = _item.id === 0 ? (Number.isFinite(max) ? max + 1 : 0) : _item.id; // 如果打开的应用不是默认应用，应用id加1
            _tempApp.splice(_index, 1); // 删除临时app
            _tempApp.splice(_index, 0, _item); // 插入修改后的临时app
            _app.tempApp = _tempApp;
            return _app;
        });
    };

    return (
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
    );
}

export default Option;
