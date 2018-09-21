import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()

export class ImportService {

     //---------------------------------------------------------------------------------------------
     //---------------------------------------------------------------------------------------------
     constructor() {}
    
    //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------
    // map csv file data
    //map csv file data
    map_csv_data(a_sCommaSeparatedData, a_xColumnName) {

        let xJsonResult = [];
        let iRows = a_sCommaSeparatedData.split("\n");
        let xHeaders = iRows[0].split(",");

        for (var i = 1; i < iRows.length - 1; i++) {

            var sCSVRowData = iRows[i].replace(/"/g, "");
            var xRow = {};
            var xCells = sCSVRowData.split(",");
            for (let i = 0; i < xCells.length; i++) {
                xRow[a_xColumnName[i]] = xCells[i]
            }
            xJsonResult.push(xRow);
        }
        return xJsonResult;
    }
    //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------
}

