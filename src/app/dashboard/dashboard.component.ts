import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user = ""

  // acnum = ""
  // pswrd = ""
  // amnt = ""

  // var uname=registerForm.value.acnum

  depositForm = this.fb.group({
    acnum: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    pswrd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    amnt: ['', [Validators.required, Validators.pattern('[0-9]+')]]


  })



  // acnum1 = ""
  // pswrd1 = ""
  // amnt1 = ""




  withdrawalForm = this.fb.group({
    acnum1: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    pswrd1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    amnt1: ['', [Validators.required, Validators.pattern('[0-9]+')]]

  })

  sDetails: any //date and time

  ac_no: any

  constructor(private ds: DataService, private router: Router, private fb: FormBuilder) {
    this.user = JSON.parse(localStorage.getItem('currentUser') || '')

    this.sDetails = new Date()
  }

  ngOnInit(): void {
    // if (!localStorage.getItem('currentAcno')) {

    //   alert('please login first')
    //   this.router.navigateByUrl('')

    // }

  }


  deposit() {
    var acnum = this.depositForm.value.acnum
    var pswrd = this.depositForm.value.pswrd
    var amnt = this.depositForm.value.amnt

    if (this.depositForm.valid) {

      this.ds.deposit(acnum, pswrd, amnt).subscribe((result: any) => {
        alert(result.message) // output from server side, its an object there so use . to access the key
      },
        result => {
          alert(result.error.message)
        }
      )
    }

    else {
      alert('invalid')
    }
  }







  withdraw() {
    var acnum = this.withdrawalForm.value.acnum1
    var pswrd = this.withdrawalForm.value.pswrd1
    var amnt = this.withdrawalForm.value.amnt1
    if (this.withdrawalForm.valid) {
      this.ds.withdraw(acnum, pswrd, amnt).subscribe((result: any) => {
        alert(result.message) // output from server side, its an object there so use . to access the key
      },
        result => {
          alert(result.error.message)
        }
      )
    }

    else {
      alert('invalid')
    }
  }

  logout() {

    localStorage.removeItem('currentUser')
    localStorage.removeItem('currentAcno')
    this.router.navigateByUrl('')

  }


  deleteconfirm() {
    this.ac_no = JSON.parse(localStorage.getItem('currentAcno') || '')
  }

  oncancel() {
    this.ac_no = ""
  }

  onDelete(event: any) {
    // alert(event)
    this.ds.deleteAcc(event).subscribe((result: any) => {
      alert(result.message)
      this.router.navigateByUrl('')
    },
    result=>{
      alert(result.error.message)
    })
  }
}
