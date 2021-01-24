; // $Id$

$(function(){
	$('#firehose-sections').
		sortable({				// make sections sortable...
			axis: 'y',
			containment: '#links-sections',
			opacity: 0.8,
			update: saveFirehoseSectionMenu	// ...and save their new order
		});
});

function saveFirehoseSectionMenu(){
	// tell the server our current (ordered) list of sections
	ajax_update({
		op:	'firehose_save_section_menu',
		reskey:	reskey_static,
		fsids:	$('#firehose-sections > li').
				map(function(){
					return this.id.slice(10);	// slice off leading 'fhsection-'
				}).
				get().
				join(',')
	});
}

function firehose_delete_section(id,undo) {
	if (undo == undefined ) {
		undo = 0;
	}
	ajax_update({
		op:	'firehose_delete_section_menu',
		reskey:	reskey_static,
		undo:	undo,
		id: 	id
	});
}


function configSectionPopup() { 
	var title = "<a href=\"#\" onclick=\"window.location.reload()\" style=\"color:#fff;\">Sectional&nbsp;Display&nbsp;Prefs</a>&nbsp;";
	var buttons = createPopupButtons("<a href=\"/faq/UI.shtml#ui500\">[?]</a>","<a href=\"#\" onclick=\"window.location.reload()\">[X]</a>");
	title = title + buttons;
	createPopup(getXYForSelector('#links-sections-title'), title, "sectionprefs", "", "Loading...");
	
	var url = 'ajax.pl';
	var params = {};
	params['op'] = 'getSectionPrefsHTML';

	ajax_update(params, 'sectionprefs-contents');

}

function masterChange(el) {
	swapClassColors('secpref_master','secpref_nexus_row');
	updateNexusAllTidPrefs(el);
	//postSectionPrefChanges(el);	
}

function individualChange(el) {
	swapClassColors('secpref_nexus_row','secpref_master');
	//postSectionPrefChanges(el);	
}

function postSectionPrefChanges(el) {
	var params = {};
	params['op'] = 'setSectionNexusPrefs';
	params[el.name] = el.value;
	
	var sec_pref_msg = $dom("sectionprefs-message");
	sec_pref_msg.innerHTML = "Saving...";
	var url = 'ajax.pl';
	ajax_update(params, 'sectionprefs-message'); 
}

function swapClassColors(class_name_active, class_name_deactive) {
	for (i=0; i <document.getElementsByTagName("tr").length; i++) {
		if (document.getElementsByTagName("tr").item(i).className == class_name_active){
			document.getElementsByTagName("tr").item(i).style.color = "#000";
			document.getElementsByTagName("tr").item(i).style.background = "#fff";
		} else if (document.getElementsByTagName("tr").item(i).className == class_name_deactive){
			document.getElementsByTagName("tr").item(i).style.color = "#999";
			document.getElementsByTagName("tr").item(i).style.background = "#ccc";
		}
	}
}

function updateNexusAllTidPrefs(el) {
	//theForm = document.forms["sectionprefs"];
	theForm = document.forms["modal_prefs"];
	for(i=0; i<theForm.elements.length; i++){
		var regex = /^nexustid\d+$/;
		if (regex.test(theForm.elements[i].name)) {
			if (theForm.elements[i].value == el.value) {
				theForm.elements[i].checked = true;
			} else {
				theForm.elements[i].checked = false;
			}
		}
	}
}

function reportError(request) {
	// replace with something else
	alert("error");
}

;
