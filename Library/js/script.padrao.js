/**
 * Esse script tem dependencia das seguintes bibliotecas:
 * 
 * class.padrao.js
 * style.padrao.js
 * 
 * Terceiros:
 * 
 *  Bootstrap 5.1 ou superior. 
 *  ChartJS;.
 * 
 * */

const url = new URL(document.URL);
const urlHost = `${url.protocol}//${url.host}`;
const urlAPI = `${urlHost}/api/`;
//const urlAPI = `https://localhost:44382/`;

//Cores primarias
const colorPrymary1Hex = "#02DDE8";
const colorPrymary2Hex = "#0297F2";
const colorPrymary3Hex = "#0944DB";
const colorPrymary4Hex = "#0F02F2";
const colorPrymary5Hex = "#5D00EB";

//Cores primarias
const colorPrymary1Rgb = "2, 221, 232";
const colorPrymary2Rgb = "2, 151, 242";
const colorPrymary3Rgb = "9, 68, 219";
const colorPrymary4Rgb = "15, 2, 242";
const colorPrymary5Rgb = "93, 0, 235";

document.addEventListener('DOMContentLoaded', () => {
    debugger;
    var URLHOST = new URL(window.location.href);

    var ext = URLHOST.host.indexOf('apply.client') > -1;

    if (ext != null && ext != undefined) {
        if (ext != true) {
            return;
        }        
    }

    var cod = recuperaUserCodCookie();

    if (cod == '' || cod == null || cod == undefined) {
        if (window.location.href == `${urlHost}/Security/Login/`) {
            return;
        }

        logOut();
    }
})

const Grafico = {
    /**
     * Realiza a configuração do gráfico (não faz a renderização, apenas configura, utilize o Grafico.NewChart para renderizar um grafico, passando essa função como parâmetro)
     * @param {string} typeChar Tipo do grafico a ser renderizado 
     * @param {object} pdata Um objeto do tipo ChartData contendo dos dados a ser exibidos
     * @param {object} plabels Um objeto contendo as labels do grafico 
     * @returns void
     */
    ConfigChart: (typeChar, pChartData, plabels) => {
        try {

            var labels = plabels != undefined && plabels != null ? plabels : [
                'Empty'
            ];

            var data = pChartData != undefined && pChartData != null ? pChartData : {
                labels: labels,
                datasets: [{
                    label: 'Dataset',
                    backgroundColor: `rgb(${colorPrymary1Rgb})`,
                    borderWidth: 2,
                    borderColor: `rgb(${colorPrymary2Rgb})`,
                    data: [0]
                }]
            };

            var config = {
                type: typeChar != undefined && typeChar != null ? (typeChar).toString() : 'line',
                data,
                options: {
                    title: {
                        display: true,
                        fontSize: 20,
                        text: "Relatorio"
                    }
                }
            };

            return config;

        } catch (erro) {
            alert(erro);
        }
    },
    /**
     * Essa função faz a renderização de um grafico utilizando a tag canvas
     * @param {*} configChart Um objeto configuravel retornado pela função Grafico.ConfigChart
     * @param {} canvasId Id do canvas onde o grafico sera renderizado
     * @returns void
     */
    NewChart: (configChart, canvasId) => {
        try {
            if (configChart == undefined || configChart == null &&
                canvasId == undefined || canvasId == null) {
                return false;
            }

            var chart = new Chart(document.getElementById(canvasId.toString()),
                configChart);
        } catch (error) {
            alert(error);
        }
    }
}
/**
 * Função responsável pelas requisições para a API.
 * @param {AjaxOptions} pOptions Objeto contendo a configuração da requisição.
 * @param {any} asyncRequest Um booleano indicando se a requisição é assincrona, o valor padrão é true
 */
