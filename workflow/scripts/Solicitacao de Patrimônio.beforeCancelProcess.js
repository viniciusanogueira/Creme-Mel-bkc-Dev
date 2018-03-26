function beforeCancelProcess(colleagueId,processId){
	
	var sequenceId = getValue("WKCurrentState");

	log.warn("--Debbug-- Solicitação de Patrimonio- before cancel process");
	log.warn("--Debbug-- var sequenceId: " + sequenceId)
	log.warn("--Debbug-- var colleagueId: " + colleagueId);
	log.warn("--Debbug-- var processId: "+ processId);
	
	if (sequenceId != null && sequenceId != 5 && sequenceId != 6 && sequenceId != 9 && sequenceId != 10 && sequenceId != 41) {
		throw ('Não permitido o cancelamento dessa solicitação nesta atividade.');
	}
	
}