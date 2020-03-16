// Imports
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ChefDataService } from '@shared/services/chef-data.service';
import { NodeInterface, KvInterface } from '@shared/interfaces/chef-data.interface';
import { environment } from '@environments/environment';

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

  // For the filterType select
  filterTypes = [
    {label: 'Name', filterText: 'name'},
    {label: 'Platform Name', filterText: 'platform_name'},
    {label: 'Platform Release', filterText: 'platform_release'},
    {label: 'Last Scan Status', filterText: 'last_scan_status' },
    {label: 'Last Client Run Status', filterText: 'last_client_run_status'}];

  // The currently available filterTypes
  currentFilterTypes = [];

  // For Mat-Table
  displayedColumns: string[] = ['name', 'platformName', 'platformRelease', 'lastScan', 'lastClientRun'];
  dataSource: MatTableDataSource<NodeInterface>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private chefDataService: ChefDataService) { }

  // Create the formgroup and initialize it
  ngOnInit(): void {
    this.selectForm = new FormGroup({
      filterSelect: new FormControl('Name'),
      filterText: new FormControl('')
    });

    this.onClear();
  }

  onSearch() {
    // Add to the filterValues array and remove from the available selectTypes
    this.filterValues.push({
      Key: this.selectForm.value.filterSelect,
      Value: this.selectForm.value.filterText.toLowerCase()
    });

    const idx = this.currentFilterTypes.findIndex(x => x.filterText === this.selectForm.value.filterSelect);
    this.currentFilterTypes.splice(idx, 1);
    this.selectForm.patchValue({
      filterText: ''
    });

    this.getTableData();
  }

  // Click handler for when user resets form
  onClear() {
    this.selectForm.patchValue({
      filterSelect: '',
      filterText: ''
    });
    this.currentFilterTypes = this.filterTypes.map(x => x);
    this.filterValues = [];
    this.getTableData();
  }

  // Given the current filterValues, get the data from the API
  getTableData() {
    this.chefDataService.getData(this.filterValues)
      .subscribe(data => {
        if (data && data.Nodes.length) {
          // If there is data, display it in the table
          this.dataSource = new MatTableDataSource<NodeInterface>(data.Nodes);
          this.dataSource.paginator = this.paginator;
          this.dataLength = data.Total;
          this.hasData = true;
        } else {
          // Display no data message if there isn't any
          this.hasData = false;
        }
      }, error => {
        if (!environment.production) {
          console.log('Error getting Node Data');
        }
      });
  }

}
