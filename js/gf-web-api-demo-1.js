(function (GFWebApiDemo1, $) {

    var apiVars, $sending, $results, formId, url;

    $(document).ready(function () {

        // get globals
        apiVars = gf_web_api_demo_1_strings;

        $sending = $("#sending");
        $results = $("#response");


        $('#create_form_button').click(function () {
            url = apiVars['root_url'] + 'forms?_wpnonce=' + apiVars['nonce'];
            createForm( url );
        });

        $('#submit_button').click(function () {
            formId = $('#form_id').val();
            var url = apiVars['root_url'] + 'forms/' + formId +  '/submissions?_wpnonce=' + apiVars['nonce'];
            submitForm( url );
        });

        $('#get_entries_button').click(function () {
            formId = $('#form_id').val();
            var url = apiVars['root_url'] + 'forms/' + formId +  '/entries?_wpnonce=' + apiVars['nonce'];
            getEntries(url);
        });

        $('#filter_entries_button').click(function () {
            formId = $('#form_id').val();
            var url = apiVars['root_url'] + 'forms/' + formId +  '/entries?_wpnonce=' + apiVars['nonce'];

            var search = {
                field_filters : [
                    {
                        key: '3',
                        value: 'Complaint',
                        operator: 'is'
                    }
                ]
            };
            url += '&search=' + JSON.stringify(search);
            getEntries(url);
        });

        $('#get_results_button').click(function () {
            formId = $('#form_id').val();
            var url = apiVars['root_url'] + 'forms/' + formId +  '/results?_wpnonce=' + apiVars['nonce'];
            getResults(url);
        });

    });

    function createForm(url){
        var formJSON = $('#sample_form').val();
        $.ajax({
            url: url,
            type: 'POST',
            data: formJSON,
			contentType: "application/json",
			beforeSend: function (xhr, opts) {
				$sending.show();
			}
        })
        .done(function (data, textStatus, xhr) {
			$sending.hide();
            // The response contains a Form ID.
            $('#form_id').val(data);
            $('#demo_step_1').hide();
            $('#demo_step_2').show();
        })
    }

	function submitForm(url){
		var form = document.getElementById('gf_web_api_demo_form');
		var fd = new FormData(form);
		//fd.append( 'file', form.files[0] );

		$.ajax({
			url: url,
			data: fd,
			processData: false,
			contentType: false,
			type: 'POST',
			success: function(data){
				$sending.hide();
				var response = JSON.stringify(data, null, '\t');
				$results.val(response);
			}
		});
	}

    function getEntries(url){
        $.ajax({
            url: url,
            type: 'GET',
            beforeSend: function (xhr, opts) {
                $sending.show();
            }
        })
        .done(function (data, textStatus, xhr) {
            $sending.hide();
            var response = JSON.stringify(data, null, '\t');
            $results.val(response);
        })
    }

    function getResults(url){
        $.ajax({
            url: url,
            type: 'GET',
            beforeSend: function (xhr, opts) {
                $sending.show();
            }
        })
        .done(function (data, textStatus, xhr) {
            $sending.hide();
            var response = JSON.stringify(data, null, '\t');
            $results.val(response);
        })
    }

}(window.GFWebApiDemo1 = window.GFWebApiDemo1 || {}, jQuery));
