function intermediateconditional38() {
	
	var numProces = getValue("WKNumProces");
	var cardId = getValue("WKCardId");

    log.warn("--Debbug-- Solicitação de Patrimonio - Evento Intermediario");
    log.warn("--Debbug-- numProces: "+numProces);
    log.warn("--Debbug-- cardId: "+cardId);

    var tipoSolicitacao = hAPI.getCardValue('tipoSolicitacao');
    var codProtheus = hAPI.getCardValue('codCliente');
    log.warn("--Debbug-- codProtheus: "+codProtheus);
    var lojaCliente = hAPI.getCardValue('lojaCliente');
    log.warn("--Debbug-- lojaCliente: "+lojaCliente);
    log.warn("--Debbug-- tipoSolicitacao: "+tipoSolicitacao);
    if (tipoSolicitacao == 'INCLUSAO' || tipoSolicitacao == 'TROCA') {
        var CCONTFIL = hAPI.getCardValue('CCONTFIL');
        log.warn("--Debbug-- CCONTFIL: "+CCONTFIL);
        var CCONTRATO = hAPI.getCardValue('CCONTRATO');
        log.warn("--Debbug-- CCONTRATO: "+CCONTRATO);
        var CCONTADITI = hAPI.getCardValue('CADITIVO');
        log.warn("--Debbug-- CCONTADITI: "+CCONTADITI);
    } else {
    	if (tipoSolicitacao == 'RETIRADA') {
            var CCONTFIL = hAPI.getCardValue('CCONTFILPATR');
            log.warn("--Debbug-- CCONTFIL: "+CCONTFIL);
            var CCONTRATO = hAPI.getCardValue('CCONTRATOPATR');
            log.warn("--Debbug-- CCONTRATO: "+CCONTRATO);
            var CCONTADITI = hAPI.getCardValue('CADITIVOPATR');
            log.warn("--Debbug-- CCONTADITI: "+CCONTADITI);
    	}
    }
	// *Obtendo dados do formulario
    var cst1 = DatasetFactory.createConstraint("CCODCLI", codProtheus+lojaCliente, codProtheus+lojaCliente, ConstraintType.MUST);
    var cst2 = DatasetFactory.createConstraint("CCONTFIL", CCONTFIL, CCONTFIL, ConstraintType.MUST);
    var cst3 = DatasetFactory.createConstraint("CCONTCMD", CCONTRATO, CCONTRATO, ConstraintType.MUST);    
    var cst4 = DatasetFactory.createConstraint("CCONTADITI", CCONTADITI, CCONTADITI, ConstraintType.MUST);
    var constraints = new Array(cst1, cst2, cst3, cst4);   
    var datasetPrincipal = DatasetFactory.getDataset("dsConsultaPatrimonioCMD", null, constraints, null);
    log.warn("--Debbug-- datasetPrincipal.rowsCount: " +datasetPrincipal.rowsCount);

    if (datasetPrincipal.rowsCount > 0 ) {
    	var status = datasetPrincipal.getValue(0, 'CSTATUSCMD');
    	log.warn("--Debbug-- tipoSolicitacao: " +tipoSolicitacao);
    	log.warn("--Debbug-- status: " +status);
    	if (tipoSolicitacao == 'INCLUSAO') {
        	if (status == '3'){
        		hAPI.setCardValue('confirmado', 'Sim');
    			addHistorico('Fluig', 'Confirmado.', 'Inclusão de Patrimonio: Contrato Ativo. Contrato: '+CCONTRATO+' Filial: '+CCONTFIL);
        		return true;
        	} else {
        		if (status == '7'){
        			hAPI.setCardValue('confirmado', 'Nao');
        			addHistorico('Fluig', 'Não Confirmado.', 'Inclusão de Patrimonio: Cancelado. Contrato: '+CCONTRATO+' Filial: '+CCONTFIL);
        			return true;
        		}
        	}
    	} else {
    		if (tipoSolicitacao == 'RETIRADA') {
            	if (status == '5'){
            		hAPI.setCardValue('confirmado', 'Sim');
            		addHistorico('Fluig', 'Confirmado.', 'Retirada de Patrimonio: Contrato Encerrado. Contrato: '+CCONTRATO+' Filial: '+CCONTFIL);
            		return true;
            	} else {
            		if (status == '6'){
            			hAPI.setCardValue('confirmado', 'Nao');
            			addHistorico('Fluig', 'Não Confirmado.', 'Retirada de Patrimonio: Encerrado por Aditivo. Contrato: '+CCONTRATO+' Filial: '+CCONTFIL);
            			return true;
            		}
    		}
    	} else{
    		if (tipoSolicitacao == 'TROCA') {
            	if (status == '3' || status == '7'){
            	    var CCONTFILRET = hAPI.getCardValue('CCONTFILPATR');
            	    var CCONTRATORET = hAPI.getCardValue('CCONTRATOPATR');
            	    var CCONTADITIRET = hAPI.getCardValue('CADITIVOPATR');
            	    log.warn("--Debbug-- CCONTFILRET: "+CCONTFILRET);
            	    log.warn("--Debbug-- CCONTRATORET: "+CCONTRATORET);
            	    log.warn("--Debbug-- CCONTADITIRET: "+CCONTADITIRET);
            		// *Obtendo dados do formulario
            	    var cst1 = DatasetFactory.createConstraint("CCODCLI", codProtheus+lojaCliente, codProtheus+lojaCliente, ConstraintType.MUST);
            	    var cst2 = DatasetFactory.createConstraint("CCONTFIL", CCONTFILRET, CCONTFILRET, ConstraintType.MUST);
            	    var cst3 = DatasetFactory.createConstraint("CCONTCMD", CCONTRATORET, CCONTRATORET, ConstraintType.MUST);    
            	    var cst4 = DatasetFactory.createConstraint("CCONTADITI", CCONTADITIRET, CCONTADITIRET, ConstraintType.MUST);
            	    var constraints = new Array(cst1, cst2, cst3, cst4);   
            	    var datasetPrincipal = DatasetFactory.getDataset("dsConsultaPatrimonioCMD", null, constraints, null);
            	    log.warn("--Debbug-- datasetPrincipal.rowsCount: " +datasetPrincipal.rowsCount);

            	    if (datasetPrincipal.rowsCount > 0 ) {
            	    	var statusRetirada = datasetPrincipal.getValue(0, 'CSTATUSCMD');
            	    	log.warn("--Debbug-- statusRetirada: "+statusRetirada);
	                	if (statusRetirada == '5'){
	                		hAPI.setCardValue('confirmado', 'Sim');
	                		addHistorico('Fluig', 'Confirmado.', 'Retirada de Patrimonio: Contrato Encerrado. Contrato: '+CCONTRATORET+' Filial: '+CCONTFILRET);
	                		if (status == '3') {
	                			addHistorico('Fluig', 'Confirmado.', 'Inclusão de Patrimonio: Contrato Ativo. Contrato: '+CCONTRATO+' Filial: '+CCONTFIL);
	                		} else {
	                			addHistorico('Fluig', 'Não Confirmado.', 'Inclusão de Patrimonio: Cancelado. Contrato: '+CCONTRATO+' Filial: '+CCONTFIL);
	                		}
	                		return true;	                		
	                	} else {
	                		 if (statusRetirada == '6') {
	                			addHistorico('Fluig', 'Não Confirmado.', 'Retirada de Patrimonio: Encerrado por Aditivo. Contrato: '+CCONTRATORET+' Filial: '+CCONTFILRET);
		                		if (status == '3') {
		                			addHistorico('Fluig', 'Confirmado.', 'Inclusão de Patrimonio: Contrato Ativo. Contrato: '+CCONTRATO+' Filial: '+CCONTFIL);
		 	                		hAPI.setCardValue('confirmado', 'Sim');
		                		} else {
		 	                		hAPI.setCardValue('confirmado', 'Nao');
		                			addHistorico('Fluig', 'Não Confirmado.', 'Inclusão de Patrimonio: Cancelado. Contrato: '+CCONTRATO+' Filial: '+CCONTFIL);
		                		}
		                		return true;	                		
	                		 }
	                	}
            	    } else {
            	    	hAPI.setCardValue('confirmado', 'Nao');
            	    	addHistorico('Fluig', 'Não Confirmado.', 'Cliente com Contrato: '+CCONTRATORET+' Filial: '+CCONTFILRET+' não encontrado');
            	    }            	    
            	}
    		}
    	}
    	}
    } else {
    	hAPI.setCardValue('confirmado', 'Nao');
    	addHistorico('Fluig', 'Não Confirmado.', 'Cliente com Contrato: '+CCONTRATO+' Filial: '+CCONTFIL+' não encontrado');
    	//return true;
    }
    //return true;
}

function addHistorico (usuario, status, interacao) {
	
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
    childData.put("histUsuario", usuario);
    childData.put("histData", currentTime);
    childData.put("histStatus", status);
    childData.put("histInt", interacao);
    log.warn("--Debbug-- tableHistorico: "+childData);
	hAPI.addCardChild('tableHistorico', childData);

	return;
}