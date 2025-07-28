// Source: https://www.analyticsmania.com/post/track-hubspot-forms-with-google-tag-manager-and-google-analytics-4/

window.dataLayer = window.dataLayer || [];

//listener for older version (v3) of HS forms
window.addEventListener('message', function(event) {
	if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmitted') {
		window.dataLayer.push({
			event: 'form_submission',
			form_id: event.data.id,
			conversion_id: event.data.data.conversionId,
			form_data: event.data.data.submissionValues,
		});
  }
});

//listener for v4 HS forms 
window.addEventListener("hs-form-event:on-submission:success", function(event) {
	var hsform = HubspotFormsV4.getFormFromEvent(event);
	if (hsform) {
		hsform.getFormFieldValues().then(function (fieldValues) {
			var transformedData = fieldValues.reduce(function (obj, item) {
				var key = item.name.split('/')[1];
				if (key) {
					obj[key] = item.value;
				}
				return obj;
			}, {});

			window.dataLayer.push({
				event: "form_submission",
				form_id: hsform.getFormId(),
				conversion_id: hsform.getConversionId(),
				form_data: transformedData
			});
		});
    }
  });