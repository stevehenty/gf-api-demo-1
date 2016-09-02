<?php

GFForms::include_addon_framework();

class GF_Web_Api_Demo_1 extends GFAddOn {

	protected $_version = '1.0';
	protected $_min_gravityforms_version = '1.9';
	protected $_slug = 'gravityformswebapidemo1';
	protected $_full_path = __FILE__;
	protected $_url = 'http://www.gravityforms.com';
	protected $_title = 'Gravity Forms Web API Demo 1';
	protected $_short_title = 'Web API Demo 1';

	private static $_instance = null;

	// Set this to use an existing form
	private $form_id = null;


	public static function get_instance() {
		if ( self::$_instance == null ) {
			self::$_instance = new GF_Web_Api_Demo_1();
		}

		return self::$_instance;
	}

	// Enqueue the JavaScript and output the root url and the nonce.
	public function scripts() {
		$scripts = array(
			array(
				'handle'  => 'gf_web_api_demo_1',
				'src'     => $this->get_base_url() . '/js/gf-web-api-demo-1.js',
				'deps'    => array( 'jquery' ),
				'version' => $this->_version,
				'enqueue' => array(
					array( 'query' => 'page=gravityformswebapidemo1' ),
				),
				'strings' => array(
					'root_url'    => site_url() . '/wp-json/gf/v2/',
					'nonce'       => wp_create_nonce( 'wp_rest' ),
				),
			),
		);

		return array_merge( parent::scripts(), $scripts );
	}

	public function plugin_page() {

		$sample_form_exists = ! empty( $this->form_id );

		if ( ! $sample_form_exists ) {
			$sample_form_json = file_get_contents( $this->get_base_path() . '/sample-form.json' );
			?>
			<div id="demo_step_1">
				<p>
					Sample Form Object
				</p>
				<textarea id="sample_form" rows="10" cols="100"><?php echo $sample_form_json; ?></textarea><br />
				<button id="create_form_button" class="button button-primary button-large">Create New Form</button>
			</div>
			<?php
		}
		?>
		<div id="demo_step_2" style="<?php echo ! $sample_form_exists ? 'display:none;' : ''; ?>">
			<div>
				Form ID: <input id="form_id" type="text" value="<?php echo $this->form_id ?>"/>
			</div>

			Submit Form
			<form id="gf_web_api_demo_form">
				<input id="input_1" name="input_1" type="text" placeholder="Name"/><br/>
				<input id="input_2" name="input_2" type="text" placeholder="Email"/><br/>
				<input id="input_3_1" type="radio" name="input_3" value="Information request"/>
				<label for="input_3_1">I'd like further information about a product</label><br/>
				<input id="input_3_2" type="radio" class="input_3" name="input_3" value="Complaint"/>
				<label for="input_3_2">I wish to make a complaint</label><br/>
				<input id="input_3_3" type="radio" class="input_3" name="input_3" value="Commercial offer"/>
				<label for="input_3_3">I'm going to try to sell you something</label><br/>
				<input id="input_3_4" type="radio" class="input_3" name="input_3" value="Just saying hello"/>
				<label for="input_3_4">I'm an old friend</label><br/>
				<label for="input_4">Message</label><br/>
				<textarea id="input_4" name="input_4"></textarea><br/>
				<input name="input_5" type="file" />
			</form>
			<div>
				<button id="submit_button" class="button button-primary button-large">Submit Form</button>

				<button id="get_entries_button" class="button button-primary button-large">Show Latest Entries
				</button>

				<button id="filter_entries_button" class="button button-primary button-large">Show complaints
				</button>

				<button id="get_results_button" class="button button-primary button-large">Get Results
				</button>

			</div>

			&nbsp;
			<span id="sending" style="display:none;">
				Sending...
			</span>
			<br/><br/>

			<textarea id="response" rows="30" cols="100"></textarea>
		</div>
	<?php
	}


} // end class
