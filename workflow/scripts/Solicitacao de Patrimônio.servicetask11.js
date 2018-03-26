function servicetask11(attempt, message) {
	
	log.warn("--Debbug-- Solicitacao de Patrimonio - incluir: ");
	var numProces = getValue("WKNumProces");

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

	var acao = hAPI.getCardValue('tipoSolicitacao');
	
	var CCODCLI = hAPI.getCardValue('codCliente')+hAPI.getCardValue('lojaCliente');
	log.warn("--Debbug-- CCODCLI: " +CCODCLI);
	var CPLAQUETA = hAPI.getCardValue('CPLAQUETA');
	log.warn("--Debbug-- CPLAQUETA: " +CPLAQUETA);
	var CCONTFIL = hAPI.getCardValue('CCODFILPATR');
	log.warn("--Debbug-- CCONTFIL: " +CCONTFIL);
	var CTIPOSOL = ''+hAPI.getCardValue('tipoSolicitacao');
	var CTIPOCAD = ''+hAPI.getCardValue('tipoSolicCadastro');
	var CIDFLUIGCADASTRO = ''+hAPI.getCardValue('idSolicCadastro');
	
	var CIDFLUIG = numProces;
	var CMATFLUIG = hAPI.getCardValue('matriculaSolicitante');
	var CUSRFLUIG = hAPI.getCardValue('idSolicitante');
    var data = ""+hAPI.getCardValue('dataAbertura');
    data = data.split(' ');
    var CDATASOLIC = data[0].split('/').reverse().join('');        
    log.warn("--Debbug-- CTIPOCAD: " +CTIPOCAD);
    log.warn("--Debbug-- CTIPOSOL: " +CTIPOSOL);
    log.warn("--Debbug-- acao: " +acao);
	if (acao == 'INCLUSAO' || acao == 'INCLUSAORETIRADA') {
		var listaCliente = ServiceManager.getService('WSZFLUIG');
		log.warn("--Debbug-- listaCliente: " +listaCliente);
	//    var serviceHelper = listaEmpresas.getBean();
	    var serviceLocator = listaCliente.instantiate('_217._157._168._192._8085.ZFLUIGCLIENTES');
		log.warn("--Debbug-- serviceLocator: " +serviceLocator);
	    var service = serviceLocator.getZFLUIGCLIENTESSOAP();

		try {
			var result = service.inclusaopatrimonio(CCODCLI, CCONTFIL, CPLAQUETA, CTIPOSOL, CTIPOCAD, CIDFLUIG, CIDFLUIGCADASTRO, CUSRFLUIG, CMATFLUIG, CDATASOLIC) ;
			log.warn("--Debbug-- result: " +result);
			if (result.getCSITUACAO() == '1') {
				log.warn("--Debbug-- result.CCONTRATO: " +result.getCCONTRATO());
				log.warn("--Debbug-- result.CMSN: " +result.getCMSN());
				log.warn("--Debbug-- result.CPEDIDO: " +result.getCPEDIDO());
				
				hAPI.setCardValue('CCONTRATO', result.getCCONTRATO());
				hAPI.setCardValue('CPEDIDO', result.getCPEDIDO());
				hAPI.setCardValue('CCONTFIL', result.getCCODFILIAL());
				hAPI.setCardValue('CADITIVO', result.getCADITIVO());
			    var childData = new java.util.HashMap();
			    childData.put("histUsuario", 'Fluig');
			    childData.put("histData", currentTime);
			    childData.put("histStatus", 'Inclusão de Patrimonio incluido com Sucesso!');
			    childData.put("histInt", result.getCMSN());
			    log.warn("--Debbug-- tableHistorico: "+childData);
				var retornoPaiFilho = hAPI.addCardChild('tableHistorico', childData);
				log.warn("--Debbug-- retornoPaiFilho: "+retornoPaiFilho);
				hAPI.setCardValue('confirmado', 'Sim');
				return true;
			} else {
			    var childData = new java.util.HashMap();
			    childData.put("histUsuario", 'Fluig');
			    childData.put("histData", currentTime);
			    childData.put("histStatus", 'Corrigir Erro');
			    childData.put("histInt", result.getCMSN());
			    log.warn("--Debbug-- tableHistorico: "+childData);
				var retornoPaiFilho = hAPI.addCardChild('tableHistorico', childData);
				log.warn("--Debbug-- retornoPaiFilho: "+retornoPaiFilho);
				hAPI.setCardValue('confirmado', 'Nao');
				return true;
				//throw 'Erro na geração da Solicitação de Patrimonio: '+result.getCMSN()+'. Favor verificar.';
				
			}		
		} catch(erro) {
			log.warn("--Debbug-- erro: " +erro);
			log.warn("--Debbug-- erro --linha: " +erro.lineNumber);
		    var childData = new java.util.HashMap();
		    childData.put("histUsuario", 'Fluig');
		    childData.put("histData", currentTime);
		    childData.put("histStatus", 'Corrigir Erro');
		    childData.put("histInt", erro.message);
		    log.warn("--Debbug-- tableHistorico: "+childData);
			var retornoPaiFilho = hAPI.addCardChild('tableHistorico', childData);
			log.warn("--Debbug-- retornoPaiFilho: "+retornoPaiFilho);
			hAPI.setCardValue('confirmado', 'Nao');
			return true;
			//throw 'Erro na geração da Solicitação de Patrimonio: '+erro.message+'. Favor verificar.';
			}	
	} else {
		if (acao == 'RETIRADA') {
			var CCONTFIL = hAPI.getCardValue('CCONTFILPATR');
			log.warn("--Debbug-- CCONTFIL: " +CCONTFIL);
			var CPLAQUETA = hAPI.getCardValue('CCPLAQUETACLIENTE');
			var CCONTCMD = hAPI.getCardValue('CCONTRATOPATR');
			var CCONTADITI = hAPI.getCardValue('CADITIVOPATR');
			var listaCliente = ServiceManager.getService('WSZFLUIG');
			log.warn("--Debbug-- listaCliente: " +listaCliente);
		//    var serviceHelper = listaEmpresas.getBean();
		    var serviceLocator = listaCliente.instantiate('_217._157._168._192._8085.ZFLUIGCLIENTES');
			log.warn("--Debbug-- serviceLocator: " +serviceLocator);
		    var service = serviceLocator.getZFLUIGCLIENTESSOAP();

			try {
				var result = service.retiradapatrimonio(CCODCLI, CCONTFIL, CCONTCMD, CCONTADITI, CPLAQUETA, CTIPOSOL, CTIPOCAD, CIDFLUIG, CIDFLUIGCADASTRO, CUSRFLUIG, CMATFLUIG, CDATASOLIC) ;
				log.warn("--Debbug-- result: " +result);
				if (result.getCSITUACAO() == '1') {
					log.warn("--Debbug-- result.CCONTRATO: " +result.getCCONTRATO());
					log.warn("--Debbug-- result.CMSN: " +result.getCMSN());
					log.warn("--Debbug-- result.CADITIVO: " +result.getCADITIVO());	
				    var childData = new java.util.HashMap();
				    childData.put("histUsuario", 'Fluig');
				    childData.put("histData", currentTime);
				    childData.put("histStatus", 'Retirada de Patrimonio incluida com Sucesso!');
				    childData.put("histInt", result.getCMSN());
				    log.warn("--Debbug-- tableHistorico: "+childData);
					var retornoPaiFilho = hAPI.addCardChild('tableHistorico', childData);
					log.warn("--Debbug-- retornoPaiFilho: "+retornoPaiFilho);
					hAPI.setCardValue('confirmado', 'Sim');
					return true;
				} else {
				    var childData = new java.util.HashMap();
				    childData.put("histUsuario", 'Fluig');
				    childData.put("histData", currentTime);
				    childData.put("histStatus", 'Corrigir Erro');
				    childData.put("histInt", result.getCMSN());
				    log.warn("--Debbug-- tableHistorico: "+childData);
					var retornoPaiFilho = hAPI.addCardChild('tableHistorico', childData);
					log.warn("--Debbug-- retornoPaiFilho: "+retornoPaiFilho);
					hAPI.setCardValue('confirmado', 'Nao');
					return true;
					//throw 'Erro na geração da Solicitação de Patrimonio: '+result.getCMSN()+'. Favor verificar.';
				}		
			} catch(erro) {
				log.warn("--Debbug-- erro: " +erro);
				log.warn("--Debbug-- erro --linha: " +erro.lineNumber);
			    var childData = new java.util.HashMap();
			    childData.put("histUsuario", 'Fluig');
			    childData.put("histData", currentTime);
			    childData.put("histStatus", 'Corrigir Erro');
			    childData.put("histInt", erro.message);
			    log.warn("--Debbug-- tableHistorico: "+childData);
				var retornoPaiFilho = hAPI.addCardChild('tableHistorico', childData);
				log.warn("--Debbug-- retornoPaiFilho: "+retornoPaiFilho);
				hAPI.setCardValue('confirmado', 'Nao');
				return true;
				//throw 'Erro na geração da Solicitação de Patrimonio: '+erro.message+'. Favor verificar.';
				}
			
		} else {
			if (acao == 'TROCA') {
				var CCONTFIL = hAPI.getCardValue('CCONTFILPATR');
				log.warn("--Debbug-- CCONTFIL: " +CCONTFIL);
				var CPLAQUETA = hAPI.getCardValue('CCPLAQUETACLIENTE');
				var CCONTCMD = hAPI.getCardValue('CCONTRATOPATR');
				var CCONTADITI = hAPI.getCardValue('CADITIVOPATR');
				var listaCliente = ServiceManager.getService('WSZFLUIG');
				log.warn("--Debbug-- listaCliente: " +listaCliente);
			//    var serviceHelper = listaEmpresas.getBean();
			    var serviceLocator = listaCliente.instantiate('_217._157._168._192._8085.ZFLUIGCLIENTES');
				log.warn("--Debbug-- serviceLocator: " +serviceLocator);
			    var service = serviceLocator.getZFLUIGCLIENTESSOAP();

				try {
					var result = service.retiradapatrimonio(CCODCLI, CCONTFIL, CCONTCMD, CCONTADITI, CPLAQUETA, CTIPOSOL, CTIPOCAD, CIDFLUIG, CIDFLUIGCADASTRO, CUSRFLUIG, CMATFLUIG, CDATASOLIC) ;
					log.warn("--Debbug-- result: " +result);
					if (result.getCSITUACAO() == '1') {
						log.warn("--Debbug-- result.CCONTRATO: " +result.getCCONTRATO());
						log.warn("--Debbug-- result.CMSN: " +result.getCMSN());
						log.warn("--Debbug-- result.CADITIVO: " +result.getCADITIVO());	
					    var childData = new java.util.HashMap();
					    childData.put("histUsuario", 'Fluig');
					    childData.put("histData", currentTime);
					    childData.put("histStatus", 'Retirada de Patrimonio incluida com Sucesso!');
					    childData.put("histInt", result.getCMSN());
					    log.warn("--Debbug-- tableHistorico: "+childData);
						var retornoPaiFilho = hAPI.addCardChild('tableHistorico', childData);
						log.warn("--Debbug-- retornoPaiFilho: "+retornoPaiFilho);
					} else {
					    var childData = new java.util.HashMap();
					    childData.put("histUsuario", 'Fluig');
					    childData.put("histData", currentTime);
					    childData.put("histStatus", 'Corrigir Erro');
					    childData.put("histInt", result.getCMSN());
					    log.warn("--Debbug-- tableHistorico: "+childData);
						var retornoPaiFilho = hAPI.addCardChild('tableHistorico', childData);
						log.warn("--Debbug-- retornoPaiFilho: "+retornoPaiFilho);
						hAPI.setCardValue('confirmado', 'Nao');
						return true;
						//throw 'Erro na geração da Solicitação de Patrimonio: '+result.getCMSN()+'. Favor verificar.';
					}		
				} catch(erro) {
					log.warn("--Debbug-- erro: " +erro);
					log.warn("--Debbug-- erro --linha: " +erro.lineNumber);
				    var childData = new java.util.HashMap();
				    childData.put("histUsuario", 'Fluig');
				    childData.put("histData", currentTime);
				    childData.put("histStatus", 'Corrigir Erro');
				    childData.put("histInt", erro.message);
				    log.warn("--Debbug-- tableHistorico: "+childData);
					var retornoPaiFilho = hAPI.addCardChild('tableHistorico', childData);
					log.warn("--Debbug-- retornoPaiFilho: "+retornoPaiFilho);
					hAPI.setCardValue('confirmado', 'Nao');
					return true;
					//throw 'Erro na geração da Solicitação de Patrimonio: '+erro.message+'. Favor verificar.';
					}
				//***Inclusão do Patrimonio
				var CPLAQUETA = hAPI.getCardValue('CPLAQUETA');		
				log.warn("--Debbug-- CPLAQUETA: " +CPLAQUETA);
				var CCONTFIL = hAPI.getCardValue('CCODFILPATR');
				log.warn("--Debbug-- CCONTFIL: " +CCONTFIL);
				
				try {
					var result = service.inclusaopatrimonio(CCODCLI, CCONTFIL, CPLAQUETA, CTIPOSOL, CTIPOCAD, CIDFLUIG, CIDFLUIGCADASTRO, CUSRFLUIG, CMATFLUIG, CDATASOLIC) ;
					log.warn("--Debbug-- result: " +result);
					if (result.getCSITUACAO() == '1') {
						log.warn("--Debbug-- result.CCONTRATO: " +result.getCCONTRATO());
						log.warn("--Debbug-- result.CMSN: " +result.getCMSN());
						log.warn("--Debbug-- result.CPEDIDO: " +result.getCPEDIDO());
						
						hAPI.setCardValue('CCONTRATO', result.getCCONTRATO());
						hAPI.setCardValue('CPEDIDO', result.getCPEDIDO());
						hAPI.setCardValue('CCONTFIL', result.getCCODFILIAL());
						hAPI.setCardValue('CADITIVO', result.getCADITIVO());
					    var childData = new java.util.HashMap();
					    childData.put("histUsuario", 'Fluig');
					    childData.put("histData", currentTime);
					    childData.put("histStatus", 'Inclusão de Patrimonio incluido com Sucesso!');
					    childData.put("histInt", result.getCMSN());
					    log.warn("--Debbug-- tableHistorico: "+childData);
						var retornoPaiFilho = hAPI.addCardChild('tableHistorico', childData);
						log.warn("--Debbug-- retornoPaiFilho: "+retornoPaiFilho);
						hAPI.setCardValue('confirmado', 'Sim');
						return true;
					} else {
					    var childData = new java.util.HashMap();
					    childData.put("histUsuario", 'Fluig');
					    childData.put("histData", currentTime);
					    childData.put("histStatus", 'Corrigir Erro');
					    childData.put("histInt", result.getCMSN());
					    log.warn("--Debbug-- tableHistorico: "+childData);
						var retornoPaiFilho = hAPI.addCardChild('tableHistorico', childData);
						log.warn("--Debbug-- retornoPaiFilho: "+retornoPaiFilho);
						hAPI.setCardValue('confirmado', 'Nao');
						return true;
						//throw 'Erro na geração da Solicitação de Patrimonio: '+result.getCMSN()+'. Favor verificar.';
					}		
				} catch(erro) {
					log.warn("--Debbug-- erro: " +erro);
					log.warn("--Debbug-- erro --linha: " +erro.lineNumber);
				    var childData = new java.util.HashMap();
				    childData.put("histUsuario", 'Fluig');
				    childData.put("histData", currentTime);
				    childData.put("histStatus", 'Corrigir Erro');
				    childData.put("histInt", erro.message);
				    log.warn("--Debbug-- tableHistorico: "+childData);
					var retornoPaiFilho = hAPI.addCardChild('tableHistorico', childData);
					log.warn("--Debbug-- retornoPaiFilho: "+retornoPaiFilho);
					hAPI.setCardValue('confirmado', 'Nao');
					return true;
					//throw 'Erro na geração da Solicitação de Patrimonio: '+erro.message+'. Favor verificar.';
					}
			}			
		}
		return true;
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
