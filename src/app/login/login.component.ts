import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  aim = 'Your perfect Banking-Partner'
  acnt = 'Enter your ac number'

  acno = ''
  psw = ''


  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]]


  })





  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }


  login() {
    var acnum = this.loginForm.value.acno
    var psw = this.loginForm.value.psw

    if (this.loginForm.valid) {
      this.ds.login(acnum, psw).subscribe((result: any) => {

        localStorage.setItem('currentUser',JSON.stringify(result.currentUser))
        localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
        localStorage.setItem('token',JSON.stringify(result.token))

        alert(result.message) // output from server side, its an object there so use . to access the key
        this.router.navigateByUrl('dashboard')
      },
        result => {
          alert(result.error.message)
        }
      )
    }
    else {
      alert('invalid form')
    }

    // let userDetails=this.userDetails
    // if(acnum in userDetails){
    //   if(psw==userDetails[acnum]['password']){
    //     alert('login sucess')
    //     //redirection
    // this.router.navigateByUrl('dashboard')

    //   }
    //   else{
    //     alert('user not exist or incorrect password')
    //   }
  }

  // login(a:any,b:any){
  // console.log(a.value);
  // console.log(b.value);





  //   var acnum=a.value
  //   var psw=b.value
  //   let userDetails=this.userDetails
  //   if(acnum in userDetails){
  //     if(psw==userDetails[acnum]['password']){
  //       alert("login sucess")
  //     }
  //     else{
  //       alert("user not exist or incorrect password")
  //     }
  //   }


  //   alert('login clicked')
  // }

  // acnoChange(event:any){
  //   this.acno=event.target.value
  //   console.log(this.acno)
  // }

  // pswChange(event:any){
  //   this.psw=event.target.value
  //   console.log(this.psw)
  // }
}

