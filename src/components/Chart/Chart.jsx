import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { StylesProvider } from '@material-ui/core';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
    const [dailyData, setDailyDAta] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyDAta(await fetchDailyData());
        }
        fetchAPI(); 
    }, []);

        const lineChart = (
            dailyData.length
            ? (
            <Line
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5',
                        fill: true,
                    }],
                }}
            />) : null
        );

        const barChart = (
            confirmed
                ? (
                    <Bar 
                        data={{
                            labels: ['Confirmed', 'Recovered', 'Deaths'],
                            datasets: [{
                                label: 'People',
                                backgroundColor: [ 'rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)',],
                                data: [confirmed.value, recovered.value, deaths.value]
                            }]
                        }}
                        option={{
                            legend: { display: false},
                            title: { display: true, text:`Current state in ${country}`},
                        }}
                    />
                ) : null
        );

    return (
        <div className={StylesProvider.container}>
            {country ? barChart : lineChart }
        </div>
    )
}

export default Chart; 