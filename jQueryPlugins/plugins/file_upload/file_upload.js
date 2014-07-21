/*
 *	作者：gao_st@126.com
 *	时间：2014-06-23
 *	描述：
 */
;!function (window, $, undefined) {
	$.fn.upload = function (opts) {
		var defs = {
			url: 'your_url_is_missing.php',
			callback: 'uploadCallback',
			hName: 'tmp_upload_file_names'
		};
		$.extend(defs, opts);		
		this.each(function () {
			var $this = $(this);
			$this.on('click', function () {
				if ( $('iframe[name=tmp_upload_iframe]').length < 1 ) {
					create();
				} else {
					$('input[name=tmp_upload_file]').trigger('click');
				}
			});
		});
		
		// $('input[name=tmp_upload_file]').on('change', function () {})
		$('body').on('change', 'input[name=tmp_upload_file]', function () {
			var $form = $('form[name=tmp_upload_form]');
			$form.submit();
			$form.html('<input name="tmp_upload_file" type="file" />');
		});
		
		function create () {
			$('<iframe name="tmp_upload_iframe" style="display: none;"></iframe>').appendTo('body');
			$('<form method="post" enctype="multipart/form-data" action="'+defs.url+'" name="tmp_upload_form" target="tmp_upload_iframe" style="display: none;"><input name="tmp_upload_file" type="file" /></form>').appendTo('body');
			$('<input type="hidden" name="'+defs.hName+'" />').appendTo("body");
			$('input[name=tmp_upload_file]').trigger('click');
		}
		
		function uploadCallback ( url ) {
			// alert(url)
			var tmpNames = $('input[name=tmp_upload_file_names]'),
				arr = [], val = tmpNames.val();
			val = $.trim(val).length > 0 ? val + '|' + url : url;
			tmpNames.val( val );
		}
		
		window[defs.callback] = window[defs.callback] || uploadCallback;
	}
}(window, jQuery);