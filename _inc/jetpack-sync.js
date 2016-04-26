/* global ajaxurl */

window.JetpackSyncStatus = ( function() {
	function render_progress( selector, state ) {
		jQuery(selector).html( '<h2>Queue Size: <strong>'+state.size+'</strong></h2><h2>Lag: <strong>'+state.lag+'</strong> seconds</h2>' );
	}

	function set_auto_refresh( selector, timeout ) {
		setTimeout( function() {
			fetch_state().done( function( new_state ) {
				render_progress( selector, new_state );
			} );
			set_auto_refresh( selector, timeout );
		}, timeout );
	}

	function fetch_state() {
		return jQuery.getJSON(
			ajaxurl,
			{ action:'jetpack-sync-queue-status' }
		);
	}

	return {
		init: function( selector, initial_state ) {
			render_progress( selector, initial_state );
			set_auto_refresh( selector, 2000 );
		}
	}
} )();

window.JetpackFullSyncButton = ( function() {

	function begin_full_sync() {
		return jQuery.getJSON(
			ajaxurl,
			{ action:'jetpack-sync-begin-full-sync' }
		);
	}

	return {
		init: function( selector ) {
			jQuery( selector ).click( function() {
				begin_full_sync();
			} );
		}
	}
} )();