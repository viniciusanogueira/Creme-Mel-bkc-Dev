function Inicio() {
	
	var atividade = WKNumState;
	//var processo = WKNumProces;
	console.log('atividade: '+atividade);	
	
	var aper = mobile=='S'? 'none' : 'block';
	$('#divLogo').css('display', aper);
	
	if ($('#solicitacaoFluig').val() == 'S' && $('#tipoSolicitacao').val() != 'INCLUSAOTRANSFERENCIA') {
		$('#tipoSolicitacao option[value=INCLUSAOTRANSFERENCIA]').attr('disabled', true);
	}
	
/**
 * Atividade Inicio
 **/ 
	if	(atividade == 04 || atividade == 01 || atividade == 00 || atividade == 05)  {
		addCamposObrigatorio('#fsDadosPesquisa');
		addCamposObrigatorio('#divMarca');
		if ($('#A2PESSOAX').val() != 'X') {
			$('#fsHistorico').css('display', 'block');
			$('#divMarca').css('display', 'block')
			$('#fsDadosPesquisa').css('display', 'block');
			$('#fsDadosPesquisaCliente').css('display', 'none');
			$('#tipoSolicitacao').change();
			$('#justificativa').val() == '' ? $('#divJustificativa').css('display', 'none') : $('#divJustificativa').css('display', 'block');
		}
	} else {
		$('#divMarca').css('display', 'block')
		$('select#empresa option:not(:selected)').prop('disabled', true);
		$('#empresa').attr('readonly', true);
		$('#tipoSolicitacao').change();
		$('#fsHistorico').css('display', 'block');
		$('#justificativa').val() == '' ? $('#divJustificativa').css('display', 'none') : $('#divJustificativa').css('display', 'block');
		$('#A2PESSOAX').val('W');
		desabilitaCampos('#fsDadosPesquisa');
		desabilitaCampos('#divMarca');
		$('#fsDadosPesquisa').css('display', 'block');
		$('#fsDadosPesquisaCliente').css('display', 'none');
		$('.inputColor').removeClass('inputColor');
		$('#tipoSolicitacao option[selected=selected]').attr('disabled', false);
//*Aprovação Gerencia
	if	(atividade == 06)  {
		$('#fsDadosAprovacao').css('display', 'block');
		$('#divPatrimonio').css('display', 'none');
		$('#divPatrNovo').css('display', 'none');
	} else
//*Analise Patrimonio		
	if	(atividade == 10 || atividade == 12 || atividade == 28)  {
		$('#fsHistorico').css('display', 'block');
		$('#fsDadosAprovacao').css('display', 'block');
		$('#aprovado').val('..');
		$('#parecer').val('');
		if ($('#tipoSolicitacao').val() == 'TROCA' || $('#tipoSolicitacao').val() == 'INCLUSAO') {
			$('#divPatrimonio').css('display', 'block');
			$('#divPatrNovo').css('display', 'block');
			if (atividade == 28) {
				$('#fsDadosConfirmacao').css('display', 'block');
				$('#zoomPatrimonio').attr('readonly', true)
			} else {
				 $('#zoomPatrimonio').attr('readonly', false); 
				 $('#zoomFilialPatrimonio').attr('readonly', false);
			}
		} else {
			$('#divPatrimonio').css('display', 'none');
		}
	} else {
		 if (atividade == 38 || atividade == 56 || atividade == 58 || atividade == 60) {
			 $('#fsHistorico').css('display', 'block');
			 $('#divModelo').css('display', 'block');
			 $('#divJustificativa').css('display', 'block');
			 $('#divPatrCliente').css('display', 'block');
			 $('#divPatrNovo').css('display', 'block');
		 }
	}
	}
}
/**
 * Desabilita os campos da DIV
 * @param idcampo
 * @returns
 */
function desabilitaCampos(idcampo){

	$(idcampo).find("input, textarea, select").each(function(){
		$('#'+this.id).attr('readonly', true);
	})
	
	$(idcampo).find("select").each(function(){
		$('select#'+this.id+' option:not(:selected)').prop('disabled', true);
	})

	$(idcampo).find("input[type=checkbox]").each(function(){
		$('#' + this.id).prop('disabled', true);
	})

	$(idcampo).find("input[type=radio]").each(function(){
		$('#' + this.id).prop('disabled', true);
	})
	
	$(idcampo).find("button").each(function(){
		$('#' + this.id).prop('disabled', true);
	})
	
	$("#btnDtNasc").unbind('click');
	$('.fluigicon-trash').removeAttr('onclick');
}
/**
 * Função para habilitar DIV
 * @param idcampo
 * @returns
 */
function habilitaCampos(idcampo){

	$(idcampo).find("input, textarea, input[type=zoom], select").each(function(){
		$(this).attr("readonly", false);
	})

	$(idcampo).find("select").each(function(){
		$('select#' + this.id +' option').removeAttr('disabled');
	})
	
	$(idcampo).find("input[type=checkbox]").each(function(){
		$('#' + this.id).removeAttr('disabled');
	})
	$("#btnDtNasc").bind('click');
	
}

