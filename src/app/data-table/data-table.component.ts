import { Component, OnInit, ViewChild } from '@angular/core';
import { ChefDataService } from '@shared/services/chef-data.service';
import { NodeInterface, KvInterface } from '@shared/interfaces/chef-data.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from '@environments/environment';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  hasData = false;
  nodes: NodeInterface[];
  dataLength = 0;
  filterValues: KvInterface[] = [];
  selectForm: FormGroup;
  filterValue = '';
  filterTypes = [
    {label: 'Name', filterText: 'name'},
    {label: 'Platform Name', filterText: 'platform_name'},
    {label: 'Platform Relese', filterText: 'platform_release'},
    {label: 'Last Scan Status', filterText: 'last_scan_status' },
    {label: 'Last Client Run Status', filterText: 'last_client_run_status'}];

  displayedColumns: string[] = ['name', 'platformName', 'platformRelease', 'lastScan', 'lastClientRun'];
  dataSource: MatTableDataSource<NodeInterface>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private chefDataService: ChefDataService) { }

  ngOnInit(): void {
    this.selectForm = new FormGroup({
      filterSelect: new FormControl('Name'),
      filterText: new FormControl('')
    });
    this.selectForm.get('filterSelect').valueChanges.subscribe(val => {
      this.selectForm.patchValue({
        filterText: ''
      });
    });
    this.getTableData();
  }

  onSearch() {
    // Add another search criteria
    this.filterValues.push({
      Key: this.selectForm.value.filterSelect,
      Value: this.selectForm.value.filterText
    });
    this.selectForm.patchValue({
      filterText: ''
    });
    this.getTableData();
  }

  onClear() {
    this.selectForm.patchValue({
      filterSelect: '',
      filterText: ''
    });
    this.filterValues = [];
    this.getTableData();
  }

  getTableData() {

/*     const data = this.chefDataService.getTestData(this.filterValues);
    if (data && data.Nodes.length) {
      this.dataSource = new MatTableDataSource<NodeInterface>(data.Nodes);
      this.dataSource.paginator = this.paginator;
      this.dataLength = data.Total;
      this.hasData = true;
    } else {
      this.hasData = false;
    } */
    this.chefDataService.getData(this.filterValues)
      .subscribe(data => {
        if (data && data.Nodes.length) {
          this.dataSource = new MatTableDataSource<NodeInterface>(data.Nodes);
          this.dataSource.paginator = this.paginator;
          this.dataLength = data.Total;
          this.hasData = true;
        } else {
          this.hasData = false;
        }
      }, error => {
        if (!environment.production) {
          console.log('Error getting Node Data');
        }
      });
  }

}
