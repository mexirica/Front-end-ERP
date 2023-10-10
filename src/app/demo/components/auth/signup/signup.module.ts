import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {ToastModule} from "primeng/toast";
import {RadioButtonModule} from "primeng/radiobutton";
import {AutoCompleteModule} from "primeng/autocomplete";
import {InputMaskModule} from "primeng/inputmask";

@NgModule({
    imports: [
        CommonModule,
        SignupRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        ToastModule,
        ReactiveFormsModule,
        RadioButtonModule,
        AutoCompleteModule,
        InputMaskModule
    ],
    declarations: [SignupComponent]
})
export class SignupModule { }
