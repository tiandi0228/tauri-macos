import { atom, RecoilState } from 'recoil';
import { localStorage } from '@/utils';
import { AppType } from '@/@types/app-menu';

const initialState: AppType = {
    defaultApp: [],
    otherApp: [],
    tempApp: []
};

export const AppMenuState: RecoilState<AppType> = atom({
    key: 'appMenu',
    default: initialState,
    effects_UNSTABLE: [
        localStorage('app_menu_state')
    ]
});