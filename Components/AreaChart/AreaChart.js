import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import ReactApexChart from "react-apexcharts";

function AreaChart(props) {
    const [chartData, setchartData] = useState([]);
    const [selection, setselection] = useState('one_month');
    const min_price = props.min_price;
    const max_price = props.max_price;
    const max_yaxis = props.max_price + props.max_price / 5;
    const options = {
        chart: {
            id: 'area-datetime',
            type: 'area',
            height: 350,
            zoom: {
                autoScaleYaxis: true
            }
        },
        annotations: {
            yaxis: [
                {
                    y: min_price,
                    borderColor: '#000000',
                    borderWidth: 2,
                    borderRadius: 12,
                    label: {
                        borderColor: '#00E396',
                        borderWidth: 1,
                        borderRadius: 1,
                        position: 'right',
                        style: {
                            color: '#fff',
                            background: '#00E396'
                        },
                        text: 'Lowest Price - ' + new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(min_price),
                        offsetX: -20,
                        offsetY: 20
                    }
                },
                {
                    y: max_price,
                    borderColor: '#775DD0',
                    label: {
                        borderColor: '#775DD0',
                        position: 'left',
                        style: {
                            color: '#fff',
                            background: '#775DD0'
                        },
                        text: 'Highest Price - ' + new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(max_price),
                        offsetX: 100,
                        offsetY: -20
                    }
                }
            ],
            xaxis: [{
                //x: new Date('16 May 2021').getTime(),
                borderColor: '#999',
                yAxisIndex: 0,
                label: {
                    show: true,
                    text: 'Lowest',
                    style: {
                        color: "#fff",
                        background: '#775DD0'
                    }
                }
            }]
        },
        yaxis: {
            min: 0,
            max: max_yaxis,
            decimalsInFloat: 0,
            labels: {
                show: true,
                align: 'right',
                minWidth: 0,
                forceNiceScale: true,
                maxWidth: 160,
                style: {
                    colors: [],
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    cssClass: 'apexcharts-yaxis-label',
                },
                offsetX: 0,
                offsetY: 0,
                rotate: 0,
                formatter: (value) => {
                    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);;
                },

            },
        },
        markers: {
            size: 0,
            style: 'hollow',
        },
        xaxis: {
            labels: {
                format: 'dd/MMM',
            },
            type: 'datetime',
        },
        dataLabels: {
            enabled: false,
        },

    };
    const asin = props.data
    useEffect(() => {
        if (asin.length === 10) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(asin)
            }
            fetch('https://thepricehistory.com/api/chart', requestOptions)
                .then(res => res.json())
                .then((data) => {
                    setchartData(data);
                })
        }
    }, [asin]);

    function updateData(timeline) {
        setselection(timeline)

        switch (timeline) {
            case 'one_month':
                ApexCharts.exec(
                    'area-datetime',
                    'zoomX',
                    new Date().getTime(),
                    new Date().setMonth(new Date().getMonth() - 1)
                )
                break
            case 'three_month':
                ApexCharts.exec(
                    'area-datetime',
                    'zoomX',
                    new Date().getTime(),
                    new Date().setMonth(new Date().getMonth() - 3)
                )
                break
            case 'six_months':
                ApexCharts.exec(
                    'area-datetime',
                    'zoomX',
                    new Date().getTime(),
                    new Date().setMonth(new Date().getMonth() - 6)
                )
                break
            case 'one_year':
                ApexCharts.exec(
                    'area-datetime',
                    'zoomX',
                    new Date().getTime(),
                    new Date().setMonth(new Date().getMonth() - 12)
                )
                break
            default:
                ApexCharts.exec(
                    'area-datetime',
                    'zoomX',
                    new Date().getTime(),
                    new Date().setMonth(new Date().getMonth() - 1)
                )
                break
        }
    }



    return (
        <div id="chart">
            <div className="toolbar">
                &nbsp;
                {/* <button id="one_month"
                    onClick={() => updateData('one_month')} className={(selection === 'one_month' ? 'active' : '')}>
                    1M
    </button>
    &nbsp;
    <button id="three_months"
                    onClick={() => updateData('three_months')} className={(selection === 'three_months' ? 'active' : '')}>
                    3M
    </button>&nbsp;
    <button id="six_months"
                    onClick={() => updateData('six_months')} className={(selection === 'six_months' ? 'active' : '')}>
                    6M
    </button>
    &nbsp;
    <button id="one_year"
                    onClick={() => updateData('one_year')} className={(selection === 'one_year' ? 'active' : '')}>
                    1Y
    </button>
    &nbsp; */}
            </div>

            <div id="chart-timeline">
                <ReactApexChart options={options} series={chartData} type="area" height={400} />
            </div>
        </div>



    );

}

export default AreaChart;
