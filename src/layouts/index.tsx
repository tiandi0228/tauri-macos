import { Dock, Header } from '@/components';
import { globalState } from '@/store';
import Setup from '@/views/Setup';
import { useRecoilValue } from 'recoil';
import Desktop from '@/views/Desktop';
import Login from '@/views/Login';
import Safari from '@/views/Safari';

function Layouts() {
    const t = useRecoilValue(globalState);

    return (
        <div
            className="layout h-screen rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${t.themeConfig.primaryBg})` }}
        >
            {/* 导航栏 */}
            <Header />
            {!t.token && !t.userInfo ? (
                <Login />
            ) : (
                <>
                    {/* 桌面 */}
                    <Desktop />

                    {/* Dock菜单 */}
                    <Dock />

                    <Setup />
                    <Safari />
                </>
            )}
        </div>
    );
}

export default Layouts;
