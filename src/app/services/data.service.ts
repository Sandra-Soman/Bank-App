import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Action } from 'rxjs/internal/scheduler/Action';

const options = {
  headers: new HttpHeaders() // overloaded header
}


@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private http: HttpClient) { //dependency injection
    // this.getDetails()

  }


  register(acno: any, username: any, password: any) {

    const data = { acno, username, password } //datas saved to body in a variable called data

    return this.http.post('http://localhost:3000/register', data) // return this.http.post('http://localhost:3000/register',{acno,username,password}) // return is used to get the reponse for the client
    //asychronous method from port 4200 to 3000

    // let userDetails = this.userDetails

    // if (acno in userDetails) {

    //   return false
    // }
    // else {
    //   userDetails[acno] = { acno, username, password, balance: 0, transaction: [] }
    //   console.log(userDetails)

    //   this.saveDetails()
    //   return true
    // }

  }

  login(acno: any, psw: any) {

    const data = { acno, psw } //datas saved to body in a variable called data

    return this.http.post('http://localhost:3000/login', data) // return this.http.post('http://localhost:3000/register',{acno,username,password}) // return is used to get the reponse for the client
    //asychronous method from port 4200 to 3000


    // let userDetails = this.userDetails
    // if (acno in userDetails) {
    //   if (psw == userDetails[acno]['password']) {
    //     this.currentUser = userDetails[acno]['username']
    //     this.currentAcno = acno
    //     this.saveDetails()

    //     return true

    //   }
    //   else {
    //     alert('incorrect password')
    //     return false
    //   }

    //alert('login sucess')
    //redirection
    //this.router.navigateByUrl('dashboard')

    // }
    // else {
    //   alert('user not exist or incorrect password')
    //   return false
    // }
  }


  // creating a function to get token and to call the function in deposit, withdraw and gettransaction
  getToken() {
    // fetch the token from local storage
    const token = JSON.parse(localStorage.getItem('token') || '')

    //  1. append token inside headers

    //  1.2 create header
    let headers = new HttpHeaders()
    //1.3  append token to header
    if (token) {
      options.headers = headers.append('token1', token)
    }
    return options

  }


  deposit(acnum: any, pswrd: any, amnt: any) {

    const data = { acnum, pswrd, amnt } //datas saved to body in a variable called data

    return this.http.post('http://localhost:3000/deposit', data, this.getToken())


    // let userDetails = this.userDetails

    // var amount = parseInt(amnt)
    // if (acnum in userDetails) {
    //   if (pswrd == userDetails[acnum]['password']) {
    //     userDetails[acnum]['balance'] += amount
    //     userDetails[acnum]['transaction'].push({ type: 'CREDIT', amount })
    //     this.saveDetails()


    //     return userDetails[acnum]['balance']


    //   }
    //   else {
    //     alert('incurrect password')
    //   }


    // }
    // else {
    //   alert('user not exist')
    //   return false
    // }
  }



  withdraw(acnum: any, pswrd: any, amnt: any) {

    const data = { acnum, pswrd, amnt } //datas saved to body in a variable called data

    return this.http.post('http://localhost:3000/withdraw', data, this.getToken())





    // let userDetails = this.userDetails

    // var amount = parseInt(amnt)
    // if (acnum in userDetails) {
    //   if (pswrd == userDetails[acnum]['password']) {
    //     if (userDetails[acnum]['balance'] >= amnt) {
    //       userDetails[acnum]['balance'] -= amount
    //       userDetails[acnum]['transaction'].push({ type: 'DEBIT', amount })
    //       this.saveDetails()

    //       return userDetails[acnum]['balance']
    //     }
    //     else {
    //       alert('insufficent balance')
    //       return false
    //     }

    //   }
    //   else {
    //     alert('incurrect password')
    //   }


    // }
    // else {
    //   alert('user not exist')
    //   return false
    // }

  }


  getTransaction(acno: any) {


    const data = { acno } //datas saved to body in a variable called data

    return this.http.post('http://localhost:3000/getTransaction', data, this.getToken())


  }


  deleteAcc(acno: any) {
    return this.http.delete('http://localhost:3000/deleteacc/' + acno)
  }


}




