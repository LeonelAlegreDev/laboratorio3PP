class Vehiculo{
    /**
     *  Constructor de la clase Vehiculo.
     * 
     *  @param {number} id - El ID de la Vehiculo
     *  @param {string} modelo - El modelo de la Vehiculo
     *  @param {number} anoFab - El año de fabricacion del Vehiculo
     *  @param {number} velMax - Velocidad Maxima del Vehiculo

    */
    constructor (id, modelo, anoFab, velMax){
        this.id = this.ValidarId(id);
        this.modelo = this.ValidarCadena(modelo);
        this.anoFab = this.ValidarAnoFabricacion(anoFab);
        this.velMax = this.ValidarNumeroPositivo(velMax);
    }

    /**
     *  @returns Retorna un string con informacion del objeto
     */
    ToString(){
        let string = 'ID: ' + parseInt(this.id, 10) + '\n'
                    + 'Modelo: ' + this.modelo + '\n'
                    + 'Año de Fabricacion: ' + parseInt(this.anoFab, 10) + '\n'
                    + 'Velocidad Maxima: ' + parseInt(this.velMax, 10);

        return string;
    }
    
    // Valida que id sea entero no nulo mayor a 0
    ValidarId(id){
        try{
            if(this.ValidarNumeroPositivo(id)){
                // otras validaciones de id
                return id;
            }
            else{ throw new Error("Error id no valido.");}
        }
        catch{
            throw new Error("Error id no valido.");
        }
    }

    // Valida que la cadena no nula ni vacia
    ValidarCadena(cadena){
        if (typeof cadena === 'string' && cadena.trim() !== '') {
            return cadena;
        } else {
            throw new Error("Erorr cadena no valida.");
        }
    }

    // Valida que un anio sea entero mayor a 1885
    ValidarAnoFabricacion(ano){
        if (this.ValidarNumeroPositivo(ano) && ano > 1885) {
            return ano;
        } else {
            throw new Error("Error año de fabricacion no valido.");
        }
    }

    // Valida que un numero sea entero no nulo mayor a 0
    ValidarNumeroPositivo(numero){
        if (typeof numero === 'number' && numero > 0 && !isNaN(numero)) {
            return numero;
        } else {
            throw new Error("Error entero no valido.");
        }
    }
}
export default Vehiculo; // Exporta la clase Vehiculo
