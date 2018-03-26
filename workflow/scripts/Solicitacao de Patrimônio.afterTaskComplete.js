function afterTaskComplete(colleagueId,nextSequenceId,userList){
	
	var sequenceId = getValue("WKCurrentState");
	var numProces = getValue("WKNumProces");
	log.warn("--Debbug-- Solicitação de Patrimonio- after task save");
	log.warn("--Debbug-- var NextsequenceId: " + nextSequenceId)
	log.warn("--Debbug-- var numProces: " + numProces)
	log.warn("--Debbug-- var sequenceId: " + sequenceId)
	log.warn("--Debbug-- var colleagueId: " + colleagueId);
	var nome = getUsuario(colleagueId);
	var problema = hAPI.getCardValue("parecer");
	hAPI.setCardValue('idSolicitacao', numProces);
	
	// Inicio pelo Cadastro de Cliente 	
	if (nextSequenceId == 8 && hAPI.getCardValue("solicitacaoFluig") == 'S') {
		var codProtheus = hAPI.getCardValue('codCliente');
		var lojaCliente = hAPI.getCardValue('lojaCliente');
		log.warn("--Debbug-- var codProtheus: " + codProtheus);
		log.warn("--Debbug-- var lojaCliente: " + lojaCliente);
		var constraints = new Array();
		
		var tipoSolicitacao = hAPI.getCardValue('tipoSolicitacao');
		
		log.warn("--Debbug-- var tipoSolicitacao: " + tipoSolicitacao);
		
		var c1 = DatasetFactory.createConstraint('CCODIGO', codProtheus+lojaCliente, codProtheus+lojaCliente,ConstraintType.MUST);
			constraints.push(c1);
		
		var cliente = DatasetFactory.getDataset("dsConsultaCliente", null,constraints, null);

		if (cliente.rowsCount > 0) {
			if (cliente.getValue(0, "CODRETORNO") == 'OK') {
				hAPI.setCardValue('A2BAIRRO', cliente.getValue(0, "CBAIRRO"));
				//hAPI.setCardValue('filialCliente', '');
				//hAPI.setCardValue('lojaCliente', '');
				hAPI.setCardValue('A2CEP', cliente.getValue(0, "CCEP"));
				hAPI.setCardValue('codCliente', cliente.getValue(0, "CCODIGO"));		
				hAPI.setCardValue('A2CODMUN', cliente.getValue(0, "CCODMUN"));
				hAPI.setCardValue('A2CONTATO1', cliente.getValue(0, "CCONTATO1"));
				hAPI.setCardValue('A2CONTATO2', cliente.getValue(0, "CCONTATO2"));
				hAPI.setCardValue('A2CONTATO3', cliente.getValue(0, "CCONTATO3"));
				hAPI.setCardValue('A2CONTATO4', cliente.getValue(0, "CCONTATO4"));
				hAPI.setCardValue('cpfCliente', cliente.getValue(0, "CCPFCNPJ"));
				hAPI.setCardValue('A2DDD1', cliente.getValue(0, "CDDD1"));
				hAPI.setCardValue('A2DDD2', cliente.getValue(0, "CDDD2"));
				hAPI.setCardValue('A2DDD3', cliente.getValue(0, "CDDD3"));
				hAPI.setCardValue('A2DDD4', cliente.getValue(0, "CDDD4"));
				hAPI.setCardValue('A2END', cliente.getValue(0, "CENDERECO"));
				hAPI.setCardValue('A2NREDUZ', cliente.getValue(0, "CFANTASIA"));
				hAPI.setCardValue('A2CFILCLI', cliente.getValue(0, "CFILCLI"));
				hAPI.setCardValue('A2CLOJA', cliente.getValue(0, "CLOJA"));
				hAPI.setCardValue('A2MUN', cliente.getValue(0, "CMUNICIPIO"));
				hAPI.setCardValue('A2NOME', cliente.getValue(0, "CRAZAO"));
				hAPI.setCardValue('A2EST', cliente.getValue(0, "CSIGLAESTADO"));
				hAPI.setCardValue('A2TELEFONE1', cliente.getValue(0, "CTELEFONE1"));
				hAPI.setCardValue('A2TELEFONE2', cliente.getValue(0, "CTELEFONE2"));
				hAPI.setCardValue('A2TELEFONE3', cliente.getValue(0, "CTELEFONE3"));
				hAPI.setCardValue('A2TELEFONE4', cliente.getValue(0, "CTELEFONE4"));
				
				var tipoSolicCadastro = ''+hAPI.getCardValue('tipoSolicCadastro');
				
				hAPI.setCardValue('tipoSolicCadastro', tipoSolicCadastro.substr(0, 1));
				hAPI.setCardValue('idSolicCadastro', tipoSolicCadastro.substr(1, tipoSolicCadastro.length-1));
				
			}
		}
	}
	
// Atividade Aprovar Gerencia	
	if (nextSequenceId == 6) {
    	var status = 'Inicio: Enviado para Aprovação Gerência.';
    	var problema = 'Tipo de Solicitação: '+ hAPI.getCardValue('tipoSolicitacao');
    	addfilho(nome, problema, status);
	} else {
//Atv Aprovação Gerência
	if ( nextSequenceId == 9 ) {
		var status = hAPI.getCardValue("aprovado")
    	var texto = 'Aprovação Gerência: ' + status+'.';
    	addfilho(nome, problema, texto);
    } else {
//Atv Gerar solicitação de patrimonio - Protheus    	
	if ( nextSequenceId == 11 ) {
    	var texto = 'Enviado para Gerar Solicitação Patrimonio - Protheus.';
    	addfilho(nome, problema, texto);
    } else {
//Atv Gerar solicitação de patrimonio - Protheus    	
	if ( nextSequenceId == 5 && sequenceId == 41) {
		var status = hAPI.getCardValue("aprovado")
    	var texto = 'Aprovação Patrimonio: ' + status+'.';
    	addfilho(nome, problema, texto);
    } else {
    	
	//Atv Fim / Fim Cancelamento    	
	if ( nextSequenceId == 34 || nextSequenceId == 36) {
		var status = hAPI.getCardValue("confirmado")
    	var texto = 'Confirmação Execuação: ' + status+'.';
		var problema = hAPI.getCardValue("parecerConf");
    	addfilho(nome, problema, texto);
    }	
    }
	}
	}
	}
}
/**
 *	funcao para pegar o nome do usuario 
 * @param user
 * @returns
 */
function getUsuario(user) {

	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user,user, ConstraintType.MUST);
	var datasetUser = DatasetFactory.getDataset("colleague", null, [ c1 ], null);
	var colleague = '';
	if (datasetUser.rowsCount > 0) {
		colleague =  datasetUser.getValue(0, "colleagueName");
	}
	return colleague;
}

/**
 * Rotina de adição de tabela de histórico
 * @param nome
 * @param problema
 * @param status
 * @returns
 */
function addfilho(nome, problema, status) {
	var today = new Date();
	var year = today.getFullYear();
	var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1)	: (today.getMonth() + 1);
	var day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
	var hour = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
	var minute = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
	var second = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();
	var currentHour = hour + ":" + minute + ":" + second;
	var currentDate = day + '/' + month + '/' + year;
	var currentTime = currentDate + "  " + currentHour;
	
    var childData = new java.util.HashMap();
    
    childData.put("histUsuario", nome);
    childData.put("histData", currentTime);
    childData.put("histStatus", status);
    childData.put("histInt", problema);
	hAPI.addCardChild('tableHistorico', childData);
}