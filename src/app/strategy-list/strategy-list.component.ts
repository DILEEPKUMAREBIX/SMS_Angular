import {
  Component, Inject,
  OnInit
} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpgradeComponent } from '../upgrade/upgrade.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { StrategyService } from './strategy-list.service';

@Component({
  selector: 'app-strategy-list',
  templateUrl: './strategy-list.component.html',
  styleUrls: ['./strategy-list.component.scss']
})
export class StrategyListComponent implements OnInit {

  strategyObj: any = {};
  isNew
  manageStrategyHeading;
  animal: string;
  name: string;
  closeResult;
  strategies: any = [];

  constructor(public dialog: MatDialog, private modalService: NgbModal, private translate: TranslateService,
    private strategyService: StrategyService) {
    translate.setDefaultLang('en');

  }

  open(content, type: boolean, organisation?) {
    this.isNew = type;
    this.manageStrategyHeading = this.isNew
      ? "Create SMS Strategy"
      : "Update SMS Strategy";
    if (this.isNew) {
      this.clearOrganisation();
    } else {
      this.updateOrganisationFields(organisation);
    }
    this.modalService
      .open(content, {
        ariaLabelledBy: "modal-basic-title",
        windowClass: "my-class"
      })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  ngOnInit() {
    this.loadStrategies();
  }

  updateOrganisationFields(organisation) {
    this.strategyObj["id"] = organisation.id;
    this.strategyObj["strNameEng"] = organisation.strNameEng;
    this.strategyObj["strNameAr"] = organisation.strNameAr;
    this.strategyObj["recordStatus"] = organisation.recordStatus;
  }

  clearOrganisation() {
    this.strategyObj["id"] = '';
    this.strategyObj["strNameEng"] = "";
    this.strategyObj["strNameAr"] = "";
    this.strategyObj["recordStatus"] = "";
  }

  deletionStr: any;
  openDelete(deleteConfirm, org) {
    this.deletionStr = org;
    this.modalService
      .open(deleteConfirm, {
        ariaLabelledBy: "modal-basic-title"
      })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  onDeleteConfirmation() {
    this.strategyService.deleteStrategy(this.deletionStr.id).subscribe(
      (data: any) => {
        this.loadStrategies();
        this.modalService.dismissAll("on fail");
      },
      error => { }
    );
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadStrategies() {
    this.strategyService.getAllStrategies().subscribe(
      data => {
        this.strategies = data;
        // this.filteredProfiles = this.profiles;
      },
      error => { }
    );
  }

  saveOrUpdate() {
    this.strategyService.createStrategy(this.strategyObj).subscribe(
      (data: any) => {
        console.log(data);
        this.modalService.dismissAll("on success");
        this.loadStrategies();
      },
      (error: any) => {
        console.log(error);
        this.modalService.dismissAll("on fail");
      }
    );
  }

}
