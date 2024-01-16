import { Image, Input } from '@arco-design/web-react';
import avatarIcon from '@/assets/avatar.svg';
import { useSetRecoilState } from 'recoil';
import { globalState } from '@/store';

function Login() {
    const setGlobalState = useSetRecoilState(globalState);

    /**
     * 登录
     *
     * @param {e}
     */
    const onLogin = (e: any): void => {
        const value = e.target.value;
        setGlobalState(old => ({
            ...old,
            token: value,
            userInfo: { username: 'Mac', password: value }
        }));
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="w-56 text-center">
                <Image className="w-20 h-20" src={avatarIcon} alt="" />
                <div className="text-xl text-white pt-2">Mac</div>
                <Input
                    className="w-56 h-10 rounded-lg mt-4 text-white bg-black bg-opacity-55 hover:bg-black hover:bg-opacity-75 focus:bg-black focus:bg-opacity-75 focus:border-black focus:text-white"
                    placeholder="输入密码"
                    onPressEnter={onLogin}
                />
            </div>
        </div>
    );
}

export default Login;
