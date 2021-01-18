import React, {useState} from 'react';
import Error from './Error'
import PropTypes from 'prop-types';


const Formulario = ({busqueda, setBusqueda, setEnviarConsulta}) => {

    

    const [ error, setError ] = useState(false);

    const {ciudad, pais} = busqueda;

    const agregarBusqueda = (e) => {
        setBusqueda({
            ...busqueda, [e.target.name] : e.target.value
        });
    }

    const enviarFormulario = (e) =>{
        e.preventDefault();

        //validar

        if(ciudad.trim() === '' || pais.trim() === ''){
            setError(true);
            return;
        }

        setError(false);

        setEnviarConsulta(true)
    }

    return ( 
        <form
            onSubmit={enviarFormulario}
        >
            {error ? <Error mensaje="Ambos campos son obligatorios"/> : null}
            <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={agregarBusqueda}
                />

                <label htmlFor="ciudad">Ciudad</label>
            </div>

            <div className="input-field col s12">
                <select
                    name="pais"
                    id="pais"
                    value={pais}
                    onChange={agregarBusqueda}
                >
                    <option value="">-- Seleccione un país --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                    <option value="CA">Canadá</option>
                </select>

                <label htmlFor="pais">País</label>

            </div>

            <div className="input-field col s12">
                <input
                    type="submit"
                    value="Buscar"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                />
            </div>

        </form>

     );
}

Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    setBusqueda:PropTypes.func.isRequired,
    setEnviarConsulta: PropTypes.func.isRequired
}
 
export default Formulario;