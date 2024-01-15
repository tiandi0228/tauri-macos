import { Dock, Header } from '@/components';
import { globalState } from '@/store';
import Setup from '@/views/Setup';
import {useRecoilValue } from 'recoil';
import Desktop from '@/views/Desktop';

function Layouts() {

    const t = useRecoilValue(globalState);

    return (
        <div className='layout h-screen rounded-lg bg-cover bg-center' style={{backgroundImage: `url(${t.themeConfig.primaryBg})`}}>
            {/* 导航栏 */}
            <Header />

            {/* 桌面 */}
            <Desktop />

            {/* Dock菜单 */}
            <Dock />

            <Setup/>
        </div>
    );
}

export default Layouts;