/**
 * Função para habilitar DIV
 * @param idcampo
 * @returns
 */
function addCamposObrigatorio(idcampo){

	$(idcampo).find("input, textarea, input[type=zoom], select").each(function(){
		if (!$(this).is('[readonly]')) {
			$(this).addClass('inputColor');
		}		
	});	
	
};

function removeCamposObrigatorio(idcampo){

	$(idcampo).find("input, textarea, input[type=zoom], select").each(function(){
		$(this).removeClass('inputColor');
	});

	$('.select2-selection').removeClass('inputColor');
};

function limparCampos(id){
	$("#"+id).find("input, textarea, select").each(function(){
		$(this).val("");
	})
}

$(document).ready(function(){

	$(".btn-pesq").on('click', function(){
		/*$('.btn-success').removeClass('btn-success');		
		var cliente = myLoading('Cadastro de Cliente', 'Aguarde enquanto pesquisa cliente.', 'consultaCliente', 'false', 'true');
		$('#divIncl').css('display', 'block');
		$('#fsDadosPesquisa').css('display', 'block');
		$('#fsDadosPesquisaCliente').css('display', 'none');
		$('#cpfCliente').val($("#cpfPessoaFisica").val());
		$('.select2-selection--multiple').addClass('inputColor');*/
		var atividade = WKNumState;
		if	(atividade == 04 || atividade == 01 || atividade == 00)  {
			$('input:not([type=radio],[type=hidden])').not('.pesq-pessoa').val('');
			$('.btn-sucess').removeClass('btn-sucess');		
			if ( ($('#codClientePesq').val() == null  || $('#codClientePesq').val() == ''  || $('#codClientePesq').val() == undefined) &&
				 ($('#cpfPessoaFisica').val() == null || $('#cpfPessoaFisica').val() == '' || $('#cpfPessoaFisica').val() == undefined)) {
				MensagemAlerta('Solicitação de Patrimonio', 'Favor informar o CPNJ/CPF do Cliente ou Código Protheus para Pesquisa.');
			} else {
				$('.btn-success').removeClass('btn-success');		
				var cliente = myLoading('Solicitação de Patrimonio', 'Aguarde enquanto pesquisa cliente.', 'consultaCliente', 'false', 'true');
			}
		}
	});
	
/*	$('#aprovado').on('change', function() {
		
		if ($('#tipoSolicitacao').val() == 'TROCA') {
			$('#divPatrimonio').css('display', 'block');
			
		} else {
			if ($('#tipoSolicitacao').val() == 'INCLUSAO') {
				$('#divModelo').css('display', 'block');
				$('#divPatrNovo').css('display', 'block');
			} else {
				$('#divPatrCliente').css('display', 'block');
			}
		}
	});		

/*	$('#tipoSolicitacao').on('change', function() {
		if (this.value == 'RETIRADA' || this.value == 'TROCA' || this.value == 'AJUSTE') {
			$('#divPatrCliente').css('display', 'block');
			$('#divModelo').css('display', 'none');
		} else {
			$('#divModelo').css('display', 'block');
			$('#divPatrCliente').css('display', 'none');
		}
	});		
	
/*	$(".pesq-pessoa").on('blur',function(){
		var atividade = WKNumState;
		if	(atividade == 04 || atividade == 01 || atividade == 00 || atividade == 05)  {
			$('.btn-sucess').removeClass('btn-sucess');		
			if (this.value == null || this.value == '' || this.value == undefined) {
				MensagemAlerta('Cadastro de Cliente', 'Favor informar o CPNJ/CPF do Cliente ou Código Protheus para Pesquisa.');
			} else {
				var cliente = myLoading('Cadastro de Cliente', 'Aguarde enquanto pesquisa cliente.', 'consultaCliente', 'false', 'false');
			}
		}
	});*/	
});
/**
 * Rotina ONChange do campo Tipo de Solicitação
 * @param valor - valor do tipo de solicitação
 * @returns
 */
function alteraDiv(valor) {
	$('#divJustificativa').css('display', 'block');
	if (valor == 'RETIRADA') {
		$('#divPatrCliente').css('display', 'block');
		$('#divModelo').css('display', 'none');
		$('#divPatrNovo').css('display', 'none');
	} else {
		if  (valor == 'TROCA') {
			$('#divPatrCliente').css('display', 'block');
			$('#divModelo').css('display', 'block');
			$('#divPatrNovo').css('display', 'none');
		} else {
			$('#divPatrNovo').css('display', 'none');
			$('#divModelo').css('display', 'block');
			$('#divPatrCliente').css('display', 'none');
		}
	}
};	

/**
 * Rotina para consulta de Fornecedor
 * @param valor - CPF/CNPJ
 * @returns
 */
