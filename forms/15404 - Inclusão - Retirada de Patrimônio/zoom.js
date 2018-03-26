/**
 * Função do leave do Zoom
 * @param selectedItem - Item selecionado
 */
function setSelectedZoomItem(selectedItem){

	if(selectedItem.inputId == 'zoomPatrimonio'){
		$('#CPLAQUETA').val(selectedItem.CPLAQUETA);
	}

	if(selectedItem.inputId == 'zoomModelo'){
		$('#codModelo').val(selectedItem.CCODIGO);
	}

	if(selectedItem.inputId == 'zoomPatrimonioCliente'){
		$('#CPLAQUETACLIENTE').val(selectedItem.CPLAQUETA);
		$('#CADITIVOPATR').val(selectedItem.CADITIVO);
		$('#CCONTRATOPATR').val(selectedItem.CCONTRATO);
		$('#CCONTFILPATR').val(selectedItem.CCODFILIAL);
		$('#CPEDIDOPATR').val(selectedItem.CPEDIDO);
	}
	
	if(selectedItem.inputId == 'zoomFilial') {
		$('#CCODFIL').val(selectedItem.CCODIGO);
	}

	if(selectedItem.inputId == 'zoomFilialCliente') {
		$('#CCCODFIL').val(selectedItem.CCODIGO);
	}

	if(selectedItem.inputId == 'zoomFilialPatrimonio') {
		$('#CCODFILPATR').val(selectedItem.CCODIGO);
		var filtro = "CCODFIL," +selectedItem.CCODIGO;
		reloadZoomFilterValues("zoomPatrimonio", filtro);
	}
	
}
/**
 * Função acionada ao eliminar uma tag(valor) de um campo zoom
 * @param removedItem
 * @returns
 */
function removedZoomItem(removedItem) {

//	setZoomData('filter_nomeAluno___'+row, itemSelected);
//	disabledZoomData('filter_nomeAluno___'+row, true);
	if(removedItem.inputId == 'zoomPatrimonioCliente'){
		$('#CCONTRATOPATR').val('');
		$('#CCONTFILPATR').val('');
		$('#CPEDIDOPATR').val('');
	}
}

/**
 * Setar valor em um zoom
 * @param instance - id do campo zoom
 * @param value - valor setado
 * @returns
 */
function setZoomData(instance, value){
	window[instance].setValue(value);
}

