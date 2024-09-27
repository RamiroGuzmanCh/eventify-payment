import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Payment} from "../model/payment.model";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private apiUrl = 'http://localhost:3000/payments';  // URL del json-server

    constructor(private http: HttpClient) {}

    // Crear un nuevo pago
    processPayment(payment: Payment): Observable<Payment> {
        return this.http.post<Payment>(this.apiUrl, payment);
    }

    // Obtener todos los pagos (opcional, por si quieres ver el historial)
    getPayments(): Observable<Payment[]> {
        return this.http.get<Payment[]>(this.apiUrl);
    }
}