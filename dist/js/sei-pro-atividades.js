// ADICIONA ACOMPANHAMENTO DE ATIVIDADES
var perfilLoginAtiv = false;
var urlServerAtiv = false;
var userHashAtiv = false;
var delayServerAtiv = 0;
var arrayConfigAtividades = [];
var arrayConfigAtivUnidade = [];
var ganttAtividades = false;
var ganttAfastamentos = false;
var ganttRecorrencias = false;
var kanbanAtividades = false;
var kanbanAtividadesMoving = false;
var tableConfigEditor = {};
var tableConfigList = {};
var arrayAtividadesPro = (localStorage.getItem('configDataAtividadesPro') !== null) ? JSON.parse(localStorage.getItem('configDataAtividadesPro')) : [];
var arrayAtividadesProcPro = (localStorage.getItem('configDataAtividadesProcPro') !== null) ? JSON.parse(localStorage.getItem('configDataAtividadesProcPro')) : [];
var checkLoadAtividadesProcPro = false;
var arrayAtividades = ($('#ifrArvore').length > 0) ? arrayAtividadesProcPro : arrayAtividadesPro;
var perfilAtividadesSelected = getOptionsPro('panelAtividadesViewSyncUnidade')
                            ? $('#selInfraUnidades option:selected').text().trim()
                            : (getOptionsPro('perfilAtividadesSelected')) ? getOptionsPro('perfilAtividadesSelected') : '';
var arrayProcessosUnidade = getProcessoUnidadePro();
var arrayNomenclaturas = [];

var chartColors = {
                    blue:"rgb(54, 162, 235)", 
                    green:"rgb(75, 192, 192)", 
                    red:"rgb(255, 99, 132)", 
                    magenta:"rgb(218,112,214)",
                    orange:"rgb(255, 159, 64)", 
                    purple:"rgb(153, 102, 255)", 
                    cyan:"rgb(0,206,209)",
                    grey:"rgb(201, 203, 207)",
                    yellow:"rgb(255, 205, 86)", 
                    maroon:"rgb(128,0,0)",
                    olive:"rgb(85,107,47)",
                    teal:"rgb(0,128,128)",
                    navy:"rgb(65,105,225)",
                    silver:"rgb(192,192,192)",
                    salmon:"rgb(250,128,114)",
                    steel:"rgb(70,130,180)",
                    violet:"rgb(238,130,238)",
                    pink:"rgb(255,192,203)",
                    chocolate:"rgb(210,105,30)",
                    light_grey:"rgb(220,220,220)",
                    silver_blue:"rgb(236 240 242)"
                }

function initNameConst(type = 'get') {
    if (getOptionsPro('nomeVariaveisPro') && type == 'get') {
        window.__ = getOptionsPro('nomeVariaveisPro');
    } else {
        setNameConst();
    }
}
function setNameConst() {
    var __demanda = getName('demanda', 'demanda', true, false, false);
    var __Demanda = getName('demanda', 'Demanda', true, false, true);
    var __demandas = getName('demanda', 'demandas', false, false, false);
    var __as_demandas = getName('demanda', 'as demandas', false, true, false);
    var __atividade = getName('atividade', 'atividade', true, false, true);
    var __Atividade = getName('atividade', 'Atividade', true, false, true);
    var __ = {
        demanda: __demanda,
        a_demanda: getName('demanda', 'a demanda', true, true, false),
        a_demanda_selecionada: getName('demanda', 'a demanda', true, true, false)+' '+getNameGenre('demanda', 'selecionado', 'selecionada'),
        A_demanda: getNameGenre('demanda', 'O', 'A')+' '+__demanda,
        da_demanda: getNameGenre('demanda', 'do', 'da')+' '+__demanda,
        esta_demanda: getNameGenre('demanda', 'este', 'esta')+' '+__demanda,
        a_outra_demanda_vinculada: getNameGenre('demanda', 'o outro', 'a outra')+' '+__demanda+' '+getNameGenre('demanda', 'vinculado', 'vinculada'),
        nova_demanda: getNameGenre('demanda', 'novo', 'nova')+' '+__demanda,
        iniciada_a_demanda: getNameGenre('demanda', 'iniciado', 'iniciada')+' '+getName('demanda', 'a demanda', true, true, false),
        demanda_programada: __demanda+' '+getNameGenre('demanda', 'programado', 'programada'),
        demandas: getName('demanda', 'demandas', false, false, false),
        das_demandas: getNameGenre('demanda', 'dos', 'das')+' '+__demandas,
        minhas_demandas: getNameGenre('demanda', 'meus', 'minhas')+' '+__demandas,
        demandas_programadas: __demandas+' '+getNameGenre('demanda', 'programados', 'programadas'),
        Demanda: __Demanda,
        da_Demanda: getNameGenre('demanda', 'do', 'da')+' '+__Demanda,
        a_Demanda: getNameGenre('demanda', 'o', 'a')+' '+__Demanda,
        Nova_Demanda: getNameGenre('demanda', 'Novo', 'Nova')+' '+__Demanda,
        as_demandas: __as_demandas,
        as_demandas_selecionadas: __as_demandas+' '+getNameGenre('demanda', 'selecionados', 'selecionadas'),
        Demandas: getName('demanda', 'Demanda', false, false, true),
        arquivar: getName('arquivar', 'arquivar', true, false, false),
        Arquivar: getName('arquivar', 'Arquivar', true, false, true),
        arquivamento: getName('arquivamento', 'arquivamento', true, false, false),
        Arquivamento: getName('arquivamento', 'Arquivamento', true, false, true),
        arquivado: getName('arquivado', 'arquivado', true, false, false),
        Arquivado: getName('arquivado', 'Arquivado', true, false, true),
        arquivados: getName('arquivado', 'arquivados', false, false, false),
        arquivada: getName('arquivada', 'arquivada', true, false, false),
        Arquivada: getName('arquivada', 'Arquivada', true, false, true),
        Arquivadas: getName('arquivada', 'Arquivadas', false, false, true),
        arquivadas: getName('arquivada', 'arquivadas', false, false, false),
        paralisar: getName('paralisar', 'paralisar', true, false, false),
        Paralisar: getName('paralisar', 'Paralisar', true, false, true),
        paralisada: getName('paralisada', 'paralisada', true, false, false),
        Paralisado: getName('paralisado', 'Paralisado', true, false, true),
        Paralisada: getName('paralisada', 'Paralisada', true, false, true),
        paralisacao: getName('paralisacao', 'paralisa\u00E7\u00E3o', true, false, false),
        Paralisacao: getName('paralisacao', 'Paralisa\u00E7\u00E3o', true, false, true),
        retomada: getName('retomada', 'retomada', true, false, false),
        Retomada: getName('retomada', 'Retomada', true, false, true),
        retomar: getName('retomar', 'retomar', true, false, false),
        Retomar: getName('retomar', 'Retomar', true, false, true),
        Prorrogar: getName('prorrogar', 'Prorrogar', true, false, true),
        complexidade: getName('complexidade', 'complexidade', true, false, false),
        Complexidade: getName('complexidade', 'Complexidade', true, false, true),
        assunto: getName('assunto', 'assunto', true, false, false),
        Assunto: getName('assunto', 'Assunto', true, false, true),
        observacao: getName('observacao', 'observa\u00E7\u00E3o', true, false, false),
        Observacao: getName('observacao', 'Observa\u00E7\u00E3o', true, false, true),
        Observacoes: getName('observacao', 'Observa\u00E7\u00F5es', false, false, true),
        gerencial: getName('gerencial', 'gerencial', true, false, true),
        Gerencial: getName('gerencial', 'Gerencial', true, false, true),
        tecnica: getName('tecnica', 't\u00E9cnica', true, false, true),
        Tecnica: getName('tecnica', 'T\u00E9cnica', true, false, true),
        atividade: __atividade,
        Atividade: __Atividade,
        a_atividade: getName('atividade', 'a atividade', true, true, false),
        a_Atividade: getName('atividade', 'a Atividade', true, true, true),
        atividades: getName('atividade', 'atividades', false, false, false),
        Atividades: getName('atividade', 'Atividades', false, false, true),
    }
    window.__ = __;
    setOptionsPro('nomeVariaveisPro', __);
}
function getName(ref_nomenclatura, name_default, singular = true, with_article = false, capitalize = false) {
    if (typeof arrayNomenclaturas !== 'undefined' && arrayNomenclaturas.length > 0) {
        var name = jmespath.search(arrayNomenclaturas, "[?ref_nomenclatura=='"+ref_nomenclatura+"'] | [0]");
            name = (name !== null) ? name : false;
        var article = (name) 
            ? name.config.masculino 
                ? (singular ? 'o' : 'os')
                : (singular ? 'a' : 'as')
            : '';
        var nomenclatura = name ? (singular ? name.config.singular : name.config.plural) : name_default;
            nomenclatura = (capitalize) ? capitalizeFirstLetter(nomenclatura) : nomenclatura;
        var preposicao = (name && typeof name.config.preposicao !== 'undefined' && name.config.preposicao) 
            ? name.config.masculino 
                ? (singular ? 'do ' : 'dos ')
                : (singular ? 'da ' : 'das ')
            : '';
        var phase = (with_article) ? article+' '+nomenclatura : preposicao+nomenclatura;
        return phase;
    } else {
        return name_default;
    }
}
function getNameGenre(ref_nomenclatura, string_male, string_female) {
    var masc = jmespath.search(arrayNomenclaturas, "[?ref_nomenclatura=='"+ref_nomenclatura+"'] | [0].config.masculino");
        masc = (masc !== null) ? masc : false;
    return (masc ? string_male : string_female);
}
function getServerAtividades(param, mode) {
    if (    mode == 'panel' || 
            (mode == 'chart_demandas' && checkCapacidade(mode)) || 
            (mode.indexOf('config_') !== -1 && checkCapacidade(mode)) || 
            (mode.indexOf('_favoritos') !== -1 && checkCapacidade(mode)) || 
            (mode == 'update_checklist' && checkCapacidade(mode)) || 
            (mode.indexOf('report_') !== -1 && checkCapacidade(mode)) || 
            (delayServerAtiv == 0 && !checkLoadingButtonConfirm() && checkCapacidade(mode)) 
        ) {
        param.hash = userHashAtiv;
        param.version = VERSION_SEIPRO;
        param.perfil = (getOptionsPro('perfilAtividadesSelected')) ? getOptionsPro('perfilAtividadesSelected') : '';
        delayServerAtiv = 1; setTimeout(function(){ delayServerAtiv = 0; }, 1000);
        if (typeof loadingButtonConfirm !== 'undefined') { loadingButtonConfirm(true); }
        var authToken = (typeof window.tokenID !== 'undefined') 
            ? function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer '+window.tokenID);
            }
            : undefined;

        $.ajax({
            type: "POST",
            beforeSend: authToken,
            url: urlServerAtiv,
            dataType: "json",
            data: param,
            success: function(ativData){
                if (  ativData.status == 0 || ativData.length == 0 ) {
                    loadingButtonConfirm(false);

                    if (typeof ativData.replace_server !== 'undefined' && ativData.replace_server != '') {
                        var urlReplace = url_host.replace('controlador.php','')+'?#&acao_pro=change_database&base=atividades&url='+ativData.replace_server;
                        window.location.href = urlReplace;
                    }
                    if (mode.indexOf('config_update_') !== -1 || mode.indexOf('config_new_') !== -1) { 
                        updateServerTabConfig(ativData, param);
                    } else if (mode != 'panel') { 
                        alertaBoxPro('Error', 'exclamation-triangle', (typeof ativData.status_txt != 'undefined' ? ativData.status_txt : 'Erro ao enviar sua informa\u00E7\u00F5es.'));
                        if (mode == 'update_prioridades') {
                            updatePriorityKanbanItens(ativData['board'], 'error');
                        }
                    } else {
                        localStorageRemovePro('configDataAtividadesPro');
                        arrayAtividadesPro = [];
                        initPanelAtividades(arrayAtividadesPro);
                    }
                    if (typeof ativData.status_acess !== 'undefined' && ativData.status_acess == 0) {
                        removeOptionsPro('perfilAtividadesSelected');
                    }

                } else {
                    if (typeof ativData.padrao !== 'undefined' && typeof ativData.padrao.perfil !== 'undefined' && ativData.padrao.perfil.login != userSEI) {
                        alertaBoxPro('Error', 'exclamation-triangle', 'A chave de acesso ao sistema de '+__.atividades+' ('+ativData.padrao.perfil.login+') \u00E9 diferente do login do SEI ('+userSEI+'). <br><br>Solicite nova chave ao administrador.');
                    } else {
                        if (mode == 'panel' && param.action == 'demandas' && param.perfil == '' && ativData.demandas.length == 0 && ativData.padrao.perfil.unidade != '') {
                            setOptionsPro('perfilAtividadesSelected', ativData.padrao.perfil.unidade);
                            getServerAtividades(param, mode);
                        } else if (mode.indexOf('chart_') !== -1) {
                            setChartAtividades(ativData['chart'], mode);
                        } else if (mode == 'check_favoritos') {
                            checkFileRemoteFav('set',ativData);
                        } else if (mode == 'get_favoritos') {
                            restoreFavServer(ativData['config']);
                        } else if (mode == 'set_favoritos') {
                            loadingButtonConfirm(false);
                        } else if (mode == 'view_documento') {
                            loadingButtonConfirm(false);
                            if (param.reference == 'modelo') {
                                openModelConfigItem(ativData, param);
                            }
                        } else if (mode == 'edit_documento') {
                            loadingButtonConfirm(false);
                            if (param.reference == 'modelo') {
                                resetDialogBoxPro('editorBoxPro');
                                alertaBoxPro('Sucess', 'check-circle', param.title+' salvo com sucesso!');
                            }
                        } else if (mode == 'report_errors') {
                            loadingButtonConfirm(false);
                            $('.alertaErrorPro .sendReport').find('i').attr('class','fas fa-thumbs-up azulColor').end().find('.labelLink').text('Notifica\u00E7\u00E3o '+__.arquivada+'!');
                        } else if (mode.indexOf('report_') !== -1) {
                            updateServerTabReport(ativData, param);
                        } else if (mode == 'config_update_user_personal') {
                            $('#tabs-configpessoal').find('tr td:first-child').removeClass('editCellLoading');
                        } else if (mode.indexOf('config_update_') !== -1 || (mode.indexOf('config_new_') !== -1 && mode != 'config_new_users')) {
                            updateServerTabConfig(ativData, param);
                        } else if (mode == 'update_checklist') {
                            checklistUpdate(false, 'update', ativData, param);
                        } else if (mode.indexOf('config_') !== -1) {
                            loadingButtonConfirm(false);
                            var mode_config = mode.replace('config_','').replace('self_','');
                            getTabConfig(mode_config, 'set', ativData['config']);
                            if (typeof ativData['padrao'] !== 'undefined' && ativData['padrao'] !== null && (mode == 'config_users' || mode == 'config_unidades')) {
                                arrayConfigAtividades['unidades_all'] = ativData['padrao']['unidades_all'];
                                arrayConfigAtividades['perfis'] = ativData['padrao']['perfis'];
                            }
                            if (typeof ativData['padrao'] !== 'undefined' && ativData['padrao'] !== null && (mode == 'config_planos')) {
                                arrayConfigAtividades['tipos_modalidades'] = ativData['padrao']['tipos_modalidades'];
                            }
                            if (mode == 'config_new_users') {
                                loadingButtonConfirm(false);
                                if (param.mode == 'check' && ativData.check_lotacao && ativData.id_user != 0 && ativData.id_unidade != 0) {
                                    alertaBoxPro('Error', 'exclamation-triangle', 'Usu\u00E1rio j\u00E1 cadastrado no sistema. Lota\u00E7\u00E3o atual: '+ativData.nome_unidade+' ('+ativData.sigla_unidade+')');
                                } else if (param.mode == 'check' && ativData.check_lotacao == false && ativData.id_user != 0) {
                                    confirmaFraseBoxPro('Usu\u00E1rio j\u00E1 cadastrado no sistema, mas sem lota\u00E7\u00E3o definida. Deseja lotar em sua unidade?', 'SIM', 
                                        function(){
                                            moveUserCapacity(ativData.id_user);
                                        }
                                    );
                                } else if (param.mode == 'move') {
                                    resetDialogBoxPro('dialogBoxPro');
                                    updateAtividade();
                                }
                            }
                        } else if (mode == 'panel') {
                            arrayConfigAtividades = ativData['padrao'];
                            arrayEtiquetasList = $.map(arrayConfigAtividades['etiquetas']['list'], function (i) { return i });
                            arrayConfigAtividades['etiquetas']['list'] = arrayEtiquetasList;
                            arrayConfigAtivUnidade = jmespath.search(arrayConfigAtividades['unidades'], "[?selected==`true`] | [0]");

                            arrayNomenclaturas = arrayConfigAtividades['nomenclaturas'];
                            initNameConst('set');

                            var arrayUsuarios = [];
                            if (typeof arrayConfigAtividades.unidades !== 'undefined') {
                                $.each(jmespath.search(arrayConfigAtividades.unidades,"[*].usuarios"), function(index, value){
                                    $.each(value, function(i, v){
                                        if (jmespath.search(arrayUsuarios,"[?id_user==`"+v.id_user+"`]").length == 0) { 
                                            arrayUsuarios.push(v);
                                        }
                                    });
                                });
                                arrayConfigAtividades.usuarios = arrayUsuarios;
                            }

                            
                            var resultAtivData = ativData['demandas'];
                            var resultAtivDataProc = ativData['demandas_processo'];
                                arrayAtividadesPro = resultAtivData;
                                arrayAtividadesProcPro = resultAtivDataProc;
                                checkLoadAtividadesProcPro = true;
                            var arrayAtividades = ($('#ifrArvore').length > 0) ? arrayAtividadesProcPro : arrayAtividadesPro;
                            
                            localStorageStorePro('configDataAtividadesPro', resultAtivData);
                            localStorageStorePro('configDataAtividadesProcPro', resultAtivDataProc);
                            initPanelAtividades(ativData);
                            getInsertIconAtividade();  

                            console.log(ativData);

                            if (typeof param.callback !== 'undefined' && param.callback) {
                                if (param.callback.action == 'rate_atividade') {
                                    setTimeout(function(){ 
                                        rateAtividade(param.callback.id, false);
                                    }, 1500);
                                }
                            }
                                                    
                        } else if (mode == 'pause_atividade_lista') {
                            loadingButtonConfirm(false);
                            getPausasAtividadeCalc(ativData['pause_lista']);
                        } else if (mode == 'update_planos') {
                            loadingButtonConfirm(false);
                            updateArrayPlanos(ativData['update_planos']);
                        } else if (mode == 'update_prioridades') {
                            updatePriorityKanbanItens(ativData['board'], 'update');
                            var resultAtivData = ativData['demandas'];
                                arrayAtividadesPro = resultAtivData;
                                localStorageStorePro('configDataAtividadesPro', resultAtivData);
                        } else if (
                            mode == 'sign_documento' || 
                            mode == 'sign_cancel_documento' || 
                            mode == 'save_atividade' || 
                            mode == 'edit_atividade' || 
                            mode == 'delete_atividade' || 
                            mode == 'start_atividade' || 
                            mode == 'extend_atividade' || 
                            mode == 'variation_atividade' || 
                            mode == 'type_atividade' || 
                            mode == 'pause_atividade' || 
                            mode == 'pause_atividade_remove' || 
                            mode == 'start_cancel_atividade' || 
                            mode == 'complete_atividade' ||
                            mode == 'complete_edit_atividade' ||
                            mode == 'complete_cancel_atividade' ||
                            mode == 'rate_atividade' ||
                            mode == 'rate_edit_atividade' ||
                            mode == 'rate_cancel_atividade' ||
                            mode == 'send_atividade' ||
                            mode == 'send_cancel_atividade' ||
                            mode == 'save_afastamento' || 
                            mode == 'edit_afastamento' || 
                            mode == 'delete_afastamento' 
                            ) {
                                var value = (typeof param.id_demanda !== 'undefined') ? jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+param.id_demanda+"`] | [0]") : false;
                                var demandaID = (value) ? '[{"ID":'+value.id_demanda+'}]' : value;
                                    demandaID = (!value && typeof param.id_demandas != 'undefined' && param.id_demandas.length > 0) 
                                                ? JSON.stringify($.map(param.id_demandas, function(sub, i){ return {ID: sub} }))
                                                : demandaID;
                                var requisicao = (value) 
                                                    ? (typeof value.requisicao_sei !== 'undefined' && value.requisicao_sei !== null && parseInt(value.requisicao_sei) != 0) 
                                                        ? value.nome_requisicao+' ('+value.requisicao_sei+') ' 
                                                        : value.nome_requisicao
                                                    : '';
                                var txtAlert = (mode == 'save_atividade') ? __.Demanda+' '+getNameGenre('demanda', 'cadastrado', 'cadastrada') : '';
                                    txtAlert = (mode == 'sign_documento') ? 'Documento assinado' : txtAlert;
                                    txtAlert = (mode == 'sign_cancel_documento') ? 'Assinatura do documento cancelada' : txtAlert;
                                    txtAlert = (mode == 'edit_atividade') ? __.Demanda+' '+getNameGenre('demanda', 'editado', 'editada') : txtAlert;
                                    txtAlert = (mode == 'delete_atividade') ? (typeof ativData['delete_demandas'] !== 'undefined' && ativData['delete_demandas'].length > 1 ? __.Demandas+' '+getNameGenre('demanda', 'deletados', 'deletadas') : __.Demanda+' deletada'+getNameGenre('demanda', 'deletado', 'deletada')) : txtAlert;
                                    txtAlert = (mode == 'start_atividade') ? __.Demanda+' '+getNameGenre('demanda', 'iniciado', 'iniciada') : txtAlert;
                                    txtAlert = (mode == 'extend_atividade') ? __.Demanda+' '+getNameGenre('demanda', 'prorrogado', 'prorrogada') : txtAlert;
                                    txtAlert = (mode == 'variation_atividade') ? __.Complexidade+' '+getNameGenre('complexidade', 'alterado', 'alterada') : txtAlert;
                                    txtAlert = (mode == 'type_atividade') ? __.Atividade+' '+getNameGenre('atividade', 'atribu\u00EDdo', 'atribu\u00EDda') : txtAlert;
                                    txtAlert = (mode == 'pause_atividade') ? __.Demanda+' '+(ativData['check_ispaused'] == false ? __.paralisada : __.retomada) : txtAlert;
                                    txtAlert = (mode == 'pause_atividade_remove') ? __.Paralisacao+' '+getNameGenre('paralisacao', 'removido', 'removida') : txtAlert;
                                    txtAlert = (mode == 'complete_atividade') ? __.Demanda+' '+getNameGenre('demanda', 'conclu\u00EDdo', 'conclu\u00EDda') : txtAlert;
                                    txtAlert = (mode == 'complete_edit_atividade') ? __.Demanda+' '+getNameGenre('demanda', 'editado', 'editada') : txtAlert;
                                    txtAlert = (mode == 'start_cancel_atividade') ? 'In\u00EDcio de '+__.demanda+' cancelado' : txtAlert;
                                    txtAlert = (mode == 'complete_cancel_atividade') ? 'Conclus\u00E3o de '+__.demanda+' cancelada' : txtAlert;
                                    txtAlert = (mode == 'rate_atividade') ? 'Avalia\u00E7\u00E3o cadastrada' : txtAlert;
                                    txtAlert = (mode == 'rate_edit_atividade') ? 'Avalia\u00E7\u00E3o editada' : txtAlert;
                                    txtAlert = (mode == 'rate_cancel_atividade') ? 'Avalia\u00E7\u00E3o cancelada' : txtAlert;
                                    txtAlert = (mode == 'send_atividade') ? (ativData['update_demandas'].length == 1 ? __.Demanda+' '+__.arquivada+'' : __.Demandas+' '+__.arquivadas) : txtAlert;
                                    txtAlert = (mode == 'send_cancel_atividade') ? __.Arquivamento+' de '+__.demanda+' '+getNameGenre('arquivamento', 'cancelado', 'cancelado') : txtAlert;
                                    txtAlert = (mode == 'save_afastamento') ? 'Afastamento salvo' : txtAlert;
                                    txtAlert = (mode == 'edit_afastamento') ? 'Afastamento editado' : txtAlert;
                                    txtAlert = (mode == 'delete_afastamento') ? (typeof ativData['id_afastamentos'] !== 'undefined' && ativData['id_afastamentos'].length > 1 ? 'Afastamentos deletados' : 'Afastamento deletado') : txtAlert;
                                
                                loadingButtonConfirm(false);
                                if (mode == 'sign_documento' || mode == 'sign_cancel_documento') {
                                    resetDialogBoxPro('editorBoxPro');
                                }
                                if (mode != 'pause_atividade_remove') {
                                    resetDialogBoxPro('dialogBoxPro');
                                } else {
                                    console.log('getPausasAtividade',ativData['id_demanda']);
                                    setTimeout(function(){ 
                                        getPausasAtividade(ativData['id_demanda']);
                                    }, 1500);
                                }

                                var callback = (mode == 'type_atividade' && param.before_rate) ? {action: 'rate_atividade', id: param.id_demanda} : false;
                                getAtividades(callback);

                                alertaBoxPro('Sucess', 'check-circle', txtAlert+' com sucesso!');
                                
                                if (value && value.id_procedimento !== null && jmespath.search(arrayConfigAtividades.entidades,"[?id_entidade==`"+arrayConfigAtividades.perfil.id_entidade+"`] |[0].config.gravar_historico_processo")) {
                                    updateDadosArvore('Atualizar Andamento', 'txaDescricao', '_'+txtAlert+': '+requisicao+(demandaID ? demandaID : ''), value.id_procedimento);
                                }
                                if ((mode == 'save_atividade' || mode == 'complete_atividade') && ativData['anotacoes_processo']) {
                                    updateAnotacaoProcesso(ativData['anotacoes_processo']);
                                }
                                if (mode == 'save_afastamento' || mode == 'edit_afastamento' || mode == 'delete_afastamento') {
                                    setTimeout(function(){ 
                                        console.log('updateTempoProporcionalPlanos', mode);
                                        updateTempoProporcionalPlanos();
                                    }, 1500);
                                }
                                if (mode == 'save_atividade' || mode == 'edit_atividade' || mode == 'extend_atividade' || mode == 'variation_atividade' || mode == 'type_atividade' || mode == 'complete_atividade' || mode == 'complete_edit_atividade') {
                                    alertBoxPro.dialog('option', 'buttons', [{
                                        text: 'Gerar Notifica\u00E7\u00E3o',
                                        icon: "ui-icon-mail-closed",
                                        click: function(event) { 
                                            $(this).dialog('close');
                                            notifyAtividade(param.id_demanda);
                                        }
                                    },{
                                        text: "OK",
                                        click: function() {
                                            $(this).dialog('close');
                                        }
                                    }]);
                                }
                        }
                    }
                }
            }
        }).fail(function(data, textStatus){
            loadingButtonConfirm(false);
            if (typeof param.type !== 'undefined') { resetButtonTabConfig('.actionsConfig_'+param.type) }
            failureScreen(data, textStatus);
        });
    }
}
function failureScreen(data, textStatus) {
    var dataResponse = $("<div/>").html(data.responseText).text();
    var htmlReportError =   '<p style="margin: 10px 0;">'+
                            '   <span>'+
                            '       <a class="newLink" onclick="openErrorReport(this)" style="font-size: 9pt;cursor: pointer;">'+
                            '           <i class="fas fa-laptop-code" style="font-size: 100%;"></i> '+
                            '           Relat\u00F3rio de erros'+
                            '           <i class="fas fa-angle-double-right" style="font-size: 100%;"></i>'+
                            '       </a>'+
                            (checkCapacidade('report_errors') ?
                            '       <a class="newLink sendReport" onclick="sendErrorReport(this)" data-send="false" style="font-size: 9pt;cursor: pointer;float: right;">'+
                            '           <i class="fas fa-paper-plane" style="font-size: 100%;"></i> '+
                            '           <span class="labelLink">Notificar o Administrador</span>'+
                            '       </a>'+
                            '' : '')+
                            '   </span>'+
                            '   <pre class="errorReport">'+
                            '       '+dataResponse+
                            '   </pre>'+
                            '</p>';
    var textError = (textStatus === 'timeout') ? 'Erro ao receber sua informa\u00E7\u00F5es do servidor de dados. Tente novamente mais tarde. ('+textStatus+')' : 'Erro ao enviar sua informa\u00E7\u00F5es. Tente novamente mais tarde ou notifique o administrador.'+htmlReportError;
    alertaBoxPro('Error', 'exclamation-triangle', textError);
}
function sendErrorReport(this_) {
    var _this = $(this_);
    var data = _this.data();
    var boxError = $('.alertaErrorPro .errorReport');
    var textError = boxError.text().trim();
    if (data.send == false) {
        _this.data('send',true);
        _this.find('i').attr('class','fas fa-spinner fa-spin');
        var action = 'report_errors';
        var param = {
            action: action,
            user_agent: navigator.userAgent,
            user_sei: userSEI,
            version_seipro: VERSION_SEIPRO,
            text_error: textError
        };
        getServerAtividades(param, action);
    }
}
function openErrorReport(this_) {
    $('.alertaErrorPro .errorReport').toggle();
}
function checkCapacidade(nome_capacidade) {
    var checkPerfil = (arrayConfigAtividades && typeof arrayConfigAtividades['perfil'] !== 'undefined' && typeof arrayConfigAtividades['perfil'].capacidades !== 'undefined')
                ? jmespath.search(arrayConfigAtividades['perfil'].capacidades, "[?nome_capacidade=='"+nome_capacidade+"'] | length(@)") 
                : 0;
    return (checkPerfil == 0) ? false : true;
}
function getChartDemandas(param) {
    var action = 'chart_demandas';
        param.action = action;
        param.id_user = (param.id_user) ? param.id_user : 0;
        getServerAtividades(param, action);
}
function changeChartAtiv(this_) {
    var _this = $(this_);
    var _parent = _this.closest('#chartAtivActions');
    var elem_user = _parent.find('#selectChartUserAtiv');
    var id_user = elem_user.val();
        id_user = parseInt(id_user);
    var elem_unidade = _parent.find('#selectChartUnidadeAtiv');
    var id_unidade = elem_unidade.val();
        id_unidade = parseInt(id_unidade);
    var elem_programa = _parent.find('#selectChartProgramasAtiv');
    var id_programa = elem_programa.val();
        id_programa = parseInt(id_programa);
    var sigla_unidade = (_this.data('type') == 'unidade')
            ? elem_unidade.find('option:selected').data('label')
            : elem_user.find('option:selected').data('label');

    var _param = {id_user: id_user, id_unidade: id_unidade, id_programa: id_programa, sigla_unidade: sigla_unidade};
        _parent.find('.loadChartUserAtiv').remove();
        _parent.append('<i class="fas fa-spinner fa-spin loadChartUserAtiv" style="float: right; font-size: 12pt; margin-top: 8px;"></i>');

        elem_user.find('optgroup').each(function(){
            if (sigla_unidade && sigla_unidade != '' && $(this).attr('label') != sigla_unidade) {
                $(this).prop('disabled', true);
            } else {
                $(this).prop('disabled', false);
            }
        });
        /*
        elem_unidade.find('option').each(function(){
            if (sigla_unidade && sigla_unidade != '' && $(this).attr('data-label') != sigla_unidade) {
                $(this).prop('disabled', true);
            } else {
                $(this).prop('disabled', false);
            }
        });
        */

    getChartDemandas(_param);
    setOptionsPro('selectChartAtiv', {id_user: id_user, id_unidade: id_unidade, id_programa: id_programa, sigla_unidade: sigla_unidade});
}
function setChartAtividades(data, mode) {
    $('.loadChartUserAtiv').remove();
    if (mode == 'chart_demandas') {
        if (typeof data.demandasmes !== 'undefined' && data.demandasmes) { setChartDemandasAtiv(data.demandasmes); }
        if (typeof data.estoque !== 'undefined' && data.estoque) { setChartDemandasEstoqueAtiv(data.estoque); }
        if (typeof data.processuais !== 'undefined' && data.processuais) { setChartDemandasProcessuaisAtiv(data.processuais); }
        if (typeof data.mediatempo !== 'undefined' && data.mediatempo) { setChartDemandasMediaTempoAtiv(data.mediatempo); }
        if (typeof data.statusentregas !== 'undefined' && data.statusentregas) { setChartDemandasStatusEntregasAtiv(data.statusentregas); }
        if (typeof data.requisicoes !== 'undefined' && data.requisicoes) { setChartDemandasRequisicoesAtiv(data.requisicoes); }
        if (typeof data.documentos !== 'undefined' && data.documentos) { setChartDemandasDocumentosAtiv(data.documentos); }
        if (typeof data.produtividade !== 'undefined' && data.produtividade) { setChartDemandasProdutividadeAtiv(data.produtividade); }
        if (typeof data.produtividademes !== 'undefined' && data.produtividademes) { setChartDemandasProdutividadeMesAtiv(data.produtividademes); }
        /*
        */
        if (typeof data.programas !== 'undefined' && data.programas) { setChartProgramasAtiv(data.programas); }
        getChartPlanosTrabalho();
        initPanelResize('#chartSectionDistribuicao', 'chartDistribuicao');
    }
}
function setChartProgramasAtiv(data) {
    var listUnidadesPrograma = jmespath.search(data,"[*].id_unidade");
        listUnidadesPrograma = (listUnidadesPrograma !== null) ? uniqPro(listUnidadesPrograma) : 0;

    var elem_unidade = $('#selectChartUnidadeAtiv');
    var optionSelectPrograma =  '<option value="0" data-label="">&nbsp;</option>';
    if (listUnidadesPrograma.length > 1) {
        $.each(listUnidadesPrograma, function(index, value){
            var arrayProgramas = jmespath.search(data, "[?id_unidade==`"+value+"`]");
            var disabled = (arrayProgramas[0].sigla_unidade != '' && elem_unidade.find('option:selected').data('label') != arrayProgramas[0].sigla_unidade) ? 'disabled' : '';
            optionSelectPrograma += '<optgroup label="Programas de Gest\u00E3o: '+arrayProgramas[0].sigla_unidade+'" '+disabled+'>';
            optionSelectPrograma += $.map(arrayProgramas, function(v){ return (getOptionsPro('selectChartAtiv') && getOptionsPro('selectChartAtiv').id_programa == v.id_programa) ? '<option value="'+v.id_programa+'"  data-label="'+v.sigla_unidade+'" selected>'+v.sigla_unidade+'</option>' : '<option value="'+v.id_programa+'"  data-label="'+v.sigla_unidade+'">'+moment(v.data_inicio_vigencia,'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')+' \u00E0 '+moment(v.data_fim_vigencia,'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')+'</option>' }).join('');
            optionSelectPrograma += '</optgroup>';
        });
    } else {
        optionSelectPrograma += $.map(jmespath.search(data, "[]"), function(v){ return (getOptionsPro('selectChartAtiv') && getOptionsPro('selectChartAtiv').id_programa == v.id_programa) ? '<option value="'+v.id_programa+'"  data-label="'+v.sigla_unidade+'" selected>'+v.sigla_unidade+'</option>' : '<option value="'+v.id_programa+'"  data-label="'+v.sigla_unidade+'">'+moment(v.data_inicio_vigencia,'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')+' \u00E0 '+moment(v.data_fim_vigencia,'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')+'</option>' }).join('');
    }
    // $('#selectChartProgramasAtiv').html(optionSelectPrograma);
}
function setChartDemandasAtiv(data) {
        var idElem = 'chartAtivPanelDemandas';
        var title = __.Demandas+' por m\u00EAs';
        var xTitle = 'M\u00EAs';
        var yTitle = __.Demandas+'';
        var chartData = {
                            labels: jmespath.search(data, "[*].label"),
                            datasets: [{
                                label: 'Distribu\u00EDdas',
                                lineTension: 0,
                                backgroundColor: chartColors.red,
                                borderColor: chartColors.red,
                                data: jmespath.search(data, "[*].demandas"),
                                fill: false,
                            }, {
                                label: 'Entregues',
                                lineTension: 0,
                                backgroundColor: chartColors.blue,
                                borderColor: chartColors.blue,
                                borderDash: [5, 5],
                                data: jmespath.search(data, "[*].entregas"),
                                fill: false
                            }]
                        };
        setChartLines(idElem, chartData, title, xTitle, yTitle);
}
function setChartDemandasProdutividadeMesAtiv(data) {
        var idElem = 'chartAtivPanelProdutividadeMes';
        var title = 'Produtividade por m\u00EAs';
        var xTitle = 'M\u00EAs';
        var yTitle = 'Produtividade';
        var datasets = [];
        var iColor = 0;
            $.each(data[0].produtividade, function(i, v){
                var colorSet = chartColors[Object.keys(chartColors)[iColor]];
                datasets.push({
                                    label: v.apelido,
                                    // lineTension: 0,
                                    backgroundColor: colorSet,
                                    borderColor: colorSet,
                                    data: $.map(jmespath.search(data, "[*].produtividade | [*][?apelido=='"+v.apelido+"'].produtividade"), function(v){ return parseFloat(v) }),
                                    fill: false,
                                }); 
                                if (Object.keys(chartColors).length-1 == i) {
                                    iColor = 0;
                                } else {
                                    iColor++;
                                } 
            });
        var chartData = {
                            labels: jmespath.search(data, "[*].label"),
                            datasets: datasets
                        };
        setChartLines(idElem, chartData, title, xTitle, yTitle);
}
function setChartDemandasEstoqueAtiv(data) {
    var idElem = 'chartAtivPanelEstoque';
    var datasets = data.estoque;
    var labels = data.label;
    var title = 'Estoque de  '+__.Demandas;
    var backgroundColor = [
            chartColors.green,
            chartColors.blue,
            chartColors.red
        ];
    setChartDonut(idElem, datasets, labels, title, backgroundColor);
}
function setChartDemandasProcessuaisAtiv(data) {
    var idElem = 'chartAtivPanelProcessuais';
    var datasets = data.processuais;
    var labels = data.label;
    var title = __.Demandas+' Processuais x N\u00E3o Processuais';
    var backgroundColor = [
            chartColors.blue,
            chartColors.green
        ];
    setChartPie(idElem, datasets, labels, title, backgroundColor);
}
function setChartDemandasMediaTempoAtiv(data) {
    var idElem = 'chartAtivPanelMediaTempo';
    var datasets = [{
                        label: __.Demandas+' \u00DAnicas',
                        backgroundColor: chartColors.orange,
                        data: data.mediatempo.demandas_unicas
                    },{
                        label: 'Tempo Despendido',
                        backgroundColor: chartColors.green,
                        data: data.mediatempo.tempo_despendido
                    }, {
                        label: 'Dias Despendido',
                        backgroundColor: chartColors.blue,
                        data: data.mediatempo.dias_despendido 
                    }];
    var labels = data.label;
    var title = __.Demandas+' Processuais x N\u00E3o Processuais';
    setChartHbar(idElem, datasets, labels, title);
}
function setChartDemandasStatusEntregasAtiv(data) {
    var idElem = 'chartAtivPanelStatusEntregas';
    var datasets = data.statusentregas;
    var labels = data.label;
    var title = 'Status das Entregas';
    var backgroundColor = [
            chartColors.green,
            chartColors.orange
        ];
    setChartDonut(idElem, datasets, labels, title, backgroundColor);
}
function setChartDemandasRequisicoesAtiv(data) {
    var idElem = 'chartAtivPanelRequisicoes';
    var datasets = jmespath.search(data, "[*].total_requisicoes");
    var labels = jmespath.search(data, "[*].nome_requisicao");
    var title = 'Tipos de Requisi\u00E7\u00E3o';
    setChartPie(idElem, datasets, labels, title);
}
function setChartDemandasDocumentosAtiv(data) {
    var idElem = 'chartAtivPanelDocumentos';
    var datasets = jmespath.search(data, "[*].total_documentos");
    var labels = jmespath.search(data, "[*].nome_documento");
    var title = 'Tipos de Documentos';
    setChartPie(idElem, datasets, labels, title);
}
function setChartDemandasProdutividadeAtiv(data) {
    var idElem = 'chartAtivPanelProdutividade';
    var title = 'Ganho de Produtividade';
    var chartData = {
        labels: jmespath.search(data, "[*].apelido"),
        datasets: [{
            type: 'line',
            yAxesGroup: "1",
            label: 'Produtividade',
            borderColor: window.chartColors.red,
            borderWidth: 2,
            fill: false,
            data: jmespath.search(data, "[*].produtividade")
        }, {
            type: 'bar',
            yAxesGroup: "2",
            label: 'Tempo Pactuado',
            backgroundColor: window.chartColors.blue,
            data: jmespath.search(data, "[*].tempo_pactuado")
        }, {
            type: 'bar',
            yAxesGroup: "2",
            label: 'Tempo Despendido',
            backgroundColor: window.chartColors.green,
            data: jmespath.search(data, "[*].tempo_despendido")
        }]
    };
    setChartLineBar(idElem, chartData, title);
}
function setChartLines(idElem, chartData, title, xTitle, yTitle) {
    $('#'+idElem).html('<canvas id="'+idElem+'_canvas" width="380" height="200"></canvas>');
    var element = $('#'+idElem+'_canvas');
    new Chart(element).destroy();

    var chartLines = new Chart(element, {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            legend: {
                display: true,
                align: 'end',
                labels: {
                    boxWidth: 10,
                    fontSize: 10
                },
                onClick: setChartLabelItemStore
            },
            title: {
                display: true,
                text: title
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: xTitle
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: yTitle
                    }
                }]
            }
        }
    });
    getChartLabelItemStore(idElem, chartLines);
}
function setChartLineBar(idElem, chartData, title) {
    $('#'+idElem).html('<canvas id="'+idElem+'_canvas" width="380" height="200"></canvas>');
    var element = $('#'+idElem+'_canvas');
    new Chart(element).destroy();

    var chartLineBar = new Chart(element, {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                yAxes: [
                    {
                      name: '1',
                      type: 'linear',
                      position: 'left',
                      scalePositionLeft: true
                    },
                    {
                      name: '2',
                      type: 'linear',
                      position: 'right',
                      scalePositionLeft: false
                    }
                ]
            },
            legend: {
                display: true,
                align: 'end',
                labels: {
                    boxWidth: 10,
                    fontSize: 10
                },
                onClick: setChartLabelItemStore
            },
            title: {
                display: true,
                text: title
            },
            tooltips: {
                mode: 'index',
                intersect: true
            },
            responsive: true
        }
    });
    getChartLabelItemStore(idElem, chartLineBar);
}
function setChartPie(idElem, datasets, labels, title, backgroundColor = false) {
    $('#'+idElem).html('<canvas id="'+idElem+'_canvas" width="380" height="300"></canvas>');
    var element = $('#'+idElem+'_canvas');
    new Chart(element).destroy();

    backgroundColor = (backgroundColor) 
                    ? backgroundColor 
                    : $.map(chartColors,function(v){ return v });
    var chartPie = new Chart(element, {
        type: 'pie',
        data: {
            datasets: [{
                data: datasets,
                backgroundColor: backgroundColor,
                label: 'Dados'
            }],
            labels: labels
        },
        options: {
            legend: {
                display: true,
                align: 'end',
                labels: {
                    boxWidth: 10,
                    fontSize: 10
                },
                onClick: setChartLabelItemStore
            },
            title: {
                display: true,
                text: title
            },
            responsive: true
        }
    });
    getChartLabelItemStore(idElem, chartPie);
}
function setChartDonut(idElem, datasets, labels, title, backgroundColor = false) {
    $('#'+idElem).html('<canvas id="'+idElem+'_canvas" width="380" height="300"></canvas>');
    var element = $('#'+idElem+'_canvas');
    new Chart(element).destroy();

        backgroundColor = (backgroundColor) 
                        ? backgroundColor 
                        : $.map(chartColors,function(v){ return v });
    var chartDonut = new Chart(element, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: datasets,
                backgroundColor: backgroundColor,
                label: 'Dados'
            }],
            labels: labels
        },
        options: {
            legend: {
                display: true,
                align: 'end',
                labels: {
                    boxWidth: 10,
                    fontSize: 10
                },
                onClick: setChartLabelItemStore
            },
            title: {
                display: true,
                text: title
            },
            responsive: true
        }
    });
    getChartLabelItemStore(idElem, chartDonut);
}
function setChartHbar(idElem, datasets, labels, title) {
    $('#'+idElem).html('<canvas id="'+idElem+'_canvas" width="380" height="250"></canvas>');
    var element = $('#'+idElem+'_canvas');
    new Chart(element).destroy();

    var chartHBar = new Chart(element, {
        type: 'horizontalBar',
        data: {
            datasets: datasets,
            labels: labels
        },
        options: {
            legend: {
                display: true,
                align: 'end',
                labels: {
                    boxWidth: 10,
                    fontSize: 10
                },
                onClick: setChartLabelItemStore
            },
            title: {
                display: true,
                text: title
            },
            responsive: true
        }
    });
    getChartLabelItemStore(idElem, chartHBar);
}
function getChartPlanosTrabalho() {
    var idElem = 'chartAtivPanelPlanos';

    var id_unidade = $('#selectChartUnidadeAtiv').val();
    var qunidade = (id_unidade != 0) ? "?id_unidade==`"+id_unidade+"`" : "*";
    var id_user = $('#selectChartUserAtiv').val();
    var quser = (id_user != 0) ? "?id_user==`"+id_user+"`" : "*";
    var planosSelected = jmespath.search(arrayConfigAtividades.planos, "["+qunidade+"] | ["+quser+"] | [?data_fim=='0000-00-00 00:00:00']"); 

    if (planosSelected !== null) {
        var height = (planosSelected !== null && planosSelected.length > 1 ) 
                        ? 20*(planosSelected.length+1) 
                        : 80;
        $('#'+idElem).html('<canvas id="'+idElem+'_canvas" width="380" height="'+height+'"></canvas>');
        var element = $('#'+idElem+'_canvas');
        new Chart(element).destroy();
        var dataset = [{
                label: 'Homologado',
                backgroundColor: chartColors.green,
                data: jmespath.search(planosSelected, "[].tempo_homologado")
            },{
                label: 'Despendido',
                backgroundColor: chartColors.yellow,
                data: jmespath.search(planosSelected, "[].tempo_despendido")
            }, {
                label: 'Pactuado',
                backgroundColor: chartColors.blue,
                data: jmespath.search(planosSelected, "[].tempo_pactuado")
            }, {
                label: 'Programado',
                backgroundColor: chartColors.silver,
                data: $.map(arrayConfigAtividades.planos, function(v){
                            var tempoProgramado = moment(v.data_fim_vigencia, 'YYYY-MM-DD HH:mm:ss').diff(moment(v.data_inicio_vigencia, 'YYYY-MM-DD HH:mm:ss'),'days');
                                tempoProgramado = (tempoProgramado) ? v.tempo_proporcional/tempoProgramado : tempoProgramado;
                                tempoProgramado = (tempoProgramado) ? parseInt((moment().diff(moment(v.data_inicio_vigencia, 'YYYY-MM-DD HH:mm:ss'),'days'))*tempoProgramado) : tempoProgramado;
                            if (tempoProgramado) { return tempoProgramado };
                        })
            }, {
                label: 'Plano',
                backgroundColor: chartColors.light_grey,
                data: jmespath.search(planosSelected, "[].tempo_proporcional")
            }];
        
        var planos = jmespath.search(planosSelected, "{tempo_projetado: max([*].tempo_pactuado), tempo_total: max([*].tempo_proporcional)}");
        var chartTempoPlano = new Chart(element, {
            type: 'horizontalBar',
            data: {
                    labels: jmespath.search(planosSelected, "[].apelido"),
                    datasets: dataset

                },
            options: {
                scales: {
                    xAxes: [{
                        //stacked: true,
                        gridLines: { display: false },
                        ticks: {
                            fontSize: 10,
                            min: 0,
                            max: (planos.tempo_projetado > planos.tempo_proporcional) ? planos.tempo_projetado : planos.tempo_proporcional,
                            padding: -10
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        gridLines: { display: false }
                    }]
                },
                legend: {
                    display: true,
                    align: 'end',
                    labels: {
                        boxWidth: 10,
                        fontSize: 10
                    },
                    onClick: setChartLabelItemStore
                },
                title: {
                    display: true,
                    text: 'Planos de Trabalho'
                },
                tooltips: {
                    caretPadding: -10,
                    caretSize: 0,
                    titleFontSize: 0,
                    titleSpacing: 0,
                    titleMarginBottom: 0,
                    callbacks: {
                        label: function(tooltipItem, data) {
                            let label = data.labels[tooltipItem.index];
                            let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            var planoIndex = data.datasets.findIndex(function(id_key) {
                                                return id_key.label == "Plano"
                                            });
                            let valuePlano = data.datasets[planoIndex].data[tooltipItem.index];
                            var valuePercent = (tooltipItem.datasetIndex != planoIndex) ? ' ('+((value/valuePlano)*100).toFixed(2)+'%)' : '';
                            return ' ' + label + ': '+value+' horas'+valuePercent;
        
                        }
                    }
                }
            }
        });
        getChartLabelItemStore(idElem, chartTempoPlano);
    }
}
function getSingleChartTempoPlano(element, plano, labels = false) {
    var dataset = [{
        label: 'Homologado',
        barPercentage: 0.7,
        backgroundColor: chartColors.green,
        data: [roundToTwo(plano.tempo_homologado)]
    },{
        label: 'Despendido',
        barPercentage: 0.7,
        backgroundColor: chartColors.yellow,
        data: [roundToTwo(plano.tempo_despendido)]
    }, {
        label: 'Pactuado',
        barPercentage: 0.7,
        backgroundColor: chartColors.blue,
        data: [roundToTwo(plano.tempo_pactuado)]
    }, {
        label: 'Plano',
        barPercentage: 0.7,
        backgroundColor: chartColors.light_grey,
        data: [roundToTwo(plano.tempo_proporcional)]
    }];
    
    if (typeof plano.tempo_projetado !== 'undefined') {
        dataset.splice(3, 0, {
            label: 'Projetado',
            barPercentage: 0.7,
            backgroundColor: chartColors.purple,
            data: [roundToTwo(plano.tempo_projetado)]
        });
    }
    var chartTempoPlano = new Chart(element, {
        type: 'horizontalBar',
        data: {
                labels: [(labels ? labels : 'Tempo (h)')],
                datasets: dataset

            },
        options: {
            scales: {
                xAxes: [{
                    //stacked: true,
                    gridLines: { display: false },
                    ticks: {
                        fontSize: 10,
                        min: 0,
                        max: Math.max.apply(null, [
                                                    roundToTwo(plano.tempo_despendido), 
                                                    roundToTwo(plano.tempo_homologado), 
                                                    roundToTwo(plano.tempo_pactuado), 
                                                    roundToTwo(plano.tempo_proporcional), 
                                                    (typeof plano.tempo_projetado !== 'undefined' ? roundToTwo(plano.tempo_projetado):0) 
                                                ]),
                        padding: -10
                    }
                }],
                yAxes: [{
                    stacked: true,
                    gridLines: { display: false }
                }]
            },
            legend: {
                display: true,
                align: 'end',
                labels: {
                    boxWidth: 10,
                    fontSize: 10
                }
            },
            tooltips: {
                caretPadding: -46,
                caretSize: 0,
                titleFontSize: 0,
                titleSpacing: 0,
                titleMarginBottom: 0,
                callbacks: {
                    label: function(tooltipItem, data) {
                        var label = data.labels[tooltipItem.index];
                        var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        var planoIndex = data.datasets.findIndex(function(id_key) {
                                            return id_key.label == "Plano"
                                        });
                        var valuePlano = data.datasets[planoIndex].data[tooltipItem.index];
                        var valuePercent = (tooltipItem.datasetIndex != planoIndex) ? ' ('+((value/valuePlano)*100).toFixed(2)+'%)' : '';
                        return ' ' + label + ': '+value+' horas'+valuePercent;
    
                    }
                }
            }
        }
    });
    return chartTempoPlano;
}
function updateButtonTextarea(this_) {
    if (checkValue($(this_))) { updateButtonConfirm(this_, true) } else { updateButtonConfirm(this_, false) }
}
function moreCommentBox(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.moreCommentBoxDiv');
        _parent.find('.moreCommentBoxText').toggle();
        _this.toggleClass('newLink_active');
    if (_parent.find('textarea').is(':visible')) { 
        _parent.find('textarea').focus();
    } else {
        _parent.find('textarea').val('');
    }
}
function moreInfoBoxAtiv(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.atividadeWork');
    var _moreInfo = _parent.find('.moreInfoBox');
        _this.toggleClass('newLink_active').find('i').toggleClass('fa-minus-circle fa-plus-circle');
        _moreInfo.toggle();
    var infoStatus = (_moreInfo.is(':visible')) ? 'show' : 'hide';
    setOptionsPro('moreInfoBoxAtiv',infoStatus);
}
function moreInfoBox(this_) {
    $(this_).closest('.dialogBoxDiv').find('.moreInfoBox').toggle();
    $(this_).toggleClass('newLink_active');
}
function getConfigDateAtiv(value) {
    var config_unidade = getConfigDadosUnidade(value.sigla_unidade); 
    var funcDisplay = 'filterTagView';
    var formatDate = 'YYYY-MM-DD HH:mm:ss';
    var format_hora = (config_unidade && config_unidade.count_horas) ? 'DD/MM/YYYY [\u00E0s] HH:mm' : 'DD/MM/YYYY';
    var titleDoc = value.nome_documento+' '+value.numero_documento;
        titleDoc = (typeof value.documento_sei !== 'undefined' && value.documento_sei !== null && parseInt(value.documento_sei) != 0) 
            ? titleDoc+' ('+value.documento_sei+')' 
            : titleDoc;
    var check_ispaused = (typeof value.data_retomada !== 'undefined' && value.data_retomada !== null && value.data_retomada == '0000-00-00 00:00:00') ? true : false;
    var tipPauseAtiv = (typeof value.data_retomada !== 'undefined' && value.data_retomada !== null && value.data_retomada != '0000-00-00 00:00:00')
            ? '<br> Retomada em: '+moment(value.data_retomada, 'YYYY-MM-DD HH:mm:ss').format(format_hora) 
            : (typeof value.data_pausa !== 'undefined' && value.data_pausa !== null && value.data_pausa != '0000-00-00 00:00:00') 
                ? '<br> '+__.Paralisada+' em: '+moment(value.data_pausa, 'YYYY-MM-DD HH:mm:ss').format(format_hora) 
                : '';
    var tipInitAtiv = (value.data_inicio != '0000-00-00 00:00:00') 
            ? '<br> Iniciada em: '+moment(value.data_inicio, 'YYYY-MM-DD HH:mm:ss').format(format_hora)+tipPauseAtiv
            : '';
    var checklist = (value.checklist) ? '<br>'+getInfoAtividadeChecklist(value, 'text').replace(/'/g, "\\'") : '';
    var checkRateNull = (value.avaliacao && value.avaliacao != 0 && value.avaliacao.nota_atribuida === false) ? true : false;

    var _return = (value.data_entrega == '0000-00-00 00:00:00') 
            ? {
                date: moment(value.data_distribuicao, 'YYYY-MM-DD HH:mm:ss').format(formatDate), 
                dateTo: moment().format(formatDate), 
                dateDue: moment(value.prazo_entrega,'YYYY-MM-DD HH:mm:ss').format(formatDate), 
                duecounter: 'corrido', 
                countdays: true, 
                workday: false, 
                setdate: true, 
                displayicon:    (value.data_inicio != '0000-00-00 00:00:00' 
                                    ? (moment(value.prazo_entrega,'YYYY-MM-DD HH:mm:ss') >= moment()) 
                                        ? (typeof value.data_retomada !== 'undefined' && value.data_retomada !== null && value.data_retomada == '0000-00-00 00:00:00') 
                                            ? 'fas fa-pause-circle laranjaColor' 
                                            : 'fas fa-play-circle azulColor' 
                                        : 'fas fa-play-circle vermelhoColor' 
                                    : (moment(value.prazo_entrega,'YYYY-MM-DD HH:mm:ss') < moment()) 
                                        ? 'fas fa-exclamation-triangle vermelhoColor'
                                        : ($.inArray(('importante' || 'urgente'), $.map(value.etiquetas, function(v){ return v.toLowerCase() })) !== -1) 
                                            ? 'fas fa-exclamation-circle laranjaColor' 
                                            : 'far fa-clock'
                                ),
                displayformat: format_hora,
                duesetdate: true,
                displaydue: true,
                displaydue_txt: 'Vencimento:',
                deliverydoc: false,
                func: funcDisplay,
                paused: check_ispaused,
                displaytip: (value.id_user != 0 
                    ? 'Atribu\u00EDdo \u00E0 '+value.apelido+tipInitAtiv+checklist
                    : 'N\u00E3o atribu\u00EDdo'+checklist)
            } : {
                date: moment(value.data_entrega, 'YYYY-MM-DD HH:mm:ss').format(formatDate), 
                dateTo: moment().format(formatDate), 
                dateDue: moment(value.data_entrega,'YYYY-MM-DD HH:mm:ss').add(45,'d').format(formatDate), 
                duecounter: 'corrido', 
                countdays: true, 
                workday: false, 
                setdate: true, 
                displayicon: (moment(value.data_entrega,'YYYY-MM-DD HH:mm:ss') <= moment(value.prazo_entrega,'YYYY-MM-DD HH:mm:ss')) ? 'fas fa-check-circle verdeColor' : 'fas fa-check-circle laranjaColor',
                displayformat: format_hora,
                duesetdate: true,
                displaydue: false,
                displaydue_txt: 'Entregue em:',
                deliverydoc: true,
                deliverydoc_style: (moment(value.data_entrega,'YYYY-MM-DD HH:mm:ss') <= moment(value.prazo_entrega,'YYYY-MM-DD HH:mm:ss')) ? 'fas fa-check-circle verdeColor' : 'fas fa-check-circle laranjaColor',
                func: funcDisplay,
                displaytip: (checkCapacidade('chart_produtividade') || (typeof arrayConfigAtividades.perfil !== 'undefined' && value.id_user == arrayConfigAtividades.perfil.id_user)
                    ? titleDoc+' (por '+value.apelido+')<br>Produtividade: '+getInfoAtividadeProdutividade_text(value)+checklist
                    : titleDoc+' (por '+value.apelido+')'+checklist)
            };
    
        _return = (value.data_avaliacao != '0000-00-00 00:00:00' && value.data_envio == '0000-00-00 00:00:00')
            ? {
                date: moment(value.data_avaliacao, 'YYYY-MM-DD HH:mm:ss').format(formatDate), 
                dateTo: moment().format(formatDate), 
                dateDue: null, 
                duecounter: 'corrido', 
                countdays: true, 
                workday: false, 
                setdate: true, 
                displayicon: false,
                displayformat: format_hora,
                duesetdate: true,
                displaydue_txt: (checkRateNull ? 'Avalia\u00E7\u00E3o dispensada em:' : 'Avaliada em:'),
                displaydue: false,
                deliverydoc: true,
                ratingdoc: true,
                deliverydoc_style: 'fas fa-star starGold'+(checkRateNull ? ' starDisabled' : ''),
                func: funcDisplay,
                displaytip: (checkCapacidade('chart_produtividade') || (typeof arrayConfigAtividades.perfil !== 'undefined' && value.id_user == arrayConfigAtividades.perfil.id_user)
                    ? 'Tempo homologado: '+value.tempo_homologado+' horas<br>Produtividade: '+getInfoAtividadeProdutividade_text(value)+checklist
                    : 'Tempo homologado: '+value.tempo_homologado+' horas<br>'+checklist)
            } : _return;

        _return = (value.data_avaliacao != '0000-00-00 00:00:00' && value.data_envio != '0000-00-00 00:00:00')
            ? {
                date: moment(value.data_envio, 'YYYY-MM-DD HH:mm:ss').format(formatDate), 
                dateTo: moment().format(formatDate), 
                dateDue: null, 
                duecounter: 'corrido', 
                countdays: true, 
                workday: false, 
                setdate: true, 
                displayicon: false,
                displayformat: format_hora,
                duesetdate: true,
                displaydue_txt: __.Arquivada+' em:',
                displaydue: false,
                deliverydoc: true,
                senddoc: true,
                deliverydoc_style: 'fas fa-archive cinzaColor',
                func: funcDisplay,
                displaytip: (checkCapacidade('chart_produtividade') || (typeof arrayConfigAtividades.perfil !== 'undefined' && value.id_user == arrayConfigAtividades.perfil.id_user)
                    ? titleDoc+' (por '+value.apelido+') <br> Tempo homologado: '+value.tempo_homologado+' horas<br>Produtividade: '+getInfoAtividadeProdutividade_text(value)+checklist
                    : titleDoc+' (por '+value.apelido+') <br> Tempo homologado: '+value.tempo_homologado+' horas<br>'+checklist)
            } : _return;
    
    return _return;
}
// INSERE ICONES NA TABELA DE CONTROLE DE PROCESSOS (RECEBIDOS/GERADOS)
function updateTableProcessos() {
    var tblProcessos = $('#tblProcessosRecebidos, #tblProcessosGerados, #tblProcessosDetalhado');
    if (tblProcessos.find('tbody tr').not('.tableHeader').find('td.atividadeBoxDisplay').length == 0) {
            tblProcessos.find('tbody tr').not('.tableHeader').append('<td class="atividadeBoxDisplay" style="text-align: center;"></td>');

        if ( tblProcessos.find('thead').length > 0 ) {
            tblProcessos.find('thead tr').append('<th class="tituloControle tablesorter-header atividadeBoxDisplay"> '+__.Demandas+'</th>');
        } else {
            $('#tblProcessosRecebidos tbody tr:first, #tblProcessosGerados tbody tr:first, #tblProcessosDetalhado tbody tr:first').find('.atividadeBoxDisplay').remove();
            $('#tblProcessosRecebidos tbody tr:first, #tblProcessosGerados tbody tr:first, #tblProcessosDetalhado tbody tr:first').not('.tableHeader').append('<th class="tituloControle tablesorter-header atividadeBoxDisplay"> '+__.Demandas+'</th>');
        }
        if ($('.tabelaControle').find('tr').hasClass('tableHeader')) { 
            $('.tabelaControle').find('tr.tableHeader').each(function(){ 
                var td = $(this).find('th.tituloControle').eq(1);
                var colspan = parseInt(td.attr('colspan'));
                if (colspan == 6) {
                    td.attr('colspan',colspan+1);
                }
            });
        }
        if ($('#selectGroupTablePro').val() != '') {
            $('#selectGroupTablePro').trigger('change');
        }
        /*
        if ($('.tabelaControle').hasClass('tablesorter')) {
            if ($('#tblProcessosRecebidos, #tblProcessosGerados, #tblProcessosDetalhado').length > 0) {
                $('#tblProcessosRecebidos, #tblProcessosGerados, #tblProcessosDetalhado').trigger("destroy");
                initTableSorterHome();
            }
        }
        */
    }
}
function changeViewStatesAtiv(this_){
    var _this = $(this_);
    var data = _this.data();
    if (data.type == 'view_ativ_send') {
        setOptionsPro('panelAtividadesViewSend',_this.is(':checked'));
    } else if (data.type == 'view_ativ_self') {
        setOptionsPro('panelAtividadesViewSelf',_this.is(':checked'));
    } else if (data.type == 'view_ativ_sub') {
        setOptionsPro('panelAtividadesViewSubordinada',_this.is(':checked'));
    } else if (data.type == 'sync_unidades') {
        setOptionsPro('panelAtividadesViewSyncUnidade',_this.is(':checked'));
        perfilAtividadesSelected = $('#selInfraUnidades').val().trim();
    }
    getAtividades();
    _this.closest('td').addClass('editCellLoading');
}
/*
function changeViewStatesAtivSub(this_){
    var _this = $(this_);
    setOptionsPro('panelAtividadesViewSubordinada',_this.is(':checked'));
    getAtividades();
    _this.closest('td').addClass('editCellLoading');
}
function changeViewStatesSyncUnidade(this_){
    var _this = $(this_);
    setOptionsPro('panelAtividadesViewSyncUnidade',_this.is(':checked'));
    getAtividades();
    _this.closest('td').addClass('editCellLoading');
}
*/
function changeBaseDadosAtiv(this_){
    var _this = $(this_);
    var perfilSelected = parseInt(_this.val());
    var configBasePro = localStorageRestorePro('configBasePro');
    var dataAPI = jmespath.search(configBasePro, "[?baseTipo=='atividades'] | [?conexaoTipo=='api'||conexaoTipo=='googleapi']");
    var perfilLoginAtiv = (dataAPI && dataAPI !== null && dataAPI.length > 0 && typeof dataAPI[perfilSelected].KEY_USER !== 'undefined') 
                    ? dataAPI[perfilSelected] 
                    : false;
    if (perfilLoginAtiv) {
        urlServerAtiv = perfilLoginAtiv.URL_API;
        userHashAtiv = perfilLoginAtiv.KEY_USER;
        removeOptionsPro('perfilAtividadesSelected');
        setOptionsPro('configBaseSelectedPro_atividades',perfilSelected);
        localStorageStorePro('configBasePro_atividades', {URL_API: perfilLoginAtiv.URL_API, KEY_USER: perfilLoginAtiv.KEY_USER});
        if (userHashAtiv == '' && perfilLoginAtiv.conexaoTipo == 'googleapi') {
            setPerfilLoginGoogle(_this);
        } else {
            getAtividades();
            _this.closest('td').addClass('editCellLoading');
        }
    }
}
function updateAtividade_(this_){
    resetDialogBoxPro('dialogBoxPro');
    updateAtividade(this_);
}
function updateAtividade(this_ = false){
    if (this_) { $(this_).find('i').addClass('fa-spin'); }
    getAtividades();
}

// CRIA PAINEL DE GESTAO DE ATIVIDADES DO PROCESSO
function setAtividadesProcesso(storeAtividades = arrayAtividadesProcPro) {
    var ifrArvore = $('#ifrArvore').contents();
        ifrArvore.find('#divArvore .dateBoxIcon').remove();
    $.each(storeAtividades,function(index, value){
        var datesAtivHtml = (typeof value.data_distribuicao !== 'undefined' && value.data_distribuicao !== null) ? getDatesPreview(getConfigDateAtiv(value)) : '';
            datesAtivHtml = (datesAtivHtml != '') ? $(datesAtivHtml).find('.dateBoxIcon')[0].outerHTML : '';
        var doc_requisicao = ifrArvore.find('a#anchor'+value.id_documento_requisicao);
        if (doc_requisicao.length > 0 && datesAtivHtml != '') {
            doc_requisicao.after('<span class="dateboxDisplay" onclick="parent.actionsAtividade('+value.id_demanda+')">'+datesAtivHtml+'</span>');
        }
    });
    if (ifrArvore.find('.panelDadosArvore_atividades').length > 0) {
        $('#ifrArvore')[0].contentWindow.setAtividadesProcesso();
    }
}

// CRIA PAINEL INDIVIDUAL DE ATIVIDADES DO USUARIO
function setAtividadesUser() {
    if ($('#frmProcedimentoControlar').length > 0) {
        var unidade = arrayConfigAtivUnidade;
        var plano = jmespath.search(arrayConfigAtividades.planos,"[?id_user==`"+arrayConfigAtividades.perfil.id_user+"`] | [0]");
        if (plano !== null) {
                var target = $('#atividadesProDiv');
                target.find('.atividadesProStatus').remove();
                var htmlUser =  '<div id="atividadesStatus" class="atividadesProStatus">'+
                    '    <div id="statusUser"><canvas id="chartStatusUser" width="300" height="70"></canvas></div>'+
                    '</div>';
                target.prepend(htmlUser).css('margin-top', '70px');
                var element = $('#chartStatusUser');
                var chartStatusUser = getSingleChartTempoPlano(element, plano, plano.apelido);
                chartStatusUser.options.scales.xAxes[0].ticks.display = false;
                chartStatusUser.options.legend.display = false;
                chartStatusUser.options.title = {display: true, text: unidade.nome_unidade+' - '+unidade.sigla_unidade};
                chartStatusUser.update();
                // ajustAtividadesUser();
                setTimeout(function(){ 
                    $('#tabelaAtivPanel .filterTablePro').css('top', '120px');
                }, 500);
        }
    }
}
function ajustAtividadesUser(TimeOut = 900) {
    if (TimeOut <= 0 || parent.window.name != '') { return; }
    if ($('#tabelaAtivPanel .filterTablePro').length > 0) {
        $('#tabelaAtivPanel .filterTablePro').css('top', '120px');
    } else {
        setTimeout(function(){ 
            ajustAtividadesUser(TimeOut - 100); 
            console.log('Reload ajustAtividadesUser', TimeOut); 
        }, 500);
    }
}
// CRIA PAINEL DE GESTAO DE ATIVIDADES
function setPanelAtividades(storeAtividades = arrayAtividadesPro) {
    var statusView = ( getOptionsPro('atividadesProDiv') == 'hide' ) ? 'display:none;' : 'display: inline-table;';
    var statusIconShow = ( getOptionsPro('atividadesProDiv') == 'hide' ) ? '' : 'display:none;';
    var statusIconHide = ( getOptionsPro('atividadesProDiv') == 'hide' ) ? 'display:none;' : '';
    // var arrayProcessosUnidade = getProcessoUnidadePro();
    var viewModePanel = (getOptionsPro('panelAtividadesView')) ? getOptionsPro('panelAtividadesView') : 'Tabela';
    var countAtividade = (storeAtividades.length == 1) ? storeAtividades.length+' registro:' : storeAtividades.length+' registros:';
    var countUnidades = (storeAtividades.length > 0) ? uniqPro(jmespath.search(storeAtividades, "[?sigla_unidade].sigla_unidade")).length : 0;
    var htmlTableAtividades = (userHashAtiv == '') ? '<div class="g-signin2" data-onsuccess="onSignIn"></div>' : '<div class="dataFallback" data-text="Nenhum dado dispon\u00EDvel"></div>';
        updateTableProcessos();
    if (storeAtividades.length > 0 && (!getOptionsPro('panelHomeView') || getOptionsPro('panelHomeView') == 'Atividade')) {
        htmlTableAtividades =    '<table class="tableInfo tableZebra tableFollow tableAtividades" data-tabletype="atividades">'+
                                '   <caption class="infraCaption" style="text-align: left; margin-top: 10px;">'+countAtividade+'</caption>'+
                                '   <thead>'+
                                '       <tr class="tableHeader">'+
                                '           <th class="tituloControle" data-sorter="false" style="width: 50px;" align="center"><label class="lblInfraCheck_label" for="lnkInfraCheck_atividades" accesskey=";"></label><a class="lnkInfraCheck" id="lnkInfraCheck_atividades" onclick="setSelectAllTr(this);" onmouseover="updateTipSelectAll(this)" onmouseenter="return infraTooltipMostrar(\'Selecionar Tudo\')" onmouseout="return infraTooltipOcultar();"><img src="/infra_css/imagens/check.gif" id="imgRecebidosCheck"></a></th>'+
                                '           <th class="tituloControle" data-column-order="0" data-filter-type="proc" style="min-width: 210px;">Processo / Requisi\u00E7\u00E3o</th>'+
                                '           <th class="tituloControle tituloFilter" data-column-order="1" data-filter-type="date">Status</th>'+
                                '           <th class="tituloControle tituloFilter" data-column-order="2" data-filter-type="action" style="width: 150px;">A\u00E7\u00E3o</th>'+
                                '           <th class="tituloControle tituloFilter" data-column-order="3" data-filter-type="user">Respons\u00E1vel e Tempo Pactuado</th>'+
                                '           <th class="tituloControle tituloFilter" data-column-order="4" data-column-order="0" data-filter-type="etiqueta">Etiqueta</th>'+
                                '           <th class="tituloControle" data-column-order="5" style="width: 30%;" data-filter-type="desc">'+__.Demanda+' e Assunto</th>'+
                                '       </tr>'+
                                '   </thead>'+
                                '   <tbody>';
        $('.tabelaControle .atividadeBoxDisplay').html('');
        htmlTableAtividades +=   '   </tbody>'+
                                '</table>';
    }
    var idOrder = (getOptionsPro('orderPanelHome') && jmespath.search(getOptionsPro('orderPanelHome'), "[?name=='atividadesPro'].index | length(@)") > 0) ? jmespath.search(getOptionsPro('orderPanelHome'), "[?name=='atividadesPro'].index | [0]") : '';

    var unidadesPlanos = (typeof arrayConfigAtividades.planos !== 'undefined' && arrayConfigAtividades.planos != 0 && arrayConfigAtividades.planos.length > 0) 
                            ? uniqPro(jmespath.search(arrayConfigAtividades.planos, "[?sigla_unidade].sigla_unidade"))
                            : [];
    var countUnidadesPlanos = (typeof arrayConfigAtividades.planos !== 'undefined' && arrayConfigAtividades.planos.length > 0) ? unidadesPlanos.length : 0;
    var optionSelectUser = '';
    if (countUnidadesPlanos > 1) {
        $.each(unidadesPlanos, function(index, sigla_unidade){
            var arrayResp = jmespath.search(arrayConfigAtividades.planos, "[?sigla_unidade=='"+sigla_unidade+"']");
            optionSelectUser += '<optgroup label="'+sigla_unidade+'">';
            optionSelectUser += $.map(arrayResp, function(v){ return (getOptionsPro('selectChartAtiv') && getOptionsPro('selectChartAtiv').id_user == v.id_user) ? '<option value="'+v.id_user+'"  data-label="'+sigla_unidade+'" selected>'+v.apelido+'</option>' : '<option value="'+v.id_user+'"  data-label="'+sigla_unidade+'">'+v.apelido+'</option>' }).join('');
            optionSelectUser += '</optgroup>';
        });
    } else {
        optionSelectUser += $.map(jmespath.search(arrayConfigAtividades.planos, "[]"), function(v){ return (getOptionsPro('selectChartAtiv') && getOptionsPro('selectChartAtiv').id_user == v.id_user) ? '<option value="'+v.id_user+'"  data-label="'+unidadesPlanos+'" selected>'+v.apelido+'</option>' : '<option value="'+v.id_user+'"  data-label="'+unidadesPlanos+'">'+v.apelido+'</option>' }).join('');
    }
    var selectListUsers = '<select id="selectChartUserAtiv" data-type="user" onchange="changeChartAtiv(this)" style="max-width: 160px; float: right;" class="selectPro" onchange="changeChartAtiv(this);" data-placeholder="Filtrar por usu\u00E1rio" ><option value="0" data-label="">&nbsp;</option>'+optionSelectUser+'</select>';

    var selectListProgramas = '<select id="selectChartProgramasAtiv" data-type="programas" onchange="changeChartAtiv(this)" style="max-width: 160px; float: right;" class="selectPro" onchange="changeChartAtiv(this);"><option value="0" data-label="">&nbsp;</option></select>';

    var unidadeSuper = (typeof arrayConfigAtivUnidade !== 'undefined' && arrayConfigAtivUnidade !== null && arrayConfigAtivUnidade.hasOwnProperty('id_unidade')) ? arrayConfigAtivUnidade.id_unidade : 0;
    var unidadesWithDependecia = (typeof arrayConfigAtividades !== 'undefined' && arrayConfigAtividades !== null && arrayConfigAtividades.hasOwnProperty('unidades') && arrayConfigAtividades.unidades != 0) ? $.merge([arrayConfigAtivUnidade], jmespath.search(arrayConfigAtividades.unidades,"[?dependencia==`"+unidadeSuper+"`]")) : null;
    var optionSelectsUnidades = (unidadesWithDependecia !== null) ? getOptionSelectPerfil(unidadesWithDependecia, getOptionsPro('selectChartAtiv'), false) : '';
    var selectListUnidades = (optionSelectsUnidades == '') ? '' : '<select id="selectChartUnidadeAtiv" data-type="unidade" onchange="changeChartAtiv(this)" data-placeholder="Filtrar por unidade" style="max-width: 260px; float: right;" class="selectPro"><option value="0" data-label="">&nbsp;</option>'+optionSelectsUnidades+'</select>';
    
    var optionSelectsPerfil = (typeof arrayConfigAtividades.perfil !== 'undefined' && typeof arrayConfigAtividades.perfil.lotacoes_obj !== 'undefined') ? getOptionSelectPerfil(arrayConfigAtividades.perfil.lotacoes_obj, getOptionsPro('perfilAtividadesSelected')) : '';
    var selectListPerfilLotacao = (optionSelectsPerfil == '') ? '' : '<select data-type="perfil" onchange="changePerfilAtiv(this)" data-placeholder="Filtrar por usu\u00E1rio" style="max-width: 160px; float: right;" class="selectPro">'+optionSelectsPerfil+'</select>';

    var htmlPanelAtividades = '<div class="panelHomePro" style="display: inline-block; width: 100%;" id="atividadesPro" data-order="'+idOrder+'">'+
                            '   <div class="infraBarraLocalizacao titlePanelHome">'+
                            '       <span class="titlePanel panelHome panelHomeAtividade" style="'+(getOptionsPro('panelHomeView') == 'Atividade' || !getOptionsPro('panelHomeView') ? '' : 'display:none;')+'">'+
                            '           <i class="fas fa-check-circle verdeColor" style="margin: 0 5px; font-size: 1.1em;"></i>'+
                            '           '+__.Atividades+
                            '       </span>'+
                            (checkCapacidade('view_afastamento') ? 
                            '       <span class="titlePanel panelHome panelHomeAfastamento" style="'+(getOptionsPro('panelHomeView') == 'Afastamento' ? '' : 'display:none;')+'">'+
                            '           <i class="fas fa-luggage-cart verdeColor" style="margin: 0 5px; font-size: 1.1em;"></i>'+
                            '           Afastamentos'+
                            '       </span>': '')+
                            (checkCapacidade('view_relatorio') ? 
                            '       <span class="titlePanel panelHome panelHomeRelatorio" style="'+(getOptionsPro('panelHomeView') == 'Relatorio' ? '' : 'display:none;')+'">'+
                            '           <i class="fas fa-chart-pie verdeColor" style="margin: 0 5px; font-size: 1.1em;"></i>'+
                            '           Relat\u00F3rios'+
                            '       </span>': '')+
                            '       <span class="titlePanel panelHome panelHomeConfiguracao" style="'+(getOptionsPro('panelHomeView') == 'Configuracao' ? '' : 'display:none;')+'">'+
                            '           <i class="fas fa-cog verdeColor" style="margin: 0 5px; font-size: 1.1em;"></i>'+
                            '           Configura\u00E7\u00F5es'+
                            '       </span>'+
                            '       <a class="newLink" id="atividadesProDiv_showIcon" onclick="toggleTablePro(\'atividadesProDiv\',\'show\')" onmouseover="return infraTooltipMostrar(\'Mostrar Tabela\');" onmouseout="return infraTooltipOcultar();" style="font-size: 11pt; '+statusIconShow+'"><i class="fas fa-plus-square cinzaColor"></i></a>'+
                            '       <a class="newLink" id="atividadesProDiv_hideIcon" onclick="toggleTablePro(\'atividadesProDiv\',\'hide\')" onmouseover="return infraTooltipMostrar(\'Recolher Tabela\');" onmouseout="return infraTooltipOcultar();" style="font-size: 11pt; '+statusIconHide+'"><i class="fas fa-minus-square cinzaColor"></i></a>'+
                            '   </div>'+
                            '   <div id="atividadesProDiv" style="width: 98%; '+statusView+'">'+
                            '   	<div id="atividadesProActions" class="panelHome panelHomeAtividade" style="'+(getOptionsPro('panelHomeView') == 'Atividade' || !getOptionsPro('panelHomeView') ? '' : 'display:none;')+' position: absolute; z-index: 100; left: 200px; width: calc(100% - 220px)">'+
                            '           <div class="btn-group atividadesBtnPanel" role="group" style="float: right;margin-right: 10px;">'+
                            '              <button type="button" onclick="getPanelAtiv(this)" data-value="Tabela" class="btn btn-sm btn-light '+(getOptionsPro('panelAtividadesView') == 'Tabela' || !getOptionsPro('panelAtividadesView') ? 'active' : '')+'"><i class="fas fa-table" style="color: #888;"></i> <span class="text">Tabela</span></button>'+
                            '              <button type="button" onclick="getPanelAtiv(this)" data-value="Quadro" class="btn btn-sm btn-light '+(getOptionsPro('panelAtividadesView') == 'Quadro' ? 'active' : '')+'"><i class="fas fa-project-diagram" style="color: #888;"></i> <span class="text">Quadro</span></button>'+
                            '              <button type="button" onclick="getPanelAtiv(this)" data-value="Cronograma" class="btn btn-sm btn-light '+(getOptionsPro('panelAtividadesView') == 'Cronograma' ? 'active' : '')+'"><i class="fas fa-tasks" style="color: #888;"></i> <span class="text">Cronograma</span></button>'+
                            (checkCapacidade('chart_demandas') ?
                            '              <button type="button" onclick="getPanelAtiv(this)" data-value="Relatorio" class="btn btn-sm btn-light '+(getOptionsPro('panelAtividadesView') == 'Relatorio' ? 'active' : '')+'"><i class="fas fa-chart-line" style="color: #888;"></i> <span class="text">Painel</span></button>'
                            : '')+
                            '           </div>'+
                            '           '+selectListPerfilLotacao+
                            '           <a class="newLink iconAtividade_update" onclick="updateAtividade_(this)" onmouseover="return infraTooltipMostrar(\'Atualizar Informa\u00E7\u00F5es\');" onmouseout="return infraTooltipOcultar();" style="margin: 0;font-size: 14pt;float: right;">'+
                            '               <i class="fas fa-sync-alt"></i>'+
                            '           </a>'+
                            '   	</div>'+
                            (checkCapacidade('view_afastamento') ? 
                            '   	<div id="afastamentosProActions" class="panelHome panelHomeAfastamento" style="'+(getOptionsPro('panelHomeView') == 'Afastamento' ? '' : 'display:none;')+' position: absolute; z-index: 100; left: 250px; width: calc(100% - 270px)">'+
                            '           <div class="btn-group" role="group" style="float: right;margin-right: 10px;">'+
                            '              <button type="button" onclick="getPanelAfast(this)" data-value="Cronograma" class="btn btn-sm btn-light '+(getOptionsPro('panelAfastamentosView') == 'Cronograma' || !getOptionsPro('panelAfastamentosView') ? 'active' : '')+'">Cronograma</button>'+
                            '              <button type="button" onclick="getPanelAfast(this)" data-value="Tabela" class="btn btn-sm btn-light '+(getOptionsPro('panelAfastamentosView') == 'Tabela' ? 'active' : '')+'">Tabela</button>'+
                            '           </div>'+
                            '           '+selectListPerfilLotacao+
                            '           <a class="newLink iconAtividade_update" onclick="updateAtividade_(this)" onmouseover="return infraTooltipMostrar(\'Atualizar Informa\u00E7\u00F5es\');" onmouseout="return infraTooltipOcultar();" style="margin: 0;font-size: 14pt;float: right;">'+
                            '               <i class="fas fa-sync-alt"></i>'+
                            '           </a>'+
                            (checkCapacidade('save_afastamento') ?
                            '           <a class="newLink iconAfastamento_add" onclick="saveAfastamento(this)" onmouseover="return infraTooltipMostrar(\'Adicionar Afastamento\');" onmouseout="return infraTooltipOcultar();" style="margin: 0;font-size: 14pt;">'+
                            '               <i class="fas fa-user-clock"></i>'+
                            '           </a>'+
                            '' : '')+
                            (checkCapacidade('delete_afastamento') ?
                            '           <a class="newLink iconAfastamento_remove" onclick="removeAfastamento(this)" onmouseover="return infraTooltipMostrar(\'Remover Afastamentos\');" onmouseout="return infraTooltipOcultar();" style="margin: 0;font-size: 14pt; display: none">'+
                            '                   <span class="fa-layers fa-fw">'+
                            '                       <i class="fas fa-trash-alt"></i>'+
                            '                       <span class="fa-layers-counter">1</span>'+
                            '                   </span>'+
                            '           </a>'+
                            '' : '')+
                            '           <span class="modulesActions">'+
                            '               <a class="newLink iconBoxModules iconAtividade_view" onclick="changePanelHome(this)" style="font-size: 14pt;" data-value="Atividade">'+
                            '                  <i class="fas fa-check-circle cinzaColor"></i>'+
                            '                  <span style="font-size: 80%;color: #666;vertical-align: text-top;"> '+__.Atividades+'</span>'+
                            '               </a>'+
                            '               <a class="newLink iconBoxModules iconConfiguracao_view" onmouseover="return infraTooltipMostrar(\'Configura\u00E7\u00F5es\');" onmouseout="return infraTooltipOcultar();" onclick="changePanelHome(this)" style="font-size: 14pt;" data-value="Configuracao">'+
                            '                  <i class="fas fa-cog cinzaColor"></i>'+
                            '               </a>'+
                            (checkCapacidade('view_relatorio') ? 
                            '               <a class="newLink iconBoxModules iconRelatorio_view" onmouseover="return infraTooltipMostrar(\'Relat\u00F3rios\');" onmouseout="return infraTooltipOcultar();" onclick="changePanelHome(this)" style="font-size: 14pt;" data-value="Relatorio">'+
                            '                  <i class="fas fa-chart-pie cinzaColor"></i>'+
                            '               </a>' : '')+
                            '           </span>'+
                            '   	</div>': '')+
                            '   	<div id="configuracoesProActions" class="panelHome panelHomeConfiguracao" style="'+(getOptionsPro('panelHomeView') == 'Configuracao' ? '' : 'display:none;')+' position: absolute; z-index: 100; left: 240px; width: calc(100% - 260px)">'+
                            '           '+selectListPerfilLotacao+
                            '           <a class="newLink iconAtividade_update" onclick="updateAtividade_(this)" onmouseover="return infraTooltipMostrar(\'Atualizar Informa\u00E7\u00F5es\');" onmouseout="return infraTooltipOcultar();" style="margin: 0;font-size: 14pt;float: right;">'+
                            '               <i class="fas fa-sync-alt"></i>'+
                            '           </a>'+
                            (checkCapacidade('config_atividades') ? getHtmlActionsConfig('atividades') : '')+
                            (checkCapacidade('config_planos') || checkCapacidade('config_self_planos') ? getHtmlActionsConfig('planos') : '')+
                            (checkCapacidade('config_programas') ? getHtmlActionsConfig('programas') : '')+
                            (checkCapacidade('config_users') ? getHtmlActionsConfig('users') : '')+
                            (checkCapacidade('config_unidades') ? getHtmlActionsConfig('unidades') : '')+
                            (checkCapacidade('config_tipos_documentos') ? getHtmlActionsConfig('tipos_documentos') : '')+
                            (checkCapacidade('config_tipos_justificativas') ? getHtmlActionsConfig('tipos_justificativas') : '')+
                            (checkCapacidade('config_tipos_modalidades') ? getHtmlActionsConfig('tipos_modalidades') : '')+
                            (checkCapacidade('config_tipos_requisicoes') ? getHtmlActionsConfig('tipos_requisicoes') : '')+
                            (checkCapacidade('config_nomenclaturas') ? getHtmlActionsConfig('nomenclaturas') : '')+
                            (checkCapacidade('config_entidades') ? getHtmlActionsConfig('entidades') : '')+
                            '           <span class="modulesActions">'+
                            '               <a class="newLink iconBoxModules iconAtividade_view" onclick="changePanelHome(this)" style="font-size: 14pt;" data-value="Atividade">'+
                            '                  <i class="fas fa-check-circle cinzaColor"></i>'+
                            '                  <span style="font-size: 80%;color: #666;vertical-align: text-top;"> '+__.Atividades+'</span>'+
                            '               </a>'+
                            (checkCapacidade('view_afastamento') ? 
                            '               <a class="newLink iconBoxModules iconAfastamento_view" onmouseover="return infraTooltipMostrar(\'Afastamentos\');" onmouseout="return infraTooltipOcultar();" onclick="changePanelHome(this)" style="font-size: 14pt;" data-value="Afastamento">'+
                            '                  <i class="fas fa-luggage-cart cinzaColor"></i>'+
                            '               </a>' : '')+
                            (checkCapacidade('view_relatorio') ? 
                            '               <a class="newLink iconBoxModules iconRelatorio_view" onmouseover="return infraTooltipMostrar(\'Relat\u00F3rios\');" onmouseout="return infraTooltipOcultar();" onclick="changePanelHome(this)" style="font-size: 14pt;" data-value="Relatorio">'+
                            '                  <i class="fas fa-chart-pie cinzaColor"></i>'+
                            '               </a>' : '')+
                            '           </span>'+
                            '   	</div>'+
                            '   	<div id="relatoriosProActions" class="panelHome panelHomeRelatorio" style="'+(getOptionsPro('panelHomeView') == 'Relatorio' ? '' : 'display:none;')+' position: absolute; z-index: 100; left: 240px; width: calc(100% - 260px)">'+
                            '           <div class="btn-group" role="group" style="float: right;margin-right: 10px;">'+
                            '              <button type="button" onclick="getPanelRelatorio(this)" data-value="Tabela" class="btn btn-sm btn-light '+(getOptionsPro('panelRelatoriosView') == 'Tabela' || !getOptionsPro('panelRelatoriosView') ? 'active' : '')+'">Tabela</button>'+
                            '              <button type="button" onclick="getPanelRelatorio(this)" data-value="Grafico" class="btn btn-sm btn-light '+(getOptionsPro('panelRelatoriosView') == 'Grafico' ? 'active' : '')+'">Gr\u00E1fico</button>'+
                            '           </div>'+
                            '           '+selectListPerfilLotacao+
                            '           <a class="newLink iconRelatorio_update" onclick="updateAtividade_(this)" onmouseover="return infraTooltipMostrar(\'Atualizar Informa\u00E7\u00F5es\');" onmouseout="return infraTooltipOcultar();" style="margin: 0;font-size: 14pt;float: right;">'+
                            '               <i class="fas fa-sync-alt"></i>'+
                            '           </a>'+
                            '           <span class="modulesActions">'+
                            '               <a class="newLink iconBoxModules iconAtividade_view" onclick="changePanelHome(this)" style="font-size: 14pt;" data-value="Atividade">'+
                            '                  <i class="fas fa-check-circle cinzaColor"></i>'+
                            '                  <span style="font-size: 80%;color: #666;vertical-align: text-top;"> '+__.Atividades+'</span>'+
                            '               </a>'+
                            (checkCapacidade('view_afastamento') ? 
                            '               <a class="newLink iconBoxModules iconAfastamento_view" onmouseover="return infraTooltipMostrar(\'Afastamentos\');" onmouseout="return infraTooltipOcultar();" onclick="changePanelHome(this)" style="font-size: 14pt;" data-value="Afastamento">'+
                            '                  <i class="fas fa-luggage-cart cinzaColor"></i>'+
                            '               </a>' : '')+
                            '               <a class="newLink iconBoxModules iconConfiguracao_view" onmouseover="return infraTooltipMostrar(\'Configura\u00E7\u00F5es\');" onmouseout="return infraTooltipOcultar();" onclick="changePanelHome(this)" style="font-size: 14pt;" data-value="Configuracao">'+
                            '                  <i class="fas fa-cog cinzaColor"></i>'+
                            '               </a>'+
                            '           </span>'+
                            '   	</div>'+
                            '   	<div class="panelInfoHome panelInfoHomeAtividade" style="'+(getOptionsPro('panelHomeView') == 'Atividade' || !getOptionsPro('panelHomeView') ? '' : 'display:none;')+'">'+
                            '   	    <div id="tabelaAtivPanel" class="tabelaPanelScroll" style="margin-top: 10px;">'+
                            '               '+htmlTableAtividades+
                            '   	    </div>'+
                            '   	    <div id="ganttAtivPanel" class="ganttAtividade" style="max-width: 800px; display:none; padding-top: 20px; position: relative;"><div class="dataFallback" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                            '   	    <div id="kanbanAtivPanel" class="kanbanAtividade" style="display:none; padding-top: 20px; position: relative;"><div class="dataFallback" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                            '   	    <div id="chartAtivPanel" class="chartAtividade" style="display:none; padding-top: 20px; position: relative;">'+
                            '   	        <div id="chartAtivActions" class="chartAtivPanelDiv" style="width: 100%;">'+
                            '   	            '+selectListUsers+selectListUnidades+
                            '   	        </div>'+
                            '   	        <div class="line-section">Distribui\u00E7\u00E3o</div>'+
                            '   	        <div style="position: relative;">'+
                            '   	            <div class="chartSection tabelaPanelScroll" id="chartSectionDistribuicao" style="height: 500px;">'+
                            '   	                <div id="chartAtivPanelDemandas" class="chartAtivPanelDiv" style="width: 50%; float: left;"><div class="dataFallback" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                            '   	                <div id="chartAtivPanelPlanos" class="chartAtivPanelDiv" style="width: 50%; float: right;"><div class="dataFallback" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                            '                   </div>'+
                            '               </div>'+
                            '   	        <div class="line-section">Entregas</div>'+
                            '   	        <div id="chartAtivPanelEstoque" class="chartAtivPanelDiv" style="width: 23%; float: left; clear: both;"><div class="dataFallback" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                            '   	        <div id="chartAtivPanelStatusEntregas" class="chartAtivPanelDiv" style="width: 23%; float: left;"><div class="dataFallback" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                            '   	        <div id="chartAtivPanelProcessuais" class="chartAtivPanelDiv" style="width: 23%; float: left;"><div class="dataFallback" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                            '   	        <div id="chartAtivPanelMediaTempo" class="chartAtivPanelDiv" style="width: 31%; float: left;"><div class="dataFallback" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                            '   	        <div class="line-section">Documentos Produzidos</div>'+
                            '   	        <div id="chartAtivPanelRequisicoes" class="chartAtivPanelDiv" style="width: 25%; float: left; clear: both;"><div class="dataFallback" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                            '   	        <div id="chartAtivPanelDocumentos" class="chartAtivPanelDiv" style="width: 25%; float: left;"><div class="dataFallback" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                            (checkCapacidade('chart_produtividade') ? 
                            '   	        <div class="line-section">Produtividade</div>'+
                            '   	        <div id="chartAtivPanelProdutividade" class="chartAtivPanelDiv" style="width: 45%; float: left; clear: both;"><div class="dataFallback" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                            '   	        <div id="chartAtivPanelProdutividadeMes" class="chartAtivPanelDiv" style="width: 45%; float: right;"><div class="dataFallback" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                            '' : '')+
                            '   	    </div>'+
                            '   	</div>'+
                            (checkCapacidade('view_afastamento') ? 
                            '   	<div class="panelInfoHome panelInfoHomeAfastamento" style="'+(getOptionsPro('panelHomeView') == 'Afastamento' ? '' : 'display:none;')+'">'+
                            '   	    <div id="ganttAfastamentoPanel" class="afastamentoPanelPro" style="max-width: 800px; display:none; padding-top: 20px; position: relative;"><div class="dataFallback" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                            '   	    <div id="tableAfastamentoPanel" class="tabelaPanelScroll afastamentoPanelPro" style="margin-top: 10px; display:none !important;"><div class="dataFallback" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                            '   	    <div id="reportAfastamentoPanel" class="afastamentoPanelPro" style="margin-top: 10px; display:none !important;"><div class="dataFallback" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                            '   	</div>' : '')+
                            (checkCapacidade('view_relatorio') ? 
                            '   	<div class="panelInfoHome panelInfoHomeRelatorio" style="'+(getOptionsPro('panelHomeView') == 'Relatorio' ? '' : 'display:none;')+'">'+
                            '   	    <div id="tableRelatorioPanel" class="relatorioPanelPro" style="margin-top: 10px; display:none !important;"><div class="dataFallback" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                            '   	    <div id="chartRelatorioPanel" class="relatorioPanelPro" style="display:none; padding-top: 20px; position: relative;"><div class="dataFallback" data-text="Em constru\u00E7\u00E3o"></div></div>'+
                            '   	</div>' : '')+
                            '   	<div class="panelInfoHome panelInfoHomeConfiguracao" style="border:none; '+(getOptionsPro('panelHomeView') == 'Configuracao' ? '' : 'display:none;')+'">'+
                            '   	</div>'+
                            '   </div>'+
                            '</div>';
    if ( $('#atividadesPro').length > 0 ) { $('#atividadesPro').remove(); }
    orderDivPanel(htmlPanelAtividades, idOrder, 'atividadesPro');

    if (getOptionsPro('panelSortPro')) {
        initSortDivPanel();
    }

    if (!getOptionsPro('panelHeight_atividadesPro') && $('#tabelaAtivPanel').height() > 800) { setOptionsPro('panelHeight_atividadesPro', 800) }
    if (!getOptionsPro('panelHomeView') || getOptionsPro('panelHomeView') == 'Atividade') {  
        initFunctionsPanelAtiv();
    }
    getRowsPanelAtividades(storeAtividades, $('#tabelaAtivPanel table tbody'));
    initPanelAtividadesView();
}
function getRowsPanelAtividades(storeAtividades, target) {
    function getRowsPanelAtividades(value, index) {
        var tagsAtiv = (typeof value.etiquetas !== 'undefined' && value.etiquetas !== null) ? value.etiquetas.join(';') : '';
        var tagsAtivHtml = (typeof value.etiquetas !== 'undefined' && value.etiquetas !== null) ? $.map(storeAtividades[index].etiquetas, function (i) { return getHtmlEtiqueta(i,'ativ') }).join('') : '';
        var tagsAtivClass = (typeof value.etiquetas !== 'undefined' && value.etiquetas !== null) ? $.map(storeAtividades[index].etiquetas, function (i) { return 'tagTableName_'+removeAcentos(i).replace(/\ /g, '').toLowerCase(); }).join(' ') : '';   
        var tagsAtivPriority = (tagsAtivClass.indexOf('tagTableName_importante') !== -1) ? 'background-color: #fffcd7;' : '';
            tagsAtivPriority = (tagsAtivClass.indexOf('tagTableName_urgente') !== -1) ? 'background-color: #f9e2e0;' : tagsAtivPriority;
        var tagPacto =  getTagTempoPactuadoAtiv(value);
        var timerAtiv = (value.data_inicio != '0000-00-00 00:00:00' && value.data_entrega == '0000-00-00 00:00:00')
                        ? getTagTempoDecorridoAtiv(value, false)
                        : (value.data_entrega != '0000-00-00 00:00:00' && value.data_avaliacao == '0000-00-00 00:00:00') 
                            ? getTagTempoDespendidoAtiv(value, false)
                            : '';
        var datesAtivHtml = (typeof value.data_distribuicao !== 'undefined' && value.data_distribuicao !== null) ? getDatesPreview(getConfigDateAtiv(value)) : '';
        var tagDatesAtivClass = (datesAtivHtml != '') ? 'tagTableName_'+$(datesAtivHtml).data('tagname') : '';
        var nameUser = (value.id_user != 0 ? value.apelido : 'N\u00E3o atribu\u00EDdo');
        var tagName_user = removeAcentos(nameUser).replace(/\ /g, '').toLowerCase();
        var tagName_unidade = (countUnidades > 1) ? 'tagTableName_'+removeAcentos(value.sigla_unidade).replace(/\ /g, '').toLowerCase() : '';
        var iconAtivEditHtml = actionsAtividade(value.id_demanda, 'icon');
        var ativEditHtml = (iconAtivEditHtml && iconAtivEditHtml.hasOwnProperty('icon')) ? '<a class="newLink" style="font-size: 9pt;" onclick="actionsAtividade('+value.id_demanda+')"><i class="'+actionsAtividade(value.id_demanda, 'icon').icon+'" style="font-size: 100%;"></i> '+actionsAtividade(value.id_demanda, 'icon').name+'</a>' : '';
        var checklistHtml = (value.checklist && value.checklist.length > 0) ? getInfoAtividadeChecklist(value, 'icon') : '';

        var htmlTableAtividades =   '       <tr data-tagname="SemGrupo" data-index="'+value.id_demanda+'" class="tagTableName_'+tagName_user+' '+tagName_unidade+' '+tagsAtivClass+' '+tagDatesAtivClass+'" style="'+tagsAtivPriority+'">'+
                                    '           <td align="center">'+
                                    '               <input type="checkbox" onclick="followSelecionarItens(this)" id="atividadePro_'+value.id_demanda+'" name="atividadePro" value="'+value.id_procedimento+'"></td>'+
                                    '           <td align="left">'+getHtmlLinkRequisicao(value)+
                                    '           </td>'+
                                    '           <td align="left">'+
                                    '               <span class="info_dates_fav">'+datesAtivHtml+'</span>'+
                                    '           </td>'+
                                    '           <td align="left">'+
                                    '               '+ativEditHtml+
                                    '           </td>'+
                                    '           <td align="left">'+
                                    '               <span class="info_tags_follow info_tags_user">'+getHtmlEtiquetaUnidade(value)+'</span>'+tagPacto+timerAtiv+
                                    '               '+checklistHtml+
                                    '           </td>'+
                                    '           <td align="left" class="tdfav_tags '+((tagsAtivHtml.trim() == '' && checkCapacidade('edit_etiqueta') ) ? 'info_tags_follow_empty' : '')+'" data-etiqueta-mode="ativ">'+
                                    '               <span class="info_tags_follow">'+tagsAtivHtml+
                                    '               </span>'+(!checkCapacidade('edit_etiqueta') ? '' : 
                                    '               <span class="info_tags_follow_txt" style="display:none">'+
                                    '                   <input value="'+tagsAtiv+'" class="atividadeTagsPro">'+
                                    '               </span>'+
                                    '               <a class="newLink followLink followLinkTags followLinkTagsEdit" onclick="showFollowEtiqueta(this, \'show\', \'ativ\')" onmouseover="return infraTooltipMostrar(\'Editar etiqueta\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-pencil-alt" style="font-size: 100%;"></i></a>'+
                                    '               <a class="newLink followLink followLinkTags followLinkTagsAdd" onclick="showFollowEtiqueta(this, \'show\', \'ativ\')" onmouseover="return infraTooltipMostrar(\'Adicionar etiqueta\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-tags" style="font-size: 100%;"></i></a>')+
                                    '           </td>'+
                                    '           <td class="tdfav_desc">'+
                                    '               <div style="color: #666;">'+(value.nome_atividade ? value.nome_atividade : '')+'</div>'+
                                    '               <div>'+
                                    '                   '+(!checkCapacidade('edit_assunto') ? '' : '<span class="info_txt" style="display:none"><input onblur="saveFollowDesc(this, \'ativ\')" onkeypress="keyFollowDesc(event, \'ativ\')" value="'+value.assunto+'"></span>')+
                                    '                   <span class="info" style="font-weight: bold; display: inline-block; padding-top: 5px;">'+value.assunto+'</span>'+
                                    '                   '+(!checkCapacidade('edit_assunto') ? '' : '<a class="newLink followLink followLinkDesc" onclick="editFollowDesc(this, \'ativ\')" onmouseover="return infraTooltipMostrar(\'Editar '+__.assunto+'\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-pencil-alt" style="font-size: 100%;"></i></a>')+
                                    '               </div>'+
                                    (value && value.observacao_gerencial !== null && value.observacao_gerencial != '' ? 
                                    '               <div class="inlineAlert"><i class="fas fa-comment-alt" style="color: #7baaf7;"></i> '+value.observacao_gerencial+'</div>'+
                                    '' : '')+
                                    (value && value.observacao_tecnica !== null && value.observacao_tecnica != '' ? 
                                    '               <div class="inlineAlert"><i class="fas fa-reply-all" style="color: #7baaf7;"></i> '+value.observacao_tecnica+'</div>'+
                                    '' : '')+
                                    '           </td>'+
                                    '       </tr>';
        if (datesAtivHtml != '') {
            var iconDateAtiv = ($(datesAtivHtml).find('.dateBoxIcon').length > 0) ? $(datesAtivHtml).find('.dateBoxIcon').attr('onclick', 'actionsAtividade('+value.id_demanda+')')[0].outerHTML : '';
            $('.tabelaControle').find('#P'+value.id_procedimento).each(function(index){ 
                if (iconDateAtiv != '') { $(this).find('.atividadeBoxDisplay').append('<span class="dateboxDisplay" data-prazo-entrega="'+value.prazo_entrega+'">'+iconDateAtiv+'</span>') }
            });
        }
        target.append(htmlTableAtividades);
    }
    function initRowsPanelAtividades(index) {
        target.trigger('updateAll');
        console.log('endLoop rowsPanelAtividades', index);
        initFunctionsPanelAtiv();
        // setTimeout(function(){ }, 500);
    }
    var countUnidades = (storeAtividades.length > 0) ? uniqPro(jmespath.search(storeAtividades, "[?sigla_unidade].sigla_unidade")).length : 0;
    var t = new Date();
    var limit = 100;
    storeAtividades.forEach(function (value, index) {
        if (index >= limit) {
            setTimeout(function(){
                getRowsPanelAtividades(value, index);
                if (storeAtividades.length-1 == index || index % 100 == 0) { initRowsPanelAtividades(index) }
            }, 50*index);
        } else {
            getRowsPanelAtividades(value, index);
        }
    });
    if (storeAtividades.length <= limit) { initRowsPanelAtividades(100) }
}
function getHtmlLinkRequisicao(value, onclick = false) {
    var linkDoc = (value.data_entrega == '0000-00-00 00:00:00') 
                    ? url_host+'?acao=procedimento_trabalhar&id_procedimento='+value.id_procedimento+'&id_documento='+value.id_documento_requisicao 
                    : url_host+'?acao=procedimento_trabalhar&id_procedimento='+value.id_procedimento+'&id_documento='+value.id_documento_entregue;
    var documentoTips = (typeof value.documento_sei !== 'undefined' && value.documento_sei !== null && parseInt(value.documento_sei) != 0) ? value.nome_documento+' ('+value.documento_sei+')' : value.nome_documento;
    var requisicaoTips = (typeof value.requisicao_sei !== 'undefined' && value.requisicao_sei !== null && parseInt(value.requisicao_sei) != 0) ? value.nome_requisicao+' ('+value.requisicao_sei+')' : value.nome_requisicao;
        requisicaoTips = (value.data_entrega == '0000-00-00 00:00:00') ? 'Requisi\u00E7\u00E3o: '+requisicaoTips : 'Entrega: '+documentoTips;
    var iconProcesso = (arrayProcessosUnidade && $.inArray(value.processo_sei, arrayProcessosUnidade) == -1 ) ? 'fas fa-folder' : 'far fa-folder-open';
    var tipsProcesso = (arrayProcessosUnidade && $.inArray(value.processo_sei, arrayProcessosUnidade) == -1 ) ? 'Processo fechado nesta unidade' : 'Processo aberto nesta unidade';
        tipsProcesso = (!arrayProcessosUnidade) ? '' : tipsProcesso;
    var iconRequisicao = (value.data_entrega == '0000-00-00 00:00:00') ? 'far fa-list-alt' : 'fas fa-list-alt'; 
    var onclickLink = (onclick) ? 'onclick="openLinkNewTab(\''+linkDoc+'\')"' : '';
    var newTabLink = (onclick) ? '' : '<a class="newLink followLink followLinkNewtab" href="'+linkDoc+'" onmouseover="return infraTooltipMostrar(\'Abrir em nova aba\');" onmouseout="return infraTooltipOcultar();" target="_blank"><i class="fas fa-external-link-alt" style="font-size: 90%; text-decoration: underline;"></i></a>';
    var processoHtml = (value.processo_sei !== null && value.processo_sei != '')
                          ? ''+
                            '               '+newTabLink+
                            '               <a style="text-decoration: underline; color: #00c;" href="'+linkDoc+'" '+onclickLink+'>'+
                            '                   <i class="'+iconProcesso+'" style="color: #00c; text-decoration: underline;" onmouseover="return infraTooltipMostrar(\''+tipsProcesso+'\');" onmouseout="return infraTooltipOcultar();"></i> '+
                            '                   <span style="color: #00c;" onmouseover="return infraTooltipMostrar(\''+requisicaoTips+'\');" onmouseout="return infraTooltipOcultar();"></i> '+
                            '                       '+value.processo_sei+
                            '                       '+(onclick ? '<i class="fas fa-external-link-alt" style="color: #00c;font-size: 80%;text-decoration: underline;vertical-align: text-top;"></i>' : '')+
                            '                   </span>'+
                            '               </a>'+
                            ''
                          : '               <a style="text-decoration: underline; color: #00c;" '+onclickLink+'>'+
                            '                   <i class="'+iconRequisicao+'" style="color: #00c; text-decoration: underline;" onmouseover="return infraTooltipMostrar(\''+requisicaoTips+'\');" onmouseout="return infraTooltipOcultar();"></i> '+
                            '                   <span style="color: #00c;" onmouseover="return infraTooltipMostrar(\''+requisicaoTips+'\');" onmouseout="return infraTooltipOcultar();"></i> '+
                            '                       '+value.nome_requisicao+(value.requisicao_sei ? ' '+value.requisicao_sei : '')+
                            '                   </span>'+
                            '               </a>';
        processoHtml = (value.id_tipo_requisicao == 0) ? '' : processoHtml;
    return processoHtml;
}
function getHtmlActionsConfig(type) {
    var param = (type == 'atividades') ? {name_new: 'Novo Tipo de '+__.Atividade, name: 'Tipo de '+__.Atividade, icon: 'fas fa-clipboard-list', index: 1} : '';
        param = (type == 'planos') ? {name_new: 'Novo Plano de Trabalho', name: 'Plano de Trabalho', icon: 'fas fa-handshake', index: 2} : param;
        param = (type == 'programas') ? {name_new: 'Novo Programa de Gest\u00E3o', name: 'Programa de Gest\u00E3o', icon: 'fas fa-cubes', index: 3} : param;
        param = (type == 'users') ? {name_new: 'Novo Usu\u00E1rio', name: 'Usu\u00E1rios', icon: 'fas fa-users', index: 4} : param;
        param = (type == 'unidades') ? {name_new: 'Nova Unidade', name: 'Unidades', icon: 'fas fa-briefcase', index: 5} : param;
        param = (type == 'tipos_documentos') ? {name_new: 'Novo Tipo de Documento', name: 'Tipo de Documento', icon: 'fas fa-file-alt', index: 6} : param;
        param = (type == 'tipos_justificativas') ? {name_new: 'Novo Tipo de Justificativa', name: 'Tipo de Justificativa', icon: 'fas fa-star', index: 7} : param;
        param = (type == 'tipos_modalidades') ? {name_new: 'Novo Tipo de Modalidade', name: 'Tipo de Modalidade', icon: 'fas fa-wrench', index: 8} : param;
        param = (type == 'tipos_requisicoes') ? {name_new: 'Novo Tipo de Requisi\u00E7\u00E3o', name: 'Tipo de Requisi\u00E7\u00E3o', icon: 'fas fa-inbox', index: 9} : param;
        param = (type == 'nomenclaturas') ? {name_new: 'Nova Nomenclatura', name: 'Nomenclatura', icon: 'fas fa-ad', index: 10} : param;
        param = (type == 'entidades') ? {name_new: 'Nova Entidade', name: 'Entidades', icon: 'fas fa-university', index: 11} : param;

    var html =  '           <span class="actionsConfig_'+type+' actionsConfig_icons" '+(getOptionsPro('tabsPanelConfigActiveTabs') != param.index ? 'style="display:none"' : '')+'>'+
                (checkCapacidade('config_new_'+type) ? 
                '               <a class="newLink iconConfig_add iconConfig_confirm" data-icon="'+param.icon+' icon-parent" onclick="newConfig_(this)" data-type="'+type+'" data-mode="add" onmouseover="return infraTooltipMostrar(\'Adicionar '+param.name_new+'\');" onmouseout="return infraTooltipOcultar();" style="margin: 0;font-size: 14pt;">'+
                '                   <span class="fa-layers fa-fw">'+
                '                       <i class="'+param.icon+' icon-parent"></i>'+
                '                       <i class="fas fa-plus-circle fa-layers-counter fa-layers-bottom"></i>'+
                '                   </span>'+
                '               </a>'+
                '' : '')+
                ( type == 'atividades' && checkCapacidade('config_update_pgr') ? 
                '               <a class="newLink iconConfig_approve" data-type="'+type+'" data-mode="approve" data-id="0" onclick="approveConfig(this)" onmouseover="return infraTooltipMostrar(\'Homologar '+param.name+'\');" onmouseout="return infraTooltipOcultar();" style="margin: 0;font-size: 14pt; display: none">'+
                '                   <span class="fa-layers fa-fw">'+
                '                       <i class="fas fa-thumbs-up azulColor"></i>'+
                '                       <span class="fa-layers-counter">1</span>'+
                '                   </span>'+
                '               </a>'+
                '               <a class="newLink iconConfig_disapprove" data-type="'+type+'" data-mode="disapprove" data-id="0" onclick="approveConfig(this)" onmouseover="return infraTooltipMostrar(\'Cancelar a Homologa&ccedil;&atilde;o de '+param.name+'\');" onmouseout="return infraTooltipOcultar();" style="margin: 0;font-size: 14pt; display: none">'+
                '                   <span class="fa-layers fa-fw">'+
                '                       <i class="fas fa-thumbs-down vermelhoColor"></i>'+
                '                       <span class="fa-layers-counter">1</span>'+
                '                   </span>'+
                '               </a>'+
                '' : '')+
                ( type != 'users' || (type == 'users' && checkCapacidade('config_users_all')) ? 
                '               <a class="newLink iconConfig_remove" data-type="'+type+'" data-mode="disable" data-id="0" onclick="disableConfig(this)" onmouseover="return infraTooltipMostrar(\'Desativar '+param.name+'\');" onmouseout="return infraTooltipOcultar();" style="margin: 0;font-size: 14pt; display: none">'+
                '                   <span class="fa-layers fa-fw">'+
                '                       <i class="fas fa-times-circle"></i>'+
                '                       <span class="fa-layers-counter">1</span>'+
                '                   </span>'+
                '               </a>'+
                '               <a class="newLink iconConfig_reactive" data-type="'+type+'" data-mode="reactive" data-id="0" onclick="reactiveConfig(this)" onmouseover="return infraTooltipMostrar(\'Reativar '+param.name+'\');" onmouseout="return infraTooltipOcultar();" style="margin: 0;font-size: 14pt; display: none">'+
                '                   <span class="fa-layers fa-fw">'+
                '                       <i class="fas fa-undo-alt"></i>'+
                '                       <span class="fa-layers-counter">1</span>'+
                '                   </span>'+
                '               </a>'+
                (checkCapacidade('config_new_'+type) ? 
                '               <a class="newLink iconConfig_clone" data-type="'+type+'" data-mode="clone" data-id="0" onclick="cloneConfig(this)" onmouseover="return infraTooltipMostrar(\'Duplicar '+param.name+'\');" onmouseout="return infraTooltipOcultar();" style="margin: 0;font-size: 14pt; display: none">'+
                '                   <span class="fa-layers fa-fw">'+
                '                       <i class="fas fa-copy"></i>'+
                '                       <span class="fa-layers-counter">1</span>'+
                '                   </span>'+
                '               </a>'+
                '' : '')+
                '' : '')+
                '           </span>';
    return html;
}
function getHtmlEtiquetaUnidade(value) {
    var nameUser = (value.id_user != 0 ? value.apelido : 'N\u00E3o atribu\u00EDdo');
    var tagName_user = removeAcentos(nameUser).replace(/\ /g, '').toLowerCase();

    var listUnidades = jmespath.search(arrayAtividadesPro, "[?sigla_unidade].sigla_unidade");
        listUnidades = (listUnidades !== null) ? uniqPro(listUnidades) : [];
    var tagName_unidade = (listUnidades.length > 1) ? removeAcentos(value.sigla_unidade).replace(/\ /g, '').toLowerCase() : '';

    var htmlTagUnidade =  (listUnidades.length > 1)
                    ?   '<span data-colortag="#bfd5e8" data-type="user" style="background-color: #bfd5e8;" data-tagname="'+tagName_unidade+'" data-textcolor="black" data-icontag="briefcase" class="tag_text tagTableText_'+tagName_unidade+'" onclick="parent.filterTagView(this)">'+
                        '    <i data-colortag="#406987" class="fas fa-briefcase" style="font-size: 90%; margin: 0px 2px; color: #406987;"></i> '+value.sigla_unidade+
                        '</span>' 
                    :   '';

    var htmlTags =      '               <span class="info_tags_follow info_tags_user">'+htmlTagUnidade+
                        '                   <span data-colortag="#bfd5e8" data-type="user" data-tagname="'+tagName_user+'" data-textcolor="black" data-icontag="user" style="background-color: #bfd5e8;" class="tag_text tagTableText_'+tagName_user+'" onclick="parent.filterTagView(this)">'+
                        '                       <i data-colortag="#406987" class="fas fa-user" style="font-size: 90%; margin: 0px 2px; color: #406987;"></i> '+nameUser+
                        '                   </span>'+
                        '               </span>';
    return htmlTags;
}
function initPanelAtividadesView() {
    var viewModePanel = (getOptionsPro('panelAtividadesView')) ? getOptionsPro('panelAtividadesView') : 'Tabela';
    $('#atividadesProActions').find('button[data-value="'+viewModePanel+'"].btn').trigger('click');

    if (checkCapacidade('view_afastamento')) {
        var viewModePanel = (getOptionsPro('panelAfastamentosView')) ? getOptionsPro('panelAfastamentosView') : 'Cronograma';
        $('#afastamentosProActions').find('button[data-value="'+viewModePanel+'"].btn').trigger('click');
    } else if (checkCapacidade('view_relatorio')) {
        var viewModePanel = (getOptionsPro('panelRelatoriosView')) ? getOptionsPro('panelRelatoriosView') : 'Tabela';
        $('#afastamentosProActions').find('button[data-value="'+viewModePanel+'"].btn').trigger('click');
    }
    if ($('.panelInfoHomeConfiguracao').is(':visible')) {
        getTabsConfigPanel();
    }
    if ($('.panelInfoHomeRelatorio').is(':visible')) {
        getTabsRelatorio();
    }
}
function changePerfilAtiv(this_) {
    var _this = $(this_);
    $('.tabelaControle .atividadeBoxDisplay').html('');
    resetDialogBoxPro('dialogBoxPro');
    setOptionsPro('perfilAtividadesSelected', _this.val());
    updateAtividade(_this.closest('.panelHome').find('.iconAtividade_update')[0]);
    perfilAtividadesSelected = _this.val();
}
function changePanelHome(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.panelHomePro');
    var data = $(this_).data();
    var mode = data.value;
        _parent.find('#atividadesProDiv_hideIcon, .panelHome').hide();
        _parent.find('#atividadesProDiv_hideIcon, .panelHome'+mode).show("slide", { direction: "down" }, 500);
        _parent.find('.panelInfoHome').hide();
        _parent.find('.panelInfoHome'+mode).show();
    if (mode == 'Afastamento') {
        var viewModePanel = (getOptionsPro('panelAfastamentosView')) ? getOptionsPro('panelAfastamentosView') : 'Cronograma';
        $('#afastamentosProActions').find('button[data-value="'+viewModePanel+'"].btn').trigger('click');
    } else if (mode == 'Relatorio') {
        getTabsRelatorio();
    } else if (mode == 'Atividade') {
        updateAtividade();
        $('#tabelaAtivPanel').find('.dataFallback').addClass('dataLoading');
        $('#atividadesProActions').find('.iconAtividade_update i').addClass('fa-spin');
    } else if (mode == 'Configuracao') {
        getTabsConfigPanel();
        // initClassicEditor();
    }
    setOptionsPro('panelHomeView', mode);
}
function getPanelAtiv(this_) {
    var data = $(this_).data();
    var mode = data.value;
    $(this_).closest('#atividadesProActions').find('.btn.active').removeClass('active');
    $(this_).addClass('active');
    $('#ganttAtivPanel').html('').hide();
    $('#kanbanAtivPanel').html('').hide();
    $('#chartAtivPanel').hide();
    if (mode == 'Tabela') {
        $('#tabelaAtivPanel').show();
    } else {
        $('#tabelaAtivPanel').attr('style', function(i,s) { return (s || '') + 'display: none !important;' });
    } 
    if (mode == 'Cronograma') {
        getGanttAtividades(getOptionsPro('ganttAtividadesFilter'));
    } else if (mode == 'Quadro') {
        getKanbanAtividades(this_);
    } else if (mode == 'Relatorio') {
        getChartAtividades(this_);
    }
    setOptionsPro('panelAtividadesView', mode);
}
function getPanelAfast(this_) {
    var data = $(this_).data();
    var mode = data.value;
    var _parent = $(this_).closest('#afastamentosProActions');
        _parent.find('.btn.active').removeClass('active');
    $(this_).addClass('active');
    $('.afastamentoPanelPro').attr('style', function(i,s) { return (s || '') + 'display: none !important;' });
    if (mode == 'Cronograma') {
        var defaultView = getOptionsPro('ganttAfastamentosFilter');
        getGanttAfastamento(defaultView ? defaultView : 'bar-ativos');
    } else if (mode == 'Tabela') {
        getTableAfastamentoPanel(this_);
    } else if (mode == 'Relatorio') {
        getChartAfastamentoPanel(this_);
    }
    setOptionsPro('panelAfastamentosView', mode);
}
function getPanelRelatorio(this_) {
    var data = $(this_).data();
    var mode = data.value;
    var _parent = $(this_).closest('#relatoriosProActions');
        _parent.find('.btn.active').removeClass('active');
    $(this_).addClass('active');
    $('.relatorioPanelPro').attr('style', function(i,s) { return (s || '') + 'display: none !important;' });
    if (mode == 'Tabela') {
        getTabsRelatorio(this_);
    } else if (mode == 'Grafico') {
        getChartRelatorio(this_);
    }
    setOptionsPro('panelRelatoriosView', mode);
}
function getChartRelatorio(this_) {
    $('#chartRelatorioPanel').show();
}
function getTabsRelatorio(this_) {
    var _this = $(this_);
    var panel = 'tableRelatorioPanel';
    var tabs = 'tabsPanelRelatorio';
    var htmlToolbar =   '<div id="'+tabs+'" style="border: none; min-height: 300px; margin: 0;">'+
                        '    <ul>'+
                        '       <li><a href="#tabs_report-demandas"><i class="fas fa-list-alt cinzaColor" style="margin-right: 5px;"></i> '+__.Demandas+'</a></li>'+
                        '    </ul>'+
                        '    <div id="tabs_report-demandas" class="tabelaPanelScroll resizeObserve" style="overflow-x: scroll; padding: 0;"><div class="dataFallback" style="z-index: 1;" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                        '</div>';
    $('#'+panel).html(htmlToolbar).show();
    $('#'+tabs).tabs({
        activate: function (event, ui) {
            var active = $(this).tabs( "option", "active" );
            var type = ui.newPanel[0].id.replace('tabs_report-', '');
            setOptionsPro('report_'+tabs+'ActiveTabs', active);
            removeOptionsPro('rememberScroll_report_'+type);
            resetDialogBoxPro('dialogBoxPro');
            getTabReport(type, 'get');
        }
    });
    var tabActive = getOptionsPro('report_'+tabs+'ActiveTabs');
    if (tabActive) {
        $('#'+tabs).tabs( "option", "active", tabActive);
    } else {
        getTabReport('demandas', 'get');
    }
}
function getTabReport(type, mode, data = false) {
    if (checkCapacidade('report_'+type) && mode == 'get') {
        var action = 'report_'+type;
        var param = {
            action: action
        };
        getServerAtividades(param, action);
        $('#tabs_report-'+type).css('width',$('#tabsPanelRelatorio').width()).find('.dataFallback').addClass('dataLoading');

    } else if (checkCapacidade('report_'+type) && mode == 'set') {
        updateServerTabReport(data);
        infraTooltipOcultar();
    }
}
function updateServerTabReport(data, param) {
    loadingButtonConfirm(false);
    getTableRelatorioPanel(data.demandas);
}
function getTabsConfigPanel(this_) {
    var _this = $(this_);
    var panel = 'panelInfoHomeConfiguracao';
    var tabs = 'tabsPanelConfig';
    var htmlToolbar =   '<div id="'+tabs+'" style="border: none; min-height: 300px;">'+
                        '    <ul>'+
                        '    <li><a href="#tabs-configpessoal"><i class="fas fa-user-cog cinzaColor" style="margin-right: 5px;"></i>Configura\u00E7\u00F5es Pessoais</a></li>'+
                        (checkCapacidade('config_atividades') ? 
                        '    <li><a href="#tabs-atividades"><i class="fas fa-clipboard-list cinzaColor" style="margin-right: 5px;"></i>'+__.Atividades+'</a></li>'+
                        '' : '')+
                        (checkCapacidade('config_planos') || checkCapacidade('config_self_planos') ? 
                        '    <li><a href="#tabs-planos"><i class="fas fa-handshake cinzaColor" style="margin-right: 5px;"></i>Planos de Trabalho</a></li>'+
                        '' : '')+
                        (checkCapacidade('config_programas') ? 
                        '    <li><a href="#tabs-programas"><i class="fas fa-cubes cinzaColor" style="margin-right: 5px;"></i>Programas de Gest\u00E3o</a></li>'+
                        '' : '')+
                        (checkCapacidade('config_users') ? 
                        '    <li><a href="#tabs-users"><i class="fas fa-users cinzaColor" style="margin-right: 5px;"></i>Usu\u00E1rios</a></li>'+
                        '' : '')+
                        (checkCapacidade('config_unidades') ? 
                        '    <li><a href="#tabs-unidades"><i class="fas fa-briefcase cinzaColor" style="margin-right: 5px;"></i>Unidades</a></li>'+
                        '' : '')+
                        (checkCapacidade('config_tipos_documentos') ? 
                        '    <li><a href="#tabs-tipos_documentos"><i class="fas fa-file-alt cinzaColor" style="margin-right: 5px;"></i>Tipos de Documentos</a></li>'+
                        '' : '')+
                        (checkCapacidade('config_tipos_justificativas') ? 
                        '    <li><a href="#tabs-tipos_justificativas"><i class="fas fa-star cinzaColor" style="margin-right: 5px;"></i>Tipos de Justificativas</a></li>'+
                        '' : '')+
                        (checkCapacidade('config_tipos_modalidades') ? 
                        '    <li><a href="#tabs-tipos_modalidades"><i class="fas fa-wrench cinzaColor" style="margin-right: 5px;"></i>Tipos de Modalidades</a></li>'+
                        '' : '')+
                        (checkCapacidade('config_tipos_requisicoes') ? 
                        '    <li><a href="#tabs-tipos_requisicoes"><i class="fas fa-inbox cinzaColor" style="margin-right: 5px;"></i>Tipos de Requisi\u00E7\u00F5es</a></li>'+
                        '' : '')+
                        (checkCapacidade('config_nomenclaturas') ? 
                        '    <li><a href="#tabs-nomenclaturas"><i class="fas fa-ad cinzaColor" style="margin-right: 5px;"></i>Nomenclaturas</a></li>'+
                        '' : '')+
                        (checkCapacidade('config_entidades') ? 
                        '    <li><a href="#tabs-entidades"><i class="fas fa-university cinzaColor" style="margin-right: 5px;"></i>Entidades</a></li>'+
                        '' : '')+
                        '    </ul>'+
                        '    <div id="tabs-configpessoal">'+
                        '       '+configPessoal()+
                        '    </div>'+
                        (checkCapacidade('config_atividades') ? 
                        '    <div id="tabs-atividades"><div class="dataFallback" style="z-index: 1;" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                        '' : '')+
                        (checkCapacidade('config_planos') || checkCapacidade('config_self_planos') ? 
                        '    <div id="tabs-planos"><div class="dataFallback" style="z-index: 1;" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                        '' : '')+
                        (checkCapacidade('config_programas') ? 
                        '    <div id="tabs-programas"><div class="dataFallback" style="z-index: 1;" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                        '' : '')+
                        (checkCapacidade('config_users') ? 
                        '    <div id="tabs-users"><div class="dataFallback" style="z-index: 1;" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                        '' : '')+
                        (checkCapacidade('config_unidades') ? 
                        '    <div id="tabs-unidades"><div class="dataFallback" style="z-index: 1;" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                        '' : '')+
                        (checkCapacidade('config_tipos_documentos') ? 
                        '    <div id="tabs-tipos_documentos"><div class="dataFallback" style="z-index: 1;" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                        '' : '')+
                        (checkCapacidade('config_tipos_justificativas') ? 
                        '    <div id="tabs-tipos_justificativas"><div class="dataFallback" style="z-index: 1;" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                        '' : '')+
                        (checkCapacidade('config_tipos_modalidades') ? 
                        '    <div id="tabs-tipos_modalidades"><div class="dataFallback" style="z-index: 1;" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                        '' : '')+
                        (checkCapacidade('config_tipos_requisicoes') ? 
                        '    <div id="tabs-tipos_requisicoes"><div class="dataFallback" style="z-index: 1;" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                        '' : '')+
                        (checkCapacidade('config_nomenclaturas') ? 
                        '    <div id="tabs-nomenclaturas"><div class="dataFallback" style="z-index: 1;" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                        '' : '')+
                        (checkCapacidade('config_entidades') ? 
                        '    <div id="tabs-entidades"><div class="dataFallback" style="z-index: 1;" data-text="Nenhum dado dispon\u00EDvel"></div></div>'+
                        '' : '')+
                        '</div>';
    $('.'+panel).html(htmlToolbar);
    $('#'+tabs).tabs({
        activate: function (event, ui) {
            var active = $(this).tabs( "option", "active" );
            var type = ui.newPanel[0].id.replace('tabs-', '');
            setOptionsPro(tabs+'ActiveTabs', active);
            removeOptionsPro('rememberScroll_config_'+type);
            resetDialogBoxPro('dialogBoxPro');
            getTabConfig(type, 'get');
            $('.actionsConfig_icons').hide().find('.newLink').not('.iconConfig_confirm').hide();
            $('.actionsConfig_'+type).show();
            // initClassicEditor();
        }
    });
    var tabActive = getOptionsPro(tabs+'ActiveTabs');
    if (tabActive) {
        $('#'+tabs).tabs( "option", "active", tabActive);
    }
    getListTypesSEI();
}
function getTabConfig(type, mode, data = false) {
    if ((checkCapacidade('config_'+type) || checkCapacidade('config_self_'+type)) && mode == 'get') {
        var disabled = (getOptionsPro('changeDisabledTableConfig_'+type) && getOptionsPro('changeDisabledTableConfig_'+type) == 'show') ? 'show' : 'hide';
        var action = (checkCapacidade('config_self_'+type)) ? 'config_self_'+type : 'config_'+type;
        var param = {
            disabled: disabled,
            action: action
        };
        getServerAtividades(param, action);
        $('#tabs-'+type).find('.dataFallback').addClass('dataLoading');
    } else if ((checkCapacidade('config_'+type) || checkCapacidade('config_self_'+type)) && mode == 'set') {
        getTableTabConfig(type, data);
        infraTooltipOcultar();
    }
}
function setNewItemCell(this_, event) {
    if (event.which == 13) { 
        setTimeout(function(){ 
            $(this_).closest('td').text($(this_).val().trim());
        }, 500);
    }
    console.log(this_, event);
}
function addConfigItem(this_) {
    var _this = $(this_);
    var table = _this.closest('table');
    var tr = table.find('tbody tr:last-child');
    var len = table.find('tbody tr').length;
    table.find('tbody tr td').removeClass('inEdit');
    table.find('tbody').append(tr.clone().attr('data-index',len));
    table.find('tbody tr:last-child').find('td:first-child').removeClass('inEdit').text('').trigger('click');
    if (tr.data('key') == 'documentos') {
        table.find('tbody tr:last-child').find('td:nth-child(2)')
            .removeClass('editCellLoadingError')
            .removeClass('editCellConfirm')
            .removeClass('inEdit')
            .text('');
        table.find('tbody tr:last-child').find('td:nth-child(3)').text('');
        table.find('tbody tr:last-child').find('td:nth-child(4)').text('');
        table.find('tbody tr:last-child').find('td:nth-child(5)').text('');
    } else if (tr.data('key') == 'modalidades') {
        table.find('tbody tr:last-child').find('td:nth-child(2)').text('');
    } else if (tr.data('key') == 'complexidade') {
        table.find('tbody tr:last-child').find('td').removeClass('inEdit');
        table.find('tbody tr:last-child').find('td:nth-child(1)').text('').trigger('click');
        table.find('tbody tr:last-child').find('td:nth-child(2)').text('');
        table.find('tbody tr:last-child').find('td:nth-child(3)').text('');
        var onoffswitch = table.find('tbody tr:last-child').find('.onoffswitch');
            onoffswitch.find('input[type="checkbox"]')
                .attr('class','onoffswitch-checkbox switch_complexidadeDefault switch_complexidadeDefault_'+len)
                .attr('id', 'changeItemConfig_atividades_'+len).prop('checked',false);
            onoffswitch.find('label.onoffswitch-label').attr('for', 'changeItemConfig_atividades_'+len)
    }
}
function changeSwitchConfigItem(this_) {
    var _this = $(this_);
    var tr = _this.closest('tr');
    var table = _this.closest('table');
    table.find('.switch_complexidadeDefault').not('.switch_complexidadeDefault_'+tr.data('index')).prop('checked',false);
    // _this.prop('checked',true);

}
function changeSelectConfigItem(this_) {
    var _this = $(this_);
    var tr = _this.closest('tr');
    var td = _this.closest('td');
    var data_tr = tr.data();
    var table = _this.closest('table');
    var value_txt = _this.find('option:selected').text().trim();
    var value = _this.val();

    if (td.data('key') == 'tipo_modalidade') {
        console.log(data_tr, value_txt, value, td.data());
        tr.find('td').eq(2).text(value);
    }

    if (table.data('format') == 'obj_mult') {
        value = (value == '') ? 'remove' : value;
        tr.attr('data-value',value);
        tr.data('value',value);
    }
    if (tr.find('td').length > 2) {
        _this.closest('td').next().trigger('click');
    } else {
        table.find('tbody tr:last-child').find('td:first-child').trigger('click');
    }
    if (tr.find('td').length == 2 && tr.data('index') == table.find('tbody tr').length-1 && value_txt != '' && data_tr.key != 'perfil') {
        addConfigItem(this_);
    }

    setTimeout(function(){ 
        if (!td.find('input, select').is(':visible')) {
            td.removeClass('inEdit');
        }
    }, 500);
}
function configTableNewItem(this_) {
    var _this = $(this_);
    var td = _this.closest('td');
    var tr = _this.closest('tr');
    if (_this.val() == 'new') {
        setTimeout(function(){ 
            td.removeClass('inEdit').removeClass('editCellSelect').addClass('editCellNew');
            td.html('').trigger('click');
        }, 100);
    }
}
function updateConfigServer(param) {

    // var param_key = param.key;
    var param_key = (isJson(param.key)) ? JSON.parse(param.key) : param.key;

    objIndex = (typeof tableConfigList[param.type] === 'undefined' || tableConfigList[param.type] == 0 || tableConfigList[param.type].length == 0) ? -1 : tableConfigList[param.type].findIndex((obj => obj[param.rowindex] == param.id));
    if (objIndex !== -1) {
        tableConfigList[param.type][objIndex][param_key] = param.value;
    }

    objIndexAtiv = (typeof arrayConfigAtividades[param.type] === 'undefined' || arrayConfigAtividades[param.type] == 0 || arrayConfigAtividades[param.type].length == 0) ? -1 : arrayConfigAtividades[param.type].findIndex((obj => obj[param.rowindex] == param.id));
    if (objIndexAtiv !== -1) {
        arrayConfigAtividades[param.type][objIndexAtiv][param_key] = param.value;
    }

    var action = 'config_update_'+param.type;
    if (checkCapacidade(action)) {
        param.action = action;
        getServerAtividades(param, action);
    }
    return {objIndex: objIndex, objIndexAtiv: objIndexAtiv};
}
function resetButtonTabConfig(classPanel = '') {
    var loadConfirm = $('#configuracoesProActions '+classPanel+' .iconConfig_confirm');
    loadConfirm.find('i.icon-parent').attr('class', loadConfirm.data('icon'));
}
function updateServerTabConfig(data, param) {
    var table = $('#tabelaConfigPanel_'+param.type)
    var body = table.find('tbody');
        resetButtonTabConfig('.actionsConfig_'+param.type);

    if (typeof data.refresh_page !== 'undefined' && data.refresh_page) {
        getTabConfig(param.type, 'get');
    } else {
        if (param.id != 0) {
            var id = (param.id == -1) ? data.result : param.id;
            var tr = body.find('tr[data-id="'+id+'"]');
            updateConfigCells(data, param, tr);
        } else {
            $.each(param.ids, function(index, value){
                var tr = body.find('tr[data-id="'+value+'"]');
                updateConfigCells(data, param, tr);
            })
        }
    }
}
function updateConfigCells(data, param, tr) {

    // var param_key = param.key;
    var param_key = (isJson(param.key)) ? JSON.parse(param.key) : param.key;

    var td = tr.find('td[data-key="'+param_key+'"]');
    // console.log('updateConfigCells',data, param, tr, td);
    
    if (data.status == 0) {
        td.removeClass('editCellLoading').addClass('editCellLoadingError');
    } else {
        if (param.mode == 'disable') { tr.addClass('disabled') }
        else if (param.mode == 'approve') { tr.addClass('approve').removeClass('disapprove') }
        else if (param.mode == 'disapprove') { tr.addClass('disapprove').removeClass('approve') }
        else if (param.mode == 'reactive') { tr.removeClass('disabled') }
        else if (param.mode == 'clone' || param.mode == 'new') { 
            getTabConfig(param.type, 'get');
        } else if (param.mode == 'option') { 
            loadingButtonConfirm(false);
            if (data.status == 1) {
                dialogBoxPro.dialog('close');
                resetDialogBoxPro('dialogBoxPro');
                alertaBoxPro('Sucess', 'check-circle', 'Op\u00E7\u00F5es editadas com sucesso!');
                // console.log(param);
                if (param.type == 'users') {
                    updateAtividade(tr.closest('.panelHome').find('.iconAtividade_update')[0]);
                } else {

                    var label_id = (param.type == 'tipos_modalidades') ? 'id_tipo_modalidade' : 'id_'+param.type.slice(0, -1);
                    
                    objIndex = tableConfigList[param.type].findIndex((obj => obj[label_id] == param.id));
                    if (objIndex !== -1) {
                        tableConfigList[param.type][objIndex]['config'] = param_key;
                    }
                    
                    objIndexAtiv = (typeof arrayConfigAtividades[param.type] === 'undefined' || arrayConfigAtividades[param.type] == 0 || arrayConfigAtividades[param.type].length == 0) ? -1 : arrayConfigAtividades[param.type].findIndex((obj => obj[label_id] == param.id));
                    if (objIndexAtiv !== -1) {
                        arrayConfigAtividades[param.type][objIndexAtiv]['config'] = param_key;
                    }
                }
            } else {
                alertaBoxPro('Error', 'exclamation-triangle', 'Erro ao enviar sua informa\u00E7\u00F5es.');
            }
        }
        if (param.action == 'config_update_users' && param.mode == 'new') {
            loadingButtonConfirm(false);
            resetDialogBoxPro('dialogBoxPro');
            alertaBoxPro('Sucess', 'check-circle', 'Usu\u00E1rio criado com sucesso! Link de acesso enviado para o email cadastrado.');
        } else if (param.action == 'config_update_keys') {
            var table = $('#configBox_keys');
            if (param.mode == 'disable_key') {
                loadingButtonConfirm(false);
                alertaBoxPro('Sucess', 'check-circle', 'Chave de acesso revogada com sucesso!');
                var trKey = table.find('tbody tr[data-id="'+param.id+'"]');
                    trKey.find('.keyVigente').hide();
                    trKey.find('.keyRevogada').show();
            } else if (param.mode == 'resend_key') {
                loadingButtonConfirm(false);
                alertaBoxPro('Sucess', 'check-circle', 'Link de acesso reenviado com sucesso para o email do usu\u00E1rio!');
            } else if (param.mode == 'new_key') {
                loadingButtonConfirm(false);
                alertaBoxPro('Sucess', 'check-circle', 'Chave de acesso criada com sucesso! Link de acesso enviado no email do usu\u00E1rio');
                table.find('tbody tr .keyVigente').hide();
                table.find('tbody tr .keyRevogada').show();
                
                var last_tr = table.find('tbody tr:last-child');
                var id_hash = data.id_hash;
                var len = table.find('tbody tr').length;
                table.find('tbody').append(last_tr.clone().attr('data-index',len).attr('data-id',id_hash));
                table.find('tbody tr:last-child').find('td:first-child').text('ID:'+id_hash);
                table.find('tbody tr:last-child').find('.keyVigente').show();
                table.find('tbody tr:last-child').find('.keyRevogada').hide();
            }
            var linkIcon = table.find('.newLink.loading');
            var icon = linkIcon.find('i');
                linkIcon.removeClass('loading');
                icon.attr('class',icon.data('icon'));
        }

        setTimeout(function(){ 
            td.removeClass('editCellLoading').removeClass('editCellLoadingError');
            if (tr.find('.checkboxSelectConfiguracoes').is(':checked')) {
                tr.find('.checkboxSelectConfiguracoes').trigger('click');
            }
        }, 500);
    }
}
function getRowsTableTabConfig(type, mode, list = false, value = false) {
    var _return = '';
    var countUnidades = (list) ? uniqPro(jmespath.search(list, "[?sigla_unidade].sigla_unidade")) : null;
        countUnidades = (countUnidades !== null) ? countUnidades.length : 0;
    if (type == 'atividades') {
        if (mode == 'header') {
                _return =   '          <tr class="tableHeader">'+
                            '              <th class="tituloControle" data-sorter="false" style="width: 50px;" align="center"><label class="lblInfraCheck_label" for="lnkInfraCheck_configuracoes_'+type+'" accesskey=";"></label><a class="lnkInfraCheck" id="lnkInfraCheck_configuracoes_'+type+'" onclick="setSelectAllTr(this);" onmouseover="updateTipSelectAll(this)" onmouseenter="return infraTooltipMostrar(\'Selecionar Tudo\')" onmouseout="return infraTooltipOcultar();"><img src="/infra_css/imagens/check.gif" id="imgRecebidosCheck_'+type+'"></a></th>'+
                            '              <th class="tituloControle tituloFilter" style="min-width: 250px;">Nome d'+__.a_Atividade+'</th>'+
                            '              <th class="tituloControle tituloFilter">Tempo Pactuado (horas)</th>'+
                            '              <th class="tituloControle tituloFilter" style="width: 160px;">Dias de Planejamento</th>'+
                            '              <th class="tituloControle tituloFilter" style="width: 250px;">Macroatividade</th>'+
                            (countUnidades > 1 ?
                            '              <th class="tituloControle tituloFilter" style="width: 90px;">Unidade</th>'+
                            '' : '')+
                            (checkCapacidade('config_update_'+type) ? 
                            '              <th class="tituloControle" data-sorter="false" style="min-width: 100px;">Op\u00E7\u00F5es</th>'+
                            '              <th class="tituloControle" data-sorter="false" style="min-width: 160px;">A\u00E7\u00F5es</th>'+
                            '' : '')+
                            '          </tr>';
        } else if (mode == 'body') {
            if (value) {
                if (value.exclude == false) {
                    var classDisabled = (moment(value.data_fim,'YYYY-MM-DD HH:mm:ss') < moment() && value.data_fim != '0000-00-00 00:00:00') ? 'disabled' : '';
                    var classClone = (value.nome_atividade.indexOf('(C\u00F3pia)') !== -1) ? {name: 'clone', text: 'C\u00D3PIA' } : false;
                    var classNew = (value.nome_atividade.indexOf('(Novo)') !== -1) ? {name: 'new', text: 'NOVO' } : false;
                    var classHomologa = (value.homologado) ? {name: 'approve', text: 'HOMOLOGADO' } : {name: 'disapprove', text: '' };
                        _return =   '       <tr data-tagname="SemGrupo" data-type="'+type+'" data-rowindex="id_'+type.slice(0, -1)+'" data-id="'+value.id_atividade+'" class="'+classDisabled+(classClone ? ' '+classClone.name : '')+(classNew ? ' '+classNew.name : (classHomologa ? ' '+classHomologa.name : '') )+'">'+
                                    '           <td align="center">'+
                                    '               <input type="checkbox" class="checkboxSelectConfiguracoes" onclick="followSelecionarItens(this)" id="configuracoesPro_'+value.id_atividade+'" name="configuracoesPro" value="'+value.id_atividade+'" '+(checkCapacidade('config_update_'+type) && (checkCapacidade('config_update_pgr') || !value.homologado) ? '' : 'disabled')+'></td>'+
                                    '           <td align="left" class="'+(checkCapacidade('config_update_pgr') || !value.homologado ? 'editCell' : '')+'" data-key="nome_atividade" data-text="'+(classNew ? classNew.text : (classClone ? classClone.text : (classHomologa ? ' '+classHomologa.text : '') ))+'"><span>'+value.nome_atividade+'</span></td>'+
                                    '           <td align="left" class="'+(checkCapacidade('config_update_pgr') || !value.homologado ? 'editCellNum' : '')+'" data-key="tempo_pactuado">'+value.tempo_pactuado+'</td>'+
                                    '           <td align="left" class="editCellNum" data-key="dias_planejado">'+value.dias_planejado+'</td>'+
                                    '           <td align="left" class="editCellSelect" data-array="self" data-key="macroatividade" data-value="macroatividade">'+(value.macroatividade ? value.macroatividade : '')+'</td>'+
                                    (countUnidades > 1 ?
                                    '           <td align="left" class="'+(checkCapacidade('config_update_pgr') || !value.homologado ? 'editCellSelect' : '')+'" data-array="unidades" data-key="id_unidade" data-value="sigla_unidade" data-new-item="false">'+value.sigla_unidade+'</td>'+
                                    '' : '')+
                                    (checkCapacidade('config_update_'+type) ? 
                                    '           <td align="left">'+
                                    '               <a class="newLink followLinkTr '+(value.config && value.config !== null && (Object.keys(value.config).length > 0 || value.config.length > 0 ) ? 'newLink_selected' : '')+'" style="font-size: 10pt;" onclick="editConfigOptions(this, '+value.id_atividade+')"><i class="fas fa-plus-circle" style="font-size: 100%;"></i>Op\u00E7\u00F5es</a>'+
                                    '           </td>'+
                                    '           <td align="right" data-key="action">'+
                                    (checkCapacidade('config_update_pgr') ? 
                                    '               <a class="newLink followLinkTr" data-type="'+type+'" data-id="'+value.id_atividade+'" data-mode="disapprove" onclick="approveConfig(this)" onmouseover="return infraTooltipMostrar(\'Cancelar Homologa\u00E7\u00E3o\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-thumbs-down vermelhoColor" style="font-size: 100%;"></i></a>'+
                                    '               <a class="newLink followLinkTr" data-type="'+type+'" data-id="'+value.id_atividade+'" data-mode="approve" onclick="approveConfig(this)" onmouseover="return infraTooltipMostrar(\'Homologar\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-thumbs-up" style="font-size: 100%;"></i></a>'+
                                    '' : '')+
                                    (checkCapacidade('config_update_pgr') || !value.homologado ? 
                                    '               <a class="newLink followLinkTr" data-type="'+type+'" data-id="'+value.id_atividade+'" data-mode="disable" onclick="disableConfig(this)" onmouseover="return infraTooltipMostrar(\'Desativar\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-times-circle" style="font-size: 100%;"></i></a>'+
                                    '               <a class="newLink followLinkTr" data-type="'+type+'" data-id="'+value.id_atividade+'" data-mode="reactive" onclick="reactiveConfig(this)" onmouseover="return infraTooltipMostrar(\'Reativar\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-undo-alt" style="font-size: 100%;"></i></a>'+
                                    (checkCapacidade('config_new_'+type) ? 
                                    '               <a class="newLink followLinkTr" data-type="'+type+'" data-id="'+value.id_atividade+'" data-mode="clone" onclick="cloneConfig(this)" onmouseover="return infraTooltipMostrar(\'Duplicar\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-copy" style="font-size: 100%;"></i></a>'+
                                    '' : '')+
                                    '' : '')+
                                    '           </td>'+
                                    '' : '')+
                                    '       </tr>';
                }
            } else {
                var colspan = 6;
                    colspan = (checkCapacidade('config_update_'+type)) ? colspan+1 : colspan;
                    colspan = (countUnidades > 1 ) ? colspan+1 : colspan;
                    _return =   '       <tr class="noData">'+
                                '           <td align="center" colspan="'+colspan+'">'+
                                '               <div class="dataFallback" style="z-index: 9" data-text="Nenhum dado dispon\u00EDvel">'+
                                '                   <div style="position: absolute;top: calc(50% - 60px);width: 100%;text-align: center;">'+
                                '                   '+($('.actionsConfig_'+type).find('.iconConfig_add')[0].outerHTML)+
                                '                   </div>'+
                                '               </div>'+
                                '           </td>'+
                                '       </tr>';
            }
        }
    } else if (type == 'planos') {
        if (mode == 'header') {
                _return =   '          <tr class="tableHeader">'+
                            '              <th class="tituloControle" data-sorter="false" style="width: 50px;" align="center"><label class="lblInfraCheck_label" for="lnkInfraCheck_configuracoes_'+type+'" accesskey=";"></label><a class="lnkInfraCheck" id="lnkInfraCheck_configuracoes_'+type+'" onclick="setSelectAllTr(this);" onmouseover="updateTipSelectAll(this)" onmouseenter="return infraTooltipMostrar(\'Selecionar Tudo\')" onmouseout="return infraTooltipOcultar();"><img src="/infra_css/imagens/check.gif" id="imgRecebidosCheck_'+type+'"></a></th>'+
                            '              <th class="tituloControle tituloFilter" style="min-width: 250px;">Nome do Respons\u00E1vel</th>'+
                            (countUnidades > 1 ?
                            '              <th class="tituloControle tituloFilter" style="width: 100px;">Unidade</th>'+
                            '' : '')+
                            '              <th class="tituloControle tituloFilter">Tipo de Modalidade</th>'+
                            '              <th class="tituloControle tituloFilter" style="width: 100px;">Carga Hor\u00E1ria</th>'+
                            '              <th class="tituloControle tituloFilter" style="width: 150px;">Data de In\u00EDcio</th>'+
                            '              <th class="tituloControle tituloFilter" style="width: 150px;">Data de Encerramento</th>'+
                            '              <th class="tituloControle tituloFilter" style="width: 250px;">Tempo Total Pactuado (horas)</th>'+
                            '              <th class="tituloControle tituloFilter" style="min-width: 250px;" colspan="2">Op\u00E7\u00F5es</th>'+
                            (checkCapacidade('config_update_'+type) ? 
                            '              <th class="tituloControle" data-sorter="false" style="min-width: 120px;">A\u00E7\u00F5es</th>'+
                            '' : '')+
                            '          </tr>';
        } else if (mode == 'body') {
            if (value) {
                var classDisabled = (moment(value.data_fim,'YYYY-MM-DD HH:mm:ss') < moment() && value.data_fim != '0000-00-00 00:00:00') ? 'disabled' : '';
                var classClosed = (moment(value.data_fim_vigencia,'YYYY-MM-DD HH:mm:ss') < moment()) ? {name: 'closed', text: 'ENCERRADO' } : false;
                var classFuture = (moment(value.data_inicio_vigencia,'YYYY-MM-DD HH:mm:ss') > moment()) ? {name: 'future', text: 'FUTURO' } : false;
                var modalidade = jmespath.search(arrayConfigAtividades.tipos_modalidades,"[?id_tipo_modalidade==`"+value.id_tipo_modalidade+"`] | [0]");
                var view_modelos = (modalidade !== null && modalidade.hasOwnProperty('config') && typeof modalidade.config !== 'undefined' && modalidade.config !== null && modalidade.config.hasOwnProperty('modelos')) ? modalidade.config.modelos : false;        
                var assinatura = (typeof value.config !== 'undefined' && value.config !== null && typeof value.config.assinatura !== 'undefined' && value.config.hasOwnProperty('assinatura')) ? value.config.assinatura : false;
                var btnAssinatura = (view_modelos) ? '<a class="newLink viewModelDoc" data-type="'+type+'" data-sign="true" data-user="'+value.id_user+'" data-id_reference="'+value.id_plano+'" data-icon="pencil-alt" data-action="view" data-mode="modelo_termo_adesao" data-title="Termo de Ades\u00E3o" onclick="editModelConfigItem(this)" style="cursor: pointer; margin: 5px;display: inline-block;" onmouseover="return infraTooltipMostrar(\''+(assinatura ? 'Documento assinado eletronicamente por '+assinatura[0].nome_completo+', em '+moment(assinatura[0].datetime,'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY [\u00E0s] HH:mm') : 'Visualizar Termo de Ades\u00E3o para assinatura')+'\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-signature '+(assinatura ? 'azulColor' : 'cinzaColor')+'" style="font-size: 100%;"></i> <i class="fas fa-'+(assinatura ? 'user-edit azulColor' : 'pencil-alt cinzaColor')+'" style="font-size: 100%; margin-left: -10px;"></i></a>' : '';
                var classAssinatura = (view_modelos && assinatura) ? 'alertAssinatura' : '';
                    _return =   '       <tr data-tagname="SemGrupo" data-type="'+type+'" data-rowindex="id_'+type.slice(0, -1)+'" data-id="'+value.id_plano+'"  data-idref="'+value.id_user+'" data-idreftype="id_user" class="'+classDisabled+(classClosed ? ' '+classClosed.name : (classFuture ? classFuture.name : ''))+'">'+
                                '           <td align="center">'+
                                '               <input type="checkbox" class="checkboxSelectConfiguracoes" onclick="followSelecionarItens(this)" id="configuracoesPro_'+value.id_plano+'" name="configuracoesPro" value="'+value.id_plano+'" '+(checkCapacidade('config_update_'+type) ? '' : 'disabled')+'></td>'+
                                '           <td align="left" class="'+(checkCapacidade('config_update_'+type) ? 'editCellSelect' : '')+' '+classAssinatura+'" data-array="usuarios" data-key="id_user" data-value="nome_completo" data-new-item="false" data-text="'+(classClosed ? classClosed.text : (classFuture ? classFuture.text : '') )+'"><span>'+value.nome_completo+'</span></td>'+
                                (countUnidades > 1 ?
                                '           <td align="left" class="'+(checkCapacidade('config_update_'+type) ? 'editCellSelect' : '')+' '+classAssinatura+'" data-array="unidades" data-key="id_unidade" data-value="sigla_unidade" data-new-item="false">'+value.sigla_unidade+'</td>'+
                                '' : '')+
                                '           <td align="left" class="'+(checkCapacidade('config_update_'+type) ? 'editCellSelect' : '')+' '+classAssinatura+'" data-array="tipos_modalidades" data-key="id_tipo_modalidade" data-value="nome_modalidade" data-new-item="false">'+value.nome_modalidade+'</td>'+
                                '           <td align="left" style="text-align:center;" class="'+(checkCapacidade('config_update_'+type) ? 'editCellNum' : '')+' '+classAssinatura+'" data-key="carga_horaria">'+value.carga_horaria+'</td>'+
                                '           <td align="left" style="text-align:center;" class="'+(checkCapacidade('config_update_'+type) ? 'editCellDate' : '')+' '+classAssinatura+'" data-key="data_inicio_vigencia" data-ref-limit="data_inicio" data-label-limit="data_fim" data-limit="max" data-time-sorter="'+moment(value.data_inicio_vigencia, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')+'">'+moment(value.data_inicio_vigencia, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')+'</td>'+
                                '           <td align="left" style="text-align:center;" class="'+(checkCapacidade('config_update_'+type) ? 'editCellDate' : '')+' '+classAssinatura+'" data-key="data_fim_vigencia" data-ref-limit="data_fim" data-label-limit="data_inicio" data-limit="min" data-time-sorter="'+moment(value.data_fim_vigencia, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')+'">'+moment(value.data_fim_vigencia, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')+'</td>'+
                                '           <td align="left" class="" data-key="tempo_total" style="text-align: center;">'+value.tempo_total+'</td>'+
                                '           <td align="left" style="width: 100px;" data-time-sorter="'+(view_modelos && assinatura ? assinatura[0].datetime : (view_modelos ? '0000-00-00 00:00:00' : '') )+'">'+
                                '               '+btnAssinatura+
                                '           </td>'+
                                (checkCapacidade('config_update_'+type) ? 
                                '           <td align="left" style="width: 150px;">'+
                                '               <a class="newLink followLinkTr '+(value.config && value.config !== null && (Object.keys(value.config).length > 0 || value.config.length > 0 ) ? 'newLink_selected' : '')+'" style="font-size: 10pt;" onclick="editConfigOptions(this, '+value.id_plano+')"><i class="fas fa-plus-circle" style="font-size: 100%;"></i>Op\u00E7\u00F5es</a>'+
                                '           </td>'+
                                '           <td align="right" data-key="action">'+
                                '               <a class="newLink followLinkTr" data-type="'+type+'" data-id="'+value.id_plano+'" data-mode="disable" onclick="disableConfig(this)" onmouseover="return infraTooltipMostrar(\'Desativar\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-times-circle" style="font-size: 100%;"></i></a>'+
                                '               <a class="newLink followLinkTr" data-type="'+type+'" data-id="'+value.id_plano+'" data-mode="reactive" onclick="reactiveConfig(this)" onmouseover="return infraTooltipMostrar(\'Reativar\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-undo-alt" style="font-size: 100%;"></i></a>'+
                                (checkCapacidade('config_new_'+type) ? 
                                '               <a class="newLink followLinkTr" data-type="'+type+'" data-id="'+value.id_plano+'" data-mode="clone" onclick="cloneConfig(this)" onmouseover="return infraTooltipMostrar(\'Duplicar\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-copy" style="font-size: 100%;"></i></a>'+
                                '' : '')+
                                '           </td>'+
                                '' : '')+
                                '       </tr>';
            } else {
                var colspan = 8;
                    colspan = (checkCapacidade('config_update_'+type)) ? colspan+1 : colspan;
                    colspan = (countUnidades > 1 ) ? colspan+1 : colspan;
                    _return =   '       <tr class="noData">'+
                                '           <td align="center" colspan="'+(colspan+1)+'">'+
                                '               <div class="dataFallback" style="z-index: 9" data-text="Nenhum dado dispon\u00EDvel">'+
                                '                   <div style="position: absolute;top: calc(50% - 60px);width: 100%;text-align: center;">'+
                                '                   '+($('.actionsConfig_'+type).find('.iconConfig_add')[0].outerHTML)+
                                '                   </div>'+
                                '               </div>'+
                                '           </td>'+
                                '       </tr>';
            }
        }
    } else if (type == 'programas') {
        if (mode == 'header') {
                _return =   '          <tr class="tableHeader">'+
                            '              <th class="tituloControle" data-sorter="false" style="width: 50px;" align="center"><label class="lblInfraCheck_label" for="lnkInfraCheck_configuracoes_'+type+'" accesskey=";"></label><a class="lnkInfraCheck" id="lnkInfraCheck_configuracoes_'+type+'" onclick="setSelectAllTr(this);" onmouseover="updateTipSelectAll(this)" onmouseenter="return infraTooltipMostrar(\'Selecionar Tudo\')" onmouseout="return infraTooltipOcultar();"><img src="/infra_css/imagens/check.gif" id="imgRecebidosCheck_'+type+'"></a></th>'+
                            (countUnidades > 1 ?
                            '              <th class="tituloControle tituloFilter">Unidade</th>'+
                            '' : '')+
                            (checkCapacidade('config_update_'+type) ? 
                            '              <th class="tituloControle tituloFilter" style="width: 150px;">Data de In\u00EDcio</th>'+
                            '              <th class="tituloControle tituloFilter" style="width: 150px;">Data de Encerramento</th>'+
                            '              <th class="tituloControle" data-sorter="false" style="min-width: 100px;">Op\u00E7\u00F5es</th>'+
                            '              <th class="tituloControle" data-sorter="false" style="min-width: 120px;">A\u00E7\u00F5es</th>'+
                            '' : '')+
                            '          </tr>';
        } else if (mode == 'body') {
            if (value) {
                var classDisabled = (moment(value.data_fim,'YYYY-MM-DD HH:mm:ss') < moment() && value.data_fim != '0000-00-00 00:00:00') ? 'disabled' : '';
                var classClosed = (moment(value.data_fim_vigencia,'YYYY-MM-DD HH:mm:ss') < moment()) ? {name: 'closed', text: 'ENCERRADO' } : false;
                var classFuture = (moment(value.data_inicio_vigencia,'YYYY-MM-DD HH:mm:ss') > moment()) ? {name: 'future', text: 'FUTURO' } : false;
                    _return =   '       <tr data-tagname="SemGrupo" data-type="'+type+'" data-rowindex="id_'+type.slice(0, -1)+'" data-id="'+value.id_programa+'" data-idref="'+value.id_unidade+'" data-idreftype="id_unidade" class="'+classDisabled+(classClosed ? ' '+classClosed.name : (classFuture ? classFuture.name : ''))+'">'+
                                '           <td align="center">'+
                                '               <input type="checkbox" class="checkboxSelectConfiguracoes" onclick="followSelecionarItens(this)" id="configuracoesPro_'+value.id_programa+'" name="configuracoesPro" value="'+value.id_programa+'" '+(checkCapacidade('config_update_'+type) ? '' : 'disabled')+'></td>'+
                                (countUnidades > 1 ?
                                '           <td align="left" class="editCellSelect" data-array="unidades" data-key="id_unidade" data-value="nome_unidade" data-new-item="false">'+value.nome_unidade+'</td>'+
                                '' : '')+
                                '           <td align="left" class="editCellDate" data-key="data_inicio_vigencia" data-ref-limit="data_inicio" data-label-limit="data_fim" data-limit="max" data-time-sorter="'+moment(value.data_inicio_vigencia, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')+'">'+moment(value.data_inicio_vigencia, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')+'</td>'+
                                '           <td align="left" class="editCellDate" data-key="data_fim_vigencia" data-ref-limit="data_fim" data-label-limit="data_inicio" data-limit="min" data-time-sorter="'+moment(value.data_fim_vigencia, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')+'">'+moment(value.data_fim_vigencia, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')+'</td>'+
                                (checkCapacidade('config_update_'+type) ? 
                                '           <td align="left">'+
                                '               <a class="newLink followLinkTr '+(value.config && value.config !== null && (Object.keys(value.config).length > 0 || value.config.length > 0 ) ? 'newLink_selected' : '')+'" style="font-size: 10pt;" onclick="editConfigOptions(this, '+value.id_programa+')"><i class="fas fa-plus-circle" style="font-size: 100%;"></i>Op\u00E7\u00F5es</a>'+
                                '           </td>'+
                                '           <td align="right" data-key="action">'+
                                '               <a class="newLink followLinkTr" data-type="'+type+'" data-id="'+value.id_programa+'" data-mode="disable" onclick="disableConfig(this)" onmouseover="return infraTooltipMostrar(\'Desativar\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-times-circle" style="font-size: 100%;"></i></a>'+
                                '               <a class="newLink followLinkTr" data-type="'+type+'" data-id="'+value.id_programa+'" data-mode="reactive" onclick="reactiveConfig(this)" onmouseover="return infraTooltipMostrar(\'Reativar\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-undo-alt" style="font-size: 100%;"></i></a>'+
                                (checkCapacidade('config_new_'+type) ? 
                                '               <a class="newLink followLinkTr" data-type="'+type+'" data-id="'+value.id_programa+'" data-mode="clone" onclick="cloneConfig(this)" onmouseover="return infraTooltipMostrar(\'Duplicar\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-copy" style="font-size: 100%;"></i></a>'+
                                '' : '')+
                                '           </td>'+
                                '' : '')+
                                '       </tr>';
            } else {
                var colspan = 4;
                    colspan = (checkCapacidade('config_update_'+type)) ? colspan+1 : colspan;
                    colspan = (countUnidades > 1 ) ? colspan+1 : colspan;
                _return =   '       <tr class="noData">'+
                            '           <td align="center" colspan="'+colspan+'">'+
                            '               <div class="dataFallback" style="z-index: 9" data-text="Nenhum dado dispon\u00EDvel">'+
                            '                   <div style="position: absolute;top: calc(50% - 60px);width: 100%;text-align: center;">'+
                            '                   '+($('.actionsConfig_'+type).find('.iconConfig_add')[0].outerHTML)+
                            '                   </div>'+
                            '               </div>'+
                            '           </td>'+
                            '       </tr>';
            }
        }
    } else if (type == 'users') {
        if (mode == 'header') {
                _return =   '          <tr class="tableHeader">'+
                            '              <th class="tituloControle" data-sorter="false" style="width: 50px;" align="center"><label class="lblInfraCheck_label" for="lnkInfraCheck_configuracoes_'+type+'" accesskey=";"></label><a class="lnkInfraCheck" id="lnkInfraCheck_configuracoes_'+type+'" onclick="setSelectAllTr(this);" onmouseover="updateTipSelectAll(this)" onmouseenter="return infraTooltipMostrar(\'Selecionar Tudo\')" onmouseout="return infraTooltipOcultar();"><img src="/infra_css/imagens/check.gif" id="imgRecebidosCheck_'+type+'"></a></th>'+
                            '              <th class="tituloControle tituloFilter" style="min-width: 250px;">Nome Completo</th>'+
                            '              <th class="tituloControle tituloFilter" style="width: 150px;">Apelido</th>'+
                            '              <th class="tituloControle tituloFilter" style="width: 150px;">Matr\u00EDcula</th>'+
                            '              <th class="tituloControle tituloFilter" style="width: 150px;">Usu\u00E1rio SEI</th>'+
                            '              <th class="tituloControle tituloFilter">E-mail</th>'+
                            '              <th class="tituloControle tituloFilter" style="width: 200px;" data-filter-type="lotacao">Lota\u00E7\u00E3o</th>'+
                            (checkCapacidade('config_update_'+type) ? 
                            '              <th class="tituloControle" data-sorter="false" style="min-width: 100px;">Op\u00E7\u00F5es</th>'+
                            '              <th class="tituloControle" data-sorter="false" style="min-width: 120px;">A\u00E7\u00F5es</th>'+
                            '' : '')+
                            '          </tr>';
        } else if (mode == 'body') {
            if (value) {
                var classDisabled = (moment(value.data_fim,'YYYY-MM-DD HH:mm:ss') < moment() && value.data_fim != '0000-00-00 00:00:00') ? 'disabled' : '';
                var classClone = (value.nome_completo.indexOf('(C\u00F3pia)') !== -1) ? {name: 'clone', text: 'C\u00D3PIA' } : false;
                var classNew = (value.nome_completo.indexOf('(Novo)') !== -1) ? {name: 'new', text: 'NOVO' } : false;
                var lotacao = (value.lotacao !== null) ? $.map(value.lotacao, function(v){ 
                                                            var tagName = removeAcentos(v.sigla_unidade).replace(/\ /g, '').toLowerCase();
                                                            return  '<span data-tagname="'+tagName+'" data-textcolor="black" data-icontag="briefcase" data-type="lotacao" style="background-color: #bfd5e8;" class="tag_text tagTableText_'+tagName+'" onclick="filterTagView(this)" data-colortag="#bfd5e8">'+
                                                                    '   <i class="tagicon fas fa-briefcase" style="font-size: 90%;margin: 0 2px; color: #406987"></i>'+
                                                                    '   '+v.sigla_unidade+
                                                                    '</span>';
                                                        }).join('') : false;
                    lotacao = (lotacao) ? '<span class="info_tags_follow">'+lotacao+'</span>' : '';
                var tagsConfigClass = (lotacao) ? $.map(value.lotacao, function (i) { return 'tagTableName_'+removeAcentos(i.sigla_unidade
                    ).replace(/\ /g, '').toLowerCase(); }).join(' ') : '';   

                    _return =   '       <tr data-tagname="SemGrupo" data-type="'+type+'" data-rowindex="id_'+type.slice(0, -1)+'" data-id="'+value.id_user+'" class="'+tagsConfigClass+' '+classDisabled+(classClone ? ' '+classClone.name : '')+(classNew ? ' '+classNew.name : '')+'">'+
                                '           <td align="center">'+
                                '               <input type="checkbox" class="checkboxSelectConfiguracoes" onclick="followSelecionarItens(this)" id="configuracoesPro_'+value.id_user+'" name="configuracoesPro" value="'+value.id_user+'" '+(checkCapacidade('config_update_'+type) ? '' : 'disabled')+'></td>'+
                                '           <td align="left" class="editCell" data-key="nome_completo" data-text="'+(classNew ? classNew.text : (classClone ? classClone.text : ''))+'"><span>'+value.nome_completo+'</span></td>'+
                                '           <td align="left" class="editCell" data-key="apelido">'+value.apelido+'</td>'+
                                '           <td align="left" class="editCell" data-key="matricula">'+value.matricula+'</td>'+
                                '           <td align="left" class="editCell" data-key="login">'+value.login+'</td>'+
                                '           <td align="left" class="editCell" data-key="email">'+value.email+'</td>'+
                                '           <td align="left" class="" data-key="lotacao">'+
                                '               '+lotacao+
                                // '               <table style="width: 110px;float: right;" data-id="'+value.id_user+'"><tr data-id="'+value.keys[0].id_hash+'"><td style="height: 25px !important;"><a class="newLink keyVigente keyResend" style="font-size: 10pt; cursor:pointer;" onclick="configUpdateKey(this,\'resend_key\')"><i class="fas fa-envelope-open-text" data-icon="fas fa-envelope-open-text" style="font-size: 100%;"></i>Reenviar</a></td></tr></table>'+
                                '           </td>'+
                                (checkCapacidade('config_update_'+type) ? 
                                '           <td align="left">'+
                                '               <a class="newLink followLinkTr '+(value.config && value.config !== null && (Object.keys(value.config).length > 0 || value.config.length > 0 ) ? 'newLink_selected' : '')+'" style="font-size: 10pt;" onclick="editConfigOptions(this, '+value.id_user+')"><i class="fas fa-plus-circle" style="font-size: 100%;"></i>Op\u00E7\u00F5es</a>'+
                                '           </td>'+
                                '           <td align="right" data-key="action">'+
                                (checkCapacidade('config_users_all') ? 
                                '               <a class="newLink followLinkTr" data-type="'+type+'" data-id="'+value.id_user+'" data-mode="disable" onclick="disableConfig(this)" onmouseover="return infraTooltipMostrar(\'Desativar\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-times-circle" style="font-size: 100%;"></i></a>'+
                                '               <a class="newLink followLinkTr" data-type="'+type+'" data-id="'+value.id_user+'" data-mode="reactive" onclick="reactiveConfig(this)" onmouseover="return infraTooltipMostrar(\'Reativar\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-undo-alt" style="font-size: 100%;"></i></a>'+
                                (checkCapacidade('config_new_'+type) ? 
                                '               <a class="newLink followLinkTr" data-type="'+type+'" data-id="'+value.id_user+'" data-mode="clone" onclick="cloneConfig(this)" onmouseover="return infraTooltipMostrar(\'Duplicar\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-copy" style="font-size: 100%;"></i></a>'+
                                '' : '')+
                                '' : '')+
                                '           </td>'+
                                '' : '')+
                                '       </tr>';
            } else {
                var colspan = 8;
                    colspan = (checkCapacidade('config_update_'+type)) ? colspan+1 : colspan;
                    colspan = (countUnidades > 1 ) ? colspan+1 : colspan;
                _return =   '       <tr class="noData">'+
                            '           <td align="center" colspan="'+colspan+'">'+
                            '               <div class="dataFallback" style="z-index: 9" data-text="Nenhum dado dispon\u00EDvel">'+
                            '                   <div style="position: absolute;top: calc(50% - 60px);width: 100%;text-align: center;">'+
                            '                   '+($('.actionsConfig_'+type).find('.iconConfig_add')[0].outerHTML)+
                            '                   </div>'+
                            '               </div>'+
                            '           </td>'+
                            '       </tr>';
            }
        }
    } else if (type == 'unidades') {
        if (mode == 'header') {
                _return =   '          <tr class="tableHeader">'+
                            '              <th class="tituloControle" data-sorter="false" style="width: 50px;" align="center"><label class="lblInfraCheck_label" for="lnkInfraCheck_configuracoes_'+type+'" accesskey=";"></label><a class="lnkInfraCheck" id="lnkInfraCheck_configuracoes_'+type+'" onclick="setSelectAllTr(this);" onmouseover="updateTipSelectAll(this)" onmouseenter="return infraTooltipMostrar(\'Selecionar Tudo\')" onmouseout="return infraTooltipOcultar();"><img src="/infra_css/imagens/check.gif" id="imgRecebidosCheck_'+type+'"></a></th>'+
                            '              <th class="tituloControle tituloFilter" style="min-width: 250px;">Nome da Unidade</th>'+
                            '              <th class="tituloControle tituloFilter">Sigla da Unidade</th>'+
                            '              <th class="tituloControle tituloFilter">Depend\u00EAncia</th>'+
                            (checkCapacidade('config_update_'+type) ? 
                            '              <th class="tituloControle" data-sorter="false" style="min-width: 100px;">Op\u00E7\u00F5es</th>'+
                            '              <th class="tituloControle" data-sorter="false" style="min-width: 120px;">A\u00E7\u00F5es</th>'+
                            '' : '')+
                            '          </tr>';
        } else if (mode == 'body') {
            if (value) {
                var classDisabled = (moment(value.data_fim,'YYYY-MM-DD HH:mm:ss') < moment() && value.data_fim != '0000-00-00 00:00:00') ? 'disabled' : '';
                var classClone = (value.nome_unidade.indexOf('(C\u00F3pia)') !== -1) ? {name: 'clone', text: 'C\u00D3PIA' } : false;
                var classNew = (value.nome_unidade.indexOf('(Novo)') !== -1) ? {name: 'new', text: 'NOVO' } : false;
                var config = (value.config && value.config !== null && (Object.keys(value.config).length > 0 || value.config.length > 0 )) ? value.config : false;
                var dependencia_config = (value.dependencia_config && value.dependencia_config !== null && (Object.keys(value.dependencia_config).length > 0 || value.dependencia_config.length > 0 )) ? value.dependencia_config : false;
                var autoedicao_subordinadas = (dependencia_config && dependencia_config !== null && typeof dependencia_config.administrativo !== 'undefined' && typeof dependencia_config.administrativo.autoedicao_subordinadas !== 'undefined' && dependencia_config.administrativo.autoedicao_subordinadas) ? dependencia_config.administrativo.autoedicao_subordinadas : false;
                var checkAutoEdit = (checkCapacidade('config_unidades_all') || arrayConfigAtivUnidade.dependencia == 0 || (arrayConfigAtivUnidade.dependencia != 0 && jmespath.search(tableConfigList.unidades, "[?dependencia==`"+arrayConfigAtivUnidade.dependencia+"`] | [0].dependencia_config.administrativo.autoedicao_subordinadas")) || value.dependencia == 0 || autoedicao_subordinadas) ? true : false;
                // console.log(value.nome_unidade, value.dependencia, autoedicao_subordinadas, checkAutoEdit, tableConfigList.unidades);
                    _return =   '       <tr data-tagname="SemGrupo" data-type="'+type+'" data-rowindex="id_'+type.slice(0, -1)+'" data-id="'+value.id_unidade+'" class="'+classDisabled+(classClone ? ' '+classClone.name : '')+(classNew ? ' '+classNew.name : '')+'">'+
                                '           <td align="center">'+
                                '               <input type="checkbox" class="checkboxSelectConfiguracoes" onclick="followSelecionarItens(this)" id="configuracoesPro_'+value.id_unidade+'" name="configuracoesPro" value="'+value.id_unidade+'" '+(checkCapacidade('config_update_'+type) && checkAutoEdit ? '' : 'disabled')+'></td>'+
                                '           <td align="left" class="'+(checkCapacidade('config_update_'+type) && checkAutoEdit ? 'editCell' : '')+'" data-key="nome_unidade" data-text="'+(classNew ? classNew.text : (classClone ? classClone.text : ''))+'"><span>'+value.nome_unidade+'</span></td>'+
                                '           <td align="left" class="'+(checkCapacidade('config_update_'+type) && checkAutoEdit ? 'editCell' : '')+'" data-key="sigla_unidade">'+value.sigla_unidade+'</td>'+
                                '           <td align="left" class="'+(checkCapacidade('config_update_'+type) && checkAutoEdit ? 'editCellSelect' : '')+'" data-array="unidades_all" data-keyref="id_unidade" data-key="dependencia" data-value="sigla_unidade" data-new-item="false" data-blank-item="true">'+(value.dependencia_sigla ? value.dependencia_sigla : '')+'</td>'+
                                (checkCapacidade('config_update_'+type) ? 
                                '           <td align="left">'+
                                '               <a class="newLink followLinkTr '+(config ? 'newLink_selected' : '')+'" style="font-size: 10pt;" onclick="editConfigOptions(this, '+value.id_unidade+')"><i class="fas fa-plus-circle" style="font-size: 100%;"></i>Op\u00E7\u00F5es</a>'+
                                '           </td>'+
                                '           <td align="right" data-key="action">'+
                                (checkCapacidade('config_update_'+type) && checkAutoEdit ? 
                                '               <a class="newLink followLinkTr" data-type="'+type+'" data-id="'+value.id_unidade+'" data-mode="disable" onclick="disableConfig(this)" onmouseover="return infraTooltipMostrar(\'Desativar\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-times-circle" style="font-size: 100%;"></i></a>'+
                                '               <a class="newLink followLinkTr" data-type="'+type+'" data-id="'+value.id_unidade+'" data-mode="reactive" onclick="reactiveConfig(this)" onmouseover="return infraTooltipMostrar(\'Reativar\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-undo-alt" style="font-size: 100%;"></i></a>'+
                                '' : '')+
                                (checkCapacidade('config_new_'+type) && checkAutoEdit ? 
                                '               <a class="newLink followLinkTr" data-type="'+type+'" data-id="'+value.id_unidade+'" data-mode="clone" onclick="cloneConfig(this)" onmouseover="return infraTooltipMostrar(\'Duplicar\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-copy" style="font-size: 100%;"></i></a>'+
                                '' : '')+
                                '           </td>'+
                                '' : '')+
                                '       </tr>';
            } else {
                var colspan = 4;
                    colspan = (checkCapacidade('config_update_'+type)) ? colspan+1 : colspan;
                _return =   '       <tr class="noData">'+
                            '           <td align="center" colspan="'+colspan+'">'+
                            '               <div class="dataFallback" style="z-index: 9" data-text="Nenhum dado dispon\u00EDvel">'+
                            '                   <div style="position: absolute;top: calc(50% - 60px);width: 100%;text-align: center;">'+
                            '                   '+($('.actionsConfig_'+type).find('.iconConfig_add')[0].outerHTML)+
                            '                   </div>'+
                            '               </div>'+
                            '           </td>'+
                            '       </tr>';
            }
        }
    } else if (type == 'entidades') {
        if (mode == 'header') {
                _return =   '          <tr class="tableHeader">'+
                            '              <th class="tituloControle" data-sorter="false" style="width: 50px;" align="center"><label class="lblInfraCheck_label" for="lnkInfraCheck_configuracoes_'+type+'" accesskey=";"></label><a class="lnkInfraCheck" id="lnkInfraCheck_configuracoes_'+type+'" onclick="setSelectAllTr(this);" onmouseover="updateTipSelectAll(this)" onmouseenter="return infraTooltipMostrar(\'Selecionar Tudo\')" onmouseout="return infraTooltipOcultar();"><img src="/infra_css/imagens/check.gif" id="imgRecebidosCheck_'+type+'"></a></th>'+
                            '              <th class="tituloControle tituloFilter" style="min-width: 250px;">Nome da Entidade</th>'+
                            '              <th class="tituloControle tituloFilter">Sigla da Entidade</th>'+
                            (checkCapacidade('config_update_'+type) ? 
                            '              <th class="tituloControle" data-sorter="false" style="min-width: 100px;">Op\u00E7\u00F5es</th>'+
                            '              <th class="tituloControle" data-sorter="false" style="min-width: 120px;">A\u00E7\u00F5es</th>'+
                            '' : '')+
                            '          </tr>';
        } else if (mode == 'body') {
            if (value) {
                var classDisabled = (moment(value.data_fim,'YYYY-MM-DD HH:mm:ss') < moment() && value.data_fim != '0000-00-00 00:00:00') ? 'disabled' : '';
                var classClone = (value.nome_entidade.indexOf('(C\u00F3pia)') !== -1) ? {name: 'clone', text: 'C\u00D3PIA' } : false;
                var classNew = (value.nome_entidade.indexOf('(Novo)') !== -1) ? {name: 'new', text: 'NOVO' } : false;
                    _return =   '       <tr data-tagname="SemGrupo" data-type="'+type+'" data-rowindex="id_'+type.slice(0, -1)+'" data-id="'+value.id_entidade+'" class="'+classDisabled+(classClone ? ' '+classClone.name : '')+(classNew ? ' '+classNew.name : '')+'">'+
                                '           <td align="center">'+
                                '               <input type="checkbox" class="checkboxSelectConfiguracoes" onclick="followSelecionarItens(this)" id="configuracoesPro_'+value.id_entidade+'" name="configuracoesPro" value="'+value.id_entidade+'" '+(checkCapacidade('config_update_'+type) ? '' : 'disabled')+'></td>'+
                                '           <td align="left" class="editCell" data-key="nome_entidade" data-text="'+(classNew ? classNew.text : (classClone ? classClone.text : ''))+'"><span>'+value.nome_entidade+'</span></td>'+
                                '           <td align="left" class="editCell" data-key="sigla_entidade">'+value.sigla_entidade+'</td>'+
                                (checkCapacidade('config_update_'+type) ? 
                                '           <td align="left">'+
                                '               <a class="newLink followLinkTr '+(value.config && value.config !== null && (Object.keys(value.config).length > 0 || value.config.length > 0 ) ? 'newLink_selected' : '')+'" style="font-size: 10pt;" onclick="editConfigOptions(this, '+value.id_entidade+')"><i class="fas fa-plus-circle" style="font-size: 100%;"></i>Op\u00E7\u00F5es</a>'+
                                '           </td>'+
                                '           <td align="right" data-key="action">'+
                                '               <a class="newLink followLinkTr" data-type="'+type+'" data-id="'+value.id_entidade+'" data-mode="disable" onclick="disableConfig(this)" onmouseover="return infraTooltipMostrar(\'Desativar\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-times-circle" style="font-size: 100%;"></i></a>'+
                                '               <a class="newLink followLinkTr" data-type="'+type+'" data-id="'+value.id_entidade+'" data-mode="reactive" onclick="reactiveConfig(this)" onmouseover="return infraTooltipMostrar(\'Reativar\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-undo-alt" style="font-size: 100%;"></i></a>'+
                                (checkCapacidade('config_new_'+type) ? 
                                '               <a class="newLink followLinkTr" data-type="'+type+'" data-id="'+value.id_entidade+'" data-mode="clone" onclick="cloneConfig(this)" onmouseover="return infraTooltipMostrar(\'Duplicar\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-copy" style="font-size: 100%;"></i></a>'+
                                '' : '')+
                                '           </td>'+
                                '' : '')+
                                '       </tr>';
            } else {
                var colspan = 4;
                    colspan = (checkCapacidade('config_update_'+type)) ? colspan+1 : colspan;
                _return =   '       <tr class="noData">'+
                            '           <td align="center" colspan="'+colspan+'">'+
                            '               <div class="dataFallback" style="z-index: 9" data-text="Nenhum dado dispon\u00EDvel">'+
                            '                   <div style="position: absolute;top: calc(50% - 60px);width: 100%;text-align: center;">'+
                            '                   '+($('.actionsConfig_'+type).find('.iconConfig_add')[0].outerHTML)+
                            '                   </div>'+
                            '               </div>'+
                            '           </td>'+
                            '       </tr>';
            }
        }
    } else if (
            type == 'tipos_documentos' ||
            type == 'tipos_justificativas' ||
            type == 'tipos_modalidades' ||
            type == 'tipos_requisicoes' ||
            type == 'nomenclaturas'
        ) {
            param = (type == 'tipos_documentos') ? {name_head: 'Tipo de Documento', label_id: 'id_tipo_documento', label_name: 'nome_documento', icon: 'fas fa-file-alt', index: 6, edit_table: true} : null;
            param = (type == 'tipos_justificativas') ? {name_head: 'Tipo de Justificativa', label_id: 'id_tipo_justificativa', label_name: 'nome_justificativa', icon: 'fas fa-star', index: 7, edit_table: true} : param;
            param = (type == 'tipos_modalidades') ? {name_head: 'Tipo de Modalidade', label_id: 'id_tipo_modalidade', label_name: 'nome_modalidade', icon: 'fas fa-wrench', index: 8, edit_table: true} : param;
            param = (type == 'tipos_requisicoes') ? {name_head: 'Tipo de Requisi\u00E7\u00E3o', label_id: 'id_tipo_requisicao', label_name: 'nome_requisicao', icon: 'fas fa-inbox', index: 9, edit_table: true} : param;
            param = (type == 'nomenclaturas') ? {name_head: 'Nomenclaturas', label_id: 'id_nomenclatura', label_name: 'nome_nomenclatura', icon: 'fas fa-ad', index: 10, edit_table: false} : param;
    
        if (mode == 'header') {
                _return =   '          <tr class="tableHeader">'+
                            '              <th class="tituloControle" data-sorter="false" style="width: 50px;" align="center"><label class="lblInfraCheck_label" for="lnkInfraCheck_configuracoes_'+type+'" accesskey=";"></label><a class="lnkInfraCheck" id="lnkInfraCheck_configuracoes_'+type+'" onclick="setSelectAllTr(this);" onmouseover="updateTipSelectAll(this)" onmouseenter="return infraTooltipMostrar(\'Selecionar Tudo\')" onmouseout="return infraTooltipOcultar();"><img src="/infra_css/imagens/check.gif" id="imgRecebidosCheck_'+type+'"></a></th>'+
                            '              <th class="tituloControle tituloFilter" style="min-width: 250px;">'+param.name_head+'</th>'+
                            (checkCapacidade('config_update_'+type) ? 
                            '              <th class="tituloControle" data-sorter="false" style="width: 100px;">Op\u00E7\u00F5es</th>'+
                            '              <th class="tituloControle" data-sorter="false" style="width: 120px;">A\u00E7\u00F5es</th>'+
                            '' : '')+
                            '          </tr>';
        } else if (mode == 'body') {
            if (value) {
                var classDisabled = (moment(value.data_fim,'YYYY-MM-DD HH:mm:ss') < moment() && value.data_fim != '0000-00-00 00:00:00') ? 'disabled' : '';
                var classClone = (value[param.label_name].indexOf('(C\u00F3pia)') !== -1) ? {name: 'clone', text: 'C\u00D3PIA' } : false;
                var classNew = (value[param.label_name].indexOf('(Novo)') !== -1) ? {name: 'new', text: 'NOVO' } : false;
                    _return =   '       <tr data-tagname="SemGrupo" data-type="'+type+'" data-rowindex="id_'+type.slice(0, -1)+'" data-id="'+value[param.label_id]+'" class="'+classDisabled+(classClone ? ' '+classClone.name : '')+(classNew ? ' '+classNew.name : '')+'">'+
                                '           <td align="center">'+
                                '               <input type="checkbox" class="checkboxSelectConfiguracoes" onclick="followSelecionarItens(this)" id="configuracoesPro_'+value[param.label_id]+'" value="'+value[param.label_id]+'" name="configuracoesPro" '+(checkCapacidade('config_update_'+type) && param.edit_table ? '' : 'disabled')+'></td>'+
                                (type == 'tipos_documentos' || type == 'tipos_requisicoes' ? 
                                '           <td align="left" class="editCellSelect" data-array="'+type+'" data-key="'+param.label_name+'" data-value="'+param.label_name+'" data-text="'+(classNew ? classNew.text : (classClone ? classClone.text : ''))+'" data-new-item="false" data-blank-item="true">'+(value[param.label_name] ? value[param.label_name] : '')+'</td>'+
                                '' : 
                                '           <td align="left" class="'+(checkCapacidade('config_update_'+type) && param.edit_table ? 'editCell' : '')+'" data-key="'+param.label_name+'" data-text="'+(classNew ? classNew.text : (classClone ? classClone.text : ''))+'"><span>'+value[param.label_name]+'</span></td>'+
                                '')+
                                (checkCapacidade('config_update_'+type) ? 
                                '           <td align="left">'+
                                '               <a class="newLink followLinkTr '+(value.config && value.config !== null && (Object.keys(value.config).length > 0 || value.config.length > 0 ) ? 'newLink_selected' : '')+'" style="font-size: 10pt;" onclick="editConfigOptions(this, '+value[param.label_id]+')"><i class="fas fa-plus-circle" style="font-size: 100%;"></i>Op\u00E7\u00F5es</a>'+
                                '           </td>'+
                                '           <td align="right" data-key="action">'+
                                '               <a class="newLink followLinkTr" data-type="'+type+'" data-id="'+value[param.label_id]+'" data-mode="disable" onclick="disableConfig(this)" onmouseover="return infraTooltipMostrar(\'Desativar\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-times-circle" style="font-size: 100%;"></i></a>'+
                                '               <a class="newLink followLinkTr" data-type="'+type+'" data-id="'+value[param.label_id]+'" data-mode="reactive" onclick="reactiveConfig(this)" onmouseover="return infraTooltipMostrar(\'Reativar\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-undo-alt" style="font-size: 100%;"></i></a>'+
                                (checkCapacidade('config_new_'+type) && param.edit_table ? 
                                '               <a class="newLink followLinkTr" data-type="'+type+'" data-id="'+value[param.label_id]+'" data-mode="clone" onclick="cloneConfig(this)" onmouseover="return infraTooltipMostrar(\'Duplicar\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-copy" style="font-size: 100%;"></i></a>'+
                                '' : '')+
                                '           </td>'+
                                '' : '')+
                                '       </tr>';
            } else {
                var colspan = 4;
                    colspan = (checkCapacidade('config_update_'+type)) ? colspan+1 : colspan;
                    colspan = (countUnidades > 1 ) ? colspan+1 : colspan;
                _return =   '       <tr class="noData">'+
                            '           <td align="center" colspan="'+colspan+'">'+
                            '               <div class="dataFallback" style="z-index: 9" data-text="Nenhum dado dispon\u00EDvel">'+
                            '                   <div style="position: absolute;top: calc(50% - 60px);width: 100%;text-align: center;">'+
                            '                   '+($('.actionsConfig_'+type).find('.iconConfig_add')[0].outerHTML)+
                            '                   </div>'+
                            '               </div>'+
                            '           </td>'+
                            '       </tr>';
            }
        }
    }
    return _return;
}
function getTableTabConfig(type, listConfig) {
    // console.log(type, listConfig);
    var tabsID = $('#tabs-'+type);
    var idConfigTabela = 'tableConfiguracoesPanel_'+type;
    var checkListConfig = (listConfig.length > 0 && listConfig != 0) ? listConfig.length : false;
    var countConfig = (checkListConfig && checkListConfig == 1) 
                        ? checkListConfig+' registro:' 
                        : (checkListConfig && checkListConfig > 1) ? checkListConfig+' registros:' : 'nenhum registro';

    if (typeof listConfig !== 'undefined') {
    // if (typeof listConfig !== 'undefined' && listConfig.length > 0 && listConfig != 0) {
        if (checkListConfig) {
            listConfig = jmespath.search(listConfig, "sort_by([*],&data_fim)");
            
            var countUnidades = uniqPro(jmespath.search(listConfig, "[?sigla_unidade].sigla_unidade"));
                countUnidades = (countUnidades !== null) ? countUnidades.length : 0;
        } else {
            var countUnidades = 0;
        }
        htmlTableConfig =   '<div id="tabelaConfigPanel_'+type+'" class="tabelaPanelScroll" style="margin-top: 5px;">'+
                            (checkCapacidade('config_update_'+type) ? 
                            '   <div class="editTableToggle hideDisabledItens" style="right: 460px;">'+
                            '           <label class="label" for="changeDisabledTableConfig_'+type+'"><i class="fas fa-eye-slash '+(getOptionsPro('changeDisabledTableConfig_'+type) && getOptionsPro('changeDisabledTableConfig_'+type) == 'show' ? 'azulColor' : 'cinzaColor')+'" style="margin: 0px 6px 0 4px;"></i> Inativos</label>'+
                            '           <div class="onoffswitch">'+
                            '               <input type="checkbox" name="onoffswitch" data-type="'+type+'" onchange="changeDisabledTableConfig(this)" class="onoffswitch-checkbox" id="changeDisabledTableConfig_'+type+'" tabindex="0" '+(getOptionsPro('changeDisabledTableConfig_'+type) && getOptionsPro('changeDisabledTableConfig_'+type) == 'show' ? 'checked' : '')+'>'+
                            '               <label class="onoffswitch-label" for="changeDisabledTableConfig_'+type+'"></label>'+
                            '           </div>'+
                            '   </div>'+
                            '   <div class="editTableToggle">'+
                            '           <label class="label" for="changeViewTableConfig_'+type+'"><i class="fas fa-edit azulColor" style="margin: 0px 6px 0 4px;"></i> Edi\u00E7\u00E3o</label>'+
                            '           <div class="onoffswitch">'+
                            '               <input type="checkbox" name="onoffswitch" data-type="'+type+'" onchange="changeViewTableConfig(this)" class="onoffswitch-checkbox" id="changeViewTableConfig_'+type+'" tabindex="0" checked>'+
                            '               <label class="onoffswitch-label" for="changeViewTableConfig_'+type+'"></label>'+
                            '           </div>'+
                            '   </div>'+
                            '' : '')+
                            '   <table id="'+idConfigTabela+'" class="tableInfo tableZebra tableFollow tableAtividades" data-tabletype="'+type+'">'+
                            '      <caption class="infraCaption" style="text-align: left; margin-top: 10px;">'+countConfig+'</caption>'+
                            '      <thead style="position:relative">'+
                            getRowsTableTabConfig(type, 'header', listConfig)+
                            '      </thead>'+
                            '      <tbody>';
        if (checkListConfig) {
            $.each(listConfig,function(index, value){
                htmlTableConfig +=    getRowsTableTabConfig(type, 'body', listConfig, value);
            });
        } else {
            htmlTableConfig +=    getRowsTableTabConfig(type, 'body');
        }
        htmlTableConfig +=  '       </tbody>'+
                            '   </table>'+
                            '</div>';

        tabsID.html(htmlTableConfig);

        var tableConfigID = '#tabelaConfigPanel_'+type;
        var tableConfigElem = $(tableConfigID);
        if (!getOptionsPro('panelHeight_configuracoesTabelaPro_'+type) && tableConfigElem.height() > 800) { setOptionsPro('panelHeight_configuracoesTabelaPro_'+type, 800) }
        initPanelResize(tableConfigID, 'configuracoesTabelaPro_'+type);

        tableConfigList[type] = listConfig;
        $.each(listConfig,function(i, v){
            var id = (type == 'atividades') ? v.id_atividade : 0;
                id = (type == 'planos') ? v.id_plano : id;
                id = (type == 'programas') ? v.id_programa : id;
                id = (type == 'users') ? v.id_user : id;
                id = (type == 'unidades') ? v.id_unidade : id;
                id = (type == 'entidades') ? v.id_entidade : id;
            if (getRecentDateRow(v.data_inicio, -5)) {
                var row = tableConfigElem.find('tbody tr[data-id="'+id+'"]');
                setTimeout(function(){ 
                    row.find('td').effect('highlight').delay(2).effect('highlight').delay(2).effect('highlight');
                    if (
                        (type == 'atividades' && row.hasClass('new')) ||
                        type == 'planos' || 
                        type == 'programas' || 
                        type == 'users' || 
                        type == 'unidades' ||
                        type == 'entidades' 
                        ) {
                        row.get(0).scrollIntoView();
                        tableConfigElem.scrollTop(tableConfigElem.scrollTop()-30);
                    }
                }, 500);
            }
        });
        rememberScroll(tableConfigID, 'config_'+type, false);

        var tableSorterList = (type == 'atividades') ? [[4,0], [1,0]] : false;
            tableSorterList = (type == 'planos') ? [[2,0], [1,0]] : tableSorterList;
            tableSorterList = (type == 'programas') ? [[1,0]] : tableSorterList;
            tableSorterList = (type == 'users') ? [[1,0]] : tableSorterList;
            tableSorterList = (type == 'unidades') ? [[3,0], [1,0]] : tableSorterList;
            tableSorterList = (type == 'entidades') ? [[1,0]] : tableSorterList;
            
        var configTabela = $('#'+idConfigTabela);
            configTabela.tablesorter({
                    sortList: tableSorterList,
                    textExtraction: {
                        1: function (elem, table, cellIndex) {
                            var text = $(elem).find('span').text().trim();
                            var td = $(elem).closest('tr');
                            var priority = (td.hasClass('new')) ? '1 ' : '';
                                priority = (td.hasClass('closed')) ? 'Z999 ' : '';
                            return priority+text;
                        },
                        8: function (elem, table, cellIndex) {
                            var text_date = $(elem).data('time-sorter');
                            return text_date;
                        }
                    },
                    widgets: ["saveSort", "filter"],
                    widgetOptions: {
                        saveSort: true,
                        filter_hideFilters: true,
                        filter_columnFilters: true,
                        filter_saveFilters: true,
                        filter_hideEmpty: true,
                        filter_excludeFilter: {}
                    },
                    sortReset: true,
                    headers: {
                        0: { sorter: false, filter: false },
                        1: { filter: true },
                        2: { filter: true },
                        3: { filter: true },
                        4: { filter: true },
                        5: { filter: true }
                    }
                }).on("sortEnd", function (event, data) {
                    checkboxRangerSelectShift();
                }).on("filterEnd", function (event, data) {
                    checkboxRangerSelectShift();
                    var caption = $(this).find("caption").eq(0);
                    var tx = caption.text();
                        caption.text(tx.replace(/\d+/g, data.filteredRows));
                        $(this).find("tbody > tr:visible > td > input").prop('disabled', false);
                        $(this).find("tbody > tr:hidden > td > input").prop('disabled', true);
                });

        if (checkCapacidade('config_update_'+type)) {

            configEditor = new SimpleTableCellEditor(idConfigTabela);
            configEditor.SetEditableClass("editCell");
            configEditor.SetEditableClass("editCellNum", { 
                validation: $.isNumeric,
                internals: {
                    renderEditor: (elem, oldVal) => {
                        $(elem).html('<input type="number" style="max-width:none" value="'+oldVal+'">').find('input').focus();
                    }
                }
            });
            configEditor.SetEditableClass("editCellNew");
            configEditor.SetEditableClass("editCellDate", {
                internals: {
                    renderEditor: (elem, oldVal) => {
                        var data = $(elem).data();
                        var dateLimit = $(elem).closest('tr').find('td[data-label-limit="'+data.refLimit+'"]').text();
                        var arrayDateLimit = (data.limit == 'min') 
                                                ? 'min="'+moment(dateLimit,'DD/MM/YYYY').format('YYYY-MM-DD')+'"'
                                                : 'max="'+moment(dateLimit,'DD/MM/YYYY').format('YYYY-MM-DD')+'"';
                        $(elem).html('<input type="date" '+arrayDateLimit+' style="max-width:none" value="'+moment(oldVal,'DD/MM/YYYY').format('YYYY-MM-DD')+'">').find('input').focus();
                    },
                    renderValue: (elem, formattedNewVal) => { 
                        $(elem).text(formattedNewVal); 
                    },
                    extractEditorValue: (elem) => { 
                        return moment($(elem).find('input').val(),'YYYY-MM-DD').format('DD/MM/YYYY');
                    },
                }
            });
            configEditor.SetEditableClass("editCellSelect", {
                internals: {
                    renderEditor: (elem, oldVal) => {
                        var data = $(elem).data();
                        var newItem = (typeof data.newItem !== 'undefined' && data.newItem == false) ? '' : '<option value="new">\u2795 Novo Item</option></select>'; 
                        var arraySelect = (data.array == 'self') ? tableConfigList[type] : arrayConfigAtividades[data.array]; 
                            arraySelect = (data.array == 'tipos_requisicoes' || data.array == 'tipos_documentos') ? jmespath.search(arrayListTypesSEI.selSeriePesquisa,"[*].{label: name, value: name}") : arraySelect;

                        var key_ref = (typeof data.keyref !== 'undefined') ? data.keyref : data.key;
                        var selectArray = (data.array == 'tipos_requisicoes' || data.array == 'tipos_documentos') ?  arraySelect : jmespath.search(arraySelect,"[*].{label: "+data.value+", value: "+key_ref+"}");
                            selectArray = selectArray.filter((v,i,a)=>a.findIndex(t=>(t.value === v.value))===i);

                        var htmlOptions = $.map(selectArray, function(v){
                                                var selected = (v.label == $(elem).text().trim()) ? 'selected' : '';
                                                    return '<option value="'+v.value+'" '+selected+'>'+v.label+'</option>';
                                            }).join('');
                        var htmlBlankOption = (typeof data.blankItem !== 'undefined' && data.blankItem == true) ? '<option value="0">&nbsp;</option>' : '';
                        $(elem).html(`<select data-old="`+oldVal+`" data-type="`+type+`" onchange="configTableNewItem(this)">`+htmlBlankOption+htmlOptions+newItem).find('select').focus();
                    },
                    renderValue: (elem, formattedNewVal) => { 
                        if (formattedNewVal != 'new') {
                            $(elem).text(formattedNewVal); 
                        }
                    },
                    extractEditorValue: (elem) => { 
                        $(elem).data('newvalue',$(elem).find('select').val());
                        return $(elem).find('select').find('option:selected').text().trim(); 
                    },
                }
            });
            tableConfigEditor[type] = configEditor;
         
            configTabela.on("cell:edited", function (event) {   
                var _this = $(event.element);
                var td = _this.closest('td');
                var tr = _this.closest('tr');
                var data = td.data();
                var data_tr = tr.data();
                var value = event.newValue;
                if (_this.hasClass('editCellSelect')) {
                    if (typeof event.newValue === 'undefined' || event.newValue == 'new') {
                        _this.text(event.oldValue);
                    }
                    if (typeof event.newValue !== 'undefined' && typeof data.newvalue !== 'undefined') {
                        value = data.newvalue;
                    }
                } else if (_this.hasClass('editCellDate') && typeof event.newValue !== 'undefined') {
                    var value_nottime = moment(event.newValue,'DD/MM/YYYY').format('YYYY-MM-DD');
                    if (value_nottime == 'Invalid date') {
                        _this.text(event.oldValue);
                        td.addClass('editCellLoadingError');
                        return false;
                    } else {
                        td.attr('data-time-sorter', value_nottime);
                        value = (data.key == 'data_fim_vigencia') 
                                ? moment(value,'DD/MM/YYYY').endOf('day').format('YYYY-MM-DD HH:mm:ss') 
                                : moment(value,'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
                                // console.log('dateEnd',value);
                        if (data_tr.type == 'planos' || data_tr.type == 'programas') {
                            var data_inicio = (data.key == 'data_inicio_vigencia') ? value_nottime : tr.find('td[data-key="data_inicio_vigencia"]').data('time-sorter');
                            var data_fim = (data.key == 'data_fim_vigencia') ? value_nottime : tr.find('td[data-key="data_fim_vigencia"]').data('time-sorter');
                            var listDados = jmespath.search(tableConfigList[data_tr.type],"[?vigencia==`true`]");
                            var check = checkDatesLoopArray(listDados, data_inicio, data_fim, data_tr.idref, data_tr.id, {inicio: 'data_inicio_vigencia', fim: 'data_fim_vigencia', idreftype: data_tr.idreftype, id: data_tr.rowindex});
                            if (check && check.length > 0) {
                            // if (1==2) {
                                td.addClass('editCellLoadingError');
                                var v = jmespath.search(listDados,"[?"+data_tr.rowindex+"==`"+check[0]+"`] | [0]");
                                console.log(v);
                                var text_conflict = (data_tr.type == 'programas') 
                                        ? '<br><br>'+v.sigla_unidade+' <b style="font-weight: bold;">'+moment(v.data_inicio_vigencia,'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')+' \u00E0 '+moment(v.data_fim_vigencia,'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')+'</b>'
                                        : '<br><br>'+v.nome_completo+' ('+v.nome_modalidade+') <b style="font-weight: bold;">'+moment(v.data_inicio_vigencia,'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')+' \u00E0 '+moment(v.data_fim_vigencia,'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')+'</b>';
                                
                                var text_box_conflict = (data_tr.type == 'programas') 
                                        ? 'Um ou mais dias deste programa de gest\u00E3o j\u00E1 est\u00E3o inclu\u00EDdos em outro programa de gest\u00E3o da unidade! '
                                        : 'Um ou mais dias deste plano de trabalho j\u00E1 est\u00E3o inclu\u00EDdos em outro plano de trabalho do usu\u00E1rio!';
                                setTimeout(function(){ 
                                    alertaBoxPro('Error', 'exclamation-triangle', text_box_conflict+text_conflict);
                                }, 100);
                                return false;
                            }
                        }
                    }
                }
                if (typeof event.newValue !== 'undefined' && _this.hasClass('editCellNew')) {
                    _this.removeClass('editCellNew').addClass('editCellSelect');
                }
                if (typeof event.newValue !== 'undefined' && typeof data.text !== 'undefined' && event.newValue.trim().indexOf('(C\u00F3pia)') === -1) {
                    tr.removeClass('clone');
                }
                if (typeof event.newValue !== 'undefined' && typeof data.text !== 'undefined' && event.newValue.trim().indexOf('(Novo)') === -1) {
                    tr.removeClass('new');
                }
                if (typeof event.newValue !== 'undefined' && data.key == 'data_fim_vigencia' && moment(value, 'YYYY-MM-DD HH:mm:ss') < moment()) {
                    tr.addClass('closed');
                } else {
                    tr.removeClass('closed');
                }
                if (typeof event.newValue !== 'undefined' && data.key == 'data_inicio_vigencia' && moment(value, 'YYYY-MM-DD HH:mm:ss') > moment()) {
                    tr.addClass('future');
                } else {
                    tr.removeClass('future');
                }
                if (typeof event.newValue !== 'undefined') {

                    td.addClass('editCellLoading');
                    if (td.hasClass('alertAssinatura')) {
                        confirmaFraseBoxPro('Editar essas informa\u00E7\u00F5es ir\u00E1 <b style="font-weight: bold;">CANCELAR A ASSINATURA</b> vinculada. Deseja prosseguir?', 'CANCELAR', function() { 
                            updateConfigServerInline(_this, type, value, data, data_tr);
                        }, function() {
                            td.removeClass('editCellLoading').text(event.oldValue);
                        });
                    } else {
                        updateConfigServerInline(_this, type, value, data, data_tr);
                    }
                }
            });
        }
        
        var filterConfig = configTabela.find('.tablesorter-filter-row').get(0);
        if (typeof filterConfig !== 'undefined') {
            var observerFilterConfig = new MutationObserver(function(mutations) {
                var _this = $(mutations[0].target);
                var _parent = _this.closest('table');
                var iconFilter = _parent.find('.filterTablePro button');
                var checkIconFilter = iconFilter.hasClass('active');
                var hideme = _this.hasClass('hideme');
                if (hideme && checkIconFilter) {
                    iconFilter.removeClass('active');
                }
            });
            setTimeout(function(){ 

                var htmlFilterConfig =  '<div class="btn-group filterTablePro" role="group" style="right: 25px;top: -38px;z-index: 99;position: absolute;">'+
                                        '   <button type="button" onclick="downloadTablePro(this)" data-icon="fas fa-download" style="padding: 0.1rem .5rem; font-size: 9pt;" data-value="Baixar" class="btn btn-sm btn-light">'+
                                        '       <i class="fas fa-download" style="padding-right: 3px; cursor: pointer; font-size: 10pt; color: #888;"></i>'+
                                        '       <span class="text">Baixar</span>'+
                                        '   </button>'+
                                        '   <button type="button" onclick="copyTablePro(this)" data-icon="fas fa-copy" style="padding: 0.1rem .5rem; font-size: 9pt;" data-value="Copiar" class="btn btn-sm btn-light">'+
                                        '       <i class="fas fa-copy" style="padding-right: 3px; cursor: pointer; font-size: 10pt; color: #888;"></i>'+
                                        '       <span class="text">Copiar</span>'+
                                        '   </button>'+
                                        '   <button type="button" onclick="filterTablePro(this)" style="padding: 0.1rem .5rem; font-size: 9pt;" data-value="Pesquisar" class="btn btn-sm btn-light '+(configTabela.find('tr.tablesorter-filter-row').hasClass('hideme') ? '' : 'active')+'">'+
                                        '       <i class="fas fa-search" style="padding-right: 3px; cursor: pointer; font-size: 10pt; color: #888;"></i>'+
                                        '       Pesquisar'+
                                        '   </button>'+
                                        '</div>';
                    configTabela.find('thead .filterTablePro').remove();
                    configTabela.find('thead').prepend(htmlFilterConfig);
                    observerFilterConfig.observe(filterConfig, {
                        attributes: true
                    });
            }, 500);
        }
        
        var observerTableConfig = new MutationObserver(function(mutations) {
            var _this = $(mutations[0].target);
            var _parent = _this.closest('table');
            var count_all = _parent.find('tr.infraTrMarcada').length;
            var count_disable = _parent.find('tr.infraTrMarcada').not('.disabled').length;
            var count_reactive = _parent.find('tr.infraTrMarcada.disabled').length;
            var count_approve = _parent.find('tr.infraTrMarcada.approve').length;
            var count_disapprove = _parent.find('tr.infraTrMarcada.disapprove').length;
            if (count_approve > 0) {
                $('#configuracoesProActions .actionsConfig_'+type).find('.iconConfig_disapprove').show().find('.fa-layers-counter').text(count_approve);
            } else {
                $('#configuracoesProActions .actionsConfig_'+type).find('.iconConfig_disapprove').hide();
            }
            if (count_disapprove > 0) {
                $('#configuracoesProActions .actionsConfig_'+type).find('.iconConfig_approve').show().find('.fa-layers-counter').text(count_disapprove);
            } else {
                $('#configuracoesProActions .actionsConfig_'+type).find('.iconConfig_approve').hide();
            }
            if (count_disable > 0) {
                $('#configuracoesProActions .actionsConfig_'+type).find('.iconConfig_remove').show().find('.fa-layers-counter').text(count_disable);
            } else {
                $('#configuracoesProActions .actionsConfig_'+type).find('.iconConfig_remove').hide();
            }
            if (count_reactive > 0) {
                $('#configuracoesProActions .actionsConfig_'+type).find('.iconConfig_reactive').show().find('.fa-layers-counter').text(count_reactive);
            } else {
                $('#configuracoesProActions .actionsConfig_'+type).find('.iconConfig_reactive').hide();
            }
            if (count_all > 0) {
                $('#configuracoesProActions .actionsConfig_'+type).find('.iconConfig_clone').show().find('.fa-layers-counter').text(count_all);
            } else {
                $('#configuracoesProActions .actionsConfig_'+type).find('.iconConfig_clone').hide();
            }
        });
        setTimeout(function(){ 
            configTabela.find('tbody tr').each(function(){
                observerTableConfig.observe(this, {
                        attributes: true
                });
            });
            checkboxRangerSelectShift();
        }, 500);
        if (type == 'planos') {
            initClassicEditor();
        }
    }
}
function updateConfigServerInline(_this, type, value, data, data_tr, objIndex) {
    var update = updateConfigServer({mode: 'update', id: data_tr.id, type: data_tr.type, key: data.key, value: value, rowindex: data_tr.rowindex});
    if (type == 'planos' && (data.key == 'data_inicio_vigencia' || data.key == 'data_fim_vigencia' || data.key == 'carga_horaria')) {
        updateConfigTempoPactuado(_this, data_tr.id, update.objIndex, data_tr);
    }
}
function changeDisabledTableConfig(this_) {
    var _this = $(this_);
    var type = _this.data('type');
    var checkbox = _this.is(':checked');
    var table = $('#tableConfiguracoesPanel_'+type);
    var icon = _this.closest('.editTableToggle').find('.label i');
        icon.toggleClass('fa-eye-slash fa-sync-alt').addClass('fa-spin');
    if (checkbox) {
        icon.addClass('azulColor').removeClass('cinzaColor');
        setOptionsPro('changeDisabledTableConfig_'+type,'show');
        console.log('changeDisabledTableConfig_'+type,'show');
    } else {
        icon.addClass('cinzaColor').removeClass('azulColor');
        setOptionsPro('changeDisabledTableConfig_'+type,'hide');
        console.log('changeDisabledTableConfig_'+type,'hide');
    }
    getTabConfig(type, 'get');
}
function changeViewTableConfig(this_) {
    var _this = $(this_);
    var type = _this.data('type');
    var checkbox = _this.is(':checked');
    var table = $('#tableConfiguracoesPanel_'+type);
    console.log('#tableConfiguracoesPanel_'+type, table.length);
    var icon = _this.closest('.editTableToggle').find('.label i');
    tableConfigEditor[type].Toggle(checkbox);
    if (checkbox) {
        table.removeClass('editDisabled').find('.checkboxSelectConfiguracoes').prop('disabled', false);
        icon.addClass('azulColor').removeClass('cinzaColor');
    } else {
        table.find('.checkboxSelectConfiguracoes:checked').trigger('click');
        table.addClass('editDisabled').find('.checkboxSelectConfiguracoes').prop('disabled', true);
        icon.addClass('cinzaColor').removeClass('azulColor');
    }
}
function getWorkDaysBetweenDates(inicio, fim, sigla_unidade) {
    var config_unidade = getConfigDadosUnidade(sigla_unidade);
    var config_feriados = (typeof config_unidade.feriados !== 'undefined' && config_unidade.feriados !== null) ? config_unidade.feriados : false;
    var arrayFeriados = (config_unidade.count_dias_uteis && inicio != '' && fim != '') 
                    ? jmespath.search(getHolidayBetweenDates(moment(inicio, 'YYYY-MM-DD HH:mm:ss').format('Y')+'-01-01', moment(fim, 'YYYY-MM-DD HH:mm:ss').add(1, 'Y').format('Y')+'-01-01', config_feriados), "[*].d_")
                    : [];
    var dias = (config_unidade.count_dias_uteis) 
                ? moment().isoWeekdayCalc({  
                    rangeStart: inicio,  
                    rangeEnd: fim,  
                    weekdays: [1,2,3,4,5],  
                    exclusions: arrayFeriados
                })
                : moment(fim, 'YYYY-MM-DD HH:mm:ss').diff(moment(inicio, 'YYYY-MM-DD HH:mm:ss'), 'days');
        dias = (dias < 0) ? false : dias;
    return {dias: dias, feriados: arrayFeriados};
}
function updateConfigTempoPactuado(_this, id, objIndex, data_tr) {
    var value = jmespath.search(tableConfigList.planos, "[?id_plano==`"+id+"`] | [0]");
    if (value !== null) {
        var dates = getWorkDaysBetweenDates(value.data_inicio_vigencia, value.data_fim_vigencia, value.sigla_unidade);
        if (dates.dias) {
            var tempo_total = parseInt(dates.dias)*parseInt(value.carga_horaria);
            var tr = _this.closest('tr');
            tr.find('td[data-key="tempo_total"]').text(tempo_total);
            tableConfigList.planos[objIndex].tempo_total = tempo_total;
            updateConfigServer({mode: 'update', id: id, type: 'planos', key: 'tempo_total', value: tempo_total, rowindex: data_tr.rowindex});
            setTimeout(function(){ 
                updateTempoProporcionalPlanos();
                console.log('updateTempoProporcionalPlanos'); 
            }, 1500);
        }
    }
}
function reactiveConfig(this_) {
    var _this = $(this_);
    var data_this = _this.data();
    var id = data_this.id;
    var ids = $('#tabelaConfigPanel_'+data_this.type).find('.checkboxSelectConfiguracoes:checked').map(function(){ if($(this).closest('tr').hasClass('disabled')) { return $(this).val() } }).get();
    if (id != 0 || ids.length > 0) {
        var action = 'config_update_'+data_this.type;
        if (checkCapacidade(action)) {
            var param = {
                action: action,
                id: id,
                ids: ids,
                type: data_this.type,
                key: 'data_fim',
                mode: 'reactive'
            };
            getServerAtividades(param, action);
            console.log(param);
        }
    }
}
function cloneConfig(this_) {
    var _this = $(this_);
    var data_this = _this.data();
    var id = data_this.id;
    var action = 'config_update_'+data_this.type;
    var table =  $('#tabelaConfigPanel_'+data_this.type);
    var ids = table.find('.checkboxSelectConfiguracoes:checked').map(function(){ return $(this).val() }).get();
    var param = {
        action: action,
        id: id,
        ids: ids,
        type: data_this.type,
        key: 'all',
        mode: 'clone'
    };
    var countSelected = table.find('tr.infraTrMarcada').length;
    if (id != 0 ) {
        _this.find('i').attr('class','fas fa-spinner fa-spin');
        getConfigServer(action, param);
    } else if (ids.length > 0) {
        confirmaFraseBoxPro('Tem certeza que deseja <b style="font-weight: bold;">DUPLICAR</b> '+(countSelected > 1 ? 'os registros' : 'o registro')+(id == 0 ? (countSelected > 1 ? ' selecionados' : ' selecionado') : '')+'?', 'SIM', 
        function(){
            getConfigServer(action, param);
        });
    }
    setOptionsPro('rememberScroll_config_'+data_this.type, table.scrollTop());
}
function newConfig_(this_) {
    var _this = $(this_);
    if (_this.data('type') == 'users') {
        newConfig(this_);
    } else {
        var textBox = (typeof _this.attr('onmouseover') !== 'undefined') ? extractTooltip(_this.attr('onmouseover')) : 'adicionar novo item';
        confirmaBoxPro('Tem certeza que deseja '+textBox.toLowerCase()+'?', function(){
            newConfig(this_);
        });
    }
}
function newConfig(this_) {
    var _this = $(this_);
    var data_this = _this.data();
    var type = data_this.type;
    var action = (checkCapacidade('config_new_'+type)) ? 'config_new_'+type: 'config_update_'+type;
    var dates_inicio = (type == 'planos' || type == 'programas') ? moment().startOf('month').format('YYYY-MM-DD HH:mm:ss') : false;
    var dates_fim = (type == 'planos' || type == 'programas') ? moment().endOf('month').format('YYYY-MM-DD HH:mm:ss') : false;
    var datesKey = (type == 'planos' || type == 'programas') ? getWorkDaysBetweenDates(dates_inicio, dates_fim, arrayConfigAtivUnidade.sigla_unidade) : false;
    var key = (type == 'atividades') 
            ? {
                id_unidade: arrayConfigAtivUnidade.id_unidade,
                nome_atividade: '(Novo)',
                tempo_pactuado: 1,
                dias_planejado: 1,
                macroatividade: 'NULL',
                config: 
                    {
                        etiqueta: [],
                        complexidade: [
                            {
                                complexidade: "Baixo", 
                                fator: 0.5, 
                                default: true
                            },{
                                complexidade: "M\u00E9dio", 
                                fator: 1, 
                                default: false
                            },{
                                complexidade: "Alto", 
                                fator: 1.5, 
                                default: false
                            }],
                        tipo_processo: []
                    }
            } : [];

        key = (type == 'planos') 
            ? {
                id_user: parseInt(arrayConfigAtividades.perfil.id_user),
                id_unidade: parseInt(arrayConfigAtivUnidade.id_unidade),
                id_tipo_modalidade: 4,
                carga_horaria: 8,
                tempo_total: datesKey.dias,
                data_inicio_vigencia: dates_inicio,
                data_fim_vigencia: dates_fim,
                config: {
                    atividades_lista_integral:true
                }
            } : key;

        key = (type == 'programas') 
            ? {
                id_unidade: arrayConfigAtivUnidade.id_unidade,
                data_inicio_vigencia: dates_inicio,
                data_fim_vigencia: dates_fim,
                config: []
            } : key;

        key = (type == 'unidades') 
            ? {
                sigla_unidade: 'SIGLA',
                nome_unidade: '(Novo)',
                entidade: arrayConfigAtividades.entidades[0].id_entidade.toString(),
                dependencia: arrayConfigAtivUnidade.id_unidade,
                config: {
                    atividades:{
                        lista_superior:true
                    },
                    planos:{
                        prazo_comparecimento: 1,
                        data_comparecimento: "Dia"
                    },
                    distribuicao:{
                        horario_util:{
                            inicio:"00:00",
                            fim:"23:59"
                        },
                        count_dias_uteis:true,
                        count_horas:true,
                        notificacao:{
                            texto_criacao: "Prezado(a) {usuario}, \n\nInformo a edi\u00E7\u00E3o da {requisicao}, relativa \u00E0 "+__.atividade+" {atividade}: \n\nProcesso: {processo} \n\nAssunto: {assunto} \n\nPrazo: {prazo} dias \u00FAteis \n\nAtenciosamente,",
                            texto_conclusao: "Prezado(a), \n\nInformo a cria\u00E7\u00E3o do documento {documento_produto} para a aprecia\u00E7\u00E3o "+__.Gerencial+", relativa \u00E0 "+__.atividade+" {atividade}: \n\nProcesso: {processo} \n\nAssunto: {assunto} \n\nData de Entrega: at\u00E9 {data_entrega} \n\nObserva\u00E7\u00F5es: {observacoes} \n\nAtenciosamente,".replace(/'/g, "\\'"),
                            email: "sigla@"+window.location.hostname.replace(window.location.hostname.split('.')[0]+'.','')
                        }
                    }
                },
            } : key;

            key = (type == 'tipos_documentos') 
                ? {
                    nome_documento: '(Novo)'
                } : key;

            key = (type == 'tipos_justificativas') 
                ? {
                    nome_justificativa: '(Novo)'
                } : key;

            key = (type == 'tipos_modalidades') 
                ? {
                    nome_modalidade: '(Novo)'
                } : key;

            key = (type == 'tipos_requisicoes') 
                ? {
                    nome_requisicao: '(Novo)'
                } : key;

            key = (type == 'entidades') 
                ? {
                    nome_entidade: '(Novo)',
                    sigla_entidade: 'SIGLA',
                    config: []
                } : key;
    

    if (type != 'users') {
        var param = {
            action: action,
            id: -1,
            ids: [],
            type: data_this.type,
            key: (type == 'unidades' ? key : JSON.stringify(key)),
            mode: 'new'
        };
        _this.find('i.icon-parent').attr('class','fas fa-spinner fa-spin icon-parent');
        getConfigServer(action, param);
    } else if (type == 'users') {
        newConfigUser(this_);
    }
}
function newConfigUser(this_) {
    var _this = $(this_);
    var htmlBox =   '<div id="boxUser" class="atividadeWork">'+
                    '   <table style="font-size: 10pt;width: 100%;" class="seiProForm">'+
                    '      <tr>'+
                    '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                    '               <label for="user_nome_completo"><i class="iconPopup iconSwitch fas fa-user-tie cinzaColor"></i>Nome Completo:</label>'+
                    '           </td>'+
                    '           <td class="required">'+
                    '               <input id="user_nome_completo" type="text" required>'+
                    '           </td>'+
                    '           <td style="" class="label">'+
                    '               <label class="last" for="user_login"><i class="iconPopup iconSwitch fas fa-user-shield cinzaColor" style="float: initial;"></i>Usu\u00E1rio SEI:</label>'+
                    '           </td>'+
                    '           <td class="required">'+
                    '               <input id="user_login" type="text" style="font-size: 1em;" value="" required>'+
                    '           </td>'+
                    '      </tr>'+
                    '      <tr>'+
                    '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                    '               <label for="user_apelido"><i class="iconPopup iconSwitch fas fa-user-circle cinzaColor"></i>Apelido:</label>'+
                    '           </td>'+
                    '           <td class="required">'+
                    '               <input id="user_apelido" type="text" required>'+
                    '           </td>'+
                    '           <td style="vertical-align: bottom;" class="label">'+
                    '               <label class="last" for="user_email"><i class="iconPopup iconSwitch fas fa-envelope cinzaColor" style="float: initial;"></i>E-mail:</label>'+
                    '           </td>'+
                    '           <td class="required">'+
                    '               <input id="user_email" type="email" onblur="checkInputEmail(this)" style="font-size: 1em;" value="'+'@'+window.location.hostname.replace(window.location.hostname.split('.')[0]+'.','')+'" required>'+
                    '           </td>'+
                    '      </tr>'+
                    '   </table>'+
                    '</div>';

    resetDialogBoxPro('dialogBoxPro');
    dialogBoxPro = $('#dialogBoxPro')
        .html('<div class="dialogBoxDiv">'+htmlBox+'</div>')
        .dialog({
            title: 'Adicionar Usu\u00E1rio',
            width: 780,
            open: function() { 
                updateButtonConfirm(this, true);
            },
            close: function() { 
                $('#boxUser').remove();
                resetDialogBoxPro('dialogBoxPro');
            },
            buttons: [{
                text: 'Adicionar',
                class: 'confirm',
                click: function(event) { 
                    var _parent = $(this).closest('.ui-dialog');
                    var nome_completo = _parent.find('input#user_nome_completo');
                    var user_login = _parent.find('input#user_login');
                    var apelido = _parent.find('input#user_apelido');
                    var email = _parent.find('input#user_email');
                    if (checkAtivRequiredFields(nome_completo[0], 'mark')) {
                        var key = {
                                id_unidade: arrayConfigAtivUnidade.id_unidade,
                                nome_completo: nome_completo.val(),
                                login: user_login.val(),
                                apelido: apelido.val(),
                                matricula: 0,
                                host: url_host.replace('controlador.php',''),
                                email: email.val(),
                                config: []
                            };
                        var action = 'config_update_users';
                        var param = {
                                action: action,
                                id: -1,
                                ids: [],
                                type: 'users',
                                key: JSON.stringify(key),
                                mode: 'new'
                            };
                        _this.find('i.icon-parent').attr('class','fas fa-spinner fa-spin icon-parent');
                        getConfigServer(action, param);
                    }
                }
            }]
    });
}
function getConfigServerDoc(action, param) {
    param.hash = userHashAtiv;
    param.version = VERSION_SEIPRO;
    param.perfil = (getOptionsPro('perfilAtividadesSelected')) ? getOptionsPro('perfilAtividadesSelected') : '';
    $.ajax({
        type: "POST",
        url: urlServerAtiv,
        processData: false,
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(param),
        success: function(ativData){
            loadingButtonConfirm(false);
            if (  ativData.status == 0 || ativData.length == 0 ) {
                alertaBoxPro('Error', 'exclamation-triangle', (typeof ativData.status_txt != 'undefined' ? ativData.status_txt : 'Erro ao enviar sua informa\u00E7\u00F5es.'));
            } else {
                resetDialogBoxPro('editorBoxPro');
                getAtividades();
                var txtAlert = (action == 'sign_documento') ? 'Documento assinado' : 'Assinatura do documento cancelada';
                alertaBoxPro('Sucess', 'check-circle', txtAlert+' com sucesso!');
            }

        }
    }).fail(function(data, textStatus){
        loadingButtonConfirm(false);
        failureScreen(data, textStatus);
    });
}
function getConfigServer(action, param) {
    if (checkCapacidade(action)) {
        getServerAtividades(param, action);
    }
}
function approveConfig(this_) {
    var _this = $(this_);
    var td = _this.closest('td');
    var tr = _this.closest('tr');
    var data = td.data();
    var data_this = _this.data();
    var label = (data_this.mode == 'disapprove') ? '<b style="font-weight: bold;">CANCELAR A HOMOLOGA\u00C7\u00C3O</b> d' : '<b style="font-weight: bold;">HOMOLOGAR</b> ';
    var id = data_this.id;
    var data_tr = tr.data();
        data_tr = (typeof data_tr !== 'undefined') ? tr.data() : data_this;
    var ids = [];
    var idTable = '#tableConfiguracoesPanel_'+data_tr.type;
    var countSelected = $(idTable+' tr.infraTrMarcada').length;
    if (id != 0) {
        if ($(idTable).is(':visible') && countSelected > 0) {
            $(idTable).find('.lnkInfraCheck').data('index',1).trigger('click');
        }
        _this.closest('tr').find('td').eq(0).find('input[type="checkbox"]').trigger('click');
    } else {
        ids = $(idTable).find('.checkboxSelectConfiguracoes:checked').map(function(){ if(!$(this).closest('tr').hasClass('disabled')) { return $(this).val() } }).get();
    }

    confirmaFraseBoxPro('Tem certeza que deseja '+label+(countSelected > 1 ? 'os registros' : 'o registro')+(id == 0 ? (countSelected > 1 ? ' selecionados' : ' selecionado') : '')+'?', 'SIM', 
        function(){
            var action = 'config_update_'+data_this.type;
            if (checkCapacidade(action)) {
                var param = {
                    action: action,
                    id: id,
                    ids: ids,
                    type: data_this.type,
                    key: 'homologado',
                    mode: data_this.mode
                };
                getServerAtividades(param, action);
            }
        }, function() {
            if (id != 0) {
                if ($(idTable).is(':visible') && _this.closest('tr').hasClass('infraTrMarcada')) {
                    $(idTable).find('.lnkInfraCheck').data('index',1).trigger('click');
                }
            }
        }
    );
}
function disableConfig(this_) {
    var _this = $(this_);
    var td = _this.closest('td');
    var tr = _this.closest('tr');
    var data = td.data();
    var data_this = _this.data();
    var id = data_this.id;
    var data_tr = tr.data();
        data_tr = (typeof data_tr !== 'undefined') ? tr.data() : data_this;
    var ids = [];
    var idTable = '#tableConfiguracoesPanel_'+data_tr.type;
    var countSelected = $(idTable+' tr.infraTrMarcada').length;
    if (id != 0) {
        if ($(idTable).is(':visible') && countSelected > 0) {
            $(idTable).find('.lnkInfraCheck').data('index',1).trigger('click');
        }
        _this.closest('tr').find('td').eq(0).find('input[type="checkbox"]').trigger('click');
    } else {
        ids = $(idTable).find('.checkboxSelectConfiguracoes:checked').map(function(){ if(!$(this).closest('tr').hasClass('disabled')) { return $(this).val() } }).get();
    }

    confirmaFraseBoxPro('Tem certeza que deseja <b style="font-weight: bold;">DESATIVAR</b> '+(countSelected > 1 ? 'os registros' : 'o registro')+(id == 0 ? (countSelected > 1 ? ' selecionados' : ' selecionado') : '')+'?', 'SIM', 
        function(){
            var action = 'config_update_'+data_this.type;
            if (checkCapacidade(action)) {
                var param = {
                    action: action,
                    id: id,
                    ids: ids,
                    type: data_this.type,
                    key: 'data_fim',
                    mode: 'disable'
                };
                getServerAtividades(param, action);
            }
        }, function() {
            if (id != 0) {
                if ($(idTable).is(':visible') && _this.closest('tr').hasClass('infraTrMarcada')) {
                    $(idTable).find('.lnkInfraCheck').data('index',1).trigger('click');
                }
            }
        }
    );
}
function editConfigOptions(this_, id) {
    var _this = $(this_);
    var tr = _this.closest('tr');
    var table = _this.closest('table');
    var data = tr.data();
    var htmlBox =   '';
    var countSelected = table.find('tr.infraTrMarcada').length;
    if (countSelected > 0) {
        table.find('.lnkInfraCheck').data('index',1).trigger('click');
    }
    _this.closest('tr').find('td').eq(0).find('input[type="checkbox"]').trigger('click');

    if (data.type == 'atividades') {
        var value = jmespath.search(tableConfigList[data.type], "[?id_atividade==`"+id+"`] | [0]");
        var idConfigBox = 'boxConfiguracoes_'+data.type;
        var nameBox = __.Atividades;
        var titleBox = 'Op\u00E7\u00F5es de '+nameBox+': '+value.nome_atividade;
        var complexidade = (value.config !== null && typeof value.config.complexidade !== 'undefined' && value.config.complexidade !== null) ? value.config.complexidade : false;
        var tempo_minimo = (value.config !== null && typeof value.config.tempo_minimo !== 'undefined' && value.config.tempo_minimo !== null) ? value.config.tempo_minimo : 20;
        var complexidade_len = (complexidade) ? complexidade.length : 0;
        var complexidade_style = (complexidade_len > 6) ? 'style="height: 300px;"' : '';

            htmlBox =   '<div id="'+idConfigBox+'" class="atividadeWork" data-atividade="'+(value && value.id_atividade ? value.id_atividade : 0)+'">'+
                        '<div id="'+idConfigBox+'_tabs" style="border: none; min-height: 300px; margin: 0;">'+
                        '   <ul style="font-size: 10px;">'+
                        '       <li><a href="#tabs_'+idConfigBox+'_variacao_produtividade">'+__.Complexidade+' e Produtividade</a></li>'+
                        '       <li><a href="#tabs_'+idConfigBox+'_predefinidas">Configura\u00E7\u00F5es Pr\u00E9-definidas</a></li>'+
                        '       <li><a href="#tabs_'+idConfigBox+'_param_entregas">Par\u00E2metros e Entregas</a></li>'+
                        '       <li><a href="#tabs_'+idConfigBox+'_outrasopcoes">Outras Op\u00E7\u00F5es</a></li>'+
                        '   </ul>'+
                        '   <div id="tabs_'+idConfigBox+'_variacao_produtividade">'+
                        '   <table style="font-size: 10pt;width: 100%;" class="seiProForm tableLine">'+
                        '      <tr>'+
                        '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                        '               <label><i class="iconPopup iconSwitch fas fa-graduation-cap cinzaColor"></i>Grau de '+__.Complexidade+':</label>'+
                        '           </td>'+
                        '           <td style="position:relative">'+
                        '   	        <div id="tabelaConfigPanel_'+data.type+'_complexidade" class="tabelaConfigPanel_'+data.type+'_scroll" '+complexidade_style+'>'+
                        '               <table id="configBox_complexidade" data-format="obj" data-key="complexidade" data-tempo-pactuado="'+value.tempo_pactuado+'" style="font-size: 8pt !important;width: 100%;" class="tableOptionConfig tableSortable seiProForm tableDialog tableInfo tableZebra tableFollow tableAtividades">'+
                        '                    <thead>'+
                        '                        <tr class="tableHeader">'+
                        '                            <th class="tituloControle">Grau</th>'+
                        '                            <th class="tituloControle" style="width: 80px;">Fator</th>'+
                        '                            <th class="tituloControle" style="width: 180px;">Tempo Pactuado</th>'+
                        '                            <th class="tituloControle" style="width: 50px;">Padr\u00E3o</th>'+
                        '                            <th class="tituloControle" style="width: 80px;">Ordem</th>'+
                        '                        </tr>'+
                        '                    </thead>'+
                        '                    <tbody>';
            if (complexidade){
                $.each(value.config.complexidade, function(i, v){
                    htmlBox +=  '                        <tr data-index="'+i+'" data-key="complexidade">'+
                                '                            <td class="editCell" data-key="complexidade" data-type="text" style="padding: 0 10px; text-align: left;">'+unicodeToChar(v.complexidade)+'</td>'+
                                '                            <td class="editCellNumComplex" data-key="fator" data-type="num" style="width: 80px; text-align: center;">'+v.fator+'</td>'+
                                '                            <td class="editCellNumComplex" data-key="tempo_pactuado" data-type="num" style="width: 180px; text-align: center;">'+roundToTwo(v.fator*value.tempo_pactuado)+'</td>'+  
                                '                            <td data-key="default" data-type="switch" data-required="true" style="width: 50px; text-align: center;">'+
                                '                               <div class="onoffswitch" style="transform: scale(0.8);">'+
                                '                                   <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox switch_complexidadeDefault switch_complexidadeDefault_'+i+'" onchange="changeSwitchConfigItem(this)" id="changeItemConfig_'+data.type+'_'+i+'" tabindex="0" '+(v.default  ? 'checked' : '')+'>'+
                                '                                   <label class="onoffswitch-label" for="changeItemConfig_'+data.type+'_'+i+'"></label>'+
                                '                               </div>'+
                                '                            </td>'+
                                '                            <td style="width: 80px; text-align: center;">'+
                                '                               <i class="fas fa-bars cinzaColor sorterTrConfig" style="cursor: grab;"></i>'+
                                '                               <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                                '                           </td>'+  
                                '                        </tr>';
                });
            }
            htmlBox +=      (complexidade_len == 0 ? 
                            '                        <tr data-index="'+complexidade_len+'" data-key="complexidade">'+
                            '                            <td class="editCell" data-key="complexidade" data-type="text" style="padding: 0 10px; text-align: left;"></td>'+
                            '                            <td class="editCellNumComplex" data-key="fator" data-type="num" style="width: 80px; text-align: center;"></td>'+
                            '                            <td class="editCellNumComplex" data-key="tempo_pactuado" data-type="num" style="width: 180px; text-align: center;"></td>'+
                            '                            <td data-key="default" data-type="switch" data-required="true" style="width: 50px; text-align: center;">'+
                            '                               <div class="onoffswitch" style="transform: scale(0.8);">'+
                            '                                   <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox switch_complexidadeDefault switch_complexidadeDefault_'+complexidade_len+'" onchange="changeSwitchConfigItem(this)" id="changeItemConfig_'+data.type+'_'+complexidade_len+'" tabindex="0">'+
                            '                                   <label class="onoffswitch-label" for="changeItemConfig_'+data.type+'_'+complexidade_len+'"></label>'+
                            '                               </div>'+
                            '                            </td>'+
                            '                            <td style="width: 80px; text-align: center;">'+
                            '                               <i class="fas fa-bars cinzaColor sorterTrConfig" style="cursor: grab;"></i>'+
                            '                               <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                            '                           </td>'+  
                            '                        </tr>'+
                            '' : '')+
                            '                    </tbody>'+
                            '                    <tfoot style="position: sticky;bottom: -4px;background: #fff;">'+
                            '                       <tr>'+
                            '                           <th colspan="5" style="text-align: right;">'+
                            '                               <a class="newLink addConfigItem" onclick="addConfigItem(this)" style="cursor: pointer; margin: 5px 5px 15px 5px;display: inline-block;">'+
                            '                                   <i class="fas fa-plus-circle cinzaColor" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                            '                                   Adicionar novo item'+
                            '                               </a>'+
                            '                           </th>'+
                            '                       </tr>'+
                            '                    </tfoot>'+
                            '                </table>'+
                            '                </div>'+
                            '           </td>'+
                            '      </tr>'+
                            '      <tr>'+
                            '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                            '               <label><i class="iconPopup iconSwitch fas fa-chart-line cinzaColor"></i>Produtividade:</label>'+
                            '           </td>'+
                            '           <td>'+
                            '               <table style="font-size: 10pt;width: 100%; margin: 10px 0;" class="seiProForm">'+
                            '                  <tr style="height: 40px;">'+
                            '                      <td style="text-align: left;vertical-align: bottom;height: 40px;"><i class="iconPopup fas fa-hourglass-half cinzaColor"></i> Tempo despendido m\u00EDnimo aceit\u00E1vel para '+__.a_atividade+' (% do tempo pactuado)</td>'+
                            '                      <td>'+
                            '                            <input type="number" style="width: 50px !important;" id="tempo_minimo" data-key="tempo_minimo" min="0" max="100" step=".1" class="singleOptionConfig" tabindex="0" value="'+tempo_minimo+'">'+
                            '                      </td>'+
                            '                  </tr>'+
                            '                  <tr style="height: 40px;">'+
                            '                      <td style="text-align: left;vertical-align: bottom;height: 40px;"><i class="iconPopup fas fa-chart-line cinzaColor"></i> Utilizar as configura\u00E7\u00F5es de Ganho de Produtividade da unidade</td>'+
                            '                      <td>'+
                            '                          <div class="onoffswitch" style="float: right;">'+
                            '                              <input type="checkbox" name="onoffswitch" onchange="changeConfigGanhoUnidade(this)" class="onoffswitch-checkbox singleOptionConfig" id="ganho_unidade" data-key="ganho_unidade" tabindex="0" '+(value.config && typeof value.config.ganho_unidade !== 'undefined' && value.config.ganho_unidade === false  ? '' : 'checked')+'>'+
                            '                              <label class="onoffswitch-label" for="ganho_unidade"></label>'+
                            '                          </div>'+
                            '                      </td>'+
                            '                  </tr>'+
                            '               </table>'+
                            '               <div style="position:relative">'+
                            '   	        <div id="tabelaConfigPanel_'+data.type+'_modalidades" class="tabelaConfigPanel_'+data.type+'_scroll">'+
                            '               <table id="configBox_modalidades_atividade" data-format="obj" data-key="modalidades" style="font-size: 8pt !important;width: 100%; '+(value.config && typeof value.config.ganho_unidade !== 'undefined' && value.config.ganho_unidade === false  ? '' : 'display:none')+'" class="tableOptionConfig seiProForm tableDialog tableInfo tableZebra tableFollow tableAtividades">'+
                            '                    <thead>'+
                            '                        <tr class="tableHeader">'+
                            '                            <th class="tituloControle" style="width: 350px;">Tipo de Modalidade</th>'+
                            '                            <th class="tituloControle" style="width: 175px;">Fator</th>'+
                            '                            <th class="tituloControle" style="display:none">ID</th>'+
                            '                            <th class="tituloControle" style="width: 80px;">Ordem</th>'+
                            '                        </tr>'+
                            '                    </thead>'+
                            '                    <tbody>';
                var modalidades = (typeof value.config !== 'undefined' && value.config !== null && typeof value.config.modalidades !== 'undefined' && value.config.modalidades !== null) ? value.config.modalidades : false;
                var modalidades_len = (modalidades) ? modalidades.length : 0;
                if (modalidades){
                    $.each(value.config.modalidades, function(i, v){
                        htmlBox +=  '                        <tr data-index="'+i+'" data-key="modalidades">'+
                                    '                            <td class="editCellSelect" data-key="tipo_modalidade" data-type="text" style="width: 350px; padding: 0 10px; text-align: left;">'+unicodeToChar(v.tipo_modalidade)+'</td>'+
                                    '                            <td class="editCellNum" data-key="fator" data-type="text" style="width: 175px; text-align: left;">'+v.fator+'</td>'+ 
                                    '                            <td data-key="id_tipo_modalidade" data-type="text" style="display:none;">'+v.id_tipo_modalidade+'</td>'+ 
                                    '                            <td style="width: 80px; text-align: center;">'+
                                    '                               <i class="fas fa-bars cinzaColor sorterTrConfig" style="cursor: grab;"></i>'+
                                    '                               <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                                    '                           </td>'+  
                                    '                        </tr>';
                    });
                }
            htmlBox +=      '                        <tr data-index="'+modalidades_len+'" data-key="modalidades">'+
                            '                            <td class="editCellSelect" data-key="tipo_modalidade" data-type="text" style="width: 350px; padding: 0 10px; text-align: left;"></td>'+
                            '                            <td class="editCellNum" data-key="fator" data-type="text" style="width: 175px; text-align: left;"></td>'+
                            '                            <td data-key="id_tipo_modalidade" data-type="text" style="display:none;"></td>'+
                            '                            <td style="width: 80px; text-align: center;">'+
                            '                               <i class="fas fa-bars cinzaColor sorterTrConfig" style="cursor: grab;"></i>'+
                            '                               <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                            '                           </td>'+  
                            '                        </tr>'+
                            '                    </tbody>'+
                            '                    <tfoot style="position: sticky;bottom: -4px;background: #fff;">'+
                            '                       <tr>'+
                            '                           <th colspan="3" style="text-align: right;">'+
                            '                               <a class="newLink addConfigItem" onclick="addConfigItem(this)" style="cursor: pointer; margin: 5px 5px 15px 5px;display: inline-block;">'+
                            '                                   <i class="fas fa-plus-circle cinzaColor" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                            '                                   Adicionar novo item'+
                            '                               </a>'+
                            '                           </th>'+
                            '                       </tr>'+
                            '                    </tfoot>'+
                            '                </table>'+
                            '                </div>'+
                            '                </div>'+
                            '           </td>'+
                            '      </tr>'+
                            '   </table>'+
                            '   </div>'+
                            '   <div id="tabs_'+idConfigBox+'_predefinidas">'+
                            '   <table style="font-size: 10pt;width: 100%;" class="seiProForm tableLine">'+
                            '      <tr>'+
                            '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                            '               <label><i class="iconPopup iconSwitch fas fa-folder-open cinzaColor"></i>Tipos de Processos:</label>'+
                            '           </td>'+
                            '           <td style="position:relative">'+
                            '   	        <div id="tabelaConfigPanel_'+data.type+'_tipo_processo" class="tabelaConfigPanel_'+data.type+'_scroll">'+
                            '               <table id="configBox_tipo_processo" data-format="array" data-key="tipo_processo" style="font-size: 8pt !important;width: 100%;" class="tableOptionConfig tableSortable seiProForm tableDialog tableInfo tableZebra tableFollow tableAtividades">'+
                            '                    <thead>'+
                            '                        <tr class="tableHeader">'+
                            '                            <th class="tituloControle">Tipo</th>'+
                            '                            <th class="tituloControle" style="width: 80px;">Ordem</th>'+
                            '                        </tr>'+
                            '                    </thead>'+
                            '                    <tbody>';
            var tipo_processo = (value.config !== null && typeof value.config.tipo_processo !== 'undefined' && value.config.tipo_processo !== null) ? value.config.tipo_processo : false;
            var tipo_processo_len = (tipo_processo) ? tipo_processo.length : 0;
            if (tipo_processo){
                $.each(value.config.tipo_processo, function(i, v){
                    htmlBox +=  '                        <tr data-index="'+i+'" data-key="tipo_processo" style="text-align: left;">'+
                                '                            <td class="editCellSelect" data-type="text" style="padding: 0 10px;">'+unicodeToChar(v[0])+'</td>'+
                                '                            <td style="width: 80px; text-align: center;">'+
                                '                               <i class="fas fa-bars cinzaColor sorterTrConfig" style="cursor: grab;"></i>'+
                                '                               <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                                '                           </td>'+  
                                '                        </tr>';
                });
            }
            htmlBox +=      (tipo_processo_len == 0 ? 
                            '                        <tr data-index="'+tipo_processo_len+'" data-key="tipo_processo" style="text-align: left;">'+
                            '                            <td class="editCellSelect" data-type="text" style="padding: 0 10px;"></td>'+
                            '                            <td style="width: 80px; text-align: center;">'+
                            '                               <i class="fas fa-bars cinzaColor sorterTrConfig" style="cursor: grab;"></i>'+
                            '                               <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                            '                           </td>'+  
                            '                        </tr>'+
                            '' : '')+
                            '                    </tbody>'+
                            '                    <tfoot style="position: sticky;bottom: -4px;background: #fff;">'+
                            '                       <tr>'+
                            '                           <th colspan="2" style="text-align: right;">'+
                            '                               <a class="newLink addConfigItem" onclick="addConfigItem(this)" style="cursor: pointer; 5px 5px 15px 5px;display: inline-block;">'+
                            '                                   <i class="fas fa-plus-circle cinzaColor" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                            '                                   Adicionar novo item'+
                            '                               </a>'+
                            '                           </th>'+
                            '                       </tr>'+
                            '                    </tfoot>'+
                            '                </table>'+
                            '                </div>'+
                            '           </td>'+
                            '      </tr>'+
                            '      <tr>'+
                            '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                            '               <label><i class="iconPopup iconSwitch fas fa-tags cinzaColor"></i>Etiquetas Pr\u00E9-definidas:</label>'+
                            '           </td>'+
                            '           <td style="position:relative">'+
                            '   	        <div id="tabelaConfigPanel_'+data.type+'_etiquetas" class="tabelaConfigPanel_'+data.type+'_scroll">'+
                            '               <table id="configBox_etiquetas" data-format="array" data-key="etiquetas" style="font-size: 8pt !important;width: 100%;" class="tableOptionConfig tableSortable seiProForm tableDialog tableInfo tableZebra tableFollow tableAtividades">'+
                            '                    <thead>'+
                            '                        <tr class="tableHeader">'+
                            '                            <th class="tituloControle">Nome da etiqueta</th>'+
                            '                            <th class="tituloControle" style="width: 80px;">Ordem</th>'+
                            '                        </tr>'+
                            '                    </thead>'+
                            '                    <tbody>';
            var etiquetas = (value.config !== null && typeof value.config.etiquetas !== 'undefined' && value.config.etiquetas !== null) ? value.config.etiquetas : false;
            var etiquetas_len = (etiquetas) ? etiquetas.length : 0;
            if (etiquetas){
                $.each(value.config.etiquetas, function(i, v){
                    htmlBox +=  '                        <tr data-index="'+i+'" data-key="etiquetas" style="text-align: left;">'+
                                '                            <td onchange="changeConfigItemCell(this)" class="editCell" data-type="text" style="padding: 0 10px;">'+unicodeToChar(v[0])+'</td>'+
                                '                            <td style="width: 80px; text-align: center;">'+
                                '                               <i class="fas fa-bars cinzaColor sorterTrConfig" style="cursor: grab;"></i>'+
                                '                               <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                                '                           </td>'+  
                                '                        </tr>';
                });
            }
            htmlBox +=      (etiquetas_len == 0 ? 
                            '                        <tr data-index="'+etiquetas_len+'" data-key="etiquetas" style="text-align: left;">'+
                            '                            <td onchange="changeConfigItemCell(this)" class="editCell" data-type="text" style="padding: 0 10px;"></td>'+
                            '                            <td style="width: 80px; text-align: center;">'+
                            '                               <i class="fas fa-bars cinzaColor sorterTrConfig" style="cursor: grab;"></i>'+
                            '                               <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                            '                           </td>'+  
                            '                        </tr>'+
                            '' : '')+
                            '                    </tbody>'+
                            '                    <tfoot style="position: sticky;bottom: -4px;background: #fff;">'+
                            '                       <tr>'+
                            '                           <th colspan="3" style="text-align: right;">'+
                            '                               <a class="newLink addConfigItem" onclick="addConfigItem(this)" style="cursor: pointer; margin: 5px 5px 15px 5px;display: inline-block;">'+
                            '                                   <i class="fas fa-plus-circle cinzaColor" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                            '                                   Adicionar novo item'+
                            '                               </a>'+
                            '                           </th>'+
                            '                       </tr>'+
                            '                    </tfoot>'+
                            '                </table>'+
                            '                </div>'+
                            '           </td>'+
                            '      </tr>'+
                            '      <tr>'+
                            '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                            '               <label><i class="iconPopup iconSwitch fas fa-check-double cinzaColor"></i>Checklist Pr\u00E9-definido:</label>'+
                            '           </td>'+
                            '           <td style="position:relative">'+
                            '   	        <div id="tabelaConfigPanel_'+data.type+'_checklist" class="tabelaConfigPanel_'+data.type+'_scroll">'+
                            '               <table id="configBox_checklist" data-format="array" data-key="checklist" style="font-size: 8pt !important;width: 100%;" class="tableOptionConfig tableSortable seiProForm tableDialog tableInfo tableZebra tableFollow tableAtividades">'+
                            '                    <thead>'+
                            '                        <tr class="tableHeader">'+
                            '                            <th class="tituloControle">Nome do item</th>'+
                            '                            <th class="tituloControle" style="width: 80px;">Ordem</th>'+
                            '                        </tr>'+
                            '                    </thead>'+
                            '                    <tbody>';
            var checklist = (value.config !== null && typeof value.config.checklist !== 'undefined' && value.config.checklist !== null) ? value.config.checklist : false;
            var checklist_len = (checklist) ? checklist.length : 0;
            if (checklist){
                $.each(value.config.checklist, function(i, v){
                    htmlBox +=  '                        <tr data-index="'+i+'" data-key="checklist" style="text-align: left;">'+
                                '                            <td onchange="changeConfigItemCell(this)" class="editCell" data-type="text" style="padding: 0 10px;">'+unicodeToChar(v[0])+'</td>'+
                                '                            <td style="width: 80px; text-align: center;">'+
                                '                               <i class="fas fa-bars cinzaColor sorterTrConfig" style="cursor: grab;"></i>'+
                                '                               <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                                '                           </td>'+  
                                '                        </tr>';
                });
            }
            htmlBox +=      (checklist_len == 0 ? 
                            '                        <tr data-index="'+checklist_len+'" data-key="checklist" style="text-align: left;">'+
                            '                            <td onchange="changeConfigItemCell(this)" class="editCell" data-type="text" style="padding: 0 10px;"></td>'+
                            '                            <td style="width: 80px; text-align: center;">'+
                            '                               <i class="fas fa-bars cinzaColor sorterTrConfig" style="cursor: grab;"></i>'+
                            '                               <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                            '                           </td>'+  
                            '                        </tr>'+
                            '' : '')+
                            '                    </tbody>'+
                            '                    <tfoot style="position: sticky;bottom: -4px;background: #fff;">'+
                            '                       <tr>'+
                            '                           <th colspan="3" style="text-align: right;">'+
                            '                               <a class="newLink addConfigItem" onclick="addConfigItem(this)" style="cursor: pointer; margin: 5px 5px 15px 5px;display: inline-block;">'+
                            '                                   <i class="fas fa-plus-circle cinzaColor" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                            '                                   Adicionar novo item'+
                            '                               </a>'+
                            '                           </th>'+
                            '                       </tr>'+
                            '                    </tfoot>'+
                            '                </table>'+
                            '                </div>'+
                            '           </td>'+
                            '      </tr>'+
                            '   </table>'+
                            '   </div>'+
                            '   <div id="tabs_'+idConfigBox+'_param_entregas">'+
                            '   <table style="font-size: 10pt;width: 100%;" class="seiProForm tableLine">'+
                            '      <tr>'+
                            '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                            '               <label><i class="iconPopup iconSwitch fas fa-puzzle-piece cinzaColor"></i>Par\u00E2metros adotados:</label>'+
                            '           </td>'+
                            '           <td style="position:relative">'+
                            '   	        <div id="tabelaConfigPanel_'+data.type+'_parametros" class="tabelaConfigPanel_'+data.type+'_scroll">'+
                            '               <table id="configBox_parametros" data-format="array" data-key="parametros" style="font-size: 8pt !important;width: 100%;" class="tableOptionConfig tableSortable seiProForm tableDialog tableInfo tableZebra tableFollow tableAtividades">'+
                            '                    <thead>'+
                            '                        <tr class="tableHeader">'+
                            '                            <th class="tituloControle">Nome do par\u00E2metro</th>'+
                            '                            <th class="tituloControle" style="width: 80px;">Ordem</th>'+
                            '                        </tr>'+
                            '                    </thead>'+
                            '                    <tbody>';
            var parametros = (value.config !== null && typeof value.config.parametros !== 'undefined' && value.config.parametros !== null) ? value.config.parametros : false;
            var parametros_len = (parametros) ? parametros.length : 0;
            if (parametros){
                $.each(value.config.parametros, function(i, v){
                    htmlBox +=  '                        <tr data-index="'+i+'" data-key="parametros" style="text-align: left;">'+
                                '                            <td onchange="changeConfigItemCell(this)" class="editCell" data-type="text" style="padding: 0 10px;">'+unicodeToChar(v[0])+'</td>'+
                                '                            <td style="width: 80px; text-align: center;">'+
                                '                               <i class="fas fa-bars cinzaColor sorterTrConfig" style="cursor: grab;"></i>'+
                                '                               <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                                '                           </td>'+  
                                '                        </tr>';
                });
            }
            htmlBox +=      (parametros_len == 0 ? 
                            '                        <tr data-index="'+parametros_len+'" data-key="parametros" style="text-align: left;">'+
                            '                            <td onchange="changeConfigItemCell(this)" class="editCell" data-type="text" style="padding: 0 10px;"></td>'+
                            '                            <td style="width: 80px; text-align: center;">'+
                            '                               <i class="fas fa-bars cinzaColor sorterTrConfig" style="cursor: grab;"></i>'+
                            '                               <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                            '                           </td>'+  
                            '                        </tr>'+
                            '' : '')+
                            '                    </tbody>'+
                            '                    <tfoot style="position: sticky;bottom: -4px;background: #fff;">'+
                            '                       <tr>'+
                            '                           <th colspan="3" style="text-align: right;">'+
                            '                               <a class="newLink addConfigItem" onclick="addConfigItem(this)" style="cursor: pointer; margin: 5px 5px 15px 5px;display: inline-block;">'+
                            '                                   <i class="fas fa-plus-circle cinzaColor" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                            '                                   Adicionar novo item'+
                            '                               </a>'+
                            '                           </th>'+
                            '                       </tr>'+
                            '                    </tfoot>'+
                            '                </table>'+
                            '                </div>'+
                            '           </td>'+
                            '      </tr>'+
                            '      <tr>'+
                            '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                            '               <label><i class="iconPopup iconSwitch fas fa-file-export cinzaColor"></i>Entregas esperadas:</label>'+
                            '           </td>'+
                            '           <td style="position:relative">'+
                            '   	        <div id="tabelaConfigPanel_'+data.type+'_entregas" class="tabelaConfigPanel_'+data.type+'_scroll">'+
                            '               <table id="configBox_entregas" data-format="array" data-key="entregas" style="font-size: 8pt !important;width: 100%;" class="tableOptionConfig tableSortable seiProForm tableDialog tableInfo tableZebra tableFollow tableAtividades">'+
                            '                    <thead>'+
                            '                        <tr class="tableHeader">'+
                            '                            <th class="tituloControle">Tipo de entrega</th>'+
                            '                            <th class="tituloControle" style="width: 80px;">Ordem</th>'+
                            '                        </tr>'+
                            '                    </thead>'+
                            '                    <tbody>';
            var entregas = (value.config !== null && typeof value.config.entregas !== 'undefined' && value.config.entregas !== null) ? value.config.entregas : false;
            var entregas_len = (entregas) ? entregas.length : 0;
            if (entregas){
                $.each(value.config.entregas, function(i, v){
                    htmlBox +=  '                        <tr data-index="'+i+'" data-key="entregas" style="text-align: left;">'+
                                '                            <td onchange="changeConfigItemCell(this)" class="editCell" data-type="text" style="padding: 0 10px;">'+unicodeToChar(v[0])+'</td>'+
                                '                            <td style="width: 80px; text-align: center;">'+
                                '                               <i class="fas fa-bars cinzaColor sorterTrConfig" style="cursor: grab;"></i>'+
                                '                               <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                                '                           </td>'+  
                                '                        </tr>';
                });
            }
            htmlBox +=      (entregas_len == 0 ? 
                            '                        <tr data-index="'+entregas_len+'" data-key="entregas" style="text-align: left;">'+
                            '                            <td onchange="changeConfigItemCell(this)" class="editCell" data-type="text" style="padding: 0 10px;"></td>'+
                            '                            <td style="width: 80px; text-align: center;">'+
                            '                               <i class="fas fa-bars cinzaColor sorterTrConfig" style="cursor: grab;"></i>'+
                            '                               <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                            '                           </td>'+  
                            '                        </tr>'+
                            '' : '')+
                            '                    </tbody>'+
                            '                    <tfoot style="position: sticky;bottom: -4px;background: #fff;">'+
                            '                       <tr>'+
                            '                           <th colspan="3" style="text-align: right;">'+
                            '                               <a class="newLink addConfigItem" onclick="addConfigItem(this)" style="cursor: pointer; margin: 5px 5px 15px 5px;display: inline-block;">'+
                            '                                   <i class="fas fa-plus-circle cinzaColor" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                            '                                   Adicionar novo item'+
                            '                               </a>'+
                            '                           </th>'+
                            '                       </tr>'+
                            '                    </tfoot>'+
                            '                </table>'+
                            '                </div>'+
                            '           </td>'+
                            '      </tr>'+
                            '   </table>'+
                            '   </div>'+
                            '   <div id="tabs_'+idConfigBox+'_outrasopcoes">'+
                            '   <table style="font-size: 10pt;width: 100%;" class="seiProForm tableLine">'+
                            '      <tr>'+
                            '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                            '               <label><i class="iconPopup iconSwitch fas fa-wrench cinzaColor"></i>Outras Op\u00E7\u00F5es</label>'+
                            '           </td>'+
                            '           <td>'+
                            '               <table style="font-size: 10pt;width: 100%; margin: 10px 0;" class="seiProForm">'+
                            '                  <tr style="height: 40px;">'+
                            '                      <td style="text-align: left;"><i class="iconPopup fas fa-calendar-check cinzaColor"></i> Recalcular o prazo de entrega depois de '+__.iniciada_a_demanda+'</td>'+
                            '                      <td>'+
                            '                          <div class="onoffswitch" style="float: right;">'+
                            '                              <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox singleOptionConfig" id="recalcula_prazo" data-key="recalcula_prazo" tabindex="0" '+(value.config && typeof value.config.recalcula_prazo !== 'undefined' && value.config.recalcula_prazo  ? 'checked' : '')+'>'+
                            '                              <label class="onoffswitch-label" for="recalcula_prazo"></label>'+
                            '                          </div>'+
                            '                      </td>'+
                            '                  </tr>'+
                            '                  <tr style="height: 40px;">'+
                            '                      <td style="text-align: left;"><i class="iconPopup fas fa-stopwatch cinzaColor"></i> Desativar o c\u00E1lculo de produtividade e controle de tempo de execu\u00E7\u00E3o <br>(para '+__.atividades+' do tipo <em>monitoramento</em>)</td>'+
                            '                      <td>'+
                            '                          <div class="onoffswitch" style="float: right;">'+
                            '                              <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox singleOptionConfig" id="desativa_produtividade" data-key="desativa_produtividade" tabindex="0" '+(value.config && typeof value.config.desativa_produtividade !== 'undefined' && value.config.desativa_produtividade  ? 'checked' : '')+'>'+
                            '                              <label class="onoffswitch-label" for="desativa_produtividade"></label>'+
                            '                          </div>'+
                            '                      </td>'+
                            '                  </tr>'+
                            '               </table>'+
                            '           </td>'+
                            '      </tr>'+
                            '   </table>'+
                            '   </div>'+
                            '   </div>'+
                            '</div>';
    } else if (data.type == 'planos') {
        var value = jmespath.search(tableConfigList[data.type], "[?id_plano==`"+id+"`] | [0]");
        var idConfigBox = 'boxConfiguracoes_'+data.type;
        var nameBox = 'Planos de Trabalho';
        var titleBox = 'Op\u00E7\u00F5es de '+nameBox+': '+value.nome_completo;
        var modalidade = jmespath.search(arrayConfigAtividades.tipos_modalidades,"[?id_tipo_modalidade==`"+value.id_tipo_modalidade+"`] | [0]");
        var view_modelos = (modalidade !== null && modalidade.hasOwnProperty('config') && typeof modalidade.config !== 'undefined' && modalidade.config !== null && modalidade.config.hasOwnProperty('modelos')) ? modalidade.config.modelos : false;
        var assinatura =  (typeof value.config !== 'undefined' && value.config !== null && typeof value.config.assinatura !== 'undefined' && value.config.hasOwnProperty('assinatura')) ? value.config.assinatura : false;
        var inputAssinatura = (assinatura) ? "<input type='hidden' class='hiddenOptionConfig' data-type='json' data-key='assinatura' value='"+JSON.stringify(assinatura)+"'>" : '';

            htmlBox =   '<div id="'+idConfigBox+'" class="atividadeWork" data-plano="'+(value && value.id_plano ? value.id_plano : 0)+'">'+
                        '   <table style="font-size: 10pt;width: 100%;" class="seiProForm">'+
                        ''+(view_modelos ? 
                        '      <tr>'+
                        '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                        '               <label><i class="iconPopup iconSwitch fas fa-file-signature cinzaColor"></i>Documentos Dispon\u00EDveis</label>'+
                        '           </td>'+
                        '           <td>'+
                        '               <table style="font-size: 8pt;width: 100%; margin: 10px 0;" class="seiProForm">'+
                        '                  <tr style="height: 40px;">'+
                        '                      <td style="text-align: left;">'+
                        '                           <a class="newLink viewModelDoc" data-type="'+data.type+'" data-sign="true" data-user="'+value.id_user+'" data-id_reference="'+value.id_plano+'" data-icon="pencil-alt" data-action="view" data-mode="modelo_termo_adesao" data-title="Termo de Ades\u00E3o" onclick="editModelConfigItem(this)" style="cursor: pointer; margin: 5px;display: inline-block;">'+
                        '                               <i class="fas fa-signature '+(assinatura ? 'azulColor' : 'cinzaColor')+'" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                        '                               <i class="fas fa-'+(assinatura ? 'user-edit azulColor' : 'pencil-alt cinzaColor')+'" style="padding-right: 3px; cursor: pointer; font-size: 12pt; margin-left: -10px;"></i>'+
                        '                               Termo de Ades\u00E3o'+
                        '                           </a>'+
                        (assinatura ? 
                        '                           <div class="signed" style="font-size: 9pt;">'+
                        '                               <span>'+
                        '                                   <i class="fas fa-key laranjaColor" style="margin-right: 10px;"></i>'+
                        '                                   Documento assinado eletronicamente por <strong style="font-weight: bold;">'+assinatura[0].nome_completo+'</strong>, em '+moment(assinatura[0].datetime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY [\u00E0s] HH:mm')+', conforme hor\u00E1rio oficial de Bras\u00EDlia'+
                        '                               </span>'+
                        '                           </div>'+
                        '                           '+inputAssinatura+
                        '' : '')+
                        '                      </td>'+
                        '                  </tr>'+
                        '               </table>'+
                        '           </td>'+
                        '      </tr>'+
                        '' : 
                        '      <tr>'+
                        '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                        '               <label><i class="iconPopup iconSwitch fas fa-file-signature cinzaColor"></i>Documentos Vinculados:</label>'+
                        '           </td>'+
                        '           <td>'+
                        '               <table id="configBox_documentos" data-format="obj" data-key="documentos" style="font-size: 8pt !important;width: 100%;" class="tableOptionConfig tableSortable seiProForm tableDialog tableInfo tableZebra tableFollow tableAtividades">'+
                        '                    <thead>'+
                        '                        <tr class="tableHeader">'+
                        '                            <th class="tituloControle" style="width: 350px;">Tipo de Documento</th>'+
                        '                            <th class="tituloControle" style="width: 175px;">N\u00FAmero SEI</th>'+
                        '                            <th class="tituloControle" style="display:none">id_procedimento</th>'+
                        '                            <th class="tituloControle" style="display:none">id_documento</th>'+
                        '                            <th class="tituloControle" style="width: 50px;">Pr\u00E9via</th>'+
                        '                            <th class="tituloControle" style="width: 80px;">Ordem</th>'+
                        '                        </tr>'+
                        '                    </thead>'+
                        '                    <tbody>');
            var documentos = (typeof value.config !== 'undefined' && value.config !== null && typeof value.config.documentos !== 'undefined' && value.config !== null) ? value.config.documentos : false;
            var documentos_len = (documentos) ? documentos.length : 0;
            if (documentos && !view_modelos){
                $.each(value.config.documentos, function(i, v){
                    var previewDoc =    '<a class="newLink" style="cursor: pointer;" onclick="openDialogDoc({title: \''+unicodeToChar(v.documento)+' ('+v.nr_sei+')\', id_procedimento: \''+v.id_procedimento+'\', id_documento: \''+v.id_documento+'\'})" onmouseover="return infraTooltipMostrar(\'Visualiza\u00E7\u00E3o r\u00E1pida\');" onmouseout="return infraTooltipOcultar();">'+
                                        '   <i class="fas fa-eye" style="font-size: 80%;"></i>'+
                                        '</a>';
                    htmlBox +=  '                        <tr data-index="'+i+'" data-key="documentos">'+
                                '                            <td class="editCellSelect" data-key="documento" data-type="text" style="width: 350px; padding: 0 10px; text-align: left;">'+unicodeToChar(v.documento)+'</td>'+
                                '                            <td class="editCellSEI" data-key="nr_sei" data-type="text" style="width: 175px; text-align: left;">'+v.nr_sei+'</td>'+
                                '                            <td data-key="id_procedimento" data-type="text" style="text-align: left; display:none">'+v.id_procedimento+'</td>'+
                                '                            <td data-key="id_documento" data-type="text" style="text-align: left; display:none">'+v.id_documento+'</td>'+
                                '                            <td data-ref="previa" style="text-align: center; width: 50px;">'+previewDoc+'</td>'+
                                '                            <td style="width: 80px; text-align: center;">'+
                                '                               <i class="fas fa-bars cinzaColor sorterTrConfig" style="cursor: grab;"></i>'+
                                '                               <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                                '                           </td>'+  
                                '                        </tr>';
                });
            }
            htmlBox +=      (view_modelos ? '' : 
                            '                        <tr data-index="'+documentos_len+'" data-key="documentos">'+
                            '                            <td class="editCellSelect" data-key="documento" data-type="text" style="width: 350px; padding: 0 10px; text-align: left;"></td>'+
                            '                            <td class="editCellSEI" data-key="nr_sei" data-type="text" style="width: 175px; text-align: left;"></td>'+
                            '                            <td data-key="id_procedimento" data-type="text" style="text-align: left; display:none"></td>'+
                            '                            <td data-key="id_documento" data-type="text" style="text-align: left; display:none"></td>'+
                            '                            <td data-ref="previa" style="text-align: center; width: 50px;"></td>'+
                            '                            <td style="width: 80px; text-align: center;">'+
                            '                               <i class="fas fa-bars cinzaColor sorterTrConfig" style="cursor: grab;"></i>'+
                            '                               <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                            '                           </td>'+  
                            '                        </tr>'+
                            '                    </tbody>'+
                            '                    <tfoot>'+
                            '                       <tr>'+
                            '                           <th colspan="6" style="text-align: right;">'+
                            '                               <a class="newLink addConfigItem" onclick="addConfigItem(this)" style="cursor: pointer; margin: 5px;display: inline-block;">'+
                            '                                   <i class="fas fa-plus-circle cinzaColor" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                            '                                   Adicionar novo item'+
                            '                               </a>'+
                            '                           </th>'+
                            '                       </tr>'+
                            '                    </tfoot>'+
                            '                </table>'+
                            '           </td>'+
                            '      </tr>'+
                            '')+
                            '      <tr>'+
                            '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                            '               <label><i class="iconPopup iconSwitch fas fa-clipboard-list cinzaColor"></i>'+__.Atividades+'</label>'+
                            '           </td>'+
                            '           <td>'+
                            '               <table style="font-size: 10pt;width: 100%; margin: 10px 0;" class="seiProForm">'+
                            '                  <tr style="height: 40px;">'+
                            '                      <td style="text-align: left;"><i class="iconPopup fas fa-retweet cinzaColor"></i> Vincular toda a lista de '+__.atividades+'</td>'+
                            '                      <td>'+
                            '                          <div class="onoffswitch" style="float: right;">'+
                            '                              <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox singleOptionConfig" id="atividades_lista_integral" onchange="changeConfigAtivIntegral(this)" data-key="atividades_lista_integral" tabindex="0" '+(value.config && typeof value.config.atividades_lista_integral !== 'undefined' && value.config.atividades_lista_integral === false ? '' : 'checked')+'>'+
                            '                              <label class="onoffswitch-label" for="atividades_lista_integral"></label>'+
                            '                          </div>'+
                            '                      </td>'+
                            '                  </tr>'+
                            '                  <tr style="height: 40px; '+(value.config !== null && typeof value.config.lista_atividades !== 'undefined' && value.config.lista_atividades !== null && value.config.lista_atividades.length > 0 ? '' : 'display:none;')+'" id="configBox_lista_atividades_tr">'+
                            '                      <td style="text-align: left;" colspan="2">'+
                            '                           <div><i class="iconPopup fas fa-mouse-pointer cinzaColor"></i> Selecionar '+__.atividades+' '+getNameGenre('atividade', 'espec\u00EDficos', 'espec\u00EDficas')+'</div>'+
                            '                           <div id="tabsPanelConfig" class="tabelaPanelScroll" style="height: 400px; width: 100%;">'+
                            '                               <table id="configBox_lista_atividades" data-format="obj_mult" data-key="lista_atividades" style="font-size: 8pt !important;width: 100%;" class="tableCheckboxConfig seiProForm tableDialog tableInfo tableZebra tableFollow tableAtividades">'+
                            '                                    <thead>'+
                            '                                        <tr class="tableHeader">'+
                            '                                            <th class="tituloControle" data-sorter="false" style="width: 50px;" align="center"><label class="lblInfraCheck_label" for="lnkInfraCheck_atividades" accesskey=";"></label><a class="lnkInfraCheck" id="lnkInfraCheck_atividades" onclick="setSelectAllTr(this);" onmouseover="updateTipSelectAll(this)" onmouseenter="return infraTooltipMostrar(\'Selecionar Tudo\')" onmouseout="return infraTooltipOcultar();"><img src="/infra_css/imagens/check.gif" id="imgRecebidosCheck"></a></th>'+
                            '                                            <th class="tituloControle">Nome d'+__.a_Atividade+'</th>'+
                            '                                            <th class="tituloControle">Tempo Pactuado</th>'+
                            '                                        </tr>'+
                            '                                    </thead>'+
                            '                                    <tbody>'+
                            '                                    </tbody>'+
                            '                                </table>'+
                            '                           </div>'+
                            '                      </td>'+
                            '                  </tr>'+
                            '               </table>'+
                            '           </td>'+
                            '      </tr>'+
                            '   </table>'+
                            '</div>';
    } else if (data.type == 'programas') {
        var value = jmespath.search(tableConfigList[data.type], "[?id_programa==`"+id+"`] | [0]");
        var idConfigBox = 'boxConfiguracoes_'+data.type;
        var nameBox = 'Programas de Gest\u00E3o';
        var titleBox = 'Op\u00E7\u00F5es de '+nameBox+': '+value.nome_sigla;

            htmlBox =   '<div id="'+idConfigBox+'" class="atividadeWork" data-programa="'+(value && value.id_programa ? value.id_programa : 0)+'">'+
                        '   <table style="font-size: 10pt;width: 100%;" class="seiProForm">'+
                        '      <tr>'+
                        '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                        '               <label><i class="iconPopup iconSwitch fas fa-file-signature cinzaColor"></i>Documentos Vinculados:</label>'+
                        '           </td>'+
                        '           <td>'+
                        '               <table id="configBox_documentos" data-format="obj" data-key="documentos" style="font-size: 8pt !important;width: 100%;" class="tableOptionConfig tableSortable seiProForm tableDialog tableInfo tableZebra tableFollow tableAtividades">'+
                        '                    <thead>'+
                        '                        <tr class="tableHeader">'+
                        '                            <th class="tituloControle" style="width: 350px;">Tipo de Documento</th>'+
                        '                            <th class="tituloControle" style="width: 175px;">N\u00FAmero SEI</th>'+
                        '                            <th class="tituloControle" style="display:none">id_procedimento</th>'+
                        '                            <th class="tituloControle" style="display:none">id_documento</th>'+
                        '                            <th class="tituloControle" style="width: 50px;">Pr\u00E9via</th>'+
                        '                            <th class="tituloControle" style="width: 80px;">Ordem</th>'+
                        '                        </tr>'+
                        '                    </thead>'+
                        '                    <tbody>';
            var documentos = (typeof value.config !== 'undefined' && value.config !== null && typeof value.config.documentos !== 'undefined' && value.config.documentos !== null) ? value.config.documentos : false;
            var documentos_len = (documentos) ? documentos.length : 0;
            if (documentos){
                $.each(value.config.documentos, function(i, v){
                    var previewDoc =    '<a class="newLink" style="cursor: pointer;" onclick="openDialogDoc({title: \''+unicodeToChar(v.documento)+' ('+v.nr_sei+')\', id_procedimento: \''+v.id_procedimento+'\', id_documento: \''+v.id_documento+'\'})" onmouseover="return infraTooltipMostrar(\'Visualiza\u00E7\u00E3o r\u00E1pida\');" onmouseout="return infraTooltipOcultar();">'+
                                        '   <i class="fas fa-eye" style="font-size: 80%;"></i>'+
                                        '</a>';
                    htmlBox +=  '                        <tr data-index="'+i+'" data-key="documentos">'+
                                '                            <td class="editCellSelect" data-key="documento" data-type="text" style="width: 350px; padding: 0 10px; text-align: left;">'+unicodeToChar(v.documento)+'</td>'+
                                '                            <td class="editCellSEI" data-key="nr_sei" data-type="text" style="width: 175px; text-align: left;">'+v.nr_sei+'</td>'+
                                '                            <td data-key="id_procedimento" data-type="text" style="text-align: left; display:none">'+v.id_procedimento+'</td>'+
                                '                            <td data-key="id_documento" data-type="text" style="text-align: left; display:none">'+v.id_documento+'</td>'+
                                '                            <td data-ref="previa" style="text-align: center; width: 50px;">'+previewDoc+'</td>'+
                                '                            <td style="width: 80px; text-align: center;">'+
                                '                               <i class="fas fa-bars cinzaColor sorterTrConfig" style="cursor: grab;"></i>'+
                                '                               <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                                '                           </td>'+   
                                '                        </tr>';
                });
            }
            htmlBox +=      '                        <tr data-index="'+documentos_len+'" data-key="documentos">'+
                            '                            <td class="editCellSelect" data-key="documento" data-type="text" style="width: 350px; padding: 0 10px; text-align: left;"></td>'+
                            '                            <td class="editCellSEI" data-key="nr_sei" data-type="text" style="width: 175px; text-align: left;"></td>'+
                            '                            <td data-key="id_procedimento" data-type="text" style="text-align: left; display:none"></td>'+
                            '                            <td data-key="id_documento" data-type="text" style="text-align: left; display:none"></td>'+
                            '                            <td data-ref="previa" style="text-align: center; width: 50px;"></td>'+
                            '                            <td style="width: 80px; text-align: center;">'+
                            '                               <i class="fas fa-bars cinzaColor sorterTrConfig" style="cursor: grab;"></i>'+
                            '                               <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                            '                           </td>'+  
                            '                        </tr>'+
                            '                    </tbody>'+
                            '                    <tfoot>'+
                            '                       <tr>'+
                            '                           <th colspan="6" style="text-align: right;">'+
                            '                               <a class="newLink addConfigItem" onclick="addConfigItem(this)" style="cursor: pointer; margin: 5px;display: inline-block;">'+
                            '                                   <i class="fas fa-plus-circle cinzaColor" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                            '                                   Adicionar novo item'+
                            '                               </a>'+
                            '                           </th>'+
                            '                       </tr>'+
                            '                    </tfoot>'+
                            '                </table>'+
                            '           </td>'+
                            '      </tr>'+
                            '   </table>'+
                            '</div>';
    } else if (data.type == 'users') {
        var value = jmespath.search(tableConfigList[data.type], "[?id_user==`"+id+"`] | [0]");
        var idConfigBox = 'boxConfiguracoes_'+data.type;
        var nameBox = 'Usu\u00E1rios';
        var titleBox = 'Op\u00E7\u00F5es de '+nameBox+': '+value.nome_completo;

            htmlBox =   '<div id="'+idConfigBox+'" class="atividadeWork" data-atividade="'+(value && value.id_user ? value.id_user : 0)+'">'+
                        '   <table style="font-size: 10pt;width: 100%;" class="seiProForm tableLine">'+
                            '      <tr>'+
                            '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                            '               <label><i class="iconPopup iconSwitch fas fa-briefcase cinzaColor"></i>Lota\u00E7\u00E3o:</label>'+
                            '           </td>'+
                            '           <td>'+
                            '               <table id="configBox_lotacao" data-format="obj_mult" data-key="lotacao" style="font-size: 8pt !important;width: 100%;" class="tableOptionConfig tableSortable seiProForm tableDialog tableInfo tableZebra tableFollow tableAtividades">'+
                            '                    <thead>'+
                            '                        <tr class="tableHeader">'+
                            '                            <th class="tituloControle">Unidade</th>'+
                            '                            <th class="tituloControle" style="width: 50px;"></th>'+
                            '                        </tr>'+
                            '                    </thead>'+
                            '                    <tbody>';
            var lotacao = (value.lotacao !== null && typeof value.lotacao !== 'undefined') ? value.lotacao : false;
            var lotacao_len = (lotacao) ? lotacao.length : 0;
            if (lotacao){
                $.each(lotacao, function(i, v){
                    htmlBox +=  '                        <tr data-index="'+i+'" data-id="'+v.id_lotacao+'" data-value="'+v.id_unidade+'" data-key="lotacao" style="text-align: left;">'+
                                '                            <td class="editCellSelect" data-type="num" data-key="unidade" style="padding: 0 10px;">'+unicodeToChar(v.nome_unidade+' ('+v.sigla_unidade+')')+'</td>'+
                                '                            <td style="width: 50px; text-align: center;">'+
                                '                                 <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRowByID(this)"></i>'+
                                '                            </td>'+ 
                                '                        </tr>';
                });
            }
            htmlBox +=      '                        <tr data-index="'+lotacao_len+'" data-id="new" data-value="" data-key="lotacao" style="text-align: left;">'+
                            '                            <td class="editCellSelect" data-type="num" data-key="unidade" style="padding: 0 10px;"></td>'+
                            '                            <td style="width: 50px; text-align: center;">'+
                            '                                 <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRowByID(this)"></i>'+
                            '                            </td>'+ 
                            '                        </tr>'+
                            '                    </tbody>'+
                            '                    <tfoot>'+
                            '                       <tr>'+
                            '                           <th colspan="3" style="text-align: right;">'+
                            '                               <a class="newLink addConfigItem" onclick="addConfigItem(this)" style="cursor: pointer; margin: 5px;display: inline-block;">'+
                            '                                   <i class="fas fa-plus-circle cinzaColor" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                            '                                   Adicionar novo item'+
                            '                               </a>'+
                            '                           </th>'+
                            '                       </tr>'+
                            '                    </tfoot>'+
                            '                </table>'+
                            '           </td>'+
                            '      </tr>'+
                            '      <tr>'+
                            '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                            '               <label><i class="iconPopup iconSwitch fas fa-user-lock cinzaColor"></i>Perfil:</label>'+
                            '           </td>'+
                            '           <td>'+
                            '               <table id="configBox_perfil" data-format="obj_mult" data-key="perfil" style="font-size: 8pt !important;width: 100%;" class="tableOptionConfig seiProForm tableDialog tableInfo tableZebra tableFollow tableAtividades">'+
                            '                    <thead>'+
                            '                        <tr class="tableHeader">'+
                            '                            <th class="tituloControle" style="width: 40%;">Tipo de Perfil</th>'+
                            '                        </tr>'+
                            '                    </thead>'+
                            '                    <tbody>';

            var id_perfil = (value.id_perfil !== null && typeof value.id_perfil !== 'undefined') ? value.id_perfil : '0';
            var value_perfil = jmespath.search(arrayConfigAtividades.perfis,"[?id_perfil==`"+id_perfil+"`] | [0].nome_perfil");
                value_perfil = (value_perfil !== null) ? unicodeToChar(value_perfil) : '';
                htmlBox +=  '                        <tr data-index="0" data-id="'+id_perfil+'" data-value="'+id_perfil+'" data-key="perfil" style="text-align: left;">'+
                            '                            <td class="editCellSelect" data-type="num" data-key="perfil" style="padding: 0 10px;">'+value_perfil+'</td>'+
                            '                        </tr>'+
                            '                    </tbody>'+
                            '                </table>'+
                            '           </td>'+
                            '      </tr>';

            if (checkCapacidade('config_update_keys')) {
                htmlBox +=  '      <tr>'+
                            '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                            '               <label><i class="iconPopup iconSwitch fas fa-key cinzaColor"></i>Chaves de Acesso:</label>'+
                            '           </td>'+
                            '           <td>'+
                            '               <table id="configBox_keys" data-id="'+value.id_user+'" style="font-size: 8pt !important;width: 100%;" class="tableOptionConfig seiProForm tableDialog tableInfo tableZebra tableFollow tableAtividades">'+
                            '                    <thead>'+
                            '                        <tr class="tableHeader">'+
                            '                            <th class="tituloControle" style="width: 80px;">ID</th>'+
                            '                            <th class="tituloControle">Status</th>'+
                            '                            <th class="tituloControle" style="min-width: 250px;">A\u00E7\u00F5es</th>'+
                            '                        </tr>'+
                            '                    </thead>'+
                            '                    <tbody>';
                var keys = (value.keys !== null && typeof value.keys !== 'undefined') ? value.keys : false;
                if (keys){
                    $.each(keys, function(i, v){
                        var check_status = (v.data_fim == '0000-00-00 00:00:00' || moment(v.data_fim, 'YYYY-MM-DD HH:mm:ss') > moment()) ? true : false;
                        var status =    '<span class="info_tags_follow">'+
                                        '   <span style="background-color: #bfe8c4; '+(!check_status ? 'display:none;' : '')+'" class="tag_text keyVigente"><i class="tagicon fas fa-key" style="font-size: 90%;margin: 0 2px;color: #408743;"></i> Vigente</span>'+
                                        '   <span style="background-color: #f9e2e0; '+(check_status ? 'display:none;' : '')+'" class="tag_text keyRevogada"><i class="tagicon fas fa-key" style="font-size: 90%;margin: 0 2px;color: #c24242;"></i> Revogada</span>'+
                                        '</span>';
                        var btn_revoga = '<a class="newLink keyVigente keyRevoke" style="font-size: 10pt; cursor:pointer; '+(!check_status ? 'display:none;' : '')+'" onclick="configUpdateKey(this,\'disable_key\')"><i class="fas fa-user-slash" data-icon="fas fa-user-slash" style="font-size: 100%;"></i>Revogar</a>';
                        var btn_email = '<a class="newLink keyVigente keyResend" style="font-size: 10pt; cursor:pointer; '+(!check_status ? 'display:none;' : '')+'" onclick="configUpdateKey(this,\'resend_key\')"><i class="fas fa-envelope-open-text" data-icon="fas fa-envelope-open-text" style="font-size: 100%;"></i>Reenviar</a>';
                                        
                        htmlBox +=  '                        <tr data-index="'+i+'" data-id="'+v.id_hash+'" data-value="'+v.data_fim+'" style="text-align: left;">'+
                                    '                            <td data-type="value" data-key="id_hash" style="padding: 0 10px;">ID:'+v.id_hash+'</td>'+
                                    '                            <td data-type="value" data-key="status" style="padding: 0 10px;">'+status+'</td>'+
                                    '                            <td data-type="value" data-key="actions" style="padding: 0 10px; text-align: right;">'+btn_revoga+btn_email+'</td>'+
                                    '                        </tr>';
                    });
                }
                htmlBox +=  '                    </tbody>'+
                            '                    <tfoot>'+
                            '                       <tr data-id="-1">'+
                            '                           <th colspan="3" style="text-align: right;">'+
                            '                               <a class="newLink" onclick="configUpdateKey(this,\'new_key\')" style="cursor: pointer; margin: 5px;display: inline-block;">'+
                            '                                   <i class="fas fa-plus-circle cinzaColor" data-icon="fas fa-plus-circle cinzaColor" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                            '                                   Criar nova chave'+
                            '                               </a>'+
                            '                           </th>'+
                            '                       </tr>'+
                            '                    </tfoot>'+
                            '                </table>'+
                            '           </td>'+
                            '      </tr>';
            }
            htmlBox +=      '   </table>'+
                            '</div>';
    } else if (data.type == 'programas') {
        var value = jmespath.search(tableConfigList[data.type], "[?id_programa==`"+id+"`] | [0]");
        var idConfigBox = 'boxConfiguracoes_'+data.type;
        var nameBox = 'Programas de Gest\u00E3o';
        var titleBox = 'Op\u00E7\u00F5es de '+nameBox+': '+value.nome_sigla;

            htmlBox =   '<div id="'+idConfigBox+'" class="atividadeWork" data-programa="'+(value && value.id_programa ? value.id_programa : 0)+'">'+
                        '   <table style="font-size: 10pt;width: 100%;" class="seiProForm tableLine">'+
                        '      <tr>'+
                        '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                        '               <label><i class="iconPopup iconSwitch fas fa-file-signature cinzaColor"></i>Documentos Vinculados:</label>'+
                        '           </td>'+
                        '           <td>'+
                        '               <table id="configBox_documentos" data-format="obj" data-key="documentos" style="font-size: 8pt !important;width: 100%;" class="tableOptionConfig tableSortable seiProForm tableDialog tableInfo tableZebra tableFollow tableAtividades">'+
                        '                    <thead>'+
                        '                        <tr class="tableHeader">'+
                        '                            <th class="tituloControle" style="width: 350px;">Tipo de Documento</th>'+
                        '                            <th class="tituloControle" style="width: 175px;">N\u00FAmero SEI</th>'+
                        '                            <th class="tituloControle" style="display:none">id_procedimento</th>'+
                        '                            <th class="tituloControle" style="display:none">id_documento</th>'+
                        '                            <th class="tituloControle" style="width: 50px;">Pr\u00E9via</th>'+
                        '                            <th class="tituloControle" style="width: 80px;">Ordem</th>'+
                        '                        </tr>'+
                        '                    </thead>'+
                        '                    <tbody>';
            var documentos = (typeof value.config !== 'undefined' && value.config !== null && typeof value.config.documentos !== 'undefined' && value.config.documentos !== null) ? value.config.documentos : false;
            var documentos_len = (documentos) ? documentos.length : 0;
            if (documentos){
                $.each(value.config.documentos, function(i, v){
                    var previewDoc =    '<a class="newLink" style="cursor: pointer;" onclick="openDialogDoc({title: \''+unicodeToChar(v.documento)+' ('+v.nr_sei+')\', id_procedimento: \''+v.id_procedimento+'\', id_documento: \''+v.id_documento+'\'})" onmouseover="return infraTooltipMostrar(\'Visualiza\u00E7\u00E3o r\u00E1pida\');" onmouseout="return infraTooltipOcultar();">'+
                                        '   <i class="fas fa-eye" style="font-size: 80%;"></i>'+
                                        '</a>';
                    htmlBox +=  '                        <tr data-index="'+i+'" data-key="documentos">'+
                                '                            <td class="editCellSelect" data-key="documento" data-type="text" style="width: 350px; padding: 0 10px; text-align: left;">'+unicodeToChar(v.documento)+'</td>'+
                                '                            <td class="editCellSEI" data-key="nr_sei" data-type="text" style="width: 175px; text-align: left;">'+v.nr_sei+'</td>'+
                                '                            <td data-key="id_procedimento" data-type="text" style="text-align: left; display:none">'+v.id_procedimento+'</td>'+
                                '                            <td data-key="id_documento" data-type="text" style="text-align: left; display:none">'+v.id_documento+'</td>'+
                                '                            <td data-ref="previa" style="text-align: center; width: 50px;">'+previewDoc+'</td>'+
                                '                            <td style="width: 80px; text-align: center;">'+
                                '                               <i class="fas fa-bars cinzaColor sorterTrConfig" style="cursor: grab;"></i>'+
                                '                               <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                                '                           </td>'+  
                                '                        </tr>';
                });
            }
            htmlBox +=      '                        <tr data-index="'+documentos_len+'" data-key="documentos">'+
                            '                            <td class="editCellSelect" data-key="documento" data-type="text" style="width: 350px; padding: 0 10px; text-align: left;"></td>'+
                            '                            <td class="editCellSEI" data-key="nr_sei" data-type="text" style="width: 175px; text-align: left;"></td>'+
                            '                            <td data-key="id_procedimento" data-type="text" style="text-align: left; display:none"></td>'+
                            '                            <td data-key="id_documento" data-type="text" style="text-align: left; display:none"></td>'+
                            '                            <td data-ref="previa" style="text-align: center; width: 50px;"></td>'+
                            '                            <td style="width: 80px; text-align: center;">'+
                            '                               <i class="fas fa-bars cinzaColor sorterTrConfig" style="cursor: grab;"></i>'+
                            '                               <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                            '                           </td>'+  
                            '                        </tr>'+
                            '                    </tbody>'+
                            '                    <tfoot>'+
                            '                       <tr>'+
                            '                           <th colspan="6" style="text-align: right;">'+
                            '                               <a class="newLink addConfigItem" onclick="addConfigItem(this)" style="cursor: pointer; margin: 5px;display: inline-block;">'+
                            '                                   <i class="fas fa-plus-circle cinzaColor" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                            '                                   Adicionar novo item'+
                            '                               </a>'+
                            '                           </th>'+
                            '                       </tr>'+
                            '                    </tfoot>'+
                            '                </table>'+
                            '           </td>'+
                            '      </tr>'+
                            '   </table>'+
                            '</div>';
    } else if (data.type == 'unidades') {
        var value = jmespath.search(tableConfigList[data.type], "[?id_unidade==`"+id+"`] | [0]");
        var config = (typeof value.config !== 'undefined' && value.config !== null) ? value.config : false;
        var idConfigBox = 'boxConfiguracoes_'+data.type;
        var nameBox = 'Unidades';
        var titleBox = 'Op\u00E7\u00F5es de '+nameBox+': '+value.nome_unidade;

            htmlBox =   '<div id="'+idConfigBox+'" class="atividadeWork" data-unidade="'+(value && value.id_unidade ? value.id_unidade : 0)+'">'+
                        '<div id="'+idConfigBox+'_tabs" style="border: none; min-height: 300px; margin: 0;">'+
                        '   <ul style="font-size: 10px;">'+
                        '       <li><a href="#tabs_'+idConfigBox+'_produtividade">Produtividade e Plano de Trabalho</a></li>'+
                        '       <li><a href="#tabs_'+idConfigBox+'_atividades">'+__.Atividades+'</a></li>'+
                        '       <li><a href="#tabs_'+idConfigBox+'_distribuicao">Distribui\u00E7\u00E3o</a></li>'+
                        '       <li><a href="#tabs_'+idConfigBox+'_notificacao">Notifica\u00E7\u00E3o</a></li>'+
                        '       <li><a href="#tabs_'+idConfigBox+'_administrativo">Administrativo</a></li>'+
                        '   </ul>'+
                        '   <div id="tabs_'+idConfigBox+'_produtividade">'+
                        '   <table style="font-size: 10pt;width: 100%;" class="seiProForm tableLine">'+
                        '      <tr>'+
                        '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                        '               <label><i class="iconPopup iconSwitch fas fa-chart-line cinzaColor"></i>Ganho de Produtividade:</label>'+
                        '           </td>'+
                        '           <td>'+
                        '               <table id="configBox_modalidades" data-format="obj" data-key="modalidades" style="font-size: 8pt !important;width: 100%;" class="tableOptionConfig seiProForm tableDialog tableInfo tableZebra tableFollow tableAtividades">'+
                        '                    <thead>'+
                        '                        <tr class="tableHeader">'+
                        '                            <th class="tituloControle" style="width: 350px;">Tipo de Modalidade</th>'+
                        '                            <th class="tituloControle" style="width: 175px;">Fator</th>'+
                        '                            <th class="tituloControle" style="display:none">ID</th>'+
                        '                            <th class="tituloControle" style="width: 80px;">Ordem</th>'+
                        '                        </tr>'+
                        '                    </thead>'+
                        '                    <tbody>';
            var modalidades = (typeof value.config !== 'undefined' && value.config !== null && typeof value.config.modalidades !== 'undefined' && value.config.modalidades !== null) ? value.config.modalidades : false;
            var modalidades_len = (modalidades) ? modalidades.length : 0;
            if (modalidades){
                $.each(value.config.modalidades, function(i, v){
                    htmlBox +=  '                        <tr data-index="'+i+'" data-key="modalidades">'+
                                '                            <td class="editCellSelect" data-key="tipo_modalidade" data-type="text" style="width: 350px; padding: 0 10px; text-align: left;">'+unicodeToChar(v.tipo_modalidade)+'</td>'+
                                '                            <td class="editCellNum" data-key="fator" data-type="text" style="width: 175px; text-align: left;">'+v.fator+'</td>'+ 
                                '                            <td data-key="id_tipo_modalidade" data-type="text" style="display:none;">'+v.id_tipo_modalidade+'</td>'+ 
                                '                            <td style="width: 80px; text-align: center;">'+
                                '                               <i class="fas fa-bars cinzaColor sorterTrConfig" style="cursor: grab;"></i>'+
                                '                               <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                                '                           </td>'+  
                                '                        </tr>';
                });
            }
            htmlBox +=      '                        <tr data-index="'+modalidades_len+'" data-key="modalidades">'+
                            '                            <td class="editCellSelect" data-key="tipo_modalidade" data-type="text" style="width: 350px; padding: 0 10px; text-align: left;"></td>'+
                            '                            <td class="editCellNum" data-key="fator" data-type="text" style="width: 175px; text-align: left;"></td>'+
                            '                            <td data-key="id_tipo_modalidade" data-type="text" style="display:none;"></td>'+
                            '                            <td style="width: 80px; text-align: center;">'+
                            '                               <i class="fas fa-bars cinzaColor sorterTrConfig" style="cursor: grab;"></i>'+
                            '                               <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                            '                           </td>'+  
                            '                        </tr>'+
                            '                    </tbody>'+
                            '                    <tfoot>'+
                            '                       <tr>'+
                            '                           <th colspan="3" style="text-align: right;">'+
                            '                               <a class="newLink addConfigItem" onclick="addConfigItem(this)" style="cursor: pointer; margin: 5px;display: inline-block;">'+
                            '                                   <i class="fas fa-plus-circle cinzaColor" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                            '                                   Adicionar novo item'+
                            '                               </a>'+
                            '                           </th>'+
                            '                       </tr>'+
                            '                    </tfoot>'+
                            '                </table>'+
                            '           </td>'+
                            '      </tr>'+
                            '      <tr>'+
                            '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                            '               <label><i class="iconPopup iconSwitch fas fa-handshake cinzaColor"></i>Plano de Trabalho:</label>'+
                            '           </td>'+
                            '           <td>'+
                            '               <table style="font-size: 10pt;width: 100%; margin: 10px 0;" class="seiProForm">'+
                            '                  <tr style="height: 40px;">'+
                            '                      <td style="text-align: left;"><i class="iconPopup fas fa-stopwatch cinzaColor"></i> Prazo de anteced\u00EAncia m\u00EDnima para convoca\u00E7\u00F5es \u00E0 unidade <br>(apenas para PGR Semipresencial ou Teletrabalho)</td>'+
                            '                      <td>'+
                            '                            <input type="number" style="width: 50px !important;" id="planos_prazo_comparecimento" min="1" tabindex="0" value="'+(config && typeof config.planos !== 'undefined' && typeof config.planos.prazo_comparecimento !== 'undefined' && config.planos.prazo_comparecimento  ? config.planos.prazo_comparecimento  : '1')+'">'+
                            '                            <select style="min-height: 35px !important; width: 70px;" id="planos_data_comparecimento" tabindex="0">'+
                            '                                <option '+(config && typeof config.planos !== 'undefined' && typeof config.planos.data_comparecimento !== 'undefined' && config.planos.data_comparecimento == 'dia'  ? 'selected' : '')+'>Dia</option>'+
                            '                                <option '+(config && typeof config.planos !== 'undefined' && typeof config.planos.data_comparecimento !== 'undefined' && config.planos.data_comparecimento == 'hora'  ? 'selected' : '')+'>Hora</option>'+
                            '                            </select>'+
                            '                      </td>'+
                            '                  </tr>'+
                            '               </table>'+
                            '           </td>'+
                            '      </tr>'+
                            '   </table>'+
                            '   </div>'+
                            '   <div id="tabs_'+idConfigBox+'_atividades">'+
                            '   <table style="font-size: 10pt;width: 100%;" class="seiProForm tableLine">'+
                            '      <tr>'+
                            '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                            '               <label><i class="iconPopup iconSwitch fas fa-clipboard-list cinzaColor"></i>'+__.Atividades+'</label>'+
                            '           </td>'+
                            '           <td>'+
                            '               <table style="font-size: 10pt;width: 100%; margin: 10px 0;" class="seiProForm">'+
                            '                  <tr style="height: 40px;">'+
                            '                      <td style="text-align: left;"><i class="iconPopup fas fa-sort-amount-up cinzaColor"></i> Relacionar lista de '+__.atividades+' da unidade superior (caso exista)</td>'+
                            '                      <td>'+
                            '                          <div class="onoffswitch" style="float: right;">'+
                            '                              <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="atividades_lista_superior" tabindex="0" '+(config && typeof config.atividades !== 'undefined' && typeof config.atividades.lista_superior !== 'undefined' && config.atividades.lista_superior  ? 'checked' : '')+'>'+
                            '                              <label class="onoffswitch-label" for="atividades_lista_superior"></label>'+
                            '                          </div>'+
                            '                      </td>'+
                            '                  </tr>'+
                            '                  <tr style="height: 40px;">'+
                            '                      <td style="text-align: left;"><i class="iconPopup fas fa-sort-amount-up cinzaColor"></i> Relacionar lista de '+__.atividades+' de unidade espec\u00EDfica'+getNameGenre('atividade', 'espec\u00EDfico', 'espec\u00EDfica')+'</td>'+
                            '                      <td>'+
                            '                          <div class="onoffswitch" style="float: right;">'+
                            '                              <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="atividades_lista_unidade" onchange="changeConfigListaUnidade(this)" tabindex="0" '+(config && typeof config.atividades !== 'undefined' && typeof config.atividades.lista_unidade !== 'undefined' && config.atividades.lista_unidade  ? 'checked' : '')+'>'+
                            '                              <label class="onoffswitch-label" for="atividades_lista_unidade"></label>'+
                            '                          </div>'+
                            '                          <div style="margin-top: 10px; '+(config && typeof config.atividades !== 'undefined' && typeof config.atividades.lista_unidade !== 'undefined' && config.atividades.lista_unidade  ? 'display: inline-block;' : 'display: none;')+'" id="div_lista_unidade">'+
                            '                               <select id="select_lista_unidade"><option value=""></option>'+getOptionSelectPerfil(arrayConfigAtividades.unidades_all, config.atividades.lista_unidade, false)+'</select>'+
                            '                          </div>'+
                            '                      </td>'+
                            '                  </tr>'+
                            '                  <tr style="height: 40px;">'+
                            '                      <td style="text-align: left;"><i class="iconPopup fas fa-archive cinzaColor"></i> '+__.Arquivar+' '+__.demandas+' automaticamente ap\u00F3s a avalia\u00E7\u00E3o</td>'+
                            '                      <td>'+
                            '                          <div class="onoffswitch" style="float: right;">'+
                            '                              <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="atividades_envio_automatico" tabindex="0" '+(config && typeof config.atividades !== 'undefined' && typeof config.atividades.envio_automatico !== 'undefined' && config.atividades.envio_automatico  ? 'checked' : '')+'>'+
                            '                              <label class="onoffswitch-label" for="atividades_envio_automatico"></label>'+
                            '                          </div>'+
                            '                      </td>'+
                            '                  </tr>'+
                            '               </table>'+
                            '           </td>'+
                            '      </tr>'+
                            '   </table>'+
                            '   </div>'+
                            '   <div id="tabs_'+idConfigBox+'_distribuicao">'+
                            '   <table style="font-size: 10pt;width: 100%;" class="seiProForm tableLine">'+
                            '      <tr>'+
                            '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                            '               <label><i class="iconPopup iconSwitch fas fa-random cinzaColor"></i>Distribui\u00E7\u00E3o</label>'+
                            '           </td>'+
                            '           <td>'+
                            '               <table style="font-size: 10pt;width: 100%; margin: 10px 0;" class="seiProForm">'+
                            '                  <tr style="height: 40px;">'+
                            '                      <td style="text-align: left; border: none;"><i class="iconPopup far fa-calendar-alt cinzaColor"></i> Contagem de prazos em dias \u00FAteis</td>'+
                            '                      <td style="border: none;">'+
                            '                          <div class="onoffswitch" style="float: right;">'+
                            '                              <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="distribuicao_count_dias_uteis" tabindex="0" '+(config && typeof config.distribuicao !== 'undefined' && typeof config.distribuicao.count_dias_uteis !== 'undefined' && config.distribuicao.count_dias_uteis  ? 'checked' : '')+'>'+
                            '                              <label class="onoffswitch-label" for="distribuicao_count_dias_uteis"></label>'+
                            '                          </div>'+
                            '                      </td>'+
                            '                  </tr>'+
                            '                  <tr style="height: 40px;">'+
                            '                      <td style="text-align: left; border: none;"><i class="iconPopup fas fa-stopwatch cinzaColor"></i> Contagem de prazos em horas \u00FAteis</td>'+
                            '                      <td style="border: none;">'+
                            '                          <div class="onoffswitch" style="float: right;">'+
                            '                              <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="distribuicao_count_horas" tabindex="0" '+(config && typeof config.distribuicao !== 'undefined' && typeof config.distribuicao.count_horas !== 'undefined' && config.distribuicao.count_horas  ? 'checked' : '')+'>'+
                            '                              <label class="onoffswitch-label" for="distribuicao_count_horas"></label>'+
                            '                          </div>'+
                            '                      </td>'+
                            '                  </tr>'+
                            '                  <tr style="height: 40px;">'+
                            '                      <td style="text-align: left; border: none;"><i class="iconPopup fas fa-business-time cinzaColor"></i> Hor\u00E1rio \u00FAtil de trabalho</td>'+
                            '                      <td style="border: none;">'+
                            '                           <input type="time" id="distribuicao_horario_util_inicio" style="width: 100px !important; float: left;" tabindex="0" value="'+(config && typeof config.distribuicao !== 'undefined' && typeof config.distribuicao.horario_util !== 'undefined' && typeof config.distribuicao.horario_util.inicio !== 'undefined' ? config.distribuicao.horario_util.inicio : '00:00')+'">'+
                            '                           <span style="line-height: 40px; display: inline-block;">\u00E0</span>'+
                            '                           <input type="time" id="distribuicao_horario_util_fim" style="width: 100px !important; float: right;" tabindex="0" value="'+(config && typeof config.distribuicao !== 'undefined' && typeof config.distribuicao.horario_util !== 'undefined' && typeof config.distribuicao.horario_util.fim !== 'undefined' ? config.distribuicao.horario_util.fim : '23:59')+'">'+
                            '                      </td>'+
                            '                  </tr>'+
                            '                  <tr style="height: 40px;">'+
                            '                      <td colspan="2">'+
                            '                           <table style="width: 100%;">'+
                            '                               <tr>'+
                            '                                 <td style="text-align: left; border: none;font-size: 10pt;"><i class="iconPopup fas fa-umbrella-beach cinzaColor"></i> Feriados <Br>da Unidade</td>'+
                            '                                 <td style="border: none;">'+
                            '                                     <span style="background: #fffcd7; padding: 5px; border-radius: 5px; font-size: 8pt; white-space: nowrap;">'+
                            '                                       <i class="fas fa-info-circle azulColor" style="margin: 0 5px; font-size: 10pt;"></i>'+
                            '                                       Feriados nacionais e pontos facultativos da entidade j\u00E1 est\u00E3o inclu\u00EDdos na lista de feriados do sistema'+
                            '                                     </span>'+
                            '                                     <table id="configBox_feriados" data-format="obj" data-key="feriados" style="font-size: 8pt !important;width: 100%;" class="tableOptionConfig seiProForm tableDialog tableInfo tableZebra tableFollow tableAtividades">'+
                            '                                          <thead>'+
                            '                                              <tr class="tableHeader">'+
                            '                                                  <th class="tituloControle" style="width: 250px;">Nome do Feriado</th>'+
                            '                                                  <th class="tituloControle" style="width: 100px;">Recorrente?</th>'+
                            '                                                  <th class="tituloControle" style="width: 150px;">Data</th>'+
                            '                                                  <th class="tituloControle" style="width: 50px;"></th>'+
                            '                                              </tr>'+
                            '                                          </thead>'+
                            '                                          <tbody>';
            var feriados = (typeof value.config !== 'undefined' && value.config !== null && typeof value.config.feriados !== 'undefined' && value.config.feriados !== null) ? value.config.feriados : false;
            var feriados_len = (feriados) ? feriados.length : 0;
            if (feriados){
                $.each(value.config.feriados, function(i, v){
                    htmlBox +=  '                                              <tr data-index="'+i+'" data-key="feriados">'+
                                '                                                  <td class="editCell" data-key="nome_feriado" data-type="text" style="width: 250px; padding: 0 10px; text-align: left;">'+unicodeToChar(v.nome_feriado)+'</td>'+
                                '                                                  <td data-key="recorrente" data-type="switch" style="width: 100px; text-align: center;">'+
                                '                                                     <div class="onoffswitch" style="transform: scale(0.8);">'+
                                '                                                         <input type="checkbox" name="onoffswitch" onchange="changeConfigFeriadoRecorrente(this)" class="onoffswitch-checkbox switch_feriadoRecorrente switch_feriadoRecorrente_'+i+'" id="changeItemConfig_'+data.type+'_'+i+'" tabindex="0" '+(v.recorrente  ? 'checked' : '')+'>'+
                                '                                                         <label class="onoffswitch-label" for="changeItemConfig_'+data.type+'_'+i+'"></label>'+
                                '                                                     </div>'+
                                '                                                  </td>'+
                                '                                                  <td class="editCellMonth" data-key="feriado_data" data-type="text" style="width: 150px; text-align: left;">'+v.feriado_data+'</td>'+ 
                                '                                                  <td style="width: 50px; text-align: center;">'+
                                '                                                       <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                                '                                                  </td>'+ 
                                '                                              </tr>';
                });
            }
            htmlBox +=      '                                              <tr data-index="'+feriados_len+'" data-key="feriados">'+
                            '                                                  <td class="editCell" data-key="nome_feriado" data-type="text" style="width: 250px; padding: 0 10px; text-align: left;"></td>'+
                            '                                                  <td data-key="recorrente" data-type="switch" style="width: 100px; text-align: center;">'+
                            '                                                     <div class="onoffswitch" style="transform: scale(0.8);">'+
                            '                                                         <input type="checkbox" onchange="changeConfigFeriadoRecorrente(this)" name="onoffswitch" class="onoffswitch-checkbox switch_feriadoRecorrente switch_feriadoRecorrente_'+feriados_len+'" id="changeItemConfig_'+data.type+'_'+feriados_len+'" tabindex="0" checked>'+
                            '                                                         <label class="onoffswitch-label" for="changeItemConfig_'+data.type+'_'+feriados_len+'"></label>'+
                            '                                                     </div>'+
                            '                                                  </td>'+
                            '                                                  <td class="editCellMonth" data-key="feriado_data" data-type="text" style="width: 150px; text-align: left;"></td>'+
                            '                                                  <td style="width: 50px; text-align: center;">'+
                            '                                                       <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                            '                                                  </td>'+ 
                            '                                              </tr>'+
                            '                                          </tbody>'+
                            '                                          <tfoot>'+
                            '                                             <tr>'+
                            '                                                 <th colspan="3" style="text-align: right;">'+
                            '                                                     <a class="newLink addConfigItem" onclick="addConfigItem(this)" style="cursor: pointer; margin: 5px;display: inline-block;">'+
                            '                                                         <i class="fas fa-plus-circle cinzaColor" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                            '                                                         Adicionar novo item'+
                            '                                                     </a>'+
                            '                                                 </th>'+
                            '                                             </tr>'+
                            '                                          </tfoot>'+
                            '                                      </table>'+
                            '                                   </td>'+
                            '                               </tr>'+
                            '                           </table>'+
                            '                      </td>'+
                            '                  </tr>'+
                            '               </table>'+
                            '           </td>'+
                            '      </tr>'+
                            '   </table>'+
                            '   </div>'+
                            '   <div id="tabs_'+idConfigBox+'_notificacao">'+
                            '   <table style="font-size: 10pt;width: 100%;" class="seiProForm tableLine">'+
                            '      <tr>'+
                            '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                            '               <label><i class="iconPopup iconSwitch fas fa-bullhorn cinzaColor"></i>Notifica\u00E7\u00E3o</label>'+
                            '           </td>'+
                            '           <td>'+
                            '               <table style="font-size: 10pt;width: 100%;" class="seiProForm">'+
                            '                  <tr style="height: 40px;">'+
                            '                      <td style="text-align: left; width: 35%;">'+
                            '                           <div><i class="iconPopup fas fa-user-check cinzaColor"></i> Texto padr\u00E3o para  '+__.nova_demanda+'</div>'+
                            '                           <div style="margin: 10px 0">'+
                            '                               '+htmlOptionsAddTextarea('notificacao_texto_criacao', '{usuario}')+
                            '                               '+htmlOptionsAddTextarea('notificacao_texto_criacao', '{requisicao}')+
                            '                               '+htmlOptionsAddTextarea('notificacao_texto_criacao', '{atividade}')+
                            '                               '+htmlOptionsAddTextarea('notificacao_texto_criacao', '{processo}')+
                            '                               '+htmlOptionsAddTextarea('notificacao_texto_criacao', '{assunto}')+
                            '                               '+htmlOptionsAddTextarea('notificacao_texto_criacao', '{prazo}')+
                            '                               '+htmlOptionsAddTextarea('notificacao_texto_criacao', '{tempo_pactuado}')+
                            '                               '+htmlOptionsAddTextarea('notificacao_texto_criacao', '{tempo_planejado}')+
                            '                               '+htmlOptionsAddTextarea('notificacao_texto_criacao', '{data_entrega}')+
                            '                               '+htmlOptionsAddTextarea('notificacao_texto_criacao', '{observacoes_gerenciais}')+
                            '                           </div>'+
                            '                      </td>'+
                            '                      <td>'+
                            '                          <textarea id="notificacao_texto_criacao" style="width: 97%; height: 200px;">'+(config && typeof config.distribuicao !== 'undefined' && typeof config.distribuicao.notificacao !== 'undefined' && typeof config.distribuicao.notificacao.texto_criacao !== 'undefined' ? unicodeToChar(config.distribuicao.notificacao.texto_criacao).replace(/\\n/g, '\n') : '')+'</textarea>'+
                            '                      </td>'+
                            '                  </tr>'+
                            '                  <tr style="height: 40px;">'+
                            '                      <td style="text-align: left;">'+
                            '                           <div><i class="iconPopup fas fa-check-circle cinzaColor"></i> Texto padr\u00E3o para conclus\u00E3o de '+__.demanda+''+
                            '                           <div style="margin: 10px 0">'+
                            '                               '+htmlOptionsAddTextarea('notificacao_texto_conclusao', '{usuario}')+
                            '                               '+htmlOptionsAddTextarea('notificacao_texto_conclusao', '{requisicao}')+
                            '                               '+htmlOptionsAddTextarea('notificacao_texto_conclusao', '{atividade}')+
                            '                               '+htmlOptionsAddTextarea('notificacao_texto_conclusao', '{processo}')+
                            '                               '+htmlOptionsAddTextarea('notificacao_texto_conclusao', '{assunto}')+
                            '                               '+htmlOptionsAddTextarea('notificacao_texto_conclusao', '{prazo}')+
                            '                               '+htmlOptionsAddTextarea('notificacao_texto_conclusao', '{tempo_pactuado}')+
                            '                               '+htmlOptionsAddTextarea('notificacao_texto_conclusao', '{tempo_planejado}')+
                            '                               '+htmlOptionsAddTextarea('notificacao_texto_conclusao', '{data_entrega}')+
                            '                               '+htmlOptionsAddTextarea('notificacao_texto_conclusao', '{observacoes}')+
                            '                               '+htmlOptionsAddTextarea('notificacao_texto_conclusao', '{documento_produto}')+
                            '                           </div>'+
                            '                      </td>'+
                            '                      <td>'+
                            '                          <textarea id="notificacao_texto_conclusao" style="width: 97%; height: 200px;">'+(config && typeof config.distribuicao !== 'undefined' && typeof config.distribuicao.notificacao !== 'undefined' && typeof config.distribuicao.notificacao.texto_conclusao !== 'undefined' ? unicodeToChar(config.distribuicao.notificacao.texto_conclusao).replace(/\\n/g, '\n') : '')+'</textarea>'+
                            '                      </td>'+
                            '                  </tr>'+
                            '                  <tr style="height: 40px;">'+
                            '                      <td style="text-align: left;"><i class="iconPopup fas fa-envelope-open-text cinzaColor"></i> E-mail da unidade</td>'+
                            '                      <td>'+
                            '                          <input type="email" onblur="checkInputEmail(this)" id="notificacao_email" value="'+(config && typeof config.distribuicao !== 'undefined' && typeof config.distribuicao.notificacao !== 'undefined' && typeof config.distribuicao.notificacao.email !== 'undefined' ? config.distribuicao.notificacao.email : '')+'">'+
                            '                      </td>'+
                            '                  </tr>'+
                            '               </table>'+
                            '           </td>'+
                            '      </tr>'+
                            '   </table>'+
                            '   </div>'+
                            '   <div id="tabs_'+idConfigBox+'_administrativo">'+
                            '   <table style="font-size: 10pt;width: 100%;" class="seiProForm tableLine">'+
                            '      <tr>'+
                            '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                            '               <label><i class="iconPopup iconSwitch fas fa-wrench cinzaColor"></i>Administrativo</label>'+
                            '           </td>'+
                            '           <td>'+
                            '               <table style="font-size: 10pt;width: 100%; margin: 10px 0;" class="seiProForm">'+
                            '                  <tr style="height: 40px;">'+
                            '                      <td style="text-align: left;"><i class="iconPopup fas fa-user-lock cinzaColor"></i> Permitir a autoedi\u00E7\u00E3o de informa\u00E7\u00F5es gerais pelas unidades subordinadas (nome, sigla e depend\u00EAncia)</td>'+
                            '                      <td>'+
                            '                          <div class="onoffswitch" style="float: right;">'+
                            '                              <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="atividades_autoedicao_subordinadas" tabindex="0" '+(config && typeof config.administrativo !== 'undefined' && typeof config.administrativo.autoedicao_subordinadas !== 'undefined' && config.administrativo.autoedicao_subordinadas  ? 'checked' : '')+'>'+
                            '                              <label class="onoffswitch-label" for="atividades_autoedicao_subordinadas"></label>'+
                            '                          </div>'+
                            '                      </td>'+
                            '                  </tr>'+
                            '               </table>'+
                            '           </td>'+
                            '      </tr>'+
                            '   </table>'+
                            '   </div>'+
                            '   </div>'+
                            '</div>';
    } else if (data.type == 'tipos_modalidades') {
        var value = jmespath.search(tableConfigList[data.type], "[?id_tipo_modalidade==`"+id+"`] | [0]");
        var config = (typeof value.config !== 'undefined' && value.config !== null) ? value.config : false;
        var idConfigBox = 'boxConfiguracoes_'+data.type;
        var nameBox = 'Tipos de Modalidades';
        var titleBox = 'Op\u00E7\u00F5es de '+nameBox+': '+value.nome_unidade;

            htmlBox =   '<div id="'+idConfigBox+'" class="atividadeWork" data-unidade="'+(value && value.id_unidade ? value.id_unidade : 0)+'">'+
                        '   <table style="font-size: 10pt;width: 100%;" class="seiProForm tableLine">'+
                        '      <tr>'+
                        '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                        '               <label><i class="iconPopup iconSwitch fas fa-clipboard-list cinzaColor"></i>'+__.Atividades+'</label>'+
                        '           </td>'+
                        '           <td>'+
                        '               <table style="font-size: 10pt;width: 100%; margin: 10px 0;" class="seiProForm">'+
                        '                  <tr style="height: 40px;">'+
                        '                      <td style="text-align: left;border-bottom: none;"><i class="iconPopup fas fa-thumbs-up cinzaColor"></i> Permitir apenas '+__.atividades+' '+getNameGenre('atividade', 'homologados', 'homologadas')+'</td>'+
                        '                      <td style="border-bottom: none;">'+
                        '                          <div class="onoffswitch" style="float: right;">'+
                        '                              <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox singleOptionConfig" data-key="atividades_homologadas" id="atividades_homologadas" tabindex="0" '+(config &&  config.hasOwnProperty('atividades_homologadas') && config.atividades_homologadas !== null && config.atividades_homologadas ? 'checked' : '')+'>'+
                        '                              <label class="onoffswitch-label" for="atividades_homologadas"></label>'+
                        '                          </div>'+
                        '                      </td>'+
                        '                  </tr>'+
                        '                  <tr style="height: 40px;">'+
                        '                      <td style="text-align: left;"><i class="iconPopup fas fa-star cinzaColor"></i> Dispensar a avalia\u00E7\u00E3o de '+__.demandas+'</td>'+
                        '                      <td>'+
                        '                          <div class="onoffswitch" style="float: right;">'+
                        '                              <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox singleOptionConfig" data-key="dispensa_avaliacao" id="dispensa_avaliacao" tabindex="0" '+(config &&  config.hasOwnProperty('dispensa_avaliacao') && config.dispensa_avaliacao !== null && config.dispensa_avaliacao ? 'checked' : '')+'>'+
                        '                              <label class="onoffswitch-label" for="dispensa_avaliacao"></label>'+
                        '                          </div>'+
                        '                      </td>'+
                        '                  </tr>'+
                        '               </table>'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr>'+
                        '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                        '               <label><i class="iconPopup iconSwitch fas fa-handshake cinzaColor"></i>Planos de Trabalho</label>'+
                        '           </td>'+
                        '           <td>'+
                        '               <table style="font-size: 10pt;width: 100%; margin: 10px 0;" class="seiProForm">'+
                        '                  <tr style="height: 40px;">'+
                        '                      <td style="text-align: left;"><i class="iconPopup fas fa-copy cinzaColor"></i> Utilizar os modelos de documentos da entidade</td>'+
                        '                      <td>'+
                        '                          <div class="onoffswitch" style="float: right;">'+
                        '                              <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox singleOptionConfig" data-key="modelos" id="modelos" tabindex="0" '+(config &&  config.hasOwnProperty('modelos') && config.modelos !== null && config.modelos ? 'checked' : '')+'>'+
                        '                              <label class="onoffswitch-label" for="modelos"></label>'+
                        '                          </div>'+
                        '                      </td>'+
                        '                  </tr>'+
                        '                  <tr style="height: 40px;">'+
                        '                      <td style="text-align: left;"><i class="iconPopup fas fa-file-signature cinzaColor"></i> Exigir assinatura de modelos de documentos da entidade</td>'+
                        '                      <td>'+
                        '                          <div class="onoffswitch" style="float: right;">'+
                        '                              <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox singleOptionConfig" data-key="exige_assinatura" id="exige_assinatura" tabindex="0" '+(config &&  config.hasOwnProperty('exige_assinatura') && config.exige_assinatura !== null && config.exige_assinatura ? 'checked' : '')+'>'+
                        '                              <label class="onoffswitch-label" for="exige_assinatura"></label>'+
                        '                          </div>'+
                        '                      </td>'+
                        '                  </tr>'+
                        '               </table>'+
                        '           </td>'+
                        '      </tr>'+
                        '   </table>'+
                        '</div>';
    } else if (data.type == 'nomenclaturas') {
        var value = jmespath.search(tableConfigList[data.type], "[?id_nomenclatura==`"+id+"`] | [0]");
        var config = (typeof value.config !== 'undefined' && value.config !== null) ? value.config : false;
        var idConfigBox = 'boxConfiguracoes_'+data.type;
        var nameBox = 'Nomenclaturas';
        var titleBox = 'Op\u00E7\u00F5es de '+nameBox+': '+value.nome_nomenclatura;

            htmlBox =   '<div id="'+idConfigBox+'" class="atividadeWork" data-nomenclatura="'+(value && value.id_nomenclatura ? value.id_nomenclatura : 0)+'">'+
                        '   <table style="font-size: 10pt;width: 100%;" class="seiProForm">'+
                        '      <tr>'+
                        '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                        '               <label><i class="iconPopup iconSwitch far fa-comment-alt cinzaColor"></i>Descri\u00E7\u00E3o</label>'+
                        '           </td>'+
                        '           <td style="text-align: left;">'+
                        '               '+(value && typeof value.descricao !== 'undefined'  ? value.descricao  : '')+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr>'+
                        '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                        '               <label><i class="iconPopup iconSwitch far fa-square cinzaColor"></i>Singular</label>'+
                        '           </td>'+
                        '           <td>'+
                        '               <input type="text" id="singular" class="singleOptionInput" data-key="singular" data-convert="lowercase" value="'+(config && typeof config.singular !== 'undefined'  ? config.singular  : '')+'">'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr>'+
                        '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                        '               <label><i class="iconPopup iconSwitch far fa-clone cinzaColor"></i>Plural</label>'+
                        '           </td>'+
                        '           <td>'+
                        '               <input type="text" id="plural" class="singleOptionInput" data-key="plural" data-convert="lowercase" value="'+(config && typeof config.plural !== 'undefined'  ? config.plural  : '')+'">'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr>'+
                        '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                        '               <label><i class="iconPopup iconSwitch fas fa-mars cinzaColor"></i>Masculino</label>'+
                        '           </td>'+
                        '           <td>'+
                        '               <div class="onoffswitch" style="float: left;">'+
                        '                   <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox singleOptionConfig" data-key="masculino" id="masculino" tabindex="0" '+(config &&  config.hasOwnProperty('masculino') && config.masculino !== null && config.masculino ? 'checked' : '')+'>'+
                        '                   <label class="onoffswitch-label" for="masculino"></label>'+
                        '               </div>'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr>'+
                        '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                        '               <label><i class="iconPopup iconSwitch fas fa-spell-check cinzaColor"></i>Adicionar preposi\u00E7\u00E3o <br>(do, da, dos, das)</label>'+
                        '           </td>'+
                        '           <td>'+
                        '               <div class="onoffswitch" style="float: left;">'+
                        '                   <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox singleOptionConfig" data-key="preposicao" id="preposicao" tabindex="0" '+(config &&  config.hasOwnProperty('preposicao') && config.preposicao !== null && config.preposicao ? 'checked' : '')+'>'+
                        '                   <label class="onoffswitch-label" for="preposicao"></label>'+
                        '               </div>'+
                        '           </td>'+
                        '      </tr>'+
                        '   </table>'+
                        '</div>';
    } else if (data.type == 'entidades') {
        var value = jmespath.search(tableConfigList[data.type], "[?id_entidade==`"+id+"`] | [0]");
        var config = (typeof value.config !== 'undefined' && value.config !== null) ? value.config : false;
        var idConfigBox = 'boxConfiguracoes_'+data.type;
        var nameBox = 'Entidades';
        var titleBox = 'Op\u00E7\u00F5es de '+nameBox+': '+value.nome_entidade;

            htmlBox =   '<div id="'+idConfigBox+'" class="atividadeWork" data-entidade="'+(value && value.id_entidade ? value.id_entidade : 0)+'">'+
                        '   <table style="font-size: 10pt;width: 100%;" class="seiProForm tableLine">'+
                        '      <tr>'+
                        '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                        '               <label><i class="iconPopup iconSwitch fas fa-random cinzaColor"></i>Distribui\u00E7\u00E3o</label>'+
                        '           </td>'+
                        '           <td>'+
                        '               <table style="font-size: 10pt;width: 100%; margin: 10px 0;" class="seiProForm">'+
                        '                  <tr style="height: 40px;">'+
                        '                      <td colspan="2">'+
                        '                           <table style="width:100%;">'+
                        '                               <tr>'+
                        '                                 <td style="text-align: left; border: none;font-size: 10pt;"><i class="iconPopup fas fa-umbrella-beach cinzaColor"></i> Feriados <Br>da Entidade</td>'+
                        '                                 <td style="border: none;">'+
                        '                                     <span style="background: #fffcd7; padding: 5px; border-radius: 5px; font-size: 8pt;">'+
                        '                                       <i class="fas fa-info-circle azulColor" style="margin: 0 5px; font-size: 10pt;"></i>'+
                        '                                       Feriados nacionais j\u00E1 est\u00E3o inclu\u00EDdos na lista de feriados do sistema'+
                        '                                     </span>'+
                        '                                     <table id="configBox_feriados" data-format="obj" data-key="feriados" style="font-size: 8pt !important;width: 100%;" class="tableOptionConfig seiProForm tableDialog tableInfo tableZebra tableFollow tableAtividades">'+
                        '                                          <thead>'+
                        '                                              <tr class="tableHeader">'+
                        '                                                  <th class="tituloControle" style="width: 250px;">Nome do Feriado</th>'+
                        '                                                  <th class="tituloControle" style="width: 100px;">Recorrente?</th>'+
                        '                                                  <th class="tituloControle" style="width: 150px;">Data</th>'+
                        '                                                  <th class="tituloControle" style="width: 50px;"></th>'+
                        '                                              </tr>'+
                        '                                          </thead>'+
                        '                                          <tbody>';
            var feriados = (typeof value.config !== 'undefined' && value.config !== null && typeof value.config.feriados !== 'undefined' && value.config.feriados !== null) ? value.config.feriados : false;
            var feriados_len = (feriados) ? feriados.length : 0;
            if (feriados){
                $.each(value.config.feriados, function(i, v){
                    htmlBox +=  '                                              <tr data-index="'+i+'" data-key="feriados">'+
                                '                                                  <td class="editCell" data-key="nome_feriado" data-type="text" style="width: 250px; padding: 0 10px; text-align: left;">'+unicodeToChar(v.nome_feriado)+'</td>'+
                                '                                                  <td data-key="recorrente" data-type="switch" style="width: 100px; text-align: center;">'+
                                '                                                     <div class="onoffswitch" style="transform: scale(0.8);">'+
                                '                                                         <input type="checkbox" name="onoffswitch" onchange="changeConfigFeriadoRecorrente(this)" class="onoffswitch-checkbox switch_feriadoRecorrente switch_feriadoRecorrente_'+i+'" id="changeItemConfig_'+data.type+'_'+i+'" tabindex="0" '+(v.recorrente  ? 'checked' : '')+'>'+
                                '                                                         <label class="onoffswitch-label" for="changeItemConfig_'+data.type+'_'+i+'"></label>'+
                                '                                                     </div>'+
                                '                                                  </td>'+
                                '                                                  <td class="editCellMonth" data-key="feriado_data" data-type="text" style="width: 150px; text-align: left;">'+v.feriado_data+'</td>'+ 
                                '                                                  <td style="width: 50px; text-align: center;">'+
                                '                                                       <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                                '                                                  </td>'+ 
                                '                                              </tr>';
                });
            }
            htmlBox +=  '                                              <tr data-index="'+feriados_len+'" data-key="feriados">'+
                        '                                                  <td class="editCell" data-key="nome_feriado" data-type="text" style="width: 250px; padding: 0 10px; text-align: left;"></td>'+
                        '                                                  <td data-key="recorrente" data-type="switch" style="width: 100px; text-align: center;">'+
                        '                                                     <div class="onoffswitch" style="transform: scale(0.8);">'+
                        '                                                         <input type="checkbox" onchange="changeConfigFeriadoRecorrente(this)" name="onoffswitch" class="onoffswitch-checkbox switch_feriadoRecorrente switch_feriadoRecorrente_'+feriados_len+'" id="changeItemConfig_'+data.type+'_'+feriados_len+'" tabindex="0" checked>'+
                        '                                                         <label class="onoffswitch-label" for="changeItemConfig_'+data.type+'_'+feriados_len+'"></label>'+
                        '                                                     </div>'+
                        '                                                  </td>'+
                        '                                                  <td class="editCellMonth" data-key="feriado_data" data-type="text" style="width: 150px; text-align: left;"></td>'+
                        '                                                  <td style="width: 50px; text-align: center;">'+
                        '                                                       <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                        '                                                  </td>'+ 
                        '                                              </tr>'+
                        '                                          </tbody>'+
                        '                                          <tfoot>'+
                        '                                             <tr>'+
                        '                                                 <th colspan="3" style="text-align: right;">'+
                        '                                                     <a class="newLink addConfigItem" onclick="addConfigItem(this)" style="cursor: pointer; margin: 5px;display: inline-block;">'+
                        '                                                         <i class="fas fa-plus-circle cinzaColor" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                        '                                                         Adicionar novo item'+
                        '                                                     </a>'+
                        '                                                 </th>'+
                        '                                             </tr>'+
                        '                                          </tfoot>'+
                        '                                      </table>'+
                        '                                   </td>'+
                        '                               </tr>'+
                        '                           </table>'+
                        '                      </td>'+
                        '                  </tr>'+
                        '               </table>'+
                        '               <table style="font-size: 10pt;width: 100%; margin: 10px 0;" class="seiProForm">'+
                        '                  <tr style="height: 40px;">'+
                        '                      <td style="text-align: left;"><i class="iconPopup fas fa-tasks cinzaColor"></i> Utilizar o cadastro simplificado de demandas como padr\u00E3o</td>'+
                        '                      <td>'+
                        '                          <div class="onoffswitch" style="float: right;">'+
                        '                              <input type="checkbox" name="onoffswitch" data-key="cadastro_simplificado" class="onoffswitch-checkbox singleOptionConfig" id="cadastro_simplificado" tabindex="0" '+(config && typeof config.cadastro_simplificado !== 'undefined' && config.cadastro_simplificado  ? 'checked' : '')+'>'+
                        '                              <label class="onoffswitch-label" for="cadastro_simplificado"></label>'+
                        '                          </div>'+
                        '                      </td>'+
                        '                  </tr>'+
                        '               </table>'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr>'+
                        '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                        '               <label><i class="iconPopup iconSwitch fas fa-clipboard-list cinzaColor"></i>'+__.Atividades+'</label>'+
                        '           </td>'+
                        '           <td>'+
                        '               <table style="font-size: 10pt;width: 100%; margin: 10px 0;" class="seiProForm">'+
                        '                  <tr style="height: 40px;">'+
                        '                      <td style="text-align: left;"><i class="iconPopup fas fa-history cinzaColor"></i> Gravar o hist\u00F3rico '+__.demandas_programadas+' no hist\u00F3rico do processo (somente '+__.demandas+' processuais)</td>'+
                        '                      <td>'+
                        '                          <div class="onoffswitch" style="float: right;">'+
                        '                              <input type="checkbox" name="onoffswitch" data-key="gravar_historico_processo" class="onoffswitch-checkbox singleOptionConfig" id="gravar_historico_processo" tabindex="0" '+(config && typeof config.gravar_historico_processo !== 'undefined' && config.gravar_historico_processo  ? 'checked' : '')+'>'+
                        '                              <label class="onoffswitch-label" for="gravar_historico_processo"></label>'+
                        '                          </div>'+
                        '                      </td>'+
                        '                  </tr>'+
                        '               </table>'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr>'+
                        '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                        '               <label><i class="iconPopup iconSwitch fas fa-file-signature cinzaColor"></i>Modelos</label>'+
                        '           </td>'+
                        '           <td>'+
                        '               <table style="font-size: 8pt;width: 100%; margin: 10px 0;" class="seiProForm">'+
                        '                  <tr style="height: 40px;">'+
                        '                      <td>'+
                        '                           <a class="newLink editModelDoc" data-type="'+data.type+'" data-id_reference="'+value.id_entidade+'" data-action="edit" data-mode="modelo_termo_adesao" data-icon="pencil-alt" data-title="Editar Modelo: Termo de Ades\u00E3o" onclick="editModelConfigItem(this)" style="cursor: pointer; margin: 5px;display: inline-block;">'+
                        '                               <i class="fas fa-pencil-alt cinzaColor" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                        '                               Termo de Ades\u00E3o'+
                        '                           </a>'+
                        '                           <a class="newLink viewModelDoc" data-type="'+data.type+'" data-sign="false" data-user="false" data-id_reference="'+value.id_entidade+'" data-action="view" data-mode="modelo_termo_adesao" data-icon="eye" data-title="Visualizar Modelo: Termo de Ades\u00E3o" onclick="editModelConfigItem(this)" style="cursor: pointer; margin: 5px;display: inline-block;">'+
                        '                               <i class="fas fa-eye cinzaColor" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                        '                           </a>'+
                        '                      </td>'+
                        '                  </tr>'+
                        '               </table>'+
                        '           </td>'+
                        '      </tr>'+
                        '   </table>'+
                        '</div>';
    }
    if (htmlBox != '') {
        resetDialogBoxPro('dialogBoxPro');
        dialogBoxPro = $('#dialogBoxPro')
            .html('<div class="dialogBoxDiv">'+htmlBox+'</div>')
            .dialog({
                title: titleBox,
                width: 780,
                open: function() { 
                    updateButtonConfirm(this, true);
                    if ($('#'+idConfigBox+'_tabs').length > 0) {
                        $('#'+idConfigBox+'_tabs').tabs();
                    }
                    setTimeout(function(){ 
                        centralizeDialogBox(dialogBoxPro);
                    }, 100);
                    if (data.type == 'planos') {
                        loadConfigAtivIntegral('#configBox_lista_atividades',id);
                    }
                    if ($('.tabelaConfigPanel_'+data.type+'_scroll').length > 0) {
                        $('.tabelaConfigPanel_'+data.type+'_scroll').each(function(){
                            console.log(data.type, $(this).find('table tbody tr').length);
                            var _this = $(this);
                            if (_this.find('table tbody tr').length > 6) {
                                var idElem = _this.attr('id');
                                _this.addClass('tabelaPanelScroll').css('height', '300px;');
                                initPanelResize('#'+idElem, idElem);
                                console.log(idElem, 'OKOK');
                            }
                        })
                    }
                    initClassicEditor();
                },
                close: function() { 
                    if (_this.closest('tr').hasClass('infraTrMarcada')) {
                        $('#tableConfiguracoesPanel_'+data.type).find('.lnkInfraCheck').data('index',1).trigger('click');
                    }
                    $('#'+idConfigBox).remove();
                    resetDialogBoxPro('dialogBoxPro');
                },
                buttons: [{
                    text: 'Salvar',
                    class: 'confirm',
                    click: function(event) { 
                        saveOptionConfigItem(this, data.type, id);
                    }
                }]
        });
        setTimeout(function(){ 
            configBox = new SimpleTableCellEditor(idConfigBox);
            configBox.SetEditableClass("editCell");
            configBox.SetEditableClass("editCellSEI", { 
                validation: $.isNumeric,
                internals: {
                    renderEditor: (elem, oldVal) => {
                        $(elem).html('<input type="number" onchange="checkOptionConfigSEI(this)" style="max-width: 80%;" value="'+oldVal+'">').find('input').focus();
                    }
                }
            });
            configBox.SetEditableClass("editCellNum", { 
                validation: $.isNumeric,
                internals: {
                    renderEditor: (elem, oldVal) => {
                        $(elem).html('<input type="number" min="0.1" step=".1" style="max-width:none" value="'+oldVal+'">').find('input').focus();
                    }
                }
            });
            configBox.SetEditableClass("editCellDate", {
                internals: {
                    renderEditor: (elem, oldVal) => {
                        console.log('oldVal',oldVal);
                        var oldVal_ = (oldVal == '') ? moment().format('YYYY-MM-DD') : moment(oldVal,'DD/MM/YYYY').format('YYYY-MM-DD');
                        $(elem).html('<input type="date" style="max-width:none" value="'+oldVal_+'">').find('input').focus();
                    },
                    renderValue: (elem, formattedNewVal) => { 
                        $(elem).text(formattedNewVal); 
                    },
                    extractEditorValue: (elem) => { 
                        return moment($(elem).find('input').val(),'YYYY-MM-DD').format('DD/MM/YYYY');
                    },
                }
            });
            configBox.SetEditableClass("editCellMonth", {
                internals: {
                    renderEditor: (elem, oldVal) => {
                        console.log('oldVal',oldVal);
                        var oldVal_ = (oldVal == '') ? moment().format('YYYY-MM-DD') : moment(oldVal,'DD/MM').format('YYYY-MM-DD');
                        $(elem).html('<input type="date" style="max-width:none" value="'+oldVal_+'">').find('input').focus();
                    },
                    renderValue: (elem, formattedNewVal) => { 
                        $(elem).text(formattedNewVal); 
                    },
                    extractEditorValue: (elem) => { 
                        return moment($(elem).find('input').val(),'YYYY-MM-DD').format('DD/MM');
                    },
                }
            });
            configBox.SetEditableClass("editCellNumComplex", { 
                validation: $.isNumeric,
                internals: {
                    renderEditor: (elem, oldVal) => {
                        $(elem).html('<input type="number" min="0.1" step=".1" oninput="checkOptionConfigComplex(this)" onblur="checkOptionConfigComplex(this)" style="max-width:none" value="'+oldVal+'">').find('input').focus();
                    }
                }
            });
            configBox.SetEditableClass("editCellSelect", {  
                internals: {
                    renderEditor: (elem, oldVal) => {
                        var _this = $(elem);
                        var data_elem = _this.data();
                        var data_tr = _this.closest('tr').data();
                        var arrayList = (data_tr.key == 'documentos') ? arrayListTypesSEI.selSeriePesquisa : [];
                            arrayList = (data_tr.key == 'tipo_processo') ? arrayListTypesSEI.selectTipoProc : arrayList;
                            // arrayList = (data_tr.key == 'lotacao') ? jmespath.search(arrayConfigAtividades.unidades_all,"[*].{name: join('',[nome_unidade,' (',sigla_unidade,')']), value: id_unidade}") : arrayList;
                            arrayList = (data_tr.key == 'perfil') ? jmespath.search(arrayConfigAtividades.perfis,"[*].{name: nome_perfil, nivel: nivel, value: id_perfil}") : arrayList;
                            arrayList = (data_tr.key == 'modalidades') ? jmespath.search(arrayConfigAtividades.tipos_modalidades,"[*].{name: nome_modalidade, value: id_tipo_modalidade}") : arrayList;
                        if (arrayList.length > 0) {
                            var selectArray = (data_tr.key == 'perfil') 
                                            ? jmespath.search(arrayList,"[*].{label: name, value: value, nivel: nivel}")
                                            : jmespath.search(arrayList,"[*].{label: name, value: value}");
                                selectArray = selectArray.filter((v,i,a)=>a.findIndex(t=>(t.value === v.value))===i);
                            var htmlOptions = $.map(selectArray, function(v){
                                                    var selected = (v.label == _this.text().trim()) ? 'selected' : '';
                                                    var disable = (data_tr.key == 'perfil' && arrayConfigAtividades.perfil.nivel > v.nivel) ? 'disabled' : '';
                                                        return '<option value="'+v.value+'" '+selected+' '+disable+'>'+v.label+'</option>';
                                                }).join('');
                        } else if (data_tr.key == 'lotacao') {
                            var htmlOptions = getOptionSelectPerfil(arrayConfigAtividades.unidades_all, _this.text().trim(), false);
                        }
                            _this.html(`<select data-type="`+data.type+`" onchange="changeSelectConfigItem(this)" onblur="changeSelectConfigItem(this)"><option value=""></option>`+htmlOptions+'</select>').find('select').focus();
                    },
                    renderValue: (elem, formattedNewVal) => { 
                            $(elem).text(formattedNewVal); 
                    },
                    extractEditorValue: (elem) => { 
                        return $(elem).find('select').find('option:selected').text().trim(); 
                    },
                }
            });
            
            $(".tableOptionConfig.tableSortable tbody").sortable({
                items: 'tr',
                cursor: 'grabbing',
                handle: '.sorterTrConfig',
                forceHelperSize: true,
                opacity: 0.5,
                axis: 'y',
                dropOnEmpty: false,
                update: function(event, ui) {
                    $(this).find('tr').each(function(index, value){
                        $(this).attr('data-index',index).data('index',index);
                    })
                }
            });

            if (typeof complexidade_len !== 'undefined' && complexidade_len == 0) {
                $('#configBox_complexidade').find('tbody tr:last-child').find('td:first-child').trigger('click');
            }
            if (typeof tipo_processo_len !== 'undefined' && tipo_processo_len == 0) {
                $('#configBox_tipo_processo').find('tbody tr:last-child').find('td:first-child').trigger('click');
            }
            if (typeof documentos_len !== 'undefined' && documentos_len == 0) {
                $('#configBox_documentos').find('tbody tr:last-child').find('td:first-child').trigger('click');
            }
            
        }, 500);

    } else {
        alertaBoxPro('Error', 'exclamation-triangle', 'Em desenvolvimento!');
    }
}
function editModelConfigItem(this_) {
    var _this = $(this_);
    var data = _this.data();
    var _parent = _this.closest('.ui-dialog');
        _this.append('<i class="fas fa-spinner fa-spin cinzaColor loadingDocModel"></i>');

    var action = 'view_documento';
    var param = {
        action: action,
        mode: data.mode,
        return_action: data.action,
        return_sign: data.sign,
        return_user: data.user,
        id_reference: data.id_reference,
        reference: 'modelo',
        title: data.title,
        type: data.type,
    };
    getConfigServer(action, param);
}
function openModelConfigItem(data, paramData) {
    var _this = $('a.'+paramData.return_action+'ModelDoc[data-mode="'+paramData.mode+'"]');
        _this.find('i.loadingDocModel').remove();
    
    var param = {
        id_documento: data.id_documento,
        title_page: paramData.title,
        title: paramData.title,
        mode: paramData.mode,
        reference: paramData.reference,
        id_reference: paramData.id_reference,
        type: paramData.type,
        text: data.text
    };
    if (paramData.return_action == 'edit') {
        openEditorDoc(param, paramData);
    } else if (paramData.return_action == 'view') {
        openEditorViewDoc(param, paramData, data);
    }
    // console.log(data, param, paramData);
}
function setParamEditorAtiv(mode, text, id_user = false) {
    if (mode == 'modelo_termo_adesao') {
        var user = (id_user) ? jmespath.search(arrayConfigAtividades.usuarios, "[?id_user==`"+id_user+"`] | [0]") : arrayConfigAtividades.perfil;
            user = (user == null) ? arrayConfigAtividades.perfil : user;
            
        var plano = jmespath.search(arrayConfigAtividades.planos, "[?id_user==`"+user.id_user+"`] | [0]");
        var unidade = (plano !== null) ? jmespath.search(arrayConfigAtividades.unidades, "[?id_unidade==`"+plano.id_unidade+"`] | [0]") : arrayConfigAtivUnidade.id_unidade;
        var vigencia_plano = (plano !== null) ? moment(plano.data_inicio_vigencia, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')+' \u00E0 '+moment(plano.data_fim_vigencia, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY') : '';
        var entidade = jmespath.search(arrayConfigAtividades.entidades, "[?id_entidade==`"+plano.id_entidade+"`] | [0]");
        var data_comparecimento = (unidade.config.hasOwnProperty('planos')) ? unidade.config.planos.data_comparecimento : 'Dia';
        var prazo_comparecimento = (unidade.config.hasOwnProperty('planos')) ? parseInt(unidade.config.planos.prazo_comparecimento) : 1;
            prazo_comparecimento = (prazo_comparecimento > 1) ? prazo_comparecimento+' '+data_comparecimento+'s' : prazo_comparecimento+' '+data_comparecimento;

        var rowListaAtividades = '';
        $.each(arrayConfigAtividades.atividades,function(index, value){
            var config_unidade = getConfigDadosUnidade(value.sigla_unidade);
            var complexidade = ((typeof value.config !== 'undefined' && value.config !== null && value.config.hasOwnProperty('complexidade') && value.config.complexidade.length > 0) ? jmespath.search(value.config.complexidade, "[?default==`true`].complexidade | [0]") : '');
            var parametros = ((typeof value.config !== 'undefined' && value.config !== null && value.config.hasOwnProperty('parametros') && value.config.parametros.length > 0) ? $.map(value.config.parametros,function(v){ return v[0] }).join('; ') : '');
            var entregas = ((typeof value.config !== 'undefined' && value.config !== null && value.config.hasOwnProperty('entregas') && value.config.entregas.length > 0) ? $.map(value.config.entregas,function(v){ return v[0] }).join('; ') : '');
            var arrayModalidades = (typeof value.config !== 'undefined' && value.config !== null && value.config.hasOwnProperty('modalidades') && value.config.modalidades && value.config.modalidades.length > 0) ? value.config.modalidades : config_unidade.modalidades;
            var ganho_tele = jmespath.search(arrayModalidades,"[?tipo_modalidade=='Teletrabalho'] | [0].fator");
                ganho_tele = (ganho_tele !== null) ? ganho_tele : 1;
            var ganho_presencial = jmespath.search(arrayModalidades,"[?tipo_modalidade=='Presencial'] | [0].fator");
                ganho_presencial = (ganho_presencial !== null) ? ganho_presencial : 1;
            var listUnidades = jmespath.search(arrayConfigAtividades.atividades,"[*].sigla_unidade");
                listUnidades = (listUnidades !== null) ? uniqPro(listUnidades) : [];
            var sigla_unidade = (listUnidades.length == 1 && listUnidades[0] == arrayConfigAtivUnidade.sigla_unidade) ? '' : value.sigla_unidade+': ';

            var check_lista_integral =    (plano && plano !== null  && plano.config !== null && 
                                            plano.config.hasOwnProperty('atividades_lista_integral') && plano.config.atividades_lista_integral !== null && plano.config.atividades_lista_integral
                                            ) ? plano.config.atividades_lista_integral: false;

            var check_lista_atividades =    (plano && plano !== null  && plano.config !== null && 
                                            check_lista_integral == false &&
                                            plano.config.hasOwnProperty('lista_atividades') && plano.config.lista_atividades !== null && plano.config.lista_atividades.length > 0 &&
                                            $.inArray(value.id_atividade.toString(), plano.config.lista_atividades) !== -1 
                                            ) ? true: false;
                                            
            if (check_lista_atividades || check_lista_integral) {
                rowListaAtividades +=   '           <tr>'+
                                        '                <td>'+sigla_unidade+value.nome_atividade+'</td>'+
                                        '                <td>'+complexidade+'</td>'+
                                        '                <td>'+parametros+'</td>'+
                                        '                <td>'+(value.tempo_pactuado*ganho_presencial).toFixed(2)+'</td>'+
                                        '                <td>'+(value.tempo_pactuado*ganho_tele).toFixed(2)+'</td>'+
                                        '                <td>'+((1-ganho_tele)*100).toFixed(2)+'%'+'</td>'+
                                        '                <td>'+entregas+'</td>'+
                                        '           </tr>';
            }
        });
        
        var tableListaAtividades =  '<figure class="table" style="width:95%;">'+
                                    '    <table>'+
                                    '        <thead>'+
                                    '            <tr>'+
                                    '                <th style="background-color: #f5f5f5;">Descri\u00E7\u00E3o d'+__.a_atividade+'</th>'+
                                    '                <th style="background-color: #f5f5f5;">Faixa de Complexidade d'+__.a_Atividade+'</th>'+
                                    '                <th style="background-color: #f5f5f5;">Par\u00E2metros adotados para defini\u00E7\u00E3o da faixa de complexidade</th>'+
                                    '                <th style="background-color: #f5f5f5;">Tempo de execu\u00E7\u00E3o d'+__.a_atividade+' em regime presencial</th>'+
                                    '                <th style="background-color: #f5f5f5;">Tempo de execu\u00E7\u00E3o d'+__.a_atividade+' em teletrabalho</th>'+
                                    '                <th style="background-color: #f5f5f5;">Ganho percentual de produtividade estabelecido, quando aplic\u00E1vel</th>'+
                                    '                <th style="background-color: #f5f5f5;">Entregas esperadas</th>'+
                                    '            </tr>'+
                                    '        </thead>'+
                                    '        <tbody>'+
                                    '               '+rowListaAtividades+
                                    '        </tbody>'+
                                    '    </table>'+
                                    '</figure>';
        // console.log({id_user: id_user, user: user, plano: plano, unidade: unidade, vigencia: vigencia_plano});

        var style_field = 'font-weight: bold;padding: 5px 8px;margin: 5px 0px;display: inline-block;background: #f5f5f5;border-radius: 5px;';
        var textResult = text;
            textResult = textResult.replace(/{nome_completo}/gi,'<span style="'+style_field+'">'+plano.nome_completo+'</span>');
            textResult = textResult.replace(/{matricula}/gi,'<span style="'+style_field+'">'+user.matricula+'</span>');
            textResult = textResult.replace(/{vigencia_plano}/gi,'<span style="'+style_field+'">'+vigencia_plano+'</span>');
            textResult = textResult.replace(/{nome_unidade}/gi,'<span style="'+style_field+'">'+unidade.nome_unidade+'</span>');
            textResult = textResult.replace(/{modalidade_plano}/gi,'<span style="'+style_field+'">'+plano.nome_modalidade+'</span>');
            textResult = textResult.replace(/{carga_horaria}/gi,'<span style="'+style_field+'">'+plano.carga_horaria+'</span>');
            textResult = textResult.replace(/{tempo_pactuado_total}/gi,'<span style="'+style_field+'">'+plano.tempo_total+'</span>');
            textResult = textResult.replace(/{nome_entidade}/gi,'<span style="'+style_field+'">'+entidade.nome_entidade+'</span>');
            textResult = textResult.replace(/{sigla_entidade}/gi,'<span style="'+style_field+'">'+entidade.sigla_entidade+'</span>');
            textResult = textResult.replace(/{prazo_comparecimento}/gi,'<span style="'+style_field+'">'+prazo_comparecimento+'</span>');
            textResult = textResult.replace(/{lista_atividades}/gi,tableListaAtividades);
        if (textResult.indexOf('{only_semipresencial}') !== -1) {
            var textFind = $('<div>'+textResult+'</div>');
                textFind.find('tr').each(function(){
                    var checkFind = ($(this).text().trim().indexOf('{only_semipresencial}') !== -1) ? true : false;
                    if (checkFind && plano.nome_modalidade != 'Semipresencial') {
                        $(this).remove();
                    }
                });
            textResult = textFind[0].outerHTML;
        }
        textResult = textResult.replace(/{only_semipresencial}/gi,'');
        return textResult;
    }
}
function extractDataDocument(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.ui-dialog');
    var arrayAtiv = {};
    _parent.find('input,textarea,select').each(function(){
        if (typeof $(this).data('key') !== 'undefined') { 
            var value = $(this).val();
            var date_format = (value && value.indexOf('T') !== -1) ? 'YYYY-MM-DDTHH:mm' : 'YYYY-MM-DD';
            var dataValue = ($(this).attr('type') == 'number' || (value != '' && $(this).data('key').indexOf('id_') !== -1)) ? parseInt(value) : value;
            var dataValue = ($(this).attr('type') == 'number' && parseFloat($('#ativ_tempo_despendido').attr('step')) >= 1) ? parseFloat(value) : value;
                dataValue = ($(this).attr('type') == 'date') ? (value == '' ? '' : (moment(value, date_format).format('YYYY-MM-DD')+' 00:00:00')) : dataValue;
                dataValue = ($(this).attr('type') == 'datetime-local') ? (value == '' ? '' : moment(value, date_format).format('YYYY-MM-DD HH:mm:ss')) : dataValue;
                dataValue = ($(this).attr('type') == 'checkbox') ? ($(this).is(':checked') ? 'on' : 'off') : dataValue;
                dataValue = ($(this).is('textarea') || ($(this).is('input') && $(this).attr('type') == 'text') ) ? (dataValue.replace(/["']/g, "")) : dataValue;
            arrayAtiv[$(this).data('key')] = dataValue;
        }
    });
    _parent.find('.todo-list').each(function(index, value){
        arrayAtiv['list-'+index] = [];
        $(this).find('.todo-list__label input[type="checkbox"]').each(function(i, v){
            if ($(this).attr('checked') == 'checked') {
                arrayAtiv['list-'+index].push($(this).closest('label').text().trim());
            }
        });
    });
    return arrayAtiv;
}
function changeConfigAtivIntegral(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.ui-dialog');
    var idTableAtividades = '#configBox_lista_atividades';
    var trAtividades = _parent.find(idTableAtividades+'_tr');
    var tableAtividades = _parent.find(idTableAtividades);
    if (_this.is(':checked')) {
        trAtividades.hide();
        tableAtividades.find('tbody').html('');
    } else {
        trAtividades.show();
        loadConfigAtivIntegral(idTableAtividades);
    }
}
function loadConfigAtivIntegral(idTableAtividades, id_plano = false) {
    var trAtividades = $(idTableAtividades+'_tr');
    // console.log(trAtividades.is(':visible'));
    if (trAtividades.is(':visible')) {
        var tableAtividades = $(idTableAtividades);
        var listUnidades = jmespath.search(arrayConfigAtividades.atividades,"[*].sigla_unidade");
            listUnidades = (listUnidades !== null) ? uniqPro(listUnidades) : [];
        
        var plano = (id_plano) ? jmespath.search(arrayConfigAtividades.planos,"[?id_plano==`"+id_plano+"`] | [0]") : false; 
        var modalidade = (plano && plano !== null) ? jmespath.search(arrayConfigAtividades.tipos_modalidades,"[?id_tipo_modalidade==`"+plano.id_tipo_modalidade+"`] | [0]") : null;
        var atividades_homologadas = (modalidade && modalidade !== null && modalidade.hasOwnProperty('config') && modalidade.config !== null && modalidade.config.hasOwnProperty('atividades_homologadas') && modalidade.config.atividades_homologadas !== null && modalidade.config.atividades_homologadas == true ) ? true : false;
        var atividades = (atividades_homologadas) ? jmespath.search(arrayConfigAtividades.atividades,"[?homologado==`true`]") : arrayConfigAtividades.atividades;
        if (atividades !== null) {
            var htmlAtividades = $.map(atividades, function(value,index){
                var sigla_unidade = (listUnidades.length == 1 && listUnidades[0] == arrayConfigAtivUnidade.sigla_unidade) ? '' : value.sigla_unidade+': ';
                var input_checked = (plano && typeof plano.config !== 'undefined' && plano.config !== null && 
                                    typeof plano.config.atividades_lista_integral !== 'undefined' && plano.config.atividades_lista_integral == false && 
                                    typeof plano.config.lista_atividades !== 'undefined' && plano.config.lista_atividades !== null && plano.config.lista_atividades.length > 0 &&
                                    $.inArray(value.id_atividade.toString(), plano.config.lista_atividades) !== -1 
                                    ) ? 'checked' : false;
                var tr_checked = (input_checked) ? 'infraTrMarcada' : '';
                return  '<tr class="'+tr_checked+'">'+
                        '   <td data-key="id_atividade" data-type="switch">'+
                        '       <input type="checkbox" class="checkboxSelectConfiguracoes" onclick="followSelecionarItens(this)" id="configuracoesPro_'+value.id_atividade+'" name="configuracoesPro" value="'+value.id_atividade+'" '+input_checked+'>'+
                        '   </td>'+
                        '   </td>'+
                        '   <td style="text-align: left;">'+sigla_unidade+value.nome_atividade+'</td>'+
                        '   <td>'+value.tempo_pactuado+'</td>'+
                        '</tr>';
            }).join('');

            tableAtividades.find('tbody').html(htmlAtividades);
            tableAtividades.tablesorter({
                headers: {
                    0: { sorter: false, filter: false },
                    1: { filter: true },
                    2: { filter: true }
                }
            }).on("sortEnd", function (event, data) {
                checkboxRangerSelectShift(idTableAtividades);
            });
            checkboxRangerSelectShift(idTableAtividades);
        }
    }
}
function changeConfigGanhoUnidade(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.ui-dialog');
    var tableModalidades = _parent.find('#configBox_modalidades_atividade');
    if (_this.is(':checked')) {
        tableModalidades.find('.addConfigItem').trigger('click');
        tableModalidades.find('tbody tr:not(:last-child)').remove();
        tableModalidades.hide();
    } else {
        tableModalidades.show();
    }
}
function changeConfigListaUnidade(this_) {
    var _this = $(this_);
    var _parent = _this.closest('tr');
    if (_this.is(':checked')) {
        _parent.find('#div_lista_unidade').css('display', 'inline-block');
    } else {
        _parent.find('#select_lista_unidade').val('');
        _parent.find('#div_lista_unidade').hide();
    }
}
function htmlOptionsAddTextarea(target, text) {
    return '<a class="newLink newLink_active" data-target="'+target+'" data-value="'+text+'" onmouseout="return infraTooltipOcultar();" onmouseover="return infraTooltipMostrar(\'Clique para adicionar\')" onclick="optionAddTextToTextarea(this)" style="font-size: 8pt;cursor: pointer;margin: 3px;">'+text+'</a>';
}
function optionAddTextToTextarea(this_) {
    var _this = $(this_);
    var target = $('#'+_this.data('target'));
    var text = _this.data('value');
    addTextToTextarea(_this, target, text);
}
function removeConfigRowByID(this_) {
    var _this = $(this_);
    var _parent = _this.closest('tr');
    var _table = _this.closest('table');
    confirmaBoxPro('Tem certeza que deseja excluir este item?', function(){
        if (_table.find('tbody tr').length == 1) {
            _table.find('.addConfigItem').trigger('click');
        }
        _parent.find('td:visible').effect('highlight').delay(2).effect('highlight').delay(2).effect('highlight');
        _parent.delay(8).hide('fast', function() {
            $(this).attr('data-value','remove').hide().find('td').eq(0).text('');
        });
    }, 'Excluir');
}
function removeConfigRow(this_) {
    var _this = $(this_);
    var _parent = _this.closest('tr');
    var _table = _this.closest('table');
    confirmaBoxPro('Tem certeza que deseja excluir este item?', function(){
        if (_table.find('tbody tr').length == 1) {
            _table.find('.addConfigItem').trigger('click');
        }
        _parent.find('td:visible').effect('highlight').delay(2).effect('highlight').delay(2).effect('highlight');
        _parent.delay(8).hide('fast', function() {
            $(this).remove();
            if ($('#ativ_checklist').length > 0) {
                changeAtivChecklistInput($('#trAtivChecklist .addConfigItem')[0]);
            }
        });
    }, 'Excluir');
}
function changeConfigFeriadoRecorrente(this_) {
    var _this = $(this_);
    var _parent = _this.closest('tr');
    var feriado_data = _parent.find('td[data-key="feriado_data"]');
    if (_this.is(':checked')) {
        feriado_data.attr('class','editCellMonth');
    } else {
        feriado_data.attr('class','editCellDate');
    }
    if (!feriado_data.hasClass('inEdit')) {
        var text_format = (_this.is(':checked')) 
            ? moment(feriado_data.text(),'DD/MM/YYYY').format('DD/MM')
            : moment(feriado_data.text(),'DD/MM').format('DD/MM/YYYY');
            text_format = (feriado_data.text().trim() != '') ? text_format : '';

            feriado_data.text(text_format);
            console.log('text_format',feriado_data, text_format);
    }
}
function configUpdateKey(this_, mode) {
    if (mode == 'disable_key') {
        confirmaFraseBoxPro('Tem certeza que deseja revogar a chave de acesso?', 'REVOGAR', 
            function(){
                configServerKey(this_, mode);
            }
        );
    } else if (mode == 'new_key') {
        if ($(this_).closest('table').find('.keyVigente').is(':visible')) {
            confirmaFraseBoxPro('Criar uma nova chave ir\u00E1 revogar as anteriores. Tem certeza que deseja prosseguir?', 'CRIAR', 
                function(){
                    configServerKey(this_, mode);
                }
            );
        } else {
            configServerKey(this_, mode);
        }
    } else if (mode == 'resend_key') {
        configServerKey(this_, mode);
    }
}
function changeConfigItemCell(this_) {
    var _this = $(this_);
    var tr = _this.closest('tr');
    var table = _this.closest('table');
    setTimeout(function(){ 
        /*table.find('tr').each(function(){
            var td = $(this).find('td').eq(0);
            if (td.text().trim() == '') {
                td.addClass('editCellBlank');
            } else {
                td.removeClass('editCellBlank');
            }
        });*/
        if (tr.find('td').length == 2 && tr.data('index') == table.find('tbody tr').length-1 && _this.text().trim() != '') {
            addConfigItem(this_);
        }
    }, 100);
}
function checkOptionConfigComplex(this_) {
    var _this = $(this_);
    var value = _this.val();
        value = (value == '' || parseFloat(result) < 0.1) ? 0.1 : value;
    var tempo_pactuado = _this.closest('table').data('tempo-pactuado');
    var td = _this.closest('td');
    var data = td.data();
    var tr = _this.closest('tr');
    var target = (data.key == 'fator') ? tr.find('td[data-key="tempo_pactuado"]') : tr.find('td[data-key="fator"]');
    var result = (data.key == 'fator') ? (parseFloat(value) * parseFloat(tempo_pactuado)) : (parseFloat(value) / parseFloat(tempo_pactuado));
        result = (parseFloat(result) < 0.1) ? 0.1 : result;
        target.text(roundToTwo(result));
}
function configServerKey(this_, mode) {
    var _this = $(this_);
    var _parent = _this.closest('table');
    var data = _this.closest('tr').data();
    var data_table = _parent.data();
        _this.addClass('loading').find('i').attr('class','fas fa-spinner fa-spin');
    
    var action = 'config_update_keys';
    var param = {
        action: action,
        id_user: data_table.id,
        id: data.id,
        host: url_host.replace('controlador.php',''),
        mode: mode
    };
    // console.log(param);
    getConfigServer(action, param);
}
function checkDatesLoopArray(array, inicio, fim, id_user, id_target, labels, includes = false, search_target = false) {
    var format = 'YYYY-MM-DDTHH:mm';
    // var format = (inicio.indexOf('T') !== -1) ? 'YYYY-MM-DDTHH:mm' : 'YYYY-MM-DD';
    var _inicio = moment(inicio, format);
    var _fim = moment(fim, format);
    var checkBetween = false;
    var checkInicio = checkDatesBetweenArray(array, _inicio.format(format), id_user, id_target, labels, includes, search_target);
    var checkFim = checkDatesBetweenArray(array, _fim.format(format), id_user, id_target, labels, includes, search_target);
        while(_inicio.add(1, 'days').diff(_fim) < 0) {
            var check = checkDatesBetweenArray(array, _inicio.clone().format(format), id_user, id_target, labels, includes, search_target);
            if (check) {
                checkBetween = check;
            }
        }
        // console.log(array, inicio, format, checkInicio, checkBetween, checkFim, id_user, id_target, labels, includes);
    return (checkInicio || checkBetween || checkFim) ? (checkInicio || checkBetween || checkFim) : false;
}
function checkDatesBetweenArray(array, date_target, id_user, id_target, labels, includes = false, search_target = false) {
    var format = (date_target.indexOf('T') !== -1) ? 'YYYY-MM-DDTHH:mm' : 'YYYY-MM-DD';
    // var mode_between = (date_target.indexOf('T') !== -1) ? 'minutes' : 'days';
    var userDates = (search_target) 
                ? array
                : jmespath.search(array,"[?"+labels.id+"==`"+id_user+"`]");
    var checkDates = [];
    var target = moment(date_target,format);
        includes = (includes) ? '[]' : '()';
    // console.log({search_target: search_target, format: format, userDates: userDates, date_target: date_target, id_user: id_user, id_target: id_target});
    $.each(userDates,function(index, value){
        var start = moment(value[labels.inicio], 'YYYY-MM-DD HH:mm:ss');
        var finish = moment(value[labels.fim], 'YYYY-MM-DD HH:mm:ss');
        var check = target.isBetween(start, finish, 'days', includes);
        var check_array = (search_target) 
                ? (id_target != value[labels.idreftype]) ? true : false
                : (id_target != value[labels.id]) ? true : false;
        if (check && check_array) {
            // console.log('*',check, start.format(format), finish.format(format), id_target, date_target, value[labels.id]);
            checkDates.push(value[labels.idreftype]);
            //return false;
        }
    });
    return checkDates;
}
function checkOptionConfigSEI(this_) {
    var _this = $(this_);
    var protocoloSEI = _this.val();
    if (protocoloSEI != '') { 
        var td = _this.closest('td');
        var tr = _this.closest('tr');
        var table = _this.closest('table');
            td.addClass('editCellLoading');
            getIDProtocoloSEI(protocoloSEI,  
                function(html){
                    let $html = $(html);
                    var params = getParamsUrlPro($html.find('#ifrArvore').attr('src'));
                    var documento_text = tr.find('td[data-key="documento"]').text();
                    var nr_sei_text = protocoloSEI;
                    var previewDoc =    '<a class="newLink" style="cursor: pointer;" onclick="openDialogDoc({title: \''+unicodeToChar(documento_text)+' ('+nr_sei_text+')\', id_procedimento: \''+params.id_procedimento+'\', id_documento: \''+params.id_documento+'\'})" onmouseover="return infraTooltipMostrar(\'Visualiza\u00E7\u00E3o r\u00E1pida\');" onmouseout="return infraTooltipOcultar();">'+
                                        '   <i class="fas fa-eye" style="font-size: 80%;"></i>'+
                                        '</a>';
                        td.addClass('editCellConfirm').removeClass('editCellLoading').removeClass('editCellLoadingError');
                        tr.find('td[data-key="id_procedimento"]').text(params.id_procedimento);
                        tr.find('td[data-key="id_documento"]').text(params.id_documento);
                        tr.find('td[data-ref="previa"]').html(previewDoc);
                    
                    if (tr.data('index') == table.find('tbody tr').length-1) {
                        addConfigItem(this_);
                    }
                }, 
                function(){
                    setTimeout(function(){ 
                        td.addClass('editCellLoadingError').removeClass('editCellLoading').removeClass('editCellConfirm');
                        alertaBoxPro('Error', 'exclamation-triangle', 'N\u00FAmero SEI n\u00E3o encontrado!');
                    }, 500);
                });
    }
}
function extractOptionConfigItem(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.ui-dialog');
    var param = {};
    _parent.find('.singleOptionInput').each(function(ind){
        var _this_s = $(this);
        if (_this_s.attr('type') == 'text' && typeof _this_s.data('key') !== 'undefined' ) {
            var value = _this_s.val().trim();
                value = (_this_s.data('convert') == 'lowercase') ? value.toLowerCase() : value;
                value = (_this_s.data('convert') == 'uppercase') ? value.toUpperCase() : value;
            param[_this_s.data('key')] = _this_s.val().trim();
        } else if (_this_s.attr('type') == 'number' && typeof _this_s.data('key') !== 'undefined' ) {
            var value = _this_s.val().trim();
            param[_this_s.data('key')] = parseFloat(value);
        }
    });
    _parent.find('.singleOptionConfig').each(function(ind){
        var _this_s = $(this);
        if (_this_s.attr('type') == 'checkbox' && typeof _this_s.data('key') !== 'undefined' ) {
            param[_this_s.data('key')] = _this_s.is(':checked');
        } else if (_this_s.attr('type') == 'number' && typeof _this_s.data('key') !== 'undefined' ) {
            param[_this_s.data('key')] = parseFloat(_this_s.val());
        }
    });
    _parent.find('.hiddenOptionConfig').each(function(ind){
        var _this_s = $(this);
        if (_this_s.attr('type') == 'hidden' && typeof _this_s.data('key') !== 'undefined' ) {
            var value = (_this_s.data('type') == 'json') ? JSON.parse(_this_s.val()) : _this_s.val().toString();
            param[_this_s.data('key')] = value;
        }
    });

    var _table_checkboxConfig = _parent.find('.tableCheckboxConfig');
    if (_table_checkboxConfig.length > 0) {
        var arrayCheckboxConfig = _table_checkboxConfig.find('tbody tr').map(function(v, i){
            var checkbox = $(this).find('td').eq(0).find('input[type="checkbox"]');
            if (checkbox.is(':checked')) {
                return checkbox.val();
            }
        }).get();
        param[_table_checkboxConfig.data('key')] = arrayCheckboxConfig;
    }

    _parent.find('.tableOptionConfig').each(function(ind){
        var data_table = $(this).data();
        var arra_table = [];
        var checkboxRequired = $(this).find('tbody tr td[data-required="true"] input[type="checkbox"]');
        if (checkboxRequired.length > 0 && !checkboxRequired.is(':checked')) {
            checkboxRequired.eq(0).prop('checked',true);
        }
        $(this).find('tbody tr').each(function(index){
            var data_tr = $(this).data();
            var obj_tr = {};
            var array_tr = [];
            if ($(this).find('td').eq(0).text() != '' || data_table.format == 'obj_mult') {
                $(this).find('td').each(function(i){
                    var data_td = $(this).data();
                    var value = (data_td.type == 'switch') 
                                ? $(this).find('input[type="checkbox"]').is(':checked') ? true : false
                                : encodeJSON_toHex($(this).text().trim());
                        value = (data_td.type == 'num' && data_table.format == 'obj_mult') 
                                ? {id: data_tr.id, value: data_tr.value}
                                : value;
                        value = (data_td.type == 'value' && data_table.format == 'obj_mult') 
                                ? {id: data_tr.id.toString(), value: data_tr.value.toString()}
                                : value;
                        value = (data_td.type == 'num') 
                                ? parseFloat($(this).text())
                                : value;
                        value = (data_td.type == 'value') 
                                ? $(this).text().trim()
                                : value;

                    if (data_table.format == 'obj' && typeof data_td.key !== 'undefined' && (value != '' || data_td.type == 'switch')) { 
                        value = (data_td.type == 'text') ? value.replace(/["']/g, "") : value;
                        value = (data_td.type == 'num') ? parseFloat(value) : value;
                        obj_tr[data_td.key] = value;
                    } else if (data_table.format == 'obj_mult' && typeof data_td.key !== 'undefined' && data_tr.value != '' && (data_td.type == 'value' || data_td.type == 'num') && (data_tr.id != 'new' || (data_tr.id == 'new' && data_tr.value != '' && data_tr.value != 'remove'))) { 
                        obj_tr = value;
                    } else if (data_table.format == 'array' && value != '') {
                        array_tr.push(value);
                    }
                });
                if (Object.keys(obj_tr).length > 0) { arra_table.push(obj_tr); }
                if (array_tr.length > 0) { arra_table.push(array_tr); }
            }
        });
        if (arra_table.length > 0) { param[data_table.key] = arra_table; }
    });
    return param;
}
function extractOptionConfigUnidade(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.ui-dialog');
    var _return = {
            modalidades: _parent.find('#configBox_modalidades tbody tr').map(function(){
                            var data = $(this).data();
                            var td = $(this).find('td');
                            var tipo_modalidade = encodeJSON_toHex(td.eq(0).text().trim());
                            if (tipo_modalidade !== '') {
                                return {tipo_modalidade: tipo_modalidade, id_tipo_modalidade: parseInt(td.eq(2).text().trim()), fator: td.eq(1).text().trim() };
                            }
                        }).get(),
            atividades: {
                lista_superior: _parent.find('#atividades_lista_superior').is(':checked').toString(),
                lista_unidade: (_parent.find('#atividades_lista_unidade').is(':checked') && _parent.find('#select_lista_unidade:visible').length > 0 && checkValue(_parent.find('#select_lista_unidade'))) ? _parent.find('#select_lista_unidade').val() : "false",
                envio_automatico: _parent.find('#atividades_envio_automatico').is(':checked').toString()
            },
            planos:{
                prazo_comparecimento: parseInt(_parent.find('#planos_prazo_comparecimento').val()),
                data_comparecimento: _parent.find('#planos_data_comparecimento').val()
            },
            distribuicao:{
                horario_util:{
                    inicio: _parent.find('#distribuicao_horario_util_inicio').val(),
                    fim: _parent.find('#distribuicao_horario_util_fim').val()
                },
                count_dias_uteis: _parent.find('#distribuicao_count_dias_uteis').is(':checked'),
                count_horas: _parent.find('#distribuicao_count_horas').is(':checked').toString(),
                notificacao:{
                    texto_criacao: encodeJSON_toHex(JSON.stringify(_parent.find('#notificacao_texto_criacao').val())).replaceAll('"',''),
                    texto_conclusao: encodeJSON_toHex(JSON.stringify(_parent.find('#notificacao_texto_conclusao').val())).replaceAll('"',''),
                    email: _parent.find('#notificacao_email').val()
                }
            },
            administrativo:{
                autoedicao_subordinadas: _parent.find('#atividades_autoedicao_subordinadas').is(':checked')
            },
            feriados: _parent.find('#configBox_feriados tbody tr').map(function(){
                var td = $(this).find('td');
                var checkboxRecorrente = td.eq(1).find('input[type="checkbox"]').is(':checked');
                var nome_feriado = encodeJSON_toHex(td.eq(0).text().trim());
                var feriado_data = td.eq(2).text().trim();
                if (feriado_data != '') {
                    return {nome_feriado: nome_feriado, recorrente: checkboxRecorrente, feriado_data: feriado_data };
                }
            }).get()
        };

    return _return;
}
function saveOptionConfigItem(this_, type, id) {
    var action = 'config_update_'+type;
    var key = (type == 'unidades') ? extractOptionConfigUnidade(this_) : extractOptionConfigItem(this_);
    var param = {
        action: action,
        id: id,
        ids: [],
        type: type,
        // key: key,
        key: JSON.stringify(convertJsonBools(key)),
        mode: 'option'
    };
    console.log(type, param);
    getConfigServer(action, param);
}
// CRIA PAINEL DE CONFIGURACOES
function configPessoal() {
    var stateAtivData = getOptionsPro('panelAtividadesViewSend') ? 'checked' : '';
    var selfAtivData = getOptionsPro('panelAtividadesViewSelf') ? 'checked' : '';
    var stateAtivDataSub = ( !verifyOptionsPro('panelAtividadesViewSubordinada') || getOptionsPro('panelAtividadesViewSubordinada') ) ? 'checked' : '';
    // var stateAtivDataSyncUnidade = ( getOptionsPro('panelAtividadesViewSyncUnidade') ) ? 'checked' : '';
    var statePanelSortPro = ( getOptionsPro('panelSortPro') ) ? 'checked' : '';
    var configBaseSelected = ( getOptionsPro('configBaseSelectedPro_atividades') ) ? getOptionsPro('configBaseSelectedPro_atividades') : 0;
    var configBaseProAtiv = ( localStorageRestorePro('configBasePro') != null ) ? localStorageRestorePro('configBasePro') : false;
        configBaseProAtiv = (configBaseProAtiv) ? jmespath.search(configBaseProAtiv, "[?baseTipo=='atividades'] | [?conexaoTipo=='api'||conexaoTipo=='googleapi']") : configBaseProAtiv;
        configBaseProAtiv = (configBaseProAtiv !== null && configBaseProAtiv.length > 0 ) ? configBaseProAtiv : false;
    var optionSelectConfigBasePro = ( configBaseProAtiv && configBaseProAtiv.length > 0 ) ? $.map(configBaseProAtiv, function(v,k){ return ( configBaseSelected == k ) ? '<option value="'+k+'" selected>'+v.baseName+'</option>' : '<option value="'+k+'">'+v.baseName+'</option>' }).join('') : '';
    var configUser = (typeof arrayConfigAtividades.perfil !== 'undefined' && arrayConfigAtividades.perfil.hasOwnProperty('config') && typeof arrayConfigAtividades.perfil.config !== 'undefined' && arrayConfigAtividades.perfil.config !== null) ? arrayConfigAtividades.perfil.config : false;
    // console.log('configUser',configUser);

    var htmlSelectConfigBase = '<select style="width: 100%; margin: 0 !important; padding: 0 5px !important;" class="required infraText txtsheetsSelect" id="selectBaseDadosAtiv" onchange="changeBaseDadosAtiv(this)">'+optionSelectConfigBasePro+'</select>';
    
    var textBox =   '<table style="font-size: 10pt;width: 50%; margin-top: 30px;min-width: 650px;" class="seiProForm">'+
                    '   <tr style="height: 40px;">'+
                    '       <td><i class="iconPopup far fa-hand-rock cinzaColor"></i> Ordenar pain\u00E9is de gest\u00E3o arrastando e soltando</td>'+
                    '       <td>'+
                    '           <div class="onoffswitch" style="float: right;">'+
                    '               <input type="checkbox" onchange="changePanelSortPro(this);saveConfigPersonalUser(this);" name="onoffswitch" class="onoffswitch-checkbox" id="panelSortPro" tabindex="0" '+statePanelSortPro+'>'+
                    '               <label class="onoffswitch-label" for="panelSortPro"></label>'+
                    '           </div>'+
                    '       </td>'+
                    '   </tr>'+
                    '   <tr style="height: 40px;">'+
                    '       <td><i class="iconPopup fas fa-street-view cinzaColor"></i> Visualizar apenas '+__.minhas_demandas+'</td>'+
                    '       <td>'+
                    '           <div class="onoffswitch" style="float: right;">'+
                    '               <input type="checkbox" data-type="view_ativ_self" onchange="changeViewStatesAtiv(this);saveConfigPersonalUser(this);" name="onoffswitch" class="onoffswitch-checkbox" id="panelAtividadesViewSelf" tabindex="0" '+selfAtivData+'>'+
                    '               <label class="onoffswitch-label" for="panelAtividadesViewSelf"></label>'+
                    '           </div>'+
                    '       </td>'+
                    '   </tr>'+
                    '   <tr style="height: 40px;">'+
                    '       <td><i class="iconPopup fas fa-archive cinzaColor"></i> Visualizar '+__.demandas+' j\u00E1 '+__.arquivadas+'</td>'+
                    '       <td>'+
                    '           <div class="onoffswitch" style="float: right;">'+
                    '               <input type="checkbox" data-type="view_ativ_send" onchange="changeViewStatesAtiv(this);saveConfigPersonalUser(this);" name="onoffswitch" class="onoffswitch-checkbox" id="panelAtividadesViewSend" tabindex="0" '+stateAtivData+'>'+
                    '               <label class="onoffswitch-label" for="panelAtividadesViewSend"></label>'+
                    '           </div>'+
                    '       </td>'+
                    '   </tr>'+
                    '   <tr style="height: 40px;">'+
                    '       <td><i class="iconPopup fas fa-exchange-alt cinzaColor"></i> Visualizar '+__.demandas+' das unidades subordinadas</td>'+
                    '       <td>'+
                    '           <div class="onoffswitch" style="float: right;">'+
                    '               <input type="checkbox" data-type="view_ativ_sub" onchange="changeViewStatesAtiv(this);saveConfigPersonalUser(this);" name="onoffswitch" class="onoffswitch-checkbox" id="panelAtividadesViewSub" tabindex="0" '+stateAtivDataSub+'>'+
                    '               <label class="onoffswitch-label" for="panelAtividadesViewSub"></label>'+
                    '           </div>'+
                    '       </td>'+
                    '   </tr>'+
                    '   <tr style="height: 40px;">'+
                    '       <td><i class="iconPopup fas fa-business-time cinzaColor"></i> Hor\u00E1rio \u00FAtil de trabalho (para c\u00E1lculo de tempo despendido)</td>'+
                    '       <td style="text-align: center;">'+
                    '            <input type="time" id="distribuicao_horario_util_inicio" onchange="saveConfigPersonalUser(this)" style="width: 100px !important; float: left;" tabindex="0" value="'+(configUser && typeof configUser.distribuicao !== 'undefined' && typeof configUser.distribuicao.horario_util !== 'undefined' && typeof configUser.distribuicao.horario_util.inicio !== 'undefined' ? configUser.distribuicao.horario_util.inicio : '00:00')+'">'+
                    '            <span style="line-height: 40px; display: inline-block;">\u00E0</span>'+
                    '            <input type="time" id="distribuicao_horario_util_fim" onchange="saveConfigPersonalUser(this)" style="width: 100px !important; float: right;" tabindex="0" value="'+(configUser && typeof configUser.distribuicao !== 'undefined' && typeof configUser.distribuicao.horario_util !== 'undefined' && typeof configUser.distribuicao.horario_util.fim !== 'undefined' ? configUser.distribuicao.horario_util.fim : '23:59')+'">'+
                    '       </td>'+
                    '   </tr>'+
                    /*
                    '   <tr style="height: 40px;">'+
                    '       <td><i class="iconPopup fas fa-sign-out-alt cinzaColor"></i> Sincronizar a troca de unidade do sistema \u00E0 troca de unidade do SEI </td>'+
                    '       <td>'+
                    '           <div class="onoffswitch" style="float: right;">'+
                    '               <input type="checkbox" data-type="sync_unidades" onchange="changeViewStatesAtiv(this)" name="onoffswitch" class="onoffswitch-checkbox" id="changeViewStatesSyncUnidade" tabindex="0" '+stateAtivDataSyncUnidade+'>'+
                    '               <label class="onoffswitch-label" for="changeViewStatesSyncUnidade"></label>'+
                    '           </div>'+
                    '       </td>'+
                    '   </tr>'+
                    */
                    '   <tr style="height: 40px;">'+
                    '       <td style="vertical-align: bottom;"><i class="iconPopup fas fa-sync-alt cinzaColor"></i> Alternar base de dados</td>'+
                    '       <td>'+
                    htmlSelectConfigBase+
                    '       </td>'+
                    '   </tr>'+
                    '   <tr style="height: 40px;">'+
                    '       <td colspan="2">'+
                    '           <span style="color:#ccc;font-size: 8pt;font-family: monospace;">'+
                    '               Vers\u00E3o '+VERSION_SEIPRO+
                    '           </span>'+
                    '       </td>'+
                    '   </tr>'+
                    '</table>';
    return textBox;
}
function saveConfigPersonalUser(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.ui-tabs-panel');
    var ordenar_paineis = _parent.find('#panelSortPro').is(':checked');
    var visualiza_enviadas = _parent.find('#panelAtividadesViewSend').is(':checked');
    var visualiza_somente_suas = _parent.find('#panelAtividadesViewSelf').is(':checked');
    var visualiza_subordinadas = _parent.find('#panelAtividadesViewSub').is(':checked');
    var horario_inicio = _parent.find('#distribuicao_horario_util_inicio').val();
    var horario_fim = _parent.find('#distribuicao_horario_util_fim').val();
    var config = {
        ordenar_paineis: ordenar_paineis,
        visualiza_enviadas: visualiza_enviadas,
        visualiza_somente_suas: visualiza_somente_suas,
        visualiza_subordinadas: visualiza_subordinadas,
        distribuicao: {
            horario_util: {
                inicio: horario_inicio, 
                fim: horario_fim
            }
        }
    };
    var action = 'config_update_user_personal';
    var param = {
        action: action,
        config: config
    };
    getServerAtividades(param, action);
    _this.closest('tr').find('td').eq(0).addClass('editCellLoading');
}
function getTableRelatorioPanel(listRelatorios) {
    // var _this = $(this_);
    var relatorioID = '#tabs_report-demandas';
    var tabelaRelatorio = $(relatorioID);
        tabelaRelatorio.show();
    // var arrayProcessosUnidade = getProcessoUnidadePro();
    var countRelatorios = (listRelatorios.length == 1) ? listRelatorios.length+' registro:' : listRelatorios.length+' registros:';
    if (typeof listRelatorios !== 'undefined' && listRelatorios.length > 0 && listRelatorios != 0) {
        htmlTableRelatorios =    '<table id="tableRelatorioDemanda" data-name-table="RelatorioDemanda" style="width: max-content !important; margin-top: 0;" class="tableInfo tableZebra tableFollow tableAtividades" data-tabletype="relatorios">'+
                                '   <caption class="infraCaption" style="text-align: left; margin-top: 20px;">'+countRelatorios+'</caption>'+
                                '   <thead>'+
                                '       <tr class="tableHeader" style="height: 30px;">'+  
                                '           <th class="tituloControle" style="width: 50px;">ID</th>'+
                                '           <th class="tituloControle" style="width: 80px;">Unidade</th>'+
                                '           <th class="tituloControle" style="width: 210px;">Processo</th>'+
                                '           <th class="tituloControle" style="width: 180px;">Requisi\u00E7\u00E3o</th>'+
                                '           <th class="tituloControle" style="width: 400px;">'+__.Assunto+'</th>'+
                                '           <th class="tituloControle" style="width: 400px;">'+__.Atividade+'</th>'+
                                '           <th class="tituloControle" style="width: 180px;">Etiquetas</th>'+
                                '           <th class="tituloControle" style="width: 180px;">Respons\u00E1vel</th>'+
                                '           <th class="tituloControle" style="width: 140px;">Tempo Planejado (horas)</th>'+
                                '           <th class="tituloControle" style="width: 120px;">Dias de Planejamento</th>'+
                                '           <th class="tituloControle tituloFilter sorter-date-range-dmy" style="width: 100px;">Data de Distribui\u00E7\u00E3o</th>'+
                                '           <th class="tituloControle tituloFilter sorter-date-range-dmy" style="width: 100px;">Prazo de Entrega</th>'+
                                '           <th class="tituloControle" style="width: 140px;">Tempo Pactuado (horas)</th>'+
                                '           <th class="tituloControle" style="width: 120px;">Fator de '+__.Complexidade+'</th>'+
                                '           <th class="tituloControle tituloFilter sorter-date-range-dmy" style="width: 100px;">Data de In\u00EDcio</th>'+
                                '           <th class="tituloControle tituloFilter sorter-date-range-dmy" style="width: 100px;">Data de Conclus\u00E3o</th>'+
                                '           <th class="tituloControle" style="width: 210px;">Status Entrega</th>'+
                                '           <th class="tituloControle" style="width: 210px;">Documento Entregue</th>'+
                                '           <th class="tituloControle" style="width: 140px;">Tempo Despendido (horas)</th>'+
                                '           <th class="tituloControle" style="width: 120px;">Produtividade</th>'+
                                '           <th class="tituloControle" style="width: 80px;">Nota Atribu\u00EDda</th>'+
                                '           <th class="tituloControle" style="width: 120px;">Coment\u00E1rios</th>'+
                                '           <th class="tituloControle" style="width: 120px;">Justificativas</th>'+
                                '           <th class="tituloControle tituloFilter sorter-date-range-dmy" style="width: 100px;">Data de Avalia\u00E7\u00E3o</th>'+
                                '           <th class="tituloControle tituloFilter sorter-date-range-dmy" style="width: 100px;">Data de '+__.Arquivamento+'</th>'+
                                '           <th class="tituloControle tituloFilter sorter-date-range-dmy" style="width: 100px;">\u00DAltima Atualiza\u00E7\u00E3o</th>'+
                                '       </tr>'+
                                '   </thead>'+
                                '   <tbody>';
        $.each(listRelatorios,function(index, value){
            var linkProc = (parseInt(value.id_procedimento) == 0) ? '' : url_host+'?acao=procedimento_trabalhar&id_procedimento='+value.id_procedimento;
            var linkReq = (parseInt(value.id_documento_requisicao) == 0) ? '' : url_host+'?acao=procedimento_trabalhar&id_procedimento='+value.id_procedimento+'&id_documento='+value.id_documento_requisicao;
            var linkDoc = (parseInt(value.id_documento_entregue) == 0) ? '' : url_host+'?acao=procedimento_trabalhar&id_procedimento='+value.id_procedimento+'&id_documento='+value.id_documento_requisicao;
            var documentoTips = (typeof value.documento_sei !== 'undefined' && value.documento_sei !== null && value.documento_sei != '' && parseInt(value.documento_sei) != 0) ? value.nome_documento+' ('+value.documento_sei+')' : value.nome_documento;
            var requisicaoTips = (typeof value.requisicao_sei !== 'undefined' && value.requisicao_sei !== null && value.requisicao_sei != '' && parseInt(value.requisicao_sei) != 0) ? value.nome_requisicao+' ('+value.requisicao_sei+')' : value.nome_requisicao;
                // requisicaoTips = (value.data_entrega == '0000-00-00 00:00:00') ? 'Requisi\u00E7\u00E3o: '+requisicaoTips : 'Entrega: '+documentoTips;
            var iconProcesso = ( $.inArray(value.processo_sei, arrayProcessosUnidade) == -1 ) ? 'fas fa-folder' : 'far fa-folder-open';
            var tipsProcesso = ( $.inArray(value.processo_sei, arrayProcessosUnidade) == -1 ) ? 'Processo fechado nesta unidade' : 'Processo aberto nesta unidade';
            var nameUser = (value.id_user != 0 ? value.nome_completo : 'N\u00E3o atribu\u00EDdo');
            var iconRequisicao = (value.data_entrega == '0000-00-00 00:00:00') ? 'far fa-list-alt' : 'fas fa-list-alt'; 

            var processoHtml = (value.processo_sei !== null && value.processo_sei != '')
                        ? '               <a '+(linkProc == '' ? 'style="cursor: auto;"' : 'style="text-decoration: underline; color: #00c;" href="'+linkProc+'" target="_blank"')+'>'+
                        '                   <i class="'+iconProcesso+'" '+(linkProc == '' ? 'style="color: #a2a2a2;"' : 'style="color: #00c; text-decoration: underline;"')+'></i> '+
                        '                   <span '+(linkProc == '' ? '' : 'style="color: #00c;"')+'></i> '+
                        '                       '+value.processo_sei+
                        '                   </span>'+
                        '               </a>'
                        : '';

            var requisicaoHtml =    '               <a '+(linkReq == '' ? 'style="cursor: auto;"' : 'style="text-decoration: underline; color: #00c;" href="'+linkReq+'" target="_blank"')+'>'+
                                    '                   <i class="'+iconRequisicao+'" '+(linkReq == '' ? 'style="color: #a2a2a2;"' : 'style="color: #00c; text-decoration: underline;"')+' onmouseover="return infraTooltipMostrar(\''+requisicaoTips+'\');" onmouseout="return infraTooltipOcultar();"></i> '+
                                    '                   <span '+(linkReq == '' ? '' : 'style="color: #00c;"')+'></i> '+
                                    '                       '+requisicaoTips+
                                    '                   </span>'+
                                    '               </a>';

            var documentoHtml =     (value.data_entrega == '0000-00-00 00:00:00') ? '' : 
                                    '               <a '+(linkDoc == '' ? 'style="cursor: auto;"' : 'style="text-decoration: underline; color: #00c;" href="'+linkDoc+'" target="_blank"')+'>'+
                                    '                   <i class="'+iconRequisicao+'" '+(linkDoc == '' ? 'style="color: #a2a2a2;"' : 'style="color: #00c; text-decoration: underline;"')+' onmouseover="return infraTooltipMostrar(\''+documentoTips+'\');" onmouseout="return infraTooltipOcultar();"></i> '+
                                    '                   <span '+(linkDoc == '' ? '' : 'style="color: #00c;"')+'></i> '+
                                    '                       '+documentoTips+
                                    '                   </span>'+
                                    '               </a>';

            var statusAtividade = (moment(value.prazo_entrega,'YYYY-MM-DD HH:mm:ss') < moment()) ? 'Atrasado' : 'No prazo';
                statusAtividade = (value.data_entrega != '0000-00-00 00:00:00' && moment(value.data_entrega,'YYYY-MM-DD HH:mm:ss') <= moment(value.prazo_entrega,'YYYY-MM-DD HH:mm:ss')) ? 'Entregue no prazo' : statusAtividade;
                statusAtividade = (value.data_entrega != '0000-00-00 00:00:00' && moment(value.data_entrega,'YYYY-MM-DD HH:mm:ss') > moment(value.prazo_entrega,'YYYY-MM-DD HH:mm:ss')) ? 'Entregue fora do prazo' : statusAtividade;
                            

            htmlTableRelatorios +=    '       <tr data-tagname="SemGrupo" data-index="'+index+'">'+
                                        '           <td align="center">'+value.id_demanda+'</td>'+
                                        '           <td align="left">'+value.sigla_unidade+'</td>'+
                                        '           <td align="left">'+processoHtml+'</td>'+
                                        '           <td align="left">'+requisicaoHtml+'</td>'+
                                        '           <td align="left">'+value.assunto+'</td>'+
                                        '           <td align="left">'+value.nome_atividade+'</td>'+
                                        '           <td align="left">'+(value.etiquetas ? value.etiquetas.join('; ') : '')+'</td>'+
                                        '           <td align="left">'+nameUser+'</td>'+
                                        '           <td align="center">'+value.tempo_planejado+'</td>'+
                                        '           <td align="center">'+value.dias_planejado+'</td>'+
                                        '           <td align="center">'+
                                        '               <span class="info_dates_fav" data-time-sorter="'+value.data_distribuicao+'">'+
                                        '                   '+(value.data_distribuicao == '0000-00-00 00:00:00' ? '' : moment(value.data_distribuicao, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm'))+
                                        '               </span>'+
                                        '           </td>'+
                                        '           <td align="center">'+
                                        '               <span class="info_dates_fav" data-time-sorter="'+value.prazo_entrega+'">'+
                                        '                   '+(value.prazo_entrega == '0000-00-00 00:00:00' ? '' : moment(value.prazo_entrega, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm'))+
                                        '               </span>'+
                                        '           </td>'+
                                        '           <td align="center">'+value.tempo_pactuado+'</td>'+
                                        '           <td align="center">'+value.fator_complexidade+'</td>'+
                                        '           <td align="center">'+
                                        '               <span class="info_dates_fav" data-time-sorter="'+value.data_inicio+'">'+
                                        '                   '+(value.data_inicio == '0000-00-00 00:00:00' ? '' : moment(value.data_inicio, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm'))+
                                        '               </span>'+
                                        '           </td>'+
                                        '           <td align="center">'+
                                        '               <span class="info_dates_fav" data-time-sorter="'+value.data_entrega+'">'+
                                        '                   '+(value.data_entrega == '0000-00-00 00:00:00' ? '' : moment(value.data_entrega, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm'))+
                                        '               </span>'+
                                        '           </td>'+
                                        '           <td align="left">'+statusAtividade+'</td>'+
                                        '           <td align="left">'+documentoHtml+'</td>'+
                                        '           <td align="center">'+value.tempo_despendido+'</td>'+
                                        '           <td align="left">'+(value.produtividade == 0 ? '' : ((value.produtividade*100).toFixed(2)+'%'))+'</td>'+
                                        '           <td align="center">'+(value.avaliacao == 0 ? '' : value.avaliacao.nota_atribuida)+'</td>'+
                                        '           <td align="left">'+(value.avaliacao == 0 ? '' : value.avaliacao.comentarios)+'</td>'+
                                        '           <td align="left">'+(value.avaliacao == 0 ? '' : $.map(value.avaliacao.justificativas, function(v){ return v.nome_justificativa }).join(', '))+'</td>'+
                                        '           <td align="center">'+
                                        '               <span class="info_dates_fav" data-time-sorter="'+value.data_avaliacao+'">'+
                                        '                   '+(value.data_avaliacao == '0000-00-00 00:00:00' ? '' : moment(value.data_avaliacao, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm'))+
                                        '               </span>'+
                                        '           </td>'+
                                        '           <td align="center">'+
                                        '               <span class="info_dates_fav" data-time-sorter="'+value.data_envio+'">'+
                                        '                   '+(value.data_envio == '0000-00-00 00:00:00' ? '' : moment(value.data_envio, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm'))+
                                        '               </span>'+
                                        '           </td>'+
                                        '           <td align="center">'+
                                        '               <span class="info_dates_fav" data-time-sorter="'+value.datetime+'">'+
                                        '                   '+(value.datetime == '0000-00-00 00:00:00' ? '' : moment(value.datetime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm'))+
                                        '               </span>'+
                                        '           </td>'+
                                        '       </tr>';
        });
        htmlTableRelatorios +=   '   </tbody>'+
                                '</table>';

        tabelaRelatorio.html(htmlTableRelatorios);
        initPanelResize(relatorioID+'.tabelaPanelScroll', 'relatorioTabelaPro');
        
        var relatorioTabela = $('#tableRelatorioDemanda');
            relatorioTabela.tablesorter({
                textExtraction: {
                    3: function (elem, table, cellIndex) {
                        var text_date = $(elem).find('.info_dates_fav').data('time-sorter');
                        return text_date;
                    },
                    4: function (elem, table, cellIndex) {
                      var text_date = $(elem).find('.info_dates_fav').data('time-sorter');
                      return text_date;
                    }
                },
                widgets: ["saveSort", "filter"],
                widgetOptions: {
                    saveSort: true,
                    filter_hideFilters: true,
                    filter_columnFilters: true,
                    filter_saveFilters: true,
                    filter_hideEmpty: true,
                    filter_excludeFilter: {}
                },
                sortReset: true
            }).on("filterEnd", function (event, data) {
                var caption = $(this).find("caption").eq(0);
                var tx = caption.text();
                    caption.text(tx.replace(/\d+/g, data.filteredRows));
                    $(this).find("tbody > tr:visible > td > input").prop('disabled', false);
                    $(this).find("tbody > tr:hidden > td > input").prop('disabled', true);
            });
        
        var filterRelatorio = relatorioTabela.find('.tablesorter-filter-row').addClass('notCopy').get(0);
        if (typeof filterRelatorio !== 'undefined') {
            var observerFilterRelatorio = new MutationObserver(function(mutations) {
                var _this = $(mutations[0].target);
                var _parent = _this.closest('table');
                var iconFilter = _parent.find('.filterTablePro button');
                var checkIconFilter = iconFilter.hasClass('active');
                var hideme = _this.hasClass('hideme');
                if (hideme && checkIconFilter) {
                    iconFilter.removeClass('active');
                }
            });
            setTimeout(function(){ 
                var htmlFilterRelatorio =   '<div class="btn-group filterTablePro notCopy" role="group" style="right: 8px;top: 38px;z-index: 99;position: absolute;">'+
                                            '   <button type="button" onclick="downloadTablePro(this)" data-icon="fas fa-download" style="padding: 0.1rem .5rem; font-size: 9pt;" data-value="Baixar" class="btn btn-sm btn-light">'+
                                            '       <i class="fas fa-download" style="padding-right: 3px; cursor: pointer; font-size: 10pt; color: #888;"></i>'+
                                            '       <span class="text">Baixar</span>'+
                                            '   </button>'+
                                            '   <button type="button" onclick="copyTablePro(this)" data-icon="fas fa-copy" style="padding: 0.1rem .5rem; font-size: 9pt;" data-value="Copiar" class="btn btn-sm btn-light">'+
                                            '       <i class="fas fa-copy" style="padding-right: 3px; cursor: pointer; font-size: 10pt; color: #888;"></i>'+
                                            '       <span class="text">Copiar</span>'+
                                            '   </button>'+
                                            '   <button type="button" onclick="filterTablePro(this)" style="padding: 0.1rem .5rem; font-size: 9pt;" data-value="Pesquisar" class="btn btn-sm btn-light '+(relatorioTabela.find('tr.tablesorter-filter-row').hasClass('hideme') ? '' : 'active')+'">'+
                                            '       <i class="fas fa-search" style="padding-right: 3px; cursor: pointer; font-size: 10pt; color: #888;"></i>'+
                                            '       Pesquisar'+
                                            '   </button>'+
                                            '</div>';
                    relatorioTabela.find('thead .filterTablePro').remove();
                    relatorioTabela.find('thead').prepend(htmlFilterRelatorio);
                    observerFilterRelatorio.observe(filterRelatorio, {
                        attributes: true
                    });
            }, 500);
        }
    }
}
function getChartAfastamentoPanel(this_) {
    var _this = $(this_);
    $('#reportAfastamentoPanel').show();
}
function getTableAfastamentoPanel(this_) {
    var _this = $(this_);
    var afastID = '#tableAfastamentoPanel';
    var tabelaAfast = $(afastID);
        tabelaAfast.show();
    var listAfastamentos = arrayConfigAtividades.afastamentos.lista;
    var countAfastamentos = (listAfastamentos.length == 1) ? listAfastamentos.length+' registro:' : listAfastamentos.length+' registros:';
    if (typeof listAfastamentos !== 'undefined' && listAfastamentos.length > 0 && listAfastamentos != 0) {
        htmlTableAfastamentos =    '<table id="tableAfastamento" class="tableInfo tableZebra tableFollow tableAtividades" data-tabletype="afastamentos">'+
                                '   <caption class="infraCaption" style="text-align: left; margin-top: 10px;">'+countAfastamentos+'</caption>'+
                                '   <thead>'+
                                '       <tr class="tableHeader">'+
                                '           <th class="tituloControle" data-sorter="false" style="width: 50px;" align="center"><label class="lblInfraCheck_label" for="lnkInfraCheck_afastamentos" accesskey=";"></label><a id="lnkInfraCheck_afastamentos" class="lnkInfraCheck" onclick="setSelectAllTr(this);" onmouseover="updateTipSelectAll(this)" onmouseenter="return infraTooltipMostrar(\'Selecionar Tudo\')" onmouseout="return infraTooltipOcultar();"><img src="/infra_css/imagens/check.gif" id="imgRecebidosCheck"></a></th>'+
                                '           <th class="tituloControle tituloFilter" data-filter-type="user">Usu\u00E1rio</th>'+
                                '           <th class="tituloControle tituloFilter" data-filter-type="date" style="width: 25%;">Motivo do Afastamento</th>'+
                                '           <th class="tituloControle tituloFilter sorter-date-range-dmy" data-filter-type="inicio" style="width: 160px;">In\u00EDcio do Afastamento</th>'+
                                '           <th class="tituloControle tituloFilter sorter-date-range-dmy" data-filter-type="fim" style="width: 160px;">Fim do Afastamento</th>'+
                                '           <th class="tituloControle" data-filter-type="desc">'+__.Observacoes+'</th>'+
                                '           <th class="tituloControle" data-sorter="false" style="min-width: 120px;">A\u00E7\u00F5es</th>'+
                                '       </tr>'+
                                '   </thead>'+
                                '   <tbody>';
        $.each(listAfastamentos,function(index, value){
            var dateConfig =    {
                date: moment(value.fim_afastamento).format('YYYY-MM-DD HH:mm:ss'),
                nametag: ( moment(value.fim_afastamento) < moment()
                    ? { name: 'Conclu\u00EDdo', value: 'date_concluido', color: '#eef4f9' }
                    : { name: 'Programado', value: 'date_programado', color: '#eef4f9' }
                    )
            };
            var tagName_thisUser = removeAcentos(value.apelido).replace(/\ /g, '').toLowerCase();
            var tagName_thisMotivo = removeAcentos(value.nome_motivo).replace(/\ /g, '').toLowerCase();
            var tagName_thisDate = removeAcentos(dateConfig.nametag.name).replace(/\ /g, '').toLowerCase();
            var tagColor = jmespath.search(arrayConfigAtividades.afastamentos.tipos_motivos,"[?id_tipo_motivo==`"+value.id_tipo_motivo+"`] | [0].config.colortags");
                tagColor = (tagColor !== null) ? tagColor : { "icontag": "luggage-cart", "colortag": "#bfd5e11", "textcolor": "black"};
            var horas_afastamento = jmespath.search(arrayConfigAtividades.afastamentos.tipos_motivos,"[?id_tipo_motivo==`"+value.id_tipo_motivo+"`] | [0].config.horas_afastamento");
                horas_afastamento = (horas_afastamento) ? true : false;
            var format_sys = (horas_afastamento) ? 'YYYY-MM-DDTHH:mm' : 'YYYY-MM-DD';
            var format_display = (horas_afastamento) ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY';
            var type_input = (horas_afastamento) ? 'datetime-local' : 'date';

            var tagDate = getDatesPreview(dateConfig);
            htmlTableAfastamentos +=    '       <tr data-tagname="SemGrupo" data-index="'+value.id_afastamento+'" class="tagTableName_'+tagName_thisUser+' tagTableName_'+tagName_thisMotivo+' tagTableName_date_'+tagName_thisDate+'">'+
                                        '           <td align="center">'+
                                        '               <input type="checkbox" class="checkboxSelectAfastamento" onclick="followSelecionarItens(this)" id="afastamentoPro_'+value.id_afastamento+'" name="afastamentoPro" value="'+value.id_afastamento+'">'+
                                        '           </td>'+
                                        '           <td align="left">'+
                                        '               <span class="info_tags_follow info_tags_user">'+
                                        '                   <span data-colortag="#bfd5e8" data-type="user" data-tagname="'+tagName_thisUser+'" data-textcolor="black" data-icontag="user" style="background-color: #bfd5e8;" class="tag_text tagTableText_'+tagName_thisUser+'" onclick="filterTagView(this)">'+
                                        '                       <i data-colortag="#406987" class="fas fa-user" style="font-size: 90%; margin: 0px 2px; color: #406987;"></i> '+value.apelido+
                                        '                   </span>'+
                                        '               </span>'+
                                        '           '+value.nome_completo+
                                        '           </td>'+
                                        '           <td align="left">'+
                                        '               <span class="info_tags_follow">'+
                                        '                   <span data-colortag="'+tagColor.colortag+'" data-tagname="'+tagName_thisMotivo+'" data-textcolor="'+tagColor.textcolor+'" data-icontag="'+tagColor.icontag+'" data-type="date" style="background-color: '+tagColor.colortag+';"class="tag_text tagTableText_'+tagName_thisMotivo+'" onclick="filterTagView(this)">'+
                                        '                       <i class="tagicon fas fa-'+tagColor.icontag+'" style="font-size: 90%;margin: 0 2px; color: '+tagColor.textcolor+'"></i>'+
                                        '                       '+value.nome_motivo+
                                        '                   </span>'+
                                        '                   <span class="info_dates_fav">'+tagDate+'</span>'+
                                        '               </span>'+
                                        '           </td>'+
                                        '           <td align="center">'+
                                        '               <span class="info_dates_fav" data-time-sorter="'+moment(value.inicio_afastamento, 'YYYY-MM-DD HH:mm:ss').format(format_sys)+'">'+
                                        '                   '+moment(value.inicio_afastamento, 'YYYY-MM-DD HH:mm:ss').format(format_display)+
                                        '               </span>'+
                                        '           </td>'+
                                        '           <td align="center">'+
                                        '               <span class="info_dates_fav" data-time-sorter="'+moment(value.fim_afastamento, 'YYYY-MM-DD HH:mm:ss').format(format_sys)+'">'+
                                        '                   '+moment(value.fim_afastamento, 'YYYY-MM-DD HH:mm:ss').format(format_display)+
                                        '               </span>'+
                                        '           </td>'+
                                        '           <td class="tdfav_desc">'+
                                        '               <div>'+
                                        '                   <span class="info" style="font-weight: bold; display: inline-block; padding-top: 5px;">'+value.observacoes+'</span>'+
                                        '               </div>'+
                                        '           </td>'+
                                        '           <td align="right">'+
                                        (checkCapacidade('edit_afastamento') ?
                                        '               <a class="newLink followLinkTr" onclick="saveAfastamento(this,'+value.id_afastamento+')" onmouseover="return infraTooltipMostrar(\'Editar afastamento\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-pencil-alt" style="font-size: 100%;"></i></a>'+
                                        '' : '')+
                                        (checkCapacidade('delete_afastamento') ?
                                        '               <a class="newLink followLinkTr" onclick="removeAfastamento(this, '+value.id_afastamento+')" onmouseover="return infraTooltipMostrar(\'Excluir afastamento\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-trash" style="font-size: 100%;"></i></a>'+
                                        '' : '')+
                                        '           </td>'+
                                        '       </tr>';
        });
        htmlTableAfastamentos +=   '   </tbody>'+
                                '</table>';

        tabelaAfast.html(htmlTableAfastamentos);
        initPanelResize(afastID+'.tabelaPanelScroll', 'afastamentoTabelaPro');
        
        var afastTabela = $('#tableAfastamento');
            afastTabela.tablesorter({
                textExtraction: {
                    3: function (elem, table, cellIndex) {
                        var text_date = $(elem).find('.info_dates_fav').data('time-sorter');
                        return text_date;
                    },
                    4: function (elem, table, cellIndex) {
                      var text_date = $(elem).find('.info_dates_fav').data('time-sorter');
                      return text_date;
                    }
                },
                widgets: ["saveSort", "filter"],
                widgetOptions: {
                    saveSort: true,
                    filter_hideFilters: true,
                    filter_columnFilters: true,
                    filter_saveFilters: true,
                    filter_hideEmpty: true,
                    filter_excludeFilter: {}
                },
                sortReset: true,
                headers: {
                    0: { sorter: false, filter: false },
                    1: { filter: true },
                    2: { filter: true },
                    3: { filter: true },
                    4: { filter: true },
                    5: { filter: true }
                }
            }).on("sortEnd", function (event, data) {
                checkboxRangerSelectShift();
            }).on("filterEnd", function (event, data) {
                checkboxRangerSelectShift();
                var caption = $(this).find("caption").eq(0);
                var tx = caption.text();
                    caption.text(tx.replace(/\d+/g, data.filteredRows));
                    $(this).find("tbody > tr:visible > td > input").prop('disabled', false);
                    $(this).find("tbody > tr:hidden > td > input").prop('disabled', true);
            });
        
        var filterAfast = afastTabela.find('.tablesorter-filter-row').get(0);
        if (typeof filterAfast !== 'undefined') {
            var observerFilterAfast = new MutationObserver(function(mutations) {
                var _this = $(mutations[0].target);
                var _parent = _this.closest('table');
                var iconFilter = _parent.find('.filterTablePro button');
                var checkIconFilter = iconFilter.hasClass('active');
                var hideme = _this.hasClass('hideme');
                if (hideme && checkIconFilter) {
                    iconFilter.removeClass('active');
                }
            });
            setTimeout(function(){ 
                var htmlFilterAfast =   '<div class="btn-group filterTablePro" role="group" style="right: 55px;top: 52px;z-index: 99;position: absolute;">'+
                                        '   <button type="button" onclick="downloadTablePro(this)" data-icon="fas fa-download" style="padding: 0.1rem .5rem; font-size: 9pt;" data-value="Baixar" class="btn btn-sm btn-light">'+
                                        '       <i class="fas fa-download" style="padding-right: 3px; cursor: pointer; font-size: 10pt; color: #888;"></i>'+
                                        '       <span class="text">Baixar</span>'+
                                        '   </button>'+
                                        '   <button type="button" onclick="copyTablePro(this)" data-icon="fas fa-copy" style="padding: 0.1rem .5rem; font-size: 9pt;" data-value="Copiar" class="btn btn-sm btn-light">'+
                                        '       <i class="fas fa-copy" style="padding-right: 3px; cursor: pointer; font-size: 10pt; color: #888;"></i>'+
                                        '       <span class="text">Copiar</span>'+
                                        '   </button>'+
                                        '   <button type="button" onclick="filterTablePro(this)" style="padding: 0.1rem .5rem; font-size: 9pt;" data-value="Pesquisar" class="btn btn-sm btn-light '+(afastTabela.find('tr.tablesorter-filter-row').hasClass('hideme') ? '' : 'active')+'">'+
                                        '       <i class="fas fa-search" style="padding-right: 3px; cursor: pointer; font-size: 10pt; color: #888;"></i>'+
                                        '       Pesquisar'+
                                        '   </button>'+
                                        '</div>';
                    afastTabela.find('thead .filterTablePro').remove();
                    afastTabela.find('thead').prepend(htmlFilterAfast);
                    observerFilterAfast.observe(filterAfast, {
                        attributes: true
                    });
            }, 500);
        }
        
        var observerTableAfast = new MutationObserver(function(mutations) {
            var _this = $(mutations[0].target);
            var _parent = _this.closest('table');
            var count = _parent.find('tr.infraTrMarcada').length;
            if (count > 0) {
                $('#afastamentosProActions').find('.iconAfastamento_remove').show().find('.fa-layers-counter').text(count);
            } else {
                $('#afastamentosProActions').find('.iconAfastamento_remove').hide();
            }
        });
        setTimeout(function(){ 
            afastTabela.find('tbody tr').each(function(){
                observerTableAfast.observe(this, {
                        attributes: true
                });
            });
            checkboxRangerSelectShift();
        }, 500);
    }
}
function getGanttAfastamento(bar_class = false) {
    var task = [];
    var dataFall = '';
    $('#ganttAfastamentoPanel').show();
    var listAfastamentos = arrayConfigAtividades.afastamentos.lista;
    if (typeof listAfastamentos !== 'undefined' && listAfastamentos.length > 0 && listAfastamentos != 0) {
        listAfastamentos = jmespath.search(listAfastamentos, "reverse(@)");
        var viewModeGantt = (getOptionsPro('ganttAfastamentoView')) ? getOptionsPro('ganttAfastamentoView') : 'Month';
        $.each(listAfastamentos, function (index, value) {
            var inicio_afastamento = moment(value.inicio_afastamento, "YYYY-MM-DD HH:mm:ss");
            var fim_afastamento = moment(value.fim_afastamento, "YYYY-MM-DD HH:mm:ss");
            var customClass = ( moment() > fim_afastamento ) ? 'bar-concluido-noprazo' : 'bar-em-execucao';   
                customClass = (moment() <= fim_afastamento && moment() >= inicio_afastamento) ? 'bar-iniciado' : customClass;
                // customClass = ( fim_afastamento < moment() ) ? 'bar-nao-iniciado' : customClass;
            var addClass = (customClass == 'bar-iniciado' || customClass == 'bar-em-execucao') ? ' bar-ativos' : '';
            var taskClass = customClass+addClass;
            var assunto = value.apelido+': '+value.nome_motivo;
            var taskAfastamentos = {
                                id: value.id_afastamento.toString(),
                                name: assunto,
                                start: inicio_afastamento.format("YYYY-MM-DD"),
                                end: fim_afastamento.format("YYYY-MM-DD"),
                                progress: (customClass == 'bar-concluido-noprazo') ? 100 
                                            : (customClass == 'bar-iniciado') 
                                                ? ganttAutoProgressPercent(inicio_afastamento, fim_afastamento) : 0,
                                dependencies: '',
                                custom_class: taskClass
                            };
            if (!bar_class || (bar_class && taskClass.indexOf(bar_class) !== -1 )) {
                task.push(taskAfastamentos);
            }
        });
        $('#ganttAfastamentoPanel').html('');
        if (task.length > 0) {
            var gantt = new Gantt("#ganttAfastamentoPanel", task,{
                header_height: 50,
                column_width: 10,
                step: 24,
                language: 'en',
                language: 'ptBr',
                view_modes: ['Day', 'Week', 'Month'],
                bar_height: 15,
                bar_corner_radius: 3,
                arrow_curve: 5,
                padding: 18,
                edit_task: false,
                view_mode: viewModeGantt,   
                date_format: 'YYYY-MM-DD',
                custom_popup_html: function(task) {
                    var value = jmespath.search(arrayConfigAtividades.afastamentos.lista, "[?id_afastamento==`"+task.id+"`] | [0]");
                    var optionSelectMotivo = $.map(arrayConfigAtividades.afastamentos.tipos_motivos, function(v){ 
                                                var selected = ( value && v.id_tipo_motivo == value.id_tipo_motivo ) ? 'selected' : '';
                                                return "<option value='"+v.id_tipo_motivo+"' "+selected+" data-config='"+JSON.stringify(v.config)+"'>"+v.nome_motivo+"</option>";
                                            }).join('');
                    var optionSelectUser = $.map(arrayConfigAtividades.usuarios, function(v){ if (v.id_user == value.id_user) { return '<option value="'+v.id_user+'" selected>'+v.apelido+'</option>' } else { return '<option value="'+v.id_user+'">'+v.apelido+'</option>' } }).join('');
                    var horas_afastamento = jmespath.search(arrayConfigAtividades.afastamentos.tipos_motivos,"[?id_tipo_motivo==`"+value.id_tipo_motivo+"`] | [0].config.horas_afastamento");
                        horas_afastamento = (horas_afastamento) ? true : false;
                    var format_sys = (horas_afastamento) ? 'YYYY-MM-DDTHH:mm' : 'YYYY-MM-DD';
                    var format_display = (horas_afastamento) ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY';
                    var type_input = (horas_afastamento) ? 'datetime-local' : 'date';
                    var html = '<div class="details-container seiProForm">'+
                                '   <table class="tableInfo tableLine">'+
                                '      <tr>'+
                                '           <td colspan="2" class="td_view">'+
                                '               <h5><i class="iconPopup fas fa-luggage-cart cinzaColor"></i> '+
                                '                   <span class="boxInfo" style="font-size: 11pt;font-weight: bold;width: 85%;display: inline-block;">'+value.nome_completo+': '+value.nome_motivo+'</span>'+
                                '                   <input type="hidden" data-type="id" value="'+value.id_afastamento+'">'+
                                '                   <a style="float: right; margin: -4px -4px 0 0; padding: 5px;" onclick="ganttAfastamentos.hide_popup()"><i class="far fa-times-circle cinzaColor"></i></a>'+
                                '               </h5>'+
                                '           </td>'+
                                '          <td class="td_edit" style="display:none; vertical-align: bottom;"><i class="iconPopup iconSwitch fas fa-user-circle cinzaColor"></i>Usu\u00E1rio:</td>'+
                                '          <td class="td_edit required" style="display:none">'+
                                '               <select onchange="changeDatesAfast(this)" data-type="user" class="data_extract" style="font-size: 1em; width: 86%;" data-key="id_user" required>'+optionSelectUser+'</select>'+
                                '               <a style="float: right; margin: -4px -4px 0 0; padding: 5px;" onclick="ganttAfastamentos.hide_popup()"><i class="far fa-times-circle cinzaColor"></i></a>'+
                                '          </td>'+
                                '      </tr>'+
                                '      <tr style="height: 40px;">'+
                                '          <td style="vertical-align: bottom; width: 180px;"><i class="iconPopup iconSwitch fas fa-stopwatch cinzaColor"></i>In\u00EDcio do Afastamento:</td>'+
                                '          <td class="td_view">'+moment(value.inicio_afastamento, 'YYYY-MM-DD HH:mm:ss').format(format_display)+'</td>'+
                                '          <td class="td_edit required date" style="display:none">'+
                                '               <input onchange="changeDatesAfast(this)" id="afast_inicio_afastamento" data-name="data de in\u00EDcio do afastamento" class="data_extract" style="font-size: 1em; width: 80%;" type="'+type_input+'" data-type="inicio" data-key="inicio_afastamento" value="'+moment(value.inicio_afastamento, 'YYYY-MM-DD HH:mm:ss').format(format_sys)+'" required>'+
                                '          </td>'+
                                '      </tr>'+
                                '      <tr style="height: 40px;">'+
                                '          <td style="vertical-align: bottom;"><i class="iconPopup iconSwitch fas fa-history cinzaColor"></i>Fim do Afastamento:</td>'+
                                '          <td class="td_view">'+moment(value.fim_afastamento, 'YYYY-MM-DD HH:mm:ss').format(format_display)+'</td>'+
                                '          <td class="td_edit required date" style="display:none">'+
                                '               <input onchange="changeDatesAfast(this)" id="afast_fim_afastamento" data-name="data final do afastamento" class="data_extract" style="font-size: 1em; width: 80%;" data-type="fim" type="'+type_input+'" data-key="fim_afastamento" value="'+moment(value.fim_afastamento, 'YYYY-MM-DD HH:mm:ss').format(format_sys)+'" required>'+
                                '          </td>'+
                                '      </tr>'+
                                '      <tr style="height: 40px;">'+
                                '          <td style="vertical-align: bottom;"><i class="iconPopup iconSwitch fas fa-business-time cinzaColor"></i>Motivo do Afastamento:</td>'+
                                '          <td class="td_view">'+value.nome_motivo+'</td>'+
                                '          <td class="td_edit required" style="display:none">'+
                                '               <select class="data_extract" onchange="changeInputAfast(this)" style="font-size: 1em; width: 86%;" data-key="id_tipo_motivo" required>'+optionSelectMotivo+'</select>'+
                                '          </td>'+
                                '      </tr>'+
                                '      <tr style="height: 40px;">'+
                                '          <td style="vertical-align: bottom;"><i class="iconPopup iconSwitch fas fa-comment-alt cinzaColor"></i>'+__.Observacoes+':</td>'+
                                '          <td class="td_view">'+value.observacoes+'</td>'+
                                '          <td class="td_edit" style="display:none">'+
                                '               <textarea class="data_extract" style="font-size: 1em; width: 80%;" data-key="observacoes">'+value.observacoes+'</textarea>'+
                                '          </td>'+
                                '      </tr>'+
                                '      <tr style="background: #f5f5f5;">'+
                                '           <td class="td_view" style="vertical-align: middle; padding: 0 10px;" colspan="2">'+
                                '               <p>'+
                                '                   <span class="boxInfo">'+
                                (checkCapacidade('delete_afastamento') ?
                                '                       <a class="ui-button ui-corner-all ui-widget" style="color: #2b2b2b; text-decoration: none; float: left;" onclick="removeAfastamento(this, '+value.id_afastamento+')">'+
                                '                           <i style="margin-right: 3px; color: #e46e64;" class="fas fa-trash"></i>'+
                                '                           Excluir'+
                                '                       </a>'+
                                '' : '')+
                                (checkCapacidade('edit_afastamento') ?
                                '                       <a class="ui-button ui-corner-all ui-widget" style="color: #2b2b2b; text-decoration: none; float: right;" onclick="editAfastamento(this)">'+
                                '                           <i style="margin-right: 3px; color: #8a8a8a;" class="fas fa-pencil-alt"></i>'+
                                '                           Editar'+
                                '                       </a>'+
                                '' : '')+
                                '                   </span>'+
                                '               </p>'+
                                '           </td>'+
                                '           <td class="td_edit" style="vertical-align: middle; padding: 0 10px; display:none" colspan="2">'+
                                '               <p>'+
                                '                   <span class="boxInfo">'+
                                '                       <a class="ui-button ui-corner-all ui-widget" style="color: #2b2b2b; text-decoration: none; float: left;" onclick="editAfastamento(this, -1)">'+
                                '                           <i style="margin-right: 3px; color: #8a8a8a;" class="fas fa-times"></i>'+
                                '                           Cancelar'+
                                '                       </a>'+
                                (checkCapacidade('edit_afastamento') ?
                                '                       <a class="ui-button ui-corner-all ui-widget confirm" style="color: #2b2b2b; text-decoration: none; float: right;" onclick="editAfastamento(this, '+value.id_afastamento+')">'+
                                '                           <i style="margin-right: 3px; color: #8a8a8a;" class="fas fa-save"></i>'+
                                '                           Salvar'+
                                '' : '')+
                                '                       </a>'+
                                '                   </span>'+
                                '               </p>'+
                                '           </td>'+
                                '      </tr>'+
                                '   </table>'+
                                '</div>';
                return html;
                },
                on_click: function (task) {
                    console.log(task);
                }
            });
            ganttAfastamentos = gantt;
            if (!getOptionsPro('panelHeight_afastamentosGanttPro') && $('#ganttAfastamentoPanel').height() > 800) { setOptionsPro('panelHeight_afastamentosGanttPro', 800) }
            $('.gantt-container').addClass('tabelaPanelScroll');
            initPanelResize('.gantt-container', 'ganttAfastamentoPanelPro');
        } else {
            dataFall = '<div class="gantt-container dataFallback" data-text="Nenhum dado dispon\u00EDvel"></div>';
        }
        
        var btnGroupView =  '<div style="position: absolute; right: 0; z-index: 99;">'+
                            '   <div class="btn-group" role="group" style="float: right;">'+
                            '       <button type="button" data-value="Day" class="btn btn-sm btn-light '+(getOptionsPro('ganttAfastamentoView') == 'Day' ? 'active' : '')+'">Dia</button>'+
                            '       <button type="button" data-value="Week" class="btn btn-sm btn-light '+(getOptionsPro('ganttAfastamentoView') == 'Week' ? 'active' : '')+'">Semana</button>'+
                            '       <button type="button" data-value="Month" class="btn btn-sm btn-light '+(getOptionsPro('ganttAfastamentoView') == 'Month' || !getOptionsPro('ganttAfastamentoView') ? 'active' : '')+'">M\u00EAs</button>'+
                            '   </div>'+
                            '</div>';
        var legendFilter =  '<div class="filterGanttTag">'+
                            '   '+getFilterGanttTag(ganttAfastamentos, 'bar-ativos', 'Ativo', bar_class, 'afastamento')+
                            '   '+getFilterGanttTag(ganttAfastamentos, 'bar-em-execucao', 'Planejado', bar_class, 'afastamento')+
                            '   '+getFilterGanttTag(ganttAfastamentos, 'bar-iniciado', 'Em curso', bar_class, 'afastamento')+
                            '   '+getFilterGanttTag(ganttAfastamentos, 'bar-concluido-noprazo', 'Conclu\u00EDdo', bar_class, 'afastamento')+
                            '</div>';
            $('#ganttAfastamentoPanel').css('max-width',($('#atividadesProDiv').width()-20)).prepend(legendFilter+btnGroupView+dataFall);

        if (ganttAfastamentos && ganttAfastamentos.bars.length > 0) {
            var scrollLeft = ganttAfastamentos.bars[0].x-20;
            var windowDiv = $('#ganttAfastamentoPanel').find('.gantt-container');
            windowDiv.animate({scrollLeft: scrollLeft}, 500);

            var popupAfast = $('#ganttAfastamentoPanel').find('.popup-wrapper');
            if (popupAfast.length > 0) {
                var observerPopupAfast = new MutationObserver(function(mutations) {
                    var _this = $(mutations[0].target);
                    var _parent = _this.closest('.gantt-container');
                    if (_this.is(':visible')) {
                        _parent.attr('style', function(i,s) { return (s || '') + 'position: relative !important;' });
                        _parent.find('.ui-resizable-handle').hide();
                    } else {
                        _parent.attr('style', function(i,s) { return (s || '') + 'position: initial !important;' });
                        _parent.find('.ui-resizable-handle').show();
                    }
                });
                    observerPopupAfast.observe(popupAfast.get(0), {
                            attributes: true
                        });
            }
        }
        $("#ganttAfastamentoPanel .btn-group").on("click", "button", function() {
            $btn = $(this);
            var mode = $btn.data('value');
            $btn.parent().find('button').removeClass('active'); 
            $btn.addClass('active');
            ganttAfastamentos.change_view_mode(mode);
            setOptionsPro('ganttAfastamentoView', mode);
        });
    }
}
function saveAfastamento(this_, id_afastamento = 0) {
    var _this = $(this_);
    var value = (id_afastamento != 0) ? jmespath.search(arrayConfigAtividades.afastamentos.lista, "[?id_afastamento==`"+id_afastamento+"`] | [0]") : false;
    var optionSelectUser = $.map(arrayConfigAtividades.usuarios, function(v){ if (value && v.id_user == value.id_user) { return '<option value="'+v.id_user+'" selected>'+v.apelido+'</option>' } else { return '<option value="'+v.id_user+'">'+v.apelido+'</option>' } }).join('');
    var optionSelectMotivo = $.map(arrayConfigAtividades.afastamentos.tipos_motivos, function(v){ 
                                var selected = ( value && v.id_tipo_motivo == value.id_tipo_motivo ) ? 'selected' : '';
                                return "<option value='"+v.id_tipo_motivo+"' "+selected+" data-config='"+JSON.stringify(v.config)+"'>"+v.nome_motivo+"</option>";
                            }).join('');
    var horas_afastamento = (value) ? jmespath.search(arrayConfigAtividades.afastamentos.tipos_motivos,"[?id_tipo_motivo==`"+value.id_tipo_motivo+"`] | [0].config.horas_afastamento") : false;
        horas_afastamento = (horas_afastamento) ? true : false;
    var format_sys = (horas_afastamento) ? 'YYYY-MM-DDTHH:mm' : 'YYYY-MM-DD';
    var format_display = (horas_afastamento) ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY';
    var type_input = (horas_afastamento) ? 'datetime-local' : 'date';
    var htmlBox =   '<div id="boxAfastamento" class="atividadeWork" data-demanda="'+(value && value.id_afastamento ? value.id_afastamento : 0)+'">'+
                    '   <table style="font-size: 10pt;width: 100%;" class="seiProForm">'+
                    '      <tr>'+
                    '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                    '               <label for="afast_id_user"><i class="iconPopup iconSwitch fas fa-user-circle cinzaColor"></i>Usu\u00E1rio:</label>'+
                    '           </td>'+
                    '           <td class="required date" style="width: 230px;">'+
                    '               <select onchange="changeDatesAfast(this)" class="data_extract" style="font-size: 1em;" data-key="id_user" id="afast_id_user" data-type="user">'+optionSelectUser+'</select>'+
                    '               <input type="hidden" class="data_extract" data-key="id_afastamento" data-type="id" value="'+(value && value.id_afastamento ? value.id_afastamento : 0)+'">'+
                    '           </td>'+
                    '           <td style="vertical-align: bottom;" class="label">'+
                    '               <label class="last" for="afast_id_tipo_motivo"><i class="iconPopup iconSwitch fas fa-luggage-cart cinzaColor" style="float: initial;"></i>Motivo do Afastamento:</label>'+
                    '           </td>'+
                    '           <td class="required">'+
                    '               <select class="data_extract" onchange="checkInputAfast(this)" style="font-size: 1em;" data-key="id_tipo_motivo" id="afast_id_tipo_motivo">'+optionSelectMotivo+'</select>'+
                    '           </td>'+
                    '      </tr>'+
                    '      <tr style="height: 20px;">'+
                    '          <td colspan="3"></td>'+
                    '          <td>'+
                    '               <div class="onoffswitch" style="float: left;transform: scale(0.8);">'+
                    '                   <input type="checkbox" data-key="afast_all_day" onchange="changeInputAfast(this)" name="onoffswitch" class="onoffswitch-checkbox" id="afast_all_day" tabindex="0" checked>'+
                    '                   <label class="onoffswitch-label" for="afast_all_day"></label>'+
                    '               </div>'+
                    '               <label for="afast_all_day" style="float: left;display: inline-block;margin: 5px;">O dia inteiro</label>'+
                    '          </td>'+
                    '      </tr>'+
                    '      <tr>'+
                    '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                    '               <label for="afast_inicio_afastamento"><i class="iconPopup iconSwitch fas fa-user-check cinzaColor"></i>In\u00EDcio do Afastamento:</label>'+
                    '           </td>'+
                    '           <td class="required date">'+
                    '               <input type="'+type_input+'" onchange="changeDatesAfast(this)" data-key="inicio_afastamento" id="afast_inicio_afastamento" data-type="inicio" class="data_extract" data-name="data de in\u00EDcio do afastamento" value="'+(value && value.inicio_afastamento ? moment(value.inicio_afastamento,'YYYY-MM-DD HH:mm:ss').format(format_sys) : moment().format(format_sys))+'" required>'+
                    '           </td>'+
                    '           <td style="vertical-align: bottom;" class="label">'+
                    '               <label class="last" for="afast_fim_afastamento"><i class="iconPopup iconSwitch fas fa-user-clock cinzaColor" style="float: initial;"></i>Fim do Afastamento:</label>'+
                    '           </td>'+
                    '           <td class="required date">'+
                    '               <input type="'+type_input+'" onchange="changeDatesAfast(this)" data-key="fim_afastamento" id="afast_fim_afastamento" data-type="fim" class="data_extract" data-name="data final do afastamento" value="'+(value && value.fim_afastamento ? moment(value.fim_afastamento,'YYYY-MM-DD HH:mm:ss').format(format_sys) : moment().add(1, 'days').format(format_sys))+'" required>'+
                    '           </td>'+
                    '      </tr>'+
                    '      <tr style="height: 40px;">'+
                    '          <td style="vertical-align: bottom;"><i class="iconPopup iconSwitch fas fa-comment-alt cinzaColor"></i>'+__.Observacoes+':</td>'+
                    '          <td colspan="3"><textarea class="data_extract" style="font-size: 1em; width: 97%;" data-key="observacoes">'+(value && value.observacoes ? value.observacoes : '')+'</textarea></td>'+
                    '      </tr>'+
                    '      <tr style="height: auto;">'+
                    '          <td style="vertical-align: bottom; text-align: left;" class="label" colspan="4" id="infoBox_dateAfast">'+
                    '               '+
                    '           </td>'+
                    '      </tr>'+
                    '   </table>'+
                    '</div>';
    if (value && id_afastamento != 0) {
        if ($('#tableAfastamento tr.infraTrMarcada').length > 0) {
            $('#tableAfastamento').find('.lnkInfraCheck').data('index',1).trigger('click');
        }
        _this.closest('tr').find('td').eq(0).find('input[type="checkbox"]').trigger('click');
    }

    if (checkCapacidade('save_afastamento')) {
        resetDialogBoxPro('dialogBoxPro');
        dialogBoxPro = $('#dialogBoxPro')
            .html('<div class="dialogBoxDiv">'+htmlBox+'</div>')
            .dialog({
                title: (value && id_afastamento != 0 ? 'Editar Afatamento: '+value.apelido+': '+value.nome_motivo : 'Adicionar Afastamento'),
                width: 780,
                open: function() { 
                    updateButtonConfirm(this, true);
                    prepareFieldsReplace(this);
                },
                close: function() { 
                    if (_this.closest('tr').hasClass('infraTrMarcada')) {
                        $('#tableAfastamento').find('.lnkInfraCheck').data('index',1).trigger('click');
                    }
                    $('#boxAfastamento').remove();
                    resetDialogBoxPro('dialogBoxPro');
                },
                buttons: [{
                    text: (value && id_afastamento != 0 ? 'Editar' : 'Adicionar'),
                    class: 'confirm',
                    click: function(event) { 
                        var _parent = $(this).closest('.ui-dialog');
                        var target = _parent.find('input[data-type="inicio"]').get(0);
                        console.log(checkDatesAfast(target), checkAtivRequiredFields(target, 'mark'));
                        if (checkDatesAfast(target) && checkAtivRequiredFields(target, 'mark')) {
                            var param = extractDataAfast(_parent);
                            var action = (value && id_afastamento != 0 ? 'edit_afastamento' : 'save_afastamento');
                                param.action = action;
                                getServerAtividades(param, action);
                        }
                    }
                }]
        });
    }
}
function checkDatesPlanoAfast(value) {
    var config_unidade = getConfigDadosUnidade(value.sigla_unidade);
    var config_feriados = (typeof config_unidade.feriados !== 'undefined' && config_unidade.feriados !== null) ? config_unidade.feriados : false;
    var arrayFeriados = (config_unidade.count_dias_uteis && value.data_inicio_vigencia != '' && value.data_fim_vigencia != '') 
                        ? jmespath.search(getHolidayBetweenDates(moment(value.data_inicio_vigencia, 'YYYY-MM-DD HH:mm:ss').format('Y')+'-01-01', moment(value.data_fim_vigencia, 'YYYY-MM-DD HH:mm:ss').add(1, 'Y').format('Y')+'-01-01', config_feriados), "[*].d_")
                        : [];
    var inicio = moment(value.data_inicio_vigencia, 'YYYY-MM-DD HH:mm:ss');
    var fim = moment(value.data_fim_vigencia, 'YYYY-MM-DD HH:mm:ss');
    var valueDias = (config_unidade.count_dias_uteis) 
                ? moment().isoWeekdayCalc({  
                    rangeStart: value.data_inicio_vigencia,  
                    rangeEnd: value.data_fim_vigencia,  
                    weekdays: [1,2,3,4,5],  
                    exclusions: arrayFeriados
                })
                : moment(value.data_fim_vigencia, 'YYYY-MM-DD HH:mm:ss').diff(moment(value.data_inicio_vigencia, 'YYYY-MM-DD HH:mm:ss'), 'days');
        valueDias = (valueDias < 0) ? 0 : valueDias;

    function getLoopDatesPlano(checkLoopDatesPlanoAfastLoop) {
        var result_ = 0;
        checkLoopDatesPlanoAfastLoop.forEach(function (id, index) {
            var afastResult = jmespath.search(arrayConfigAtividades.afastamentos.lista,"[?id_afastamento==`"+id+"`] | [0]");
            var checkHorasAfastamento = (afastResult && afastResult !== null) 
                        ? jmespath.search(arrayConfigAtividades.afastamentos.tipos_motivos, "[?id_tipo_motivo==`"+afastResult.id_tipo_motivo+"`] | [0].config.horas_afastamento") : false;
            var horasAfastamento = (checkHorasAfastamento) 
                        ? moment(afastResult.fim_afastamento, 'YYYY-MM-DD HH:mm:ss').diff(moment(afastResult.inicio_afastamento, 'YYYY-MM-DD HH:mm:ss'), 'hours', true) : value.carga_horaria;
            result_ = result_+horasAfastamento;
            // console.log(afastResult, checkHorasAfastamento, horasAfastamento);
        });
        return result_;
    }

    var valueExclusion = 0;
    var horaExclusion = 0;

    var init_datesPlanoAfastLoop = checkDatesPlanoAfastLoop(inicio, value.id_user, arrayFeriados);
    if (init_datesPlanoAfastLoop && init_datesPlanoAfastLoop.length > 0) { 
        var horaExclusion_init = getLoopDatesPlano(init_datesPlanoAfastLoop);
            horaExclusion = (horaExclusion_init) ? horaExclusion+horaExclusion_init : horaExclusion;
            valueExclusion++ 
    }
    while(inicio.add(1, 'days').diff(fim) < 0) {
        var dt_inicio = inicio.clone();
        var loop_datesPlanoAfastLoop = checkDatesPlanoAfastLoop(dt_inicio, value.id_user, arrayFeriados);
        if (loop_datesPlanoAfastLoop && loop_datesPlanoAfastLoop.length > 0) {
            var horaExclusion_loop = getLoopDatesPlano(loop_datesPlanoAfastLoop);
                horaExclusion = (horaExclusion_loop) ? horaExclusion+horaExclusion_loop : horaExclusion;
                valueExclusion++;
        }
    }
    var last_datesPlanoAfastLoop = checkDatesPlanoAfastLoop(fim, value.id_user, arrayFeriados);
    if (last_datesPlanoAfastLoop && last_datesPlanoAfastLoop.length > 0) { 
        var horaExclusion_last = getLoopDatesPlano(last_datesPlanoAfastLoop);
            horaExclusion = (horaExclusion_last) ? horaExclusion+horaExclusion_last : horaExclusion;
            valueExclusion++ 
    }

    // console.log({id_plano: value.id_plano, id_user: value.id_user, valueDias: valueDias, check: isNaN(parseFloat(valueDias)), valueExclusion: valueExclusion, carga_horaria: value.carga_horaria});

    return {
            id_user: value.id_user,
            id_plano: value.id_plano,
            dias_afastamento: valueExclusion, 
            dias_plano: valueDias, 
            tempo_afastamento: horaExclusion,
            // tempo_afastamento: valueExclusion*value.carga_horaria,
            tempo_plano: valueDias*value.carga_horaria,
            dias_proporcional: (valueDias-valueExclusion),
            tempo_proporcional: value.tempo_total-horaExclusion
            // tempo_proporcional: (valueDias-valueExclusion)*value.carga_horaria
           };
}
function checkDatesPlanoAfastLoop(dt_inicio, id_user, arrayFeriados) {
    var dt_inicio_format = dt_inicio.format('YYYY-MM-DD');
    // var check = checkDatesBetweenAfast(dt_inicio_format, id_user, 0, true);
    var array = jmespath.search(arrayConfigAtividades.afastamentos.lista,"[?id_user==`"+id_user+"`]");
    var check = checkDatesBetweenArray(array, dt_inicio_format, 0, 0, {inicio: 'inicio_afastamento', fim: 'fim_afastamento', id: 'id_user', idreftype: 'id_afastamento'}, true, true);
    
    // console.log({check: check, afastamentos: arrayConfigAtividades.afastamentos.lista, dt_inicio_format: dt_inicio_format, id_user: id_user, ref: 0, param: {inicio: 'inicio_afastamento', fim: 'fim_afastamento', id: 'id_user'}, exclude: true});

    if (check.length > 0  && dt_inicio.weekday() != 6 && dt_inicio.weekday() != 0 && arrayFeriados.indexOf(dt_inicio_format) === -1) {
        return check;
    } else {
        return false;
    }
}
function updateTempoProporcionalPlanos() {
    var updatePlanos = []
    $.each(arrayConfigAtividades.planos, function(index, value){
        var arrayTempoProporcional = checkDatesPlanoAfast(value);
        if (arrayTempoProporcional.tempo_proporcional != value.tempo_proporcional) {
            updatePlanos.push({
                                id_plano: arrayTempoProporcional.id_plano,
                                tempo_proporcional: arrayTempoProporcional.tempo_proporcional,
                            });
        }
    });
    if (updatePlanos.length > 0) {
        var action = 'update_planos';
        var param = {
            action: action,
            planos: updatePlanos
        };
        getServerAtividades(param, action);
    }
}
function updateArrayPlanos(planos) {
    $.each(planos, function(index, value){
        $.each(arrayConfigAtividades.planos, function(i, v){
            if (value.id_plano == v.id_plano) {
                arrayConfigAtividades.planos[i].tempo_proporcional = parseInt(value.tempo_proporcional);
            }
        });
    });
}
/*
function checkDatesLoopAfast(inicio, fim, id_user, id_afastamento) {
    var inicio_afastamento = moment(inicio, 'YYYY-MM-DD');
    var fim_afastamento = moment(fim, 'YYYY-MM-DD');
    var checkBetween = false;
    var checkInicio = checkDatesBetweenAfast(inicio_afastamento.format('YYYY-MM-DD'), id_user, id_afastamento);
    var checkFim = checkDatesBetweenAfast(fim_afastamento.format('YYYY-MM-DD'), id_user, id_afastamento);
        while(inicio_afastamento.add(1, 'days').diff(fim_afastamento) < 0) {
            var check = checkDatesBetweenAfast(inicio_afastamento.clone().format('YYYY-MM-DD'), id_user, id_afastamento);
            if (check) {
                checkBetween = true;
            }
        }
        // console.log(checkInicio, checkBetween, checkFim);
    return (checkInicio || checkBetween || checkFim) ? true : false;
}
function checkDatesBetweenAfast(date_target, id_user, id_afastamento, includes = false) {
    var userDates = jmespath.search(arrayConfigAtividades.afastamentos.lista,"[?id_user==`"+id_user+"`]");
    var checkDates = false;
    var target = moment(date_target,'YYYY-MM-DD');
        includes = (includes) ? '[]' : '()';
    // console.log('date_target->',date_target, 'id_user->',id_user, 'id_afastamento->',id_afastamento);
    $.each(userDates,function(index, value){
        var start = moment(value.inicio_afastamento, 'YYYY-MM-DD HH:mm:ss');
        var finish = moment(value.fim_afastamento, 'YYYY-MM-DD HH:mm:ss');
        var check = target.isBetween(start, finish, 'days', includes);
        if (check && id_afastamento != value.id_afastamento) {
            // console.log('*',check, start.format('DD/MM/YYYY'), finish.format('DD/MM/YYYY'), value.id_afastamento);
            checkDates = true;
            return false;
        }
    });
    return checkDates;
}
*/
function checkDatesAfast(element, formAfast = true) {
    var _this = $(element);
    var data = _this.data();
    var _parent = _this.closest('table');
    var inicio = _parent.find('input[data-type="inicio"]');
    var inicio_val = (inicio.val().indexOf('T') !== -1) ? inicio.val() : inicio.val()+'T00:00';
    var fim = _parent.find('input[data-type="fim"]');
    var fim_val = (fim.val().indexOf('T') !== -1) ? fim.val() : fim.val()+'T23:59';
    var id_user = (_parent.find('input[data-type="user"]').length > 0) ? _parent.find('input[data-type="user"]') : false;
        id_user = (_parent.find('select[data-type="user"]').length > 0) ? _parent.find('select[data-type="user"]') : id_user;
        id_user = ($('#ativ_id_user').length > 0) ? $('#ativ_id_user') : id_user;
    var id_user_val = (typeof id_user !== 'undefined' && id_user) ? parseInt(id_user.val()) : false;
    var id_afastamento = _parent.find('input[data-type="id"]');
        id_afastamento = (id_afastamento.length == 0) ? 0 : id_afastamento.val();
    var alert = '';
    var format = (inicio.val().indexOf('T') !== -1) ? 'YYYY-MM-DDTHH:mm' : 'YYYY-MM-DD';
    var format_display = (inicio.val().indexOf('T') !== -1) ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY';
    var type_datetime = (inicio.val().indexOf('T') !== -1) ? true : false;
    
    if ( moment(inicio_val, format) > moment(fim_val, format) ) { 
        element.setCustomValidity('*'); 
        alert = 'A '+inicio.data('name')+' deve ser maior ou igual que a '+fim.data('name');
    } else if (id_user_val) { 
        var userAfastList = jmespath.search(arrayConfigAtividades.afastamentos.lista,"[?id_user==`"+id_user_val+"`]");
        var check = (userAfastList !== null) 
                    ? checkDatesLoopArray(userAfastList, inicio_val, fim_val, id_user_val, id_afastamento, {inicio: 'inicio_afastamento', fim: 'fim_afastamento', id: 'id_user', idreftype: 'id_afastamento'}, true, true)
                    : false;
            /*
            console.log({
                id_user_len: id_user.length, 
                afastamentos_lista: userAfastList, 
                inicio_val: inicio_val, 
                id_user_val: id_user_val, 
                id_afastamento: id_afastamento, 
                param: {inicio: 'inicio_afastamento', fim: 'fim_afastamento', id: 'id_afastamento', idreftype: 'id_afastamento'}, 
                check: check
            });
            */

        if (check && check.length > 0) {
            var v = jmespath.search(arrayConfigAtividades.afastamentos.lista,"[?id_afastamento==`"+check[0]+"`] | [0]");            
            var horas_afastamento = (v !== null) ? jmespath.search(arrayConfigAtividades.afastamentos.tipos_motivos,"[?id_tipo_motivo==`"+v.id_tipo_motivo+"`] | [0].config.horas_afastamento") : null;
                horas_afastamento = (horas_afastamento !== null) ? horas_afastamento : false;

                // console.log(horas_afastamento, type_datetime, formAfast, v.id_tipo_motivo);
            if (formAfast || (!formAfast && horas_afastamento == false)) {
                var text_conflict = v.apelido+' ('+v.nome_motivo+') '+moment(v.inicio_afastamento,'YYYY-MM-DD HH:mm:ss').format(format_display)+' \u00E0 '+moment(v.fim_afastamento,'YYYY-MM-DD HH:mm:ss').format(format_display);
                    element.setCustomValidity('*'); 
                    alert = (formAfast) 
                            ? 'A '+data['name']+' n\u00E3o pode estar inclu\u00EDda em outra data j\u00E1 cadastrada \n\n'+text_conflict
                            : 'A '+data['name']+' est\u00E1 inclu\u00EDda em uma data de afastamento \n\n'+text_conflict;
            }
        } else {
            element.setCustomValidity(''); 
        }
    } else { 
        element.setCustomValidity(''); 
    }
    var userValidation = element.checkValidity();

    function checkDatesAfastValidation() {
        if (userValidation) {
            _this.removeClass('requiredNull');
            return true;
        } else {
            _this.addClass('requiredNull');
            element.setCustomValidity(alert);
            var isValid = element.reportValidity();
            return false;
        }
    }
    checkDatesAfastValidation();
    if (!userValidation) { setTimeout(function(){ checkDatesAfastValidation() }, 500) }
    return userValidation;
}
function changeInputAfast(this_) {
    var _this = $(this_);
    var _parent = _this.closest('table');
    var _inicio = _parent.find('input[data-type="inicio"]');
    var inicio = _inicio.val();
    var _fim = _parent.find('input[data-type="fim"]');
    var fim = _fim.val();
    var format = (inicio.indexOf('T') !== -1) ? 'YYYY-MM-DDTHH:mm' : 'YYYY-MM-DD';
    var check_allday = _parent.find('#afast_all_day');
    if (!check_allday.is(':checked')) {
        if (inicio.indexOf('T') !== -1) {
            var inicio_format = inicio+'T'+moment().format('HH:mm');
            var fim_format = fim+'T'+moment().add(1,'hours').format('HH:mm');
        } else {
            var inicio_format = (inicio != '') ? moment(inicio, format).format('YYYY-MM-DDTHH:mm') : moment().format('YYYY-MM-DDTHH:mm');
            var fim_format = (fim != '') ? moment(fim, format).format('YYYY-MM-DDTHH:mm') : moment().format('YYYY-MM-DDTHH:mm');
        }
        console.log(inicio_format, fim_format);
        _inicio.attr('type','datetime-local').val(inicio_format).show();
        _fim.attr('type','datetime-local').val(fim_format).show();
    } else {
        var inicio_format = (inicio != '') ? moment(inicio, format).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
        var fim_format = (fim != '') ? moment(fim, format).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
        _inicio.attr('type','date').val(inicio_format).show();
        _fim.attr('type','date').val(fim_format).show();
    }
    prepareFieldsReplace(this_);
}
function checkInputAfast(this_) {
    var _this = $(this_);
    var _parent = _this.closest('table');
    var data = _this.find('option:selected').data();
    var config = (typeof data !== 'undefined') ? data.config : false;
    var check_allday = _parent.find('#afast_all_day');
    if (config && typeof data !== 'undefined') { 
        if (config.horas_afastamento) {
            if (check_allday.is(':checked')) {
                check_allday.trigger('click');
            }
        } else {
            if (!check_allday.is(':checked')) {
                check_allday.trigger('click');
            }
        }
        // changeInputAfast(this_);
    } 
}
function changeDatesAfast(this_) {
    var _this = $(this_);
    var _parent = _this.closest('table');
    var data = _this.data();
    var inicio = _parent.find('input[data-type="inicio"]');
    var fim = _parent.find('input[data-type="fim"]');
    /*
    if (data.type == 'fim') {
        inicio.attr('max', _this.val());
    } else if (data.type == 'inicio') {
        fim.attr('min', _this.val());
    }
    */
    checkDatesAfast(_this.data('type') == 'user' ? inicio.get(0) : this_);
    checkAtividadesInAfastamentos(this_);
}
function checkAtividadesInAfastamentos(this_) {
    var _this = $(this_);
    var _parent = _this.closest('table');
    var data = _this.data();
    var inicio = _parent.find('input[data-type="inicio"]').val();
    var fim = _parent.find('input[data-type="fim"]').val();
    var user = _parent.find('select[data-type="user"]');
    var id_user = user.val();
    var listAtivInAfast = [];
    var ativUser = jmespath.search(arrayAtividadesPro,"[?data_entrega=='0000-00-00 00:00:00'] | [?id_user==`"+id_user+"`]");
    var _inicio = moment(inicio, 'YYYY-MM-DD');
    var _fim = moment(fim, 'YYYY-MM-DD');
    var labels = {inicio: 'data_distribuicao', fim: 'prazo_entrega', id: 'id_user'};
    var format = (inicio.indexOf('T') !== -1) ? 'YYYY-MM-DDTHH:mm' : 'YYYY-MM-DD';
    var format_display = (inicio.indexOf('T') !== -1) ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY';
    
    checkDatesBetweenArrayAtiv(ativUser, _inicio.format(format), labels, true);
    checkDatesBetweenArrayAtiv(ativUser, _fim.format(format), labels, true);

    while(_inicio.add(1, 'days').diff(_fim) < 0) {
        checkDatesBetweenArrayAtiv(ativUser, _inicio.clone().format(format), labels, true);
    }

    function checkDatesBetweenArrayAtiv(array, date_target, labels, includes = false) {
        var target = moment(date_target,format);
            includes = (includes) ? '[]' : '()';
        $.each(array,function(index, value){
            var start = moment(value[labels.inicio], 'YYYY-MM-DD HH:mm:ss');
            var finish = moment(value[labels.fim], 'YYYY-MM-DD HH:mm:ss');
            var check = target.isBetween(start, finish, 'days', '[]');
            if (check && jmespath.search(listAtivInAfast, "[?id_demanda==`"+value.id_demanda+"`]").length == 0) {
                listAtivInAfast.push(value);
            }
        });
    }
    
    if (listAtivInAfast.length > 0) {
        var htmlTableAtividades = $.map(listAtivInAfast, function(v,k){ 
                var datesAtivHtml = getDatesPreview(getConfigDateAtiv(v));
                    datesAtivHtml = (datesAtivHtml != '') ? $(datesAtivHtml).find('.dateBoxIcon')[0].outerHTML : '';
                    datesAtivHtml = (datesAtivHtml != '') ? '<span class="dateboxDisplay" onclick="actionsAtividade('+v.id_demanda+')">'+datesAtivHtml+'</span>' : '';
                    return '<div style="margin: 5px 0; display: inline-block; width: 100%;" data-value="'+v.id_demanda+'" title="'+getTitleDialogBox(v, true)+'">'+datesAtivHtml+statusIconsAtividade(v)+getTitleDialogBox(v)+'</div>'
            }).join('');
        var ativAfastHtml = '<span style="background: #fffcd7;padding: 5px;border-radius: 5px;margin: 10px 0;display: block;">'+
                            '   <i class="fas fa-info-circle azulColor" style="margin: 0 5px;"></i>'+
                            '   '+(listAtivInAfast.length > 1 ? 'Existem '+listAtivInAfast.length+' '+__.demandas : 'Existe 1 '+__.demanda+'')+' em aberto dentro do per\u00EDodo de afastamento selecionado para o usu\u00E1rio <strong>'+user.find('option:selected').text()+'</strong>'+
                            '   <a class="newLink" onclick="ativInAfastDetalhe(this)" style="text-decoration: underline;font-size: 10pt;cursor: pointer;color: blue;">'+
                            '       Detalhar '+
                            '       <i class="fas fa-angle-double-right" style="font-size: 10pt;text-decoration: underline;margin: 0;color: blue;"></i>'+
                            '   </a>'+
                            '</span>'+
                            '<div id="infoBox_dateAfastDetalhe" style="display:none; font-size: 9pt;">'+
                            '   '+htmlTableAtividades+
                            '</div>';
        _parent.find('#infoBox_dateAfast').show().html(ativAfastHtml);
    } else {
        _parent.find('#infoBox_dateAfast').hide().html('');
    }
}
function ativInAfastDetalhe(this_) {
    var _this = $(this_);
    var _parent = _this.closest('tr');
    _parent.find('#infoBox_dateAfastDetalhe').toggle();
}
function editAfastamento(this_, id_afastamento = 0) {
    var _this = $(this_);
    var _parent = _this.closest('table');
    var inicio = _parent.find('input[data-type="inicio"]');
    if (id_afastamento == 0) {
        _parent.find('.td_edit').show();
        _parent.find('.td_view').hide();
    } else if (id_afastamento == -1) {
        _parent.find('.td_edit').hide();
        _parent.find('.td_view').show();
    } else if (checkDatesAfast(inicio.get(0)) && checkAtivRequiredFields(inicio.get(0), 'mark')) {
        var param = extractDataAfast(_parent);
        var action = 'edit_afastamento';
            param.action = action;
            param.id_afastamento = id_afastamento;
            getServerAtividades(param, action);
            _parent.find('.confirm i').attr('class', 'fas fa-sync-alt fa-spin');
    }
    // console.log(id_afastamento, param);
    prepareFieldsReplace(this_);
}
function extractDataAfast(_parent) {
    var param = {};
        _parent.find('.data_extract').each(function(){
            var _this = $(this);
            if (typeof _this.data('key') !== 'undefined') {
                var value = (_this.attr('type') == 'date') ? _this.val()+' 00:00:00': _this.val();
                    value = (_this.attr('type') == 'datetime-local') ? (_this.val() == '' ? '' : moment(_this.val(), 'YYYY-MM-DDTHH:mm').format('YYYY-MM-DD HH:mm:ss')) : value;
                    value = (_this.is('textarea') || (_this.is('input') && _this.attr('type') == 'text') ) ? value.replace(/["']/g, "") : value;
                param[_this.data('key')] = value;
            }
        });
    return param;
}
function removeAfastamento(this_, id_afastamento = 0) {
    var _this = $(this_);
    var id_afastamentos = [];
    var countSelected = $('#tableAfastamento tr.infraTrMarcada').length;
    if (id_afastamento != 0) {
        if ($('#tableAfastamento').is(':visible') && countSelected > 0) {
            $('#tableAfastamento').find('.lnkInfraCheck').data('index',1).trigger('click');
        }
        _this.closest('tr').find('td').eq(0).find('input[type="checkbox"]').trigger('click');
    } else {
        id_afastamentos = $('#tableAfastamento').find('.checkboxSelectAfastamento:checked').map(function(){ return $(this).val() }).get();
    }

    confirmaFraseBoxPro('Tem certeza que deseja excluir '+(countSelected > 1 ? 'os afastamentos' : 'o afastamento')+(id_afastamento == 0 ? (countSelected > 1 ? ' selecionados' : ' selecionado') : '')+'?', 'EXCLUIR', 
        function(){
            var action = 'delete_afastamento';
            var param = {
                action: action, 
                id_afastamento: id_afastamento,
                id_afastamentos: id_afastamentos
            };
            getServerAtividades(param, action);
        }, function() {
            if (id_afastamento != 0) {
                if ($('#tableAfastamento').is(':visible') && _this.closest('tr').hasClass('infraTrMarcada')) {
                    $('#tableAfastamento').find('.lnkInfraCheck').data('index',1).trigger('click');
                }
            }
        }
    );
}
function getKanbanAtividades(this_) {
    $('#kanbanAtivPanel').html('').show();
    var listAtividadesNIniciadas = jmespath.search(arrayAtividadesPro, "[?data_inicio=='0000-00-00 00:00:00']");
        listAtividadesNIniciadas = getSortKanbanItens(listAtividadesNIniciadas, '_niniciadas');
    var listAtividadesIniciadas = jmespath.search(arrayAtividadesPro, "[?data_inicio!='0000-00-00 00:00:00'] | [?data_entrega=='0000-00-00 00:00:00']");
        listAtividadesIniciadas = getSortKanbanItens(listAtividadesIniciadas, '_iniciadas');
    var listAtividadesConcluidas = jmespath.search(arrayAtividadesPro, "[?data_entrega!='0000-00-00 00:00:00'] | [?data_avaliacao=='0000-00-00 00:00:00']");
        listAtividadesConcluidas = getSortKanbanItens(listAtividadesConcluidas, '_concluidas');
    var listAtividadesAvaliadas = jmespath.search(arrayAtividadesPro, "[?data_avaliacao!='0000-00-00 00:00:00'] | [?data_envio=='0000-00-00 00:00:00']");
        listAtividadesAvaliadas = getSortKanbanItens(listAtividadesAvaliadas, '_avaliadas');

    var listAtividadesArquivadas = getOptionsPro('panelAtividadesViewSend') ? jmespath.search(arrayAtividadesPro, "[?data_avaliacao!='0000-00-00 00:00:00'] | [?data_envio!='0000-00-00 00:00:00']") : null;
        listAtividadesArquivadas = (listAtividadesArquivadas !== null) ? getSortKanbanItens(listAtividadesArquivadas, '_arquivadas') : false;

    var bords_list = [
        {
          id: "_niniciadas",
          title: "N\u00E3o Iniciadas",
          class: "",
          dragTo: (checkCapacidade('start_atividade') ? ["_iniciadas"] : []),
          item: getKanbanItensAtividade(listAtividadesNIniciadas)
        },
        {
          id: "_iniciadas",
          title: "Iniciadas",
          dragTo: ((checkCapacidade('complete_atividade') && checkCapacidade('start_cancel_atividade'))
                      ? ["_niniciadas", "_concluidas"]
                      : (checkCapacidade('complete_atividade') && !checkCapacidade('start_cancel_atividade'))
                          ? ["_concluidas"] 
                          : (!checkCapacidade('complete_atividade') && checkCapacidade('start_cancel_atividade')) 
                              ? ["_niniciadas"] 
                              : []
                  ),
          class: "start",
          item: getKanbanItensAtividade(listAtividadesIniciadas)
        },
        {
          id: "_concluidas",
          title: "Conclu\u00EDdas",
          class: "complete",
          dragTo: ((checkCapacidade('rate_atividade') && checkCapacidade('complete_cancel_atividade'))
                      ? ["_iniciadas", "_avaliadas"]
                      : (checkCapacidade('rate_atividade') && !checkCapacidade('complete_cancel_atividade'))
                          ? ["_avaliadas"] 
                          : (!checkCapacidade('rate_atividade') && checkCapacidade('complete_cancel_atividade')) 
                              ? ["_iniciadas"] 
                              : []
                  ),
          item: getKanbanItensAtividade(listAtividadesConcluidas)
        },
        {
          id: "_avaliadas",
          title: "Avaliadas",
          class: "rate",
          dragTo: (checkCapacidade('rate_cancel_atividade') ? ["_concluidas"] : []),
          item: getKanbanItensAtividade(listAtividadesAvaliadas)
        }
    ];
    if (listAtividadesArquivadas) {
        bords_list.push({
            id: "_arquivadas",
            title: __.Arquivadas,
            class: "send",
            dragTo: (checkCapacidade('send_cancel_atividade') ? ["_avaliadas"] : []),
            item: getKanbanItensAtividade(listAtividadesArquivadas)
        });
    }

    var kanban = new jKanban({
            element: "#kanbanAtivPanel",
            gutter: "10px",
            widthBoard: (listAtividadesArquivadas ? "calc(20% - 20px)" : "calc(25% - 20px)"),
            // responsivePercentage: true,
            itemHandleOptions:{
              enabled: true,
            },
            dropEl: function(el, target, source, sibling){
                var targetEl = target.parentElement.getAttribute('data-id');
                var sourceEl = source.parentElement.getAttribute('data-id');
                var idEl = (el.dataset.eid.indexOf('_id_') !== -1) ? parseInt(el.dataset.eid.replace('_id_', '')) : el.dataset.eid;
                if (targetEl == '_iniciadas' && sourceEl == '_niniciadas') {
                    startAtividade(idEl);
                } else if (targetEl == '_niniciadas' && sourceEl == '_iniciadas') {
                    startCancelAtividade(idEl);
                } else if (targetEl == '_concluidas' && sourceEl == '_iniciadas') {
                    completeAtividade(idEl);
                } else if (targetEl == '_iniciadas' && sourceEl == '_concluidas') {
                    completeCancelAtividade(idEl);
                } else if (targetEl == '_avaliadas' && sourceEl == '_concluidas') {
                    rateAtividade(idEl);
                } else if (targetEl == '_concluidas' && sourceEl == '_avaliadas') {
                    rateCancelAtividade(idEl);
                } else if (targetEl == '_arquivadas' && sourceEl == '_avaliadas') {
                    sendAtividade(idEl);
                } else if (targetEl == '_avaliadas' && sourceEl == '_arquivadas') {
                    sendCancelAtividade(idEl);
                }
                console.log(targetEl, sourceEl, idEl);
                kanbanAtividadesMoving = {target: targetEl, source: sourceEl, id: el.dataset.eid, id_demanda: idEl};
                setStoreOrderKanbanItens();
                if (targetEl == '_niniciadas' && sourceEl == '_niniciadas' && $('#filterTagKanban_user').length > 0 && checkCapacidade('update_prioridades')) {
                    setStorePriorityKanbanItens('_niniciadas');
                }
            },
            boards: bords_list
          });

    kanbanAtividades = kanban;

    // adiciona altura maxima ao painel e redimenssionamento dinamico
    if (!getOptionsPro('panelHeight_atividadesKanbanPro') && $('#kanbanAtivPanel').height() > 800) { setOptionsPro('panelHeight_atividadesKanbanPro', 800) }
    $('.kanban-container').addClass('tabelaPanelScroll');
    initPanelResize('.kanban-container', 'atividadesKanbanPro');

    // corrige a altura de todos os quadros pelo maior deles
    var maxHeightBoard = Math.max.apply(null, $('#kanbanAtivPanel .kanban-board').map(function(){ return $(this).height() }).get());
    $('#kanbanAtivPanel .kanban-board').css('height', maxHeightBoard+'px');
    $('#kanbanAtivPanel .kanban-board .kanban-drag').css('height', (maxHeightBoard-48)+'px');

    var tagName = getOptionsPro('filterTag_kanban');
    if (typeof tagName !== 'undefined' && tagName != '') {
        setTimeout(function(){ 
            $('.kanbanAtividade .tagTableText_'+tagName).eq(0).trigger('click');
        }, 100);
    } else if ((!tagName || tagName == '') && ( checkCapacidade('only_self_atividades') )) {
        var tagName_thisUser = removeAcentos(arrayConfigAtividades.perfil.apelido).replace(/\ /g, '').toLowerCase();
        setTimeout(function(){ 
            $('.kanbanAtividade .tagTableText_'+tagName_thisUser).eq(0).trigger('click');
        }, 500);
    }

    var target = ($('#ifrArvore').length > 0) ? $('#ifrArvore').contents() : $('body');
    var progress = target.find('.kanban-item .checklist_progress');
        progress.each(function(){
            $(this).progressbar({
                value: $(this).data('valuenow'),
                max: $(this).data('max')
            });
            if ($(this).find('.ui-progressbar-value').length > 1) { $(this).find('.ui-progressbar-value').eq(0).remove() }
        });
        
    updateCountKanbanBoard();
}
function updateCountKanbanBoard() {
    $.each(kanbanAtividades.options.boards, function(i, v){
        var countBoard = $('.kanban-board[data-id="'+v.id+'"] .kanban-item:visible').length;
        $('.kanban-board[data-id="'+v.id+'"] .kanban-title-board').attr('data-count',countBoard);
    });
}
function getStoreOrderKanbanItens(nameBoard) {
    var itemStore = getOptionsPro('kanbanAtividadesOrder');
    var itens = jmespath.search(itemStore, "[?name=='"+nameBoard+"'].order | [0]");
    return (itens !== null) ? itens : false;
}
function getPinKanbanItem(id_demanda) {
    var pin = false;
    if (getOptionsPro('kanbanAtividadesOrder')) {
        var item = $.map(getOptionsPro('kanbanAtividadesOrder'), function(v){
            var order = jmespath.search(v.order, "[?id_demanda==`"+id_demanda+"`] | [0]");
            if (order && order !== null) return order;
        });
        pin = (typeof item[0] !== 'undefined' && item[0].pin) ? true : false;
    }
    return pin;
}
function updatePriorityKanbanItens(board, mode) {
    $('#kanbanAtivPanel').find('.kanban-board[data-id="'+board+'"]').find('.kanban-item:visible').each(function(i){
        var priority = $(this).find('.kanban-item-priority');
        var data = priority.data();
        var index = (mode == 'update') ? i+1 : data.priority;
        priority.data('priority', index).html('<span>'+index+'</span>');
    });
}
function setStorePriorityKanbanItens(board) {
    var priority = [];
    $('#kanbanAtivPanel').find('.kanban-board[data-id="'+board+'"]').find('.kanban-item:visible').each(function(i){
        var data = $(this).data();
        var id = parseInt(data.eid.replace('_id_',''));
        var index = i+1;
            priority.push({id_demanda: id, prioridade: index});
    });
    if (priority.length > 0) {
        $('#kanbanAtivPanel').find('.kanban-board[data-id="'+board+'"]').find('.kanban-item:visible .kanban-item-priority').html('<span><i class="fas fa-sync fa-spin" style="color: #fff;"></i></span>');
        var action = 'update_prioridades';
        var param = {
            action: action, 
            prioridades: priority,
            board: board
        };
        getServerAtividades(param, action);
    }
}
function setStoreOrderKanbanItens() {
    var itens = [{
                    name: '_niniciadas',
                    order: getOrderKanbanItens('_niniciadas')
                },{
                    name: '_iniciadas',
                    order: getOrderKanbanItens('_iniciadas')
                },{
                    name: '_concluidas',
                    order: getOrderKanbanItens('_concluidas')
                },{
                    name: '_avaliadas',
                    order: getOrderKanbanItens('_avaliadas')
                }];
        setOptionsPro('kanbanAtividadesOrder', itens);
}
function getOrderKanbanItens(board) {
    var order = [];
    $('.kanban-board[data-id="'+board+'"] .kanban-item').each(function(index, value){
        var id = $(this).data('eid');
        var id_demanda = (id.indexOf('_id_') !== -1) ? parseInt(id.replace('_id_', '')) : id;
        var pin = $(this).find('.kanban-pinboard a').hasClass('newLink_active');
        order.push({id_demanda: id_demanda, order: index, pin: pin});
    });
    return order;
}
function getSortKanbanItens(listAtividades, nameBoard) {
    var order = getStoreOrderKanbanItens(nameBoard);
    var type = getOptionsPro('filterTagType_kanban');
    if (type == 'user') {
        listAtividades = jmespath.search(listAtividades, "sort_by([*],&prioridade)");
    } else if (order) {
        $.each(listAtividades, function(i, value){
            listAtividades[i]['id_order'] = (jmespath.search(order, "[?id_demanda==`"+value.id_demanda+"`] | length(@)") > 0) ? jmespath.search(order, "[?id_demanda==`"+value.id_demanda+"`].order | [0]") : 9999;
        });
        listAtividades = jmespath.search(listAtividades, "sort_by([*],&id_order)");
    }
    return listAtividades;
}
function cancelSelectedItensAtiv(id_demanda) {
    var tableDemanda = $('#tabelaAtivPanel table');
    var tr = tableDemanda.find('tr[data-index="'+id_demanda+'"]');
    // console.log(tr.is(':visible'), tr.hasClass('infraTrMarcada'));
    if (tr.is(':visible') && tr.hasClass('infraTrMarcada')) {
        tableDemanda.find('.lnkInfraCheck').data('index',1).trigger('click');
        // console.log(tr.find('.lnkInfraCheck').data('index'));
    }
}
function pinKanbanItens(this_, id_demanda) {
    var _this = $(this_);
    var _parent = _this.closest('.kanban-board');
    var _hasActive = _this.hasClass('newLink_active');
    var source = _parent.data('id');
    var value = jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+id_demanda+"`] | [0]");
    var item = getKanbanItem(value);
    var order = (_hasActive) ? -1 : 0;

    kanbanAtividades.removeElement(item.id);
    kanbanAtividades.addElement(source, item, order);

    if (!_hasActive) {
        $('.kanban-container').animate({scrollTop: 0}, 500, function() {
            $('.kanban-item[data-eid="_id_'+id_demanda+'"] .kanban-pinboard a').addClass('newLink_active').attr('onmouseover', 'return infraTooltipMostrar(\'Remover do topo\')');
            setStoreOrderKanbanItens();
        });
    } else {
        $('.kanban-item[data-eid="_id_'+id_demanda+'"] .kanban-pinboard a').removeClass('newLink_active').attr('onmouseover', 'return infraTooltipMostrar(\'Fixar no topo\')');
        setStoreOrderKanbanItens();
    }
    infraTooltipOcultar();
}
function cancelMoveKanbanItens() {
    var item = kanbanAtividadesMoving;
    if (item && $('#kanbanAtivPanel').is(':visible')) {
        var value = jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+item.id_demanda+"`] | [0]");
        kanbanAtividades.removeElement(item.id);
        kanbanAtividades.addElement(item.source, getKanbanItem(value), 0);
    }
}
function getKanbanItem(value) {
    var classes = [];
    if (typeof value.etiquetas !== 'undefined' && value.etiquetas !== null) {
        $.each(value.etiquetas, function (i, v) { 
            var tag = 'tagKanName_'+removeAcentos(v).replace(/\ /g, '').toLowerCase(); 
                classes.push(tag);
        });
    }
    var tagUser = (value.id_user != 0) ? 'tagKanName_'+removeAcentos(value.apelido).replace(/\ /g, '').toLowerCase() : 'tagKanName_naoatribuido'; 
        classes.push(tagUser);
        classes.push('tagKanName_'+removeAcentos(value.sigla_unidade).replace(/\ /g, '').toLowerCase());
    if (value.id_user != 0 && value.id_user != parseInt(arrayConfigAtividades.perfil.id_user) && checkCapacidade('only_self_atividades')) {
        classes.push('tagKanban_notmove');
    }
    var tagDate = getDatesPreview(getConfigDateAtiv(value));

    var check_ispaused = (typeof value.data_retomada !== 'undefined' && value.data_retomada !== null && value.data_retomada == '0000-00-00 00:00:00') ? true : false;
    var checkConfigAtiv = jmespath.search(arrayConfigAtividades.atividades, "[?id_atividade==`"+value.id_atividade+"`] | [0].config.desativa_produtividade");

    var btnPause = (!checkConfigAtiv && value.data_inicio != '0000-00-00 00:00:00' && value.data_entrega == '0000-00-00 00:00:00' && checkCapacidade('pause_atividade') && (!checkCapacidade('only_self_atividades') || value.id_user == parseInt(arrayConfigAtividades.perfil.id_user) && checkCapacidade('only_self_atividades')) )
                ?   '<span class="info_dates_pause info_noclick" style="display:block; padding: 0;opacity: 1;">'+
                    '   <a class="newLink datePausado" onclick="parent.pauseAtividade('+value.id_demanda+')">'+
                    '       <i class="fas fa-'+(check_ispaused ? 'play' : 'pause')+'-circle '+(check_ispaused ? 'azulColor' : 'laranjaColor')+'" style="padding-right: 3px;"></i>'+
                    '       '+(check_ispaused ? __.Retomar+' '+__.demanda : 'Inserir '+__.paralisacao)+
                    '   </a> '+
                    '</span>'
                : '';

    var timerAtiv = (value.data_inicio != '0000-00-00 00:00:00' && value.data_entrega == '0000-00-00 00:00:00')
                ? getTagTempoDecorridoAtiv(value)
                : (value.data_entrega != '0000-00-00 00:00:00' && value.data_avaliacao == '0000-00-00 00:00:00') 
                    ? getTagTempoDespendidoAtiv(value)
                    : '';

    var iconAtivEditHtml = actionsAtividade(value.id_demanda, 'icon');
    var btnActionAtiv = (iconAtivEditHtml && iconAtivEditHtml.hasOwnProperty('icon')) 
                ?   '<span class="info_dates_extend info_noclick" style="display:block; padding: 0;opacity: 1;">'+
                    '   <a class="newLink" style="font-size: 9pt;" onclick="parent.actionsAtividade('+value.id_demanda+')">'+
                    '       <i class="'+actionsAtividade(value.id_demanda, 'icon').icon+'" style="padding-right: 3px;"></i>'+
                    '       '+actionsAtividade(value.id_demanda, 'icon').name+
                    '   </a>'+
                    '</span>'
                : '';
            

    var btnExtend = (value.data_inicio != '0000-00-00 00:00:00' && value.data_entrega == '0000-00-00 00:00:00' && checkCapacidade('extend_atividade') && (!checkCapacidade('only_self_atividades') || value.id_user == parseInt(arrayConfigAtividades.perfil.id_user) && checkCapacidade('only_self_atividades')) )
                ?   '<span class="info_dates_extend info_noclick" style="display:block; padding: 0;opacity: 1;">'+
                    '   <a class="newLink dateExtend" onclick="parent.extendAtividade('+value.id_demanda+')">'+
                    '      <i class="fas fa-retweet azulColor" style="padding-right: 3px;"></i>'+
                    '      '+__.Prorrogar+' '+__.demanda+
                    '   </a>'+
                    '</span>'
                : '';

    var btnVariation = (value.data_inicio != '0000-00-00 00:00:00' && value.data_avaliacao == '0000-00-00 00:00:00' && (checkCapacidade('variation_atividade') || checkCapacidade('type_atividade')) && (!checkCapacidade('only_self_atividades') || value.id_user == parseInt(arrayConfigAtividades.perfil.id_user) && checkCapacidade('only_self_atividades')) )
                ?   '<span class="info_dates_extend info_noclick" style="display:block; padding: 0;opacity: 1;">'+
                    '   <a class="newLink dateExtend" onclick="parent.variationAtividade('+value.id_demanda+')">'+
                    '      <i class="fas fa-'+(value.tempo_pactuado == 0 ? 'clipboard-list' : 'graduation-cap')+' azulColor" style="padding-right: 3px;"></i>'+
                    '      '+(value.tempo_pactuado == 0 ? 'Atribuir atividade' : 'Alterar '+__.complexidade)+
                    '   </a>'+
                    '</span>'
                : '';

    var tempoPactuado = (value.tempo_pactuado == 0) ? 'N\u00E3o pactuado' : decimalHourToMinute(value.tempo_pactuado)+' '+(value.tempo_pactuado > 1 ? 'horas' : 'hora');
    var tagPacto =  '<span class="info_tags_follow info_tags_pacto">'+
                    '   <span data-colortag="#bfd5e8" style="background-color: #eef4f9;" class="tag_text tagTableText_isaac" title="'+value.tempo_pactuado+' '+(value.tempo_pactuado > 1 ? 'horas' : 'hora')+'">'+
                    '       <i data-colortag="#406987" class="fas fa-handshake" style="font-size: 90%; margin: 0px 2px; color: #406987;"></i>'+
                    '       '+tempoPactuado+
                    '   </span>'+
                    '</span>';

    var infoAtiv =  '<span class="info_ativ info_noclick" style="display:block; padding: 0;opacity: 1;">'+
                    '   <a class="newLink" onclick="parent.infoAtividade('+value.id_demanda+')">'+
                    '      <i class="fas fa-info-circle azulColor" style="padding-right: 3px;"></i>'+
                    '      Informa\u00E7\u00F5es '+__.da_demanda+''+
                    '   </a>'+
                    '</span>';

    var obsGerencial = (value && value.observacao_gerencial !== null && value.observacao_gerencial != '') 
                    ? '<span class="inlineAlert"><i class="fas fa-comment-alt" style="color: #7baaf7;"></i> '+value.observacao_gerencial+'</span>'
                    : '';
    var obsTecnica = (value && value.observacao_tecnica !== null && value.observacao_tecnica != '') 
                    ? '<span class="inlineAlert"><i class="fas fa-reply-all" style="color: #7baaf7;"></i> '+value.observacao_tecnica+'</span>'
                    : '';

    var pinBoard = '<span style="float: right;margin: -5px -10px 0 0;" class="kanban-pinboard"><a class="newLink info_noclick '+(getPinKanbanItem(value.id_demanda) ? 'newLink_active' : '')+'" onclick="pinKanbanItens(this, '+value.id_demanda+')" onmouseover="return infraTooltipMostrar(\''+(getPinKanbanItem(value.id_demanda) ? 'Remover do topo' : 'Fixar no topo')+'\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-thumbtack cinzaColor"></i></a></span>';
                    
    var checklist = getInfoAtividadeChecklist(value, 'actions');

    if (tagDate != '') { classes.push('tagKanName_'+$(tagDate).data('tagname')) }
    var item = {
        id: "_id_"+value.id_demanda,
        title:  pinBoard+
                '<div>'+(value.assunto.length > 50 ? value.assunto.replace(/^(.{50}[^\s]*).*/, "$1")+'...' : value.assunto)+'</div>'+
                '<sub title="'+getTitleDialogBox(value, true)+'">'+
                '<div style="margin: 0 0 8px 0;" class="info_noclick">'+getHtmlLinkRequisicao(value, true)+'</div>'+
                getTitleDialogBox(value)+
                '</sub>'+
                obsGerencial+
                obsTecnica+
                (value.etiquetas !== null && value.etiquetas.length > 0 ? '<span class="info_tags_follow" style="float: right;">'+$.map(value.etiquetas, function (i) { return $(getHtmlEtiqueta(i, 'ativ'))[0].outerHTML }).join('')+'</span>' : '')+
                '<span class="info_tags_follow">'+getHtmlEtiquetaUnidade(value)+tagPacto+'</span>'+
                '<span class="info_dates_fav" style="display: block; margin: 10px 0;">'+timerAtiv+tagDate+'</span>'+
                btnActionAtiv+
                btnPause+
                btnExtend+
                btnVariation+
                infoAtiv+
                checklist,
        click: function(el) {
            var checkOver = ($(el).find('.info_noclick:hover').length > 0) ? $(el).find('.info_noclick:hover') : false;
            if (!dialogBoxPro && !checkOver) {
                // infoAtividade(value.id_demanda);
            }
        },
        class: classes
    };
    return item;
}
function checklistOpen(this_) {
    var _this = $(this_);
    _this.closest('.info_checklist_btn').hide();
    _this.closest('.kanban-item').find('.info_checklist').show().find('.checklist_edit').trigger('click');

}
function checklistToggle(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.info_checklist');
    var itens = _parent.find('.info_checklist_itens');
        itens.toggle();
        _this.find('i').toggleClass('fa-chevron-down fa-chevron-right');
}
function checklistEdit(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.info_checklist');
        _parent.toggleClass('edit');
    var itens = _parent.find('.info_checklist_itens');
    if (!_parent.hasClass('edit')) {
        itens.sortable('destroy');
        itens.find('.label_name').prop('contenteditable',false);
    } else {
        itens.sortable({
            items: '.info_checklist_item',
            cursor: 'grabbing',
            handle: '.checklist_order',
            forceHelperSize: true,
            opacity: 0.5,
            axis: 'y',
            dropOnEmpty: false,
            update: function(event, ui) {
                console.log(event, ui, this);
                var list_ordem = [];
                $(this).find('.info_checklist_item').each(function(i){
                    $(this).attr('data-ordem',i);
                    list_ordem.push({id_checklist: $(this).data('id-checklist'), ordem: i});
                });
                updateChecklistOrder(list_ordem, $(this).data('id-demanda'));
                $(this).closest('.info_checklist').find('.checklist_edit i').attr('class','fas fa-sync-alt fa-spin azulColor');
            }
        });
    }
}
function updateChecklistOrder(list_ordem, id_demanda) {
    if (checkCapacidade('update_checklist_all')) {
        var action = 'update_checklist';
        var param = {
            action: action,
            mode: 'order',
            list_ordem: list_ordem,
            id_demanda: id_demanda
        };
        getServerAtividades(param, action);
    }
}
function updateProgressChecklist(id_checklist) {
    var target = ($('#ifrArvore').length > 0) ? $('#ifrArvore').contents() : $('body');
    var item = (target.find('.info_checklist_item[data-id-checklist="'+id_checklist+'"]').length > 0) 
                ? target.find('.info_checklist_item[data-id-checklist="'+id_checklist+'"]')
                : target.find('.info_checklist_item').first();
    var _parent = item.closest('.kanban-item');
    var value = _parent.find('.info_checklist_item.checklist_checked').length;
    var max = _parent.find('.info_checklist_item').length;
    var progress = _parent.find('.checklist_progress');
        progress.attr('data-valuenow',value).attr('data-max',max);
        progress.progressbar({
            value: value,
            max: max
        });
        if (progress.find('.ui-progressbar-value').length > 1) { progress.find('.ui-progressbar-value').eq(0).remove() }
}
function checklistUpdate(this_, mode, data = false, param = false) {
    if (mode == 'send') {
        var _this = $(this_);
        var _parent = _this.closest('.info_checklist_item');
        var data_this = _parent.data();
        var value = jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+data_this.idDemanda+"`] | [0]");
        var _parent_list = _this.closest('.info_checklist');
        if (_parent_list.hasClass('edit')) {
            _this.find('.label_name').prop('contenteditable',true).focus();
        } else {
            if (value.data_inicio == '0000-00-00 00:00:00' && !checkCapacidade('update_checklist_all')) {
                confirmaBoxPro( __.A_demanda+' ainda n\u00E3o foi '+getNameGenre('demanda', 'iniciado', 'iniciada')+'. Deseja iniciar agora?', function(){ startAtividade(data_this.idDemanda) }, 'Iniciar');
            } else {
                var checked = _parent.hasClass('checklist_checked');
                var action = 'update_checklist';
                var param = {
                    action: action,
                    mode: 'check',
                    checked: checked,
                    id_checklist: data_this.idChecklist,
                    id_demanda: data_this.idDemanda
                };
                getServerAtividades(param, action);
                _parent.find('.label_item i').attr('class','fas fa-sync-alt fa-spin');
            }
        }
    } else if (mode == 'update') {
        var target = ($('#ifrArvore').length > 0) ? $('#ifrArvore').contents() : $('body');
        loadingButtonConfirm(false);
        if (param.mode == 'check') {
            var item = target.find('.info_checklist_item[data-id-checklist="'+param.id_checklist+'"]');
            if (item.hasClass('checklist_checked')) {
                item.removeClass('checklist_checked').find('.label_item i').attr('class','far fa-square').end().find('.checklist_date').text('').attr('data-date-fim','0000-00-00 00:00:00');
            } else {
                item.addClass('checklist_checked').find('.label_item i').attr('class','fas fa-check-square').end().find('.checklist_date').text(getDateSemantic({date: data.data_fim}).dateref).attr('data-date-fim',data.data_fim);
            }
            updateProgressChecklist(param.id_checklist);
        } else if (param.mode == 'order') {
            var checklist = target.find('.info_checklist[data-id-demanda="'+param.id_demanda+'"]');
            if (data.update_all) {
                checklist.find('.checklist_edit i').attr('class', 'fas fa-edit azulColor');
            } else {
                checklist.find('.checklist_edit i').attr('class', 'fas fa-exclamation-circle vermelhoColor');
            }
        } else if (param.mode == 'remove') {
            var item = target.find('.info_checklist_item[data-id-checklist="'+param.id_checklist+'"]');
                item.slideUp('slow', function() {
                    $(this).remove();
                    setTimeout(function() {
                        updateProgressChecklist(param.id_checklist);
                    }, 500);
                });
        } else if (param.mode == 'rename') {
            var item = target.find('.info_checklist_item[data-id-checklist="'+param.id_checklist+'"]');
            if (item.hasClass('checklist_checked')) {
                item.find('.label_item i').attr('class','fas fa-check-square');
            } else {
                item.find('.label_item i').attr('class','far fa-square');
            }
            var itens = item.closest('.info_checklist').find('.info_checklist_item');
            var iten_num = itens.index(item)+1;
                iten_num = (iten_num > itens.length-1) ? 0 : iten_num;
                console.log(iten_num);
            itens.eq(iten_num).find('.label_name').prop('contenteditable',true).focus();
        } else if (param.mode == 'new') {
            var checklist = target.find('.info_checklist[data-id-demanda="'+param.id_demanda+'"]');
            checklist.find('.checklist_new i').attr('class', 'fas fa-plus-circle azulColor');
            var htmlItem =  '   <span class="info_checklist_item" data-id-checklist="'+data.id_checklist+'" data-id-demanda="'+param.id_demanda+'" data-ordem="999" data-old-value="Novo Item">'+
                            '       <span class="label_item" onkeypress="if (event.which == 13) { parent.checklistUpdate(this, \'rename\'); return false; }" onclick="parent.checklistUpdate(this, \'send\')" style="cursor:pointer" >'+
                            '           <i class="far fa-square" style="color: #406987; margin-right: 3px; cursor: pointer; font-size: 12pt;"></i> '+
                            '           <span class="label_name" '+(checkCapacidade('update_checklist_all') ? 'onblur="parent.checklistUpdate(this, \'rename\');"' : '')+' contenteditable="true">Novo Item</span>'+
                            '       </span>'+
                            '       <span class="label_options">'+
                            '           <span class="checklist_remove" onclick="parent.checklistUpdate(this, \'remove\')" style="cursor:pointer"><i class="far fa-trash-alt cinzaColor" style="font-size: 10pt;"></i></span>'+
                            '           <span class="checklist_order" ><i class="fas fa-bars cinzaColor" style="font-size: 12pt;"></i></span>'+
                            '           <span class="checklist_date" data-date-fim="0000-00-00 00:00:00" onmouseover="" onmouseout="return infraTooltipOcultar();"></span>'+
                            '       </span>'+
                            '   </span>';
                checklist.find('.info_checklist_itens').append(htmlItem);
                var label = checklist.find('.info_checklist_item').last().find('.label_name');
                setTimeout(function() {
                    label.focus();
                }, 100);
        }
        checklistUpdateArray(param.id_demanda, data.checklist);
    } else if (mode == 'remove') {
        var _this = $(this_);
        var _parent = _this.closest('.info_checklist_item');
        var data_this = _parent.data();
        confirmaBoxPro('Tem certeza que deseja excluir este item?', function(){
            var action = 'update_checklist';
            var param = {
                action: action,
                mode: 'remove',
                id_checklist: data_this.idChecklist,
                id_demanda: data_this.idDemanda
            };
            getServerAtividades(param, action);
            _this.find('i').attr('class','fas fa-sync-alt fa-spin cinzaColor');
        }, 'Excluir');
    } else if (mode == 'rename') {
        var _this = $(this_);
        var _parent = _this.closest('.info_checklist_item');
        var _parent_list = _this.closest('.info_checklist');
        var data_this = _parent.data();
        var text = _this.text().trim();
        if (_parent_list.hasClass('edit') && (data_this.oldValue != text)) {
            var action = 'update_checklist';
            var param = {
                action: action,
                mode: 'rename',
                nome_checklist: text,
                id_checklist: data_this.idChecklist,
                id_demanda: data_this.idDemanda
            };
            getServerAtividades(param, action);
            _parent.find('.label_item i').attr('class','fas fa-sync-alt fa-spin');
            _parent.find('.label_name').text(text)
            _parent.data('old-value', text);
        }
    } else if (mode == 'new') {
        var _this = $(this_);
        var _parent = _this.closest('.info_checklist');
        var data_this = _parent.data();
        var action = 'update_checklist';
        var param = {
            action: action,
            mode: 'new',
            id_demanda: data_this.idDemanda
        };
        getServerAtividades(param, action);
        _this.find('i').attr('class','fas fa-sync-alt fa-spin');
    }
}
function checklistUpdateArray(targetID_demanda, dataChecklist) {
        arrayAtividadesProcPro = ($('#ifrArvore').length > 0) ? checklistUpdateArrayAtiv(arrayAtividadesProcPro, targetID_demanda, dataChecklist) : arrayAtividadesProcPro;
        arrayAtividadesPro = checklistUpdateArrayAtiv(arrayAtividadesPro, targetID_demanda, dataChecklist);
}
function checklistUpdateArrayAtiv(arrayAtividades, targetID_demanda, dataChecklist) {
    var demandaIndex = arrayAtividades.findIndex((obj => obj.id_demanda == targetID_demanda));
        arrayAtividades[demandaIndex].checklist = dataChecklist;
    return arrayAtividades;
}
function checkAtivProdutividade(this_, value) {
    var _this = $(this_);
    var _parent = _this.closest('.ui-dialog');
    if (_parent.find('.info_alerta_produtividade').length > 0) {
        confirmaFraseBoxPro('O tempo despendido para '+__.esta_demanda+' est\u00E1 abaixo do esperado para '+__.a_atividade+'. <br><br> Tempos despendidos anormais, fora do m\u00EDnimo esperado, poder\u00E3o motivar a <b style="font-weight: bold;">REVIS\u00C3O</b> dos atuais tempos pactuados desta unidade. <br><br> Deseja continuar?', 'SIM', function(){ 
            if (checkAtivChecklist(this_, value)) {
                sendCompleteAtividade(this_, value);
            }
        });
        return false;
    } else {
        return true;
    }
}
function checkAtivChecklist(this_, value) {
    var checklist = value.checklist;
    if (checklist && checklist.length > 0) {
        var _this = $(this_);
        var checklist_div = _this.find('.info_checklist');
        var totalItens = checklist_div.find('.info_checklist_itens .info_checklist_item').length;
        var checkedItens = checklist_div.find('.info_checklist_itens .info_checklist_item.checklist_checked').length;
        if (totalItens == checkedItens) {
            return true;
        } else {
            confirmaFraseBoxPro('Existem itens do <b style="font-weight: bold;">CHECKLIST</b> pendentes de conclus\u00E3o. Deseja continuar?', 'SIM', function(){ sendCompleteAtividade(this_, value) });
            return false;
        }
    } else {
        return true;
    }
}
function getKanbanUserPriority(this_, mode) {
    var _this = $(this_);
    var _parent = _this.closest('#kanbanAtivPanel');
    if (mode == 'add') {
        _parent.find('.kanban-board').addClass('kanban-priority').each(function(){
            var data = $(this).data();
            if (data.id == '_niniciadas') {
                $(this).find('.kanban-item:visible').each(function(index, value){
                    var priority = index+1;
                    var htmlPriority = '<div class="kanban-item-priority '+(!checkCapacidade('update_prioridades') ? 'disabled' : '')+'" data-priority="'+priority+'"><span>'+priority+'</span></div>';
                    $(this).find('.kanban-item-priority').remove();
                    $(this).prepend(htmlPriority);
                });
            }
        });
    } else if (mode == 'remove') {
        $('#kanbanAtivPanel').find('.kanban-board').removeClass('kanban-priority');
        _parent.find('.kanban-item-priority').remove();
    }
    console.log(mode);
}
function getHtmlKanbanUserPriority() {
    var html =  '<div id="filterTagKanban_user" style="margin-top: 10px;">'+
                '   <span style="background: #fffcd7; padding: 5px; border-radius: 5px;"> '+
                '       <i class="fas fa-info-circle azulColor" style="margin: 0 5px;"></i> '+
                '       Dica: Priorize '+__.as_demandas+' a serem '+getNameGenre('demanda', 'executados', 'executadas')+'! Utilize o \u00EDcone <i class="fas fa-bars cinzaColor" style="margin: 0 5px;"></i> para arrastar os cart\u00F5es para cima ou para baixo'+
                '   </span>'+
                '</div>';
    return html;
}
function getKanbanItensAtividade(listAtividades) {
    var boards = [];
    $.each(listAtividades, function (index, value) {
        var itens = getKanbanItem(value);
        boards.push(itens);
    });
    return boards;
}
function getGanttAtividades(bar_class = false) {
    $('#ganttAtivPanel').html('').show();
    var task = [];
    var dataFall = '';
    var listAtividades = jmespath.search(arrayAtividadesPro, "reverse(@)");
    if (listAtividades.length > 0) {
        var viewModeGantt = (getOptionsPro('ganttAtividadesView')) ? getOptionsPro('ganttAtividadesView') : 'Week';
        $.each(listAtividades, function (index, value) {
            var distribuicao = moment(value.data_distribuicao, "YYYY-MM-DD HH:mm:ss");
            var prazo = moment(value.prazo_entrega, "YYYY-MM-DD HH:mm:ss");
            var entrega = moment(value.data_entrega, "YYYY-MM-DD HH:mm:ss");
            var customClass = ( moment() <= prazo && moment() >= distribuicao ) ? 'bar-em-execucao' : 'bar-fora-execucao';   
                customClass = ( value.data_inicio != '0000-00-00 00:00:00' && prazo > moment() ) ? 'bar-iniciado' : customClass;
                customClass = ( value.data_inicio != '0000-00-00 00:00:00' && prazo < moment() ) ? 'bar-ematraso' : customClass;
                customClass = ( value.data_inicio == '0000-00-00 00:00:00' && prazo < moment() ) ? 'bar-nao-iniciado' : customClass;
                customClass = ( value.data_conclusao != '0000-00-00 00:00:00' && entrega <= prazo ) ? 'bar-concluido-noprazo' : customClass;
                customClass = ( value.data_conclusao != '0000-00-00 00:00:00' && entrega > prazo ) ? 'bar-concluido-foraprazo' : customClass;
                customClass = ( value.data_conclusao == '0000-00-00 00:00:00' && prazo < moment() ) ? 'bar-ematraso' : customClass;
            var dependencia_array = (typeof value.id_vinculacao !== 'undefined' && value.id_vinculacao !== null && value.id_vinculacao.indexOf('_') !== -1) ? value.id_vinculacao.split('_') : false;
            var dependencia = (dependencia_array) 
                            ? (parseInt(dependencia_array[1]) != 0) ? (dependencia_array[0]+'_'+(parseInt(dependencia_array[1])-1).toString()) : false
                            : false;
                dependencia = (dependencia) ? jmespath.search(listAtividades,"[?id_vinculacao=='"+dependencia+"'] | [0].id_demanda") : false;
                dependencia = (dependencia && dependencia !== null) ? dependencia.toString() : '';
            // console.log(value.id_vinculacao, dependencia_array, dependencia, dependencia_array[0], parseInt(dependencia_array[1])-1, (parseInt(dependencia_array[1])-1).toString());
            var taskAtividade = {
                                id: value.id_demanda.toString(),
                                name: (value.assunto.length > 50 ? value.assunto.replace(/^(.{50}[^\s]*).*/, "$1")+'...' : value.assunto),
                                start: distribuicao.format("YYYY-MM-DD"),
                                end: prazo.format("YYYY-MM-DD"),
                                progress: (value.data_entrega != '0000-00-00 00:00:00') 
                                            ? 100 
                                            : (value.data_inicio != '0000-00-00 00:00:00') ? 25 : 0,
                                dependencies: dependencia,
                                custom_class: customClass
                            };
            if (!bar_class || (bar_class && bar_class == customClass)) {
                task.push(taskAtividade);
            }
        });
        if (task.length > 0) {
            var gantt = new Gantt("#ganttAtivPanel", task,{
                header_height: 50,
                column_width: 10,
                step: 24,
                language: 'en',
                language: 'ptBr',
                view_modes: ['Day', 'Week', 'Month'],
                bar_height: 15,
                bar_corner_radius: 3,
                arrow_curve: 5,
                padding: 18,
                edit_task: false,
                view_mode: viewModeGantt,   
                date_format: 'YYYY-MM-DD',
                custom_popup_html: function(task) {
                    var value = jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+task.id+"`] | [0]");
                    var htmlActionsAtividade = actionsAtividade(value.id_demanda, 'icon');
                    var html = '<div class="details-container seiProForm">'+
                    '   <table class="tableInfo tableLine">'+
                    '      <tr>'+
                    '           <td colspan="2">'+
                    '               <h5><i class="iconPopup fas fa-comment-dots cinzaColor"></i> '+
                    '                   <span class="boxInfo" style="font-size: 11pt;font-weight: bold;width: 85%;display: inline-block;">'+value.assunto+'</span>'+
                    '                   <a style="float: right; margin: -4px -4px 0 0; padding: 5px;" onclick="ganttAtividades.hide_popup()"><i class="far fa-times-circle cinzaColor"></i></a>'+
                    '               </h5>'+
                    '           </td>'+
                    '      </tr>'+
                    '   '+getInfoAtividade(value)+
                    '      <tr style="background: #f5f5f5;">'+
                    '           <td style="vertical-align: middle; padding: 0 10px;" colspan="2">'+
                    '               <p>'+
                    '                   <span class="boxInfo">'+
                    '                       <a class="ui-button ui-corner-all ui-widget" style="color: #2b2b2b; text-decoration: none; float: right;" onclick="actionsAtividade('+value.id_demanda+')">'+
                    '                           <i style="margin-right: 3px; color: #8a8a8a;" class="'+htmlActionsAtividade.icon+'"></i>'+
                    '                           '+htmlActionsAtividade.name+
                    '                       </a>'+
                    '                   </span>'+
                    '               </p>'+
                    '           </td>'+
                    '      </tr>'+
                    '   </table>'+
                    '</div>';
                return html;
                },
                on_click: function (task) {
                    console.log(task);
                }
            });
            ganttAtividades = gantt;
            if (!getOptionsPro('panelHeight_atividadesGanttPro') && $('#ganttAtivPanel').height() > 800) { setOptionsPro('panelHeight_atividadesGanttPro', 800) }
            $('.gantt-container').addClass('tabelaPanelScroll');
            initPanelResize('.gantt-container', 'atividadesGanttPro');
        } else {
            dataFall = '<div class="gantt-container dataFallback" data-text="Nenhum dado dispon\u00EDvel"></div>';
        }
        var btnGroupView =  '<div style="position: absolute; right: 0; z-index: 99;">'+
                            '   <div class="btn-group" role="group" style="float: right;">'+
                            '       <button type="button" data-value="Day" class="btn btn-sm btn-light '+(getOptionsPro('ganttAtividadesView') == 'Day' ? 'active' : '')+'">Dia</button>'+
                            '       <button type="button" data-value="Week" class="btn btn-sm btn-light '+(getOptionsPro('ganttAtividadesView') == 'Week' || !getOptionsPro('ganttAtividadesView') ? 'active' : '')+'">Semana</button>'+
                            '       <button type="button" data-value="Month" class="btn btn-sm btn-light '+(getOptionsPro('ganttAtividadesView') == 'Month' ? 'active' : '')+'">M\u00EAs</button>'+
                            '   </div>'+
                            '</div>';
        var legendFilter =  '<div class="filterGanttTag">'+
                            '   '+getFilterGanttTag(ganttAtividades, 'bar-nao-iniciado', 'Fora do prazo', bar_class, 'atividade')+
                            '   '+getFilterGanttTag(ganttAtividades, 'bar-em-execucao', 'No prazo', bar_class, 'atividade')+
                            '   '+getFilterGanttTag(ganttAtividades, 'bar-iniciado', 'Iniciada', bar_class, 'atividade')+
                            '   '+getFilterGanttTag(ganttAtividades, 'bar-ematraso', 'Iniciada em atraso', bar_class, 'atividade')+
                            '   '+getFilterGanttTag(ganttAtividades, 'bar-concluido-noprazo', 'Conclu\u00EDda no prazo', bar_class, 'atividade')+
                            '   '+getFilterGanttTag(ganttAtividades, 'bar-concluido-foraprazo', 'Conclu\u00EDda fora do prazo', bar_class, 'atividade')+
                            '</div>';
            $('#ganttAtivPanel').css('max-width',($('#atividadesProDiv').width()-20)).prepend(legendFilter+btnGroupView+dataFall);

        if (ganttAtividades && ganttAtividades.bars.length > 0) {
            var scrollLeft = ganttAtividades.bars[0].x-20;
            var windowDiv = $('#ganttAtivPanel').find('.gantt-container');
            windowDiv.animate({scrollLeft: scrollLeft}, 500);

            var popupAtiv = $('#ganttAtivPanel').find('.popup-wrapper');
            if (popupAtiv.length > 0) {
                var observerPopupAtiv = new MutationObserver(function(mutations) {
                    var _this = $(mutations[0].target);
                    var _parent = _this.closest('.gantt-container');
                    if (_this.is(':visible')) {
                        _parent.attr('style', function(i,s) { return (s || '') + 'position: relative !important;' });
                        _parent.find('.ui-resizable-handle').hide();
                    } else {
                        _parent.attr('style', function(i,s) { return (s || '') + 'position: initial !important;' });
                        _parent.find('.ui-resizable-handle').show();
                    }
                });
                    observerPopupAtiv.observe(popupAtiv.get(0), {
                            attributes: true
                        });
            }
        }
        $("#ganttAtivPanel .btn-group").on("click", "button", function() {
            $btn = $(this);
            var mode = $btn.data('value');
            $btn.parent().find('button').removeClass('active'); 
            $btn.addClass('active');
            ganttAtividades.change_view_mode(mode);
            setOptionsPro('ganttAtividadesView', mode);
        });
    } else {
        $('#ganttAtivPanel').html('<div class="dataFallback" data-text="Nenhum dado dispon\u00EDvel"></div>').show();
    }
}
function getFilterGanttTag(gantt, bar_class, text, actived, mode) {
    var checkTasks = jmespath.search(gantt.tasks, "[?contains(custom_class, '"+bar_class+"')]");
    var counter = (checkTasks !== null && checkTasks.length > 0 && !actived) ? '<span class="counter">'+checkTasks.length+'</span>' : '';
    var html =  '    <span title="'+text+' ('+(checkTasks !== null ? checkTasks.length : '')+')" class="bar-wrapper '+bar_class+' '+(bar_class == actived ? 'active' : (actived) ? 'inative' : '')+'" data-bar="'+bar_class+'" data-mode="'+mode+'" onclick="setFilterGanttTag(this)">'+
                '        <span class="bar">'+
                '           '+counter+
                '            <g class="bar-progress"></g>'+
                '        </span><span class="text">'+text+'</span>'+
                '    </span>';
    return ((checkTasks !== null && checkTasks.length > 0 && !actived) || actived) ? html : '';
    // return (checkTasks !== null && checkTasks.length > 0) ? html : '';
}
function setFilterGanttTag(this_) {
    var _this = $(this_);
    var active = _this.hasClass('active');
    var data = _this.data();
    if (!active) {
        if (data.mode == 'atividade') {
            getGanttAtividades(data.bar);
            setOptionsPro('ganttAtividadesFilter', data.bar);
        } else if (data.mode == 'afastamento') {
            getGanttAfastamento(data.bar);
            setOptionsPro('ganttAfastamentosFilter', data.bar);
        }
    } else {
        if (data.mode == 'atividade') {
            getGanttAtividades();
            removeOptionsPro('ganttAtividadesFilter');
        } else if (data.mode == 'afastamento') {
            getGanttAfastamento();
            removeOptionsPro('ganttAfastamentosFilter');
        }
    }
}
function getChartAtividades(bar_class = false) {
    var panelChart = $('#chartAtivPanel');
        panelChart.show();
        panelChart.find('select').chosen({
            placeholder_text_single: ' ',
            no_results_text: 'Nenhum resultado encontrado'
        });
    if (panelChart.is(':visible')) { setTimeout(function(){ initGetChartDemandas() }, 500); }
}
function initGetChartDemandas(TimeOut = 9000) {
    if (TimeOut <= 0) { return; }
    if ($('.chartAtivPanelDiv').is(':visible')) {
        var param = {
                        id_user: $('#selectChartUserAtiv').val(), 
                        id_unidade: $('#selectChartUnidadeAtiv').val()
                    };
        getChartDemandas(param);
    } else {
        setTimeout(function(){ 
            initGetChartDemandas(TimeOut - 100); 
            console.log('Reload initGetChartDemandas'); 
        }, 500);
    }
}
// INICIA FUNCOES DO PAINEL DE GESTAO DE ATIVIDADES
function initFunctionsPanelAtiv(TimeOut = 9000) {
    if (TimeOut <= 0) { return; }
    if (typeof $('.atividadeTagsPro').tagsInput !== 'undefined' && 
        typeof $('.tabelaPanelScroll').resizable !== 'undefined' && 
        typeof $('.ui-autocomplete-input').autocomplete !== 'undefined') {

        initChosenReplace('panel');

        var tabelaAtiv = $('#tabelaAtivPanel table.tableAtividades');

        $('.atividadeTagsPro').tagsInput({
          interactive: true,
          placeholder: 'Adicionar etiqueta',
          minChars: 2,
          maxChars: 100,
          limit: 8,
          autocomplete_url: '',
          autocomplete: {'source': sugestEtiquetaPro('ativ') },
          hide: true,
          delimiter: [';'],
          unique: true,
          removeWithBackspace: true,
          onAddTag: saveFollowEtiqueta,
          onRemoveTag: saveFollowEtiqueta,
          onChange: saveFollowEtiqueta
        }); 
        
        tabelaAtiv.tablesorter({
            textExtraction: {
              1: function (elem, table, cellIndex) {
                var target = $(elem).find('a').not('.followLink').eq(0);
                var texttip_span = target.find('span').attr('onmouseover');
                    texttip_span = (typeof texttip_span !== 'undefined') ? extractTooltip(texttip_span) : ''; 
                var texttip_i = target.find('i').attr('onmouseover');
                    texttip_i = (typeof texttip_i !== 'undefined') ? extractTooltip(texttip_i) : ''; 
                return target.text().trim()+' '+texttip_span+' '+texttip_i;
              },
              2: function (elem, table, cellIndex) {
                var target = $(elem).find('.dateboxDisplay').eq(0);
                var text_date = target.data('time-sorter');
                return text_date;
              }
            },
            widgets: ["saveSort", "filter"],
            widgetOptions: {
                saveSort: true,
                filter_hideFilters: true,
                filter_columnFilters: true,
                filter_saveFilters: true,
                filter_hideEmpty: true,
                filter_excludeFilter: {}
            },
            sortReset: true,
            headers: {
                0: { sorter: false, filter: false },
                1: { filter: true },
                2: { filter: true },
                3: { filter: true },
                4: { filter: true }
            }
        }).on("sortEnd", function (event, data) {
            checkboxRangerSelectShift();
        }).on("filterEnd", function (event, data) {
            var caption = $(this).find("caption").eq(0);
            var tx = caption.text();
                caption.text(tx.replace(/\d+/g, data.filteredRows));
                $(this).find("tbody > tr:visible > td > input").prop('disabled', false);
                $(this).find("tbody > tr:hidden > td > input").prop('disabled', true);
        });

        var filterAtiv = tabelaAtiv.find('.tablesorter-filter-row').get(0);
        if (typeof filterAtiv !== 'undefined') {
            var observerFilterAtiv = new MutationObserver(function(mutations) {
                var _this = $(mutations[0].target);
                var _parent = _this.closest('table');
                var iconFilter = _parent.find('.filterTablePro button');
                var checkIconFilter = iconFilter.hasClass('active');
                var hideme = _this.hasClass('hideme');
                if (hideme && checkIconFilter) {
                    iconFilter.removeClass('active');
                }
            });
            setTimeout(function(){ 
                var htmlFlashFilterTable =  '<div class="filterTablePro" style="position: absolute;top: 52px;text-align: right;right: 320px;">'+
                                            '   <span class="info_dates_fav" style="margin: 0;">'+
                                            '       <span class="dateboxDisplay tag-remove filterTagClean" onclick="parent.filterTagView(this); $(this).closest(\'table\').trigger(\'filterReset\');" style="display:none; font-size: 9pt;padding: 3px 10px;background-color: #f9fafa;">'+
                                            '           <span class="dateBoxIcon">'+
                                            '               <i class="fas fa-eraser" style="color: #9d9d9d; padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                                            '           </span>'+
                                            '           Limpar Filtros'+
                                            '       </span>'+
                                            '       <span class="dateboxDisplay tagTableText_date_noprazo" data-colortag="#eef4f9" data-tagname="date_noprazo" data-nametag="No prazo" data-type="date" onclick="parent.filterTagView(this)" style="font-size: 9pt;padding: 3px 10px;background-color: #f9fafa;">'+
                                            '           <span class="dateBoxIcon">'+
                                            '               <i class="far fa-clock" style="color: #4285f4; padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                                            '           </span>'+
                                            '           No prazo ('+tabelaAtiv.find('tbody tr.tagTableName_date_noprazo').length+')'+
                                            '       </span>'+
                                            '       <span class="dateboxDisplay tagTableText_date_atrasado" data-colortag="#f9e2e0" data-tagname="date_atrasado" data-nametag="Atrasada" data-type="date" onclick="parent.filterTagView(this)" style="font-size: 9pt;padding: 3px 10px;background-color: #f9fafa;">'+
                                            '           <span class="dateBoxIcon">'+
                                            '               <i class="fas fa-exclamation-triangle vermelhoColor" style="color: #4285f4; padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                                            '           </span>'+
                                            '           Atrasadas ('+tabelaAtiv.find('tbody tr.tagTableName_date_atrasado').length+')'+
                                            '       </span>'+
                                            '       <span class="dateboxDisplay tagTableText_date_entregue" data-colortag="#ddf1dd" data-tagname="date_entregue" data-nametag="Entregue" data-type="date" onclick="parent.filterTagView(this)" style="font-size: 9pt;padding: 3px 10px;background-color: #f9fafa;">'+
                                            '           <span class="dateBoxIcon">'+
                                            '               <i class="fas fa-check-circle verdeColor" style="color: #4285f4; padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                                            '           </span>'+
                                            '           Entregues ('+tabelaAtiv.find('tbody tr.tagTableName_date_entregue').length+')'+
                                            '       </span>'+
                                            '       <span class="dateboxDisplay tagTableText_date_avaliado" data-colortag="#f1ecdd" data-tagname="date_avaliado" data-nametag="Avaliada" data-type="date" onclick="parent.filterTagView(this)" style="font-size: 9pt;padding: 3px 10px;background-color: #f9fafa;">'+
                                            '           <span class="dateBoxIcon">'+
                                            '               <i class="fas fa-star starGold" style="color: #4285f4; padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                                            '           </span>'+
                                            '           Avaliadas ('+tabelaAtiv.find('tbody tr.tagTableName_date_avaliado').length+')'+
                                            '       </span>'+
                                            '   </span>'+
                                            '</div>';

                var htmlFilterAtiv =    '<div class="btn-group filterTablePro" role="group" style="right: 55px;top: 52px;z-index: 99;position: absolute;">'+
                                        '   <button type="button" onclick="downloadTablePro(this)" data-icon="fas fa-download" style="padding: 0.1rem .5rem; font-size: 9pt;" data-value="Baixar" class="btn btn-sm btn-light">'+
                                        '       <i class="fas fa-download" style="padding-right: 3px; cursor: pointer; font-size: 10pt; color: #888;"></i>'+
                                        '       <span class="text">Baixar</span>'+
                                        '   </button>'+
                                        '   <button type="button" onclick="copyTablePro(this)" data-icon="fas fa-copy" style="padding: 0.1rem .5rem; font-size: 9pt;" data-value="Copiar" class="btn btn-sm btn-light">'+
                                        '       <i class="fas fa-copy" style="padding-right: 3px; cursor: pointer; font-size: 10pt; color: #888;"></i>'+
                                        '       <span class="text">Copiar</span>'+
                                        '   </button>'+
                                        '   <button type="button" onclick="filterTablePro(this)" style="padding: 0.1rem .5rem; font-size: 9pt;" data-value="Pesquisar" class="btn btn-sm btn-light '+(tabelaAtiv.find('tr.tablesorter-filter-row').hasClass('hideme') ? '' : 'active')+'">'+
                                        '       <i class="fas fa-search" style="padding-right: 3px; cursor: pointer; font-size: 10pt; color: #888;"></i>'+
                                        '       Pesquisar'+
                                        '   </button>'+
                                        '</div>';
                    tabelaAtiv.find('thead .filterTablePro').remove();
                    tabelaAtiv.find('thead').prepend(htmlFlashFilterTable+htmlFilterAtiv);
                    observerFilterAtiv.observe(filterAtiv, {
                        attributes: true
                    });
            }, 300);
        }

        var tagName = getOptionsPro('filterTag_atividades');
        if (typeof tagName !== 'undefined' && tagName != '') {
            setTimeout(function(){ 
                $('.tableAtividades .tagTableText_'+tagName).eq(0).trigger('click');
            }, 500);
        } else if (tagName == '' && (checkCapacidade('only_self_atividades') )) {
            var tagName_thisUser = removeAcentos(arrayConfigAtividades.perfil.apelido).replace(/\ /g, '').toLowerCase();
            setTimeout(function(){ 
                $('.tableAtividades .tagTableText_'+tagName_thisUser).eq(0).trigger('click');
            }, 500);
        }

        var observerTableAtiv = new MutationObserver(function(mutations, observer) {
            // observer.disconnect();
            var _this = $(mutations[0].target);
            var _parent = _this.closest('table');
            var idsSelected = _parent.find('tr.infraTrMarcada').map(function(){ return $(this).data('index') }).get();
            var iconsCount = {start: [], complete: [], rate: [], send: []};
            
            $.each(arrayAtividadesPro, function(index, value){
                if ($.inArray(value.id_demanda, idsSelected) !== -1 ) {
                    if ((checkCapacidade('edit_atividade') || value.id_user == arrayConfigAtividades.perfil.id_user) && value.data_inicio == '0000-00-00 00:00:00') {
                        iconsCount.start.push({id:value.id_demanda, id_unidade: value.id_unidade});
                    } else if ((checkCapacidade('edit_atividade') || value.id_user == arrayConfigAtividades.perfil.id_user) && value.data_inicio != '0000-00-00 00:00:00' && value.data_entrega == '0000-00-00 00:00:00') {
                        iconsCount.complete.push({id:value.id_demanda, id_unidade: value.id_unidade});
                    } else if ((checkCapacidade('edit_atividade') || value.id_user == arrayConfigAtividades.perfil.id_user) && value.data_inicio != '0000-00-00 00:00:00' && value.data_entrega != '0000-00-00 00:00:00' && value.data_avaliacao == '0000-00-00 00:00:00') {
                        iconsCount.rate.push({id:value.id_demanda, id_unidade: value.id_unidade});
                    } else if ((checkCapacidade('edit_atividade') || value.id_user == arrayConfigAtividades.perfil.id_user) && value.data_inicio != '0000-00-00 00:00:00' && value.data_entrega != '0000-00-00 00:00:00' && value.data_avaliacao != '0000-00-00 00:00:00') {
                        iconsCount.send.push({id:value.id_demanda, id_unidade: value.id_unidade});
                    }
                }
            });
            // console.log(iconsCount);

            $('#atividadesProActions').find('.iconBoxAtividade').data('list',false).find('.fa-layers-counter').text('').hide();
            $('#atividadesProActions').find('.iconBoxAtividade:visible').each(function(){
                if ($(this).hasClass('iconAtividade_start') && iconsCount.start.length != 0) {
                    $(this).data('list',iconsCount.start).find('.fa-layers-counter').text(iconsCount.start.length).show();
                } else if ($(this).hasClass('iconAtividade_complete') && iconsCount.complete.length != 0) {
                    $(this).data('list',iconsCount.complete).find('.fa-layers-counter').text(iconsCount.complete.length).show();
                } else if ($(this).hasClass('iconAtividade_rate') && iconsCount.rate.length != 0) {
                    $(this).data('list',iconsCount.rate).find('.fa-layers-counter').text(iconsCount.rate.length).show();
                } else if ($(this).hasClass('iconAtividade_send') && iconsCount.send.length != 0) {
                    $(this).data('list',iconsCount.send).find('.fa-layers-counter').text(iconsCount.send.length).show();
                } else if ($(this).hasClass('iconAtividade_delete') && iconsCount.start.length != 0) {
                    $(this).data('list',iconsCount.start).find('.fa-layers-counter').text(iconsCount.start.length).show();
                } 
            });
            // console.log('observerTableAtiv');
        });
        setTimeout(function(){ 
            if (tabelaAtiv.length > 0) {
                observerTableAtiv.observe(tabelaAtiv[0], {
                    attributes: true,
                    childList: true,
                    subtree: true
                });
                checkboxRangerSelectShift();
            }
            forcePlaceHoldChosen();
            // dragColumnTable(tabelaAtiv);
        }, 500);

        initPanelResize('#atividadesProDiv .tabelaPanelScroll', 'atividadesPro');
        getInsertIconAtividade();
        checkboxRangerSelectShift();
    } else {
        if (typeof $().tagsInput === 'undefined') { $.getScript((URL_SEIPRO+"js/lib/jquery.tagsinput-revisited.js")) }
        setTimeout(function(){ 
            initFunctionsPanelAtiv(TimeOut - 100); 
            console.log('Reload initFunctionsPanelAtiv'); 
        }, 500);
    }
}
// BOX DE DEMANDA SIMPLIFICADA
function saveAtividadeSimple(id_demanda = 0) {
    var checkPlanos = (typeof arrayConfigAtividades.planos !== 'undefined' && arrayConfigAtividades.planos != 0 && arrayConfigAtividades.planos.length > 0) ? true : false;
    if (!checkPlanos) {
        alertaBoxPro('Error', 'exclamation-triangle', 'Nenhum plano de trabalho ativo!');
    } else {
        var value = (id_demanda != 0) ? jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+id_demanda+"`] | [0]") : false;
        var unidades =  (typeof arrayConfigAtividades.atividades !== 'undefined' && arrayConfigAtividades.atividades != 0 && arrayConfigAtividades.atividades.length > 0) 
                            ? uniqPro(jmespath.search(arrayConfigAtividades.atividades, "[?sigla_unidade].sigla_unidade"))
                            : [];
        var countUnidades = (arrayConfigAtividades.atividades.length > 0) ? unidades.length : 0;
        var unidadesPlanos = (checkPlanos) 
                            ? uniqPro(jmespath.search(arrayConfigAtividades.planos, "[?sigla_unidade].sigla_unidade")) 
                            : [];
        var countUnidadesPlanos = (checkPlanos) ? unidadesPlanos.length : 0;
        var config_unidade = getConfigDadosUnidade((id_demanda != 0 ? value.sigla_unidade: null));
        var dadosIfrArvore = getIfrArvoreDadosProcesso();
        if (value) {
            var dataDistribuicao = moment(value.data_distribuicao, 'YYYY-MM-DD HH:mm:ss').format(config_unidade.hora_format);
            var prazoEntrega = moment(value.prazo_entrega, 'YYYY-MM-DD HH:mm:ss').format(config_unidade.hora_format);
        } else {
            var dt_init = (dadosIfrArvore && dadosIfrArvore.data_documento && dadosIfrArvore.data_documento != '') 
                    ? moment(dadosIfrArvore.data_documento, 'DD/MM/YYYY HH:mm') : moment();
            var hr_init = dt_init.format('HH:mm');
            var dataDistribuicao = dt_init.format(config_unidade.hora_format);
                dataDistribuicao = (moment(hr_init, 'HH:mm') > moment(config_unidade.h_util_fim, 'HH:mm')) 
                    ? moment(dt_init.format('YYYY-MM-DD')+'T'+config_unidade.h_util_fim).add(-1,'hours').format(config_unidade.hora_format)
                    : dataDistribuicao;
                dataDistribuicao = (moment(hr_init, 'HH:mm') < moment(config_unidade.h_util_inicio, 'HH:mm')) 
                        ? moment(dt_init.format('YYYY-MM-DD')+'T'+config_unidade.h_util_inicio).format(config_unidade.hora_format)
                        : dataDistribuicao;
            var prazoEntrega = dt_init.add(1,'hours').format(config_unidade.hora_format);
                prazoEntrega = (moment(hr_init, 'HH:mm') > moment(config_unidade.h_util_fim, 'HH:mm')) 
                    ? moment(dt_init.format('YYYY-MM-DD')+'T'+config_unidade.h_util_fim).format(config_unidade.hora_format)
                    : prazoEntrega;
                prazoEntrega = (moment(hr_init, 'HH:mm') < moment(config_unidade.h_util_inicio, 'HH:mm')) 
                        ? moment(dt_init.format('YYYY-MM-DD')+'T'+config_unidade.h_util_inicio).add(1,'hours').format(config_unidade.hora_format)
                        : prazoEntrega;
        }

        var optionSelectResponsavel = '';
        if (countUnidadesPlanos > 1) {
            $.each(unidadesPlanos, function(index, v){
                var arrayResp = jmespath.search(arrayConfigAtividades.planos, "[?sigla_unidade=='"+v+"'] | [?vigencia==`true`]");
                optionSelectResponsavel += '<optgroup label="'+v+'">';
                optionSelectResponsavel += getOptionsSelectResp(arrayResp, value);
                optionSelectResponsavel += '</optgroup>';
            });
        } else {
            var arrayResp = jmespath.search(arrayConfigAtividades.planos, "[?vigencia==`true`]");
            optionSelectResponsavel += getOptionsSelectResp(arrayResp, value);
        }

        var dadosMultProcessos = (
                                    dadosIfrArvore && 
                                    dadosIfrArvore.processos && 
                                    dadosIfrArvore.processos[0].id_procedimento != dadosIfrArvore.id_procedimento
                                ) 
                                    ? dadosIfrArvore.processos
                                    : getProcessoUnidadePro(true).length > 0
                                        ? getProcessoUnidadePro(true, true) 
                                        : false;    
        var checkProcessoHome = (!value && !dadosIfrArvore && dadosMultProcessos && dadosMultProcessos.length > 0) ? true : false;                 
        var htmlMultProcessos = '';
        if (dadosMultProcessos) {
            htmlMultProcessos += '<div class="listMultProcessos">';
            $.each(dadosMultProcessos, function(index, value){
                htmlMultProcessos +=    '<span class="ativProcessos" data-procedimento="'+value.id_procedimento+'" data-processo="'+value.processo_sei+'">'+
                                        '   <i class="fas fa-folder-open cinzaColor" style="font-size: 9pt;margin-right: 5px;"></i>'+
                                        '   '+value.processo_sei+
                                        '   <i class="fas fa-times vermelhoColor"  onclick="multProcessRemove(this)" style="font-size: 9pt;margin-left: 5px;cursor: pointer;user-select: none;"></i>'+
                                        '</span>';
            })
            htmlMultProcessos += "<input type='hidden' id='ativ_id_procedimentos' data-key='id_procedimentos' data-param='id_procedimentos' value='[]'>";
            htmlMultProcessos += '</div>';
        }

        var selectResponsavel = '<select id="ativ_id_user" data-key="id_user" data-type="user" onchange="updateAtivSelectUser(this)"><option>&nbsp;</option>'+optionSelectResponsavel+'</select>';

        var htmlBox =   '<div id="boxAtividade" class="atividadeWork" data-demanda="'+(value && value.id_demanda ? value.id_demanda : 0)+'">'+
                        '   <table style="font-size: 10pt;width: 100%;" class="seiProForm">'+
                        '      <tr '+(dadosIfrArvore || value ? '' : 'style="display:none;"')+'>'+
                        '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '               <label for="ativ_processo_sei"><i class="iconPopup iconSwitch fas fa-folder-open cinzaColor"></i>Processo SEI:</label>'+
                        '               <input type="hidden" id="ativ_id_demanda" data-key="id_demanda" data-param="id_demanda" value="'+id_demanda+'">'+
                        '           </td>'+
                        '           <td>'+
                        '               <input type="text" id="ativ_processo_sei" onchange="changeProtocoloBoxAtiv(this)" data-key="processo_sei" value="'+(value && value.processo_sei ? value.processo_sei : (dadosIfrArvore ? dadosIfrArvore.processo_sei : '') )+'">'+
                        '               <input type="hidden" id="ativ_id_procedimento" data-key="id_procedimento" data-param="id_procedimento" value="'+(value && value.id_procedimento ? value.id_procedimento : (dadosIfrArvore ? dadosIfrArvore.id_procedimento : '') )+'">'+
                        '           </td>'+
                        '           <td style="vertical-align: bottom;" class="label">'+
                        '               <label class="last" for="ativ_requisicao_sei"><i class="iconPopup iconSwitch fas fa-file cinzaColor"></i>SEI n\u00BA:</label>'+
                        '           </td>'+
                        '           <td>'+
                        '               <input type="text" oninput="this.value=this.value.replace(/[^0-9]/g,\'\')" id="ativ_requisicao_sei" onchange="changeProtocoloBoxAtiv(this)" data-key="requisicao_sei" value="'+(value && value.requisicao_sei ? value.requisicao_sei : (dadosIfrArvore ? dadosIfrArvore.nr_sei : '') )+'">'+
                        '               <input type="hidden" id="ativ_id_documento_requisicao" data-key="id_documento_requisicao" data-param="id_documento" value="'+(value && value.id_documento_requisicao ? value.id_documento_requisicao : (dadosIfrArvore ? dadosIfrArvore.id_documento : '') )+'">'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr '+(checkProcessoHome ? '' : 'style="display:none;"')+' class="ativMultiProcesso">'+
                        '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                        '               <label for="ativ_processo_sei"><i class="iconPopup iconSwitch fas fa-folder-open cinzaColor" style="height: 50px;"></i>Processos SEI '+(checkProcessoHome ? 'Selecionados' : 'Listados')+': <br><span class="counterMultProcessos"></span></label>'+
                        '           </td>'+
                        '           <td colspan="3">'+
                        '               '+htmlMultProcessos+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr>'+
                        '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '               <label for="ativ_assunto"><i class="iconPopup iconSwitch fas fa-comment-dots cinzaColor"></i>'+__.Assunto+':</label>'+
                        '               <input type="hidden" class="hiddenOptionConfig" id="ativ_id_unidade" data-type="text" data-key="id_unidade" value="'+(value && value.id_unidade ? value.id_unidade : arrayConfigAtivUnidade.id_unidade)+'">'+
                        '               <input type="hidden" class="hiddenOptionConfig" id="ativ_id_tipo_requisicao" data-type="text" data-key="id_tipo_requisicao" value="'+(value && value.id_tipo_requisicao ? value.id_tipo_requisicao : 0)+'">'+
                        '               <input type="hidden" class="hiddenOptionConfig" id="ativ_id_atividade" data-type="text" data-key="id_atividade" value="'+(value && value.id_atividade ? value.id_atividade : 0)+'">'+
                        '               <input type="hidden" class="hiddenOptionConfig" id="ativ_tempo_pactuado" data-type="text" data-key="tempo_pactuado" value="'+(value && value.tempo_pactuado ? value.tempo_pactuado : '')+'">'+
                        '               <input type="hidden" class="hiddenOptionConfig" id="ativ_fator_complexidade" data-type="text" data-key="fator_complexidade" value="'+(value && value.fator_complexidade ? value.fator_complexidade : 0)+'">'+
                        '           </td>'+
                        '           <td class="required" colspan="3">'+
                        '               <input type="text" id="ativ_assunto" onchange="checkThisAtivRequiredFields(this)" maxlength="255" data-key="assunto" value="'+(value && value.assunto ? value.assunto : (dadosIfrArvore && dadosIfrArvore.assunto ? dadosIfrArvore.assunto : '' ) )+'" required>'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr>'+
                        '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                        '               <label for="ativ_observacao_gerencial"><i class="iconPopup iconSwitch fas fa-comment-alt cinzaColor"></i>'+__.Observacao+' '+__.Gerencial+':</label>'+
                        '           </td>'+
                        '           <td colspan="3" style="text-align: left;">'+
                        '               <textarea type="text" id="ativ_observacao_gerencial" '+(value ? '' : 'oninput="checkboxAnotacoesProcessoAtiv(this)"')+' style="width: 97%;" data-key="observacao_gerencial" value="'+((value && value.observacao_gerencial !== null && value.observacao_gerencial != '') ? value.observacao_gerencial : '')+'"></textarea>'+
                        ''+($('#ifrArvore').length > 0 ? 
                        '               <table style="width: 100%;font-size: 10pt; display:none" id="tableAnotacoesProcessoAtiv">'+
                        '                   <tbody>'+
                        '                       <tr style="height: 40px;">'+
                        '                           <td style="text-align: left;vertical-align: bottom;">'+
                        '                               <label for="ativ_anotacoes_processo">'+
                        '                                   <i class="iconPopup iconSwitch fas fa-sticky-note cinzaColor"></i>Adicionar '+__.observacao+' '+__.gerencial+' nas anota\u00E7\u00F5es do processo?</label>'+
                        '                           </td>'+
                        '                           <td style="width: 50px;">'+
                        '                               <div class="onoffswitch" style="float: right;">'+
                        '                                   <input type="checkbox" data-key="anotacoes_processo" name="onoffswitch" class="onoffswitch-checkbox" id="ativ_anotacoes_processo" tabindex="0">'+
                        '                                   <label class="onoffswitch-label" for="ativ_anotacoes_processo"></label>'+
                        '                               </div>'+
                        '                           </td>'+
                        '                       </tr>'+
                        '                   </tbody>'+
                        '               </table>'+
                        '' : '')+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr>'+
                        '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '               <label for="ativ_id_user"><i class="iconPopup iconSwitch fas fa-user-tie cinzaColor"></i>Respons\u00E1vel:</label>'+
                        '           </td>'+
                        '           <td colspan="3">'+
                        '               '+selectResponsavel+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr style="height: auto;">'+
                        '           <td colspan="4">'+
                        '               <table style="font-size: 10pt;width: 100%;">'+
                        '                   <tr class="modoDistribuicao_determinada">'+
                        '                       <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '                            <label for="ativ_data_distribuicao"><i class="iconPopup iconSwitch fas fa-briefcase cinzaColor"></i>Data de Distribui\u00E7\u00E3o:</label>'+
                        '                        </td>'+
                        '                        <td class="required date" style="width: 210px;">'+
                        '                            <input type="'+(config_unidade.count_horas ? 'datetime-local' : 'date')+'" onchange="changeDadosTrabalho(this)" id="ativ_data_distribuicao" data-key="data_distribuicao" data-type="inicio" data-name="data de distribui\u00E7\u00E3o" value="'+dataDistribuicao+'" required>'+
                        '                        </td>'+
                        '                        <td style="vertical-align: bottom;" class="label">'+
                        '                            <label class="last" for="ativ_prazo_entrega"><i class="iconPopup iconSwitch fas fa-business-time cinzaColor" style="float: initial;"></i>Prazo de Entrega:</label>'+
                        '                        </td>'+
                        '                        <td class="required date">'+
                        '                            <input type="'+(config_unidade.count_horas ? 'datetime-local' : 'date')+'" onchange="changeDadosTrabalho(this)" id="ativ_prazo_entrega" data-key="prazo_entrega" data-type="fim" data-name="prazo de entrega" value="'+prazoEntrega+'" required>'+
                        '                        </td>'+
                        '                   </tr>'+
                        '                   <tr style="display:none">'+
                        '                       <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '                            <label for="ativ_tempo_planejado"><i class="iconPopup iconSwitch fas fa-hourglass-half cinzaColor"></i>Tempo Planejado:</label>'+
                        '                        </td>'+
                        '                        <td style="width: 210px;">'+
                        '                            <input type="number" min="1" id="ativ_tempo_planejado" onchange="changeDadosTrabalho(this)" data-key="tempo_planejado" data-type="tempo" value="'+(value && value.tempo_planejado ? value.tempo_planejado : '')+'" disabled>'+
                        '                        </td>'+
                        '                        <td style="vertical-align: bottom;" class="label">'+
                        '                            <label class="last" for="ativ_dias_planejado"><i class="iconPopup iconSwitch fas fa-calendar-alt cinzaColor" style="float: initial;"></i><span id="ativ_dias_planejado_label">Dias '+(config_unidade.count_dias_uteis ? '\u00FAteis' : '')+' de Planejamento</span>:</label>'+
                        '                        </td>'+
                        '                        <td class="required number">'+
                        '                            <input type="number" min="0" id="ativ_dias_planejado" onchange="changeDadosTrabalho(this)" data-key="dias_planejado" data-type="dias" value="'+(value && value.dias_planejado ? value.dias_planejado : '0')+'" required>'+
                        '                        </td>'+
                        '                   </tr>'+
                        '               </table>'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr style="height: 30px;vertical-align: bottom;">'+
                        '           <td colspan="4">'+
                        '               <a class="newLink moreInfoBoxAtiv" onclick="moreInfoBoxAtiv(this)" style="font-size: 10pt;cursor: pointer;margin: -12px 0 0 0;float: right; background-color: #fff;">'+
                        '                   <i class="fas fa-plus-circle cinzaColor"></i> Op\u00E7\u00F5es'+
                        '               </a>'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr style="height: auto;">'+
                        '           <td colspan="4">'+
                        '               <table style="font-size: 10pt;width: 100%; display:none;" class="moreInfoBox">'+
                        '                   <tr class="hrForm"><td colspan="4"></td></tr>'+
                        '                   <tr '+(dadosMultProcessos && !value ? '' : 'style="display:none;"')+'>'+
                        '                       <td style="vertical-align: bottom; text-align: left;" class="label" colspan="2">'+
                        '                           <table style="width: 100%; font-size: 10pt;">'+
                        '                               <tr>'+
                        '                                   <td style="padding-top: 15px;width: 250px;text-align: left;">'+
                        '                                       <label for="ativ_multiprocesso"><i class="iconPopup iconSwitch fas fa-clone cinzaColor"></i>Clonar '+__.esta_demanda+' nos processos <br> listados no documento?</label>'+
                        '                                   </td>'+
                        '                                   <td style="text-align: left;'+(dadosMultProcessos ? '' : 'display:none;')+'">'+
                        '                                       <div class="onoffswitch" style="float: left;">'+
                        '                                           <input type="checkbox" data-key="multiprocesso" onchange="changeAtivMultiProcesso(this)" name="onoffswitch" class="onoffswitch-checkbox" id="ativ_multiprocesso" tabindex="0">'+
                        '                                           <label class="onoffswitch-label" for="ativ_multiprocesso"></label>'+
                        '                                       </div>'+
                        '                                   </td>'+
                        '                               </tr>'+
                        '                           </table>'+
                        '                   </tr>'+
                        '                   <tr '+(value ? 'style="display:none"' : '')+'>'+
                        '                       <td style="vertical-align: bottom; text-align: left;" class="label" colspan="2">'+
                        '                            <table style="width: 100%; font-size: 10pt;">'+
                        '                                <tr>'+
                        '                                    <td style="padding-top: 15px;width: 130px;text-align: left;">'+
                        '                                        <label for="ativ_multiplicacao"><i class="iconPopup iconSwitch fas fa-retweet cinzaColor"></i>Multiplicar '+__.demanda+'?</label>'+
                        '                                    </td>'+
                        '                                    <td style="text-align: left;width: 50px;">'+
                        '                                        <div class="onoffswitch">'+
                        '                                            <input type="checkbox" data-key="multiplicacao" onchange="changeAtivMultiSwitch(this)" name="onoffswitch" class="onoffswitch-checkbox" id="ativ_multiplicacao" tabindex="0">'+
                        '                                            <label class="onoffswitch-label" for="ativ_multiplicacao"></label>'+
                        '                                        </div>'+
                        '                                    </td>'+
                        '                                    <td>'+
                        '                                        <div id="div_ativ_fator_multiplicacao" style="display:none">'+
                        '                                            <label style="margin-right: 10px;">x</label>'+
                        '                                            <input type="number" min="1" style="width: 50px !important;" id="ativ_fator_multiplicacao" onchange="updateAtivTempoPactuado(this)" data-key="fator_multiplicacao" value="1">'+''+
                        '                                        </div>'+
                        '                                    </td>'+
                        '                                </tr>'+
                        '                            </table>'+
                        '                        </td>'+
                        '                   </tr>'+
                        '                   <tr id="trAtivVinculacao" '+(value ? 'style="display:none"' : '')+'>'+
                        '                       <td style="vertical-align: bottom; text-align: left;" class="label" colspan="4">'+
                        '                            <table style="width: 100%; font-size: 10pt;">'+
                        '                                <tr>'+
                        '                                    <td style="padding-top: 15px; width: 130px; text-align: left;">'+
                        '                                        <label for="ativ_vinculacao"><i class="iconPopup iconSwitch fas fa-random cinzaColor"></i>Vincular '+__.demanda+'?</label>'+
                        '                                    </td>'+
                        '                                    <td style="width: 50px; text-align: left;">'+
                        '                                        <div class="onoffswitch">'+
                        '                                            <input type="checkbox" data-key="vinculacao" onchange="changeAtivVinculacaoSwitch(this)" name="onoffswitch" class="onoffswitch-checkbox" id="ativ_vinculacao" tabindex="0">'+
                        '                                            <label class="onoffswitch-label" for="ativ_vinculacao"></label>'+
                        '                                        </div>'+
                        '                                    </td>'+
                        '                                    <td>'+
                        '                                        <div id="div_ativ_lista_vinculacao" style="text-align: right; display:none;width: 530px !important;">'+
                        '                                            <select id="ativ_lista_vinculacao" data-key="lista_vinculacao">'+
                        '                                               <option value="0">&nbsp;</option>'+
                        '                                               '+getListAtivVinculacao()+
                        '                                           </select>'+
                        '                                        </div>'+
                        '                                    </td>'+
                        '                                </tr>'+
                        '                            </table>'+
                        '                        </td>'+
                        '                   </tr>'+
                        '                   <tr id="trAtivPrioridade" '+(!value ? 'style="display:none"' : '')+'>'+
                        '                       <td style="vertical-align: bottom; text-align: left;" class="label" colspan="4">'+
                        '                            <table style="width: 100%; font-size: 10pt;">'+
                        '                                <tr>'+
                        '                                    <td style="padding-top: 15px; width: 130px; text-align: left;">'+
                        '                                        <label for="ativ_prioridades"><i class="iconPopup iconSwitch fas fa-exclamation cinzaColor"></i>Priorizar '+__.demanda+'?</label>'+
                        '                                    </td>'+
                        '                                    <td style="width: 50px; text-align: left;">'+
                        '                                        <div class="onoffswitch">'+
                        '                                            <input type="checkbox" data-key="prioridades" onchange="changeAtivPrioritySwitch(this)" name="onoffswitch" class="onoffswitch-checkbox" id="ativ_prioridades" tabindex="0">'+
                        '                                            <label class="onoffswitch-label" for="ativ_prioridades"></label>'+
                        '                                        </div>'+
                        '                                    </td>'+
                        '                                    <td>'+
                        '                                        <div id="div_ativ_lista_prioridades" style="text-align: right; display:none;width: 530px !important;">'+
                        '                                            <select id="ativ_lista_prioridades" data-key="lista_prioridades"><option value="0">&nbsp;</option></select>'+
                        '                                        </div>'+
                        '                                    </td>'+
                        '                                </tr>'+
                        '                            </table>'+
                        '                        </td>'+
                        '                   </tr>'+
                        (value ? '' : 
                        '                   <tr id="trAtivChecklist">'+
                        '                       <td style="vertical-align: bottom; text-align: left;" class="label" colspan="4">'+
                        '                            <input type="hidden" id="ativ_checklist" data-key="lista_checklist" data-param="lista_checklist" value="'+(value && value.checklist ? value.checklist : '')+'">'+
                        '                            <table style="width: 100%; font-size: 10pt;">'+
                        '                                <tr>'+
                        '                                    <td style="padding-top: 15px; width: 130px; text-align: left;">'+
                        '                                        <label for="ativ_insert_checklist"><i class="iconPopup iconSwitch fas fa-check-double cinzaColor"></i>Inserir <br>Ckecklist?</label>'+
                        '                                    </td>'+
                        '                                    <td style="width: 50px; text-align: left;">'+
                        '                                        <div class="onoffswitch">'+
                        '                                            <input type="checkbox" data-key="checklist" onchange="changeAtivChecklistSwitch(this)" name="onoffswitch" class="onoffswitch-checkbox" id="ativ_insert_checklist" tabindex="0">'+
                        '                                            <label class="onoffswitch-label" for="ativ_insert_checklist"></label>'+
                        '                                        </div>'+
                        '                                    </td>'+
                        '                                    <td>'+
                        '                                        <div id="div_ativ_lista_checklist" style="text-align: right; display:none">'+
                        '                                            <table id="ativBox_checklist" data-format="array" data-key="checklist" data-mode-insert="'+(value && value.checklist ? 'manual' : 'auto')+'" style="font-size: 8pt !important;width: 100%; margin:0" class="tableOptionConfig tableSortable seiProForm tableDialog tableInfo tableZebraOdd tableFollow tableAtividades">'+
                        '                                                 <tbody>'+
                        '                                                 </tbody>'+
                        '                                                 <tfoot>'+
                        '                                                    <tr>'+
                        '                                                        <th colspan="3" style="text-align: right;">'+
                        '                                                            <a class="newLink addConfigItem" onclick="addConfigItem(this)" style="cursor: pointer; margin: 5px;display: inline-block;">'+
                        '                                                                <i class="fas fa-plus-circle cinzaColor" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                        '                                                                Adicionar novo item'+
                        '                                                            </a>'+
                        '                                                        </th>'+
                        '                                                    </tr>'+
                        '                                                 </tfoot>'+
                        '                                            </table>'+
                        '                                        </div>'+
                        '                                    </td>'+
                        '                                </tr>'+
                        '                            </table>'+
                        '                        </td>'+
                        '                   </tr>'+
                        '                   <tr>'+
                        '                       <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '                            <label for="ativ_etiquetas"><i class="iconPopup iconSwitch fas fa-tags cinzaColor"></i>Etiquetas:</label>'+
                        '                        </td>'+
                        '                        <td colspan="3">'+
                        '                            <input type="text" id="ativ_etiquetas" data-key="etiquetas" value="'+(value && value.etiquetas ? (value.etiquetas !== null && value.etiquetas.length > 0 ? value.etiquetas.join(';') : '') : '')+'">'+
                        '                        </td>'+
                        '                   </tr>'+
                        '')+
                        '               </table>'+
                        '           </td>'+
                        '       </tr>'+
                        '   </table>'+
                        '</div>';

        var btnDialogBoxPro =   [{
                                    text: (id_demanda != 0) ? 'Editar' : 'Salvar',
                                    class: 'confirm',
                                    click: function(event) { 
                                        if (checkAtivRequiredFields(this, 'mark')) {
                                            var action = (id_demanda != 0) ? 'edit_atividade' : 'save_atividade';
                                            var param = extractDataAtiv(this);
                                                param.action = action;
                                                getServerAtividades(param, action);
                                        }
                                    }
                                }];
        if (id_demanda != 0) {
            if (value.data_inicio != '0000-00-00 00:00:00') {
                if (checkCapacidade('complete_atividade') || checkCapacidade('complete_edit_atividade')) {
                    btnDialogBoxPro.unshift({
                        text: (value.data_entrega == '0000-00-00 00:00:00') ? 'Concluir '+__.Demanda+'' : 'Editar Conclus\u00E3o',
                        icon: 'ui-icon-check',
                        click: function(event) { 
                            completeAtividade(id_demanda);
                        }
                    });
                }
            } else {
                if (checkCapacidade('start_atividade')) {
                    btnDialogBoxPro.unshift({
                        text: 'Iniciar Execu\u00E7\u00E3o',
                        icon: 'ui-icon-play',
                        click: function(event) { 
                            startAtividade(id_demanda);
                        }
                    });
                }
            }
            btnDialogBoxPro.unshift({
                text: 'Gerar Notifica\u00E7\u00E3o',
                icon: 'ui-icon-mail-closed',
                click: function(event) { 
                    notifyAtividade(id_demanda);
                }
            });
            if (checkCapacidade('delete_atividade')) {
                btnDialogBoxPro.unshift({
                    text: 'Excluir',
                    icon: 'ui-icon-trash',
                    click: function(event) { 
                        if (value.data_avaliacao != '0000-00-00 00:00:00') {
                            confirmaFraseBoxPro(__.A_demanda+' j\u00E1 possui avalia\u00E7\u00E3o cadastrada. Tem certeza que deseja excluir?', 'EXCLUIR', function() { deleteAtividade(id_demanda) });
                        } else if (value.data_entrega != '0000-00-00 00:00:00') {
                            confirmaFraseBoxPro(__.A_demanda+' j\u00E1 possui entrega realizada. Tem certeza que deseja excluir?', 'EXCLUIR', function() { deleteAtividade(id_demanda) });
                        } else {
                            confirmaBoxPro('Tem certeza que deseja excluir '+__.esta_demanda+'?', function() { deleteAtividade(id_demanda) }, 'Excluir');
                        }
                    }
                });
            }
        } else {
            if (checkCapacidade('edit_atividade')) {
                btnDialogBoxPro.unshift({
                    text: 'Cadastro Avan\u00E7ado',
                    icon: 'ui-icon-notice',
                    click: function(event) { 
                        changeSaveAtividade('full');
                    }
                });
            }
        }
        var titleBox = (id_demanda != 0) 
                            ? 'Editar '+__.demanda+': '+getTitleDialogBox(value)
                            : 'Criar  '+__.nova_demanda;
        resetDialogBoxPro('dialogBoxPro');
        dialogBoxPro = $('#dialogBoxPro')
            .html('<div class="dialogBoxDiv">'+htmlBox+'</div>')
            .dialog({
                title: titleBox,
                width: 780,
                open: function() { 
                    prepareFieldsReplace(this);
                },
                close: function() { 
                    $('#boxAtividade').remove();
                    cancelSelectedItensAtiv(id_demanda)
                    resetDialogBoxPro('dialogBoxPro');
                },
                buttons: btnDialogBoxPro
        });
        checkTagsIput();

        var selectUser = $('#ativ_id_user');
        if (dadosIfrArvore && id_demanda == 0) {
            var tipo_processo = dadosIfrArvore.tipo;
            var usuario = dadosIfrArvore.usuario;
            var prazo = dadosIfrArvore.prazo;
            if (usuario) {    
                selectUser.find('option').each(function(){
                    var text = $(this).text().toLowerCase();
                    if (text == usuario.toLowerCase()) {
                        if ($(this).prop('disabled') == false && $(this).closest('optgroup').prop('disabled') == false) {
                            selectUser.val($(this).val()).trigger('change');
                            return false;
                        }
                    }
                });
            }
            if (prazo) { $('#ativ_dias_planejado').val(prazo).trigger('change') }
        }
        if (!checkCapacidade('select_user_atividade')) {
            selectUser.val(arrayConfigAtividades.perfil.id_user).trigger('change');
        } 
        if (checkProcessoHome) {
            multProcessUpdateInput();
        }
    }
}
function changeSaveAtividade(type) {
    var assunto = $('#ativ_assunto').val();
    var observacao_gerencial = $('#ativ_observacao_gerencial').val();
    var id_user = $('#ativ_id_user').val();
    var data_distribuicao = $('#ativ_data_distribuicao').val();
    var prazo_entrega = $('#ativ_prazo_entrega').val();
    if (type == 'simple') {
        saveAtividadeSimple();
    } else {
        saveAtividadeFull();
    }
    setOptionsPro('formSaveAtividade', type);
    setTimeout(function(){ 
        $('#ativ_assunto').val(assunto);
        $('#ativ_observacao_gerencial').val(observacao_gerencial).trigger('change');
        $('#ativ_id_user').val(id_user).trigger('change');
        $('#ativ_data_distribuicao').val(data_distribuicao).trigger('change');
        $('#ativ_prazo_entrega').val(prazo_entrega).trigger('change');
        if (observacao_gerencial !== '' && !$('#ativ_observacao_gerencial').is(':visible')) {
            $('.atividadeWork .moreInfoBoxAtiv').trigger('click');
        }
    }, 300);
}
function saveAtividade(id_demanda = 0) {
    if (
            id_demanda == 0 &&
            (getOptionsPro('formSaveAtividade') == 'simple' || (!getOptionsPro('formSaveAtividade') && typeof arrayConfigAtividades.entidades[0].config.cadastro_simplificado !== 'undefined' && arrayConfigAtividades.entidades[0].config.cadastro_simplificado)) 
        ){
        saveAtividadeSimple(id_demanda);
    } else {
        saveAtividadeFull(id_demanda);
    }
}
// BOX DE DEMANDA COMPLETA
function saveAtividadeFull(id_demanda = 0) {
    var checkPlanos = (typeof arrayConfigAtividades.planos !== 'undefined' && arrayConfigAtividades.planos != 0 && arrayConfigAtividades.planos.length > 0) ? true : false;
    if (!checkPlanos) {
        alertaBoxPro('Error', 'exclamation-triangle', 'Nenhum plano de trabalho ativo!');
    } else {
        var value = (id_demanda != 0) ? jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+id_demanda+"`] | [0]") : false;
        var unidades =  (typeof arrayConfigAtividades.atividades !== 'undefined' && arrayConfigAtividades.atividades != 0 && arrayConfigAtividades.atividades.length > 0) 
                            ? uniqPro(jmespath.search(arrayConfigAtividades.atividades, "[?sigla_unidade].sigla_unidade"))
                            : [];
        var countUnidades = (arrayConfigAtividades.atividades.length > 0) ? unidades.length : 0;
        var unidadesPlanos = (checkPlanos) 
                            ? uniqPro(jmespath.search(arrayConfigAtividades.planos, "[?sigla_unidade].sigla_unidade")) 
                            : [];
        var countUnidadesPlanos = (checkPlanos) ? unidadesPlanos.length : 0;
        var config_unidade = getConfigDadosUnidade((id_demanda != 0 ? value.sigla_unidade: null));
        var dadosIfrArvore = getIfrArvoreDadosProcesso();
        if (value) {
            var dataDistribuicao = moment(value.data_distribuicao, 'YYYY-MM-DD HH:mm:ss').format(config_unidade.hora_format);
            var prazoEntrega = moment(value.prazo_entrega, 'YYYY-MM-DD HH:mm:ss').format(config_unidade.hora_format);
        } else {
            var dt_init = (dadosIfrArvore && dadosIfrArvore.data_documento && dadosIfrArvore.data_documento != '') 
                    ? moment(dadosIfrArvore.data_documento, 'DD/MM/YYYY HH:mm') : moment();
            var hr_init = dt_init.format('HH:mm');
            var dataDistribuicao = dt_init.format(config_unidade.hora_format);
                dataDistribuicao = (moment(hr_init, 'HH:mm') > moment(config_unidade.h_util_fim, 'HH:mm')) 
                    ? moment(dt_init.format('YYYY-MM-DD')+'T'+config_unidade.h_util_fim).add(-1,'hours').format(config_unidade.hora_format)
                    : dataDistribuicao;
                dataDistribuicao = (moment(hr_init, 'HH:mm') < moment(config_unidade.h_util_inicio, 'HH:mm')) 
                        ? moment(dt_init.format('YYYY-MM-DD')+'T'+config_unidade.h_util_inicio).format(config_unidade.hora_format)
                        : dataDistribuicao;
            var prazoEntrega = dt_init.add(1,'hours').format(config_unidade.hora_format);
                prazoEntrega = (moment(hr_init, 'HH:mm') > moment(config_unidade.h_util_fim, 'HH:mm')) 
                    ? moment(dt_init.format('YYYY-MM-DD')+'T'+config_unidade.h_util_fim).format(config_unidade.hora_format)
                    : prazoEntrega;
                prazoEntrega = (moment(hr_init, 'HH:mm') < moment(config_unidade.h_util_inicio, 'HH:mm')) 
                        ? moment(dt_init.format('YYYY-MM-DD')+'T'+config_unidade.h_util_inicio).add(1,'hours').format(config_unidade.hora_format)
                        : prazoEntrega;
        }

        var optionSelectRequisicoes = ( arrayConfigAtividades.tipos_requisicoes.length > 0 ) ? $.map(arrayConfigAtividades.tipos_requisicoes, function(v,k){ return ( (value && v.id_tipo_requisicao == value.id_tipo_requisicao) || (dadosIfrArvore && dadosIfrArvore.nome_documento.indexOf(v.nome_requisicao) !== -1) ) ? '<option value="'+v.id_tipo_requisicao+'" selected>'+v.nome_requisicao+'</option>' : '<option value="'+v.id_tipo_requisicao+'">'+v.nome_requisicao+'</option>' }).join('') : '';
        var selectRequisicoes = '<select id="ativ_id_tipo_requisicao" onchange="checkThisAtivRequiredFields(this)" data-key="id_tipo_requisicao" required><option>&nbsp;</option>'+optionSelectRequisicoes+'</select>';
        
        var optionSelectAtividades = '';
        // var arrayTabelaAtividades = jmespath.search(arrayConfigAtividades.atividades,"[?homologado==`true`]");
            // arrayTabelaAtividades = (arrayTabelaAtividades !== null) ? arrayTabelaAtividades : [];
        var arrayTabelaAtividades = arrayConfigAtividades.atividades;
        if (countUnidades > 1) {
            $.each(unidades, function(index, v){
                var arrayAtiv = jmespath.search(arrayTabelaAtividades, "[?sigla_unidade=='"+v+"']");
                optionSelectAtividades +=   '<optgroup label="'+v+'">'+
                                            '   '+getOptionsSelectAtivGroup(arrayAtiv, value, true)+
                                            '</optgroup>';
            });
        } else {
            optionSelectAtividades += getOptionsSelectAtivGroup(arrayTabelaAtividades, value, true);
        } 
        var selectAtividades = '<select id="ativ_id_atividade" data-key="id_atividade" onchange="changeAtivSelect(this)" required><option>&nbsp;</option>'+optionSelectAtividades+'</select>';
        
        var optionSelectResponsavel = '';
        if (countUnidadesPlanos > 1) {
            $.each(unidadesPlanos, function(index, v){
                var arrayResp = jmespath.search(arrayConfigAtividades.planos, "[?sigla_unidade=='"+v+"'] | [?vigencia==`true`]");
                optionSelectResponsavel += '<optgroup label="'+v+'">';
                optionSelectResponsavel += getOptionsSelectResp(arrayResp, value);
                optionSelectResponsavel += '</optgroup>';
            });
        } else {
            var arrayResp = jmespath.search(arrayConfigAtividades.planos, "[?vigencia==`true`]");
            optionSelectResponsavel += getOptionsSelectResp(arrayResp, value);
        }

        var dadosMultProcessos = (
                                    dadosIfrArvore && 
                                    dadosIfrArvore.processos && 
                                    dadosIfrArvore.processos[0].id_procedimento != dadosIfrArvore.id_procedimento
                                ) 
                                    ? dadosIfrArvore.processos
                                    : getProcessoUnidadePro(true).length > 0
                                        ? getProcessoUnidadePro(true, true) 
                                        : false;    
        var checkProcessoHome = (!value && !dadosIfrArvore && dadosMultProcessos && dadosMultProcessos.length > 0) ? true : false;                 
        var htmlMultProcessos = '';
        if (dadosMultProcessos) {
            htmlMultProcessos += '<div class="listMultProcessos">';
            $.each(dadosMultProcessos, function(index, value){
                htmlMultProcessos +=    '<span class="ativProcessos" data-procedimento="'+value.id_procedimento+'" data-processo="'+value.processo_sei+'">'+
                                        '   <i class="fas fa-folder-open cinzaColor" style="font-size: 9pt;margin-right: 5px;"></i>'+
                                        '   '+value.processo_sei+
                                        '   <i class="fas fa-times vermelhoColor"  onclick="multProcessRemove(this)" style="font-size: 9pt;margin-left: 5px;cursor: pointer;user-select: none;"></i>'+
                                        '</span>';
            })
            htmlMultProcessos += "<input type='hidden' id='ativ_id_procedimentos' data-key='id_procedimentos' data-param='id_procedimentos' value='[]'>";
            htmlMultProcessos += '</div>';
        }

        var selectResponsavel = '<select id="ativ_id_user" data-key="id_user" data-type="user" onchange="updateAtivSelectUser(this)"><option>&nbsp;</option>'+optionSelectResponsavel+'</select>';
        var htmlBox =   '<div id="boxAtividade" class="atividadeWork" data-demanda="'+(value && value.id_demanda ? value.id_demanda : 0)+'">'+
                        '   <table style="font-size: 10pt;width: 100%;" class="seiProForm">'+
                        '      <tr '+(dadosIfrArvore || value ? '' : 'style="display:none;"')+'>'+
                        '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '               <label for="ativ_processo_sei"><i class="iconPopup iconSwitch fas fa-folder-open cinzaColor"></i>Processo SEI:</label>'+
                        '               <input type="hidden" id="ativ_id_demanda" data-key="id_demanda" data-param="id_demanda" value="'+id_demanda+'">'+
                        '           </td>'+
                        '           <td colspan="'+(dadosMultProcessos ? '' : '3')+'">'+
                        '               <input type="text" id="ativ_processo_sei" onchange="changeProtocoloBoxAtiv(this)" data-key="processo_sei" value="'+(value && value.processo_sei ? value.processo_sei : (dadosIfrArvore ? dadosIfrArvore.processo_sei : '') )+'">'+
                        '               <input type="hidden" id="ativ_id_procedimento" data-key="id_procedimento" data-param="id_procedimento" value="'+(value && value.id_procedimento ? value.id_procedimento : (dadosIfrArvore ? dadosIfrArvore.id_procedimento : '') )+'">'+
                        '           </td>'+
                        '           <td colspan="2" '+(dadosMultProcessos && !value ? '' : 'style="display:none;"')+'>'+
                        '               <table style="width: 100%; font-size: 10pt;">'+
                        '                   <tr>'+
                        '                       <td colspan="2" style="padding-top: 15px;text-align: left;padding-left: 25px;">'+
                        '                           <label for="ativ_multiprocesso"><i class="iconPopup iconSwitch fas fa-clone cinzaColor"></i>Clonar '+__.esta_demanda+' nos processos <br> listados no documento?</label>'+
                        '                       </td>'+
                        '                       <td '+(dadosMultProcessos ? '' : 'style="display:none;"')+'>'+
                        '                           <div class="onoffswitch" style="float: right;">'+
                        '                               <input type="checkbox" data-key="multiprocesso" onchange="changeAtivMultiProcesso(this)" name="onoffswitch" class="onoffswitch-checkbox" id="ativ_multiprocesso" tabindex="0">'+
                        '                               <label class="onoffswitch-label" for="ativ_multiprocesso"></label>'+
                        '                           </div>'+
                        '                       </td>'+
                        '                   </tr>'+
                        '               </table>'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr '+(checkProcessoHome ? '' : 'style="display:none;"')+' class="ativMultiProcesso">'+
                        '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                        '               <label for="ativ_processo_sei"><i class="iconPopup iconSwitch fas fa-folder-open cinzaColor" style="height: 50px;"></i>Processos SEI '+(checkProcessoHome ? 'Selecionados' : 'Listados')+': <br><span class="counterMultProcessos"></span></label>'+
                        '           </td>'+
                        '           <td colspan="3">'+
                        '               '+htmlMultProcessos+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr>'+
                        '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '               <label for="ativ_id_tipo_requisicao"><i class="iconPopup iconSwitch fas fa-inbox cinzaColor"></i>Requisi\u00E7\u00E3o:</label>'+
                        '           </td>'+
                        '           <td class="required" style="width: 210px;max-width: 210px;">'+
                        '               '+selectRequisicoes+
                        '           </td>'+
                        '           <td style="vertical-align: bottom; '+(dadosIfrArvore || value ? '' : 'display:none;')+'" class="label">'+
                        '               <label class="last" for="ativ_requisicao_sei"><i class="iconPopup iconSwitch fas fa-file cinzaColor"></i>SEI n\u00BA:</label>'+
                        '           </td>'+
                        '           <td '+(dadosIfrArvore || value ? '' : 'style="display:none;"')+'>'+
                        '               <input type="text" oninput="this.value=this.value.replace(/[^0-9]/g,\'\')" id="ativ_requisicao_sei" onchange="changeProtocoloBoxAtiv(this)" data-key="requisicao_sei" value="'+(value && value.requisicao_sei ? value.requisicao_sei : (dadosIfrArvore ? dadosIfrArvore.nr_sei : '') )+'">'+
                        '               <input type="hidden" id="ativ_id_documento_requisicao" data-key="id_documento_requisicao" data-param="id_documento" value="'+(value && value.id_documento_requisicao ? value.id_documento_requisicao : (dadosIfrArvore ? dadosIfrArvore.id_documento : '') )+'">'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr>'+
                        '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '               <label for="ativ_assunto"><i class="iconPopup iconSwitch fas fa-comment-dots cinzaColor"></i>'+__.Assunto+':</label>'+
                        '           </td>'+
                        '           <td class="required" colspan="3">'+
                        '               <input type="text" id="ativ_assunto" onchange="checkThisAtivRequiredFields(this)" maxlength="255" data-key="assunto" value="'+(value && value.assunto ? value.assunto : (dadosIfrArvore && dadosIfrArvore.assunto ? dadosIfrArvore.assunto : '' ) )+'" required>'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr class="hrForm"><td colspan="4"></td></tr>'+
                        '      <tr>'+
                        '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '               <label for="ativ_id_atividade"><i class="iconPopup iconSwitch fas fa-clipboard-list cinzaColor"></i>'+__.Atividade+':</label>'+
                        '           </td>'+
                        '           <td class="required" colspan="3">'+
                        '               '+selectAtividades+
                        '               <input type="hidden" id="ativ_id_unidade" data-key="id_unidade" data-param="id_unidade" value="">'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr>'+
                        '           <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '               <label for="ativ_fator_complexidade"><i class="iconPopup iconSwitch fas fa-graduation-cap cinzaColor"></i>Grau de '+__.Complexidade+':</label>'+
                        '           </td>'+
                        '           <td class="required">'+
                        '               <select id="ativ_fator_complexidade" data-key="fator_complexidade" onchange="updateAtivTempoPactuado(this)" required><option>&nbsp;</option></select>'+
                        '           </td>'+
                        '           <td colspan="2" rowspan="3">'+
                        '               <div id="chartUser" style="width: 380px; height: 85px;"></div>'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr>'+
                        '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '               <label for="ativ_id_user"><i class="iconPopup iconSwitch fas fa-user-tie cinzaColor"></i>Respons\u00E1vel:</label>'+
                        '           </td>'+
                        '           <td>'+
                        '               '+selectResponsavel+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr>'+
                        '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '               <label for="ativ_tempo_pactuado"><i class="iconPopup iconSwitch fas fa-user-clock cinzaColor"></i>Tempo pactuado:</label>'+
                        '           </td>'+
                        '           <td>'+
                        '               <input type="text" id="ativ_tempo_pactuado" data-key="tempo_pactuado" value="'+(value && value.tempo_pactuado ? value.tempo_pactuado : '')+'" data-tempo-pactuado="'+(value && value.tempo_pactuado ? value.tempo_pactuado : '')+'" disabled>'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr '+(value ? 'style="display:none"' : '')+'>'+
                        '          <td style="vertical-align: bottom; text-align: left;" class="label" colspan="2">'+
                        '               <table style="width: 100%; font-size: 10pt;">'+
                        '                   <tr>'+
                        '                       <td style="padding-top: 15px;">'+
                        '                           <label for="ativ_multiplicacao"><i class="iconPopup iconSwitch fas fa-retweet cinzaColor"></i>Multiplicar '+__.demanda+'?</label>'+
                        '                       </td>'+
                        '                       <td>'+
                        '                           <div class="onoffswitch" style="float: right;">'+
                        '                               <input type="checkbox" data-key="multiplicacao" onchange="changeAtivMultiSwitch(this)" name="onoffswitch" class="onoffswitch-checkbox" id="ativ_multiplicacao" tabindex="0">'+
                        '                               <label class="onoffswitch-label" for="ativ_multiplicacao"></label>'+
                        '                           </div>'+
                        '                       </td>'+
                        '                       <td style="width: 105px;">'+
                        '                           <div id="div_ativ_fator_multiplicacao" style="text-align: right; display:none">'+
                        '                               <label style="margin-right: 10px;">x</label>'+
                        '                               <input type="number" min="1" style="width: 50px !important;" id="ativ_fator_multiplicacao" onchange="updateAtivTempoPactuado(this)" data-key="fator_multiplicacao" value="1">'+''+
                        '                           </div>'+
                        '                       </td>'+
                        '                   </tr>'+
                        '               </table>'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr class="hrForm">'+
                        '           <td colspan="4">'+
                        '               <div '+(value ? 'style="display:none"' : '')+' class="btn-group atividadesBtnModeDist" role="group" style="float: right;margin: -15px -20px 8px 0;transform: scale(0.9);">'+
                        '                   <button type="button" onclick="changeModeDistribuicao(this)" data-value="Determinada" class="btn btn-sm btn-light active">'+
                        '                       <i class="far fa-calendar-check" style="color: #888;"></i> <span class="text">\u00DAnica</span>'+
                        '                   </button>'+
                        '                   <button type="button" onclick="changeModeDistribuicao(this)" data-value="Recorrente" class="btn btn-sm btn-light">'+
                        '                       <i class="fas fa-redo-alt" style="color: #888;"></i> <span class="text">Recorrente</span>'+
                        '                   </button>'+
                        '               </div>'+
                        '           </td>'+
                        '      </tr>'+
                        '      </tr>'+
                        '      <tr style="height: auto;">'+
                        '           <td colspan="4">'+
                        '               <table style="font-size: 10pt;width: 100%;">'+
                        '                   <tr class="modoDistribuicao_determinada">'+
                        '                       <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '                            <label for="ativ_data_distribuicao"><i class="iconPopup iconSwitch fas fa-briefcase cinzaColor"></i>Data de Distribui\u00E7\u00E3o:</label>'+
                        '                        </td>'+
                        '                        <td class="required date" style="width: 210px;">'+
                        '                            <input type="'+(config_unidade.count_horas ? 'datetime-local' : 'date')+'" onchange="changeDadosTrabalho(this)" id="ativ_data_distribuicao" data-key="data_distribuicao" data-type="inicio" data-name="data de distribui\u00E7\u00E3o" value="'+dataDistribuicao+'" required>'+
                        '                        </td>'+
                        '                        <td style="vertical-align: bottom;" class="label">'+
                        '                            <label class="last" for="ativ_prazo_entrega"><i class="iconPopup iconSwitch fas fa-business-time cinzaColor" style="float: initial;"></i>Prazo de Entrega:</label>'+
                        '                        </td>'+
                        '                        <td class="required date">'+
                        '                            <input type="'+(config_unidade.count_horas ? 'datetime-local' : 'date')+'" onchange="changeDadosTrabalho(this)" id="ativ_prazo_entrega" data-key="prazo_entrega" data-type="fim" data-name="prazo de entrega" value="'+prazoEntrega+'" required>'+
                        '                        </td>'+
                        '                   </tr>'+
                        '                   <tr>'+
                        '                       <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '                            <label for="ativ_tempo_planejado"><i class="iconPopup iconSwitch fas fa-hourglass-half cinzaColor"></i>Tempo Planejado:</label>'+
                        '                        </td>'+
                        '                        <td style="width: 210px;">'+
                        '                            <input type="number" min="1" id="ativ_tempo_planejado" onchange="changeDadosTrabalho(this)" data-key="tempo_planejado" data-type="tempo" value="'+(value && value.tempo_planejado ? value.tempo_planejado : '')+'" disabled>'+
                        '                        </td>'+
                        '                        <td style="vertical-align: bottom;" class="label">'+
                        '                            <label class="last" for="ativ_dias_planejado"><i class="iconPopup iconSwitch fas fa-calendar-alt cinzaColor" style="float: initial;"></i><span id="ativ_dias_planejado_label">Dias '+(config_unidade.count_dias_uteis ? '\u00FAteis' : '')+' de Planejamento</span>:</label>'+
                        '                        </td>'+
                        '                        <td class="required number">'+
                        '                            <input type="number" min="0" id="ativ_dias_planejado" onchange="changeDadosTrabalho(this)" data-key="dias_planejado" data-type="dias" value="'+(value && value.dias_planejado ? value.dias_planejado : '0')+'" required>'+
                        '                        </td>'+
                        '                   </tr>'+
                        '                   <tr id="trAtivRecalcPrazo" class="modoDistribuicao_determinada">'+
                        '                       <td style="vertical-align: bottom; text-align: left;" class="label" colspan="4">'+
                        '                            <table style="width: 100%; font-size: 10pt;">'+
                        '                                <tr>'+
                        '                                    <td style="padding-top: 15px; width: 130px; text-align: left;">'+
                        '                                        <label for="ativ_recalcula_prazo"><i class="iconPopup iconSwitch fas fa-calendar-check cinzaColor"></i>Prazo <br>M\u00F3vel?</label>'+
                        '                                    </td>'+
                        '                                    <td style="width: 50px; text-align: left;">'+
                        '                                        <div class="onoffswitch">'+
                        '                                            <input type="checkbox" data-key="recalcula_prazo" onchange="changeAtivRecalcPrazoSwitch(this)" name="onoffswitch" class="onoffswitch-checkbox" id="ativ_recalcula_prazo" tabindex="0" data-mode-insert="'+(value && typeof value.recalcula_prazo !== 'undefined' ? 'manual' : 'auto')+'" '+(value && typeof value.recalcula_prazo !== 'undefined' && value.recalcula_prazo == 1 ? 'checked' : '')+'>'+
                        '                                            <label class="onoffswitch-label" for="ativ_recalcula_prazo"></label>'+
                        '                                        </div>'+
                        '                                    </td>'+
                        '                                    <td style="text-align: left;">'+
                        '                                        <span style="color: #777; '+(value && value.recalcula_prazo ? '' : 'display:none;')+'" class="infoAtivRecalcPrazo">'+
                        '                                            <i class="fas fa-info-circle laranjaColor" style="float: initial;"></i> Recalcula o prazo de entrega assim que '+__.a_demanda+' for '+getNameGenre('demanda', 'iniciado', 'iniciada')+', acrescentando o n\u00FAmero de dias de planejamento ao prazo final.'+
                        '                                        </span>'+
                        '                                    </td>'+
                        '                                </tr>'+
                        '                            </table>'+
                        '                        </td>'+
                        '                   </tr>'+
                        '               </table>'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr style="height: auto;">'+
                        '           <td colspan="4">'+
                        '               <input type="hidden" id="ativ_recorrencia" data-key="lista_recorrencia" data-param="lista_recorrencia" value="[]">'+
                        '               <table style="font-size: 10pt;width: 100%; display:none; margin-bottom: 15px;" class="modoDistribuicao_recorrente">'+
                        '                   <tr>'+
                        '                        <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '                            <label for="ativ_modo_recorrencia"><i class="iconPopup iconSwitch fas fa-redo-alt cinzaColor"></i>Recorr\u00EAncia '+__.da_Demanda+':</label>'+
                        '                        </td>'+
                        '                        <td style="width: 210px;">'+
                        '                            <select id="ativ_modo_recorrencia" data-key="modo_recorrencia" data-type="modo_recorrencia" onchange="changeModoRecorrenciaFields(this)">'+
                        '                               <option value="semana1" data-view="hide">Semanal (Segundas-feira)</option>'+
                        '                               <option value="semana5" data-view="hide">Semanal (Sextas-feira)</option>'+
                        '                               <option value="quinzena1" data-view="hide">Quinzenal (Segundas-feira)</option>'+
                        '                               <option value="quinzena5" data-view="hide">Quinzenal (Sextas-feira)</option>'+
                        '                               <option value="mes_inicio" data-view="hide">Mensal (Come\u00E7o do M\u00EAs)</option>'+
                        '                               <option value="mes_fim" data-view="hide">Mensal (Final do M\u00EAs)</option>'+
                        '                               <option value="3mes_inicio" data-view="hide">Trimestral (Come\u00E7o do Trimestre)</option>'+
                        '                               <option value="3mes_fim" data-view="hide">Trimestral (Final do Trimestre)</option>'+
                        '                               <option value="6mes_inicio" data-view="hide">Semestral (Come\u00E7o do Semestre)</option>'+
                        '                               <option value="6mes_fim" data-view="hide">Semestral (Final do Semestre)</option>'+
                        '                               <option value="ano_inicio" data-view="hide">Anual (Come\u00E7o do Ano)</option>'+
                        '                               <option value="ano_fim" data-view="hide">Anual (Final do Ano)</option>'+
                        '                               <option value="diaria" data-view="hide">Di\u00E1ria</option>'+
                        '                               <option value="numero_fixo_uteis" data-view="show">A cada (n) dias \u00FAteis</option>'+
                        '                               <option value="numero_fixo" data-view="show">A cada (n) dias corridos</option>'+
                        '                            </select>'+
                        '                        </td>'+
                        '                        <td colspan="2">'+
                        '                           <table style="font-size: 10pt;width: 100%; display:none;" class="modoDistribuicao_recorrente_modo_recorrencia">'+
                        '                               <tr>'+
                        '                                   <td style="vertical-align: bottom;" class="label">'+
                        '                                       <label class="last" for="ativ_recorrencia_numero_fixo" id="label_recorrencia_numero_fixo"><i class="iconPopup iconSwitch fas fa-calendar-day cinzaColor" style="float: initial;"></i>N\u00FAmero de Dias de Recorr\u00EAncia:</label>'+
                        '                                       <label class="last" for="ativ_recorrencia_numero_fixo" id="label_recorrencia_numero_fixo_uteis"><i class="iconPopup iconSwitch fas fa-calendar-day cinzaColor" style="float: initial;"></i>N\u00FAmero de Dias \u00DAteis de Recorr\u00EAncia:</label>'+
                        '                                   </td>'+
                        '                                   <td>'+
                        '                                       <input type="number" id="ativ_recorrencia_numero_fixo" onchange="calculoRecorrenciaAtiv(this)" data-key="recorrencia_numero_fixo" value="1">'+
                        '                                   </td>'+
                        '                               </tr>'+
                        '                           </table>'+
                        '                        </td>'+
                        '                   </tr>'+
                        '                   <tr>'+
                        '                        <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '                            <label for="ativ_data_inicio_recorrencia"><i class="iconPopup iconSwitch fas fa-briefcase cinzaColor"></i>Data Inicial da Recorr\u00EAncia:</label>'+
                        '                        </td>'+
                        '                        <td class="date" style="width: 210px;">'+
                        '                            <input type="'+(config_unidade.count_horas ? 'datetime-local' : 'date')+'" onchange="calculoRecorrenciaAtiv(this)" id="ativ_data_inicio_recorrencia" data-key="data_inicio_recorrencia" data-name="data inicial de eecorr\u00EAncia" value="'+dataDistribuicao+'">'+
                        '                        </td>'+
                        '                        <td style="vertical-align: baseline;padding-top: 18px;" class="label">'+
                        '                            <label class="last" for="ativ_modo_fim_recorrencia"><i class="iconPopup iconSwitch fas fa-business-time cinzaColor" style="float: initial;"></i>Data Final da Recorr\u00EAncia:</label>'+
                        '                        </td>'+
                        '                        <td>'+
                        '                            <select id="ativ_modo_fim_recorrencia" data-key="modo_fim_recorrencia" data-type="fim_recorrencia" onchange="changeModoRecorrenciaFields(this)">'+
                        '                               <option value="plano_trabalho" data-view="hide">Fim do Plano de Trabalho</option>'+
                        '                               <option value="data_determinada" data-view="show">Data determinada</option>'+
                        '                            </select>'+
                        '                        </td>'+
                        '                   </tr>'+
                        '                   <tr style="display:none;" class="modoDistribuicao_recorrente_fim_recorrencia">'+
                        '                        <td style="vertical-align: bottom; text-align: left;" class="label" colspan="2">'+
                        '                        </td>'+
                        '                        <td>'+
                        '                        </td>'+
                        '                        <td class="date">'+
                        '                            <input type="'+(config_unidade.count_horas ? 'datetime-local' : 'date')+'" onchange="calculoRecorrenciaAtiv(this)" id="ativ_data_fim_recorrencia" data-key="data_fim_recorrencia" data-name="data final de recorr\u00EAncia" value="'+prazoEntrega+'">'+
                        '                        </td>'+
                        '                   </tr>'+
                        '                   <tr>'+
                        '                        <td style="vertical-align: top; text-align: center;" class="label" colspan="4">'+
                        '                           <div id="ganttRecorrenciaPanel" style="max-width: 725px;position: relative;"></div>'+
                        '                        </td>'+
                        '                   </tr>'+
                        '               </table>'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr class="hrForm">'+
                        '           <td colspan="4">'+
                        '               <a class="newLink moreInfoBoxAtiv" onclick="moreInfoBoxAtiv(this)" style="font-size: 10pt;cursor: pointer;margin: -12px 0 0 0;float: right; background-color: #fff;">'+
                        '                   <i class="fas fa-'+(getOptionsPro('moreInfoBoxAtiv') == 'hide' ? 'plus' : 'minus' )+'-circle cinzaColor"></i> Op\u00E7\u00F5es'+
                        '               </a>'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr style="height: auto;">'+
                        '           <td colspan="4">'+
                        '               <table style="font-size: 10pt;width: 100%; '+(getOptionsPro('moreInfoBoxAtiv') == 'hide' ? 'display:none;' : '' )+'" class="moreInfoBox">'+
                        '                   <tr id="trAtivVinculacao" '+(value ? 'style="display:none"' : '')+'>'+
                        '                       <td style="vertical-align: bottom; text-align: left;" class="label" colspan="4">'+
                        '                            <table style="width: 100%; font-size: 10pt;">'+
                        '                                <tr>'+
                        '                                    <td style="padding-top: 15px; width: 130px; text-align: left;">'+
                        '                                        <label for="ativ_vinculacao"><i class="iconPopup iconSwitch fas fa-random cinzaColor"></i>Vincular '+__.demanda+'?</label>'+
                        '                                    </td>'+
                        '                                    <td style="width: 50px; text-align: left;">'+
                        '                                        <div class="onoffswitch">'+
                        '                                            <input type="checkbox" data-key="vinculacao" onchange="changeAtivVinculacaoSwitch(this)" name="onoffswitch" class="onoffswitch-checkbox" id="ativ_vinculacao" tabindex="0">'+
                        '                                            <label class="onoffswitch-label" for="ativ_vinculacao"></label>'+
                        '                                        </div>'+
                        '                                    </td>'+
                        '                                    <td>'+
                        '                                        <div id="div_ativ_lista_vinculacao" style="text-align: right; display:none;width: 530px !important;">'+
                        '                                            <select id="ativ_lista_vinculacao" data-key="lista_vinculacao">'+
                        '                                               <option value="0">&nbsp;</option>'+
                        '                                               '+getListAtivVinculacao()+
                        '                                           </select>'+
                        '                                        </div>'+
                        '                                    </td>'+
                        '                                </tr>'+
                        '                            </table>'+
                        '                        </td>'+
                        '                   </tr>'+
                        '                   <tr id="trAtivPrioridade" '+(!value ? 'style="display:none"' : '')+'>'+
                        '                       <td style="vertical-align: bottom; text-align: left;" class="label" colspan="4">'+
                        '                            <table style="width: 100%; font-size: 10pt;">'+
                        '                                <tr>'+
                        '                                    <td style="padding-top: 15px; width: 130px; text-align: left;">'+
                        '                                        <label for="ativ_prioridades"><i class="iconPopup iconSwitch fas fa-exclamation cinzaColor"></i>Priorizar '+__.demanda+'?</label>'+
                        '                                    </td>'+
                        '                                    <td style="width: 50px; text-align: left;">'+
                        '                                        <div class="onoffswitch">'+
                        '                                            <input type="checkbox" data-key="prioridades" onchange="changeAtivPrioritySwitch(this)" name="onoffswitch" class="onoffswitch-checkbox" id="ativ_prioridades" tabindex="0">'+
                        '                                            <label class="onoffswitch-label" for="ativ_prioridades"></label>'+
                        '                                        </div>'+
                        '                                    </td>'+
                        '                                    <td>'+
                        '                                        <div id="div_ativ_lista_prioridades" style="text-align: right; display:none;width: 530px !important;">'+
                        '                                            <select id="ativ_lista_prioridades" data-key="lista_prioridades"><option value="0">&nbsp;</option></select>'+
                        '                                        </div>'+
                        '                                    </td>'+
                        '                                </tr>'+
                        '                            </table>'+
                        '                        </td>'+
                        '                   </tr>'+
                        (value ? '' : 
                        '                   <tr id="trAtivChecklist">'+
                        '                       <td style="vertical-align: bottom; text-align: left;" class="label" colspan="4">'+
                        '                            <input type="hidden" id="ativ_checklist" data-key="lista_checklist" data-param="lista_checklist" value="'+(value && value.checklist ? value.checklist : '')+'">'+
                        '                            <table style="width: 100%; font-size: 10pt;">'+
                        '                                <tr>'+
                        '                                    <td style="padding-top: 15px; width: 130px; text-align: left;">'+
                        '                                        <label for="ativ_insert_checklist"><i class="iconPopup iconSwitch fas fa-check-double cinzaColor"></i>Inserir <br>Ckecklist?</label>'+
                        '                                    </td>'+
                        '                                    <td style="width: 50px; text-align: left;">'+
                        '                                        <div class="onoffswitch">'+
                        '                                            <input type="checkbox" data-key="checklist" onchange="changeAtivChecklistSwitch(this)" name="onoffswitch" class="onoffswitch-checkbox" id="ativ_insert_checklist" tabindex="0">'+
                        '                                            <label class="onoffswitch-label" for="ativ_insert_checklist"></label>'+
                        '                                        </div>'+
                        '                                    </td>'+
                        '                                    <td>'+
                        '                                        <div id="div_ativ_lista_checklist" style="text-align: right; display:none">'+
                        '                                            <table id="ativBox_checklist" data-format="array" data-key="checklist" data-mode-insert="'+(value && value.checklist ? 'manual' : 'auto')+'" style="font-size: 8pt !important;width: 100%; margin:0" class="tableOptionConfig tableSortable seiProForm tableDialog tableInfo tableZebraOdd tableFollow tableAtividades">'+
                        '                                                 <tbody>'+
                        '                                                 </tbody>'+
                        '                                                 <tfoot>'+
                        '                                                    <tr>'+
                        '                                                        <th colspan="3" style="text-align: right;">'+
                        '                                                            <a class="newLink addConfigItem" onclick="addConfigItem(this)" style="cursor: pointer; margin: 5px;display: inline-block;">'+
                        '                                                                <i class="fas fa-plus-circle cinzaColor" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                        '                                                                Adicionar novo item'+
                        '                                                            </a>'+
                        '                                                        </th>'+
                        '                                                    </tr>'+
                        '                                                 </tfoot>'+
                        '                                            </table>'+
                        '                                        </div>'+
                        '                                    </td>'+
                        '                                </tr>'+
                        '                            </table>'+
                        '                        </td>'+
                        '                   </tr>'+
                        '                   <tr>'+
                        '                       <td style="vertical-align: middle; text-align: left;" class="label">'+
                        '                            <label for="ativ_observacao_gerencial"><i class="iconPopup iconSwitch fas fa-comment-alt cinzaColor"></i>'+__.Observacao+' '+__.Gerencial+':</label>'+
                        '                        </td>'+
                        '                        <td colspan="3" style="text-align: left;">'+
                        '                            <textarea type="text" id="ativ_observacao_gerencial" '+(value ? '' : 'oninput="checkboxAnotacoesProcessoAtiv(this)"')+' style="width: 97%;" data-key="observacao_gerencial" value="'+((value && value.observacao_gerencial !== null && value.observacao_gerencial != '') ? value.observacao_gerencial : '')+'"></textarea>'+
                        ''+($('#ifrArvore').length > 0 ? 
                        '                               <table style="width: 100%;font-size: 10pt; display:none" id="tableAnotacoesProcessoAtiv">'+
                        '                                   <tbody>'+
                        '                                       <tr style="height: 40px;">'+
                        '                                           <td style="text-align: left;vertical-align: bottom;">'+
                        '                                               <label for="ativ_anotacoes_processo">'+
                        '                                                   <i class="iconPopup iconSwitch fas fa-sticky-note cinzaColor"></i>Adicionar '+__.observacao+' '+__.gerencial+' nas anota\u00E7\u00F5es do processo?</label>'+
                        '                                           </td>'+
                        '                                           <td style="width: 50px;">'+
                        '                                               <div class="onoffswitch" style="float: right;">'+
                        '                                                   <input type="checkbox" data-key="anotacoes_processo" name="onoffswitch" class="onoffswitch-checkbox" id="ativ_anotacoes_processo" tabindex="0">'+
                        '                                                   <label class="onoffswitch-label" for="ativ_anotacoes_processo"></label>'+
                        '                                               </div>'+
                        '                                           </td>'+
                        '                                       </tr>'+
                        '                                   </tbody>'+
                        '                               </table>'+
                        '' : '')+
                        '                        </td>'+
                        '                   </tr>'+
                        '                   <tr>'+
                        '                       <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '                            <label for="ativ_etiquetas"><i class="iconPopup iconSwitch fas fa-tags cinzaColor"></i>Etiquetas:</label>'+
                        '                        </td>'+
                        '                        <td colspan="3">'+
                        '                            <input type="text" id="ativ_etiquetas" data-key="etiquetas" value="'+(value && value.etiquetas ? (value.etiquetas !== null && value.etiquetas.length > 0 ? value.etiquetas.join(';') : '') : '')+'">'+
                        '                        </td>'+
                        '                   </tr>'+
                        '')+
                        '               </table>'+
                        '           </td>'+
                        '       </tr>'+
                        '   </table>'+
                        '</div>';

        var btnDialogBoxPro =   [{
                                    text: (id_demanda != 0) ? 'Editar' : 'Salvar',
                                    class: 'confirm',
                                    click: function(event) { 
                                        if (checkAtivRequiredFields(this, 'mark')) {
                                            var action = (id_demanda != 0) ? 'edit_atividade' : 'save_atividade';
                                            var param = extractDataAtiv(this);
                                                param.action = action;
                                                getServerAtividades(param, action);
                                        }
                                    }
                                }];
        if (id_demanda != 0) {
            if (value.data_inicio != '0000-00-00 00:00:00') {
                if (checkCapacidade('complete_atividade') || checkCapacidade('complete_edit_atividade')) {
                    btnDialogBoxPro.unshift({
                        text: (value.data_entrega == '0000-00-00 00:00:00') ? 'Concluir '+__.Demanda+'' : 'Editar Conclus\u00E3o',
                        icon: 'ui-icon-check',
                        click: function(event) { 
                            completeAtividade(id_demanda);
                        }
                    });
                }
            } else {
                if (checkCapacidade('start_atividade')) {
                    btnDialogBoxPro.unshift({
                        text: 'Iniciar Execu\u00E7\u00E3o',
                        icon: 'ui-icon-play',
                        click: function(event) { 
                            startAtividade(id_demanda);
                        }
                    });
                }
            }
            btnDialogBoxPro.unshift({
                text: 'Gerar Notifica\u00E7\u00E3o',
                icon: 'ui-icon-mail-closed',
                click: function(event) { 
                    notifyAtividade(id_demanda);
                }
            });
            if (checkCapacidade('delete_atividade')) {
                btnDialogBoxPro.unshift({
                    text: 'Excluir',
                    icon: 'ui-icon-trash',
                    click: function(event) { 
                        if (value.data_avaliacao != '0000-00-00 00:00:00') {
                            confirmaFraseBoxPro(__.A_demanda+' j\u00E1 possui avalia\u00E7\u00E3o cadastrada. Tem certeza que deseja excluir?', 'EXCLUIR', function() { deleteAtividade(id_demanda) });
                        } else if (value.data_entrega != '0000-00-00 00:00:00') {
                            confirmaFraseBoxPro(__.A_demanda+' j\u00E1 possui entrega realizada. Tem certeza que deseja excluir?', 'EXCLUIR', function() { deleteAtividade(id_demanda) });
                        } else {
                            confirmaBoxPro('Tem certeza que deseja excluir '+__.esta_demanda+'?', function() { deleteAtividade(id_demanda) }, 'Excluir');
                        }
                    }
                });
            }
        } else {
            if (checkCapacidade('edit_atividade')) {
                btnDialogBoxPro.unshift({
                    text: 'Editar '+__.Demandas,
                    icon: 'ui-icon-pencil',
                    click: function(event) { 
                        selectAtividadeBox('edit');
                    }
                });
                if (typeof arrayConfigAtividades.entidades[0].config.cadastro_simplificado !== 'undefined' && arrayConfigAtividades.entidades[0].config.cadastro_simplificado) {
                    btnDialogBoxPro.unshift({
                        text: 'Cadastro Simplificado',
                        icon: 'ui-icon-check',
                        click: function(event) { 
                            changeSaveAtividade('simple');
                        }
                    });
                }
            }
        }
        var titleBox = (id_demanda != 0) 
                            ? 'Editar '+__.demanda+': '+getTitleDialogBox(value)
                            : 'Criar  '+__.nova_demanda;
        resetDialogBoxPro('dialogBoxPro');
        dialogBoxPro = $('#dialogBoxPro')
            .html('<div class="dialogBoxDiv">'+htmlBox+'</div>')
            .dialog({
                title: titleBox,
                width: 780,
                open: function() { 
                    prepareFieldsReplace(this);
                },
                close: function() { 
                    $('#boxAtividade').remove();
                    cancelSelectedItensAtiv(id_demanda)
                    resetDialogBoxPro('dialogBoxPro');
                },
                buttons: btnDialogBoxPro
        });
        checkTagsIput();

        var selectAtiv = $('#ativ_id_atividade');
        var selectUser = $('#ativ_id_user');
        if (id_demanda != 0) {
            var selectComplexidade = $('#ativ_fator_complexidade');
            var inputPrazoEntrega = $('#ativ_prazo_entrega');
            // console.log(value);
            selectAtiv.trigger('change');
            selectComplexidade.val(value.fator_complexidade).trigger('change');
            inputPrazoEntrega.trigger('change');
        }
        if (dadosIfrArvore && id_demanda == 0) {
            var tipo_processo = dadosIfrArvore.tipo;
            var usuario = dadosIfrArvore.usuario;
            var prazo = dadosIfrArvore.prazo;
            if (tipo_processo) {
                selectAtiv.find('option').each(function(){
                    var config = $(this).data('config');
                    var config_tipo_processo = (typeof config !== 'undefined' && typeof config.tipo_processo !== 'undefined') ? config.tipo_processo : [];

                    if (config && config_tipo_processo.length > 0 && $.inArray(tipo_processo, config_tipo_processo) !== -1 ) {
                        selectAtiv.val($(this).val()).trigger('change');
                        return false;
                    }
                });
            }
            if (usuario) {    
                selectUser.find('option').each(function(){
                    var text = $(this).text().toLowerCase();
                    if (text == usuario.toLowerCase()) {
                        if ($(this).prop('disabled') == false && $(this).closest('optgroup').prop('disabled') == false) {
                            selectUser.val($(this).val()).trigger('change');
                            return false;
                        }
                    }
                });
            }
            if (prazo) { $('#ativ_dias_planejado').val(prazo).trigger('change') }
        }
        if (!checkCapacidade('select_user_atividade')) {
            selectUser.val(arrayConfigAtividades.perfil.id_user).trigger('change');
        } 
        if (checkProcessoHome) {
            multProcessUpdateInput();
        }
    }
}
function checkTagsIput(TimeOut = 9000) {
        if (TimeOut <= 0) { return; }
        if (typeof $().tagsInput !== 'undefined') {
            var ativEtiquetas = $('#ativ_etiquetas').tagsInput({
                interactive: true,
                placeholder: 'Adicionar etiqueta',
                minChars: 2,
                maxChars: 100,
                limit: 8,
                autocomplete_url: '',
                autocomplete: {'source': sugestEtiquetaPro('ativ') },
                hide: true,
                delimiter: [';'],
                unique: true,
                removeWithBackspace: true,
                onAddTag: changeAtivEtiqueta,
                onRemoveTag: changeAtivEtiqueta,
                onChange: changeAtivEtiqueta
            });
            $('.atividadeWork input.tag-input').on('blur', function(ev) {
                var text = $(this).val().trim();
                if (text != '') {
                    $(this).val('');
                    ativEtiquetas.addTag(text); 
                }
            });
        } else {
            $.getScript((URL_SEIPRO+"js/lib/jquery.tagsinput-revisited.js"));
            setTimeout(function(){ 
                checkTagsIput(TimeOut - 100); 
                console.log('Reload checkTagsIput'); 
            }, 500);
        }
}
function prepareFieldsReplace(this_) {
    if (checkBrowser() == 'Firefox') {
        changeInputDateTime(this_);
    }
    initChosenReplace('box_init', this_);
}
function calculoRecorrenciaAtiv(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.atividadeWork');
    var config_unidade = getBoxConfigDadosUnidade(_parent);
    var config_data_format = (config_unidade.count_horas) ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY';
    var _dias_planejado = _parent.find('#ativ_dias_planejado');
    var dias_planejado = parseInt(_dias_planejado.val());
    var _modo = _parent.find('#ativ_modo_recorrencia');
    var modo = _modo.val();
    var _numero_fixo = _parent.find('#ativ_recorrencia_numero_fixo');
    var _data_inicio = _parent.find('#ativ_data_inicio_recorrencia');
    var data_inicio = moment(_data_inicio.val(), config_unidade.hora_format);
    var hora_inicio_recorrencia = (config_unidade.count_horas) ? data_inicio.format('HH:mm') : config_unidade.h_util_inicio;
    var _modo_fim = _parent.find('#ativ_modo_fim_recorrencia');
    var _data_fim = _parent.find('#ativ_data_fim_recorrencia');
    var data_fim = moment(_data_fim.val(), config_unidade.hora_format);
    var hora_fim_recorrencia = (config_unidade.count_horas) ? data_fim.format('HH:mm') : config_unidade.h_util_fim;
    var _plano_user = _parent.find('#ativ_id_user').find('option:selected').data('config');
        _plano_user = (typeof _plano_user !== 'undefined') ? jmespath.search(arrayConfigAtividades.planos, "[?id_plano==`"+_plano_user.id_plano+"`] | [0]") : null;
    var _plano_user_data_fim_vigencia = (_plano_user !== null) ? _plano_user.data_fim_vigencia : false;
    var carga_horaria = (_plano_user !== null) ? _plano_user.carga_horaria : false;
    var data_fim_recorrencia = (_modo_fim.val() == 'data_determinada') 
                                ? moment(_data_fim.val(), config_unidade.hora_format) 
                                : moment(_plano_user_data_fim_vigencia,'YYYY-MM-DD HH:mm:ss');
    var dias_acrescimo = (modo != 'numero_fixo' && modo != 'numero_fixo_uteis') ? 1 : parseInt(_numero_fixo.val());
        dias_acrescimo = (modo == 'quinzena1' || modo == 'quinzena5') ? 2 : dias_acrescimo;
        dias_acrescimo = (modo == '3mes_inicio' || modo == '3mes_fim') ? 3 : dias_acrescimo;
        dias_acrescimo = (modo == '6mes_inicio' || modo == '6mes_inicio') ? 6 : dias_acrescimo;

    var viewModeGantt = (getOptionsPro('ganttRecorrenciasView')) ? getOptionsPro('ganttRecorrenciasView') : 'Week';

    var config_feriados = (typeof config_unidade.feriados !== 'undefined' && config_unidade.feriados !== null) ? config_unidade.feriados : false;
    var arrayFeriados = (config_unidade.count_dias_uteis && data_inicio.isValid() && data_fim_recorrencia.isValid() ) 
                        ? jmespath.search(getHolidayBetweenDates(data_inicio.format('Y')+'-01-01', data_fim.clone().add(1, 'Y').format('Y')+'-01-01', config_feriados), "[*].d_")
                        : [];

    var diff_acresc = (modo == 'diaria' || modo == 'numero_fixo' || modo == 'numero_fixo_uteis') ? 'days' : false;
        diff_acresc = (
                        modo == 'mes_inicio' || modo == 'mes_fim' || 
                        modo == '3mes_inicio' || modo == '3mes_fim' ||
                        modo == '6mes_inicio' || modo == '6mes_fim'
                    ) ? 'months' : diff_acresc;
        diff_acresc = (modo == 'semana1' || modo == 'semana5' || modo == 'quinzena1' || modo == 'quinzena5') ? 'weeks' : diff_acresc;
        diff_acresc = (modo == 'ano_inicio' || modo == 'ano_fim') ? 'years' : diff_acresc;

        console.log({diff_acresc: diff_acresc, arrayFeriados: arrayFeriados, dias_acrescimo: dias_acrescimo, config_unidade: config_unidade, _dias_planejado: _dias_planejado.val(),  _modo: _modo.val(),  _numero_fixo: _numero_fixo.val(),  _data_inicio: _data_inicio.val(),  _modo_fim: _modo_fim.val(),  _data_fim: _data_fim.val(),   _plano_user: _plano_user, data_fim_recorrencia: data_fim_recorrencia});

    var taskRecorrencia = [];
    var dataFall = '';

    if (diff_acresc) {
        var index = 0
        var dataInitRef = data_inicio.clone();
        if (modo == 'numero_fixo_uteis') {
            getDateAddWeekdaysFromSet(dataInitRef, 0);
        } else {
            var initDate = getRecorrenciaAtiv(data_inicio.clone(), dias_planejado, arrayFeriados, modo, config_unidade, index, hora_inicio_recorrencia, hora_fim_recorrencia, dataInitRef, data_fim_recorrencia);
            if (initDate) {
                taskRecorrencia.push(initDate);
                // console.log('check', initDate.start_ >= dataInitRef, initDate.start_.format(config_data_format), dataInitRef.format(config_data_format), data_fim_recorrencia.format(config_data_format));
                index++;
            }
            while(data_inicio.add(dias_acrescimo, diff_acresc).diff(data_fim_recorrencia) < 0) {
                var dataRef = data_inicio.clone();
                var newDate = getRecorrenciaAtiv(dataRef, dias_planejado, arrayFeriados, modo, config_unidade, index, hora_inicio_recorrencia, hora_fim_recorrencia, dataInitRef, data_fim_recorrencia);
                if (newDate) {
                    taskRecorrencia.push(newDate);
                    index++;
                    // console.log('check', newDate.start_ >= dataInitRef, newDate.start_.format(config_data_format), dataInitRef.format(config_data_format), data_fim_recorrencia.format(config_data_format));
                }
            }
            // console.log(taskRecorrencia, _data_inicio.val(), dias_acrescimo, diff_acresc, _data_fim.val(), data_fim_recorrencia.format(config_data_format));
        }

        function getDateAddWeekdaysFromSet(dt_init, index) {
            if (index == 0) {
                var nextIndex = index+1;
                var dt_next = (dt_init.weekday() != 0 && arrayFeriados.indexOf(dt_init.format('YYYY-MM-DD')) === -1) ? dt_init : dt_init.clone().addWorkdays(0, arrayFeriados);
                // dias_acrescimo = (dias_acrescimo > 0) ? dias_acrescimo-1 : dias_acrescimo;
            } else if (dt_init <= data_fim_recorrencia) {
                var nextIndex = index+1;
                var dt_next = dt_init.isoAddWeekdaysFromSet({  
                                    'workdays': dias_acrescimo,  
                                    'weekdays': [1,2,3,4,5],
                                    'exclusions': arrayFeriados
                                    });
            } else {
                var dt_next = false; 
            }
            if (dt_next) {
                // console.log(dt_init.format('DD/MM/YYYY'), dt_next.format('DD/MM/YYYY'), data_fim.format('DD/MM/YYYY'));
                var initDateWk = getRecorrenciaAtiv(dt_next, dias_planejado, arrayFeriados, modo, config_unidade, nextIndex, hora_inicio_recorrencia, hora_fim_recorrencia, dataInitRef, data_fim_recorrencia);
                if (initDateWk) { taskRecorrencia.push(initDateWk) }
                    getDateAddWeekdaysFromSet(dt_next, nextIndex);
            }
        }

        $('#ganttRecorrenciaPanel').html('');
        if (taskRecorrencia.length > 0) {

            var param = {
                count_dias_uteis: config_unidade.count_dias_uteis,
                count_horas: config_unidade.count_horas,
                h_dataInicio: taskRecorrencia[0].start_,
                h_dataFim: taskRecorrencia[0].end_,
                h_utilInicio: moment(taskRecorrencia[0].end_.format('YYYY-MM-DD')+'T'+config_unidade.h_util_inicio, 'YYYY-MM-DDTHH:mm'),
                h_utilFim: moment(taskRecorrencia[0].start_.format('YYYY-MM-DD')+'T'+config_unidade.h_util_fim, 'YYYY-MM-DDTHH:mm'),
                carga_horaria: carga_horaria,
                valueDias: dias_planejado
            };
            var tempoTrabalho = (carga_horaria) ? getTempoTrabalhoAtiv(param) : false;
            // console.log(param, tempoTrabalho);

            if (tempoTrabalho) {
                tempoTrabalho = (tempoTrabalho < 1) ? tempoTrabalho.toFixed(3) : tempoTrabalho.toFixed(1);
                _parent.find('#ativ_tempo_planejado').val(tempoTrabalho);
                var updateAtiv = _parent.find('#ativ_fator_complexidade');
                // var updateAtiv = _parent.find('#ativ_id_atividade');

                if (typeof updateAtiv.data('update_recorrencia') === 'undefined' || updateAtiv.data('update_recorrencia') == false) {
                    console.log('updateAtiv update_recorrencia', updateAtiv.data('update_recorrencia'));
                    updateAtiv.data('update_recorrencia', true);
                    setTimeout(function(){ 
                        updateAtiv.trigger('change');
                        setTimeout(function(){ updateAtiv.data('update_recorrencia', false) }, 1500);
                    }, 500);
                }
            }

            var arrayTaskRecorrencia = jmespath.search(taskRecorrencia,"[*].{id: id, data_distribuicao: start_format, prazo_entrega: end_format}");
            _parent.find('#ativ_recorrencia').val(JSON.stringify(arrayTaskRecorrencia));
            // console.log('arrayTaskRecorrencia',arrayTaskRecorrencia);

            var gantt = new Gantt("#ganttRecorrenciaPanel", taskRecorrencia,{
                header_height: 50,
                column_width: 10,
                step: 24,
                language: 'en',
                language: 'ptBr',
                view_modes: ['Day', 'Week', 'Month'],
                bar_height: 15,
                bar_corner_radius: 3,
                arrow_curve: 5,
                padding: 18,
                edit_task: false,
                view_mode: viewModeGantt,   
                date_format: 'YYYY-MM-DD',
                custom_popup_html: function(task) {
                    var html = '<div class="details-container seiProForm">'+
                                '   <table class="tableInfo tableLine">'+
                                '      <tr>'+
                                '           <td colspan="2" class="td_view">'+
                                '               <h5><i class="iconPopup fas fa-check-circle cinzaColor"></i> '+
                                '                   <span class="boxInfo" style="font-size: 11pt;font-weight: bold;width: 85%;text-align: left;display: inline-block;">'+__.Demanda+' #'+(parseInt(task.id)+1)+'</span>'+
                                '                   <a style="float: right; margin: -4px -4px 0 0; padding: 5px;" onclick="ganttRecorrencias.hide_popup()"><i class="far fa-times-circle cinzaColor"></i></a>'+
                                '               </h5>'+
                                '           </td>'+
                                '      </tr>'+
                                '      <tr style="height: 40px;">'+
                                '          <td style="vertical-align: bottom; width: 180px;"><i class="iconPopup iconSwitch fas fa-briefcase cinzaColor"></i>Data de Distribui\u00E7\u00E3o:</td>'+
                                '          <td class="td_view">'+task.start_.format(config_data_format)+'</td>'+
                                '      </tr>'+
                                '      <tr style="height: 40px;">'+
                                '          <td style="vertical-align: bottom;"><i class="iconPopup iconSwitch fas fa-business-time cinzaColor"></i>Prazo de Entrega:</td>'+
                                '          <td class="td_view">'+task.end_.format(config_data_format)+'</td>'+
                                '      </tr>'+
                                '   </table>'+
                                '</div>';
                            return html;
                },
                on_click: function (task) {
                    console.log(task);
                }
            });
            ganttRecorrencias = gantt;
            if (!getOptionsPro('panelHeight_recorrenciasGanttPro') && $('#ganttRecorrenciaPanel').height() > 500) { setOptionsPro('panelHeight_recorrenciasGanttPro', 500) }
            $('#ganttRecorrenciaPanel').find('.gantt-container').addClass('tabelaPanelScroll');
            initPanelResize('.gantt-container', 'ganttRecorrenciaPanel');

            if (ganttRecorrencias && ganttRecorrencias.bars.length > 0) {
                var scrollLeft = ganttRecorrencias.bars[0].x-20;
                var windowDiv = $('#ganttRecorrenciaPanel').find('.gantt-container');
                    windowDiv.animate({scrollLeft: scrollLeft}, 500);
    
                var popupRecorreAtiv = $('#ganttRecorrenciaPanel').find('.popup-wrapper');
                if (popupRecorreAtiv.length > 0) {
                    var observerPopupRecorreAtiv = new MutationObserver(function(mutations) {
                        var _this = $(mutations[0].target);
                        var _parent = _this.closest('.gantt-container');
                        if (_this.is(':visible')) {
                            _parent.attr('style', function(i,s) { return (s || '') + 'position: relative !important;' });
                            _parent.find('.ui-resizable-handle').hide();
                        } else {
                            _parent.attr('style', function(i,s) { return (s || '') + 'position: initial !important;' });
                            _parent.find('.ui-resizable-handle').show();
                        }
                    });
                    observerPopupRecorreAtiv.observe(popupRecorreAtiv.get(0), {
                        attributes: true
                    });
                }
            }
        } else {
            dataFall = '<div class="gantt-container dataFallback" style="z-index:9;" data-text="Nenhum dado dispon\u00EDvel"></div>';
        }
        
        var btnGroupView =  '<div style="position: absolute; right: 0; z-index: 99;">'+
                            '   <div class="btn-group" role="group" style="float: right;">'+
                            '       <button type="button" data-value="Day" class="btn btn-sm btn-light '+(getOptionsPro('ganttRecorrenciasView') == 'Day' ? 'active' : '')+'">Dia</button>'+
                            '       <button type="button" data-value="Week" class="btn btn-sm btn-light '+(getOptionsPro('ganttRecorrenciasView') == 'Week' ? 'active' : '')+'">Semana</button>'+
                            '       <button type="button" data-value="Month" class="btn btn-sm btn-light '+(getOptionsPro('ganttRecorrenciasView') == 'Month' || !getOptionsPro('ganttRecorrenciasView') ? 'active' : '')+'">M\u00EAs</button>'+
                            '       <button type="button" data-value="Year" class="btn btn-sm btn-light '+(getOptionsPro('ganttRecorrenciasView') == 'Year' ? 'active' : '')+'">Ano</button>'+
                            '   </div>'+
                            '</div>';

        var counterTaskRecorrencia = (taskRecorrencia.length > 0) 
            ? '<div style="padding:8px;color:#666;text-align: right;font-size: 9pt;"><i class="fa fa-info-circle azulColor"></i> '+(taskRecorrencia.length > 1 ? taskRecorrencia.length+' '+__.demandas_programadas : '1 '+__.demanda_programada)+'</div>' 
            : '';

        $('#ganttRecorrenciaPanel').prepend(counterTaskRecorrencia+btnGroupView+dataFall);
        $("#ganttRecorrenciaPanel .btn-group").on("click", "button", function() {
            $btn = $(this);
            var mode = $btn.data('value');
            $btn.parent().find('button').removeClass('active'); 
            $btn.addClass('active');
            ganttRecorrencias.change_view_mode(mode);
            setOptionsPro('ganttRecorrenciasView', mode);
        });
    }
}
function getRecorrenciaAtiv(newDate, dias_planejado, arrayFeriados, modo, config_unidade, index, hora_inicio_recorrencia, hora_fim_recorrencia, dataInitRef, dataEndRef) {
    var config_data_format = (config_unidade.count_horas) ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY';
    var config_data_format_sys = 'YYYY-MM-DD HH:mm:ss';
        newDate = (modo == 'semana1' || modo == 'quinzena1') ? newDate.startOf('isoweek') : newDate;
        newDate = (modo == 'semana5' || modo == 'quinzena5') ? newDate.startOf('isoweek').add('days', 4) : newDate;
        newDate = (modo == 'mes_inicio' || modo == '3mes_inicio' || modo == '6mes_inicio') ? newDate.startOf('month') : newDate;
        newDate = (modo == 'mes_fim' || modo == '3mes_fim' || modo == '6mes_fim') ? newDate.endOf('month') : newDate;
        newDate = (modo == 'ano_inicio') ? newDate.startOf('year') : newDate;
        newDate = (modo == 'ano_fim') ? newDate.endOf('year') : newDate;
    var newDate_format = newDate.format('YYYY-MM-DD');
    if (modo) {
    // if ((modo != 'diaria' && modo != 'numero_fixo') || ((modo == 'diaria' || modo == 'numero_fixo') && newDate.weekday() != 6 && newDate.weekday() != 0 && arrayFeriados.indexOf(newDate_format) === -1)) {
        var dt_init_ativ = nextWorkDay(newDate, arrayFeriados, modo, config_unidade);
            dt_init_ativ = (config_unidade.count_horas) ? moment(dt_init_ativ.format('YYYY-MM-DD')+'T'+hora_inicio_recorrencia, config_unidade.hora_format) : dt_init_ativ;
        var dt_end_ativ = (dias_planejado > 0) 
                        ? (config_unidade.count_dias_uteis) 
                            ? dt_init_ativ.clone().addWorkdays(dias_planejado, arrayFeriados) 
                            : dt_init_ativ.clone().add(dias_planejado) 
                        : dt_init_ativ;
            dt_end_ativ = (config_unidade.count_horas) ? moment(dt_end_ativ.format('YYYY-MM-DD')+'T'+hora_fim_recorrencia, config_unidade.hora_format) : dt_end_ativ;
        // console.log(newDate_format, newDate.weekday(), dt_init_ativ.format(config_data_format), dt_end_ativ.format(config_data_format));

        return (dt_init_ativ >= dataInitRef && dt_init_ativ <= dataEndRef) 
            ? {
                id: index.toString(), 
                start_: dt_init_ativ, 
                start: dt_init_ativ.format('YYYY-MM-DD'), 
                start_format: dt_init_ativ.format(config_data_format_sys), 
                end_: dt_end_ativ, 
                end: dt_end_ativ.format('YYYY-MM-DD'),
                end_format: dt_end_ativ.format(config_data_format_sys), 
                progress: 0,
                custom_class: 'bar-iniciado',
                name: __.Demanda+' #'+(index+1)+' em '+dt_init_ativ.format(config_data_format),
                dependencies: (index == 0 ? '' : index-1).toString()
            } : false;
    } else {
        return false;
    }
}
function nextWorkDay(date, arrayFeriados, modo, config_unidade) {
    var date_format = date.format('YYYY-MM-DD');
    if (config_unidade.count_dias_uteis && (date.weekday() == 6 || date.weekday() == 0 || arrayFeriados.indexOf(date_format) !== -1)) {
        return date.addWorkdays((modo == 'mes_fim' ? -1 : 1), arrayFeriados);
    } else {
        return date;
    }
}
function changeModoRecorrenciaFields(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.atividadeWork');
    var type = _this.data('type');
    var mode_select = _this.find('option:selected').data('view');
    if (mode_select == 'show') {
        _parent.find('.modoDistribuicao_recorrente_'+type).show();
        if (_this.val() == 'numero_fixo_uteis') {
            _parent.find('#label_recorrencia_numero_fixo').hide();
            _parent.find('#label_recorrencia_numero_fixo_uteis').show();
        } else if (_this.val() == 'numero_fixo') {
            _parent.find('#label_recorrencia_numero_fixo').show();
            _parent.find('#label_recorrencia_numero_fixo_uteis').hide();

        } else {
            _parent.find('#label_recorrencia_numero_fixo').hide();
            _parent.find('#label_recorrencia_numero_fixo_uteis').hide();
        }
    } else {
        _parent.find('.modoDistribuicao_recorrente_'+type).hide();
    }
    calculoRecorrenciaAtiv(this_);
}
function addAtividadesAlertModeMult(this_, mode = 'remove') {
    var _this = $(this_);
    var _parent = _this.closest('.atividadeWork');
    _parent.find('.atividadesAlertModeMult').remove();
    if (mode != 'remove') {
        var htmlAtivAlertMult = '<div class="atividadesAlertModeMult" style="float: left;margin: -14px 0 0 0;transform: scale(0.9);background-color: #f9efad;padding: 5px 8px;border-radius: 5px;">'+
                                '   <i class="fas fa-exclamation-circle azulColor"></i>  '+__.Demanda+' recorrente incompat\u00EDvel com a cria\u00E7\u00E3o de '+__.demandas+' em m\u00FAltiplos processos'+
                                '</div>';
            _parent.find('.atividadesBtnModeDist').before(htmlAtivAlertMult);
    }
}
function changeModeDistribuicao(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.atividadeWork');
    var data = _this.data();
    if (data.value == 'Determinada') {
        _parent.find('.modoDistribuicao_determinada').show();
        _parent.find('.modoDistribuicao_recorrente').hide();
        _parent.find('#ativ_recorrencia').val('[]');
        _parent.find('#ativ_prazo_entrega').trigger('change');
        setTimeout(function(){ 
            _parent.find('#ativ_fator_complexidade').trigger('change');
        }, 500);
        if (!_parent.find('.ativMultiProcesso').is(':visible') && !_parent.find('#ativ_multiprocesso').is(':visible') && _parent.find('.ativMultiProcesso .ativProcessos').length > 0) {
            _parent.find('.ativMultiProcesso').show();
            multProcessUpdateInput();
        }
        addAtividadesAlertModeMult(this_, 'remove');
    } else if (data.value == 'Recorrente') {
        _parent.find('.modoDistribuicao_determinada').hide();
        _parent.find('.modoDistribuicao_recorrente').show();
        calculoRecorrenciaAtiv(this_);
        if (_parent.find('#ativ_multiprocesso').is(':visible') && _parent.find('#ativ_multiprocesso').is(':checked')) {
            _parent.find('#ativ_multiprocesso').prop('checked',false).trigger('change');
            addAtividadesAlertModeMult(this_, 'add');
        }
        if (_parent.find('.ativMultiProcesso').is(':visible') && !_parent.find('#ativ_multiprocesso').is(':visible')) {
            _parent.find('.ativMultiProcesso').hide();
            _parent.find('#ativ_id_procedimentos').val('[]');
            _parent.find('#ativ_id_user').trigger('change');
            addAtividadesAlertModeMult(this_, 'add');
        }
    }
    _this.closest('.atividadesBtnModeDist').find('.btn').removeClass('active');
    _this.addClass('active');
    initChosenReplace('box_reload', this_);
}
function changeAtivMultiProcesso(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.atividadeWork');
    if(_this.is(':checked')) {
        _parent.find('.ativMultiProcesso').show();
        multProcessUpdateInput();
        if ($('.atividadesBtnModeDist button[data-value="Recorrente"]').hasClass('active')) {
            $('.atividadesBtnModeDist button[data-value="Determinada"]').trigger('click');
            addAtividadesAlertModeMult(this_, 'remove');
        }
    } else {
        _parent.find('.ativMultiProcesso').hide();
        _parent.find('#ativ_id_procedimentos').val('[]');
        _parent.find('#ativ_id_user').trigger('change');
    }
}
function multProcessUpdateInput() {
    var _parent = $('#boxAtividade.atividadeWork');
    var divList = _parent.find('.ativMultiProcesso');
    var ativProcessos = divList.find('.listMultProcessos span.ativProcessos').map(function(){
                            return {processo_sei: $(this).data('processo'), id_procedimento: $(this).data('procedimento').toString()} 
                        }).get();
        divList.find('#ativ_id_procedimentos').val(JSON.stringify(ativProcessos));
        divList.find('.counterMultProcessos').text('('+ativProcessos.length+' '+(ativProcessos.length > 1 ? 'processos' : 'processo')+')');
        _parent.find('#ativ_id_user').trigger('change');
}
function multProcessRemove(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.atividadeWork');
        _this.closest('.ativProcessos').remove();
        multProcessUpdateInput();
}
function completeAtividade(id_demanda, confirmeBox = false) {
    var dadosIfrArvore = getIfrArvoreDadosProcesso();
    var value = jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+id_demanda+"`] | [0]");
    if (!checkSignDocsPlano(value)) {
        alertSignDocsPlano(value);
    } else {
        if (!confirmeBox && dadosIfrArvore && value.requisicao_sei == dadosIfrArvore.nr_sei) {
            confirmaBoxPro('O documento de entrega selecionado \u00E9 igual ao documento de requisi\u00E7\u00E3o. Deseja continuar?', function(){ completeAtividade(id_demanda, true) }, 'Continuar...');
        } else {
            var check_ispaused = (typeof value.data_retomada !== 'undefined' && value.data_retomada !== null && value.data_retomada == '0000-00-00 00:00:00') ? true : false;
            if (check_ispaused) {
                confirmaBoxPro(__.A_demanda+' est\u00E1 '+getNameGenre('demanda', 'paralisado', 'paralisada')+'. Deseja retom\u00E1-la agora?', function(){ pauseAtividade(id_demanda) }, __.Retomar+'...', cancelMoveKanbanItens);
            } else {
                var check_isresumed = (typeof value.data_retomada !== 'undefined' && value.data_retomada !== null && value.data_retomada != '0000-00-00 00:00:00') ? true : false;
                var config_unidade = getConfigDadosUnidade(value.sigla_unidade);
                var optionSelectDocumentos = ( arrayConfigAtividades.tipos_documentos.length > 0 ) ? $.map(arrayConfigAtividades.tipos_documentos, function(v,k){ return ( (value && v.id_tipo_documento == value.id_tipo_documento) || (dadosIfrArvore && dadosIfrArvore.nome_documento.indexOf(v.nome_documento) !== -1) ) ? '<option value="'+v.id_tipo_documento+'" selected>'+v.nome_documento+'</option>' : '<option value="'+v.id_tipo_documento+'">'+v.nome_documento+'</option>' }).join('') : '';
                var selectDocumentos = '<select id="ativ_id_tipo_documento" onchange="checkThisAtivRequiredFields(this)" data-key="id_tipo_documento" required><option>&nbsp;</option>'+optionSelectDocumentos+'</select>';
                var dataInicio = moment(value.data_inicio, 'YYYY-MM-DD HH:mm:ss').format(config_unidade.hora_format);
                var dataEntrega = (value.data_entrega != '0000-00-00 00:00:00') 
                                ? moment(value.data_entrega, 'YYYY-MM-DD HH:mm:ss').format(config_unidade.hora_format)
                                : (dadosIfrArvore && typeof dadosIfrArvore.data_documento !== 'undefined' && dadosIfrArvore.data_documento) 
                                    ? moment(dadosIfrArvore.data_documento, 'DD/MM/YYYY HH:mm').format(config_unidade.hora_format)
                                    : moment().format(config_unidade.hora_format);
                                    // console.log(value.data_entrega, dadosIfrArvore, dadosIfrArvore.data_document);
                var dataDistribuicao = moment(value.data_distribuicao, 'YYYY-MM-DD HH:mm:ss').format(config_unidade.hora_format);
                var inputAtiv = jmespath.search(arrayConfigAtividades.atividades, "[?id_atividade==`"+value.id_atividade+"`].{sigla_unidade: sigla_unidade, id_unidade: id_unidade, dias_planejado: dias_planejado, tempo_pactuado: tempo_pactuado, complexidade: config.complexidade, etiqueta: config.etiqueta.lista, tipo_processo: config.tipo_processo, desativa_produtividade: config.desativa_produtividade} | [0]");
                    inputAtiv = (inputAtiv !== null) ? "<input type='hidden' id='ativ_id_atividade' data-key='id_atividade' data-param='id_atividade' data-config='"+JSON.stringify(inputAtiv)+"' value='"+value.id_atividade+"'>" : '';
                var inputUser = jmespath.search(arrayConfigAtividades.planos, "[?id_user==`"+value.id_user+"`].{id_plano: id_plano, sigla_unidade: sigla_unidade, nome_modalidade: nome_modalidade, carga_horaria: carga_horaria} | [0]");
                    inputUser = (inputUser !== null) ? "<input type='hidden' id='ativ_id_user' data-key='id_user' data-param='id_user' data-config='"+JSON.stringify(inputUser)+"' value='"+value.id_user+"'>" : '';

                var listAtividadesVinculadas = getAtividadesVinculadas(value, 'concluidas');
                    
                var htmlBox =   '<div id="boxAtividade" class="atividadeWork" data-demanda="'+(value && value.id_demanda ? value.id_demanda : 0)+'">'+
                                '   <table style="font-size: 10pt;width: 100%;" class="seiProForm">'+
                                '      <tr>'+
                                '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                                '               <label for="ativ_id_tipo_documento"><i class="iconPopup iconSwitch fas fa-file-signature cinzaColor"></i>Documento:</label>'+
                                '               '+inputAtiv+
                                '               '+inputUser+
                                '           </td>'+
                                '           <td class="required" style="width: 230px;">'+
                                '               '+selectDocumentos+
                                '           </td>'+
                                '           <td style="vertical-align: bottom;" class="label">'+
                                '               <label class="last" for="ativ_documento_sei"><i class="iconPopup iconSwitch fas fa-file cinzaColor"></i>SEI n\u00BA:</label>'+
                                '           </td>'+
                                '           <td>'+
                                '               <input type="text" oninput="this.value=this.value.replace(/[^0-9]/g,\'\')" id="ativ_documento_sei" onchange="changeProtocoloBoxAtiv(this)" maxlength="11" data-key="documento_sei" value="'+(value && value.documento_sei !== null && parseInt(value.documento_sei) != 0  ? value.documento_sei : (dadosIfrArvore && dadosIfrArvore.nr_sei ? dadosIfrArvore.nr_sei : '') )+'">'+
                                '               <input type="hidden" id="ativ_id_documento_entregue" data-key="id_documento_entregue" data-param="id_documento_entregue" value="'+(value && value.id_documento_entregue !== null && value.id_documento_entregue != '0' ? value.id_documento_entregue : (dadosIfrArvore && dadosIfrArvore.id_documento ? dadosIfrArvore.id_documento : '') )+'">'+
                                '           </td>'+
                                '      </tr>'+
                                '      <tr>'+
                                '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                                '               <label for="ativ_numero_documento"><i class="iconPopup iconSwitch fas fa-file cinzaColor"></i>Descri\u00E7\u00E3o do Documento:</label>'+
                                '           </td>'+
                                '           <td colspan="3">'+
                                '               <input type="text" id="ativ_numero_documento" onchange="checkThisAtivRequiredFields(this)" maxlength="255" data-key="numero_documento" value="'+(value && value.numero_documento !== null ? value.numero_documento : (dadosIfrArvore && dadosIfrArvore.numero_documento ? dadosIfrArvore.numero_documento : '' ) )+'">'+
                                '           </td>'+
                                '      </tr>'+
                                '      <tr class="hrForm"><td colspan="4"></td></tr>'+
                                '      <tr>'+
                                '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                                '               <label for="ativ_data_inicio"><i class="iconPopup iconSwitch fas fa-play-circle cinzaColor"></i>Data de In\u00EDcio:</label>'+
                                '           </td>'+
                                '           <td class="required date">'+
                                '               <input type="'+(config_unidade.count_horas ? 'datetime-local' : 'date')+'" onchange="changeDadosTrabalho(this)" id="ativ_data_inicio" data-key="data_inicio" data-type="inicio" data-name="data de in\u00EDcio" value="'+dataInicio+'" min="'+dataDistribuicao+'" required>'+
                                '           </td>'+
                                '           <td style="vertical-align: bottom;" class="label">'+
                                '               <label class="last" for="ativ_data_entrega"><i class="iconPopup iconSwitch fas fa-user-clock cinzaColor" style="float: initial;"></i>Data de Entrega:</label>'+
                                '           </td>'+
                                '           <td class="required date">'+
                                '               <input type="'+(config_unidade.count_horas ? 'datetime-local' : 'date')+'" onchange="changeDadosTrabalho(this)" id="ativ_data_entrega" data-key="data_entrega" data-type="fim" data-name="data de entrega" value="'+dataEntrega+'" min="'+dataDistribuicao+'" required>'+
                                '           </td>'+
                                '      </tr>'+
                                '      <tr '+(check_isresumed ? '': 'style="display:none"')+'>'+
                                '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                                '               <label for="ativ_tempo_pausado"><i class="iconPopup iconSwitch fas fa-clock cinzaColor"></i>Tempo '+__.Paralisado+':</label>'+
                                '           </td>'+
                                '           <td>'+
                                '               <input type="number" min="0.1" step=".1" id="ativ_tempo_pausado" data-key="tempo_pausado" value="0" disabled>'+
                                '           </td>'+
                                '           <td style="vertical-align: middle;text-align: left;padding-left: 25px;" class="label" colspan="2">'+
                                '               <button type="button" id="manPauseAtividade" '+(checkCapacidade('pause_atividade') ? '' : 'style="display:none"')+' class="confirm ui-button ui-corner-all ui-widget"><span class="ui-button-icon ui-icon ui-icon-calendar"></span><span class="ui-button-icon-space"> </span>Gerenciar Paralisa\u00E7\u00F5es</button>'+
                                '           </td>'+
                                '      </tr>'+
                                '      <tr>'+
                                '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                                '               <label for="ativ_tempo_despendido"><i class="iconPopup iconSwitch fas fa-hourglass-half cinzaColor"></i>Tempo Despendido:</label>'+
                                '           </td>'+
                                '           <td class="td_tempo_despendido" data-tempo="'+decimalHourToMinute(value && value.tempo_despendido ? value.tempo_despendido : '0')+'">'+
                                '               <input type="number" min="0.1" step=".1" id="ativ_tempo_despendido" onchange="changeDadosTrabalho(this)" data-key="tempo_despendido" data-type="tempo" value="'+(value && value.tempo_despendido ? value.tempo_despendido : '0')+'" disabled>'+
                                '           </td>'+
                                '           <td style="vertical-align: bottom;" class="label">'+
                                '               <label class="last" for="ativ_dias_despendido"><i class="iconPopup iconSwitch fas fa-calendar-alt cinzaColor" style="float: initial;"></i><span id="ativ_dias_despendido_label">Dias '+(config_unidade.count_dias_uteis ? '\u00FAteis' : '')+' Despendido</span>:</label>'+
                                '           </td>'+
                                '           <td class="required number">'+
                                '               <input type="number" min="0" id="ativ_dias_despendido" onchange="changeDadosTrabalho(this)" data-key="dias_despendido" data-type="dias" value="'+(value && value.dias_despendido ? value.dias_despendido : '0')+'" required>'+
                                '           </td>'+
                                '      </tr>'+
                                '      <tr>'+
                                '          <td style="vertical-align: middle; text-align: left;" class="label">'+
                                '               <label for="ativ_observacao_tecnica"><i class="iconPopup iconSwitch fas fa-comment-alt cinzaColor"></i>'+__.Observacao+' '+__.Tecnica+':</label>'+
                                '           </td>'+
                                '           <td colspan="3">'+
                                '               <textarea type="text" id="ativ_observacao_tecnica" '+((value.data_entrega == '0000-00-00 00:00:00') ? 'oninput="checkboxAnotacoesProcessoAtiv(this)"' : '')+' data-key="observacao_tecnica" value="'+((value && value.observacao_tecnica !== null && value.observacao_tecnica != '') ? value.observacao_tecnica : '')+'"></textarea>'+
                                ''+($('#ifrArvore').length > 0 ? 
                                '               <table style="width: 100%;font-size: 10pt; display:none" id="tableAnotacoesProcessoAtiv">'+
                                '                   <tbody>'+
                                '                       <tr style="height: 40px;">'+
                                '                           <td style="text-align: left;vertical-align: bottom;">'+
                                '                               <label for="ativ_anotacoes_processo">'+
                                '                                   <i class="iconPopup iconSwitch fas fa-sticky-note cinzaColor"></i>Adicionar '+__.observacao+' '+__.tecnica+' nas anota\u00E7\u00F5es do processo?</label>'+
                                '                           </td>'+
                                '                           <td>'+
                                '                               <div class="onoffswitch" style="float: right;">'+
                                '                                   <input type="checkbox" data-key="anotacoes_processo" name="onoffswitch" class="onoffswitch-checkbox" id="ativ_anotacoes_processo" tabindex="0">'+
                                '                                   <label class="onoffswitch-label" for="ativ_anotacoes_processo"></label>'+
                                '                               </div>'+
                                '                           </td>'+
                                '                       </tr>'+
                                '                   </tbody>'+
                                '               </table>'+
                                '' : '')+
                                '           </td>'+
                                '      </tr>'+
                                '      <tr>'+
                                '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                                '               <label for="ativ_tempo_pactuado"><i class="iconPopup iconSwitch fas fa-handshake cinzaColor"></i>Tempo Pactuado:</label>'+
                                '           </td>'+
                                '           <td colspan="3" style="text-align: left;">'+
                                '               <span id="ativ_tempo_pactuado">'+getTagTempoPactuadoAtiv(value)+'</span>'+
                                '           </td>'+
                                '      </tr>'+
                                '      <tr>'+
                                '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                                '               <label for="ativ_produtividade"><i class="iconPopup iconSwitch fas fa-toolbox cinzaColor"></i>Produtividade:</label>'+
                                '           </td>'+
                                '           <td colspan="3" style="text-align: left;">'+
                                '               <span id="ativ_produtividade">'+getInfoAtividadeProdutividade(value, true)+'</span>'+
                                '           </td>'+
                                '      </tr>'+
                                (value.checklist && value.checklist.length > 0 ?
                                '      <tr>'+
                                '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                                '               <label for="ativ_produtividade"><i class="iconPopup iconSwitch fas fa-check-double cinzaColor"></i>Checklist:</label>'+
                                '           </td>'+
                                '           <td colspan="3" style="text-align: left;">'+
                                '               '+getInfoAtividadeChecklist(value, 'actions')+
                                '           </td>'+
                                '      </tr>'+
                                '' : '')+
                                (listAtividadesVinculadas.length_check > 0 ? 
                                '      <tr>'+
                                '           <td colspan="4">'+
                                '               '+listAtividadesVinculadas.input+
                                '               <table style="font-size: 10pt;width: 100%; margin: 10px 0;" class="seiProForm">'+
                                '                  <tr style="height: 40px;">'+
                                '                      <td style="vertical-align: bottom; text-align: left;" class="label">'+
                                '                           <label for="complete_others"><i class="iconPopup iconSwitch fas fa-check-circle cinzaColor"></i> '+(listAtividadesVinculadas.length_check > 1 ? 'Concluir '+getNameGenre('demanda', 'os outros', 'as outras')+' '+listAtividadesVinculadas.length_check+' '+__.demandas+' '+getNameGenre('demanda', 'vinculados', 'vinculadas') : 'Concluir '+__.a_outra_demanda_vinculada)+'?</label>'+
                                '                      </td>'+
                                '                      <td style="width: 50px;">'+
                                '                          <div class="onoffswitch" style="float: right;">'+
                                '                              <input type="checkbox" name="onoffswitch" data-target="#listCompleteOtherAtiv" onchange="changeOthersAtiv(this)" class="onoffswitch-checkbox singleOptionConfig" id="complete_others" data-key="complete_others" tabindex="0" checked>'+
                                '                              <label class="onoffswitch-label" for="complete_others"></label>'+
                                '                          </div>'+
                                '                      </td>'+
                                '                  </tr>'+
                                '                  <tr style="height: auto;">'+
                                '                      <td colspan="2">'+
                                '                           '+listAtividadesVinculadas.html+
                                '                      </td>'+
                                '                  </tr>'+
                                '               </table>'+
                                '           </td>'+
                                '      </tr>'+
                                '' : '')+
                                '   </table>'+
                                '</div>';

                var btnDialogBoxPro =   [{
                    text: (value.data_entrega != '0000-00-00 00:00:00') ? 'Editar Conclus\u00E3o' : 'Concluir',
                    class: 'confirm',
                    click: function(event) { 
                        if (checkSigleInputDateAtiv(this)) {
                            if (checkAtivRequiredFields(this, 'mark')) {
                                if (checkAtivProdutividade(this, value)) {
                                    if (checkAtivChecklist(this, value)) {
                                        sendCompleteAtividade(this, value);
                                    }
                                }
                            }
                        }
                    }
                }];
                if (value.data_entrega != '0000-00-00 00:00:00') {
                    btnDialogBoxPro.unshift({
                        text: 'Gerar Notifica\u00E7\u00E3o',
                        icon: "ui-icon-mail-closed",
                        click: function(event) { 
                            notifyAtividade(id_demanda);
                        }
                    });
                    if (checkCapacidade('complete_cancel_atividade')) {
                        btnDialogBoxPro.unshift({
                            text: 'Cancelar Conclus\u00E3o',
                            icon: "ui-icon-close",
                            click: function(event) { 
                                completeCancelAtividade(id_demanda);
                            }
                        });
                    }
                } else {
                    var checkConfigAtiv = jmespath.search(arrayConfigAtividades.atividades, "[?id_atividade==`"+value.id_atividade+"`] | [0].config.desativa_produtividade");
                    if (!checkConfigAtiv && checkCapacidade('pause_atividade')) {
                        var check_ispaused = (typeof value.data_retomada !== 'undefined' && value.data_retomada == '0000-00-00 00:00:00') ? true : false;
                        btnDialogBoxPro.unshift({
                            text: (check_ispaused ? __.Retomar+' '+__.Demanda+'' : 'Inserir '+__.Paralisacao),
                            icon: 'ui-icon-'+(check_ispaused ? 'play' : 'pause'),
                            click: function(event) { 
                                pauseAtividade(id_demanda);
                            }
                        });
                    }
                    if (checkCapacidade('extend_atividade')) {
                        btnDialogBoxPro.unshift({
                            text: __.Prorrogar+' Prazo',
                            icon: "ui-icon-refresh",
                            click: function(event) { 
                                extendAtividade(id_demanda);
                            }
                        });
                    }
                    if (checkCapacidade('variation_atividade') || checkCapacidade('type_atividade')) {
                        btnDialogBoxPro.unshift({
                            text: (value.tempo_pactuado == 0 ? 'Atribuir '+__.Atividade : 'Alterar '+__.Complexidade),
                            icon: (value.tempo_pactuado == 0 ? 'ui-icon-arrowreturnthick-1-n' : 'ui-icon-transferthick-e-w'),
                            click: function(event) { 
                                variationAtividade(id_demanda);
                            }
                        });
                    }
                    btnDialogBoxPro.unshift({
                        text: 'Cancelar In\u00EDcio',
                        icon: "ui-icon-close",
                        click: function(event) { 
                            startCancelAtividade(id_demanda);
                        }
                    });
                }
                if (checkCapacidade('complete_atividade')) {
                    resetDialogBoxPro('dialogBoxPro');
                    dialogBoxPro = $('#dialogBoxPro')
                        .html('<div class="dialogBoxDiv">'+htmlBox+'</div>')
                        .dialog({
                            title: 'Concluir '+__.Demanda+': '+getTitleDialogBox(value),
                            width: 780,
                            open: function() { 
                                updateButtonConfirm(this, true);
                                $('#ativ_data_entrega').trigger('change');
                            },
                            close: function() { 
                                $('#boxAtividade').remove();
                                cancelMoveKanbanItens();
                                cancelSelectedItensAtiv(id_demanda);
                                resetDialogBoxPro('dialogBoxPro');
                            },
                            buttons: btnDialogBoxPro
                    });
                    if (check_isresumed) { getPausasAtividade(id_demanda) }
                }
            }
        }
    }
}
function sendCompleteAtividade(this_, value) {
    var listAtividadesVinculadas = getAtividadesVinculadas(value, 'concluidas');
    var _this = $(this_);
    var _parent = _this.closest('.ui-dialog');
    var action = (value.data_entrega != '0000-00-00 00:00:00') ? 'complete_edit_atividade' : 'complete_atividade';
    var id_demandas_complete = (listAtividadesVinculadas.length_check > 0 && _parent.find('#complete_others').is(':checked')) 
                            ? JSON.parse(_parent.find('#lista_complete_others').val())
                            : [];
    var param = extractDataAtiv(this_);
        param.action = action;
        param.id_demandas_complete = id_demandas_complete;
        param.id_demanda = value.id_demanda;
        param.id_unidade = value.id_unidade;
        getServerAtividades(param, action);
}
function updateAnotacaoProcesso(anotacao) {
    if ($('#ifrArvore').length > 0) {
        var ifrArvore = $('#ifrArvore').contents();
        var ref = ifrArvore.find('.saveStickNote')[0];
        $('#ifrArvore')[0].contentWindow.sticknoteEdit(ref);
        $('#ifrArvore')[0].contentWindow.sticknoteUpdate(ref, anotacao, 'save', false, 'increment');
    }
}
function checkboxAnotacoesProcessoAtiv(this_) {
    var _this = $(this_);
    var _parent = _this.closest('tr');
    if (checkValue(_this)) {
        _parent.find('#tableAnotacoesProcessoAtiv').show();
    } else {
        _parent.find('#tableAnotacoesProcessoAtiv').hide();
    }
}
function getPausasAtividadeCalc(pause_lista) {
    var _parent = $('#boxAtividade.atividadeWork');
    var user = _parent.find('#ativ_id_user');
    var data_inicio = _parent.find('#ativ_data_inicio');
    var data_fim = _parent.find('#ativ_data_entrega');
    var tempo_despendido = _parent.find('#ativ_tempo_despendido');
    var tempo_pausado = _parent.find('#ativ_tempo_pausado');
    var config_user = (user.is('select')) ? user.find('option:selected').data('config') : user.data('config');
        config_user = (typeof config_user !== 'undefined') ? config_user : {carga_horaria: 8};
    var config_unidade = getBoxConfigDadosUnidade(_parent);

    var config_user_perfil = (arrayConfigAtividades.perfil.hasOwnProperty('config') && arrayConfigAtividades.perfil.config !== null) ? arrayConfigAtividades.perfil.config : false;
    var h_util_inicio = (config_user_perfil && config_user_perfil.hasOwnProperty('distribuicao') && config_user_perfil.distribuicao.hasOwnProperty('horario_util')) ? config_user_perfil.distribuicao.horario_util.inicio : config_unidade.h_util_inicio;
    var h_util_fim = (config_user_perfil && config_user_perfil.hasOwnProperty('distribuicao') && config_user_perfil.distribuicao.hasOwnProperty('horario_util')) ? config_user_perfil.distribuicao.horario_util.fim : config_unidade.h_util_fim;
    // console.log('config_user_perfil', config_user_perfil);

    if (typeof pause_lista !== 'undefined' && pause_lista.length > 0) {
        var arrayPausas = [];
        var totalPausas = 0;

        $.each(pause_lista, function(index, value){
            var config_feriados = (typeof config_unidade.feriados !== 'undefined' && config_unidade.feriados !== null) ? config_unidade.feriados : false;
            var arrayFeriados = (config_unidade.count_dias_uteis && value.data_inicio != '' && value.data_fim != '') 
                                ? jmespath.search(getHolidayBetweenDates(moment(value.data_inicio, 'YYYY-MM-DD HH:mm:ss').format('Y')+'-01-01', moment(value.data_fim, 'YYYY-MM-DD HH:mm:ss').add(1, 'Y').format('Y')+'-01-01', config_feriados), "[*].d_")
                                : [];
            var valueDias = (config_unidade.count_dias_uteis) 
                        ? moment().isoWeekdayCalc({  
                            rangeStart: value.data_inicio,  
                            rangeEnd: value.data_fim,  
                            weekdays: [1,2,3,4,5],  
                            exclusions: arrayFeriados
                        })-1
                        : moment(value.data_fim, 'YYYY-MM-DD HH:mm:ss').diff(moment(value.data_inicio, 'YYYY-MM-DD HH:mm:ss'), 'days');
                valueDias = (valueDias < 0) ? 0 : valueDias;
            var h_dataInicio = moment(value.data_inicio, 'YYYY-MM-DD HH:mm:ss');
            var h_dataFim = moment(value.data_fim, 'YYYY-MM-DD HH:mm:ss');
            var h_utilInicio = moment(h_dataFim.format('YYYY-MM-DD')+'T'+h_util_inicio, 'YYYY-MM-DDTHH:mm');
            var h_utilFim = moment(h_dataInicio.format('YYYY-MM-DD')+'T'+h_util_fim, 'YYYY-MM-DDTHH:mm');

            var check_lastPrevDay = (index != 0 && h_dataInicio.diff(moment(pause_lista[index-1].data_fim, 'YYYY-MM-DD HH:mm:ss'), 'days') == 0)
                ? moment.duration(
                        moment(pause_lista[index-1].data_fim, 'YYYY-MM-DD HH:mm:ss')
                        .diff(moment(moment(pause_lista[index-1].data_fim, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')+'T'+h_util_inicio, 'YYYY-MM-DDTHH:mm'))
                    ).asHours()
                : false;
                check_lastPrevDay = (check_lastPrevDay > config_user.carga_horaria) ? config_user.carga_horaria : check_lastPrevDay;
            var check_firstCurrentDay = moment.duration(h_utilFim.diff(h_dataInicio)).asHours();
                check_firstCurrentDay = (check_firstCurrentDay > config_user.carga_horaria) ? config_user.carga_horaria : check_firstCurrentDay;
            var check_prevDay_currentDay = (check_lastPrevDay) ? ((check_lastPrevDay+check_firstCurrentDay)-(config_user.carga_horaria)) : false;

            var param = {
                id_pausa: value.id_pausa,
                id_demanda: value.id_demanda,
                count_dias_uteis: config_unidade.count_dias_uteis,
                count_horas: config_unidade.count_horas,
                h_dataInicio: h_dataInicio,
                h_dataFim: h_dataFim,
                h_utilInicio: h_utilInicio,
                h_utilFim: h_utilFim,
                carga_horaria: config_user.carga_horaria,
                valueDias: valueDias,
                last_day: check_lastPrevDay,
                first_day: check_firstCurrentDay,
                diff_day: check_prevDay_currentDay
            };
            var tempoTrabalho = getTempoTrabalhoAtiv(param);
                arrayPausas.push({param: param, tempo_trabalho : tempoTrabalho});
                totalPausas = totalPausas+tempoTrabalho;
                console.log('getPausasAtividadeCalc', param, config_unidade, arrayPausas);
        });
        if (totalPausas > 0) {
            var tempo_despendido_final = tempo_despendido.data('tempo-geral')-totalPausas;
                tempo_despendido_final = parseFloat(tempo_despendido_final.toFixed(1));
                tempo_pausado.val(parseFloat(totalPausas.toFixed(1)));
                tempo_despendido.val(tempo_despendido_final);
                checkTempoProdutividade(tempo_despendido);
            var data_inicio_min = jmespath.search(pause_lista, "[].data_inicio").reduce(function (a, b) { return a < b ? a : b; }); 
            var data_fim_max = jmespath.search(pause_lista, "[].data_fim").reduce(function (a, b) { return a > b ? a : b; });
            data_inicio.attr('max', data_inicio_min.replace(' ', 'T').slice(0, -3)).data('date-max','fixed').data('name','data de '+__.retomada);
            data_fim.attr('min', data_fim_max.replace(' ', 'T').slice(0, -3)).data('date-min', 'fixed');
        } else {
            data_inicio.attr('max', data_fim.val()).data('date-max','').data('name','data de in\u00EDcio');
            data_fim.attr('min', data_inicio.val()).data('date-min', '');
        }
        console.log(arrayPausas);

        _parent.find('#ativ_dias_despendido').trigger('change');
        _parent.find('#manPauseAtividade').unbind().on('click', function(){
            getPausasAtividadePanel(arrayPausas);
        });
    } else {
        tempo_pausado.val(0);
        if (typeof tempo_despendido.data('tempo-geral') !== 'undefined') { tempo_despendido.val(tempo_despendido.data('tempo-geral')) }
        tempo_pausado.closest('tr').hide();
    }
}
function getLabelTempoDespendido() {
    var _parent = $('#boxAtividade.atividadeWork');
    var tempo_despendido = _parent.find('#ativ_tempo_despendido');
    if (tempo_despendido.length > 0) {
        var tempo_decimal = (typeof tempo_despendido.data('tempo-decimal') !== 'undefined') ? tempo_despendido.data('tempo-decimal') : tempo_despendido.val();
        _parent.find('.td_tempo_despendido').attr('data-tempo',decimalHourToMinute(tempo_decimal));
    }
}
function getPausasAtividade(id_demanda) {
    var action = 'pause_atividade_lista';
    var param = {
        action: action, 
        id_demanda: id_demanda
    };
    getServerAtividades(param, action);
}
function removePausasAtividade(this_) {
    var _this = $(this_);
    var _parent = _this.closest('tr');
        _parent.slideUp();
    var data = _parent.data();
    var action = 'pause_atividade_remove';
    var param = {
        action: action, 
        id_demanda: data.demanda,
        id_pausa: data.pausa
    };
    console.log(param, action, data);
    getServerAtividades(param, action);
}
function getPausasAtividadePanel(pause_lista) {
    var id_demanda = pause_lista[0].param.id_demanda;
    // console.log(pause_lista);
    var textBox =   '<table style="font-size: 10pt;width: 100%;" class="seiProForm">'+
                    '      <thead>'+
                    '           <tr>'+
                    '               <td style="vertical-align: bottom; text-align: left;" class="label">'+
                    '                   <label for="ativ_data_pausa"><i class="iconPopup iconSwitch fas fa-pause-circle cinzaColor"></i>Data de '+__.Paralisacao+':</label>'+
                    '               </td>'+
                    '               <td style="vertical-align: bottom;" class="label">'+
                    '                   <label class="last" for="ativ_data_retomada"><i class="iconPopup iconSwitch fas fa-play-circle cinzaColor" style="float: initial;"></i>Data de Retomada:</label>'+
                    '               </td>'+
                    '               <td>'+
                    '               </td>'+
                    '           </tr>'+
                    '      </thead>'+
                    '      <tbody>';
    $.each(pause_lista, function(index, value){
        textBox +=  '           <tr data-pausa="'+value.param.id_pausa+'" data-demanda="'+value.param.id_demanda+'">'+
                    '               <td class="date">'+
                    '                   <input type="datetime-local" style="width: 180px;" id="ativ_data_pausa" data-key="data_pause" data-type="inicio" data-name="data de '+__.paralisacao+'" value="'+moment(value.param.h_dataInicio).format('YYYY-MM-DDTHH:mm')+'" disabled required>'+
                    '               </td>'+
                    '               <td class="date">'+
                    '                   <input type="datetime-local" style="width: 180px;" id="ativ_data_retomada" data-key="data_entrega" data-type="fim" data-name="data de '+__.retomada+'" value="'+moment(value.param.h_dataFim).format('YYYY-MM-DDTHH:mm')+'" disabled required>'+
                    '               </td>'+
                    '               <td>'+
                    '                   <button type="button" onclick="removePausasAtividade(this)" class="ui-button ui-corner-all ui-widget"><i class="fas fa-trash cinzaColor" style="font-size: 10pt;"></i></button>'+
                    '               </td>'+
                    '           </tr>';
    });
        textBox +=   '      </tbody>'+
                     '</table>';

        resetDialogBoxPro('alertBoxPro');
        alertBoxPro = $('#alertaBoxPro')
            .html('<div class="dialogBoxDiv"> '+textBox+'</span>')
            .dialog({
                width: 510,
                title: 'Gerenciar Paralisa\u00E7\u00F5es',
                close: function() { 
                    getPausasAtividade(id_demanda);
                    resetDialogBoxPro('alertBoxPro');
                },
                open: function() { 
                    updateButtonConfirm(this, true);
                    prepareFieldsReplace(this);
                    $('#ativ_data_entrega').trigger('change');
                },
                buttons: [{
                    text: "Ok",
                    class: 'confirm',
                    click: function() {
                        getPausasAtividade(id_demanda);
                        resetDialogBoxPro('alertBoxPro');
                    }
                }]
        });
}
function completeCancelAtividade(id_demanda) {
    var value = jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+id_demanda+"`] | [0]");
    if (checkCapacidade('complete_cancel_atividade')) {
        confirmaFraseBoxPro(__.A_demanda+' j\u00E1 foi entregue. Tem certeza que deseja cancelar?', 'CANCELAR', function(){
            var action = 'complete_cancel_atividade';
            var param = {
                action: action, 
                id_demanda: id_demanda,
                id_unidade: value.id_unidade
            };
            getServerAtividades(param, action);
        }, function(){
            cancelMoveKanbanItens();
            cancelSelectedItensAtiv(id_demanda);
        });
    }
}
function getSignCancelDocumento(this_) {
    var _this = $(this_);
    var data = _this.data();
    var paramData = {
        id_documento: data.id_documento,
        mode: data.mode,
        id_reference: data.id_reference
    };
    signCancelDocumento(paramData);
}
function signCancelDocumento(paramData) {
    confirmaFraseBoxPro('Tem certeza que deseja cancelar a assinatura do documento?', 'CANCELAR', function() { 
        var action = 'sign_cancel_documento';
        var param = {
            action: action,
            id_documento: paramData.id_documento,
            mode: paramData.mode,
            id_reference: paramData.id_reference,
            type: paramData.type
        };
        getConfigServer(action, param);
    });
}
function checkPageAtividadesVisualizacao() {
    if (perfilLoginAtiv) {
        waitLoadPro($('#ifrVisualizacao').contents(), '#frmDocumentoCadastro', ".infraBarraComandos", startAtividadeNewDoc);
        waitLoadPro($('#ifrVisualizacao').contents(), '#frmAtividadeListar[action*="acao=procedimento_enviar"]', ".infraBarraComandos", sendAtividadesEnviarProcesso);
    }
}
function startAtividadeNewDoc() {
    var startAtivuser = jmespath.search(arrayAtividadesProcPro, "[?data_inicio=='0000-00-00 00:00:00'] | [?id_user==`"+arrayConfigAtividades.perfil.id_user+"`]");
    if (startAtivuser.length > 0) {
        var htmlTableAtividades = $.map(startAtivuser, function(v,k){ 
                                    var datesAtivHtml = getDatesPreview(getConfigDateAtiv(v));
                                        datesAtivHtml = (datesAtivHtml != '') ? $(datesAtivHtml).find('.dateBoxIcon')[0].outerHTML : '';
                                        datesAtivHtml = (datesAtivHtml != '') ? '<span class="dateboxDisplay" onclick="actionsAtividade('+v.id_demanda+')">'+datesAtivHtml+'</span>' : '';
                                                    return '<div style="margin: 5px 0; display: inline-block; width: 100%;" data-value="'+v.id_demanda+'" title="'+getTitleDialogBox(v, true)+'">'+datesAtivHtml+getTitleDialogBox(v)+'</div>'
                                }).join('');
            htmlTableAtividades =   '<div style="max-height: 300px;overflow-y: scroll;display: block;font-size: 10pt;position: initial;margin-top: 20px;">'+
                                    '   '+htmlTableAtividades+
                                    '</div>'; 

        confirmaBoxPro((startAtivuser.length == 1 ? 'Existe '+__.demanda+' pendente' : 'Existem '+__.demandas+' pendentes')+' de in\u00EDcio. Deseja iniciar agora?'+htmlTableAtividades, function(){ selectAtividadeBox('start') }, 'Iniciar...');
    }
}
function sendAtividadesEnviarProcesso() {
    var sendAtivList = jmespath.search(arrayAtividadesProcPro, "[?data_envio=='0000-00-00 00:00:00'] | [?id_unidade==`"+arrayConfigAtivUnidade.id_unidade+"`]");
    // var sendAtivList = jmespath.search(arrayAtividadesProcPro, "[?data_envio=='0000-00-00 00:00:00']");
    
    if (sendAtivList.length > 0) {
        var htmlTableAtividades = $.map(sendAtivList, function(v,k){ 
                                    var datesAtivHtml = getDatesPreview(getConfigDateAtiv(v));
                                        datesAtivHtml = (datesAtivHtml != '') ? $(datesAtivHtml).find('.dateBoxIcon')[0].outerHTML : '';
                                        datesAtivHtml = (datesAtivHtml != '') ? '<span class="dateboxDisplay" onclick="actionsAtividade('+v.id_demanda+')">'+datesAtivHtml+'</span>' : '';
                                                    return '<div style="margin: 5px 0; display: inline-block; width: 100%;" data-value="'+v.id_demanda+'" title="'+getTitleDialogBox(v, true)+'">'+datesAtivHtml+getTitleDialogBox(v)+'</div>'
                                }).join('');
            htmlTableAtividades =   '<div style="max-height: 300px;overflow-y: scroll;display: block;font-size: 10pt;position: initial;margin-top: 20px;">'+
                                    '   '+htmlTableAtividades+
                                    '</div>'; 
        confirmaBoxPro((sendAtivList.length == 1 ? 'Existe '+__.demanda+' pendente' : 'Existem '+__.demandas+' pendentes')+' de '+__.arquivamento+'. Deseja '+__.arquivar+' agora?'+htmlTableAtividades, sendAtividade, __.Arquivar+'...');
    }
}
function startAtividade(id_demanda = 0) {
    var dadosIfrArvore = getIfrArvoreDadosProcesso();
    var value = (id_demanda != 0) ? jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+id_demanda+"`] | [0]") : false;
    if (!checkSignDocsPlano(value)) {
        alertSignDocsPlano(value);
    } else {
        var config_unidade = getConfigDadosUnidade(value.sigla_unidade);
        var dataInicio = (dadosIfrArvore) 
                            ? (dadosIfrArvore.versao) 
                                ? moment(dadosIfrArvore.versao, 'DD/MM/YYYY HH:mm').format(config_unidade.hora_format)
                                : moment().format(config_unidade.hora_format)
                            : moment().format(config_unidade.hora_format);
            dataInicio = (moment(dataInicio, config_unidade.hora_format) < moment(dataDistribuicao, config_unidade.hora_format)) 
                            ? (moment(dataDistribuicao, config_unidade.hora_format) < moment()) ? moment().format(config_unidade.hora_format) : dataDistribuicao
                            : dataInicio;
        var prazoEntrega = (value.recalcula_prazo == 1) 
                            ? getRecalculaPrazo(dataInicio, config_unidade.hora_format, value.dias_planejado, config_unidade)
                            : '';

        var listAtividadesVinculadas = getAtividadesVinculadas(value, 'iniciadas');

        var listAtividadesIniciadas = (value.id_user != 0) ? jmespath.search(arrayAtividadesPro, "[?data_inicio!='0000-00-00 00:00:00'] | [?data_entrega=='0000-00-00 00:00:00'] | [?data_retomada==null || data_retomada!='0000-00-00 00:00:00'] | [?id_user==`"+value.id_user+"`]") : null;
            listAtividadesIniciadas = (listAtividadesIniciadas !== null) ? listAtividadesIniciadas : false;
        if (listAtividadesIniciadas && listAtividadesIniciadas.length > 0) {
            var htmlTableAtividades = $.map(listAtividadesIniciadas, function(v,k){ 
                                        var datesAtivHtml = getDatesPreview(getConfigDateAtiv(v));
                                            datesAtivHtml = (datesAtivHtml != '') ? $(datesAtivHtml).find('.dateBoxIcon')[0].outerHTML : '';
                                            datesAtivHtml = (datesAtivHtml != '') ? '<span class="dateboxDisplay" onclick="actionsAtividade('+v.id_demanda+')">'+datesAtivHtml+'</span>' : '';
                                                        return '<div style="margin: 5px 0; display: inline-block; width: 100%;" data-value="'+v.id_demanda+'" title="'+getTitleDialogBox(v, true)+'">'+datesAtivHtml+getTitleDialogBox(v)+'</div>'
                                    }).join('');
                htmlTableAtividades =   '<div id="listPauseOtherAtiv" style="max-height: 300px;overflow-y: scroll;display: none;font-size: 10pt;position: initial;">'+
                                        '   '+htmlTableAtividades+
                                        '</div>'; 
            var inputPauseOthers = jmespath.search(listAtividadesIniciadas,"[*].{id: id_demanda, id_unidade: id_unidade}");
                inputPauseOthers = (inputPauseOthers !== null) ? "<input type='hidden' id='lista_pause_others' data-key='lista_pause_others' data-param='lista_pause_others' value='"+JSON.stringify(inputPauseOthers)+"'>" : '';
        } else {
            var inputPauseOthers = '';
            var htmlTableAtividades = '';
        }

        var dataDistribuicao_vinculadas = (listAtividadesVinculadas.length_check > 0) ? jmespath.search(arrayAtividadesPro, "reverse(sort_by([?id_vinculacao=='"+value.id_vinculacao+"'] | [?data_inicio=='0000-00-00 00:00:00'], &data_distribuicao)) | [*].data_distribuicao | [0]") : null;
        var dataDistribuicao = (dataDistribuicao_vinculadas !== null) ? moment(dataDistribuicao_vinculadas, 'YYYY-MM-DD HH:mm:ss').format(config_unidade.hora_format) : moment(value.data_distribuicao, 'YYYY-MM-DD HH:mm:ss').format(config_unidade.hora_format);

        var optionSelectResponsavel = '';
        if (checkCapacidade('select_user_atividade') && value.id_user == 0) {
            var arrayResp = jmespath.search(arrayConfigAtividades.planos, "[?sigla_unidade=='"+value.sigla_unidade+"']");
            optionSelectResponsavel += getOptionsSelectResp(arrayResp, value);
        }
        var htmlSelectResponsavel = (optionSelectResponsavel != '')
                ?   '      <tr>'+
                    '          <td style="vertical-align: bottom; text-align: left; width: 140px;" class="label">'+
                    '               <label for="ativ_id_user"><i class="iconPopup iconSwitch fas fa-user-tie cinzaColor"></i>Respons\u00E1vel:</label>'+
                    '           </td>'+
                    '           <td class="required date">'+
                    '               <select id="ativ_id_user" data-key="id_user" onchange="" required><option>&nbsp;</option>'+optionSelectResponsavel+'</select>'+
                    '           </td>'+
                    '      </tr>'
                : '';

        var htmlBox =   '<div id="boxAtividade" class="atividadeWork" data-demanda="'+(value && value.id_demanda ? value.id_demanda : 0)+'">'+
                        '   <table style="font-size: 10pt;width: 100%;" class="seiProForm">'+
                        '      '+htmlSelectResponsavel+
                        '      <tr>'+
                        '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '               <label for="ativ_data_inicio"><i class="iconPopup iconSwitch fas fa-play-circle cinzaColor"></i>Data de In\u00EDcio '+__.da_Demanda+':</label>'+
                        '           </td>'+
                        '           <td class="required date">'+
                        '               <input type="'+(config_unidade.count_horas ? 'datetime-local' : 'date')+'" onchange="checkSigleInputDateAtiv(this); updateRecalculaPrazo(this);" id="ativ_data_inicio" data-key="data_inicio" data-type="inicio" data-name="data de in\u00EDcio" data-name-min="data de distribui\u00E7\u00E3o" value="'+dataInicio+'" min="'+dataDistribuicao+'" required>'+
                        '           </td>'+
                        '      </tr>'+
                        (listAtividadesIniciadas && listAtividadesIniciadas.length > 0 ? 
                        '      <tr>'+
                        '           <td colspan="2">'+
                        '               '+inputPauseOthers+
                        '               <table style="font-size: 10pt;width: 100%; margin: 10px 0;" class="seiProForm">'+
                        '                  <tr style="height: 40px;">'+
                        '                      <td style="text-align: left;">'+
                        '                           <label><i class="iconPopup fas fa-pause-circle cinzaColor"></i> '+(listAtividadesIniciadas.length > 1 ? __.Paralisar+' '+getNameGenre('demanda', 'os', 'as')+' '+listAtividadesIniciadas.length+' '+__.demandas+' j\u00E1 '+getNameGenre('demanda', 'iniciados', 'iniciadas') : __.Paralisar+' '+__.a_demanda+' j\u00E1 '+getNameGenre('demanda', 'iniciado', 'iniciada'))+' '+(arrayConfigAtividades.perfil.id_user != value.id_user ? 'por '+value.apelido : 'por mim')+'?</label>'+
                        '                      </td>'+
                        '                      <td>'+
                        '                          <div class="onoffswitch" style="float: right;">'+
                        '                              <input type="checkbox" name="onoffswitch" data-target="#listPauseOtherAtiv" onchange="changeOthersAtiv(this)" class="onoffswitch-checkbox singleOptionConfig" id="pause_others" data-key="pause_others" tabindex="0">'+
                        '                              <label class="onoffswitch-label" for="pause_others"></label>'+
                        '                          </div>'+
                        '                      </td>'+
                        '                  </tr>'+
                        '                  <tr style="height: auto;">'+
                        '                      <td colspan="2">'+
                        '                           '+htmlTableAtividades+
                        '                      </td>'+
                        '                  </tr>'+
                        '               </table>'+
                        '           </td>'+
                        '      </tr>'+
                        '' : '')+
                        (value.recalcula_prazo == 1 ? 
                        '      <tr>'+
                        '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '               <label for="ativ_prazo_entrega"><i class="iconPopup iconSwitch fas fa-business-time cinzaColor"></i>Prazo de Entrega (Recalculado):</label>'+
                        '           </td>'+
                        '           <td class="required date">'+
                        '               <input type="'+(config_unidade.count_horas ? 'datetime-local' : 'date')+'" id="ativ_prazo_entrega" data-dias-planejado="'+value.dias_planejado+'" data-dias-uteis="'+config_unidade.count_dias_uteis+'" data-format-date="'+config_unidade.hora_format+'" data-key="prazo_entrega" value="'+prazoEntrega+'" required disabled>'+
                        '           </td>'+
                        '      </tr>'+
                        '' : '')+
                        (listAtividadesVinculadas.length_check > 0 ? 
                        '      <tr>'+
                        '           <td colspan="2">'+
                        '               '+listAtividadesVinculadas.input+
                        '               <table style="font-size: 10pt;width: 100%; margin: 10px 0;" class="seiProForm">'+
                        '                  <tr style="height: 40px;">'+
                        '                      <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '                           <label for="init_others"><i class="iconPopup fas fa-play-circle cinzaColor"></i> '+(listAtividadesVinculadas.length_check > 1 ? 'Iniciar '+getNameGenre('demanda', 'os outros', 'as outras')+' '+listAtividadesVinculadas.length_check+' '+__.demandas+' '+getNameGenre('demanda', 'vinculados', 'vinculadas') : 'Iniciar '+__a_outra_demanda_vinculada)+'?</label>'+
                        '                      </td>'+
                        '                      <td style="width: 50px;">'+
                        '                          <div class="onoffswitch" style="float: right;">'+
                        '                              <input type="checkbox" name="onoffswitch" data-target="#listInitOtherAtiv" data-id_demanda="'+value.id_demanda+'" onchange="changeOthersAtiv(this)" class="onoffswitch-checkbox singleOptionConfig" id="init_others" data-key="init_others" tabindex="0" checked>'+
                        '                              <label class="onoffswitch-label" for="init_others"></label>'+
                        '                          </div>'+
                        '                      </td>'+
                        '                  </tr>'+
                        '                  <tr style="height: auto;">'+
                        '                      <td colspan="2">'+
                        '                           '+listAtividadesVinculadas.html+
                        '                      </td>'+
                        '                  </tr>'+
                        '               </table>'+
                        '           </td>'+
                        '      </tr>'+
                        '' : '')+
                        '   </table>'+
                        '</div>';

        var btnDialogBoxPro =   [{
            text: 'Iniciar',
            class: 'confirm',
            click: function(event) { 
                if (checkSigleInputDateAtiv(this)) {
                    if (checkAtivRequiredFields(this, 'mark')) {
                        var _parent = $(this).closest('.ui-dialog');
                        var data_inicio = moment(_parent.find('#ativ_data_inicio').val(), config_unidade.hora_format).format('YYYY-MM-DD HH:mm:ss');
                        var prazo_entrega = (_parent.find('#ativ_prazo_entrega').length > 0) 
                                            ? moment(_parent.find('#ativ_prazo_entrega').val(), config_unidade.hora_format).format('YYYY-MM-DD HH:mm:ss')
                                            : false;
                        var id_user = (checkCapacidade('select_user_atividade') && value.id_user == 0) 
                                            ? _parent.find('#ativ_id_user').val() 
                                            : (value.id_user == 0) 
                                                ? parseInt(arrayConfigAtividades.perfil.id_user)
                                                : value.id_user;
                        var id_demandas_pause = (listAtividadesIniciadas && listAtividadesIniciadas.length > 0 && _parent.find('#pause_others').is(':checked')) 
                                                ? JSON.parse(_parent.find('#lista_pause_others').val())
                                                : [];
                        var id_demandas_init = (listAtividadesVinculadas && listAtividadesVinculadas.length_check > 0 && _parent.find('#init_others').is(':checked')) 
                                                ? JSON.parse(_parent.find('#lista_init_others').val())
                                                : [];
                        var action = 'start_atividade';
                        var param = {
                                        id_demanda: value.id_demanda, 
                                        id_demandas_pause: id_demandas_pause, 
                                        id_demandas_init: id_demandas_init, 
                                        id_user: id_user, 
                                        id_unidade: value.id_unidade, 
                                        data_inicio: data_inicio, 
                                        prazo_entrega: prazo_entrega, 
                                        action: action
                                    };
                        getServerAtividades(param, action);
                    }
                }
            }
        }];

        if (checkCapacidade('edit_atividade')) {
            btnDialogBoxPro.unshift({
                text: 'Salvar Edi\u00E7\u00E3o',
                icon: 'ui-icon-pencil',
                click: function(event) { 
                    saveAtividade(id_demanda);
                }
            });
        }
        console.log('edit_atividade', btnDialogBoxPro);

        if (checkCapacidade('start_atividade')) {
            resetDialogBoxPro('dialogBoxPro');
            dialogBoxPro = $('#dialogBoxPro')
                .html('<div class="dialogBoxDiv">'+htmlBox+'</div>')
                .dialog({
                    title: 'Iniciar '+__.Demanda+': '+getTitleDialogBox(value),
                    width: 550,
                    open: function() { 
                        updateButtonConfirm(this, true);
                        checkSigleInputDateAtiv(this);
                        prepareFieldsReplace(this);
                    },
                    close: function() { 
                        $('#boxAtividade').remove();
                        cancelMoveKanbanItens();
                        cancelSelectedItensAtiv(id_demanda);
                        resetDialogBoxPro('dialogBoxPro');
                    },
                    buttons: btnDialogBoxPro
            });
        }
    }
}
function alertSignDocsPlano(value) {
    confirmaBoxPro('Plano de Trabalho pendente de assinatura! Deseja assinar agora?', function(){
        initClassicEditor();
        var plano = jmespath.search(arrayConfigAtividades.planos,"[?id_user==`"+value.id_user+"`] | [0]");
        var _this = '<a data-type="planos" data-sign="true" data-user="'+value.id_user+'" data-id_reference="'+plano.id_plano+'" data-icon="pencil-alt" data-action="view" data-mode="modelo_termo_adesao" data-title="Termo de Ades\u00E3o" onclick="editModelConfigItem(this)">';
            _this = $(_this).get(0);
            editModelConfigItem(_this);
    }, 'Visualizar Termo');
}
function checkSignDocsPlano(value) {
    var plano = jmespath.search(arrayConfigAtividades.planos,"[?id_user==`"+value.id_user+"`] | [0]");
    var modalidade = (plano !== null && plano.hasOwnProperty('id_tipo_modalidade')) ? jmespath.search(arrayConfigAtividades.tipos_modalidades,"[?id_tipo_modalidade==`"+plano.id_tipo_modalidade+"`] | [0]") : null;
    var require_sign = (modalidade !== null && modalidade.hasOwnProperty('config') && typeof modalidade.config !== 'undefined' && modalidade.config !== null && modalidade.config.hasOwnProperty('exige_assinatura')) ? modalidade.config.exige_assinatura : false;
    var assinatura =  (plano !== null && plano.hasOwnProperty('config') && typeof plano.config !== 'undefined' && plano.config !== null && typeof plano.config.assinatura !== 'undefined' && plano.config.hasOwnProperty('assinatura')) ? plano.config.assinatura : false;
    return (!require_sign || (require_sign && assinatura)) ? true : false;
}
function getAtividadesVinculadas(value, mode) {
    var queryDemandas = (mode == 'iniciadas') ? "| [?data_inicio=='0000-00-00 00:00:00']" : "";
        queryDemandas = (mode == 'concluidas' || mode == 'pausadas') ? "| [?data_inicio!='0000-00-00 00:00:00'] | [?data_entrega=='0000-00-00 00:00:00'] | [?data_retomada!='0000-00-00 00:00:00']" : queryDemandas;
        queryDemandas = (mode == 'avaliadas') ? "| [?data_entrega!='0000-00-00 00:00:00'] | [?data_envio=='0000-00-00 00:00:00']" : queryDemandas;
        queryDemandas = (mode == 'retomadas') ? "| [?data_inicio!='0000-00-00 00:00:00'] | [?data_entrega=='0000-00-00 00:00:00'] | [?data_retomada=='0000-00-00 00:00:00']" : queryDemandas;

    var label = (mode == 'iniciadas') ? {input: 'lista_init_others', list_id: 'listInitOtherAtiv'} : '';
        label = (mode == 'concluidas') ? {input: 'lista_complete_others', list_id: 'listCompleteOtherAtiv'} : label;
        label = (mode == 'avaliadas') ? {input: 'lista_rate_others', list_id: 'listRateOtherAtiv'} : label;
        label = (mode == 'pausadas' || mode == 'retomadas') ? {input: 'lista_pause_others', list_id: 'listPauseOtherAtiv'} : label;

    var listAtividadesVinculadas = (value.id_user != 0 && typeof value.id_vinculacao !== 'undefined' && value.id_vinculacao !== null) ? jmespath.search(arrayAtividadesPro, "[?id_vinculacao=='"+value.id_vinculacao+"'] "+queryDemandas+" | [?id_demanda!=`"+value.id_demanda+"`]") : null;
    var checkAtividadesVinculadas = (listAtividadesVinculadas !== null && listAtividadesVinculadas.length> 0) ? true : false;
    if (checkAtividadesVinculadas) {
        var htmlTableAtiv = $.map(listAtividadesVinculadas, function(v,k){ 
                                    var datesAtivHtml = getDatesPreview(getConfigDateAtiv(v));
                                        datesAtivHtml = (datesAtivHtml != '') ? $(datesAtivHtml).find('.dateBoxIcon')[0].outerHTML : '';
                                        datesAtivHtml = (datesAtivHtml != '') ? '<span class="dateboxDisplay" onclick="actionsAtividade('+v.id_demanda+')">'+datesAtivHtml+'</span>' : '';
                                                    return '<div style="margin: 5px 0; display: inline-block; width: 100%;" data-value="'+v.id_demanda+'" title="'+getTitleDialogBox(v, true)+'">'+datesAtivHtml+getTitleDialogBox(v)+'</div>'
                                }).join('');
            htmlTableAtiv =   '<div id="'+label.list_id+'" style="max-height: 300px;overflow-y: scroll;font-size: 9pt;position: initial;">'+
                                    '   '+htmlTableAtiv+
                                    '</div>'; 
        var inputOthers = jmespath.search(listAtividadesVinculadas,"[*].{id: id_demanda, id_unidade: id_unidade}");
            inputOthers = (inputOthers !== null) ? "<input type='hidden' id='"+label.input+"' data-key='"+label.input+"' data-param='"+label.input+"' value='"+JSON.stringify(inputOthers)+"'>" : '';
        var lengtOthers = listAtividadesVinculadas.length;
    } else {
        var inputOthers = '';
        var htmlTableAtiv = '';
        var lengtOthers = 0;
    }
    return {input: inputOthers, html: htmlTableAtiv, length_check: lengtOthers};
}
function changeOthersAtiv(this_, target) {
    var _this = $(this_);
    var target = _this.data('target');
    var _parent = _this.closest('.ui-dialog');
    if (_this.is(':checked')) {
        _parent.find(target).show();
    } else {
        _parent.find(target).hide();
    }
    if (_this.attr('id') == 'init_others') {
        var id_demanda = _this.data('id_demanda');
        var value = jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+id_demanda+"`] | [0]");
        var config_unidade = getConfigDadosUnidade(value.sigla_unidade);
        var dataDistribuicao_vinculadas = (value.id_vinculacao !== null) ? jmespath.search(arrayAtividadesPro, "reverse(sort_by([?id_vinculacao=='"+value.id_vinculacao+"'] | [?data_inicio=='0000-00-00 00:00:00'], &data_distribuicao)) | [*].data_distribuicao | [0]") : null;
        var dataDistribuicao = (dataDistribuicao_vinculadas !== null && _this.is(':checked')) ? moment(dataDistribuicao_vinculadas, 'YYYY-MM-DD HH:mm:ss').format(config_unidade.hora_format) : moment(value.data_distribuicao, 'YYYY-MM-DD HH:mm:ss').format(config_unidade.hora_format);
        _parent.find('#ativ_data_inicio').attr('min', dataDistribuicao);
    }
}
function pauseOthersAtiv(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.ui-dialog');
    if (_this.is(':checked')) {
        _parent.find('#listPauseOtherAtiv').show();
    } else {
        _parent.find('#listPauseOtherAtiv').hide();
    }
}
function updateRecalculaPrazo(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.ui-dialog');
    var inputPrazoEntrega =  _parent.find('#ativ_prazo_entrega');
    var sigla_unidade = (typeof _parent.find('#ativ_id_user').data('config') !== 'undefined') ? _parent.find('#ativ_id_user').data('config').sigla_unidade : null;
    var config_unidade = getConfigDadosUnidade(sigla_unidade);
    if (inputPrazoEntrega.length > 0) {
        // var hora_format = inputPrazoEntrega.data('format-date');
        // var count_dias_uteis = inputPrazoEntrega.data('dias-uteis');
        // var dias_planejado = parseFloat(inputPrazoEntrega.data('dias-planejado'));
        // var arrayFeriados = (count_dias_uteis) 
                                // ? jmespath.search(getHolidayBetweenDates(moment(_this.val(), hora_format).format('Y')+'-01-01', moment(_this.val(), hora_format).add(1, 'Y').format('Y')+'-01-01'), "[*].d_")
                                // : [];
        // console.log(dias_planejado, count_dias_uteis, arrayFeriados);
        var prazoEntrega = getRecalculaPrazo(_this.val(), inputPrazoEntrega.data('format-date'), parseFloat(inputPrazoEntrega.data('dias-planejado')), config_unidade);
            inputPrazoEntrega.val(prazoEntrega);
    }
}
function getRecalculaPrazo(data_ref, hora_format, prazo, config_unidade) {
    var workday = config_unidade.count_dias_uteis;
    var config_feriados = (typeof config_unidade.feriados !== 'undefined' && config_unidade.feriados !== null) ? config_unidade.feriados : false;
    var arrayFeriados = (workday) 
                        ? jmespath.search(getHolidayBetweenDates(moment(data_ref, hora_format).format('Y')+'-01-01', moment(data_ref, hora_format).add(1, 'Y').format('Y')+'-01-01', config_feriados), "[*].d_")
                        : [];

    var prazoEntrega = (workday)   
                        ? moment(data_ref, hora_format).isoAddWeekdaysFromSet({  
                            'workdays': prazo,  
                            'weekdays': [1,2,3,4,5],  
                            'exclusions': arrayFeriados
                            }).format(hora_format)
                        : moment(data_ref, hora_format).add(prazo, 'd').format(hora_format);
    return prazoEntrega;
}
function pauseAtividade(id_demanda) {
    var value = jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+id_demanda+"`] | [0]");
    var check_ispaused = (typeof value.data_retomada !== 'undefined' && value.data_retomada !== null && value.data_retomada == '0000-00-00 00:00:00') ? true : false;
    var check_isresumed = (typeof value.data_retomada !== 'undefined' && value.data_retomada !== null && value.data_retomada != '0000-00-00 00:00:00') ? true : false;
    // console.log('check_ispaused->',check_ispaused, 'check_isresumed->',check_isresumed);

    var config_unidade = getConfigDadosUnidade(value.sigla_unidade);
    var dataInicio = (check_ispaused) 
                        ? moment(value.data_pausa, 'YYYY-MM-DD HH:mm:ss').format(config_unidade.hora_format)
                        : (check_isresumed)
                            ? moment(value.data_retomada, 'YYYY-MM-DD HH:mm:ss').format(config_unidade.hora_format)
                            : moment(value.data_inicio, 'YYYY-MM-DD HH:mm:ss').format(config_unidade.hora_format);
    var dataPausa = moment().format(config_unidade.hora_format);
    var txtTitle = (check_ispaused) ? __.Retomar : __.Paralisar;

    var listAtividadesVinculadas = getAtividadesVinculadas(value, (check_ispaused ? 'retomadas' : 'pausadas'));

    var htmlBox =   '<div id="boxAtividade" class="atividadeWork" data-demanda="'+value.id_demanda+'">'+
                    '   <div style="font-size: 10pt; margin: 10px 0; background: #fffcd7; padding: 5px; border-radius: 5px;">'+
                    '       <i class="fas fa-info-circle azulColor" style="margin: 0 5px;"></i>Dica: N\u00E3o \u00E9 necess\u00E1rio '+__.paralisar+' '+__.a_demanda+' entre as jornadas de trabalho!'+
                    '   </div>'+
                    '   <table style="font-size: 10pt;width: 100%;" class="seiProForm">'+
                    '      <tr>'+
                    '          <td style="vertical-align: bottom; text-align: left; width: 150px;" class="label">'+
                    '               <label for="ativ_data_pausa"><i class="iconPopup iconSwitch fas fa-'+(check_ispaused ? 'play' : 'pause')+'-circle cinzaColor"></i>Data de '+(check_ispaused ? 'Retomada' : __.Paralisacao)+' '+__.da_Demanda+':</label>'+
                    '           </td>'+
                    '           <td class="required date">'+
                    '               <input type="'+(config_unidade.count_horas ? 'datetime-local' : 'date')+'" onchange="checkSigleInputDateAtiv(this)" id="ativ_data_pausa" data-key="data_pausa" data-type="inicio" data-name="data de '+(check_ispaused ? __.retomada : __.paralisacao)+'" data-name-min="data de '+(check_ispaused ? __.paralisacao : (check_isresumed ? __.retomada : 'in\u00EDcio'))+'" value="'+dataPausa+'" min="'+dataInicio+'" required>'+
                    '           </td>'+
                    '      </tr>'+
                    (listAtividadesVinculadas.length_check > 0 ? 
                    '      <tr>'+
                    '           <td colspan="2">'+
                    '               '+listAtividadesVinculadas.input+
                    '               <table style="font-size: 10pt;width: 100%; margin: 10px 0;" class="seiProForm">'+
                    '                  <tr style="height: 40px;">'+
                    '                      <td style="vertical-align: bottom; text-align: left;" class="label">'+
                    '                           <label for="pause_others"><i class="iconPopup fas fa-'+(check_ispaused ? 'play' : 'pause')+'-circle cinzaColor"></i> '+(listAtividadesVinculadas.length_check > 1 ? txtTitle+' '+getNameGenre('demanda', 'os outros', 'as outras')+' '+listAtividadesVinculadas.length_check+' '+__.demandas+' '+getNameGenre('demanda', 'vinculados', 'vinculadas') : txtTitle+' '+__.a_outra_demanda_vinculada)+'?</label>'+
                    '                      </td>'+
                    '                      <td style="width: 50px;">'+
                    '                          <div class="onoffswitch" style="float: right;">'+
                    '                              <input type="checkbox" name="onoffswitch" data-target="#listPauseOtherAtiv" onchange="changeOthersAtiv(this)" class="onoffswitch-checkbox singleOptionConfig" id="pause_others" data-key="pause_others" tabindex="0" checked>'+
                    '                              <label class="onoffswitch-label" for="pause_others"></label>'+
                    '                          </div>'+
                    '                      </td>'+
                    '                  </tr>'+
                    '                  <tr style="height: auto;">'+
                    '                      <td colspan="2">'+
                    '                           '+listAtividadesVinculadas.html+
                    '                      </td>'+
                    '                  </tr>'+
                    '               </table>'+
                    '           </td>'+
                    '      </tr>'+
                    '' : '')+
                    '   </table>'+
                    '</div>';

    if (checkCapacidade('pause_atividade') && value !== null) {
        resetDialogBoxPro('dialogBoxPro');
        dialogBoxPro = $('#dialogBoxPro')
            .html('<div class="dialogBoxDiv">'+htmlBox+'</div>')
            .dialog({
                title: txtTitle+' '+__.Demanda+': '+getTitleDialogBox(value),
                width: 550,
                open: function() { 
                    updateButtonConfirm(this, true);
                    checkSigleInputDateAtiv(this);
                    prepareFieldsReplace(this);
                },
                close: function() { 
                    $('#boxAtividade').remove();
                    cancelMoveKanbanItens();
                    cancelSelectedItensAtiv(id_demanda);
                    resetDialogBoxPro('dialogBoxPro');
                },
                buttons: [{
                    text: txtTitle,
                    class: 'confirm',
                    click: function(event) { 
                        if (checkSigleInputDateAtiv(this)) {
                            var _this = $(this);
                            var _parent = _this.closest('.ui-dialog');
                            var data_pausa = moment(_this.closest('.ui-dialog').find('#ativ_data_pausa').val(), config_unidade.hora_format).format('YYYY-MM-DD HH:mm:ss');
                            var id_demandas_pause = (listAtividadesVinculadas.length_check > 0 && _parent.find('#pause_others').is(':checked')) 
                                                    ? JSON.parse(_parent.find('#lista_pause_others').val())
                                                    : [];
                            var action = 'pause_atividade';
                            var param = {
                                            id_demanda: value.id_demanda, 
                                            id_demandas_pause: id_demandas_pause, 
                                            data_pausa: data_pausa, 
                                            action: action
                                        };
                            getServerAtividades(param, action);
                        }
                    }
                }]
        });
    }
}
function variationAtividade(id_demanda, alertAtividade = false) {
    var value = (id_demanda != 0) ? jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+id_demanda+"`] | [0]") : false;
    if (checkCapacidade('variation_atividade') || checkCapacidade('type_atividade') ) {
        var config_unidade = getConfigDadosUnidade(value.sigla_unidade);

        var arrayOptionAtiv = jmespath.search(arrayConfigAtividades.atividades, "[?id_atividade==`"+value.id_atividade+"`].{sigla_unidade: sigla_unidade, id_unidade: id_unidade, dias_planejado: dias_planejado, tempo_pactuado: tempo_pactuado, complexidade: config.complexidade, etiqueta: config.etiqueta.lista, tipo_processo: config.tipo_processo} | [0]");
        var checkEmptyAtiv = (arrayOptionAtiv == null || arrayOptionAtiv.length == 0 || value.id_atividade == 0 || value.tempo_pactuado == 0) ? true : false;
        if (checkEmptyAtiv) {
            // alertaBoxPro('Error', 'exclamation-triangle', 'Atividade inativa ou inexistente. Reative-a para prosseguir.');
            var optionAtiv = '';
            var optionSelectComplexidade = '';
            var arrayTabelaAtividades = arrayConfigAtividades.atividades;
            var unidades =  (typeof arrayConfigAtividades.atividades !== 'undefined' && arrayConfigAtividades.atividades != 0 && arrayConfigAtividades.atividades.length > 0) 
                            ? uniqPro(jmespath.search(arrayConfigAtividades.atividades, "[?sigla_unidade].sigla_unidade"))
                            : [];
            var countUnidades = (arrayConfigAtividades.atividades.length > 0) ? unidades.length : 0;
            if (countUnidades > 1) {
                $.each(unidades, function(index, v){
                    var arrayAtiv = jmespath.search(arrayTabelaAtividades, "[?sigla_unidade=='"+v+"']");
                    optionAtiv +=   '<optgroup label="'+v+'">'+
                                                '   '+getOptionsSelectAtivGroup(arrayAtiv, value, true)+
                                                '</optgroup>';
                });
            } else {
                optionAtiv += getOptionsSelectAtivGroup(arrayTabelaAtividades, value, true);
            }
            var selectAtiv =    '               <select id="ativ_id_atividade" onchange="changeAtivSelect(this);checkTempoProdutividade($(this));" data-key="id_atividade" style="width: 100%;" required>'+
                                '                   <option>&nbsp;</option>'+
                                '                   '+optionAtiv+
                                '               </select>';
        } else {
            var tempo_pactuado_display = (arrayOptionAtiv.complexidade.length > 0) ? jmespath.search(arrayOptionAtiv.complexidade, "[?default==`true`].fator | [0]") : null;
                tempo_pactuado_display = (tempo_pactuado_display !== null) ? tempo_pactuado_display*value.tempo_pactuado : value.tempo_pactuado;
            var tempo_pactuado_display_ = parseFloat(tempo_pactuado_display.toFixed(2)); value.hasOwnProperty
            
            // console.log(id_demanda, arrayOptionAtiv, arrayOptionAtiv.complexidade.length, jmespath.search(arrayOptionAtiv.complexidade, "[?default==`true`].fator | [0]"), value.tempo_pactuado, tempo_pactuado_display, tempo_pactuado_display_);

            var optionAtiv = (optionAtiv !== null) ? "<option value='"+value.id_atividade+"' data-config='"+JSON.stringify(arrayOptionAtiv)+"'>"+value.nome_atividade+" ["+(tempo_pactuado_display_)+" "+(tempo_pactuado_display > 1 ? 'horas' : 'hora')+"]</option>" : '';
            var arrayOptionUser = jmespath.search(arrayConfigAtividades.planos, "[?id_user==`"+value.id_user+"`].{id_plano: id_plano, sigla_unidade: sigla_unidade, nome_modalidade: nome_modalidade, carga_horaria: carga_horaria} | [0]");

            var optionSelectComplexidade = ( arrayOptionAtiv && arrayOptionAtiv.complexidade.length > 0 ) 
                    ? $.map(arrayOptionAtiv.complexidade, function(v,k){ 
                        var selected = (parseFloat(value.fator_complexidade) == parseFloat(v.fator)) ? 'selected' : '';
                        // console.log(selected, parseFloat(value.fator_complexidade), parseFloat(v.fator), v.complexidade);

                        var tempo_pactuado_fator = (typeof arrayOptionAtiv.tempo_pactuado !== 'undefined' && typeof v.fator !== 'undefined' && arrayOptionAtiv.tempo_pactuado > 0 && v.fator > 0) ? (arrayOptionAtiv.tempo_pactuado * v.fator) : false;
                        var tempo_pactuado_fator_display = (tempo_pactuado_fator) 
                                                        ? (tempo_pactuado_fator < 1) ? parseFloat(tempo_pactuado_fator.toFixed(3)) : parseFloat(tempo_pactuado_fator.toFixed(1))
                                                        : false;
                            tempo_pactuado_fator_display = (tempo_pactuado_fator_display) ? " ["+tempo_pactuado_fator_display+" "+(tempo_pactuado_fator > 1 ? 'horas' : 'hora')+"]" : '';
                        return "<option value='"+v.fator+"' "+selected+">"+v.complexidade+tempo_pactuado_fator_display+"</option>";
                    }).join('') : '<option>&nbsp;</option>';

            var selectAtiv =    '               <select id="ativ_id_atividade" data-key="id_atividade" style="width: 100%;" required disabled>'+
                                '                   '+optionAtiv+
                                '               </select>';
        }
        var optionUser = (optionUser !== null) ? "<option value='"+value.id_user+"' data-config='"+JSON.stringify(arrayOptionUser)+"'>"+value.apelido+"</option>" : '';
        var htmlAlertAtividade = (alertAtividade) 
            ?   '<span class="inlineAlert setAtivBeforeRate">'+
                '   <i class="fas fa-info-circle azulColor" style="color: #7baaf7;"></i>'+
                '   Atribua um tipo de atividade '+getNameGenre('demanda', 'ao', '\u00E0')+' '+__.demanda+' antes de prosseguir com a avalia\u00E7\u00E3o'+
                '</span>' 
            :   '';

        var htmlBox =   '<div id="boxAtividade" class="atividadeWork" data-demanda="'+value.id_demanda+'" data-unidade="'+value.sigla_unidade+'">'+
                        '   <table style="font-size: 10pt;width: 100%;" class="seiProForm">'+
                        '      <tr style="height: auto;">'+
                        '           <td colspan="4">'+htmlAlertAtividade+'</td>'+
                        '      </tr>'+
                        '      <tr>'+
                        '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '               <label for="ativ_id_atividade"><i class="iconPopup iconSwitch fas fa-clipboard-list cinzaColor"></i>'+__.Atividade+':</label>'+
                        '           </td>'+
                        '           <td class="required" colspan="3">'+
                        '               '+selectAtiv+
                        '               <input type="hidden" id="ativ_id_unidade" data-key="id_unidade" data-param="id_unidade" value="'+value.id_unidade+'">'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr>'+
                        '           <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '               <label for="ativ_fator_complexidade"><i class="iconPopup iconSwitch fas fa-graduation-cap cinzaColor"></i>Grau de '+__.Complexidade+':</label>'+
                        '           </td>'+
                        '           <td class="required">'+
                        '               <select id="ativ_fator_complexidade" data-key="fator_complexidade" style="width: 100%;" onchange="updateAtivTempoPactuado(this);checkTempoProdutividade($(this));" required>'+
                        '                   '+optionSelectComplexidade+
                        '               </select>'+
                        '           </td>'+
                        '           <td colspan="2" rowspan="3">'+
                        '               <div id="chartUser" style="width: 380px; height: 85px;"></div>'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr>'+
                        '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '               <label for="ativ_id_user"><i class="iconPopup iconSwitch fas fa-user-tie cinzaColor"></i>Respons\u00E1vel:</label>'+
                        '           </td>'+
                        '           <td>'+
                        '               <select id="ativ_id_user" data-key="id_user" data-type="user" style="width: 100%;" required disabled>'+
                        '                   '+optionUser+
                        '               </select>'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr>'+
                        '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '               <label for="ativ_tempo_pactuado"><i class="iconPopup iconSwitch fas fa-user-clock cinzaColor"></i>Tempo pactuado:</label>'+
                        '           </td>'+
                        '           <td>'+
                        '               <input type="text" id="ativ_tempo_pactuado" data-key="tempo_pactuado" value="'+(value && value.tempo_pactuado ? value.tempo_pactuado : '')+'" data-tempo-pactuado="'+(value && value.tempo_pactuado ? value.tempo_pactuado : '')+'" disabled>'+
                        '           </td>'+
                        '      </tr>'+
                        (value.data_entrega != '0000-00-00 00:00:00' ?
                        '      <tr>'+
                        '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '               <label for="ativ_produtividade"><i class="iconPopup iconSwitch fas fa-toolbox cinzaColor"></i>Produtividade:</label>'+
                        '           </td>'+
                        '           <td colspan="3" style="text-align: left;">'+
                        '               <span id="ativ_produtividade">'+getInfoAtividadeProdutividade(value, true)+'</span>'+
                        '           </td>'+
                        '      </tr>'+
                        '' : '')+
                        '   </table>'+
                        '</div>';
                        
        resetDialogBoxPro('dialogBoxPro');
        dialogBoxPro = $('#dialogBoxPro')
            .html('<div class="dialogBoxDiv">'+htmlBox+'</div>')
            .dialog({
                title: (value.tempo_pactuado == 0 ? 'Atribuir '+__.Atividade : 'Alterar '+__.Complexidade)+': '+getTitleDialogBox(value),
                width: 780,
                open: function() { 
                    updateButtonConfirm(this, true);
                    $('#ativ_fator_complexidade').trigger('change');
                    initChosenReplace('box_init', this);
                },
                close: function() { 
                    $('#boxAtividade').remove();
                    resetDialogBoxPro('dialogBoxPro');
                },
                buttons: [{
                    text: (checkEmptyAtiv ? 'Atribuir' : 'Alterar'),
                    class: 'confirm',
                    click: function(event) { 
                        if (checkAtivRequiredFields(this, 'mark')) {
                            var action = (checkEmptyAtiv ? 'type_atividade' : 'variation_atividade');
                            var inpuData = extractDataAtiv(this);
                            var param = {
                                action: action,
                                id_demanda: id_demanda,
                                before_rate: ($('.setAtivBeforeRate').length > 0 ? true : false),
                                id_atividade: parseInt(inpuData.id_atividade),
                                fator_complexidade: parseFloat(inpuData.fator_complexidade),
                                tempo_pactuado: parseFloat(inpuData.tempo_pactuado)
                            };                            
                            getServerAtividades(param, action);
                            // console.log(param, action);
                        }
                    }
                }]
        });
    }
}
function extendAtividade(id_demanda) {
    var value = (id_demanda != 0) ? jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+id_demanda+"`] | [0]") : false;
    // console.log(value);
    if (checkCapacidade('extend_atividade')) {
        var config_unidade = getConfigDadosUnidade(value.sigla_unidade);
        var dataDistribuicao = moment(value.data_distribuicao, 'YYYY-MM-DD HH:mm:ss').format(config_unidade.hora_format);
        var prazoEntrega = moment(value.prazo_entrega, 'YYYY-MM-DD HH:mm:ss').format(config_unidade.hora_format);
        var inputAtiv = jmespath.search(arrayConfigAtividades.atividades, "[?id_atividade==`"+value.id_atividade+"`].{sigla_unidade: sigla_unidade, id_unidade: id_unidade, dias_planejado: dias_planejado, tempo_pactuado: tempo_pactuado, complexidade: config.complexidade, etiqueta: config.etiqueta.lista, tipo_processo: config.tipo_processo} | [0]");
            inputAtiv = (inputAtiv !== null) ? "<input type='hidden' id='ativ_id_atividade' data-key='id_atividade' data-param='id_atividade' data-config='"+JSON.stringify(inputAtiv)+"' value='"+value.id_atividade+"'>" : '';
        var inputUser = jmespath.search(arrayConfigAtividades.planos, "[?id_user==`"+value.id_user+"`].{id_plano: id_plano, sigla_unidade: sigla_unidade, nome_modalidade: nome_modalidade, carga_horaria: carga_horaria} | [0]");
            inputUser = (inputUser !== null) ? "<input type='hidden' id='ativ_id_user' data-key='id_user' data-param='id_user' data-config='"+JSON.stringify(inputUser)+"' value='"+value.id_user+"'>" : '';

        var htmlBox =   '<div id="boxAtividade" class="atividadeWork" data-demanda="'+value.id_demanda+'" data-unidade="'+value.sigla_unidade+'">'+
                        '   <table style="font-size: 10pt;width: 100%;" class="seiProForm">'+
                        '      <tr>'+
                        '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '               <label for="ativ_data_distribuicao"><i class="iconPopup iconSwitch fas fa-briefcase cinzaColor"></i>Data de Distribui\u00E7\u00E3o:</label>'+
                        '           </td>'+
                        '           <td class="required date">'+
                        '               <input type="'+(config_unidade.count_horas ? 'datetime-local' : 'date')+'" id="ativ_data_distribuicao" data-key="data_distribuicao" data-type="inicio" data-name="data de distribui\u00E7\u00E3o" value="'+dataDistribuicao+'" required disabled>'+
                        '               '+inputAtiv+
                        '               '+inputUser+
                        '           </td>'+
                        '           <td style="vertical-align: bottom;" class="label">'+
                        '               <label class="last" for="ativ_prazo_entrega"><i class="iconPopup iconSwitch fas fa-business-time cinzaColor" style="float: initial;"></i>Prazo de Entrega:</label>'+
                        '           </td>'+
                        '           <td class="required date">'+
                        '               <input type="'+(config_unidade.count_horas ? 'datetime-local' : 'date')+'" onchange="changeDadosTrabalho(this)" id="ativ_prazo_entrega" data-key="prazo_entrega" data-type="fim" data-name="prazo de entrega" value="'+prazoEntrega+'" required>'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr>'+
                        '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '               <label for="ativ_tempo_planejado"><i class="iconPopup iconSwitch fas fa-hourglass-half cinzaColor"></i>Tempo Planejado:</label>'+
                        '           </td>'+
                        '           <td>'+
                        '               <input type="number" min="1" id="ativ_tempo_planejado" data-key="tempo_planejado" data-type="tempo" value="'+value.tempo_planejado+'" disabled>'+
                        '           </td>'+
                        '           <td style="vertical-align: bottom;" class="label">'+
                        '               <label class="last" for="ativ_dias_planejado"><i class="iconPopup iconSwitch fas fa-calendar-alt cinzaColor" style="float: initial;"></i><span id="ativ_dias_planejado_label">Dias '+(config_unidade.count_dias_uteis ? '\u00FAteis' : '')+' de Planejamento</span>:</label>'+
                        '           </td>'+
                        '           <td class="required number">'+
                        '               <input type="number" min="0" id="ativ_dias_planejado" onchange="changeDadosTrabalho(this)" data-key="dias_planejado" data-type="dias" value="'+value.dias_planejado+'" required>'+
                        '           </td>'+
                        '      </tr>'+
                        '   </table>'+
                        '</div>';

        resetDialogBoxPro('dialogBoxPro');
        dialogBoxPro = $('#dialogBoxPro')
            .html('<div class="dialogBoxDiv">'+htmlBox+'</div>')
            .dialog({
                title: __.Prorrogar+' '+__.Demanda+': '+getTitleDialogBox(value),
                width: 780,
                open: function() { 
                    updateButtonConfirm(this, true);
                    prepareFieldsReplace(this);
                },
                close: function() { 
                    $('#boxAtividade').remove();
                    resetDialogBoxPro('dialogBoxPro');
                },
                buttons: [{
                    text: __.Prorrogar,
                    class: 'confirm',
                    click: function(event) { 
                        if (checkAtivRequiredFields(this, 'mark')) {
                            var action = 'extend_atividade';
                            var inpuData = extractDataAtiv(this);
                            var param = {
                                action: 'extend_atividade',
                                id_demanda: id_demanda,
                                prazo_entrega: inpuData.prazo_entrega,
                                tempo_planejado: parseInt(inpuData.tempo_planejado),
                                dias_planejado: parseInt(inpuData.dias_planejado)
                            };                            
                            getServerAtividades(param, action);
                            // console.log(param, action);
                        }
                    }
                }]
        });
    }
}
function startCancelAtividade(id_demanda) {
    var value = (id_demanda != 0) ? jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+id_demanda+"`] | [0]") : false;
    if (checkCapacidade('start_cancel_atividade')) {
        confirmaFraseBoxPro(__.A_demanda+' j\u00E1 foi '+getNameGenre('demanda', 'iniciado', 'iniciada')+'. Tem certeza que deseja cancelar?', 'CANCELAR', function(){
            var action = 'start_cancel_atividade';
            var param = {
                    action: action, 
                    id_demanda: id_demanda,
                    id_unidade: value.id_unidade
                };
                getServerAtividades(param, action);
        }, function(){
            cancelMoveKanbanItens();
            cancelSelectedItensAtiv(id_demanda);
        });
    }
}
function statusIconsAtividade(value) {
    var config_unidade = getConfigDadosUnidade(value.sigla_unidade); 
    var format_hora = (config_unidade && config_unidade.count_horas) ? 'DD/MM/YYYY [\u00E0s] HH:mm' : 'DD/MM/YYYY';
    return  '<span style="float: right;">'+
            '   <i '+(value.data_distribuicao != '0000-00-00 00:00:00' ? 'onmouseover="return infraTooltipMostrar(\'Cadastrado em: '+moment(value.data_distribuicao, 'YYYY-MM-DD HH:mm:ss').format(format_hora)+'\');" onmouseout="return infraTooltipOcultar();"' : '')+' class="far fa-clock '+(value.data_distribuicao != '0000-00-00 00:00:00' ? 'azulColor' : 'cinzaColor')+'" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
            '   <i '+(value.data_inicio != '0000-00-00 00:00:00' ? 'onmouseover="return infraTooltipMostrar(\'Iniciado em: '+moment(value.data_inicio, 'YYYY-MM-DD HH:mm:ss').format(format_hora)+'\');" onmouseout="return infraTooltipOcultar();"' : '')+' class="fas fa-play-circle '+(value.data_inicio != '0000-00-00 00:00:00' ? 'azulColor' : 'cinzaColor')+'" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
            '   <i '+(value.data_entrega != '0000-00-00 00:00:00' ? 'onmouseover="return infraTooltipMostrar(\'Conclu\u00EDdo em: '+moment(value.data_entrega, 'YYYY-MM-DD HH:mm:ss').format(format_hora)+'\');" onmouseout="return infraTooltipOcultar();"' : '')+' class="fas fa-check-circle '+(value.data_entrega != '0000-00-00 00:00:00' ? 'verdeColor' : 'cinzaColor')+'" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
            '   <i '+(value.data_avaliacao != '0000-00-00 00:00:00' ? 'onmouseover="return infraTooltipMostrar(\'Avaliado em: '+moment(value.data_avaliacao, 'YYYY-MM-DD HH:mm:ss').format(format_hora)+'\');" onmouseout="return infraTooltipOcultar();"' : '')+' class="fas fa-star '+(value.data_avaliacao != '0000-00-00 00:00:00' ? 'starGold' : 'cinzaColor')+'" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
            '</span>';
}
function sendCancelAtividade(id_demanda) {
    var value = jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+id_demanda+"`] | [0]");
    if (value.data_entrega != '0000-00-00 00:00:00') {
        confirmaFraseBoxPro(__.A_demanda+' j\u00E1 foi '+getNameGenre('demanda', 'arquivado', 'arquivada')+'. Tem certeza que deseja cancelar?', 'CANCELAR', function(){
            var action = 'send_cancel_atividade';
            var param = {
                action: action, 
                id_demanda: id_demanda
            };
            getServerAtividades(param, action);
        }, function(){
            cancelMoveKanbanItens();
            cancelSelectedItensAtiv(id_demanda);
        });
    }
}
function archiveAtividade(id_demanda = 0) {
    if ($.isArray(id_demanda) && id_demanda.length > 0) {
        var id_demandas = jmespath.search(id_demanda,"[*].id");
    } else if (id_demanda != 0) {
        var value = (id_demanda != 0) ? jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+id_demanda+"`]") : null;
            value = (value !== null) ? jmespath.search(value, "[?data_avaliacao!='0000-00-00 00:00:00'] | [?data_envio=='0000-00-00 00:00:00'] | [0]") : null;
            value = (value !== null) ? value : false;
        var id_demandas = (value) ? [value.id_demanda] : false;
    }
    if (id_demandas) {
        confirmaBoxPro('Tem certeza que deseja '+__.arquivar+' '+(id_demandas.length > 1 ? __.as_demandas_selecionadas : __.a_demanda_selecionada)+'?', function() { 
            var action = 'send_atividade';
            var param = {
                            id_demandas: id_demandas, 
                            data_envio: moment().format('YYYY-MM-DD HH:mm:ss'), 
                            action: action
                        };
            getServerAtividades(param, action);
        }, __Arquivar);
    }
}
function sendAtividade(id_demanda = 0) {
    var dadosIfrArvore = getIfrArvoreDadosProcesso();   
    var value = (id_demanda != 0) ? jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+id_demanda+"`] | [0]") : false;
    var checkAtivProcesso = (value && value.id_procedimento !== null && parseInt(value.id_procedimento) != 0) ? true : false;
    var listaAtividades = (dadosIfrArvore && id_demanda == 0) 
                ? jmespath.search(arrayAtividadesProcPro, "[?data_avaliacao=='0000-00-00 00:00:00'] | [?data_envio=='0000-00-00 00:00:00']")
                : (checkAtivProcesso)
                    ? jmespath.search(arrayAtividadesPro, "[?id_procedimento=='"+value.id_procedimento+"'] | [?data_avaliacao=='0000-00-00 00:00:00'] | [?data_envio=='0000-00-00 00:00:00']")
                    : jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+id_demanda+"`] | [?data_avaliacao=='0000-00-00 00:00:00'] | [?data_envio=='0000-00-00 00:00:00']");
    var sendListaAtividades = (dadosIfrArvore && id_demanda == 0) 
                ? jmespath.search(arrayAtividadesProcPro, "[?data_avaliacao!='0000-00-00 00:00:00'] | [?data_envio=='0000-00-00 00:00:00']")
                : (checkAtivProcesso) 
                    ? jmespath.search(arrayAtividadesPro, "[?id_procedimento=='"+value.id_procedimento+"'] | [?data_avaliacao!='0000-00-00 00:00:00'] | [?data_envio=='0000-00-00 00:00:00']")
                    : jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+id_demanda+"`] | [?data_avaliacao!='0000-00-00 00:00:00'] | [?data_envio=='0000-00-00 00:00:00']");
    var idListaAtividades = (dadosIfrArvore && id_demanda == 0) 
                ? jmespath.search(arrayAtividadesProcPro, "[?data_avaliacao!='0000-00-00 00:00:00'] | [?data_envio=='0000-00-00 00:00:00'].id_demanda")
                : (checkAtivProcesso) 
                    ? jmespath.search(arrayAtividadesPro, "[?id_procedimento=='"+value.id_procedimento+"'] | [?data_avaliacao!='0000-00-00 00:00:00'] | [?data_envio=='0000-00-00 00:00:00'].id_demanda")
                    : [id_demanda]; 
    var config_unidade = getConfigDadosUnidade(); 
    var btnDialogBoxPro =   [];

    console.log({checkAtivProcesso: checkAtivProcesso, id_demanda: id_demanda, value: value, listaAtividades: listaAtividades, sendListaAtividades: sendListaAtividades, idListaAtividades: idListaAtividades});
    
    if (listaAtividades.length > 0) {
        btnDialogBoxPro =   [{
            text: 'Ok',
            click: function(event) { 
                resetDialogBoxPro('dialogBoxPro');
            }
        }];
    } else {
        btnDialogBoxPro =   [{
            text: __.Arquivar,
            class: 'confirm',
            click: function(event) { 
                if (checkSigleInputDateAtiv(this)) {
                    var data_envio = moment($(this).closest('.ui-dialog').find('#ativ_data_envio').val(), config_unidade.hora_format).format('YYYY-MM-DD HH:mm:ss');
                    var action = 'send_atividade';
                    var param = {
                                    id_demandas: idListaAtividades, 
                                    data_envio: data_envio, 
                                    action: action
                                };
                    getServerAtividades(param, action);
                }
            }
        }];
    }
    if (checkCapacidade('rate_edit_atividade')) {
        btnDialogBoxPro.unshift({
            text: 'Editar Avalia\u00E7\u00E3o',
            icon: "ui-icon-star",
            click: function(event) { 
                if (id_demanda == 0) { selectAtividadeBox('rate_edit') } else { rateAtividade(id_demanda) }
            }
        });
    }

    if (sendListaAtividades.length == 0) {
        selectAtividadeBox('send');
    } else if (listaAtividades.length > 0 && checkAtivProcesso) {
        // console.log(listaAtividades);
        var htmlTableAtividades = $.map(listaAtividades, function(v,k){ 
            var datesAtivHtml = getDatesPreview(getConfigDateAtiv(v));
                                    datesAtivHtml = (datesAtivHtml != '') ? $(datesAtivHtml).find('.dateBoxIcon')[0].outerHTML : '';
                                    datesAtivHtml = (datesAtivHtml != '') ? '<span class="dateboxDisplay" onclick="actionsAtividade('+v.id_demanda+')">'+datesAtivHtml+'</span>' : '';
                                    return '<div style="margin: 5px 0; display: inline-block; width: 100%;" data-value="'+v.id_demanda+'" title="'+getTitleDialogBox(v, true)+'">'+datesAtivHtml+statusIconsAtividade(v)+getTitleDialogBox(v)+'</div>'
                                }).join('');
        var htmlBox =   '<div id="boxAtividade" class="atividadeWork">'+
                        '   <table style="font-size: 10pt;width: 100%;" class="seiProForm">'+
                        '      <tr>'+
                        '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '               <div style="display: inline-block;"><i class="iconPopup iconSwitch fas fa-exclamation-triangle laranjaColor"></i>'+(listaAtividades.length == 1 ? 'Existe '+__.demanda+' pendente'+(checkAtivProcesso ? ' neste processo' : '')+'. Finalize-a antes de '+__.arquivar+':' : 'Existem '+__.demandas+' pendentes'+(checkAtivProcesso ? ' neste processo' : '')+'. Finalize-as antes de '+__.arquivar+':')+'</div>'+
                        '               '+htmlTableAtividades+
                        '          </td>'+
                        '      </tr>'+
                        '   </table>'+
                        '</div>';
        
        resetDialogBoxPro('dialogBoxPro');
        dialogBoxPro = $('#dialogBoxPro')
        .html('<div class="dialogBoxDiv">'+htmlBox+'</div>')
        .dialog({
            title: __.Arquivar+' '+__.Demandas+' do Processo',
                width: 850,
                close: function() { 
                    $('#boxAtividade').remove();
                    resetDialogBoxPro('dialogBoxPro');
                },
                buttons: btnDialogBoxPro
            });
    } else {
        var dataEntrega = jmespath.search(sendListaAtividades, "reverse(sort_by([?data_avaliacao!='0000-00-00 00:00:00'] | [?data_envio=='0000-00-00 00:00:00'], &data_entrega)) | [*].data_entrega | [0]");
            dataEntrega = (dataEntrega != null) ? moment(dataEntrega, 'YYYY-MM-DD HH:mm:ss').format(config_unidade.hora_format) : '';
        var dataEnvio = (dadosIfrArvore.data_documento) 
                            ? (dadosIfrArvore.data_documento) 
                                ? moment(dadosIfrArvore.data_documento, 'DD/MM/YYYY HH:mm').format(config_unidade.hora_format) 
                                : moment().format(config_unidade.hora_format)
                            : moment().format(config_unidade.hora_format);
        var htmlTableAtividades = $.map(sendListaAtividades, function(v,k){ 
                                            var datesAtivHtml = getDatesPreview(getConfigDateAtiv(v));
                                                datesAtivHtml = (datesAtivHtml != '') ? $(datesAtivHtml).find('.dateBoxIcon')[0].outerHTML : '';
                                                datesAtivHtml = (datesAtivHtml != '') ? '<span class="dateboxDisplay" onclick="actionsAtividade('+v.id_demanda+')">'+datesAtivHtml+'</span>' : '';
                                                            return '<div style="margin: 5px 0; display: inline-block; width: 100%;" data-value="'+v.id_demanda+'" title="'+getTitleDialogBox(v, true)+'">'+datesAtivHtml+getTitleDialogBox(v)+'</div>'
                                        }).join('');

        var htmlBox =   '<div id="boxAtividade" class="atividadeWork">'+
                        '   <table style="font-size: 10pt;width: 100%;" class="seiProForm">'+
                        '      <tr>'+
                        '          <td style="vertical-align: bottom; text-align: left;" class="label" colspan="2">'+
                        '               <div style="display: inline-block;"><i class="iconPopup iconSwitch fas fa-archive azulColor"></i>'+(sendListaAtividades.length == 1 ? getNameGenre('demanda', 'O seguinte', 'A seguinte')+' '+__.demanda+' ser\u00E1 '+getNameGenre('demanda', 'arquivado', 'arquivada')+(checkAtivProcesso ? ' com o processo' : '')+':' : getNameGenre('demanda', 'Os seguintes', 'As seguintes')+' '+__.demandas+' ser\u00E3o '+__.arquivadas+(checkAtivProcesso ? ' com o processo' : '')+':')+'</div>'+
                        '               <div style="max-height: 300px;overflow-y: scroll;display: block;position: initial;">'+htmlTableAtividades+'</div>'+
                        '          </td>'+
                        '      </tr>'+
                        '      <tr>'+
                        '          <td style="vertical-align: bottom; text-align: left; width: 200px;" class="label">'+
                        '               <label for="ativ_data_envio"><i class="iconPopup iconSwitch fas fa-play-circle cinzaColor"></i>Data de '+__.Arquivamento+':</label>'+
                        '           </td>'+
                        '           <td class="required date">'+
                        '               <input type="'+(config_unidade.count_horas ? 'datetime-local' : 'date')+'" onchange="checkSigleInputDateAtiv(this)" id="ativ_data_envio" data-key="data_envio" data-type="inicio" data-name="data de '+__.arquivamento+'" data-name-min="data de conclus\u00E3o" value="'+dataEnvio+'" min="'+dataEntrega+'" required>'+
                        '           </td>'+
                        '      </tr>'+
                        '   </table>'+
                        '</div>';

        resetDialogBoxPro('dialogBoxPro');
        dialogBoxPro = $('#dialogBoxPro')
            .html('<div class="dialogBoxDiv">'+htmlBox+'</div>')
            .dialog({
                title: __.Arquivar+' '+__.Demandas+''+(checkAtivProcesso ? ' do Processo' : ''),
                width: 700,
                open: function() { 
                    updateButtonConfirm(this, true);
                    checkSigleInputDateAtiv(this);
                    prepareFieldsReplace(this);
                },
                close: function() { 
                    $('#boxAtividade').remove();
                    resetDialogBoxPro('dialogBoxPro');
                },
                buttons: btnDialogBoxPro
        });
    }
}
function infoAtividade(id_demanda) {
    var value = jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+id_demanda+"`] | [0]");
    var htmlInfo = getInfoAtividade(value);
    var htmlBox =   '<div id="boxAtividade" class="atividadeInfo">'+
                    '   <table style="font-size: 10pt;width: 100%;" class="seiProForm tableLine tableInfo">'+
                    '           '+htmlInfo+
                    '   </table>'+
                    '</div>';
    var btnDialogBoxPro =   [{
        text: 'Ok',
        click: function(event) { 
            resetDialogBoxPro('dialogBoxPro');
        }
    }];
    if (checkCapacidade('complete_cancel_atividade') && value.data_entrega != '0000-00-00 00:00:00' && value.data_envio == '0000-00-00 00:00:00' && value.data_avaliacao == '0000-00-00 00:00:00' && (!checkCapacidade('only_self_atividades') || value.id_user == parseInt(arrayConfigAtividades.perfil.id_user) && checkCapacidade('only_self_atividades')) ) {
        btnDialogBoxPro.unshift({
            text: 'Cancelar Conclus\u00E3o',
            icon: "ui-icon-close",
            click: function(event) { 
                completeCancelAtividade(value.id_demanda);
            }
        });
    }
    if (checkCapacidade('complete_edit_atividade') && value.data_entrega != '0000-00-00 00:00:00' && value.data_envio == '0000-00-00 00:00:00' && value.data_avaliacao == '0000-00-00 00:00:00' && (!checkCapacidade('only_self_atividades') || value.id_user == parseInt(arrayConfigAtividades.perfil.id_user) && checkCapacidade('only_self_atividades')) ) {
        btnDialogBoxPro.unshift({
            text: 'Editar Conclus\u00E3o',
            icon: "ui-icon-check",
            click: function(event) { 
                completeAtividade(value.id_demanda);
            }
        });
    }
    if (checkCapacidade('send_cancel_atividade') && value.data_envio != '0000-00-00 00:00:00') {
        btnDialogBoxPro.unshift({
            text: 'Cancelar '+__.Arquivamento,
            icon: "ui-icon-close",
            click: function(event) { 
                sendCancelAtividade(value.id_demanda);
            }
        });
    }
    if (actionsAtividade(value.id_demanda, 'icon').action != 'info') {
        btnDialogBoxPro.unshift({
            text: actionsAtividade(value.id_demanda, 'icon').name,
            click: function(event) { 
                actionsAtividade(value.id_demanda);
            }
        });
    }

    resetDialogBoxPro('dialogBoxPro');
    dialogBoxPro = $('#dialogBoxPro')
            .html('<div class="dialogBoxDiv">'+htmlBox+'</div>')
            .dialog({
                title: 'Informa\u00E7\u00F5es '+__.da_Demanda+'',
                width: 700,
                open: function() { updateButtonConfirm(this, true) },
                close: function() { 
                    $('#boxAtividade').remove();
                    resetDialogBoxPro('dialogBoxPro');
                },
                buttons: btnDialogBoxPro
            });
}
function getInfoAtividadeChecklist(value, mode) {
    var checklist = value.checklist;
    var verifyChecklist = (checklist && checklist.length > 0) ? true : false;
    var valueNow = (verifyChecklist) ? jmespath.search(checklist, "[?data_fim!='0000-00-00 00:00:00']") : null;
        valueNow = (valueNow !== null) ? valueNow.length : 0;
    var valuePercent = (verifyChecklist) ? ((valueNow/checklist.length)*100).toFixed(2) : 0;
    if (mode == 'actions') {
        var updateCheck = (value.data_entrega == '0000-00-00 00:00:00' && ((checkCapacidade('update_checklist') && value.id_user == arrayConfigAtividades.perfil.id_user) || checkCapacidade('update_checklist_all'))) ? true : false;
        var html_list = '<span class="info_checklist info_noclick" data-id-demanda="'+value.id_demanda+'" style="'+(verifyChecklist ? 'display:block;' : 'display:none;')+'">'+
                        '   <span class="info_checklist_head">'+
                        '       <span class="head_label">'+
                        '           <i class="fas fa-check-double" style="color: #4285f4; padding-right: 3px; font-size: 12pt;"></i> '+
                        '           Checklist'+
                        '       </span>'+
                        (checkCapacidade('update_checklist_all') && value.data_entrega == '0000-00-00 00:00:00' ?
                        '       <a class="newLink checklist_edit" onclick="parent.checklistEdit(this)" style="position: absolute;right: 15px;">'+
                        '           <i style="margin-right: 3px;font-size: 11pt;" class="fas fa-edit azulColor"></i>'+
                        '       </a>'+
                        '' : '')+
                        (value.data_entrega != '0000-00-00 00:00:00' ? 
                        '       <a class="newLink checklist_toggle" onclick="parent.checklistToggle(this)" style="position: absolute;right: 15px;">'+
                        '           <i style="margin-right: 3px;font-size: 11pt;" class="fas fa-'+(value.data_avaliacao == '0000-00-00 00:00:00' ? 'chevron-down' : 'chevron-right')+' azulColor"></i>'+
                        '       </a>'+
                        '' : '')+
                        '       <div class="checklist_progress ui-progressbar ui-corner-all ui-widget ui-widget-content" data-valuenow="'+valueNow+'" data-max="'+(verifyChecklist ? checklist.length : 0)+'">'+
                        '           <div class="ui-progressbar-value ui-corner-left ui-widget-header" style="width: '+valuePercent+'%;"></div>'+
                        '       </div>'+
                        '   </span>'+
                        '   <span class="info_checklist_itens" style="'+(value.data_avaliacao != '0000-00-00 00:00:00' ? 'display:none;' : '')+'" data-id-demanda="'+value.id_demanda+'">';
        if (verifyChecklist) {
            $.each(checklist, function(i, v) {
                var checked = (v.data_fim != '0000-00-00 00:00:00') ? true : false;
                var data_fim = (v.data_fim != '0000-00-00 00:00:00') ? getDateSemantic({date: v.data_fim}).dateref : '';  
                html_list +=    '   <span class="info_checklist_item '+(checked ? 'checklist_checked' : '')+'" data-id-checklist="'+v.id_checklist+'" data-id-demanda="'+value.id_demanda+'" data-ordem="'+v.ordem+'" data-old-value="'+v.nome_checklist+'">'+
                                '       <span class="label_item" '+(checkCapacidade('update_checklist_all') ? 'onkeypress="if (event.which == 13) { parent.checklistUpdate(this, \'rename\'); return false; }"' : '')+' '+(updateCheck ? 'onclick="parent.checklistUpdate(this, \'send\')" style="cursor:pointer"' : '')+' >'+
                                '           <i class="'+(checked ? 'fas fa-check-square' : 'far fa-square')+'" style="color: #406987; margin-right: 3px; '+(updateCheck ? 'cursor: pointer;' : '')+' font-size: 12pt;"></i> '+
                                '           <span class="label_name" '+(checkCapacidade('update_checklist_all') ? 'onblur="parent.checklistUpdate(this, \'rename\');"' : '')+'>'+v.nome_checklist+'</span>'+
                                '       </span>'+
                                '       <span class="label_options">'+
                                (checkCapacidade('update_checklist_all') ? 
                                '           <span class="checklist_remove" onclick="parent.checklistUpdate(this, \'remove\')" style="cursor:pointer"><i class="far fa-trash-alt cinzaColor" style="font-size: 10pt;"></i></span>'+
                                '           <span class="checklist_order" ><i class="fas fa-bars cinzaColor" style="font-size: 12pt;"></i></span>'+
                                '' : '')+
                                '           <span class="checklist_date" data-date-fim="'+v.data_fim+'" '+(data_fim != '' ? 'onmouseover="return infraTooltipMostrar(\'Conclu\u00EDdo em: '+moment(v.data_fim, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY [\u00E0s] HH:mm')+'\');" onmouseout="return infraTooltipOcultar();"' : '')+'>'+data_fim+'</span>'+
                                '       </span>'+
                                '   </span>';
            });
        }        
            html_list +=    '</span>'+
                        (checkCapacidade('update_checklist_all') ?
                        '   <span class="info_checklist_new" style="text-align: right;">'+
                        '       <a class="newLink checklist_new" onclick="parent.checklistUpdate(this, \'new\')">'+
                        '           <i style="margin-right: 3px;" class="fas fa-plus-circle azulColor"></i>'+
                        '           Adicionar item'+
                        '       </a>'+
                        '   </span>'+
                        '' : '')+
                        '</span>';
            if ( ((checkCapacidade('update_checklist') && value.id_user == arrayConfigAtividades.perfil.id_user) || checkCapacidade('update_checklist_all')) && value.data_entrega == '0000-00-00 00:00:00') {
                html_list +=    '<span class="info_checklist_btn info_noclick" style="'+(!verifyChecklist ? 'display:block;' : 'display:none;')+' padding: 0;opacity: 1;">'+
                                '   <a class="newLink" onclick="parent.checklistOpen(this)">'+
                                '       <i style="margin-right: 3px;" class="fas fa-check-double azulColor"></i>'+
                                '       Inserir checklist'+
                                '   </a>'+
                                '</span>';
            }
        return html_list;
    } else if (mode == 'html') {
        var html_list = '<span class="info_checklist">'+
                        '   <span class="info_checklist_head">'+
                        '       <div class="checklist_progress ui-progressbar ui-corner-all ui-widget ui-widget-content" data-valuenow="'+valueNow+'" data-max="'+checklist.length+'">'+
                        '           <div class="ui-progressbar-value ui-corner-left ui-widget-header" style="width: '+valuePercent+'%;"></div>'+
                        '       </div>'+
                        '   </span>'+
                        '   <span class="info_checklist_itens">';
                $.each(checklist, function(i, v) {
                var checked = (v.data_fim != '0000-00-00 00:00:00') ? true : false;
                var data_fim = (v.data_fim != '0000-00-00 00:00:00') ? getDateSemantic({date: v.data_fim}).dateref : '';  
                    html_list +=    '   <span class="info_checklist_item '+(checked ? 'checklist_checked' : '')+'">'+
                                    '       <span class="label_item">'+
                                    '           <i class="'+(checked ? 'fas fa-check-square' : 'far fa-square')+'" style="color: #406987; margin-right: 3px; font-size: 12pt;"></i> '+
                                    '           <span class="label_name">'+v.nome_checklist+'</span>'+
                                    '       </span>'+
                                    '       <span class="label_options">'+
                                    '           <span class="checklist_date" data-date-fim="'+v.data_fim+'" '+(data_fim != '' ? 'onmouseover="return infraTooltipMostrar(\'Conclu\u00EDdo em: '+moment(v.data_fim, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY [\u00E0s] HH:mm')+'\');" onmouseout="return infraTooltipOcultar();"' : '')+'>'+data_fim+'</span>'+
                                    '       </span>'+
                                    '   </span>';
                });
                html_list +=    '</span>'+
                        '</span>';
        return html_list;
    } else if (mode == 'text') {
        var valueNow = jmespath.search(checklist, "[?data_fim!='0000-00-00 00:00:00']").length;
        var valuePercent = ((valueNow/checklist.length)*100).toFixed(2);
        var text_list = '-- Checklist ('+valuePercent+'%)<br>';
        $.each(checklist, function(i, v) {
            var checked = (v.data_fim != '0000-00-00 00:00:00') ? true : false;
                text_list +=    '   '+(checked ? '<i class=\'fas fa-check-square\'></i> <span style=\'text-decoration: line-through;\'>'+v.nome_checklist+'</span>' : '<i class=\'far fa-square\'></i> '+v.nome_checklist)+'<br>';
            });
        return text_list;
    } else if (mode == 'icon') {
        var valueNow = jmespath.search(checklist, "[?data_fim!='0000-00-00 00:00:00']").length;
        var percentCheck = parseFloat(((valueNow/checklist.length)*100).toFixed(2));
        var tooltip = getInfoAtividadeChecklist(value, 'text').replace(/'/g, "\\'");
            tooltip = 'onmouseover="return infraTooltipMostrar(\''+tooltip+'\')" onmouseout="return infraTooltipOcultar();"';
        var html_icon = '<span class="info_checklist_icon">'+
                        '   <span class="dateboxDisplay" '+tooltip+'>'+
                        '       <svg viewBox="0 0 36 36" class="circular-chart"><path class="circle" stroke-dasharray="'+percentCheck+', 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path></svg>'+
                        '       <i class="fas fa-circle azulColor" style="padding-right: 3px;cursor: pointer;font-size: 12pt;"></i>'+
                        '       <i class="fas fa-check-double" style="margin: 3px 0px 0px -16px;cursor: pointer;font-size: 8pt;position: absolute;color: #fff;"></i>'+
                        '   </span>'+
                        '</span>';
        return html_icon;
    }
}
function getInfoAtividadeProdutividade_text(value) {
    var tempo_despendido = (value.tempo_despendido <= 0 ) ? 0.01 : value.tempo_despendido;
    var produtividade = (value.tempo_pactuado/tempo_despendido).toFixed(5);
    var produtividadePercent = (produtividade*100).toFixed(2);
    return toNumBr(produtividadePercent)+'%';
}
function getInfoAtividadeProdutividade(value, show = false) {
    var val_tempo_despendido = ($('#ativ_tempo_despendido').length > 0 && $('#ativ_tempo_despendido').is('input')) ? parseFloat($('#ativ_tempo_despendido').val()) : value.tempo_despendido;
    var val_tempo_pactuado = ($('#ativ_tempo_pactuado').length > 0 && $('#ativ_tempo_pactuado').is('input')) ? parseFloat($('#ativ_tempo_pactuado').val()) : value.tempo_pactuado;
    var val_tempo_despendido = (val_tempo_despendido <= 0 ) ? 0.01 : val_tempo_despendido;
    var tempo_pactuado = (val_tempo_pactuado <= 1) ? decimalHourToMinute(val_tempo_pactuado)+' hora' : decimalHourToMinute(val_tempo_pactuado)+' horas';
    var tempo_despendido = (val_tempo_despendido <= 1) ? decimalHourToMinute(val_tempo_despendido)+' hora' : decimalHourToMinute(val_tempo_despendido)+' horas';
    var produtividade = (val_tempo_pactuado/val_tempo_despendido).toFixed(5);
    var produtividadePercent = (produtividade*100).toFixed(2);
    var produtividadeParam = (produtividade > 1) 
                ? {color: 'stroke: #72a50a70;', class: 'verdeColor', icon: 'fas fa-arrow-alt-circle-up' }
                : {color: 'stroke: #ff010199;', class: 'vermelhoColor', icon: 'fas fa-arrow-alt-circle-down' };
        produtividadeParam = (produtividade == 1) 
                ? {color: '', class: 'azulColor', icon: 'fas fa-check-circle' }
                : produtividadeParam;
        produtividadeParam = (produtividade >= 0.5 && produtividade < 1) 
                ? {color: 'stroke: #ffa20199;', class: 'laranjaColor', icon: 'fas fa-minus-circle' }
                : produtividadeParam;
    var produtividadeHtml = '<div class="demandaProdutividade dateboxDisplay" onmouseover="return infraTooltipMostrar(\'Tempo pactuado: '+tempo_pactuado+'<br>Tempo despendido: '+tempo_despendido+'\',\'Produtividade: '+toNumBr(produtividadePercent)+'%\');" onmouseout="return infraTooltipOcultar();">'+
                            '   <svg viewBox="0 0 36 36" class="circular-chart"><path style="'+produtividadeParam.color+'" class="circle" stroke-dasharray="'+produtividadePercent+', 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path></svg>'+
                            '   <i class="'+produtividadeParam.icon+' '+produtividadeParam.class+'" style="padding-right: 3px;cursor: pointer;font-size: 12pt;margin-right: 3px;"></i> '+toNumBr(produtividadePercent)+'%'+
                            '</div>';

    var checkConfigAtiv = jmespath.search(arrayConfigAtividades.atividades, "[?id_atividade==`"+value.id_atividade+"`] | [0].config.desativa_produtividade");
    var infoProdutividade = (checkConfigAtiv) 
        ? '- <span onmouseover="return infraTooltipMostrar(\'C\u00E1lculo de produtividade desativado para este tipo de atividade\')" onmouseout="return infraTooltipOcultar();"><i class="fas fa-info-circle azulColor"></i></span>' 
        : (val_tempo_pactuado == 0) 
            ? '- <span onmouseover="return infraTooltipMostrar(\'Vincule um tipo de atividade para o c\u00E1lculo de produtividade.\')" onmouseout="return infraTooltipOcultar();"><i class="fas fa-info-circle azulColor"></i></span>'
            : '-';
    
    var configAtviTempoMin = jmespath.search(arrayConfigAtividades.atividades, "[?id_atividade==`"+value.id_atividade+"`] | [0].config.tempo_minimo");
        configAtviTempoMin = (configAtviTempoMin === null) 
                            ? 0.2 
                            : (configAtviTempoMin == 0) ? false : parseFloat(configAtviTempoMin)/100;

    var checkConfigAtviTempoMin = (configAtviTempoMin && val_tempo_despendido < val_tempo_pactuado*configAtviTempoMin) ? true : false;
    var produtividadeHtml = (checkConfigAtviTempoMin) 
        ?   produtividadeHtml+
            '<div class="info_tags_follow info_alerta_produtividade" style="margin-top: 5px;">'+
            '   <span style="background-color: #f9efad;font-size: 10pt;color: #666;" class="tag_text">'+
            '       <i class="fas fa-info-circle azulColor" style="margin: 0px 2px;"></i>'+
            '       Tempo despendido abaixo do m\u00EDnimo esperado ('+decimalHourToMinute(val_tempo_pactuado*configAtviTempoMin)+' '+(val_tempo_pactuado*configAtviTempoMin > 1 ? 'horas' : 'hora')+')'+
            '   </span>'+
            '</div>'
        : produtividadeHtml;
        
    return (!checkConfigAtiv && val_tempo_despendido > 0 && val_tempo_pactuado > 0 && (show || checkCapacidade('chart_produtividade') || (typeof arrayConfigAtividades.perfil !== 'undefined' && value.id_user == arrayConfigAtividades.perfil.id_user)) ) ? produtividadeHtml : infoProdutividade;
}
function getInfoAtividade(value) {
    var requisicao = (typeof value.requisicao_sei !== 'undefined' && value.requisicao_sei !== null && parseInt(value.requisicao_sei) != 0) ? value.nome_requisicao+' ('+value.requisicao_sei+')' : value.nome_requisicao;
        // requisicao = (value.processo_sei !== null && value.processo_sei != '') ? value.processo_sei+' / '+requisicao : requisicao;
    var linkProc = (value.id_procedimento !== null && value.processo_sei !== null && value.processo_sei != '') ? url_host+'?acao=procedimento_trabalhar&id_procedimento='+value.id_procedimento : 'javascript:return false';
    var processoHtml = (value.processo_sei !== null && value.processo_sei != '')
                        ? '               <a '+(linkProc == '' ? 'style="cursor: auto;"' : 'style="font-size: 10pt;text-decoration: underline; color: #00c;" href="'+linkProc+'" target="_blank"')+'>'+
                        '                   <i class="far fa-folder-open" '+(linkProc == '' ? 'style="font-size: 10pt;color: #a2a2a2;"' : 'style="color: #00c; text-decoration: underline;"')+'></i> '+
                        '                   <span '+(linkProc == '' ? '' : 'style="color: #00c;"')+'></i> '+
                        '                       '+value.processo_sei+
                        '                   </span>'+
                        '                   <i class="fas fa-external-link-alt" style="font-size: 80%;color: #00c;vertical-align: top;margin-left: 5px;"></i>'+
                        '               </a>'
                        : '-';
    var entrega = (typeof value.documento_sei !== 'undefined' && value.documento_sei !== null && parseInt(value.documento_sei) != 0) ? value.nome_documento+' ('+value.documento_sei+')' : value.nome_documento;
        entrega = (value.processo_sei !== null && value.processo_sei != '') ? value.processo_sei+' / '+entrega : entrega;
    var tempo_planejado = (value.tempo_planejado == 1) ? value.tempo_planejado+' hora' : value.tempo_planejado+' horas';
    var dias_planejado = (value.dias_planejado == 1) ? value.dias_planejado+' dia' : value.dias_planejado+' dias';
    var tempo_despendido = (value.tempo_despendido == 1) ? value.tempo_despendido+' hora' : value.tempo_despendido+' horas';
    var dias_despendido = (value.dias_despendido == 1) ? value.dias_despendido+' dia' : value.dias_despendido+' dias';
    var linkRequisicao = (value.id_documento_requisicao !== null && value.id_documento_requisicao != '') ? url_host+'?acao=procedimento_trabalhar&id_procedimento='+value.id_procedimento+'&id_documento='+value.id_documento_requisicao : 'javascript:return false';
    var projetado = getDatesFormatBR(value.data_distribuicao)+' \u00E0 '+getDatesFormatBR(value.prazo_entrega)+' ('+tempo_planejado+' / '+dias_planejado+')';
    var despendido = (value.data_entrega == '0000-00-00 00:00:00') ? '-' : getDatesFormatBR(value.data_inicio)+' \u00E0 '+getDatesFormatBR(value.data_entrega)+' ('+tempo_despendido+' / '+dias_despendido+')';
    var statusAtividade = (moment(value.prazo_entrega,'YYYY-MM-DD HH:mm:ss') < moment()) ? '<i class="fas fa-exclamation-triangle vermelhoColor"></i> Atrasado' : '<i class="far fa-clock azulColor"></i> No prazo';
        statusAtividade = (value.data_entrega != '0000-00-00 00:00:00' && moment(value.data_entrega,'YYYY-MM-DD HH:mm:ss') <= moment(value.prazo_entrega,'YYYY-MM-DD HH:mm:ss')) ? '<i class="fas fa-check-circle verdeColor"></i> Entregue no prazo' : statusAtividade;
        statusAtividade = (value.data_entrega != '0000-00-00 00:00:00' && moment(value.data_entrega,'YYYY-MM-DD HH:mm:ss') > moment(value.prazo_entrega,'YYYY-MM-DD HH:mm:ss')) ? '<i class="fas fa-check-circle laranjaColor"></i> Entregue fora do prazo' : statusAtividade;
    var modalDocRequisicao = "openDialogDoc({title: '"+requisicao+"', id_procedimento: '"+value.id_procedimento+"', id_documento: '"+value.id_documento_requisicao+"'})";
    var modalDocEntrega = "openDialogDoc({title: '"+entrega+"', id_procedimento: '"+value.id_procedimento+"', id_documento: '"+value.id_documento_entregue+"'})";
    var textPause = (typeof value.pausa_lista !== 'undefined' && value.pausa_lista !== null && value.pausa_lista.length > 0) 
                    ? $.map(value.pausa_lista, function(v, i){ return '('+(i+1)+') '+moment(v.data_inicio,'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm')+' \u00E0 '+moment(v.data_fim,'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm') }).join('<br>')
                    : false;
                    textPause = (textPause) ? '<br><br> -- Paralisa\u00E7\u00F5es<br>'+textPause : '';
                    // console.log(textPause, value.pausa_lista);
    var atividadeHtml =     '      <tr style="height: 40px;">'+
                            '          <td style="vertical-align: bottom; width: 170px;"><i class="iconPopup iconSwitch fas fa-hashtag cinzaColor"></i>ID '+__.da_Demanda+':</td>'+
                            '          <td>'+
                            '               '+value.id_demanda+
                            '          </td>'+
                            '      <tr style="height: 40px;">'+
                            '          <td style="vertical-align: bottom; width: 170px;"><i class="iconPopup iconSwitch fas fa-folder-open cinzaColor"></i>Processo SEI:</td>'+
                            '          <td>'+
                            '               '+processoHtml+
                            '          </td>'+
                            '      </tr>'+
                            '      <tr style="height: 40px;">'+
                            '          <td style="vertical-align: bottom; width: 170px;"><i class="iconPopup iconSwitch fas fa-inbox cinzaColor"></i>Requisi\u00E7\u00E3o:</td>'+
                            '          <td>'+
                            '           '+getHtmlLinkQuicView({id_procedimento: value.id_procedimento, id_documento: value.id_documento_requisicao, action: modalDocRequisicao, title: requisicao})+
                            '          </td>'+
                            '      </tr>'+
                            '      <tr style="height: 40px;">'+
                            '          <td style="vertical-align: bottom;"><i class="iconPopup iconSwitch fas fa-briefcase cinzaColor"></i>Unidade:</td>'+
                            '          <td>'+value.nome_unidade+' ('+value.sigla_unidade+')</td>'+
                            '      </tr>'+
                            '      <tr style="height: 40px;">'+
                            '          <td style="vertical-align: bottom;"><i class="iconPopup iconSwitch fas fa-user-tie cinzaColor"></i>Respons\u00E1vel:</td>'+
                            '          <td>'+(value.nome_completo ? value.nome_completo : '')+'</td>'+
                            '      </tr>'+
                            '      <tr style="height: 40px;">'+
                            '          <td style="vertical-align: bottom;"><i class="iconPopup iconSwitch fas fa-clipboard-list cinzaColor"></i>'+__.Atividade+':</td>'+
                            '          <td>'+value.nome_atividade+'</td>'+
                            '      </tr>'+
                            '      <tr style="height: 40px;">'+
                            '          <td style="vertical-align: bottom;"><i class="iconPopup iconSwitch fas fa-comment-dots cinzaColor"></i>'+__.Assunto+':</td>'+
                            '          <td>'+value.assunto+'</td>'+
                            '      </tr>'+
                            '      <tr style="height: 40px;">'+
                            '          <td style="vertical-align: bottom;"><i class="iconPopup iconSwitch fas fa-quote-left cinzaColor"></i>'+__.Observacao+' '+__.Gerencial+':</td>'+
                            '          <td>'+(value.observacao_gerencial ? value.observacao_gerencial : '-')+'</td>'+
                            '      </tr>'+
                            '      <tr style="height: 40px;">'+
                            '          <td style="vertical-align: bottom;"><i class="iconPopup iconSwitch fas fa-tags cinzaColor"></i>Etiquetas:</td>'+
                            '          <td>'+(value.etiquetas !== null && value.etiquetas.length > 0 ? '<span class="info_tags_follow">'+$.map(value.etiquetas, function (i) { return $(getHtmlEtiqueta(i,'ativ')).css('cursor','initial')[0].outerHTML }).join('')+'</span>' : '-')+'</td>'+
                            '      </tr>'+
                            '      <tr style="height: 40px;">'+
                            '          <td style="vertical-align: bottom;"><i class="iconPopup iconSwitch fas fa-handshake cinzaColor"></i>Tempo Pactuado:</td>'+
                            '          <td><span title="'+value.tempo_pactuado+' '+(value.tempo_pactuado > 1 ? 'horas' : 'hora')+'">'+decimalHourToMinute(value.tempo_pactuado)+' '+(value.tempo_pactuado > 1 ? 'horas' : 'hora')+'</span> (Fator de '+__.complexidade+': '+value.fator_complexidade+')</td>'+
                            '      </tr>'+
                            '      <tr style="height: 40px;">'+
                            '          <td style="vertical-align: bottom;"><i class="iconPopup iconSwitch fas fa-business-time cinzaColor"></i>Tempo planejado:</td>'+
                            '          <td>'+projetado+'</td>'+
                            '      </tr>'+
                            '      <tr style="height: 40px;">'+
                            '          <td style="vertical-align: bottom;"><i class="iconPopup iconSwitch fas fa-hourglass-half cinzaColor"></i>Tempo despendido:</td>'+
                            '          <td>'+despendido+textPause+'</td>'+
                            '      </tr>'+
                            '      <tr style="height: 40px;">'+
                            '          <td style="vertical-align: bottom;"><i class="iconPopup iconSwitch fas fa-inbox cinzaColor"></i>Entrega:</td>'+
                            '          <td>'+
                            '           '+(value.data_entrega == '0000-00-00 00:00:00' ? '-' : getHtmlLinkQuicView({id_procedimento: value.id_procedimento, id_documento: value.id_documento_entregue, action: modalDocEntrega, title: entrega}))+
                            '          </td>'+
                            '      </tr>'+
                            '      <tr style="height: 40px;">'+
                            '          <td style="vertical-align: bottom;"><i class="iconPopup iconSwitch fas fa-info cinzaColor"></i>Status:</td>'+
                            '          <td style="padding-left: 5px;">'+statusAtividade+'</td>'+
                            '      </tr>'+
                            '      <tr style="height: 40px;">'+
                            '          <td style="vertical-align: bottom;"><i class="iconPopup iconSwitch fas fa-quote-left cinzaColor"></i>'+__.Observacao+' '+__.Tecnica+':</td>'+
                            '          <td>'+(value.observacao_tecnica ? value.observacao_tecnica : '-')+'</td>'+
                            '      </tr>'+
                            '      <tr style="height: 40px;">'+
                            '          <td style="vertical-align: bottom;"><i class="iconPopup iconSwitch fas fa-check-double cinzaColor"></i>Checklist:</td>'+
                            '          <td><span class="info_checklist_text">'+(value.checklist ? getInfoAtividadeChecklist(value, 'text') : '-')+'</span></td>'+
                            '      </tr>';

            atividadeHtml += (value.data_avaliacao != '0000-00-00 00:00:00' && value.avaliacao != 0) 
                            ?   '      <tr style="height: 40px;">'+
                                '          <td style="vertical-align: bottom;"><i class="iconPopup iconSwitch fas fa-toolbox cinzaColor"></i>Produtividade:</td>'+
                                '          <td><div style="margin-left: -10px;">'+getInfoAtividadeProdutividade(value)+'</div></td>'+
                                '      </tr>'+
                                '      <tr style="height: 40px;">'+
                                '          <td style="vertical-align: bottom;"><i class="iconPopup iconSwitch fas fa-tasks cinzaColor"></i>Avalia\u00E7\u00E3o:</td>'+
                                '          <td style="vertical-align: baseline;">'+
                                '               <div class="ratingWhy" style="text-align: left; margin: 0;">'+
                                '                   <i data-nota="'+(value.avaliacao.nota_atribuida === false ? '-' : value.avaliacao.nota_atribuida)+'" class="fas fa-star cinzaColor starGold starSelected"></i>'+
                                '                   '+(value.avaliacao.comentarios != '' ? '<span class="answer" style="cursor: initial;"><i class="far fa-comment-alt cinzaColor"></i> '+value.avaliacao.comentarios+'</span>' : '' )+
                                '                   '+(value.avaliacao.nota_atribuida && value.avaliacao.justificativas.length > 0 ? $.map(value.avaliacao.justificativas,function(i){ return '<span class="answer" style="cursor: initial;">'+i.nome_justificativa+'</span>' }).join('') : (value.avaliacao.nota_atribuida === false ? 'Avalia\u00E7\u00E3o Dispensada' : '') )+
                                '               </div>'+
                                '          </td>'+
                                '      </tr>'
                            : ''; 
    return atividadeHtml;
}
function getHtmlLinkQuicView(value) {
    var html =  (value.id_procedimento !== null && value.id_procedimento != 0 && value.id_documento !== null && value.id_documento != 0) 
                ?   '<a style="color: #00c; text-decoration: underline; font-size: 10pt; cursor: pointer;" onclick="'+value.action+'" onmouseover="return infraTooltipMostrar(\'Visualiza\u00E7\u00E3o r\u00E1pida\');" onmouseout="return infraTooltipOcultar();">'+
                    '    '+value.title+
                    '    <i class="fas fa-eye" style="font-size: 80%;color: #00c;vertical-align: top;margin-left: 5px;"></i>'+
                    '</a>'
                :   '<span>'+
                    '    '+value.title+
                    '</span>';
    return html;
}
function checkAllInputEmail(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.ui-dialog');
        _parent.find('input[type="email"]').each(function(){
            checkInputEmail(this);
        });
}
function checkInputEmail(this_) {
    var _this = $(this_);
    if (checkValue(_this) && validateEmail(_this.val())) {
        _this.removeClass('requiredNull');
        if (_this.attr('id') == 'user_email') { 
            checkInputEmailServer(this_);
        }
    } else {
        _this.addClass('requiredNull');
    }
}
function checkInputEmailServer(this_) {
    var _this = $(this_);
    var value = _this.val();
    var action = 'config_new_users';
    var param = {
        action: action, 
        mode: 'check',
        email: value
    };
    getServerAtividades(param, action);
}
function moveUserCapacity(id_user) {
    var action = 'config_new_users';
    var param = {
        action: action, 
        mode: 'move',
        id_user: id_user
    };
    getServerAtividades(param, action);
}
function checkSigleInputDateAtiv(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.ui-dialog');
    var input = _parent.find('input[data-type="inicio"]');
    var element = input[0];
    var config_unidade = getConfigDadosUnidade();
    var dataInicio = input.val();
    var dataMin = input.attr('min');
    var dataMinFormat = moment(dataMin, config_unidade.hora_format).format('DD/MM/YYYY HH:mm');
    var labelInicio = input.data('name');
    var labelMin = input.data('name-min');
    if ( moment(dataMin, config_unidade.hora_format) > moment(dataInicio, config_unidade.hora_format) ) { 
        element.setCustomValidity('*'); 
    } else { 
        element.setCustomValidity(''); 
    }
    var userValidation = element.checkValidity();
    
    if (userValidation) {
        _this.removeClass('requiredNull');
        updateButtonConfirm(this_, true);
        return true;
    } else {
        _this.addClass('requiredNull');
        element.setCustomValidity('A '+labelInicio+' deve ser maior ou igual que a '+labelMin+' ('+dataMinFormat+')');
        var isValid = element.reportValidity();
        updateButtonConfirm(this_, false);
        return false;
    }
}
function actionsAtividade(id_demanda = 0, mode = 'action') {
    infraTooltipOcultar();
    if (id_demanda != 0) {
        var tr = $('#tabelaAtivPanel table tr[data-index="'+id_demanda+'"]');
        if (tr.is(':visible')) {
            var tableDemanda = $('#tabelaAtivPanel table');
            var countSelected = tableDemanda.find('tr.infraTrMarcada').length;
            if (countSelected > 0) {
                tableDemanda.find('.lnkInfraCheck').data('index',1).trigger('click');
            }
            tr.find('td').eq(0).find('input[type="checkbox"]').trigger('click');
        }
        var value = jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+id_demanda+"`] | [0]");
        if (value !== null) {
            if (checkCapacidade('edit_atividade') && checkCapacidade('select_user_atividade')) {
                if (id_demanda != 0 && checkCapacidade('rate_atividade') && value.data_avaliacao == '0000-00-00 00:00:00' && value.data_entrega != '0000-00-00 00:00:00' && value.data_envio == '0000-00-00 00:00:00') {
                    if (mode == 'action') { 
                        rateAtividade(id_demanda);
                    } else if (mode == 'icon') { 
                        return {icon: 'fas fa-star-half-alt', name: 'Avaliar '+__.demanda+'', action: 'rate'} 
                    }
                } else if (id_demanda != 0 && checkCapacidade('complete_atividade') && value.data_inicio != '0000-00-00 00:00:00' && value.data_entrega == '0000-00-00 00:00:00' && value.data_envio == '0000-00-00 00:00:00') {
                    if (mode == 'action') { 
                        completeAtividade(id_demanda);
                    } else if (mode == 'icon') { 
                        return {icon: 'fas fa-check-circle', name: 'Concluir '+__.demanda+'', action: 'complete'} 
                    }
                } else if (checkCapacidade('send_atividade') && value.data_avaliacao != '0000-00-00 00:00:00' && value.data_envio == '0000-00-00 00:00:00') {
                    if (mode == 'action') { 
                        sendAtividade(id_demanda);
                    } else if (mode == 'icon') { 
                        return {icon: 'fas fa-archive', name: __.Arquivar+' '+__.demanda+'', action: 'send'} 
                    }
                } else if (value.data_envio == '0000-00-00 00:00:00') {
                    if (mode == 'action') { 
                        saveAtividade(id_demanda);
                    } else if (mode == 'icon') { 
                        return {icon: 'fas fa-pencil-alt', name: 'Editar '+__.demanda+'', action: 'edit'} 
                    }
                } else {
                    if (mode == 'action') { 
                        infoAtividade(id_demanda);
                    } else if (mode == 'icon') { 
                        return {icon: 'fas fa-info-circle', name: 'Informa\u00E7\u00F5es '+__.da_demanda, action: 'info'} 
                    }
                }
            } else {
                if (value.id_user == 0) {    
                    if (mode == 'action') { 
                        startAtividade(id_demanda);
                    } else if (mode == 'icon') { 
                        return {icon: 'fas fa-play-circle', name: 'Iniciar '+__.demanda+'', action: 'start'} 
                    }
                } else if (value.id_user != 0 && value.id_user != parseInt(arrayConfigAtividades.perfil.id_user)) {    
                    if (mode == 'action') { 
                        infoAtividade(id_demanda);
                    } else if (mode == 'icon') { 
                        return {icon: 'fas fa-info-circle', name: 'Informa\u00E7\u00F5es '+__.da_demanda, action: 'info'} 
                    }
                } else {
                    if (checkCapacidade('start_atividade') && value.data_inicio == '0000-00-00 00:00:00' && value.data_envio == '0000-00-00 00:00:00') {
                        if (mode == 'action') { 
                            startAtividade(id_demanda);
                        } else if (mode == 'icon') { 
                            return {icon: 'fas fa-play-circle', name: 'Iniciar '+__.demanda+'', action: 'start'} 
                        }
                    } else if (checkCapacidade('complete_atividade') && value.data_inicio != '0000-00-00 00:00:00' && value.data_entrega == '0000-00-00 00:00:00' && value.data_envio == '0000-00-00 00:00:00') {
                        if (mode == 'action') { 
                            completeAtividade(id_demanda);
                        } else if (mode == 'icon') { 
                            return {icon: 'fas fa-check-circle', name: 'Concluir '+__.demanda+'', action: 'complete'} 
                        }
                    } else if (checkCapacidade('rate_atividade') && value.data_avaliacao == '0000-00-00 00:00:00' && value.data_entrega != '0000-00-00 00:00:00' && value.data_envio == '0000-00-00 00:00:00') {
                        if (mode == 'action') { 
                            rateAtividade(id_demanda);
                        } else if (mode == 'icon') { 
                            return {icon: 'fas fa-star-half-alt', name: 'Avaliar '+__.demanda+'', action: 'rate'} 
                        }
                    } else {
                        if (mode == 'action') { 
                            infoAtividade(id_demanda);
                        } else if (mode == 'icon') { 
                            return {icon: 'fas fa-info-circle', name: 'Informa\u00E7\u00F5es '+__.da_demanda, action: 'info'}
                        }
                    }
                }
            }
        }
    }
}
function notifyAtividade(id_demanda = 0) {
    var value = jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+id_demanda+"`] | [0]");
    var user = jmespath.search(arrayConfigAtividades.planos, "[?id_user==`"+value.id_user+"`] | [0]");
    var notificacao_unidade = jmespath.search(arrayConfigAtividades.unidades, "[?id_unidade==`"+value.id_unidade+"`].config.distribuicao.notificacao | [0]");
    var requisicao = (typeof value.requisicao_sei !== 'undefined' && value.requisicao_sei !== null && parseInt(value.requisicao_sei) != 0) ? value.nome_requisicao+' ('+value.requisicao_sei+')' : value.nome_requisicao;
    var documento = (typeof value.documento_sei !== 'undefined' && value.documento_sei !== null && parseInt(value.documento_sei) != 0) ? value.nome_documento+' '+value.numero_documento+' ('+value.documento_sei+')' : value.nome_documento+' '+value.numero_documento;
    var data_entrega = moment(value.data_entrega, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY [\u00E0s] HH:mm');
    var bodyMail = (value.data_entrega != '0000-00-00 00:00:00') ? notificacao_unidade.texto_conclusao : notificacao_unidade.texto_criacao;
        bodyMail = bodyMail.replace('{usuario}',value.apelido);
        bodyMail = bodyMail.replace('{requisicao}',requisicao);
        bodyMail = bodyMail.replace('{atividade}',value.nome_atividade);
        bodyMail = bodyMail.replace('{processo}',value.processo_sei);
        bodyMail = bodyMail.replace('{assunto}',value.assunto);
        bodyMail = bodyMail.replace('{prazo}',value.dias_planejado);
        bodyMail = bodyMail.replace('{tempo_pactuado}',value.tempo_pactuado);
        bodyMail = bodyMail.replace('{tempo_planejado}',value.tempo_planejado);
        bodyMail = bodyMail.replace('{data_entrega}',data_entrega);
        bodyMail = bodyMail.replace('{observacoes_gerenciais}',value.observacao_gerencial);
        bodyMail = bodyMail.replace('{observacoes}',value.observacao_tecnica);
        bodyMail = bodyMail.replace('{documento_produto}',documento);
        bodyMail = encodeURIComponent(bodyMail);
    var subjectMail = '[ATIVIDADE] '+requisicao+' - '+value.assunto;
    var userMail = (value.data_entrega == '0000-00-00 00:00:00') ? user.email : notificacao_unidade.email;
    var hrefMailto = 'mailto:'+userMail+'?subject='+subjectMail+'&body='+bodyMail;
    window.location.href = hrefMailto;
}
function deleteAtividade(id_demanda = 0) {
    var action = 'delete_atividade';
    var id_unidade = (id_demanda == 0) ? $('#ativ_id_unidade').val() : arrayConfigAtivUnidade.id_unidade;
        id_unidade = (typeof id_unidade !== 'undefined') ? id_unidade : false;

        id_demanda = (id_demanda == 0) ? $('#ativ_id_demanda').val() : id_demanda;
        id_demanda = (typeof id_demanda !== 'undefined' && id_demanda != 0 ) ? id_demanda : false;
    var param = {
                    id_demanda: id_demanda, 
                    id_unidade: id_unidade, 
                    action: action
                };
    if (id_demanda && id_unidade) { getServerAtividades(param, action) }
}
function extractDataAtiv(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.ui-dialog');
    var arrayAtiv = {};
    _parent.find('input,textarea,select').each(function(){
        if (typeof $(this).data('key') !== 'undefined') { 
            var value = $(this).val();
            var date_format = (value && value.indexOf('T') !== -1) ? 'YYYY-MM-DDTHH:mm' : 'YYYY-MM-DD';
            var dataValue = ($(this).attr('type') == 'number' || (value != '' && $(this).data('key').indexOf('id_') !== -1)) ? parseInt(value) : value;
                dataValue = ($(this).attr('type') == 'number' && parseFloat($('#ativ_tempo_despendido').attr('step')) >= 1) ? parseFloat(value) : value;
                dataValue = ($(this).attr('type') == 'date') ? (value == '' ? '' : (moment(value, date_format).format('YYYY-MM-DD')+' 00:00:00')) : dataValue;
                dataValue = ($(this).attr('type') == 'datetime-local') ? (value == '' ? '' : moment(value, date_format).format('YYYY-MM-DD HH:mm:ss')) : dataValue;
                dataValue = ($(this).attr('type') == 'checkbox') ? ($(this).is(':checked') ? 'on' : 'off') : dataValue;
                dataValue = ($(this).is('textarea') || ($(this).is('input') && $(this).attr('type') == 'text') ) ? dataValue.replace(/["']/g, "") : dataValue;
                dataValue = ($(this).is('input') && $(this).attr('type') == 'hidden' && $(this).data('type') == 'json') ? JSON.parse(value) : dataValue;
                dataValue = ($(this).is('input') && $(this).attr('type') == 'hidden' && $(this).data('type') == 'num') ? parseFloat(value) : dataValue;
                dataValue = ($(this).is('input') && $(this).attr('type') == 'hidden') ? value : dataValue;
            arrayAtiv[$(this).data('key')] = dataValue;
        }
    });
    arrayAtiv.etiquetas = (typeof arrayAtiv.etiquetas !== 'undefined' && arrayAtiv.etiquetas != '' && arrayAtiv.etiquetas.indexOf(';') !== -1) 
                        ? arrayAtiv.etiquetas.split(';') 
                        : (typeof arrayAtiv.etiquetas !== 'undefined' && arrayAtiv.etiquetas != '') ? [arrayAtiv.etiquetas] : null;
    arrayAtiv.tempo_pactuado = (arrayAtiv.tempo_pactuado != '') ? _parent.find('#ativ_tempo_pactuado').data('tempo-pactuado') : arrayAtiv.tempo_pactuado;
    arrayAtiv.tempo_planejado = (Number.isNaN(arrayAtiv.tempo_planejado)) ? '' : arrayAtiv.tempo_planejado;
    arrayAtiv.fator_complexidade = (arrayAtiv.fator_complexidade != '') ? parseFloat(_parent.find('#ativ_fator_complexidade').val()) : arrayAtiv.fator_complexidade;
    arrayAtiv.fator_complexidade = (Number.isNaN(arrayAtiv.fator_complexidade)) ? null : arrayAtiv.fator_complexidade;
    arrayAtiv.lista_prioridades = extractInputPriority(this_);
    arrayAtiv.lista_recorrencia = (arrayAtiv.hasOwnProperty('lista_recorrencia') && arrayAtiv.lista_recorrencia != '') ? JSON.parse(arrayAtiv.lista_recorrencia) : arrayAtiv.lista_recorrencia;
    return arrayAtiv;
}
function extractInputPriority(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.atividadeWork');
    var id_demanda = _parent.data('demanda');
    var priority = [];
    var index = 0;
    $('#ativ_lista_prioridades:visible').find('option').each(function(){
        var selected = $(this).is(':selected');
        var data = $(this).data();
        if (selected) {
            index++;
            priority.push({id_demanda: id_demanda, prioridade: index});
        }
            index++;
            priority.push({id_demanda: data.demanda, prioridade: index});
    });
    return priority;
}
function changeProtocoloBoxAtiv(this_) {
    var _this = $(this_);
    var _parent = _this.closest('table');
    if (checkValue(_this)) {
        var protocoloSEI = _this.val().trim();
        getIDProtocoloSEI(protocoloSEI,  
            function(html){
                let $html = $(html);
                var params = getParamsUrlPro($html.find('#ifrArvore').attr('src'));
                var hidden = _this.closest('td').find('input[type="hidden"]');
                var param = hidden.data('param');
                    hidden.val(params[param]);
                    _this.removeClass('requiredNull');
            }, 
            function(){
                alertaBoxPro('Error', 'exclamation-triangle', 'Protocolo n\u00E3o encontrado!');
                _this.addClass('requiredNull');
            });
    } else {
        _this.removeClass('requiredNull');
        _this.closest('td').find('input[type="hidden"]').val('');
    }
}
function checkThisAtivRequiredFields(this_) {
    var _this = $(this_);
    if (_this.prop('required') && checkValue(_this)) { _this.removeClass('requiredNull') }
    if (checkAtivRequiredFields(this_, 'check')) { updateButtonConfirm(this_, true) } else { updateButtonConfirm(this_, false) }
}
function checkAtivRequiredFields(this_, mode) {
    var _this = $(this_);
    var _parent = ($('.ui-dialog').is(':visible')) ? _this.closest('.ui-dialog') : _this.closest('.seiProForm') ;
    var _return = true;
    _parent.find('input,textarea,select').filter('[required]').not(':disabled').each(function(){
        if (!checkValue($(this))) {
            if (mode == 'mark') { 
                $(this).addClass('requiredNull');
                $('#'+$(this).attr('id')+'_chosen').addClass('requiredNull');
            }
            _return = false;
        } else {
            if (mode == 'mark') { 
                $(this).removeClass('requiredNull');
                $('#'+$(this).attr('id')+'_chosen').removeClass('requiredNull');
            }
        }
    });
    return _return;
}
function changeAtivMultiSwitch(this_) {
    var _this = $(this_);
    var _parent = _this.closest('table');
    if(_this.is(':checked')) {
        _parent.find('#div_ativ_fator_multiplicacao').show();
    } else {
        _parent.find('#div_ativ_fator_multiplicacao').hide();
    }
    _parent.find('#ativ_fator_multiplicacao').val(1);
    updateAtivTempoPactuado(this_);
}
function resizeDialogBoxSwitch(this_, padding) {
    var _this = $(this_);
    var height = $('.ui-dialog:visible').height();
    var boxHeight = (_this.is(':checked')) ? height+padding : 'auto';
        dialogBoxPro.dialog( 'option', 'height', boxHeight );
}
function changeAtivVinculacaoSwitch(this_) {
    var _this = $(this_);
    var _parent = _this.closest('table');
    if(_this.is(':checked')) {
        _parent.find('#div_ativ_lista_vinculacao').show();
    } else {
        _parent.find('#div_ativ_lista_vinculacao').hide();
    }
    _parent.find('#div_ativ_lista_vinculacao').val(0);
    // resizeDialogBoxSwitch(this_, 130);
}
function changeAtivPrioritySwitch(this_) {
    var _this = $(this_);
    var _parent = _this.closest('table');
    if(_this.is(':checked')) {
        _parent.find('#div_ativ_lista_prioridades').show();
    } else {
        _parent.find('#div_ativ_lista_prioridades').hide();
    }
    _parent.find('#ativ_lista_prioridades').val(0);
    updateAtivTempoPactuado(this_);
    // resizeDialogBoxSwitch(this_, 130);
}
function changeAtivRecalcPrazoSwitch(this_) {
    var _this = $(this_);
    var _parent = _this.closest('table');
    if(_this.is(':checked')) {
        _parent.find('.infoAtivRecalcPrazo').show();
    } else {
        _parent.find('.infoAtivRecalcPrazo').hide();
    }
}
function initSimpleTableCellEditor(id, TimeOut = 9000) {
    if (TimeOut <= 0) { return; }
    if (typeof SimpleTableCellEditor !== 'undefined') { 
        getSimpleTableCellEditor(id);
    } else {
        setTimeout(function(){ 
            initSimpleTableCellEditor(id, TimeOut - 100); 
            console.log('Reload initSimpleTableCellEditor'); 
        }, 500);
    }
}
function getSimpleTableCellEditor(id) {
    ativBox = new SimpleTableCellEditor(id);
    ativBox.SetEditableClass("editCell");
}
function changeAtivChecklistSwitch(this_) {
    var _this = $(this_);
    var _parent = _this.closest('table');
    var idTable = 'ativBox_checklist';
    var table = $('#'+idTable);
    var table_body = table.find('tbody');
    var checklist = $('#ativ_checklist').val();
        checklist = (checklist != '') ? JSON.parse(checklist) : [];
    if(_this.is(':checked')) {
        _parent.find('#div_ativ_lista_checklist').show();

        if (!table.hasClass('tableEditCell')) {
            if (typeof SimpleTableCellEditor === 'undefined') { 
                $.getScript((URL_SEIPRO+"js/lib/jquery-table-edit.min.js"));
                initSimpleTableCellEditor(idTable);
            } else {
                getSimpleTableCellEditor(idTable);
            }
            table.addClass('tableEditCell');
        }
        
        $('#'+idTable+'.tableSortable tbody').sortable({
            items: 'tr',
            cursor: 'grabbing',
            handle: '.sorterTrConfig',
            forceHelperSize: true,
            opacity: 0.5,
            axis: 'y',
            dropOnEmpty: false,
            update: function(event, ui) {
                $(this).find('tr').each(function(index, value){
                    $(this).attr('data-index',index).data('index',index);
                });
                changeAtivChecklistInput(this);
            }
        });

        if (checklist.length == 0) {
            var html =  '                                        <tr data-index="0" data-key="checklist" style="text-align: left;">'+
                        '                                            <td onchange="changeConfigItemCell(this); changeAtivChecklistInput(this);" class="editCell" data-type="text" style="padding: 0 10px;"></td>'+
                        '                                            <td style="width: 50px; text-align: center;">'+
                        '                                               <i class="fas fa-bars cinzaColor sorterTrConfig" style="cursor: grab;"></i>'+
                        '                                               <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                        '                                            </td>'+  
                        '                                        </tr>';
                table_body.append(html);

                setTimeout(function(){ 
                    table_body.find('tr:last-child').find('td:first-child').trigger('click');
                }, 100);
        } else if (checklist.length > 0) {
            var html = '';
            $.each(checklist, function(i, v){
                html += '                                        <tr data-index="'+i+'" data-key="checklist" style="text-align: left;">'+
                        '                                            <td onchange="changeConfigItemCell(this); changeAtivChecklistInput(this);" class="editCell" data-type="text" style="padding: 0 10px;">'+v+'</td>'+
                        '                                            <td style="width: 50px; text-align: center;">'+
                        '                                               <i class="fas fa-bars cinzaColor sorterTrConfig" style="cursor: grab;"></i>'+
                        '                                               <i class="fas fa-trash-alt cinzaColor removeTrConfig" style="cursor: pointer;float: right;margin-right: 10px;" onclick="removeConfigRow(this)"></i>'+
                        '                                            </td>'+  
                        '                                        </tr>';

            });
            table_body.append(html);
        }
        changeAtivChecklistInput(table_body[0]);
    } else {
        _parent.find('#div_ativ_lista_checklist').hide();
        table_body.html('');
        $('#ativ_checklist').val('[]');
        table.data('mode-insert','auto');
    }
}
function changeAtivChecklistInput(this_) {
    var table = $(this_).closest('table');
    setTimeout(function(){ 
        var arrayChecklist = table.find('tbody .editCell').map(function(){ var text = $(this).text().trim(); if (text!= '') { return $(this).text().trim() } }).get();
        $('#ativ_checklist').val(JSON.stringify(arrayChecklist));
        table.data('mode-insert','manual');
    }, 100);
}
function changeAtivEtiqueta() {
    $('.atividadeWork .tagsinput').find('.tag').each(function(){
        var name = $(this).text().trim();
        var html = $(getHtmlEtiqueta(name, 'ativ'));
        var icon = html.find('i')[0].outerHTML;
        var style = html.attr('style');
            style = (typeof style !== 'undefined') ? style : '';
            $(this).attr('style', style);
            $(this).find('.tag-text').attr('style', style);
            if ($(this).find('i').length == 0) {
                $(this).prepend(icon);
            }
    });
}
function getConfigDadosUnidade(sigla_unidade) {
    var unidade = (typeof sigla_unidade === 'undefined' || sigla_unidade === null) ? arrayConfigAtivUnidade.sigla_unidade : sigla_unidade;
    var _return = jmespath.search(arrayConfigAtividades.unidades, "[?sigla_unidade=='"+unidade+"'] | [0].{sigla_unidade: sigla_unidade, nome_unidade: nome_unidade, count_dias_uteis: config.distribuicao.count_dias_uteis, count_horas: config.distribuicao.count_horas, h_util_inicio: config.distribuicao.horario_util.inicio, h_util_fim: config.distribuicao.horario_util.fim, feriados: config.feriados, modalidades: config.modalidades}");
    if (_return != null) {
        _return['hora_format'] = (_return.count_horas) ? 'YYYY-MM-DDTHH:mm' : 'YYYY-MM-DD';
        if (typeof arrayConfigAtividades.entidades[0] !== 'undefined' && 
            typeof arrayConfigAtividades.entidades[0].config !== 'undefined' && 
            arrayConfigAtividades.entidades[0].config !== null && 
            typeof arrayConfigAtividades.entidades[0].config.feriados !== 'undefined' &&
            arrayConfigAtividades.entidades[0].config.feriados.length > 0
            ) {
            var feriados = (_return['feriados'] !== null) ? _return['feriados'] : [];
            $.each(arrayConfigAtividades.entidades[0].config.feriados, function(i,v){
                if (jmespath.search(feriados,"[?feriado_data=='"+v.feriado_data+"']").length == 0) {
                    feriados.push(v);
                }
            });
            _return['feriados'] = feriados;
        }
        return _return;
    } else {
        return false;
    }
}
function getBoxConfigDadosUnidade(_parent) {
	var unidade = (_parent.find('#ativ_id_atividade').length > 0 && checkValue(_parent.find('#ativ_id_atividade'))) 
                    ? (_parent.find('#ativ_id_atividade').is('select'))
                        ? _parent.find('#ativ_id_atividade').find('option:selected').data('config').sigla_unidade 
                        : (typeof _parent.find('#ativ_id_atividade').data('config') !== 'undefined') 
                            ? _parent.find('#ativ_id_atividade').data('config').sigla_unidade 
                            : _parent.find('#ativ_id_user').find('option:selected').data('config').sigla_unidade 
                    : arrayConfigAtivUnidade.sigla_unidade;
    return getConfigDadosUnidade(unidade);
}
function changeDadosTrabalho(this_, autotime = false) {
    var _this = $(this_);
    var _parent = _this.closest('.atividadeWork');
    var data = _this.data();
    var config_unidade = getBoxConfigDadosUnidade(_parent);
    var dataInicio = _parent.find('input[data-type="inicio"]');
	var dtStart = dataInicio.val();
    var dataFim = _parent.find('input[data-type="fim"]');
    var diasWork = _parent.find('input[data-type="dias"]');
    var config_feriados = (typeof config_unidade.feriados !== 'undefined' && config_unidade.feriados !== null) ? config_unidade.feriados : false;
    var arrayFeriados = (config_unidade.count_dias_uteis && dtStart != '' && checkValue(dataFim)) 
                            ? jmespath.search(getHolidayBetweenDates(moment(dtStart, config_unidade.hora_format).format('Y')+'-01-01',moment(dataFim.val(), config_unidade.hora_format).add(1, 'Y').format('Y')+'-01-01', config_feriados), "[*].d_")
                            : [];
    var dtEnd_Contagem = (diasWork.val() == '' ||  dtStart == '') 
                            ? ''
                            : (config_unidade.count_dias_uteis) 
                                ? moment(dtStart).isoAddWeekdaysFromSet({  
                                    'workdays': parseInt(diasWork.val()),  
                                    'weekdays': [1,2,3,4,5],  
                                    'exclusions': arrayFeriados
                                    }).format(config_unidade.hora_format)
                                : moment(dtStart, config_unidade.hora_format).add(parseInt(diasWork.val()), 'days').format(config_unidade.hora_format);
    var dtEnd = ( data.type == 'fim' )  ? dataFim.val() 
                                                 : dtEnd_Contagem;
    var nrDias_Contagem = (dtStart == '' || dtEnd == '')
                            ? 0
                            : (config_unidade.count_dias_uteis) 
                                ? moment().isoWeekdayCalc({  
                                  rangeStart: dtStart,  
                                  rangeEnd: dtEnd,  
                                  weekdays: [1,2,3,4,5],  
                                  exclusions: arrayFeriados
                                })-1
                                : moment(dtEnd, config_unidade.hora_format).diff(moment(dtStart, config_unidade.hora_format), 'days');
	var nrDias = ( data.type == 'fim' ) ? nrDias_Contagem
                                                 : diasWork.val();
        nrDias = (nrDias < 0) ? 0 : nrDias;

        if ( data.type == 'fim' ) { diasWork.val(nrDias) }
        var dtEnd_hour = moment((moment(dtEnd, config_unidade.hora_format).format('YYYY-MM-DD')+'T'+moment(dataFim.val(), config_unidade.hora_format).format('HH:mm')), config_unidade.hora_format).format(config_unidade.hora_format);
        var dtStart_hour = moment((moment(dtStart, config_unidade.hora_format).format('YYYY-MM-DD')+'T'+moment(dataInicio.val(), config_unidade.hora_format).format('HH:mm')), config_unidade.hora_format).format(config_unidade.hora_format);
            dataFim.val(dtEnd_hour);
            // console.log({config_unidade: config_unidade, dtEnd_hour: dtEnd_hour, dtEnd: dtEnd, hora_format: config_unidade.hora_format, dataFim: dataFim.val()});

        if (typeof dataFim.data('date-min') === 'undefined' || dataFim.data('date-min') != 'fixed') { 
            dataFim.attr('min', dtStart_hour);
        }
        if (typeof dataInicio.data('date-max') === 'undefined' || dataInicio.data('date-max') != 'fixed') {
            dataInicio.attr('max', dtEnd_hour);
        } 
    
        updateTempoTrabalhoAtiv(this_); 
        checkThisAtivRequiredFields(this_);
        if ( data.type == 'dias' ) { checkDatasTrabalho(dataFim) } else { checkDatasTrabalho(_this) }
        // console.log(data.type, dataFim, _this);
        checkTempoProdutividade(_this);
    if (config_unidade.count_dias_uteis && config_unidade.count_horas && (data.key == 'data_distribuicao' || data.key == 'prazo_entrega')) {
        checkTempoUtilTrabalho(dataFim);
        checkTempoUtilTrabalho(dataInicio);
    }
    if (autotime) { 
        diasWork.data('autotime','auto') 
    } else { 
        diasWork.data('autotime',false);
    }
    if ($('.modoDistribuicao_recorrente:visible').length > 0) {
        var updateAtiv = _parent.find('#ativ_id_atividade');
        if (typeof updateAtiv.data('update_recorrencia') === 'undefined' || updateAtiv.data('update_recorrencia') == false) {
            calculoRecorrenciaAtiv(this_);
        }
    }
    prepareFieldsReplace(this_);
    getLabelTempoDespendido();
    // console.log({this: this_, config_unidade: config_unidade, dataInicio: dataInicio.val(), dtStart: dtStart, diasWork: diasWork, dataFim: dataFim.val(), nrDias_Contagem: nrDias_Contagem, dtEnd_Contagem: dtEnd_Contagem, dtEnd_hour: dtEnd_hour});
}
function checkTempoProdutividade(_this) {
    var _parent = _this.closest('.atividadeWork');
    var value = jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+_parent.data('demanda')+"`] | [0]");
    if (value && value !== null) {
        var html = getInfoAtividadeProdutividade(value, true);
        _parent.find('#ativ_produtividade').html(html);
    }
}
function checkDatasTrabalho(_this) {
    var _parent = _this.closest('.atividadeWork');
    var config_unidade = getBoxConfigDadosUnidade(_parent);
    var dataInicio = _parent.find('input[data-type="inicio"]');
    var labelInicio = dataInicio.data('name');
    var dataFim = _parent.find('input[data-type="fim"]');
    var dataWork = _parent.find('input[data-type="dias"]');
    var labelFim = dataFim.data('name');
    var element = _this[0];
        
    if ( moment(dataFim.val(), config_unidade.hora_format) < moment(dataInicio.val(), config_unidade.hora_format) ) { 
        element.setCustomValidity('*'); 
        if (dataWork.length > 0) { dataWork.data('autotime',false); }
    } else { 
        element.setCustomValidity(''); 
    }
    var userValidation = element.checkValidity();
    
    if (userValidation) {
        _this.removeClass('requiredNull').closest('tr').removeClass('requiredNull');
    } else {
        _this.addClass('requiredNull');
        element.setCustomValidity('A '+labelFim+' deve ser maior ou igual que a '+labelInicio);
        var isValid = element.reportValidity();
    }
}
function checkTempoUtilTrabalho(_this) {
    var _parent = _this.closest('.atividadeWork');
    var config_unidade = getBoxConfigDadosUnidade(_parent);
    var element = _this[0];
    var _this_moment = moment(_this.val(), config_unidade.hora_format);
    var h_utilInicio = moment(_this_moment.format('YYYY-MM-DD')+'T'+config_unidade.h_util_inicio, config_unidade.hora_format);
    var h_utilFim = moment(_this_moment.format('YYYY-MM-DD')+'T'+config_unidade.h_util_fim, config_unidade.hora_format);
        
    if ( _this_moment < h_utilInicio || _this_moment > h_utilFim ) { 
        element.setCustomValidity('*'); 
    } else { 
        element.setCustomValidity(''); 
    }
    var userValidation = element.checkValidity();

    if (userValidation) {
        _this.removeClass('requiredNull');
    } else {
        _this.addClass('requiredNull');
        element.setCustomValidity('Selecione um hor\u00E1rio dentro do hor\u00E1rio \u00FAtil de trabalho ('+config_unidade.h_util_inicio+' \u00E0s '+config_unidade.h_util_fim+')');
        var isValid = element.reportValidity();
    }
}
function getTagTempoDecorridoAtiv(value, float_right = true) {
    var tempoDecorrido = getTempoDecorridoAtiv(value);
    var htmlTagTempo = '';
    var textTooltip_pause = (typeof value.pausa_lista !== 'undefined' && value.pausa_lista !== null && value.pausa_lista.length > 0) 
            ? $.map(value.pausa_lista, function(v, i){ 
                    var data_inicio = moment(v.data_inicio,'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm');
                    var data_fim = (v.data_fim == '0000-00-00 00:00:00') ? 'agora' : moment(v.data_fim,'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm');
                    return '('+(i+1)+') '+data_inicio+' \u00E0 '+data_fim
                }).join('<br>')
            : false;
        textTooltip_pause = (textTooltip_pause) ? '<br> -- Paralisa\u00E7\u00F5es<br>'+textTooltip_pause : '';

    var textTooltip = 'Iniciada em: '+moment(value.data_inicio,'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY [\u00E0s] HH:mm');
        htmlTagTempo =  '<span style="'+(float_right ? 'float: right;' : '')+'margin: 0;'+(value.tempo_pactuado != 0 && tempoDecorrido > value.tempo_pactuado ? 'background-color: #f9e2e0;' : '')+'" class="dateboxDisplay">'+
                        '   <span class="dateBoxIcon" onmouseout="return infraTooltipOcultar();" onmouseover="return infraTooltipMostrar(\''+textTooltip+textTooltip_pause+'\')">'+
                        '       <i class="fas fa-stopwatch '+(value.tempo_pactuado != 0 && tempoDecorrido > value.tempo_pactuado ? 'vermelhoColor' : 'azulColor')+'" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                        '   </span>'+
                        '   '+decimalHourToMinute(tempoDecorrido)+' '+(tempoDecorrido > 1 ? 'horas decorridas': 'hora decorrida')+
                        '</span>';
    var checkConfigAtiv = jmespath.search(arrayConfigAtividades.atividades, "[?id_atividade==`"+value.id_atividade+"`] | [0].config.desativa_produtividade");
    return (checkConfigAtiv) ? '' : htmlTagTempo;
}
function getTagTempoPactuadoAtiv(value) {
    var tagText = removeAcentos(value.apelido).replace(/\ /g, '').toLowerCase();
    var tempoPactuado = (value.tempo_pactuado == 0) ? 'N\u00E3o pactuado' : decimalHourToMinute(value.tempo_pactuado)+' '+(value.tempo_pactuado > 1 ? 'horas' : 'hora');
    var htmlTagTempo =  '<span class="info_tags_follow info_tags_pacto">'+
                        '   <span data-colortag="#bfd5e8" style="background-color: #eef4f9;font-size: 10pt;color: #666;" class="tag_text tagTableText_'+tagText+'" title="'+value.tempo_pactuado+' '+(value.tempo_pactuado > 1 ? 'horas' : 'hora')+'">'+
                        '       <i data-colortag="#7d99af" class="fas fa-handshake" style="font-size: 90%; margin: 0px 2px; color: #7d99af;"></i>'+
                        '       '+tempoPactuado+
                        '   </span>'+
                        '</span>';
    return htmlTagTempo;
}
function getTagTempoDespendidoAtiv(value, float_right = true) {

    var textTooltip_pause = (typeof value.pausa_lista !== 'undefined' && value.pausa_lista !== null && value.pausa_lista.length > 0) 
                            ? $.map(value.pausa_lista, function(v, i){ return '('+(i+1)+') '+moment(v.data_inicio,'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm')+' \u00E0 '+moment(v.data_fim,'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm') }).join('<br>')
                            : false;
                        textTooltip_pause = (textTooltip_pause) ? '<br> -- Paralisa\u00E7\u00F5es<br>'+textTooltip_pause : '';

    var textTooltip =   'Iniciada em: '+moment(value.data_inicio,'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY [\u00E0s] HH:mm')+'<br>'+
                        'Conclu\u00EDda em: '+moment(value.data_entrega,'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY [\u00E0s] HH:mm');
        htmlTagTempo =  '<span style="'+(float_right ? 'float: right;' : '')+'margin: 0;" class="dateboxDisplay">'+
                        '   <span class="dateBoxIcon" onmouseout="return infraTooltipOcultar();" onmouseover="return infraTooltipMostrar(\''+textTooltip+textTooltip_pause+'\')">'+
                        '       <i class="fas fa-stopwatch verdeColor" style="padding-right: 3px; cursor: pointer; font-size: 12pt;"></i>'+
                        '   </span>'+
                        '   '+decimalHourToMinute(value.tempo_despendido)+' '+(value.tempo_despendido > 1 ? 'horas despendidas': 'hora despendida')+
                        '</span>';
    var checkConfigAtiv = jmespath.search(arrayConfigAtividades.atividades, "[?id_atividade==`"+value.id_atividade+"`] | [0].config.desativa_produtividade");
    return (checkConfigAtiv) ? '' : htmlTagTempo;
}
function getTempoDecorridoAtiv(value) {
    var config_unidade = getConfigDadosUnidade(value.sigla_unidade);
    var config_user = (arrayConfigAtividades.perfil.hasOwnProperty('config') && arrayConfigAtividades.perfil.config !== null) ? arrayConfigAtividades.perfil.config : false;
    var h_util_inicio = (config_user && config_user.hasOwnProperty('distribuicao') && config_user.distribuicao.hasOwnProperty('horario_util')) ? config_user.distribuicao.horario_util.inicio : config_unidade.h_util_inicio;
    var h_util_fim = (config_user && config_user.hasOwnProperty('distribuicao') && config_user.distribuicao.hasOwnProperty('horario_util')) ? config_user.distribuicao.horario_util.fim : config_unidade.h_util_fim;
    var carga_horaria = jmespath.search(arrayConfigAtividades.planos,"[?id_user==`"+value.id_user+"`] | [0].carga_horaria");
        carga_horaria = (carga_horaria == null) ? 8 : carga_horaria;
    var config_feriados = (typeof config_unidade.feriados !== 'undefined' && config_unidade.feriados !== null) ? config_unidade.feriados : false;
    var arrayFeriados = (config_unidade.count_dias_uteis && value.data_inicio != '' && value.data_fim != '') 
                        ? jmespath.search(getHolidayBetweenDates(moment(value.data_inicio, 'YYYY-MM-DD HH:mm:ss').format('Y')+'-01-01', moment(value.data_fim, 'YYYY-MM-DD HH:mm:ss').add(1, 'Y').format('Y')+'-01-01', config_feriados), "[*].d_")
                        : [];
    var valueDias = (config_unidade.count_dias_uteis) 
                ? moment().isoWeekdayCalc({  
                    rangeStart: value.data_inicio,  
                    rangeEnd: moment().format('YYYY-MM-DD'),  
                    weekdays: [1,2,3,4,5],  
                    exclusions: arrayFeriados
                })-1
                : moment(value.data_fim, 'YYYY-MM-DD HH:mm:ss').diff(moment(value.data_inicio, 'YYYY-MM-DD HH:mm:ss'), 'days');
        valueDias = (valueDias < 0) ? 0 : valueDias;
    var h_dataInicio = moment(value.data_inicio, 'YYYY-MM-DD HH:mm:ss');
    var h_dataFim = moment();
    var h_utilInicio = moment(h_dataFim.format('YYYY-MM-DD')+'T'+h_util_inicio, 'YYYY-MM-DDTHH:mm');
    var h_utilFim = moment(h_dataInicio.format('YYYY-MM-DD')+'T'+h_util_fim, 'YYYY-MM-DDTHH:mm');

    var param = {
        id_pausa: 0,
        id_demanda: value.id_demanda,
        count_dias_uteis: config_unidade.count_dias_uteis,
        count_horas: config_unidade.count_horas,
        h_dataInicio: h_dataInicio,
        h_dataFim: moment(),
        h_utilInicio: h_utilInicio,
        h_utilFim: h_utilFim,
        carga_horaria: carga_horaria,
        valueDias: valueDias
    };
    var tempoTrabalho = getTempoTrabalhoAtiv(param);
    // console.log('getTempoDecorridoAtiv',param, tempoTrabalho);
    
    if (typeof value.pausa_lista !== 'undefined' && value.pausa_lista !== null && value.pausa_lista.length > 0) {
        var arrayPausas = [];
        var totalPausas = 0;

        $.each(value.pausa_lista, function(index, v){
            var v_data_fim = (v.data_fim == '0000-00-00 00:00:00') ? moment().format('YYYY-MM-DD HH:mm:ss') : v.data_fim;
            var valueDias_p = (config_unidade.count_dias_uteis) 
                        ? moment().isoWeekdayCalc({  
                            rangeStart: v.data_inicio,  
                            rangeEnd: v_data_fim,  
                            weekdays: [1,2,3,4,5],  
                            exclusions: arrayFeriados
                        })-1
                        : moment(value.data_fim, 'YYYY-MM-DD HH:mm:ss').diff(moment(value.data_inicio, 'YYYY-MM-DD HH:mm:ss'), 'days');
            var h_dataInicio_p = moment(v.data_inicio, 'YYYY-MM-DD HH:mm:ss');
            var h_dataFim_p = moment(v_data_fim, 'YYYY-MM-DD HH:mm:ss');
            var h_utilInicio_p = moment(h_dataFim_p.format('YYYY-MM-DD')+'T'+config_unidade.h_util_inicio, 'YYYY-MM-DDTHH:mm');
            var h_utilFim_p = moment(h_dataInicio_p.format('YYYY-MM-DD')+'T'+config_unidade.h_util_fim, 'YYYY-MM-DDTHH:mm');

            var param_p = {
                id_pausa: parseInt(v.id_pausa),
                id_demanda: value.id_demanda,
                count_dias_uteis: config_unidade.count_dias_uteis,
                count_horas: config_unidade.count_horas,
                h_dataInicio: h_dataInicio_p,
                h_dataFim: h_dataFim_p,
                h_utilInicio: h_utilInicio_p,
                h_utilFim: h_utilFim_p,
                carga_horaria: carga_horaria,
                valueDias: valueDias_p
            };
            var tempoTrabalho_p = getTempoTrabalhoAtiv(param_p);
                arrayPausas.push({param: param_p, tempo_trabalho: tempoTrabalho_p});
                totalPausas = totalPausas+tempoTrabalho_p;
        });
        // console.log({value: value, pausa_lista: value.pausa_lista, tempoTrabalho_param: param, tempoTrabalho: tempoTrabalho, totalPausas: totalPausas, arrayPausas: arrayPausas});
        tempoTrabalho = (totalPausas > 0) ? tempoTrabalho-totalPausas : tempoTrabalho;
        tempoTrabalho = (tempoTrabalho < 1) ? tempoTrabalho.toFixed(3) : tempoTrabalho.toFixed(1);
        tempoTrabalho = parseFloat(tempoTrabalho);
    }
    return tempoTrabalho;
}
function updateTempoTrabalhoAtiv(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.atividadeWork');
    var user = _parent.find('#ativ_id_user');
    var dias = _parent.find('input[data-type="dias"]');
    var tempo = _parent.find('input[data-type="tempo"]');
    var inicio = _parent.find('input[data-type="inicio"]');
    var fim = _parent.find('input[data-type="fim"]');
    var atividade = _parent.find('#ativ_id_atividade');
    var config_atividade = (typeof atividade.data('config') !== 'undefined') ? atividade.data('config') : false;

    if (config_atividade && typeof config_atividade.desativa_produtividade !== 'undefined' && config_atividade.hasOwnProperty('desativa_produtividade') && config_atividade.desativa_produtividade) {
        var ativ_tempo_pactuado = config_atividade.tempo_pactuado;
        tempo.val(ativ_tempo_pactuado).data('tempo-decimal',ativ_tempo_pactuado).data('tempo-geral',ativ_tempo_pactuado);
    } else {
        var config_user = (user.is('select')) ? user.find('option:selected').data('config') : user.data('config');
            config_user = (typeof config_user !== 'undefined') ? config_user : {carga_horaria: 8};
        var config_unidade = getBoxConfigDadosUnidade(_parent);

        var config_user_perfil = (arrayConfigAtividades.perfil.hasOwnProperty('config') && arrayConfigAtividades.perfil.config !== null) ? arrayConfigAtividades.perfil.config : false;
        var h_util_inicio = (config_user_perfil && config_user_perfil.hasOwnProperty('distribuicao') && config_user_perfil.distribuicao.hasOwnProperty('horario_util')) ? config_user_perfil.distribuicao.horario_util.inicio : config_unidade.h_util_inicio;
        var h_util_fim = (config_user_perfil && config_user_perfil.hasOwnProperty('distribuicao') && config_user_perfil.distribuicao.hasOwnProperty('horario_util')) ? config_user_perfil.distribuicao.horario_util.fim : config_unidade.h_util_fim;


        var tempo_pausado = _parent.find('#ativ_tempo_pausado');
            tempo_pausado = (tempo_pausado.is(':visible') && tempo_pausado.val() > 0) ? tempo_pausado.val() : 0;
        var valueDias = dias.val();
        var h_dataInicio = moment(inicio.val(), config_unidade.hora_format);
        var h_dataFim = moment(fim.val(), config_unidade.hora_format);
        var h_utilInicio = moment(h_dataFim.format('YYYY-MM-DD')+'T'+h_util_inicio, config_unidade.hora_format);
        var h_utilFim = moment(h_dataInicio.format('YYYY-MM-DD')+'T'+h_util_fim, config_unidade.hora_format);
        if (checkValue(user) && checkValue(dias) && checkValue(inicio) && checkValue(fim)) {
            var param = {
                    count_dias_uteis: config_unidade.count_dias_uteis,
                    count_horas: config_unidade.count_horas,
                    h_dataInicio: h_dataInicio,
                    h_dataFim: h_dataFim,
                    h_utilInicio: h_utilInicio,
                    h_utilFim: h_utilFim,
                    carga_horaria: config_user.carga_horaria,
                    valueDias: valueDias
            };
            var tempo_geral = getTempoTrabalhoAtiv(param);
            var tempo_total = (tempo_geral-tempo_pausado);
                tempo.data('tempo-decimal',tempo_total);
                tempo_total = (tempo_total < 1) ? tempo_total.toFixed(3) : tempo_total.toFixed(1);
                tempo.val(parseFloat(tempo_total));
                if (typeof tempo.data('tempo-geral') === 'undefined') { tempo.data('tempo-geral', tempo_geral) }
                checkDatesAfast(fim.get(0), false);
                // console.log('getTempoTrabalhoAtiv***', param, tempo_geral);
        } else {
            tempo.val('').data('tempo-decimal','0').data('tempo-geral','0');
            // console.log('NULL getTempoTrabalhoAtiv***', config_atividade, checkValue(user), checkValue(dias), checkValue(inicio), checkValue(fim));
        }
    }
}
function getTempoTrabalhoAtiv(param) {
    var tempo = '';
    if (param.count_dias_uteis && param.count_horas) {
        var h_planejada = moment.duration(param.h_dataFim.diff(param.h_dataInicio)).asHours();
        var countHoraInicio = (moment.duration(param.h_utilFim.diff(param.h_dataInicio)).asHours());
            countHoraInicio = (countHoraInicio < 0) ? 0 : countHoraInicio;
            countHoraInicio = (countHoraInicio > param.carga_horaria) ? param.carga_horaria : countHoraInicio;
        var countHoraFim = (moment.duration(param.h_dataFim.diff(param.h_utilInicio)).asHours());
            countHoraFim = (countHoraFim < 0) ? 0 : countHoraFim;
            countHoraFim = (countHoraFim > param.carga_horaria) ? param.carga_horaria : countHoraFim;
        var tempo_total = (countHoraInicio+countHoraFim);
            tempo_total = (param.valueDias > 0) ? tempo_total+(param.carga_horaria*(param.valueDias-1)) : tempo_total;
            tempo_total = (param.valueDias == 0) 
                        ? (countHoraInicio > param.carga_horaria && h_planejada > param.carga_horaria) 
                            ? param.carga_horaria 
                            : (h_planejada < countHoraInicio) ? h_planejada : countHoraInicio
                        : tempo_total;
            tempo_total = (tempo_total < 0) ? 0 : tempo_total;
            // tempo_total = (tempo_total < 1) ? tempo_total.toFixed(3) : tempo_total.toFixed(1);
            /*
            tempo_total = (tempo_total !== null) 
                        ? (tempo_total < 1) ? tempo_total.toFixed(3) : tempo_total.toFixed(1)
                        : tempo_total;
            */
            tempo = (parseFloat(tempo_total));
            // console.log(tempo_total, tempo_total.toFixed(1), parseFloat(tempo_total.toFixed(1)));
            // console.log({param: param, h_planejada: h_planejada, tempo: tempo, tempo_total: tempo_total, countHoraInicio: countHoraInicio, countHoraFim: countHoraFim});

    } else if (!param.count_dias_uteis && param.count_horas) {
        var tempo_total = (moment.duration(param.h_dataFim.diff(param.h_dataInicio)).asHours());
            tempo_total = (tempo_total < 0) ? 0 : tempo_total;
            // tempo_total = (tempo_total < 1) ? tempo_total.toFixed(3) : tempo_total.toFixed(1);
            tempo = parseFloat(tempo_total);
            //  console.log(tempo_total, tempo_total.toFixed(1), parseFloat(tempo_total.toFixed(1)));
    } else {
        tempo = (param.carga_horaria*param.valueDias);
    }
    return tempo;
}
function getOptionSelectPerfil(arraySelectPerfil, selected = false, sigla_display = true) {
    var unidades_super = jmespath.search(arraySelectPerfil,"[?dependencia==`0`]");
    var optionSelectPerfil = '';
    var arrayListEntidades = [];
    if (unidades_super.length > 1) {
        $.each(unidades_super, function(index, v){
            var arrayPerfil = jmespath.search(arraySelectPerfil, "[?dependencia==`"+v.id_unidade+"`]");
                arrayPerfil.unshift(v);
                
            if ($.inArray(v.id_entidade, arrayListEntidades) == -1 ) {
                arrayListEntidades.push(v.id_entidade);
                optionSelectPerfil +=   '<option label="'+v.nome_entidade+' ('+v.sigla_entidade+')" disabled="true"></option>';
            }
            optionSelectPerfil +=   '<optgroup label="'+v.nome_unidade+' ('+v.sigla_unidade+')">'+
                                    '   '+getOptionsSelectPerfilGroup(arraySelectPerfil, arrayPerfil, selected, sigla_display)+
                                    '</optgroup>';
        });
    } else {
        optionSelectPerfil += getOptionsSelectPerfilGroup(arraySelectPerfil, arraySelectPerfil, selected, sigla_display);
    }       
    
    var excludedDependencia = $.map(arraySelectPerfil, function(v){
            var listSelectPerfil = $('<select>'+optionSelectPerfil+'</select>').find('option').map(function(){ return $(this).val() }).get();
            var target = (sigla_display) ? v.sigla_unidade.trim() : v.id_unidade.toString();
            if (listSelectPerfil.length > 0 && $.inArray(target, listSelectPerfil) == -1 ) {
                var selected_ = (selected && selected == target ) ? 'selected' : '';
                return (sigla_display) 
                        ? "<option data-label='"+v.sigla_unidade+"' title='"+v.nome_unidade+" ("+v.sigla_unidade+")' value='"+v.sigla_unidade+"' "+selected_+">"+v.sigla_unidade+"</option>"
                        : "<option data-label='"+v.sigla_unidade+"' value='"+v.id_unidade+"' "+selected_+">"+v.nome_unidade+" ("+v.sigla_unidade+")</option>";
            }
        });
        optionSelectPerfil += (excludedDependencia != '') ? excludedDependencia : '';
        
    return optionSelectPerfil;
}
function getOptionsSelectPerfilGroup(arraySelectPerfil, arrayPerfil, selected = false, sigla_display = true, tab = false, loopOut = 1) {
    if (loopOut > 5) { return false; }
    var optionSelectPerfil = ( arrayPerfil.length > 0 ) ? $.map(arrayPerfil, function(v,k){ 
        var target = (sigla_display) 
                    ? v.sigla_unidade.trim() 
                    : (parseInt(selected) > 0) ? v.id_unidade : v.nome_unidade+' ('+v.sigla_unidade+')';
        var selected_ = (selected && selected == target ) ? 'selected' : '';
        var arrayPerfilSub = jmespath.search(arraySelectPerfil, "[?dependencia==`"+v.id_unidade+"`]");
        var symbolTab = ' \uFEFF \uFEFF \uFEFF \uFEFF ';
        var tabSub = (v.dependencia != 0) ? '\u21AA ' : ''; 
        var _result = (sigla_display) 
                    ? "<option data-id_unidade='"+v.id_unidade+"' data-label='"+v.sigla_unidade+"' title='"+v.nome_unidade+" ("+v.sigla_unidade+")' value='"+v.sigla_unidade+"' "+selected_+">"+(tab ? symbolTab : '')+tabSub+v.sigla_unidade+"</option>"
                    : "<option data-id_unidade='"+v.id_unidade+"' data-label='"+v.sigla_unidade+"' value='"+v.id_unidade+"' "+selected_+">"+(tab ? symbolTab : '')+tabSub+v.nome_unidade+" ("+v.sigla_unidade+")</option>";
        if (arrayPerfilSub !== null && arrayPerfilSub.length > 0 && v.dependencia != 0) {
            _result += getOptionsSelectPerfilGroup(arraySelectPerfil, arrayPerfilSub, selected, sigla_display, true, loopOut+1);
        }
        return _result;
    }).join('') : '';
    return optionSelectPerfil;
}  
function getOptionsSelectAtivGroup(arrayAtiv, value, tab = false) {
    var html =  '';
    if (arrayAtiv && arrayAtiv != 0 && arrayAtiv.length > 0) {
        var uniqList = uniqPro(jmespath.search(arrayAtiv,"[*].macroatividade"));
        $.each(uniqList, function(i, v){
            var ativList = jmespath.search(arrayAtiv,"sort_by([?macroatividade=='"+v+"'],&nome_atividade)");
            html += '<option disabled>'+(tab ? '\u2500 ' : '')+(v == '' || v === null ? 'Macroatividade indefinida' : v)+'</option>'+
                    '   '+getOptionsSelectAtiv(ativList, value, tab);
        });
    }
    return html;
}
function getOptionsSelectAtiv(arrayAtiv, value, tab) {
    var dadosIfrArvore = getIfrArvoreDadosProcesso();
    var tipo_processo = (dadosIfrArvore) ? dadosIfrArvore.tipo : false;
    var optionSelectAtividades = ( arrayAtiv.length > 0 ) 
        ? $.map(arrayAtiv, function(v,k){
            //console.log('desativa_produtividade', typeof v.config.desativa_produtividade, v.config.desativa_produtividade);
            var complexidade = (v.config != null && typeof v.config !== 'undefined' && v.config.hasOwnProperty('complexidade')) ? v.config.complexidade : [];
            var recalcula_prazo = (v.config != null && typeof v.config !== 'undefined' && v.config.hasOwnProperty('recalcula_prazo') && v.config.recalcula_prazo) ? true : false;
            var desativa_produtividade = (v.config != null && typeof v.config !== 'undefined' && v.config.hasOwnProperty('desativa_produtividade') && v.config.desativa_produtividade) ? true : false;
            var modalidades_atividade = (v.config != null && typeof v.config !== 'undefined' && v.config.hasOwnProperty('ganho_unidade') && v.config.hasOwnProperty('modalidades') && v.config.ganho_unidade === false && v.config.modalidades.length > 0) ? v.config.modalidades : false;
            var tempo_pactuado_display = (complexidade.length > 0) ? jmespath.search(complexidade, "[?default==`true`].fator | [0]") : null;
                tempo_pactuado_display = (tempo_pactuado_display !== null) ? tempo_pactuado_display*v.tempo_pactuado : v.tempo_pactuado;
            var tempo_pactuado_display_ = parseFloat(tempo_pactuado_display.toFixed(2));
            var selected = ( value && v.id_atividade == value.id_atividade ) ? 'selected' : '';
            var config = {
                            sigla_unidade: v.sigla_unidade, 
                            id_unidade: v.id_unidade, 
                            dias_planejado: v.dias_planejado, 
                            tempo_pactuado: v.tempo_pactuado, 
                            complexidade: complexidade, 
                            recalcula_prazo: recalcula_prazo,
                            desativa_produtividade: desativa_produtividade,
                            modalidades_atividade: modalidades_atividade,
                            homologado: v.homologado,
                            etiqueta: (v.config != null && typeof v.config.etiquetas !== 'undefined' ? $.map(v.config.etiquetas,function(v){ return v[0] }) : []),
                            checklist: (v.config != null && typeof v.config.checklist !== 'undefined' ? $.map(v.config.checklist,function(v){ return v[0] }) : []),
                            tipo_processo: (v.config != null && typeof v.config.tipo_processo !== 'undefined' ? $.map(v.config.tipo_processo,function(v){ return v[0] }) : [])
                        };
            var icon = (tipo_processo && typeof config.tipo_processo !== 'undefined' && config.tipo_processo !== null && config.tipo_processo.length > 0 && $.inArray(tipo_processo, config.tipo_processo) !== -1 )
                ? '\u25AA\uFE0F ' : '\u25AB\uFE0F ';
                icon = (dadosIfrArvore) ? icon : '';
            return "<option value='"+v.id_atividade+"' "+selected+" data-config='"+JSON.stringify(config)+"'>"+(tab ? '&#160;&#160;&#160;&#160;' : '')+icon+v.nome_atividade+" ["+(tempo_pactuado_display_)+" "+(tempo_pactuado_display > 1 ? 'horas' : 'hora')+"]</option>";
        }).join('') : '';
    return optionSelectAtividades;
}
function getOptionsSelectResp(arrayResp, value) {
    var optionSelectResponsavel = ( arrayResp.length > 0 ) ? $.map(arrayResp, function(v,k){ 
        var selected = ( value && v.id_user == value.id_user ) ? 'selected' : '';
        var disabled = (checkCapacidade('select_user_atividade') || arrayConfigAtividades.perfil.id_user == v.id_user) ? '' : 'disabled';
        var config = {
            id_plano: v.id_plano, 
            sigla_unidade: v.sigla_unidade, 
            id_unidade: v.id_unidade, 
            nome_modalidade: v.nome_modalidade, 
            id_tipo_modalidade: v.id_tipo_modalidade, 
            carga_horaria: v.carga_horaria, 
            lista_integral: (v.config !== null && v.config.hasOwnProperty('atividades_lista_integral') && v.config.atividades_lista_integral !== null && v.config.atividades_lista_integral == false ? false : true)
        };
        return "<option value='"+v.id_user+"' "+selected+" data-config='"+JSON.stringify(config)+"' "+disabled+">"+v.apelido+"</option>";
    }).join('') : '';    
    return optionSelectResponsavel;
}
function changeAtivSelect(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.atividadeWork');
    var config = _this.find('option:selected').data('config');
    var inputRecalcPrazo =  _parent.find('#ativ_recalcula_prazo');
    var selectUser = _parent.find('#ativ_id_user');
    var inputUnidade = _parent.find('#ativ_id_unidade');
    var optionSelectComplexidade = ( config && config.complexidade.length > 0 ) 
            ? $.map(config.complexidade, function(v,k){ 
                var selected = (v.default === true) ? 'selected' : '';
                // console.log(v.default, selected, v.fator, v.default === 'true');
                var tempo_pactuado_fator = (typeof config.tempo_pactuado !== 'undefined' && typeof v.fator !== 'undefined' && config.tempo_pactuado > 0 && v.fator > 0) ? (config.tempo_pactuado * v.fator) : false;
                var tempo_pactuado_fator_display = (tempo_pactuado_fator) 
                                                ? (tempo_pactuado_fator < 1) ? parseFloat(tempo_pactuado_fator.toFixed(3)) : parseFloat(tempo_pactuado_fator.toFixed(1))
                                                : false;
                    tempo_pactuado_fator_display = (tempo_pactuado_fator_display) ? " ["+tempo_pactuado_fator_display+" "+(tempo_pactuado_fator > 1 ? 'horas' : 'hora')+"]" : '';
                return "<option value='"+v.fator+"' "+selected+">"+v.complexidade+tempo_pactuado_fator_display+"</option>";
            }).join('') : '<option>&nbsp;</option>';
    _parent.find('#ativ_fator_complexidade').html(optionSelectComplexidade);
    if (selectUser.val() == '') {
        inputUnidade.val(config ? config.id_unidade : '');
    } else {
        var config_user = selectUser.find('option:selected').data('config');
        inputUnidade.val(config_user ? config_user.id_unidade : '');
    }

    updateAtivTempoPactuado(this_);
    if (_parent.find('#ativ_id_user').find('optgroup').length > 0) {
        disableOptGroupUser(this_);
    }

    if (typeof config !== 'undefined' && typeof config.recalcula_prazo !== 'undefined' && config.recalcula_prazo && !inputRecalcPrazo.is(':checked') && inputRecalcPrazo.data('mode-insert') == 'auto') {
        _parent.find('#ativ_recalcula_prazo').trigger('click');
    } else if (typeof config !== 'undefined' && typeof config.recalcula_prazo !== 'undefined' && config.recalcula_prazo == false && inputRecalcPrazo.is(':checked') && inputRecalcPrazo.data('mode-insert') == 'auto') {
        _parent.find('#ativ_recalcula_prazo').trigger('click');
    }
    
    // updateTempoPlanejado(this_, config);
    updateDateTimeDistribuicao(this_);
    updateAtivSelectEtiquetas(this_);
    updateAtivSelectChecklist(this_);
    checkThisAtivRequiredFields(this_);
    checkThisAtivRequiredFields(_parent.find('#ativ_fator_complexidade')[0]);
    checkUserListInAtividade(this_);
    initChosenReplace('box_refresh', this_);
}
function updateTempoPlanejado(this_, config) {
    var _this = $(this_);
    var _parent = _this.closest('.atividadeWork');
    var diasPlanejado = _parent.find('#ativ_dias_planejado');
    var complexidade = _parent.find('#ativ_fator_complexidade');
    if (typeof config !== 'undefined' && (parseFloat(diasPlanejado.val()) == 0 || diasPlanejado.val() == '' || diasPlanejado.data('autotime') == 'auto')) {
        diasPlanejado.val(config.dias_planejado*complexidade.val()).data('autotime','auto');
        changeDadosTrabalho(diasPlanejado[0], true);
    }
}
function checkMoreInfoBoxAtiv(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.atividadeWork');
    var _moreInfo = _parent.find('.moreInfoBox');
    var _moreInfoLink = _parent.find('.moreInfoBoxAtiv');
    if (!_moreInfo.is(':visible')) {
        _moreInfoLink.trigger('click');
    }
}
function updateAtivSelectChecklist(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.atividadeWork');
    var config = _parent.find('#ativ_id_atividade').find('option:selected').data('config');
    var ativ_checklist = _parent.find('#ativ_checklist');
    var ativ_insert_checklist = _parent.find('#ativ_insert_checklist');
    var table = $('#ativBox_checklist');
    var checklist = (config && config.checklist !== null && config.checklist.length > 0) ? config.checklist : [];
    if (ativ_insert_checklist.is(':checked') && table.data('mode-insert') == 'auto') {
        ativ_insert_checklist.trigger('click');
        checkMoreInfoBoxAtiv(this_);
    }
    if (checklist.length > 0 && table.data('mode-insert') == 'auto') {
        ativ_checklist.val(JSON.stringify(checklist));
        ativ_insert_checklist.trigger('click');
        checkMoreInfoBoxAtiv(this_);
        setTimeout(function(){ 
            table.data('mode-insert','auto');
        }, 1000);
    }
}
function updateAtivSelectEtiquetas(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.atividadeWork');
    var config = _parent.find('#ativ_id_atividade').find('option:selected').data('config');
    var id_demanda = parseInt(_parent.find('#ativ_id_demanda').val());
    var etiqueta = (config && config.etiqueta !== null && config.etiqueta.length > 0) ? config.etiqueta.join(';') : '';
    if (id_demanda == 0) {
        _parent.find('input[data-key="etiquetas"]').importTags(etiqueta);
        checkMoreInfoBoxAtiv(this_);
    }
}
function updateDateTimeDistribuicao(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.atividadeWork');
	var unidade = (checkValue(_this)) ? _this.find('option:selected').data('config').sigla_unidade : arrayConfigAtivUnidade.sigla_unidade;
    var config_unidade = getBoxConfigDadosUnidade(_parent);
    var dtDistribuicao = _parent.find('#ativ_data_distribuicao');
    if (dtDistribuicao.length > 0) {
        var dtDistribuicao_format = (dtDistribuicao.val().indexOf('T') !== -1) ? 'YYYY-MM-DDTHH:mm' : 'YYYY-MM-DD';
        var dtDistribuicao_val = (dtDistribuicao.val() == '') ? '' : moment(dtDistribuicao.val(), dtDistribuicao_format).format(config_unidade.hora_format);
        var dtVencimento = _parent.find('#ativ_prazo_entrega');
        var dtVencimento_format = (dtVencimento.val().indexOf('T') !== -1) ? 'YYYY-MM-DDTHH:mm' : 'YYYY-MM-DD';
        var dtVencimento_val = (dtVencimento.val() == '') ? '' : moment(dtVencimento.val(), dtVencimento_format).format(config_unidade.hora_format);
        if (config_unidade.count_horas) {
            dtDistribuicao.attr('type', 'datetime-local').val(dtDistribuicao_val);
            dtVencimento.attr('type', 'datetime-local').val(dtVencimento_val);
        } else {
            dtDistribuicao.attr('type', 'date').val(dtDistribuicao_val);
            dtVencimento.attr('type', 'date').val(dtVencimento_val);
        }
        var labelDiasPlan = 'Dias '+(config_unidade.count_dias_uteis ? '\u00FAteis' : '')+' de Planejamento';
        _parent.find('#ativ_dias_planejado_label').text(labelDiasPlan);
    }
}
function updateAtivSelectUser(this_) {
    updateAtivTempoPactuado(this_); 
    disableOptGroupAtiv(this_); 
    updateTempoTrabalhoAtiv(this_);
    checkUserListInAtividade(this_);
    initChosenReplace('box_reload', this_);
}
function disableOptGroupAtiv(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.atividadeWork');
    var config = _this.find('option:selected').data('config');
    var unidade_super = jmespath.search(arrayConfigAtividades.atividades, "[?id_unidade==`"+arrayConfigAtivUnidade.dependencia+"`].sigla_unidade | [0]");
        unidade_super = (unidade_super && unidade_super !== null) ? unidade_super : arrayConfigAtivUnidade.sigla_unidade; 
        _parent.find('#ativ_id_atividade').find('optgroup').each(function(){
            if (config && $(this).attr('label') != config.sigla_unidade && $(this).attr('label') != unidade_super) {
                $(this).prop('disabled', true);
            } else {
                $(this).prop('disabled', false);
            }
        });
}
function disableOptGroupUser(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.atividadeWork');
    var config = _this.find('option:selected').data('config');
    var id_unidade = (typeof config !== 'undefined' && typeof config.id_unidade !== 'undefined') ? config.id_unidade : false;
    var dependencia = (id_unidade) ? jmespath.search(arrayConfigAtividades.unidades, "[?id_unidade==`"+config.id_unidade+"`] | [0].dependencia") : false;
    var checkDependencia = (id_unidade) ? jmespath.search(arrayConfigAtividades.unidades, "[?id_unidade==`"+dependencia+"`]") : null;
    var checkSubordinacao = (id_unidade) ? jmespath.search(arrayConfigAtividades.unidades, "[?dependencia==`"+id_unidade+"`]") : null;

    _parent.find('#ativ_id_user').find('optgroup').each(function(){
        if (config && $(this).attr('label') != config.sigla_unidade && (checkSubordinacao !== null && ($.inArray($(this).attr('label'), jmespath.search(checkSubordinacao,"[*].sigla_unidade")) == -1)) && (checkDependencia === null || checkDependencia.length != 0)) {
            $(this).prop('disabled', true);
        } else {
            $(this).prop('disabled', false);
        }
    });
}
function checkUserListInAtividade(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.atividadeWork');
    var select_user = _parent.find('#ativ_id_user');
    var select_ativ = _parent.find('#ativ_id_atividade');
    var data_ativ = select_ativ.find('option:selected').data('config');
    var is_disabled = false;
    var is_lista_atividade = false;
    var is_homologado = false;
    var nome_modalidade = '';

        select_user.find('option').prop('disabled', false);
        select_user.find('option').each(function(){
            var config = $(this).data('config');
            var id_user = select_user.val();
            var id_atividade = select_ativ.val();
            var plano = jmespath.search(arrayConfigAtividades.planos, "[?id_user==`"+id_user+"`] | [0]");
            var modalidade = (plano && plano !== null) ? jmespath.search(arrayConfigAtividades.tipos_modalidades,"[?id_tipo_modalidade==`"+plano.id_tipo_modalidade+"`] | [0]") : null;
            var atividades_homologadas = (modalidade && modalidade !== null && modalidade.hasOwnProperty('config') && modalidade.config !== null && modalidade.config.hasOwnProperty('atividades_homologadas') && modalidade.config.atividades_homologadas !== null && modalidade.config.atividades_homologadas == true ) ? true : false;

            if ((config && config.lista_integral === false) || atividades_homologadas) {
                var check_lista_atividades =    (plano && plano !== null  && plano.config !== null && 
                                                plano.config.hasOwnProperty('lista_atividades') && plano.config.lista_atividades !== null && plano.config.lista_atividades.length > 0 &&
                                                select_ativ.length > 0 && $.inArray(id_atividade.toString(), plano.config.lista_atividades) === -1 
                                                ) ? true: false;
                if ((check_lista_atividades && id_atividade != '') || (atividades_homologadas && typeof data_ativ !== 'undefined' && data_ativ.hasOwnProperty('homologado') && !data_ativ.homologado)) {
                    $(this).prop('disabled', true);
                    is_disabled = true;
                    is_lista_atividade = (check_lista_atividades) ? true : false;
                    is_homologado = (atividades_homologadas && typeof data_ativ !== 'undefined' && data_ativ.hasOwnProperty('homologado') && !data_ativ.homologado) ? true : false;
                    nome_modalidade = plano.nome_modalidade;
                } else {
                    $(this).prop('disabled', false);
                }

                //console.log({id_user: id_user, id_atividade: id_atividade, check_lista_atividades: check_lista_atividades, plano: plano, modalidade: modalidade, atividades_homologadas: atividades_homologadas, homologado: data_ativ.homologado});
            }
        });
        setTimeout(function(){ 
            if (select_user.find('option:selected').is(':disabled') && checkValue(select_user)) {
                var text_is_lista_atividade = (is_lista_atividade) ? '<br><br>- Somente '+__.atividades+' '+getNameGenre('atividade', 'espec\u00EDficos', 'espec\u00EDficas')+' do plano de trabalho do usu\u00E1rio s\u00E3o '+getNameGenre('atividade', 'permitidos', 'permitidas')+' para distribui\u00E7\u00E3o' : '';
                var text_is_homologado = (is_homologado) ? '<br><br>- Somente '+__.atividades+' '+getNameGenre('atividade', 'homologados', 'homologadas')+' s\u00E3o '+getNameGenre('atividade', 'permitidos', 'permitidas')+' para o tipo de modalidade de plano de trabalho do usu\u00E1rio ('+nome_modalidade+')' : '';
                var htmlAlert = '<span class="alertChartUser" style="background: #f9efad;font-size: 9pt;padding: 5px;border-radius: 5px;display: flex;color: #666;">'+
                                '<i class="fas fa-exclamation-triangle vermelhoColor" style="margin: 0 5px;"></i>'+
                                '   '+__.Atividade+' n\u00E3o dispon\u00EDvel para o usu\u00E1rio selecionado ('+select_user.find('option:selected').text().trim()+')'+
                                '   '+text_is_lista_atividade+text_is_homologado+
                                '</span>';

                select_user.val('').trigger('change');
                _parent.find('#chartUser').html(htmlAlert);
                _parent.find('#ativ_tempo_pactuado').val('');
            }
        }, 100);
}
function updateAtivTempoPactuado(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.atividadeWork');
    var ativ = _parent.find('#ativ_id_atividade');
    var inputUnidade = _parent.find('#ativ_id_unidade');
    var ativ_config = ativ.find('option:selected').data('config');
    var user = _parent.find('#ativ_id_user');
    var user_config = user.find('option:selected').data('config');
    var complex = _parent.find('#ativ_fator_complexidade');
    var multiplica = _parent.find('#ativ_fator_multiplicacao');
    var recorrencia = (_parent.find('#ativ_recorrencia').length > 0 && $('.modoDistribuicao_recorrente:visible').length > 0 && JSON.parse(_parent.find('#ativ_recorrencia').val()).length > 0) ? JSON.parse(_parent.find('#ativ_recorrencia').val()).length : 1;
    var multiprocesso = (_parent.find('#ativ_id_procedimentos').length > 0 && $('.listMultProcessos:visible').length > 0 && JSON.parse(_parent.find('#ativ_id_procedimentos').val()).length > 0) ? JSON.parse(_parent.find('#ativ_id_procedimentos').val()).length : 1;
    var id_demanda = parseInt(_parent.find('#ativ_id_demanda').val());
    var tempo_pactuado = _parent.find('#ativ_tempo_pactuado');
    var config_unidade = getBoxConfigDadosUnidade(_parent);
    var htmlInfoChart = '';

    if (typeof ativ_config === 'undefined') return false;

    if (!checkValue(user)) {
        inputUnidade.val(ativ_config ? ativ_config.id_unidade : '');
    } else {
        inputUnidade.val(user_config ? user_config.id_unidade : '');
    }

    if (!checkValue(multiplica)) { multiplica.val(1) }
    if (checkValue(user) && checkValue(complex)) {
        // var tempo = (user_config.tempo_atividade == 'presencial') ? ativ_config.dias_planejado : ativ_config.tempo_pactuado;
        var tempo = ativ_config.tempo_pactuado;
        var fator = parseFloat(complex.val());
        var arrayModalidades = (ativ_config.hasOwnProperty('modalidades_atividade') && ativ_config.modalidades_atividade && ativ_config.modalidades_atividade.length > 0) ? ativ_config.modalidades_atividade : config_unidade.modalidades;
        var modalidade = (typeof user_config !== 'undefined' && user_config.hasOwnProperty('id_tipo_modalidade')) ? jmespath.search(arrayModalidades,"[?id_tipo_modalidade=='"+user_config.id_tipo_modalidade+"'] | [0]") : null;
        var ganho = (modalidade && modalidade !== null && modalidade.hasOwnProperty('fator')) ? parseFloat(modalidade.fator) : 1;
        var ganho_label = (ganho != 1) ? ' (Ganho: '+ganho+')' : '';
        var tipo_modalidade = (modalidade && modalidade !== null && modalidade.hasOwnProperty('tipo_modalidade')) ? modalidade.tipo_modalidade : false;
            // console.log(user_config, user_config.id_tipo_modalidade, config_unidade, ganho);
        var fator_multiplica = (typeof multiplica !== 'undefined' && multiplica.length > 0 && checkValue(multiplica)) ? parseInt(multiplica.val()) : 1;
        // console.log(tempo, fator, ganho, fator_multiplica, multiplica, recorrencia, multiprocesso);
        var tempo_user = parseFloat((tempo*fator*ganho*fator_multiplica*recorrencia*multiprocesso).toFixed(1));
            htmlInfoChart = (tipo_modalidade) 
                            ? '<span style="color: #777;float: right;font-size: 9pt;margin-top: 10px;"><i class="fas fa-info-circle laranjaColor" style="float: initial;font-size: 10pt;"></i> Modalidade: '+tipo_modalidade+ganho_label+'</span>'
                            : '';
        // console.log((tempo*fator*fator_multiplica).toFixed(), (tempo*fator*fator_multiplica), (tempo*fator*fator_multiplica).toFixed(1));
        tempo_pactuado.data('tempo-pactuado', tempo*fator*ganho).val(tempo_user);
    }
    if (!checkValue(user) && !checkValue(complex)) { 
        tempo_pactuado.data('tempo-pactuado', 0).val('');
        if (_parent.find('#chartTempoPlano').length > 0) { new Chart(_parent.find('#chartTempoPlano')).destroy() }
        _parent.find('#chartUser').html('');
    }
    if (checkValue(user) && checkValue(complex)) { 
        var plano = jmespath.search(arrayConfigAtividades.planos, "[?id_user==`"+user.val()+"`].{tempo_despendido: tempo_despendido, tempo_homologado: tempo_homologado, tempo_pactuado: tempo_pactuado, tempo_total: tempo_total, tempo_proporcional: tempo_proporcional} | [0]");
            plano.tempo_pactuado = (id_demanda == 0) ? plano.tempo_pactuado : plano.tempo_pactuado-parseFloat(tempo_pactuado.data('tempo-pactuado'));
        if (typeof tempo_user !== 'undefined') { plano.tempo_projetado = plano.tempo_pactuado+parseFloat(tempo_user) }
        _parent.find('#chartUser').html('<canvas id="chartTempoPlano" width="380" height="85"></canvas>'+htmlInfoChart);
        getSingleChartTempoPlano(_parent.find('#chartTempoPlano'), plano);
    }
    checkThisAtivRequiredFields(this_);
    getListAtivPrioridades(this_, user.val(), id_demanda);
    updateTempoPlanejado(this_, ativ_config);
    
    if ($('.modoDistribuicao_recorrente:visible').length > 0) {
        var updateAtiv = _parent.find('#ativ_id_atividade');
        if (typeof updateAtiv.data('update_recorrencia') === 'undefined' || updateAtiv.data('update_recorrencia') == false) {
            calculoRecorrenciaAtiv(this_);
        }
    }
}
function getListAtivVinculacao() {
        var value = jmespath.search(arrayAtividadesPro, "sort_by([?data_inicio=='0000-00-00 00:00:00'], &prioridade)");
        htmlSelect = (value && value !== null) 
                        ? $.map(value, function(v, i){ return '<option value="'+v.id_demanda+'" title="'+getTitleDialogBox(v, true)+'">'+getTitleDialogBox(v)+'</option>' }).join('')
                        : '<option value="0">'+getNameGenre('demanda', 'Nenhum', 'Nenhuma')+' '+__.demanda+' n\u00E3o '+getNameGenre('demanda', 'iniciado', 'iniciada')+' dispon\u00EDvel...</option>';
        return htmlSelect;
}
function getListAtivPrioridades(this_, id_user, id_demanda) {
    var _this = $(this_);
    var _parent = _this.closest('.atividadeWork');
    var htmlSelect = '<option value="0">&nbsp;</option>';
        _parent.find('#trAtivPrioridade').hide();
    if (id_user != '' && id_user != 0) {
        var value = jmespath.search(arrayAtividadesPro, "sort_by([?data_inicio=='0000-00-00 00:00:00'] | [?id_demanda!=`"+id_demanda+"`] | [?id_user==`"+id_user+"`], &prioridade)");
        htmlSelect = (value && value !== null) 
                        ? $.map(value, function(v, i){ return '<option value="'+v.prioridade+'" data-index="'+i+'" data-demanda="'+v.id_demanda+'" title="'+getTitleDialogBox(v, true)+'">Antes de: '+getTitleDialogBox(v)+'</option>' }).join('')
                        : '<option value="0">'+getNameGenre('demanda', 'Nenhum', 'Nenhuma')+' '+__.demanda+' n\u00E3o '+getNameGenre('demanda', 'iniciado', 'iniciada')+' dispon\u00EDvel...</option>';
        _parent.find('#trAtivPrioridade').show();
        if (value.length == 0 && _parent.find('#ativ_prioridades').is(':checked')) {
            _parent.find('#ativ_prioridades').trigger('click');
        }
    }
    _parent.find('#ativ_lista_prioridades').html(htmlSelect);
}

// BOX DE AVALIACAO
function rateAtividade(id_demanda = 0, alertAtividade = false) {
    var value = jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+id_demanda+"`] | [0]");

    if (value.id_atividade == 0 || value.tempo_pactuado == 0 || value.fator_complexidade == 0) {
        variationAtividade(id_demanda, true);
    } else {
        var documento = (typeof value.documento_sei !== 'undefined' && value.documento_sei !== null && parseInt(value.documento_sei) != 0) ? value.nome_documento+' ('+value.documento_sei+')' : value.nome_documento;
        var linkDocumento = (value.processo_sei !== null && value.processo_sei != '') ? url_host+'?acao=procedimento_trabalhar&id_procedimento='+value.id_procedimento+'&id_documento='+value.id_documento_entregue : 'javascript:return false';
        var obs_tecnica = (value.observacao_tecnica !== null && value.observacao_tecnica != '') 
                        ? '<div class="fa-border" style="padding: 10px; margin: 15px; font-style: italic; color: #505050;"><i class="fas fa-quote-left fa-2x fa-pull-left cinzaColor" style="margin-right: 10px;"></i> '+value.observacao_tecnica+'</div>' 
                        : '';
        var starsArray = (arrayConfigAtividades['avaliacao'].length > 0) ? jmespath.search(arrayConfigAtividades['avaliacao'], "[*].{nota_atribuida: nota_atribuida, id_tipo_avaliacao: id_tipo_avaliacao, nome_avaliacao: nome_avaliacao, aceita_entrega: aceita_entrega, pergunta: pergunta, color: config.color, icon: config.icon}") : [];
        var starsHtml = ''; 
        var rateDisable = false;
        if (value.avaliacao && value.avaliacao != 0 && value.avaliacao.nota_atribuida === false) {
            starsHtml +='<a class="newLink iconStarAtiv" style="font-size: 12pt; cursor: pointer;"><i class="fas fa-star-half-alt cinzaColor"></i> <span style="font-size: 11pt;">Avalia\u00E7\u00E3o Dispensada</span></a>';
            rateDisable = true;
        } else if (value.id_user == arrayConfigAtividades.perfil.id_user) {
            starsHtml +='<a class="newLink iconStarAtiv" style="font-size: 12pt; cursor: pointer;"><i class="fas fa-star-half-alt cinzaColor"></i> <span style="font-size: 11pt;">Auto Avalia\u00E7\u00E3o Indispon\u00EDvel</span></a>';
            rateDisable = true;
        } else {
            $.each(removeDuplicatesArray(starsArray, 'nota_atribuida'), function(index, value){
                starsHtml +='<a class="newLink iconStarAtiv" data-index="'+value.id_tipo_avaliacao+'" data-nota="'+value.nota_atribuida+'" data-pergunta="'+value.pergunta+'" data-nome="'+value.nome_avaliacao+'" data-aceita-entrega="'+value.aceita_entrega+'" data-color="'+value.color+'" data-icon="'+value.icon+'" onclick="onStarAtiv(this,\'click\')" onmouseover="onStarAtiv(this,\'over\')" onmouseout="onStarAtiv(this,\'out\')" style="font-size: 12pt; cursor: pointer;"><i data-nota="'+value.nota_atribuida+'"  class="fas fa-star cinzaColor"></i></a>';
            });
        }

        var modalDocEntrega = "openDialogDoc({title: '"+documento+"', id_procedimento: '"+value.id_procedimento+"', id_documento: '"+value.id_documento_entregue+"'})";

        var listAtividadesVinculadas = getAtividadesVinculadas(value, 'avaliadas');

        var htmlBox =   '<div id="ratingAtividade" class="ratingWork" data-demanda="'+value.id_demanda+'">'+
                        '   <table style="font-size: 10pt;width: 100%;" class="seiProForm">'+
                        '      <tr style="height: 40px; text-align: center;">'+
                        '          <td colspan="2">Como foi a entrega '+__.da_demanda+' de <strong>'+value.apelido+'</strong>?</td>'+
                        '      </tr>'+
                        '      <tr style="height: 40px; text-align: center;">'+
                        '          <td>'+
                        '               <table style="font-size: 10pt;width: 100%;">'+
                        '                   <tr>'+
                        '                       <td style="text-align: center;">'+
                        (value.id_procedimento == 0 || value.id_documento == 0 ?
                        '                           <a class="newLink" style="color: #00c; text-decoration: none;">'+
                        '                               <i class="fas fa-file-signature azulColor" style="padding-right: 5px;"></i>'+documento+
                        '                           </a>' : 
                        '                           <a class="newLink" style="color: #00c; text-decoration: underline; cursor: pointer;" onclick="'+modalDocEntrega+'" onmouseover="return infraTooltipMostrar(\'Visualiza\u00E7\u00E3o r\u00E1pida\');" onmouseout="return infraTooltipOcultar();">'+
                        '                               <i class="fas fa-file-signature azulColor" style="padding-right: 5px;"></i>'+documento+
                        '                               <i class="fas fa-eye" style="font-size: 80%;color: #00c;vertical-align: top;margin-left: 5px;"></i>'+
                        '                           </a>'+
                        '')+    
                        '                       </td>'+
                        '                       <td style="width: 200px;text-align: left;">'+
                        '                           '+getInfoAtividadeProdutividade(value)+
                        '                           <div style="margin: 15px 0 0 0;">'+getTagTempoPactuadoAtiv(value)+'</div>'+
                        '                           <div style="margin: 5px 0 0 5px;">'+getTagTempoDespendidoAtiv(value, false)+'</div>'+
                        '                       </td>'+
                        '                   <tr>'+
                        '                       <td colspan="2">'+
                        '                       '+obs_tecnica+
                        '                       </td>'+
                        '                   </tr>'+
                        '               </table>'+
                        '          </td>'+
                        '      </tr>'+
                        '      <tr style="height: 40px; text-align: center;">'+
                        '           <td>'+
                        '               <div class="ratingStars">'+
                        '                   '+starsHtml+
                        '               </div>'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr style="text-align: center;">'+
                        '           <td>'+
                        '               <div class="ratingReason"></div>'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr style="text-align: center;">'+
                        '           <td>'+
                        '               <div class="moreCommentBoxDiv" style="display:none; text-align: center;">'+
                        '                   <a class="newLink moreCommentBox" onclick="moreCommentBox(this)" style="font-size: 10pt; cursor: pointer; margin: 5px 0 0 0;"><i class="far fa-comment-alt cinzaColor"></i> Coment\u00E1rios adicionais?</a>'+
                        '                   <div class="moreCommentBoxText" style="display:none;">'+
                        '                       <textarea maxlength="500" oninput="checkLimitText(this);updateButtonTextarea(this);"></textarea>'+
                        '                       <span class="countLimit"></span>'+
                        '                   </div>'+
                        '               </div>'+
                        '           </td>'+
                        '      </tr>'+
                        '      <tr style="height: 60px;">'+
                        '           <td>'+
                        '               <a class="newLink" onclick="moreInfoBox(this)" style="font-size: 10pt; cursor: pointer; margin: 5px 0 0 0; float: right;"><i class="fas fa-info-circle cinzaColor"></i> Informa\u00E7\u00F5es '+__.da_demanda+'</a>'+
                        '           </td>'+
                        '      </tr>'+
                        '   </table>'+
                        '   <table style="font-size: 10pt; width: 100%; display: none" class="seiProForm moreInfoBox tableLine tableInfo">'+
                        '      <tr style="height: 10px;"><td colspan="2" style="border-bottom: 1px solid #ccc; height: 0px !important;"></td></tr>'+
                        '      '+getInfoAtividade(value)+
                        '   </table>'+
                        (listAtividadesVinculadas.length_check > 0 ? 
                        '   <table style="font-size: 10pt; width: 100%; margin: 10px 0;" class="seiProForm">'+
                        '      <tr style="height: 40px;">'+
                        '          <td style="vertical-align: bottom; text-align: left;" class="label">'+
                        '               '+listAtividadesVinculadas.input+
                        '               <label for="rate_others"><i class="iconPopup iconSwitch fas fa-star cinzaColor"></i> '+(listAtividadesVinculadas.length_check > 1 ? 'Avaliar '+getNameGenre('demanda', 'os outros', 'as outras')+' '+listAtividadesVinculadas.length_check+' '+__.demandas+' '+getNameGenre('demanda', 'vinculados', 'vinculadas') : 'Avaliar '+__.a_outra_demanda_vinculada)+'?</label>'+
                        '          </td>'+
                        '          <td style="width: 50px;">'+
                        '              <div class="onoffswitch" style="float: right;">'+
                        '                  <input type="checkbox" name="onoffswitch" data-target="#listRateOtherAtiv" onchange="changeOthersAtiv(this)" class="onoffswitch-checkbox singleOptionConfig" id="rate_others" data-key="rate_others" tabindex="0" checked>'+
                        '                  <label class="onoffswitch-label" for="rate_others"></label>'+
                        '              </div>'+
                        '          </td>'+
                        '      </tr>'+
                        '      <tr style="height: auto;">'+
                        '          <td colspan="2">'+
                        '               '+listAtividadesVinculadas.html+
                        '          </td>'+
                        '      </tr>'+
                        '   </table>'+
                        '' : '')+
                        '</div>';

        var btnDialogBoxPro = (rateDisable) 
                ? []
                : [{
                    text: (value.data_avaliacao == '0000-00-00 00:00:00') ? 'Avaliar' : 'Editar',
                    class: 'confirm',
                    click: function(event) {
                        saveRatingWork(this);
                    }
                }];
        if (checkCapacidade('complete_cancel_atividade') && value.data_avaliacao == '0000-00-00 00:00:00') {
            btnDialogBoxPro.unshift({
                text: 'Editar Conclus\u00E3o',
                icon: 'ui-icon-check',
                click: function(event) { 
                    completeAtividade(id_demanda);
                }
            });
        } else if (checkCapacidade('rate_cancel_atividade') && value.data_avaliacao != '0000-00-00 00:00:00') {
            btnDialogBoxPro.unshift({
                text: (rateDisable ? 'Cancelar Dispensa' : 'Cancelar Avalia\u00E7\u00E3o'),
                icon: 'ui-icon-close',
                click: function(event) { 
                    rateCancelAtividade(id_demanda);
                }
            });
        }
        if (checkCapacidade('rate_atividade')) {
            resetDialogBoxPro('dialogBoxPro');
            dialogBoxPro = $('#dialogBoxPro')
                .html('<div class="dialogBoxDiv">'+htmlBox+'</div>')
                .dialog({
                    title: (value.id_avaliacao == 0) ? 'Avaliar '+__.Demanda+': '+getTitleDialogBox(value) : 'Editar Avalia\u00E7\u00E3o: '+getTitleDialogBox(value),
                    width: 650,
                    open: function() { 
                        if (checkCapacidade('rate_edit_atividade') && value.data_avaliacao != '0000-00-00 00:00:00' && value.id_avaliacao != 0) { 
                            $('#ratingAtividade').find('.ratingStars .iconStarAtiv[data-nota="'+value.avaliacao.nota_atribuida+'"]').trigger('click');
                            $.each(value.avaliacao.justificativas,function(i, v){
                                $('#ratingAtividade .ratingReason').find('.ratingWhy .answer[data-index="'+v.id_tipo_justificativa+'"]').trigger('click');
                            });
                            if (value.avaliacao.comentarios != '') {
                                $('#ratingAtividade .moreCommentBoxDiv').find('.moreCommentBox').trigger('click');
                                $('#ratingAtividade .moreCommentBoxDiv').find('.moreCommentBoxText textarea').val(value.avaliacao.comentarios);
                            }
                        }
                    },
                    close: function() { 
                        $('#ratingAtividade').remove();
                        cancelMoveKanbanItens();
                        cancelSelectedItensAtiv(id_demanda);
                        resetDialogBoxPro('dialogBoxPro');
                    },
                    buttons: btnDialogBoxPro
            });
        }
    }
}
function rateCancelAtividade(id_demanda) {
    var value = jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+id_demanda+"`] | [0]");
    if (checkCapacidade('rate_cancel_atividade')) {
        confirmaFraseBoxPro( __.A_demanda+' j\u00E1 foi '+getNameGenre('demanda', 'avaliado', 'avaliada')+'. Tem certeza que deseja cancelar?', 'CANCELAR', function(){
            var action = 'rate_cancel_atividade';
            var param = {
                action: action, 
                id_demanda: id_demanda,
                id_avaliacao: value.id_avaliacao
            };
            getServerAtividades(param, action);
        }, function(){
            cancelMoveKanbanItens();
            cancelSelectedItensAtiv(id_demanda);
        });
    }
}
// SALVA AVALIACAO
function saveRatingWork(this_) {
    var _this = $(this_);
    var _parent = _this.closest('.ui-dialog');
    var data = _this.find('.ratingWork').data();
    var value = jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+data.demanda+"`] | [0]");
    var listAtividadesVinculadas = getAtividadesVinculadas(value, 'avaliadas');
    var comentarios = _this.find('.moreCommentBoxText textarea').val();
    var id_demandas_rate = (listAtividadesVinculadas.length_check > 0 && _parent.find('#rate_others').is(':checked')) 
                            ? JSON.parse(_parent.find('#lista_rate_others').val())
                            : [];
    var action = (value.id_avaliacao == 0)? 'rate_atividade' : 'rate_edit_atividade';
    var param = {
                    action: action,
                    id_user: value.id_user,
                    id_demandas_rate: id_demandas_rate,
                    id_avaliacao: value.id_avaliacao,
                    tempo_despendido: value.tempo_despendido,
                    tempo_pactuado: value.tempo_pactuado,
                    id_demanda: data.demanda,
                    id_tipo_avaliacao: data.indexSelected,
                    nota_atribuida: data.notaSelected,
                    aceita_entrega: data.aceitaEntrega,
                    comentarios: comentarios,
                    avaliacao_justificativa: data.whySelected,
                    data_avaliacao: moment().format('YYYY-MM-DD HH:mm:ss')
                }
    if (typeof data.notaSelected !== 'undefined' && ((typeof data.whySelected !== 'undefined' && data.whySelected.length > 0) || comentarios != '')) {
        getServerAtividades(param, action);
    } else if (typeof data.notaSelected === 'undefined') {
        alertaBoxPro('Error', 'exclamation-triangle', 'Selecione uma nota de avalia\u00E7\u00E3o.');
    } else {
        if (_this.find('.moreCommentBoxText textarea').is(':hidden')) { _this.find('.moreCommentBox').trigger('click') }
        alertaBoxPro('Error', 'exclamation-triangle', 'Selecione ao menos uma motiva\u00E7\u00E3o ou adicione um coment\u00E1rio \u00E0 avalia\u00E7\u00E3o.');
    }
}
// ACAO AO SELECIONAR UMA NOTA DE AVALIACAO
function onStarAtiv(this_, mode) {
    var this_ = $(this_);
    var data = this_.data();
    //console.log(this_, data, mode);
    if (mode == 'over' || mode == 'click') {
        this_.closest('td').find('.iconStarAtiv').each(function(){
            if (parseInt($(this).data('nota')) <= parseInt(data.nota)) {
                $(this).find('i').addClass('starGold');
                if (mode == 'click') { 
                    $(this).data('select', true); 
                }
            } else {
                if (!$(this).data('select')) {
                    $(this).find('i').removeClass('starGold');
                }
                if (mode == 'click') { 
                    $(this)
                        .data('select', false)
                        .find('i')
                        .removeClass('starGold');
                }
            }
        });
        if (mode == 'click') {
            this_.closest('td').find('.iconStarAtiv i').removeClass('starSelected');
            this_.find('i').addClass('starSelected');
            this_.closest('.ratingWork')
                .data('nota-selected', data.nota)
                .data('index-selected', data.index)
                .data('aceita-entrega', data.aceitaEntrega)
                .data('why-selected', []);
            
            var color = (typeof data.color !== 'undefined' && data.color !== null) 
                            ? 'color: '+data.color
                            : '';
            var colorBackground = (typeof data.color !== 'undefined' && data.color !== null) 
                            ? 'background-color: rgb('+$.map(hexToRgb(data.color),function(e){ return e }).join(" ")+' / 20%)'
                            : ''
            var htmlReason =        '<div class="ratingQuestion">'+
                                    '   <strong class="emoticon" style="'+colorBackground+'">'+
                                    '       <i class="fas '+data.icon+'" style="padding: 0 5px;font-size: 1.5em; '+color+'"></i>'+
                                    '       '+data.nome+
                                    '   </strong> '+
                                    '   <span>'+data.pergunta+'</span>'+
                                    '   <span class="ratingVisibility" style="float: right;" onmouseover="return infraTooltipMostrar(\'Motiva\u00E7\u00E3o vis\u00EDvel apenas para os gestores e para o avaliado\');" onmouseout="return infraTooltipOcultar();"><i class="fas fa-eye cinzaColor"></i></span>'+
                                    '</div>'+
                                    '<div class="ratingWhy">';
            
            var arrayJustificativas = (arrayConfigAtividades['avaliacao'].length > 0) ? jmespath.search(arrayConfigAtividades['avaliacao'], "[?nota_atribuida==`"+data.nota+"`].{id_tipo_justificativa: id_tipo_justificativa, nome_justificativa: nome_justificativa}") : [];
                $.each(arrayJustificativas, function(index, value){
                    htmlReason +=   '   <span class="answer" onclick="onWhyAtiv(this)" data-selected="false" data-index="'+value.id_tipo_justificativa+'">'+value.nome_justificativa+'</span>';    
                });
                    htmlReason +=   '</div>';    
                this_.closest('table').find('.moreCommentBoxDiv').show();
                this_.closest('table').find('.ratingReason').html(htmlReason);
        }
    } else if (mode == 'out') {
        if (!data.select) {
            this_.closest('td').find('.iconStarAtiv').each(function(){ 
                if(!$(this).data('select')) { 
                    $(this).find('i').removeClass('starGold'); 
                }
            });
        }
    }
}
// ACAO AO SELECIONAR UM MOTIVO DE AVALIACAO
function onWhyAtiv(this_) {
    var _this = $(this_);
    var data = _this.data();
    if (data.selected == false) {
        _this.addClass('selected').data('selected', true);
    } else {
        _this.removeClass('selected').data('selected', false);
    }
    var arraySelected = []
    _this.closest('.ratingWhy').find('.answer').each(function(){ if ($(this).data('selected')) { arraySelected.push($(this).data('index')) } });
    _this.closest('.ratingWork').data('why-selected', arraySelected);
    
    if (arraySelected.length > 0) { updateButtonConfirm(this_, true) } else { updateButtonConfirm(this_, false) }
}

// INICIA PAINEL
function initPanelAtividades(ativData, TimeOut = 9000) {
    if (TimeOut <= 0) { return; }
    if (typeof localStorageRestorePro !== 'undefined' && typeof setPanelAtividades !== 'undefined' && typeof orderDivPanel !== 'undefined') { 
        if ($('#ifrArvore').length > 0 && ativData['demandas_processo'].length > 0) {
            setAtividadesProcesso(ativData['demandas_processo']);
        } else {
            setPanelAtividades(ativData['demandas']);
            setAtividadesUser();
        }
        loadingButtonConfirm(false);
    } else {
        setTimeout(function(){ 
            initPanelAtividades(ativData, TimeOut - 100); 
            console.log('Reload initPanelAtividades'); 
        }, 500);
    }
}
function getAtividadesProcesso(id_procedimento) {
    var stateAtivData = getOptionsPro('panelAtividadesViewSend') ? 'ativas' : 'nao_enviadas';
    var selfAtivData = getOptionsPro('panelAtividadesViewSelf') ? 'only_mine' : '';
    var param = {
            action: 'demandas_processo', 
            id_procedimento: id_procedimento, 
            status: stateAtivData,
            self: selfAtivData
        };
    getServerAtividades(param, 'panel');
}
function getPanelAtividades(callback) {
    var stateAtivData = getOptionsPro('panelAtividadesViewSend') ? 'ativas' : 'nao_enviadas';
    var selfAtivData = getOptionsPro('panelAtividadesViewSelf') ? 'only_mine' : '';
    var stateAtivDataSub = ( getOptionsPro('panelAtividadesViewSubordinada') || !verifyOptionsPro('panelAtividadesViewSubordinada')) ? '' : 'self';
    var param = {
            action: 'demandas', 
            status: stateAtivData,
            lista: stateAtivDataSub,
            callback: callback,
            self: selfAtivData
        };
    getServerAtividades(param, 'panel');
}
function getAtividades(callback) {
    var ifrArvore = $('#ifrArvore');
    if (ifrArvore.length > 0) {
        var id_procedimento = getParamsUrlPro(ifrArvore.attr('src')).id_procedimento;
            id_procedimento = (typeof id_procedimento !== 'undefined') ? parseInt(id_procedimento) : 0;
        getAtividadesProcesso(id_procedimento, callback);
    } else {
        getPanelAtividades(callback);
    }
}
function getTitleDialogBox(v, full = false) {
    var nome_atividade = (v.nome_atividade && v.nome_atividade.length > 50) 
                            ? v.nome_atividade.replace(/^(.{50}[^\s]*).*/, "$1")+'...' 
                            : (v.nome_atividade ? v.nome_atividade : '');
    var assunto = (v.assunto && v.assunto.length > 50) 
                            ? v.assunto.replace(/^(.{50}[^\s]*).*/, "$1")+'...' 
                            : (v.assunto ? v.assunto : '');
    var nameAtiv = (full) 
                    ? (v.assunto ? v.assunto +' / ': '')+v.nome_atividade
                    : (assunto ? assunto : '')+(nome_atividade != '' ? ' / '+nome_atividade : '');
    var displayTitle =  (v.nome_requisicao ? v.nome_requisicao : '')+(v.requisicao_sei ? ' ('+v.requisicao_sei+')' : '')+(v.apelido ? ' - '+v.apelido : '');
        displayTitle = (displayTitle != '') ? displayTitle+' / '+nameAtiv : nameAtiv;
    return displayTitle;
}
function selectAtividadeBox(mode) {   
    var iconDelete = $('#atividadesProActions .iconAtividade_delete');
    var iconSend = $('#atividadesProActions .iconAtividade_send');
    
    if (mode == 'send' && iconSend.length > 0 && iconSend.data('list').length > 0) {
        archiveAtividade(iconSend.data('list'));
    } else if (mode == 'delete' && iconDelete.length > 0 && iconDelete.data('list').length > 0) {
        var id_demandas = iconDelete.data('list');
        confirmaFraseBoxPro('Tem certeza que deseja excluir '+(id_demandas.length > 1 ? __.as_demandas_selecionadas : __.a_demanda_selecionada)+'?', 'EXCLUIR', function(){
            var action = 'delete_atividade';
            var param = {
                id_demandas: id_demandas, 
                id_demanda: -1, 
                id_unidade: arrayConfigAtivUnidade.id_unidade, 
                action: action
            };
            getServerAtividades(param, action);
        });
    } else {
        var arrayAtividadesList = ($('#ifrVisualizacao').length > 0) ? arrayAtividadesProcPro : arrayAtividadesPro; 
        var listaAtividades = (mode == 'start')
                            ? ( !checkCapacidade('only_self_atividades') ) 
                                ? jmespath.search(arrayAtividadesList, "[?data_inicio=='0000-00-00 00:00:00']")
                                : jmespath.search(arrayAtividadesList, "[?data_inicio=='0000-00-00 00:00:00'] | [?id_user==`"+arrayConfigAtividades.perfil.id_user+"`]")
                            : 0;
            listaAtividades = (mode == 'complete')
                            ? ( !checkCapacidade('only_self_atividades') ) 
                                ? jmespath.search(arrayAtividadesList, "[?data_entrega=='0000-00-00 00:00:00'] | [?data_inicio!='0000-00-00 00:00:00']")
                                : jmespath.search(arrayAtividadesList, "[?data_entrega=='0000-00-00 00:00:00'] | [?data_inicio!='0000-00-00 00:00:00'] | [?id_user==`"+arrayConfigAtividades.perfil.id_user+"`]")
                            : listaAtividades;
            listaAtividades = (mode == 'edit' && checkCapacidade('edit_atividade')) 
                            ? jmespath.search(arrayAtividadesList, "[?data_entrega=='0000-00-00 00:00:00']")
                            : listaAtividades;
            listaAtividades = (mode == 'rate' && checkCapacidade('rate_atividade')) 
                            ? jmespath.search(arrayAtividadesList, "[?data_entrega!='0000-00-00 00:00:00'] | [?data_avaliacao=='0000-00-00 00:00:00']")
                            : listaAtividades;
            listaAtividades = (mode == 'rate_edit' && checkCapacidade('rate_edit_atividade')) 
                            ? jmespath.search(arrayAtividadesList, "[?data_entrega!='0000-00-00 00:00:00'] | [?data_avaliacao!='0000-00-00 00:00:00'] | [?data_envio=='0000-00-00 00:00:00']")
                            : listaAtividades;
            listaAtividades = (mode == 'rate_cancel' && checkCapacidade('rate_cancel_atividade')) 
                            ? jmespath.search(arrayAtividadesList, "[?data_avaliacao!='0000-00-00 00:00:00'] | [?data_envio=='0000-00-00 00:00:00']")
                            : listaAtividades;
            listaAtividades = (mode == 'send' && checkCapacidade('send_atividade')) 
                            ? jmespath.search(arrayAtividadesList, "[?data_entrega!='0000-00-00 00:00:00'] | [?data_avaliacao!='0000-00-00 00:00:00'] | [?data_envio=='0000-00-00 00:00:00']")
                            : listaAtividades;
            listaAtividades = (mode == 'delete' && checkCapacidade('delete_atividade')) 
                            ? jmespath.search(arrayAtividadesList, "[?data_entrega=='0000-00-00 00:00:00']")
                            : listaAtividades;

        if (listaAtividades.length == 1) {
            if (mode == 'start') {
                startAtividade(listaAtividades[0].id_demanda);
            } else if (mode == 'complete') {
                completeAtividade(listaAtividades[0].id_demanda);
            } else if (mode == 'edit') {
                saveAtividade(listaAtividades[0].id_demanda);
            } else if (mode == 'rate' || mode == 'rate_edit') {
                rateAtividade(listaAtividades[0].id_demanda);
            } else if (mode == 'rate_cancel') {
                rateCancelAtividade(listaAtividades[0].id_demanda);
            } else if (mode == 'send') {
                archiveAtividade(listaAtividades[0].id_demanda);
            } else if (mode == 'delete') {
                confirmaBoxPro('Tem certeza que deseja excluir '+__.esta_demanda+'?', function() { deleteAtividade(listaAtividades[0].id_demanda) }, 'Excluir');
            
            }

        } else if (listaAtividades.length > 1) {
            var nameMode = (mode == 'start') ? 'Iniciar' : '';
                nameMode = (mode == 'complete') ? 'Concluir' : nameMode;
                nameMode = (mode == 'edit') ? 'Editar' : nameMode;
                nameMode = (mode == 'rate') ? 'Avaliar' : nameMode;
                nameMode = (mode == 'rate_edit') ? 'Editar Avaliar' : nameMode;
                nameMode = (mode == 'rate_cancel') ? 'Cancelar Avalia\u00E7\u00E3o' : nameMode;
                nameMode = (mode == 'send') ? __.Arquivar : nameMode;
                nameMode = (mode == 'delete') ? 'Deletar' : nameMode;
            var optionSelectAtividade = $.map(listaAtividades, function(v,k){ 
                                            return '<option value="'+v.id_demanda+'" title="'+getTitleDialogBox(v, true)+'">'+getTitleDialogBox(v)+'</option>'
                                        }).join('');
            var htmlBox =   '<div id="boxAtividade" class="atividadeWork '+mode+'AtividadeBox">'+
                            '   <table style="font-size: 10pt;width: 100%;" class="seiProForm">'+
                            '      <tr>'+
                            '          <td style="vertical-align: bottom; text-align: left; width: 160px;" class="label">'+
                            '               <label for="ativ_data_inicio"><i class="iconPopup iconSwitch fas fa-check cinzaColor" style="min-height: 45px;"></i>Selecione '+__.a_Demanda+' para '+nameMode+':</label>'+
                            '           </td>'+
                            '           <td>'+
                            '               <select id="ativ_id_demanda" onchange="getSelectedItemBox(this)" data-key="id_demanda">'+optionSelectAtividade+'</select>'+
                            '           </td>'+
                            '      </tr>'+
                            '      <tr id="previewItemAtividade" style="display:none;">'+
                            '           <td colspan="2">'+
                            '               <div class="preview_atividade" style="padding: 20px;background-color: #f4f5f5;border-radius: 5px;margin-top: 10px;"></div>'+
                            '           </td>'+
                            '      </tr>'+
                            '   </table>'+
                            '</div>';

            resetDialogBoxPro('dialogBoxPro');
            dialogBoxPro = $('#dialogBoxPro')
                .html('<div class="dialogBoxDiv">'+htmlBox+'</div>')
                .dialog({
                    title: nameMode+' '+__.Demanda+': Selecionar',
                    width: 770,
                    open: function() { 
                        updateButtonConfirm(this, true);
                        initChosenReplace('box_init', this);
                    },
                    close: function() { 
                        $('#boxAtividade').remove(); 
                        resetDialogBoxPro('dialogBoxPro'); 
                    },
                    buttons: [{
                        text: 'Selecionar',
                        class: 'confirm',
                        click: function(event) { 
                            var selectIdDemanda = $('.'+mode+'AtividadeBox').find('#ativ_id_demanda').val();
                            // console.log(selectIdDemanda);
                            if (mode == 'start') {
                                startAtividade(selectIdDemanda);
                            } else if (mode == 'complete') {
                                completeAtividade(selectIdDemanda);
                            } else if (mode == 'edit') {
                                saveAtividade(selectIdDemanda);
                            } else if (mode == 'rate' || mode == 'rate_edit') {
                                rateAtividade(selectIdDemanda);
                            } else if (mode == 'rate_cancel') {
                                rateCancelAtividade(selectIdDemanda); 
                            } else if (mode == 'send') {
                                archiveAtividade(selectIdDemanda); 
                            } else if (mode == 'delete') {
                                deleteAtividade(selectIdDemanda); 
                            }
                        }
                    }]
                });
        }
    }
}
function getSelectedItemBox(this_) {
    var _this = $(this_);
    var _parent = _this.closest('table');
    var id_demanda = (checkValue(_this)) ? _this.val() : false;
    var value = (id_demanda) ? jmespath.search(arrayAtividadesPro, "[?id_demanda==`"+id_demanda+"`] | [0]") : null;
        value = (id_demanda && value !== null) ? value : false;
    var htmlItem = (value) 
        ?   '<div class="kanban-container">'+
            '   <div class="kanban-item">'+
            getKanbanItem(value).title+
            '   </div>'+
            '</div>'
        : '';

    if (value) {
        _parent.find('#previewItemAtividade').show().find('.preview_atividade').html(htmlItem);
    } else {
        _parent.find('#previewItemAtividade').hide().find('.preview_atividade').html('');
    }
    dialogBoxPro.dialog('option', 'height', 'auto');
}
function insertIconAtividade() {
    waitLoadPro($('#ifrVisualizacao').contents(), '#divInfraAreaTelaD', "#divArvoreAcoes", getInsertIconAtividade);
}
function getInsertIconAtividade() {
    var arrayAtividadesList = [];
        if ($('#ifrVisualizacao').length > 0) {
            $('#ifrVisualizacao').contents().find('.iconBoxAtividade').remove();
            arrayAtividadesList = arrayAtividadesProcPro;
        } else {
            $('#atividadesProActions').find('.iconBoxAtividade').remove();
            arrayAtividadesList = arrayAtividadesPro;
        }
        if (checkCapacidade('save_atividade')) {
            appendIconAtividade('save');
        }
        if (checkCapacidade('start_atividade') && 
            (
                ( !checkCapacidade('only_self_atividades') ) 
                    ? (jmespath.search(arrayAtividadesList, "[?data_inicio=='0000-00-00 00:00:00'] | length(@)") > 0)
                    : (jmespath.search(arrayAtividadesList, "[?data_inicio=='0000-00-00 00:00:00'] | [?id_user==`"+arrayConfigAtividades.perfil.id_user+"`] | length(@)") > 0)
            )
        ) {
            appendIconAtividade('start');
        }
        if ((checkCapacidade('complete_atividade') || checkCapacidade('start_cancel_atividade')) && 
            (
                ( !checkCapacidade('only_self_atividades') ) 
                    ? (jmespath.search(arrayAtividadesList, "[?data_entrega=='0000-00-00 00:00:00'] | [?data_inicio!='0000-00-00 00:00:00'] | length(@)") > 0)
                    : (jmespath.search(arrayAtividadesList, "[?data_entrega=='0000-00-00 00:00:00'] | [?data_inicio!='0000-00-00 00:00:00'] | [?id_user==`"+arrayConfigAtividades.perfil.id_user+"`] | length(@)") > 0)
            )
        ) {
            appendIconAtividade('complete');
        }
        if (checkCapacidade('rate_atividade') && jmespath.search(arrayAtividadesList, "[?data_entrega!='0000-00-00 00:00:00'] | [?data_avaliacao=='0000-00-00 00:00:00'] | length(@)") > 0) {
            appendIconAtividade('rate');
        }
        if (checkCapacidade('send_atividade') && jmespath.search(arrayAtividadesList, "[?data_avaliacao!='0000-00-00 00:00:00'] | [?data_envio=='0000-00-00 00:00:00'] | length(@)") > 0) {
            appendIconAtividade('send');
        }
        if (checkCapacidade('delete_atividade') && jmespath.search(arrayAtividadesList, "[?data_inicio=='0000-00-00 00:00:00'] | length(@)") > 0) {
            appendIconAtividade('delete');
        }
        appendModulesIcons();
}
function appendModulesIcons() {
    var elementActions = $('#atividadesProActions');
    if ($('#ifrVisualizacao').length == 0 && elementActions.length > 0) {
        var i = 0;
        var htmlModules =   '<span class="modulesActions">';
            if (checkCapacidade('view_afastamento')) {
                htmlModules +=  '<a class="newLink iconBoxModules iconAfastamento_view" onmouseover="return infraTooltipMostrar(\'Afastamentos\');" onmouseout="return infraTooltipOcultar();" onclick="changePanelHome(this)" style="font-size: 14pt;" data-value="Afastamento">'+
                                '   <i class="fas fa-luggage-cart cinzaColor"></i>'+
                                '</a>';
                i = i+1;
            }
            if (checkCapacidade('view_relatorio')) {
                htmlModules +=  '<a class="newLink iconBoxModules iconRelatorio_view" onmouseover="return infraTooltipMostrar(\'Relat\u00F3rios\');" onmouseout="return infraTooltipOcultar();" onclick="changePanelHome(this)" style="font-size: 14pt;" data-value="Relatorio">'+
                                '   <i class="fas fa-chart-pie cinzaColor"></i>'+
                                '</a>';
                i = i+1;
            }

            htmlModules +=  '<a class="newLink iconBoxModules iconConfiguracao_view" onmouseover="return infraTooltipMostrar(\'Configura\u00E7\u00F5es\');" onmouseout="return infraTooltipOcultar();" onclick="changePanelHome(this)" style="font-size: 14pt;" data-value="Configuracao">'+
                            '   <i class="fas fa-cog cinzaColor"></i>'+
                            '</a>'+
                            '</span>';

            elementActions.find('.modulesActions').remove();
            elementActions.append(htmlModules);
    }
}
function appendIconAtividade(name = false) {
    var elementActions = ($('#ifrVisualizacao').length > 0) ? $('#ifrVisualizacao').contents() : $('#atividadesProActions');
        
    if (name) {
        var htmlIconAtividade = '';
        if (name == 'save') {
            elementActions.find('.iconAtividade_'+name).remove();
            htmlIconAtividade = getHtmlIconAtividade({name: name, title: __.Nova_Demanda+'', icon: 'fas fa-user-check', action: 'saveAtividade()'});
        } else if (name == 'start') {
            elementActions.find('.iconAtividade_'+name).remove();
            htmlIconAtividade = getHtmlIconAtividade({name: name, title: 'Iniciar '+__.Demanda+'', icon: 'fas fa-play-circle', action: 'selectAtividadeBox(\'start\')'});
        } else if (name == 'complete') {
            elementActions.find('.iconAtividade_'+name).remove();
            htmlIconAtividade = getHtmlIconAtividade({name: name, title: 'Concluir '+__.Demanda+'', icon: 'fas fa-check-circle', action: 'selectAtividadeBox(\'complete\')'});
        } else if (name == 'rate') {
            elementActions.find('.iconAtividade_'+name).remove();
            htmlIconAtividade = getHtmlIconAtividade({name: name, title: 'Avaliar '+__.Demanda+'', icon: 'fas fa-star', action: 'selectAtividadeBox(\'rate\')'});
        } else if (name == 'send') {
            elementActions.find('.iconAtividade_'+name).remove();
            htmlIconAtividade = getHtmlIconAtividade({name: name, title: __.Arquivar+' '+__.Demandas+' do Processo', icon: 'fas fa-archive', action: 'selectAtividadeBox(\'send\')'});
        } else if (name == 'delete') {
            elementActions.find('.iconAtividade_'+name).remove();
            htmlIconAtividade = getHtmlIconAtividade({name: name, title: 'Excluir '+__.Demanda+'', icon: 'fas fa-trash-alt', action: 'selectAtividadeBox(\'delete\')'});
        }
        if (htmlIconAtividade != '') { 
            if ($('#ifrVisualizacao').length > 0) {
                elementActions.find('#divArvoreAcoes').append(htmlIconAtividade);
            } else {
                elementActions.append(htmlIconAtividade);
            }
        }
    }
}
function getHtmlIconAtividade(value) {
    var htmlBtn = '';
    if ($('#ifrVisualizacao').length > 0) {
        htmlBtn =   '<a tabindex="451" class="botaoSEI iconBoxAtividade iconAtividade_'+value.name+'" onmouseout="return infraTooltipOcultar();" onmouseover="return infraTooltipMostrar(\''+value.title+'\')" onclick="parent.'+value.action+'" style="position: relative;display: inline-block;">'+
                    '    <img class="infraCorBarraSistema" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">'+
                    '    <span style="position: absolute;width: 40px;margin: 1px 2px;text-align: center;height: 32px;padding-top: 8px;background: transparent;left: 0;user-select: none;pointer-events: none;">'+
                    '       <i class="'+value.icon+'" style="font-size: 17pt; color: #fff;"></i>'+
                    '    </span>'+
                    '</a>';
    } else {
        htmlBtn =   '<a class="newLink iconBoxAtividade iconAtividade_'+value.name+'" onclick="'+value.action+'" onmouseover="return infraTooltipMostrar(\''+value.title+'\');" onmouseout="return infraTooltipOcultar();" style="margin: 0; font-size: 14pt;">'+
                    '       <span class="fa-layers fa-fw">'+
                    '           <i class="'+value.icon+'"></i>'+
                    '           <span class="fa-layers-counter" style="display: none;"></span>'+
                    '       </span>'+
                    '</a>';
    }
    return htmlBtn;
}
function initEmptyAtividades() {
    arrayAtividadesPro = [];
    initNameConst('get');
    setPanelAtividades();
    $('#tabelaAtivPanel, #ganttAtivPanel').find('.dataFallback').addClass('dataLoading');
    $('.iconAtividade_update i').addClass('fa-spin');
}
function initAtividades(TimeOut = 9000) {
    if (TimeOut <= 0) { return; }
    if (typeof localStorageRestorePro !== 'undefined' && typeof checkLoadingButtonConfirm !== 'undefined' ) { 
        urlServerAtiv = perfilLoginAtiv.URL_API;
        userHashAtiv = perfilLoginAtiv.KEY_USER;
        initPanelFavorites();
        initEmptyAtividades();
        if (userHashAtiv == '') {
            setPerfilLoginGoogle();
        } else {
            getAtividades();
        }
        if (typeof $.mask === 'undefined') {
            $.getScript(URL_SEIPRO+"js/lib/jquery.maskedinput.min.js"); 
        }
        if (typeof $().chosen === 'undefined') {
            $.getScript(URL_SEIPRO+"js/lib/chosen.jquery.min.js"); 
        }
    } else {
        setTimeout(function(){ 
            initAtividades(TimeOut - 100); 
            console.log('Reload initAtividades'); 
        }, 500);
    }
}

function initPerfilLoginAtiv(TimeOut = 9000) {
    if (TimeOut <= 0) { return; }
    if (typeof checkConfigValue !== 'undefined' && typeof localStorageRestorePro !== 'undefined' ) { 
        setTimeout(function(){ 
            perfilLoginAtiv = localStorageRestorePro('configBasePro_atividades');
            perfilLoginAtiv = (typeof perfilLoginAtiv !== 'undefined' && perfilLoginAtiv !== null && checkConfigValue('gerenciaratividades')) ? perfilLoginAtiv : false;
            // console.log('initPerfilLoginAtiv', perfilLoginAtiv, localStorage.getItem('configBasePro_atividades'), checkConfigValue('gerenciaratividades'), localStorageRestorePro('configBasePro_atividades'));
            if (perfilLoginAtiv) {
                initAtividades();
            } else {
                getServersPro();
            }
        }, 1500);
    } else {
        setTimeout(function(){ 
            initPerfilLogin(TimeOut - 100); 
            console.log('Reload initPerfilLogin', typeof localStorageRestorePro,  typeof localStorageRestorePro('configBasePro_atividades')); 
        }, 500);
    }
}
initPerfilLoginAtiv();

// Login Google
function getServersPro() {
    $.ajax({
        url: 'https://seipro.app/servers/',
        type: 'GET',
        dataType: 'json',
        success: function(result) {
            var host = jmespath.search(result, "[?domain=='"+window.location.host+"'] | [0]");
                host = (host !== null) ? host : false;
            var hostConfig = url_host.replace('controlador.php','');
            var urlConfigAtiv = (host) 
                ? hostConfig+'?#&acao_pro=set_database&mode=insert&base=atividades&token=&url='+encodeURIComponent(host.remote_host)
                : hostConfig+'?#&acao_pro=set_option&option_key=gerenciaratividades&option_value=false';
            if ( $('#frmCheckerProcessoPro').length == 0 ) { getCheckerProcessoPro(); }
            $('#frmCheckerProcessoPro').attr('src', urlConfigAtiv).unbind().on('load', function(){
                console.log('getServersPro', host);
                if (host) {
                    perfilLoginAtiv = {URL_API: host.remote_host, KEY_USER: ''};
                    urlServerAtiv = perfilLoginAtiv.URL_API;
                    userHashAtiv = perfilLoginAtiv.KEY_USER;
                    localStorageStorePro('configBasePro_atividades', perfilLoginAtiv);
                    initAtividades();
                    console.log('INITI');
                } else {
                    localStorageRemovePro('configBasePro_atividades');
                    localStorageRemovePro('configDataAtividadesPro');
                    localStorageRemovePro('configDataAtividadesProcPro');
                }
            });
        }
    });
}
function setPerfilLoginGoogle() {
    var token = (typeof gapi !== 'undefined') ? gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token : false;
    if (token) {
        window.tokenID = token;
        getAtividades();
    } else {
        setScriptGoogleProfile();
    }
}
function setScriptGoogleProfile() {
    var tagScript = '<script src="https://apis.google.com/js/platform.js" async defer></script>';
    var metaLogin = '<meta name="google-signin-client_id" content="648601411036-7hm2pvgpc9e0r4l8fpd8o1al571hruac.apps.googleusercontent.com">';
    $(tagScript+metaLogin).appendTo('head');
    $('#atividadesProActions').find('.iconAtividade_update i').removeClass('fa-spin');
}
function onSignIn(googleUser) {
    var token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    console.log({Token: token});
    window.tokenID = token;
    getAtividades();
}
function signOutProfile() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorageRemovePro('configBasePro_atividades');
      localStorageRemovePro('configDataAtividadesPro');
      localStorageRemovePro('configDataAtividadesProcPro');
    });
}