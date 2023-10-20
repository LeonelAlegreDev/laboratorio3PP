import Vehiculo from "./Vehiculo.js";

class Terrestre extends Vehiculo{
    constructor (id, modelo, anoFab, velMax, cantPue, cantRue){
        super(id, modelo, anoFab, velMax);

        this.cantPue = this.ValidarCantidadPuertas(cantPue);
        this.cantRue = this.ValidarNumeroPositivo(cantRue);
    }
    ToString(){
        let string = super.ToString() + "\n" 
                    + "Cantidad de Puertas: " + this.cantPue + "\n"
                    + "Cantidad de Ruedas: " + this.cantRue;

        return string;
    }

    ValidarCantidadPuertas(cantPue){
        if (typeof cantPue === 'number' && cantPue >= 0 && !isNaN(cantPue)) {
            return cantPue;
        } else {
            throw new Error("Error entero no valido.");
        }
    }
}
export default Terrestre;