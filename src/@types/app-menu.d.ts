export interface AppMenuType {
    // 应用唯一标识
    id: number;
    // 应用名称
    title: string;
    // 应用图标
    icon: string;
    // 是否打开
    isOpen: boolean;
    // 类型
    type?: string;
}

export interface AppType {
    defaultApp: AppMenuType[];
    otherApp: AppMenuType[];
    tempApp: AppMenuType[];
}