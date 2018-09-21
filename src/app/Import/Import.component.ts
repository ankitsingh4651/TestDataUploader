import { Component,ViewChild } from '@angular/core';
import { RequestOptions, Headers, } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl,Validators,FormBuilder } from '@angular/forms';
import { SweetAlertService } from 'angular-sweetalert-service';
import { ImportService } from '../service/Import.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import * as XLSX from 'xlsx';
import { read, write, utils } from 'xlsx';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';

@Component({
    selector: 'import',
    templateUrl: './Import.component.html',
    styleUrls: ['./Import.component.css']
})

export class ImportComponent {

      static xFileList: FileList;
      xDataList: any[];
      xImportForm: FormGroup;
      xImportFile:FileList;
      xShowSpinner:any = false;
      xShowTable:any = false;
      xData:any;
      xEvent:any;
      source: LocalDataSource;
      xUserForm: FormGroup;
      xRecordCount: any;
      xStartPage: any;
      xEndPage: any;
      xRecord: any;
      xFilteredRecord: any;
      xNonFilteredRecord: any ;
     @ViewChild('createModal') xCreateModal;
     //---------------------------------------------------------------------------------------------
     //---------------------------------------------------------------------------------------------
     constructor(private m_xAlertService: SweetAlertService, private xImportService: ImportService) {
         this.initializeForms();
         this.xDataList = [];
         this.ValidateFile();
         const { read, utils: { sheet_to_json } } = XLSX;
     }
    //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------
    //  File related validation 
    private ValidateFile() {
    let pattern = {
        import: '.*\.\(xlsx\|csv\)',
    }

    this.xImportForm = new FormGroup({
        Import: new FormControl("", [Validators.required, Validators.pattern(pattern.import)])
    });
   }
    //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------
    onFileChange(event) {
        this.xShowTable = false;
        this.xEvent = event;
        this.xImportFile = event.target.files;
    }
    //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------
    uploadFile() {

        let xFileName = this.xImportFile[0].name;
        let xFileExtension = xFileName.substr(xFileName.lastIndexOf('.')+1);
        if(xFileExtension == 'csv'){
            this.xShowSpinner = true;
            
            ImportComponent.xFileList = this.xImportFile;
            if (this.xImportForm.valid) {
                let xFileReader = new FileReader();
                xFileReader.readAsText(ImportComponent.xFileList[0], "UTF-8");
                xFileReader.onload = () => {
                    let xColumnName = ["Gender", "Title", "Occupation", "Company", "GivenName","MiddleInitial","Surname","BloodType","EmailAddress"];
                    //convert comma saperated text to Json Array 
                   
                    this.xDataList = this.xImportService.map_csv_data(xFileReader.result, xColumnName);
                    this.source = new LocalDataSource(this.xDataList);
                    this.xShowSpinner = false;
                    this.xShowTable = true;
                };
            }
            else {
                this.xDataList = [];
                this.xShowSpinner = false;
                this.xShowTable = true;
            }
        }
    }
    //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------
    DownloadFile(){
        if(this.xDataList.length > 0){
            var xData = []
            for(let i=0;i<=this.xDataList.length-1;i++){
                xData.push({
                    'Gender':this.xDataList[i].Gender,
                    'Title':this.xDataList[i].Title,
                    'Occupation':this.xDataList[i].Occupation,
                    'Company':this.xDataList[i].Company,
                    'GivenName':this.xDataList[i].GivenName,
                    'MiddleInitial':this.xDataList[i].MiddleInitial,
                    'Surname':this.xDataList[i].Surname,
                    'BloodType':this.xDataList[i].BloodType,
                    'EmailAddress':this.xDataList[i].EmailAddress,
                })
            }
            var options = { 
                fieldSeparator: ',',
                headers: ["Gender", "Title", "Occupation", "Company", "GivenName","MiddleInitial","Surname","BloodType","EmailAddress"]
              };
            new Angular5Csv(xData, 'My Report', options);
        }
   }
   //---------------------------------------------------------------------------------------------
   //---------------------------------------------------------------------------------------------
   // Smart  table settings
   settings = {
    noDataMessage: "No data found",
    mode: 'external',
    hideSubHeader: false,
    actions: { add: false, edit: false, delete: true },
    columns: {
        Gender: { title: 'Gender', filter: true, sort: true },
        Title: { title: 'Title', filter: true, sort: true },
        Occupation: { title: 'Occupation', filter: true, sort: true },
        Company: { title: 'Company', filter: true, sort: true },
        GivenName: { title: 'GivenName', filter: true, sort: true },
        MiddleInitial: { title: 'MiddleInitial', filter: true, sort: true },
        Surname: { title: 'Surname', filter: true, sort: true },
        BloodType: { title: 'BloodType', filter: true, sort: true },
        EmailAddress: { title: 'EmailAddress', filter: true, sort: true },
    },
    pager: {
        display: true,
        perPage: 50,
        perPageSelect: [50, 100, 200],
    },
    isPagerDisplay: true,
    perPageSelect: true,
  };
  //---------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------
   // method will initialize form and  controls default values
   private initializeForms() {
    let pattern = {
        givenName: '^[a-zA-Z]{1,15}$',
        surName: '^[a-zA-Z]{1,15}$',
        emailAddress: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$',
    }

    // create form
    this.xUserForm = new FormGroup({
        title: new FormControl("MR.", Validators.required),
        givenName: new FormControl("", [Validators.required, Validators.pattern(pattern.givenName)]),
        surName: new FormControl("", [Validators.required, Validators.pattern(pattern.surName)]),
        emailAddress: new FormControl("", [Validators.required, Validators.pattern(pattern.emailAddress)]),
        middleInitial:new FormControl(""),
        occupation:new FormControl(""),
        company:new FormControl(""),
        bloodType:new FormControl(""),
        gender:new FormControl("Male"),
    });
  }
  //---------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------
  //  method will call when user click on create button
  createUser() {
    if (this.xUserForm.valid) {
      this.xDataList.push({
            "Gender": this.xUserForm.value.gender,
            "Title": this.xUserForm.value.title,
            "Occupation": this.xUserForm.value.occupation,
            "Company": this.xUserForm.value.company,
            "GivenName": this.xUserForm.value.givenName,
            "Surname": this.xUserForm.value.surName,
            "BloodType": this.xUserForm.value.bloodType,
            "EmailAddress": this.xUserForm.value.emailAddress,
            "MiddleInitial": this.xUserForm.value.middleInitial,
      })
      
      this.source = new LocalDataSource(this.xDataList);
      this.xCreateModal.close();
    }
    else{
        this.validateAllFormFields(this.xUserForm);
    }
  }
  //---------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------
  //-- on delete record 
  onDeleteRow(event){
      
      let email = event.data.EmailAddress;
      let index = this.xDataList.indexOf(event.data);
      this.xDataList.splice(index,1);
      this.source = new LocalDataSource(this.xDataList);
   }
   //---------------------------------------------------------------------------------------------
   //---------------------------------------------------------------------------------------------
   //  validates all the input fields
   validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
            this.validateAllFormFields(control);
        }
    });
  }
  //---------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------
  //-- on open modal
  onOpenModal(){
    this.xCreateModal.open();
    this.initializeForms();
  }
  //---------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------
  //-- on close modal
  onCloseModal(){
    this.xCreateModal.close();
    this.initializeForms();
  }
  //---------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------
  //-- on select a row
  onRowSelect(event) {
    // set Starting Record number
    let xPagingEndPage = event.source.pagingConf.page * event.source.pagingConf.perPage;
    this.xStartPage = ((event.source.pagingConf.page * event.source.pagingConf.perPage) - (event.source.pagingConf.perPage - 1));
    this.xNonFilteredRecord = this.xDataList.length;
    // compare filtered and nonfiltered record for setting total record
    this.xRecordCount = this.xFilteredRecord <= this.xNonFilteredRecord ? this.xFilteredRecord : this.xNonFilteredRecord;
    // compare maximum value of a page with total record count
    this.xEndPage = xPagingEndPage <= this.xRecordCount ? xPagingEndPage : this.xRecordCount;
}
  //---------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------
}