import {
  ChangeDetectorRef, Component, EventEmitter, OnChanges, OnInit, SimpleChanges,
  ViewChildren
} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {CustomValidators} from "./custom-validators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChildren('element') element: any;

  elements = ["first", "second", "third"];
  domains = ["dom1", "dom2"];

  form: FormGroup;

  items = ['Pizza', 'Pasta', 'Parmesan'];

  selectElement(index, domainIndex) {

    console.log("Index: " + index + " Domain index: " + domainIndex);
    let elemIndex = index * this.domains.length + domainIndex;
    console.log("selected element index: " + elemIndex);
    console.log(this.element['_results']);
    this.element['_results'][elemIndex].nativeElement.select();
    document.execCommand('copy');
  }

  addElement(elemValue) {
    if (elemValue.trim()) this.elements.push(elemValue);
  }

  closeResult: string;
  closeResult2: string;

  constructor(private modalService: NgbModal,
              private cd: ChangeDetectorRef,
              private fb: FormBuilder) {
  }


  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  regeks = "";

  onKeyPress(event) {
    console.log(event.target);
    // console.log(this.regeks);

    if (event.keyCode == 32) {
      console.log("Space")
    }

    if (event.keyCode >= 48 && event.keyCode <= 57) {
      console.log("input was 0-9");
    }
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      console.log("input was A-Z");
    }
    if (event.keyCode >= 97 && event.keyCode <= 122) {
      console.log("input was a-z");
    }
  }

  navchange: EventEmitter<string> = new EventEmitter();

  setRegeks(event) {
    this.regeks = event;

    let helper = this.regeks.split('');
    this.regeks = '';
    helper.forEach((char, index) => {
      if (char == ' ') {
        console.log(index);
        helper.splice(index, 1);
      } else {
        this.regeks += char;

        this.cd.detectChanges();
      }
    });
    // this.regeks = helper.join("");
    console.log("|" + helper.join("") + "|");
    console.log("|" + this.regeks + "|")
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      mail: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, CustomValidators.numberFormat]]
    });

    this.form.valueChanges.subscribe(forma => {
      console.log("|" + forma.name.replace(/\s+/g, "") + "|");
      this.form.controls.name.setValue(forma.name.replace(/\s+/g, ""), {onlySelf: true});
    });

  }

  checkControlValidity(control) {
    return this.form.controls[control].valid || this.form.controls[control].untouched;
  }

  generiraj() {
    this.form.controls.name.setValue("Branko e kriv");
    console.log(this.form.controls.name.value)
  }

  generiraj2(imeto) {
    this.form.controls.name.setValue("Branko e kriv");
    // imeto.value="Branko e kriv";
    console.log(imeto);
    this.cd.detectChanges();
  }

  clean() {
    this.form.controls.name.setValue(this.form.controls.name.value.replace(/\s+/g, ""));
    this.cd.detectChanges()
  }
}