function consultaCliente() {
	
	if ($('#cpfCliente').val() != '' || $('#codCliente').val() != '') {
		var cpfCNPJ = $('#cpfCliente').val().replace(/[^\d]+/gi,'');
		var codProtheus = $('#codCliente').val().replace(/[^\d]+/gi,'');
	} else{
		var cpfCNPJ = $('#cpfPessoaFisica').val().replace(/[^\d]+/gi,'');
		var codProtheus =  $('#codClientePesq').val().replace(/[^\d]+/gi,'');
	}

	var constraints = new Array();
	
	if (cpfCNPJ != '') {
		var c2 = DatasetFactory.createConstraint('CCPFCNPJ', cpfCNPJ, cpfCNPJ, ConstraintType.MUST);
		constraints.push(c2);
	} else {	
	if (codProtheus != '') {
		var c1 = DatasetFactory.createConstraint('CCODIGO', codProtheus, codProtheus,ConstraintType.MUST);
		constraints.push(c1);
	}
	}
	
	var cliente = DatasetFactory.getDataset("dsConsultaCliente", null,constraints, null);

	if (cliente.values.length > 0) {
		if (cliente.values[0].CODRETORNO == 'OK') {
			$('#A2BAIRRO').val(cliente.values[0].CBAIRRO);
			$('#filialCliente').val(cliente.values[0].CFILCLI);
			$('#lojaCliente').val(cliente.values[0].CLOJA);
			$('#A2CEP').val(cliente.values[0].CCEP);
			$('#codCliente').val(cliente.values[0].CCODIGO);		
			$('#A2CODMUN').val(cliente.values[0].CCODMUN);
			$('#A2CONTATO1').val(cliente.values[0].CCONTATO1);
			$('#A2CONTATO2').val(cliente.values[0].CCONTATO2);
			$('#A2CONTATO3').val(cliente.values[0].CCONTATO3);
			$('#A2CONTATO4').val(cliente.values[0].CCONTATO4);
			//$('#A2CONTATO5').val(cliente.values[0].CCONTATO5);
			if ($("#cpfPessoaFisica").val() != '' && $("#cpfPessoaFisica").val() != undefined) {
				$('#cpfCliente').val($("#cpfPessoaFisica").val());
			} else {
				$('#cpfCliente').val(cliente.values[0].CCPFCNPJ);
			}
			
			$('#A2DDD1').val(cliente.values[0].CDDD1);
			$('#A2DDD2').val(cliente.values[0].CDDD2);
			$('#A2DDD3').val(cliente.values[0].CDDD3);
			$('#A2DDD4').val(cliente.values[0].CDDD4);
			//$('#A2DDD1').val(cliente.values[0].CDDD5);
			$('#A2END').val(cliente.values[0].CENDERECO);
			$('#A2NREDUZ').val(cliente.values[0].CFANTASIA);
			$('#A2COMPL').val(cliente.values[0].CCOMPLEM);
			$('#A2MUN').val(cliente.values[0].CMUNICIPIO);
			$('#A2NOME').val(cliente.values[0].CRAZAO);
			$('#A2EST').val(cliente.values[0].CSIGLAESTADO);
			$('#A2TELEFONE1').val(cliente.values[0].CTELEFONE1);
			$('#A2TELEFONE2').val(cliente.values[0].CTELEFONE2);
			$('#A2TELEFONE3').val(cliente.values[0].CTELEFONE3);
			$('#A2TELEFONE4').val(cliente.values[0].CTELEFONE4);
			//$('#A2TELEFONE5').val(cliente.values[0].CTELEFONE5
			/*cliente.values[0].CWHATSAPP1
			cliente.values[0].CWHATSAPP2
			cliente.values[0].CWHATSAPP3
			cliente.values[0].CWHATSAPP4
			cliente.values[0].CWHATSAPP5*/
			if (cliente.values[0].CPESSOA == 'F') {
				$('#A2PESSOA1').attr('checked', true)
				$('#A2PESSOA2').attr('checked', false)
				var data = cliente.values[0].DDTNASC;
				$('#dtNasc').val(data.split('-').reverse().join('/'));
			} else {
				$('#A2PESSOA1').attr('checked', false);
				$('#A2PESSOA2').attr('checked', true);
			}
			$(".modal-footer").find("button").attr("disabled",false);
			
			$('.select2-selection--multiple').addClass('inputColor');
			$('#fsDadosPesquisa').css('display', 'block');
			$('#fsDadosPesquisaCliente').css('display', 'none');

			var filtro = "CCODIGO,";
			
			if ($('#codClientePesq').val() == '' ) {
				filtro += cliente.values[0].CCODIGO + '01';
			} else {
				filtro += $('#codClientePesq').val();
			}
			reloadZoomFilterValues("zoomPatrimonioCliente", filtro);
			$('#divMarca').css('display', 'block');
			
		} else {
			$(".modal-body").text('Cliente não encontrado.');
			autoClose = false;
			$(".modal-footer").find("button").attr("disabled",false);
		}

	} else {
		$(".modal-body").text('Cliente não encontrado.');
		autoClose = false;
		$(".modal-footer").find("button").attr("disabled",false);
	}
}

