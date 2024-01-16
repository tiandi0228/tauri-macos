import { appWindow } from '@tauri-apps/api/window';
import { Dropdown, Image } from '@arco-design/web-react';
import { IconBgColors, IconNotification } from '@arco-design/web-react/icon';
import { useRecoilState } from 'recoil';
import { globalState } from '@/store';
import logo from '@/assets/logo.svg';

import bg1 from '@/assets/bg/1.jpeg';
import bg2 from '@/assets/bg/2.jpeg';
import bg3 from '@/assets/bg/3.jpeg';
import bg4 from '@/assets/bg/4.jpeg';
import bg5 from '@/assets/bg/5.jpg';
import { useRef, useState } from 'react';

function Header() {
    const refMenuItemClicked = useRef(null);

    const desktopBg: string[] = [bg1, bg2, bg3, bg4, bg5];

    const [global, setGlobal] = useRecoilState(globalState);

    const [popupVisible, setPopupVisible] = useState<boolean>(true);

    /**
     * 退出
     *
     * @return {void} 无返回值
     */
    const onQuit = (): void => {
        appWindow.close();
    };

    /**
     * 注销
     * @return {void} 无返回值
     */
    const onLogout = (): void => {
        setGlobal(old => ({ ...old, token: '', userInfo: null }));
        setPopupVisible(false);
    };

    /**
     * 设置背景
     *
     * @param {string} bg - 背景图片
     */
    const setBg = (bg: string): void => {
        setGlobal(old => ({ ...old, themeConfig: { ...old.themeConfig, primaryBg: bg } }));
    };

    return (
        <div
            data-tauri-drag-region
            className="h-8 flex items-center justify-between px-2 bg-black bg-opacity-15 select-none"
        >
            {/* 左侧 */}
            <div className="flex items-center">
                <div className="flex ml-2 text-sm text-white">
                    <Dropdown
                        popupVisible={popupVisible}
                        trigger="click"
                        onVisibleChange={visible => {
                            if (
                                refMenuItemClicked.current === null ||
                                refMenuItemClicked.current === '2'
                            ) {
                                setPopupVisible(visible);
                            }
                            refMenuItemClicked.current = null;
                        }}
                        droplist={
                            <div className="bg-white bg-opacity-85 text-black mt-1.5 cursor-pointer rounded-md shadow-md px-2 py-1">
                                <div className="hover:bg-blue-500 hover:text-white hover:rounded-md px-2 py-1">
                                    关于Tauri MacOs
                                </div>
                                {global.token && global.userInfo && (
                                    <>
                                        <div className="border-t border-gray-300 mt-1 mx-2"></div>
                                        <div className="hover:bg-blue-500 hover:text-white hover:rounded-md px-2 py-1">
                                            系统设置
                                        </div>
                                        <div className="border-t border-gray-300 mt-1 mx-2"></div>
                                        <div
                                            className=" hover:bg-blue-500 hover:text-white hover:rounded-md px-2 py-1 mt-1"
                                            onClick={onLogout}
                                        >
                                            注销
                                        </div>
                                        <div
                                            className=" hover:bg-blue-500 hover:text-white hover:rounded-md px-2 py-1 mt-1"
                                            onClick={onQuit}
                                        >
                                            退出
                                        </div>
                                    </>
                                )}
                            </div>
                        }
                    >
                        <Image className="w-5 h-5" preview={false} src={logo} alt="lamp" />
                    </Dropdown>
                </div>
            </div>

            {/* 右侧 */}
            <div className="flex items-center mr-2">
                <div className="mr-4">
                    <Dropdown
                        trigger="click"
                        droplist={
                            <div className="w-3/12 float-right bg-white bg-opacity-85 text-black mt-1.5 cursor-pointer rounded-md shadow-md p-2 mr-4 select-none"></div>
                        }
                    >
                        <IconNotification className="text-white text-2xl" />
                    </Dropdown>
                </div>
                <div>
                    <Dropdown
                        trigger="click"
                        droplist={
                            <div className="w-3/12 float-right bg-white bg-opacity-85 text-black mt-1.5 rounded-md shadow-md p-2 mr-4 select-none">
                                <div>桌面主题</div>
                                <div className="grid grid-cols-5 gap-1 pt-2">
                                    {desktopBg.map((item: string, index: number) => {
                                        return (
                                            <Image
                                                preview={false}
                                                key={index}
                                                src={item}
                                                alt=""
                                                onClick={() => {
                                                    setBg(item);
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        }
                    >
                        <IconBgColors className="text-white text-2xl" />
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}

export default Header;
