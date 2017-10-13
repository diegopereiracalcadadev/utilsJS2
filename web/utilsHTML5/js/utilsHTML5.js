/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var AlertJS = {

    showAlert: function (msg, iconRet1Class, iconRet2Class, alertBox1Class) {

        if (document.getElementsByClassName("alertJS-container")[0]) {
            console.log("true;");
            document.getElementsByClassName("alertJS-container")[0].remove();
        }

        var bode = document.getElementsByTagName("body")[0];
        var elem = document.createElement("div");
        var htmlContainer = '<div class="alertJS-container">       </div>';

        if (document.getElementsByClassName("alertJS-container").length === 0) {
            bode.insertAdjacentHTML("beforeend", htmlContainer);
        }

        var htmlAlert = '   <div class="alertJS-box ' + alertBox1Class + '">                              \n\
                                            <div class="icon-alertJS-vert-align">                   \n\
                                                <div class="icon-alertJS">                          \n\
                                                    <div class="icon-ret1 ' + iconRet1Class + '"></div>                \n\
                                                    <div class="icon-ret2 ' + iconRet2Class + '"></div>                \n\
                                                </div>                                              \n\
                                            </div>                                                  \n\
                                            <div class="msg-alertJS-vert-align">                    \n\
                                                <div class="msg-alertJS"> \n\
                                                    <div>                                           '
                + msg +
                '</div>                                          \n\
                                                </div>                                              \n\
                                            </div>                                                  \n\
                                        </div>                                                      ';
        document.getElementsByClassName("alertJS-container")[0].innerHTML = document.getElementsByClassName("alertJS-container")[0].innerHTML + htmlAlert;

        setTimeout(function () {
            document.getElementsByClassName("alertJS-container")[0].style.bottom = 0;
        }, 10);
    },
    showSuccessAlert: function (msg) {
        AlertJS.showAlert(msg, "icon-success-ret1", "icon-success-ret2", "alertJS-box-success");
    },
    showWarningAlert: function ($elemButtons) {

    },
    showErrorAlert: function (msg) {
        AlertJS.showAlert(msg, "icon-error-ret1", "icon-error-ret2", "alertJS-box-error");
    }
};

/* COM JQUERY */

var Validacao = {
    confereCampoEmail: function (jElem) {
        if (jElem[0].value.indexOf("@") > 0
                && jElem[0].value.indexOf(".") > 0
                && jElem[0].value.indexOf("@") < jElem[0].value.lastIndexOf(".")) {
            return true;
        } else {

            jElem.on("keypress", function () {
                $(this).removeClass("border-bottom-red")
                        .parent().find("label").removeClass("border-red label-formato-invalido");
            });

            jElem.addClass("border-bottom-red")
                    .parent().find("label").addClass("border-red label-formato-invalido")
                    .parent().addClass("focus");

            return false;
        }
    },
    formataPrimLetraInputs: function (jElemForm) {
        jElemForm.find("input.primLetra").each(function (k, v) {
            Validacao.formataPrimLetraMaiusc($(v));
        });
    },
    formataPrimLetraMaiusc: function (jElemInput) {
        jElemInput.on("keyup", function () {
            if (this.value.length === 0) {
                return;
            } else if (this.value.length === 1) {
                this.value = this.value.toUpperCase();
            } else {
                this.value = this.value.substr(0, 1).toUpperCase() + this.value.substr(1);
            }
        });
    },
    handleTelInput: function (jElem) {
        jElem.on("keypress", function (event) {
            var tecla;
            tecla = event.which || event.keyCode || window.event;
            if (tecla == 40
                    || tecla == 41
                    || tecla == 42
                    || tecla == 43
                    || tecla == 45
                    || tecla == 61
                    || (tecla >= 48 && tecla <= 57)) {
                return true;
            } else {
                return false;
            }
        });
    },
    monitoraCampoEmail: function (jElem) {
        jElem.on("change", function () {
            Validacao.confereCampoEmail(jElem);
        });

    },
    procuraInputsObrigatoriosVazios: function (jElemForm) {
        let hasCamposVazios = false;
        jElemForm.find(".required-field").each(function (k, v) {
            // Registra evento para  remover da borda vermelha
            $(v).on("keypress", function () {
                $(this).removeClass("border-bottom-red")
                        .parent().find("label").removeClass("border-red label-obrigatorio");
            });
            // Testa se tem length 0 e adiciona bordas vermelhas
            if (v.value.length === 0) {
                $(v).addClass("border-bottom-red")
                        .parent().find("label").addClass("border-red label-obrigatorio")
                        .parent().addClass("focus");
                hasCamposVazios = true;
            }
        });
        jElemForm.find(".required-field")[0].focus();
        return hasCamposVazios;
    }
};

var Tooltip = {
    exibeTooltipAutoClose: function (jElem, text) {
        $("<span>", {
            class: "tool__tip__temp",
            text: text
        }).insertAfter(jElem);
        $(".tool__tip__temp").fadeOut(2500, function () {
            $(this).parent().find(".tool__tip__temp").remove();
        });
    },
    exibeTooltipCloseOnKeyPress: function (jElem, text) {
        $("<span>", {
            class: "tool__tip__temp",
            text: text
        }).insertAfter(jElem);
        jElem.on("keypress", function () {
            $(this).parent().find(".tool__tip__temp").remove();
        });
    }
};
