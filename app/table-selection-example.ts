import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata';
import { MatTableDataSource } from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  isSelected?: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  // { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  // { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  // { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  // { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  // { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  // { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  // { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

/**
 * @title Table with selection
 */
@Component({
  selector: 'table-selection-example',
  styleUrls: ['table-selection-example.css'],
  templateUrl: 'table-selection-example.html',
})
export class TableSelectionExample implements OnInit {
  displayedColumns: string[] = [
    'select',
    'position',
    'name',
    'weight',
    'symbol',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  selectedAll = false;
  indeterminate = false;
  ngOnInit(): void {
    const data = this.dataSource.data.map((x) => {
      return {
        ...x,
        isSelected: false,
      };
    });
    this.dataSource.data = data;
  }
  changeDataStay(item: any) {
    if (this.dataSource.data.every((x) => x.isSelected)) {
      this.selectedAll = true;
      this.indeterminate = false;
    } else {
      this.selectedAll = false;
      this.indeterminate = this.dataSource.data.some((x) => x.isSelected);
    }
  }

  onSelectedAll() {
    if (this.selectedAll) {
      this.dataSource.data.map((x) => (x.isSelected = true));
    } else {
      this.dataSource.data.map((x) => (x.isSelected = false));
    }
    const dataDeletes = this.dataSource.data.filter((x) => x.isSelected);
      if (dataDeletes.length < this.dataSource.data.length) {
        this.indeterminate = true;
      } else {
        this.indeterminate = false;
      }
  }

  delete() {
    const dataDeletes = this.dataSource.data.filter((x) => x.isSelected);
    console.log(dataDeletes);
  }
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
