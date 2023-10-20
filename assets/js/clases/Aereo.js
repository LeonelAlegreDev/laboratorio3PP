import Vehiculo from "./Vehiculo.js";

class Aereo extends Vehiculo{
    constructor (id, modelo, anoFab, velMax, altMax, autonomia){
        super(id, modelo, anoFab, velMax);

        this.altMax = this.ValidarNumeroPositivo(altMax);
        this.autonomia = this.ValidarNumeroPositivo(autonomia);
    }
    ToString(){
        let string = super.ToString() + "\n" 
                    + "Altura Maxima: " + this.altMax + "\n"
                    + "Autonomia: " + this.autonomia;

        return string;
    }
}
export default Aereo;