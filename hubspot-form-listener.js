window.addEventListener('message', function(event) {
	if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormReady') {
		window.dataLayer.push({
			event: 'hubspot-form-loaded',
			hsFormGuid: event.data.id,
			currentUrl: window.location.href,
		});
	}
	if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmit') {
		window.dataLayer.push({
			event: 'hubspot-form-submitting',
			hsFormGuid: event.data.id,
			currentUrl: window.location.href,
		});
	}
	if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmitted') {
		window.dataLayer.push({
			event: 'hubspot-form-success',
			hs_form_name: {{dlv - hs_form_name_api}},
			hs_form_guid: event.data.id,
			hs_form_conversionid: event.data.data.conversionId,
			hs_form_firstname: event.data.data.submissionValues.firstname,
			hs_form_lastname: event.data.data.submissionValues.lastname,
//		hs_form_email: event.data.data.submissionValues.email,
//		hs_form_phone: event.data.data.submissionValues.phone,
			hs_form_company: event.data.data.submissionValues.company,
			hs_form_url: window.location.href,
//		hs_form_dataset: event.data,
//		hs_form_fields: event.data.data,
//		hs_form_fields_sv: event.data.data.submissionValues,
		});
	}
	if({{Debug Mode}} === true){
		console.debug('hs ready');
	}
});
