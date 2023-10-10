import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Municipios} from "../../interfaces/municipios";
import {Estados} from "../../interfaces/estados.interface";

@Injectable({ providedIn: "root"})
export class LocalidadesService {

    constructor(private http: HttpClient) {
    }
    getAllMunicipios(): Observable<string[] | string> {
        return this.http.get("https://servicodados.ibge.gov.br/api/v1/localidades/municipios", { observe: "response" })
            .pipe(
                map((res: HttpResponse<Municipios>) => {
                    console.log(res)
                    if (Array.isArray(res.body)) {
                        // Se a resposta é um array, mapeie para obter os nomes
                        return res.body.map((municipio: Municipios) => municipio.nome);
                    } else {
                        // Caso contrário, apenas retorne o nome
                        return res.body.nome;
                    }
                })
            );
    }

    getAllEstados(){
        return this.http.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados", { observe: "response" })
            .pipe(
                map((res: HttpResponse<Estados>) => {
                    console.log(res)
                    if (Array.isArray(res.body)) {
                        // Se a resposta é um array, mapeie para obter os nomes
                        return res.body.map((estados: Estados) => estados.sigla);
                    } else {
                        // Caso contrário, apenas retorne o nome
                        return res.body.nome;
                    }
                })
            );
    }

    getMunicipioPorEstados(estado: string){
        return this.http.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`, { observe: "response" })
            .pipe(
                map((res: HttpResponse<Municipios>) => {
                    if (Array.isArray(res.body)) {
                        // Se a resposta é um array, mapeie para obter os nomes
                        return res.body.map((municipios: Municipios) => municipios.nome);
                    } else {
                        // Caso contrário, apenas retorne o nome
                        return res.body.nome;
                    }
                })
            );
    }

}
