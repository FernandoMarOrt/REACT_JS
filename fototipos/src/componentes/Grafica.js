import React from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip
  } from 'recharts';

function Grafica({datos}) {

    const data = [
        {nombre:"Fototipo 1", Porcentaje:datos[0]},
        {nombre:"Fototipo 2", Porcentaje:datos[1]},
        {nombre:"Fototipo 3", Porcentaje:datos[2]},
        {nombre:"Fototipo 4", Porcentaje:datos[3]},
        {nombre:"Fototipo 5", Porcentaje:datos[4]},
        {nombre:"Fototipo 6", Porcentaje:datos[5]},
    ]


    return (
        <ResponsiveContainer width="100%" aspect={4}>
            <BarChart data={data} width={500} height={300}>
            <CartesianGrid strokeDasharray="4 1 2"/>
            <XAxis dataKey="nombre"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey="Porcentaje" fill='#642C1F'/>
            </BarChart>
        </ResponsiveContainer>
    );
}

export default Grafica;