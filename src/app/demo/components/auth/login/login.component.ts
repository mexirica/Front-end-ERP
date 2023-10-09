import {Component, OnDestroy, OnInit} from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from "../../../service/auth/auth.service";
import {Router} from "@angular/router";
import { MessageService } from "primeng/api";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpStatusCode} from "@angular/common/http";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit, OnDestroy{
    loginForm!: FormGroup;

    subscription!: Subscription;


    constructor(public layoutService: LayoutService,
                private service: MessageService,
                private router: Router,
                private authService: AuthService,
                private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    login(): void{
        const email = this.loginForm.get('email')?.value
        const password = this.loginForm.get('password')?.value
        if (!this.loginForm.valid){
            this.showErrorViaToast("Erro de Validação","Email ou senha vazios");
            return;
        }
        this.subscription = this.authService.authenticate(email, password).subscribe({
            next: (res) => this.router.navigate(['/']),
            error: (err) => {if (err == HttpStatusCode.Unauthorized)
        {
            this.showErrorViaToast("Erro ao fazer login", "Email ou senha inválidos")
        }
            else {
                this.showErrorViaToast("Erro ao fazer login", "Erro interno")
            }
        }
    })
    }

    showErrorViaToast(cabecalho:string, erro: string) {
        this.service.add({ key: 'tst', severity: 'error', summary: cabecalho, detail: erro });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }


}
