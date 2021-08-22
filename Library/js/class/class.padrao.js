/**
 * Esse script tem dependencia das seguintes bibliotecas:
 *
 * script.padrao.js
 *
 * */

const ChartData = {
    labels: [],
    datasets: [{
        label: '',
        backgroundColor: `rgb(${colorPrymary1Rgb})`,
        borderWidth: 2,
        borderColor: `rgb(${colorPrymary2Rgb})`,
        data: [0]
    }]
}

const AjaxOptions = {
    method: 'GET',
    url: null,
    onloadstart: (xhr, response, obj) => {  Scripts.Elements.Load.Create("Spin"); },
    onloadend: (xhr, response, obj) => { Scripts.Elements.Load.LoadRemove('load'); },
    onload: (xhr, response, obj) => { console.log(xhr); },
    onerror: (xhr, response, obj) => { Scripts.Elements.Load.LoadRemove('load'); console.log(xhr); },
    data: null,
    responseType: 'json',
    setRequestHeader: {
        name: 'Content-Type',
        value: 'application/json'
    }
}