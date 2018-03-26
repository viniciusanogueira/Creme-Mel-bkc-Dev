var processIdTeste = '';
/**
 * Ocorre antes da solicitação ser movimentada, após já ter sido selecionada 
 * a atividade destino, o usuário e demais informações necessárias à solicitação.
 **/
var beforeSendValidate = function(numState, nextState) {

	console.log("--Debbug-- beforeSendValidate-");
	console.log("--Debbug-- numState: " + numState);
	console.log("--Debbug-- nextState: " + nextState); 
	var INICIO = 0;
	$('.has-error').removeClass('has-error');
	
//*Inicio	
	if ( numState == '00' || numState == '01' || numState == '04' || numState == '05') {
		
		if ($('#fsDadosPesquisa').css('display') == 'none') {
			//$('html,body').animate({scrollTop: $('#fsDadosPesquisaCliente').prop("scrollHeight")});
			throw("Favor pesquisar cliente antes de enviar a solicitação!");
		}
		
		if (( $("#cpfCliente").val() == "" ) || ($("#cpfCliente").val() == undefined)) {
			$('#cpfCliente').parent( 'div' ).addClass('has-error');
			//$('html,body').animate({scrollTop: $('#fsDadosPesquisa').prop("scrollHeight")});
			throw("CPF/CNPJ deve ser preenchido!");
		}
		
		if (( $("#empresa").val() == ".." ) || ($("#empresa").val() == undefined)) {
			$('#empresa').parent( 'div' ).addClass('has-error');
			//$('html,body').animate({scrollTop: $('#fsDadosPesquisa').prop("scrollHeight")});
			throw("Marca deve ser selecionada!");
		}
		
		if (( $("#zoomFilial").val() == "" ) || ($("#zoomFilial").val() == undefined)) {
			$('#zoomFilial').parent( 'div' ).addClass('has-error');
			//$('html,body').animate({scrollTop: $('#fsDadosPesquisa').prop("scrollHeight")});
			throw("Filial deve ser preenchido!");
		}

		if ($('#zoomFilialCliente').val() == '' || $('#zoomFilialCliente').val() == undefined) {
			$('#zoomFilialCliente').parent( 'div' ).addClass('has-error');
			throw("Favor selecionar uma Filial para o Cliente");
		}

		if (( $("#tipoSolicitacao").val() == ".." ) || ($("#tipoSolicitacao").val() == undefined)) {
			$('#tipoSolicitacao').parent( 'div' ).addClass('has-error');
			throw("Tipo da Solicitação deve ser preenchido!");
		}

		if (( $("#tipoSolicitacao").val() == "INCLUSAO" || $("#tipoSolicitacao").val() == "TROCA") && ( $("#zoomModelo").val() == ""  || $("#zoomModelo").val() == undefined)) {
			$('#zoomModelo').parent( 'div' ).addClass('has-error');
			throw("Modelo de Freezer deve ser preenchido!");
		}

		if (( $("#tipoSolicitacao").val() == "RETIRADA" || $("#tipoSolicitacao").val() == "TROCA") && ( $("#zoomPatrimonioCliente").val() == ""  || $("#zoomPatrimonioCliente").val() == undefined)) {
			$('#zoomPatrimonioCliente').parent( 'div' ).addClass('has-error');
			throw("Patrimonio do Cliente deve ser preenchido!");
		} else {
			if (verificarSolicAberta($("#zoomPatrimonioCliente").val(), $('#codCliente').val()+$('#lojaCliente').val())) {
				throw("Já existe uma solicitação em aberto para este Patrimonio e Cliente!");
			}
		}
	} else
//*Aprovar Solicitação		
	if ( numState == '06' ) {
		if ($('#aprovado').val() == '..' || $('#aprovado').val() == undefined) {
			$('#aprovado').parent( 'div' ).addClass('has-error');
			throw("Favor selecionar uma Aprovação.");			
		} else 
			if ($('#aprovado').val() != 'Aprovado') {
				if ($('#parecer').val() == '' || $('#parecer').val() == undefined) {
					$('#parecer').parent( 'div' ).addClass('has-error');
					throw("Quando não Aprovado, favor informar um Parecer.");			
				}
			}
	} else
//*Analisar Patrimonio		
	if ( numState == '10' ) {
		if ($('#aprovado').val() == '..' || $('#aprovado').val() == undefined) {
			$('#aprovado').parent( 'div' ).addClass('has-error');
			throw("Favor selecionar uma Aprovação.");			
		} else 
			if ($('#aprovado').val() != 'Aprovado') {
				if ($('#parecer').val() == '' || $('#parecer').val() == undefined) {
					$('#parecer').parent( 'div' ).addClass('has-error');
					throw("Quando não Aprovado, favor informar um Parecer.");			
				}
			}
		if ($('#aprovado').val() == 'Aprovado') {
			if (( $("#tipoSolicitacao").val() == "INCLUSAO" || $("#tipoSolicitacao").val() == "TROCA") ) {
				if ( $("#zoomFilialPatrimonio").val() == ""  || $("#zoomFilialPatrimonio").val() == undefined) {
					$('#zoomFilialPatrimonio').parent( 'div' ).addClass('has-error');
					throw("Favor informar a Filial do Patrimônio.");
				} else {
					if ( $("#zoomPatrimonio").val() == ""  || $("#zoomPatrimonio").val() == undefined) {
						$('#zoomPatrimonio').parent( 'div' ).addClass('has-error');
						throw("Favor informar Patrimônio.");
					} else {
						if (verificarSolicAberta($("#CPLAQUETA").val(), $('#codCliente').val())) {
							$('#zoomPatrimonio').parent( 'div' ).addClass('has-error');
							throw("Já existe uma solicitação em aberto ("+processIdTeste+") para este Patrimonio e Cliente!");
						}
					}
				}
			} else {
				if ( $("#zoomPatrimonioCliente").val() == ""  || $("#zoomPatrimonioCliente").val() == undefined) {
					$('#zoomPatrimonioCliente').parent( 'div' ).addClass('has-error');
					throw("Favor informar Patrimônio do Cliente.");
				} else {
					if (verificarSolicAberta($("#CPLAQUETACLIENTE").val(), $('#codCliente').val())) {
						$('#zoomPatrimonioCliente').parent( 'div' ).addClass('has-error');
						throw("Já existe uma solicitação em aberto ("+processIdTeste+") para este Patrimonio e Cliente!");
					}
				}
			}
		}
	} else {
//*Confirmar Execução		
	if ( numState == '28' ) {
		if (( $("#tipoSolicitacao").val() == "INCLUSAO" || $("#tipoSolicitacao").val() == "TROCA") && ( $("#zoomPatrimonio").val() == ""  || $("#zoomPatrimonio").val() == undefined)) {
			$('#zoomPatrimonio').parent( 'div' ).addClass('has-error');
			throw("Favor informar Patrimônio.");
		}
	} else {
		if ( numState == '56' || numState == '58' || numState == '60') {
			throw("Essa Solicitação não pode ser movimentada por usuário.");
		}
	}
	}
}

