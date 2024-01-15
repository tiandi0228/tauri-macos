import { useEffect } from 'react';

function Excel() {
    useEffect(() => {
        //配置项
        var options = {
            showinfobar: false, //是否显示顶部信息栏
            container: 'luckysheet', // 设定DOM容器的id
            title: '', // 设定表格名称
            lang: 'zh', // 设定表格语言
            showsheetbar: true, // 是否显示底部sheet页按钮
            showtoolbar: true, // 是否显示工具栏
            showtoolbarConfig: {
                undoRedo: true, //撤销重做，注意撤消重做是两个按钮，由这一个配置决定显示还是隐藏
                paintFormat: true, //格式刷
                currencyFormat: true, //货币格式
                percentageFormat: true, //百分比格式
                numberDecrease: true, // '减少小数位数'
                numberIncrease: true, // '增加小数位数
                moreFormats: true, // '更多格式'
                font: true, // '字体'
                fontSize: true, // '字号大小'
                bold: true, // '粗体 (Ctrl+B)'
                italic: true, // '斜体 (Ctrl+I)'
                strikethrough: true, // '删除线 (Alt+Shift+5)'
                underline: true, // '下划线 (Alt+Shift+6)'
                textColor: true, // '文本颜色'
                fillColor: true, // '单元格颜色'
                border: true, // '边框'
                mergeCell: true, // '合并单元格'
                horizontalAlignMode: true, // '水平对齐方式'
                verticalAlignMode: true, // '垂直对齐方式'
                textWrapMode: true, // '换行方式'
                textRotateMode: true, // '文本旋转方式'
                image: true, // '插入图片'
                link: true, // '插入链接'
                chart: true, // '图表'（图标隐藏，但是如果配置了chart插件，右击仍然可以新建图表）
                postil: true, //'批注'
                pivotTable: false, //'数据透视表'
                function: true, // '公式'
                frozenMode: true, // '冻结方式'
                sortAndFilter: true, // '排序和筛选'
                conditionalFormat: true, // '条件格式'
                dataVerification: true, // '数据验证'
                splitColumn: true, // '分列'
                screenshot: false, // '截图'
                findAndReplace: true, // '查找替换'
                protection: false, // '工作表保护'
                print: true // '打印'
            }, // 自定义配置工具栏
            enableAddRow: false, // 允许添加行
            enableAddBackTop: false, // 允许回到顶部
            data: [
                {
                    name: 'Sheet1', //工作表名称
                    color: '', //工作表颜色
                    index: 0, //工作表索引
                    status: 1, //激活状态
                    order: 0, //工作表的下标
                    hide: 0, //是否隐藏
                    row: 32, //行数
                    column: 18, //列数
                    defaultRowHeight: 19, //自定义行高
                    defaultColWidth: 73, //自定义列宽
                    celldata: [], //初始化使用的单元格数据
                    config: {
                        merge: {}, //合并单元格
                        rowlen: {}, //表格行高
                        columnlen: {}, //表格列宽
                        rowhidden: {}, //隐藏行
                        colhidden: {}, //隐藏列
                        borderInfo: {}, //边框
                        authority: {} //工作表保护
                    },
                    scrollLeft: 0, //左右滚动条位置
                    scrollTop: 315, //上下滚动条位置
                    luckysheet_select_save: [], //选中的区域
                    calcChain: [], //公式链
                    isPivotTable: false, //是否数据透视表
                    pivotTable: {}, //数据透视表设置
                    filter_select: {}, //筛选范围
                    filter: null, //筛选配置
                    luckysheet_alternateformat_save: [], //交替颜色
                    luckysheet_alternateformat_save_modelCustom: [], //自定义交替颜色
                    luckysheet_conditionformat_save: {}, //条件格式
                    frozen: {}, //冻结行列配置
                    chart: [], //图表配置
                    zoomRatio: 1, // 缩放比例
                    image: [], //图片
                    showGridLines: 1, //是否显示网格线
                    dataVerification: {} //数据验证配置
                }
            ]
        };
        luckysheet.create(options);
    },[]);

    return <div id="luckysheet" className="w-full h-full absolute left-0 right-0"></div>;
}

export default Excel;
