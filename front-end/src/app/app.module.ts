import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TabsModule } from "ngx-bootstrap/tabs";
import { ModalModule } from "ngx-bootstrap/modal";
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import {DragDropModule} from "@angular/cdk/drag-drop";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FamilyPageComponent } from "./family-page/family-page.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { RegistrationComponent } from "./registration/registration.component";
import { RegistrationAddCreateFamilyComponent } from "./registration-add-create-family/registration-add-create-family.component";
import { TaskComponent } from "./task/task.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { LoginPageComponent } from './login-page/login-page.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { TaskInfoChangeComponent } from './task-info-change/task-info-change.component';
import { TaskInfoComponent } from './task-info/task-info.component';
import { TaskChildComponent } from './task-child/task-child.component';
import { TaskCheckComponent } from './task-check/task-check.component';
import { HomeComponent } from './home/home.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { UserStatisticComponent } from './user-statistic/user-statistic.component';
import { FamilyMemberComponent } from './family-member/family-member.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { ShopPrizeIconComponent } from './shop-prize-icon/shop-prize-icon.component';
import { ShopPrizeCategoryComponent } from './shop-prize-category/shop-prize-category.component';
import { ConnectFamilyComponent } from './connect-family/connect-family.component';
import { CreateFamilyComponent } from './create-family/create-family.component';
import { NewRegistrationComponent } from './new-registration/new-registration.component';


@NgModule({
  declarations: [
    AppComponent,
    FamilyPageComponent,
    NavMenuComponent,
    RegistrationComponent,
    RegistrationAddCreateFamilyComponent,
    TaskComponent,
    TaskListComponent,
    LoginPageComponent,
    ShopListComponent,
    TaskAddComponent,
    TaskInfoChangeComponent,
    TaskInfoComponent,
    TaskChildComponent,
    TaskCheckComponent,
    HomeComponent,
    UserStatisticComponent,
    FamilyMemberComponent,
    SettingsPageComponent,
    ShopPrizeIconComponent,
    ShopPrizeCategoryComponent,
    ConnectFamilyComponent,
    CreateFamilyComponent,
    NewRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    DragDropModule,
    AngularSvgIconModule.forRoot()
  ],
  providers: [CookieService],
  bootstrap: [AppComponent, /*TaskComponent, TaskListComponent, RegistrationComponent, ShopListComponent*/]//now using only in routing
})
export class AppModule { }
