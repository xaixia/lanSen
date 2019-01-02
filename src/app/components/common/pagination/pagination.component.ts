import { Component, Input } from '@angular/core';
import { AppServerSideDatasource } from '../../../common/app-server-side-datasource';
import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  private _maxSize = 5;

  @Input('gridApi') public set gridApi(value: any) {
    if (!this.paginationApi) {
      this.paginationApi = new PaginationApi();
    }
    this.paginationApi.loadGridApi(value);
  }

  @Input('datasource') public set datasource(value: AppServerSideDatasource) {
    if (!this.paginationApi) {
      this.paginationApi = new PaginationApi();
    }
    this.paginationApi.loadDataSource(value);
  }

  @Input() public paginationApi: PaginationApi;

  @Input() public hideTotal: boolean;

  @Input() set maxSize(val: number) {
    this._maxSize = val;
  }

  get maxSize() {
    return this._maxSize;
  }

  public get totalItems(): number {
    return this.paginationApi.totalItems();
  }

  public get itemsPerPage(): number {
    return this.paginationApi.itemsPerPage();
  }

  public get currentPage(): number {
    return this.paginationApi.currentPage();
  }

  public set currentPage(val: number) {

  }

  public get paginationInfo(): string {
    let pageNumber = this.currentPage;
    if (pageNumber > 0) {
      pageNumber = pageNumber - 1;
    }
    const from = (pageNumber * this.itemsPerPage) + 1;
    pageNumber = this.currentPage;
    let to = pageNumber * this.itemsPerPage;
    if (to > this.totalItems) {
      to = this.totalItems;
    }
    if (this.totalItems > 0) {
      return `(${from}-${to}/${this.totalItems})`;
    } else {
      return null;
    }
  }

  constructor() { }

  pageChanged(event): void {
    this.paginationApi.pageChanged(event);
  }

  changeItemsPerPage(perPageSize) {
    // tslint:disable-next-line:radix
    this.paginationApi.changeItemsPerPage(parseInt(<string> perPageSize.value));
  }

}

export class PaginationApi {
  private gridApi: GridApi;
  private total: number;
  private size: number;
  private page: number;
  private dataSource: AppServerSideDatasource;

  public paginationGoToPage: (event: any) => void;

  constructor() {
    this.total = 0;
    this.size = 10;
    this.page = 1;
  }

  public loadGridApi(gridApi: any) {
    this.gridApi = gridApi;
  }

  public loadDataSource(dataSource: AppServerSideDatasource) {
    this.dataSource = dataSource;
  }

  public loadPaginationInfo(total: number, size: number) {
    this.total = total;
    this.size = size;
  }

  public setPage(page: number) {
    this.page = page;
  }

  public totalItems(): number {
    if (this.gridApi) {
      if (this.dataSource) {
        return this.dataSource.total;
      }
      return this.gridApi.paginationGetRowCount();
    }
    return this.total ? this.total : 0;
  }

  public itemsPerPage(): number {
    if (this.gridApi) {
      return this.gridApi.paginationGetPageSize();
    }
    return this.size ? this.size : 0;
  }

  public currentPage(): number {
    if (this.gridApi) {
      return this.gridApi.paginationGetCurrentPage() + 1;
    }
    return this.page ? this.page : 0;
  }

  public pageChanged(event) {
    if (this.gridApi) {
      this.gridApi.paginationGoToPage(event.page - 1);
    } else if (this.paginationGoToPage) {
      this.paginationGoToPage(event);
    }
  }

  public changeItemsPerPage(pageSize: number) {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(pageSize);
    }
    this.size = pageSize;
  }
}
