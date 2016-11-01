$(function() {
	var timelineConnector = jsPlumb.getInstance();
	timelineConnector.setContainer($(".timeline-containe"));

	timelineConnector.importDefaults({
		Connector:[ "Flowchart"],
		Anchors : [ "Bottom", "Top" ],
		Endpoint: "Blank",
		EndpointStyle : { fillStyle: "#567567"  },
		PaintStyle: { strokeStyle: "#FF9185", lineWidth: 5 }
		// Anchor : [ 0.5, 0.5, 1, 1 ]
	});

	timelineConnector.connect({
		source:"phase-one-container",
		target:"phase-two-container"
	});	

	timelineConnector.connect({
		source:"phase-two-container",
		target:"phase-three-container"
	});		

	timelineConnector.connect({
		source:"phase-three-container",
		target:"donate-container"
	});		
})

