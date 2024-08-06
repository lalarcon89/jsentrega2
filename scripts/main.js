// Objeto Prestamo
function Prestamo(capital, tasaInteresAnual, años) {
    this.capital = capital;
    this.tasaInteresAnual = tasaInteresAnual;
    this.años = años;
    this.tasaInteresMensual = tasaInteresAnual / 12;
    this.numeroPagos = años * 12;
    this.pagoMensual = 0;
    this.detalleAmortizacion = [];
    this.totalInteres = 0;
    this.totalPago = 0;
    
    // Calcular la cuota mensual
    this.calcularCuotaMensual = function() {
        const i = this.tasaInteresMensual;
        const n = this.numeroPagos;
        this.pagoMensual = this.capital * i * Math.pow(1 + i, n) / (Math.pow(1 + i, n) - 1);
    };
    
    // Generar el detalle de amortización
    this.generarDetalleAmortizacion = function() {
        let saldo = this.capital;
        let totalInteres = 0;
        let totalPago = 0;
        
        this.detalleAmortizacion = [];
        
        for (let i = 0; i < this.numeroPagos; i++) {
            const interes = saldo * this.tasaInteresMensual;
            const capital = this.pagoMensual - interes;
            saldo -= capital;
            
            totalInteres += interes;
            totalPago += this.pagoMensual;
            
            this.detalleAmortizacion.push({
                pagoMensual: this.pagoMensual,
                capital: capital,
                interes: interes,
                saldo: saldo
            });
        }
        
        this.totalInteres = totalInteres;
        this.totalPago = totalPago;
    };
}

// Función principal para ejecutar el simulador
function ejecutarSimulador() {
    // Captura de entradas mediante prompt
    const capital = parseFloat(prompt("Ingrese el capital prestado:"));
    const tasaInteresAnual = parseFloat(prompt("Ingrese la tasa de interés anual (%):")) / 100;
    const años = parseInt(prompt("Ingrese la duración del préstamo en años:"));
    
    // Crear un nuevo préstamo
    const prestamo = new Prestamo(capital, tasaInteresAnual, años);
    
    // Calcular la cuota y generar el detalle
    prestamo.calcularCuotaMensual();
    prestamo.generarDetalleAmortizacion();
    
    // Mostrar resultados en la consola
    let salida = `Detalle del Préstamo\n\n`;
    salida += `Cuota Mensual: ${prestamo.pagoMensual.toFixed(2)}\n\n`;
    salida += `Detalles de Amortización:\n`;
    salida += `Cuota | Pago Mensual | Capital | Interés | Saldo\n`;
    
    prestamo.detalleAmortizacion.forEach((pago, indice) => {
        salida += `${indice + 1} | ${pago.pagoMensual.toFixed(2)} | ${pago.capital.toFixed(2)} | ${pago.interes.toFixed(2)} | ${pago.saldo.toFixed(2)}\n`;
    });
    
    salida += `\nTotal Préstamo sin Interés: ${prestamo.capital.toFixed(2)}\n`;
    salida += `Total Interés: ${prestamo.totalInteres.toFixed(2)}\n`;
    salida += `Total Préstamo con Interés: ${prestamo.totalPago.toFixed(2)}\n`;
    
    console.log(salida);

    // Mostrar resultados en el DOM
    document.getElementById('resultados').innerHTML = `
        <h2>Detalle del Préstamo</h2>
        <table>
            <thead>
                <tr>
                    <th>Cuota</th>
                    <th>Pago Mensual</th>
                    <th>Capital</th>
                    <th>Interés</th>
                    <th>Saldo</th>
                </tr>
            </thead>
            <tbody>
                ${prestamo.detalleAmortizacion.map((pago, indice) => `
                    <tr>
                        <td>${indice + 1}</td>
                        <td>${pago.pagoMensual.toFixed(2)}</td>
                        <td>${pago.capital.toFixed(2)}</td>
                        <td>${pago.interes.toFixed(2)}</td>
                        <td>${pago.saldo.toFixed(2)}</td>
                    </tr>
                `).join('')}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4">Total Préstamo sin Interés</td>
                    <td>${prestamo.capital.toFixed(2)}</td>
                </tr>
                <tr>
                    <td colspan="4">Total Interés</td>
                    <td>${prestamo.totalInteres.toFixed(2)}</td>
                </tr>
                <tr>
                    <td colspan="4">Total Préstamo con Interés</td>
                    <td>${prestamo.totalPago.toFixed(2)}</td>
                </tr>
            </tfoot>
        </table>
    `;
}

// Ejecutar el simulador cuando se cargue la página
window.onload = () => {
    ejecutarSimulador();
};
