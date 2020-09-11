import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service'
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  private storeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    })
  }

  ngOnDestroy() {
    if(this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }
    // this.isLoading = true;

    const email = form.value.email;
    const password = form.value.password;

    // let authObs: Observable<AuthResponseData>

    if (this.isLoginMode) {
      // authObs = this.authService.logIn(email,password);
      this.store.dispatch( new AuthActions.LoginStart({email:email,password:password}));
    } else {
      // authObs = this.authService.signUp(email,password);
      this.store.dispatch( new AuthActions.SignupStart({email:email,password:password}));
    }

    // authObs.subscribe(responseData => {
    //   console.log(responseData);
    //   this.router.navigate(['/recipes']);
    // },
    // errorMessage => {
    //   this.error = errorMessage;
    //   this.isLoading = false;
    // });

    form.reset();
  }

  onErrorOk() {
    this.store.dispatch(new AuthActions.ClearError());
  }

}