/**
 * Função para validação do paixfilho de rateio
 * @param valorPagto
 * @returns '' - caso esteja ok / Mensagem de erro
 */
function validaModelo() {
	
	var tableModelo = $('table#tablePatrimonio tbody tr [id^="zoomModelo___"]');

	var retorno = new Array();
	
	if (tableModelo.length > 0) {
		for(var i = 0; i < tableModelo.length; i++){
	
			if (tableModelo[i].value == '') {
				retorno.push('Modelo não Informado!');
				retorno.push(tableModelo[i].id);
			}
		}
	} else {
		retorno.push('Informe ao menos um Modelo para Cadastro de Cliente.');
		retorno.push('');
	}
	return retorno;
	
};
/**
 * Rotina de verificação se já existe uma solicitação em aberto para este mesmo cliente/plaqueta
 * @param cpf
 * @returns
 */
function verificarSolicAberta(plaqueta, codigo) {

	var cr1 = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST);
	var cr2 = DatasetFactory.createConstraint('codCliente', codigo, codigo, ConstraintType.MUST);
	var cr3 = DatasetFactory.createConstraint('CCPLAQUETACLIENTE', plaqueta, plaqueta, ConstraintType.SHOULD);
	var cr4 = DatasetFactory.createConstraint('CPLAQUETA', plaqueta, plaqueta, ConstraintType.SHOULD);
	var dsPatrimonio = DatasetFactory.getDataset('dsFormIncRetPatrimonio', null, new Array(cr1, cr2, cr3, cr4), null);	
	
	if (dsPatrimonio != null && dsPatrimonio.values != null && dsPatrimonio.values.length > 0) {
        var records = dsPatrimonio.values;
        for (var index in records) {
        	var record = records[index];
            var c1 = DatasetFactory.createConstraint('processId', 'Solicitacao de Patrimônio', 'Solicitacao de Patrimônio', ConstraintType.MUST);
            var c2 = DatasetFactory.createConstraint('active', 'true', 'true', ConstraintType.MUST);
            var c3 = DatasetFactory.createConstraint('cardDocumentId', record.documentid, record.documentid, ConstraintType.MUST);
            var c4 = DatasetFactory.createConstraint('workflowProcessPK.processInstanceId', WKNumProces, WKNumProces, ConstraintType.MUST_NOT);            	
            	
            var dsWorkflowProcess = DatasetFactory.getDataset('workflowProcess', null, new Array(c1, c2, c3, c4), null);
            if (dsWorkflowProcess != null && dsWorkflowProcess.values != null && dsWorkflowProcess.values.length > 0) {
            	var registros = dsWorkflowProcess.values;
            	processIdTeste = dsWorkflowProcess.values[0]["workflowProcessPK.processInstanceId"];
            	return true;
            }
        }
        return false;
    } else { return false;}
}
