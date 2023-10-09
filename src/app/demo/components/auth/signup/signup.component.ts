import {Component, OnInit} from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from "../../../service/auth/auth.service";
import {Router} from "@angular/router";
import { MessageService } from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
    selector: 'app-login',
    templateUrl: './signup.component.html',
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
export class SignupComponent implements OnInit{
    signupForm!: FormGroup;

    sexos: any[] = [
        { name: 'Masculino', key: 'M' },
        { name: 'Feminino', key: 'F' },
    ];

    constructor(public layoutService: LayoutService,
                private service: MessageService,
                private router: Router,
                private authService: AuthService,
                private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
            email: ['', Validators.required, Validators.email],
            password: ['', Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).*$") ],
            sexo: ['', Validators.required]

        });
    }


    signup(){
        const email = this.signupForm.get('email')?.value
        const password = this.signupForm.get('password')?.value
        if (!this.signupForm.valid){
            this.showErrorViaToast("Erro de Validação","Email ou senha vazios");
            return;
        }
        this.authService.authenticate(email, password).subscribe(() =>
        {
            this.router.navigate(["/"])
        },
            (err) => {
            this.showErrorViaToast("Erro ao fazer login","Email ou senha inválidos");
            })
    }

    showErrorViaToast(cabecalho:string, erro: string) {
        this.service.add({ key: 'tst', severity: 'error', summary: cabecalho, detail: erro });
    }


    protected readonly console = console;
}
