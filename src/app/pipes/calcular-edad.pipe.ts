import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calcularEdad',
})
export class CalcularEdadPipe implements PipeTransform {
  transform(value: Date, ...args: unknown[]): number {
    const fecha = new Date(value);

    let timeDiff = Math.abs(Date.now() - fecha.getTime());
    let edad = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);

    return edad;
  }
}
