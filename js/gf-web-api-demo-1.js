(function (GFWebApiDemo1, $) {

    var apiVars, $sending, $results, formId, url;

    $(document).ready(function () {

        // get globals
        apiVars = gf_web_api_demo_1_strings;

        $sending = $("#sending");
        $results = $("#response");


        $('#create_form_button').click(function () {
            url = apiVars['root_url'] + 'forms';
            createForm( url );
        });

        $('#submit_button').click(function () {
            formId = $('#form_id').val();
            var url = apiVars['root_url'] + 'forms/' + formId +  '/submissions';
            submitForm( url );
        });

        $('#get_entries_button').click(function () {
            formId = $('#form_id').val();
            var url = apiVars['root_url'] + 'forms/' + formId +  '/entries';
            getEntries(url);
        });

        $('#filter_entries_button').click(function () {
            formId = $('#form_id').val();
            var url = apiVars['root_url'] + 'forms/' + formId +  '/entries';

            var search = {
                field_filters : [
                    {
                        key: '3',
                        value: 'Complaint',
                        operator: 'is'
                    }
                ]
            };
            url += '?search=' + JSON.stringify(search);
            getEntries(url);
        });

        $('#get_results_button').click(function () {
            formId = $('#form_id').val();
            var url = apiVars['root_url'] + 'forms/' + formId +  '/results';
            getResults(url);
        });

    });

    function createForm(url){
        var formJSON = $('#sample_form').val();
		var form = JSON.parse( formJSON );
        $.ajax({
            url: url,
            type: 'POST',
            data: form,
			//contentType: "application/json",
			beforeSend: function (xhr, opts) {
				$sending.show();
				xhr.setRequestHeader('X-WP-Nonce', apiVars['nonce'] );
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

        var inputValues = {
            input_1: $('#input_1').val(),
            input_2: $('#input_2').val(),
            input_3: $('.input_3:checked').val(),
            input_4: $('#input_4').val()
        };

        var data = {
            input_values: inputValues
        };

        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(data),
			contentType: "application/json",
            beforeSend: function (xhr, opts) {
                $sending.show();
				xhr.setRequestHeader('X-WP-Nonce', apiVars['nonce'] );
            }
        })
        .done(function (data, textStatus, xhr) {
            $sending.hide();
            var response = JSON.stringify(data, null, '\t');
            $results.val(response);
        })
    }

    function getEntries(url){
        $.ajax({
            url: url,
            type: 'GET',
            beforeSend: function (xhr, opts) {
                $sending.show();
				xhr.setRequestHeader('X-WP-Nonce', apiVars['nonce'] );
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
				xhr.setRequestHeader('X-WP-Nonce', apiVars['nonce'] );
            }
        })
        .done(function (data, textStatus, xhr) {
            $sending.hide();
            var response = JSON.stringify(data, null, '\t');
            $results.val(response);
        })
    }

}(window.GFWebApiDemo1 = window.GFWebApiDemo1 || {}, jQuery));