const Ajax = (pOptions, asyncRequest = true) => {
    try {
        if (pOptions == undefined || pOptions == null) {
            return false;
        }

        if (typeof (asyncRequest) != "boolean") {
            return false;
        }

        var http = new XMLHttpRequest();

        var options = AjaxOptions;

        options.onload = pOptions.onload != undefined && pOptions.onload != null ? pOptions.onload : AjaxOptions.onload;
        options.onerror = pOptions.onerror != undefined && pOptions.onerror != null ? pOptions.onerror : AjaxOptions.onerror;
        options.responseType = pOptions.responseType != undefined && pOptions.responseType != null ? pOptions.responseType : AjaxOptions.responseType;

        options.method = pOptions.method;
        options.url = pOptions.url;

        if (pOptions.setRequestHeader != undefined && pOptions.setRequestHeader != null) {
            options.setRequestHeader.name = pOptions.setRequestHeader.name != undefined && pOptions.setRequestHeader.name != null ? pOptions.setRequestHeader.name : AjaxOptions.setRequestHeader.name;
            options.setRequestHeader.value = pOptions.setRequestHeader.value != undefined && pOptions.setRequestHeader.value != null ? pOptions.setRequestHeader.value : AjaxOptions.setRequestHeader.value;
        }

        http.open(options.method, options.url, asyncRequest);

        http.responseType = options.responseType;

        http.setRequestHeader(options.setRequestHeader.name, options.setRequestHeader.value);
        http.onload = options.onload;
        http.onerror = options.onerror;

        http.onloadstart = pOptions.onloadstart != undefined && pOptions.onloadstart != null ? pOptions.onloadstart : AjaxOptions.onloadstart;
        http.onloadend = pOptions.onloadend != undefined && pOptions.onloadend != null ? pOptions.onloadend : AjaxOptions.onloadend;

        if (pOptions.data != null && pOptions.data != undefined) {
            var data = options.setRequestHeader.value == 'application/json' ? JSON.stringify(options.data) : encodeURI(options.data);

            http.send(data);
        } else {
            http.send();
        }

    } catch (error) {
        alert(error);
    }
}

const API = {
    /**
     *Requisições do tipo GET 
     * @param {Opções para a definição da requisição} options 
     */
    GET: (options) => {
        try {
            if (options == undefined || options == null) {
                return false;
            }
            Ajax(options);

        } catch (error) {
            alert(error);
        }
    },
    /**
     * 
     * @param {Opções para a definição da requisição} options 
     */
    POST: (options) => {
        try {

            Ajax(options);

        } catch (error) {
            alert(error);
        }

    }
}

