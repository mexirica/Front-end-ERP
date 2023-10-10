import {Component, OnInit} from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from "../../../service/auth/auth.service";
import {Router} from "@angular/router";
import { MessageService } from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocalidadesService} from "../../../service/localidades/Localidades.service";
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

    estados: string[] | string | undefined

    cidades: string[] | string | undefined

    estadosFiltrados: any[] = []

    cidadesFiltradas: any[] = []

    constructor(public layoutService: LayoutService,
                private service: MessageService,
                private router: Router,
                private authService: AuthService,
                private formBuilder: FormBuilder,
                private localidadeService: LocalidadesService) { }

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
            email: ['', Validators.required, Validators.email],
            nome: ["", Validators.required],
            password: ['', Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).*$") ],
            sexo: ['', Validators.required],
            endereco: ["", Validators.required],
            bairro: ["", Validators.required],
            cidade: [{value: "", disabled: true},Validators.required],
            estado: ["", Validators.required]

        });

        this.localidadeService.getAllEstados().subscribe({
            next: (estados) => {
                this.estados = estados;
            },
            error: (err) => this.showErrorViaToast("Erro no formulário", "Não foi possível carregar os Estados")
        });



        this.signupForm.get('estado').valueChanges.subscribe(novoValor => {
            this.localidadeService.getMunicipioPorEstados(this.signupForm.get("estado")?.value).subscribe({
                next: (res) => {
                    this.cidades = res
                },
                error: (err) => this.showErrorViaToast("Erro no formulário", "Não foi possível carregar os Estados")
            })
            this.signupForm.get('cidade').enable()
        })
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

    filterEstado(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.estados.length; i++) {
            const estado = this.estados[i];
            if (estado.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(estado);
            }
        }

        this.estadosFiltrados = filtered;
    }

    filterCidade(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.cidades.length; i++) {
            const cidade = this.cidades[i];
            if (cidade.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(cidade);
            }
        }

        this.cidadesFiltradas = filtered;
    }

}
