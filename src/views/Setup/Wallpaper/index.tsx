import { useRecoilState } from 'recoil';
import { globalState } from '@/store';
import { Image } from '@arco-design/web-react';
import { useState } from 'react';

import bg1 from '@/assets/bg/1.jpeg';
import bg2 from '@/assets/bg/2.jpeg';
import bg3 from '@/assets/bg/3.jpeg';
import bg4 from '@/assets/bg/4.jpeg';
import bg5 from '@/assets/bg/5.jpg';

function Wallpaper() {
    const desktopBg: string[] = [bg1, bg2, bg3, bg4, bg5];

    const [ThemeConfig, setThemeConfig] = useRecoilState(globalState);
    const [selIndex, setSelIndex] = useState<number>(
        desktopBg.indexOf(ThemeConfig.themeConfig.primaryBg) || 0
    );

    /**
     * 设置背景
     *
     * @param {string} bg - 背景图片
     * @param {number} index - 当前选择下标
     */
    const setBg = (bg: string, index: number) => {
        setSelIndex(index);
        setThemeConfig(old => ({ ...old, themeConfig: { ...old.themeConfig, primaryBg: bg } }));
    };

    return (
        <div className="grid grid-cols-4 gap-2 pt-2">
            {desktopBg.map((item: string, index: number) => {
                return (
                    <Image
                        preview={false}
                        key={index}
                        src={item}
                        className={`rounded-md ${
                            selIndex === index ? 'border-2 border-gray-400' : ''
                        }`}
                        alt=""
                        onClick={() => {
                            setBg(item, index);
                        }}
                    />
                );
            })}
        </div>
    );
}

export default Wallpaper;