const Elements = {
    /**
     * Retorna um elemento configurado por parametro.
     * @param {any} type Tipo do elemento: div, button, input, label, canvas, p, h1, etc.
     * @param {any} id
     * @param {any} name
     * @param {any} classe
     * @param {any} style
     * @param {any} onchange
     */
    Create: (type = null, id = '', name = '', classe = null, style = null, classList = null, onchange = null) => {
        try {
            if (type == null && type == undefined) {
                return null;
            }

            var element = document.createElement(type);

            if (onchange != null, onchange != undefined) {
                element.addEventListener('change', onchange);
            }

            if (style != null && style != undefined) {
                element.style = style;
            }

            element.id = id;

            if (classList != null && Array.isArray(classList)) {
                for (i = 0; i < classList.length; i++) {
                    element.classList.add(classList[i]);
                }
            } else if (classe != null) {
                element.classList.add(classe);
            }

            element.name = name;

            return element;
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Renderiza um elemento de load na tela
     * @param {any} type Tipo do load que sera renderizado, o tipo padrão é "Spin" (Spin, Growing)
     * @param {any} idElement Id do elemento onde o load sera renderizado
     * @param {any} style Tipo de cor ()
     */
    Load: {
        Create: (type, idElement, strStyle, strSpinnerColor) => {
            try {

                var span;
                var div;
                var spinnerColor = strSpinnerColor == null || strSpinnerColor == undefined ? "var(--colorPrymary5)" : strSpinnerColor;
                var style = strStyle == null || strStyle == undefined ? `z-index: 999 !important; position: fixed !important; left: 50%;`
                    + `top: 50% !important; bottom: 0 !important; color: ${spinnerColor} !important;` : strStyle;

                switch (type) {
                    case "Spin":
                        div = Elements.Create('div', 'load', null, null, style, ["spinner-border", "text-primary"]);
                        span = Elements.Create('span', 'loadSpan', "visually-hidden", null);

                        div.appendChild(span);

                        break;

                    case "Growing":
                        div = Elements.Create('div', 'loadMestre', null, null, style);

                        var divSpinner = Elements.Create('div', 'divGrowing', null, null, `z-index: 150 !important; color: ${spinnerColor} !important;`, ["spinner-grow", "text-primary"]);
                        span = Elements.Create('span', 'loadGrowing', "visually-hidden", null);

                        divSpinner.appendChild(span);
                        div.appendChild(divSpinner);

                        break;

                    default:
                        div = Elements.Create('div', 'load', null, null, style, ["spinner-border", "text-primary"]);
                        span = Elements.Create('span', 'loadSpan', null, "visually-hidden");

                        div.appendChild(span);

                        break;
                }

                if (idElement == null || idElement == undefined) {
                    document.body.appendChild(div);

                } else {
                    document.getElementById(idElement).appendChild(div);
                }

            } catch (error) {
                console.log(error);
            }
        },
        LoadRemove: (load) => {

            try {
                if (load == null || load == undefined) {
                    alert("O Load não pode ser nulo");
                    return
                }

                var ld = document.getElementById(load);
                
                if (ld != null && ld != undefined) {
                    ld.remove();
                }
                
            } catch (error) {
                console.log(error);
            }
        }
    },
    Message: {
        Remove: () => {
            document.querySelectorAll('.messageError').forEach((obj, index) => { obj.remove(); });
            document.querySelectorAll('.messageSuccess').forEach((obj, index) => { obj.remove(); });
        },
        Success: (msg) => {
            try {
                Message.Remove();
            } catch (error) { }

            var div = Scripts.Elements.Create('div', null, 'message', 'messageSuccess');
            var divContent = Scripts.Elements.Create('div', 'messageContent', null, 'messageContent');
            var span = Scripts.Elements.Create('span');
            // var iconTrash = Scripts.Elements.Create('i', null, null, null, null, ['fas', 'fa-eraser']);
            var icon = Scripts.Elements.Create('i', null, null, null, null, ['fas', 'fa-check', 'iconMessage']);

            span.textContent = msg;
            //span.appendChild(iconTrash);

            divContent.appendChild(span);

            div.appendChild(divContent);
            div.appendChild(icon);

            document.body.appendChild(div);
        },
        Error: (msg) => {
            try {
                Message.Remove();
            } catch (error) { }
            
            var div = Scripts.Elements.Create('div', null, 'message', 'messageError');
            var divContent = Scripts.Elements.Create('div', 'messageContent', null, 'messageContent');
            var span = Scripts.Elements.Create('span');
            // var iconTrash = Scripts.Elements.Create('i', null, null, null, null, ['fas', 'fa-eraser']);
            var icon = Scripts.Elements.Create('i', null, null, null, null, ['fas', 'fa-bug', 'iconMessage']);

            span.textContent = msg;
            //span.appendChild(iconTrash);

            divContent.appendChild(span);

            div.appendChild(divContent);
            div.appendChild(icon);

            document.body.appendChild(div);
        }
    }
}

const Scripts = {
    Grafico: Grafico,
    API: API,
    Elements: Elements
}

var logOut = function () {    
    Scripts.Elements.Message.Error("Redirecionando para o login...");
    document.cookie = `username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `usercod=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    setTimeout(() => { window.location.href = `${urlHost}/Security/Login/`; }, 3000);
}

var recuperaUserNameCookie = function () {    
    try {
        var cookie = document.cookie.split(';');
        var name = '';
        if (cookie.find(x => x.indexOf('username=') > -1) != undefined) {
            name = cookie.find(x => x.indexOf('username=') > -1).replaceAll('username=', '')
        }

        return name;
    } catch (error) {
        return null;
    }
};

var recuperaUserCodCookie = function () {    
    try {
        var cookie = document.cookie.split(';');
        var cod = '';
        if (cookie.find(x => x.indexOf('usercod=') > -1) != undefined) {
            cod = parseInt(cookie.find(x => x.indexOf('usercod=') > -1).replaceAll('usercod=', ''));
        }

        return cod;
        
    } catch (error) {
        return null;
    }    
};

//Métodos nativos reescritos

Number.prototype.toLocaleBR = (number) => {
    return number.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
}