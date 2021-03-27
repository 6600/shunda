import { MyLoading } from '../../providers/my-loading.service';

/**
 * 列表逻辑封装
 */
export abstract class BaseListPage {

    // 列表数组
    public list = [];
    // 当前页码
    protected pageNo = 1;
    // 是否加载更多
    public hasMore = true;
    public nodata_t1='暂无更多数据'
    protected init1=false

    protected constructor(
        protected myLoading: MyLoading
    ) { }

    /**
     * 拉取新数据（首次）
     */
    protected pullNewList(showLoading = true): Promise<any> {
        this.pageNo = 1;
        this.hasMore = true;

        if (showLoading) this.myLoading.show();

        return this.pullList().then(() => {
            if (showLoading) this.myLoading.hide();

        }, (error) => {
            if (showLoading) this.myLoading.hide();
        });
    }

    /**
     * 拉取数据（过程）
     */
    public pullList(): Promise<any> {
        return this.pullListImpl().then((data) => {
            if (this.pageNo == 1) this.list = data.data.list;
            else this.list = this.list.concat(data.data.list);

            if (data.data.list.length == 0) this.hasMore = false;
            else this.pageNo++;

        });
    }

    /**
     * 拉取数据的具体实现，由子类提供接口地址
     */
    protected abstract pullListImpl(): Promise<any>;

    /**
     * 下拉刷新
     * @param refresher 加载动画
     */
    public onRefresh(refresher) {
        this.pageNo = 1;
        this.hasMore = true;

        this.onInfinite(refresher);
    }

    /**
     * 上拉加载
     * @param refresher 加载动画
     */
    public onInfinite(refresher) {
        console.log('onInfinite')
        this.pullList().then(() => {
            refresher.target.complete();

        }, (error) => {
            refresher.target.complete();
        });
    }

    /**
     * 数据跟踪，提高重载时的性能
     * @param index 索引
     * @param item 数据项
     */
    public trackBy(index: number, item: any) {
        return item.id;
    }

}