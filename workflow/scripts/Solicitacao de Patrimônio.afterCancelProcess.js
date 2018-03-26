function afterCancelProcess(colleagueId,processId){
	
	var sequenceId = getValue("WKCurrentState");
	var numProces = getValue("WKNumProces");
	log.warn("--Debbug-- Cadastro de Cliente - Cancelar");
	log.warn("--Debbug-- var NextsequenceId: " + nextSequenceId)
	log.warn("--Debbug-- var processId: " + processId)
	log.warn("--Debbug-- var colleagueId: " + colleagueId);
	var nome = getUsuario(colleagueId);
	
	var problema = getValue("WKUserComment");
	log.warn("--Debbug-- var problema : " + problema);
	var status = 'Cancelado';
	var texto = 'Cancelado pelo usuario '+nome+'.';
	addfilho(nome, problema, texto);
	
}

//funcao para pegar o nome do usuario
function getUsuario(user) {

	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user,user, ConstraintType.MUST);
	var datasetUser = DatasetFactory.getDataset("colleague", null, [ c1 ], null);
	var colleague = '';
	if (datasetUser.rowsCount > 0) {
		colleague =  datasetUser.getValue(0, "colleagueName");
	}
	return colleague;
}

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
