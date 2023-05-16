import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { VideoscreenComponent } from './videoscreen/videoscreen.component';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, SignupComponent, VideoscreenComponent],
  imports: [
    BrowserModule,HttpClientModule,AppRoutingModule,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
