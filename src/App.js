import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {
	const [busqueda, setBusqueda] = useState({
		pais: "",
		ciudad: "",
	});

	const [enviarconsulta, setEnviarConsulta] = useState(false);

	const [resultado, setResultado] = useState({});

	const { ciudad, pais } = busqueda;

	const [error, setError] = useState(false);

	//USA LA DEPENDENCIA DE ENVIAR CONSULTA PARA QUE NO SE ESTÉ ENVIANDO UNA PETICION A LA API TODO EL TIEMPO QUE EL VALOR DE UN INPUT CAMBIE
	useEffect(() => {
		const consultarAPI = async () => {
			if (enviarconsulta) {
				const appId = "d0decb0a916a4c45046dfcffe8bc60f2";
				const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
				const respuesta = await fetch(url);
				const resultadoConsulta = await respuesta.json();
				setResultado(resultadoConsulta);
				setEnviarConsulta(false);
				if (resultado.cod === "404") {
					setError(true);
					return;
				} else {
					setError(false);
				}
				//PARA PODER HACER MULTIPLES CONSULTAS SIN NECESIDAD DE RECARGAR LA PAGINA
			}
		};
		consultarAPI();
		// eslint-disable-next-line
	}, [enviarconsulta]);

	let componente;

	if (error) {
		componente = (
			<Error mensaje="No se han encontrado resultados para tu búsqueda" />
		);
	} else {
		componente = <Clima resultado={resultado} setError={setError} />;
	}

	return (
		<Fragment>
			<Header titulo="WeatherPal" />

			<div className="contenedor-form">
				<div className="container">
					<div className="row">
						<div className="col m6 s12">
							<Formulario
								busqueda={busqueda}
								setBusqueda={setBusqueda}
								setEnviarConsulta={setEnviarConsulta}
							/>
						</div>

						<div className="col m6 s12">{componente}</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default App;
